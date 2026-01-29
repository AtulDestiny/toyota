import { HTMLSlider, HTMLSliderProps } from "../HTMLSlider/HTMLSlider";
import "./SliderInfo.css";

export function SliderInfo() {
  const html: HTMLSliderProps = {
    backgroundColor: "#2A5B59",
    color: "#ffffff",
    head: `
      <div class="head">
        <h3 class="head-subtitle">
          Proceso de Fabricación
        </h3>
        <h2 class="head-title">
          Un paso a la vez
        </h2>
      </div>
    `,
    slides: [
      {
        id: "1",
        data: `                
        <div class="slide__body">
          <img class="slider__banner-image" src="/images/html-slider-8.png" alt="example.png"/>

          <div class="slide__content">
            <h4 class="slide__content-title">Paso 1</h4>
            <p class="slide__content-text">Tomar la foto</p>
          </div>
        </div>
      `,
      },
      {
        id: "2",
        data: `                
        <div class="slide__body">
          <img class="slider__banner-image" src="/images/html-slider-8.png" alt="example.png"/>

          <div class="slide__content">
            <h4 class="slide__content-title">Paso 1</h4>
            <p class="slide__content-text">Tomar la foto</p>
          </div>
        </div>
      `,
      },
      {
        id: "3",
        data: `                
        <div class="slide__body">
          <img class="slider__banner-image" src="/images/html-slider-8.png" alt="example.png"/>

          <div class="slide__content">
            <h4 class="slide__content-title">Paso 1</h4>
            <p class="slide__content-text">Tomar la foto</p>
          </div>
        </div>
      `,
      },
      {
        id: "4",
        data: `                
        <div class="slide__body">
          <img class="slider__banner-image" src="/images/html-slider-8.png" alt="example.png"/>

          <div class="slide__content">
            <h4 class="slide__content-title">Paso 1</h4>
            <p class="slide__content-text">Tomar la foto</p>
          </div>
        </div>
      `,
      },
    ],
  };

  return (
    <div className="slider-info">
      <HTMLSlider {...html} />
    </div>
  );
}
