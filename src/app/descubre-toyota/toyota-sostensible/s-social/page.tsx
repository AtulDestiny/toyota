"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import ComunidadWayuu from "./comunidad-wayuu/page";
import CancerDeProstata from "./cancer-de-prostata/page";
import CancerDeMama from "./cancer-de-mama/page";

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
          imageMobile: "/images/image-incluson.png",
          imageDesktop: "/images/image-incluson.png",
          title: "Diversidad, Equidad e Inclusión",
        },
        {
          imageMobile: "/images/image-incluson.png",
          imageDesktop: "/images/image-incluson.png",
          title: "Diversidad, Equidad e Inclusión",
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
    },
  },

  {
    component: "ToyotaWorld",
    props: {
      items: [
        {
          label: "Cáncer de mama",
          value: "Cáncerdemama",
          content: (
            <>
              <CancerDeMama />
            </>
          ),
        },
        {
          label: "Cáncer de prostata",
          value: "Cáncerdeprostata",
          content: (
            <>
              <CancerDeProstata />
            </>
          ),
        },
        {
          label: "Comunidad Wayúu",
          value: "ComunidadWayúu",
          content: (
            <>
              <ComunidadWayuu />
            </>
          ),
        },
      ],
      defaultValue: "Cáncerdemama",
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
