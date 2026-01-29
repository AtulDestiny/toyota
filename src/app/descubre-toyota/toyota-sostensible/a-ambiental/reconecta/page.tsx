"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import { text } from "stream/consumers";

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
      isPlayicon: false,
      containerProps: {
        minHeight: "260px",
      },
      slides: [
        {
          imageMobile: "/images/reconecta-mobile-banner.png",
          imageDesktop: "/images/reconecta-banner-desktop.png",
          title: "ReConecta",
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
        text: "Transformamos un bumper averiado en una nueva oportunidad.",
        fontSize: { base: "32px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: { base: "130%", xl: "110%" },
        textAlign: { base: "left", xl: "center" },
        letterSpacing: "-1.12px",
        verticalAlign: "middle",
        maxWidth: { xl: "1220px" },
        padding: {
          base: "89px 15px 0px",
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
        text: `Cada vez que eliges un vehículo Toyota, apuestas por calidad e innovación.
Pero también te sumas a un ciclo de transformación: donde un componente
automotriz tiene una segunda vida... y esa vida se convierte en esperanza.`,
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          base: "90%",
          xl: "800px",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "44px 16px 0px 15px", xl: "45px 0px 10px" },
      },
    },
  },

  {
    component: "VideoPlayer",
    props: {
      videoSrc: "https://www.youtube.com/embed/8Ldv94bd-p8?si=aZZ_rFk-YmjDvmFe", // Correct embed URL
      isYoutube: true,
      containerStyle: {
        padding: { base: "0 16px", xl: "0 0 100px 0" },
        maxWidth: { base: "", xl: "762px" },
        height: { base: "auto", xl: "539px" },
        margin: { base: "0 auto", xl: "0 auto" },
        overflow: "hidden",
      },
    },
  },

  //add here Title , Paragraph  Image section component
  {
    component: "TestimonalCardReconecta",
    props: {
      backgroundColor: "#161B1E",
      title: "Cada bumper cuenta una nueva historia.",
      description: `Lo que alguna vez fue parte de un Toyota, hoy renace como una alcancía con la forma del campero más icónico de Colombia, Toyota FJ Cruiser. Esta pieza única, elaborada 100 % con plástico reciclado, representa mucho más que reciclaje: simboliza transformación y oportunidad.\nCon cada compra, estás apoyando directamente a la Fundación Hogares Bambi, una organización que brinda amor, protección y nuevas posibilidades a niños y niñas en situación de vulnerabilidad.`,
      imageSrc: "/images/Imagem-mascara.png",
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "¿Cómo lo hacemos?",
        fontSize: { base: "26px", xl: "2rem" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "45px 16px 0 15px", xl: "65px 0 0 0" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: `1. Recolectamos bumpers fuera de servicio.<br/>
          2. Clasificamos el material y verificamos su compatibilidad.<br/>
          3. Trituramos y preparamos el plástico para su transformación.<br/>
          4. Inyectamos el material fundido en moldes especiales.<br/>
          5. Validamos la calidad física y mecánica de cada pieza.<br/>
          6. Transformamos el plástico en alcancías con diseño Toyota.<br/><br/>

          Beneficio tangible: Reciclas, educas, aportas al bienestar infantil y te llevas un objeto con propósito.`,
        fontSize: {
          base: "16px",
          xl: "22px",
        },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "30.4px",
        maxWidth: {
          xl: "900px",
        },
        textAlign: {
          base: "left",
          xl: "center",
        },
        padding: {
          base: "34px 16px 0 15px",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/reconecta-02web-2025.png",
        alt: "Toyota Hybrid Car",
        // width: { base: "100%", xl: "100%" },
        maxWidth: {
          base: "94%",
          medium: "761px",
          xl: "761px",
        },
        margin: {
          base: "62px auto 20px",
          medium: "50px auto 50px",
        },
        height: "auto",
        objectFit: "contain",
        display: "flex",
        // padding: { base: "60px 0px 30px", xl: "120px 0px 90px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "¿Por qué esto importa?",
        fontSize: { base: "26px", xl: "2rem" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        textAlign: { base: "left", xl: "center" },
        padding: "20px 16px 0px 15px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: `Economía circular en acción: Convertimos residuos en objetos útiles y significativos.<br/>
• Reducción de impacto ambiental: Revalorizamos el plástico automotriz.<br/>
• Empoderamiento social: Hogares Bambi acompaña a más de 200 niños/as al año en Bogotá.<br/>
• Conexión emocional: No compras una alcancía, participas en una historia de transformación.`,
        fontSize: {
          base: "16px",
          xl: "22px",
        },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "30.4px",
        maxWidth: {
          xl: "80%",
        },
        textAlign: {
          base: "left",
          xl: "center",
        },
        padding: {
          base: "34px 16px 0 15px",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Tu compra = Donación directa a Hogares Bambi.",
        fontSize: { base: "32px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "110%",
        textAlign: {
          base: "left",
          xl: "center",
        },
        letterSpacing: "-1.12px",
        verticalAlign: "middle",
        padding: {
          base: "48px 15px 0px",
          medium: "48px 15px 0px",
          xl: "60px 15px 0px",
        },
      },
    },
  },

  {
    component: "QuoteBlockReconecta",
    props: {
      author: "Nuestro compromiso contigo",
      quote: `• Calidad Toyota: Diseño fiel al campero icónico, con funcionalidad de alcancía.
• Impacto real: Tu aporte apoya programas integrales de Hogares Bambi en nutrición, pedagogía y fortalecimiento familiar.
Compra tu alcancía hoy y sé parte de la generación que impulsa la economía circular con corazón.`,
      backgroundImage: "/images/reconecta-04web-2025.png",
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "¿Cómo participar?",
        fontSize: { base: "26px", xl: "2rem" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "20px 16px 0px 15px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: `•  Elige tu color favorito: Campero FJ Toyota, en versión alcancía.<br/>
          •  Compra en nuestra Boutique: Tu donación se genera automáticamente.<br/>
          •  Recíclalo, úsalo, compártelo: Llévalo a tu hogar u oficina y cuenta su historia.<br/>
          •  Sé embajador: Difunde el proyecto con el hashtag #ReConecta.`,
        fontSize: {
          base: "16px",
          xl: "22px",
        },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "30.4px",
        maxWidth: {
          xl: "880px",
        },
        textAlign: {
          base: "left",
          xl: "center",
        },
        margin: {
          base: "0 0 0",
          xl: "0 auto",
        },
        padding: {
          base: "34px 16px 0 15px",
          xl: "20px 16px 50px 15px",
        },
      },
    },
  },

  // CertificateRequest
  {
    component: "CertificateRequest",
  },

  //add here video player Component
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Inspiración que transforma",
        fontSize: {
          base: "26px",
          medium: "32px",
          xl: "26px",
        },
        lineHeight: {
          base: "normal",
          medium: "61.6px",
          xl: "100%",
          xxl: "100%",
        },
        letterSpacing: {
          base: "",
          medium: "",
          xl: "0px",
          xxl: "0px",
        },
        fontFamily: {
          base: "var(--font-toyotaType-Bold)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontWeight: {
          base: "700",
          medium: "400",
          xl: "700",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        textAlign: "left",
        margin: {
          base: "41px 0 0",
          xl: "75px 0 0",
        },
        flex: {
          base: "",
          medium: "",
          xl: "auto",
        },
      },
      description: {
        text: `•  La sostenibilidad no es solo técnica: es humana, circular y generosa. Al reciclar bumpers , evitamos toneladas de residuos y promovemos innovación sostenible en el sector automotor. \n\n •  Cada alcancía tiene un impacto social real. La donación apoya a niños, niñas y familias —especialmente mujeres—  en condición de vulnerabilidad, brindando nutrición, educación y bienestar. \n\n •  Nuestro propósito: generar una transformación social duradera que garantice espacios de protección y desarrollo para la primera infancia.`,
        fontSize: { base: "16px", medium: "12px", xl: "22px" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        fontWeight: {
          base: "500",
          medium: "500",
          xl: "500",
        },
        alignSelf: {
          base: "",
          medium: "",
          xl: "strech",
        },
        textAlign: "left",
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        // padding: "38px 16px 0",
        margin: {
          base: "34px 0 44px",
          medium: "auto",
          large: "0",
        },
        width: {
          base: "",
          medium: "",
          large: "unset",
        },
        maxWidth: "755px",
      },
      image: {
        alignSelf: "center",
        src: "/images/reconecta-03web-2025.png",
        alt: "car interior",
        width: { base: "100%", xl: "687px" },
        height: "auto",
        objectFit: "fill",
        padding: {
          base: "0",
          medium: "0px 0px 0px 0px",
          xl: "0px 0px 0px 0px",
        },
        margin: {
          base: "62px auto 20px",
          large: "auto 0",
        },
        borderRadius: {
          base: "",
          medium: "",
          xl: "8px",
        },
        color: "red",
        minWidth: {
          base: "",
          medium: "",
          xl: "687px",
        },
        gap: { base: "20px", xl: "0px", xxl: "0px" },
      },

      viewstyle: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        width: "min(1560px, 100%)",
        justifyContent: "center",
        padding: "0 1rem",
        margin: "0 auto",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `Tu acción, por pequeña que parezca, ayuda a que la economía sea circular y el impacto, humano.`,
        fontSize: {
          base: "32px",
          medium: "32px",
          xl: "56px",
        },
        color: "#000",

        lineHeight: {
          base: "110%",
          medium: " 110%",
          xl: " 110%",
          xxl: " 110%",
        },
        letterSpacing: {
          base: "-1.12px",
          medium: "",
          xl: "-1.12px",
        },
        maxWidth: {
          base: "100%",
          medium: "calc(100% - 80px)",
          xl: "28ch",
        },

        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
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
          base: "0 12px",
        },
        margin: {
          base: "0 auto 0px",
          xl: "40px 0px 0px",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",

      image: {
        src: "/images/reconnecta-img1.png",
        alt: "Tu acción, por pequeña que parezca, ayuda a que la economía sea circular y el impacto, humano.",
        width: { base: "100%", xl: "100%" },
        maxWidth: {
          base: "348px",
          medium: "771px",
          xl: "771px",
        },
        margin: {
          base: "48px auto",
          medium: "72px auto",
        },
        height: "auto",
        objectFit: "contain",
        display: "flex",
      },
      description: {
        text: `Imagina que ese pequeño Toyota FJ Cruiser de plástico en tu escritorio no solo guarda monedas: guarda historias, guarda transformación. Que no solo se recicle plástico: se recicle esperanza. Que no solo se conduzca un Toyota: se conduzca un futuro.`,
        fontSize: { base: "16px", medium: "12px", xl: "22px" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
        },
        fontStyle: {
          base: "normal",
          medium: "normal",
          xl: "normal",
        },
        width: {
          base: "100%",
          medium: "",
          xl: "80%",
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
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        letterSpacing: "0px",
        // padding: "38px 16px 0",
        margin: {
          base: "0x auto 20px ",
          medium: "",
          xl: "0px auto 20px",
        },

        padding: {
          base: "0 15px",
          xl: "0 68px 0 0",
        },
        maxWidth: {
          base: "925px",
        },
      },
      viewstyle: {
        flexDirection: { base: "row", xl: "row" },
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
        text: "En alianza con Mercico y Hogares Bambi:",
        fontSize: {
          base: "32px",
          xl: "56px",
        },
        fontFamily: "var(--font-toyotaDisplay)",
        fontWeight: {
          base: "400",
        },

        textAlign: {
          base: "left",
          md: "center",
        },
        lineHeight: {
          base: "normal",
        },
        padding: {
          base: "30px 17px 0px 15px",
          md: "40px 20px 0px",
        },
        letterSpacing: "",
        color: "",
      },

      viewstyle: {
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        placeItems: "center",
        alignItems: { xl: "center" },
        justifyContent: "center",
        maxHeight: {
          base: "auto",
          medium: "450px",
          xl: "450px",
        },
        flexWrap: "wrap",
        // padding: {
        //   base: "",
        //   medium: "113px 0 0",
        //   xl: "113px 0 0",
        // },
        margin: {
          base: "",
          medium: "0 auto",
          xl: "0 auto",
        },
      },
    },
  },

  {
    component: "MericicoLogo",
    props: {
      logos: [
        { url: "/images/mericico-logo1.png", altText: "Mericico" },
        { url: "/images/mericico-logo2.png", altText: "Mericico" },
      ],
    },
  },

  {
    component: "FiveImageGallery",
    props: {
      title: "Contenido destacado",
      subtitle: "¡Únete al movimiento!",
      images: [
        { url: "/images/img-c1-1.png", altText: "Contenido destacado" },
        { url: "/images/img-c1-2.png", altText: "Contenido destacado" },
        { url: "/images/img-c2-1.png", altText: "Contenido destacado" },
        { url: "/images/img-c3-1.png", altText: "Contenido destacado" },
        { url: "/images/img-c3-2.png", altText: "Contenido destacado" },
      ],
    },
  },
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
