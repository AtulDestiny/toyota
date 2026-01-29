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
    available: false,
  },
  {
    icon: "/images/basy-seat.svg",
    label: "ISOFIX\nSISTEMA DE SUJECIÓN INFANTIL",
    available: true,
  },
  {
    icon: "/images/air-bags.svg",
    label: "BOLSAS DE AIRE (7)",
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
    downloadUrl: "/images/pdf/FT TOYOTA HILUX OVERLANDER.pdf",
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
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const { setCurrentModelState } = useModelStore((state) => state);

  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/images/vehicle-colors/hd/plata-metalico.png",
      imagePath: [
        "/images/hilux-overlander/versions/dc-2-4-diesel-4-x-4-mt/colors/silver-met.png",
      ],
      name: "Plata Metálico",
      priority: 1,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const vehicles = [
    {
      imageSrc:
        "/images/hilux-overlander/versions/dc-2-4-diesel-4-x-4-mt/colors/silver-met.png",
      title: "Hilux D.C Overlander 2.4 Diesel 4x4 MT",
      modelName: "HILUX OVERLANDER D.C. 4X4 DIESEL 2.4 MT",
      price: "$234.900.000",
      description:
        "La Hilux Diésel ofrece un motor potente, ideal para trabajos pesados y terrenos difíciles.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/pick-ups/hilux-overlander/version/dc-2-4-diesel-4-x-4-mt",
    },
  ];

  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);

  const galleryData: ImageGalleryPreviewProps = {
    title: isMobile
      ? "Galería de Imágenes"
      : "Siente la pasión en todos los terrenos",
    description: isMobile
      ? "Siente la pasión en todos los terrenos"
      : "Galería de Imágenes",
    selectStyles: {
      padding: "9px 24px",
      width: "230px", // or whatever size you need
      fontSize: "1rem",
      height: "48px",
    },
    galleryLink: "/vehiculos/pick-ups/hilux-overlander/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/hilux-overlander/gallery/exterior/1e.jpg",
            srcDesktop:
              "/images/hilux-overlander/gallery/exterior/1ed.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/hilux-overlander/gallery/exterior/2e.jpg",
            srcDesktop:
              "/images/hilux-overlander/gallery/exterior/2ed.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/hilux-overlander/gallery/exterior/3e.png",
            srcDesktop:
              "/images/hilux-overlander/gallery/exterior/3ed.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/hilux-overlander/gallery/exterior/4e.png",
            alt: "Título de la imagen",
          },
          {
            src: "/images/hilux-overlander/gallery/exterior/5e.png",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/hilux-overlander/gallery/interior/1i.jpg",
            srcDesktop:
              "/images/hilux-overlander/gallery/interior/1id.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/hilux-overlander/gallery/interior/2i.jpg",
            srcDesktop:
              "/images/hilux-overlander/gallery/interior/2id.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/hilux-overlander/gallery/interior/3i.jpg",
            srcDesktop:
              "/images/hilux-overlander/gallery/interior/3id.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/hilux-overlander/gallery/interior/4i.jpg",
            srcDesktop:
              "/images/hilux-overlander/gallery/interior/4id.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
    ],
  };

  const dynamicYearList = [{ label: "2026", value: "2026" }];

  const sliderData: SliderSectionProps = {
    theme: SliderSectionTheme.Dark,
    title: isMobile ? "Diferenciales" : "Razones para tener una OVERLANDER",
    description: isMobile
      ? "Razones para tener una OVERLANDER"
      : "Diferenciales",
    showImageReference: true, // Enable the reference text
    showButton: true, // Add this line to show the CTA buttons
    items: [
      {
        image: {
          src: "/images/hilux-overlander/differentials/off-road.png",
          alt: "Ejemplo 2",
        },
        title: "Capacidades Off-Road:",
        description:
          "Recorre todo tipo de terrenos con la confianza que otorga la robustez de una Hilux junto a un desempeño Off Road destacado.",
      },
      {
        image: {
          src: "/images/hilux-overlander/differentials/confort.png",
          alt: "Ejemplo 3",
        },
        title: "Confort:",
        description:
          "Tu Hilux no deja de lado tu confort: Overlander incluye asistente de apertura de compuerta trasera, cámara de reversa y sensores de parqueo traseros que mejoran tu experiencia en el día a día con tu vehículo.",
      },
    ],
  };

  const vehicleNavigationData = {
    vehicleName: "Hilux Overlander",
    modelName: "HILUX OVERLANDER D.C. 4X4 DIESEL 2.4 MT",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT TOYOTA HILUX OVERLANDER.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "HILUX OVERLANDER D.C. 4X4 DIESEL 2.4 MT",
            href: "/vehiculos/pick-ups/hilux-overlander/version/dc-2-4-diesel-4-x-4-mt",
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
            href: "/vehiculos/pick-ups/hilux/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/pick-ups/hilux/galeria#interior",
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
              imageMobile: "/images/hilux-overlander/banner/mobile.jpg",
              imageDesktop: "/images/hilux-overlander/banner/desktop.jpg",
              alt: "Hilux  D.C Overlander 2.4 Diesel 4x4 MT",
            },
          ]}
          features={bannerFeatures}
          title="Hilux Overlander"
          price="Desde $234.900.000*"
        />
      </View>
      <VehicleShortcuts
        customSlug="hilux"
        technicalSpecs="/images/pdf/FT TOYOTA HILUX OVERLANDER.pdf"
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
            Una estética más robusta con llantas todoterreno, guardabarros
            laterales más grandes y más capacidades off road.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"5.063rem"}
          >
            Una estética más robusta con llantas todoterreno, guardabarros
            laterales más grandes y más capacidades off road.
          </Text>
        )}
        <SectionTitle
          title={"Hilux Overlander"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Fuerza y durabilidad"}
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
          placeholder="2026"
          yearList={dynamicYearList}
          price={"$234.900.000"}
          slug="hilux"
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
          title={"Hilux Overlander"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Encuentra tu versión"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <VehicleCardList vehicles={vehicles} slug="hilux" />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
      >
        <SectionTitle
          title={"Hilux Overlander"}
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
