"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HybridSlider.css";
import Image from "next/image";

// Define the type for each slide
interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

// Define the slides data
const slides: Slide[] = [
  {
    title:
      "Híbrido en serie o Extended Range Electric Vehicle (Vehículo Eléctrico de Alcance Extendido o EREV).",
    subtitle: "(Vehículo Eléctrico de Alcance Extendido o EREV)",
    description:
      "El motor eléctrico es el responsable de impulsar el vehículo. El motor de combustión solo genera electricidad.",
    image: "/images/cars/clasificacion1_1.png",
  },
  {
    title: "Híbrido en paralelo o Mild Hybrid",
    subtitle: "(Híbrido leve)",
    description:
      "Tanto el motor de combustión interna como el eléctrico se utilizan para dar fuerza a la transmisión a la vez.",
    image: "/images/cars/clasificacion1_1.png",
  },
];

export default function HybridSlider() {
  return (
    <div className="hybrid-Slider-slider-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="hybrid-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hybridSlider-slide-card">
              <Image
                src={slide.image}
                alt={slide.title}
                className="slide-image"
                width={80}
                height={80}
                layout="responsive"
                priority
              />
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <h3>{slide.subtitle}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
