import React, { useState, CSSProperties, useEffect } from "react";
import {
  Image,
  Tabs,
  View,
  Flex,
  Text,
  Button as AmplifyButton,
} from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import "@aws-amplify/ui-react/styles.css";
import "./VehiclesTabs.css";
import { Option, Select, SelectTheme } from "../../Layout/Select/Select";
import Button from "../../Layout/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { VehicleCard } from "@/components/Cards/VehicleCard/VehicleCard";
import { ResponsiveStyle } from "@aws-amplify/ui-react";

type VehicleCategory =
  | "Autos"
  | "Camionetas y SUV"
  | "Pick Ups"
  | "Híbridos"
  | "Deportivos TGR";
export enum VehicleCardTheme {
  "dark" = "dark",
  "light" = "light",
}

export interface VehicleCardProps {
  id: number | string;
  setIsOpen?: any;
  setIsvehicleInfo?: any;
  isOnClickEvent?: boolean;
  index?: number;
  theme?: VehicleCardTheme | string;
  name: string;
  titleStyle?: {
    fontSize?: ResponsiveStyle<string>;
    lineHeight?: ResponsiveStyle<string>;
    fontFamily?: ResponsiveStyle<string>;
    fontWeight?: ResponsiveStyle<string | number>;
    color?: ResponsiveStyle<string>;
    fontStyle?: ResponsiveStyle<string>;
  };

  YearandTypeStyle?: {
    fontSize?: ResponsiveStyle<string>;
    lineHeight?: ResponsiveStyle<string>;
    fontFamily?: ResponsiveStyle<string>;
    fontWeight?: ResponsiveStyle<string | number>;
    color?: ResponsiveStyle<string>;
    fontStyle?: ResponsiveStyle<string>;
  };

  descriptionStyle?: {
    fontSize?: ResponsiveStyle<string>;
    lineHeight?: ResponsiveStyle<string>;
    fontWeight?: ResponsiveStyle<string | number>;
    color?: ResponsiveStyle<string>;
    fontStyle?: ResponsiveStyle<string>;
    fontFamily?: ResponsiveStyle<string>;
  };

  priceStyle?: {
    fontSize?: ResponsiveStyle<string>;
    lineHeight?: ResponsiveStyle<string>;
    fontWeight?: ResponsiveStyle<string | number>;
    fontFamily?: ResponsiveStyle<string>;
    color?: ResponsiveStyle<string>;
    fontStyle?: ResponsiveStyle<string>;
  };
  year: string;
  type: string;
  price: string;
  description: string;
  img: string;
  style?: CSSProperties;
  className?: string;
  bgColor?: string;
  color?: string;
  objectPosition?: string;
  link?: string;
  cotizarLink?: string;
  modelName?: string;
  imgMobile?: string;
  onlyCotizar?: boolean;
}
interface VehicleSliderProps {
  data: Record<VehicleCategory, VehicleCardProps[]>;
}

const vehiclesData: Record<VehicleCategory, VehicleCardProps[]> = {
  Autos: [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "Yaris",
      year: "2026",
      type: "Gasolina",
      price: "$87.900.000 COP",
      description: "Tu primer Toyota",
      img: "/images/vehicle-tabs/Desktop/Yaris (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE YARIS.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/autos/yaris",
      cotizarLink: "/cotizador/yaris",
    },
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Corolla",
      year: "2026",
      type: "Híbrido",
      price: "$109.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla (2).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/hibridos/corolla",
      cotizarLink: "/cotizador/corolla",
    },
    {
      id: 3,
      theme: VehicleCardTheme.dark,
      name: "Corolla GR-S",
      modelName: "Corolla GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$130.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA GR.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/deportivos-tgr/corolla-gr-s",
      cotizarLink: "/cotizador/corolla",
    },
  ],
  "Camionetas y SUV": [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "Fortuner",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "$239.900.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/vehicle-tabs/Desktop/Fortuner (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE FORTUNER.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/camionetas/fortuner",
      cotizarLink: "/cotizador/fortuner",
    },
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser 300",
      year: "2025",
      type: "Gasolina",
      price: "$633.500.000 COP",
      description: "Una presencia robusta",
      img: "/images/vehicle-tabs/Desktop/LC300 (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC300 (1).png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/camionetas/land-cruiser-300",
      cotizarLink: "/cotizador/land-cruiser-300",
    },
    {
      id: 3,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser Prado",
      year: "2025",
      type: "Gasolina / Diésel",
      price: "$303.500.000 COP",
      description: "El legado que abre nuevos caminos",
      img: "/images/vehicle-tabs/Desktop/LC Prado (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC PRADO.png",
      bgColor: "#161B1E",
      objectPosition: "21%",
      link: "/vehiculos/camionetas/land-cruiser-prado",
      cotizarLink: "/cotizador/land-cruiser-prado",
    },
    {
      id: 4,
      theme: VehicleCardTheme.dark,
      name: "Yaris Cross",
      year: "2026",
      type: "Híbrido",
      price: "$132.900.000 COP",
      description: "Kilómetros de eficiencia en cada viaje",
      img: "/images/vehicle-tabs/Desktop/Yaris Cross (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE YARIS CROSS.png",
      bgColor: "#161B1E",
      objectPosition: "unset",
      link: "/vehiculos/hibridos/yaris-cross",
      cotizarLink: "/cotizador/yaris-cross",
    },
    {
      id: 5,
      theme: VehicleCardTheme.dark,
      name: "Corolla Cross",
      year: "2026",
      type: "Híbrido",
      price: "$135.900.000 COP",
      description: "Muévete a tu mejor versión",
      img: "/images/vehicle-tabs/Desktop/Corolla Cross (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA CROSS.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/hibridos/corolla-cross",
      cotizarLink: "/cotizador/corolla-cross",
    },
    {
      id: 6,
      theme: VehicleCardTheme.dark,
      name: "Corolla Cross GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$161.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla Cross GR (1).png",
      imgMobile:
        "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA CROS GR.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/deportivos-tgr/corolla-cross-gr",
      cotizarLink: "/cotizador/corolla-cross",
      modelName: "Corolla Cross GR-S",
    },
    {
      id: 7,
      theme: VehicleCardTheme.dark,
      name: "Fortuner GR-S",
      year: "2026",
      type: "Diésel",
      price: "$335.500.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/vehicle-tabs/Desktop/Fortuner GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE FORTUNER GR.png",
      bgColor: "#161B1E",
      objectPosition: "76%",
      link: "/vehiculos/deportivos-tgr/fortuner-gr-s",
      cotizarLink: "/cotizador/fortuner",
      modelName: "FORTUNER GR-S 4X4 DIÉSEL 2.8",
    },
    {
      id: 8,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser 300 GR-S",
      year: "2025",
      type: "Gasolina",
      price: "$662.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/LC 300 GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC300 GR.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/deportivos-tgr/land-cruiser-300-gr-s",
      cotizarLink: "/cotizador/land-cruiser-300",
      modelName: "LC300 GASOLINA GR-S",
    },
  ],
  "Pick Ups": [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "Hilux",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "$175.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/pick-ups/hilux",
      cotizarLink: "/cotizador/hilux",
    },
    {
      id: 2,
      name: "Hilux Overlander",
      modelName: "HILUX OVERLANDER D.C. 4X4 DIESEL 2.4 MT",
      year: "2026",
      type: "Diésel",
      price: "$234.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux Overlander.png",
      imgMobile:
        "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX OVERLANDER.png",
      bgColor: "#1F2C40",
      objectPosition: "36%",
      link: "/vehiculos/pick-ups/hilux-overlander",
      cotizarLink: "/cotizador/hilux",
    },
    // {
    //   id: 3,
    //   theme: VehicleCardTheme.dark,
    //   name: "Hilux Cargo Max",
    //   year: "2026",
    //   type: "Diésel",
    //   price: "$185.500.000 COP",
    //   description: "Potencia y rendimiento",
    //   img: "/images/vehicle-tabs/Desktop/Hilux CargoMax (1).png",
    //   imgMobile:
    //     "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX CARGOMAX.png",
    //   bgColor: "#29363A",
    //   objectPosition: "38%",
    //   link: "/vehiculos/pick-ups/hilux-cargomax",
    //   cotizarLink: "/cotizador/hilux",
    //   modelName: "HILUX CH. ESTACAS 4X4 DIÉSEL 2.4 MT",
    // },
    {
      id: 4,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser 79",
      year: "2025",
      type: "Gasolina",
      price: "$255.900.000 COP",
      description: "Un ícono de resistencia y durabilidad",
      img: "/images/vehicle-tabs/Desktop/LC 79 (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC 79.png",
      bgColor: "#161B1E",
      objectPosition: "21%",
      link: "/vehiculos/pick-ups/land-cruiser",
      cotizarLink: "/cotizador/land-cruiser",
    },
    // {
    //   id: 5,
    //   theme: VehicleCardTheme.dark,
    //   name: "Tundra",
    //   year: "2024",
    //   type: "Gasolina",
    //   price: "$432.000.000 COP",
    //   description: "Creada para despertar miradas",
    //   img: "/images/vehicle-tabs/Desktop/Tundra (1).png",
    //   imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE TUNDRA (1).png",
    //   bgColor: "#161B1E",
    //   objectPosition: "unset",
    //   link: "/vehiculos/pick-ups/tundra",
    //   cotizarLink: "/cotizador/tundra",
    // },
    {
      id: 6,
      theme: VehicleCardTheme.dark,
      name: "Hilux GR-S",
      year: "2026",
      type: "Diésel",
      price: "$309.500.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX GR.png",
      bgColor: "#1F2C40",
      objectPosition: "21%",
      link: "/vehiculos/deportivos-tgr/hilux-gr-s-iv",
      cotizarLink: "/cotizador/hilux",
      modelName: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT",
    },
  ],
  Híbridos: [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "Corolla",
      year: "2026",
      type: "Híbrido",
      price: "$109.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla (2).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/hibridos/corolla",
      cotizarLink: "/cotizador/corolla",
    },
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Yaris Cross",
      year: "2026",
      type: "Híbrido",
      price: "$132.900.000 COP",
      description: "Kilómetros de eficiencia en cada viaje",
      img: "/images/vehicle-tabs/Desktop/Yaris Cross (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE YARIS CROSS.png",
      bgColor: "#161B1E",
      objectPosition: "unset",
      link: "/vehiculos/hibridos/yaris-cross",
      cotizarLink: "/cotizador/yaris-cross",
    },
    {
      id: 3,
      theme: VehicleCardTheme.dark,
      name: "Corolla Cross",
      year: "2026",
      type: "Híbrido",
      price: "$135.900.000 COP",
      description: "Muévete a tu mejor versión",
      img: "/images/vehicle-tabs/Desktop/Corolla Cross (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA CROSS.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/hibridos/corolla-cross",
      cotizarLink: "/cotizador/corolla-cross",
    },
  ],
  "Deportivos TGR": [
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Corolla GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$130.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA GR.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/deportivos-tgr/corolla-gr-s",
      cotizarLink: "/cotizador/corolla",
      modelName: "Corolla GR-S",
    },
    {
      id: 3,
      theme: VehicleCardTheme.dark,
      name: "Corolla Cross GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$161.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla Cross GR (1).png",
      imgMobile:
        "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA CROS GR.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/deportivos-tgr/corolla-cross-gr",
      cotizarLink: "/cotizador/corolla-cross",
      modelName: "Corolla Cross GR-S",
    },
    {
      id: 4,
      theme: VehicleCardTheme.dark,
      name: "Fortuner GR-S",
      year: "2026",
      type: "Diésel",
      price: "$335.500.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/vehicle-tabs/Desktop/Fortuner GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE FORTUNER GR.png",
      bgColor: "#161B1E",
      objectPosition: "76%",
      link: "/vehiculos/deportivos-tgr/fortuner-gr-s",
      cotizarLink: "/cotizador/fortuner",
      modelName: "FORTUNER GR-S 4X4 DIÉSEL 2.8",
    },
    {
      id: 5,
      theme: VehicleCardTheme.dark,
      name: "Hilux GR-S",
      year: "2026",
      type: "Diésel",
      price: "$309.500.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX GR.png",
      bgColor: "#1F2C40",
      objectPosition: "21%",
      link: "/vehiculos/deportivos-tgr/hilux-gr-s-iv",
      cotizarLink: "/cotizador/hilux",
      modelName: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT",
    },
    {
      id: 6,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser 300 GR-S",
      year: "2025",
      type: "Gasolina",
      price: "$662.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/LC 300 GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC300 GR.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/deportivos-tgr/land-cruiser-300-gr-s",
      cotizarLink: "/cotizador/land-cruiser-300",
      modelName: "LC300 GASOLINA GR-S",
    },
  ],
};

const getCotizarLink = (original: string): string => {
  const overrides: Record<string, string> = {
    "/cotizador/corolla-gr-s": "/cotizador/corolla",
    "/cotizador/corolla-cross-gr-s": "/cotizador/corolla-cross",
    "/cotizador/fortuner-gr-s": "/cotizador/fortuner",
    "/cotizador/hilux-gr-s": "/cotizador/hilux",
    "/cotizador/hilux-cargomax": "/cotizador/hilux",
    "/cotizador/land-cruiser-300-gr-s": "/cotizador/land-cruiser-300",
  };
  return overrides[original] || original;
};

export const VehicleSlider = () => {
  const [tab, setTab] = useState<VehicleCategory>("Camionetas y SUV");
  const [vehicles, setVehicles] = useState<VehicleCardProps[]>(
    vehiclesData[tab]
  );
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const router = useRouter();

  const totalPages = vehicles.length;

  const vehicleCategories: Option[] = Object.keys(vehiclesData).map(
    (category) => ({
      value: category,
      label: category,
    })
  );

  useEffect(() => {
    const fetchAllVehiclePrices = async () => {
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

        const apiData: PriceItem[] = await res.json();

        // Track latest year & lowest price per model
        const latestPrices: Record<string, { year: number; price: number }> =
          {};

        apiData.forEach((item) => {
          const model = item.MODELO?.toUpperCase();
          if (!model || item.ACTIVO !== "true") return;

          const year = Number(item.ANIOMODELO);
          const price = Number(item.PRECIO);

          if (!latestPrices[model]) {
            // first time seeing this model
            latestPrices[model] = { year, price };
          } else {
            const cur = latestPrices[model];
            // Keep most recent year, or lowest price if same year
            if (year > cur.year || (year === cur.year && price < cur.price)) {
              latestPrices[model] = { year, price };
            }
          }
        });

        // Format final prices
        const formattedPrices: Record<string, string> = {};
        Object.entries(latestPrices).forEach(([model, value]) => {
          formattedPrices[model] = `$${value.price.toLocaleString()} COP`;
        });

        // Update vehicles data (all categories)
        (Object.keys(vehiclesData) as VehicleCategory[]).forEach((category) => {
          vehiclesData[category] = vehiclesData[category].map((v) => {
            const key = v.modelName?.toUpperCase() || v.name.toUpperCase();
            return formattedPrices[key]
              ? { ...v, price: formattedPrices[key] }
              : v;
          });
        });

        // Update main vehicle list state
        setVehicles((prev) =>
          prev.map((v) => {
            const key = v.modelName?.toUpperCase() || v.name.toUpperCase();
            return formattedPrices[key]
              ? { ...v, price: formattedPrices[key] }
              : v;
          })
        );
      } catch (err) {
        console.error("Error fetching vehicle prices:", err);
      }
    };

    fetchAllVehiclePrices();
  }, []);

  return (
    <View
      className="vehicles-tabs"
      padding={{ base: "2rem 1rem", xl: "60px 0 80px 0" }}
      backgroundImage={{
        base: "none",
        xl: "linear-gradient(178.06deg, #E7EDF1 52.85%, #F4F7F9 98.36%)",
      }}
    >
      <Text
        fontFamily="var(--font-ToyotaType-Regular)"
        fontSize={{ base: "18px", xl: "lg" }}
        lineHeight="normal"
        textAlign="center"
        fontWeight={400}
        color="black"
      >
        Explorar todos los vehículos
      </Text>
      <Tabs.Container
        defaultValue={tab}
        onValueChange={(value) => {
          setTab(value as unknown as VehicleCategory);

          setVehicles(vehiclesData[value as unknown as VehicleCategory]);
        }}
      >
        <View
          margin="20px auto"
          display={{ base: "block", xl: "none" }}
          maxWidth="230px"
          minHeight={{ base: "48px", xl: "", xxl: "" }}
          maxHeight="48px"
        >
          <Select
            options={vehicleCategories.map((opt) =>
              opt.value === "Camionetas"
                ? { ...opt, label: "Camionetas y SUV" }
                : opt
            )}
            selectedOption={tab ? { value: tab, label: tab } : null}
            onSelect={(selected) => {
              const value = selected?.value;
              setTab(value as unknown as VehicleCategory);

              setVehicles(vehiclesData[value as unknown as VehicleCategory]);
            }}
            theme={SelectTheme.Light}
            customControlStyles={{
              minHeight: "48px",
              textAlign: "center",
              textAlignLast: "center",
            }}
            placeholder="Selecciona una categoría"
          />
        </View>
        <Tabs.List
          justifyContent="center"
          width="max-content"
          direction={{ base: "column", xl: "row" }}
          margin="32px auto 43px"
          value={tab}
          maxWidth={{ base: "", xl: "", xxl: "" }}
          display={{ base: "none", xl: "flex" }}
        >
          {(Object.keys(vehiclesData) as VehicleCategory[]).map((category) => (
            <Tabs.Item
              key={category}
              value={category}
              color="inherit"
              fontSize={{ base: "sm", xl: "18px" }}
              className="tabs__item"
              fontWeight={400}
              fontFamily="var(--font-ToyotaType-Regular)"
              lineHeight={{ xl: "25.67px" }}
              textAlign={{ xl: "center" }}
            >
              {category}
            </Tabs.Item>
          ))}
        </Tabs.List>
        {Object.keys(vehiclesData).map((category) => (
          <Tabs.Panel
            key={category + "1"}
            value={category}
            width={"200%"}
            overflow={{ base: "auto", xl: "visible" }}
            maxWidth={"100%"}
            padding={{ base: "0", xl: "0 0 0 40px" }}
          >
            {vehicles.length > 0 ? (
              <View
                key={category + "2 "}
                maxWidth={{ base: "302px", medium: "100%", xl: "100%" }}
                maxHeight={{
                  base: "fit-content",
                  medium: "max-content",
                  xl: "auto",
                }}
                minHeight={{ base: "505px", medium: "550px", xl: "auto" }}
                margin={{ base: "0 auto", xl: "" }}
                overflow={{ base: "hidden", xl: "" }}
                borderRadius={{ base: "0.5rem" }}
              >
                <Swiper
                  loop={true}
                  slidesPerView={1}
                  centeredSlides={true}
                  spaceBetween={8}
                  slidesOffsetAfter={0}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 16,
                      centeredSlides: false,
                    },
                    768: {
                      // Tablet landscape
                      slidesPerView: 2,
                      spaceBetween: 25,
                      centeredSlides: false,
                    },
                    1024: {
                      // Small desktop
                      slidesPerView: 3,
                      spaceBetween: 30,
                      centeredSlides: false,
                    },
                    1250: {
                      slidesPerView: "auto", // Use auto here!
                      // slidesPerView: 2,
                      spaceBetween: 40,
                      centeredSlides: false,
                    },
                  }}
                  navigation={{
                    nextEl: ".vehicles-tabs-next",
                    prevEl: ".vehicles-tabs-prev",
                  }}
                  onSlideChange={(swiper) =>
                    setCurrentSlide(swiper.realIndex + 1)
                  }
                  modules={[Navigation]}
                >
                  {vehicles.map((vehicle, i) => (
                    <SwiperSlide
                      key={vehicle.id}
                      className="vehicles-slide"
                      style={{
                        background: vehicle.bgColor,
                        width: "auto", // Important
                        flexShrink: 0, // Prevent shrinking
                      }}
                    >
                      <VehicleCard
                        {...vehicle}
                        cotizarLink={getCotizarLink(vehicle.cotizarLink || "")}
                        index={i}
                        titleStyle={{
                          fontFamily: {
                            base: "var(--font-ToyotaType-Regular)",
                            medium: "var(--font-toyotaDisplay)",
                            xl: "var(--font-toyotaDisplay)",
                          },
                          fontWeight: {
                            base: "700",
                            medium: "400",
                            xl: "400",
                          },
                          fontSize: {
                            base: "22px",
                            xl: "28px",
                          },
                          lineHeight: {
                            base: "24px",
                            xl: "41.6px",
                          },
                        }}
                        YearandTypeStyle={{
                          fontFamily: {
                            base: "var(--font-ToyotaType-Regular)",
                            medium: "var(--font-ToyotaType-Regular)",
                            xl: "var(--font-ToyotaType-Regular)",
                          },
                          fontWeight: {
                            base: "400",
                            medium: "",
                            xl: "",
                          },
                          fontSize: { base: "9px", xl: "14px", xxl: "16px" },
                          fontStyle: { base: "normal", xl: "normal" },
                          lineHeight: { base: "normal", xl: "normal" },
                        }}
                        descriptionStyle={{
                          fontFamily: {
                            base: "var(--font-toyotaDisplay)",
                            medium: "var(--font-toyotaDisplay)",
                            xl: "var(--font-toyotaDisplay)",
                          },
                          fontWeight: {
                            base: "400",
                            medium: "",
                            xl: "",
                          },
                          fontSize: { base: "14px", xl: "16px", xxl: "18px" },
                          fontStyle: { base: "normal", xl: "normal" },
                          lineHeight: { base: "19.6px", xl: "21px" },
                        }}
                        priceStyle={{
                          fontSize: { base: "18px", xl: "18px", xxl: "20px" },
                          lineHeight: { base: "normal", xl: "25.67px" },
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </View>
            ) : (
              <Text textAlign="center" marginTop="2rem">
                No hay vehículos en esta categoría.
              </Text>
            )}
          </Tabs.Panel>
        ))}
      </Tabs.Container>
      {vehicles.length > 0 && (
        <View>
          <Flex
            justifyContent={{ base: "space-between", xl: "center" }}
            alignItems={"center"}
            width={"100%"}
            maxWidth={{ base: "21.625rem", xl: "max-content" }}
            gap={{ xl: "140px" }}
            margin={{ base: "2.5rem auto 0", xl: "62px auto 0" }}
          >
            <AmplifyButton
              className="vehicles-tabs-prev arrowCustom arrowCustom--prev"
              color={"transparent"}
              padding={"0"}
              width={"3.4375rem"}
              height={"1.875rem"}
            >
              <Image
                src="/images/arrow-simple-prev.svg"
                alt="Arrow prev"
                width={"1.3125rem"}
                height={".8125rem"}
                display={"flex"}
              />
            </AmplifyButton>
            <Text
              fontWeight={400}
              fontSize={{ base: "18px", xl: "" }}
              lineHeight={{ base: "normal", xl: "" }}
              fontStyle={{ base: "normal", xl: "" }}
              margin="0 auto"
              fontFamily="var(--font-ToyotaType-Regular)"
            >
              {currentSlide} de {totalPages}
            </Text>
            <AmplifyButton
              className="vehicles-tabs-next arrowCustom arrowCustom--next"
              color={"transparent"}
              padding={"0"}
              width={"3.4375rem"}
              height={"1.875rem"}
              display={"flex"}
            >
              <Image
                src="/images/arrow-simple-next.svg"
                alt="Arrow next"
                width={"1.3125rem"}
                height={".8125rem"}
              />
            </AmplifyButton>
          </Flex>
          <Button
            color="transparentBlack"
            textColor="black"
            fontSize={{ base: "14px", xl: "14px" }}
            fontFamily="var(--font-roboto)"
            lineHeight={{ base: "20px", xl: "" }}
            letterSpacing={{ base: "0.1px", xl: "" }}
            minWidth={{ base: "222px", xl: "290px", xxl: "290px" }}
            maxWidth={{ base: "220px", xl: "", xxl: "" }}
            maxHeight={{ base: "40px", xl: "50px", xxl: "50px" }}
            padding={{ base: "10px 23px", xl: "15px 58px", xxl: "15px 58px" }}
            style={{
              display: "block",
              margin: "28px auto 0",
              fontWeight: "500",
            }}
            onClick={() => router.push("/cotiza-tu-toyota/vehiculos-nuevos")}
          >
            Explora todos los vehículos
          </Button>
        </View>
      )}
    </View>
  );
};

export default VehicleSlider;
