"use client";

import BannerWithVideo, {
  BannerFeature,
} from "@/components/Banner/BannerWithVideo";
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
import { useModelStore } from "@/providers/model-store-provider";
import { BannerFeatures } from "@/components/BannerFeatures/BannerFeatures";

const specsData = [
  {
    name: "Motorización",
    details:
      "MOTOR: 1.8L Híbrido POTENCIA COMBINADA:121 HP  TORQUE MOTOR ELÉCTRICO: 163 NM",
  },
  {
    name: "Confort",
    details:
      "ESPEJO EXTERIOR: Eléctrico RADIO: 10 con Android Auto y Apple Carplay Encendido por botón",
  },
  {
    name: "Transmisión",
    details: "  E-CVT",
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
    downloadUrl: "/images/pdf/FT-COROLLA-SEDAN-1.pdf",
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
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: ["/images/corolla/versions/seg/negro-mica.png"],
      name: "Negro",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/celestite.png",
      imagePath: ["/images/corolla/versions/seg/celestite-gray.png"],
      name: "Gris Celeste",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/gray-me.png",
      imagePath: ["/images/corolla/versions/seg/gris-met.png"],
      name: "Gris Metálico",
      priority: 3,
    },
    {
      id: "4",
      iconPath: "/images/vehicle-colors/hd/platinum-white-pearl.png",
      imagePath: ["/images/corolla/versions/seg/blanco-perla.png"],
      name: "Blanco Perla Metalizado",
      priority: 4,
    },
    {
      id: "5",
      iconPath: "/images/vehicle-colors/hd/red-mc.png",
      imagePath: ["/images/corolla/versions/seg/rojo-met.png"],
      name: "Rojo Mica Metálico",
      priority: 5,
    },
    {
      id: "6",
      iconPath: "/images/vehicle-colors/hd/plata-metalico.png",
      imagePath: ["/images/corolla/versions/seg/plata-met.png"],
      name: "Plata metálico",
      priority: 6,
    },
    {
      id: "7",
      iconPath: "/images/vehicle-colors/hd/super-white.png",
      imagePath: ["/images/corolla/versions/seg/super-blanco.png"],
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
    galleryLink: "/vehiculos/hibridos/corolla/version/seg-1-8-hev/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/corolla/exterior/SEG/cr1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/exterior/SEG/cr2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/exterior/SEG/cr3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/exterior/SEG/cr4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/exterior/SEG/cr5.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/exterior/SEG/cr6.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/exterior/SEG/cr7.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/exterior/SEG/cr8.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/exterior/SEG/cr9.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/corolla/interior/SEG/cr1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/interior/SEG/cr2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/interior/SEG/cr3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/interior/SEG/cr4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/interior/SEG/cr5.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/interior/SEG/cr6.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/interior/SEG/cr7.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/interior/SEG/cr8.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla/interior/SEG/cr9.jpg",
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
    vehicleName: "COROLLA SEG 1.8 HEV 4X2 E-CVT",
    modelName: "COROLLA SEG HEV",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-COROLLA-SEDAN-1.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "COROLLA XLI 1.8 HEV 4X2 E-CVT",
            href: "/vehiculos/hibridos/corolla/version/xli-1-8-hev",
          },
          {
            label: "COROLLA XEI 1.8 HEV 4X2 E-CVT",
            href: "/vehiculos/hibridos/corolla/version/xei-1-8-hev",
          },
          {
            label: "COROLLA SEG 1.8 HEV 4X2 E-CVT",
            href: "/vehiculos/hibridos/corolla/version/seg-1-8-hev",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-COROLLA-SEDAN-1.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/hibridos/corolla/version/seg-1-8-hev/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/hibridos/corolla/version/seg-1-8-hev/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/hibridos/corolla/version/seg-1-8-hev/galeria#360",
          },
        ],
      },
      {
        title: "Accesorios",
        redirect: "/images/pdf/FT-COROLLA-SEDAN-1.pdf",
      },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "/images/pdf/FT-COROLLA-SEDAN-1.pdf",
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
        redirect: "/images/pdf/FT-COROLLA-SEDAN-1.pdf",
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
              imageMobile: "/images/26-interna-del-vehiculo-corolla.png",
              imageDesktop: "/images/corolla/hero-banner/banner.jpg",
              alt: "COROLLA SEG 1.8 HEV 4X2 E-CVT",
            },
          ]}
          features={bannerFeatures}
          title="COROLLA SEG 1.8 HEV 4X2 E-CVT"
          price="Desde   $134.900.000*"
        />
      </View>

      <VehicleShortcuts technicalSpecs="/images/pdf/FT-COROLLA-SEDAN-1.pdf" />

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
            Corolla se destaca por ser un vehículo amplio, dándole al conductor
            y sus ocupantes una sensación de confort, donde sobresale la alta
            calidad en sus materiales.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"8.125rem"}
          >
            Corolla se destaca por ser un vehículo amplio, dándole al conductor
            y sus ocupantes una sensación de confort, donde sobresale la alta
            calidad en sus materiales.
          </Text>
        )}
        <SectionTitle
          title={"COROLLA SEG HEV"}
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
          price={" $134.900.000"}
          slug="corolla"
        />
      </Container>
      <Container
        padding={{ base: "3.75rem 0 3.125rem", xl: "7.125rem 0 5.5rem" }}
        backgroundColor="#272329"
      >
        <GeneralEspecs
          specsData={specsData}
          heading="Corolla "
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
          title={"COROLLA SEG HEV"}
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
