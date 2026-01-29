"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  View,
  Link, // Added Link for better href support
} from "@aws-amplify/ui-react";

import "swiper/css";
import "swiper/css/pagination";
import "@aws-amplify/ui-react/styles.css";
import "./MainSlider.css";

import { colors } from "@/theme/colors";

/** * TYPES */
export type BannerFeature = {
  icon: string;
  label: string;
  available: boolean;
};

export interface BannerSlide {
  imageMobile?: string;
  imageDesktop?: string;
  videoUrl?: {
    mobile: string;
    desktop: string;
  };
  alt?: string;
  link?: string;
}

interface BannerWithSwiperProps {
  slides: BannerSlide[];
  features?: BannerFeature[];
  title?: string;
  price?: string;
  height?: string;
  autoplayDelay?: number;
}

function getYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]{11})/
  );
  return match ? match[1] : "";
}

const defaultFeatures: BannerFeature[] = [
  {
    icon: "/images/abs.svg",
    label: "SISTEMA ANTIBLOQUEO DE FRENOS",
    available: true,
  },
  {
    icon: "/images/estability.svg",
    label: "CONTROL ELECTRÓNICO DE ESTABILIDAD",
    available: true,
  },
  {
    icon: "/images/front-alert.svg",
    label: "ALERTA DE COLISIÓN FRONTAL",
    available: true,
  },
  {
    icon: "/images/basy-seat.svg",
    label: "ISOFIX\nSISTEMA DE SUJECIÓN INFANTIL",
    available: false,
  },
  {
    icon: "/images/air-bags.svg",
    label: "BOLSAS DE AIRE (8)",
    available: true,
  },
];

export const BannerWithSwiperVideo = ({
  slides,
  features = defaultFeatures,
  title = "Land Cruiser Prado",
  price = "Desde $303.500.000*",
  height,
  autoplayDelay = 5000,
}: BannerWithSwiperProps) => {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef<SwiperRef>(null);
  const hasMultipleSlides = slides.length > 1;

  const togglePlayPause = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link trigger if button is inside link area
    if (isPlaying) {
      swiperRef?.current?.swiper?.autoplay?.stop();
    } else {
      swiperRef?.current?.swiper?.autoplay?.start();
    }
    setIsPlaying(!isPlaying);
  };

  const renderSlideMedia = (slide: BannerSlide) => {
    const activeVideo = isMobile
      ? slide.videoUrl?.mobile
      : slide.videoUrl?.desktop;
    const activeImage = isMobile ? slide.imageMobile : slide.imageDesktop;

    if (activeVideo) {
      if (
        activeVideo.includes("youtube.com") ||
        activeVideo.includes("youtu.be")
      ) {
        const videoId = getYouTubeId(activeVideo);
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              transform: "scale(1.3)",
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        );
      }
      if (activeVideo.includes("vimeo.com")) {
        return (
          <iframe
            src={`${activeVideo}${activeVideo.includes("?") ? "&" : "?"}autoplay=1&muted=1&loop=1&background=1`}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen"
          />
        );
      }
      return (
        <video
          src={activeVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    }

    return (
      <Image
        src={activeImage}
        alt={slide.alt || title}
        width="100%"
        height="100%"
        objectFit="cover"
      />
    );
  };

  return (
    <View
      position={"relative"}
      color={"white"}
      height={{ base: height ? "auto" : "624px", xl: height || "630px" }}
      overflow={"hidden"}
      backgroundColor="black"
      className="custom-slider-container"
    >
      <Swiper
        key={slides.length}
        ref={swiperRef}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={hasMultipleSlides}
        autoplay={
          hasMultipleSlides
            ? { delay: autoplayDelay, disableOnInteraction: false }
            : false
        }
        pagination={
          hasMultipleSlides
            ? {
                clickable: true,
                el: ".custom-pagination-main",
                type: "bullets",
              }
            : false
        }
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.link ? (
              <Link
                href={slide.link}
                display="block"
                width="100%"
                height="100%"
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                {renderSlideMedia(slide)}
              </Link>
            ) : (
              <View width="100%" height="100%">
                {renderSlideMedia(slide)}
              </View>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultipleSlides && (
        <>
          <View
            className="swiper-button-prev custom-arrow"
            style={{ zIndex: 25 }}
          />
          <View
            className="swiper-button-next custom-arrow"
            style={{ zIndex: 25 }}
          />
        </>
      )}

      <Flex
        direction={{ base: "column-reverse", large: "row" }}
        width={"100%"}
        height="100%"
        position={"absolute"}
        top="0"
        left="0"
        style={{ zIndex: 10, pointerEvents: "none" }}
        padding={{ base: "1.6875rem .9375rem", xl: "5.9375rem 2.25rem 2rem" }}
        backgroundImage={{ xl: colors.theme.shadow }}
        alignItems="flex-end"
      >
        <View
          width={"100%"}
          maxWidth={"max-content"}
          style={{ pointerEvents: "auto" }}
        >
          <Heading
            level={3}
            color={"inherit"}
            fontSize={{ base: "32px", xl: "xxxxl" }}
            fontWeight={"400"}
            fontFamily={"var(--font-toyotaDisplay)"}
          >
            {title}
          </Heading>
          <Text
            color={"inherit"}
            fontSize={{ base: "sm", xl: "ml" }}
            marginBottom={{ base: "14px", xl: ".5rem" }}
            fontFamily={"var(--font-toyotaDisplay)"}
          >
            {price}
          </Text>
          <Text
            color={"#E8EEF2"}
            fontSize={{ base: "9px", xl: "ss" }}
            fontFamily={"var(--font-ToyotaType-Regular)"}
          >
            *Precio sugerido al público. Aplican Términos y Condiciones.
            *Imágenes de referencia.
          </Text>
        </View>

        <View width={"100%"} style={{ pointerEvents: "auto" }}>
          {!isMobile && (
            <Grid
              templateColumns={"repeat(5, auto)"}
              gap={{ base: "1rem", xl: "4.75rem" }}
              justifyContent={"center"}
              alignItems={"flex-start"}
              margin={"auto auto 0"}
            >
              {features.map((feature, index) => (
                <Flex
                  direction={"column"}
                  justifyContent={"flex-end"}
                  key={index}
                  backgroundColor={"transparent"}
                  width={{ base: "48px", xl: "80px" }}
                  height={{ base: "auto" }}
                  textAlign={"center"}
                  padding={"0"}
                  gap={"0.25rem"}
                >
                  <View position={"relative"}>
                    <Image
                      src={feature.icon}
                      alt={feature.label}
                      width={{ base: "50px", xl: "90px" }}
                      aspectRatio={1}
                      style={{
                        filter:
                          "invert(100%) sepia(34%) saturate(584%) hue-rotate(179deg) brightness(114%) contrast(107%)",
                      }}
                    />
                    <Image
                      src={
                        feature.available
                          ? "/images/check.svg"
                          : "/images/not-check.svg"
                      }
                      alt={feature.available ? "Disponible" : "No disponible"}
                      width={{ base: "10px", xl: "21.2px" }}
                      aspectRatio={1}
                      position={"absolute"}
                      left={{ base: "33px", xl: "50px" }}
                      style={{
                        filter:
                          "invert(100%) sepia(34%) saturate(584%) hue-rotate(179deg) brightness(114%) contrast(107%)",
                      }}
                    />
                  </View>
                  <Text
                    fontSize={{ base: "6px", xl: "9px" }}
                    textTransform={"uppercase"}
                    color={"inherit"}
                    fontFamily={"var(--font-toyotaDisplay)"}
                    fontWeight={"400"}
                    lineHeight={"100%"}
                    letterSpacing={"0"}
                  >
                    {feature.label}
                  </Text>
                </Flex>
              ))}
            </Grid>
          )}
        </View>
      </Flex>

      {hasMultipleSlides && (
        <View
          className="custom-pagination custom-pagination-main"
          position="absolute"
          bottom="20px"
          style={{ zIndex: 20 }}
        />
      )}
      {hasMultipleSlides && (
        <Flex
          as="button"
          className="play-pause-btn"
          position="absolute"
          bottom="1.5rem"
          right="1.5rem"
          onClick={togglePlayPause}
          width={"3.4375rem"}
          height={"1.875rem"}
          justifyContent={"center"}
          alignItems={"center"}
          style={{ zIndex: 30, border: "none", cursor: "pointer" }}
        >
          <Image
            src={isPlaying ? "/svgs/pause.svg" : "/svgs/play.svg"}
            alt="Play/Pause"
            width={"6px"}
          />
        </Flex>
      )}
    </View>
  );
};

export default BannerWithSwiperVideo;
