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
          imageMobile: "/images/bannbg.svg",
          imageDesktop: "/images/bannbg.svg",
          title: "Planes Financieros",
        },
        {
          imageMobile: "/images/innova.svg",
          imageDesktop: "/images/innova.svg",
          title: "Planes Financieros",
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
        text: "Financiación simple, rápida, <br> y personalizada",
        fontSize: { base: "26px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: { base: "700", xl: "400" },
        lineHeight: "110.00000000000001%",
        textAlign: "center",
        padding: { base: "63px 15px 0px", xl: "114px 0 0" },
        letterSpacing: "-2px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Conoce nuestros Planes Financieros:",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "22px 16px 43px 15px", xl: "43px 0px 73px 58px" },
      },
    },
  },
  {
    component: "PlanRenueveCard",
    props: {
      title: "PLAN RENUEVE",
      titleStyle: {
        fontSize: { base: "24px", md: "28px", xl: "32px" },
        fontWeight: { base: "700", xl: "700" },
        textAlign: "left",
      },
      tagline:
        "¡Toma el control del crédito y disfruta la mejor vida útil del TOYOTA que te gusta!",
      taglineStyle: {
        fontSize: { base: "16px", md: "17px", xl: "18px" },
        lineHeight: { base: "1.4", xl: "1.5" },
        fontWeight: { base: "400", xl: "400" },
      },
      image: "/images/compara.svg",
      imageStyle: {
        marginTop: { base: "15px", xl: "20px" },
        marginBottom: { base: "15px", xl: "20px" },
        width: { base: "343.70947265625px", xl: "600px" },
        height: { base: "182px", xl: "316.5218200683594px" },
      },
      description1:
        "Con este plan puedes congelar una parte del valor del carro para decidir, después de 2 o 3 años, qué hacer con él.",
      description2:
        "Mientras tanto, pagas cuotas mensuales cómodas, con la tranquilidad de tener tiempo suficiente para decidir: si al final de este plazo cambias el carro por otro nuevo o si te lo quedas!",
      descriptionStyle: {
        fontSize: { base: "14px", md: "15px", xl: "16px" },
        lineHeight: { base: "1.5", xl: "1.6" },
        marginBottom: "12px",
      },
      bgColor: "#ffffff",
      textColor: "#000000",
      containerStyle: {
        marginBottom: { base: "30px", xl: "40px" },
        padding: { base: "15px", xl: "20px 0" },
      },
      cardStyle: {
        maxWidth: { base: "100%", md: "90%", xl: "680px" },
        padding: { base: "20px", md: "25px", xl: "30px" },
        borderRadius: "0",
      },
    },
  },
  {
    component: "PlanRenueveCard",
    props: {
      title: "PLAN COSECHAS",
      titleStyle: {
        fontSize: { base: "24px", md: "28px", xl: "32px" },
        fontWeight: { base: "700", xl: "700" },
        textAlign: "left",
      },
      tagline:
        "¡Toma el control del crédito y disfruta la mejor vida útil del TOYOTA que te gusta!",
      taglineStyle: {
        fontSize: { base: "16px", md: "17px", xl: "18px" },
        lineHeight: { base: "1.4", xl: "1.5" },
        fontWeight: { base: "400", xl: "400" },
      },
      image: "/images/coceshas.svg",
      imageStyle: {
        marginTop: { base: "15px", xl: "20px" },
        marginBottom: { base: "15px", xl: "20px" },
                width: { base: "343.70947265625px", xl: "600px" },
        height: { base: "182px", xl: "316.5218200683594px" },
      },
      description1:
        "Sabemos que tu negocio crece más fácil cuando te acompaña el socio correcto, por eso el Plan Cosechas te ofrece 3 opciones de pago flexibles: ",
      description2:
        "Así, cada empresario o comerciante puede elegir una forma de pago ajustada a las temporadas en que su negocio recibe ingresos. ¡El Plan Cosechas se adapta a cada negocio para verlo crecer!",
      descriptionStyle: {
        fontSize: { base: "14px", md: "15px", xl: "16px" },
        lineHeight: { base: "1.5", xl: "1.6" },
        marginBottom: "12px",
      },
      bgColor: "#ffffff",
      textColor: "#000000",
      containerStyle: {
        marginBottom: { base: "30px", xl: "40px" },
        padding: { base: "15px", xl: "20px 0" },
      },
      cardStyle: {
        maxWidth: { base: "100%", md: "90%", xl: "680px" },
        padding: { base: "20px", md: "25px", xl: "30px" },
        borderRadius: "0",
      },
    },
  },
  {
    component: "PlanRenueveCard",
    props: {
      title: "PLAN TRADICIONAL",
      titleStyle: {
        fontSize: { base: "24px", md: "28px", xl: "32px" },
        fontWeight: { base: "700", xl: "700" },
        textAlign: "left",
      },
      tagline:
        "¡Un plan para todos con la tranquilidad y seguridad de siempre!",
      taglineStyle: {
        fontSize: { base: "16px", md: "17px", xl: "18px" },
        lineHeight: { base: "1.4", xl: "1.5" },
        fontWeight: { base: "400", xl: "400" },
      },
      image: "/images/tradi.svg",
      imageStyle: {
        marginTop: { base: "15px", xl: "20px" },
        marginBottom: { base: "15px", xl: "20px" },
                width: { base: "343.70947265625px", xl: "600px" },
        height: { base: "182px", xl: "316.5218200683594px" },
      },
      description1:
        "Estrena desde 10% de cuota inicial y paga hasta en 72 cuotas mensuales iguales.",
      description2:
        "Un plan de pagos convencional, para quienes buscan una solución de financiación lo más sencilla posible.",
      descriptionStyle: {
        fontSize: { base: "14px", md: "15px", xl: "16px" },
        lineHeight: { base: "1.5", xl: "1.6" },
        marginBottom: "12px",
      },
      bgColor: "#ffffff",
      textColor: "#000000",
      containerStyle: {
        marginBottom: { base: "30px", xl: "40px" },
        padding: { base: "15px", xl: "20px 0" },
      },
      cardStyle: {
        maxWidth: { base: "100%", md: "90%", xl: "680px" },
        padding: { base: "20px", md: "25px", xl: "30px" },
        borderRadius: "0",
      },
    },
  },
  {
    component: "PlanRenueveCard",
    props: {
      title: "PLAN RENUEVE",
      titleStyle: {
        fontSize: { base: "24px", md: "28px", xl: "32px" },
        fontWeight: { base: "700", xl: "700" },
        textAlign: "left",
      },
      tagline:
        "¡Toma el control del crédito y disfruta la mejor vida útil del TOYOTA que te gusta!",
      taglineStyle: {
        fontSize: { base: "16px", md: "17px", xl: "18px" },
        lineHeight: { base: "1.4", xl: "1.5" },
        fontWeight: { base: "400", xl: "400" },
      },
      image: "/images/zuu.svg",
      imageStyle: {
        marginTop: { base: "15px", xl: "20px" },
        marginBottom: { base: "15px", xl: "20px" },
                width: { base: "343.70947265625px", xl: "600px" },
        height: { base: "182px", xl: "316.5218200683594px" },
      },
      description1:
        "Con este plan puedes congelar una parte del valor del carro para decidir, después de 2 o 3 años, qué hacer con él.",
      description2:
        "Mientras tanto, pagas cuotas mensuales cómodas, con la tranquilidad de tener tiempo suficiente para decidir: si al final de este plazo cambias el carro por otro nuevo o si te lo quedas!",
      descriptionStyle: {
        fontSize: { base: "14px", md: "15px", xl: "16px" },
        lineHeight: { base: "1.5", xl: "1.6" },
        marginBottom: "12px",
      },
      bgColor: "#ffffff",
      textColor: "#000000",
      containerStyle: {
        marginBottom: { base: "30px", xl: "40px" },
        padding: { base: "15px", xl: "20px 0" },
      },
      cardStyle: {
        maxWidth: { base: "100%", md: "90%", xl: "680px" },
        padding: { base: "20px", md: "25px", xl: "30px" },
        borderRadius: "0",
      },
    },
  },
];

export default function PlanesFinancierosPage() {
  // Get the header components (first 3 items) and plan components (the rest)
  const headerComponents = pageData.slice(0, 3);
  const planComponents = pageData.slice(3);

  // Custom component to render desktop and mobile layouts
  const PlanesGrid = () => {
    // For mobile view (rendered on all devices but hidden on desktop)
    const mobileView = (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {planComponents.map((component, index) => (
          <div
            key={`mobile-${index}`}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            {renderComponent(component)}
          </div>
        ))}
      </div>
    );

    // For desktop view (rendered but hidden on mobile)
    const createDesktopRows = () => {
      const rows = [];
      for (let i = 0; i < planComponents.length; i += 2) {
        rows.push(
          <div
            key={`row-${i / 2}`}
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "90px",
            }}
          >
            <div style={{ width: "50%", paddingRight: "15px" }}>
              {renderComponent(planComponents[i])}
            </div>
            {i + 1 < planComponents.length && (
              <div style={{ width: "50%", paddingLeft: "15px" }}>
                {renderComponent(planComponents[i + 1])}
              </div>
            )}
          </div>
        );
      }
      return rows;
    };

    const desktopView = (
      <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        {createDesktopRows()}
      </div>
    );

    return (
      <>
        <div className="desktop-only" style={{ width: "100%" }}>
          {desktopView}
        </div>
        <div className="mobile-only" style={{ width: "100%" }}>
          {mobileView}
        </div>
        <style jsx>{`
          @media (max-width: 1199px) {
            .desktop-only {
              display: none;
            }
          }
          @media (min-width: 1200px) {
            .mobile-only {
              display: none;
            }
          }
        `}</style>
      </>
    );
  };

  return (
    <div>
      {/* Render header components */}
      {headerComponents.map((component, index) => (
        <React.Fragment key={`header-${index}`}>
          {renderComponent(component)}
        </React.Fragment>
      ))}

      {/* Render plans in grid layout */}
      <PlanesGrid />
    </div>
  );
}
