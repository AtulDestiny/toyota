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
          imageMobile: "/images/54-social-diversidad-equidad-e-inclusion.png",
          imageDesktop: "/images/varios-inclusioncancer-prostata1920x630web-1.png",
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
        text: "Cáncer de Próstata",
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
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Toyota refuerza su compromiso con la salud Masculina promoviendo la prevención, detección temprana del cáncer de próstata, la empatía y el bienestar integral en su comunidad.",
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

  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/cancer_de_prostata_76184_x_442_escritorio.png",
        alt: "Lotus flower",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "47px 15px 70px", xl: "45px 15px 105px" },
      },
    },
  },
  //add here Title , Paragraph  Image section Component
  {
    component: "TestimonalCard",
    props: {
      backgroundColor: "#111827",
      title: "Esta campaña contribuye a:",
      description:
        "- Fomentar la prevención y detección temprana del cáncer de próstata. <br/>  - Desafiar estigmas sobre la salud masculina y los controles médicos. <br/>- Promover una cultura de cuidado, empatía y bienestar integral.",
      imageSrc: "/images/03cancer-de-prostata754x379web.jpg",
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Prevención y cuidado: Promoviendo una cultura de salud.",
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
        text: "Con estas iniciativas, reafirmamos nuestro compromiso con la salud de las personas y la creación de una sociedad más consciente y empática. Porque cuidar de nosotros mismos y de quienes nos rodean es el primer paso hacia un futuro más saludable y solidario.",
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
      title: {
        text: "En Toyota creemos que el mejor camino es recorrerlo con salud y conciencia.",
        fontSize: { base: "26px", xl: "2rem" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        margin: {
          xl: "50px 0 100px",
        },
        lineHeight: "normal",
        textAlign: { base: "left", xl: "center" },
        padding: "47px 16px 0px 15px",
      },
    },
  },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "“para Toyota, el trabajo con energías renovables no debe darse solo en el ámbito automotriz. Por ello queremos aprovechar la energía solar, abundante en la zona, para establecer el suministro energético de esta comunidad de forma sostenible”.",
  //       fontSize: { base: "16px", xl: "22px" },
  //       fontFamily: "var(--font-toyotaDisplay)",
  //       fontStyle: "normal",
  //       fontWeight: "500",
  //       lineHeight: "30.4px",
  //       maxWidth: {
  //         xl: "90%",
  //       },
  //       textAlign: { base: "left", xl: "center" },
  //       padding: "34px 16px 0px 15px",
  //     },
  //   },
  // },
  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     image: {
  //       src: "/images/night_light.png",
  //       alt: "Toyota Hybrid Car",
  //       width: { base: "100%", xl: "80%" },
  //       height: { base: "auto", xl: "400px" },
  //       // borderRadius: "10px",
  //       margin: {
  //         xl: "142px auto 174px",
  //       },
  //       objectFit: "cover",
  //       padding: { base: "47px 0px 0px" },
  //     },
  //   },
  // },
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
  // //add here video player Component
  // {
  //   component: "VideoPlayer",
  //   props: {
  //     image: {
  //       src: "/images/video-cancer.png",
  //       alt: "Captura de pantalla",
  //     },
  //   },
  // },
  // //update SliderGallery component to accept dynamic data
  // {
  //   component: "SliderGallery",
  //   props: {
  //     backgroundColor: "#F5F5F5",
  //     color: "#1A1A1A",
  //     head: {
  //       subtitle: "Explora nuestros servicios",
  //       title: "Beneficios exclusivos para tu Toyota",
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

export default function CancerDeProstata() {
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
