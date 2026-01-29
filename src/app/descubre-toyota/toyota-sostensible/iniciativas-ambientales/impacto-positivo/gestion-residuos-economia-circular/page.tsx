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
        text: `Circularidad`,
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
      title: {
        text: "Economía circular",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "61.6px",
        textAlign: "left",
        padding: { base: "10px 15px 0px", xl: "0" },
        letterSpacing: "-1.12px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Estamos acelerando las oportunidades para desarrollar una economía circular totalmente sostenible, mejorando aún más nuestro enfoque de 360 ​​grados de larga data de Reducir, Reutilizar, Reciclar y Recuperar.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: {
          base: "32px 16px 0px 15px",
          xl: "73px  0px 89px",
          xxl: "73px  0px 89px",
        },
      },
    },
  },
  //add here video player compoenet

  {
    component: "VideoPlayer",
    props: {
      image: {
        src: "/images/image circular.png",
        alt: "Circular",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Empezando desde el diseño",
        fontSize: {
          base: "32px",
          medium: "26px",
          xl: "26px",
        },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: {
          base: "400",
          medium: "700",
          xl: "700",
        },
        textAlign: "left",
        lineHeight: {
          base: "41.6px",
          medium: "26px",
          xl: "100%",
        },
        padding: {
          base: "158px 17px 0px 15px",
          medium: "38px 0px 0px",
          xl: "38px 0px 0px",
        },
        margin: {
          base: "",
          medium: "",
          xl: "69px 0px 0px",
        },

        letterSpacing: {
          base: "",
          medium: "",
          xl: "0px",
        },
        color: "",
        flex: {
          base: "",
          medium: "",
          xl: "auto",
        },
      },
      description: {
        text: "El mantra de las cuatro R (Reducir, Reutilizar, Reciclar y Recuperar) define nuestra mejora constante en el diseño de vehículos. Nos impulsa a pensar en cómo podemos fabricar vehículos futuros aún más limpios y eficientes. Lo logramos utilizando materiales innovadores y sistemas de energía alternativos, a la vez que minimizamos las emisiones de carbono y el uso de valiosos recursos naturales. Diseñamos nuestros vehículos con un concepto de fácil desmontaje, priorizando piezas y materiales reutilizables. Estos pueden reprocesarse para su uso en la fabricación, reciclarse o incluso utilizarse como fuente de energía alternativa.",
        fontSize: { base: "16px", medium: "12px", xl: "22px" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: "400",
        textAlign: "left",
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "140%",
        },
        // padding: "38px 16px 0",
        padding: {
          base: "38px 16px 43px",
          medium: "40px 0px 0px",
          xl: "40px 0px 0px",
        },
      },
      image: {
        src: "/images/image-el.png",
        alt: "image-el",
        width: { base: "100%" },
        height: "auto",
        objectFit: "contain",
        padding: {
          base: "57px 16px 0px 17px",
          medium: "57px 16px 0px 17px",
          xl: "",
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
        margin: {
          base: "0",
          xl: "158px 0px 0px",
        },
        borderRadius: "10px",
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: { base: "center", xl: "center", xxl: "center" },
        flexWrap: "wrap-reverse",
        maxHeight: {
          base: "auto",
          medium: "450px",
          xl: "450px",
        },

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
    component: "HybridMythsCarousel",
    props: {
      header: "Buscamos minimizar los residuos",
      subHeader: "Evitar el desperdicio",
      paddingTop: { base: "68px", xl: "138px" },
      data: [
        {
          title: "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
          description:
            "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/circular-slider.png",
        },
        {
          title: "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
          description:
            "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/circular-slider.png",
        },
        {
          title: "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
          description:
            "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
          image: "/images/circular-slider.png",
        },
      ],
    },
  },

  {
    component: "TestimonalCard",
    props: {
      backgroundColor: "#73675C",
      title: "Ampliación de la vida útil de las piezas del vehículo",
      description:
        "Durante el tiempo que un coche circula, muchas de sus piezas se pueden reacondicionar y reutilizar. Los mismos principios se aplican cuando un vehículo se prepara para el desguace. Aún puede contener muchas piezas que se pueden recuperar para su reacondicionamiento y reutilización. ",
      imageSrc: "/images/AmpliacionImage.png",
    },
  },
  // add here section with title , paragraph and image  : Ampliación de la vida útil de las piezas del vehículo
];

export default function GestionCircular() {
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
