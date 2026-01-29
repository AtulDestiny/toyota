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
import { label } from "yet-another-react-lightbox";

type VehicleCategory =
  | "Camionetas y SUV"
  | "Autos"
  | "Pick Ups"
  | "Híbridos"
  | "Deportivos TGR";

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
  "Camionetas y SUV": [],
  Autos: [],
  "Pick Ups": [],
  Híbridos: [],
  "Deportivos TGR": [],
};

export interface DummyVehicle {
  kilometraje: string;
  vehiculo?: string[];
  modelo: string;
  imagen: string;
  precio1?: string;
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

const lc300 = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "328.440",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "328.440",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "328.440",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "328.440",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "328.440",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "644.980",
    precio2: "792.540",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "644.980",
    precio2: "792.540",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "644.980",
    precio2: "792.540",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "1.199.520",
    precio2: "1.443.470",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "1.199.520",
    precio2: "1.443.470",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Land Cruiser 300",
    imagen: "/images/land-cruiser-300/versions/azul-osc-met.png",
    precio1: "328.440",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const tundra = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "  Incluído  ",
    inspeccion:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "753.270",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "753.270",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },

  {
    kilometraje: "50000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "753.270",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "1.370.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Pick Ups"],
    modelo: "Tundra",
    imagen: "/images/tundra/versions/azul-osc.png",

    precio2: "1.370.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const lc300grs = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "312.970",
    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "312.970",
    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "312.970",
    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "312.970",
    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "312.970",
    precio2: "479.570",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "612.850",
    precio2: "753.270",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "612.850",
    precio2: "753.270",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },

  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "612.850",
    precio2: "753.270",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "1.140.020",
    precio2: "1.370.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Land Cruiser 300 GR-S",
    imagen: "/images/land-cruiser-300/versions/grs/LCP-300-GR-S.png",
    precio1: "1.140.020",
    precio2: "1.370.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const prado = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "273.700",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "273.700",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "273.700",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "273.700",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "273.700",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "550.970",
    precio2: "792.540",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire batería hibrida (Vehículos hibridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "550.970",
    precio2: "792.540",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire batería hibrida (Vehículos hibridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "550.970",
    precio2: "792.540",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire batería hibrida (Vehículos hibridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "1.105.510",
    precio2: "1.443.470",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire batería hibrida (Vehículos híbridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "1.105.510",
    precio2: "1.443.470",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire batería hibrida (Vehículos híbridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Prado",
    imagen:
      "/images/land-cruiser-prado/colores/blanco-perla-metalizado/TX-L-Blanco-Perlado-Fondo-Blanco-Frontal.png",
    precio1: "273.700",
    precio2: "504.560",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const hilux = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "1.087.660",
    precio2: "1.298.290",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "1.087.660",
    precio2: "1.298.290",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Pick Ups"],
    modelo: "Hilux",
    imagen: "/images/hilux/versions/tn-srx/attitude-black.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];
const sw4 = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "1.087.660",
    precio2: "1.298.290",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "1.087.660",
    precio2: "1.298.290",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Camionetas y SUV"],
    modelo: "SW4",
    imagen: "/images/sw4/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const fortuner = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "1.032.920",
    precio2: "1.234.030",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Fortuner",
    imagen: "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/plata.png",
    precio1: "1.032.920",
    precio2: "1.234.030",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const hiluxgrs = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "1.032.920",
    precio2: "1.234.030",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Pick Ups", "Deportivos TGR"],
    modelo: "Hilux GR-S",
    imagen: "/images/hilux-gr-s-vi/versions/blanco.png",
    precio1: "1.032.920",
    precio2: "1.234.030",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const fortunergrs = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "243.950",
    precio2: "410.550",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "506.940",
    precio2: "656.880",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "1.032.920",
    precio2: "1.234.030",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Fortuner GR-S",
    imagen: "/images/fortuner-gr-s/colores/negro.png",
    precio1: "1.032.920",
    precio2: "1.234.030",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const fourRunner = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "1.087.660",
    precio2: "1.298.290",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "1.087.660",
    precio2: "1.298.290",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Camionetas y SUV"],
    modelo: "4Runner",
    imagen: "/images/4runner/preview.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const lc70 = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "533.120",
    precio2: "691.390",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "1.087.660",
    precio2: "1.298.290",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "1.087.660",
    precio2: "1.298.290",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Pick Ups"],
    modelo: "LC70",
    imagen: "/images/land-cruiser/attract/lc-79-perfil.png",
    precio1: "255.850",
    precio2: "431.970",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const corollaCross = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Camionetas y SUV"],
    modelo: "Corolla Cross",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const corollaCrossHV = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Corolla Cross HEV",
    imagen: "/images/corolla-cross/versions/xei/azul-osc.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const rav4 = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },

  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV"],
    modelo: "RAV4",
    imagen: "/images/rav4/preview.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const corollagrs = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "998.410",
    precio2: "1.028.160",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },

  {
    kilometraje: "40000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "Corolla GR-S",
    imagen: "/images/corolla-grs/versions/blanco.png",
    precio1: "998.410",
    precio2: "1.028.160",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const grYaris = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "998.410",
    precio2: "1.028.160",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },

  {
    kilometraje: "40000",
    vehiculo: ["Autos", "Deportivos TGR"],
    modelo: "GR Yaris",
    imagen: "/images/yaris-gr/versions/negro.png",
    precio1: "998.410",
    precio2: "1.028.160",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const corollaCrossgrs = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Cambio de aceite de motor + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "208.250",
    precio2: "273.700",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Mano de obra del mantenimiento preventivo básico.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "472.430",
    precio2: "547.400",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de Aire Motor + Limpiador de inyectores + Limpiador de frenos + Alineación y balanceo + Mano de obra del mantenimiento preventivo básico + Filtro de aire batería Híbrida (híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "998.410",
    precio2: "1.028.160",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },

  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV", "Deportivos TGR"],
    modelo: "Corolla Cross GR-S",
    imagen: "/images/corolla-cross-gr/versions/rojo-negro.png",
    precio1: "998.410",
    precio2: "1.028.160",
    inspeccion:
      "Cambio de aceite de motor + Filtro de aceite + Empaque tapón carter + Filtro de aire motor + Filtro de aire de cabina + Limpiador de inyectores + Filtro de combustible (Versión diésel únicamente) + Aceite diferencial + Aceite transfer y tapón transfer (40.000 km únicamente) + Aceite dirección (40.000 únicamente) + Aceite transmisión (40.000 km - Versión mecánica únicamente) + Líquido de frenos + Limpiador de frenos + Alineación y balanceo + Mano de obra del  Mantenimiento preventivo básico + Filtro de aire batería Híbrida (Híbridos únicamente).",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const rav4HV = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "RAV4 HEV",
    imagen: "/images/rav4/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const corolla = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Autos"],
    modelo: "Corolla",
    imagen: "/images/corolla/preview.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const corollaHV = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "40000",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Autos", "Híbridos"],
    modelo: "Corolla HEV",
    imagen: "/images/corolla/versions/xli/Negro-MC.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const yaris = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },

  {
    kilometraje: "40000",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Autos"],
    modelo: "Yaris HB",
    imagen: "/images/yaris/versions/azul-gris.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const yarisCrossHV = [
  {
    kilometraje: "1 mes",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "  Incluído  ",
    precio2: "  Incluído  ",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "5000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "15000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "25000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "35000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "45000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Filtro de aceite - Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "10000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "30000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "50000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "497.420",
    precio2: "575.960",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos híbridos únicamente), Filtro de aire motor <br>Fluidos: Aceite motor, Aditivo limpiador de Inyectores",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "20000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },

  {
    kilometraje: "40000",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "1.050.770",
    precio2: "1.081.710",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico, Alineación y balanceo <br>Repuestos: Filtro de aceite - Empaque tapón carter, Filtro de aire bateria hibrida (Vehículos hibridos únicamente), Filtro de aire motor, Filtro de aire cabina, Filtro combustible (versión diésel únicamente) <br>Fluidos: Aceite motor, Aceite diferenciales (vehículos con diferencial), Aditivo limpiador de Inyectores, liquido de frenos. <br>Revisión 40.000 km únicamente: Aceite transferencia (vehículos con transferencia), Fluido dirección (vehículos con dirección asistida), Aceite transmisión mecánica (vehículos con transmisión mecánica)",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
  {
    kilometraje: "Por tiempo",
    vehiculo: ["Camionetas y SUV", "Híbridos"],
    modelo: "Yaris Cross HEV",
    imagen: "/images/yaris-cross/versions/azul-zafiro.png",
    precio1: "218.960",
    precio2: "287.980",
    inspeccion:
      "Operaciones: Mantenimiento Preventivo Básico. <br>Repuestos: Empaque tapón carter. <br>Fluidos: Aceite motor.",
    cambio: "",
    legales:
      "Aplica únicamente para vehículos con Mantenimiento Planeado Toyota. De acuerdo a la versión del vehículo es posible que no apliquen algunos de los elementos que se encuentran en el listado anterior. Puedes consultar los elementos incluidos en cada rutina de Mantenimiento Planeado Toyota en cada uno de los cupones de tu Certificado de Garantía. Cualquier elemento adicional se encuentra excluido y deberá ser pagado por el cliente directamente en el concesionario de acuerdo a los precios vigentes en repuestos y mano de obra de cada concesionario. Los valores ya incluyen IVA. *La vigencia de estos precios corresponde a los vehículos comercializados hasta el 30 de junio de 2023. **La vigencia de estos precios corresponde a los vehículos comercializados entre el periodo comprendido entre el 01 de julio de 2023 hasta diciembre 31, 2025. La vigencia de estos precios puede variar en el año, según el comportamiento del mercado. Posterior a esto los valores tendrán un incremento anual del IPC.",
  },
];

const dummyVehicleData: DummyVehicle[] = [
  ...corolla,
  ...corollaHV,
  ...lc300,
  ...tundra,
  ...lc300grs,
  ...prado,
  ...hilux,
  ...sw4,
  ...fourRunner,
  ...fortuner,
  ...lc70,
  ...hiluxgrs,
  ...fortunergrs,
  ...rav4,
  ...rav4HV,
  ...corollaCross,
  ...corollaCrossHV,
  ...yaris,
  ...yarisCrossHV,
  ...corollagrs,
  ...corollaCrossgrs,
  ...grYaris,
];

export default function MantenimientoPlaneadoClient({
  slug,
}: {
  slug: string;
}) {
  // Changed to default export
  const isMobile = useBreakpointValue({ base: true, xl: false }) ?? false;

  const [tab, setTab] = useState<VehicleCategory>("Autos");
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
      value: type || "",
      label: type || "",
    }));

    const baseOptions = [
      { value: "autos", label: "Autos" },
      { value: "camionetas-y-suv", label: "Camionetas y SUV" },
      { value: "pick-ups", label: "Pick Ups" },
      { value: "hibridos", label: "Híbridos" },
      { value: "deportivos-tgr", label: "Deportivos TGR" },
      { value: "see-all", label: "Ver todos" },
    ];

    type VehicleTypeData = {
      value: string | string[];
      label: string | string[];
    };

    const expandedVehicleTypes = distinctVehicleTypes.flatMap(
      (item: VehicleTypeData) => {
        if (!Array.isArray(item.value) && !Array.isArray(item.label)) {
          return [item as Option];
        }

        const values = Array.isArray(item.value) ? item.value : [item.value];
        const labels = Array.isArray(item.label) ? item.label : [item.label];

        return values.map((val, index) => ({
          value: val,
          label: labels[index] || val,
        }));
      }
    );

    const allOptions = [...baseOptions, ...expandedVehicleTypes];

    const uniqueOptions = Array.from(
      new Map(allOptions.map((item) => [item.label, item])).values()
    );

    setVehicleTypeOptions(uniqueOptions);

    const normalizeOption = (item: {
      value: string | string[];
      label: string | string[];
    }) => ({
      value: Array.isArray(item.value) ? item.value.join(", ") : item.value,
      label: Array.isArray(item.label) ? item.label.join(", ") : item.label,
    });

    if (distinctVehicleTypes.length > 0) {
      setSelectedVehicleType({ value: "Autos", label: "Autos" });
    }
  }, []);

  useEffect(() => {
    if (selectedVehicleType) {
      const filteredModels = dummyVehicleData.filter((vehicle) =>
        vehicle.vehiculo?.includes(selectedVehicleType.value)
      );
      const distinctModels = Array.from(
        new Set(
          selectedVehicleType.value === "see-all" // <-- This correctly gets ALL models for "see-all"
            ? dummyVehicleData.map((vehicle) => vehicle.modelo)
            : filteredModels.map((vehicle) => vehicle.modelo)
        )
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
      const isSeeAll = selectedVehicleType.value === "see-all";

      const filteredKilometers = dummyVehicleData.filter(
        (vehicle) =>
          // --- FIX IS HERE: Only filter by vehicle type if it's NOT "see-all" ---
          (isSeeAll || vehicle.vehiculo?.includes(selectedVehicleType.value)) &&
          vehicle.modelo === selectedModel.value
      );

      const distinctKilometers = Array.from(
        new Set(filteredKilometers.map((vehicle) => vehicle.kilometraje))
      )
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((km) => ({
          value: km,
          // Format the kilometer value with a thousands separator
          label: `${
            km !== "Por tiempo" && km !== "1 mes"
              ? parseInt(km).toLocaleString("es-CO") + "Kms"
              : km
          } `,
        }));
      setKilometerOptions(distinctKilometers);
      setSelectedKilometer(
        distinctKilometers.length > 0 ? distinctKilometers[0] : null
      );
    } else {
      setKilometerOptions([]);
      setSelectedKilometer(null);
    }
  }, [selectedVehicleType, selectedModel]); // Keep the dependencies as is

  // Effect to update selected vehicle info when vehicle type, model, or kilometer changes
  useEffect(() => {
    if (selectedVehicleType && selectedModel && selectedKilometer) {
      // If "see-all" is selected, we must assume that the model selected
      // belongs to ONE of the categories, so we cannot match on "see-all".
      // We will rely on the model/kilometer match only.
      const isSeeAll = selectedVehicleType.value === "see-all";

      const foundVehicle = dummyVehicleData.find(
        (item) =>
          // --- FIX IS HERE: Filter by vehicle type only if it's NOT "see-all" ---
          (isSeeAll || item.vehiculo?.includes(selectedVehicleType.value)) &&
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
        href="/mi-toyota/mantenimiento/planeado/"
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
                Categoría
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
                  Selecciona el Kilometraje / Tiempo
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
                Selecciona el Kilometraje / Tiempo
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
            <View
              width={{
                base: "min(20.125rem, 100%)",
                xl: "min(40.375rem, 100%)",
              }}
            >
              <Image
                maxWidth={{
                  base: "100%",
                }}
                src={
                  selectedVehicleInfo?.imagen ||
                  "/images/mantenimiento-planeado-cotizar-example.png"
                }
                alt={selectedVehicleInfo?.modelo}
              />
            </View>

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
              Precio del Mantenimiento Planeado
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
                {selectedVehicleInfo?.precio1 && (
                  <Heading
                    level={4}
                    color={{ base: "#000000" }}
                    fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
                    fontSize={{ base: "1.375rem", xl: "1.625rem" }}
                    fontWeight={{ base: "700" }}
                    lineHeight={{ base: "normal" }}
                  >
                    ${selectedVehicleInfo?.precio1}*
                  </Heading>
                )}
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
                  ${selectedVehicleInfo?.precio2 || "479.570"}**
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
              textDecoration={"underline"}
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
        <View padding={{ base: "2.03rem 0.94rem 0", xl: "0" }}>
          <Heading
            color={{ base: "#000000" }}
            fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
            fontSize={{ base: "1.375rem" }}
            fontWeight={{ base: "700" }}
            lineHeight={{ base: "normal" }}
            padding={{ base: "1.25rem 0 0 0", xl: "0" }}
            style={{ borderTop: isMobile ? "1px solid #D9D9D9" : "unset" }}
          >
            Servicios incluidos
          </Heading>

          <View
            style={{
              borderBottom: isMobile ? "1px solid #D9D9D9" : "unset",
            }}
            paddingBottom={{ base: "2.0625rem" }}
          >
            <Text
              color={{ base: "#000000" }}
              fontFamily={{ base: "var(--font-toyotaType-Regular)" }}
              fontSize={{ base: "1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "100%" }}
              paddingTop={{ base: "2.0625rem" }}
              paddingBottom={{ base: ".75rem" }}
            >
              ¿Qué incluye?
            </Text>
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
      </Grid>

      <Flex
        width={{ xl: "min(76.25rem, 100%)" }}
        margin={{ xl: "0 auto" }}
        alignItems="center"
        gap=".375rem"
        padding={{ base: "2.125rem 0.94rem 1.75rem", xl: "1.375rem 0 0 0" }}
        marginBottom={".9375rem"}
        fontSize={{ base: "9px" }}
        dangerouslySetInnerHTML={{
          __html: selectedVehicleInfo?.legales ?? "",
        }}
      ></Flex>
    </View>
  );
}
