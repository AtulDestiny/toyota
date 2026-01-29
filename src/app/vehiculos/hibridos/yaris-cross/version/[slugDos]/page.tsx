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
import BannerWithVideo from "@/components/Banner/BannerWithVideo";
import {
  ImageGalleryPreview,
  ImageGalleryPreviewProps,
} from "@/components/Gallery/ImageGalleryPreview/ImageGalleryPreview";
import Gallery360 from "@/components/Gallery/Gallery360/Gallery360";
import { ColorOption } from "@/types";
import {
  Flex,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { VehicleNavigation } from "@/components/VehicleNavigation/VehicleNavigation";
import Button from "@/components/Layout/Button/Button";
import { colors as globalsColors } from "@/theme/colors";

const specsData = [
  {
    name: "Motorización",
    details: " MOTOR: 1.5L Híbrido; POTENCIA: 201 HP ; TORQUE: 500 NM ",
  },
  {
    name: "Confort",
    details: "POTENCIA COMBINADA: 114 HP \n TORQUE MOTOR ELÉCTRICO :141 NM",
  },
  {
    name: "Transmisión",
    details: " E-CVT",
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
  },
  {
    title: "Manual del buen conductor",
    imageSrc: "/images/icons/car.svg",
    alt: "car",
    bgColor: colors.theme.white,
    txtColor: colors.theme.black,
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
  const dummyCarImages = [
    "/images/yaris-cross/versions/img1.png",
    "/images/yaris-cross/versions/img1.png",
    "/images/yaris-cross/versions/img1.png",
  ];

  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
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

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const galleryData: ImageGalleryPreviewProps = {
    title: "Siente la pasión en cada curva",
    description: "Galería de Imágenes",
    galleryLink: "/vehiculos/hibridos/yaris-cross/version/[slugDos]/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/yaris-cross/exterior/exterior1.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/exterior/exterior2.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/exterior/exterior3.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/exterior/exterior4.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/exterior/exterior5.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/exterior/exterior6.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/exterior/exterior7.jpg",
            alt: "yaris-cross",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/yaris-cross/interior/interior1.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/interior/interior2.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/interior/interior3.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/interior/interior4.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/interior/interior5.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/interior/interior6.jpg",
            alt: "yaris-cross",
          },
          {
            src: "/images/yaris-cross/interior/interior7.jpg",
            alt: "yaris-cross",
          },
        ],
      },
    ],
  };

  const isMobile = useBreakpointValue({ base: true, xl: false });

  return (
    <View position={isMobile ? "relative" : "static"}>
      {isMobile ? <VehicleNavigation /> : null}
      <View position="relative">
        <BannerWithVideo
          slides={[{
            imageMobile: "/images/pic_land_cruiser_prado_2.png",
            imageDesktop: "/images/TOYOTA PRADO_7R43337 2.png",
            alt: "Land Cruiser Prado",
          }]}
        />
        <Flex
          className="shortcuts"
          position="absolute"
          left="0"
          width="100%"
          style={{ zIndex: 10 }}
          backgroundColor={globalsColors.theme.black}
          justifyContent={"space-between"}
        >
          <View width={{ base: "100%", xl: "500px" }} fontSize={"sm"}>
            <Link href="/cotiza-tu-toyota/vehiculos-nuevos">
              <Button
                color="deepred"
                padding=".75rem 4.375rem"
                style={{
                  width: "188px",
                  borderRadius: "0",
                  lineHeight: "1.225rem",
                  border: "none",
                  height: "45px",
                  fontFamily: "var(--font-toyotaDisplay)",
                }}
              >
                Cotizar
              </Button>
            </Link>

            <Link href="/vehiculos/hibridos/prado/galeria">
              <Button
                color="black"
                padding=".75rem 2.75rem"
                style={{
                  width: "25%",
                  borderRadius: "0",
                  lineHeight: "1.225rem",
                  border: "none",
                  fontFamily: "var(--font-ToyotaType-Regular)",
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
      </View>

      <Container padding={{ base: "3rem 0", xl: "5.125rem 0" }}>
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
            Yaris Cross esta diseñado para la ciudad y más allá, con
            características excepcionales en todas las categorías.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"8.125rem"}
          >
            Yaris Cross esta diseñado para la ciudad y más allá,
            <br /> con características excepcionales
            <br /> en todas las categorías.
          </Text>
        )}
        <SectionTitle
          title={"Yaris Cross"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"YARIS CROSS XS 1.5 HEV 4X2 E-CVT"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <Gallery360
          carImages={dummyCarImages}
          placesList={dummyPlacesList}
          colorsList={dummyColorsList}
          detailsPage={true}
          onClick={handleExploreClick}
        />
      </Container>
      <Container
        padding={{ base: "3.75rem 0 3.125rem", xl: "7.125rem 0 5.5rem" }}
        backgroundColor="#272329"
      >
        <GeneralEspecs specsData={specsData} heading="Yaris Cross " />
      </Container>
      <Container padding={{ base: "0", xl: "0" }}>
        <ImageGalleryPreview {...galleryData} />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
      >
        <SectionTitle
          title={"Land Cruiser Prado"}
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
      </Container>
    </View>
  );
}
