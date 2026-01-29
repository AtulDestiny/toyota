// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

// @ts-nocheck

import { Flex, View, Image, Heading, Text } from "@aws-amplify/ui-react";
import { CustomizableSlider } from "@/components/CustomizableSlider/CustomizableSlider";
import { SwiperSlide } from "swiper/react";
import "./style.css";

interface SlideItem {
  image: {
    src: string;
    alt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    width?: any; // Changed to accept responsive objects
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    height?: any; // Changed to accept responsive objects
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    padding?: any; // Added to accept custom padding
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    margin?: any; // Added to accept custom margin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    maxWidth?: any; // Added to accept custom maxWidth
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    maxHeight?: any; // Added to accept custom maxHeight
  };
  title?: string;
  description?: {
    intro: string;
    list: string[];
  };
}

interface PreventiveCampaignsServicesSliderProps {
  title?: string;
  backgroundColor?: string;
  items?: SlideItem[];
  subText?: string;
  isPagination?: boolean;
  showHeader?: boolean; // Add prop to control header visibility
  width?: string | object; // Add width prop for responsive sizing
  slideViewHeight?: string | object; // Add prop for slide container height
  slideViewDisplay?: string | object; // Add prop for slide container display
  slideViewAlignItems?: string | object; // Add prop for slide container alignment
  maxwidth?: string | object;
  maxheight?: string | object;
  minwidth?: string | object;
  minheight?: string | object;
  margin?: string | object;
  padding?: string | object;
  Sliderminwidth?: string | object;
  Sliderminheight?: string | object;
  SwiperSlidepadding?: string | object;
}

export default function PreventiveCampaignsServicesSlider({
  title,
  subText = "",
  items,
  isPagination = true,
  showHeader = true, // Default to true to maintain backward compatibility
  backgroundColor = "#373948",
  width, // Add width parameter
  slideViewHeight, // Add slide container height parameter
  slideViewDisplay, // Add slide container display parameter
  slideViewAlignItems, // Add slide container alignment parameter
  maxwidth,
  maxheight,
  minwidth,
  minheight,
  margin,
  padding,
  Sliderminheight,
  Sliderminwidth,
  SwiperSlidepadding,
}: PreventiveCampaignsServicesSliderProps): JSX.Element {
  const defaultData = {
    title: "",
    subText: "",
    items: [
      {
        image: {
          src: "/images/vin.png",
          alt: "VIN",
          width: "100%",
          height: "100%",
        },
        title: "Ubica tu número VIN",
        description: {
          intro:
            "Recuerda que puedes encontrarlo en algunos documentos del vehículo como:",
          list: ["Tarjeta de Propiedad.", "Poliza de Seguro"],
        },
      },
      {
        image: {
          src: "/images/vin.png",
          alt: "VIN",
          width: "100%",
          height: "100%",
        },
        title: "Ubica tu número VIN",
        description: {
          intro:
            "Recuerda que puedes encontrarlo en algunos documentos del vehículo como:",
          list: ["Tarjeta de Propiedad.", "Poliza de Seguro"],
        },
      },
      {
        image: {
          src: "/images/vin.png",
          alt: "VIN",
          width: "100%",
          height: "100%",
        },
        title: "Ubica tu número VIN",
        description: {
          intro:
            "Recuerda que puedes encontrarlo en algunos documentos del vehículo como:",
          list: ["Tarjeta de Propiedad.", "Poliza de Seguro"],
        },
      },
      {
        image: {
          src: "/images/vin.png",
          alt: "VIN",
          width: "100%",
          height: "100%",
        },
        title: "Ubica tu número VIN",
        description: {
          intro:
            "Recuerda que puedes encontrarlo en algunos documentos del vehículo como:",
          list: ["Tarjeta de Propiedad.", "Poliza de Seguro"],
        },
      },
    ],
  };

  const finalTitle =
    title?.trim() === "" ? "" : (title?.trim() ?? defaultData.title);
  const finalItems = items?.length ? items : defaultData.items;

  return (
    <View
      className={isPagination ? "no-pagination" : ""}
      backgroundColor={backgroundColor}
      width={width} // Add width prop
      maxWidth={maxwidth}
      maxHeight={maxheight}
      minWidth={minwidth}
      minHeight={minheight}
      margin={margin}
      padding={padding}
      color={"#FFF"}
    >
      <CustomizableSlider
        padding={padding}
        minWidth={Sliderminwidth}
        minHeight={Sliderminheight}
        head={
          showHeader ? (
            <Flex
              textAlign={{ base: "start", xl: "center" }}
              direction={{
                base: "column",
                xl: "column",
              }}
              alignItems={"center"}
              paddingBottom={{ base: "0", xl: "73px" }}
            >
              <Heading
                level={2}
                fontSize={{ base: "22px", xl: "56px" }}
                fontWeight={400}
                fontFamily={"var(--font-toyotaType-Regular)"}
                lineHeight={"110%"}
                textAlign={"center"}
                letterSpacing={{ xl: "-2%" }}
                maxWidth={{ xl: "15ch" }}
                display={"flex"}
                style={{
                  flexDirection: "column",
                }}
                color={"inherit"}
              >
                <Text
                  fontSize={"18px"}
                  color={"#fff"}
                  fontWeight={400}
                  lineHeight={"100%"}
                  fontFamily={"var(--font-toyotaType-Regular)"}
                >
                  {subText}
                </Text>
                {finalTitle}
              </Heading>
            </Flex>
          ) : null
        }
        slides={
          <>
            {finalItems.map((item, index) => (
              <SwiperSlide key={`${item.title}-${index}`}>
                <View
                  padding={
                    SwiperSlidepadding &&
                    Object.keys(SwiperSlidepadding).length > 0
                      ? SwiperSlidepadding
                      : { base: "1.875rem 1.875rem 63px 1.875rem" }
                  }
                  className="swiper-slider-main"
                  maxWidth={{ xl: "min(76.25rem, 80%)" }}
                  margin={"auto"}
                  position={"relative"}
                  minWidth={{ base: "" }}
                  marginBottom={{ base: "40px", xl: "" }}
                  height={slideViewHeight}
                  display={slideViewDisplay}
                  alignItems={slideViewAlignItems}
                >
                  {item.title || item.description ? (
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ display: "flex" }}>
                        <Flex
                          width={"100%"}
                          flex={"0 0 100%"}
                          justifyContent="center"
                          alignItems="center"
                          className="slider-slides"
                        >
                          <Flex
                            direction={{ base: "column", xl: "row" }}
                            backgroundColor={"#ffffff"}
                            width={"100%"}
                            height={{ base: "475.72454833984375px", xl: "auto" }}
                            margin={"0"}
                            gap={"0"}
                            alignItems={{ base: "center", xl: "center" }}
                          >
                            <Image
                              src={item.image.src}
                              alt={item.image.alt}
                              width={item.image.width}
                              height={item.image.height}
                              padding={
                                item.image.padding || {
                                  base: "20px 0 18px 30px",
                                }
                              }
                              margin={item.image.margin || { base: "0", xl: "0" }}
                              maxWidth={
                                item.image.maxWidth || {
                                  base: "80px",
                                  xl: "50%",
                                }
                              }
                              maxHeight={
                                item.image.maxHeight || { base: "80px", xl: "" }
                              }
                              alignSelf={{ base: "", xl: "center" }}
                            />
                            <Flex
                              direction={"column"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              gap={"0"}
                              padding={{
                                base: "20px 30px 30px", xl: "1rem"
                              }}
                              width={{ base: "275px", xl: "auto" }}
                              minHeight={["196.72px", "auto", "auto"]}
                              // minHeight={{ base: "196.72px", medium: "196.72px", xl: "auto" }}
                            >
                              <Flex
                                direction={"column"}
                                gap={{
                                  base: "0px", xl: "2.5rem"
                                }} 
                                maxWidth={{ base: "", xl: "62%" }}
                              >
                                <Heading
                                  level={4}
                                  fontSize={{ base: "1.375rem", xl: "26px" }}
                                  fontWeight={"700"}
                                  textAlign={"start"}
                                  lineHeight={{ base: "28px", xl: "100%" }}
                                  letterSpacing={"0px"}
                                  fontFamily="var(--font-ToyotaType-Regular)"
                                  color={"#000"}
                                >
                                  {item.title}
                                </Heading>
                                <Flex
                                  direction={"column"}
                                  gap={{ base: "1rem", xl: "1.25rem" }}
                                >
                                  {item.description.videoUrl ? (
                                    <Text
                                      as="a"
                                      href={item.description.videoUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      fontSize={{
                                        base: "0.75rem",
                                        xl: "1.375rem",
                                      }}
                                      fontWeight={400}
                                      fontFamily="var(--font-toyotaType-Regular)"
                                      textDecoration="underline"
                                      color="black"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                    >
                                      {item.description.intro}
                                    </Text>
                                  ) : (
                                    <Text
                                      fontSize={{
                                        base: "14px",
                                        xl: "1.375rem",
                                      }}
                                      fontWeight={400}
                                      fontFamily={{
                                        base: "var(--font-toyotaDisplay)",
                                        xl: "var(--font-toyotaType-Regular)",
                                      }}
                                      lineHeight={{ base: "140%" }}
                                      letterSpacing={{ base: "0px" }}
                                    >
                                      {item.description.intro}
                                    </Text>
                                  )}
                                  <Flex direction={"column"} gap={"0"}>
                                    {item.description.list.map(
                                      (listItem, listIndex) => (
                                        <Text
                                          key={listItem + listIndex}
                                          fontSize={{
                                            base: "0.75rem",
                                            xl: "1.375rem",
                                          }}
                                          fontWeight={400}
                                          fontFamily="var(--font-toyotaType-Regular)"
                                        >
                                          {`${listIndex + 1}. ${listItem}`}
                                        </Text>
                                      )
                                    )}
                                  </Flex>
                                </Flex>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>
                      </div>
                    </div>
                  ) : (
                    // Only image (no title or description)
                    <Flex justifyContent="center" alignItems="center">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        padding={item.image.padding || "0"}
                      />
                    </Flex>
                  )}
                </View>
              </SwiperSlide>
            ))}
          </>
        }
      />
    </View>
  );
}
