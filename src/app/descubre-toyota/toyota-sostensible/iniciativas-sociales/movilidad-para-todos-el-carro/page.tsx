"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import ProtesisConFundafe from "./protesis-con-fundafe/page";
import DeTusSuenos from "../../s-social/el-carro-de-tus-suenos/page";

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
          imageMobile: "/images/image-social.png",
          imageDesktop: "/images/image-social.png",
          title: "Movilidad para todos",
        },
        {
          imageMobile: "/images/image-social.png",
          imageDesktop: "/images/image-social.png",
          title: "Movilidad para todos",
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
          label: "El carro de tus sueños",
          value: "Elcarrodetussueños",
          content: (
            <>
              <DeTusSuenos />
            </>
          ),
        },
        {
          label: "Prótesis con FundaFe",
          value: "PrótesisconFundaFe",
          content: (
            <>
              <ProtesisConFundafe />
            </>
          ),
        },
      ],
      defaultValue: "Elcarrodetussueños",
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
