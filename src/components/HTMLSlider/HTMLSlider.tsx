"use client";
import { useState, useEffect } from "react";
import { View, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./HTMLSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export interface HTMLSliderProps {
  backgroundColor?: string;
  color?: string;
  head?: string;
  slides?: {
    id: string;
    data: string;
  }[];
}

export function HTMLSlider({
  backgroundColor = "#ffffff",
  color = "#000000",
  head = "<h2>HTML Slider</h2>",
  slides = [
    {
      id: "slide1",
      data: "<div><h3>Slide 1</h3><p>This is the first slide content</p></div>",
    },
    {
      id: "slide2",
      data: "<div><h3>Slide 2</h3><p>This is the second slide content</p></div>",
    },
    {
      id: "slide3",
      data: "<div><h3>Slide 3</h3><p>This is the third slide content</p></div>",
    },
  ],
}: HTMLSliderProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);

  // Zoom handlers
  const zoomIn = () => setZoomLevel((z) => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoomLevel((z) => Math.max(z - 0.2, 0.5));
  const pagination = {
    clickable: true,
    el: ".custom-pagination",
    renderBullet: function (index: number) {
      return (
        '<span class="swiper-pagination-bullet">' + (index + 1) + "</span>"
      );
    },
  };

  useEffect(() => {
    const handleClick = (e: Event) => {
      const img = e.target as HTMLImageElement;
      const src = img.src;
      setModalImageSrc(src);
      setZoomLevel(1);
      setIsModalOpen(true);
    };
  
    const images = document.querySelectorAll(".slide__media");
    images.forEach((img) => img.addEventListener("click", handleClick));
  
    return () => {
      images.forEach((img) => img.removeEventListener("click", handleClick));
    };
  }, [slides, isModalOpen]);
  
  return (
    <View
      padding={{
        base: "2.8125rem .9375rem 1.875rem",
        large: "3.375rem 0 8.125rem",
      }}
      backgroundColor={backgroundColor}
      color={color}
      className="html-slider"
    >
      <View
        width={"100%"}
        maxWidth={"100%"}
        margin={"0 auto"}
        position={"relative"}
      >
        <div className="headings" dangerouslySetInnerHTML={{ __html: head }} />
        <Swiper
          pagination={pagination}
          navigation={{
            nextEl: ".slider-section-next",
            prevEl: ".slider-section-prev",
          }}
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="slide"
                dangerouslySetInnerHTML={{ __html: slide.data }}
              />
            </SwiperSlide>
          ))}

          <Button className="slider-section-prev arrowCustom arrowCustom--prev" />
          <Button className="slider-section-next arrowCustom arrowCustom--next" />

          <div className="custom-pagination"></div>
        </Swiper>
        <div
          className="zoom-modal"
          style={{ display: isModalOpen ? "flex" : "none" }}
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="zoom-close-button"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            ×
          </button>
          <img
            src={modalImageSrc}
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={(e) => e.stopPropagation()}
            className="zoomed-image"
            alt="Zoomed preview"
          />
          <div className="zoom-controls">
            <button
              onClick={(e) => {
                e.stopPropagation();
                zoomOut();
              }}
            >
              −
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                zoomIn();
              }}
            >
              ＋
            </button>
          </div>
        </div>
      </View>
    </View>
  );
}
