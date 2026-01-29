"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import { link } from "fs";

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
          imageMobile: "/images/Cumplimiento-banner-mob-01001.png",
          imageDesktop: "/images/Cumplimiento-banner-desk-01001.png",
          title: "¿Cómo opera el canal de integridad de Toyota?",
        },
        {
          imageMobile: "/images/Cumplimiento-banner-mob-01002.png",
          imageDesktop: "/images/Cumplimiento-banner-desk-01002.png",
          title: " ",
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
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Cumplimiento",
        fontSize: { base: "32px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "110%",
        textAlign: "left",
        padding: { base: "56px 15px 0px", xl: "7rem 2rem 0" },
        letterSpacing: "-1.12px",
      },
      verticalAlign: "middle",
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "El cumplimiento es clave para proteger la integridad y la reputación de la marca. Mitigar delitos, asi como cumplir las regulaciones refuerza nuestro compromiso ético y responsabilidad social.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          base: "68ch",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 72px 15px", xl: "32px  2rem 7rem" },
      },
    },
  },

  {
    component: "CumplimientoMaterials",
  },

  // {
  //   component: "VideoPlayer",
  //   props: {
  //     containerStyle: {
  //       padding: { base: "45px 20px 20px", xl: "20px 20px 100px 20px" },
  //       maxWidth: { base: "", xl: "764px" },
  //       height: { base: "auto", xl: "539px" },
  //       margin: { base: "0 auto", xl: "0 auto" },
  //       overflow: "hidden",
  //     },
  //     PlayiconStyle: {
  //       maxHeight:{base:"38px", xl: "454px"},
  //       maxWidth:{base:"38px", xl: ""},
  //     },
  //     image: {
  //       src: "/images/videothumb.svg",
  //       style: {
  //         height: { base: "auto", xl: "100%" },
  //         maxHeight:{base:"199px", xl: ""},
  //         minWidth: { base: "344px", xl: "" },
  //       },
  //     },
  //   },
  // },

  //add here Nuestro compromiso  Component three images / GIF
  {
    component: "CanWeHelpYou",
    props: {
      title: "Nuestro compromiso ",
      subtitle: "Cumplimiento",
      card1: {
        bannerImg: "/images/Cumplimiento-00101-desk.png",
        bannerAlt: "vehicle-",
        iconImg: "/images/icons/EyVector.png",
        iconAlt: "Cumplimiento-",
        text: "Canal de integridad",
        link: "https://www.canaldeintegridadtoyotacolombia.com/",
      },
      card2: {
        bannerImg: "/images/Cumplimiento-00102-desk.png",
        bannerAlt: "vehicle-",
        // iconImg: "/images/icons/starGroup.png",
        iconAlt: "Cumplimiento-",
        text: "",
      },
      card3: {
        bannerImg: "/images/Cumplimiento-00101-desk.png",
        bannerAlt: "vehicle-",
        // iconImg: "/images/icons/starGroup.png",
        iconAlt: "Cumplimiento-",
        text: "",
      },
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
