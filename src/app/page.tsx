"use client";

import "@aws-amplify/ui-react/styles.css";
import MainSlider from "@/components/MainSlider/MainSlider";
import VehiclesTabs from "@/components/Tabs/VehiclesTabs/VehiclesTabs";
import ConcessionaireSearch from "@/components/ConcessionaireSearch/ConcessionaireSearch";
import CanWeHelpYou from "@/components/CanWeHelpYou/CanIWeHelpYou";
import News from "@/components/News/News";
import {
  SliderSection,
  SliderSectionTheme,
} from "@/components/SliderSection/SliderSection";
import WorldTabs from "@/components/Tabs/WorldTabs/WorldTabs";
import TestimonalCard from "@/components/TestimonalCard/TestimonalCard";
import AmplifyAccordion from "@/components/Accordion/Accordion";
// Define component data in a separate section
const componentData = {
  tgr: {
    theme: SliderSectionTheme.Light,
    title: "Toyota Gazoo Racing",
    paddingBottom: "0px",
    Bgcolor: "#000",
    description:
      "¡Colombia le da la bienvenida a Toyota Gazoo Racing, el equipo de automovilismo y los vehículos ganadores de las competencias más retadoras del mundo!",
    items: [
      {
        image: {
          src: "/images/TGR-cards-00101.png",
          alt: "TGR-1",
        },
        title: "Toyota regresa al campeonato WRC.",
        description:
          "2018  El modelo Toyota Yaris WRC queda tercero en el campeonato WRC",
      },
      {
        image: {
          src: "/images/TGR-cards-00102.png",
          alt: "TGR-1",
        },
        title: ` 2022 `,
        description:
          "Se lanza en mayo la marca Toyota Gazoo Racing al mercado colombiano, con 5 líneas GR-S y el vehículo de alto desempeño para competencia, GR Yaris.",
      },
      {
        image: {
          src: "/images/TGR-cards-00103.png",
          alt: "TGR-1",
        },
        title: "Toyota se inició en los deportes del motor en 1957",
        description:
          "Sus principales éxitos se obtuvieron en las condiciones más extremas que sirvieron como un gran desafío para construir los vehículos del futuro, brindando oportunidades de crecimiento para la marca y para las personas que día a día construyen, mantienen y conducen Toyota.",
      },
      {
        image: {
          src: "/images/TGR-cards-00104.png",
          alt: "TGR-1",
        },
        title:
          "Los caminos construyen a la gente y la gente construye los vehículos.",
        description:
          "Esta filosofía está alineada con el pensamiento del fundador de Toyota, Kiichiro Toyoda, quien en 1952 dijo: “El automovilismo es más que un entretenimiento.",
      },
    ],
  },

  redCardInfo: {
    title: "Informe de Sostenibilidad 2023",
    leftIcon: "/images/icons/reportVector.png",
    rightIcon: "/images/icons/right-arrow-Vector.png",
    iconAltLeft: "Car Check",
    iconAltRight: "Arrow",
    titleFontSize: "22px",
  },

  // testimonalCard: {
  //   backgroundColor: "#000",
  //   title: "Vamos por más",
  //   description:
  //     "Buscamos transformarnos hacia una empresa que brinde opciones de movilidad sostenible. Una Movilidad para Todos.",
  //   imageSrc: "/images/Vamos-image.png",
  //   descriptionFontSize: { base: "16px", xl: "22px" },
  // },
};

export default function App() {
  return (
    <>
      <style jsx global>{`
        /* Super specific selector that only targets SliderSection pagination */
        .slider-section .custom-pagination.pagination-custom-widthhhhh {
          width: auto !important;
          max-width: min(77.25rem, 80%) !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .slider-section .custom-pagination.pagination-custom-position {
          bottom: 1px !important;
        }

        @media (max-width: 1249px) {
          .slider-section .custom-pagination.pagination-custom-position {
            bottom: 0px !important;
          }
        }
      `}</style>

      <MainSlider alignBottom showNavigationArrows={false} />
      <VehiclesTabs />
      <ConcessionaireSearch />
      <CanWeHelpYou />
      {/* <TestimonalCard {...componentData.testimonalCard} /> */}
      <WorldTabs customClass="home-tabs_descubre" />
      <SliderSection className="homeSlider-racing" {...componentData.tgr} />
      <AmplifyAccordion data={[]} />
      <News viewStyle={{ BtnTextColor: "white" }} />
    </>
  );
}
