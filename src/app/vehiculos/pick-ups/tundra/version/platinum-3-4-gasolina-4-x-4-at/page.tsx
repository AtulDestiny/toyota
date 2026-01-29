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
import { useModelStore } from "@/providers/model-store-provider";
import { BannerFeatures } from "@/components/BannerFeatures/BannerFeatures";
import { redirect } from "next/navigation";

const specsData = [
  {
    name: "Motorización",
    details: "MOTOR: 3.4L Gasolina Twin Turbo POTENCIA: 389 HP TORQUE: 650 NM",
  },
  {
    name: "Confort",
    details:
      'RADIO: JBL + 14" con Android Auto y Apple CarPlay | CÁMARA: 360° + Cámara en el platón | SUSPENSIÓN: Variable adaptativa',
  },
  {
    name: "Transmisión",
    details: " Automática secuencial (10 velocidades + reversa)",
  },
  {
    name: "Suspensión",
    details: " DELANTERA: Independiente doble horquilla  TRASERA: Multi-Link ",
  },
  {
    name: "Drivetrain",
    details: "4WD PART TIME",
  },
];

const items: MaterialCard[] = [
  {
    title: "Ficha Técnica",
    imageSrc: "/images/icons/paper.svg",
    alt: "paper",
    bgColor: colors.theme.red,
    txtColor: colors.theme.white,
    downloadUrl: "/images/pdf/FT_Tundra.pdf",
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
  redirect("/");
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
      imagePath: ["/images/tundra/versions/azul-osc.png"],
      name: "Azul Oscuro Metálico",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/gray-me.png",
      imagePath: ["/images/tundra/versions/gris-met.png"],
      name: "Gris Metálico",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: ["/images/tundra/versions/negro-mica.png"],
      name: "Negro Mica",
      priority: 3,
    },
    {
      id: "4",
      iconPath: "/images/vehicle-colors/hd/platinum-white-pearl.png",
      imagePath: ["/images/tundra/versions/perla-met.png"],
      name: "Blanco Perla Metalizado",
      priority: 4,
    },
    {
      id: "5",
      iconPath: "/images/vehicle-colors/hd/silver-mm.png",
      imagePath: ["/images/tundra/versions/plata.png"],
      name: "Plata",
      priority: 5,
    },
    {
      id: "6",
      iconPath: "/images/vehicle-colors/hd/red-mc.png",
      imagePath: ["/images/tundra/versions/rojo-met.png"],
      name: "Rojo Metalizado",
      priority: 6,
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
      label: "BOLSAS DE AIRE (8)",
      available: true,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);

  const dynamicYearList = [{ label: "2024", value: "2024" }];

  const galleryData: ImageGalleryPreviewProps = {
    title: isMobile
      ? "Galería de Imágenes"
      : "Atrévete a aventurarte más lejos",
    description: isMobile
      ? "Atrévete a aventurarte más lejos"
      : "Galería de Imágenes",
    selectStyles: {
      padding: "9px 24px",
      width: "230px", // or whatever size you need
      fontSize: "1rem",
      height: "48px",
    },
    galleryLink: "/vehiculos/pick-ups/tundra/galeria",
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

  const vehicleNavigationData = {
    vehicleName: "TUNDRA PLATINUM 3.4 GASOLINA 4X4 AT ",
    modelName: "TUNDRA D.C. 4X4 GASOLINA 3.4 AT",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT_Tundra.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "TUNDRA PLATINUM 3.4 GASOLINA 4X4 AT",
            href: "/vehiculos/pick-ups/tundra/version/platinum-3-4-gasolina-4-x-4-at",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT_Tundra.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/pick-ups/tundra/version/platinum-3-4-gasolina-4-x-4-at/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/pick-ups/tundra/version/platinum-3-4-gasolina-4-x-4-at/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/pick-ups/tundra/version/platinum-3-4-gasolina-4-x-4-at/galeria#360",
          },
        ],
      },
      { title: "Accesorios", redirect: "/images/pdf/FT_Tundra.pdf" },
      {
        title: "Materiales Descargables",
        links: [
          { label: "Ficha Técnica", href: "/images/pdf/FT_Tundra.pdf" },
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
      { title: "Garantía", redirect: "/images/pdf/FT_Tundra.pdf" },
    ],
  };

  useEffect(() => {
    setCurrentModelState(vehicleNavigationData.modelName);
  }, []);

  // return (
  //   <View position={isMobile ? "relative" : "static"}>
  //     {isMobile ? (
  //       <VehicleNavigation
  //         vehicleName={vehicleNavigationData.vehicleName}
  //         sections={vehicleNavigationData.sections}
  //       />
  //     ) : null}
  //     <View position="relative">
  //       <BannerWithVideo
  //         slides={[{
  //           imageMobile: "/images/30-interna-del-vehiculo-tundra.png",
  //           imageDesktop: "/images/tundra/banner.jpg",
  //           alt: "TUNDRA PLATINUM 3.4 GASOLINA 4X4 AT",
  //         }}
  //         features={bannerFeatures}
  //         title="TUNDRA PLATINUM 3.4 GASOLINA 4X4 AT"
  //         price="Desde  $432.000.000*"
  //       />
  //     </View>

  //     <VehicleShortcuts technicalSpecs="/images/pdf/FT_Tundra.pdf" />

  //     <Container padding={{ base: "3rem 0", xl: "5.125rem 0" }}>
  //       {useBreakpointValue({ base: true, medium: false }) ? (
  //         <BannerFeatures features={bannerFeatures} />
  //       ) : (
  //         <></>
  //       )}

  //       {isMobile ? (
  //         <Text
  //           fontSize={{ base: "ml", medium: "ml" }}
  //           lineHeight={{ base: "normal" }}
  //           textAlign={"center"}
  //           width={"87%"}
  //           margin={"0 auto"}
  //           marginBottom={"4.125rem"}
  //           style={{
  //             textWrap: "pretty",
  //           }}
  //         >
  //           El diseño frontal con parrilla sólida complementa su estructura y
  //           dimensiones más amplias, acentuando la robustez de su carácter y su
  //           fuerte postura.
  //         </Text>
  //       ) : (
  //         <Text
  //           fontSize={{ xl: "lg" }}
  //           lineHeight={{ xl: "130%" }}
  //           textAlign={"center"}
  //           marginBottom={"8.125rem"}
  //         >
  //           El diseño frontal con parrilla sólida complementa su estructura y
  //           dimensiones más amplias, acentuando la robustez de su carácter y su
  //           fuerte postura.
  //         </Text>
  //       )}
  //       <SectionTitle
  //         title={"TUNDRA PLATINUM 3.4 GASOLINA 4X4 AT"}
  //         titleFontSize={{ base: "sm", xl: "md" }}
  //         subtitle={"Cada destino es mejor en compañía"}
  //         subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
  //       />
  //       <Gallery360
  //         carImages={
  //           dummyColorsList.find(
  //             (color) => color.id === galleryCurrentColor?.id
  //           )?.imagePath || []
  //         }
  //         placesList={dummyPlacesList}
  //         colorsList={dummyColorsList}
  //         detailsPage={true}
  //         onClick={handleExploreClick}
  //         onColorChange={setGalleryCurrentColor}
  //         yearList={dynamicYearList}
  //         placeholder="2024"
  //         price={" $432.000.000"}
  //         slug="tundra"
  //       />
  //     </Container>
  //     <Container
  //       padding={{ base: "3.75rem 0 3.125rem", xl: "7.125rem 0 5.5rem" }}
  //       backgroundColor="#272329"
  //     >
  //       <GeneralEspecs
  //         specsData={specsData}
  //         heading="Tundra"
  //         technicalData={
  //           vehicleNavigationData.sections.find(
  //             (section) => section.title === "Información Ficha Técnica"
  //           )?.redirect
  //         }
  //       />
  //     </Container>
  //     <Container padding={{ base: "0", xl: "0" }}>
  //       <ImageGalleryPreview {...galleryData} />
  //     </Container>
  //     <Container
  //       backgroundColor={colors.theme.blueSecondary}
  //       padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
  //     >
  //       <SectionTitle
  //         title={"TUNDRA PLATINUM 3.4 GASOLINA 4X4 AT"}
  //         titleFontSize={{ base: "sm", xl: "md" }}
  //         subtitle={"Materiales Descargables"}
  //         subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
  //       />
  //       <MaterialCards items={items} />
  //     </Container>
  //     <Container
  //       padding={{ base: "3rem 0 5.25rem", xl: "3.06rem 0 7.3125rem" }}
  //     >
  //       <SectionTitle
  //         title={"Garantía"}
  //         titleFontSize={{ base: "sm", xl: "md" }}
  //         subtitle={"Beneficios de tener un Toyota"}
  //         subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
  //       />
  //       <Guarantees />
  //       <View paddingTop={{ base: "40px", xl: "107px" }}>
  //         <View
  //           style={{ borderTop: "1px solid #E0E0E0" }}
  //           paddingTop={{ base: "40px", xl: "107px" }}
  //           paddingRight={{ base: "0", xl: "155px" }}
  //           paddingLeft={{ base: "0", xl: "155px" }}
  //         >
  //           <Flex direction={"column"} gap={{ base: "24px", xl: "24px" }}>
  //             <Heading
  //               level={2}
  //               fontFamily={"var(--font-toyotaDisplay)"}
  //               fontSize={{ base: "14px", xl: "22px" }}
  //               fontStyle={"normal"}
  //               fontWeight={{ base: "400", xl: "700" }}
  //               lineHeight={{ base: "140%", xl: "127.271%" }}
  //             >
  //               Legales
  //             </Heading>
  //             <Flex direction={"column"} gap={{ base: "14.4px", xl: "30.4px" }}>
  //               <Text
  //                 fontFamily={"var(--font-ToyotaType-Regular)"}
  //                 fontSize={{ base: "12px", xl: "16px" }}
  //                 fontStyle={"normal"}
  //                 fontWeight={"400"}
  //                 lineHeight={{ base: "normal", xl: "30.4px" }}
  //               >
  //                 *Imágenes de referencia. Precio sugerido al público por
  //                 Automotores Toyota Colombia S.A.S a nivel nacional. Para mayor
  //                 información dirija su consulta al concesionario autorizado de
  //                 su preferencia. Estos valores incluyen IVA, Imp. Consumo e
  //                 impuestos internos vigentes, aplicables de acuerdo con el tipo
  //                 de vehículo. Los precios pueden variar según el concesionario
  //                 de la Red Autorizada escogido. Automotores Toyota Colombia
  //                 S.A.S no vende sus productos al público de manera directa y
  //                 por ello, los precios indicados resultan sugeridos al público
  //                 en los Concesionarios Oficiales.
  //               </Text>

  //               <Text
  //                 fontFamily={"var(--font-ToyotaType-Regular)"}
  //                 fontSize={{ base: "12px", xl: "16px" }}
  //                 fontStyle={"normal"}
  //                 fontWeight={"400"}
  //                 lineHeight={{ base: "normal", xl: "30.4px" }}
  //               >
  //                 *La Garantía Toyota aplica únicamente para vehículos nuevos
  //                 importados por Automotores Toyota Colombia S.A.S. (“ATC”),
  //                 comercializados y facturados por los concesionarios de la red
  //                 de ATC. La garantía tiene una cobertura de 5 años contados a
  //                 partir de la fecha de entrega del vehículo al cliente o
  //                 120.000 km., lo primero que ocurra. Los primeros 3 años y/o
  //                 los 100.000 km. iniciales corresponden a la garantía de
  //                 fábrica, los siguientes 2 años y/o los 20.000 km. adicionales,
  //                 corresponden a la garantía suplementaria ofrecida por ATC.
  //               </Text>

  //               {/* <Text
  //                         fontFamily={"var(--font-ToyotaType-Regular)"}
  //                         fontSize={{ base: "12px", xl: "16px" }}
  //                         fontStyle={"normal"}
  //                         fontWeight={"400"}
  //                         lineHeight={{ base: "normal", xl: "30.4px" }}
  //                       >
  //                         ** Verificá la compatibilidad de tu modelo con el fabricante.
  //                       </Text> */}
  //             </Flex>
  //           </Flex>
  //         </View>
  //       </View>
  //     </Container>
  //   </View>
  // );
}
