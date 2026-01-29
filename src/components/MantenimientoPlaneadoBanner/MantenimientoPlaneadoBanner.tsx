"use client";

import { BannerSlider } from "@/components/BannerSlider/BannerSlider";
import {
  Button,
  Flex,
  Heading,
  Image,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { SwiperSlide } from "swiper/react";

export function MantenimientoPlaneadoBanner(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });
  const slides = [
    {
      imageMobile: "/images/banner-mobile-MPT-Mayo-25-1.jpg",
      imageDesktop: "/images/banner-desktop-MPT-Mayo-25-1.jpg",
    },
    {
      imageMobile: "/images/mantenimiento-planeado__banner--mobile.png",
      imageDesktop: "/images/mantenimiento-planeado__banner--desktop.png",
      subtitle: "Mantenimiento Planeado",
      title: "Cuidamos tu vehículo",
      button: "tanto como tú",
    },
    // {
    //   imageMobile: "/images/mantenimiento-planeado__banner--mobile.png",
    //   imageDesktop: "/images/mantenimiento-planeado__banner--desktop.png",
    //   subtitle: "Mantenimiento Planeado",
    //   title: "Cuidamos tu vehículo",
    //   button: "tanto como tú",
    // },
    // {
    //   imageMobile: "/images/mantenimiento-planeado__banner--mobile.png",
    //   imageDesktop: "/images/mantenimiento-planeado__banner--desktop.png",
    //   subtitle: "Mantenimiento Planeado",
    //   title: "Cuidamos tu vehículo",
    //   button: "tanto como tú",
    // },
  ];

  return (
    <View>
      <BannerSlider>
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
                alignItems={{ base: "center" }}
                justifyContent={{ xl: "center" }}
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
                      level={2}
                      className="subtitle"
                      fontFamily={"var(--font-toyotaDisplay)"}
                      color={{ base: "white" }}
                      textAlign={{ base: "center" }}
                      fontSize={{ base: "0.875rem", large: "2rem" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "140%", large: "130%" }}
                      letterSpacing={{ base: "0", large: "0" }}
                    >
                      {slide.subtitle}
                    </Heading>

                    <Heading
                      level={1}
                      className="title"
                      fontFamily={"var(--font-toyotaDisplay)"}
                      color={{ base: "white" }}
                      textAlign={{ base: "center" }}
                      fontSize={{ base: "2rem", large: "3.5rem" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "130%", large: "110%" }}
                      letterSpacing={{ base: "0", large: "-0.07rem" }}
                      maxWidth={{ base: "19ch" }}
                    >
                      {slide.title}
                    </Heading>
                  </Flex>
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
                    padding={{ base: "0.31rem 1.25rem", large: "0.75rem" }}
                    width={{ base: "max-content", large: "18.125rem" }}
                  >
                    {slide.button}
                  </Button>
                )}
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </BannerSlider>
    </View>
  );
}
