import { View, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./CustomizableSlider.css";
import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export interface SliderProps {
  head: JSX.Element;
  slides: JSX.Element;
  showPagination?: boolean; // Add this prop
  showNavigation?: boolean;
  padding?: string | object;
  minWidth?: string | object;
  minHeight?: string | object;
}

export function CustomizableSlider({
  head,
  slides,
  showPagination = true, // Default to true for backward compatibility
  showNavigation = true,
  padding,
  minWidth,
  minHeight,
}: SliderProps): JSX.Element {
  const pagination = showPagination
    ? {
      clickable: true,
      el: ".custom-pagination",
      renderBullet: function (index: number) {
        return (
          '<span class="swiper-pagination-bullet">' + (index + 1) + "</span>"
        );
      },
    }
    : false;

  // Only include Pagination module if showPagination is true
  const modules = [
    ...(showPagination ? [Pagination] : []),
    ...(showNavigation ? [Navigation] : []),
  ];
  return (
    <View
      padding={
        padding || {
          base: "2.8125rem .9375rem 1.875rem",
          large: "3.375rem 0 8.125rem",
        }
      }
      minWidth={minWidth}
      minHeight={minHeight}
      backgroundColor={"inherit"}
      className="slider-section"
    >
      <View
        width={"100%"}
        maxWidth={"100%"}
        margin={"0 auto"}
        position={"relative"}
      >
        {head}
        <Swiper
          pagination={pagination}
          navigation={{
            nextEl: ".slider-section-next",
            prevEl: ".slider-section-prev",
          }}
          modules={modules}
          slidesPerView={1}
          loop={true}
        >
          {slides}

          {showNavigation && (
            <>
              <Button className="slider-section-prev arrowCustom arrowCustom--prev" />
              <Button className="slider-section-next arrowCustom arrowCustom--next" />
            </>
          )}

          {showPagination && <div className="custom-pagination"></div>}
        </Swiper>
      </View>
    </View>
  );
}
