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
    downloadUrl: "/images/pdf/FT-Corolla-Cross-2025.pdf",
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
      iconPath: "/images/vehicle-colors/hd/azul-zafiro.png",
      imagePath: ["/images/corolla-cross/versions/Azul-oscuro-metalico.png"],
      name: "Azul Oscuro Metálico",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/platinum-white-pearl.png",
      imagePath: [
        "/images/corolla-cross/versions/Blanco-perlado-metalizado.png",
      ],
      name: "Blanco perla metalizado",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/gray-me.png",
      imagePath: ["/images/corolla-cross/versions/Gris-metalico.png"],
      name: "Gris Metálico",
      priority: 3,
    },
    {
      id: "4",
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: ["/images/corolla-cross/versions/Negro-Mica.png"],
      name: "Negro mica",
      priority: 4,
    },
    {
      id: "5",
      iconPath: "/images/vehicle-colors/hd/silver-mm.png",
      imagePath: ["/images/corolla-cross/versions/Plata.png"],
      name: "Plata",
      priority: 5,
    },
    {
      id: "6",
      iconPath: "/images/vehicle-colors/hd/red-mc.png",
      imagePath: ["/images/corolla-cross/versions/Rojo-mica.png"],
      name: "Rojo Mica Metálico",
      priority: 6,
    },
    {
      id: "7",
      iconPath: "/images/vehicle-colors/hd/super-white.png",
      imagePath: ["/images/corolla-cross/versions/Super-blanco.png"],
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
    galleryLink:
      "/vehiculos/hibridos/corolla-cross/version/seg-1-8-hev/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/corolla-cross/exterior/ex1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/exterior/ex2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/exterior/ex3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/exterior/ex4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/exterior/ex5.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/exterior/ex6.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/exterior/ex7.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/exterior/ex8.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/corolla-cross/interior/in1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/interior/in2.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/interior/in3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/interior/in4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/corolla-cross/interior/in5.jpg",
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
    vehicleName: "COROLLA CROSS SEG 1.8 HEV 4X2 E-CVT",
    modelName: "COROLLA CROSS SEG HEV",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-COROLLA-CROSS-2026.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "COROLLA CROSS XEI 1.8 HEV 4X2 E-CVT",
            href: "/vehiculos/hibridos/corolla-cross/version/xei-1-8-hev",
          },
          {
            label: "COROLLA CROSS SEG 1.8 HEV 4X2 E-CVT",
            href: "/vehiculos/hibridos/corolla-cross/version/seg-1-8-hev",
          },
          {
            label: "COROLLA CROSS SEG 2.0 GASOLINA 4X2 CVT",
            href: "/vehiculos/hibridos/corolla-cross/version/seg-2-0-gasolina",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-COROLLA-CROSS-2026.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/hibridos/corolla-cross/version/seg-1-8-hev/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/hibridos/corolla-cross/version/seg-1-8-hev/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/hibridos/corolla-cross/version/seg-1-8-hev/galeria#360",
          },
        ],
      },
      {
        title: "Accesorios",
        redirect: "/images/pdf/FT-COROLLA-CROSS-2026.pdf",
      },
      {
        title: "Materiales Descargables",
        links: [
          {
            label: "Ficha Técnica",
            href: "/images/pdf/FT-COROLLA-CROSS-2026.pdf",
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
        redirect: "/images/pdf/FT-COROLLA-CROSS-2026.pdf",
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
              imageMobile: "/images/27-interna-del-vehiculo-corolla-cross.png",
              imageDesktop: "/images/corolla-cross/hero-banner/banner.jpg",
              alt: "COROLLA CROSS SEG 1.8 HEV 4X2 E-CVT",
            },
          ]}
          features={bannerFeatures}
          title="COROLLA CROSS SEG 1.8 HEV 4X2 E-CVT"
          price="Desde $154.900.000*"
        />
      </View>

      <VehicleShortcuts technicalSpecs="/images/pdf/FT-Corolla-Cross-2025.pdf" />

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
            El Corolla Cross combina estilo y funcionalidad. Su diseño moderno y
            detalles interiores ofrecen una experiencia de manejo cómoda y
            segura, ideal para la ciudad.
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"5.063rem"}
          >
            El Corolla Cross combina estilo y funcionalidad. Su diseño moderno y
            detalles
            <br />
            interiores ofrecen una experiencia de manejo cómoda y segura,
            <br />
            ideal para la ciudad.
          </Text>
        )}
        <SectionTitle
          title={"COROLLA CROSS SEG 1.8 HEV 4X2 E-CVT"}
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
          price={"$154.900.000"}
          slug="corolla-cross"
        />
      </Container>
      <Container
        padding={{ base: "3.75rem 0 3.125rem", xl: "7.125rem 0 5.5rem" }}
        backgroundColor="#272329"
      >
        <GeneralEspecs
          specsData={specsData}
          heading="Corolla Cross "
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
          title={"COROLLA SEG 1.8 HEV 4X2 E-CVT"}
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
