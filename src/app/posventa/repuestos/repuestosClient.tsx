"use client";

import CatalogoPostventa, {
  // VehicleCardProps,
  VehicleCategory,
} from "@/components/CatalogoPostventa/CatalogoPostventa";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicle } from "./queries";
import { useMemo } from "react";

export interface VehicleCardProps {
  id: number;
  name: string;
  slug?: string;
  img: string | any;
  image?:string;
  link: string;
  category?: {
    type?: string;
  };
  models?: {
    items?: {
      modelsByYear?: {
        items?: {
          colorsByModel?: {
            items?: {
              gallery?: {
                galleryAssets?: {
                  items?: {
                    id?: string;
                    name?: string;
                    type?: string;
                    url?: string;
                    params?: string;
                  }[];
                };
              };
            }[];
          };
        }[];
      };
    }[];
  };
  products?: {
    items?: {
      galleries?: {
        items?: {
          id: string;
          name: string;
          galleryAssets?: {
            items?: {
              id?: string;
              name?: string;
              url?: string;
              description?: string;
              type?: string;
            }[];
          };
        }[];
      };
    }[];
  };
}
export default function RepuestosPage({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["repuestos-principal"],
    queryFn: () => fetchVehicle(slug, "repuestos-principal"),
  });

   function formattedName(item: VehicleCardProps) {
      return capitalize(item.name.replace(/-/g, " ")).toLowerCase();
    }
    function formattedNameEquals(name: string, target: string) {
      return name === target.toLowerCase();
    }
 const categorizedData = useMemo(() => {
     const defaultStructure: Record<VehicleCategory, VehicleCardProps[]> = {
       Autos: [],
       Camionetas: [],
       "Pick Ups": [],
       "Ver todos": [],
     };

     if (!data) return defaultStructure;
 
     // Guardar los vehículos filtrados para "Ver todos"
     const filteredVehicles: VehicleCardProps[] = [];
     for (const item of data as VehicleCardProps[]) {
      let modelLenght = item.models?.items?.length
      let imageAttr
      let imgUrl;
      if (modelLenght !== 0) {
        imageAttr = item.models?.items
          ?.flatMap((model) => model.modelsByYear?.items || [])
          ?.flatMap((year) => year.colorsByModel?.items || [])
          ?.flatMap((color) => color.gallery?.galleryAssets?.items || [])
          ?.find(
            (asset) => asset?.type === "main_image" || asset.name === "main_image"
          );
        imgUrl = imageAttr?.url || "/images/Image-not-found.png";
      } else {
        imgUrl = item.image;
      }
     
       const categoryType = item?.category?.type;
       if (
         categoryType === "pick-ups" &&
         formattedNameEquals(formattedName(item), "hilux")
       ) {
         imgUrl = "/images/seleccion-toyota-jun-Hilux.png";
       }
       const formatted: VehicleCardProps = {
         id: item.id,
         name: capitalize(item.name.replace(/-/g, " ")),
         img: imgUrl,
         link: `/servicios/posventa/marketplace?model=${item.slug}`,
       };
 
       let added = false;
       if (
         categoryType === "autos" &&
         ["corolla"].includes(formatted.name.toLowerCase())
       ) {
         defaultStructure["Autos"].push(formatted);
         filteredVehicles.push(formatted);
         added = true;
       } else if (
         categoryType === "camionetas" &&
         ["land cruiser prado","fj cruiser","rush","rav4","4runner","fortuner","land cruiser 200"].includes(
          formatted.name.toLowerCase()
         )
       ) {
         defaultStructure["Camionetas"].push(formatted);
         filteredVehicles.push(formatted);
         added = true;
       }
        else if (
         categoryType === "pick-ups" &&
         ["hilux"].includes(formatted.name.toLowerCase())
       ) {
         defaultStructure["Pick Ups"].push(formatted);
         filteredVehicles.push(formatted);
         added = true;
       }
      //  else if (
      //    categoryType === "pick-ups" &&
      //    formatted.name.toLowerCase() !== "tundra"
      //  ) {
      //    defaultStructure["Pick Ups"].push(formatted);
      //    filteredVehicles.push(formatted);
      //    added = true;
      //  }
        else if (
         categoryType === "camionetas" &&
         formatted.name.toLowerCase() === "land cruiser"
       ) {
         // Mover Land Cruiser de Camionetas a Pick Ups
         defaultStructure["Pick Ups"].push(formatted);
         filteredVehicles.push(formatted);
         added = true;
       }
     }
     // Eliminar duplicados por id
     defaultStructure["Ver todos"] = filteredVehicles.filter(
       (v, i, arr) => arr.findIndex((x) => x.id === v.id) === i
     );
     return defaultStructure;
   }, [data]);

  function capitalize(str: string): string {
    return str
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  }

  return (
    <CatalogoPostventa
      title="Catálogo de Repuestos"
      subtitle="Encuéntralos aquí"
      description="¡Optimiza la vida útil de tu vehículo con Repuestos Genuinos Toyota! Descubre nuestro catálogo y asegura el adecuado rendimiento de tu vehículo."
      type="repuestos"
      items={categorizedData}
    />
  );
}
