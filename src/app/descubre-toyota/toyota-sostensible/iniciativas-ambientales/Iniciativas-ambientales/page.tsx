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
  // Update the MainSlider component to accept dynamic props
  {
    component: "MainSlider", // Component name
    props: {
      slides: [
        {
          imageMobile: "/images/image 224-Ambiental.png",
          imageDesktop: "/images/image 224-Ambiental.png",
          title: "A- Ambiental",
        },
        {
          imageMobile: "/images/image 224-Ambiental.png",
          imageDesktop: "/images/image 224-Ambiental.png",
          title: "A- Ambiental",
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
        text: `Nuestro deber es conservar los recursos y gestionar nuestra huella ecológica para las generaciones futuras.`,
        fontSize: {
          base: "22px",
          medium: "32px",
          xl: "32px",
        },
        lineHeight: {
          base: "normal",
          medium: "normal",
          xl: "41.6px",
        },
        width: {
          base: "85%",
          medium: "calc(100% - 80px)",
          xl: "70%",
        },

        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: {
          base: "center",
          medium: "center",
          xl: "center",
        },
        margin: {
          base: "59px auto",
          medium: "",
          xl: "112px 0px 120px",
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
    component: "EnvironmentalChallengeGrid",
    props: {
      bgColor: "#373948",
      title: "Reto medio ambiental Toyota 2050",
      description:
        "En Toyota entendemos que somos más que una compañía que ofrece soluciones integrales de movilidad. Somos ciudadanos del mundo y, por consiguiente, tenemos una responsabilidad con el planeta: dejarlo incluso mejor de como lo encontramos.",
      image: "/images/Retomedio.png",
      icons: [
        "/images/CloudIcon.png",
        "/images/FIreIcon.png",
        "/images/BrightNessIcon.png",
        "/images/DropIcon.png",
      ],
      titleStyle: {
        fontSize: { base: "32px", md: "32px", xl: "56px" },
        fontWeight: { base: "400", xl: "400" },
        paddingTop: { base: "33.5px", xl: "40px" },
        paddingBottom: { base: "24px", xl: "15px" },
      },
      descriptionStyle: {
        fontSize: { base: "16px", md: "17px", xl: "20px" },
        lineHeight: { base: "1.4", xl: "1.6" },
        paddingTop: { base: "0px", xl: "15px" },
        paddingBottom: { base: "15px", xl: "30px" },
      },
      buttonStyle: {
        fontSize: { base: "14px", xl: "16px" },
        paddingTop: { base: "8px", xl: "12px" },
        paddingBottom: { base: "8px", xl: "12px" },
        marginBottom: { base: "33.5px", xl: "0px" },
        fontWeight: { base: "500" },
        position: "relative",
        top: { base: "0px", xl: "-30px" },
        minWidth:{ base: "162px", xl: "" },
        minHeight:{ base: "40px", xl: "" }
      },
      imageStyle: {
        marginTop: { base: "15px", xl: "30px" },
        height: { base: "auto", xl: "305px" },
        marginBottom: { base: "32px", xl: "40px" },
      },
      containerStyle: {
        marginBottom: { base: "30px", xl: "60px" },
      },
      contentStyle: {
        padding: { base: "15px", xl: "0 20px" },
      },
    },
  },
  //add here component Reto medio ambiental Toyota 2050
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      description: {
        text: `Los principios de nuestra estrategia responden a un deseo de construir un futuro mejor y hacer cosas por los demás. Todo ello avalando nuestros esfuerzos constantes por alcanzar los Objetivos de Desarrollo Sostenible de Naciones Unidas para que nadie se quede atrás.`,
        fontSize: { base: "22px", medium: "12px", xl: "32px" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-toyotaDisplay)",
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
          base: "center",
          medium: "center",
          xl: "center",
        },
        lineHeight: {
          base: "normal",
          medium: "normal",
          xl: "41.6px",
        },
        // padding: "38px 16px 0",
        padding: {
          base: "",
          medium: "",
          xl: "0 0",
        },
        margin: {
          base: "61.5px auto",
          medium: "10px 0px 0px 0px",
          xl: "112px auto 120px",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: "center",
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
          base: "",
          medium: "",
          xl: "",
        },
      },
    },
  },

  {
    component: "EnvironmentalChallengeGrid",
    props: {
      bgColor: "#2A5B59",
      title: "Cero emisiones",
      description:
        "Los seres humanos no podemos existir sin biodiversidad. Las abejas, las mariposas y muchas otras especies son responsables de los alimentos que consumimos, y sus hábitats nos proporcionan agua dulce, refugio y materias primas.",
      image: "/images/emisionesPicture.png",
      icons: [
        "/images/icons/LeafIcon.png",
        "/images/icons/treeIcon.png",
        "/images/icons/mountainIcon.png",
        "/images/icons/CurvedLeaf.png",
      ],
      titleStyle: {
        fontSize: { base: "32px", md: "32px", xl: "56px" },
        fontWeight: { base: "400", xl: "400" },
        paddingTop: { base: "17px", xl: "40px" },
        paddingBottom: { base: "10px", xl: "15px" },
      },
      descriptionStyle: {
        fontSize: { base: "16px", md: "17px", xl: "20px" },
        lineHeight: { base: "1.4", xl: "1.6" },
        paddingTop: { base: "10px", xl: "15px" },
        paddingBottom: { base: "15px", xl: "30px" },
      },
      buttonStyle: {
        fontSize: { base: "14px", xl: "16px" },
        paddingTop: { base: "8px", xl: "12px" },
        paddingBottom: { base: "8px", xl: "12px" },
        marginBottom: { base: "15px", xl: "0px" },
        fontWeight: { base: "500" },
        position: "relative",
        top: { base: "0px", xl: "-30px" },
      },
      imageStyle: {
        marginTop: { base: "9px", xl: "30px" },
        height: { base: "auto", xl: "305px" },
        marginBottom: { base: "20px", xl: "40px" },
      },
      containerStyle: {
        marginBottom: { base: "30px", xl: "60px" },
      },
      contentStyle: {
        padding: { base: "15px", xl: "0 20px" },
      },
    },
  },
  //add here component Cero emisiones

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      description: {
        text: `Los principios de nuestra estrategia responden a un deseo de construir un futuro mejor y hacer cosas por los demás. Todo ello avalando nuestros esfuerzos constantes por alcanzar los Objetivos de Desarrollo Sostenible de Naciones Unidas para que nadie se quede atrás.`,
        fontSize: { base: "22px", medium: "12px", xl: "32px" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-toyotaDisplay)",
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
          base: "center",
          medium: "center",
          xl: "center",
        },
        lineHeight: {
          base: "normal",
          medium: "normal",
          xl: "41.6px",
        },
        // padding: "38px 16px 0",
        padding: {
          base: "",
          medium: "",
          xl: "0 0",
        },
        margin: {
          base: "61.5px auto",
          medium: "10px 0px 0px 0px",
          xl: "112px auto 120px",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: "center",
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
          base: "",
          medium: "",
          xl: "",
        },
      },
    },
  },
  {
    component: "EnvironmentalChallengeGrid",
    props: {
      bgColor: "#73675C",
      title: "Impacto positivo",
      description:
        "Para minimizar los residuos, intentamos recuperar la mayor cantidad posible de nuestras operaciones de fabricación. Trabajamos con socios especializados para crear los mejores procesos de eliminación de residuos para nuestros vehículos.",
      image: "/images/PositiviPicture.png",
      icons: [
        "/images/icons/trashIcon.png",
        "/images/icons/recycleIcon.png",
        "/images/icons/plantIcon.png",
        "/images/icons/recyclewithPower.png",
      ],
      titleStyle: {
        fontSize: { base: "32px", md: "32px", xl: "56px" },
        fontWeight: { base: "400", xl: "400" },
        paddingTop: { base: "0px", xl: "40px" },
        paddingBottom: { base: "10px", xl: "15px" },
      },
      descriptionStyle: {
        fontSize: { base: "16px", md: "17px", xl: "20px" },
        lineHeight: { base: "1.4", xl: "1.6" },
        paddingTop: { base: "10px", xl: "15px" },
        paddingBottom: { base: "15px", xl: "30px" },
      },
      buttonStyle: {
        fontSize: { base: "14px", xl: "16px" },
        paddingTop: { base: "8px", xl: "12px" },
        paddingBottom: { base: "8px", xl: "12px" },
        marginBottom: { base: "15px", xl: "0px" },
        fontWeight: { base: "500" },
        position: "relative",
        top: { base: "0px", xl: "-30px" },
      },
      imageStyle: {
        marginTop: { base: "15px", xl: "30px" },
        height: { base: "auto", xl: "305px" },
        marginBottom: { base: "20px", xl: "40px" },
      },
      containerStyle: {
        marginBottom: { base: "30px", xl: "60px" },
      },
      contentStyle: {
        padding: { base: "15px", xl: "0 20px" },
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
