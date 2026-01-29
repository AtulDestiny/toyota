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
          imageMobile: "/images/image-seguridad vial.png",
          imageDesktop: "/images/image-seguridad vial.png",
          title: "Conciencia vial",
        },
        // {
        //   imageMobile: "/images/image-seguridad vial.png",
        //   imageDesktop: "/images/image-seguridad vial.png",
        //   title: "Parque de seguridad vial",
        // },
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
        text: "Parque de seguridad vial",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "110%",
        textAlign: "left",
        padding: {
          base: "50px 15px 0px 10px",
          medium: "50px 15px 0px 10px",
          xl: "0 10px 10px 54px",
        },
        letterSpacing: "-1.12px",
        verticalAlign: "middle",
      },
      layoutProps: {
        marginTop: "100px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Con nuestra campaña de seguridad vial, buscamos educar a los futuros conductores del país y concientizar a los más pequeños de la familia, sobre la importancia del respeto de las señales de tránsito y el comportamiento en las calles de la ciudad.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 20px 15px", xl: "73px  0px 58px" },
      },
    },
  },
  // {
  //   component: "VideoPlayer",
  //   props: {
  //     containerStyle: {
  //       padding: { base: "25px 0px 20px", xl: "20px 20px 100px 20px" },
  //       maxWidth: { base: "344px", xl: "771px" },
  //       minWidth:{ base: "344px", xl: "" },
  //       height: { base: "auto", xl: "446px" },
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
  //         minHeight:{base:"199px", xl: ""},
  //       },
  //     },
  //   },
  // },
  //add here video player component
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "La campaña está compuesta por 3 partes:",
        fontSize: { base: "32px", xl: "52px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "100%",
        textAlign: "left",
        padding: { base: "30px 15px 20px 20px", xl: "30px 15px 50px 20px" },
        letterSpacing: "-1.12px",
      },
    },
  },

  {
    component: "EnvironmentalInitiatives",
    props: {
      layoutType: "3-3", // Use 3-3 layout instead of 3-2
      title1: "Asumiendo roles de la vida cotidiana",
      title1Style: {
        fontSize: { base: "14px", xl: "32px" },
        fontWeight: "400",
        height: { base: "80px" },
        margin:{base:"", large:"" ,xl:"0px 0px 30px 0px" ,xxl:"0px 0px 10px 0px"}
      },
      description1:
        "Niños y adultos asumen roles de la vida cotidiana que recrean la realidad de las vías de la ciudad. Estas acciones se desarrollan en medio de un parque temático itinerante que de manera real muestra los componentes de una vía pública colombiana.",
      description1Style: {
        fontSize: { base: "12px", xl: "22px" },
      },

      // Position 4: Image (same as position 6)
      image2: "/images/parque-de-seguridad-vial-0013.jpg",

      // Position 5: Text content (moved from position 4)
      title4: "Promoviendo el reciclaje",
      title4Style: {
        fontSize: { base: "18px", xl: "32px" },
        fontWeight: "400",
      },
      description4:
        "Se promueve el reciclaje como acción clave para la conservación del medio ambiente mediante la correcta disposición de residuos e incentivando a los estudiantes a adoptar prácticas sostenibles en su vida cotidiana.",
      description4Style: {
        fontSize: { base: "12px", xl: "22px" },
        fontWeight: "400",
        height: { base: "80px", xl: "415px" },
        padding: { base: "0px 0 90px 0px", xl: "0" },
      },

      image1: "/images/parque-de-seguridad-vial-0010.jpg",
      image3: "/images/blue-bgg.png",
      image4: "/images/parque-de-seguridad-vial-0012.jpg",
      title3:
        "Capacitación en colegios",
      title3Style: {
        fontSize: { base: "22px", xl: "32px" },
        fontWeight: "400",
        height: { base: "104px" ,xl:"auto" },
        margin:{base:"", large:"" ,xl:"0px 0px 30px 0px" ,xxl:"0px 0px 30px 0px"}
      },
      description3:"Especialistas en seguridad vial se encargan de capacitar y preparar a los docentes de los colegios, quienes a su vez se encargarán de reforzar la información en sus clases.",
    description3Style: {
      fontSize: { base: "12px", xl: "22px" },
      fontWeight: "400",
      height: { base: "auto", xl: "auto" },
      padding: { base: "0px 0 30px 0px", xl: "0" },
    },
      bgColor1: "#1b2236",
      bgColor2: "#2c2e3e",
      bgColor3: "#2c2e3e",
      bgColor4: "#2c2e3e", // Background color for new position 5

      // Container styling - keeping the original padding for mobile
      containerStyle: {
        padding: { base: "15px", xl: "24px" },
        gap: { base: "15px", xl: "24px" },
        backgroundColor: "#FFF",
      },

      // Width and height values will be handled directly in the component for desktop
      image1Style: {
        width: { base: "50%", xl: "33%" },
        height: { base: "auto", xl: "415px" },
        objectFit: "cover",
      },
      image2Style: {
        width: { base: "50%", xl: "33%" },
        height: { base: "250px", xl: "415px" },
        objectFit: "cover",
      },
      image3Style: {
        width: { base: "50%" },
        height: { base: "250px", xl: "415px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Educamos y transformamos la movilidad para un futuro mejor, promoviendo la seguridad vial a través de la conciencia vial y ambiental.",
        fontSize: { base: "26px", xl: "26px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "110%",
        marginTop: {
          base: "40px",
          xl: "77px",
        },
        textAlign: "left",
        padding: { base: "10px 15px 50px", xl: "0px 0px 50px" },
        letterSpacing: "-1.12px",
      },
    },
  },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "Mejorando el uso del agua, fomentando las tecnologías de reciclaje, el fin de vida útil y estableciendo una sociedad en armonía con la naturaleza.",
  //       fontSize: { base: "16px", xl: "22px" },
  //       fontFamily: "var(--font-toyotaDisplay)",
  //       fontStyle: "normal",
  //       fontWeight: "500",
  //       maxWidth: {
  //         xl: "70%",
  //       },
  //       lineHeight: "30.4px",
  //       textAlign: { base: "left", xl: "center" },
  //       padding: { base: "32px 16px 50px 15px", xl: "53px  0px 113px" },
  //     },
  //   },
  // },
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
