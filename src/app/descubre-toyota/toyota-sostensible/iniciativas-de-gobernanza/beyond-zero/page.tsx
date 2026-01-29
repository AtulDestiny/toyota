"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import MovilidadSostenible from "./movilidad-sostenible/page";
import CiudadDelFuturoWovenCity from "./ciudad-del-futuro-woven-city/page";

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
          imageMobile: "/images/image-sostenible.png",
          imageDesktop: "/images/image-sostenible.png",
          title: "Beyond Zero",
        },
        {
          imageMobile: "/images/image-sostenible.png",
          imageDesktop: "/images/image-sostenible.png",
          title: "Beyond Zero",
        },
      ], // Passing slides data inline
      sliderConfig: {
        slidesPerView: 1, // Number of slides visible at a time
        spaceBetween: 10, // Space between slides
        loop: true, // Infinite loop of slides
        isButton: false,
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
      containerProps: {
        minHeight: {
          medium: "50vh",
          large: "50vh",
          xl: "356px",
        },
        height: {
          xl: "356px",
        },
        image: {
          width: "100%",
          height: "356px",
          minHeight: "356px",
          objectPostion: "center",
        },
      },
    },
  },

  {
    component: "ToyotaWorld",
    props: {
      items: [
        {
          label: "Movilidad sostenible",
          value: "Movilidadsostenible",
          content: (
            <>
              <MovilidadSostenible />
            </>
          ),
        },
        {
          label: "Ciudad del futuro Woven city",
          value: "CiudaddelfuturoWovencity",
          content: (
            <>
              <CiudadDelFuturoWovenCity />
            </>
          ),
        },
      ],
      defaultValue: "Movilidadsostenible",
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
