"use client";

import BannerWithVideo, {
  BannerFeature,
} from "@/components/Banner/BannerWithVideo";
import VehicleCardList from "@/components/CardsList/VehiclesCardList/VehiclesCardList";
import Gallery360 from "@/components/Gallery/Gallery360/Gallery360";
import {
  ImageGalleryPreview,
  ImageGalleryPreviewProps,
} from "@/components/Gallery/ImageGalleryPreview/ImageGalleryPreview";
import Guarantees from "@/components/Guarantees/Guarantees";
import Container from "@/components/Layout/Container/Container";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import MaterialCards, {
  MaterialCard,
} from "@/components/MaterialCards/MaterialCards";
import {
  SliderSection,
  SliderSectionProps,
  SliderSectionTheme,
} from "@/components/SliderSection/SliderSection";
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
import "./page.css";
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
    downloadUrl: "/images/pdf/FT-FORTUNER 2025.pdf",
  },
  {
    title: "Manual del buen conductor",
    imageSrc: "/images/icons/car.svg",
    alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad",
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

type FortunerVehicle = {
  imageSrc: string;
  title: string;
  price: string;
  description: string;
  buttonText: string;
  version: string;
  link: string;
  modelName: string;
};

export default function FortunerClientPage() {
  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/images/vehicle-colors/hd/gris-oscuro.png",
      imagePath: ["/images/fortuner/versiones/Gris-metalico.png"],
      name: "Gris metálico",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: ["/images/fortuner/versiones/Negro-mica.png"],
      name: "Negro Mica",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/platinum-white-pearl.png",
      imagePath: ["/images/fortuner/versiones/Blanco-perla-metalizado.png"],
      name: "Blanco Perla Metalizado",
      priority: 3,
    },
    {
      id: "4",
      iconPath: "/images/vehicle-colors/hd/silver-mm.png",
      imagePath: ["/images/fortuner/versiones/Plata-metalico.png"],
      name: "Plata metálico",
      priority: 4,
    },
    {
      id: "5",
      iconPath: "/images/vehicle-colors/hd/super-white.png",
      imagePath: ["/images/fortuner/versiones/Super-Blanco.png"],
      name: "Súper Blanco",
      priority: 5,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const initialVehicles = [
    {
      imageSrc: "/images/fortuner/versiones/Super-Blanco.png",
      title: "FORTUNER SR 2.8 DIESÉL 4X2 AT",
      modelName: "FORTUNER SR 4X2 DIÉSEL 2.8",
      version: "FORTUNER SR 4X2 DIESEL 2.4",
      price: "$239.900.000",
      description:
        "La Fortuner Diésel combina un rendimiento robusto con una estructura duradera, perfecta para aventuras exigentes.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/camionetas/fortuner/version/sr-2-8-diesel-4-x-2-at",
    },
    {
      imageSrc:
        "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/attitude-black.png",
      title: "FORTUNER SRV 2.8 DIÉSEL 4X2 AT",
      modelName: "FORTUNER SRV 4X2 DIÉSEL 2.8",
      version: "FORTUNER SRV 4X2 DIESEL 2.4",
      price: "$287.900.000",
      description:
        "La Fortuner Diésel combina un rendimiento robusto con una estructura duradera, perfecta para aventuras exigentes.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-2-at",
    },
    {
      imageSrc:
        "/images/fortuner/versiones/srv-2-7-gasolina-4-x-2-at/plata.png",
      title: "FORTUNER SRV 2.7 GASOLINA 4X2 AT",
      modelName: "FORTUNER SRV 4X2 GASOLINA 2.7",
      version: "FORTUNER SRV 4X2 GASOLINA 2.7",
      price: "$243.500.000",
      description:
        "Con la Fortuner Gasolina, disfruta de una conducción segura y versátil, equipada con tecnología avanzada y sistemas de seguridad.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/camionetas/fortuner/version/srv-2-7-gasolina-4-x-2-at",
    },
    {
      imageSrc:
        "/images/fortuner/versiones/fortuner-sr-28-dsl-4x4-super-blanco.png",
      title: "FORTUNER SR 2.8 DIÉSEL 4X4 AT",
      modelName: "FORTUNER SR 4X4 DIÉSEL 2.8",
      version: "FORTUNER SR 4X4 DIESEL 2.8",
      price: "$290.900.000",
      description:
        "La Fortuner Diésel combina un rendimiento robusto con una estructura duradera, perfecta para aventuras exigentes.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/camionetas/fortuner/version/sr-2-8-diesel-4-x-4-at",
    },
    {
      imageSrc:
        "/images/fortuner/versiones/srv-2-8-diesel-4-x-4-at/gris-met.png",
      title: "FORTUNER SRV 2.8 DIÉSEL 4X4 AT",
      modelName: "FORTUNER SRV 4X4 DIÉSEL 2.8",
      version: "FORTUNER SRV 4X4 DIESEL 2.8",
      price: "$329.500.000",
      description:
        "La Fortuner Diésel combina un rendimiento robusto con una estructura duradera, perfecta para aventuras exigentes.",
      buttonText: "Explorar esta versión",
      link: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-4-at",
    },
  ];
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);
  const [vehicles, setVehicles] = useState<FortunerVehicle[]>(initialVehicles);
  const [apiPrices, setApiPrices] = useState<any[]>([]);
  const [galleryPrice, setGalleryPrice] = useState<string>("");

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
    galleryLink: "/vehiculos/camionetas/fortuner/galeria",
    tabs: [
      {
        title: "Exterior",
        items: [
          {
            src: "/images/fortuner/exteriores/FORTUNER8.jpg",
            alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER10.jpg",
            alt: "Vista lateral de la camioneta Toyota Fortuner en color gris metálico",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER11.jpg",
            alt: "Foto trasera de la Toyota Fortuner 2025 sobre carretera destapada con vista a la ciudad",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER14.jpg",
            alt: "Camioneta Toyota Fortuner con la puerta trasera abierta mostrando la capacidad para 7 pasajeros y maletero",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER-1.jpg",
            alt: "Garantía Toyota de 5 años o 120.000 km destacada para el modelo Fortuner",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER-3.jpg",
            alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37054.jpg",
            alt: "Vista lateral de la camioneta Toyota Fortuner en color gris metálico",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37066.jpg",
            alt: "Camioneta Toyota Fortuner con la puerta trasera abierta mostrando la capacidad para 7 pasajeros y maletero",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37074.jpg",
            alt: "Garantía Toyota de 5 años o 120.000 km destacada para el modelo Fortuner",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37078.jpg",
            alt: "Foto trasera de la Toyota Fortuner 2025 sobre carretera destapada con vista a la ciudad",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37080.jpg",
            alt: "Vista lateral de la camioneta Toyota Fortuner en color gris metálico",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37086.jpg",
            alt: "Garantía Toyota de 5 años o 120.000 km destacada para el modelo Fortuner",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37090.jpg",
            alt: "Vista lateral de la camioneta Toyota Fortuner en color gris metálico",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37229.jpg",
            alt: "Garantía Toyota de 5 años o 120.000 km destacada para el modelo Fortuner",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37246.jpg",
            alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37255.jpg",
            alt: "Foto trasera de la Toyota Fortuner 2025 sobre carretera destapada con vista a la ciudad",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37260.jpg",
            alt: "Garantía Toyota de 5 años o 120.000 km destacada para el modelo Fortuner",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37274.jpg",
            alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad",
          },
          {
            src: "/images/fortuner/exteriores/FORTUNER_7R37276.jpg",
            alt: "Garantía Toyota de 5 años o 120.000 km destacada para el modelo Fortuner",
          },
        ],
      },
      {
        title: "Interior",
        items: [
          {
            src: "/images/fortuner/interiores/FORTUNER5.jpg",
            alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad", // Image 1 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER6.jpg",
            alt: "Vista lateral de la camioneta Toyota Fortuner en color gris metálico", // Image 2 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER7.jpg",
            alt: "Foto trasera de la Toyota Fortuner 2025 sobre carretera destapada con vista a la ciudad", // Image 3 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER-4.jpg",
            alt: "Camioneta Toyota Fortuner con la puerta trasera abierta mostrando la capacidad para 7 pasajeros y maletero", // Image 4 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37104.jpg",
            alt: "Garantía Toyota de 5 años o 120.000 km destacada para el modelo Fortuner", // Image 5 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37126.jpg",
            alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad", // Image 6 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37130.jpg",
            alt: "Vista lateral de la camioneta Toyota Fortuner en color gris metálico", // Image 7 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37141.jpg",
            alt: "Foto trasera de la Toyota Fortuner 2025 sobre carretera destapada con vista a la ciudad", // Image 8 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37146.jpg",
            alt: "Camioneta Toyota Fortuner con la puerta trasera abierta mostrando la capacidad para 7 pasajeros y maletero", // Image 9 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37149.jpg",
            alt: "Garantía Toyota de 5 años o 120.000 km destacada para el modelo Fortuner", // Image 10 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37163.jpg",
            alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad", // Image 11 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37176.jpg",
            alt: "Vista lateral de la camioneta Toyota Fortuner en color gris metálico", // Image 12 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37223.jpg",
            alt: "Foto trasera de la Toyota Fortuner 2025 sobre carretera destapada con vista a la ciudad", // Image 13 alt text
          },
          {
            src: "/images/fortuner/interiores/FORTUNER_7R37226.jpg",
            alt: "Camioneta Toyota Fortuner con la puerta trasera abierta mostrando la capacidad para 7 pasajeros y maletero", // Image 14 alt text
          },
        ],
      },
    ],
  };

  const dynamicYearList = [{ label: "2026", value: "2026" }];

  const sliderData: SliderSectionProps = {
    theme: SliderSectionTheme.Dark,
    Bgcolor: "",
    title: isMobile ? "Diferenciales" : "Razones para tener una Fortuner",
    description: isMobile ? "Razones para tener una Fortuner" : "Diferenciales",
    showImageReference: false, // Enable the reference text
    showButton: false, // Add this line to show the CTA buttons
    minHeight: {
      base: "330px",
      medium: "330px",
      xl: "330px",
      xxl: "330px",
    },
    items: [
      // {
      //   image: {
      //     src: "/images/fortuner/servicios-conectados.png",
      //     alt: "Ejemplo 1",
      //   },
      //   title: "Servicios conectados",
      //   description:
      //     "Accede a toda la información de tu vehículo en la app de Toyota. Control, seguridad y conectividad en un solo lugar. *",
      // },
      {
        image: {
          src: "/images/fortuner/FORTUNER-3.jpg",
          alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad",
        },
        title: "Capacidad de pasajeros",
        description:
          "Capacidad para 7 pasajeros, ideal para familias grandes o grupos, con amplio espacio interior.",
      },
      {
        image: {
          src: "/images/fortuner/FORTUNER5.jpg",
          alt: "Vista lateral de la camioneta Toyota Fortuner en color gris metálico",
        },
        title: "Conectividad",
        description:
          "Incluye conectividad para Apple CarPlay y Android Auto, mejorando la experiencia de manejo.",
      },
    ],
  };

  const vehicleNavigationData = {
    vehicleName: "Fortuner",
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
            href: "/vehiculos/camionetas/fortuner/galeria#exterior",
          },
          {
            label: "Interior",
            href: "/vehiculos/camionetas/fortuner/galeria#interior",
          },
          {
            label: "Vistas 360",
            href: "/vehiculos/camionetas/fortuner/galeria#360",
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

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/prices");
        if (!res.ok) throw new Error("Failed to fetch prices");

        type PriceItem = {
          MODELO: string;
          VERSION?: string;
          ACTIVO: string;
          ANIOMODELO: string;
          PRECIO: string;
        };

        const data: PriceItem[] = await res.json();
        console.log("fortuner data:", data);

        setApiPrices(data);

        // Normalize function
        const normalize = (str: string) =>
          str
            .replace(/[\s\u00A0\u200B]+/g, " ")
            .trim()
            .toUpperCase();

        // Simplify version to compare key parts ignoring word order
        const simplifyVersion = (str: string) => {
          const normalized = normalize(str);
          const match = normalized.match(
            /(\d\.\d)|DIESEL|GASOLINA|4X2|4X4|SRV|SR|AT|MT/gi
          );
          return match ? match.join(" ") : normalized;
        };

        // Update vehicles with API prices
        const updatedVehicles = vehicles.map((v) => {
          const match = data.find(
            (item) =>
              simplifyVersion(item.VERSION ?? item.MODELO) ===
              simplifyVersion(v.version)
          );

          return match
            ? {
                ...v,
                price: `$${Number(match.PRECIO).toLocaleString("es-CO")}`,
              }
            : v;
        });

        // Filter active Fortuner items
        const fortunerItems = data.filter(
          (item) =>
            normalize(item.MODELO) === "FORTUNER" && item.ACTIVO === "true"
        );

        // Find latest year with lowest price
        let best: { year: number; price: number } | null = null;
        for (const item of fortunerItems) {
          const year = Number(item.ANIOMODELO);
          const price = Number(item.PRECIO);
          if (
            !best ||
            year > best.year ||
            (year === best.year && price < best.price)
          ) {
            best = { year, price };
          }
        }

        if (best) {
          setGalleryPrice(`$${best.price.toLocaleString("es-CO")}`);
        }

        setVehicles(updatedVehicles);
      } catch (err) {
        console.error("Error fetching prices:", err);
      }
    };

    fetchPrices();
  }, [vehicles]);

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
              alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad",
            },
          ]}
          features={bannerFeatures}
          title="Fortuner"
          price={galleryPrice ? `Desde ${galleryPrice}` : "Desde $239.900.000*"}
        />
      </View>

      <VehicleShortcuts
        technicalSpecs="/images/pdf/FT-FORTUNER-1.pdf"
        customSlug="fortuner"
      />

      <Container padding={{ base: "3rem 0", xl: "5.125rem 0" }}>
        {useBreakpointValue({ base: true, medium: false }) ? (
          <BannerFeatures features={bannerFeatures} />
        ) : (
          <></>
        )}

        {isMobile ? (
          <Text
            as="p"
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
            Su diseño auténtico, delineado por finas formas y detalles, logra un
            balance perfecto entre lo elegante y funcional. Además, ofrece
            suficiente espacio para adaptarse a tus necesidades
          </Text>
        ) : (
          <Text
            as="p"
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"5.063rem"}
          >
            Su diseño auténtico, delineado por finas formas y detalles, logra un
            balance perfecto entre lo elegante y funcional. Además, ofrece
            suficiente espacio para adaptarse a tus necesidades
          </Text>
        )}
        <SectionTitle
          title={"Fortuner"}
          headingAs={1}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitleAs={2}
          subtitle={"La leyenda, de regreso al origen"}
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
          price={galleryPrice ? galleryPrice : "$239.900.000*"}
        />
      </Container>
      <Container padding={{ base: "0", xl: "0" }}>
        <ImageGalleryPreview {...galleryData} />
      </Container>
      <Container
        padding={{ base: "0", xl: "0" }}
        backgroundColor={colors.theme.secondaryBlue}
      >
        <SliderSection headingAs={4} subtitleAs={2} {...sliderData} />;
      </Container>
      <Container
        padding={{ base: "2.3125rem 0 3.5rem", xl: "5.0625rem 0 7rem" }}
      >
        <SectionTitle
          title={
            "Su diseño auténtico, delineado por finas formas y detalles, logra un balance perfecto entre lo elegante y funcional. Además, ofrece suficiente espacio para adaptarse a tus necesidades"
          }
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Encuentra tu versión"}
          subtitleAs={2}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <VehicleCardList vehicles={vehicles} slug="fortuner" />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
      >
        <SectionTitle
          title={"Fortuner"}
          headingAs={2}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Materiales Descargables"}
          subtitleAs={2}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <MaterialCards items={items} />
      </Container>
      <Container
        padding={{ base: "3rem 0 5.25rem", xl: "3.06rem 0 7.3125rem" }}
      >
        <SectionTitle
          title={"Garantía"}
          headingAs={2}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Beneficios de tener un Toyota"}
          subtitleAs={3}
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
                as="h2"
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
