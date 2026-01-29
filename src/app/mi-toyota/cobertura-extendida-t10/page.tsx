// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import { colors } from "@/theme/colors";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

enum VehicleCardTheme {
  "dark" = "dark",
  "light" = "light",
}

const vehiclesData = {
  Autos: [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "Yaris",
      year: "2026",
      type: "Gasolina",
      price: "$87.900.000 COP",
      description: "Tu primer Toyota",
      img: "/images/vehicle-tabs/Desktop/Yaris (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE YARIS.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/autos/yaris",
    },
  ],
  "Camionetas y SUV": [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "Fortuner",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "$239.900.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/vehicle-tabs/Desktop/Fortuner (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE FORTUNER.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/camionetas/fortuner",
    },
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser 300",
      year: "2025",
      type: "Gasolina",
      price: "$613.500.000 COP",
      description: "Una presencia robusta",
      img: "/images/vehicle-tabs/Desktop/LC300 (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC300 (1).png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/camionetas/land-cruiser-300",
    },
    {
      id: 3,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser Prado",
      year: "2025",
      type: "Gasolina / Diésel",
      price: "$299.000.000 COP",
      description: "El legado que abre nuevos caminos",
      img: "/images/vehicle-tabs/Desktop/LC Prado (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC PRADO.png",
      bgColor: "#161B1E",
      objectPosition: "21%",
      link: "/vehiculos/camionetas/land-cruiser-prado",
    },
  ],
  "Pick Ups": [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "Hilux",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "$175.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/pick-ups/hilux",
    },
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Hilux Overlander",
      year: "2026",
      type: "Diésel",
      price: "$234.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux Overlander.png",
      imgMobile:
        "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX OVERLANDER.png",
      bgColor: "#161B1E",
      objectPosition: "unset",
      link: "/vehiculos/pick-ups/hilux-overlander",
    },
    {
      id: 4,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser 79",
      year: "2025",
      type: "Gasolina",
      price: "$255.900.000 COP",
      description: "Un ícono de resistencia y durabilidad",
      img: "/images/vehicle-tabs/Desktop/LC 79 (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC 79.png",
      bgColor: "#161B1E",
      objectPosition: "21%",
      link: "/vehiculos/pick-ups/land-cruiser",
    },
    {
      id: 5,
      theme: VehicleCardTheme.dark,
      name: "Tundra",
      year: "2024",
      type: "Gasolina",
      price: "$432.000.000 COP",
      description: "Creada para despertar miradas",
      img: "/images/vehicle-tabs/Desktop/Tundra (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE TUNDRA (1).png",
      bgColor: "#161B1E",
      objectPosition: "unset",
      link: "/vehiculos/pick-ups/tundra",
    },
  ],
  Híbridos: [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "Corolla",
      year: "2026",
      type: "Híbrido",
      price: "$109.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla (2).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/hibridos/corolla",
    },
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Yaris Cross",
      year: "2026",
      type: "Híbrido",
      price: "$132.900.000 COP",
      description: "Kilómetros de eficiencia en cada viaje",
      img: "/images/vehicle-tabs/Desktop/Yaris Cross (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE YARIS CROSS.png",
      bgColor: "#161B1E",
      objectPosition: "unset",
      link: "/vehiculos/hibridos/yaris-cross",
    },
    {
      id: 3,
      theme: VehicleCardTheme.dark,
      name: "Corolla Cross",
      year: "2026",
      type: "Híbrido",
      price: "$135.900.000 COP",
      description: "Muévete a tu mejor versión",
      img: "/images/vehicle-tabs/Desktop/Corolla Cross (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA CROSS.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/hibridos/corolla-cross",
    },
  ],
  "Deportivos TGR": [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "GR Yaris",
      year: "2024",
      type: "Gasolina",
      price: "$266.000.000 COP",
      description: "Un auténtico auto deportivo TOYOTA",
      img: "/images/vehicle-tabs/Desktop/YarisGR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE YARIS GR.png",
      bgColor: "#161B1E",
      objectPosition: "unset",
      link: "/vehiculos/deportivos-tgr/yaris-gr",
    },
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Corolla GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$130.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA GR.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/deportivos-tgr/corolla-gr-s",
    },
    {
      id: 3,
      theme: VehicleCardTheme.dark,
      name: "Corolla Cross GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$161.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla Cross GR (1).png",
      imgMobile:
        "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA CROS GR.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/deportivos-tgr/corolla-cross-gr",
    },
    {
      id: 4,
      theme: VehicleCardTheme.dark,
      name: "Fortuner GR-S",
      year: "2026",
      type: "Diésel",
      price: "$327.900.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/vehicle-tabs/Desktop/Fortuner GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE FORTUNER GR.png",
      bgColor: "#161B1E",
      objectPosition: "76%",
      link: "/vehiculos/deportivos-tgr/fortuner-gr-s",
    },
    {
      id: 5,
      theme: VehicleCardTheme.dark,
      name: "Hilux GR-S",
      year: "2026",
      type: "Diésel",
      price: "$302.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX GR.png",
      bgColor: "#1F2C40",
      objectPosition: "21%",
      link: "/vehiculos/deportivos-tgr/hilux-gr-s-iv",
    },
    {
      id: 6,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser 300 GR-S",
      year: "2025",
      type: "Gasolina",
      price: "$641.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/LC 300 GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC300 GR.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/deportivos-tgr/land-cruiser-300-gr-s",
    },
  ],
};

vehiclesData["Ver todos"] = [
  ...vehiclesData.Autos,
  ...vehiclesData["Camionetas y SUV"],
  ...vehiclesData["Pick Ups"],
  ...vehiclesData.Híbridos,
  ...vehiclesData["Deportivos TGR"],
];

// Datos para la página de SeguroToyota
const pageData: ComponentData[] = [
  {
    component: "MainSlider", // Component name
    props: {
      slides: [
        {
          imageMobile: "/images/t-10-banner-mob-slide1.png",
          imageDesktop: "/images/t-10-banner-desk-slide1.png",
          title: " ",
        },
      ], // Passing slides data inline
      sliderConfig: {
        slidesPerView: 1, // Number of slides visible at a time
        spaceBetween: 10, // Space between slides
        loop: true, // Infinite loop of slides
        isButton: false, // Show navigation buttons
        autoplay: {
          delay: 3000, // Autoplay delay in ms
          disableOnInteraction: false, // Keep autoplay even when user interacts
        },
        pagination: {
          clickable: true, // Allow click pagination
        },
        navigation: true, // Enable navigation buttons (next/prev)
      }, // Passing slider configuration inline
      isPlayicon: false,
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Cobertura Extendida Toyota T10",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "61.6px",
        textAlign: "center",
        padding: { base: "46px 15px 16px", xl: "106px 0 0" },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "¿Qué es T10?",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "61.6px",
        textAlign: "center",
        padding: { base: "46px 15px 16px", xl: "80px 0 0" },
        letterSpacing: "-1.12px",
        as: "h2",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "T10 es la cobertura extendida de servicio que Toyota ha desarrollado para sus clientes, ofreciendo mayor respaldo y seguridad.\n Es una cobertura extendida que protege tu Toyota por hasta 10 años o 200.000 km*, lo primero que ocurra.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "16px 16px 0 16px", xl: "73px  0 0" },
        as: "p",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "*No es una garantía",
        fontSize: { base: "12px", xl: "12px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "700",
        textAlign: { base: "left", xl: "center" },
        width: "100%",
        padding: { base: "12px 16px 0px 16px", xl: "12px  0px 58px" },
        as: "p",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/t-10-que-banner.png",
        alt: "t10-car",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "80%",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "32px 16px 30px", xl: "45px 16px 82px" },
      },
    },
  },
  {
    component: "T10EligibilityComponent",
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Condiciones Cobertura",
        fontSize: { base: "26px", xl: "26px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "100%",
        textAlign: "left",
        padding: {
          base: "96px 15px 0px",
          md: "15px 15px 0px",
          xl: "25px 0 5px",
        },
        letterSpacing: "-1.12px",
        as: "h2",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text:
          "• Solamente aplica para vehículos importados por Automotores Toyota Colombia.\n" +
          "• Este plan es adicional a la garantía de fábrica y no afecta la aplicación de dicha garantía mientras esté vigente. \n" +
          "• Toyota 10 únicamente aplica dentro del territorio colombiano, en los Concesionarios de la Red Toyota en Colombia.\n",
        fontSize: { base: "16px", xl: "16px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        whiteSpace: "pre-line",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "left" },
        padding: { base: "12px 16px 0px 15px", xl: "12px  0px 0" },
        color: "gray",
        as: "p",
      },
    },
  },

  {
    component: "SliderSection",
    props: {
      theme: "light",
      customStyles: {
        paddingBottom: "50px 50px 96px",
      },
      className: "t10-slider", // <-- Add your custom class here
      textAlignment: "center",
      items: [
        {
          image: {
            src: "/images/servicios-conectados/funciones/foto-carrusel-T10-01.png",
            desktopSrc:
              "/images/servicios-conectados/funciones/foto-carrusel-T10-01-desktop.png",
          },
          title: "¡Estaremos ahí, siempre que lo necesites!",
          description:
            "Mantén tu cobertura agendando todas tus revisiones en talleres autorizados Toyota.",
        },
        {
          image: {
            src: "/images/servicios-conectados/funciones/foto-carrusel-T10-02.png",
            desktopSrc:
              "/images/servicios-conectados/funciones/foto-carrusel-T10-02.png",
          },
          title: "Recupera tu cobertura",
          description:
            "Si faltas a una o más revisiones, recupera escalonadamente tu cobertura, volviendo a nuestros talleres autorizados para hacer tus mantenimientos periódicos.",
        },
      ],
      showButton: false,
      order: {
        mobile: 1, // First in mobile
        desktop: 3, // Last in desktop
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Beneficios de la cobertura extendida",
        width: "100%",
        fontSize: { base: "32px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: { base: "100%", xl: "61.6px" },
        textAlign: { base: "left", xl: "center" },
        padding: { base: "80px 15px 0px", xl: "88px 0 5px" },
        letterSpacing: "-1.12px",
        as: "h2",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Premiamos tu fidelidad brindándote el mejor respaldo en tan solo 2 pasos.",
        fontSize: { base: "16px", xl: "32px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "22px 16px 0px 15px", xl: "32px  0px 79px" },
        as: "p",
      },
    },
  },

  // add tetiomonal
  {
    component: "SafetyFeaturesGrid",
    props: {
      features: [
        {
          title: "Paso 1 - Mantén tu cobertura",
          description:
            "Agenda todas tus revisiones y acude a todos los mantenimientos en nuestros talleres autorizados de la red Toyota",
          image: "/images/paso-1.png",
          link: "#",
        },
        {
          title: "Paso 2 - Sigue protegido.",
          description:
            "Realiza tus mantenimientos en talleres autorizados Toyota y disfruta de tu cobertura comercial hasta el siguiente mantenimiento.",
          image: "/images/paso-2.png",
          link: "#",
        },
      ],
      isButton: false,
      isDivider: true,
      viewStyle: {
        margin: {
          base: "0",
          xl: "0 auto",
        },
        maxWidth: {
          xl: "80%",
        },
        padding: {
          base: "65px 15px 15px",
          xl: "2rem 2rem 0px",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Funcionamiento de la </br> cobertura T10",
        fontSize: { base: "32px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "130%",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "10px 15px 0px", xl: "88px 0 40px" },
        letterSpacing: "-1.12px",
        as: "h2",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text:
          "• Es una cobertura extendida --> No es una garantía \n" +
          "• Se activa por servicio, renovándose cada vez que se visita el concesionario. \n" +
          "• El servicio de mantenimiento debe ser completo y debe realizarse cada 5.000 ± 1.000 km y/o 6 meses. \n" +
          "• La cobertura es hasta por 10 años o 200.000 km, lo primero que ocurra.* \n",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "left" },
        padding: { base: "25px 16px 60px 15px", xl: "0px  0px 20px" },
        whiteSpace: "pre-line",
        as: "p",
      },
    },
  },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "Porcentaje de cobertura según los mantenimientos realizados",
  //       fontSize: { base: "16px", xl: "22px" },
  //       fontFamily: "var(--font-toyotaDisplay)",
  //       fontStyle: "normal",
  //       fontWeight: "700",
  //       maxWidth: {
  //         xl: "70%",
  //       },
  //       lineHeight: "30.4px",
  //       textAlign: { base: "left", xl: "center" },
  //       padding: { base: "32px 16px 0px 15px", xl: "0px  0px 111px" },
  //     },
  //   },
  // },

  // {
  //   component: "TextCard",
  //   props: {
  //     data: [
  //       {
  //         title: "Cobertura 100%",
  //         description: "Realiza todos los mantenimientos",
  //       },
  //       { title: "Cobertura 50%", description: "Falta 1 mantenimiento" },
  //       { title: "Cobertura 20%", description: "Falta 2 o 3 mantenimientos" },
  //       { title: "Cobertura 0%", description: "No asiste a mantenimiento" },
  //     ],
  //   },
  // },

  {
    component: "ConcessionaireSearch",
  },

  {
    component: "MaterialCardsSection",
    props: {
      containerBackground: colors.theme.blueSecondary,
      logo: {
        src: "/svgs/t10.svg",
        alt: "T10 Logo",
      },
      items: [
        {
          title: "Términos y Condiciones",
          imageSrc: "/images/icons/paper.svg",
          alt: "paper",
          bgColor: colors.theme.red,
          txtColor: colors.theme.white,
          downloadUrl:
            "/images/pdf/Términos-y-condiciones-Toyota-10  (24ABR2025) (003) (2).pdf",
        },
      ],
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Toyota 10 es el plan de fidelización que ha diseñado Automotores Toyota Colombia S.A.S. que tiene como objeto otorgar una cobertura comercial limitada a los vehículos que (i) ha importado ATC; (ii) cuya garantía de fábrica se ha activado y el vehículo se haya entregado con posterioridad al 1 de enero de 2020; (iii) la garantía de fábrica ha culminado; (iv) tengan un recorrido  de menos de 200.000 kilómetros; (v) hayan recibido todos los mantenimientos recomendados en el Manual de Garantía  completos cada 6 meses o 5.000 km, lo primero que ocurra, durante el periodo de garantía de fábrica; y(vi) hayan sido objeto del total de mantenimientos recomendados en el Manual de Garantía completos cada 6 meses o 5.000 km.",
        fontSize: { base: "16px", xl: "16px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        whiteSpace: "pre-line",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 0px 15px", xl: "0px  0px 47px" },
        color: "gray",
        marginTop: { base: "2rem", xl: "2rem" },
        as: "p",
      },
    },
  },
];

export default function T10() {
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
