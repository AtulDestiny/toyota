import { fetchVehicle } from "./queries";
import VehicleCardTwo, {
  VehicleCard,
} from "@/components/Cards/VehicleCardTwo/VehicleCardTwo";
import { Button as AmplifyButton, Image, View } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./VehiclesCardList.css";

interface Vehicle {
  imageSrc: string;
  title: string;
  modelName: string;
  price?: string;
  description: string;
  buttonText: string;
  link: string;
}

interface VehicleCardListProps {
  vehicles: Vehicle[];
  tabsElements?: string[];
  slug: string;
}

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

const VehicleCardList = ({ vehicles, slug }: VehicleCardListProps) => {
  const { data, isLoading, isError } = useQuery<VehicleCard | null>({
    queryKey: ["vehicle", slug],
    queryFn: () => fetchVehicle(slug!),
    enabled: !!slug,
  });

  const models = data?.models.items;

  const pagination = {
    clickable: true,
    el: ".custom-pagination",
    renderBullet: function () {
      return '<span class="swiper-pagination-bullet"></span>';
    },
  };

  // Check if we should show navigation arrows (only when more than 2 vehicles)
  const shouldShowNavigation = vehicles.length > 3;

  return (
    <View
      position={"relative"}
      width={{ base: "100%", large: "min(94.625rem, 78.85%)" }}
      margin={"0 auto"}
    >
      <Swiper
        className="vehicles-card-list"
        pagination={pagination}
        navigation={{
          nextEl: ".vehicles-card-list-next",
          prevEl: ".vehicles-card-list-prev",
          enabled: shouldShowNavigation,
        }}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        spaceBetween={15}
        breakpoints={{
          992: {
            slidesPerView: 2,
          },
          1366: {
            slidesPerView: 3,
          },
        }}
      >
        {vehicles.map((vehicle: Vehicle) => {
          const matchedModel = models?.find((m) => {
            if (vehicle.modelName) {
              // Add the return statement here
              return normalize(m.name) === normalize(vehicle.modelName);
            }
            // You can also add a default return false for cases where vehicle.modelName is not present
            return false;
          });

          return (
            <SwiperSlide key={vehicle.title}>
              <VehicleCardTwo {...vehicle} data={matchedModel} />
            </SwiperSlide>
          );
        })}

        {/* <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"1rem"}
          paddingTop={"1.875rem"}
          width={{ xl: "min(27.5rem, 100%)" }}
          margin={{ xl: "0 auto" }}
        >
          <View
            display={{ large: "none" }}
            className="custom-pagination"
          ></View>
        </Flex> */}
      </Swiper>
      <AmplifyButton
        className="vehicles-card-list-prev arrowCustom arrowCustom--prev"
        display={{
          base: "none",
          large: shouldShowNavigation ? "flex" : "none",
        }}
        position={{ base: "static", large: "absolute" }}
        top={"0"}
        bottom={"0"}
        right={"calc(100% + 3.5625rem)"}
        margin={"auto 0"}
        width={50}
        height={50}
        borderRadius={"50%"}
        backgroundColor={"black"}
        padding={"0"}
      >
        <Image
          src="/images/arrow-simple-prev.svg"
          alt="Arrow prev"
          width={"1.3125rem"}
          height={".8125rem"}
        />
      </AmplifyButton>
      <AmplifyButton
        className="vehicles-card-list-next arrowCustom arrowCustom--next"
        display={{
          base: "none",
          large: shouldShowNavigation ? "flex" : "none",
        }}
        position={{ base: "static", large: "absolute" }}
        top={"0"}
        bottom={"0"}
        left={"calc(100% + 3.5625rem)"}
        margin={"auto 0"}
        width={50}
        height={50}
        borderRadius={"50%"}
        backgroundColor={"black"}
        padding={"0"}
      >
        <Image
          src="/images/arrow-simple-next.svg"
          alt="Arrow next"
          width={"1.3125rem"}
          height={".8125rem"}
        />
      </AmplifyButton>
    </View>
  );
};

export default VehicleCardList;
