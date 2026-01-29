"use client";

import "@aws-amplify/ui-react/styles.css";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import Guarantees from "@/components/Guarantees/Guarantees";
import MaterialCards, {
  MaterialCard,
} from "@/components/MaterialCards/MaterialCards";
import Container from "@/components/Layout/Container/Container";
import { colors } from "@/theme/colors";
import VehicleCardList from "@/components/CardsList/VehiclesCardList/VehiclesCardList";
import BannerWithVideo, {
  BannerFeature,
} from "@/components/Banner/BannerWithVideo";
import {
  SliderSection,
  SliderSectionProps,
  SliderSectionTheme,
} from "@/components/SliderSection/SliderSection";
import {
  ImageGalleryPreview,
  ImageGalleryPreviewProps,
} from "@/components/Gallery/ImageGalleryPreview/ImageGalleryPreview";
import { ColorOption } from "@/types";
import {
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { colors as globalsColors } from "@/theme/colors";
import "./page.css";
import Button from "@/components/Layout/Button/Button";
import { VehicleNavigation } from "@/components/VehicleNavigation/VehicleNavigation";
import Gallery360 from "@/components/Gallery/Gallery360/Gallery360";
import { useState } from "react";
import VehicleShortcuts from "@/components/VehicleShortcuts/VehicleShortcuts";
import { BannerFeatures } from "@/components/BannerFeatures/BannerFeatures";

const bannerFeatures: BannerFeature[] = [
  {
    icon: "/images/abs.svg",
    label: "SISTEMA ANTIBLOQUEO DE FRENOS",
    available: true,
  },
  {
    icon: "/images/estability.svg",
    label: "CONTROL ELECTRÓNICO DE ESTABILIDAD",
    available: true,
  },
  {
    icon: "/images/front-alert.svg",
    label: "ALERTA DE COLISIÓN FRONTAL",
    available: false,
  },
  {
    icon: "/images/basy-seat.svg",
    label: "ISOFIX\nSISTEMA DE SUJECIÓN INFANTIL",
    available: false,
  },
  {
    icon: "/images/air-bags.svg",
    label: "BOLSAS DE AIRE (2)",
    available: true,
  },
];

const items: MaterialCard[] = [
  {
    title: "Ficha Técnica",
    imageSrc: "/images/icons/paper.svg",
    alt: "paper",
    bgColor: colors.theme.red,
    txtColor: colors.theme.white,
    downloadUrl: "/images/pdf/FT-LAND-CRUISER-79.pdf",
  },
  {
    title: "Manual del buen conductor",
    imageSrc: "/images/icons/car.svg",
    alt: "car",
    bgColor: colors.theme.white,
    txtColor: colors.theme.black,
    downloadUrl: "/images/pdf/Manual_del_buen_conductor_Toyota.pdf",
  },
  {
    title: "Cobertura extendida T10",
    imageSrc: "/images/icons/volante.svg",
    alt: "Cobertura extendida T10",
    bgColor: colors.theme.black,
    txtColor: colors.theme.white,
    downloadUrl: "/images/pdf/cobertura-extendida-t10.pdf",
  },
];
export default function App() {
  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/assets/colors/white.svg",
      imagePath: ["/images/land-cruiser/attract/lc-79-perfil.png"],
      name: "Blanco",
      priority: 1,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const vehicles = [
    {
      imageSrc: "/images/land-cruiser/attract/lc-79-perfil.png",
      title: "LAND CRUISER 79 4.0 GASOLINA 4X4 MT",
      modelName: "LAND CRUISER 79",
      price: "$255.900.000",
      description:
        "La LC79 ofrece un motor y estructura versátil para trabajos pesados y con necesidades diversas.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/pick-ups/land-cruiser/version/land-cruiser-79-4-0-gasolina-4-x-4-mt",
    },
    // {
    //   imageSrc: "/images/land-cruiser/attract/lc-79-perfil.png",
    //   title: "LAND CRUISER 79 4.0 GASOLINA 4X4 MT",
    //   price: "$303.500.000",
    //   description:
    //     "La LC79 ofrece un motor y estructura versátil para trabajos pesados y con necesidades diversas.",
    //   buttonText: "Explorar esta versión",
    //   link: "/vehiculos/pick-ups/fortuner/version/srv-2-8-diesel-4-x-2-at",
    // },
    // {
    //   imageSrc: "/images/land-cruiser/attract/lc-79-perfil.png",
    //   title: "LAND CRUISER 79 4.0 GASOLINA 4X4 MT",
    //   price: "$303.500.000",
    //   description:
    //     "La LC79 ofrece un motor y estructura versátil para trabajos pesados y con necesidades diversas.",
    //   buttonText: "Explorar esta versión",
    //   link: "/vehiculos/pick-ups/fortuner/version/srv-2-7-gasolina-4-x-2-at",
    // },
    // {
    //   imageSrc: "/images/land-cruiser/attract/lc-79-perfil.png",
    //   title: "LAND CRUISER 79 4.0 GASOLINA 4X4 MT",
    //   price: "$303.500.000",
    //   description:
    //     "La LC79 ofrece un motor y estructura versátil para trabajos pesados y con necesidades diversas.",
    //   buttonText: "Explorar esta versión",
    //   link: "/vehiculos/pick-ups/fortuner/version/sr-2-8-diesel-4-x-4-at",
    // },
  ];
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);

  const galleryData: ImageGalleryPreviewProps = {
    title: isMobile ? "Galería de Imágenes" : "Clásica y duradera",
    description: isMobile ? "Clásica y duradera" : "Galería de Imágenes",
    selectStyles: {
      padding: "9px 24px",
      width: "230px", // or whatever size you need
      fontSize: "1rem",
      height: "48px",
    },
    galleryLink: "/vehiculos/pick-ups/land-cruiser/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/land-cruiser/exterior/LC_7R47812.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47822 movimiento.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47831.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47840.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47845.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47847.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47851.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47853.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47858.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47872.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/exterior/LC_7R47880.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/land-cruiser/interior/LC_7R47896.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/interior/LC_7R47923.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/interior/LC_7R47928.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/interior/LC_7R47935.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/interior/LC_7R47940.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/interior/LC_7R47890.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/interior/LC_7R47912.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/interior/LC_7R47904.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser/interior/LC_7R47906.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
    ],
  };

  const dynamicYearList = [{ label: "2025", value: "2025" }];

  const sliderData: SliderSectionProps = {
    theme: SliderSectionTheme.Dark,
    title: isMobile
      ? "Diferenciales"
      : "Razones para tener una Land Cruiser 79",
    description: isMobile
      ? "Razones para tener una Land Cruiser 79"
      : "Diferenciales",
    showImageReference: true, // Enable the reference text
    showButton: true, // Add this line to show the CTA buttons
    items: [
      {
        image: {
          src: "/images/land-cruiser/differentials/LC_7R47935.jpg",
          alt: "Ejemplo 1",
        },
        title: "Durabilidad",
        description:
          "Esta construida para llevarte adonde quieras, sin importar las circunstancias.",
      },
      {
        image: {
          src: "/images/land-cruiser/differentials/LC_7R47840.jpg",
          alt: "Ejemplo 2",
        },
        title: "Potencia y rendimiento",
        description:
          "Con un motor 4.0L,tracción 4X4 y transmisión mecánica desarrolla 228hp y 360Nm.",
      },
      {
        image: {
          src: "/images/land-cruiser/differentials/LC_7R47847.jpg",
          alt: "Ejemplo 3",
        },
        title: "Mejor autonomía",
        description:
          "Equipado con un sub tanque auxiliar de 90L, Land Cruiser 79 puede recorrer largas distancias con menos viajes a la gasolinera.",
      },
    ],
  };

  const vehicleNavigationData = {
    vehicleName: "Land Cruiser 79",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-LAND-CRUISER-79.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "LAND CRUISER 79 4.0 GASOLINA 4X4 MT",
            href: "/vehiculos/pick-ups/land-cruiser/version/land-cruiser-79-4-0-gasolina-4-x-4-mt",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-LAND-CRUISER-79.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/pick-ups/land-cruiser/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/pick-ups/land-cruiser/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/pick-ups/land-cruiser/galeria#360",
          },
        ],
      },
      { title: "Accesorios", redirect: "/images/pdf/FT-LAND-CRUISER-79.pdf" },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "/images/pdf/FT-LAND-CRUISER-79.pdf",
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
      { title: "Garantía", redirect: "/images/pdf/FT-LAND-CRUISER-79.pdf" },
    ],
  };

  return (
    <View position={isMobile ? "relative" : "static"}>
      {isMobile ? (
        <VehicleNavigation
          vehicleName={vehicleNavigationData.vehicleName}
          sections={vehicleNavigationData.sections}
        />
      ) : null}
      <View position="relative">
        <BannerWithVideo
          slides={[
            {
              imageMobile:
                "/images/19-interna-del-vehiculo-land-cruiser-79.png",
              imageDesktop: "/images/land-cruiser/hero-banner/LC_7R47812.jpg",
              alt: "Land Cruiser 79",
            },
          ]}
          features={bannerFeatures}
          title="Land Cruiser 79"
          price="Desde   $255.900.000*"
        />
      </View>
      <VehicleShortcuts
        technicalSpecs="/images/pdf/FT-LAND-CRUISER-79.pdf"
        customSlug="land-cruiser"
      />
      <Container padding={{ base: "3rem 0", xl: "5.125rem 0" }}>
        {useBreakpointValue({ base: true, medium: false }) ? (
          <BannerFeatures features={bannerFeatures} />
        ) : (
          <></>
        )}

        {isMobile ? (
          <Text
            fontSize={{ base: "ml", medium: "ml" }}
            lineHeight={{ base: "normal" }}
            textAlign={"center"}
            width={"87%"}
            margin={"0 auto"}
            marginTop={{ base: "40px", xl: "" }}
            marginBottom={"4.125rem"}
            style={{
              textWrap: "pretty",
            }}
          >
            Combina las cualidades Toyota, diseñada para enfrentar diferentes
            terrenos con confianza. Su robustez y fiabilidad la hacen ideal para
            diversas necesidades.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"5.063rem"}
          >
            Combina las cualidades Toyota, diseñada para enfrentar diferentes
            terrenos con confianza. Su robustez y fiabilidad la hacen ideal para
            diversas necesidades.
          </Text>
        )}
        <SectionTitle
          title={"Land Cruiser 79"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Un ícono de resistencia y durabilidad"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <Gallery360
          carImages={
            dummyColorsList.find(
              (color) => color.id === galleryCurrentColor?.id
            )?.imagePath || []
          }
          placesList={dummyPlacesList}
          colorsList={dummyColorsList}
          detailsPage={true}
          onClick={handleExploreClick}
          onColorChange={setGalleryCurrentColor}
          yearList={dynamicYearList}
          placeholder="2025"
          price={" $255.900.000"}
        />
      </Container>
      <Container padding={{ base: "0", xl: "0" }}>
        <ImageGalleryPreview {...galleryData} />
      </Container>
      <SliderSection {...sliderData} />;
      <Container
        padding={{ base: "2.3125rem 0 3.5rem", xl: "5.0625rem 0 7rem" }}
      >
        <SectionTitle
          title={"Land Cruiser 79"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Encuentra tu versión"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <VehicleCardList vehicles={vehicles} slug="land-cruiser" />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
      >
        <SectionTitle
          title={"Land Cruiser 79"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Materiales Descargables"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <MaterialCards items={items} />
      </Container>
      <Container
        padding={{ base: "3rem 0 5.25rem", xl: "3.06rem 0 7.3125rem" }}
      >
        <SectionTitle
          title={"Garantía"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Beneficios de tener un Toyota"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <Guarantees />

        <View paddingTop={{ base: "40px", xl: "107px" }}>
          <View
            style={{ borderTop: "1px solid #E0E0E0" }}
            paddingTop={{ base: "40px", xl: "107px" }}
            paddingRight={{ base: "0", xl: "155px" }}
            paddingLeft={{ base: "0", xl: "155px" }}
          >
            <Flex direction={"column"} gap={{ base: "24px", xl: "24px" }}>
              <Heading
                level={2}
                fontFamily={"var(--font-toyotaDisplay)"}
                fontSize={{ base: "14px", xl: "22px" }}
                fontStyle={"normal"}
                fontWeight={{ base: "400", xl: "700" }}
                lineHeight={{ base: "140%", xl: "127.271%" }}
              >
                Legales
              </Heading>
              <Flex direction={"column"} gap={{ base: "14.4px", xl: "30.4px" }}>
                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  fontSize={{ base: "12px", xl: "16px" }}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  lineHeight={{ base: "normal", xl: "30.4px" }}
                >
                  *Imágenes de referencia. Precio sugerido al público por
                  Automotores Toyota Colombia S.A.S a nivel nacional. Para mayor
                  información dirija su consulta al concesionario autorizado de
                  su preferencia. Estos valores incluyen IVA, Imp. Consumo e
                  impuestos internos vigentes, aplicables de acuerdo con el tipo
                  de vehículo. Los precios pueden variar según el concesionario
                  de la Red Autorizada escogido. Automotores Toyota Colombia
                  S.A.S no vende sus productos al público de manera directa y
                  por ello, los precios indicados resultan sugeridos al público
                  en los Concesionarios Oficiales.
                </Text>

                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  fontSize={{ base: "12px", xl: "16px" }}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  lineHeight={{ base: "normal", xl: "30.4px" }}
                >
                  *La Garantía Toyota aplica únicamente para vehículos nuevos
                  importados por Automotores Toyota Colombia S.A.S. (“ATC”),
                  comercializados y facturados por los concesionarios de la red
                  de ATC. La garantía tiene una cobertura de 5 años contados a
                  partir de la fecha de entrega del vehículo al cliente o
                  120.000 km., lo primero que ocurra. Los primeros 3 años y/o
                  los 100.000 km. iniciales corresponden a la garantía de
                  fábrica, los siguientes 2 años y/o los 20.000 km. adicionales,
                  corresponden a la garantía suplementaria ofrecida por ATC.
                </Text>
              </Flex>
            </Flex>
          </View>
        </View>
      </Container>
    </View>
  );
}
