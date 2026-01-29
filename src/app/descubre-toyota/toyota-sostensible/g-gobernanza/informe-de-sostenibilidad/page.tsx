"use client";

import React, { useEffect, useState } from "react";
import renderComponent from "@/utils/renderComponent";

// Define responsive style types
type ResponsiveString = string | Record<string, string>;
type ResponsiveValue<T> = T | Record<string, T>;

// Define view style properties
interface ViewStyleProps {
  display?: string;
  flexDirection?: ResponsiveValue<string>;
  backgroundColor?: string;
  alignItems?: string;
  justifyContent?: string;
  width?: ResponsiveValue<string>;
  maxHeight?: ResponsiveValue<string>;
  padding?: ResponsiveValue<string>;
  marginTop?: ResponsiveValue<string>;
  [key: string]: ResponsiveValue<string | number | boolean> | undefined;
}

// Define a more specific type for the title property
interface TitleProps {
  text?: string;
  fontSize?: Record<string, string>;
  fontFamily?: ResponsiveString;
  fontStyle?: string;
  fontWeight?: string;
  lineHeight?: ResponsiveString;
  textAlign?: ResponsiveString;
  padding?: ResponsiveString;
  letterSpacing?: ResponsiveString;
  maxWidth?: Record<string, string>;
  margin?: Record<string, string>;
  color?: string;
}

// Base component data interface
interface BaseComponentData {
  component: string;
  children?: (ComponentData | string)[];
  order?: {
    mobile?: number;
    desktop?: number;
  };
}

// Image type for slides
interface SlideImage {
  src?: string;
  alt?: string;
  imageMobile?: string;
  imageDesktop?: string;
  title?: string;
  [key: string]: string | undefined;
}

// Slider config type
interface SliderConfig {
  slidesPerView: number;
  spaceBetween: number;
  loop: boolean;
  isButton: boolean;
  autoplay?: {
    delay: number;
    disableOnInteraction: boolean;
  };
  pagination?: {
    clickable: boolean;
  };
  navigation?: boolean;
  [key: string]: unknown;
}

// SliderSection item
interface SliderItem {
  image: Record<string, unknown>;
  title: string;
  description: string;
  [key: string]: unknown;
}

// Define specific component prop interfaces
interface AWSAmplifyProps {
  title?: TitleProps;
  description?: TitleProps;
  layout?: string;
  viewstyle?: ViewStyleProps;
  [key: string]: unknown;
}

interface RedCardInfoProps {
  title: string;
  leftIcon: string;
  rightIcon: string;
  iconAltLeft: string;
  iconAltRight: string;
  titleFontSize: string;
  [key: string]: unknown;
}

interface SliderSectionProps {
  theme: string;
  items: SliderItem[];
  showButton: boolean;
  [key: string]: unknown;
}

interface MainSliderProps {
  slides: SlideImage[];
  sliderConfig: SliderConfig;
  [key: string]: unknown;
}

interface TestimonalCardProps {
  backgroundColor: string;
  title: string;
  description: string;
  imageSrc: string;
  descriptionFontSize: Record<string, string>;
  [key: string]: unknown;
}

// Union type for all component props
type ComponentProps =
  | AWSAmplifyProps
  | RedCardInfoProps
  | SliderSectionProps
  | MainSliderProps
  | TestimonalCardProps;

// Component data with specific props
interface ComponentData extends BaseComponentData {
  props?: ComponentProps;
}

// Datos de prueba
const pageData: ComponentData[] = [
  // First section - unchanged ordering
  {
    component: "MainSlider",
    props: {
      slides: [
        {
          imageMobile: "/images/informe-de-sostenibilidad-banner-001.jpg",
          imageDesktop: "/images/informe-de-sostenibilidad-banner-001.jpg",
          title: " ",
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
        text: "Bienvenido a nuestro portal de sostenibilidad",
        fontSize: { base: "32px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "100%",
        textAlign: "center",
        padding: { base: "70px 15px 24px", xl: "100px 0 0 57px" },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Automotores Toyota Colombia S.A.S. se enorgullece en presentar su compromiso continuo con la sostenibilidad. Conoce nuestras acciones y logros en materia ambiental, social y empresarial que hemos desarrollado en los últimos años.",
        fontSize: { base: "18px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "32px 16px 74px 15px", xl: "73px 0px 74px 74px" },
      },
    },
  },

  // Components with different ordering on mobile vs desktop
  {
    component: "SliderSection",
    props: {
      theme: "light",
      items: [
        {
          image: {},
          title: "Movilidad sostenible",
          description:
            "A través de una movilidad capaz de ajustarse a las necesidades de nuestros clientes. Por eso buscamos comunicar los logros alcanzados durante el año y compartir los avances en materia de sostenibilidad.",
        },
        {
          image: {},
          title: "Movilidad para todos",
          description:
            "No dejamos a nadie atrás en este camino de la sostenibilidad. Buscamos desarrollar proyectos con impacto social y ambiental.",
        },
      ],
      showButton: false,
    },
    order: {
      mobile: 1, // First in mobile
      desktop: 3, // Last in desktop
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Un compromiso sin límites con la sostenibilidad",
        fontSize: { base: "26px", xl: "26px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "100%",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "10px 15px 0px", xl: "0" },
        letterSpacing: "-1.12px",
      },
    },
    // order: {
    //   mobile: 2, // Second in mobile
    //   desktop: 1, // First in desktop
    // },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Motivación por buscar la sostenibilidad en nuestras actividades y en nuestra cadena de valor.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 0px 15px", xl: "43px 0px 108px" },
      },
    },
    // order: {
    //   mobile: 3, // Last in mobile
    //   desktop: 2, // Second in desktop
    // },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      imagePosition: "middle", // Changed from "top" to "middle"
      layout: "horizontal",
      title: {
        text: `Materiales descargables`,
        fontSize: { base: "14px", xl: "14px" },
        fontFamily: {
          base: "var(--font-ToyotaType-Regular)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-toyotaDisplay)",
        },
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "19.6px",
        margin: { base: "0", xl: "0 auto" },
        textAlign: { base: "left", xl: "center" },
        padding: {
          base: "48px 15px 0px",
          medium: "48px 15px 0px",
          xl: "48px 15px 0px",
        },
      },
      description: {
        text: `Informe de sostenibilidad`,
        fontSize: {
          base: "32px",
          medium: "26px",
          xl: "56px",
        },
        lineHeight: {
          base: "41.6px",
          medium: "normal",
          xl: "61.6px",
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
        letterSpacing: {
          base: "",
          medium: "",
          xl: "-1.12px",
        },
        margin: {
          base: "auto",
          medium: "",
          xl: "0 auto",
        },
        padding: {
          base: "10px 15px 0px",
          medium: "",
          xl: "12px 0px 0px",
        },
        color: "",
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "column" },
        backgroundColor: "#E7EDF1",
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
        marginTop: {
          base: "85px",
          medium: "85px",
          xl: "85px",
        },
      },
    },
  },
  // {
  //   component: "RedCardInfo",
  //   props: {
  //     title: "Informe de Sostenibilidad 2022",
  //     leftIcon: "/images/icons/reportVector.png",
  //     rightIcon: "/images/icons/right-arrow-Vector.png",
  //     iconAltLeft: "Car Check",
  //     iconAltRight: "Arrow",
  //     titleFontSize: "22px",
  //     downloadUrl: "https://www.toyota.com.co/wp-content/uploads/2023/06/InformeSostenibilidad-TOYOTA2022_op.pdf",
  //   },
  // },

  {
    component: "RedCardInfo",
    props: {
      card: [
        {
          title: "Informe de Sostenibilidad 2022",
          leftIcon: "/images/icons/reportVector.png",
          rightIcon: "/images/icons/right-arrow-Vector.png",
          iconAltLeft: "Car Check",
          iconAltRight: "Arrow",
          titleFontSize: "22px",
          backgroundColor: "#D50000",
          downloadUrl: "/images/pdf/InformeSostenibilidad-TOYOTA2022_op.pdf",
        },
        {
          title: "Informe de Sostenibilidad 2023",
          leftIcon: "/images/reportvector-black.png",
          rightIcon: "/images/reportvector-arrow-black.png",
          iconAltLeft: "Car Check",
          iconAltRight: "Arrow",
          titleFontSize: "22px",
          backgroundColor: "#FFF",

          downloadUrl: "/images/pdf/Informe_sostenibilidad_2023_Toyota.pdf",
        },
        {
          title: "Informe de Sostenibilidad 2024",
          leftIcon: "/images/icons/reportVector.png",
          rightIcon: "/images/icons/right-arrow-Vector.png",
          iconAltLeft: "Car Check",
          iconAltRight: "Arrow",
          titleFontSize: "22px",
          backgroundColor: "#D50000",
          downloadUrl: "/images/pdf/Informe_sostenibilidad_2024_Toyota.pdf",
        },
      ],
    },
  },
  {
    component: "TestimonalCard",
    props: {
      backgroundColor: "#000",
      title: "Vamos por más",
      description:
        "Buscamos transformarnos hacia una empresa que brinde opciones de movilidad sostenible. Una Movilidad para Todos.",
      imageSrc: "/images/vamos-image-00232.png",
      descriptionFontSize: { base: "16px", xl: "22px" },
    },
  },
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to update the state based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1250); // 1250px is typically 'xl' breakpoint
    };

    // Set the initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // For simplicity, let's explicitly define the order for each viewport
  const reorderableComponents = pageData.slice(3, 6);

  // The components that stay in the same position
  const unchangedStart = pageData.slice(0, 3);
  const unchangedEnd = pageData.slice(6);

  // Define the explicit order for each viewport
  let orderedMiddleSection: ComponentData[] = [];

  if (isMobile) {
    // Sort the components based on mobile order
    orderedMiddleSection = [...reorderableComponents].sort((a, b) => {
      const aOrder = a.order?.mobile ?? Number.MAX_SAFE_INTEGER;
      const bOrder = b.order?.mobile ?? Number.MAX_SAFE_INTEGER;
      return aOrder - bOrder;
    });
  } else {
    // Sort the components based on desktop order
    orderedMiddleSection = [...reorderableComponents].sort((a, b) => {
      const aOrder = a.order?.desktop ?? Number.MAX_SAFE_INTEGER;
      const bOrder = b.order?.desktop ?? Number.MAX_SAFE_INTEGER;
      return aOrder - bOrder;
    });
  }

  // Combined ordered components
  const orderedComponents = [
    ...unchangedStart,
    ...orderedMiddleSection,
    ...unchangedEnd,
  ];

  return (
    <div>
      {orderedComponents.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
