"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
// import { max } from "rxjs";

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
          imageMobile: "/images/Cabecera-SUV-Toyota-1.png",
          imageDesktop: "/images/Cabecera-SUV-Toyota-1.png",
          title: "Manual del buen conductor",
        },
       
      ], // Passing slides data inline
      isPlayicon:false,
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
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Bienvenido a la familia Toyota, en donde nos cuidamos los unos a los otros, por esto presentamos nuestro Manual del Buen Conductor Toyota, esperando sea una guía de consulta frente a cualquier duda que puedan tener.`,
        fontSize: {
          base: "22px",
          medium: "26px",
          xl: "56px",
        },
        lineHeight: {
          base: "normal",
          medium: "normal",
          xl: "61.6px",
        },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: {
          base: "700",
          medium: "400",
          xl: "400",
        },
        fontStyle: "normal",
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        padding: {
          base: "",
          medium: "",
          xl: "",
        },
        maxWidth: {
          xl: "70%",
        },
        letterSpacing: {
          base: "",
          medium: "",
          xl: "-1.12px",
        },
        margin: {
          base: "38px 16px 38px 16px",
          medium: "",
          xl: "124px 0px 56px",
        },

        color: "",
      },
      // description: { 
      //   text: `Por esto presentamos nuestro Manual del Buen Conductor Toyota, esperando sea una guía de consulta frente a cualquier duda que puedan tener.`,
      //   fontSize: { base: "16px", medium: "12px", xl: "22px" },
      //   fontFamily: {
      //     base: "var(--font-toyotaDisplay)",
      //     medium: "var(--font-ToyotaType-Regular)",
      //     xl: "var(--font-ToyotaType-Regular)",
      //   },
      //   fontStyle: {
      //     base: "normal",
      //     medium: "normal",
      //     xl: "normal",
      //   },
      //   width: {
      //     base: "",
      //     medium: "",
      //     xl: "100%",
      //   },
      //   fontWeight: {
      //     base: "400",
      //     medium: "400",
      //     xl: "400",
      //   },
      //   textAlign: {
      //     base: "left",
      //     medium: "center",
      //     xl: "center",
      //   },
      //   maxWidth: {
      //     xl: "70%",
      //   },
      //   lineHeight: {
      //     base: "30.4px",
      //     medium: "normal",
      //     xl: "normal",
      //   },
      //   // padding: "38px 16px 0",
      //   padding: {
      //     base: "0 16px 0px 16px",
      //     medium: "10px 0px 0px 0px",
      //     xl: "0px 0px 0px 0px",
      //   },
      //   margin: {
      //     base: "40px 0 39px 0",
      //     medium: "",
      //     xl: "0px auto 112px",
      //   },
      // },
    },
  },
  // add here video player  : Trabajamos para tu seguridad y la de tu familia
  {
    component: "SafetyBanner",
    props: {
      title: "Trabajamos para tu seguridad y la de tu familia",
      description:
        "Con tu conciencia vial, responsabilidad y la mejor tecnología en seguridad de Toyota podemos hacer grandes cambios.",
      imageSrc: "/images/vision_image.png",
      // videoIconSrc: "/images/icons/player-icon.png",
      viewStyle: {
        margin: {
          xl: "112px auto",
        },
        maxWidth: {
          xl: "70%",
        },
      },
      isVideoIcon:false,
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Descubre Toyota`,
        fontSize: { base: "14px", xl: "14px" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "19.6px",
        textAlign: "center",
        margin: "0 auto",
        padding: {
          base: "38px 15px 0px",
          medium: "48px 15px 0px",
          xl: "48px 15px 0px",
        },
      },
      description: {
        text: `Material Descargables`,
        fontSize: {
          base: "32px",
          medium: "26px",
          xl: "56px",
        },
        lineHeight: {
          base: "41.6px",
          medium: "normal",
          xl: "61.6px",
        },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: {
          base: "center",
          medium: "center",
          xl: "center",
        },
        letterSpacing: {
          base: "",
          medium: "",
          xl: "-1.12px",
        },
        padding: {
          base: "10px 15px 15px",
          medium: "",
          xl: "12px 0px 78px",
        },
        color: "",
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        backgroundColor: "#E7EDF1",
        alignItems: "center",
        justifyContent: "center",
        width: {
          base: "100%",
          medium: "",
          xl: "100%",
        },
        maxHeight: {
          base: "auto",
          medium: "450px",
          xl: "450px",
        },

        padding: {
          base: "",
          medium: "",
          xl: "0 30px",
        },
        margin: {
          base: "auto",
          medium: "",
          xl: "auto",
        },
      },
    },
  },

  {
    component: "RedCardInfo",
    props: {
      titleFontSize:{base:"22px"},
      title:`Manual de </br> buen conductor </br> PDF`,
      backgroundColor:"#D42224",
      leftIcon: "/images/icons/car-Vector.png",
      rightIcon: "/images/icons/right-arrow-Vector.png",
      iconAltLeft: "Car Check",
      iconAltRight: "Arrow",
      downloadUrl: "/images/pdf/Manual_del_buen_conductor_Toyota.pdf",
    },
  },

  // add here Manual del  buen conductor PDF components
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
