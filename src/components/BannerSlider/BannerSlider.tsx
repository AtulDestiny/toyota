import { View } from "@aws-amplify/ui-react";
import { ReactNode } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import "./BannerSlider.css";

export function BannerSlider({
  showButtons = true,
  children,
}: {
  children: ReactNode;
  showButtons?: boolean;
}): JSX.Element {
  return (
    <View className="banner-slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        navigation={{
          nextEl: ".banner-slider-button-next",
          prevEl: ".banner-slider-button-prev",
        }}
        pagination={{
          el: ".banner-slider-pagination",
          enabled: true,
          clickable: true,
          type: "bullets",
        }}
      >
        {children}
        <div className="banner-slider-pagination"></div>
      </Swiper>
      {showButtons && (
        <>
          <div className="banner-slider-button-prev banner-slider-arrow"></div>
          <div className="banner-slider-button-next banner-slider-arrow"></div>
        </>
      )}
    </View>
  );
}
