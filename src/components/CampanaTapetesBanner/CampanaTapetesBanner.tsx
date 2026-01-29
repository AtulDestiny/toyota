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

export function CampanaTapetesBanner(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });
  const slides = [
    {
      imageMobile: "/images/campana-tapetes-banner.png",
      imageDesktop: "/images/campana-tapetes-banner--desktop.png",
      title: "Asegúrate de instalar",
      description: "Es muy fácil",
      button: "correctamente tus tapetes",
    },
    // {
    //   imageMobile: "/images/campana-tapetes-banner.png",
    //   imageDesktop: "/images/campana-tapetes-banner--desktop.png",
    //   title: "Asegúrate de instalar",
    //   description: "Es muy fácil",
    //   button: "correctamente tus tapetes",
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
                padding={{ base: "2.38rem 0.94rem", medium:"10.38rem 0.94rem", xl: "2.38rem 0.94rem", }}
                gap={{ base: "1.0625rem" }}
                alignItems={{ base: "center", large: "flex-start" }}
                justifyContent={{ large: "center" }}
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
                      fontFamily={{
                        base: "var(--font-toyotaDisplay)",
                        xl: "var(--font-ToyotaType-Regular)",
                      }}
                      color={{ base: "white", large: "black" }}
                      textAlign={{ base: "center" }}
                      fontSize={{ base: "2rem", large: "40px" ,xl:"46px" ,xxl:"56px" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "130%", large: "110%" }}
                      letterSpacing={{ base: "0", large: "-2px" }}
                    >
                      {slide.title}
                    </Heading>
                  </Flex>

                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "0", large: ".75rem" }}
                  >
                    <Button
                      className="button"
                      fontFamily={{
                        base: "var(--font-toyotaDisplay)",
                        xl: "var(--font-ToyotaType-Regular)",
                      }}
                      color={"white"}
                      textAlign={{ base: "center" }}
                      fontSize={{ base: " 0.875rem", large: "18px" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "140%", large: "100%" }}
                      backgroundColor={{ base: "#D42224" }}
                      border={{ base: "none" }}
                      letterSpacing={"0"}
                      borderRadius={{ base: "0" }}
                      padding={{ base: "5px 20px", large: "5px 20px" }}
                      height={{ base: "30px", xl: "50px" }}
                      width={{ base: "212px", large: "340px" ,xl:"441px" }}
                    >
                      {slide.button}
                    </Button>

                    <Text
                      fontFamily={"var(--font-ToyotaDisplay)"}
                      color={{ base: "white", large: "black" }}
                      textAlign={"center"}
                      fontSize={{ base: "1.375rem", large: "32px" }}
                      fontWeight={"400"}
                      lineHeight={{ base: "100%", large: "130%" }}
                      letterSpacing={"0"}
                    >
                      {slide.description}
                    </Text>
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
