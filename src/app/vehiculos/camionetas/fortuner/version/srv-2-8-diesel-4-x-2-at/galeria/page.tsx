/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "@aws-amplify/ui-react/styles.css";
import Gallery from "@/components/Gallery/Gallery/Gallery";
import {
  Flex,
  Link,
  Tabs,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import { useState } from "react";
import styles from "./Galeria.module.scss";
import { Option } from "@/components/Layout/Select/Select";
import { ColorOption } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { colors as globalsColors } from "@/theme/colors";
import Button from "@/components/Layout/Button/Button";
import { VehicleNavigation } from "@/components/VehicleNavigation/VehicleNavigation";
import Gallery360 from "@/components/Gallery/Gallery360/Gallery360";
import VehicleShortcuts from "@/components/VehicleShortcuts/VehicleShortcuts";

type TabsType = "INTERIOR" | "EXTERIOR" | "VISTA 360º";

const colors: ColorOption[] = [
  {
    id: "1",
    iconPath: "/assets/colors/white.svg",
    imagePath: [
      "/images/fortuner/versiones/sr-2-8-diesel-4-x-2-at/colores/super-blanco/2025043005461917_PostTonemapHDRColor_Vehicle.png",
    ],
    name: "Súper blanco",
    priority: 1,
  },
  {
    id: "2",
    iconPath: "/assets/colors/gray.svg",
    imagePath: [
      "/images/fortuner/versiones/sr-2-8-diesel-4-x-2-at/colores/blanco-perla-metalizado/2025043005001160_PostTonemapHDRColor_Vehicle.png",
    ],
    name: "Blanco perla metalizado",
    priority: 2,
  },
  {
    id: "3",
    iconPath: "/assets/colors/gray.svg",
    imagePath: [
      "/images/fortuner/versiones/sr-2-8-diesel-4-x-2-at/colores/plata-metalico/2025043005322755_PostTonemapHDRColor_Vehicle.png",
    ],
    name: "Plata metálico",
    priority: 3,
  },
  {
    id: "4",
    iconPath: "/assets/colors/gray.svg",
    imagePath: [
      "/images/fortuner/versiones/sr-2-8-diesel-4-x-2-at/colores/gris-metalico/2025043005033166_PostTonemapHDRColor_Vehicle.png",
    ],
    name: "Gris metálico",
    priority: 4,
  },
  {
    id: "5",
    iconPath: "/assets/colors/black.svg",
    imagePath: [
      "/images/fortuner/versiones/sr-2-8-diesel-4-x-2-at/colores/negro-mica/2025043005284734_PostTonemapHDRColor_Vehicle.png",
    ],
    name: "Negro mica",
    priority: 5,
  },
];

export default function Galeria() {
  const [tab, setTab] = useState<TabsType>("INTERIOR");
  const [currentColor, setCurrentColor] = useState<ColorOption | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = () => {
    const newPath = pathname + "/interior";
    router.push(newPath);
  };

  const message = "Siente la pasión en cada curva.";
  const exteriorImages = [
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER8.jpg",
      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER10.jpg",
      coverText: "Título de la imagen",
      priority: 2,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER11.jpg",
      coverText: "Título de la imagen",
      priority: 3,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER14.jpg",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER-1.jpg",
      coverText: "Título de la imagen",
      priority: 5,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER-3.jpg",
      coverText: "Título de la imagen",
      priority: 6,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER_7R37054.jpg",
      coverText: "Título de la imagen",
      priority: 7,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER_7R37066.jpg",
      coverText: "Título de la imagen",
      priority: 8,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER_7R37074.jpg",
      coverText: "Título de la imagen",
      priority: 9,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER_7R37078.jpg",
      coverText: "Título de la imagen",
      priority: 10,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER_7R37080.jpg",
      coverText: "Título de la imagen",
      priority: 11,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER_7R37086.jpg",
      coverText: "Título de la imagen",
      priority: 12,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER_7R37090.jpg",
      coverText: "Título de la imagen",
      priority: 13,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/exteriores/FORTUNER_7R37229.jpg",
      coverText: "Título de la imagen",
      priority: 14,
      description: "*Imagen de referencia",
    },
  ];

  const interiorImages = [
    {
      imagePath: "/images/fortuner/interiores/FORTUNER5.jpg",
      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER6.jpg",
      coverText: "Título de la imagen",
      priority: 2,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER7.jpg",
      coverText: "Título de la imagen",
      priority: 3,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER-4.jpg",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37104.jpg",
      coverText: "Título de la imagen",
      priority: 5,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37126.jpg",
      coverText: "Título de la imagen",
      priority: 6,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37130.jpg",
      coverText: "Título de la imagen",
      priority: 7,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37141.jpg",
      coverText: "Título de la imagen",
      priority: 8,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37146.jpg",
      coverText: "Título de la imagen",
      priority: 9,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37149.jpg",
      coverText: "Título de la imagen",
      priority: 10,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37163.jpg",
      coverText: "Título de la imagen",
      priority: 11,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37176.jpg",
      coverText: "Título de la imagen",
      priority: 12,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37223.jpg",
      coverText: "Título de la imagen",
      priority: 13,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/fortuner/interiores/FORTUNER_7R37226.jpg",
      coverText: "Título de la imagen",
      priority: 14,
      description: "*Imagen de referencia",
    },
  ];
  const carImages = [
    "/images/yaris/1.png",
    "/images/yaris/2.png",
    "/images/yaris/3.png",
    "/images/yaris/4.png",
    "/images/yaris/5.png",
    "/images/yaris/6.png",
    "/images/yaris/7.png",
    "/images/yaris/8.png",
  ];

  const placesList: Option[] = [
    { label: "Vehículos: A-Z", value: "a-z" },
    { label: "Vehículos: Z-A", value: "z-a" },
    { label: "Precio: Mayor a Menor", value: "mayor" },
    { label: "Precio: Menor a Mayor", value: "menor" },
  ];

  const isMobile = useBreakpointValue({ base: true, xl: false });
  const vehicleNavigationData = {
    vehicleName: "FORTUNER SRV 2.8 DIÉSEL 4X2 AT",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-FORTUNER-1.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "FORTUNER SR 2.8 DIÉSEL 4X2 AT",
            href: "/vehiculos/camionetas/fortuner/version/sr-2-8-diesel-4-x-2-at",
          },
          {
            label: "FORTUNER SRV 2.8 DIÉSEL 4X2 AT",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-2-at",
          },
          {
            label: "FORTUNER SRV 2.7 GASOLINA 4X2 AT",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-7-gasolina-4-x-2-at",
          },
          {
            label: "FORTUNER SR 2.8 DIÉSEL 4X4 AT",
            href: "/vehiculos/camionetas/fortuner/version/sr-2-8-diesel-4-x-4-at",
          },
          {
            label: "FORTUNER SRV 2.8 DIÉSEL 4X4 AT",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-4-at",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-FORTUNER-1.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-2-at/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-2-at/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-2-at/galeria#360",
          },
        ],
      },
      { title: "Accesorios", redirect: "/images/pdf/FT-FORTUNER-1.pdf" },
      {
        title: "Materiales Descargables",
        links: [
          { label: "Ficha Técnica", href: "/images/pdf/FT-FORTUNER-1.pdf" },
          {
            label: "Manual del buen conductor",
            href: "/images/pdf/Manual_del_buen_conductor_Toyota.pdf",
          },
          {
            label: "Cobertura extendida T10",
            href: "/images/pdf/cobertura-extendida-t10.pdf",
          },
        ],
      },
      { title: "Garantía", redirect: "/images/pdf/FT-FORTUNER-1.pdf" },
    ],
  };

  return (
    <View position={"relative"}>
      {isMobile ? (
        <VehicleNavigation
          vehicleName={vehicleNavigationData.vehicleName}
          sections={vehicleNavigationData.sections}
        />
      ) : null}
      <VehicleShortcuts technicalSpecs="/images/pdf/FT-FORTUNER-1.pdf" />
      <View padding={{ base: "2rem 0rem", xl: "4rem" }}>
        <SectionTitle
          title={"Galería"}
          subtitle={"Fortuner SRV 2.8 Diésel 4x2 AT"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitleFontSize={{ base: "xl", xl: "xxxxl" }}
          withoutPaddingBottom
          textAlign={{ base: "center" }}
        />
        <Tabs.Container defaultValue={tab}>
          <Tabs.List
            justifyContent="center"
            width="max-content"
            margin="0 auto"
            value={tab}
            onChange={(value) => setTab(value as unknown as TabsType)}
            marginBottom={{ base: "16px", xl: "2rem" }}
          >
            <Tabs.Item
              value="INTERIOR"
              color="inherit"
              className={styles.tabs__item}
              fontWeight={500}
              fontFamily="var(--font-ToyotaType-Regular)"
            >
              INTERIOR
            </Tabs.Item>
            <Tabs.Item
              value="EXTERIOR"
              color="inherit"
              className={styles.tabs__item}
              fontWeight={500}
              fontFamily="var(--font-ToyotaType-Regular)"
            >
              EXTERIOR
            </Tabs.Item>
          </Tabs.List>
          <Tabs.Panel value="INTERIOR">
            <GalleryTab images={interiorImages} message={message} />
          </Tabs.Panel>
          <Tabs.Panel value="EXTERIOR">
            <GalleryTab images={exteriorImages} message={message} />
          </Tabs.Panel>
        </Tabs.Container>
      </View>
    </View>
  );
}

const GalleryTab = ({
  images,
  message,
}: {
  images: any[];
  message?: string;
}) => {
  const firstGallery = images.slice(0, 7);
  const secondGallery = images.slice(7, images.length);
  return (
    <>
      <Text
        fontSize={{ base: "xs", xl: "ss" }}
        lineHeight={{ base: "normal" }}
        textAlign={"center"}
        marginBottom={{ base: "6px", xl: "1.5rem" }}
      >
        *Imágenes de referencia
      </Text>
      <Gallery imageList={firstGallery} />
      {message && (
        <Flex
          justifyContent="center"
          alignItems="center"
          padding={{ base: "4rem 3rem", xl: "4rem 15rem" }}
          fontSize={{ base: "md", xl: "lg" }}
          textAlign={"center"}
          lineHeight={{ base: "normal" }}
          fontFamily="var(--font-toyotaDisplay)"
          fontWeight={300}
        >
          <Text>{message}</Text>
        </Flex>
      )}
      <Gallery imageList={secondGallery} />
    </>
  );
};
