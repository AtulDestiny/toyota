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
  // Update the MainSlider component to accept dynamic props
  {
    component: "MainSlider", // Component name
    props: {
              isPlayicon:false,

      slides: [
        {
          imageMobile: "/images/historia-mobile-banner.png",
          imageDesktop: "/images/toyomax.svg",
          title: "Historia Toyota",
        },
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
        navigation: true,
      },
    },
  },
  {
    component: "HistoryComponent",
    props: {
      bgColor: "#c8312b",
      title: "Historia",
      description:
        "La palabra “Toyota” se originó a partir del apellido del fundador, Kiichiro Toyoda. En sus inicios, los vehículos producidos por la empresa eran vendidos originalmente con el emblema “Toyota”. El logo tenía los colores de la bandera japonesa rojo y blanco y la katakana de Toyota.",
      image: "/images/emb.svg",
      titleStyle: {
        fontSize: { base: "2.5rem", md: "3rem", xl: "3.5rem" },
        fontWeight: { base: "100", xl: "100" },
        marginBottom: { base: "1rem", xl: "1.5rem" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
      },
      descriptionStyle: {
        fontSize: { base: "1rem", md: "1.125rem", xl: "1.25rem" },
        lineHeight: { base: "1.4", xl: "1.6" },
        fontWeight: { base: "400" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
      },
      imageStyle: {
        width: { base: "100%", xl: "80%" },
        padding: { base: "0rem", xl: "0rem" },
        maxWidth: { base: "294px", xl: "400px" },
      },
      containerStyle: {
        marginBottom: { base: "0", xl: "0" },
      },
      contentStyle: {
        padding: { base: "2rem 1rem", md: "3rem 2rem", xl: "6rem 3rem" },
      },
    },
  },

  {
    component: "MultiParaDesc",
    props: {
      title: "La Marca",
      description:
        "El actual logo de Toyota fue introducido en 1989 para conmemorar el aniversario número 50 de la compañía e hizo su debut en el modelo de lujo Celsior.",
      additionalInfo:
        "Su desarrollo tomó cerca de cinco años, debido a que la empresa necesitaba definir un logo adecuado que respondiera a la creciente presencia de Toyota en los países extranjeros.",
      factorInfo:
        "En su elaboración se consideraron dos factores: el primero, que debía ser fácilmente reconocible a la distancia y anunciara la llegada de Toyota y, segundo que su impacto visual hiciera que la marca se destacara de otros vehículos.\n\n El logo está conformado por tres elipses que se combinan en un configuración horizontalmente simétrica. Las dos elipses perpendiculares dentro de la elipse más grande representan el corazón del cliente y el de la empresa. Se superponen para representar una relación mutuamente beneficiosa y la confianza entre sí.\n\n La “T” que conforma esa superposición corresponde al nombre Toyota, al mismo tiempo que representa el volante de un automóvil. Además, la elipse exterior simboliza el mundo que abraza a Toyota.\n\n El espacio en el fondo dentro del logotipo representa los valores infinitos que Toyota le transmite a sus clientes: excelente calidad, valor más allá de las expectativas, alegría al conducir, innovación e integridad en materia de seguridad, además de medio ambiente y responsabilidad social.",
      bgColor: "#ffffff",
      textColor: "#000",
      titleStyle: {
        fontSize: { base: "14px", md: "18px", xl: "18px" },
        fontWeight: { base: "400", xl: "400" },
        marginBottom: { base: "12px", xl: "1.5rem" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
      },
      descriptionStyle: {
        fontSize: { base: "26px", md: "1.5rem", xl: "46px" },
        lineHeight: { base: "1.3", xl: "1.2" },
        fontWeight: { base: "700", xl: "400" },
        marginBottom: { base: "32px", xl: "2rem" },
        fontFamily: {
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
      },
      additionalInfoStyle: {
        fontSize: { base: "1rem", md: "1.125rem", xl: "22px" },
        lineHeight: { base: "1.5", xl: "1.75" },
        fontWeight: { base: "400", xl: "400" },
        marginBottom: { base: "1rem", xl: "1.5rem" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
      },
      factorInfoStyle: {
        fontSize: { base: "1rem", md: "1.125rem", xl: "22px" },
        lineHeight: { base: "1.5", xl: "1.75" },
        fontWeight: { base: "400", xl: "400" },
        marginBottom: { base: "0rem", xl: "2rem" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        },
      },
      containerStyle: {
        marginBottom: { base: "0", xl: "0" },
      },
      contentStyle: {
        padding: { base: "52px 15px 17px", md: "3rem 2rem", xl: "4rem 3rem" },
      },
    },
  },
  {
    component: "ResponsiveImageGallery",
    props: {
      images: [
        {
          url: "/images/toyota-maxx-1.png",
          altText: "nigh red ligh on door",
        },
        {
          url: "/images/toyota-historia-max.png",
          altText: "nigh red ligh on door",
        },
        {
          url: "/images/toyota-historia-nax2.png",
          altText: "nigh red ligh on door",
        },
      ],
      mobileHeight: "300px",
      desktopHeight: "600px",
      gap: "0px",
      padding: { base: "15px", xl: "10px 20px 140px 10px" },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Composición del logo",
        fontSize: { base: "26px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: { base: "700", xl: "700" },
        lineHeight: "100%",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "41px 15px 52px", xl: "132px 0 56px" },
       
      },
    },
  },

  {
    component: "PreventiveCampaignsServicesSlider",
    props: {
      title: " ",
      backgroundColor:"#000", 
      items: [
        {
          image: {
            src: "/images/redlogo.svg",
            alt: "VIN",
            maxWidth: { base: "225px", xl: "-webkit-fill-available" },
            height: { base: "auto", xl: "fit-content" },
            padding: { base: "0" },
          },
          title: "",
          description: {
            intro:
              "El primer paso en la producción de sillas de ruedas para perros es el diseño y la toma de medidas generales que se adaptan a la mayoría de los perros. Se debe asegurar que la silla de ruedas sea ajustable para adaptarse a diferentes tamaños y razas de perros.",
            list: [],
          },
        },
        {
          image: {
            src: "/images/redlogo.svg",
            alt: "VIN",
            maxWidth: { base: "225px", xl: "-webkit-fill-available" },
            width: { base: "225px", xl: "-webkit-fill-available" },
            height: { base: "auto", xl: "fit-content" },
            padding: { base: "0" },
          },
          title: "",
          description: {
            intro:
              "El primer paso en la producción de sillas de ruedas para perros es el diseño y la toma de medidas generales que se adaptan a la mayoría de los perros. Se debe asegurar que la silla de ruedas sea ajustable para adaptarse a diferentes tamaños y razas de perros.",
            list: [],
          },
        },
      ],
    },
    
  },


  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Historia",
        fontSize: { base: "14px", xl: "18px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: { base: "500", xl: "500" },
        lineHeight: "100%",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "59px 15px 0px", xl: "76px 0 0" },
        letterSpacing: "-1.12px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Toyota en Colombia",
        fontSize: { base: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: { base: "400", xl: "400" },
        lineHeight: "100%",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "10px 15px 7px", xl: "7px 0 29px" },
        letterSpacing: "-1.12px",
      },
    },
  },
  

  // {
  //   component: "MultiParaDesc",
  //   props: {
  //     title: "Historia",
  //     description:
  //       "Toyota en Colombia",
  //     additionalInfo:
  //       " ",
  //     factorInfo:
  //       " ",
  //     bgColor: "#ffffff",
  //     textColor: "#000",
  //     textAlign:"center",
  //     titleStyle: {
  //       fontSize: { base: "14px", md: "18px", xl: "18px" },
  //       textAlign: { base: "left", xl: "center" },
  //       fontWeight: { base: "400", xl: "400" },
  //       marginBottom: { base: "1rem", xl: "1.5rem" },
  //       fontFamily: {
  //         base: "var(--font-ToyotaType-Regular)",
  //         xl: "var(--font-ToyotaType-Regular)",
  //       },
  //     },
  //     descriptionStyle: {
  //       fontSize: { base: "26px", md: "1.5rem", xl: "46px" },
  //       lineHeight: { base: "1.3", xl: "1.2" },
  //       fontWeight: { base: "700", xl: "400" },
  //       marginBottom: { base: "1.5rem", xl: "2rem" },
  //       fontFamily: {
  //         base: "var(--font-toyotaDisplay)",
  //         xl: "var(--font-toyotaDisplay)",
  //       },
  //     },


  //     containerStyle: {
  //       marginBottom: { base: "0", xl: "0" },
  //     },
  //     contentStyle: {
  //       padding: { base: "2rem 1rem", md: "3rem 2rem", xl: "4rem 3rem" },
  //     },
  //   },
  // },

  {
    component: "CardAccordian",
   
    props: {
      bgColor: "#fff",
      textColor: "#000000",
      accentColor: "#c8312b", 

      // Period header data
      periodYear: "1959",
      periodTitle: "Llegada a Colombia",
      periodIcon: "/images/borderd.svg",
      periodIconAlt: "Llegada a Colombia",

      // Button text customization
      expandButtonText: "Ver Más +",
      collapseButtonText: "Ver Menos —",

      // Style customization
      yearContainerStyle: {
        backgroundColor: "#D42224", 
        padding: { base: "0rem 0.739rem", md: "0.5rem 2rem" },
        borderRadius: "0px",
        margin: "20px auto",
      },
      yearTextStyle: {
        color: "#fff",
        fontSize: { base: "1.292rem", md: "1.75rem", xl: "22px" },
        fontWeight: "400",
      },
      periodBoxStyle: {
        backgroundColor: "#1e1e1e",
        borderRadius: "0px",
        padding: { base: "1.563rem", md: "2rem" },
        maxWidth: { base: "294px", md: "445px", xl: "445px" }, 
      },
      periodIconStyle: {
        width: "29px",
        height: "25px",
        marginBottom: "0",
      },
      periodTextStyle: {
        color: "#ffffff",
        fontSize: { base: "1rem", md: "1.125rem", xl: "16px" },
        lineHeight: "1.5",
        fontWeight: "400",
        fontFamily: "var(--font-ToyotaType-Regular)",
      },
      periodButtonStyle: {
        backgroundColor: "transparent",
        color: "#000",
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        borderRadius: "5px",
        borderColor: "transparent",
      },
      buttonContainerStyle: { 
        padding: { base: "4px 0 0", md: "30px", xl: "30px" },
      },

      // Simplified items structure - only description and icon
      items: [
        {
          icon: "/images/yellow.svg",
          description:
            "Llegan a Colombia los primeros vehículos Toyota, entregados por el distribuidor Domingo D’Ambrosio.",
          images: [
            {
              src: "/images/yellow.svg",
              alt: "Toyota Land Cruiser beige",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
            {
              src: "/images/red.svg",
              alt: "Toyota Land Cruiser rojo",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
          ],
          descriptionStyle: {
            textAlign: {
              base: "left",  // Left align for mobile
              xl: "center",  // Example: center align for large screens
            }
          }
        },
      ],

      containerStyle: {
        padding: { base: "0 0", md: "0 2rem", xl: "0 3rem" },
      },
    },
  },
  {
    component: "CardAccordian",
    props: {
      bgColor: "#fff",
      textColor: "#000000",
      accentColor: "#c8312b",

      // Period header data
      periodYear: "1967",
      periodTitle: "Nace la Distribuidora Toyota",
      periodIcon: "/images/historia-box-icon2.png",
      periodIconAlt: "Nace la Distribuidora Toyota",

      // Button text customization
      expandButtonText: "Ver Más +",
      collapseButtonText: "Ver Menos —",

      // Style customization
      yearContainerStyle: {
        backgroundColor: "#D42224",
        padding: { base: "0rem 0.739rem", md: "0.5rem 2rem" },
        borderRadius: "0px",
        margin: "0px auto 20px",
      },
      yearTextStyle: {
        color: "#fff",
        fontSize: { base: "1.292rem", md: "1.75rem", xl: "22px" },
        fontWeight: "400",
      },
      periodBoxStyle: {
        backgroundColor: "#1e1e1e",
        borderRadius: "0px", 
        padding: { base: "1.563rem", md: "2rem" },
        maxWidth: { base: "294px", md: "445px", xl: "445px" }, 
      },
      periodIconStyle: {
        width: "29px",
        height: "26px",
        marginBottom: "0",
      },
      periodTextStyle: {
        color: "#ffffff",
        fontSize: { base: "1rem", md: "1.125rem", xl: "16px" },
        lineHeight: "1.5",
        fontWeight: "400",
        fontFamily: "var(--font-ToyotaType-Regular)",
      },
      periodButtonStyle: {
        backgroundColor: "transparent",
        color: "#000",
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        borderRadius: "5px",
        borderColor: "transparent",
      },
      buttonContainerStyle: {
        padding: { base: "4px 0 0", md: "30px", xl: "30px" },
      },

      // Simplified items structure - only description and icon
      items: [
        {
          icon: "/images/yellow.svg",
          description:
            "Con la incorporación de los primeros camperos Toyota Land Cruiser, se constituyó Distribuidora Toyota de Colombia Ltda., como concesionario de Toyota Motor Corporation.",
          images: [
            {
              src: "/images/yellow.svg",
              alt: "Toyota Land Cruiser beige",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
            {
              src: "/images/red.svg",
              alt: "Toyota Land Cruiser rojo",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
          ],
        },
      ],

      containerStyle: {
        padding: { base: "0 0", md: "0 2rem", xl: "0 3rem" },
      },
    },
  },
  {
    component: "CardAccordian",
    props: {
      bgColor: "#fff",
      textColor: "#000000",
      accentColor: "#c8312b",

      // Period header data
      periodYear: "1992",
      periodTitle: "Inicio del Ensamblaje Local",
      periodIcon: "/images/historia-box-icon3.png",
      periodIconAlt: "Inicio del Ensamblaje Local",

      // Button text customization
      expandButtonText: "Ver Más +",
      collapseButtonText: "Ver Menos —",

      // Style customization
      yearContainerStyle: {
        backgroundColor: "#D42224",
        padding: { base: "0rem 0.739rem", md: "0.5rem 2rem" },
        borderRadius: "0px",
        margin: "20px auto",
      },
      yearTextStyle: {
        color: "#fff",
        fontSize: { base: "1.292rem", md: "1.75rem", xl: "22px" },
        fontWeight: "400",
      },
      periodBoxStyle: {
        backgroundColor: "#1e1e1e",
        borderRadius: "0px",
        padding: { base: "1.563rem", md: "2rem" },
        maxWidth: { base: "294px", md: "445px", xl: "445px" }, 
      },
      periodIconStyle: {
        width: "41px",
        height: "26px",
        marginBottom: "0",
      },
      periodTextStyle: {
        color: "#ffffff",
        fontSize: { base: "1rem", md: "1.125rem", xl: "16px" },
        lineHeight: "1.5",
        fontWeight: "400",
        fontFamily: "var(--font-ToyotaType-Regular)",
      },
      periodButtonStyle: {
        backgroundColor: "transparent",
        color: "#000",
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        borderRadius: "5px",
        borderColor: "transparent",
      },
      buttonContainerStyle: {
        padding: { base: "4px 0 0", md: "30px", xl: "30px" },
      },

      // Simplified items structure - only description and icon
      items: [
        {
          icon: "/images/yellow.svg",
          description:
            "Se conocen los primeros Toyota ensamblados en Colombia, los legendarios camperos (Land Cruiser - Hilux).",
          images: [
            {
              src: "/images/yellow.svg",
              alt: "Toyota Land Cruiser beige",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
            {
              src: "/images/red.svg",
              alt: "Toyota Land Cruiser rojo",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
          ],
        },
      ],

      containerStyle: {
        padding: { base: "0 0", md: "0 2rem", xl: "0 3rem" },
      },
    },
  },
  {
    component: "CardAccordian",
    props: {
      bgColor: "#fff",
      textColor: "#000000",
      accentColor: "#c8312b",

      // Period header data
      periodYear: "2008",
      periodTitle: "Fundación de Toyota de Colombia S.A.",
      periodIcon: "/images/historia-box-icon4.png",
      periodIconAlt: "Fundación de Toyota de Colombia S.A.",

      // Button text customization
      expandButtonText: "Ver Más +",
      collapseButtonText: "Ver Menos —",

      // Style customization
      yearContainerStyle: {
        backgroundColor: "#D42224",
        padding: { base: "0rem 0.739rem", md: "0.5rem 2rem" },
        borderRadius: "0px",
        margin: "20px auto",
      },
      yearTextStyle: {
        color: "#fff",
        fontSize: { base: "1.292rem", md: "1.75rem", xl: "22px" },
        fontWeight: "400",
      },
      periodBoxStyle: {
        backgroundColor: "#1e1e1e",
        borderRadius: "0px",
        padding: { base: "0.813rem", md: "2rem" },
        maxWidth: { base: "294px", md: "445px", xl: "445px" }, 
      },
      periodIconStyle: {
        width: "25px",
        height: "26px",
        marginBottom: "0",
      },
      periodTextStyle: {
        color: "#ffffff",
        fontSize: { base: "1rem", md: "1.125rem", xl: "16px" },
        lineHeight: "1.5",
        fontWeight: "400",
        fontFamily: "var(--font-ToyotaType-Regular)",
      },
      periodButtonStyle: {
        backgroundColor: "transparent",
        color: "#000",
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        borderRadius: "5px",
        borderColor: "transparent",
      },
      buttonContainerStyle: {
        padding: { base: "4px 0 0", md: "30px", xl: "30px" },
      },

      // Simplified items structure - only description and icon
      items: [
        {
          icon: "/images/yellow.svg",
          description:
            "Toyota Motor Corporation da apertura a Toyota de Colombia S.A.",
          images: [
            {
              src: "/images/yellow.svg",
              alt: "Toyota Land Cruiser beige",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
            {
              src: "/images/red.svg",
              alt: "Toyota Land Cruiser rojo",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
          ],
        },
      ],

      containerStyle: {
        padding: { base: "0 0", md: "0 2rem", xl: "0 3rem" },
      },
    },
  },
  {
    component: "CardAccordian",
    props: {
      bgColor: "#fff",
      textColor: "#000000",
      accentColor: "#c8312b",

      // Period header data
      periodYear: "2014",
      periodTitle: "Nace Automotores Toyota Colombia",
      periodIcon: "/images/historia-box-icon5.png",
      periodIconAlt: "Nace Automotores Toyota Colombia",

      // Button text customization
      expandButtonText: "Ver Más +",
      collapseButtonText: "Ver Menos —",

      // Style customization
      yearContainerStyle: {
        backgroundColor: "#D42224",
        padding: { base: "0rem 0.739rem", md: "0.5rem 2rem" },
        borderRadius: "0px",
        margin: "20px auto",
      },
      yearTextStyle: {
        color: "#fff",
        fontSize: { base: "1.292rem", md: "1.75rem", xl: "22px" },
        fontWeight: "400",
      },
      periodBoxStyle: {
        backgroundColor: "#1e1e1e",
        borderRadius: "0px",
        padding: { base: "0.813rem", md: "2rem" },
        maxWidth: { base: "294px", md: "445px", xl: "445px" }, 
      },
      periodIconStyle: {
        width: "140px",
        height: "24px",
        marginBottom: "0",
      },
      periodTextStyle: {
        color: "#ffffff",
        fontSize: { base: "1rem", md: "1.125rem", xl: "16px" },
        lineHeight: "1.5",
        fontWeight: "400",
        fontFamily: "var(--font-ToyotaType-Regular)",
      },
      periodButtonStyle: {
        backgroundColor: "transparent",
        color: "#000",
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        borderRadius: "5px",
        borderColor: "transparent",
      },
      buttonContainerStyle: {
        padding: { base: "4px 0 0", md: "30px", xl: "30px" },
      },

      // Simplified items structure - only description and icon
      items: [
        {
          icon: "/images/yellow.svg",
          description:
            "Distoyota y Toyota Motor Corporation se unen para conformar Automotores Toyota Colombia S.A.S.",
          images: [
            {
              src: "/images/yellow.svg",
              alt: "Toyota Land Cruiser beige",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
            {
              src: "/images/red.svg",
              alt: "Toyota Land Cruiser rojo",
              width: { base: "100%", md: "45%", xl: "45%" },
              height: { base: "auto" },
            },
          ],
        },
      ],

      

      containerStyle: {
        padding: { base: "0 0", md: "0 2rem", xl: "0 3rem" },
      },
    },
  },


  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/toyota-historia-logo.png",
        alt: "toyota-servicios-conectados",
        width: { base: "auto", xl: "auto" },
        margin: { base: "0 auto" },
        height: "auto",
        objectFit: "contain",
        padding: { base: "45px 15px 72px", xl: "0px 15px 93px" },
        display: "flex",
      }, 
      viewstyle: {
        display: "flex",
        flexDirection: { base: "row", xl: "row" },
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
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
