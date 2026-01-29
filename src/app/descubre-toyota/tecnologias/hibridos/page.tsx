"use client";

import React, { useEffect, useState } from "react";
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
          imageMobile: "/images/Yaris Cross_Híbridos_1920x630_Web.jpg",
          imageDesktop: "/images/Yaris Cross_Híbridos_1920x630_Web.jpg",
          title: " ",
          description: "",
        },
        {
          imageMobile: "/images/Corolla Cross_Híbridos_1920x630_Web.jpg",
          imageDesktop: "/images/Corolla Cross_Híbridos_1920x630_Web.jpg",
          title: " ",
          description: "",
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
        text: "Conozcamos sobre Híbridos",
        fontSize: {
          base: "56px",
          medium: "56px",
          xl: "56px",
        },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "",
        },
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "110%",
        textAlign: "left",
        padding: {
          base: "45px 15px 57px",
          medium: "",
          xl: "113px 30px",
        },
        letterSpacing: { base: "-1.12px", xl: "-1.12px" },
        verticalAlign: "middle",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "¿Qué es un auto híbrido?",
        fontSize: {
          base: "32px",
          medium: "26px",
          xl: "26px",
        },
        fontFamily: "var(--font-toyotaDisplay)",
        fontWeight: {
          base: "400",
          medium: "700",
          xl: "700",
        },
        textAlign: "left",
        lineHeight: {
          base: "41.6px",
          medium: "26px",
          xl: "normal",
        },
        padding: {
          base: "61px 17px 0px 15px",
          medium: "40px 0px 0px",
          xl: "40px 0px 0px",
        },
        letterSpacing: "",
        color: "",
      },
      description: {
        text: `Un Toyota híbrido combina el motor de combustión con el motor eléctrico, ofreciendo una excelente sinergia entre ambos sistemas. La batería se recarga automáticamente durante la conducción. El resultado es una mayor eficiencia en el consumo de combustible, menos emisiones y un rendimiento excepcional.*</br></br>*Sujeto al modo de conducción del vehículo y condiciones del terreno.`,
        fontSize: { base: "16px", medium: "12px", xl: "16px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontWeight: "400",
        textAlign: "left",
        lineHeight: {
          base: "190%",
          medium: "normal",
          xl: "normal",
        },
        // padding: "38px 16px 0",
        padding: {
          base: "38px 16px 49px",
          medium: "40px 0px 0px",
          xl: "40px 0px 0px",
        },
        letterSpacing: { base: "0px", xl: "" },
      },
      image: {
        src: "/images/cars/10_Híbridos_754x379_Web.jpg",
        alt: "Toyota Hybrid Car",
        width: { base: "100%" },
        height: "auto",
        objectFit: { base: "cover", xl: "contain" },
        padding: {
          base: "57px 0px 0px 0px",
          medium: "57px 16px 0px 17px",
          xl: "0px 0px 0px 60px",
        },
        margin: {
          base: "0 auto",
          xl: "0px 0px 0px 0px",
        },
        display: { base: "flex", xl: "" },
        maxWidth: {
          base: "324px",
          medium: "",
          xl: "687px",
        },
        maxHeight: {
          base: "158px",
          medium: "",
          xl: "",
        },
        minHeight: {
          base: "",
          medium: "450px",
          xl: "450px",
        },
      },
      viewstyle: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        placeItems: "center",
        alignItems: { xl: "center" },
        justifyContent: "center",
        maxHeight: {
          base: "auto",
          medium: "450px",
          xl: "450px",
        },
        flexWrap: "wrap",
        padding: {
          base: "",
          medium: "113px 0 0",
          xl: "113px 0 0",
        },
        margin: {
          base: "",
          medium: "0 auto",
          xl: "0 auto",
        },
      },
    },
  },

  {
    component: "FeaturedHybridComponent",
    props: {
      title: "Tecnología",
      subtitle: "Híbrida",
      image: "/images/hibrida.png",
      list: [
        {
          title: "Menos emisiones",
          description:
            "Menos emisiones de CO2 al ambiente. Menor impacto a la huella de carbono.*",
        },
        {
          title: "Mayor eficiencia",
          description:
            "Recorre mayores distancias con menor consumo de combustibles.*",
        },
        {
          title: "Más económico",
          description: `La combinación de sus motores reducen el consumo de combustible.*`,
        },
        {
          title: `Es autorre-\ncargable`,
          description:
            "Con un Toyota híbrido puedes llegar a tu destino sin depender de un punto de carga.*",
        },
        // {
        //   title: "Menos piezas",
        //   description: `= menos desgaste <br>= mantenimiento más económico.`,
        // },
        // {
        //   title: "Ventajas fiscales",
        //   description: "En ciertos países que adoptan energías limpias.",
        // },
      ],
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Una experiencia de conducción",
        fontSize: {
          base: "32px",
          medium: "26px",
          xl: "26px",
        },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        fontWeight: {
          base: "400",
          medium: "700",
          xl: "700",
        },
        textAlign: "left",
        lineHeight: {
          base: "130%",
          medium: "26px",
          xl: "normal",
        },
        padding: {
          base: "51px 17px 0px 15px",
          medium: "",
          xl: "",
        },
        margin: {
          base: "",
          medium: "",
          xl: "",
        },

        letterSpacing: { base: "0px", xl: "" },
        color: "",
      },
      description: {
        text: `Conducir un Toyota híbrido es una excelente opción de movilidad. Es suave, silencioso (en su modo eléctrico), y ofrece la satisfacción de saber que reduce el consumo de combustible y las emisiones*. `,
        fontSize: { base: "16px", medium: "12px", xl: "22px" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: {
          base: "400",
          medium: "400",
          xl: "400",
        },
        textAlign: "left",
        lineHeight: {
          base: "190%",
          medium: "normal",
          xl: "normal",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        padding: {
          base: "25px 16px 0px",
          medium: "10px 0px 0px 0px",
          xl: "40px 0px 0px 0px",
        },
        letterSpacing: { base: "0px", xl: "0px" },
      },
      image: {
        src: "/images/cars/09_Híbridos_754x379_Web.jpg",
        alt: "Toyota Hybrid Car",
        width: { base: "100%" },
        height: "auto",
        objectFit: "contain",
        padding: {
          base: "32px 0px 0px",
          medium: "0px 0px 0px 60px",
          xl: "0px 0px 0px 60px",
        },
        maxWidth: {
          base: "",
          medium: "",
          xl: "687px",
        },
        minHeight: {
          base: "",
          medium: "450px",
          xl: "450px",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        flexWrap: "wrap",
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
          medium: "0 auto",
          xl: "0 auto",
        },
      },
    },
  },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     layout: "horizontal",
  //     title: {
  //       text: "¿Por qué son más eficientes y reducen las emisiones?",
  //       fontSize: {
  //         base: "22px",
  //         medium: "26px",
  //         xl: "26px",
  //       },
  //       fontFamily: {
  //         base: "var(--font-ToyotaType-Regular)",
  //         medium: "var(--font-toyotaDisplay)",
  //         xl: "var(--font-ToyotaType-Regular)",
  //       },
  //       fontWeight: {
  //         base: "700",
  //         medium: "700",
  //         xl: "700",
  //       },
  //       lineHeight: {
  //         base: "28px",
  //         medium: "normal",
  //         xl: "normal",
  //       },
  //       textAlign: {
  //         base: "left",
  //         medium: "center",
  //         xl: "center",
  //       },
  //       padding: {
  //         base: "42px 15px 0px",
  //         xl: "113px 0px 0px",
  //       },
  //       color: "",
  //       letterSpacing: { base:"0px" ,xl:"0px" },
  //     },
  //   },
  // },

  {
    component: "AWSAmplifyComponent",
    props: {
      sections: [
        {
          title: "Excelente Arranque",
          description:
            "Utiliza efectivamente el motor eléctrico con apoyo del motor gasolina para un arranque preciso y suave.*",
        },
        {
          title: "Modos de manejo",
          description:
            "Con los diferentes modos de manejo que puede seleccionar cada usuario, de forma sinérgica el sistema híbrido logra obtener el mejor rendimiento de cada uno de los sistemas del vehículo.*",
        },
        {
          title: "Aceleración fuerte",
          description:
            "El motor eléctrico y el de gasolina unen sus fuerzas automáticamente para aumentar la capacidad de aceleración y, por lo tanto, la seguridad en la carretera al momento de exigencia.*",
        },
        {
          title: "Durante la desaceleración",
          description:
            "El motor eléctrico se convierte en un generador de energía y recarga la batería utilizando el impulso de las ruedas.*",
        },
        // {
        //   title: "En baja velocidad",
        //   description:
        //     "Únicamente opera el motor eléctrico, buscando la e ciencia.*",
        // },
        // {
        //   title: "Con el vehículo detenido",
        //   description:
        //     "El motor de combustión interna y el eléctrico se encuentran apagados, solo se encienden si hay que recargar la batería.*",
        // },
      ],
      sectionTitleStyle: {
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontSize: { base: "22px", xl: "32px" },
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: "100%",
        textAlign: "left",
        letterSpacing: { base: "0px", xl: "0px" },
        padding: {
          xl: "20px 0px 0px",
        },
      },
      sectionDescriptionStyle: {
        fontSize: { base: "16px", xl: "18px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontWeight: "400",
        textAlign: "left",
        fontStyle: "normal",
        lineHeight: "190%",
        letterSpacing: { base: "0px", xl: "0px" },
        padding: {
          xl: "20px 0px 0px",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: "Campañas de Seguridad",
      fontSize: { base: "56px", xl: "2rem" },
      fontFamily: "var(--font-tootaType)",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "61.6x",
      textAlign: "left",
      padding: "31px 19px 0px 15px",
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Clasificación",
        fontSize: {
          base: "56px",
          medium: "26px",
          xl: "26px",
        },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        fontWeight: {
          base: "400",
          medium: "700px",
          xl: "700px",
        },
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        lineHeight: {
          base: "110.00000000000001%",
          medium: "26px",
          xl: "normal",
        },
        padding: {
          base: "31px 19px 0px 15px",
          medium: "",
          xl: "",
        },
        margin: {
          base: "",
          medium: "113px 0px 0px 195px",
          xl: "210 auto",
        },

        letterSpacing: { base: "-1.12px", xl: "" },
        verticalAlign: "middle",
        color: "",
      },
      description: {
        text: `Los híbridos típicamente no se tienen que conectar a una conexión eléctrica externa, por lo que genera el 100% de su electricidad de forma autónoma. Atendiendo a su principio de funcionamiento se pueden clasificar en tres tipos:`,
        fontSize: { base: "16px", medium: "12px", xl: "22px" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
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
          base: "190%",
          medium: "normal",
          xl: "normal",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        padding: {
          base: "33px 18px 44px 15px",
          medium: "84px 0px 108px 15px",
          xl: "84px 0px 108px 0px",
        },
        margin: {
          base: "",
          medium: "0 auto",
          xl: "0 auto",
        },
        width: {
          base: "",
          medium: "70%",
          xl: "70%",
        },
        letterSpacing: { base: "0px", xl: "" },
        verticalAlign: "middle",
      },
    },
  },
  //Update here slider Híbrido en serie o Extended Range  (Blue Box)
  {
    component: "PreventiveCampaignsServicesSlider",
    props: {
      title: "",
      items: [
        {
          image: {
            src: "/images/hibrid-mhev.png",
            alt: "VIN",
            width: {
              base: "277.58831787109375px",
              xl: "-webkit-fill-available",
            },
            height: { base: "249px", xl: "fit-content" },
            padding: { base: "0", xl: "" },
            margin: { base: "0", xl: "" },
            maxWidth: { base: "277.58831787109375px", xl: "50%" },
            maxHeight: { base: "249px", xl: "" },
          },
          title: "Híbrido ligero (MHEV)",
          description: {
            intro:
              "Los vehículos con hibridación ligera solo utilizan sus motores eléctricos para ayudar al motor durante el arranque, ya que el motor eléctrico no puede propulsar el vehículo por sí solo.",
            list: [],
          },
        },
        {
          image: {
            src: "/images/hibrid-hev.png",
            alt: "VIN",
            width: {
              base: "277.58831787109375px",
              xl: "-webkit-fill-available",
            },
            height: { base: "249px", xl: "fit-content" },
            padding: { base: "0", xl: "" },
            margin: { base: "0", xl: "" },
            maxWidth: { base: "277.58831787109375px", xl: "50%" },
            maxHeight: { base: "249px", xl: "" },
          },
          title: "Híbrido completo (HEV)",
          description: {
            intro:
              "En un vehículo Toyota híbrido puedes disfrutar de energía 100 % eléctrica en trayectos cortos por la ciudad. El auto funciona tanto en modo eléctrico como en modo gasolina, y durante la conducción selecciona automáticamente el modo adecuado según el terreno.",
            list: [],
          },
        },
        {
          image: {
            src: "/images/hibrid-phev.png",
            alt: "VIN",
            width: {
              base: "277.58831787109375px",
              xl: "-webkit-fill-available",
            },
            height: { base: "249px", xl: "fit-content" },
            padding: { base: "0", xl: "" },
            margin: { base: "0", xl: "" },
            maxWidth: { base: "277.58831787109375px", xl: "50%" },
            maxHeight: { base: "249px", xl: "" },
          },
          title: "Híbrido Enchufable (PHEV)",
          description: {
            intro:
              "Los híbridos enchufables operan de manera similar a los híbridos tradicionales, pero cuentan con una batería de mayor capacidad. Esto permite aumentar su autonomía, y además, pueden recargarse desde una fuente externa.",
            list: [],
          },
        },
      ],
      // Container dimensions - 345px width, 568.72px height (hug content)
      maxwidth: {
        base: "345px",
        medium: "",
        xl: "",
      },
      maxheight: {
        base: "568.72px",
        medium: "",
        xl: "",
      },
      minwidth: {
        base: "345px",
        medium: "",
        xl: "",
      },
      minheight: {
        base: "568.72px",
        medium: "",
        xl: "",
      },
      margin: {
        base: "0 auto",
        medium: "0 auto",
        large: "0 auto",
        xl: "0 auto",
      },
      padding: {
        base: "0",
        medium: "",
        xl: "",
      },
      // Slider container dimensions
      Sliderminwidth: {
        base: "345px",
        medium: "",
        xl: "",
      },
      Sliderminheight: {
        base: "568.72px",
        medium: "",
        xl: "",
      },
      // Custom slide padding for content layout (275px content width, 196.72px content height)
      SwiperSlidepadding: {
        base: "35px 35px 35px 35px", // Creates 275px content width (345-70) and proper spacing
        medium: "",
        xl: "",
      },
      backgroundColor: "#373948", // Specified background color
      showHeader: false, // Hide the header section since we're not using title or subtext
      slideViewHeight: {
        base: "auto", // Auto height on mobile
        xl: "800px", // 500px height on desktop
      },
      slideViewDisplay: {
        base: "block", // Normal display on mobile
        xl: "flex", // Flex display on desktop
      },
      slideViewAlignItems: {
        base: "normal", // Normal alignment on mobile
        xl: "center", // Center alignment on desktop
      },
    },
  },
  {
    component: "HybridMythsCarousel",
    props: {
      header: "Desmintiendo mitos sobre los vehículos híbridos",
      subHeader: " ",
      paddingTop: {
        base: "163px", // 63px (default) + 100px = 163px
        xl: "186px", // Keep desktop padding as default
      },
      paddingContainer: {
        base: "2rem 15px 2rem 15px", // Reset bottom padding to default
        xl: "2rem", // Keep desktop padding as default
      },
      data: [
        {
          title:
            "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diésel",
          description:
            "El consumo puede llegar a ser menor, especialmente en su uso en ciudad o mixto, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, recargando la batería con el movimiento de las ruedas y la inercia generada, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/03_Híbridos_754x379_Web.jpg",
        },
        {
          title:
            "Tengo que recargar el vehículo constatemente y termina siendo más costoso",
          description:
            "El sistema en serie-paralelo de los vehículos híbridos Toyota funcionan tanto con el motor eléctrico como el de combustión interna puede impulsar el vehículo y se hace de forma automática según las condiciones de conducción.",
          image: "/images/05_Híbridos_754x379_Web.jpg",
        },
        {
          title:
            "Los  vehículos hibridos Toyota no son prácticos para viajes largos",
          description:
            "Los híbridos son ideales para viajes largos, ya que combinan la eficiencia del motor eléctrico con la autonomía del motor de combustión. Aunque el consumo no será tan bajo como en ciudad, podrás recorrer largas distancias con un híbrido, que es una experiencia muy similar que si condujéramos un vehículo de motor de combustión tradicional.",
          image: "/images/12_Híbridos_754x379_Web.jpg",
        },
        {
          title: "Son vehículos poco dinámicos y aburridos de conducir",
          description:
            "¡Nada más lejos de la realidad! Los vehículos híbridos Toyota  han evolucionado y hoy en día ofrecen experiencias de conducción emocionantes. Los modelos híbridos combinan motores eléctricos con motores de combustión para optimizar el rendimiento. Además, algunos híbridos cuentan con diferentes modos de conducción que maximizan la potencia y el dinamismo. Por otro lado, el silencio y la suavidad del motor eléctrico pueden hacer que la conducción sea más placentera, especialmente en ciudad. Y si hablamos de tecnología, muchos híbridos incorporan sistemas de asistencia y conectividad, mejorando la experiencia de conducción.",
          image: "/images/14_Híbridos_754x379_Web.jpg",
        },
        {
          title: "Hay que cambiar constatemente la batería",
          description:
            "La batería tiene una larga vida útil. De hecho, en algunos mercados, como Europa y diversas ciudades de EE. UU. y Canadá, los vehículos híbridos de Toyota se emplean como medio de transporte público, recorriendo miles de kilómetros sin requerir un mantenimiento significativo en sus baterías híbridas.",
          image: "/images/15_Híbridos_754x379_Web.jpg",
        },
        {
          title: "Es una tecnología nueva y poco confiable",
          description:
            "Millones de conductores han probado esta tecnología. Actualmente, Toyota está en la cuarta generación de híbridos, alcanzando récords de eficiencia. Durante más de 20 años, la marca ha comercializado vehículos híbridos y, en ese tiempo, ha vendido más de 10 millones en todo el mundo.",
          image: "/images/08_Híbridos_754x379_Web.jpg",
        },
        {
          title:
            "Es más complicado conducir un híbrido que un vehículo de combustión interna.",
          description:
            "La conducción híbrida es igual de sencilla, ya que no tiene marchas y su experiencia de conducción es similar a la de un vehículo automático. El automóvil identifica de manera autónoma cuándo puede impulsarse con el motor eléctrico, cuándo necesita utilizar el de combustión o ambos a la vez. Lo único que podría requerir un periodo de adaptación es el hecho de que, en modo eléctrico, el auto un sonido bajo. Sin embargo, lo bueno es fácil de acostumbrarse.",
          image: "/images/13_Híbridos_754x379_Web.jpg",
        },
        {
          title: "Si se agota la batería eléctrica, el auto no arrancará.",
          description:
            "¡Falso! Los vehículos híbridos están diseñados para encender y apagar automáticamente el motor de gasolina, evitando así que la batería híbrida se descargue por completo.  Sin embargo, si las condiciones de la carretera o el estilo de conducción agotan la batería, el motor de gasolina tomará el control para mantener el funcionamiento del vehículo.Un híbrido no fallará debido a la batería, ya que cuenta con una segunda fuente de energía.Además, cuando el nivel de carga sea bajo, el sistema híbrido aprovechará la energía regenerada por el frenado o el rodaje libre para recargarla mientras el vehículo se desplace impulsado por el motor de gasolina.",
          image: "/images/15__Híbridos_754x379_Web.jpg",
        },
      ],
      TitlemarginBottom: {
        base: "25px",
        medium: "",
        larg: "",
        xl: "",
      },
      TextParagraphHeight: {
        base: "508px",
        xl: "",
      },
      ViewMaxHeight: {
        base: "1235px",
        xl: "unset",
      },
    },
  },

  // {
  //   component: "News",
  //   props: {
  //     subheader: "Blog y Noticias",
  //     header: "Conoce las últimas noticias sobre Híbridos",
  //     data: [
  //       {
  //         id: "1",
  //         imageSrc: "/images/news01-hridios.png",
  //         imageAlt: "news-1",
  //         date: "07/02/24",
  //         readingTime: "4 min",
  //         title: "La Historia de la Tecnología",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //       {
  //         id: "2",
  //         imageSrc: "/images/news/news-2-hb.png",
  //         imageAlt: "news-2",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //       {
  //         id: "3",
  //         imageSrc: "/images/news/maranda-news.png",
  //         imageAlt: "news-3",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //       {
  //         id: "4",
  //         imageSrc: "/images/news/news-4.png",
  //         imageAlt: "news-4",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //       {
  //         id: "5",
  //         imageSrc: "/images/news/news-5.png",
  //         imageAlt: "news-5",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //       {
  //         id: "6",
  //         imageSrc: "/images/news/news-6.png",
  //         imageAlt: "news-6",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //     ],
  //     headerWidth:{base:"100%" ,xl:"100%"}
  //   },
  // },
];

export default function Home() {
  return (
    <div className="page-container">
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
      <style jsx>{`
        .page-container {
          padding-bottom: 0;
        }
        @media (max-width: 768px) {
          .page-container {
            padding-bottom: 100px;
          }
        }
      `}</style>
    </div>
  );
}
