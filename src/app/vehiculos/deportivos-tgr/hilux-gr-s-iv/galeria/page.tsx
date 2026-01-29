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
    iconPath: "/assets/colors/black.svg",
    imagePath: ["/images/toyota-card-white.png"],
    name: "Negro",
    priority: 1,
  },
  {
    id: "2",
    iconPath: "/assets/colors/gray.svg",
    imagePath: ["/images/toyota-card-white.png"],
    name: "Gris",
    priority: 2,
  },
  {
    id: "3",
    iconPath: "/assets/colors/white.svg",
    imagePath: ["/images/toyota-card-white.png"],
    name: "Blanco",
    priority: 3,
  },
];

export default function Galeria() {
  const [tab, setTab] = useState<TabsType>("INTERIOR");
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = () => {
    const newPath = pathname + "/interior";
    router.push(newPath);
  };

  const message =
    "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible.";
  const images = [
    {
      imagePath: "/images/gallery__image-1.png",
      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-2.png",
      coverText: "Título de la imagen",
      priority: 2,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-3.png",
      coverText: "Título de la imagen",
      priority: 3,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-4.png",
      coverText: "Título de la imagen",
      priority: 4,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-5.png",
      coverText: "Título de la imagen",
      priority: 5,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-6.png",
      coverText: "Título de la imagen",
      priority: 6,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-7.png",
      coverText: "Título de la imagen",
      priority: 7,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-8.png",
      coverText: "Título de la imagen",
      priority: 6,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-9.png",
      coverText: "Título de la imagen",
      priority: 7,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-10.png",
      coverText: "Título de la imagen",
      priority: 7,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
    {
      imagePath: "/images/gallery__image-11.png",
      coverText: "Título de la imagen",
      priority: 7,
      description:
        "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado redefine tus límites de la manera más emocionante posible. ",
    },
  ];

  const interiorImages = [
    {
      imagePath: "/images/hilux-gr-s-vi/interior/interior1.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/interior/interior2.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/interior/interior3.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/interior/interior4.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/interior/interior5.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/interior/interior6.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/interior/interior7.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
  ];

  const exteriorImages = [
    {
      imagePath: "/images/hilux-gr-s-vi/exterior/exterior1.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/exterior/exterior2.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/exterior/exterior3.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/exterior/exterior4.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/exterior/exterior5.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/exterior/exterior6.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description: "*Imagen de referencia",
    },
    {
      imagePath: "/images/hilux-gr-s-vi/exterior/exterior7.jpg",

      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
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
    vehicleName: "HILUX GR-S IV",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT_HILUX_GRS4-Ajuste-2025.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "HILUX D.C. GR-S IV DIÉSEL 2.8 4X4 AT",
            href: "/vehiculos/deportivos-tgr/hilux-gr-s-iv/version/diesel-2-8-4-x-4-at",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT_HILUX_GRS4-Ajuste-2025.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/deportivos-tgr/hilux-gr-s-iv/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/deportivos-tgr/hilux-gr-s-iv/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/deportivos-tgr/hilux-gr-s-iv/galeria#interior",
          },
        ],
      },
      {
        title: "Accesorios",
        redirect: "/images/pdf/FT_HILUX_GRS4-Ajuste-2025.pdf",
      },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "/images/pdf/FT_HILUX_GRS4-Ajuste-2025.pdf",
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
        redirect: "/images/pdf/FT_HILUX_GRS4-Ajuste-2025.pdf",
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
        customSlug="hilux"
        technicalSpecs="/images/pdf/FT_HILUX_GRS4-Ajuste-2025.pdf"
      />
      <View padding={{ base: "2rem 0rem", xl: "4rem" }}>
        <SectionTitle
          title={"Galería"}
          subtitle={"Hilux GR-S"}
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
          <Tabs.Panel value="VISTA 360º">
            <Gallery360
              carImages={carImages}
              placesList={placesList}
              colorsList={colors}
              detailsPage={false}
              onClick={handleNavigation}
            />
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
