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
        // {
        //   imageMobile: "/images/Captura de pantalla.png",
        //   imageDesktop: "/images/Captura de pantalla.png",
        //   title: "Toyota Safety Sense",
        // },
        {
          videoUrl: "/videos/Toyota-safety-sense-video.mp4",
          title: "Toyota Safety Sense",
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
        text: `Haciendo más segura la experiencia de manejar`,
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
          base: "35px 15px 0px",
          medium: "35px 15px 0px",
          xl: "124px 15px 0px",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `¿Cuál es el objetivo de Toyota Safety Sense?`,
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "110%",
        textAlign: "left",
        padding: { base: "35px 15px 0px", xl: "0" },
        letterSpacing: "-1.12px",
        verticalAlign: "middle",
      },
      description: {
        text: `El objetivo es reducir al máximo los accidentes de transito. Esta tecnología puede detectar una variedad de peligros y alertar al conductor evitando o mitigando posibles accidentes.`,
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        margin: {
          xl: "0 auto",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 56px 15px", xl: "73px  0px 58px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      image: {
        src: "/images/Safety_Sense_slide-1536x366.jpg",
        alt: "Captura de pantalla",
        width: { base: "100%", xl: "100%" },
        height: "auto",
        padding: {
          base: "",
          medium: "0px 0px 0px 0px",
          xl: "0px 0px 0px 0px",
        },
        borderRadius: {
          base: "",
          medium: "",
          xl: "",
        },
        maxWidth: {
          base: "",
          medium: "",
          xl: "700px",
        },
        minHeight: {
          base: "",
          medium: "auto",
          xl: "auto",
        },
        margin: {
          base: "auto",
          medium: "",
          xl: "89px auto 0px",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: "center",
        width: {
          base: "100%",
          medium: "",
          xl: "100%",
        },
        gap: "0",
        maxHeight: {
          base: "auto",
          medium: "450px",
          xl: "auto",
        },
        padding: {
          base: "",
          medium: "",
          xl: "0 30px",
        },
        margin: {
          base: "auto",
          medium: "",
          xl: "89px auto 0px",
        },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: ` `, //Características
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
          xl: "124px 15px 0px",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Tecnologías de seguridad avanzadas`,
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "61.6px",
        textAlign: "left",
        padding: { base: "10px 15px 0px", xl: "0" },
        letterSpacing: "-1.12px",
      },
      description: {
        text: `Toyota Safety Sense es un paquete de seguridad activa que incorpora un radar de ondas milimétricas que combinado con una cámara monocular pueden detectar una variedad de peligros y alertar al conductor para evitar o mitigar accidentes. Si bien sus componentes primarios (Radar de ondas milimétricas y cámara monocular) son similares, sus características pueden variar según cada modelo y/o versión.*`,
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        margin: {
          xl: "0 auto",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "57px 16px 56px 15px", xl: "73px  0px 58px" },
      },
    },
  },

  {
    component: "SafetyFeaturesGrid",
    props: {
      features: [
        {
          title: "Sistema de pre-colisión frontal (PCS)*",
          description:
            "Este sistema, puede detectar vehículos, peatones, ciclistas y/o motocicletas en la parte frontal (los elementos detectados y las condiciones de funcionamiento [dia/noche] varian segun el modelo y la versión). \n Si detecta riesgo de colisión, advierte mediante una señal visual y auditiva. Si el conductor no frena, el sistema soporta progresivamente con el freno para reducir la velocidad paulatinamente. Si aún así, el sistema sigue detectando un riesgo de colisión, este puede activar el BA (Brake Assist) para incrementar el poder de frenado.* ",
          image: "/images/ss-PCS.jpeg",
          link: "toyota-safety-sense/pcs",
        },
        {
          title: "Control de velocidad crucero adaptativo (ACC)*",
          description:
            "Este sistema mantiene automáticamente una distancia segura entre los vehículos para aliviar la carga de los conductores durante largos períodos de conducción. La velocidad se ajusta automáticamente mientras el radar de ondas milimétricas monitorea la distancia entre vehículos, acelerando y desacelerando el vehículo según los cambios de velocidad del vehículo que circula delante, incluso si el pedal del acelerador no se pisa.*",
          image: "/images/ss-ACC.jpeg",
          link: "toyota-safety-sense/acc",
        },
        {
          title: "Sistema de alerta de cambio de carril (LDA)*",
          description:
            "El sistema LDA advierte al conductor si el vehículo corre el riesgo de desviarse del carril o la trayectoria actuales y también puede accionar ligeramente el volante para corregir la dirección y evitar la desviación. La cámara frontal permite detectar las líneas del carril o la trayectoria.*",
          image: "/images/ss-LDA.jpeg",
          link: "toyota-safety-sense/lda",
        },
        {
          title: "Asistente de seguimiento de carril (LTA)*",
          description:
            "Al manejar por una carretera con señalización clara de los carriles y con el sistema ACC activado, la cámara frontal y el sensor de radar detectan tanto las líneas del carril como los vehículos que van delante. En respuesta, el volante se ajusta automáticamente para mantener el vehículo centrado en el carril.",
          image: "/images/ss-LTA.jpeg",
          link: "toyota-safety-sense/lta",
        },
        {
          title: "Luces altas automáticas (AHB)*",
          description:
            "Las luces altas automáticas utilizan una cámara frontal ubicada en la parte superior del parabrisas para detectar el brillo de las luces de los vehículos que circulan delante, así como el alumbrado público, y ajustan automáticamente entre las luces altas y bajas.*",
          image: "/images/ss-AHB.jpeg",
          link: "toyota-safety-sense/ahb",
        },
        {
          title: "Sistema de las luces altas adaptativas (AHS)*",
          description:
            "El sistema de las luces altas adaptativas emplea una cámara frontal situada en la parte superior del parabrisas para detectar el brillo de las luces de los vehículos que lo preceden, del alumbrado de la calle, etc., y controla automáticamente la distribución de la iluminación de los faros, evitando ",
          image: "/images/ss-AHS.jpeg",
          link: "toyota-safety-sense/ahs",
        },
      ],
    },
  },

  // add component Sistema de pre-colisión frontal (PCS)*

  // add component Control de velocidad crucero adaptativo (ACC)*

  // add here Sistema de alerta de cambio de carril (LDA)*

  //Luces altas automáticas (AHB)*

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      description: {
        text: `* Toyota Safety Sense, integra diferentes sistemas de seguridad activa que pueden variar según cada modelo y/o versión. A su vez, estos sistemas están diseñados para asistir al conductor, no para sustituirlo. El conductor debe mantener en todo momento el control de su vehículo y es responsable de su conducción, por cuanto este sistema no remplaza la conducción segura. El correcto funcionamiento del Toyota Safety Sense depende de muchos factores incluyendo las condiciones del camino, el clima y el vehículo, razón por la cual el/los sistemas podrán verse afectados u obstaculizados debido a factores externos, no siendo Automotores Toyota Colombia S.A.S. responsable de las consecuencias derivadas del uso del sistema. Para más información sobre Toyota Safety Sense, su funcionamiento y sus limitaciones, dirigirse a la web https://www.toyota.com.co y/o consulte el manual de usuario.`,
        fontSize: { base: "12px", xl: "12px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        margin: {
          xl: "0 auto",
        },
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 56px 15px", xl: "26px  0px 58px" },
        color: "gray",
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
