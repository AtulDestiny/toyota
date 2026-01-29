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
      imagePath: "/images/yaris-cross/exterior/exterior1.jpg",
      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/exterior/exterior2.jpg",
      coverText: "Título de la imagen",
      priority: 2,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/exterior/exterior3.jpg",
      coverText: "Título de la imagen",
      priority: 3,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/exterior/exterior4.jpg",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/exterior/exterior5.jpg",
      coverText: "Título de la imagen",
      priority: 5,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/exterior/exterior6.jpg",
      coverText: "Título de la imagen",
      priority: 6,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/exterior/exterior7.jpg",
      coverText: "Título de la imagen",
      priority: 7,
      description: "*Imagen de referencia",
    },
  ];

  const interiorImages = [
    {
      imagePath: "/images/yaris-cross/interior/interior1.jpg",
      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/interior/interior2.jpg",
      coverText: "Título de la imagen",
      priority: 2,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/interior/interior3.jpg",
      coverText: "Título de la imagen",
      priority: 3,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/interior/interior4.jpg",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/interior/interior5.jpg",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/interior/interior6.jpg",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/yaris-cross/interior/interior7.jpg",
      coverText: "Título de la imagen",
      priority: 4,
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
    vehicleName: "YARIS CROSS XLS 1.5 HEV 4X2 E-CVT",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "YARIS CROSS XS 1.5 HEV 4X2 E-CVT",
            href: "/vehiculos/hibridos/yaris-cross/version/xs-1-5-hev-4-x-2-e-cvt",
          },
          {
            label: "YARIS CROSS XLS 1.5 HEV 4X2 E-CVT",
            href: "/vehiculos/hibridos/yaris-cross/version/xls-1-5-hev-4-x-2-e-cvt",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/hibridos/yaris-cross/version/xls-1-5-hev-4-x-2-e-cvt/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/hibridos/yaris-cross/version/xls-1-5-hev-4-x-2-e-cvt/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/hibridos/yaris-cross/version/xls-1-5-hev-4-x-2-e-cvt/galeria#360",
          },
        ],
      },
      {
        title: "Accesorios",
        redirect: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
      },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
          },
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
      {
        title: "Garantía",
        redirect: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
      },
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
      <VehicleShortcuts technicalSpecs="/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf" />
      <View padding={{ base: "2rem 0rem", xl: "4rem" }}>
        <SectionTitle
          title={"Galería"}
          subtitle={"YARIS CROSS XLS 1.5 HEV 4X2 E-CVT"}
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
