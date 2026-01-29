"use client";

import {
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  useBreakpointValue,
  View,
  Accordion,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { CSSProperties, useState, useEffect, useRef } from "react"; // Import useRef
import "swiper/css";
import "./page.css";
import { Select, SelectTheme } from "@/components/Layout/Select/Select";
import { fetchVehicle } from "./queries";
import { useQuery } from "@tanstack/react-query";

type VehicleCategory =
  | "Camionetas"
  | "Autos"
  | "Pick Ups"
  | "Híbridos"
  | "Deportivos TGR";

enum VehicleCardTheme {
  "dark" = "dark",
  "light" = "light",
}

interface GalleryAsset {
  name?: string;
  url?: string;
  type?: string;
}

interface Color {
  gallery?: {
    galleryAssets?: {
      items?: GalleryAsset[];
    };
  };
}

interface Year {
  name: string;
  colorsByModel?: {
    items?: Color[];
  };
}

interface Model {
  name: string;
  modelsByYear?: {
    items?: Year[];
  };
}

export interface VehicleCardProps {
  id: string;
  slug: string;
  name: string;
  category?: {
    type: VehicleCategory;
  };
  models?: {
    items?: Model[];
  };
  vehicleAttribs?: {
    items?: {
      key?: string;
      value?: string;
    }[];
  };
  img?: string;
}

const vehiclesData: Record<VehicleCategory, VehicleCardProps[]> = {
  Camionetas: [],
  Autos: [],
  "Pick Ups": [],
  Híbridos: [],
  "Deportivos TGR": [],
};

export interface DummyVehicle {
  kilometraje: string;
  vehiculo?: string;
  modelo: string;
  imagen: string;
  precio1: string;
  precio2: string;
  precio1_description?: string;
  precio2_description?: string;
  cambio?: string;
  inspeccion?: string;
  legales?: string;
}
export interface Option {
  value: string;
  label: string;
}

const dummyVehicleData: DummyVehicle[] = [
  {
    kilometraje: "10000",
    vehiculo: "Camioneta",
    modelo: "Land Cruiser 300",
    imagen: "/images/seleccion-toyota-jun-LC300.png",
    precio1: "612.850",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Camioneta",
    modelo: "Land Cruiser 300",
    imagen: "/images/seleccion-toyota-jun-LC300.png",
    precio1: "612.850",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Camioneta",
    modelo: "Land Cruiser 300",
    imagen: "/images/seleccion-toyota-jun-LC300.png",
    precio1: "612.850",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Camioneta",
    modelo: "Land Cruiser 300",
    imagen: "/images/seleccion-toyota-jun-LC300.png",
    precio1: "1.140.020",
    precio2: "1.370.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Camioneta",
    modelo: "Land Cruiser 300",
    imagen: "/images/seleccion-toyota-jun-LC300.png",
    precio1: "1.140.020",
    precio2: "1.370.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico..",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Camioneta",
    modelo: "Land Cruiser 300",
    imagen: "/images/seleccion-toyota-jun-LC300.png",
    precio1: "312.970",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico..",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "0",
    vehiculo: "Camioneta",
    modelo: "Land Cruiser 300",
    imagen: "/images/seleccion-toyota-jun-LC300.png",
    precio1: "  Incluído  ",
    precio2: " Incluído   ",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  // {
  //   "kilometraje": "0",
  //   "vehiculo": "Camioneta",
  //   "modelo": "Prado",
  //   "imagen": "/images/seleccion-toyota-jun-LCPrado.png  ",
  //   "precio1": "  Incluído  ",
  //   "precio2": " Incluído   ",
  //   "inspeccion": "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
  //   "cambio": "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
  //   "legales": "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que "
  // },
  {
    kilometraje: "5000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "523.600",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "523.600",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "523.600",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "1.050.770",
    precio2: "1.370.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "1.050.770",
    precio2: "1.370.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Camioneta",
    modelo: "Prado",
    imagen: "/images/seleccion-toyota-jun-LCPrado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "5000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Camioneta",
    modelo: "4Runner",
    imagen: "/images/repuestos/4Runner.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },

  // {
  //   "kilometraje": "0",
  //   "vehiculo": "Pick Ups",
  //   "modelo": "Hilux",
  //   "imagen": "/images/seleccion-toyota-jun-Hilux.png",
  //   "precio1": "  Incluído  ",
  //   "precio2": "  Incluído  ",
  //   "inspeccion": "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
  //   "cambio": "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
  //   "legales": "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que "
  // },
  {
    kilometraje: "5000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Pick Ups",
    modelo: "Hilux",
    imagen: "/images/seleccion-toyota-jun-Hilux.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "5000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Pick Ups",
    modelo: "Land Cruiser 79",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "0",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "5000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente). ",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente). ",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente). ",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente). ",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente). ",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross",
    imagen: "/images/seleccion-toyota-jun-CorollaCross.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente). ",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "5000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Autos",
    modelo: "Corolla",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  // crolla HV
  {
    kilometraje: "5000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Autos",
    modelo: "Corolla HV",
    imagen: "/images/corolla/versions/seg/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  // yaris
  {
    kilometraje: "5000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "1.234.030",
    precio2: "998.410",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Autos",
    modelo: "Yaris",
    imagen: "/images/yaris/versions/blanco-perla.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  // Crolla cross (camioneta)
  {
    kilometraje: "5000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "523.600",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "523.600",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "523.600",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "1.050.770",
    precio2: "1.370.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "1.050.770",
    precio2: "1.370.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Camioneta",
    modelo: "Corolla Cross HV",
    imagen:
      "/images/corolla-cross/versions/seg/update/azul-oscuro-metalico.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  // Yaris cross (camioneta)
  {
    kilometraje: "5000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "15000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "25000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "35000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "45000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "10000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "523.600",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "30000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "523.600",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "50000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "523.600",
    precio2: "753.270",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "20000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "1.050.770",
    precio2: "1.370.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "40000",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "1.050.770",
    precio2: "1.370.880",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
  {
    kilometraje: "POR TIEMPO",
    vehiculo: "Camioneta",
    modelo: "Yaris Cross HV",
    imagen: "/images/yaris-cross/versions/blanco-perlado.png",
    precio1: "260.610",
    precio2: "479.570",
    inspeccion:
      "inspeccion de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que ",
  },
];

export function MantenimientoPlaneadoClient({ slug }: { slug: string }) {
  const isMobile = useBreakpointValue({ base: true, xl: false }) ?? false;

  const [tab, setTab] = useState<VehicleCategory>("Camionetas");
  const [vehicles, setVehicles] = useState<VehicleCardProps[]>(
    vehiclesData[tab]
  );
  const [dialog, setDialog] = useState(false);

  // State for the three dropdowns
  const [selectedVehicleType, setSelectedVehicleType] = useState<Option | null>(
    null
  );
  const [selectedModel, setSelectedModel] = useState<Option | null>(null);
  const [selectedKilometer, setSelectedKilometer] = useState<Option | null>(
    null
  );

  // Options for the three dropdowns
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState<Option[]>([]);
  const [modelOptions, setModelOptions] = useState<Option[]>([]);
  const [kilometerOptions, setKilometerOptions] = useState<Option[]>([]);

  // State to hold the currently displayed vehicle information
  const [selectedVehicleInfo, setSelectedVehicleInfo] =
    useState<DummyVehicle | null>(null);

  // Ref for the target section to scroll to
  const infoSectionRef = useRef<HTMLDivElement>(null);

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mantenimiento"],
    queryFn: () => fetchVehicle(slug, "mantenimiento"),
    enabled: !!slug,
  });

  const toggleDialog = () => {
    setDialog(!dialog);
  };

  // Effect to populate initial vehicle types
  useEffect(() => {
    const distinctVehicleTypes = Array.from(
      new Set(dummyVehicleData.map((vehicle) => vehicle.vehiculo))
    ).map((type) => ({
      value: type || "", // Ensure type is not undefined
      label: type || "",
    }));
    setVehicleTypeOptions(distinctVehicleTypes);

    // Set initial selected vehicle type to the first one if available
    if (distinctVehicleTypes.length > 0) {
      setSelectedVehicleType(distinctVehicleTypes[0]);
    }
  }, []);

  // Effect to update model options when vehicle type changes
  useEffect(() => {
    if (selectedVehicleType) {
      const filteredModels = dummyVehicleData.filter(
        (vehicle) => vehicle.vehiculo === selectedVehicleType.value
      );
      const distinctModels = Array.from(
        new Set(filteredModels.map((vehicle) => vehicle.modelo))
      ).map((model) => ({
        value: model,
        label: model,
      }));
      setModelOptions(distinctModels);
      // Reset selected model and kilometer when vehicle type changes
      setSelectedModel(distinctModels.length > 0 ? distinctModels[0] : null);
      setSelectedKilometer(null); // Will be set by the next effect
    } else {
      setModelOptions([]);
      setSelectedModel(null);
      setKilometerOptions([]);
      setSelectedKilometer(null);
    }
  }, [selectedVehicleType]);

  // Effect to update kilometer options when model changes
  useEffect(() => {
    if (selectedVehicleType && selectedModel) {
      const filteredKilometers = dummyVehicleData.filter(
        (vehicle) =>
          vehicle.vehiculo === selectedVehicleType.value &&
          vehicle.modelo === selectedModel.value
      );
      const distinctKilometers = Array.from(
        new Set(filteredKilometers.map((vehicle) => vehicle.kilometraje))
      )
        .sort((a, b) => {
          if (a === "1 MES") return -1;
          if (b === "1 MES") return 1;
          if (a === "POR TIEMPO") return 1;
          if (b === "POR TIEMPO") return -1;
          return Number(a) - Number(b);
        })
        .map((km) => ({
          value: km,
          label:
            km === "0" || km === "1 MES"
              ? "1 MES"
              : km === "POR TIEMPO"
                ? "POR TIEMPO"
                : `${Number(km).toLocaleString("es-CO")} Kms/hr`,
        }));
      setKilometerOptions(distinctKilometers);
      // Set initial selected kilometer to the first one if available
      setSelectedKilometer(
        distinctKilometers.length > 0 ? distinctKilometers[0] : null
      );
    } else {
      setKilometerOptions([]);
      setSelectedKilometer(null);
    }
  }, [selectedVehicleType, selectedModel]);

  // Effect to update selected vehicle info when vehicle type, model, or kilometer changes
  useEffect(() => {
    if (selectedVehicleType && selectedModel && selectedKilometer) {
      const foundVehicle = dummyVehicleData.find(
        (item) =>
          item.vehiculo === selectedVehicleType.value &&
          item.modelo === selectedModel.value &&
          item.kilometraje === selectedKilometer.value
      );
      setSelectedVehicleInfo(foundVehicle || null);

      // Scroll to the info section when a kilometer is selected
      if (infoSectionRef.current) {
        infoSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      setSelectedVehicleInfo(null);
    }
  }, [selectedVehicleType, selectedModel, selectedKilometer]);

  return (
    <View paddingBottom={{ base: "0", xl: "4.5rem" }}>
      <Link
        href="/postventa/mantenimiento/planeado/"
        display={{ base: "inline-block" }}
        width={{ base: "max-content" }}
        padding={{
          base: "1.38rem 0.94rem 2.69rem",
          xl: "2.69rem 3.1669rem 2.38rem",
        }}
      >
        <Flex gap={{ base: "0.7869rem" }} alignItems={{ base: "center" }}>
          <Image src="/svgs/arrow--left-black-short.svg" alt="Arrow left" />
          <Text
            color={{ base: "#000" }}
            textAlign={{ base: "center" }}
            fontFamily={{ base: "var(--font-toyotaDisplay)" }}
            fontSize={{ base: "0.875rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "140%" }}
          >
            Volver a Mantenimiento Planeado
          </Text>
        </Flex>
      </Link>

      <Flex
        direction={{ base: "column" }}
        gap={{ base: "3.31rem", xl: "4.5rem" }}
        padding={{ base: "1.31rem 0.94rem 1.75rem", xl: "0 2rem 2rem" }}
      >
        <Heading
          level={1}
          color={{ base: "#000000" }}
          fontFamily={{
            base: "var(--font-toyotaType-Regular)",
            xl: "var(--font-toyotaDisplay)",
          }}
          fontSize={{ base: "1.375rem", xl: "2rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "normal", xl: "130%" }}
          textAlign={{ xl: "center" }}
        >
          Conoce el Plan de Mantenimiento Planeado para tu vehículo
        </Heading>

        <Flex
          direction={{ base: "column" }}
          gap={{ base: "1.56rem", xl: "3.69rem" }}
          alignItems={{ base: "stretch" }}
          paddingBottom={{ base: "1.94rem", xl: "0" }}
        >
          <Flex
            direction={{ base: "column", xl: "row" }}
            gap={{ base: "1.56rem", xl: "10.94rem" }}
            alignItems={{ base: "stretch" }}
            justifyContent={{ xl: "center" }}
          >
            <Flex
              direction={{ base: "column" }}
              gap={{ base: "1.25rem" }}
              alignItems={{ base: "stretch" }}
              minWidth={{ xl: "18.125rem" }}
            >
              <Text
                color={{ base: "#000000" }}
                fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                fontSize={{ base: "1.125rem" }}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
              >
                Vehículo
              </Text>

              <Select
                options={vehicleTypeOptions}
                selectedOption={selectedVehicleType}
                onSelect={(selected) => setSelectedVehicleType(selected)}
                theme={SelectTheme.Light}
              />
            </Flex>

            <Flex
              direction={{ base: "column" }}
              gap={{ base: "1.25rem" }}
              alignItems={{ base: "stretch" }}
              minWidth={{ xl: "18.125rem" }}
            >
              <Text
                color={{ base: "#000000" }}
                fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                fontSize={{ base: "1.125rem" }}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
              >
                Modelo
              </Text>

              <Select
                options={modelOptions}
                selectedOption={selectedModel}
                onSelect={(selected) => setSelectedModel(selected)}
                theme={SelectTheme.Light}
              />
            </Flex>

            {!isMobile && (
              <Flex
                direction={{ base: "column" }}
                gap={{ base: "1.25rem" }}
                alignItems={{ base: "stretch" }}
                minWidth={{ xl: "18.125rem" }}
              >
                <Text
                  color={{ base: "#000000" }}
                  fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                  fontSize={{ base: "1.125rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "normal" }}
                >
                  Selecciona el Kilometráje
                </Text>
                <Select
                  options={kilometerOptions}
                  selectedOption={selectedKilometer}
                  onSelect={(selected) => setSelectedKilometer(selected)}
                  theme={SelectTheme.Light}
                />
              </Flex>
            )}
          </Flex>

          {isMobile && (
            <Flex
              direction={{ base: "column" }}
              gap={{ base: "1.25rem" }}
              alignItems={{ base: "stretch" }}
            >
              <Text
                color={{ base: "#000000" }}
                fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                fontSize={{ base: "1.125rem" }}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
              >
                Selecciona el Kilometráje
              </Text>

              <Select
                options={kilometerOptions}
                selectedOption={selectedKilometer}
                onSelect={(selected) => setSelectedKilometer(selected)}
                theme={SelectTheme.Light}
              />
            </Flex>
          )}
          <Flex
            direction={{ base: "column" }}
            gap={{ base: "1.56rem", xl: "0.5rem" }}
            alignItems={{ base: "center" }}
          >
            <Image
              width={{
                base: "min(20.125rem, 100%)",
                xl: "min(40.375rem, 100%)",
              }}
              src={
                selectedVehicleInfo?.imagen ||
                "/images/mantenimiento-planeado-cotizar-example.png"
              }
              alt={selectedVehicleInfo?.modelo}
            />

            <Text
              color={{ base: "#000000" }}
              fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
              fontSize={{ base: "0.5625rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
            >
              {isMobile
                ? "*Las imágenes del vehículo en referencia pueden variar del modelo"
                : "*Imágenes de referencia"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Grid
        templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }}
        width={{ xl: "min(76.25rem, 100%)" }}
        margin={{ xl: "0 auto" }}
        gap={{ xl: "15rem" }}
        backgroundColor={{ xl: "#F6F6F6" }}
        ref={infoSectionRef}
        padding={{ xl: " 4.5625rem  2.5rem 4.6875rem 5.5rem" }}
      >
        <Flex
          direction={{ base: "column" }}
          gap={{ base: "4.06rem" }}
          padding={{ base: "0 1rem" }}
        >
          <View>
            <Heading
              level={3}
              color={{ base: "#000000" }}
              fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
              fontSize={{ base: "1.375rem" }}
              fontWeight={{ base: "700" }}
              lineHeight={{ base: "normal" }}
              paddingBottom={{ base: "2rem" }}
            >
              {selectedVehicleInfo
                ? `${selectedVehicleInfo?.vehiculo}  ${selectedVehicleInfo?.modelo}`
                : "Fortuner"}
            </Heading>

            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                xl: "1fr",
              }}
              gap={{ base: "1.25rem" }}
              alignItems={{ base: "stretch" }}
              paddingBottom={{ base: " 1.56rem" }}
            >
              <Flex
                direction={{ base: "column" }}
                gap={{ base: "0.5rem", xl: "2rem" }}
              >
                <Heading
                  level={4}
                  color={{ base: "#000000" }}
                  fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                  fontSize={{ base: "1.375rem", xl: "1.625rem" }}
                  fontWeight={{ base: "700" }}
                  lineHeight={{ base: "normal" }}
                >
                  ${selectedVehicleInfo?.precio1 || "260.610"}*
                </Heading>
                <Text
                  color={{ base: "#000000" }}
                  fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                  fontSize={{ base: "0.5625rem", xl: "0.75rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "normal" }}
                >
                  {selectedVehicleInfo?.precio1_description ||
                    "* La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023."}
                </Text>
              </Flex>

              <Flex
                direction={{ base: "column" }}
                gap={{ base: "0.5rem", xl: "2rem" }}
              >
                <Heading
                  level={4}
                  color={{ base: "#000000" }}
                  fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                  fontSize={{ base: "1.375rem", xl: "1.625rem" }}
                  fontWeight={{ base: "700" }}
                  lineHeight={{ base: "normal" }}
                >
                  ${selectedVehicleInfo?.precio2 || "479.570"}*
                </Heading>
                <Text
                  color={{ base: "#000000" }}
                  fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                  fontSize={{ base: "0.5625rem", xl: "0.75rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "normal" }}
                >
                  {selectedVehicleInfo?.precio2_description ||
                    "**La vigencia de estos precios corresponde a los vehículos comercializados entre el período comprendido desde el 01 de julio de 2023 hasta diciembre 31, 2025"}
                </Text>
              </Flex>
            </Grid>

            <Text
              display={{ base: "inline-block" }}
              color={{ base: "#D42224" }}
              fontFamily={{ base: "var(--font-toyotaDisplay)" }}
              fontSize={{ base: "0.875rem" }}
              fontWeight={{ base: "500" }}
              lineHeight={{ base: "normal" }}
              paddingBottom={{ base: "2.03rem" }}
              style={{ cursor: "pointer" }}
              onClick={toggleDialog}
            >
              ¿Cuál precio de mantenimiento aplica a mi vehículo?
            </Text>

            {dialog && (
              <>
                <View
                  position={"fixed"}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  backgroundColor={"rgba(0, 0, 0, 0.5)"}
                  style={{
                    zIndex: 2,
                  }}
                  onClick={toggleDialog}
                ></View>
                <Flex
                  position={"relative"}
                  top={0}
                  left={0}
                  style={{
                    zIndex: 2,
                  }}
                >
                  <View
                    position={"fixed"}
                    left={"50%"}
                    top={"50%"}
                    transform={"translate(-50%, -50%)"}
                    className="dialog-content"
                    backgroundColor={"#fff"}
                    padding={"2rem"}
                    borderRadius={"8px"}
                    width={{ base: "min(23.4375rem, 100%)" }}
                    margin={"auto"}
                  >
                    <Flex direction={"column"} gap={{ base: "1.125rem" }}>
                      <Heading
                        level={2}
                        color={{ base: "#000000" }}
                        fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                        fontSize={{ base: "1.125rem" }}
                        fontWeight={{ base: "400" }}
                        lineHeight={{ base: "normal" }}
                        maxWidth={{ base: "24ch" }}
                      >
                        Verifica la fecha de matrícula de tu vehículo.
                      </Heading>

                      <Text
                        color={{ base: "#000000" }}
                        fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                        fontSize={{ base: "0.75rem" }}
                        fontWeight={{ base: "400" }}
                        lineHeight={{ base: "normal" }}
                        maxWidth={{ base: "43ch" }}
                      >
                        Consulta los precios vigentes de acuerdo a la versión de
                        tu vehículo, en la pág.30 del certificado de garantía.
                      </Text>
                    </Flex>
                    <Image
                      src="/svgs/close-modal--black.svg"
                      alt="Close"
                      width={{ base: "0.82119rem" }}
                      position={{ base: "absolute" }}
                      right={{ base: "1.4rem" }}
                      top={{ base: "1.38rem" }}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={toggleDialog}
                    />
                  </View>
                </Flex>
              </>
            )}
          </View>
        </Flex>

        <View padding={{ base: "2.03rem 0.94rem 0" }}>
          <Heading
            color={{ base: "#000000" }}
            fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
            fontSize={{ base: "1.375rem" }}
            fontWeight={{ base: "700" }}
            lineHeight={{ base: "normal" }}
            paddingBottom={{ base: "1.25rem" }}
          >
            Servicios incluídos
          </Heading>
          <Accordion.Container
            backgroundColor={{ base: "inherit" }}
            className="my-accordion"
            defaultValue={["Cambio", "Inspección"]}
            allowMultiple
            preventCollapse
          >
            <Accordion.Item
              className="filter__item"
              borderRadius={{ base: "0" }}
              value="Cambio"
              style={{
                borderLeft: 0,
                borderRight: 0,
                borderBottom: 0,
                borderTop: "1px solid #D9D9D9",
              }}
            >
              <Accordion.Trigger
                color={{ base: "#000000" }}
                fontSize={{ base: "1.125rem" }}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
                padding={"30px 0"}
              >
                Cambio
                <Accordion.Icon />
              </Accordion.Trigger>
              <Accordion.Content paddingInlineStart={"0px"}>
                <View marginBottom={".9375rem"}>
                  <Text
                    color={{ base: "#000000" }}
                    fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                    fontSize={{ base: "0.75rem" }}
                    fontWeight={{ base: "400" }}
                    lineHeight={{ base: "normal" }}
                    dangerouslySetInnerHTML={{
                      __html: selectedVehicleInfo?.cambio ?? "",
                    }}
                  />
                </View>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item
              className="filter__item"
              borderRadius={{ base: "0" }}
              value="Inspección"
              style={{
                borderLeft: 0,
                borderRight: 0,
                borderBottom: 0,
                borderTop: "1px solid #D9D9D9",
              }}
            >
              <Accordion.Trigger
                color={{ base: "#000000" }}
                fontSize={{ base: "1.125rem" }}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
                padding={"30px 0"}
              >
                Inspección
                <Accordion.Icon />
              </Accordion.Trigger>
              <Accordion.Content paddingInlineStart={"0px"}>
                <View marginBottom={".9375rem"}>
                  <View paddingBottom={{ base: "0.75rem" }}>
                    <Text
                      color={{ base: "#000000" }}
                      fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                      fontSize={{ base: "0.75rem" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "normal" }}
                      dangerouslySetInnerHTML={{
                        __html: selectedVehicleInfo?.inspeccion ?? "",
                      }}
                    />
                  </View>
                </View>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item
              className="filter__item"
              borderRadius={{ base: "0" }}
              value="Legales"
              style={{
                borderLeft: 0,
                borderRight: 0,
                borderBottom: isMobile ? "" : "1px solid #D9D9D9",
                borderTop: "1px solid #D9D9D9",
              }}
            >
              <Accordion.Trigger
                color={{ base: "#000000" }}
                fontSize={{ base: "1.125rem" }}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
                padding={"30px 0"}
              >
                Legales
                <Accordion.Icon />
              </Accordion.Trigger>
              <Accordion.Content paddingInlineStart={"0px"}>
                <Flex
                  alignItems="center"
                  gap=".375rem"
                  marginBottom={".9375rem"}
                  dangerouslySetInnerHTML={{
                    __html: selectedVehicleInfo?.legales ?? "",
                  }}
                ></Flex>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Container>
        </View>
      </Grid>
    </View>
  );
}
