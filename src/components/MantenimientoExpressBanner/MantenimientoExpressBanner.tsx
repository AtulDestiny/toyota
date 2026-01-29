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

export function MantenimientoExpressBanner(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });
  const slides = [
    {
      imageMobile: "/images/mantenimiento-express__banner--mobile.png",
      imageDesktop: "/images/mantenimiento-express__banner--desktop.png",
      subtitle: "Mantenimiento Express",
      title: "Cuidamos tu vehículo",
      button: "tanto como tú",
    },
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
                padding={{ base: "2.38rem 0.94rem" }}
                gap={{ base: "1.0625rem" }}
                alignItems={{ base: "center" }}
                justifyContent={{ base: "center",xl: "center" }}
                // backgroundColor={{ base: "white", xl: "transparent" }}  
                // boxShadow={{ base: "lg", xl: "none" }}    
                // borderRadius={{ base: "12px", xl: "0" }}  
              >
                <Flex
                  direction={{ base: "column" }}
                  gap={{ large: ".75rem" }}
                  alignItems={{ base: "center" }} 
                  backgroundColor={{ base: "rgba(0,0,0,0.4)", xl: "transparent" }} 
                >
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "0", large: "0.75rem" }}
                    
                  >
                    <Heading
                      level={2}
                      className="subtitle"
                      fontFamily={"var(--font-ToyotaDisplay)"}
                      color={{ base: "white" }}
                      textAlign={{ base: "center" }}
                      fontSize={{ base: "0.875rem", large: "2rem" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "140%", large: "130%" }}
                     
                    >
                      {slide.subtitle}
                    </Heading>

                    <Heading
                      level={1}
                      className="title"
                      fontFamily={"var(--font-ToyotaDisplay)"}
                      color={{ base: "white" }}
                      textAlign={{ base: "center" }}
                      fontSize={{ base: "2rem", large: "3.5rem" }}
                      fontWeight={{ base: "400", xl: "400" }}
                      lineHeight={{ base: "130%", large: "110%" }}
                      letterSpacing={{ large: "-0.07rem" }}
                      maxWidth={{ base: "19ch" }}
                       style={{
                        textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
                      }}
                    >
                      {slide.title}
                    </Heading>
                  </Flex>
                </Flex>
                <Button
                  className="button"
                  fontFamily={"var(--font-ToyotaDisplay)"}
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
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </BannerSlider>
    </View>
  );
}
