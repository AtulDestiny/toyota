"use client";

import { BannerSlider } from "@/components/BannerSlider/BannerSlider";
import {
  Flex,
  Heading,
  Image,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { SwiperSlide } from "swiper/react";

export function MantenimientoOficialBanner(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });
  const slides = [
    {
      imageMobile: "/images/mantenimiento-oficial-banner.png",
      imageDesktop: "/images/mantenimiento-oficial-banner--desktop.png",
      title: "Servicio de Mantenimiento Oficial",
    },
    // {
    //   imageMobile: "/images/mantenimiento-oficial-banner.png",
    //   imageDesktop: "/images/mantenimiento-oficial-banner--desktop.png",
    //   title: "Servicio de Mantenimiento Oficial",
    // },
    // {
    //   imageMobile: "/images/mantenimiento-oficial-banner.png",
    //   imageDesktop: "/images/mantenimiento-oficial-banner--desktop.png",
    //   title: "Servicio de Mantenimiento Oficial",
    // },
    // {
    //   imageMobile: "/images/mantenimiento-oficial-banner.png",
    //   imageDesktop: "/images/mantenimiento-oficial-banner--desktop.png",
    //   title: "Servicio de Mantenimiento Oficial",
    // },
  ];

  return (
    <View>
      <BannerSlider showButtons={false}>
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
                padding={{ base: "2.38rem 0.94rem", xl: "69px 0.94rem" }}
                gap={{ base: "1.0625rem" }}
                alignItems={{ base: "center" }}
                justifyContent={{ base: "center",  xl: "center" }}
                backgroundColor={{ base: "rgba(0,0,0,0.2)", xl: "transparent" }} 
              >
                <Flex
                  direction={{ base: "column" }}
                  gap={{ large: ".75rem" }}
                  alignItems={{ base: "center" }}
                >
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "0", large: "0.75rem" }}
                  >
                    <Heading
                      level={1}
                      className="title"
                      fontFamily={{ base: "var(--font-toyotaDisplay)", xl: "var(--font-ToyotaType-Regular)" }}
                      color={{ base: "white" }}
                      textAlign={{ base: "center" }}
                      fontSize={{ base: "2rem", large: "3.5rem" }}
                      fontWeight={{ base: "400" ,xl:"400" }}
                      lineHeight={{ base: "130%", large: "110.00000000000001%" }}
                      letterSpacing={{ large: "-2px" }}
                      maxWidth={{ base: "19ch" }}
                      style={{
                        textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
                      }}
                    >
                      {slide.title}
                    </Heading>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </BannerSlider>
    </View>
  );
}
