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
          imageMobile: "/images/53-social-diversidad-equidad-e-inclusion.png",
          imageDesktop: "/images/varios-inclusionwayuu1920x630web.jpg",
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
        text: "Todo lo que te mueve",
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
      title: {
        text: "Hogares Bambi",
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
      image: {
        src: "/images/green_field_home_hill.png",
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
        padding: "45px 15px 0px",
      },
    },
  },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     image_margin: {
  //       src: "/images/green_field_home_hill.png",
  //       alt: "Man in the Garage",
  //       width: { base: "100%", xl: "80%" },
  //       height: "auto",
  //       borderRadius: "10px",
  //       objectFit: "contain",
  //       marginTop: "20px",
  //     },
  //   },
  // },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Toyota, en colaboración con la Fundación Hogares Bambi, impulsa programas para el desarrollo integral de la primera infancia, beneficiando a niños en situación de riesgo social y promoviendo un futuro más inclusivo y humano.",
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
        src: "/images/chair_and_table.png",
        alt: "Chair and table",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "45px 0 45px", xl: "45px 15px 0px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Hogares Bambi brinda acogida, protección y atención a menores que enfrentan condiciones de abandono, maltrato, abuso o trabajo infantil, garantizando espacios seguros donde puedan recuperar su equilibrio físico, emocional y psicológico.",
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
        src: "/images/moving_mans.png",
        alt: "Moving Mans",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "45px 0 45px", xl: "45px 15px 0px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "En 2023, realizamos una donación destinada a financiar clases de gimnasia terapéutica, promoviendo el desarrollo de habilidades motrices y fortaleciendo la coordinación y movilidad en sus actividades cotidianas.",
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
        src: "/images/chair_and_table.png",
        alt: "Chair and table",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "45px 0 45px", xl: "45px 15px 0px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Este apoyo refleja nuestra visión de una “movilidad para todos”, entendida no solo como el desplazamiento físico, sino como el impulso al crecimiento, la autonomía y la transformación de vidas desde las etapas más tempranas. </br> <strong>Porque en Toyota, creemos que mover el mundo también es acompañar a quienes más lo necesitan.</strong>",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 65px 15px", xl: "73px  0px 58px" },
      },
    },
  },
  //update SliderGallery component to accept dynamic data
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

export default function HogaresBambi() {
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
