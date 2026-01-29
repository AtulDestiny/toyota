"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import { useRouter } from "next/navigation";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

export default function BlogPage() {
  const router = useRouter();
  // Datos para la página de Blog y Noticias
  const pageData: ComponentData[] = [
    // BlogHeader en lugar de MainSlider
    {
      component: "BlogHeader",
      props: {
        title: `¡Pronto una nueva <br> experiencia Toyota!`,
        showButton:true,
        isTopLogo:false,
        subtitle:
          `Estamos actualizando esta sección <br> para ofrecerte una mejor experiencia con Toyota Colombia.`,
        mainImage: "/images/cabin.svg",
        images: [
          {
            src: "/svgs/web-icon.svg",
            alt: "Web Icon",
            size: { base: "41px", medium: "60px", xl: "60px" },
            position: {
              left: { base: "8%", medium: "15%", xl: "20%" },
              top: { base: "45%", medium: "16%", xl: "18%" },
            },
          },
          {
            src: "/images/hand-land-child.png",
            alt: "Toyota Image 2",
            size: { base: "67px", medium: "60px", xl: "112px" },
            position: {
              left: { base: "10%", medium: "15%", xl: "12%" },
              bottom: { base: "0%", medium: "30%", xl: "28%" },
            },
          },
          {
            src: "/svgs/car-lock-icon.svg",
            alt: "Toyota Image 3",
            size: { base: "41px", medium: "60px", xl: "60px" },
            position: {
              right: { base: "10%", medium: "15%", xl: "23%" },
              top: { base: "20%", medium: "16%", xl: "14%" },
            },
          },
          {
            src: "/images/digital-screen.png",
            alt: "Toyota Image 4",
            size: { base: "50px", medium: "60px", xl: "102px" },
            position: {
              right: { base: "10%", medium: "15%", xl: "16%" },
              bottom: { base: "0%", medium: "26%", xl: "40%" },
            },
          },
        ],
        labels: [
          {
            text: "Nueva era Toyota Colombia",
            position: {
              left: { base: "0%", medium: "8%", xl: "11%" },
              top: { base: "23%", medium: "45%", xl: "40%" },
            },
            light: false,
            style: {
              fontSize: "14px",
              fontFamily: "var(--font-ToyotaType-Regular)",
              fontWeight: "400",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              width: "203.17px",
              height: "29.23px",
              maxWidth:{base:"139px" ,xl:"183px"}
            },
          },
          {
            text: "Innovación en marcha",
            position: {
              right: { base: "20%", medium: "8%", xl: "10%" },
              bottom: { base: "0%", medium: "18%", xl: "25%" },
            },
            light: true,
            style: {
              fontSize: "14px",
              fontFamily: "var(--font-ToyotaType-Regular)",
              fontWeight: "400",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              width: {base:"160px" ,xl:"233.87px"},
              height: "29.23px",
            },
          },
        ],
        titleStyle: {
          fontSize: { base: "32px", medium: "46px", xl: "56px" },
          fontWeight: "400",
          fontFamily: "var(--font-ToyotaType-Regular)",
          textAlign: "center",
          lineHeight: {
            base: "140%",
            medium: "110.00000000000001%",
            xl: "110.00000000000001%",
          },
          margin: { base: ".5rem 0 .75rem", xl: "1rem 0 1.5rem" },
          letterspacing: { base: "0.02em", medium: "-2%", xl: "-2%" },
          maxWidth : {base:"" ,xl:"" ,xxl:""},
          color: "#000",
        },
        subtitleStyle: {
          fontSize: { base: "18px", medium: "22px", xl: "22px" },
          fontWeight: "400",
          fontFamily: "var(--font-ToyotaType-Regular)",
          textAlign: "center",
          lineHeight: { base: "1.5", medium: "100%", xl: "100%" },
          margin: { base: "0 auto", xl: "0 auto 1rem" },
          maxWidth: { base: "315px", xl: "800px" },
          whiteSpace:"normal",
          letterspacing: { base: "0", medium: "0", xl: "0" },

          color: "#333",
        },
        containerStyle: {
          padding: { base: "1rem", xl: "2rem 0" },
          backgroundColor: "#e7edf1",
          width: "100%",
        },
      },
    },
  ];

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
