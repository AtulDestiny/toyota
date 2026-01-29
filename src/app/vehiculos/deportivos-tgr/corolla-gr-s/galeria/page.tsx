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

const dummyColorsList: ColorOption[] = [
  {
    id: "1",
    iconPath: "/assets/colors/white.svg",
    imagePath: ["/images/corolla-grs/attract/11.jpg"],
    name: "Blanca",
    priority: 1,
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
      imagePath: "/images/corolla-grs/exterior/11.jpg",
      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/exterior/10.jpg",
      coverText: "Título de la imagen",
      priority: 2,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/exterior/COROLLA_RETOQUE_HERO_07.jpg",
      coverText: "Título de la imagen",
      priority: 3,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/exterior/1.jpg",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/exterior/5.jpg",
      coverText: "Título de la imagen",
      priority: 5,
      description: "*Imagen de referencia",
    },
    {
      imagePath:
        "/images/corolla-grs/exterior/DAVID-TOYOTA-COROLLA-GRS40497.jpg",
      coverText: "Título de la imagen",
      priority: 7,
      description: "*Imagen de referencia",
    },
    {
      imagePath:
        "/images/corolla-grs/exterior/DAVID-TOYOTA-COROLLA-GRS40519.jpg",
      coverText: "Título de la imagen",
      priority: 8,
      description: "*Imagen de referencia",
    },
    {
      imagePath:
        "/images/corolla-grs/exterior/DAVID-TOYOTA-COROLLA-GRS40547.jpg",
      coverText: "Título de la imagen",
      priority: 9,
      description: "*Imagen de referencia",
    },
    {
      imagePath:
        "/images/corolla-grs/exterior/DAVID-TOYOTA-COROLLA-GRS40649.jpg",
      coverText: "Título de la imagen",
      priority: 11,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/exterior/MOVIMINETO-1.jpg",
      coverText: "Título de la imagen",
      priority: 12,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/exterior/MOVIMINETO-2.jpg",
      coverText: "Título de la imagen",
      priority: 13,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/exterior/MOVIMINETO-3.jpg",
      coverText: "Título de la imagen",
      priority: 14,
      description: "*Imagen de referencia",
    },
    {
      imagePath:
        "/images/corolla-grs/exterior/TOYOTA_COROLLA_GRS_FINANCIACION_1140x560_03.jpg",
      coverText: "Título de la imagen",
      priority: 14,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/exterior/Triptico.jpg",
      coverText: "Título de la imagen",
      priority: 14,
      description: "*Imagen de referencia",
    },
  ];

  const interiorImages = [
    {
      imagePath: "/images/corolla-grs/interior/1.jpg",
      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/2.jpg",
      coverText: "Título de la imagen",
      priority: 2,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/3.jpg",
      coverText: "Título de la imagen",
      priority: 3,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/4.jpg",
      coverText: "Título de la imagen",
      priority: 4,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/5.jpg",
      coverText: "Título de la imagen",
      priority: 5,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/6.jpg",
      coverText: "Título de la imagen",
      priority: 6,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/7.jpg",
      coverText: "Título de la imagen",
      priority: 7,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/8.jpg",
      coverText: "Título de la imagen",
      priority: 8,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/9.jpg",
      coverText: "Título de la imagen",
      priority: 9,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/10.jpg",
      coverText: "Título de la imagen",
      priority: 10,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/11.jpg",
      coverText: "Título de la imagen",
      priority: 11,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/12.jpg",
      coverText: "Título de la imagen",
      priority: 12,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/13.jpg",
      coverText: "Título de la imagen",
      priority: 13,
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/corolla-grs/interior/14.jpg",
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
    vehicleName: "COROLLA GR-S",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-COROLLA-GRS--hide.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "COROLLA GR-S 2.0 GASOLINA 4X2 CVT",
            href: "/vehiculos/deportivos-tgr/corolla-gr-s/version/gr-s-2-0-gasolina",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-COROLLA-GRS--hide.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/deportivos-tgr/corolla-gr-s/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/deportivos-tgr/corolla-gr-s/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/deportivos-tgr/corolla-gr-s/galeria#360",
          },
        ],
      },
      {
        title: "Accesorios",
        redirect: "",
      },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "",
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
        redirect: "",
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
      <VehicleShortcuts
        technicalSpecs="/images/pdf/FT-COROLLA-GRS--hide.pdf"
        customSlug="corolla"
      />
      <View padding={{ base: "2rem 0rem", xl: "4rem" }}>
        <SectionTitle
          title={"Galería"}
          subtitle={"Corolla GR-S"}
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
