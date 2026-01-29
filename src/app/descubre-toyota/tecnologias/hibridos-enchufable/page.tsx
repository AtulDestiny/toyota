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
          imageMobile: "/images/Cabecera-Toyota-Yaris-Cross-2.png",
          imageDesktop: "/images/Cabecera-Toyota-Yaris-Cross-2.png",
          title: "Híbridos Toyota",
          description: "",
        },
        {
          imageMobile: "/images/Cabecera-Toyota-Yaris-Cross-2.png",
          imageDesktop: "/images/Cabecera-Toyota-Yaris-Cross-2.png",
          title: "Híbridos Toyota",
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
        letterSpacing: "-1.12px",
        verticalAlign :"middle"
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
        text: `Un vehículo híbrido es cualquier vehículo que utiliza dos fuentes motrices. Estos incluyen veleros (viento/motor) o una locomotora (diesel/eléctrico) En el caso de los vehículos automotores, un híbrido es un vehículo que combina dos motorizaciones, un motor de combustión interna y otro eléctrico alimentado por baterías adicionales a la principal. Muchos de los híbridos son vehículos de gasolina o nafta, con un sistema de ahorro de energía automático, que los convierte en los autos más eficientes del mundo. </br></br>Son una realidad desde hace muchos años y poco a poco empiezan a hacerse populares por la crisis petrolera, el alza de combustibles, abaratamiento de la tecnología y concientización ambiental.`,
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
        letterSpacing: { base:"0px" ,xl:"" },

      },
      image: {
        src: "/images/cars/desktop_hybrid_1.png",
        alt: "Toyota Hybrid Car",
        width: { base: "100%" },
        height: "auto",
        objectFit: {base:"cover" ,xl: "contain"},
        padding: {
          base: "57px 0px 0px 0px",
          medium: "57px 16px 0px 17px",
          xl: "0px 0px 0px 60px",
        },
        margin: {
          base:"0 auto",
          xl: "0px 0px 177px 0px",
        },
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
        display :{base:"flex" ,xl:""},
        minHeight: {
          base: "",
          medium: "450px",
          xl: "450px",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: { xl: "start" },
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
      title: "Beneficios",
      subtitle: "Híbrida",
      image: "/images/hibrida.png",
      list: [
        {
          title: "Mayor eficiencia",
          description:
            "Mayor eficienci Recorrer mayores distancias con menor consumo de combustibles.",
        },
        {
          title: "Más económico",
          description: "La combinación de sus motores reducen hasta en un 40% el consumo de combustible.",
        },
        {
          title: "Suavidad de marcha",
          description:
            "+ Conducción más vida = menos estrés.",
        },
        {
          title: "Mayor autonomía",
          description: "Sin necesidad de recargar la batería, el ahorro de tiempo y energía es máximo.",
        },
        {
          title: "Menos piezas",
          description: `= menos desgaste <br>= mantenimiento más económico.`,
        },
        {
          title: "Ventajas fiscales",
          description: "En ciertos países que adoptan energías limpias.",
        },
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

        letterSpacing: {base:"0px" ,xl:""},
        color: "",
      },
      description: {
        text: `Conducir un Toyota híbrido es el mejor remedio contra el estrés. Suave, potente y silencioso, con la satisfacción de saber que reduce el consumo de combustible y las emisiones.`,
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
        letterSpacing: { base:"0px" ,xl:"0px" },

      },
      image: {
        src: "/images/cars/desktop_image_car.png",
        alt: "Toyota Hybrid Car",
        width: { base: "100%" },
        height: "auto",
        objectFit: {base:"fill" ,xl:"contain"},
        margin: {
          base: "32px 0px 0px",
          medium: "0px 0px 0px 60px",
          xl: "0px 0px 0px 60px",
        },
        maxWidth: {
          base: "",
          medium: "",
          xl: "687px",
        },
        maxHeight: {
          base: "174px",
          medium: "",
          xl: "",
        },
        borderRadius :{base:"0" ,xl:"0"},
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

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "¿Por qué son más eficientes y reducen las emisiones?",
        fontSize: {
          base: "22px",
          medium: "26px",
          xl: "26px",
        },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: {
          base: "700",
          medium: "700",
          xl: "700",
        },
        lineHeight: {
          base: "28px",
          medium: "normal",
          xl: "normal",
        },
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        padding: {
          base: "42px 15px 0px",
          xl: "113px 0px 0px",
        },
        color: "",
        letterSpacing: { base:"0px" ,xl:"0px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      sections: [
        {
          title: "Excelente Arranque",
          description:
            "Utilizan solo el motor eléctrico alimentado por la energía almacenada en la batería.",
        },
        {
          title: "Conducción normal",
          description:
            "Utilizan solo el motor eléctrico alimentado por la energía almacenada en la batería.",
        },
        {
          title: "Aceleración fuerte",
          description:
            "El motor eléctrico ayuda al motor de combustión interna para dar suplemento de potencia.",
        },
        {
          title: "Durante la desaceleración",
          description:
            "El eléctrico sirve de generador y recarga la batería utilizando el movimiento de las ruedas como un dínamo. El motor de combustión interna no consume.",
        },
        {
          title: "En baja velocidad",
          description:
            "Únicamente opera el motor eléctrico, buscando la e ciencia.",
        },
        {
          title: "Con el vehículo detenido",
          description:
            "El motor de combustión interna y el eléctrico se encuentran apagados, solo se encienden si hay que recargar la batería.",
        },
      ],
      sectionTitleStyle: {
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontSize: { base: "22px", xl: "32px" },
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: "100%",
        textAlign: "left",
        letterSpacing: { base:"0px" ,xl:"0px" },
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
        letterSpacing: { base:"0px" ,xl:"0px" },
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
          medium: "700",
          xl: "700",
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
        
        letterSpacing: { base:"-1.12px" ,xl:"" },
        verticalAlign:"middle",
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
        letterSpacing: { base:"0px" ,xl:"" },
        verticalAlign:"middle",
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
            src: "/images/clasificacion1.png",
            alt: "VIN",
            width: { base: "100px", xl: "-webkit-fill-available" },
            height: { base: "100px", xl: "fit-content" },
            padding:{base:"" ,xl:""},
            margin:{base:"20px 0 0 27px" ,xl:""}
          },
          title:
            "Híbrido en serie o Extended Range Electric Vehicle (Vehículo Eléctrico de Alcance Extendido o EREV).",
          description: {
            intro:
              "El motor eléctrico es el responsable de impulsar el vehículo. El motor de combustión interna no tiene conexión mecánica con las ruedas, por lo que su papel es únicamente generar electricidad. Dicho motor funciona a un régimen óptimo y recarga la batería hasta que se llena, momento en el cual se desconecta temporalmente. La tracción es siempre eléctrica.:",
            list: [],
          },
        },
        {
          image: {
            src: "/images/clasificacion2.png",
            alt: "VIN",
            width: { base: "100px", xl: "-webkit-fill-available" },
            height: { base: "100px", xl: "fit-content" },
            padding:{base:"" ,xl:""},
            margin:{base:"20px 0 0 27px" ,xl:""}
          },
          title: "Híbrido en paralelo o Mild Hybrid (Híbrido leve):",
          description: {
            intro:
              "Tanto el motor de combustión interna como el eléctrico se utilizan para dar fuerza a la transmisión a la vez. Aquí el motor de combustión interna es el que principalmente impulsa el vehículo, y el eléctrico es responsable de brindar apoyo cuando es necesario, por lo que el auto nunca puede estar en modo 100% eléctrico. Es una solución relativamente sencilla, pero no es la más eficiente",
            list: [],
          },
        },
        {
          image: {
            src: "/images/clasificacion3.png",
            alt: "VIN",
            width: { base: "100px", xl: "-webkit-fill-available" },
            height: { base: "100px", xl: "fit-content" },
            padding:{base:"" ,xl:""},
            margin:{base:"20px 0 0 27px" ,xl:""}

          },
          title: "Híbrido serie-paralelo",
          description: {
            intro:
              "Aquí, tanto el motor eléctrico como el de combustión interna puede impulsar al vehículo (por lo que cuentan con una conexión mecánica a las ruedas), y se hace de forma automática según las condiciones de conducción. Este diseño de avanzada hace que sea una solución muy eficiente a nivel mecánico y electrónico.",
            list: [],
          },
        },
      ],
      maxwidth: {
        base: "345px",
        medium: "",
        xl: "",
      },

      maxheight: {
        base: "",
        medium: "",
        xl: "",
      },
      minwidth: {
        base: "",
        medium: "",
        xl: "",
      },

      minheight: {
        base: "664.9910278320312px",
        medium: "",
        xl: "",
      },
      margin: {
        base: "0 auto",
        medium: "0 auto",
        larg:"0 auto",
        xl: "0 auto",
      },
      padding: {
        base: "30px",
        medium: "",
        xl: "",
      },
      Sliderminwidth: {
        base: "285px",
        medium: "",
        xl: "",
      },

      Sliderminheight: {
        base: "664.9910278320312px",
        medium: "",
        xl: "",
      },
      SwiperSlidepadding: {
        base: "",
        medium: "",
        xl: "",
      },
    },
  },
  {
    component: "HybridMythsCarousel",
    props: {
      header: "Desmintiendo mitos sobre los Híbridos",
      subHeader: "Híbridos",
      data: [
        {
          title:
            "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
          description:
            "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/Desmintiendo.png",
        },
        {
          title:
            "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
          description:
            "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/Desmintiendo.png",
        },
        {
          title:
            "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
          description:
            "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/Desmintiendo.png",
        },
      ],
      TitlemarginBottom: {
        base: "25px",
        xl: "25px",
      },
      TextParagraphHeight:{
        base:"491px",
        xl:""
      },
      ViewMaxHeight:{
        base:"774px",
        xl:"unset",
      }
    },
  },

  {
    component: "News",
    props: {
      subheader: "Blog y Noticias",
      header: "Conoce las últimas noticias sobre Híbridos",
      data: [
        {
          id: "1",
          imageSrc: "/images/news01-hridios.png",
          imageAlt: "news-1",
          date: "07/02/24",
          readingTime: "4 min",
          title: "La Historia de la Tecnología",
          description:
            "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
          link: "/",
        },
        {
          id: "2",
          imageSrc: "/images/news/news-2-hb.png",
          imageAlt: "news-2",
          date: "08/02/24",
          readingTime: "4 min",
          title: "Fortalecimiento a través de la comunidad",
          description:
            "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
          link: "/",
        },
        {
          id: "3",
          imageSrc: "/images/news/maranda-news.png",
          imageAlt: "news-3",
          date: "08/02/24",
          readingTime: "4 min",
          title: "Fortalecimiento a través de la comunidad",
          description:
            "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
          link: "/",
        },
        {
          id: "4",
          imageSrc: "/images/news/news-4.png",
          imageAlt: "news-4",
          date: "08/02/24",
          readingTime: "4 min",
          title: "Fortalecimiento a través de la comunidad",
          description:
            "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
          link: "/",
        },
        {
          id: "5",
          imageSrc: "/images/news/news-5.png",
          imageAlt: "news-5",
          date: "08/02/24",
          readingTime: "4 min",
          title: "Fortalecimiento a través de la comunidad",
          description:
            "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
          link: "/",
        },
        {
          id: "6",
          imageSrc: "/images/news/news-6.png",
          imageAlt: "news-6",
          date: "08/02/24",
          readingTime: "4 min",
          title: "Fortalecimiento a través de la comunidad",
          description:
            "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
          link: "/",
        },
      ],
      headerWidth:{base:"100%" ,xl:"100%"}
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
