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
        text: `Ciclo de vida del vehículo`,
        fontSize: {
          base: "56px",
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
        verticalAlign: "middle",
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
        src: "/images/Circlo.png",
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
        text: `WebConserva  es una a fundación independiente sin ánimo de lucro que tiene como misión impulsar la conservación y uso sostenible de los ecosistemas, mediante la promoción y ejecución de proyectos y programas enfocados a la educación ambiental y a la investigación. </br> </br> Con el apoyo de Automotores Toyota Colombia, la fundación WebConserva desarrolló el aplicativo Conserva.CO, una herramienta diseñada para facilitar el reporte de los daños al ambiente. El aplicativo cuenta con una página web y aplicaciones gratuitas para Android y iOS. El lanzamiento de la aplicación se realizó con el Ministerio de Ambiente y Desarrollo Sostenible, el cual contó con la presencia del señor Ministro de Ambiente Luis Gilberto Murillo, el presidente de Automotores Toyota Colombia, el señor Edge Egashira y la señora Cristina Tingle de WebConserva.`,
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
        fontWeight: {
          base: "400",
          medium: "400",
          xl: "400",
        },
        textAlign: {
          base: "left",
          medium: "center",
          xl: "left",
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
          xl: "0 auto 170px",
        },

        padding: {
          base: "0 15px",
          medium: "",
          xl: "",
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
  // Update the SliderInfo component to accept dynamic props from configuration
  {
    component: "SliderInfo",
    props: {
      backgroundColor: "#F5F5F5",
      color: "#1A1A1A",
      head: {
        subtitle: "",
        title:
          "Conviértete en un Centinela del Ambiente, en solo tres pasos puedes reportar los daños al Ambiente:",
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

  {
    component: "HybridMythsCarousel",
    props: {
      header: "Cumplimiento de las siguientes metas ambientales",
      subHeader: "Contribución al medio ambiente.",
      data: [
        {
          title:
            "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
          description:
            "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/mix_light_color.png",
        },
        {
          title:
            "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
          description:
            "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/mix_light_color.png",
        },
        {
          title:
            "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
          description:
            "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/mix_light_color.png",
        },
      ],
    },
  },
  //update SliderGallery component to accept dynamic data
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

export default function ArmoniaNatualeza() {
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
