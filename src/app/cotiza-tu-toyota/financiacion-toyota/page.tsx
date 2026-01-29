"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

const pageData: ComponentData[] = [
  {
    component: "MainSlider",
    props: {
      slides: [
        {
          imageMobile: "/images/financiacion/mobile.png",
          imageDesktop: "/images/financiacion/desktop.png",
        },
      ],
      sliderConfig: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        isButton: false,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
        navigation: true,
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Toyota Financial Services Colombia",
        fontSize: { base: "14px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "22px 16px 0px 15px", xl: "114px 0px 0px 0px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "¡La alegría de estrenar <br/> nos motiva todos los días! ",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: { base: "400", xl: "400" },
        lineHeight: "110.00000000000001%",
        textAlign: { base: "start", xl: "center" },
        padding: { base: "20px 25px 25px 20px", xl: "0px 0 70px 0" },
        letterSpacing: "-2px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Te invitamos a conocer un nuevo nivel de financiación:",
        fontSize: { base: "18px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: { base: "400", xl: "400" },
        lineHeight: { base: "190%", xl: " 100%" },
        textAlign: "left",
        padding: { base: "20px 10px 10px 16px", xl: "0px 0 40px 0" },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: `Somos Toyota Financial Services, expertos en crear oportunidades para <br>estrenar Toyota de forma simple, rápida y personalizada.`,
        fontSize: { base: "18px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: { base: "400", xl: "400" },
        lineHeight: { base: "190%", xl: " 130%" },
        textAlign: { base: "left", xl: "center" },
        padding: { base: "20px 10px 10px 16px", xl: "0px 0px 40px 0px" },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "",
        fontSize: { base: "18px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: { base: "400", xl: "400" },
        lineHeight: { base: "190%", xl: " 100%" },
        textAlign: { base: "left", xl: "center" },
        padding: { base: "20px 10px 20px 16px", xl: "0px 380px 70px 380px" },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "FamilySafetyGrid",
    props: {
      title: `Conoce más en todos los concesionarios </br> Toyota del país.`,
      titleStyle: {
        fontSize: { base: "14px", md: "26px", xl: "26px" },
        fontWeight: { base: "700", xl: "700" },
        paddingTop: { base: "0px", xl: "40px" },
        paddingBottom: { base: "0px", xl: "0px" },
        marginBottom: { base: "20px", xl: "0px" },
        textAlign: { base: "start", medium: "center", xl: "center" },
      },
      description: "www.toyotacredito.com.co",
      descriptionStyle: {
        fontSize: { base: "9px", md: "9px", xl: "12px" },
        lineHeight: { base: "1.4", xl: "1.6" },
        paddingTop: { base: "0px", xl: "0px" },
        paddingBottom: { base: "15px", xl: "65px" },
      },
      image: "/images/laid.svg",
      imageStyle: {
        marginTop: { base: "15px", xl: "40px" },
        height: { base: "auto", xl: "305px" },
        marginBottom: { base: "20px", xl: "40px" },
      },
      buttonStyle: {
        fontSize: { base: "14px", xl: "16px" },
        paddingTop: { base: "8px", xl: "12px" },
        paddingBottom: { base: "8px", xl: "12px" },
        marginBottom: { base: "15px", xl: "0px" },
        fontWeight: { base: "500" },
        position: "relative",
        top: { base: "0px", xl: "-30px" },
      },
      bgColor: "#6b635b",
      icons: [
        "/images/CloudIcon.png",
        "/images/FIreIcon.png",
        "/images/BrightNessIcon.png",
        "/images/DropIcon.png",
      ],
      containerStyle: {
        marginBottom: { base: "0px", xl: "0px" },
      },
      contentStyle: {
        padding: { base: "15px", xl: "0 20px" },
      },
      videoOverlay: false,
      video: "https://www.youtube.com/embed/-cnnbFS3Lg4?si=k1EzvclS6a5DvaPC",
      isYoutube: true,
    },
  },
  {
    component: "CanWeHelpYou",
    props: {
      title: "Explora las soluciones financieras que tenemos para ti",
      subtitle: "Herramientas",
      gap: "10px",
      titleFontSize: { base: "22px", xl: "46px" },
      titlePadding: { base: "1.3rem 0 3rem", xl: "0 0 3rem" },
      showCard3: false,
      backgroundColor: "#000000",
      card1: {
        bannerImg: "/images/Simula-tu-cuota.png",
        bannerAlt: "vehicle-",
        iconImg: "/svgs/financiacion-icon1.svg",
        iconAlt: "",
        text: "Simula tu cuota",
        link: "https://simulador.toyotacredito.com.co:4462/?name=tfsco",
        cardSize: {
          width: 446,
          height: 349,
        },
      },
      card2: {
        bannerImg: "/images/Planes-financieros.png",
        bannerAlt: "vehicle-",
        iconImg: "/svgs/financiacion-icon2.svg",
        iconAlt: "",
        text: "Ver Planes Financieros",
        link: "https://toyotacredito.com.co/planes-financieros",
        cardSize: {
          width: 446,
          height: 349,
        },
      },
    },
  },
];

export default function FinanciacionPage() {
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
