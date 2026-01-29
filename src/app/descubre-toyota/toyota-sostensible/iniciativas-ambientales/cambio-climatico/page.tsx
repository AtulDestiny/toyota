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
          imageMobile: "/images/cambio-climatico-banner-mob.png",
          imageDesktop: "/images/cambio-climatico-banner-desk.png",
          title: " ",
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

  // make PreventiveCampaignsServicesBanner component to accept dynamic props
  // {
  //   component: "PreventiveCampaignsServicesBanner",
  //   props: {
  //     slides: [
  //       {
  //         imageMobile: "/images/image 257.png",
  //         imageDesktop:
  //           "/images/image 257.png",
  //         title: "Sistema depre-colisión frontal (PCS)*",
  //       },
  //       // ... more slides
  //     ],
  //   },
  // },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Reto Medio Ambiental Toyota 2050`,
        fontSize: {
          base: "32px",
          medium: "32px",
          xl: "56px",
        },
        lineHeight: {
          base: "110%",
          medium: "normal",
          xl: "61.6px",
        },
        letterSpacing: {
          base: "-1.12px",
          medium: "",
          xl: "-1.12px",
        },
        width: {
          base: "85%",
          medium: "calc(100% - 80px)",
          xl: "70%",
        },
        alignSelf: {
          base: "stretch",
          medium: "",
          xl: "",
        },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        margin: {
          base: "38px auto 0",
          medium: "",
          xl: "112px 0px 0",
        },
        verticalAlign: "middle",
      },
      description: {
        text: "En Toyota entendemos que somos más que una compañía que ofrece soluciones integrales de movilidad. Somos ciudadanos del mundo y, por consiguiente, tenemos una responsabilidad con el planeta: dejarlo incluso mejor de como lo encontramos.",
        fontSize: { base: "16px", medium: "12px", xl: "22px" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        width: {
          base: "85%",
          medium: "",
          xl: "70%",
        },
        fontWeight: {
          base: "400",
          medium: "400",
          xl: "400",
        },
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        alignSelf: {
          base: "stretch",
          medium: "",
          xl: "",
        },
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        // padding: "38px 16px 0",
        padding: {
          base: "",
          medium: "",
          xl: "0 0",
        },
        margin: {
          base: "40px auto 47px",
          medium: "10px 0px 0px 0px",
          xl: "56px auto 72px",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: {
          base: "start",
          medium: "center",
          xl: "center",
        },
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
    component: "VideoPlayer",
    props: {
      image: {
        src: "/images/image 235.png",
        alt: "Captura de pantalla",
      },
      containerStyle: {
        maxHeight:{base:"199px", xl: "454px"},
        maxWidth:{base:"344px", xl: ""},

      },
      PlayiconStyle: {
        maxHeight:{base:"38px", xl: "454px"},
        maxWidth:{base:"38px", xl: ""},
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Los 6 desafios medioambientales`,
        fontSize: {
          base: "32px",
          medium: "32px",
          xl: "56px",
        },
        lineHeight: {
          base: "41.6px",
          medium: "normal",
          xl: "61.6px",
        },
        letterSpacing: {
          base: "",
          medium: "",
          xl: "-1.12px",
        },
        width: {
          base: "85%",
          medium: "calc(100% - 80px)",
          xl: "70%",
        },
        alignSelf: {
          base: "stretch",
          medium: "",
          xl: "",
        },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        margin: {
          base: "70px auto 33px",
          medium: "",
          xl: "112px 0px 72px",
        },
      },
      viewstyle: {
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: {
          base: "start",
          medium: "center",
          xl: "center",
        },
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
    component: "EnvironmentalInitiatives",
    props: {
      title1: "Cero emisiones de CO2 en vehículos nuevos",
      title1Style: {
        fontSize: { base: "14px", xl: "32px" },
        fontWeight: "400",
        height: { base: "70px" },
      },
      description1:
        "Toyota reducirá las emisiones de CO₂ de sus vehículos nuevos en un 90% para 2050, invirtiendo en tecnologías de energías alternativas como electricidad e hidrógeno.",
      description1Style: {
        fontSize: { base: "12px", xl: "22px" },
        maxWidth:{base:"336px" ,xl:""},
        marginTop:{base:"",xl:"74px"},
      },
      title2: "Cero emisiones de CO2 en el ciclo de vida del producto",
      title2Style: {
        fontSize: { base: "18px", xl: "32px" },
        fontWeight: "400",
      },
      description2:
        "Toyota eliminará las emisiones de CO₂ en todo el ciclo de vida del vehículo mediante un sistema de gestión medioambiental en su cadena de suministro.",
      description2Style: {
        fontSize: { base: "12px", xl: "22px" },
        fontWeight: "400",
        height: { base: "80px", xl: "415px" },
        padding: { base: "0px 0 90px 0px", xl: "0" },
      },
      image1: "/images/reto-img-01.png",
      image2: "/images/reto-img-02.png",
      image3: "/images/reto-img-03.png",
      title3: "  ",
      title3Style: {
        fontSize: { base: "22px", xl: "32px" },
        fontWeight: "400",
        height: { base: "104px" },
      },
      bgColor1: "#1b2236",
      bgColor2: "#2c2e3e",

      // Container styling - keeping the original padding for mobile
      containerStyle: {
        padding: { base: "15px", xl: "24px" },
        gap: { base: "15px", xl: "24px" },
        backgroundColor:"#FFF",
        alignItems:{base:"center",medium:"center" ,large:"center"}
      },

      // Width and height values will be handled directly in the component for desktop
      image1Style: {
        width: { base: "50%", xl: "33%" },
        height: { base: "auto", xl: "415px" },
        // maxWidth:{base:"163px",medium:"",large:"",   xl:""},
        // maxHeight:{base:"260px",medium:"",large:"",   xl:""},
        objectFit: "cover",
      },
      image2Style: {
        width: { base: "50%", xl: "33%" },
        height: { base: "260px", xl: "415px" },
        objectFit: "cover",
        // maxWidth:{base:"163px",medium:"",large:"",   xl:""},
        // maxHeight:{base:"260px",medium:"",large:"",   xl:""},
        minHeight:{base:"260px",medium:"",large:"",   xl:""},
      },
      image3Style: {
        width: { base: "50%" },
        height: { base: "260px", xl: "415px" },
      },
    },
  },

  {
    component: "EnvironmentalInitiatives",
    props: {
      title1: "Minimizar y optimizar el uso del agua",
      title1Style: {
        fontSize: { base: "14px", xl: "32px" },
        fontWeight: "400",
        height: { base: "80px" },
      },
      description1:
        "Toyota reducirá el uso de agua en sus procesos de fabricación y optimizará su uso en todas las etapas de producción mediante diversas iniciativas.",
      description1Style: {
        fontSize: { base: "12px", xl: "22px" },
      },
      title2: " Establecer una sociedad basada en el reciclaje",
      title2Style: {
        fontSize: { base: "18px", xl: "32px" },
        fontWeight: "400",
      },
      description2:
        "Toyota promueve la economía circular mediante la reutilización de materiales y la reducción de residuos, contribuyendo a una sociedad sostenible.",
      description2Style: {
        fontSize: { base: "12px", xl: "22px" },
        fontWeight: "400",
        height: { base: "80px", xl: "415px" },
        padding: { base: "0px 0 90px 0px", xl: "0" },
      },
      image1: "/images/reto-img-04.png",
      image2: "/images/reto-img-05.png",
      image3: "/images/reto-img-06.png",
      title3: " ",
      // title3: "Establecer una sociedad futura en armonía con la naturaleza Toyota se compromete a conservar la biodiversidad y a implementar prácticas sostenibles, trabajando en proyectos de reforestación y conservación de ecosistemas. ",
      title3Style: {
        fontSize: { base: "22px", xl: "32px" },
        fontWeight: "400",
        height: { base: "104px" },
      },
      bgColor1: "#1b2236",
      bgColor2: "#2c2e3e",

      // Container styling - keeping the original padding for mobile
      containerStyle: {
        padding: { base: "15px", xl: "24px" },
        gap: { base: "15px", xl: "24px" },
        alignItems:{base:"center",medium:"center" ,large:"center"},
        backgroundColor:"#FFF",
      },

      // Width and height values will be handled directly in the component for desktop
      image1Style: {
        width: { base: "50%", xl: "33%" },
        height: { base: "auto", xl: "415px" },
        objectFit: "cover",
        // maxWidth:{base:"163px",medium:"",large:"",   xl:""},
        // maxHeight:{base:"260px",medium:"",large:"",   xl:""},
      },
      image2Style: {
        width: { base: "50%", xl: "33%" },
        height: { base: "260px", xl: "415px" },
        objectFit: "cover",
        // maxWidth:{base:"163px",medium:"",large:"",   xl:""},
        // maxHeight:{base:"260px",medium:"",large:"",   xl:""},
        minHeight:{base:"260px",medium:"",large:"",   xl:""},
      },
      image3Style: {
        width: { base: "50%" },
        height: { base: "260px", xl: "415px" },
        // maxWidth:{base:"163px",medium:"",large:"",   xl:""},
        // maxHeight:{base:"260px",medium:"",large:"",   xl:""},
        minHeight:{base:"260px",medium:"",large:"",   xl:""},
      },
    },
  },

  //add here Video Player Components

  //add here 5 card Components or add single card for image , title and paragraph

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Pero el reto no queda ahí, nuestro compromiso va más allá`,
        fontSize: {
          base: "26px",
          medium: "32px",
          xl: "26px",
        },
        lineHeight: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        letterSpacing: {
          base: "",
          medium: "",
          xl: "",
        },
        width: {
          base: "85%",
          medium: "calc(100% - 80px)",
          xl: "70%",
        },
        alignSelf: {
          base: "stretch",
          medium: "",
          xl: "",
        },
        fontFamily: {
          base: "var(--font-ToyotaType-Bold)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Bold)",
        },
        fontWeight: {
          base: "700",
          medium: "",
          xl: "700",
        },
        fontStyle: "normal",
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        margin: {
          base: "67px auto 0",
          medium: "",
          xl: "112px 0px 0",
        },
      },
      description: {
        text: `Mejorando el uso del agua, fomentando las tecnologías de reciclaje, el fin de vida útil y estableciendo una sociedad en armonía con la naturaleza.`,
        fontSize: { base: "16px", medium: "12px", xl: "22px" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        width: {
          base: "85%",
          medium: "",
          xl: "70%",
        },
        fontWeight: {
          base: "400",
          medium: "400",
          xl: "400",
        },
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        alignSelf: {
          base: "stretch",
          medium: "",
          xl: "",
        },
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        // padding: "38px 16px 0",
        padding: {
          base: "",
          medium: "",
          xl: "0 0",
        },
        margin: {
          base: "34px auto 72px",
          medium: "10px 0px 0px 0px",
          xl: "32px auto 112px",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: {
          base: "start",
          medium: "center",
          xl: "center",
        },
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
