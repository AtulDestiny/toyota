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

export function FlotasYVentasBanner(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });

  // Custom styles for slider buttons positioning
  const sliderButtonStyles = `
  .banner-slider-button-prev.banner-slider-arrow {
    left: 125px !important;
  }
  .banner-slider-button-next.banner-slider-arrow{
    right: 125px !important;
  }
  /* THESE ARE THE NEW PAGINATION STYLES I ADDED: */
  .banner-slider-pagination .swiper-pagination-bullet {
    width: 469.15px !important;
    height: 6px !important;
  }
`;
  const slides = [
    {
      imageMobile: "/images/flotasyventas__banner--mobile.svg",
      imageDesktop: "/images/bannerdesk.svg",
      title: "Somos el aliado ideal",
      subtitle: "Para la operación de tu negocio",
    },
    // {
    //   imageMobile: "/images/flotasyventas__banner--mobile.svg",
    //   imageDesktop: "/images/bannerdesk.svg",
    //   title: "Somos el aliado ideal",
    //   subtitle: "Para la operación de tu negocio",
    // },
    // {
    //   imageMobile: "/images/flotasyventas__banner--mobile.svg",
    //   imageDesktop: "/images/bannerdesk.svg",
    //   title: "Somos el aliado ideal",
    //   subtitle: "Para la operación de tu negocio",
    // },
    // {
    //   imageMobile: "/images/flotasyventas__banner--mobile.svg",
    //   imageDesktop: "/images/bannerdesk.svg",
    //   title: "Somos el aliado ideal",
    //   subtitle: "Para la operación de tu negocio",
    // },
  ];

  return (
    <View>
      {/* Add custom styles for button positioning */}
      <style dangerouslySetInnerHTML={{ __html: sliderButtonStyles }} />
      <BannerSlider>
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              position: "relative",
              height: "auto",
            }}
          >
            <Image
              src={isMobile ? slide.imageMobile : slide.imageDesktop}
              alt={slide.title}
              className="image"
              width={"100%"}
              height={"100%"}
              style={{
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            />

            {/* Linear Gradient Overlay */}
            <View
              position="absolute"
              top="0"
              left="0"
              right="0"
              height={{ base: "170px", large: "290px" }}
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent)",
                pointerEvents: "none",
              }}
            />

            <Flex
              className="overlay"
              width={{ base: "100%", large: "80%" }}
              margin={"0 auto"}
              position={{ base: "absolute" }}
              top={{ base: "0" }}
              left={{ base: "0" }}
              right={{ large: "0" }}
              justifyContent={{ large: "flex-start" }}
            >
              <Flex
                direction={{ base: "column" }}
                width={"100%"}
                padding={{ base: "2.38rem 0.94rem", xl: "79px 0" }}
                gap={{ base: "1.0625rem" }}
                alignItems={{ base: "center", large: "flex-start" }}
                height={{ base: "594px", xl: "633px" }}
              >
                <Flex
                  direction={{ base: "column" }}
                  gap={{ large: "2rem" }}
                  alignItems={{ base: "center" }}
                >
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "0", large: "0.75rem" }}
                    alignItems={{ base: "center", large: "flex-start" }}
                  >
                    <Heading
                      level={1}
                      className="title"
                      fontFamily={{
                        base: "var(--font-ToyotaType-Regular)",
                        xl: "var(--font-ToyotaType-Regular)",
                      }}
                      color={"white"}
                      textAlign={{ base: "center" }}
                      width={{ base: "345px", xl: "100%" }}
                      fontSize={{ base: "2rem", large: "3.5rem" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "130%", large: "110%" }}
                    >
                      {slide.title}
                    </Heading>

                    <Heading
                      level={2}
                      className="subtitle"
                      fontFamily={{
                        base: "var(--font-toyotaDisplay)",
                        xl: "var(--font-toyotaDisplay)",
                      }}
                      width={{ base: "344px", xl: "100%" }}
                      color={"white"}
                      textAlign={{ base: "center", xl: "left" }}
                      fontSize={{ base: "1.125rem", large: "2rem" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "normal", large: "130%" }}
                    >
                      {slide.subtitle}
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
