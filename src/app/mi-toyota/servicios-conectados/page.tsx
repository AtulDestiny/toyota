"use client";

import React, { useEffect } from "react";
import renderComponent from "@/utils/renderComponent";
import { InicioComponent } from "./Inicio";
import { FuncionesComponent } from "./Funciones";
import { PlanesComponent } from "./Planes";
import { ToyotaAppComponent } from "./ToyotaApp";
import "./page.css";
import { redirect, useRouter } from "next/navigation";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos de prueba
const pageData: ComponentData[] = [
  // Update the MainSlider component to accept dynamic props
  {
    component: "MainSlider", // Component name
    props: {
      slides: [
        {
          imageMobile:
            "/images/servicios-conectados/banner_375x600_optimizado_300kb.jpg",
          imageDesktop:
            "/images/servicios-conectados/banner_servicios_conectados_1920x630_vf.png",
          title: "Servicios conectados",
        },
      ], // Passing slides data inline
      top: "0",
      sliderConfig: {
        slidesPerView: 1, // Number of slides visible at a time
        spaceBetween: 10, // Space between slides
        loop: true, // Infinite loop of slides
        isButton: false, // Show navigation buttons
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

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Servicios Conectados",
        fontSize: { base: "14px", xl: "18px" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "19.6px",
        textAlign: "left",
        padding: {
          base: "48px 15px 0px",
          medium: "48px 15px 0px",
          xl: "120px 15px 0px",
        },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Control, seguridad y conectividad",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "61.6px",
        textAlign: "left",
        padding: { base: "10px 15px 0px", xl: "0" },
        letterSpacing: "-1.12px",
      },
    },
  },

  {
    component: "ToyotaWorldWithRouter",
    props: {
      basePath: "mi-toyota/servicios-conectados",
      items: [
        {
          label: "Inicio",
          value: "Tab 1",
          content: <InicioComponent />,
        },
        { label: "Funciones", value: "Tab 2", content: <FuncionesComponent /> },
        { label: "Planes", value: "Tab 3", content: <PlanesComponent /> },
        {
          label: "Toyota App",
          value: "Tab 4",
          content: <ToyotaAppComponent />,
        },
      ],
    },
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="servicios-conectados">
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
