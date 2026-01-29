"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
  display?: {
    base?: string;
    small?: string;
    medium?: string;
    large?: string;
    xl?: string;
  };
}

// Datos de prueba
const pageData: ComponentData[] = [
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "#MovilidadParaTodos",
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
        text: "El carro de tus sueños",
        fontSize: { base: "56px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "110%",
        textAlign: "left",
        padding: { base: "10px 15px 30px", xl: "0 0 70px" },
        letterSpacing: "-1.12px",
        verticalAlign: "middle",
      },
    },
  },
  {
    component: "VideoPlayer",
    props: {
      image: {
        src: "/images/Mask group.png",
        alt: "Captura de pantalla",
      },
    },
  },
  //add here Video component

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "En Toyota creemos que la movilidad debe ser para todos, por eso cambiamos la vida de decenas de perritos con discapacidad, dándoles una segunda oportunidad para moverse por más caminos, donando sillas de ruedas cero kilómetros en acompañamiento de Nucleumpet, el cual se encarga de proporcionar los dispositivos de movilidad a varios peluditos.",
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
    component: "ThreeImageGallery",
    props: {
      images: [
        {
          url: "/images/cars/nigh_red_light_on_door_car.png",
          altText: "nigh red ligh on door",
        },
        {
          url: "/images/cars/nigh_red_light_on_door_car_handle.png",
          altText: "nigh red ligh on door",
        },
        {
          url: "/images/cars/nigh_red_light_on_door_car_handle_3.png",
          altText: "nigh red ligh on door",
        },
      ],
    },
    display: { base: "block", xl: "none" },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Lo hacemos posible juntos, rompiendo los límites de movilidad",
        fontSize: { base: "26px", xl: "26px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "100%",
        textAlign: "left",
        padding: { base: "63px 15px 0px", xl: "70px 0 0" },
        letterSpacing: "0",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Apostándole al trabajo conjunto bajo la premisa de que la movilidad debe ser para todos, decidimos unir fuerzas con NucleumPet para cambiar las vidas, no solo de los perritos discapacitados, también la de sus familias quienes tienen una segunda oportunidad para seguir acumulando recuerdos junto a ellos. El éxito de esta alianza nos permitió romper los límites de la movilidad, llegando a diferentes zonas del país.",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "32px 16px 61px 15px", xl: "73px  0px 58px" },
      },
    },
  },
  //add here slider of the Proceso de Fabricación - Un paso a la vez
  {
    component: "PreventiveCampaignsServicesSlider",
    props: {
      title: "Un paso a la vez",
      items: [
        {
          image: {
            src: "/images/wheels_with_object.png",
            alt: "VIN",
            width: { base: "100%", xl: "-webkit-fill-available" },
            height: { base: "auto", xl: "fit-content" },
          },
          title: "Diseño y medida",
          description: {
            intro:
              "El primer paso en la producción de sillas de ruedas para perros es el diseño y la toma de medidas generales que se adaptan a la mayoría de los perros. Se debe asegurar que la silla de ruedas sea ajustable para adaptarse a diferentes tamaños y razas de perros.",
            list: [],
          },
        },
        {
          image: {
            src: "/images/wheels_with_object.png",
            alt: "VIN",
            width: { base: "100%", xl: "-webkit-fill-available" },
            height: { base: "auto", xl: "fit-content" },
            padding: { base: "0" },
          },
          title: "Diseño y medida",
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
    component: "HybridMythsCarousel",
    props: {
      header: "Testimonios",
      subDescription:
        "Descubre cómo las sillas de ruedas para perros han cambiado la vida de estos peludos amigos y sus dueños. Lee los testimonios conmovedores que muestran cómo esta ayuda de movilidad les ha devuelto la alegría de caminar juntos",
      subHeader: "Nucleum Pet",
      data: [
        {
          title:
            "“Yo encontré a Nana un 31 de Octubre y desde ese día hemos sido inseparables, lleva 8 años conmigo. Me siento alegre, feliz de verlo con su regalo, mi nieta está orgullosa de ver que volvió a jugar como antes.” Carolina Rodriguez",
          description: "",
          image: "/images/mix_light_color.png",
        },
        {
          title:
            "“Yo encontré a Nana un 31 de Octubre y desde ese día hemos sido inseparables, lleva 8 años conmigo. Me siento alegre, feliz de verlo con su regalo, mi nieta está orgullosa de ver que volvió a jugar como antes.” Carolina Rodriguez",
          description: "",
          image: "/images/mix_light_color.png",
        },
        {
          title:
            "“Yo encontré a Nana un 31 de Octubre y desde ese día hemos sido inseparables, lleva 8 años conmigo. Me siento alegre, feliz de verlo con su regalo, mi nieta está orgullosa de ver que volvió a jugar como antes.” Carolina Rodriguez",
          description: "",
          image: "/images/mix_light_color.png",
        },
      ],
    },
  },
  //add here video player component

  //update SliderGallery component to accept dynamic data
  {
    component: "SliderGallery",
    props: {
      backgroundColor: "#F5F5F5",
      color: "#1A1A1A",
      head: {
        subtitle: "Explora nuestros servicios",
        title: "Beneficios exclusivos para tu Toyota",
      },
      slides: [
        {
          id: "slide-1",
          data: {
            image: "/images/sliderinfo/service-1.png",
            title: "Mantenimiento Certificado",
            text: "Confía en técnicos especializados y piezas originales para mantener tu Toyota como nuevo.",
          },
        },
        {
          id: "slide-2",
          data: {
            image: "/images/sliderinfo/service-2.png",
            title: "Asistencia en Ruta",
            text: "Contamos con soporte 24/7 para ayudarte en cualquier momento que lo necesites.",
          },
        },
        {
          id: "slide-3",
          data: {
            image: "/images/sliderinfo/service-3.png",
            title: "Garantía Extendida",
            text: "Protege tu inversión con planes de garantía pensados para darte tranquilidad.",
          },
        },
      ],
    },
  },
];

export default function DeTusSuenos() {
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
