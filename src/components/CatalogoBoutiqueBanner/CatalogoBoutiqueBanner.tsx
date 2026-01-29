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

export function CatalogoBoutiqueBanner(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });
  const slides = [
    {
      imageMobile: "/images/catalogo-boutique__banner.png",
      imageDesktop: "/images/catalogo-boutique__banner--desktop.png",
      title: "Con nuestra Boutique Toyota",
      button: "lleva la exclusividad en cada trayecto",
    },
  ];

  return (
    <>
      {" "}
      <style>
        {`

          /* Hide navigation arrows */
          .catalogo-banner-container .swiper-button-next,
          .catalogo-banner-container .swiper-button-prev {
            display: none !important;
          }
            .banner-slider-button-next.banner-slider-arrow,.banner-slider-button-prev.banner-slider-arrow{
             display: none !important; }
             
             /* Pagination bullet height for larger screens */
             .banner-slider-pagination .swiper-pagination-bullet{
               height: 6px !important;
             }
             
             /* Pagination bullet height for smaller devices */
             @media (max-width: 1023px) {
               .banner-slider-pagination .swiper-pagination-bullet{
                 height: 3px !important;
               }
             }
        `}
      </style>
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
                left={{ base: "0" }}
                right={{ large: "0" }}
                justifyContent={{ large: "flex-start" }}
              >
                <Flex
                  direction={{ base: "column" }}
                  width={"100%"}
                  padding={{ base: "1.5rem 0.94rem 2.38rem 0.94rem" }}
                  gap={{ base: "1.0625rem" }}
                  alignItems={{ base: "center", large: "flex-start" }}
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
                        className="title"
                        fontFamily={"var(--font-ToyotaDisplay)"}
                        color={"white"}
                        textAlign={{ base: "center" }}
                        fontSize={{ base: "2rem", large: "3.5rem" }}
                        fontWeight={{ base: "400" }}
                        lineHeight={{ base: "130%", large: "110%" }}
                        maxWidth={{ base: "14ch" }}
                      >
                        {slide.title}
                      </Heading>
                    </Flex>

                    <Button
                      className="button"
                      fontFamily={"var(--font-ToyotaDisplay)"}
                      color={"white"}
                      textAlign={{ base: "center" }}
                      fontSize={{ base: " 0.875rem", large: "1.125rem" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "140%", large: "100%" }}
                      backgroundColor={{ base: "#1F2C40" }}
                      border={{ base: "none" }}
                      letterSpacing={"0"}
                      borderRadius={{ base: "0" }}
                      padding={{ base: "5px 15px", large: "0.75rem" }}
                      width={{ base: "278px", large: "27.5625rem" }}
                    >
                      {slide.button}
                    </Button>
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
