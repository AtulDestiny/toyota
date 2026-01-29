"use client";
import { useState } from "react";
import {
  View,
  Flex,
  Button as AmplifyButton,
  Text,
  Image,
} from "@aws-amplify/ui-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { VehicleCard } from "../Cards/VehicleCard/VehicleCard";

// Default vehicle list
const defaultVehicles = [
  {
    id: 1,
    bgColor: "#1F2C40",
    name: "Rav 4",
    year: "2024",
    type: "Gasolina o Híbrido",
    price: "$198.500.000 COP",
    description: "Carga tu próxima aventura",
    img: "/images/yaris.png",
  },
  {
    id: 2,
    bgColor: "#1F2C40",
    name: "Fortuner",
    year: "2024",
    type: "Gasolina o Diesel",
    price: "$230.500.000 COP",
    description: "Tu mejor inversión marcha sobre ruedas",
    img: "/images/yaris.png",
  },
  {
    id: 3,
    bgColor: "#1F2C40",
    name: "Rav 4",
    year: "2024",
    type: "Gasolina o Híbrido",
    price: "$198.500.000 COP",
    description: "Carga tu próxima aventura",
    img: "/images/yaris.png",
  },
  {
    id: 4,
    bgColor: "#1F2C40",
    name: "Fortuner",
    year: "2024",
    type: "Gasolina o Diesel",
    price: "$230.500.000 COP",
    description: "Tu mejor inversión marcha sobre ruedas",
    img: "/images/yaris.png",
  },
  {
    id: 5,
    bgColor: "#1F2C40",
    name: "Rav 4",
    year: "2024",
    type: "Gasolina o Híbrido",
    price: "$198.500.000 COP",
    description: "Carga tu próxima aventura",
    img: "/images/yaris.png",
  },
  {
    id: 6,
    bgColor: "#1F2C40",
    name: "Fortuner",
    year: "2024",
    type: "Gasolina o Diesel",
    price: "$230.500.000 COP",
    description: "Tu mejor inversión marcha sobre ruedas",
    img: "/images/yaris.png",
  },
];

interface Vehicle {
  id: number;
  name: string;
  year: string;
  type: string;
  price: string;
  description: string;
  img: string;
  bgColor?: string;
}

interface viewStyleProps {
  margin?: string;
  padding?: string;
  maxWidth?: string;
}

interface VehiclesSwiperProps {
  isDesktop?: number;
  vehicles?: Vehicle[] | null;
  viewStyle?: viewStyleProps;
}

const VehiclesSwiper = ({
  isDesktop = 2,
  vehicles,
  viewStyle,
}: VehiclesSwiperProps) => {
  const vehicleList = vehicles?.length ? vehicles : defaultVehicles;
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalPages = vehicleList.length;

  return (
    <View padding={viewStyle?.padding} backgroundColor={"#fff"}>
      <Swiper
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: "auto",
            spaceBetween: 20,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: isDesktop,
            spaceBetween: 30,
            centeredSlides: false,
          },
        }}
        navigation={{
          nextEl: ".camionetas-next",
          prevEl: ".camionetas-prev",
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        modules={[Navigation]}
      >
        {vehicleList.map((vehicle, i) => (
          <SwiperSlide key={vehicle.id} className="vehicles-slide">
            <VehicleCard {...vehicle} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        maxWidth="27.5rem"
        margin="2.5rem auto 0"
      >
        <AmplifyButton
          className="camionetas-prev arrowCustom arrowCustom--prev"
          color="transparent"
          padding="10px"
        >
          <Image
            src="/images/arrow-simple-prev.svg"
            alt="Arrow prev"
            width="1.3125rem"
            height=".8125rem"
          />
        </AmplifyButton>

        <Text fontWeight={500}>
          {currentSlide} de {totalPages}
        </Text>

        <AmplifyButton
          className="camionetas-next arrowCustom arrowCustom--next"
          color="transparent"
          padding="10px"
        >
          <Image
            src="/images/arrow-simple-next.svg"
            alt="Arrow next"
            width="1.3125rem"
            height=".8125rem"
          />
        </AmplifyButton>
      </Flex>
    </View>
  );
};

export default VehiclesSwiper;
