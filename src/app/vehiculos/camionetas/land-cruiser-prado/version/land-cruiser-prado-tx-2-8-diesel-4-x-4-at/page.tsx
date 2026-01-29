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
  Link,
  Heading,
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
    details: "MOTOR: 2.8L Turbo Diésel POTENCIA: 201 HP TORQUE: 500 NM",
  },
  {
    name: "Confort",
    details:
      "RADIO: 8 con Android Auto y Apple Carplay FRENO DE ESTACIONAMIENTO: Electrónico + Auto Hold Encendido por botón",
  },
  {
    name: "Transmisión",
    details: "Automática secuencial (8 velocidades + reversa) con modo manual",
  },
  {
    name: "Suspensión",
    details:
      "DELANTERA: Independiente doble horquilla TRASERA: Multi-Link de 4 enlaces",
  },
  {
    name: "Drivetrain",
    details: "4WD FULL TIME",
  },
];

const items: MaterialCard[] = [
  {
    title: "Ficha Técnica",
    imageSrc: "/images/icons/paper.svg",
    alt: "paper",
    bgColor: colors.theme.red,
    txtColor: colors.theme.white,
    downloadUrl: "/images/pdf/LANDCRUISER-PRADO.pdf",
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
      iconPath: "/images/vehicle-colors/hd/bronce.png",
      imagePath: ["/images/land-cruiser-prado/Bronce-metalico.png"],
      name: "Bronce Metálico",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: ["/images/land-cruiser-prado/Negro.png"],
      name: "Negro",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/super-white.png",
      imagePath: ["/images/land-cruiser-prado/Super--blanco.png"],
      name: "Súper Blanco",
      priority: 3,
    },
    // {
    //   id: "1",
    //   iconPath: "/images/vehicle-colors/hd/bronce.png",
    //   imagePath: [
    //     "/images/land-cruiser-prado/colores/bronce-metálico/TX-L-Bronce-Metalico-Fondo-Blanco-Frontal.png",
    //   ],
    //   name: "Bronce Metálico",
    //   priority: 1,
    // },
    // {
    //   id: "2",
    //   iconPath: "/images/vehicle-colors/hd/black-mc.png",
    //   imagePath: [
    //     "/images/land-cruiser-prado/colores/negro/TX-L-Negro-Fondo-Blanco-Frontal.png",
    //   ],
    //   name: "Negro",
    //   priority: 2,
    // },
    // {
    //   id: "3",
    //   iconPath: "/images/vehicle-colors/hd/super-white.png",
    //   imagePath: [
    //     "/images/land-cruiser-prado/colores/super-blanco/TX-L-Super-Blanco-Fondo-Blanco-Frontal.png",
    //   ],
    //   name: "Súper Blanco",
    //   priority: 3,
    // },
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
      label: "BOLSAS DE AIRE (8)",
      available: true,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const dynamicYearList = [{ label: "2025", value: "2025" }];

  const galleryData: ImageGalleryPreviewProps = {
    title: "Siente la pasión en cada curva",
    description: "Galería de Imágenes",
    galleryLink:
      "/vehiculos/camionetas/land-cruiser/version/land-cruiser-prado-tx-2-8-diesel-4-x-4-at/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/land-cruiser-prado/exterior/exterior1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior5.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior6.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior7.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior8.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior9.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior10.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior11.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior12.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior13.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior14.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior15.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior16.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior17.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior18.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior19.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior20.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior21.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/exterior/exterior22.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/land-cruiser-prado/interior/interior1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior5.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior6.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior7.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior8.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior9.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior10.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-prado/interior/interior11.jpg",
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
    vehicleName: "Land Cruiser Prado TX 2.8 DIÉSEL 4X4 AT",
    modelName: "Land Cruiser Prado DIÉSEL TX",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/LANDCRUISER-PRADO.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "TX 2.4 GASOLINA 4X4 AT",
            href: "/vehiculos/camionetas/land-cruiser-prado/version/land-cruiser-prado-tx-2-4-gasolina-4-x-4-at",
          },
          {
            label: "TX-L 2.4 GASOLINA 4X4 AT",
            href: "/vehiculos/camionetas/land-cruiser-prado/version/land-cruiser-prado-tx-l-2-4-gasolina-4-x-4-at",
          },
          {
            label: "TX 2.8 DIÉSEL 4X4 AT",
            href: "/vehiculos/camionetas/land-cruiser-prado/version/land-cruiser-prado-tx-2-8-diesel-4-x-4-at",
          },
          {
            label: "TX-L 2.8 DIÉSEL 4X4 AT",
            href: "/vehiculos/camionetas/land-cruiser-prado/version/land-cruiser-prado-tx-l-2-8-diesel-4-x-4-at",
          },
          {
            label: "WX 2.8 DIÉSEL 4X4 AT",
            href: "/vehiculos/camionetas/land-cruiser-prado/version/land-cruiser-prado-wx-2-8-diesel-4-x-4-at",
          },
          {
            label: "VX 2.8 DIÉSEL 4X4 AT",
            href: "/vehiculos/camionetas/land-cruiser-prado/version/land-cruiser-prado-vx-2-8-diesel-4-x-4-at",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/LANDCRUISER-PRADO.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/camionetas/land-cruiser-prado/version/land-cruiser-prado-tx-2-8-diesel-4-x-4-at/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/camionetas/land-cruiser-prado/version/land-cruiser-prado-tx-2-8-diesel-4-x-4-at/galeria#interior",
          },
        ],
      },
      { title: "Accesorios", redirect: "/images/pdf/LANDCRUISER-PRADO.pdf" },
      {
        title: "Materiales Descargables",
        links: [
          { label: "Ficha Técnica", href: "/images/pdf/LANDCRUISER-PRADO.pdf" },
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
      { title: "Garantía", redirect: "/images/pdf/LANDCRUISER-PRADO.pdf" },
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
              imageMobile:
                "/images/20-interna-del-vehiculo-land-cruiser-prado.png",
              imageDesktop:
                "/images/land-cruiser-prado/hero-banner/hero-banner.jpg",
              alt: "LAND CRUISER PRADO TX 2.8 DIÉSEL 4X4 AT",
            },
          ]}
          features={bannerFeatures}
          title="LAND CRUISER PRADO TX 2.8 DIÉSEL 4X4 AT"
          price="Desde  $329.000.000*"
        />
      </View>

      <VehicleShortcuts technicalSpecs="/images/pdf/LANDCRUISER-PRADO.pdf" />

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
            Land Cruiser Prado transmite una fuerte sensación de estabilidad,
            solidez y maniobrabilidad mientras mantiene un estilo elegante y
            versátil.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"8.125rem"}
          >
            Land Cruiser Prado transmite una fuerte sensación de estabilidad,
            solidez y maniobrabilidad mientras mantiene un estilo elegante y
            versátil.
          </Text>
        )}
        <SectionTitle
          title={"LAND CRUISER PRADO TX 2.8 DIÉSEL 4X4 AT"}
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
          placeholder="2025"
          price={" $329.000.000"}
          slug="land-cruiser-prado"
        />
      </Container>
      <Container
        padding={{ base: "3.75rem 0 3.125rem", xl: "7.125rem 0 5.5rem" }}
        backgroundColor="#272329"
      >
        <GeneralEspecs
          specsData={specsData}
          heading="Land Cruiser Prado"
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
          title={"Land Cruiser Prado TX Diésel"}
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
