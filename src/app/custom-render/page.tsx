"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos de prueba
const pageData: ComponentData[] = [
  {
    component: "FeaturedHybridComponent",
    props: {
      title: "Beneficios",
      subtitle: "Tecnología Híbrida",
      image: "/images/hibrida.png",
      list: [
        {
          title: "Mayor eficiencia",
          description:
            "Recorrer mayores distancias con menor consumo de combustibles.",
        },
        {
          title: "Menor impacto ambiental",
          description: "Reducción significativa de emisiones de CO2.",
        },
      ],
    },
  },
  {
    component: "Quotes",
    props: {
      backgroundImage: "/images/yaris.png",
      quote:
        "Estamos convencidos que si todos hacemos un aporte, en este caso un árbol más, lograremos disminuir la huella de carbono en el planeta.",
      author: "Edge Egashira, presidente de Automotores Toyota Colombia.",
    },
  },
  {
    component: "ThreeImageGallery",
    props: {
      images: [
        {
          url: "/images/yaris.png",
          altText: "Toyota Yaris Front",
        },
        {
          url: "/images/yaris.png",
          altText: "Toyota Yaris Side",
        },
        {
          url: "/images/yaris.png",
          altText: "Toyota Yaris Back",
        },
      ],
    },
  },
];

export default function Home() {
  return (
    <div>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
