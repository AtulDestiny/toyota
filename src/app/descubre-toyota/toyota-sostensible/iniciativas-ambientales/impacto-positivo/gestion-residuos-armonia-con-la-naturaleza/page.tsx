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
    component: "MainSlider", // Component name
    props: {
      slides: [
        {
          imageMobile:
            "/images/gestion-residuos-armonia-con-la-naturaleza-banner.png",
          imageDesktop:
            "/images/gestion-residuos-armonia-con-la-naturaleza-banner.png",
          title: "Armonía con la naturaleza",
        },
      ], // Passing slides data inline
      sliderConfig: {
        slidesPerView: 1, // Number of slides visible at a time
        spaceBetween: 10, // Space between slides
        isButton: false,
        loop: true, // Infinite loop of slides
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
      title: {
        text: "Bosque Toyota",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "61.6px",
        textAlign: "left",
        padding: { base: "10px 15px 0px", xl: "0  0 50px 0 " },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
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
        text: "Entendemos que el futuro del planeta se construye con acciones concretas. Por eso, a través del Bosque Toyota, reafirmamos nuestro compromiso con la sostenibilidad y la restauración de ecosistemas.",
        fontSize: { base: "16px", medium: "12px", xl: "16px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontWeight: "400",
        textAlign: "left",
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        maxWidth: "755px",
        // padding: "38px 16px 0",
      },
      image: {
        src: "/images/edb53307-2990-4a96-9320-8ea29bc0700.jpg",
        alt: "Hill and Tree",
        width: { base: "100%" },
        height: "auto",
        objectFit: "cover",

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
        alignItems: "center",
        // flexWrap: "wrap-reverse",
        justifyContent: "center",
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
          medium: "15px auto",
          xl: "15px auto",
        },
      },
    },
  },

  {
    component: "QuoteBlock",
    props: {
      quote:
        "Cada jornada de siembra se convierte en un acto simbólico en el que nuestros colaboradores, aliados y voluntarios plantan árboles con propósito, sumando acciones que generen impacto positivo para la naturaleza y construyendo un mundo mejor para las futuras generaciones.",
      backgroundImage: "/images/82a212ec-e5a5-48ee-b77b-36d51716986000.jpg",
      author: " ",
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: " ",
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
          xl: "48px 15px 0px",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      justifyContent: "start",
      title: {
        text: "El bosque Toyota se desarrolla en dos lugares:",
        fontSize: {
          base: "32px",
          medium: "26px",
          xl: "26px",
        },
        maxWidth: "755px",
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
          medium: "0 0px 39px 0px",
          xl: "0px 0px 39px 0px",
        },
        justifyContetn: "start",
        letterSpacing: "",
        color: "",
      },
      description: {
        text: "- Reserva biológica El Encenillo, ubicada en el municipio de Guasca, Cundinamarca.   - Reserva biológica El Silencio, ubicada en el municipio el Retiro, Antioquia.",
        fontSize: { base: "16px", medium: "12px", xl: "16px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontWeight: "400",
        textAlign: "left",
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        maxWidth: "755px",
      },
      image: {
        src: "/images/PHOTO-2025-04-04-15-31-57.jpg",
        alt: "image-bosque",
        width: { base: "100%" },
        height: "auto",
        objectFit: "cover",

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
        alignItems: "center",
        // flexWrap: "wrap",
        justifyContent: "center",
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
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Clean-Up Toyota",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "61.6px",
        textAlign: "left",
        padding: { base: "10px 15px 0px", xl: "60px 15px 30px 15px" },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: " ",
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
          xl: "48px 15px 0px",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Ampliamos nuestras actividades de responsabilidad social a las playas de Cartagena",
        fontSize: {
          base: "32px",
          medium: "26px",
          xl: "26px",
        },
        maxWidth: "755px",
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
          medium: "0 0px 39px 0px",
          xl: "0px 0px 39px 0px",
        },
        letterSpacing: "",
        color: "",
      },
      description: {
        text: "Con el objetivo de continuar con el desarrollo de actividades que buscan luchar contra el cambio climático, adelantamos la campaña de limpieza de una de las playas de la Isla Bocachica en Cartagena, con esta ya son tres las actividades cuya finalidad es la protección del medio ambiente. Con “Clean-Up Toyota – Cartagena 2020” (Limpieza Cartagena 2020), como se llamó esta nueva actividad, logramos contar con espacios en mejores condiciones y así mismo mejorar la calidad de vida de todos los que habitan la zona.",
        fontSize: { base: "16px", medium: "12px", xl: "16px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontWeight: "400",
        textAlign: "left",
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        maxWidth: "755px",
      },
      image: {
        src: "/images/CleanUp.png",
        alt: "image-bosque",
        width: { base: "100%" },
        height: "auto",
        objectFit: "cover",

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
        alignItems: "center",
        // flexWrap: "wrap",
        justifyContent: "center",
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

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     image: {
  //       src: "/images/toyota_flag_on_field.png",
  //       alt: "Toyota Hybrid Car",
  //       width: { base: "100%", xl: "80%" },
  //       height: { base: "auto", xl: "400px" },
  //       // borderRadius: "10px",
  //       margin: {
  //         xl: "142px auto 174px",
  //       },
  //       objectFit: "cover",
  //       padding: { base: "47px 0px 28px", xl: "0 0 28px 0" },
  //     },
  //   },
  // },
  // {
  //   component: "TestimonalCard",
  //   props: {
  //     backgroundColor: "#73675C",
  //     title: "¿En qué nos destacamos?",
  //     description:
  //       "“Toyota se ha destacado por su compromiso y decisión de generar actividades que buscan luchar contra el cambio climático. La marca se ha trazado el ambicioso objetivo de mejorar la salud del planeta a través del Desafío Medioambiental Toyota 2050 a partir de una operación con un uso eficiente de la energía en las plantas de ensamblaje, la financiación de proyectos sostenibles o las alianzas con organizaciones que comparten la misma filosofía son algunas de las iniciativas para actuar positivamente frente a la contaminación del planeta.” Aseguró Edge Egashira, presidente de Automotores Toyota Colombia.",
  //     imageSrc: "/images/Ampliamosimage.png",
  //   },
  // },

  //add here title with Paragraph and image components
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "La jornada contó con la participación de ejecutivos de Automotores Toyota Colombia y la Fundación Puerto Bahía, quienes estuvieron acompañados por representantes de concesionarios y aliados estratégicos. </br> </br>Desde Toyota nos enorgullece ser parte de esta iniciativa de Responsabilidad Social. Los océanos y playas han sido lugares críticos de contaminación en el mundo, por lo tanto, aportar nuestro grano de arena para la limpieza de una de las playas de Bocachica es motivante para nosotros. Queremos aportar para devolverle la magia a las playas cartageneras.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 52px 15px", xl: "73px  0px 58px" },
      },
    },
  },

  //update SliderGallery component to accept dynamic data
  // {
  //   component: "SliderGallery",
  //   props: {
  //     backgroundColor: "#F5F5F5",
  //     color: "#1A1A1A",
  //     head: {
  //       subtitle: "Explora nuestros servicios",
  //       title: "Beneficios exclusivos para tu Toyota",
  //     },
  //     slides: [
  //       {
  //         id: "slide-1",
  //         data: {
  //           image: "/images/sliderinfo/service-1.png",
  //           title: "Mantenimiento Certificado",
  //           text: "Confía en técnicos especializados y piezas originales para mantener tu Toyota como nuevo.",
  //         },
  //       },
  //       {
  //         id: "slide-2",
  //         data: {
  //           image: "/images/sliderinfo/service-2.png",
  //           title: "Asistencia en Ruta",
  //           text: "Contamos con soporte 24/7 para ayudarte en cualquier momento que lo necesites.",
  //         },
  //       },
  //       {
  //         id: "slide-3",
  //         data: {
  //           image: "/images/sliderinfo/service-3.png",
  //           title: "Garantía Extendida",
  //           text: "Protege tu inversión con planes de garantía pensados para darte tranquilidad.",
  //         },
  //       },
  //     ],
  //   },
  // },

  // add here slider of the Recogida y reciclaje de baterías

  // add here section with title , paragraph and image  : Ampliación de la vida útil de las piezas del vehículo
];

export default function GestionBosque() {
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
