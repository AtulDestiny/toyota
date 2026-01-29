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
  Heading,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { VehicleNavigation } from "@/components/VehicleNavigation/VehicleNavigation";
import Button from "@/components/Layout/Button/Button";
import { colors as globalsColors } from "@/theme/colors";

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
    "/images/image 226.png",
    "/images/image 226.png",
    "/images/image 226.png",
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
    galleryLink: "/vehiculos/pick-ups/fortuner/version/[slugDos]/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          { src: "/images/Toyota-227.png", alt: "Bosque verde" },
          { src: "/images/Toyota-227.png", alt: "Montañas nevadas" },
          { src: "/images/Toyota-227.png", alt: "Playa paradisíaca" },
        ],
      },
      {
        title: "Interior",
        items: [
          { src: "/images/dpixel.svg", alt: "Rascacielos modernos" },
          { src: "/images/dpixel.svg", alt: "Rascacielos modernos" },
          { src: "/images/dpixel.svg", alt: "Rascacielos modernos" },
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

            <Link href="/vehiculos/pick-ups/prado/galeria">
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
            De raíces capaces surge la próxima generación de excelencia
            todoterreno. Ya seas un aventurero experimentado o un aspirante a
            explorador, Land Cruiser te invita a unirte al viaje.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"8.125rem"}
          >
            De raíces capaces surge la próxima generación de excelencia
            todoterreno.
            <br />
            Ya seas un aventurero experimentado o un aspirante a explorador,
            <br />
            Land Cruiser te invita a unirte al viaje.
          </Text>
        )}
        <SectionTitle
          title={"Land Cruiser Prado"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"La leyenda, de regreso al origen"}
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
        <GeneralEspecs></GeneralEspecs>
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
