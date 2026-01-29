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
          videoUrl: "/videos/safety-sense-interna2.mp4",
          title: "Asistente de seguimiento de carril (LTA)*",
          description: "",
        },
        // {
        //   imageMobile: "/images/Captura de pantalla-break-assist.png",
        //   imageDesktop: "/images/Captura de pantalla-break-assist.png",
        //   title: "Asistente de seguimiento de carril (LTA)*",
        // },
        // {
        //   imageMobile: "/images/Captura de pantalla-break-assist.png",
        //   imageDesktop: "/images/Captura de pantalla-break-assist.png",
        //   title: "Asistente de seguimiento de carril (LTA)*",
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
        text: `Asistente de seguimiento de carril (LTA)*`,
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
        text: `Tu vehículo se mantendrá centrado en el carril por donde circula.`,
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
        text: `A través de la integración de varias tecnologías, este sistema podrá detectar las líneas de carril y el vehículo que va en frente para realizar pequeños ajustes en la dirección, manteniendo el vehículo centrado.`,
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
      title: "Información adicional sobre LTA",
      items: [
        {
          image: {},
          title: "",
          description: {
            intro:
              "Utiliza una cámara frontal para detectar las líneas de carril y radar de hondas milimétricas para seguir la trayectoria del vehículo que va en frente.",
            list: [],
          },
        },
        {
          image: {},
          title: "",
          description: {
            intro:
              "Cuando las líneas de carril son visibles, el sistema puede hacer pequeños ajustes en la dirección para mantener el vehículo en el centro del carril.",
            list: [],
          },
        },
        {
          image: {},
          title: "",
          description: {
            intro:
              "Si la distancia al vehículo que va en frente no permite identificar las líneas, el sistema se guiará a partir de la trayectoría de este vehículo.",
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
                  "El Asistente de seguimiento de carril (LTA)* podría no funcionar de manera óptima si:",
                  "- Cuando el vehículo circula sobre una vía resbalosa debido a lluvia, nieve, hielo u otras condiciones climáticas.",
                  "- Cuando el vehículo transita por una carretera cubierta de nieve, tierra o algún otro material particulado.",
                  "- Cuando las líneas blancas (o amarillas) son difíciles de ver debido a lluvia, nieve, niebla, polvo u otros factores.",
                  "- Se presentan marcas de reparación de asfalto, líneas blancas (amarillas), etc., debido a la reparación de la carretera.",
                  "- Al costado de la carretera hay objetos o patrones que podrían confundirse con líneas blancas (amarillas) (barandillas, postes reflectantes, etc.).",
                  "- Cuando se usa una llanta de repuesto, cadenas para nieve u otros accesorios similares.",
                  "- Cuando las llantas están demasiado desgastadas o la presión de inflado es baja.",
                  "- El vehículo circula por una zona sin líneas blancas (amarillas), como por ejemplo delante de un peaje o un puesto de control, o en una intersección, etc.",
                  "- Si se circula por vías no asfaltadas, demarcadas y/o en mal estado.",
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
