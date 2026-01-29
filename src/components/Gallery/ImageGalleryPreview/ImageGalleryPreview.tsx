import {
  Image,
  Heading,
  Button as AmplifyButton,
  View,
  Flex,
  useBreakpointValue,
  Tabs,
  Link,
  Text,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Select, SelectTheme } from "../../Layout/Select/Select";
import "./ImageGalleryPreview.css";
import Button from "../../Layout/Button/Button";

export interface ImageGalleryPreviewItem {
  src: string;
  srcDesktop?: string;
  alt: string;
}

export interface ImageGalleryPreviewProps {
  title: string;
  description: string;
  tabs: {
    title: string;
    items: ImageGalleryPreviewItem[];
  }[];
  selectStyles?: React.CSSProperties;
  galleryLink?: string;
}

export function ImageGalleryPreview({
  title,
  description,
  tabs,
  selectStyles,
  galleryLink = "/detalle/fortuner/version/sr-2-8-diesel-4-x-2-at/galeria",
}: ImageGalleryPreviewProps): JSX.Element {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const pagination = {
    clickable: true,
    el: ".custom-pagination",
    renderBullet: function () {
      return '<span class="swiper-pagination-bullet"></span>';
    },
  };

  useEffect(() => {
    setCurrentSlide(1); // Reset to first slide on tab change
    setTotalSlides(currentTab.items.length);
  }, [currentTab]);

  const isMobile = useBreakpointValue({ base: true, xl: false });

  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(currentTab.items.length);

  return (
    <Flex
      className="image-gallery-preview"
      direction={"column"}
      alignItems={"flex-start"}
      gap={{ base: "2.44rem", xl: "2.69rem" }}
      padding={{ base: "1.47rem 0 3.19rem", xl: "2rem 0 5.5625rem" }}
    >
      <Flex
        direction={{ base: "column", xl: "column-reverse" }}
        gap="0.63rem"
        alignItems={{ base: "flex-start", xl: "center" }}
        width={"100%"}
      >
        <Heading
          as="h2"
          level={2}
          fontFamily="var(--font-ToyotaType-Regular)"
          fontSize={{ base: "0.875rem", xl: "3.5rem" }}
          fontWeight={"400"}
          lineHeight={{ base: "1.225rem", xl: "3.85rem" }}
          color={"#161B1E"}
          style={{ whiteSpace: "pre-line" }} // Add this line
        >
          {title}
        </Heading>
        <Heading
          level={2}
          fontFamily="var(--font-ToyotaType-Regular)"
          fontSize={{ base: "2rem", xl: "1.125rem" }}
          fontWeight={"400"}
          lineHeight={{ base: "2.6rem", xl: "1.625rem" }}
          style={{ whiteSpace: "pre-line" }} // Add this line
        >
          {description}
        </Heading>
      </Flex>

      <Flex
        width={"100%"}
        direction={"column"}
        alignItems={"center"}
        gap={{ base: "2.25rem", xl: "2.75rem" }}
      >
        <Flex
          width={"100%"}
          direction={"column"}
          alignItems={"center"}
          gap={{ base: "1.87rem", xl: "3.5rem" }}
        >
          {isMobile ? (
            <View
              margin={"0 auto"}
              width={"230px"}
              height={"48px"}
              padding={"0 16px"}
            >
              <Select
                options={tabs.map((tab) => ({
                  value: tab.title,
                  label: tab.title,
                }))}
                onSelect={(selected) => {
                  const selectedTab = tabs.find(
                    (tab) => tab.title === selected?.value
                  );
                  if (selectedTab) {
                    setCurrentTab(selectedTab);
                  }
                }}
                placeholder={currentTab.title}
                theme={SelectTheme.Light}
                customControlStyles={{
                  ...selectStyles,
                  height: "48px",
                  minHeight: "48px",
                  padding: "0 16px",
                  width: "230px",
                  position: "relative",
                  left: "-16px",
                }}
              />
            </View>
          ) : (
            <View width={"min(56.875rem, 100%)"} margin={{ xl: "0 auto" }}>
              <Tabs.Container
                defaultValue={currentTab.title}
                onValueChange={(value) => {
                  const selectedTab = tabs.find((tab) => tab.title === value);
                  if (selectedTab) {
                    setCurrentTab(selectedTab);
                  }
                }}
              >
                <Tabs.List
                  justifyContent="center"
                  width="max-content"
                  direction={{ xl: "row" }}
                  margin="0 auto"
                  value={currentTab.title}
                  display={{ xl: "flex" }}
                  gap={"7.31rem"}
                  border={"none"}
                >
                  {tabs.map((tab) => (
                    <Tabs.Item
                      key={tab.title}
                      value={tab.title}
                      color="inherit"
                      fontSize={{ xl: "1.125rem" }}
                      className="tabs__item"
                      fontWeight={400}
                      lineHeight={"1.6044rem"}
                      textTransform={"uppercase"}
                      padding={"0.63rem 0"}
                    >
                      {tab.title}
                    </Tabs.Item>
                  ))}
                </Tabs.List>
              </Tabs.Container>
            </View>
          )}

          <View
            width={{ base: "345px", xl: "min(56.875rem, 100%)" }}
            margin={{ xl: "0 auto" }}
          >
            <Swiper
              pagination={pagination}
              navigation={{
                nextEl: ".image-gallery-next",
                prevEl: ".image-gallery-prev",
              }}
              modules={[Pagination, Navigation]}
              slidesPerView={1}
              spaceBetween={15}
              loop={true}
              onSlideChange={(swiper) => {
                const index = swiper?.realIndex ?? 0;
                setCurrentSlide((index % totalSlides) + 1);
              }}
              onSwiper={(swiper) => {
                const realIndex = swiper?.realIndex ?? 0;
                const loopedSlides = swiper?.loopedSlides ?? 0;
                const total = swiper?.slides?.length ?? 0;

                const visibleSlides = total - loopedSlides * 2;
                setTotalSlides(visibleSlides > 0 ? visibleSlides : total);
                setCurrentSlide((realIndex % totalSlides) + 1);
              }}
            >
              {currentTab.items.map((item, index) => (
                <SwiperSlide key={index}>
                  <View
                    style={{
                      position: "relative",
                      height: isMobile ? "345px" : "522px",
                    }}
                  >
                    <Image
                      src={
                        item.srcDesktop
                          ? isMobile
                            ? item.src
                            : item.srcDesktop
                          : item.src
                      }
                      alt={item.alt}
                      aspectRatio={{ base: "1 / 1", xl: "910 / 522" }}
                      objectFit={"cover"}
                      width={"100%"}
                      height={"100%"}
                    />

                    {/* Linear gradient overlay */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "60px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Reference text */}
                    <Text
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "white",
                        fontSize: "12px",
                        fontFamily: "var(--font-ToyotaType-Regular)",
                        margin: 0,
                        textAlign: "center",
                        zIndex: 10,
                      }}
                    >
                      *Imágenes de referencia
                    </Text>
                  </View>
                </SwiperSlide>
              ))}

              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={"1rem"}
                paddingTop={".75rem"}
                width={{ xl: "min(27.5rem, 100%)" }}
                margin={{ xl: "0 auto" }}
              >
                <AmplifyButton
                  className="image-gallery-prev arrow-custom arrow-custom--prev"
                  backgroundColor={"black"}
                  border={"none"}
                  minWidth={"3.4375rem"}
                  height={"1.875rem"}
                >
                  <Image
                    src="/svgs/arrow--left-white-short.svg"
                    alt="Arrow Left White Short.svg"
                  />
                </AmplifyButton>
                {/* <div className="custom-pagination"></div> */}
                <Flex direction="column" alignItems="center" gap="0.25rem">
                  <Text
                    fontWeight={400}
                    fontSize={{ base: "18px", xl: "" }}
                    lineHeight={{ base: "normal", xl: "" }}
                    fontStyle={{ base: "normal", xl: "" }}
                    margin="0 auto"
                    fontFamily="var(--font-ToyotaType-Regular)"
                  >
                    {currentSlide} de {totalSlides}
                  </Text>
                </Flex>
                <AmplifyButton
                  className="image-gallery-next arrow-custom arrow-custom--next"
                  backgroundColor={"black"}
                  border={"none"}
                  minWidth={"3.4375rem"}
                  height={"1.875rem"}
                >
                  <Image
                    src="/svgs/arrow--right-white-short.svg"
                    alt="Arrow Right White Short.svg"
                  />
                </AmplifyButton>
              </Flex>
            </Swiper>
          </View>
        </Flex>

        <Link href={galleryLink} style={{ textDecoration: "none" }}>
          {isMobile ? (
            <Button
              textColor="white"
              color="black"
              style={{ height: "40px" }}
              padding={".625rem 1.5rem"}
            >
              <View as="span" lineHeight={"1.125rem"}>
                Ver la galería completa
              </View>
            </Button>
          ) : (
            <Button
              textColor="white"
              color="black"
              style={{ height: "3.125rem", width: "18.125rem" }}
              padding={".9375rem"}
            >
              <View as="span" lineHeight={"20px"}>
                Ver la galería completa
              </View>
            </Button>
          )}
        </Link>
      </Flex>
    </Flex>
  );
}
