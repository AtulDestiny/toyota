"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import GestionAuga from "./gestion-residuos/page";
import GestionBosque from "./gestion-residuos-armonia-con-la-naturaleza/page";
import GestionCircular from "./gestion-residuos-economia-circular/page";

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
          imageMobile: "/images/47-ambiental-impacto-positivo-gestion-agua.png",
          imageDesktop: "/images/03_Impacto-Positivo_1920x630_Web.png",
          title: "Impacto positivo",
        },
        {
          imageMobile: "/images/48-ambiental-impacto-positivo-gestion-agua.png",
          imageDesktop: "/images/e373e67a-f85d-4a91-ad69-cfe4842708c1.jpg",
          title: "Impacto positivo",
        },
        {
          imageMobile: "/images/44-landing-principal-ambiental.png",
          imageDesktop: "/images/033_Ambiental_1920x630_Web.png",
          title: "Impacto positivo",
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
      isPlayicon: false,
    },
  },
  

  {
    component: "ToyotaWorld",
    props: {
      items: [
        {
          label: "Gestión eficiente del agua ",
          value: "GestiónEficientedelagua",
          content: (
            <>
              <GestionAuga />
            </>
          ),
        },
        // {
        //   label: "Economía Circular",
        //   value: "EconomíaCircular",
        //   content: (
        //     <>
        //       <GestionCircular />
        //     </>
        //   ),
        // },
        // {
        //   label: "Armoníacon la naturaleza",
        //   value: "Armoníaconlanaturaleza",
        //   content: (
        //     <>
        //       <GestionBosque />
        //     </>
        //   ),
        // },
      ],
      defaultValue: "GestiónEficientedelagua",
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
