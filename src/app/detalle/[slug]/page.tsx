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
import Banner from "@/components/Banner/Banner";
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
    "/images/yaris/1.png",
    "/images/yaris/2.png",
    "/images/yaris/3.png",
    "/images/yaris/4.png",
    "/images/yaris/5.png",
    "/images/yaris/6.png",
    "/images/yaris/7.png",
    "/images/yaris/8.png",
  ];

  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/assets/colors/silver.svg",
      imagePath: ["/images/toyota-card-white.png"],
      name: "silver",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/assets/colors/black.svg",
      imagePath: ["/images/toyota-card-white.png"],
      name: "Negro",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/assets/colors/gray.svg",
      imagePath: ["/images/toyota-card-white.png"],
      name: "Blanco",
      priority: 4,
    },
    {
      id: "4",
      iconPath: "/assets/colors/white.svg",
      imagePath: ["/images/toyota-card-white.png"],
      name: "Blanco",
      priority: 4,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const vehicles = [
    {
      imageSrc: "/images/toyota-card-white.png",
      title: "Land Cruiser Prado\nFirst Edition",
      modelName: "",
      price: "$303.500.000",
      description:
        "La nueva Land Cruiser Prado First Edition transmite una fuerte sensación de estabilidad, solidez y maniobrabilidad mientras mantiene un estilo elegante y versátil.",
      buttonText: "Explorar esta versión",
      link: "/detalle/prado/",
    },
    {
      imageSrc: "/images/toyota-card-white.png",
      title: "Land Cruiser Prado\nFirst Edition",
      modelName: "",
      price: "$303.500.000",
      description:
        "La nueva Land Cruiser Prado First Edition transmite una fuerte sensación de estabilidad, solidez y maniobrabilidad mientras mantiene un estilo elegante y versátil.",
      buttonText: "Explorar esta versión",
      link: "/detalle/prado/",
    },
    {
      imageSrc: "/images/toyota-card-white.png",
      title: "Land Cruiser Prado\nFirst Edition",
      modelName: "",
      price: "$303.500.000",
      description:
        "La nueva Land Cruiser Prado First Edition transmite una fuerte sensación de estabilidad, solidez y maniobrabilidad mientras mantiene un estilo elegante y versátil.",
      buttonText: "Explorar esta versión",
      link: "/detalle/prado/",
    },
  ];
  const isMobile = useBreakpointValue({ base: true, xl: false });

  const galleryData: ImageGalleryPreviewProps = {
    title: isMobile ? "Galería de Imágenes" : "Siente la pasión en cada curva",
    description: isMobile
      ? "Siente la pasión \n en cada curva"
      : "Galería de Imágenes",
    selectStyles: {
      padding: "9px 14px",
      width: "230px",
      fontSize: "1rem",
      textAlign: "center", // Center the text in mobile and tablet

      height: "48px",
    },
    galleryLink: "/detalle/prado/galeria",
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

  const sliderData: SliderSectionProps = {
    theme: SliderSectionTheme.Dark,
    title: isMobile
      ? "Diferenciales"
      : "Razones para tener una\nLand Cruiser Prado",
    description: isMobile
      ? "Razones para tener una\nLand Cruiser Prado"
      : "Diferenciales",
    showImageReference: true, // Enable the reference text
    customButtonWidth: "135px", // Add this line to set custom button width
    customFontHeading: "14px",
    customFontDescription: "32px",
    customPaddingDesc: "20px 0 55px",
    showButton: true, // Add this line to show the CTA buttons
    customButtonPadding: "0", // Add this line to set custom button padding
    customDescriptionPadding: "0 0 94px 0", // Add this line to set custom description padding
    customStyles: {
      padding: {
        base: "40px 0rem 20px",
        xl: "96px 0 125px",
      },
    },
    items: [
      {
        image: {
          src: "/images/testimage.png",
          alt: "Ejemplo 1",
        },
        title: "Exploración sin fin. 1",
        description:
          "Referente en su segmento por crear un legado duradero y ser la mejor opción para andar en senderos de expediciones audaces.",
      },
      {
        image: {
          src: "/images/Toyota-229.png",
          alt: "Ejemplo 2",
        },
        title: "Exploración sin fin. 2",
        description:
          "Referente en su segmento por crear un legado duradero y ser la mejor opción para andar en senderos de expediciones audaces.",
      },
      {
        image: {
          src: "/images/Toyota-229.png",
          alt: "Ejemplo 3",
        },
        title: "Exploración sin fin. 3",
        description:
          "Referente en su segmento por crear un legado duradero y ser la mejor opción para andar en senderos de expediciones audaces.",
      },
    ],
  };

  const subtitle = useBreakpointValue({
    base: "Encuentra\ntu versión", // Mobile with line break
    xl: "Encuentra tu versión", // Desktop without line break
  }) as string;

  const enableLineBreaks = useBreakpointValue({
    base: true, // Mobile
    xl: false, // Desktop
  }) as boolean;

  return (
    <>
      <style jsx global>{`
        /* Custom pagination styles for SliderSection */
        .slider-section .custom-pagination.pagination-custom-width {
          display:none !important;
          width: auto !important;
          max-width: min(77.25rem, 80%) !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .slider-section .custom-pagination.pagination-custom-position {
          bottom: 1px !important;
        }

        @media (min-width: 90rem) {
  .slider-section .arrowCustom--prev {
    left: 20px;
  }

  .slider-section .arrowCustom--next {
    right: 20px;
  }
}

@media (min-width: 1250px) {

      .slider-section .arrowCustom {
            top: 60% !important;}}
        @media (max-width: 1249px) {
     
          .slider-section .custom-pagination.pagination-custom-position {
                    display:none !important;

            bottom: 30px !important;
   
          }
                  
        }
          .slider-section .amplify-flex .amplify-heading

        /* Custom spacing for SliderSection title and description - remove default spacing */
        .slider-section .amplify-flex .amplify-heading {
          padding-top: 10px !important;
        }

        /* Handle line breaks in slider section titles - only for titles containing "Razones para tener una" */
        .slider-section .amplify-flex .amplify-heading {
          white-space: pre-line;
        }

        }
      `}</style>

      <View position={isMobile ? "relative" : "static"}>
        {isMobile ? <VehicleNavigation /> : null}
        <View position="relative">
          <Banner
            image={{
              mobile: "/images/pic_land_cruiser_prado_2.png",
              desktop: "/images/TOYOTA PRADO_7R43337 2.png",
              alt: "Land Cruiser Prado",
            }}
          />
        </View>

        <Flex
          className="shortcuts"
          width="100%"
          style={{ zIndex: 10 }}
          backgroundColor={globalsColors.theme.black}
          justifyContent={"space-between"}
          position={"sticky"}
          top={{ base: "54.83px", xl: "60px" }}
          left="0px"
        >
          <View width={{ base: "100%", xl: "500px" }} fontSize={"sm"}>
            <Flex
              direction={{ base: "row", xl: "row" }}
              gap={{ base: "0", xl: "0" }}
              backgroundColor={{ base: "#f6f6f6", xl: "#000" }}
            >
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

              <Link
                href={isMobile ? "/concesionarios" : "/detalle/prado/galeria"}
              >
                <Button
                  color={isMobile ? "transparent" : "black"}
                  backgroundColor={isMobile ? "#F6F6F6" : undefined}
                  textColor={isMobile ? "black" : undefined}
                  padding=".75rem 1.75rem"
                  style={{
                    width: isMobile ? "auto" : "25%",
                    borderRadius: "0",
                    lineHeight: "1.225rem",
                    border: "none",
                    fontFamily: "var(--font-toyotaDisplay)",
                    minWidth: isMobile ? "fit-content" : undefined,
                    height: "45px",
                  }}
                >
                  {isMobile ? "Ver concesionarios" : "Galería"}
                </Button>
              </Link>
            </Flex>
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

        <Container padding={{ base: "3rem 0", xl: "5.125rem 0" }}>
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
              De raíces capaces surge la próxima generación de excelencia
              todoterreno. Ya seas un aventurero experimentado o un aspirante a
              explorador, Land Cruiser te invita a unirte al viaje.
            </Text>
          ) : (
            <Text
              fontSize={{ xl: "lg" }}
              lineHeight={{ xl: "130%" }}
              textAlign={"center"}
              marginBottom={"5.063rem"}
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
            textAlign={{ base: "left", xl: "center" }}
          />
          <div
            style={{
              marginTop: isMobile ? "10px" : "55px",
            }}
          >
            <Gallery360
              carImages={dummyCarImages}
              placesList={dummyPlacesList}
              colorsList={dummyColorsList}
              detailsPage={true}
              onClick={handleExploreClick}
              customImageSize={true}
              customWidth={{ medium: "1024px", xl: "1024px" }}
              customHeight={{
                base: "164px",
                medium: "447.74px",
                xl: "447.74px",
              }}
            />
          </div>
        </Container>
        <Container padding={{ base: "0", xl: "0" }}>
          <ImageGalleryPreview {...galleryData} />
        </Container>
        <Container
          padding={{ base: "0", xl: "0" }}
          backgroundColor={colors.theme.secondaryBlue}
        >
          <SliderSection
            {...sliderData}
            paginationClassName="pagination-custom-width pagination-custom-position"
          />
        </Container>
        <Container
          padding={{ base: "2.3125rem 0 3.5rem", xl: "5.0625rem 0 7rem" }}
        >
          <SectionTitle
            title={"Land Cruiser Prado"}
            titleFontSize={{ base: "sm", xl: "md" }}
            subtitle={subtitle}
            subtitleFontSize={{ base: "56px", xl: "xxxxl" }}
            enableLineBreaks={enableLineBreaks}
          />
          <VehicleCardList vehicles={vehicles} slug={"slug"} />
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
            textAlign={{ base: "left", xl: "center" }} // Add this line
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
                <Flex
                  direction={"column"}
                  gap={{ base: "14.4px", xl: "30.4px" }}
                >
                  <Text
                    fontFamily={"var(--font-ToyotaType-Regular)"}
                    fontSize={{ base: "12px", xl: "16px" }}
                    fontStyle={"normal"}
                    fontWeight={"400"}
                    lineHeight={{ base: "normal", xl: "30.4px" }}
                  >
                    *Imágenes de referencia. Precio sugerido al público por
                    Automotores Toyota Colombia S.A.S a nivel nacional. Para
                    mayor información dirija su consulta al concesionario
                    autorizado de su preferencia. Estos valores incluyen IVA,
                    Imp. Consumo e impuestos internos vigentes, aplicables de
                    acuerdo con el tipo de vehículo. Los precios pueden variar
                    según el concesionario de la Red Autorizada escogido.
                    Automotores Toyota Colombia S.A.S no vende sus productos al
                    público de manera directa y por ello, los precios indicados
                    resultan sugeridos al público en los Concesionarios
                    Oficiales.
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
                    comercializados y facturados por los concesionarios de la
                    red de ATC. La garantía tiene una cobertura de 5 años
                    contados a partir de la fecha de entrega del vehículo al
                    cliente o 120.000 km., lo primero que ocurra. Los primeros 3
                    años y/o los 100.000 km. iniciales corresponden a la
                    garantía de fábrica, los siguientes 2 años y/o los 20.000
                    km. adicionales, corresponden a la garantía suplementaria
                    ofrecida por ATC.
                  </Text>

                  <Text
                    fontFamily={"var(--font-ToyotaType-Regular)"}
                    fontSize={{ base: "12px", xl: "16px" }}
                    fontStyle={"normal"}
                    fontWeight={"400"}
                    lineHeight={{ base: "normal", xl: "30.4px" }}
                  >
                    ** Verificá la compatibilidad de tu modelo con el
                    fabricante.
                  </Text>
                </Flex>
              </Flex>
            </View>
          </View>
        </Container>
      </View>
    </>
  );
}
