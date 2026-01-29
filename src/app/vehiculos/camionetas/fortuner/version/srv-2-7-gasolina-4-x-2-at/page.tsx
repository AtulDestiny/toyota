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
  Link,
  Heading,
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

const specsData = [
  {
    name: "Motorización",
    details: " MOTOR: 2.7L Gasolina; POTENCIA: 164 HP; TORQUE: 245 NM",
  },
  {
    name: "Confort",
    details:
      "TAPICERÍA: Cuero; RADIO: 9 con Android Auto y Apple Carplay; ESPEJOS EXTERIORES: Eléctricos",
  },
  {
    name: "Transmisión",
    details: "Automática secuencial (6 velocidades + Reversa)",
  },
  {
    name: "Suspensión",
    details:
      "DELANTERA: Doble horquilla con resortes helicoidales; TRASERA: Multi-Link",
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
    downloadUrl: "/images/pdf/FT-FORTUNER 2025.pdf",
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

type PriceItem = {
  MODELO: string;
  VERSION?: string;
  ACTIVO: string;
  ANIOMODELO: string;
  PRECIO: string;
};
export default function App() {
  const { setCurrentModelState } = useModelStore((state) => state);
  const [galleryPrice, setGalleryPrice] = useState<string>("");

  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/images/vehicle-colors/hd/attitude-black.png",
      imagePath: [
        "/images/fortuner/versiones/srv-2-7-gasolina-4-x-2-at/attitude-black.png",
      ],
      name: "Negro Mica",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/platinum-white-pearl.png",
      imagePath: [
        "/images/fortuner/versiones/srv-2-7-gasolina-4-x-2-at/blanco-perla.png",
      ],
      name: "Blanco perla metalizado",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/gray-me.png",
      imagePath: [
        "/images/fortuner/versiones/srv-2-7-gasolina-4-x-2-at/gris-met.png",
      ],
      name: "Gris metálico",
      priority: 3,
    },
    {
      id: "4",
      iconPath: "/images/vehicle-colors/hd/silver-mm.png",
      imagePath: [
        "/images/fortuner/versiones/srv-2-7-gasolina-4-x-2-at/plata.png",
      ],
      name: "Plata Metálico",
      priority: 4,
    },
    {
      id: "5",
      iconPath: "/images/vehicle-colors/hd/super-white.png",
      imagePath: [
        "/images/fortuner/versiones/srv-2-7-gasolina-4-x-2-at/super-blanco.png",
      ],
      name: "Súper Blanco",
      priority: 5,
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
      available: false,
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
      "/vehiculos/camionetas/fortuner/version/srv-2-7-gasolina-4-x-2-at/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/fortuner/exteriores/FORTUNER8.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER10.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER11.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER14.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER-1.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER-3.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37054.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37066.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37074.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37078.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37080.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37086.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37090.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37229.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37246.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37255.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37260.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37274.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37276.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/fortuner/interiores/FORTUNER5.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER6.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER7.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER-4.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37104.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37126.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37130.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37141.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37146.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37149.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37163.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37176.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37223.jpg",
            alt: "Título de la imagen",
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37226.jpg",
            alt: "Título de la imagen",
          },
        ],
      },
    ],
  };

  const vehicleNavigationData = {
    vehicleName: "FORTUNER SRV 2.7 GASOLINA 4X2 AT",
    modelName: "FORTUNER SRV 4X2 GASOLINA 2.7",
    sections: [
      {
        title: "Información Ficha Técnica",
        redirect: "/images/pdf/FT-FORTUNER-1.pdf",
      },
      {
        title: "Versiones",
        links: [
          {
            label: "FORTUNER SR 2.8 DIÉSEL 4X2 AT",
            href: "/vehiculos/camionetas/fortuner/version/sr-2-8-diesel-4-x-2-at",
          },
          {
            label: "FORTUNER SRV 2.8 DIÉSEL 4X2 AT",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-2-at",
          },
          {
            label: "FORTUNER SRV 2.7 GASOLINA 4X2 AT",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-7-gasolina-4-x-2-at",
          },
          {
            label: "FORTUNER SR 2.8 DIÉSEL 4X4 AT",
            href: "/vehiculos/camionetas/fortuner/version/sr-2-8-diesel-4-x-4-at",
          },
          {
            label: "FORTUNER SRV 2.8 DIÉSEL 4X4 AT",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-4-at",
          },
        ],
      },
      {
        title: "Especificaciones Generales",
        links: [
          {
            label: "Especificaciones completas",
            href: "/images/pdf/FT-FORTUNER-1.pdf",
          },
        ],
      },
      {
        title: "Galería",
        links: [
          {
            label: "Exterior",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-7-gasolina-4-x-2-at/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-7-gasolina-4-x-2-at/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/camionetas/fortuner/version/srv-2-7-gasolina-4-x-2-at/galeria#360",
          },
        ],
      },
      { title: "Accesorios", redirect: "/images/pdf/FT-FORTUNER-1.pdf" },
      {
        title: "Materiales Descargables",
        links: [
          { label: "Ficha Técnica", href: "/images/pdf/FT-FORTUNER 2025.pdf" },
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
      { title: "Garantía", redirect: "/images/pdf/FT-FORTUNER-1.pdf" },
    ],
  };

  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);

  useEffect(() => {
    setCurrentModelState(vehicleNavigationData.modelName);
  }, []);

  // useEffect(() => {
  //   const fetchVehiclePrices = async () => {
  //     try {

  //       const normalize = (str: string) =>
  //         str
  //           .replace(/[\s\u00A0\u200B]+/g, " ")
  //           .trim()
  //           .toUpperCase();

  //       const res = await fetch("/api/prices");
  //       if (!res.ok) throw new Error("Failed to fetch prices");

  //       const data: PriceItem[] = await res.json();

  //       const targetModel = normalize(vehicleNavigationData.modelName);

  //       data.forEach((item) => {
  //         const normalizedVersion = normalize(item.VERSION ?? "");

  //         const apiVersionNormalized = normalize(item.VERSION ?? "");
  //         const targetModelNormalized = normalize(vehicleNavigationData.modelName);

  //         if (apiVersionNormalized === targetModelNormalized) {
  //           console.log("MATCH FOUND!", item);

  //           // Convert string price to number
  //           const priceNumber = Number(item.PRECIO);

  //           if (!isNaN(priceNumber)) {
  //             setGalleryPrice(`$${priceNumber.toLocaleString("es-CO")}`);
  //           } else {
  //             console.warn("Invalid price for item:", item);
  //           }
  //         }
  //       });
  //       // Normalize spaces to remove hidden non-breaking characters

  //       // Filter active items for the current vehicle
  //       const relevantItems = data.filter(
  //         (item) =>
  //           item.ACTIVO === "true" &&
  //           normalize(item.MODELO) === normalize("FORTUNER") &&
  //           normalize(item.VERSION ?? "") === normalize(vehicleNavigationData.modelName) // fallback to ""
  //       );

  //       if (!relevantItems.length) {
  //         console.warn("No active vehicle prices found for:", vehicleNavigationData.modelName);
  //       }

  //       // Find the latest year with lowest price
  //       const best = relevantItems.reduce<{ year: number; price: number } | null>(
  //         (acc, item) => {
  //           const year = Number(item.ANIOMODELO);
  //           const priceValue = Number(item.PRECIO);

  //           if (!acc) return { year, price: priceValue };

  //           if (year > acc.year) return { year, price: priceValue };
  //           if (year === acc.year && priceValue < acc.price) return { year, price: priceValue };

  //           return acc;
  //         },
  //         null
  //       );

  //       if (best) {
  //         setGalleryPrice(`$${best.price.toLocaleString("es-CO")}`);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching vehicle prices:", err);
  //     }
  //   };

  //   fetchVehiclePrices();
  // }, [vehicleNavigationData.modelName]);
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
              imageMobile: "/images/fortuner/FORTUNER10.jpg",
              imageDesktop: "/images/fortuner/FORTUNER10.jpg",
              alt: "Fortuner SRV 2.7 GASOLINA 4X2 AT",
            },
          ]}
          features={bannerFeatures}
          title="Fortuner SRV 2.7 GASOLINA 4X2 AT"
          price="Desde  $243.500.000*"
        />
      </View>

      <VehicleShortcuts technicalSpecs={"/images/pdf/FT-FORTUNER-AT.pdf"} />

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
            Su diseño auténtico, delineado por finas formas y detalles, logra un
            balance perfecto entre lo elegante y funcional. Además, ofrece
            suficiente espacio para adaptarse a tus necesidades
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"8.125rem"}
          >
            Su diseño auténtico, delineado por finas formas y detalles, logra un
            balance perfecto entre lo elegante y funcional. Además, ofrece
            suficiente espacio para adaptarse a tus necesidades
          </Text>
        )}
        <SectionTitle
          title={"Fortuner SRV 2.7 GASOLINA 4X2 AT"}
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
          price=" $243.500.000"
          slug="fortuner"
        />
      </Container>
      <Container
        padding={{ base: "3.75rem 0 3.125rem", xl: "7.125rem 0 5.5rem" }}
        backgroundColor="#272329"
      >
        <GeneralEspecs
          specsData={specsData}
          heading="Fortuner "
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
          title={"Fortuner SRV 2.7 GASOLINA 4X2 AT"}
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
