"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import BulletListInfo from "../toyota-safety-sense-interma/ListInfo";

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
          videoUrl: "/videos/safety-sense-interna1.mp4",
          title: "Sistema de las luces altas adaptativas (AHS)*",
          description: "",
        },
        // {
        //   imageMobile: "/images/Captura de pantalla-break-assist.png",
        //   imageDesktop: "/images/Captura de pantalla-break-assist.png",
        //   title: "Sistema de las luces altas adaptativas (AHS)*",
        // },
        // {
        //   imageMobile: "/images/Captura de pantalla-break-assist.png",
        //   imageDesktop: "/images/Captura de pantalla-break-assist.png",
        //   title: "Sistema de las luces altas adaptativas (AHS)*",
        // },
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

  // make PreventiveCampaignsServicesBanner component to accept dynamic props
  // {
  //   component: "PreventiveCampaignsServicesBanner",
  //   props: {
  //     slides: [
  //       {
  //         imageMobile: "/images/Captura de pantalla.png",
  //         imageDesktop: "/images/Captura de pantalla.png",
  //         title: "Toyota Safety Sense",

  //       },
  //       // ... more slides
  //     ],
  //   },
  // },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Sistema de las luces altas adaptativas (AHS)*`,
        fontSize: {
          base: "14px",
          medium: "14px",
          xl: "14px",
        },
        lineHeight: {
          base: "19.6px",
          medium: "normal",
          xl: "19.6px",
        },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        padding: {
          base: " 0px 16px 0px 15px",
          medium: "",
          xl: "",
        },
        margin: {
          base: "35px 0 0px 0",
          medium: "",
          xl: "124px 0px 13px",
        },
        color: "",
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
        text: `La mejor visibilidad posible para todos los usuarios de la vía.`,
        fontSize: {
          base: "56px",
          medium: "26px",
          xl: "56px",
        },
        lineHeight: {
          base: "61.6px",
          medium: "normal",
          xl: "61.6px",
        },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: {
          base: "400",
          medium: "400",
          xl: "400",
        },
        fontStyle: "normal",
        textAlign: {
          base: "left",
          medium: "center",
          xl: "center",
        },
        padding: {
          base: "",
          medium: "",
          xl: "",
        },
        letterSpacing: {
          base: "-1.12px",
          medium: "",
          xl: "-1.12px",
        },
        margin: {
          base: "15px 16px 0px 16px",
          medium: "",
          xl: "0 auto",
        },

        color: "",
      },
      description: {
        text: `Optimiza automáticamente la distribución de los faros, sombreando la zona con tráfico en sentido contrario, para que las luces altas no deslumbren a otros conductores y, al mismo tiempo, proporcionen suficiente luz para transitar con tranquilidad.`,
        fontSize: { base: "18px", medium: "12px", xl: "22px" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        width: {
          base: "",
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
          xl: "center",
        },
        lineHeight: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        // padding: "38px 16px 0",
        margin: {
          base: "37px 0 48px 0",
          medium: "",
          xl: "0 auto 87px",
        },

        padding: {
          base: "0 16px 0px 16px",
          medium: "",
          xl: "56px 201px",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: "center",
        width: {
          base: "",
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

  // Update Slider to accept dynamic props : Cuando el sistema detecta un
  {
    component: "PreventiveCampaignsServicesSlider",
    props: {
      title: "Información adicional sobre AHS",
      items: [
        {
          image: {},
          title: "",
          description: {
            intro:
              "Detecta vehículos que circulan delante o en sentido contrario, ajusta automáticamente la distribución de los faros para no iluminarlos directamente con las luces altas.",
            list: [],
          },
        },
        {
          image: {},
          title: "",
          description: {
            intro:
              "A altas velocidades, ilumina una zona más estrecha para enfocarse en la profundidad y mejorar la visibilidad en la distancia.",
            list: [],
          },
        },
        {
          image: {},
          title: "",
          description: {
            intro:
              "A bajas velocidades, la iluminicación se amplía horizontalmente teniendo en cuenta el campo de visión.",
            list: [],
          },
        },
        // ... more items
      ],
    },
  },

  {
    component: "ToyotaWorld",
    props: {
      items: [
        {
          label: "Precauciones",
          value: "Precauciones",
          content: (
            <>
              <BulletListInfo
                items={[
                  "El Sistema de las luces altas adaptativas (AHS)* podría no funcionar de manera óptima si:",
                  "- Cuando el parabrisas refleja algún objeto en el tablero como: celulares, papeles, basura, etc.",
                  "- Si un vehículo circula sin luces, luces de colores no convencionales, faros sucios, faros desviados o irregulares, luces tenues.",
                  "- Si los faros originales del vehículo son modificados.",
                  "- Si las luces del entorno o de los vehículos que circulan delante o en sentido contrario no tienen iluminación constante.",
                  "- Cuando un vehículo se cruza inesperadamente delante de su vehículo.",
                  "- Cuando se detectan reiteradamente vehículos delante del suyo y después quedan ocultos por la sucesión de varias curvas, elementos divisorios de la calzada o árboles a los lados de la carretera",
                  "- Cuando un vehículo que lo precede está muy lejos.",
                  "- Cuando un vehículo que lo precede no lleva ninguna luz encendida.",
                  "- Cuando un vehículo que lo precede refleja una luz intensa, como los faros de su vehículo.",
                ]}
              />
            </>
          ),
        },
        {
          label: "Importante",
          value: "Importante",
          content: (
            <>
              <BulletListInfo
                items={[
                  "Estas son algunas de las condiciones que pueden causar el funcionamiento incorrecto, parcial o total del Toyota Safety Sense:",
                  "- En momentos de poca visibilidad debido a condiciones climáticas adversas como lluvia, nieve, polvo, tormenta de arena, humo, vapor, niebla, granizo, barro, etc.",
                  "- Cuando los sensores están sucios o bloqueados por gotas de lluvia, nieve, hielo, hojas, calcomanías, basura, barro, etc.",
                  "- Cuando los neumáticos tienen una alineación incorrecta, son de un tamaño no recomendado, tienen una presión inadecuada o están desgastados excesivamente.",
                  "- Si se remolca una carga que supera el límite especificado.",
                  "- Si el vehículo ha sido modificado o reparado de manera inadecuada.",
                  "- El sistema no detecta peatones.",

                  "Estas son las condiciones que ocasionan la operación incorrecta, parcial o total del “Sistemas de pre-colisión frontal (PCS)*”, “Velocidad crucero adaptativo (ACC)*”, “Sistema de alerta de cambio de carril (LDA)*” y “Luces altas automáticas (AHB)*”:",

                  "Al subir o bajar de una pendiente.",
                  "Al conducir en caminos con mucho transito y en curvas angostas o muy cerradas.",
                ]}
              />
            </>
          ),
        },
      ],
      defaultValue: "Precauciones",
    },
  },

  //add here tabs components : tab 1 :  Precauciones , tab2 :Importante

  //Update SliderSection component to accept dynamic props and Update Slider props to match data with figma design : Cuando el sistema detecta un:  Slider Conoce más Características de Toyota Safety Sense to
  // {
  //   component: "SliderSection",
  //   props: {
  //     theme: "#000", // or "light" depending on your design
  //     color: "#fff",
  //     title: "Conoce más Características de Toyota Safety Sense",
  //     // description:
  //     //   "Explore our efforts to promote diversity, equity, and inclusion through powerful community-driven projects.",
  //     items: [
  //       {
  //         image: {
  //           src: "/images/car_moving_zig_zag.png",
  //           alt: "Breast Cancer Awareness Campaign",
  //         },
  //         title: "Sistema de alerta de cambio de carril (LDA)*",
  //         description:
  //           "El sistema puede detectar las líneas del carril para determinar la posición del vehículo. Si el conductor se desvía involuntariamente de su...",
  //       },
  //       {
  //         image: {
  //           src: "/images/car_moving_zig_zag.png",
  //           alt: "Breast Cancer Awareness Campaign",
  //         },
  //         title: "Sistema de alerta de cambio de carril (LDA)*",
  //         description:
  //           "El sistema puede detectar las líneas del carril para determinar la posición del vehículo. Si el conductor se desvía involuntariamente de su...",
  //       },
  //       {
  //         image: {
  //           src: "/images/car_moving_zig_zag.png",
  //           alt: "Breast Cancer Awareness Campaign",
  //         },
  //         title: "Sistema de alerta de cambio de carril (LDA)*",
  //         description:
  //           "El sistema puede detectar las líneas del carril para determinar la posición del vehículo. Si el conductor se desvía involuntariamente de su...",
  //       },
  //     ],
  //   },
  // },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      description: {
        text: `* Toyota Safety Sense, integra diferentes sistemas de seguridad activa que pueden variar según cada modelo y/o versión. A su vez, estos sistemas están diseñados para asistir al conductor, no para sustituirlo. El conductor debe mantener en todo momento el control de su vehículo y es responsable de su conducción, por cuanto este sistema no remplaza la conducción segura. El correcto funcionamiento del Toyota Safety Sense depende de muchos factores incluyendo las condiciones del camino, el clima y el vehículo, razón por la cual el/los sistemas podrán verse afectados u obstaculizados debido a factores externos, no siendo Automotores Toyota Colombia S.A.S. responsable de las consecuencias derivadas del uso del sistema. Para más información sobre Toyota Safety Sense, su funcionamiento y sus limitaciones, dirigirse a la web https://www.toyota.com.co y/o consulte el manual de usuario.`,
        fontSize: { base: "9px", medium: "12px", xl: "12px" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        width: {
          base: "",
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
          xl: "center",
        },
        lineHeight: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        // padding: "38px 16px 0",
        padding: {
          base: "0 16px 0px 16px",
          medium: "10px 0px 0px 0px",
          xl: "0px 250px",
        },
        margin: {
          base: "22.01px 0 22px 0",
          medium: "",
          xl: "72px auto 112px",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: "center",
        width: {
          base: "",
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
