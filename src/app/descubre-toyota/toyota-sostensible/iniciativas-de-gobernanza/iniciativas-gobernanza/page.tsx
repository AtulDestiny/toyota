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
          imageMobile: "/images/image_gorbnanza.png",
          imageDesktop: "/images/image_gorbnanza.png",
          title: "G-Gobernanza",
        },
        {
          imageMobile: "/images/image_gorbnanza.png",
          imageDesktop: "/images/image_gorbnanza.png",
          title: "G-Gobernanza",
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
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Impacto social positivo a través de actividades de valor compartido con socios",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "74px 43px", xl: "73px  0px 58px" },
      },
    },
  },
  {
    component: "EnvironmentalChallengeGrid",
    props: {
      title: "Beyond Zero",
      titleStyle: {
        fontSize: { base: "32px", md: "32px", xl: "56px" },
        fontWeight: { base: "400", xl: "400" },
        paddingTop: { base: "33.5px", xl: "40px" },
        paddingBottom: { base: "24px", xl: "15px" },
      },
      description:
        "Nos esforzamos por reflejar la diversidad de la sociedad que nos rodea en el entorno laboral. Desarrollamos programas que facilitan esta ambición. Buscamos generar un impacto positivo en la sociedad.",
      descriptionStyle: {
        fontSize: { base: "16px", md: "17px", xl: "20px" },
        lineHeight: { base: "1.4", xl: "1.6" },
        paddingTop: { base: "0px", xl: "15px" },
        paddingBottom: { base: "15px", xl: "30px" },
      },
      image: "/images/beyondZeroImage.png",
      imageStyle: {
        marginTop: { base: "15px", xl: "30px" },
        height: { base: "auto", xl: "305px" },
        marginBottom: { base: "32px", xl: "40px" },
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
      bgColor: "#58595B",
      icons: [
        "/images/icons/vectorIcon.png",
        "/images/icons/peopleIcon.png",
        "/images/icons/loopIcon.png",
        "/images/icons/peoplesIcons.png",
      ],
      containerStyle: {
        marginBottom: { base: "30px", xl: "60px" },
      },
      contentStyle: {
        padding: { base: "15px", xl: "0 20px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Para lograr nuestra misión de Generar Felicidad para Todos, aspiramos a ser la Mejor Empresa de la Ciudad, mejorando la vida y el bienestar de los demás. Creemos que una empresa saludable necesita una sociedad saludable, y viceversa.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "61.5px auto", xl: "73px  0px 58px" },
      },
    },
  },
  {
    component: "EnvironmentalChallengeGrid",
    props: {
      title: "Informe de sostenibilidad",
      titleStyle: {
        fontSize: { base: "32px", md: "32px", xl: "56px" },
        fontWeight: { base: "400", xl: "400" },
        paddingTop: { base: "17px", xl: "40px" },
        paddingBottom: { base: "24px", xl: "15px" },
        color: "#000",
      },
      description:
        "Nuestro objetivo es romper estereotipos conectando a jóvenes con modelos a seguir.Se comparten historias de desarrollo, junto con ejemplos de la amplia gama de oportunidades profesionales en la sociedad y en Toyota.",
      descriptionStyle: {
        fontSize: { base: "16px", md: "17px", xl: "20px" },
        lineHeight: { base: "1.4", xl: "1.6" },
        paddingTop: { base: "17px", xl: "15px" },
        paddingBottom: { base: "15px", xl: "30px" },
        color: "#000",
      },
      image: "/images/treePicture.png",
      imageStyle: {
        marginTop: { base: "9px", xl: "30px" },
        height: { base: "auto", xl: "305px" },
        marginBottom: { base: "20px", xl: "40px" },
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
      bgColor: "#E7EDF1",
      icons: [
        "/images/icons/hndicafeIcon.png",
        "/images/icons/feetIcon.png",
        "/images/icons/RoadIcon.png",
        "/images/icons/drivingIcon.png",
      ],
      containerStyle: {
        marginBottom: { base: "30px", xl: "60px" },
      },
      contentStyle: {
        padding: { base: "15px", xl: "0 20px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Impulsados ​​por nuestros valores Toyota Way 2020, los ODS de la ONU y el Pilar Europeo de Derechos Sociales, nos centramos en el empleo de calidad, la innovación sostenible y una sociedad diversa e inclusiva ",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "74px 43px", xl: "73px  0px 58px" },
      },
    },
  },
  {
    component: "EnvironmentalChallengeGrid",
    props: {
      title: "Parque de seguridad vial",
      titleStyle: {
        fontSize: { base: "32px", md: "32px", xl: "56px" },
        fontWeight: { base: "400", xl: "400" },
        paddingTop: { base: "0px", xl: "40px" },
        paddingBottom: { base: "10px", xl: "15px" },
      },
      description:
        "Los seres humanos no podemos existir sin biodiversidad. Las abejas, las mariposas y muchas otras especies son responsables de los alimentos que consumimos, y sus hábitats nos proporcionan agua dulce, refugio y materias primas.",
      descriptionStyle: {
        fontSize: { base: "16px", md: "17px", xl: "20px" },
        lineHeight: { base: "1.4", xl: "1.6" },
        paddingTop: { base: "10px", xl: "15px" },
        paddingBottom: { base: "15px", xl: "30px" },
      },
      image: "/images/seguridadPicture.png",
      imageStyle: {
        marginTop: { base: "15px", xl: "30px" },
        height: { base: "auto", xl: "305px" },
        marginBottom: { base: "20px", xl: "40px" },
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
      bgColor: "#29363A",
      icons: [
        "/images/icons/heartIcon.png",
        "/images/icons/mediIcon.png",
        "/images/icons/MindIcon.png",
        "/images/icons/heartIcon02.png",
      ],
      containerStyle: {
        marginBottom: { base: "30px", xl: "60px" },
      },
      contentStyle: {
        padding: { base: "15px", xl: "0 20px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Impacto social positivo a través de actividades de valor compartido con socios",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "74px 43px", xl: "73px  0px 58px" },
      },
    },
  },
  {
    component: "EnvironmentalChallengeGrid",
    props: {
      title: "Compliance",
      titleStyle: {
        fontSize: { base: "32px", md: "32px", xl: "56px" },
        fontWeight: { base: "400", xl: "400" },
        paddingTop: { base: "0px", xl: "40px" },
        paddingBottom: { base: "10px", xl: "15px" },
      },
      description:
        "Los seres humanos no podemos existir sin biodiversidad. Las abejas, las mariposas y muchas otras especies son responsables de los alimentos que consumimos, y sus hábitats nos proporcionan agua dulce, refugio y materias primas.",
      descriptionStyle: {
        fontSize: { base: "16px", md: "17px", xl: "20px" },
        lineHeight: { base: "1.4", xl: "1.6" },
        paddingTop: { base: "10px", xl: "15px" },
        paddingBottom: { base: "15px", xl: "30px" },
      },
      image: "/images/complicancePicture.png",
      imageStyle: {
        marginTop: { base: "15px", xl: "30px" },
        height: { base: "auto", xl: "305px" },
        marginBottom: { base: "20px", xl: "40px" },
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
      bgColor: "#272329",
      icons: [
        "/images/icons/heartIcon.png",
        "/images/icons/mediIcon.png",
        "/images/icons/MindIcon.png",
        "/images/icons/heartIcon02.png",
      ],
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
