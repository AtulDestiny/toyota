"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import ArmoniaNatualeza from "./armonia-en-la-natualeza/page";
import ProduccionVehiculo from "./produccion-del-vehiculo/page";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos de prueba
const pageData: ComponentData[] = [
  {
    component: "MainSlider", // Component name
    props: {
      slides: [
        {
          imageMobile: "/images/image 256.png",
          imageDesktop: "/images/image 256.png",
          title: "Cero Emisiones",
        },
        {
          imageMobile: "/images/image 256.png",
          imageDesktop: "/images/image 256.png",
          title: "Cero Emisiones",
        },
      ], // Passing slides data inline
      sliderConfig: {
        slidesPerView: 1, // Number of slides visible at a time
        spaceBetween: 10, // Space between slides
        isButton: false,
        loop: true, // Infinite loop of slides
        autoplay: {
          delay: 3000, // Autoplay delay in ms
          disableOnInteraction: false, // Keep autoplay even when user interacts
        },
        pagination: {
          clickable: true, // Allow click pagination
        },
        navigation: true, // Enable navigation buttons (next/prev)
      }, // Passing slider configuration inline
    },
  },
  // make PreventiveCampaignsServicesBanner component to accept dynamic props
  // {
  //   component: "PreventiveCampaignsServicesBanner",
  //   props: {
  //     slides: [
  //       {
  //         imageMobile: "/images/campanas-preventivas-servicio-banner.png",
  //         imageDesktop:
  //           "/images/campanas-preventivas-servicio-banner--desktop.png",
  //         title: "Sistema depre-colisión frontal (PCS)*",
  //         description: "Para la operación de tu negocio",
  //         button: "Es fácil, rápido, y sin costo",
  //       },
  //       // ... more slides
  //     ],
  //   },
  // },

  {
    component: "ToyotaWorld",
    props: {
      items: [
        {
          label: "Ciclo de vida del vehículo",
          value: "Ciclovehículo",
          content: (
            <>
              <ArmoniaNatualeza />
            </>
          ),
        },
        {
          label: "Producción del vehículo",
          value: "Producciónvehículo",
          content: (
            <>
              <ProduccionVehiculo />
            </>
          ),
        },
      ],
      defaultValue: "Ciclovehículo",
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
