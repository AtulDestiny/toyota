"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import { View, useBreakpointValue } from "@aws-amplify/ui-react";
import { color } from "framer-motion";

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
          imageMobile: "/images/comunidad-wayuu-nobile-banner.png",
          imageDesktop: "/images/comunidad-wayuu-desktop-banner.png",
          title: "",
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
      title: {
        text: "Beyond Zero",
        fontSize: { base: "14px", xl: "14px" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        color: "#000000",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: { base: "19.6px", xl: "140%" },
        textAlign: { base: "left", xl: "center" },
        padding: {
          base: "48px 15px 0px",
          medium: "48px 15px 0px",
          xl: "93px 15px 0px",
        },
        letterSpacing: "0%",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Movilidad Sostenible",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        color: "#000000",
        lineHeight: { base: "110%", xl: "110.00000000000001%" },
        textAlign: { base: "left", xl: "center" },
        padding: { base: "10px 15px 30px", xl: "0 0 72px" },
        letterSpacing: "-2%",
        verticalAlign: "middle",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "¡En Toyota ya vivimos la movilidad sostenible! Te explicamos de qué se trata y como la promovemos, con nuestros vehículos y en nuestra filosofía.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        color: "#000000",
        maxWidth: {
          xl: "1220px",
        },
        minHeight: {
          xl: "124px",
        },
        height: "124px",
        lineHeight: "130%",
        letterSpacing: "0%",
        textAlign: { base: "left", xl: "center" },
        margin: { base: "32px 16px 30px 15px", xl: "0  0px 25px" },
        display: {
          xl: "block",
          base: "none",
        },
      },
    },
  },

  {
    component: "VideoPlayer",
    props: {
      videoSrc: "https://www.youtube.com/embed/2DO4HXhb5RI?autoplay=0",
      isYoutube: true,
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "En Toyota creemos que la movilidad debe ser para todos, por eso cambiamos la vida de decenas de perritos con discapacidad, dándoles una segunda oportunidad para moverse por más caminos, donando sillas de ruedas cero kilómetros en acompañamiento de Nucleumpet, el cual se encarga de proporcionar los dispositivos de movilidad a varios peluditos.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        color: "#000000",
        maxWidth: {
          xl: "1220px",
        },
        minHeight: {
          xl: "124px",
        },
        height: "124px",
        lineHeight: "130%",
        letterSpacing: "0%",
        textAlign: { base: "left", xl: "center" },
        margin: { base: "32px 16px 30px 15px", xl: "73px  0px 72px" },
        display: {
          xl: "none",
          base: "block",
        },
      },
    },
  },
  // {
  //   component: "ThreeImageGallery",
  //   props: {
  //     images: [
  //       {
  //         url: "/images/blur.svg",
  //         altText: "nigh red ligh on door",
  //       },
  //       {
  //         url: "/images/blur2.svg",
  //         altText: "nigh red ligh on door",
  //       },
  //       {
  //         url: "/images/blur3.svg",
  //         altText: "nigh red ligh on door",
  //       },
  //     ],
  //   },
  // },
  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "",
  //       display: {
  //         xl: "none",
  //         base: "none",
  //       },
  //     },
  //   },
  // },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "La movilidad sostenible es una realidad en Toyota. Te mostramos cómo nuestros automóviles y valores</br/> corporativos contribuyen a un entorno más limpio y seguro.",
        fontSize: { base: "26px", xl: "26px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        // height: "37px",
        fontWeight: "700",
        lineHeight: "130%",
        textAlign: { base: "left", xl: "center" },
        color: "#00000",
        margin: { base: "10px 15px 0px", xl: "10px 0 0 0" },
        letterSpacing: "0%",
        verticalAlign: "center",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "En Toyota, entendemos que la movilidad sostenible transforma nuestro futuro, creando una sociedad más eficiente y ecológica. ¡Muévete con nosotros!",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        letterSpacing: "0%",
        color: "#000000",
        maxWidth: {
          xl: "1220px",
        },
        maxHeight: {
          xl: "124px",
        },
        minWidth: {
          xxl: "1220px",
        },
        lineHeight: "130%",
        textAlign: { base: "left", xl: "center" },
        paddingTop: "32px",
        margin: { base: "32px 16px 40px 15px", xl: "0  0px 164px" },
      },
    },
  },

  {
    component: "VideoPlayer",
    props: {
      videoSrc: "https://www.youtube.com/embed/tS1E6HPi_9o?autoplay=0",
      isYoutube: true,
    },
  },

  // Update the SliderInfo component to accept dynamic props
  // {
  //   component: "PreventiveCampaignsServicesSlider",
  //   props: {
  //     title: "Un paso a la vez",
  //     items: [
  //       {
  //         image: {
  //           src: "/images/wheels_with_object.png",
  //           alt: "VIN",
  //           width: { base: "100%", xl: "600px" },
  //           height: { base: "auto", xl: "455px" },
  //           padding: { base: "0", xl: "0" },
  //         },
  //         title: "Diseño y medida",
  //         description: {
  //           intro:
  //             "El primer paso en la producción de sillas de ruedas para perros es el diseño y la toma de medidas generales que se adaptan a la mayoría de los perros. Se debe asegurar que la silla de ruedas sea ajustable para adaptarse a diferentes tamaños y razas de perros.",
  //           list: [],
  //         },
  //       },
  //       {
  //         image: {
  //           src: "/images/wheels_with_object.png",
  //           alt: "VIN",
  //           width: { base: "100%", xl: "600px" },
  //           height: { base: "auto", xl: "455px" },
  //           padding: { base: "0", xl: "0" },
  //         },
  //         title: "Diseño y medida",
  //         description: {
  //           intro:
  //             "El primer paso en la producción de sillas de ruedas para perros es el diseño y la toma de medidas generales que se adaptan a la mayoría de los perros. Se debe asegurar que la silla de ruedas sea ajustable para adaptarse a diferentes tamaños y razas de perros.",
  //           list: [],
  //         },
  //       },
  //     ],
  //     backgroundColor: "#2A5B59",
  //     isPagination: false,
  //     subText: "Proceso de Fabricación",
  //   },
  // },
  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "Nucleum Pet",
  //       fontSize: { base: "14px", xl: "18px" },
  //       fontFamily: {
  //         base: "var(--font-ToyotaType-Regular)",
  //         medium: "var(--font-toyotaDisplay)",
  //         xl: "var(--font-toyotaDisplay)",
  //       },
  //       color: "#000000",
  //       fontStyle: "normal",
  //       fontWeight: "400",
  //       lineHeight: { base: "19.6px", xl: "100%" },
  //       textAlign: { base: "left", xl: "center" },
  //       padding: {
  //         base: "62px 15px 0px",
  //         medium: "48px 15px 0px",
  //         xl: "120px 15px 0px",
  //       },
  //       letterSpacing: "0%",
  //     },
  //   },
  // },
  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "Testimonios",
  //       fontSize: { base: "32px", xl: "56px" },
  //       fontFamily: {
  //         base: "var(--font-toyotaDisplay)",
  //         xl: "var(--font-ToyotaType-Regular)",
  //       },
  //       fontStyle: "normal",
  //       fontWeight: "500",
  //       color: "#000000",
  //       lineHeight: { base: "61.6px", xl: "110.00000000000001%" },
  //       textAlign: { base: "left", xl: "center" },
  //       padding: { base: "0 15px 0px", xl: "0" },
  //       letterSpacing: "-2%",
  //     },
  //   },
  // },
  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     title: {
  //       text: "Descubre cómo las sillas de ruedas para perros han cambiado la vida de estos peludos amigos y sus dueños. Lee los testimonios conmovedores que muestran cómo esta ayuda de movilidad les ha devuelto la alegría de caminar juntos",
  //       fontSize: { base: "16px", xl: "22px" },
  //       fontFamily: "var(--font-ToyotaType-Regular)",
  //       fontStyle: "normal",
  //       fontWeight: "400",
  //       color: "#000000",
  //       maxWidth: {
  //         xl: "1220px",
  //       },
  //       minHeight: {
  //         xl: "max-content",
  //       },
  //       height: "max-content",
  //       lineHeight: "100%",
  //       letterSpacing: "0%",
  //       textAlign: { base: "left", xl: "center" },
  //       margin: { base: "0 15px", xl: "32px  0px 0px" },
  //     },
  //   },
  // },
  // {
  //   component: "HybridMythsCarousel",
  //   props: {
  //     header: "",
  //     subHeader: "",
  //     subDescription: "",
  //     paddingTop: "0",
  //     paddingContainer: {
  //       base: "0",
  //       xl: "0",
  //     },
  //   },
  // },
];

export default function MovilidadSostenible() {
  const isMobile = useBreakpointValue({ base: true, xl: false });

  // Create a new array where we'll reorder components for different screen sizes
  const components = [];

  // Add all components except text and video player
  for (let i = 0; i < pageData.length; i++) {
    if (i !== 3 && i !== 4) {
      // Skip text and video components
      components.push(
        <React.Fragment key={i}>{renderComponent(pageData[i])}</React.Fragment>
      );
    }

    // Insert our responsive section after the third component
    if (i === 2) {
      components.push(
        <React.Fragment key="responsive-section">
          {isMobile ? (
            <>
              {renderComponent(pageData[4])} {/* Video component */}
              {renderComponent(pageData[3])} {/* Text component */}
            </>
          ) : (
            <>
              {renderComponent(pageData[3])} {/* Text component */}
              {renderComponent(pageData[4])} {/* Video component */}
            </>
          )}
        </React.Fragment>
      );
    }
  }

  return <div>{components}</div>;
}
