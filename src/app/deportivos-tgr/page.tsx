"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import { InicioComponent } from "./Inicio";
import { HistoriaComponent } from "./Historia";
import { ModelosComponent } from "./Modelos";
import { BoutiqueComponent } from "./Boutique";
import "./page.css";

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
      slides: [
        // {
        //   imageMobile: "/images/TGR/banner-1.png",
        //   imageDesktop: "/images/TGR/banner-1.png",
        // },
        // {
        //   imageMobile: "/images/TGR/banner-2.jpg",
        //   imageDesktop: "/images/TGR/banner-2.jpg",
        // },
        // {
        //   imageMobile: "/images/TGR/banner-3.jpg",
        //   imageDesktop: "/images/TGR/banner-3.jpg",
        // },
        // {
        //   imageMobile: "/images/TGR/banner-4.jpg",
        //   imageDesktop: "/images/TGR/banner-4.jpg",
        // },

        // {
        //   imageMobile: "/images/TGR/banner-1.png",
        //   imageDesktop: "/images/TGR/banner-1.png",
        // },
        // {
        //   imageMobile: "/images/TGR/banner-2.jpg",
        //   imageDesktop: "/images/TGR/banner-2.jpg",
        // },
        {
          imageMobile: "/images/TGR/tgr-41-banner.png",
          imageDesktop: "/images/TGR/tgr-41-banner.png",
        },
        {
          imageMobile: "/images/TGR/tgr-42-banner.png",
          imageDesktop: "/images/TGR/tgr-42-banner.png",
        },
      ], // Passing slides data inline
      sliderConfig: {
        slidesPerView: 1, // Number of slides visible at a time
        spaceBetween: 10, // Space between slides
        loop: true, // Infinite loop of slides
        isButton: false, // Show navigation buttons
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
    component: "ToyotaWorldWithRouter",
    props: {
      basePath: "deportivos-tgr",
      items: [
        {
          label: "Inicio",
          value: "Tab 1",
          content: <InicioComponent />,
        },
        { label: "Historia", value: "Tab 2", content: <HistoriaComponent /> },
        { label: "Modelos", value: "Tab 3", content: <ModelosComponent /> },
        {
          label: "Boutique",
          value: "Tab 4",
          content: <BoutiqueComponent />,
        },
      ],
      padding: "0",
      containerStyle: {
        margin: { base: "0 17px 0", xl: "0 0 0" },
      },
    },
  },
  {
    component: "BoutiqueTGRCard",
  },
  // {
  //   component: "News",
  //   props: {
  //     subheader: "",
  //     header: "Nuevas Historias TGR",
  //     viewStyle: {
  //       backgroundColor: "#000",
  //       color: "#fff",
  //     },
  //     data: [
  //       {
  //         id: "1",
  //         imageSrc: "/images/TGR/tgr-news01.png",
  //         imageAlt: "news-1",
  //         date: "07/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //       {
  //         id: "2",
  //         imageSrc: "/images/TGR/tgr-news02.png",
  //         imageAlt: "news-2",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado..",
  //         link: "/",
  //       },
  //       {
  //         id: "3",
  //         imageSrc: "/images/TGR/story3.jpg",
  //         imageAlt: "news-3",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //       {
  //         id: "4",
  //         imageSrc: "/images/news/news-4.png",
  //         imageAlt: "news-4",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //       {
  //         id: "5",
  //         imageSrc: "/images/news/news-5.png",
  //         imageAlt: "news-5",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //       {
  //         id: "6",
  //         imageSrc: "/images/news/news-6.png",
  //         imageAlt: "news-6",
  //         date: "08/02/24",
  //         readingTime: "4 min",
  //         title: "Fortalecimiento a través de la comunidad",
  //         description:
  //           "Cuando tienes el apoyo de tu comunidad detrás de ti, el camino por delante es ilimitado.",
  //         link: "/",
  //       },
  //     ],
  //   },
  // },
  {
    component: "TgrFooterComponent",
  },
];

export default function Home() {
  return (
    <div className="tgr-page">
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
