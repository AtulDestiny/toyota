// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

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
      img: "/images/autos/cards-desktop-toyota-jun-Yaris.png",
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
      img: "/images/camionetas-y-suv/cards-desktop-toyota-jun-Fortuner.png",
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
      price: "$633.500.000 COP",
      description: "Una presencia robusta",
      img: "/images/camionetas-y-suv/cards-desktop-toyota-jun-LC300.png",
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
      price: "$303.500.000 COP",
      description: "El legado que abre nuevos caminos",
      img: "/images/camionetas-y-suv/cards-desktop-toyota-jun-LCPrado.png",
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
      img: "/images/pick-ups/cards-desktop-toyota-jun-hilux.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/pick-ups/hilux",
    },
    // {
    //   id: 2,
    //   theme: VehicleCardTheme.dark,
    //   name: "Hilux Cargo Max",
    //   year: "2026",
    //   type: "Diésel",
    //   price: "$185.500.000 COP",
    //   description: "Potencia y rendimiento",
    //   img: "/images/pick-ups/cards-desktop-toyota-jun-hiluxcargomax.png",
    //   bgColor: "#29363A",
    //   objectPosition: "38%",
    //   link: "/vehiculos/pick-ups/hilux-cargomax",
    // },
    {
      id: 3,
      theme: VehicleCardTheme.dark,
      name: "Land Cruiser 79",
      year: "2025",
      type: "Gasolina",
      price: "$255.900.000 COP",
      description: "Un ícono de resistencia y durabilidad",
      img: "/images/pick-ups/cards-desktop-toyota-jun-LC79.png",
      bgColor: "#161B1E",
      objectPosition: "21%",
      link: "/vehiculos/pick-ups/land-cruiser",
    },
    {
      id: 4,
      theme: VehicleCardTheme.dark,
      name: "Tundra",
      year: "2024",
      type: "Gasolina",
      price: "$432.000.000 COP",
      description: "Creada para despertar miradas",
      img: "/images/pick-ups/cards-desktop-toyota-jun-tundra.png",
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
      img: "/images/hibridos/cards-desktop-toyota-jun-Corolla.png",
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
      img: "/images/hibridos/cards-desktop-toyota-jun-YarisCross.png",
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
      img: "/images/hibridos/cards-desktop-toyota-jun-CorollaCross.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/hibridos/corolla-cross",
    },
  ],
  "Deportivos TGR": [
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Corolla GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$130.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/deportivos-TGR/cards-desktop-toyota-jun-CorollaGR.png",
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
      img: "/images/deportivos-TGR/cards-desktop-toyota-jun-CorollaCrossGR.png",
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
      price: "$335.500.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/deportivos-TGR/cards-desktop-toyota-jun-FortunerGR.png",
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
      price: "$309.500.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/deportivos-TGR/cards-desktop-toyota-jun-HiluxGR.png",
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
      price: "$662.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/deportivos-TGR/cards-desktop-toyota-jun-LC300GR.png",
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
        {
          imageMobile: "/images/t-10-banner-mob-slide2.jpg",
          imageDesktop: "/images/t-10-banner-desk-slide2.jpg",
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
        padding: { base: "46px 15px 16px", xl: "126px 0 0" },
        letterSpacing: "-1.12px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "T10 es  el programa de fidelización que Toyota ha desarrollado para sus clientes, ofreciendo mayor respaldo y seguridad. Es una cobertura extendida que protege tu Toyota por hasta 10 años o 200.000 km*, lo primero que ocurra.*",
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
        fontWeight: "400",
        textAlign: { base: "left", xl: "center" },
        width: "100%",
        padding: { base: "12px 16px 0px 16px", xl: "12px  0px 58px" },
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
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/icons/cr-service.png",
        alt: "toyota-servicios-conectados",
        width: { base: "auto", xl: "auto" },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        margin: "0 auto",
        padding: { base: "37px 16px 9px", xl: "0px 9px 18px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Conoce los vehículos a los que le aplica la cobertura T10",
        fontSize: { base: "18px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: { base: "normal", xl: "100%" },
        textAlign: { base: "center", xl: "center" },
        maxWidth: {
          xl: "80%",
        },
        width: {
          xl: "386px",
        },
        padding: { base: "9px 15px 18px", xl: "0" },
        letterSpacing: "-1.12px",
      },
      viewstyle: {
        display: { base: "flex" },
        flexDirection: { base: "column" },
        alignItems: { base: "center" },
        justifyContent: { base: "center" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Disponible para vehículos con fecha de entrega desde enero 01 de 2020. ",
        fontSize: { base: "16px", xl: "16px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: { base: "normal", xl: "100%" },
        textAlign: { base: "center", xl: "center" },
        maxWidth: {
          xl: "80%",
        },
        width: {
          xl: "100%",
        },
        padding: { base: "10px 16px 18px", xl: "25px 16px 10px" },
        letterSpacing: "-1.12px",
      },
      viewstyle: {
        display: { base: "flex" },
        flexDirection: { base: "column" },
        alignItems: { base: "center" },
        justifyContent: { base: "center" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Vigencia inicial del 01 de enero al 31 de diciembre de 2025, renovable año a año.",
        fontSize: { base: "16px", xl: "16px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: { base: "normal", xl: "100%" },
        textAlign: { base: "center", xl: "center" },
        maxWidth: {
          xl: "80%",
        },
        width: {
          xl: "100%",
        },
        padding: { base: "10px 16px 43px", xl: "5px 16px 0" },
        letterSpacing: "-1.12px",
      },
      viewstyle: {
        display: { base: "flex" },
        flexDirection: { base: "column" },
        alignItems: { base: "center" },
        justifyContent: { base: "center" },
      },
    },
  },

  {
    component: "VehicleSwiperAll",
    props: {
      titleStyle: {
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        fontWeight: {
          base: "700",
          medium: "400",
          xl: "400",
        },
        fontSize: {
          base: "22px",
          xl: "28px",
        },
        lineHeight: {
          base: "24px",
          xl: "41.6px",
        },
      },
      YearandTypeStyle: {
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: {
          base: "400",
          medium: "",
          xl: "",
        },
        fontSize: { base: "9px", xl: "14px" },
        fontStyle: { base: "normal", xl: "normal" },
        lineHeight: { base: "normal", xl: "normal" },
      },
      descriptionStyle: {
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        fontWeight: {
          base: "400",
          medium: "",
          xl: "",
        },
        fontSize: { base: "14px", xl: "14px" },
        fontStyle: { base: "normal", xl: "normal" },
        lineHeight: { base: "19.6px", xl: "21px" },
      },
      priceStyle: {
        fontSize: { base: "18px", xl: "18px" },
        lineHeight: { base: "normal", xl: "25.67px" },
      },
      isDesktop: "2",
      vehicles: [...vehiclesData["Ver todos"]],
      viewStyle: {
        margin: {
          xl: "0 auto",
        },
        padding: {
          xl: "87px 50px 50px",
        },
        maxWidth: {
          xl: "80%",
        },
      },
    },
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
        padding: { base: "96px 15px 0px", xl: "25px 0 5px" },
        letterSpacing: "-1.12px",
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
        text: "Beneficios",
        width: "100%",
        fontSize: { base: "32px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: { base: "100%", xl: "61.6px" },
        textAlign: { base: "left", xl: "center" },
        padding: { base: "80px 15px 0px", xl: "88px 0 5px" },
        letterSpacing: "-1.12px",
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
