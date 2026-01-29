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
  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     layout: "horizontal",
  //     title: {
  //       text: `Circularidad`,
  //       fontSize: {
  //         base: "14px",
  //         medium: "32px",
  //         xl: "14px",
  //         xxl: "14px",
  //       },
  //       color: "#000000",
  //       lineHeight: {
  //         base: "19.6px",
  //         medium: "140%",
  //         xl: "140%",
  //         xxl: "140%",
  //       },
  //       width: {
  //         base: "100%",
  //         medium: "calc(100% - 80px)",
  //         xl: "70%",
  //       },

  //       fontFamily: {
  //         base: "var(--font-toyotaDisplay)",
  //         medium: "var(--font-toyotaDisplay)",
  //         xl: "var(--font-toyotaDisplay)",
  //       },
  //       fontWeight: "400",
  //       fontStyle: "normal",
  //       textAlign: {
  //         base: "left",
  //         medium: "center",
  //         xl: "center",
  //       },
  //       padding: {
  //         base: "0 15px",
  //         medium: "",
  //         xl: "",
  //       },
  //       margin: {
  //         base: "48px auto 0",
  //         medium: "",
  //         xl: "105px 0px 0",
  //         xxl: "105px 0px 0",
  //       },
  //       letterSpacing: {
  //         base: "0px",
  //         medium: "",
  //         xl: "0px",
  //         xxl: "0px",
  //       },
  //     },
  //     viewstyle: {
  //       flexDirection: { base: "column", xl: "row" },
  //       alignItems: "center",
  //       justifyContent: {
  //         base: "start",
  //         medium: "center",
  //         xl: "center",
  //       },
  //       width: {
  //         base: "100%",
  //         medium: "",
  //         xl: "100%",
  //       },
  //       maxHeight: {
  //         base: "auto",
  //         medium: "450px",
  //         xl: "450px",
  //       },
  //       padding: {
  //         base: "",
  //         medium: "",
  //         xl: "0 30px",
  //       },
  //       margin: {
  //         base: "auto",
  //         medium: "",
  //         xl: "auto",
  //       },
  //     },
  //   },
  // },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Pintura a base de agua`,
        fontSize: {
          base: "56px",
          medium: "32px",
          xl: "56px",
        },
        color: "#000",

        lineHeight: {
          base: "110%",
          medium: " 110%",
          xl: " 110%",
          xxl: " 110%",
        },
        letterSpacing: {
          base: "-1.12px",
          medium: "",
          xl: "-1.12px",
        },
        width: {
          base: "100%",
          medium: "calc(100% - 80px)",
          xl: "70%",
        },

        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        padding: {
          base: "0 15px",
          medium: "",
          xl: "",
        },
        margin: {
          base: "10px auto 0",
          medium: "",
          xl: "13px 0px 0",
        },
      },
      description: {
        text: `En la red de concesionarios Toyota, utilizamos esmaltes con resinas a base de agua en nuestros procesos de repintado, ofreciendo excelente poder cubriente, fácil aplicación y tiempos de proceso óptimos.`,
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
          base: "100%",
          medium: "",
          xl: "80%",
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
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        letterSpacing: "0px",
        // padding: "38px 16px 0",
        margin: {
          base: "48px auto 28px ",
          medium: "",
          xl: "73px auto 89px",
        },

        padding: {
          base: "0 15px",
          medium: "",
          xl: "0 159px",
          xxl: "0 159px",
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

  // {
  //   component: "VideoPlayer",
  //   props: {
  //     image: {
  //       src: "/images/03pintura-a-base-de-agua754x379web.png",
  //       alt: "Captura de pantalla",
  //     },
  //     containerStyle: {
  //       maxHeight: "454px",
  //     },
  //   },
  // },

  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/03pintura-a-base-de-agua754x379web.png",
        alt: "Captura de pantalla",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
      },
    },
  },

  //add here video player Component
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Ventajas de este proceso",
        fontSize: {
          base: "26px",
          medium: "32px",
          xl: "26px",
        },
        lineHeight: {
          base: "normal",
          medium: "61.6px",
          xl: "100%",
          xxl: "100%",
        },
        letterSpacing: {
          base: "",
          medium: "",
          xl: "0px",
          xxl: "0px",
        },
        fontFamily: {
          base: "var(--font-toyotaType-Bold)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: {
          base: "700",
          medium: "400",
          xl: "700",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        textAlign: "left",
        padding: {
          base: "0 15px",
          medium: "",
          xl: "32px 0px 0px",
        },
        margin: {
          base: "41px 0 0",
          xl: "75px 0 0",
        },
        flex: {
          base: "",
          medium: "",
          xl: "auto",
        },
      },
      description: {
        text: `- Menor emisión de disolventes orgánicos al medio ambiente. \n - Excelentes acabados de colores sólidos, metalizados y perlados. \n - Reducción de tiempos de trabajo debido al secado rápido y eficiente. \n - Menor consumo de material por el alto poder cubriente de los tintes.`,
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
        fontWeight: {
          base: "400",
          medium: "400",
          xl: "400",
        },
        alignSelf: {
          base: "",
          medium: "",
          xl: "strech",
        },
        textAlign: "left",
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        // padding: "38px 16px 0",
        padding: {
          base: "0 15px",
          medium: "10px 0px 0px 0px",
          xl: "39px 0px 0px 0px",
        },
        margin: {
          base: "34px 0 44px",
          medium: "auto",
          xl: "auto",
        },
        minWidth: {
          base: "",
          medium: "",
          xl: "650px",
          xxl: "650px",
        },
      },
      image: {
        src: "/images/02pintura-a-base-de-agua754x379web.png",
        alt: "car interior",
        width: { base: "100%", xl: "100%" },
        height: "auto",
        objectFit: "fill",
        padding: {
          base: "0",
          medium: "0px 0px 0px 0px",
          xl: "0px 0px 0px 0px",
        },
        margin: {
          base: "0px 0px 0px 0px",
          medium: "0px 0px 0px 0px",
          xl: "75px auto 0px",
        },
        borderRadius: {
          base: "",
          medium: "",
          xl: "8px",
        },
        maxWidth: {
          base: "",
          medium: "",
          xl: "687px",
        },
        color: "red",
        minWidth: {
          base: "",
          medium: "",
          xl: "687px",
        },
        minHeight: {
          base: "",
          medium: "450px",
          xl: "450px",
        },
        gap: { base: "20px", xl: "0px", xxl: "0px" },
      },

      viewstyle: {
        display: "flex",
        flexDirection: { base: "column-reverse", xl: "row" },
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap-reverse",
        maxHeight: {
          base: "auto",
          medium: "450px",
          xl: "450px",
        },
        width: {
          base: "",
          medium: "",
          xl: "100%",
        },
        margin: {
          base: "",
          medium: "113px auto",
          xl: "0px auto 0px ",
        },
      },
    },
  },
  // add here slider of the Recogida y reciclaje de baterías
  {
    component: "HybridMythsCarousel",
    props: {
      header: "Buscamos minimizar los residuos",
      subHeader: "Contribución al medio ambiente",
      paddingTop: { base: "68px", xl: "138px" },
      data: [
        {
          title: "Residuos de la pintura y agua contaminada",
          description:
            "Los sobrantes de pintura y el agua contaminada reciben un tratamiento de separación de elementos sólidos para optimizar su disposición final.",
          image: "/images/ambiente--1.jpg",
        },
        {
          title: "Reutilización del agua",
          description:
            "El agua descontaminada se puede reutilizar en procesos de limpieza, o bien, desechar en el sistema de alcantarillado sin que esta represente un peligro ambiental.",
          image: "/images/ambiente--2.png",
        },
        {
          title: "Nuestros técnicos Toyota",
          description:
            "Los técnicos de la red de concesionarios, también reciben capacitación en cuanto al tratamiento de estos residuos, garantizando el manejo adecuado de los sobrantes sólidos, y la correcta separación de elementos residuales según su procedencia (base agua para pinturas, y base solvente para fondos y barnices).",
          image: "/images/ambiente--3.png",
        },
        {
          title: "Respaldo de nuestros aliados",
          description:
            "Nuestros proveedores garantizan todos los requisitos legislativos actuales y futuros en cuanto a emisión de compuestos orgánicos volátiles, además, brindan un continuo soporte técnico en toda nuestra red de concesionarios, aportando a la mejora continua en nuestros procesos.",
          image: "/images/ambiente--4.png",
        },
      ],
    },
  },

  // {
  //   component: "TestimonalCard",
  //   props: {
  //     backgroundColor: "#73675C",
  //     title: "Ampliación de la vida útil de las piezas del vehículo",
  //     description:
  //       "Durante el tiempo que un coche circula, muchas de sus piezas se pueden reacondicionar y reutilizar. Los mismos principios se aplican cuando un vehículo se prepara para el desguace. Aún puede contener muchas piezas que se pueden recuperar para su reacondicionamiento y reutilización. ",
  //     imageSrc: "/images/agua-slider.png",
  //     paddingTop: { base: "68px", xl: "180px" },
  //     padding: { base: "45px 15px", xl: "80px 15px 60px" ,xxl:"80px 15px 60px" }

  //   },
  // },
  // add here section with title , paragraph and image  : Ampliación de la vida útil de las piezas del vehículo
];

export default function GestionAuga() {
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
