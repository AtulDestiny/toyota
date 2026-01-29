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
      title: {
        text: "#MovilidadParaTodos",
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
          xl: "94px 15px 0px",
        },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Apoyo a Fundafe ",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
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
        text: "En su labor de rehabilitación de personas con limitaciones o carencia en sus extremidades inferiores.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 0px 15px", xl: "73px  0px 58px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/man_in_garage_with_eye_glass.png",
        alt: "Mask",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: "45px 15px 0px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "A las actividades de Responsabilidad Social le sumamos otra, la entrega de chatarra. Gracias a los materiales que muchas veces desechamos de nuestros talleres, la Fundación Fuente de Esperanza (FUNDAFE) fabrica prótesis que son entregadas a personas que tienen limitaciones en sus extremidades inferiores o que carecen de ellas y que no cuentan con los recursos económicos para adquirirlas o hacerle sus mantenimientos preventivos.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 0px 15px", xl: "73px  0px 58px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/two_man_in_the_garage.png",
        alt: "Lotus flower",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: "45px 0 45px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Así mismo, los elementos que no son susceptibles de transformación son comercializados por la Fundación, lo que garantiza el proceso de disposición final de las piezas. Con el dinero recibido se financia el mantenimiento de las prótesis y la adquisición de elementos necesarios para su fabricación. </br> </br>“nuestro proceso de fabricación comienza con la recolección de chatarra, que es el 70% de nuestra materia prima, que sin afectar la calidad de producción, la transformamos en piezas para ensamble de prótesis. Es por eso que nuestros costos no superan el 30 % de los del mercado protésico. De esta manera ayudamos a muchos colombianos que esperan la oportunidad de volver a caminar sobre sus dos pies” afirma Juan Salcedo, fundador y técnico de Fundafe.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 0px 15px", xl: "73px  0px 58px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/4_people_in_image.png",
        alt: "Lotus flower",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: "45px 0 45px",
      },
    },
  },

  {
    component: "TestimonalCard",
    props: {
      backgroundColor: "#1F2C40",
      title: "Modelo implementado por FUNDAFE en el proceso de rehabilitación",
      description:
        "Está basado en RBC (Rehabilitación basada en comunidad) en el que se involucra no solo a la familia del beneficiario sino a su entorno y a la sociedad en su proceso rehabilitación psicosocial, llevándolos hacia una rápida adaptación a su nueva condición y preparándolos para enfrentar los nuevos desafíos que le presenta la sociedad. </br> </br> “En Toyota, una compañía comprometida con ofrecer alternativas de movilidad para la humanidad, nos sentimos orgullosos de poder ser parte de las actividades de esta Fundación. Esperamos poder continuar contribuyendo a que muchas más personas puedan volver a caminar en sus dos pies y que puedan asumir sus vidas con plena normalidad” Afirma Ligia Vega, Vicepresidente Administrativa y Financiera de Automotores Toyota Colombia.",
      imageSrc: "/images/FundafeNews.png",
    },
  },
];

export default function ProtesisConFundafe() {
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
