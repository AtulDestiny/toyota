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

type TabsType = "INTERIOR" | "EXTERIOR" | "VISTA 360º";

const colors: ColorOption[] = [
  {
    id: "1",
    iconPath: "/assets/colors/silver.svg",
    imagePath: ["/images/toyota-card-white.png"],
    name: "silver",
    priority: 1,
  },
  {
    id: "2",
    iconPath: "/assets/colors/black.svg",
    imagePath: ["/images/toyota-card-white.png"],
    name: "Negro",
    priority: 2,
  },
  {
    id: "3",
    iconPath: "/assets/colors/gray.svg",
    imagePath: ["/images/toyota-card-white.png"],
    name: "Gris",
    priority: 3,
  },
  {
    id: "4",
    iconPath: "/assets/colors/white.svg",
    imagePath: ["/images/toyota-card-white.png"],
    name: "Blanco",
    priority: 4,
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
    "Con una potencia vertiginosa en las cuatro ruedas, Land Cruiser Prado\nredefine tus límites de la manera más emocionante posible.";
  const images = [
    {
      imagePath: "/images/gallery__image-1.png",
      coverText: "Título de la imagen",
      priority: 1,
      title: "Slide title",
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-2.png",
      coverText: "Título de la imagen",
      priority: 2,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-3.png",
      coverText: "Título de la imagen",
      priority: 3,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-4.png",
      coverText: "Título de la imagen",
      priority: 4,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-5.png",
      coverText: "Título de la imagen",
      priority: 5,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-6.png",
      coverText: "Título de la imagen",
      priority: 6,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-7.png",
      coverText: "Título de la imagen",
      priority: 7,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-8.png",
      coverText: "Título de la imagen",
      priority: 6,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-9.png",
      coverText: "Título de la imagen",
      priority: 7,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-10.png",
      coverText: "Título de la imagen",
      priority: 7,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
    },
    {
      imagePath: "/images/gallery__image-11.png",
      mobileImagePath: "/images/prador.svg",
      coverText: "Título de la imagen",
      priority: 7,
      description:
        "Texto descriptivo para la imagen (opcional). Se pueden usar varias líneas de texto y si es necesario agregar un CTA.",
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

  // Custom mobile heights for specific images - 5th image (index 4) to 400px
  const customMobileHeights = {
    3: "400px", // 4th image (0-indexed) in first gallery
    6: "443px", // 7th image (0-indexed) in first gallery
  };

  // Custom mobile heights for second gallery
  const customMobileHeightsSecond = {
    0: "400px", // 1st image in second gallery
    3: "130px", // 4th image in second gallery
  };

  return (
    <>
      <style jsx global>{`
        /* Handle line breaks in gallery message text */
        .gallery-message-text {
          white-space: pre-line;
        }
        .yarl__slide_description {
          font-family: var(--font-ToyotaType-Regular);
          font-size: 22px;
          font-weight: 400;
        }

        @media (max-width: 1249px) {
          .yarl__slide_description {
            font-size: 14px;
          }
        }
      `}</style>

      <View position={"relative"} paddingBottom={"44px"}>
        {isMobile ? <VehicleNavigation /> : null}
        <Flex
          position={"sticky"}
          top={isMobile ? "calc(100% - 44px)" : "60px"}
          left={isMobile ? "0" : "0"}
          style={{ zIndex: 1 }}
          backgroundColor={globalsColors.theme.black}
          justifyContent={"space-between"}
        >
          <View width={{ base: "100%", xl: "auto" }} fontSize={"sm"}>
            <Link href="/cotiza-tu-toyota/vehiculos-nuevos">
              <Button
                color="deepred"
                padding=".75rem 4.375rem"
                style={{
                  width: "50%",
                  borderRadius: "0",
                  lineHeight: "1.225rem",
                  border: "none",
                }}
              >
                Cotizar
              </Button>
            </Link>
            <Link href="/detalle/prado/galeria">
              <Button
                color="black"
                padding=".75rem 2.75rem"
                style={{
                  width: "50%",
                  borderRadius: "0",
                  lineHeight: "1.225rem",
                  border: "none",
                }}
              >
                Galería
              </Button>
            </Link>
          </View>
          {!isMobile && (
            <Link display={"flex"}>
              <Button
                color="black"
                padding={"0 2.5rem"}
                style={{
                  borderRadius: "0",
                  fontSize: "1.125rem",
                  lineHeight: "1.225rem",
                  border: "none",
                }}
              >
                Información Ficha Técnica
              </Button>
            </Link>
          )}
        </Flex>
        <View padding={{ base: "2rem 0rem", xl: "4rem 195px" }}>
          <SectionTitle
            title={"Galería"}
            subtitle={"Land Cruiser Prado"}
            titleFontSize={{ base: "18px", xl: "md" }}
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
              <Tabs.Item
                value="VISTA 360º"
                color="inherit"
                className={styles.tabs__item}
                fontWeight={500}
                fontFamily="var(--font-ToyotaType-Regular)"
              >
                VISTA 360º
              </Tabs.Item>
            </Tabs.List>
            <Tabs.Panel value="INTERIOR">
              <GalleryTab
                images={images}
                message={message}
                customMobileHeights={customMobileHeights}
                customMobileHeightsSecond={customMobileHeightsSecond}
              />
            </Tabs.Panel>
            <Tabs.Panel value="EXTERIOR">
              <GalleryTab images={images} message={message} />
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
    </>
  );
}

const GalleryTab = ({
  images,
  message,
  customMobileHeights,
  customMobileHeightsSecond,
}: {
  images: any[];
  message?: string;
  customMobileHeights?: { [index: number]: string };
  customMobileHeightsSecond?: { [index: number]: string };
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
      <Gallery
        imageList={firstGallery}
        customMobileHeights={customMobileHeights}
      />
      {message && (
        <Flex
          justifyContent="center"
          alignItems="center"
          padding={{
            base: "4rem 2.8rem",
            medium: "4rem 6rem",
            xl: "4rem 10rem",
          }}
          fontSize={{ base: "22px", xl: "lg" }}
          textAlign={"center"}
          lineHeight={{ base: "normal" }}
          fontFamily="var(--font-ToyotaType-Regular)"
          fontWeight={400}
        >
          <Text className="gallery-message-text">{message}</Text>
        </Flex>
      )}
      <Gallery
        imageList={secondGallery}
        customMobileHeights={customMobileHeightsSecond}
      />
    </>
  );
};
