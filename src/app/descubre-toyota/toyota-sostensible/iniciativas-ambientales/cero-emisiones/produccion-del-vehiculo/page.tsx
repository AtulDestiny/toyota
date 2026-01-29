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
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Armonía con la naturaleza`,
        fontSize: {
          base: "14px",
          medium: "32px",
          xl: "14px",
        },
        lineHeight: {
          base: "19.6px",
          medium: "normal",
          xl: "19.6px",
        },
        width: {
          base: "100%",
          medium: "calc(100% - 80px)",
          xl: "70%",
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
        padding: {
          base: "0 15px",
          medium: "",
          xl: "",
        },
        margin: {
          base: "48px auto 0",
          medium: "",
          xl: "94px 0px 0",
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
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Producción del vehículo`,
        fontSize: {
          base: "56px",
          medium: "32px",
          xl: "56px",
        },
        lineHeight: {
          base: "61.6px",
          medium: "normal",
          xl: "61.6px",
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
          xl: "var(--font-toyotaDisplay)",
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
          base: "10px auto 30px",
          medium: "",
          xl: "13px 0px 118px",
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
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: " /images/Produccion_del_vehiculo.png",
        alt: "Captura de pantalla",
        width: { base: "100%", xl: "668px" },
        height: { base: "270px", xl: "450px" },
        padding: {
          base: "0 15px",
          medium: "0px 0px 0px 0px",
          xl: "0px 0px 0px 0px",
        },
        borderRadius: {
          base: "10px",
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
          medium: "450px",
          xl: "450px",
        },
        margin: {
          base: "auto",
          medium: "",
          xl: "0 auto 0px",
        },
      },
      description: {
        text: `Después de la exitosa campaña de reforestación en Guasca  Cundinamarca, junto a los tres concesionarios de la región antioqueña, decidimos continuar con el programa Bosque Toyota Medellín. Acción que representa uno de los objetivos globales de Toyota enfocados en disminuir la huella de carbono en el mundo. </br> </br> Bosque Toyota Medellín, está ubicado en la reserva biológica El Silencio, cuenta con más de 170 hectáreas de área protegida de bosque andino en restauración. </br> </br>Es una zona con altos niveles de presión por siembra de pino, por lo que tiene alto potencial para la restauración y la conservación. </br> </br>En este lugar sembramos variedades de Drago, Nacedero, Arrayán, Espadero, Arboloco, Camargo, Guamo, Aguacatillo y Quimulá, entre otras especies. </br> </br>El objetivo es lograr plantar más de 7.500 árboles durante los próximos 5 años con el fin de conservar los ecosistemas nativos y aportar en el cuidado de las fuentes hídricas de la zona`,
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
          xl: "100%",
        },
        minWidth: {
          base: "",
          medium: "",
          xl: "600px",
        },
        fontWeight: {
          base: "400",
          medium: "400",
          xl: "400",
        },
        textAlign: {
          base: "left",
          medium: "center",
          xl: "",
        },
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "100%",
        },
        // padding: "38px 16px 0",
        margin: {
          base: "30px auto 50px ",
          medium: "",
          xl: "0 auto 87px",
        },

        padding: {
          base: "0 15px",
          medium: "",
          xl: "",
        },
        justifyContent: {
          base: "start",
          medium: "center",
          xl: "center",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: { base: "center", xl: "start" },
        flexWrap: "wrap",
        justifyContent: {
          base: "start",
          medium: "center",
          xl: "center",
        },
        gap: { base: "", xl: "88px" },
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
          xl: "",
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
    component: "QuoteBlock",
    props: {
      quote:
        "“Estamos convencidos que si todos hacemos un aporte, en este caso un árbol más, lograremos disminuir la huella de carbono en el planeta. El Bosque Toyota representa nuestra filosofía de ir por más, por eso trabajamos en acciones que nos permiten ser actores positivos dentro del ecosistema ambiental de Colombia”",
      author: "Edge Egashira, presidente de Automotores Toyota Colombia.",
      backgroundImage: "/images/quote-bg.png",
    },
  },

  //add here  image with text text Component
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Ampliación del programa de El Bosque Toyota Medellín",
        fontSize: {
          base: "26px",
          medium: "32px",
          xl: "26px",
        },
        lineHeight: {
          base: "normal",
          medium: "61.6px",
          xl: "normal",
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
        margin: {
          base: "46px 15px 0",
          medium: "",
          xl: "",
        },
      },
      description: {
        text: `Consolidamos una alianza con la Fundación Natura para la restauración en dos regiones de Colombia, con la cual se espera, sembrar y mantener más de 15.000 especies en un periodo de 5 años.<br/> </br>Para el desarrollo de este proyecto hemos trabajado de la mano de la Fundación Natura, que vela por la conservación y el uso sostenible de la biodiversidad. Las reservas biológicas a su cargo son un ejemplo de restauración en el país.`,
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
        padding: {
          base: "0 15px",
          medium: "10px 0px 0px 0px",
          xl: "40px 0px 0px 0px",
        },
        margin: {
          base: "34px 0 48px",
          medium: "auto",
          xl: "0 auto 180px ",
        },
      },
      image: {
        src: "/images/car_inter.png",
        alt: "car interior",
        width: { base: "100%", xl: "100%" },
        height: "auto",
        objectFit: "fill",
        padding: {
          base: "46px 16px 61px 17px",
          medium: "0px 0px 0px 0px",
          xl: "0px 0px 0px 0px",
        },
        margin: {
          base: "0px 0px 0px 0px",
          medium: "0px 0px 0px 0px",
          xl: "0px auto",
        },
        borderRadius: {
          base: "",
          medium: "",
          xl: "8px",
        },
        maxWidth: {
          base: "",
          medium: "",
          xl: "500px",
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
        alignItems: "start",
        flexWrap: "wrap-reverse",
        justifyContent: "center",
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
        // padding: {
        //   base: "",
        //   medium: "",
        //   xl: "0 30px",
        // },
        margin: {
          base: "",
          medium: "113px auto",
          xl: "0px auto 0 ",
        },
      },
    },
  },

  //Update sldier SliderGallery to acccept dynamic props
  {
    component: "SliderGallery",
    props: {
      backgroundColor: "#F5F5F5",
      color: "#1A1A1A",
      head: {
        subtitle: "Explora nuestros servicios",
        title: "Beneficios exclusivos para tu Toyota",
      },
      slides: [
        {
          id: "slide-1",
          data: {
            image: "/images/sliderinfo/service-1.png",
            title: "Mantenimiento Certificado",
            text: "Confía en técnicos especializados y piezas originales para mantener tu Toyota como nuevo.",
          },
        },
        {
          id: "slide-2",
          data: {
            image: "/images/sliderinfo/service-2.png",
            title: "Asistencia en Ruta",
            text: "Contamos con soporte 24/7 para ayudarte en cualquier momento que lo necesites.",
          },
        },
        {
          id: "slide-3",
          data: {
            image: "/images/sliderinfo/service-3.png",
            title: "Garantía Extendida",
            text: "Protege tu inversión con planes de garantía pensados para darte tranquilidad.",
          },
        },
      ],
    },
  },
];

export default function ProduccionVehiculo() {
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
