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
import {
  SliderSection,
  SliderSectionProps,
  SliderSectionTheme,
} from "@/components/SliderSection/SliderSection";
import VehicleCardList from "@/components/CardsList/VehiclesCardList/VehiclesCardList";
import { useModelStore } from "@/providers/model-store-provider";
import { BannerFeatures } from "@/components/BannerFeatures/BannerFeatures";

const specsData = [
  {
    name: "Motorización",
    details: "MOTOR: 3.4L Gasolina Twin Turbo POTENCIA: 409 HP TORQUE: 650 NM",
  },
  {
    name: "Confort",
    details:
      "RADIO:   JBL + 12.3” con Android Auto y Apple Carplay CÁMARA: 360° multiterreno SUSPENSIÓN: variable adaptativa + Sistema E-KDSS",
  },
  {
    name: "Transmisión",
    details: "  Automática secuencial (10 velocidades + reversa)",
  },
  {
    name: "Suspensión",
    details:
      "DELANTERA: Independiente tipo Macpherson TRASERA:  Eje rígido Multi-Link",
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
    downloadUrl: "/images/pdf/FT-Land-Cruiser-300-GR-S-2025.pdf",
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
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const vehicles = [
    {
      imageSrc: "/images/seleccion-toyota-jun-LC300GR.png",
      title: "Land Cruiser 300 GR-S 3.4 gasolina 4x4 AT",
      modelName: "LC300 GASOLINA GR-S",
      price: "$662.900.000",
      description:
        "Con tecnología de punta, un exterior fuerte y lujoso heredado por generaciones, su abrumadora capacidad todoterreno abre nuevos caminos donde antes no existían.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/deportivos-tgr/land-cruiser-300-gr-s/version/3-4-gasolina-4-x-4-at",
    },
  ];
  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const sliderData: SliderSectionProps = {
    theme: SliderSectionTheme.Dark,
    title: isMobile
      ? "Diferenciales"
      : "Razones para tener una Land Cruiser 300 GR-S",
    description: isMobile
      ? "Razones para tener una Land Cruiser 300 GR-S"
      : "Diferenciales",
    showImageReference: true, // Enable the reference text
    showButton: true, // Add this line to show the CTA buttons
    items: [
      {
        image: {
          src: "/images/land-cruiser-300/interior/zx/in6.jpg",
          alt: "Ejemplo 1",
        },
        title: "Confort interior",
        description:
          "Disfruta de la comodidad y tecnología con techo corredizo, asientos de cuero con calefacción y ventilación y 2 pantallas táctiles en la 2da fila de asientos.",
      },
      {
        image: {
          src: "/images/land-cruiser-300/exterior/grs/ex2.jpg",
          alt: "Ejemplo 2",
        },
        title: "Sistema de tracción",
        description:
          "Su sistema de tracción en las cuatro ruedas y su avanzada suspensión garantizan un manejo suave y estable en todo tipo de terreno.",
      },
      {
        image: {
          src: "/images/land-cruiser-300/interior/grs/in1.jpg",
          alt: "Ejemplo 3",
        },
        title: "Conectividad",
        description:
          "Sistema de infoentretenimiento premiun JBL con 14 parlantes y una pantalla táctil de 12.3 pulgadas, compatible con Android Auto y Apple CarPlay.",
      },
    ],
  };

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/images/vehicle-colors/hd/platinum-white-pearl.png",
      imagePath: ["/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png"],
      name: "Blanco perla glacial",
      priority: 1,
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
      label: "BOLSAS DE AIRE (10)",
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
      "/vehiculos/camionetas/land-cruiser-300/version/300-gr-s-3-4-gasolina/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/land-cruiser-300/exterior/grs/ex1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-300/exterior/grs/ex2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-300/exterior/grs/ex3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-300/exterior/grs/ex4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-300/exterior/grs/ex5.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-300/exterior/grs/ex6.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/land-cruiser-300/interior/grs/in1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-300/interior/grs/in2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-300/interior/grs/in3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-300/interior/grs/in4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/land-cruiser-300/interior/zx/in6.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
    ],
  };

  const vehicleNavigationData = {
    vehicleName: "LAND CRUISER 300 GR-S",
    modelName: "LC300 GASOLINA GR-S",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-Land-Cruiser-300-GR-S-2025.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "LAND CRUISER 300 ZX 3.4 GASOLINA 4X4 AT",
            href: "/vehiculos/camionetas/land-cruiser-300/version/300-zx-3-4-gasolina",
          },
          {
            label: "LAND CRUISER 300 GR-S 3.4 GASOLINA 4X4 AT",
            href: "/vehiculos/camionetas/land-cruiser-300/version/300-gr-s-3-4-gasolina",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-Land-Cruiser-300-GR-S-2025.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/camionetas/land-cruiser-300/version/300-gr-s-3-4-gasolina/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/camionetas/land-cruiser-300/version/300-gr-s-3-4-gasolina/galeria#interior",
          },
        ],
      },
      {
        title: "Accesorios",
        redirect: "/images/pdf/FT-Land-Cruiser-300-GR-S-2025.pdf",
      },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "/images/pdf/FT-Land-Cruiser-300-GR-S-2025.pdf",
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
        redirect: "/images/pdf/FT-Land-Cruiser-300-GR-S-2025.pdf",
      },
    ],
  };

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
              imageMobile:
                "/images/22-interna-del-vehiculo-land-cruiser-300-gr-s.png",
              imageDesktop:
                "/images/land-cruiser-300/hero-banner/grs/banner.jpg",
              alt: "LAND CRUISER 300 GR-S",
            },
          ]}
          features={bannerFeatures}
          title="LAND CRUISER 300 GR-S"
          price="Desde  $662.900.000*"
        />
      </View>
      <VehicleShortcuts
        technicalSpecs="/images/pdf/FT-Land-Cruiser-300-GR-S-2025.pdf"
        customSlug="land-cruiser-300"
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
            marginBottom={"4.125rem"}
            style={{
              textWrap: "pretty",
            }}
          >
            Un vehículo potente capaz de llevarte a cualquier lugar del planeta
            con tranquilidad y seguridad.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"5.063rem"}
          >
            Un vehículo potente capaz de llevarte a cualquier lugar
            <br /> del planeta con tranquilidad y seguridad.
          </Text>
        )}
        <SectionTitle
          title={"LAND CRUISER 300 GR-S"}
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
          price={" $662.900.000"}
          slug="land-cruiser-300"
        />
      </Container>
      <SliderSection {...sliderData} />;
      <Container
        padding={{ base: "2.3125rem 0 3.5rem", xl: "5.0625rem 0 7rem" }}
      >
        <SectionTitle
          title={"Corolla Cross GR-S"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Encuentra tu versión"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <VehicleCardList vehicles={vehicles} slug="land-cruiser-300" />
      </Container>
      <Container padding={{ base: "0", xl: "0" }}>
        <ImageGalleryPreview {...galleryData} />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
      >
        <SectionTitle
          title={"LAND CRUISER 300 GR-S 3.4 GASOLINA 4X4 AT"}
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
