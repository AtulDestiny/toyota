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
          videoUrl: "/videos/safety-sense-interna5.mp4",
          title: "Sistema de alerta de cambio de carril (LDA)*",
          description: "",
        },
        // {
        //   imageMobile: "/images/Captura de pantalla-break-assist.png",
        //   imageDesktop: "/images/Captura de pantalla-break-assist.png",
        //   title: "Sistema de alerta de cambio de carril (LDA)*",
        // },
        // {
        //   imageMobile: "/images/Captura de pantalla-break-assist.png",
        //   imageDesktop: "/images/Captura de pantalla-break-assist.png",
        //   title: "Sistema de alerta de cambio de carril (LDA)*",
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
        text: `Sistema de alerta de cambio de carril (LDA)*`,
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
        text: `Evita cambios involuntarios de carril`,
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
        text: `La cámara monocular puede detectar las líneas blancas o amarillas del camino y notificar al conductor si el vehículo comienza a desviarse del carril en el que se encuentra. Si esto ocurre, el sistema alertaría al conductor y, según el modelo, podría realizar una pequeña corrección en la trayectoria.`,
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
      title: "Información adicional sobre LDA",
      items: [
        {
          image: {},
          title: "",
          description: {
            intro:
              "En caso de cambiar de carril sin la activación de las direccionales, el sistema emitiría una alerta sonora y visual en la pantalla del tablero de instrumentos. Después de la alerta, según el modelo, el sistema podrá corregir la trayectoria para ayudar a regresar al carril.",
            list: [],
          },
        },
        {
          image: {},
          title: "",
          description: {
            intro:
              "Cuenta con una función que podría detectar cuando el vehículo se conduce de forma errática o comienza a zigzaguear dentro del carril de un lado a otro. En este caso, el sistema enviaría una alerta acústica y mostraría un ícono alertando de la situación.",
            list: [],
          },
        },
        {
          image: {},
          title: "",
          description: {
            intro:
              "Según el modelo y/o versión y si el vehículo cuenta con el equipamiento, el sistema incorpora el “asistente de mantenimiento de carril”. Un sistema complementario al anteriormente mencionado que esta diseñado para ayudar al conductor a permanecer en el carril deseado cuando el control de velocidad crucero adaptativo está activo y ambas manos están en el volante.",
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
                  "El sistema de Sistema de alerta de cambio de carril (LDA)* podría no funcionar de manera óptima si:",
                  "- Cuando conduces por una vía que comienza a bifurcarse o fusionarse.",
                  "- Si transitas por caminos con curvas cerradas o con ondulaciones.",
                  "- Cuando las líneas del carril no están claramente marcadas.",
                  "- Si la superficie de la vía genera espejismos.",
                  "- Cuando la cámara recibe demasiada luz, como la de los faros de vehículos en sentido contrario, el sol o reflejos de otros carros.",
                  "- Cuando la intensidad de la luz cambia drásticamente, como al salir de un túnel.",
                  "- Si el parabrisas está empañado.",
                  "- Cuando la distancia con el vehículo de adelante es muy corta y no se alcanzan a percibir las líneas del camino.",
                  "- En el caso del asistente de mantenimiento de carril, si las líneas no se perciben en la vía o en curvas muy pronunciadas.",
                  "- Cuando el ancho del carril es inferior a 3 metros.",
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
