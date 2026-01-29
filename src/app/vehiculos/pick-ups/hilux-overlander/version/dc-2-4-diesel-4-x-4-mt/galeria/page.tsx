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
import { useEffect, useState } from "react";
import styles from "./Galeria.module.scss";
import { Option } from "@/components/Layout/Select/Select";
import { ColorOption } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { colors as globalsColors } from "@/theme/colors";
import Button from "@/components/Layout/Button/Button";
import { VehicleNavigation } from "@/components/VehicleNavigation/VehicleNavigation";
import Gallery360 from "@/components/Gallery/Gallery360/Gallery360";
import VehicleShortcuts from "@/components/VehicleShortcuts/VehicleShortcuts";
import { useModelStore } from "@/providers/model-store-provider";

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
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const { setCurrentModelState } = useModelStore((state) => state);
  const [tab, setTab] = useState<TabsType>("INTERIOR");
  const [currentColor, setCurrentColor] = useState<ColorOption | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = () => {
    const newPath = pathname + "/interior";
    router.push(newPath);
  };

  const message =
    "Con una potencia vertiginosa en las cuatro ruedas, Hilux Overlander redefine tus límites de la manera más emocionante posible.";

  const exteriorImages = [
    {
      imagePath: isMobile
        ? "/images/hilux-overlander/gallery/page/exterior/1.jpg"
        : "/images/hilux-overlander/gallery/page/exterior/1d.jpg",
      coverText: "Título de la imagen",
      priority: 1,
      description: "*Imágen de referencia",
    },
    {
      imagePath: isMobile
        ? "/images/hilux-overlander/gallery/page/exterior/2.jpg"
        : "/images/hilux-overlander/gallery/page/exterior/2d.jpg",
      coverText: "Título de la imagen",
      priority: 2,
      description: "*Imágen de referencia",
    },
    {
      imagePath: isMobile
        ? "/images/hilux-overlander/gallery/page/exterior/3.png"
        : "/images/hilux-overlander/gallery/page/exterior/3d.jpg",
      coverText: "Título de la imagen",
      priority: 3,
      description: "*Imágen de referencia",
    },
    {
      imagePath: "/images/hilux-overlander/gallery/page/exterior/4.png",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imágen de referencia",
    },
    {
      imagePath: "/images/hilux-overlander/gallery/page/exterior/5.png",
      coverText: "Título de la imagen",
      priority: 5,
      description: "*Imágen de referencia",
    },
  ];

  const interiorImages = [
    {
      imagePath: isMobile
        ? "/images/hilux-overlander/gallery/page/interior/1.jpg"
        : "/images/hilux-overlander/gallery/page/interior/1d.jpg",
      coverText: "Título de la imagen",
      priority: 1,
      description: "*Imágen de referencia",
    },
    {
      imagePath: isMobile
        ? "/images/hilux-overlander/gallery/page/interior/2.jpg"
        : "/images/hilux-overlander/gallery/page/interior/2d.jpg",
      coverText: "Título de la imagen",
      priority: 2,
      description: "*Imágen de referencia",
    },
    {
      imagePath: isMobile
        ? "/images/hilux-overlander/gallery/page/interior/3.jpg"
        : "/images/hilux-overlander/gallery/page/interior/3d.jpg",
      coverText: "Título de la imagen",
      priority: 3,
      description: "*Imágen de referencia",
    },
    {
      imagePath: isMobile
        ? "/images/hilux-overlander/gallery/page/interior/4.jpg"
        : "/images/hilux-overlander/gallery/page/interior/4d.jpg",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imágen de referencia",
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

  const vehicleNavigationData = {
    vehicleName: "HILUX D.C. SR 2.4 DIÉSEL 4X4 MT",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT TOYOTA HILUX OVERLANDER.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "HILUX CARGOMAX",
            href: "/vehiculos/pick-ups/hilux-cargomax/version/hilux-cargomax",
          },
          {
            label: "HILUX CHASÍS 2.4 DIÉSEL 4X4 MT",
            href: "/vehiculos/pick-ups/hilux/version/hilux-chasis-2-4-diesel-4-x-4-mt",
          },
          {
            label: "HILUX D.C. SR 2.4 DIÉSEL 4X4 MT",
            href: "/vehiculos/pick-ups/hilux/version/dc-sr-2-4diesel-4-x-4-mt",
          },
          {
            label: "HILUX D.C. SRV 2.4 DIÉSEL 4X4 AT",
            href: "/vehiculos/pick-ups/hilux/version/dc-srv-2-4-diesel-4-x-4-at",
          },
          {
            label: "HILUX D.C. SR 2.7 4X4 GASOLINA MT",
            href: "/vehiculos/pick-ups/hilux/version/dc-sr-2-7-4-x-4-gasolina-mt",
          },
          {
            label: "HILUX D.C. SRX 2.8 DIÉSEL 4X4 AT",
            href: "/vehiculos/pick-ups/hilux/version/dc-srx-2-8diesel-4-x-4-at",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT TOYOTA HILUX OVERLANDER.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/pick-ups/hilux/version/dc-sr-2-4diesel-4-x-4-mt/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/pick-ups/hilux/version/dc-sr-2-4diesel-4-x-4-mt/galeria#interior",
          },
        ],
      },
      {
        title: "Accesorios",
        redirect: "/images/pdf/FT TOYOTA HILUX OVERLANDER.pdf",
      },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "/images/pdf/FT TOYOTA HILUX OVERLANDER.pdf",
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
        redirect: "/images/pdf/FT TOYOTA HILUX OVERLANDER.pdf",
      },
    ],
  };

  useEffect(() => {
    setCurrentModelState("HILUX D.C OVERLANDER 2.4 DIESEL 4X4 MT");
  }, []);

  return (
    <View position={"relative"}>
      {isMobile ? (
        <VehicleNavigation
          vehicleName={vehicleNavigationData.vehicleName}
          sections={vehicleNavigationData.sections}
        />
      ) : null}
      <VehicleShortcuts
        customSlug="hilux"
        technicalSpecs="/images/pdf/FT TOYOTA HILUX OVERLANDER.pdf"
      />
      <View padding={{ base: "2rem 0rem", xl: "4rem" }}>
        <SectionTitle
          title={"Galería"}
          subtitle={"Hilux Overlander"}
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
