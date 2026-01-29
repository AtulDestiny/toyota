"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos para la página de Trabaja con Nosotros
const pageData: ComponentData[] = [
  // Banner principal
  {
    component: "MainSlider",
    props: {
      slides: [
        {
          imageMobile: "/images/reserch.svg",
        },
      ],
      sliderConfig: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        isButton: false,
        autoplay: false,
        pagination: {
          clickable: true,
        },
        navigation: false,
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "TRABAJA CON NOSOTROS",
        fontSize: { base: "22px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: { base: "700", xl: "400" },
        lineHeight: "100%",
        textAlign: "left",
        padding: { base: "63px 15px 0px", xl: "114px 0 0" },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Creemos que cuando se comparten buenas ideas, pueden suceder grandes cosas",
        fontSize: { base: "32px", xl: "56px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "400",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "130%",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "22px 16px 0px 15px", xl: "43px 0px 73px 58px" },
      },
    },
  },
  {
    component: "JobFinder",
    props: {
      title: "Conoce las ofertas laborales \n que tenemos para ti",
      subtitle: "que tenemos para ti",
      containerStyle: {
        maxWidth: "1500px",
        margin: "0 auto",
        padding: { base: "1rem", medium: "2rem 2rem 4rem" },
        gap: { base: "1.5rem", medium: "2rem" },
      },
      // Sample jobs data WITH slugs added
      initialJobs: [
        {
          id: "1",
          location: "BOGOTÁ, COLOMBIA",
          title: "Director de Producto",
          publishedDays: 2,
          workType: "Tiempo Completo",
          workModality: "Modalidad de trabajo Híbrida",
          slug: "director-de-producto", // Add slug
        },
        {
          id: "2",
          location: "BOGOTÁ, COLOMBIA",
          title: "Ingeniero en Tecnología de Fabricación Avanzada",
          publishedDays: 2,
          workModality: "Modalidad de trabajo Híbrida",
          slug: "miembro-del-equipo-de-mantenimiento", // Add slug
        },
      ],
    },
  },
];

export default function TrabajaConNosotrosPage() {
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
