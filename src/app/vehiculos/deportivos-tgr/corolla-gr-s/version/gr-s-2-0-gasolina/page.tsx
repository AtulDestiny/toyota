"use client";

import "@aws-amplify/ui-react/styles.css";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import Guarantees from "@/components/Guarantees/Guarantees";
import MaterialCards, {
  MaterialCard,
} from "@/components/MaterialCards/MaterialCards";
import Container from "@/components/Layout/Container/Container";
import { colors } from "@/theme/colors";
import GeneralEspecs from "@/components/GeneralEspecs/GeneralEspecs";
import BannerWithVideo, {
  BannerFeature,
} from "@/components/Banner/BannerWithVideo";
import {
  ImageGalleryPreview,
  ImageGalleryPreviewProps,
} from "@/components/Gallery/ImageGalleryPreview/ImageGalleryPreview";
import Gallery360 from "@/components/Gallery/Gallery360/Gallery360";
import { ColorOption } from "@/types";
import {
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { VehicleNavigation } from "@/components/VehicleNavigation/VehicleNavigation";
import Button from "@/components/Layout/Button/Button";
import { colors as globalsColors } from "@/theme/colors";
import { useEffect, useState } from "react";
import VehicleShortcuts from "@/components/VehicleShortcuts/VehicleShortcuts";
import { useModelStore } from "@/providers/model-store-provider";
import { BannerFeatures } from "@/components/BannerFeatures/BannerFeatures";

const specsData = [
  {
    name: "Motorización",
    details: " MOTOR: 2.0L Gasolina POTENCIA: 169 HP TORQUE: 203 NM",
  },
  {
    name: "Confort",
    details:
      "TAPICERÍA: Cuero RADIO: 10 con Android Auto y Apple Carplay Sunroof",
  },
  {
    name: "Transmisión",
    details: "  CVT + modo manual (10 velocidades + reversa)",
  },
  {
    name: "Suspensión",
    details:
      "DELANTERA: Independiente tipo Macpherson TRASERA: Doble horquilla",
  },
  {
    name: "Drivetrain",
    details: "4X2",
  },
];

const items: MaterialCard[] = [
  {
    title: "Ficha Técnica",
    imageSrc: "/images/icons/paper.svg",
    alt: "paper",
    bgColor: colors.theme.red,
    txtColor: colors.theme.white,
    downloadUrl: "/images/pdf/FT-COROLLA-GRS.pdf",
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
      imagePath: ["/images/corolla-grs/versions/blanco.png"],
      name: "Blanco Perla/Negro",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: ["/images/corolla-grs/versions/negro.png"],
      name: "Negro",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/red-mc.png",
      imagePath: ["/images/corolla-grs/versions/rojo.png"],
      name: "Rojo/Negro",
      priority: 3,
    },
  ];

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
      label: "BOLSAS DE AIRE (7)",
      available: true,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const dynamicYearList = [{ label: "2026", value: "2026" }];

  const galleryData: ImageGalleryPreviewProps = {
    title: "Siente la pasión en cada curva",
    description: "Galería de Imágenes",
    galleryLink:
      "/vehiculos/deportivos-tgr/corolla-gr-s/version/gr-s-2-0-gasolina/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/corolla-grs/exterior/11.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/10.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/COROLLA_RETOQUE_HERO_07.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/5.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/DAVID-TOYOTA-COROLLA-GRS40497.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/DAVID-TOYOTA-COROLLA-GRS40519.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/DAVID-TOYOTA-COROLLA-GRS40547.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/DAVID-TOYOTA-COROLLA-GRS40649.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/MOVIMINETO-1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/MOVIMINETO-2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/MOVIMINETO-3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/TOYOTA_COROLLA_GRS_FINANCIACION_1140x560_03.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/exterior/Triptico.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/corolla-grs/interior/1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/5.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/6.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/7.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/8.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/9.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/10.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/11.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/12.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/13.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-grs/interior/14.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
    ],
  };

  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);

  const vehicleNavigationData = {
    vehicleName: "COROLLA GR-S 2.0 GASOLINA 4X2 CVT",
    modelName: "COROLLA GR-S",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-COROLLA-GRS.pdf",
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
            href: "",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/deportivos-tgr/corolla-gr-s/version/gr-s-2-0-gasolina/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/deportivos-tgr/corolla-gr-s/version/gr-s-2-0-gasolina/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/deportivos-tgr/corolla-gr-s/version/gr-s-2-0-gasolina/galeria#360",
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
            href: "/images/pdf/FT-COROLLA-GRS.pdf",
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
              imageMobile: "/images/25-interna-del-vehiculo-corolla-gr-s.png",
              imageDesktop: "/images/corolla-grs/hero-banner/banner.jpg",
              alt: "COROLLA GR-S",
            },
          ]}
          features={bannerFeatures}
          title="COROLLA GR-S"
          price="Desde  $130.900.000*"
        />
      </View>

      <VehicleShortcuts
        technicalSpecs="/images/pdf/FT-COROLLA-GRS.pdf"
        customSlug="corolla"
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
            Corolla se destaca por ser un vehículo amplio, dándole al conductor
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
            Corolla se destaca por ser un vehículo amplio, dándole al conductor
            y sus ocupantes una sensación de confort, donde sobresale la alta
            calidad en sus materiales.
          </Text>
        )}
        <SectionTitle
          title={"COROLLA GR-S 2.0 GASOLINA 4X2 CVT"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Cada destino es mejor en compañía"}
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
          placeholder="2026"
          price={" $130.900.000"}
          slug="corolla"
        />
      </Container>
      <Container
        padding={{ base: "3.75rem 0 3.125rem", xl: "7.125rem 0 5.5rem" }}
        backgroundColor="#272329"
      >
        <GeneralEspecs
          specsData={specsData}
          heading="Corolla GR-S"
          technicalData={
            vehicleNavigationData.sections.find(
              (section) => section.title === "Información Ficha Técnica"
            )?.redirect
          }
        />
      </Container>
      <Container padding={{ base: "0", xl: "0" }}>
        <ImageGalleryPreview {...galleryData} />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
      >
        <SectionTitle
          title={"COROLLA GR-S 2.0 GASOLINA 4X2 CVT"}
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
