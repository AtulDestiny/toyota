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
          imageMobile: "/images/52-social-diversidad-equidad-e-inclusion.png",
          imageDesktop: "/images/varios-inclusioncancer-mama1920x630web.jpg",
          title: "",
        },
        {
          imageMobile: "/images/52-social-diversidad-equidad-e-inclusion.png",
          imageDesktop: "/images/varios-inclusioncancer-mama1920x630web.jpg",
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
      layout: "horizontal",
      title: {
        text: "Prevención",
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
          xl: "94px 15px 0px",
        },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Cáncer de mama",
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
        text: "Estamos comprometidos con la salud y el bienestar de las mujeres.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 0px 15px", xl: "73px  0px 58px" },
      },
    },
  },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     image: {
  //       src: "/images/lotus_flower.png",
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
  //       padding: { base: "45px 15px 70px", xl: "45px 15px 105px" },
  //     },
  //   },
  // },

  {
    component: "VideoPlayer",
    props: {
      videoSrc: "https://www.youtube.com/embed/OQlmgTJRGcU",
      isYoutube: true,
    },
  },

  //add here Title , Paragraph  Image section component
  {
    component: "TestimonalCard",
    props: {
      backgroundColor: "#111827",
      title: "La prevención salva vidas",
      description:
        "Desde el pilar social de nuestra estrategia, trabajamos por el bienestar de nuestra comunidad. En el marco del día Mundial de la Lucha contra el Cáncer de Mama, nos unimos a esta causa fomentando la cultura del autocuidado y promoviendo el autoexamen como una herramienta clave para la detección temprana en las mujeres.",
      imageSrc: "/images/cancer-de-mama-01web-2025.png",
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Nuestras iniciativas contribuyen directamente a:",
        fontSize: { base: "26px", xl: "2rem" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        textAlign: { base: "left", xl: "center" },
        padding: "47px 16px 0px 15px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "- Promover la salud y calidad de nuestra comunidad. <br/> - Generar conciencia y acceso a la información sobre la prevención del cáncer de mama.<br/>  - Reforzar una cultura organizacional que valora y protege la vida de nuestras mujeres.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "30.4px",
        maxWidth: {
          xl: "90%",
        },
        textAlign: { base: "left", xl: "left" },
        padding: "34px 16px 0px 15px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Porque cuidar la salud es también una forma de avanzar con propósito.",
        fontSize: { base: "26px", xl: "2rem" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        margin: {
          xl: "50px 0 0",
        },
        lineHeight: "normal",
        textAlign: { base: "left", xl: "center" },
        padding: "47px 16px 0px 15px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: " ",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "30.4px",
        maxWidth: {
          xl: "90%",
        },
        textAlign: { base: "left", xl: "center" },
        padding: "34px 16px 0px 15px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/cancer-de-mama-02web-2025.png",
        alt: "Toyota Hybrid Car",
        width: { base: "100%", xl: "80%" },
        height: { base: "auto", xl: "400px" },
        // borderRadius: "10px",
        margin: {
          xl: "50px auto 174px",
        },
        objectFit: "cover",
        padding: { base: "47px 0px 0px" },
      },
    },
  },
  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "Dale una mirada al proceso creativo de la Toyota Prado con diseño Wayúu, única en el mundo.",
  //       fontSize: { base: "32px", xl: "2rem" },
  //       fontFamily: "var(--font-toyotaDisplay)",
  //       fontStyle: "normal",
  //       fontWeight: "500",
  //       lineHeight: "41.6px",
  //       maxWidth: {
  //         xl: "70%",
  //       },
  //       textAlign: { base: "left", xl: "center" },
  //       padding: "51px 14px 47px 17px",
  //     },
  //   },
  // },
  //add here video player component
  // {
  //   component: "VideoPlayer",
  //   props: {
  //     image: {
  //       src: "/images/video-cancer.png",
  //       alt: "Captura de pantalla",
  //     },
  //   },
  // },

  // {
  //   component: "VideoPlayer",
  //   props: {
  //     videoSrc: "/videos/video_toyota_internal_compress.mp4",
  //   },
  // },
  //update SliderGallery component to accept dynamic data
  // {
  //   component: "SliderGallery",
  //   props: {
  //     backgroundColor: "#F5F5F5",
  //     color: "#1A1A1A",
  //     head: {
  //       subtitle: "Contenido destacado",
  //       title: "Prado Wayúu",
  //     },
  //     slides: [
  //       {
  //         id: "slide-1",
  //         data: {
  //           image: "/images/sliderinfo/service-1.png",
  //           title: "Mantenimiento Certificado",
  //           text: "Confía en técnicos especializados y piezas originales para mantener tu Toyota como nuevo.",
  //         },
  //       },
  //       {
  //         id: "slide-2",
  //         data: {
  //           image: "/images/sliderinfo/service-2.png",
  //           title: "Asistencia en Ruta",
  //           text: "Contamos con soporte 24/7 para ayudarte en cualquier momento que lo necesites.",
  //         },
  //       },
  //       {
  //         id: "slide-3",
  //         data: {
  //           image: "/images/sliderinfo/service-3.png",
  //           title: "Garantía Extendida",
  //           text: "Protege tu inversión con planes de garantía pensados para darte tranquilidad.",
  //         },
  //       },
  //     ],
  //   },
  // },
];

export default function CancerDeMama() {
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
