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

interface Slide {
  imageMobile: string;
  imageDesktop: string;
  title: string;
  titleSecondLine: string;
  button: string;
  showButton?: boolean;
}

interface CatalogoPostventaBannerProps {
  slides?: Slide[];
}

const sliderSlides = [
  {
    imageMobile: "/images/genuinos mobile_interna.jpg",
    imageDesktop: "/images/banner_Repuestos.jpg",
    title: "",
    titleSecondLine: "",
    button: "de cada parte de tu vehículo",
    
  },
];

export function CatalogoPostventaBanner({
  slides = sliderSlides,
}: CatalogoPostventaBannerProps): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });

  return (
    <>
      <style>
        {`
          .catalogo-banner-container .swiper-pagination {
            position: absolute !important;
            bottom: ${isMobile ? "15px" : "20px"} !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            z-index: 10 !important;
          }
          
          .catalogo-banner-container .swiper-pagination-bullet {
            background-color: rgba(255, 255, 255, 0.5) !important;
            opacity: 1 !important;
          }
          
          .catalogo-banner-container .swiper-pagination-bullet-active {
            background-color: white !important;
          }

          /* Hide navigation arrows */
          .catalogo-banner-container .swiper-button-next,
          .catalogo-banner-container .swiper-button-prev {
            display: none !important;
          }
            .banner-slider-button-prev.banner-slider-arrow, .banner-slider-button-next.banner-slider-arrow{
            display:none;}
           .banner-slider-pagination .swiper-pagination-bullet{
              width : 468.15px !important;
              height:6px !important;
            }
@media (max-width: 720px) {
            .banner-slider-pagination{
              width : 53.35% !important
            }
          }
        `}
      </style>
      <View position="relative" className="catalogo-banner-container">
        <BannerSlider>
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              style={{
                position: "relative",
                height: isMobile ? "100%" : "100%",
              }}
            >
              <Image
                src={isMobile ? slide.imageMobile : slide.imageDesktop}
                alt={slide.title}
                className="image"
                width={"100%"}
                height={{ base: "100%", large: "100%" }}
                objectFit="cover"
              />

              <Flex
                className="overlay"
                width={{ base: "100%", large: "80%" }}
                height={"100%"}
                margin={{ base: "0 auto", xl: "0 190px 0 190px" }}
                position={{ base: "absolute" }}
                top={{ base: "0" }}
                left={{ base: "0" }}
                right={{ large: "0" }}
                justifyContent={{ large: "flex-start" }}
              >
                <Flex
                  direction={{ base: "column" }}
                  width={"100%"}
                  padding={{ base: "28px 0.94rem" }}
                  gap={{ base: "1.0625rem" }}
                  alignItems={{ base: "center", large: "flex-start" }}
                  justifyContent={{ large: "center" }}
                >
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "28px", large: "2rem" }}
                    alignItems={{ base: "center" }}
                  >
                    <Flex
                      direction={{ base: "column" }}
                      gap={{ base: "0", large: "0.75rem" }}
                    >
                      <Heading
                        level={1}
                        className="title"
                        fontFamily="var(--font-ToyotaType-Regular)"
                        color={"white"}
                        textAlign={{ base: "center" }}
                        fontSize={{ base: "2rem", large: "3.5rem" }}
                        fontWeight={{ base: "400" }}
                        lineHeight={{ base: "130%", large: "110%" }}
                        letterSpacing={"-2%"}
                      >
                        {isMobile ? (
                          <>
                            {slide.title}
                            <br />
                            {slide.titleSecondLine}
                          </>
                        ) : (
                          `${slide.title} ${slide.titleSecondLine}`
                        )}
                      </Heading>
                    </Flex>

                    {slide.showButton && (
                      <Button
                        className="button"
                        fontFamily={"var(--font-toyotaDisplay)"}
                        color={"white"}
                        textAlign={{ base: "center" }}
                        fontSize={{ base: " 0.875rem", large: "1.125rem" }}
                        fontWeight={{ base: "400" }}
                        lineHeight={{ base: "140%", large: "100%" }}
                        backgroundColor={{ base: "#1F2C40" }}
                        border={{ base: "none" }}
                        letterSpacing={"0"}
                        borderRadius={{ base: "0" }}
                        padding={{ base: "5.204px 0", large: "0.75rem" }}
                        width={{ base: "267px", large: "310px" }}
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
