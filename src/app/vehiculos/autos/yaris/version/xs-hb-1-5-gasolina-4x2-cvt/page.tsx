"use client";

import BannerWithVideo, {
  BannerFeature,
} from "@/components/Banner/BannerWithVideo";
import { BannerFeatures } from "@/components/BannerFeatures/BannerFeatures";
import Gallery360 from "@/components/Gallery/Gallery360/Gallery360";
import {
  ImageGalleryPreview,
  ImageGalleryPreviewProps,
} from "@/components/Gallery/ImageGalleryPreview/ImageGalleryPreview";
import GeneralEspecs from "@/components/GeneralEspecs/GeneralEspecs";
import Guarantees from "@/components/Guarantees/Guarantees";
import Container from "@/components/Layout/Container/Container";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import MaterialCards, {
  MaterialCard,
} from "@/components/MaterialCards/MaterialCards";
import { VehicleNavigation } from "@/components/VehicleNavigation/VehicleNavigation";
import VehicleShortcuts from "@/components/VehicleShortcuts/VehicleShortcuts";
import { useModelStore } from "@/providers/model-store-provider";
import { colors } from "@/theme/colors";
import { ColorOption } from "@/types";
import {
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";

const specsData = [
  {
    name: "Motorización",
    details: "MOTOR: 1.5L Gasolina POTENCIA: 106 HP TORQUE: 140 NM ",
  },
  {
    name: "Confort",
    details:
      "ESPEJO INTERIOR: Electrocrómico RADIO: Android Auto y Apple Carplay Encendido por botón",
  },
  {
    name: "Transmisión",
    details: " CVT",
  },
  {
    name: "Suspensión",
    details: "DELANTERA: Tipo Macpherson TRASERA: Tipo barra de torsión",
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
    downloadUrl: "/images/pdf/FT-Yaris-HB.pdf",
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
  const { setCurrentModelState, currentModelState: current } = useModelStore(
    (state) => state
  );

  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/images/vehicle-colors/hd/azul.png",
      imagePath: ["/images/yaris/versions/azul-gris.png"],
      name: "Azul Grisaceo",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/platinum-white-pearl.png",
      imagePath: ["/images/yaris/versions/blanco-perla.png"],
      name: "Blanco perla metalizado",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/gray-me.png",
      imagePath: ["/images/yaris/versions/gris-met.png"],
      name: "Gris Metálico",
      priority: 3,
    },
    {
      id: "4",
      iconPath: "/images/vehicle-colors/hd/plata-metalico.png",
      imagePath: ["/images/yaris/versions/gris-plata.png"],
      name: "Plata",
      priority: 4,
    },
    {
      id: "5",
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: ["/images/yaris/versions/negro-mica.png"],
      name: "Negro Mica",
      priority: 5,
    },
    {
      id: "6",
      iconPath: "/images/vehicle-colors/hd/red-mc.png",
      imagePath: ["/images/yaris/versions/rojo-met.png"],
      name: "Rojo Mica Metálico",
      priority: 6,
    },
    {
      id: "7",
      iconPath: "/images/vehicle-colors/hd/super-white.png",
      imagePath: ["/images/yaris/versions/super-blanco.png"],
      name: "Súper Blanco",
      priority: 7,
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

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const dynamicYearList = [{ label: "2026", value: "2026" }];

  const galleryData: ImageGalleryPreviewProps = {
    title: "Siente la pasión en cada curva",
    description: "Galería de Imágenes",
    galleryLink:
      "/vehiculos/autos/yaris/version/xs-hb-1-5-gasolina-4x2-cvt/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/yaris-pro/exterior/HGF_0233.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/exterior/HGF_0236.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/exterior/HGF_0251.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/exterior/HGF_0277.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/exterior/HGF_0280.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/exterior/HGF_0314.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/exterior/HGF_0337.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/exterior/HGF_0460.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/exterior/HGF_0472.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/yaris-pro/interior/HGF_0221.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/interior/HGF_0224.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/interior/HGF_0241.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/interior/HGF_0262.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/interior/HGF_0269.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/interior/HGF_0274.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/yaris-pro/interior/HGF_0444.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
    ],
  };

  const vehicleNavigationData = {
    vehicleName: "YARIS XS HB 1.5 GASOLINA 4X2 CVT",
    modelName: "YARIS XS HB CVT",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-Yaris-HB.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "YARIS XS HB 1.5 GASOLINA 4X2 CVT",
            href: "/vehiculos/autos/yaris/version/xs-hb-1-5-gasolina-4x2-cvt",
          },
          {
            label: "YARIS SPORT HB 1.5 GASOLINA 4X2 CVT",
            href: "/vehiculos/autos/yaris/version/sport-hb-1-5-gasolina-4x2-cvt",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-Yaris-HB.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/autos/yaris/version/xs-hb-1-5-gasolina-4x2-cvt/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/autos/yaris/version/xs-hb-1-5-gasolina-4x2-cvt/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/autos/yaris/version/xs-hb-1-5-gasolina-4x2-cvt/galeria#360",
          },
        ],
      },
      { title: "Accesorios", redirect: "/images/pdf/FT-Yaris-HB.pdf" },
      {
        title: "Materiales Descargables",
        links: [
          { label: "Ficha Técnica", href: "/images/pdf/FT-Yaris-HB.pdf" },
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
      { title: "Garantía", redirect: "/images/pdf/FT-Yaris-HB.pdf" },
    ],
  };

  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);

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
              imageMobile: "/images/24-interna-del-vehiculo-yaris.png",
              imageDesktop: "/images/yaris-pro/hero-banner/yaris.png",
              alt: "YARIS XS HB 1.5 GASOLINA 4X2 CVT",
            },
          ]}
          features={bannerFeatures}
          title="YARIS XS HB 1.5 GASOLINA 4X2 CVT"
          price="Desde  $87.900.000*"
        />
      </View>

      <VehicleShortcuts technicalSpecs="/images/pdf/FT-YARIS-HB.pdf" />

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
            marginBottom={"4.125rem"}
            style={{
              textWrap: "pretty",
            }}
          >
            El Toyota Yaris cuenta con un diseño seguro y deportivo,
            aprovechando al máximo sus dimensiones exteriores y detalles
            interiores para brindar una experiencia de manejo excepcional.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"8.125rem"}
          >
            El Toyota Yaris cuenta con un diseño seguro y deportivo,
            aprovechando al máximo sus dimensiones exteriores y detalles
            interiores para brindar una
            <br /> experiencia de manejo excepcional.
          </Text>
        )}
        <SectionTitle
          title={"YARIS XS HB 1.5 GASOLINA 4X2 CVT"}
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
          price={" $87.900.000"}
          slug="yaris"
        />
      </Container>
      <Container
        padding={{ base: "3.75rem 0 3.125rem", xl: "7.125rem 0 5.5rem" }}
        backgroundColor="#272329"
      >
        <GeneralEspecs
          specsData={specsData}
          heading="Yaris"
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
          title={"Yaris"}
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
