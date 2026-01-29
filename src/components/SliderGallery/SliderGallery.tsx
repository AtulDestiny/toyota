import { HTMLSlider, HTMLSliderProps } from "../HTMLSlider/HTMLSlider";
import "./SliderGallery.css";

interface DynamicSlide {
  id: string;
  data: string | {
    image: string;
    title: string;
    text: string;
  };
}

interface SliderGalleryProps {
  backgroundColor?: string;
  color?: string;
  head?: {
    title: string;
    subtitle: string;
  };
  slides?: DynamicSlide[];
}

export function SliderGallery({
  backgroundColor,
  color,
  head,
  slides,
}: SliderGalleryProps = {}) {
  const html: HTMLSliderProps = slides?.length
    ? {
        backgroundColor: backgroundColor ?? "#FFFFFF",
        color: color ?? "#000000",
        head: `
          <div class="head">
            <h3 class="head-subtitle">${head?.subtitle || ""}</h3>
            <h2 class="head-title">${head?.title || ""}</h2>
          </div>
        `,
        slides: slides.map((slide) => {
          if (typeof slide.data === "string") {
            return {
              id: slide.id,
              data: slide.data,
            };
          } else {
            return {
              id: slide.id,
              data: `
                <div class="slide__column slide__column--primary">
                  <div><img class="slide__media" src="${slide.data.image}" alt="media" /></div>
                </div>
                <div class="slide__column slide__column--secondary">
                  <div class="slide__text-content">
                    <h3>${slide.data.title}</h3>
                    <p>${slide.data.text}</p>
                  </div>
                </div>
              `,
            };
          }
        }),
      }

    : {
        backgroundColor: "#29363A",
        color: "#ffffff",
        head: `
          <div class="head">
            <h3 class="head-subtitle">Contenido destacado</h3>
            <h2 class="head-title">Web Conserva</h2>
          </div>
        `,
        slides: [
          {
            id: "1",
            data: `                
              <div class="slide__column slide__column--primary">
                <div>
                  <img class="slide__media" src="/images/slider-gallery__video-1.png" alt="example" />
                </div>
                <div>
                  <img class="slide__media" src="/images/slider-gallery__image-1.png" alt="example" />
                </div>
              </div>
              <div class="slide__column slide__column--secondary">
                <div>
                  <img class="slide__media" src="/images/slider-gallery__image-2.png" alt="example" />
                </div>
                <div>
                  <img class="slide__media" src="/images/slider-gallery__video-2.png" alt="example" />
                </div>
              </div>
            `,
          },
          {
            id: "2",
            data: `
              <div class="slide__column slide__column--primary">
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
              </div>
              <div class="slide__column slide__column--secondary">
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
              </div>
            `,
          },
          {
            id: "3",
            data: `
              <div class="slide__column slide__column--primary">
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
              </div>
              <div class="slide__column slide__column--secondary">
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
              </div>
            `,
          },
          {
            id: "4",
            data: `
              <div class="slide__column slide__column--primary">
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
              </div>
              <div class="slide__column slide__column--secondary">
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
                <div>
                  <img class="slide__media" src="/images/html-slider-8.png" alt="example"/>
                </div>
              </div>
            `,
          },
        ],
      };

  return (
    <div className="slider-gallery">
      <HTMLSlider {...html} />
    </div>
  );
}
