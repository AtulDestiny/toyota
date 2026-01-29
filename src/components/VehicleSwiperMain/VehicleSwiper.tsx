import React, { useState, CSSProperties } from "react";
import {
  View,
  Text,
  Flex,
  Image,
  Button as AmplifyButton,
} from "@aws-amplify/ui-react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { VehicleCard } from "@/components/Cards/VehicleCard/VehicleCard";
import Button from "../Layout/Button/Button";
import { ResponsiveStyle } from "@aws-amplify/ui-react";
import { VehicleCardMain } from "../Cards/VehicleCardMain/VehicleCardMain";
import { ModalStepperCopy } from "../ModalStepper";

interface VehicleSwiperAllProps {
  vehicles: VehicleCardProps[];
  viewStyle?: {
    margin?: ResponsiveStyle<string>;
    padding?: ResponsiveStyle<string>;
    maxWidth?: ResponsiveStyle<string>;
    backgroundColor?: string;
  };
  title?: string;
  note?: string;
  onlyCotizar?: boolean;
  isOnClickEvent?: boolean;
  isOnClickEventFucntion?: any;
}
export enum VehicleCardTheme {
  "dark" = "dark",
  "light" = "light",
}

export interface VehicleCardProps {
  id: number;
  index?: number;
  theme?: VehicleCardTheme;
  name: string;
  titleStyle?: {
    fontSize?: ResponsiveStyle<string>;
    lineHeight?: ResponsiveStyle<string>;
    fontFamily?: ResponsiveStyle<string>;
    fontWeight?: ResponsiveStyle<string | number>;
    color?: ResponsiveStyle<string>;
    fontStyle?: ResponsiveStyle<string>;
  };

  YearandTypeStyle?: {
    fontSize?: ResponsiveStyle<string>;
    lineHeight?: ResponsiveStyle<string>;
    fontFamily?: ResponsiveStyle<string>;
    fontWeight?: ResponsiveStyle<string | number>;
    color?: ResponsiveStyle<string>;
    fontStyle?: ResponsiveStyle<string>;
  };

  descriptionStyle?: {
    fontSize?: ResponsiveStyle<string>;
    lineHeight?: ResponsiveStyle<string>;
    fontWeight?: ResponsiveStyle<string | number>;
    color?: ResponsiveStyle<string>;
    fontStyle?: ResponsiveStyle<string>;
    fontFamily?: ResponsiveStyle<string>;
  };

  priceStyle?: {
    fontSize?: ResponsiveStyle<string>;
    lineHeight?: ResponsiveStyle<string>;
    fontWeight?: ResponsiveStyle<string | number>;
    fontFamily?: ResponsiveStyle<string>;
    color?: ResponsiveStyle<string>;
    fontStyle?: ResponsiveStyle<string>;
  };
  year: string;
  type: string;
  price: string;
  description: string;
  img: string;
  imgMobile: string;
  style?: CSSProperties;
  className?: string;
  bgColor?: string;
  objectPosition?: string;
  link?: string;
  isOnClickEvent?: boolean;
  cotizarLink?: string;
}

export default function VehicleSwiperAll({
  vehicles,
  title = "Explora todos los vehículos",
  viewStyle,
  note,
  onlyCotizar,
  isOnClickEvent = false,
}: VehicleSwiperAllProps) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isOpen, setIsOpen] = useState(false)
  const [vehicleInfo, setIsvehicleInfo] = useState(null)

  if (!vehicles || vehicles.length === 0) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRedirect = () => {
    console.log("Redirecting...");
    setIsOpen(false);
  };

  return (
    <>
    {
      isOpen && isOnClickEvent && (
        <ModalStepperCopy
          isOpen={isOpen}
          onClose={handleClose}
          onRedirect={handleRedirect}
          model="Corolla Cross"
          vehicleInfo={vehicleInfo}
          version="1.8 XEi CVT"
          amplifyConfig={
            {
              // Aquí iría la configuración de Amplify si la necesitas
            }
          }
        />
      )
    }
    <View
      className="vehicles-swiper-all"
      padding={{ base: "2rem 1rem", xl: "60px 0 80px 0" }}
      backgroundColor={viewStyle?.backgroundColor ?? undefined}
    >
      {vehicles.length > 0 ? (
        <View
          // key={category + "2 "}
          maxWidth={{ base: "302px", medium: "100%", xl: "100%" }}
          maxHeight={{ medium: "max-content", xl: "auto" }}
          minHeight={{ base: "505px", medium: "550px", xl: "auto" }}
          margin={{ base: "0 auto", xl: "" }}
          overflow={{ base: "hidden", xl: "" }}
        >
          <Swiper
            loop={true}
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={8}
            slidesOffsetAfter={0}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 16,
                centeredSlides: false,
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 20,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: "auto",
                spaceBetween: 30,
                centeredSlides: false,
              },
              1250: {
                slidesPerView: "auto",
                spaceBetween: 51,
                centeredSlides: false,
              },
              1366: {
                slidesPerView: "auto",
                spaceBetween: 51,
                centeredSlides: false,
              },
              1440: {
                slidesPerView: "auto",
                spaceBetween: 51,
                centeredSlides: false,
              },
              1600: {
                slidesPerView: "auto",
                spaceBetween: 51,
                centeredSlides: false,
              },
            }}
            navigation={{
              nextEl: ".vehicles-tabs-next",
              prevEl: ".vehicles-tabs-prev",
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
            modules={[Navigation]}
          >
            {vehicles.map((vehicle, i) => (
              <SwiperSlide
                key={vehicle.id}
                className="vehicles-slide"
                style={{
                  width: "auto", // Important
                  flexShrink: 0, // Prevent shrinking
                }}
              >
                <VehicleCardMain
                  {...vehicle}
                  index={i}
                  isOnClickEvent={isOnClickEvent}
                  setIsOpen={setIsOpen}
                  setIsvehicleInfo={setIsvehicleInfo}
                  onlyCotizar={onlyCotizar}
                  titleStyle={{
                    fontFamily: {
                      base: "var(--font-ToyotaType-Regular)",
                      medium: "var(--font-toyotaDisplay)",
                      xl: "var(--font-toyotaDisplay)",
                    },
                    fontWeight: {
                      base: "700",
                      medium: "400",
                      xl: "400",
                    },
                    fontSize: {
                      base: "22px",
                      xl: "28px",
                    },
                    lineHeight: {
                      base: "24px",
                      xl: "41.6px",
                    },
                  }}
                  YearandTypeStyle={{
                    fontFamily: {
                      base: "var(--font-ToyotaType-Regular)",
                      medium: "var(--font-ToyotaType-Regular)",
                      xl: "var(--font-ToyotaType-Regular)",
                    },
                    fontWeight: {
                      base: "400",
                      medium: "",
                      xl: "",
                    },
                    fontSize: { base: "9px", xl: "14px" },
                    fontStyle: { base: "normal", xl: "normal" },
                    lineHeight: { base: "normal", xl: "normal" },
                  }}
                  descriptionStyle={{
                    fontFamily: {
                      base: "var(--font-toyotaDisplay)",
                      medium: "var(--font-toyotaDisplay)",
                      xl: "var(--font-toyotaDisplay)",
                    },
                    fontWeight: {
                      base: "400",
                      medium: "",
                      xl: "",
                    },
                    fontSize: { base: "14px", xl: "14px" },
                    fontStyle: { base: "normal", xl: "normal" },
                    lineHeight: { base: "19.6px", xl: "21px" },
                  }}
                  priceStyle={{
                    fontSize: { base: "18px", xl: "18px" },
                    lineHeight: { base: "normal", xl: "25.67px" },
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </View>
      ) : (
        <Text textAlign="center" marginTop="2rem">
          No hay vehículos en esta categoría.
        </Text>
      )}

      {note && (
        <Text
          marginTop={{ base: "1.5rem", medium: "2rem" }}
          marginBottom={"2rem"}
          textAlign={{ medium: "center" }}
          fontSize={{ base: "9px", medium: "12px" }}
          fontWeight={{ base: 400 }}
          lineHeight={{ base: "100%" }}
        >
          {note}
        </Text>
      )}

      <View>
        <Flex
          justifyContent={{ base: "space-between", xl: "center" }}
          alignItems={"center"}
          width={"100%"}
          maxWidth={{ base: "21.625rem", xl: "max-content" }}
          gap={{ xl: "140px" }}
          margin={{
            base: `${note ? "0" : "2.5rem"} auto 0`,
            xl: `${note ? "0" : "87px"} auto 0`,
          }}
        >
          <AmplifyButton
            className="vehicles-tabs-prev arrowCustom arrowCustom--prev"
            color={"transparent"}
            padding={"0"}
            width={"3.4375rem"}
            height={"1.875rem"}
          >
            <Image
              src="/images/arrow-simple-prev.svg"
              alt="Arrow prev"
              width={"1.3125rem"}
              height={".8125rem"}
            />
          </AmplifyButton>
          <Text
            fontWeight={400}
            fontSize={{ base: "18px", xl: "" }}
            lineHeight={{ base: "normal", xl: "" }}
            fontStyle={{ base: "normal", xl: "" }}
            fontFamily="var(--font-ToyotaType-Regular)"
          >
            {currentSlide} de {vehicles.length}
          </Text>
          <AmplifyButton
            className="vehicles-tabs-next arrowCustom arrowCustom--next"
            color={"transparent"}
            padding={"0"}
            width={"3.4375rem"}
            height={"1.875rem"}
          >
            <Image
              src="/images/arrow-simple-next.svg"
              alt="Arrow next"
              width={"1.3125rem"}
              height={".8125rem"}
            />
          </AmplifyButton>
        </Flex>
      </View>
    </View>
    </>
  );
}
