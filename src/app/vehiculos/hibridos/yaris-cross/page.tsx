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
import { useState } from "react";
import VehicleShortcuts from "@/components/VehicleShortcuts/VehicleShortcuts";
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
    label: "BOLSAS DE AIRE (8)",
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
    downloadUrl: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
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
  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/images/vehicle-colors/hd/azul-zafiro.png",
      imagePath: ["/images/yaris-cross/versions/azul-zafiro.png"],
      name: "Azul Zafiro/Negro",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/platinum-white-pearl.png",
      imagePath: ["/images/yaris-cross/versions/blanco-perlado.png"],
      name: "Blanco Perla/ Negro",
      priority: 2,
    },
    // {
    //   id: "3",
    //   iconPath: "/images/vehicle-colors/hd/bronce.png",
    //   imagePath: ["/images/yaris-cross/versions/xls/bronce.png"],
    //   name: "Bronce",
    //   priority: 3,
    // },
    {
      id: "4",
      iconPath: "/images/vehicle-colors/hd/plata-metalico.png",
      imagePath: ["/images/yaris-cross/versions/plata-metalico.png"],
      name: "Plata Metálico/Negro",
      priority: 4,
    },
    {
      id: "5",
      iconPath: "/images/vehicle-colors/hd/red-mc.png",
      imagePath: ["/images/yaris-cross/versions/rojo-metalizado.png"],
      name: "Rojo Metalizado/Negro",
      priority: 5,
    },
    {
      id: "6",
      iconPath: "/images/vehicle-colors/hd/verde-glaciar/negro.png",
      imagePath: ["/images/yaris-cross/versions/Verde-glaciar.png"],
      name: "Verde Glaciar/Negro",
      priority: 6,
    },
    {
      id: "7",
      iconPath: "/images/vehicle-colors/hd/celestite.png",
      imagePath: ["/images/yaris-cross/versions/verde-everest.png"],
      name: "Verde Everest/Negro",
      priority: 7,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const vehicles = [
    {
      imageSrc: "/images/yaris-cross/versions/xs/azul-zafiro.png",
      title: "YARIS CROSS XS 1.5 HEV 4X2 E-CVT",
      modelName: "YARIS CROSS XS HEV",
      price: "$132.900.000",
      description:
        "Eficiencia y Tecnología: El Yaris Cross ofrece un sistema híbrido auto recargable, diseño moderno y seguridad avanzada.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/hibridos/yaris-cross/version/xs-1-5-hev-4-x-2-e-cvt",
    },
    {
      imageSrc: "/images/yaris-cross/versions/xls/blanco-perla-negro.png",
      title: "YARIS CROSS XLS 1.5 HEV 4X2 E-CVT",
      modelName: "YARIS CROSS XLS HEV",
      price: "$146.900.000",
      description:
        "Eficiencia y Tecnología: El Yaris Cross ofrece un sistema híbrido auto recargable, diseño moderno y seguridad avanzada con Toyota Safety Sense.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/hibridos/yaris-cross/version/xls-1-5-hev-4-x-2-e-cvt",
    },
  ];
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);

  const galleryData: ImageGalleryPreviewProps = {
    title: isMobile ? "Galería de Imágenes" : "Un estilo inconfundible",
    description: isMobile ? "Un estilo inconfundible" : "Galería de Imágenes",
    selectStyles: {
      padding: "9px 24px",
      width: "230px", // or whatever size you need
      fontSize: "1rem",
      height: "48px",
    },
    galleryLink: "/vehiculos/hibridos/yaris-cross/galeria",
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

  const dynamicYearList = [{ label: "2026", value: "2026" }];

  const sliderData: SliderSectionProps = {
    theme: SliderSectionTheme.Dark,
    title: isMobile ? "Diferenciales" : "Razones para tener un Yaris Cross",
    description: isMobile
      ? "Razones para tener un Yaris Cross"
      : "Diferenciales",
    showImageReference: true, // Enable the reference text
    showButton: true, // Add this line to show the CTA buttons
    items: [
      {
        image: {
          src: "/images/yaris-cross/diffrentials/img1.jpg",
          alt: "Ejemplo 1",
        },
        title: "Eficiencia híbrida",
        description:
          "Viaja con tranquilidad gracias al sistema híbrido de Toyota. Los motores híbridos garantizan un rendimiento dinámico y una eficiencia excepcional desde el primer momento.",
      },
      {
        image: {
          src: "/images/yaris-cross/diffrentials/img2.jpg",
          alt: "Ejemplo 2",
        },
        title: "Diseño Moderno",
        description:
          "Estilo exterior aventurero combinado con un interior cómodo y versátil: Este es un crosover con grandes ambiciones.",
      },
      {
        image: {
          src: "/images/yaris-cross/diffrentials/img3.jpg",
          alt: "Seguridad avanzada",
        },
        title: "Seguridad avanzada",
        description:
          "Yaris Cross tiene la tecnología para mantenerte seguro, monitoreando constantemente el entorno de conducción y alertándote sobre posibles riesgos. *Varia según versión",
      },
    ],
  };
  const vehicleNavigationData = {
    vehicleName: "YARIS CROSS",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "YARIS CROSS XS 1.5 HEV 4X2 E-CVT",
            href: "/vehiculos/hibridos/yaris-cross/version/xs-1-5-hev-4-x-2-e-cvt",
          },
          {
            label: "YARIS CROSS XLS 1.5 HEV 4X2 E-CVT",
            href: "/vehiculos/hibridos/yaris-cross/version/xls-1-5-hev-4-x-2-e-cvt",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/hibridos/yaris-cross/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/hibridos/yaris-cross/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/hibridos/yaris-cross/galeria#360",
          },
        ],
      },
      {
        title: "Accesorios",
        redirect: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
      },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
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
        redirect: "/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf",
      },
    ],
  };

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
              imageMobile: "/images/29-interna-del-vehiculo-yaris-cross.png",
              imageDesktop: "/images/yaris-cross/hero-banner/hero.jpg",
              alt: "Yaris cross",
            },
          ]}
          features={bannerFeatures}
          title="Yaris Cross"
          price="Desde  $132.900.000*"
        />
      </View>
      <VehicleShortcuts
        technicalSpecs="/images/pdf/FT-Toyota-Yaris-Cross-2026.pdf"
        customSlug="yaris-cross"
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
            El Yaris Cross fusiona diseño, confort y calidad con la tecnología
            híbrida de Toyota, combinando motores de combustión y eléctrico para
            una experiencia de conducción única.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"5.063rem"}
          >
            El Yaris Cross fusiona diseño, confort y calidad con la tecnología
            <br /> híbrida de Toyota, combinando motores de combustión y <br />{" "}
            eléctrico para una experiencia de conducción única.
          </Text>
        )}
        <SectionTitle
          title={"Yaris Cross"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Kilómetros de eficiencia en cada viaje"}
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
          yearList={dynamicYearList}
          placeholder="2026"
          price={" $132.900.000"}
          onClick={handleExploreClick}
          onColorChange={setGalleryCurrentColor}
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
          title={"Yaris Cross"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Encuentra tu versión"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <VehicleCardList vehicles={vehicles} slug="yaris-cross" />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
      >
        <SectionTitle
          title={"YARIS CROSS"}
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
      <Container
        padding={{ base: "3rem 0 5.25rem", xl: "3.06rem 0 7.3125rem" }}
      >
        <SectionTitle
          title={"Garantía"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Beneficios de tener un Toyota"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        {/* <Guarantees imageSrc="/images/logos-garantia-610x320mesa-de-trabajo-1-1024x537.png" imageAlt="Garantía Extendida" /> */}
        <Guarantees
          imageSrc="/images/logos-garantia-610x320mesa-de-trabajo-1-1024x537.png"
          imageAlt="Garantía Personalizada"
          title="8 Años de Garantía<br/>o 160.000KM"
          description="*La Garantía Sistema Híbrido aplica únicamente para los vehículos que hayan cumplido con el total de los mantenimientos periódicos establecidos en el manual de propietario con revisión inicial a los 30 días o 1.000 km. de recorrido, lo primero que se cumpla y posteriormente con todos los mantenimientos periódicos establecidos cada 5.000 km. a partir de los 5.000 km. (5.000 km., 10.000 km., 15.000 km., etc.) y hayan realizado el reemplazo del filtro de aire de la batería Híbrida cada 10.000 km.  La garantía Toyota Híbrida tiene una cobertura de 8 años o 160.000 Km.*(lo primero que ocurra)."
        />

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
                  *La Garantía Sistema Híbrido aplica únicamente para los
                  vehículos que hayan cumplido con el total de los
                  mantenimientos periódicos establecidos en el manual de
                  propietario con revisión inicial a los 30 días o 1.000 km. de
                  recorrido, lo primero que se cumpla y posteriormente con todos
                  los mantenimientos periódicos establecidos cada 5.000 km. a
                  partir de los 5.000 km. (5.000 km., 10.000 km., 15.000 km.,
                  etc.) y hayan realizado el reemplazo del filtro de aire de la
                  batería Híbrida cada 10.000 km.
                </Text>

                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  fontSize={{ base: "12px", xl: "16px" }}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  lineHeight={{ base: "normal", xl: "30.4px" }}
                >
                  La garantía Toyota Híbrida tiene una cobertura de 8 años o
                  160.000 Km.*(lo primero que ocurra).
                </Text>
              </Flex>
            </Flex>
          </View>
        </View>
      </Container>
    </View>
  );
}
