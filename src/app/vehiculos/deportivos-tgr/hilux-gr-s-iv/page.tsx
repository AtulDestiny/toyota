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
    downloadUrl: "/images/pdf/FT_HILUX_GRS4-Ajuste-2025.pdf",
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
      imagePath: ["/images/hilux-gr-s-vi/versions/blanco.png"],
      name: "Blanco Perlado/Negro",
      priority: 1,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: ["/images/hilux-gr-s-vi/versions/negro.png"],
      name: "Negro Mica",
      priority: 3,
    },
    {
      id: "4",
      iconPath: "/images/vehicle-colors/hd/red-mc.png",
      imagePath: ["/images/hilux-gr-s-vi/versions/rojo.png"],
      name: "Rojo Metálico/Negro",
      priority: 4,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const vehicles = [
    {
      imageSrc: "/images/hilux-gr-s-vi/versions/blanco.png",
      title: "HILUX D.C. GR-S IV DIÉSEL 2.8 4X4 AT",
      modelName: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT",
      price: "$309.500.000",
      description:
        "La Hilux GR-S IV combina innovación tecnológica y un diseño estilizado, ofreciendo una gran experiencia de conducción.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/deportivos-tgr/hilux-gr-s-iv/version/diesel-2-8-4-x-4-at",
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
    galleryLink: "/vehiculos/deportivos-tgr/hilux-gr-s-iv/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/hilux-gr-s-vi/exterior/exterior1.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/exterior/exterior2.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/exterior/exterior3.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/exterior/exterior4.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/exterior/exterior5.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/exterior/exterior6.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/exterior/exterior7.jpg",
            alt: "hilux",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/hilux-gr-s-vi/interior/interior1.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/interior/interior2.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/interior/interior3.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/interior/interior4.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/interior/interior5.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/interior/interior6.jpg",
            alt: "hilux",
          },
          {
            src: "/images/hilux-gr-s-vi/interior/interior7.jpg",
            alt: "hilux",
          },
        ],
      },
    ],
  };

  const dynamicYearList = [{ label: "2026", value: "2026" }];

  const sliderData: SliderSectionProps = {
    theme: SliderSectionTheme.Dark,
    title: isMobile ? "Diferenciales" : "Razones para tener una HILUX GR-S",
    description: isMobile
      ? "Razones para tener una HILUX GR-S"
      : "Diferenciales",
    showImageReference: true, // Enable the reference text
    showButton: true, // Add this line to show the CTA buttons
    items: [
      // {
      //   image: {
      //     src: "/images/testimage.png",
      //     alt: "Ejemplo 1",
      //   },
      //   title: "Servicios conectados",
      //   description:
      //     "Accede a toda la información de tu vehículo en la app de Toyota. Control, seguridad y conectividad en un solo lugar. * ",
      // },
      {
        image: {
          src: "/images/corolla-cross-gr/diffrentials/img2.jpg",
          alt: "Ejemplo 2",
        },
        title: "Toyota Gazoo Racing",
        description:
          "Toyota Gazoo Racing es el brazo deportivo de Toyota, que aplica tecnologías y estilo de competición a sus vehículos.",
      },
      {
        image: {
          src: "/images/hilux-gr-s-vi/differentials/differentials2.jpg",
          alt: "Ejemplo 3",
        },
        title: "Suspensión mejorada",
        description:
          "Posee amortiguadores telescópicos monotubo GR que mejoran la respuesta y estabilidad en terrenos complejos.",
      },
    ],
  };

  const vehicleNavigationData = {
    vehicleName: "HILUX GR-S IV",
    modelName: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT",
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
              imageMobile: "/images/18-interna-del-vehiculo-hilux-gr-s-vi.png",
              imageDesktop: "/images/hilux-gr-s-vi/banner.jpg",
              alt: "Hilux GR-S IV",
            },
          ]}
          features={bannerFeatures}
          title="Hilux GR-S IV"
          price="Desde  $309.500.000*"
        />
      </View>
      <VehicleShortcuts
        technicalSpecs="/images/pdf/FT_HILUX_GRS4-Ajuste-2025.pdf"
        customSlug="hilux"
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
            El diseño frontal con parrilla sólida complementa su estructura y
            dimensiones más amplias, acentuando la robustez de su carácter y su
            fuerte postura.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"5.063rem"}
          >
            El diseño frontal con parrilla sólida complementa su estructura y
            <br />
            dimensiones más amplias, acentuando la robustez de su carácter y su
            <br />
            fuerte postura.
          </Text>
        )}
        <SectionTitle
          title={"Hilux GR-S IV"}
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
          yearList={dynamicYearList}
          placeholder="2026"
          price={" $309.500.000"}
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
          title={"Hilux GR-S"}
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
          title={"Hilux GR-S"}
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
