"use client";
import React from "react";
import { View } from "@aws-amplify/ui-react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

const pageData: ComponentData[] = [
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Hace más de 60 años, la historia de Toyota se remonta en los deportes automovilísticos",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-decimaMonoPro)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "50%",
        },
        lineHeight: "150%",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "72px 62px 58px", xl: "73px  0px 44px" },
        color: "#fff",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/TGR/historia/captura-car.png",
        alt: "toyota-servicios-conectados",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "0 0 67px", xl: "45px 15px 0px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Sus principales éxitos se obtuvieron en las condiciones más extremas que sirvieron como un gran desafío para construir los vehículos del futuro, brindando oportunidades de crecimiento para la marca y para las personas que día a día construyen, mantieneny conducen Toyota.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-decimaMonoPro)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "50%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "0px 30px 20px 30px", xl: "66px  0px 50px" },
        color: "#fff",
      },
    },
  },
  {
    component: "ToyotaHistoryTimeline",
    props: {
      title: "Historia",
      subtitle: "Toyota en Colombia",
      bgColor: "#000000", // Dark background
      textColor: "#ffffff", // White text
      accentColor: "#c8312b", // Toyota red color for accents
      // Period data
      periodStartYear: "1957",
      periodEndYear: "1986",
      periodSummary:
        "La historia del Motorsport para Toyota comienza en un rally",
      periodIcon: "/images/stearing.svg", // Replace with trophy icon path
      // Timeline items
      items: [
        {
          year: "1957",
          title: "Mobilgas Rally",
          icon: "/images/building-icon.svg", // Replace with your actual icon path
          description:
            "Toyota participa en su primer rally en el extranjero, poniendo su nombre y reputación en juego con el modelo Toyopet Crown RSD en el “rally más agotador del mundo”. Una carrera de 17.000 Km. durante 19 días tan dura, que 50 de los 102 vehículos no llegaron, pero el modelo Crown logró llegar hasta el final.",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/1957-tgr-item.jpg", // Replace with your actual image path
              alt: "Distribuidora Toyota Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
        {
          year: "1973",
          title: "Primer torneo WRC",
          icon: "/images/rally.svg", // Replace with your actual icon path
          description:
            "Toyota participó en el primer año de torneo del WRC con el modelo Celica TA22",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/1973-tgr-item.jpg", // Replace with your actual image path
              alt: "Toyota ensamblados en Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
      ],
      titleStyle: {
        fontSize: { base: "1rem", md: "1.125rem", xl: "1.25rem" },
        fontWeight: { base: "400" },
        marginBottom: { base: "0.5rem", xl: "0.75rem" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
      },
      subtitleStyle: {
        fontSize: { base: "2rem", md: "2.5rem", xl: "3rem" },
        fontWeight: { base: "600" },
        marginBottom: { base: "2rem", xl: "3rem" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
      },
      itemStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "400" },
      },
      yearStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "600" },
      },
      containerStyle: {
        padding: { base: "0 1rem", md: "0 2rem", xl: "0 3rem" },
      },
    },
  },
  {
    component: "ToyotaHistoryTimeline",
    props: {
      title: "Historia",
      subtitle: "Toyota en Colombia",
      bgColor: "#000000", // Dark background
      textColor: "#ffffff", // White text
      accentColor: "#c8312b", // Toyota red color for accents
      // Period data
      periodStartYear: "1990",
      periodEndYear: "1999",
      periodSummary:
        "En la cima del WRC: En los 90’s, Toyota alcanzó una gran racha ganadora",
      periodIcon: "/images/cup.svg", // Replace with trophy icon path
      // Timeline items
      items: [
        {
          year: "1990",
          title: "Mobilgas Rally",
          icon: "/images/building-icon.svg", // Replace with your actual icon path
          description:
            "El corredor Carlos Sainz, se coronó campeón del WRC con el modelo Celica GT-FOUR ST165, convirtiéndose en el primer título en competición.",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/1990-tgr-item.jpg", // Replace with your actual image path
              alt: "Distribuidora Toyota Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
        {
          year: "1993",
          title: "Toyota gana el WRC",
          icon: "/images/rally.svg", // Replace with your actual icon path
          description:
            "Toyota gana el WRC por segunda vez gracias al corredor Juha Kankkunen.",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/1993-tgr-item.jpg", // Replace with your actual image path
              alt: "Toyota ensamblados en Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
        {
          year: "1994",
          title: "",
          icon: "/images/rally.svg", // Replace with your actual icon path
          description:
            "Toyota se corona por tercera vez en la WRC con el corredor Didier Auriol.",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/1994-tgr-item.jpg", // Replace with your actual image path
              alt: "Toyota ensamblados en Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
        {
          year: "1999",
          title: "",
          icon: "/images/rally.svg", // Replace with your actual icon path
          description: "Toyota vuelve a coronarse campeón del WRC.",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/1999-tgr-item.jpg", // Replace with your actual image path
              alt: "Toyota ensamblados en Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
      ],
      titleStyle: {
        fontSize: { base: "1rem", md: "1.125rem", xl: "1.25rem" },
        fontWeight: { base: "400" },
        marginBottom: { base: "0.5rem", xl: "0.75rem" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
      },
      subtitleStyle: {
        fontSize: { base: "2rem", md: "2.5rem", xl: "3rem" },
        fontWeight: { base: "600" },
        marginBottom: { base: "2rem", xl: "3rem" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
      },
      itemStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "400" },
      },
      yearStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "600" },
      },
      containerStyle: {
        padding: { base: "0 1rem", md: "0 2rem", xl: "0 3rem" },
      },
    },
  },
  {
    component: "ToyotaHistoryTimeline",
    props: {
      title: "Historia",
      subtitle: "Toyota en Colombia",
      bgColor: "#000000", // Dark background
      textColor: "#ffffff", // White text
      accentColor: "#c8312b", // Toyota red color for accents
      // Period data
      periodStartYear: "2000",
      periodEndYear: "2018",
      periodSummary: "Toyota regresa al campeonato WRC.",
      periodIcon: "/images/cup.svg", // Replace with trophy icon path
      // Timeline items
      items: [
        {
          year: "2017",
          title: "Mobilgas Rally",
          icon: "/images/building-icon.svg", // Replace with your actual icon path
          description:
            "Toyota regresa al campeonato WRC.",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/2017-tgr-item.jpg", // Replace with your actual image path
              alt: "Distribuidora Toyota Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
        {
          year: "2018",
          title: "Toyota gana el WRC",
          icon: "/images/rally.svg", // Replace with your actual icon path
          description:
            "El modelo Toyota Yaris WRC queda tercero en el campeonato WRC.",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/2018-tgr-item.jpg", // Replace with your actual image path
              alt: "Toyota ensamblados en Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
        
      ],
      titleStyle: {
        fontSize: { base: "1rem", md: "1.125rem", xl: "1.25rem" },
        fontWeight: { base: "400" },
        marginBottom: { base: "0.5rem", xl: "0.75rem" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
      },
      subtitleStyle: {
        fontSize: { base: "2rem", md: "2.5rem", xl: "3rem" },
        fontWeight: { base: "600" },
        marginBottom: { base: "2rem", xl: "3rem" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
      },
      itemStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "400" },
      },
      yearStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "600" },
      },
      containerStyle: {
        padding: { base: "0 1rem", md: "0 2rem", xl: "0 3rem" },
      },
    },
  },
  {
    component: "ToyotaHistoryTimeline",
    props: {
      title: "Historia",
      subtitle: "Toyota en Colombia",
      bgColor: "#000000", // Dark background
      textColor: "#ffffff", // White text
      accentColor: "#c8312b", // Toyota red color for accents
      // Period data
      periodStartYear: "2018",
      periodEndYear: "2021",
      periodSummary:
        "Toyota se coronó tres veces en línea campeón del FIA WEC con el modelo Toyota TS050 Hybrid. (2018-2020) y el modelo Toyota GR010 Hybrid en el año 2021.",
      periodIcon: "/images/cup.svg", // Replace with trophy icon path
      // Timeline items
      items: [
        
        {
          year: "2019",
          title: "",
          icon: "/images/rally.svg", // Replace with your actual icon path
          description:
            "Entra a Colombia el primer modelo Toyota Gazoo Racing, Hilux GR-S.",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/2019-tgr-item.jpg", // Replace with your actual image path
              alt: "Toyota ensamblados en Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
        {
          year: "2022",
          title: "",
          icon: "/images/rally.svg", // Replace with your actual icon path
          description: "Se lanza en mayo la marca Toyota Gazoo Racing al mercado colombiano, con 5 líneas GR-S y el vehículo de alto desempeño para competencia, GR Yaris",
          initiallyExpanded: false,
          images: [
            {
              src: "/images/2022-tgr-item.jpg", // Replace with your actual image path
              alt: "Toyota ensamblados en Colombia",
              width: { base: "100%" },
              height: { base: "auto" },
            },
          ],
        },
      ],
      titleStyle: {
        fontSize: { base: "1rem", md: "1.125rem", xl: "1.25rem" },
        fontWeight: { base: "400" },
        marginBottom: { base: "0.5rem", xl: "0.75rem" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
      },
      subtitleStyle: {
        fontSize: { base: "2rem", md: "2.5rem", xl: "3rem" },
        fontWeight: { base: "600" },
        marginBottom: { base: "2rem", xl: "3rem" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
      },
      itemStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "400" },
      },
      yearStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "600" },
      },
      containerStyle: {
        padding: { base: "0 1rem", md: "0 2rem", xl: "0 3rem" },
      },
    },
  },
];

export function HistoriaComponent() {
  return (
    <View backgroundColor="#000" width="100%" minHeight="100vh">
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </View>
  );
}
