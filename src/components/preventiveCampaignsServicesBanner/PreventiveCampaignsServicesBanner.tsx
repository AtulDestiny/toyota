"use client";

import { BannerSlider } from "@/components/BannerSlider/BannerSlider";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { SwiperSlide } from "swiper/react";

export function PreventiveCampaignsServicesBanner(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });
  const slides = [
    // {
    //   imageMobile: "/images/campanas-de-seguridad-y-servicios-mob-banner.jpg",
    //   imageDesktop: "/images/campanas-de-seguridad-y-servicios-desk-banner.jpg",
    //   title: "",
    //   titleMobile: "", // Added mobile-specific title with line break
    //   description: "",
    //   button: false,
    // },
    {
      imageMobile: "/images/home-banners/f-takata--mobile.png",
      imageDesktop: "/images/home-banners/f-takata--desktop.png",
      title: "",
      titleMobile: "", // Added mobile-specific title with line break
      description: "",
      button: "",
    },
    // {
    //   imageMobile: "/images/campanas-preventivas-servicio-banner.png",
    //   imageDesktop: "/images/campanas-preventivas-servicio-banner--desktop.png",
    //   title: "Revisa tus Airbags urgente",
    //   titleMobile: "Revisa tus\nAirbags urgente",
    //   description: "Para la operación de tu negocio",
    //   button: "Es fácil, rápido, y sin costo",
    // },
    // {
    //   imageMobile: "/images/campanas-preventivas-servicio-banner.png",
    //   imageDesktop: "/images/campanas-preventivas-servicio-banner--desktop.png",
    //   title: "Revisa tus Airbags urgente",
    //   titleMobile: "Revisa tus\nAirbags urgente",
    //   description: "Para la operación de tu negocio",
    //   button: "Es fácil, rápido, y sin costo",
    // },
    // {
    //   imageMobile: "/images/campanas-preventivas-servicio-banner.png",
    //   imageDesktop: "/images/campanas-preventivas-servicio-banner--desktop.png",
    //   title: "Revisa tus Airbags urgente",
    //   titleMobile: "Revisa tus\nAirbags urgente",
    //   description: "Para la operación de tu negocio",
    //   button: "Es fácil, rápido, y sin costo",
    // },
  ];

  return (
    <>
      <style>
        {`
    @media (max-width: 768px) {
      .swiper .swiper-pagination .swiper-pagination-bullet,
      .swiper .swiper-pagination .swiper-pagination-bullet-active,
      span.swiper-pagination-bullet,
      span.swiper-pagination-bullet-active {
        width: 45.4px !important;
        min-width: 45.4px !important;
        max-width: 45.4px !important;
        --swiper-pagination-bullet-width: 45.4px !important;
        --swiper-pagination-bullet-size: 45.4px !important;
      }
      
      .swiper .swiper-pagination .swiper-pagination-bullet:not(:last-child) {
        margin-right: 6.14px !important;
      }
      
      .banner-slider-pagination,
      .swiper-pagination-clickable,
      .swiper-pagination-bullets {
        margin: 0px auto !important;
        padding: 0px !important;
        gap: 6.14px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
        left: 0 !important;
        right: 0 !important;
        transform: none !important;
      }
      
      .swiper-horizontal > .swiper-pagination-bullets {
        --swiper-pagination-bullet-horizontal-gap: 6.14px !important;
      }

      /* Ensure line breaks work in mobile titles */
      .mobile-title {
        white-space: pre-line !important;
      }
    }
  `}
      </style>

      <View>
        <BannerSlider showButtons={slides.length > 1}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index} style={{ position: "relative" }}>
              <Image
                src={isMobile ? slide.imageMobile : slide.imageDesktop}
                alt={slide.title}
                className="image"
                width={"100%"}
              />

              <Flex
                className="overlay"
                width={{ base: "100%", large: "70%" }}
                height={"100%"}
                margin={"0 auto"}
                position={{ base: "absolute" }}
                top={{ base: "0" }}
                left={{ base: "0", large: "0" }}
                right={{ large: "0" }}
                justifyContent={{ large: "flex-end" }}
              >
                <Flex
                  direction={{ base: "column" }}
                  width={"100%"}
                  padding={{ base: "2.38rem 0.94rem" }}
                  gap={{ base: "1.0625rem" }}
                  alignItems={{ base: "center", large: "flex-end" }}
                  justifyContent={{ large: "center" }}
                >
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ large: "2rem" }}
                    alignItems={{ base: "center" }}
                  >
                    <Flex
                      direction={{ base: "column" }}
                      gap={{ base: "0", large: "0.75rem" }}
                    >
                      <Heading
                        level={1}
                        className={`title ${isMobile ? "mobile-title" : ""}`}
                        fontFamily={"var(--font-toyotaDisplay)"}
                        color={"white"}
                        textAlign={{ base: "center" }}
                        fontSize={{ base: "2rem", large: "3.5rem" }}
                        fontWeight={{ base: "400" }}
                        lineHeight={{ base: "130%", large: "110%" }}
                        maxWidth={{ base: "14ch" }}
                        letterSpacing={"0"}
                      >
                        {isMobile ? slide.titleMobile : slide.title}
                      </Heading>

                      {isMobile ? null : (
                        <Text
                          fontFamily={"var(--font-toyotaDisplay)"}
                          color={"white"}
                          textAlign={"center"}
                          fontSize={"2rem"}
                          fontWeight={"400"}
                          lineHeight={"130%"}
                        >
                          {slide.description}
                        </Text>
                      )}
                    </Flex>
                    {slide.button && (
                      <Button
                        className="button"
                        fontFamily={"var(--font-toyotaDisplay)"}
                        color={"white"}
                        textAlign={{ base: "center" }}
                        fontSize={{ base: " 0.875rem", large: "1.125rem" }}
                        fontWeight={{ base: "400" }}
                        lineHeight={{ base: "140%", large: "1.625rem" }}
                        backgroundColor={{ base: "#D42224" }}
                        border={{ base: "none" }}
                        borderRadius={{ base: "0" }}
                        padding={{ base: "5px 1.25rem", large: "12px 108px" }}
                        width={{ base: "206px", large: "441px" }}
                        height={{ base: "30px", xl: "50px" }}
                      >
                        {slide.button}
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </SwiperSlide>
          ))}
        </BannerSlider>
      </View>
    </>
  );
}
