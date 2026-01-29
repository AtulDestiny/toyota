"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MainSlider.css";
import { Heading, View, Text, Flex, Image, Link } from "@aws-amplify/ui-react";
import Button from "../Layout/Button/Button";

interface Slide {
  imageMobile: string;
  imageDesktop: string;
  title: string;
  description: string;
  videoUrl?: string;
  showButton?: boolean;
  buttonLink?: string;
  link?: string;
}

interface SliderConfig {
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  isButton?: boolean;
  autoplay?: {
    delay: number;
    disableOnInteraction?: boolean;
  };
  pagination?: {
    clickable: boolean;
  };
  navigation?: boolean;
}

interface sliderImage {
  width: string | number;
  height: string | number;
  minHeight?: string | number;
  minWidth?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
  objectPostion?: string;
}

interface SliderStyle {
  minHeight?: string | number;
  height?: string | number;
  image?: sliderImage;
}

interface MainSliderProps {
  slides?: Slide[];
  sliderConfig?: SliderConfig;
  alignBottom?: boolean;
  isPlayicon?: boolean;
  containerProps?: SliderStyle;
  showNavigationArrows?: boolean;
}

function getYouTubeId(url: string): string {
  const match = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}

const MainSlider: React.FC<MainSliderProps> = ({
  slides,
  sliderConfig,
  alignBottom = false,
  isPlayicon = true,
  showNavigationArrows = false,
  containerProps = {},
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef<SwiperRef>(null);

  const defaultSlides: Slide[] = [
    {
      imageMobile:
        "/images/home-banners/conectados-con-todo-lo-que-se-mueve.png",
      imageDesktop:
        "/images/home-banners/conectados-con-todo-lo-que-se-mueve--desktop.png",
      title: "",
      description: "",
    },
    {
      imageMobile: "/images/home-banners/conneced-web--mobile.png",
      imageDesktop: "/images/home-banners/conneced-web--desktop.png",
      title: "",
      description: "",
      link: "/mi-toyota/servicios-conectados",
    },
    {
      imageMobile: "/images/home-banners/seguros-toyota--mobile.jpg",
      imageDesktop: "/images/home-banners/seguros-toyota--desktop.jpg",
      title: "",
      description: "",
      link: "/cotiza-tu-toyota/seguro-toyota",
    },
    {
      imageMobile: "/images/home-banners/f-takata--mobile.png",
      imageDesktop: "/images/home-banners/f-takata--desktop.png",
      title: "",
      description: "",
      link: "/mi-toyota/campanas-de-seguridad-y-servicios",
    },
    {
      imageMobile: "/images/home-banners/kinto--mobile.png",
      imageDesktop: "/images/home-banners/kinto--desktop.png",
      title: "",
      description: "",
      link: "https://www.kinto-mobility.com.co/",
    },
  ];

  const defaultConfig: SliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    isButton: true,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      clickable: true,
    },
    navigation: true,
  };

  const mergedSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const config = { ...defaultConfig, ...sliderConfig };

  const togglePlayPause = () => {
    if (isPlaying) {
      swiperRef?.current?.swiper?.autoplay?.stop();
    } else {
      swiperRef?.current?.swiper?.autoplay?.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View
      className="custom-slider-container"
      width="100%"
      height={
        containerProps == null
          ? { medium: "50vh", large: "50vh", xl: "39.375rem" }
          : containerProps.height
      }
      minHeight={
        containerProps == null ? { xl: "630px" } : containerProps.minHeight
      }
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={config.spaceBetween}
        slidesPerView={config.slidesPerView}
        loop={config.loop}
        autoplay={config.autoplay}
        navigation={
          showNavigationArrows
            ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
            : false
        }
        pagination={
          config.pagination
            ? {
                el: ".custom-pagination-main",
                clickable: config.pagination.clickable,
                type: "bullets",
              }
            : false
        }
      >
        {mergedSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link
              href={slide.link ? slide.link.trim() : "#"}
              target={
                slide.link && slide.link.startsWith("http") ? "_blank" : "_self"
              }
              style={{ cursor: slide.link ? "pointer" : "default" }}
              className="slide-content"
            >
              <div className="top-overlay" />
              <div className="bottom-overlay" />

              {slide.videoUrl ? (
                slide.videoUrl.includes("youtube.com") ? (
                  <iframe
                    src={
                      slide.videoUrl +
                      "?autoplay=1&mute=1&loop=1&playlist=" +
                      getYouTubeId(slide.videoUrl) +
                      "&controls=0&modestbranding=1&showinfo=0&rel=0"
                    }
                    title={slide.title}
                    className="slide-video responsive-iframe"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                ) : (
                  <video
                    className="slide-video"
                    src={slide.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )
              ) : (
                <picture className="d-flex">
                  <source
                    srcSet={slide.imageDesktop}
                    media="(min-width: 1250px)"
                  />
                  <img
                    src={slide.imageMobile}
                    alt={slide.title}
                    className={
                      (containerProps.image !== null
                        ? "low-slider-image"
                        : "") + " slide-image"
                    }
                    style={
                      containerProps.image !== null ? containerProps.image : {}
                    }
                  />
                </picture>
              )}
              <View
                className="slide-overlay"
                bottom={{ xl: "2.875rem" }}
                top={{
                  base: "",
                  xl: alignBottom ? "auto" : "0",
                  xxl: alignBottom ? "auto" : "0",
                }}
              >
                <Heading
                  fontFamily={{
                    base: "var(--font-toyotaDisplay)",
                    medium: "var(--font-toyotaDisplay)",
                    xl: "var(--font-ToyotaType-Regular)",
                  }}
                  fontSize={{ base: "32px", medium: "36px", xl: "56px" }}
                  fontWeight={{ base: "400", medium: "400", xl: "400" }}
                  fontStyle={{ base: "normal", medium: "", xl: "" }}
                  lineHeight={{
                    base: "130%",
                    medium: "130%",
                    xl: "110.00000000000001%",
                  }}
                  textAlign={{ base: "center", medium: "center", xl: "center" }}
                  color={{ base: "#FFF", medium: "#FFF", xl: "#FFF" }}
                  letterSpacing={{
                    base: "0px",
                    medium: "-1.12px",
                    xl: "-2%",
                  }}
                  style={{
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                    verticalAlign: "middle",
                  }}
                >
                  {slide.title}
                </Heading>

                <div className="slide-container">
                  <Text
                    className="slide-description"
                    color={{ base: "#FFF", medium: "#FFF", xl: "#FFF" }}
                    textAlign={{
                      base: "center",
                      medium: "",
                      xl: "",
                    }}
                    fontFamily={{
                      base: "var(--font-ToyotaType-Regular)",
                      medium: "",
                      xl: "",
                    }}
                    fontSize={{
                      base: "18px",
                      medium: "",
                      xl: "",
                    }}
                    fontStyle={{
                      base: "normal",
                      medium: "",
                      xl: "",
                    }}
                    fontWeight={{
                      base: "500",
                      medium: "",
                      xl: "",
                    }}
                    lineHeight={{
                      base: "31.37px",
                      medium: "31.37px",
                      xl: "31.37px",
                    }}
                  >
                    {slide.description}
                  </Text>
                  {slide.showButton && (
                    <Button
                      type="button"
                      color="red"
                      minWidth={{ base: "175px", xl: "" }}
                      maxHeight={{ base: "40px", xl: "" }}
                      fontFamily={{ base: "", xl: "var(--font-roboto)" }}
                      className="slide-button"
                      fontSize={{ base: "14px", xl: "16px" }}
                      fontWeight={{ base: "500", xl: "500" }}
                      padding={{ base: "10px 24px", xl: "" }}
                      lineHeight={{
                        base: "20px",
                        xl: "20px",
                      }}
                      margin={{ base: "", xl: "50px 0 0" }}
                      onClick={() => window.open(slide.buttonLink, "_self")}
                    >
                      Descubre más
                    </Button>
                  )}
                </div>
              </View>
            </Link>
          </SwiperSlide>
        ))}
        <div className="custom-pagination custom-pagination-main"></div>
      </Swiper>

      {showNavigationArrows && (
        <>
          <div className="swiper-button-prev custom-arrow"></div>
          <div className="swiper-button-next custom-arrow"></div>
        </>
      )}

      {/* Botón de Pausa/Reanudación */}
      {isPlayicon && (
        <Flex
          as="button"
          className="play-pause-btn"
          onClick={togglePlayPause}
          width={"3.4375rem"}
          minHeight={"1.875rem"}
          padding={"0"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            src={isPlaying ? "/svgs/pause.svg" : "/svgs/play.svg"}
            alt={isPlaying ? "Pause" : "Play"}
            width={"6px"}
            minHeight={".625rem"}
          />
        </Flex>
      )}
    </View>
  );
};

export default MainSlider;
