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
    component: "MainSlider", // Component name
    props: {
      slides: [
        {
          imageMobile: "/images/woven-city-001.png",
          imageDesktop: "/images/woven-city-003.jpg",
          title: "",
        },
        {
          imageMobile: "/images/woven-city-002.png",
          imageDesktop: "/images/woven-city-004.jpg",
          title: "",
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

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Beyond Zero",
        fontSize: { base: "14px", xl: "14px" },
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
          xl: "48px 15px 0px",
        },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Ciudad del futuro Woven city",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "110%",
        textAlign: "left",
        padding: { base: "10px 15px 0px", xl: "0" },
        letterSpacing: "-1.12px",
        verticalAlign: "middle",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Toyota Woven City es la visión más ambiciosa de Toyota hacia un futuro donde la tecnología, la sostenibilidad y la calidad de vida se entrelazan en armonía.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "41%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 0px 15px", xl: "73px  0px 16px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Ubicada al pie del monte Fuji en Japón, esta ciudad experimental está siendo construida sobre el antiguo terreno de una planta de Toyota y representa un laboratorio vivo de innovación urbana, donde se prueban en tiempo real soluciones para una vida más inteligente, segura y sostenible.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "41%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "16px 16px 0px 15px", xl: "16px  0px 58px" },
      },
    },
  },

  {
    component: "VideoPlayer",
    props: {
      videoSrc: "https://www.youtube.com/embed/wGihNp3p1E0",
      isYoutube: true,
    },
  },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     image: {
  //       src: "/images/mix_light_color.png",
  //       alt: "Lotus flower",
  //       width: { base: "100%", xl: "80%" },
  //       maxWidth: {
  //         xl: "761px",
  //       },
  //       margin: {
  //         xl: "0 auto",
  //       },
  //       height: "auto",
  //       objectFit: "contain",
  //       padding: "45px 15px 0px",
  //     },
  //   },
  // },
  //add here Video Player component

  //add here Video component

  {
    component: "ThreeImageGallery",
    props: {
      images: [
        {
          url: "/images/ciudad-del-futuro-woven-city-004.png",
          altText: "nigh red ligh on door",
        },
        {
          url: "/images/ciudad-del-futuro-woven-city-006.png",
          altText: "nigh red ligh on door",
        },
        {
          url: "/images/ciudad-del-futuro-woven-city-005.png",
          altText: "nigh red ligh on door",
        },
      ],
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "En Woven City, todo está interconectado:",
        fontSize: { base: "26px", xl: "26px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "100%",
        textAlign: "left",
        padding: { base: "63px 15px 0px", xl: "114px 0 0" },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Las viviendas, la movilidad, la energía y hasta la salud de sus habitantes. La ciudad ha sido diseñada como un entorno 100% conectado mediante inteligencia artificial, internet, energía limpia y movilidad autónoma, con el propósito de crear nuevas formas de habitar el mundo respetando el planeta y mejorando la vida de las personas.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 63px 15px", xl: "73px  0px 58px" },
      },
    },
  },
  // Update the SliderInfo component to accept dynamic props
  // {
  //   component: "PreventiveCampaignsServicesSlider",
  //   props: {
  //     title: "Un paso a la vez",
  //     items: [
  //       {
  //         image: {
  //           src: "/images/wheels_with_object.png",
  //           alt: "VIN",
  //           width: { base: "100%", xl: "-webkit-fill-available" },
  //           height: { base: "auto", xl: "fit-content" },
  //         },
  //         title: "Diseño y medida",
  //         description: {
  //           intro:
  //             "El primer paso en la producción de sillas de ruedas para perros es el diseño y la toma de medidas generales que se adaptan a la mayoría de los perros. Se debe asegurar que la silla de ruedas sea ajustable para adaptarse a diferentes tamaños y razas de perros.",
  //           list: [],
  //         },
  //       },
  //       {
  //         image: {
  //           src: "/images/wheels_with_object.png",
  //           alt: "VIN",
  //           width: { base: "100%", xl: "-webkit-fill-available" },
  //           height: { base: "auto", xl: "fit-content" },
  //           padding: { base: "0" },
  //         },
  //         title: "Diseño y medida",
  //         description: {
  //           intro:
  //             "El primer paso en la producción de sillas de ruedas para perros es el diseño y la toma de medidas generales que se adaptan a la mayoría de los perros. Se debe asegurar que la silla de ruedas sea ajustable para adaptarse a diferentes tamaños y razas de perros.",
  //           list: [],
  //         },
  //       },
  //     ],
  //   },
  // },
  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "Nucleum Pet",
  //       fontSize: { base: "14px", xl: "14px" },
  //       fontFamily: {
  //         base: "var(--font-ToyotaType-Regular)",
  //         medium: "var(--font-toyotaDisplay)",
  //         xl: "var(--font-toyotaDisplay)",
  //       },
  //       fontStyle: "normal",
  //       fontWeight: "400",
  //       lineHeight: "19.6px",
  //       textAlign: "left",
  //       padding: {
  //         base: "48px 15px 0px",
  //         medium: "48px 15px 0px",
  //         xl: "48px 15px 0px",
  //       },
  //     },
  //   },
  // },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "Testimonios",
  //       fontSize: { base: "26px", xl: "26px" },
  //       fontFamily: "var(--font-ToyotaType-Regular)",
  //       fontStyle: "normal",
  //       fontWeight: "700",
  //       lineHeight: "100%",
  //       textAlign: "left",
  //       padding: { base: "10px 15px 0px", xl: "0" },
  //       letterSpacing: "-1.12px",
  //     },
  //   },
  // },

  // {
  //   component: "HybridMythsCarousel",
  // },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "Descubre cómo las sillas de ruedas para perros han cambiado la vida de estos peludos amigos y sus dueños. Lee los testimonios conmovedores que muestran cómo esta ayuda de movilidad les ha devuelto la alegría de caminar juntos",
  //       fontSize: { base: "16px", xl: "22px" },
  //       fontFamily: "var(--font-toyotaDisplay)",
  //       fontStyle: "normal",
  //       fontWeight: "500",
  //       maxWidth: {
  //         xl: "70%",
  //       },
  //       lineHeight: "30.4px",
  //       textAlign: { base: "left", xl: "center" },
  //       padding: { base: "32px 16px 0px 15px", xl: "73px  0px 58px" },
  //     },
  //   },
  // },
  // add here slider with descrription and image
];

export default function CiudadDelFuturoWovenCity() {
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
