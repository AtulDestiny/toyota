"use client";
import { ToyotaWorldWithRouter } from "@/components/ToyotaWorld/ToyotaWorldWithRouter";
import { InicioComponent } from "../Inicio";
import renderComponent from "@/utils/renderComponent";
import React from "react";
import { HistoriaComponent } from "../Historia";
import { ModelosComponent } from "../Modelos";
import { BoutiqueComponent } from "../Boutique";

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
          imageMobile: "/images/TGR/banner/mobile.png",
          imageDesktop: "/images/TGR/banner/desktop.png",
        },
        {
          imageMobile: "/images/TGR/banner/mobile--2.png",
          imageDesktop: "/images/TGR/banner/desktop--2.png",
        },
      ], // Passing slides data inline
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
];
export default function ServiciosConectadosPage() {
  return (
    <>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
      <ToyotaWorldWithRouter
        basePath="deportivos-tgr"
        items={[
          { label: "Inicio", value: "Tab 1", content: <InicioComponent /> },
          { label: "Historia", value: "Tab 2", content: <HistoriaComponent /> },
          { label: "Modelos", value: "Tab 3", content: <ModelosComponent /> },
          { label: "Boutique", value: "Tab 4", content: <BoutiqueComponent /> },
        ]}
      />
    </>
  );
}
