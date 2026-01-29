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
import { useEffect, useState } from "react";
import VehicleShortcuts from "@/components/VehicleShortcuts/VehicleShortcuts";
import { useModelStore } from "@/providers/model-store-provider";
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
    available: true,
  },
  {
    icon: "/images/basy-seat.svg",
    label: "ISOFIX\nSISTEMA DE SUJECIÓN INFANTIL",
    available: true,
  },
  {
    icon: "/images/air-bags.svg",
    label: "BOLSAS DE AIRE (6)",
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
    downloadUrl: "/images/pdf/01_FT_GR_Yaris.pdf",
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
  const { setCurrentModelState } = useModelStore((state) => state);

  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/images/vehicle-colors/hd/super-white.png",
      imagePath: ["/images/yaris-gr/versions/blanco.png"],
      name: "Super Blanco",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: ["/images/yaris-gr/versions/negro.png"],
      name: "Negro",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/red-mc.png",
      imagePath: ["/images/yaris-gr/versions/rojo.png"],
      name: "Rojo",
      priority: 3,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const vehicles = [
    {
      imageSrc: "/images/yaris-gr/versions/blanco.png",
      title: "GR YARIS 1.6 GASOLINA 4X4 MT",
      modelName: "GR YARIS",
      description:
        "GR Yaris llega para brindarte emoción y adrenalina, con la tecnología y conocimiento de los líderes del automovilismo y Rally.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/deportivos-tgr/yaris-gr/version/1_6_gasolina",
    },
  ];
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);

  const galleryData: ImageGalleryPreviewProps = {
    title: isMobile ? "Galería de Imágenes" : "Siente la pasión en cada curva",
    description: isMobile
      ? "Siente la pasión en cada curva"
      : "Galería de Imágenes",
    selectStyles: {
      padding: "9px 24px",
      width: "230px", // or whatever size you need
      fontSize: "1rem",
      height: "48px",
    },
    galleryLink: "/vehiculos/deportivos-tgr/yaris-gr/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/yaris-gr/exterior/2.png",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-gr/exterior/3.png",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-gr/exterior/4.png",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-gr/exterior/5.png",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/yaris-gr/interior/1.png",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-gr/interior/2.png",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-gr/interior/3.png",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-gr/interior/4.png",
            alt: "Título de la imagen",
          },
        ],
      },
    ],
  };

  const dynamicYearList = [{ label: "2024", value: "2024" }];

  const sliderData: SliderSectionProps = {
    theme: SliderSectionTheme.Dark,
    title: isMobile ? "Diferenciales" : "Razones para tener un GR Yaris",
    description: isMobile ? "Razones para tener un GR Yaris" : "Diferenciales",
    showImageReference: true, // Enable the reference text
    showButton: true, // Add this line to show the CTA buttons
    items: [
      // {
      //   image: {
      //     src: "/images/corolla-grs/diffrentials/img1.png",
      //     alt: "Ejemplo 1",
      //   },
      //   title: "Servicios conectados",
      //   description:
      //     "Accede a toda la información de tu vehículo en la app de Toyota. Control, seguridad y conectividad en un solo lugar. *",
      // },
      {
        image: {
          src: "/images/corolla-grs/diffrentials/img2.jpg",
          alt: "Ejemplo 2",
        },
        title: "Toyota Gazoo Racing",
        description:
          "Como simbolo de Toyota Gazoo Racing, GR Yaris nació gracias a la creación de coches cada vez mejores, inspirados en el automovilismo. ",
      },
      {
        image: {
          src: "/images/yaris-gr/exterior/3.png",
          alt: "Ejemplo 3",
        },
        title: "Potencia y rendimiento",
        description:
          "El Toyota GR Yaris cuenta con un motor turboalimentado de 1.6L que desarrolla 268 hp y 370 Nm de torque.",
      },
      {
        image: {
          src: "/images/yaris-gr/exterior/2.png",
          alt: "Ejemplo 4",
        },
        title: "Tracción GR-FOUR",
        description:
          "El sistema de tracción GR-FOUR y sus diferenciales delanteros y traseros Torsen®️ LSD son el corazón del GR Yaris. Desarrollados en colaboración con el equipo del Campeonato Mundial de Rally de Toyota Gazoo Racing y perfeccionado por los pilotos del WRC.",
      },
    ],
  };

  const vehicleNavigationData = {
    vehicleName: "GR Yaris",
    modelName: "GR YARIS",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/01_FT_GR_Yaris.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "GR YARIS 1.6 GASOLINA 4X4 MT",
            href: "/vehiculos/deportivos-tgr/yaris-gr/version/1_6_gasolina",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/01_FT_GR_Yaris.pdf",
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
        redirect: "/images/pdf/01_FT_GR_Yaris.pdf",
      },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "/images/pdf/01_FT_GR_Yaris.pdf",
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
        redirect: "/images/pdf/01_FT_GR_Yaris.pdf",
      },
    ],
  };

  useEffect(() => {
    setCurrentModelState(vehicleNavigationData.modelName);
  }, []);

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
              imageMobile: "/images/yaris-gr/banner.png",
              imageDesktop: "/images/yaris-gr/banner--desktop.png",
              alt: "GR Yaris",
            },
          ]}
          features={bannerFeatures}
          title="GR Yaris"
          price=""
        />
      </View>
      <VehicleShortcuts
        technicalSpecs="/images/pdf/01_FT_GR_Yaris.pdf"
        customSlug="gr-yaris"
        cotizarLink="/"
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
            GR Yaris se destaca por ser un vehículo amplio, dándole al conductor
            y sus ocupantes una sensación de confort, donde sobresale la alta
            calidad en sus materiales.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"5.063rem"}
          >
            GR Yaris se destaca por ser un vehículo amplio, dándole al conductor
            y sus ocupantes una sensación de confort, donde sobresale la alta
            calidad en sus materiales.
          </Text>
        )}
        <SectionTitle
          title={"GR Yaris"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={
            "GR Yaris llega para brindarte emoción y adrenalina, con la tecnología y conocimiento de los líderes del automovilismo y Rally."
          }
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
          placeholder="2024"
          slug="gr-yaris"
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
          title={"GR Yaris"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Encuentra tu versión"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <VehicleCardList vehicles={vehicles} slug="gr-yaris" />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
      >
        <SectionTitle
          title={"GR Yaris"}
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
