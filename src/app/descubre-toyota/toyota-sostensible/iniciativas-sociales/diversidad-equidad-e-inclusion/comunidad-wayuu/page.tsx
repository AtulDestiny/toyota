"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

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
          imageMobile: "/images/comunidad-wayuu-nobile-banner2.jpg",
          imageDesktop: "/images/comunidad-wayuu-desktop-banner2.jpg",
          title: "",
        },

        // {
        //   imageMobile: "/images/comunidad-wayuu-nobile-banner.png",
        //   imageDesktop: "/images/comunidad-wayuu-desktop-banner.png",
        //   title: "",
        // },
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
        text: "Diversidad",
        fontSize: { base: "14px", xl: "14px" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "19.6px",
        textAlign: "left",
        padding: {
          base: "48px 15px 0px",
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
        text: "Comunidad Wayúu",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "61.6px",
        textAlign: "left",
        padding: { base: "10px 15px 0px", xl: "0" },
        letterSpacing: "-1.12px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Desde nuestro compromiso con el pilar social, desarrollamos iniciativas que generen valor compartido con las comunidades, respetando sus tradiciones y potenciando su desarrollo.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 0px 15px", xl: "73px  0px 58px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/wayuu-11.jpg",
        alt: "Lotus flower",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "47px 15px 70px", xl: "45px 15px 105px" },
      },
    },
  },
  //add here Title , Paragraph  Image section component
  {
    component: "TestimonalCard",
    props: {
      backgroundColor: "#111827",
      title: "Un vínculo entre la comunidad Wayuu y la innovación de Toyota",
      description:
        "Toyota desarrolla un proyecto en la Guajira que mejora la vida de comunidades Wayuu mediante paneles solares, bombas de agua limpia y bicicletas, garantizando agua potable y movilidad en zonas remotas, respetando su cultura y fomentando su desarrollo social.",
      imageSrc: "/images/wayuu-77.jpg",
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Sobre el proyecto, Cecilia Acosta, líder de la comunidad Iwouyáa mencionó",
        fontSize: { base: "26px", xl: "2rem" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        textAlign: { base: "left", xl: "center" },
        padding: "47px 16px 0px 15px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "“este trabajo contribuye a que podamos seguir con la labor del tejido, continuemos cuidando de nuestras familias y nos recuperemos del impacto del Covid-19. Expresamos nuestra gratitud con Toyota por este proyecto”.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "30.4px",
        maxWidth: {
          xl: "90%",
        },
        textAlign: { base: "left", xl: "center" },
        padding: "34px 16px 0px 15px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/LANDING-PRADO-WAYUU-OK_DESKTOP_09.png",
        alt: "Lotus flower",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "50px 0 25px 0px", xl: "80px 0px" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Un Proyecto Que Transforma Vidas en la Comunidad Wayúu",
        fontSize: { base: "26px", xl: "2rem" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        // margin: {
        //   xl: "20px 0 0",
        // },
        lineHeight: "normal",
        textAlign: { base: "left", xl: "center" },
        padding: "47px 16px 0px 15px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Para lograr llevar a cabo este proyecto, se desarrolló una versión única en el mundo de Toyota Prado Sumo TX 2020, con un diseño exclusivo, inspirado en la simbología y tejidos de la comunidad Wayúu con el fin de subastarla y donar las ganancias a la comunidad.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "30.4px",
        maxWidth: {
          xl: "90%",
        },
        textAlign: { base: "left", xl: "center" },
        padding: "34px 16px 0px 15px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/toyota_fortuner_orange_yello_lines_car.png",
        alt: "Lotus flower",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        display: {
          base: "block",
          xl: "none",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: "45px 0px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Dale una mirada al proceso creativo de la Toyota Prado con diseño Wayúu, única en el mundo.",
        fontSize: { base: "32px", xl: "2rem" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "41.6px",
        maxWidth: {
          xl: "70%",
        },
        textAlign: { base: "left", xl: "center" },
        padding: "51px 14px 47px 17px",
      },
    },
  },
  //add here video player Component
  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/02comunidad-wayuu754x379web.jpg",
        alt: "Captura de pantalla",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          xl: "761px",
        },
        margin: {
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "45px 15px", xl: "72px 0 143px" },
      },
    },
  },
  {
    component: "SliderGallery",
    props: {
      backgroundColor: "#29363A",
      color: "#ffffff",
      head: {
        subtitle: "Contenido destacado",
        title: "",
      },
      slides: [
        {
          id: "1",
          data: `                
        <div class="slide__column slide__column--primary">
          <div>
            <img
              class="slide__media"
              src="/images/wayuu-gallary/wayuu--00103.jpg"
              alt="Toyota"
            />
          </div>
          <div>
            <img
              class="slide__media"
              src="/images/wayuu-gallary/wayuu--00102.jpg"
              alt="Toyota"
            />
          </div>
        </div>
        <div class="slide__column slide__column--secondary">
          <div>
            <img
              class="slide__media"
              src="/images/wayuu-gallary/wayuu--00101.jpg"
              alt="Toyota"
            />
          </div>
          <div>
            <img
              class="slide__media"
              src="/images/wayuu-gallary/wayuu--00104.jpg"
              alt="Toyota"
            />
          </div>
        </div>
          `,
        },
        {
          id: "2",
          data: `                
            <div class="slide__column slide__column--primary">
              <div>
                <img class="slide__media" src="/images/wayuu-gallary/wayuu--00105.jpg" alt="Toyota"/>
              </div>
              <div>
                <img class="slide__media" src="/images/wayuu-gallary/wayuu--00106.jpg" alt="Toyota"/>
              </div>
            </div>
            <div class="slide__column slide__column--secondary">
              <div>
                <img class="slide__media" src="/images/wayuu-gallary/wayuu--00107.jpg" alt="Toyota"/>
              </div>
              <div>
                <img class="slide__media" src="/images/wayuu-gallary/wayuu--00108.jpg" alt="Toyota"/>
              </div>
            </div>
        `,
        },
        {
          id: "3",
          data: `                
            <div class="slide__column slide__column--primary">
              <div>
                <img class="slide__media" src="/images/wayuu-gallary/wayuu--00109.jpg" alt="Toyota"/>
              </div>
              <div>
                <img class="slide__media" src="/images/wayuu-gallary/wayuu--00107.jpg" alt="Toyota"/>
              </div>
            </div> 
            <div class="slide__column slide__column--secondary">
              <div>
                <img class="slide__media" src="/images/wayuu-gallary/wayuu--001010.jpeg" alt="Toyota"/>
              </div>
              <div>
                <img class="slide__media" src="/images/wayuu-gallary/wayuu--00108.jpg" alt="Toyota"/>
              </div>
            </div>
        `,
        },
      ],
    },
  },
];

export default function ComunidadWayuu() {
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
