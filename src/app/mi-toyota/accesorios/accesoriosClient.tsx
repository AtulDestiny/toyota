"use client";

import CatalogoPostventaAccesorios from "@/components/CatalogoPostventaAccesorios/CatalogoPostventaAccesorios";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicle } from "./queries";
import {
  VehicleCardProps,
  VehicleCategory,
} from "@/components/CatalogoPostventaAccesorios/CatalogoPostventaAccesorios";
import { useMemo } from "react";

export default function AccesoriosPage({ slug }: { slug: string }) {
  function formattedName(item: VehicleCardProps) {
    return capitalize(item.name.replace(/-/g, " ")).toLowerCase();
  }
  function formattedNameEquals(name: string, target: string) {
    return name === target.toLowerCase();
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["accesorios-principal"],
    queryFn: () => fetchVehicle(slug),
  });

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
        imgUrl = "/images/hilux/versions/tn-srx/attitude-black.png";
      }
      const formatted: VehicleCardProps = {
        id: item.id,
        name: capitalize(item.name.replace(/-/g, " ")),
        img: imgUrl,
        link: `/mi-toyota/accesorios/marketplace?model=${item.slug}`,
      };

      let added = false;
      if (
        categoryType === "autos" &&
        ["corolla", "yaris"].includes(formatted.name.toLowerCase())
      ) {
        defaultStructure["Autos"].push(formatted);
        filteredVehicles.push(formatted);
        added = true;
      } else if (
        categoryType === "camionetas" &&
        [
          "land cruiser prado",
          "yaris cross",
          "rav4",
          "4runner",
          "fortuner",
          "corolla cross",
        ].includes(formatted.name.toLowerCase())
      ) {
        defaultStructure["Camionetas"].push(formatted);
        filteredVehicles.push(formatted);
        added = true;
      } else if (
        categoryType === "pick-ups" &&
        ["tundra"].includes(formatted.name.toLowerCase())
      ) {
        defaultStructure["Pick Ups"].push(formatted);
        filteredVehicles.push(formatted);
        added = true;
      } else if (
        categoryType === "pick-ups" &&
        formatted.name.toLowerCase() !== "tundra"
      ) {
        defaultStructure["Pick Ups"].push(formatted);
        filteredVehicles.push(formatted);
        added = true;
      }
      //  else if (
      //   categoryType === "camionetas" &&
      //   formatted.name.toLowerCase() === "land cruiser"
      // ) {
      //   // Mover Land Cruiser de Camionetas a Pick Ups
      //   defaultStructure["Pick Ups"].push(formatted);
      //   filteredVehicles.push(formatted);
      //   added = true;
      // }
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
    <>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <CatalogoPostventaAccesorios
          title="Catálogo de Accesorios"
          subtitle="Encuentra los accesorios de tu vehículo aquí."
          description="Lleva tu pasión por Toyota al siguiente nivel, conoce nuestro catálogo de accesorios y elige el que más te guste. ¡Personaliza tu vehículo ya!"
          type="accesorios"
          items={categorizedData}
        />
      )}
    </>
  );
}
