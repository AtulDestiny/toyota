"use client";

import "@aws-amplify/ui-react/styles.css";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import Guarantees from "@/components/Guarantees/Guarantees";
import MaterialCards, {
  MaterialCard,
} from "@/components/MaterialCards/MaterialCards";
import Container from "@/components/Layout/Container/Container";
import { colors } from "@/theme/colors";
import GeneralEspecsTundra from "@/components/GeneralEspecsTundra/GeneralEspecsTundra";
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
  Heading,
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
    "/images/tundra/versions/version1.png",
    "/images/tundra/versions/version2.png",
    "/images/tundra/versions/version3.png",
    "/images/tundra/versions/version4.png",
    "/images/tundra/versions/version5.png",
    "/images/tundra/versions/version6.png",
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
    title: "Atrévete a aventurarte más lejos",
    description: "Galería de Imágenes",
    galleryLink: "/vehiculos/pick-ups/tundra/version/[slugDos]/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          { src: "/images/tundra/exterior/exterior1.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior2.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior3.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior4.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior5.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior6.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior7.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior8.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior9.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior10.jpg", alt: "Tundra" },
          { src: "/images/tundra/exterior/exterior11.jpg", alt: "Tundra" },
        ],
      },
      {
        title: "Interior",
        items: [
          { src: "/images/tundra/interior/interior1.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior2.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior3.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior4.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior5.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior6.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior7.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior8.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior9.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior10.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior11.jpg", alt: "Tundra" },
          { src: "/images/tundra/interior/interior12.jpg", alt: "Tundra" },
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

            <Link href="/vehiculos/pick-ups/tundra/galeria">
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
            Robusto por fuera y sofisticado en el interior, Toyota Tundra esta
            diseñada para transportar y enfrentar los caminos menos transitados,
            con comodidades y tecnologías avanzadas que hacen que tu viaje sea
            más agradable.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"8.125rem"}
          >
            Robusto por fuera y sofisticado en el interior, Toyota Tundra esta
            diseñada
            <br /> para transportar y enfrentar los caminos menos transitados,
            <br /> con comodidades y tecnologías avanzadas que
            <br /> hacen que tu viaje sea más agradable.
          </Text>
        )}
        <SectionTitle
          title={"Tundra"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"TUNDRA PLATINUM 3.4 GASOLINA 4X4 AT"}
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
        <GeneralEspecsTundra></GeneralEspecsTundra>
      </Container>
      <Container padding={{ base: "0", xl: "0" }}>
        <ImageGalleryPreview {...galleryData} />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
      >
        <SectionTitle
          title={"Tundra"}
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
