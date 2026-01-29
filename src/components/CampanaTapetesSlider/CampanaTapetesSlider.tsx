"use client";
import {
  Flex,
  View,
  Image,
  Heading,
  Text,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import { CustomizableSlider } from "@/components/CustomizableSlider/CustomizableSlider";
import { SwiperSlide } from "swiper/react";

export default function CampanaTapetesSlider(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });

  const data = {
    title: "Tips para el correcto uso de los tapetes",
    items: [
      {
        image: {
          mobile: { src: "/images/tapetes/TIP 1 mobile.png", alt: "VIN" },
          desktop: { src: "/images/tapetes/TIP 1.png", alt: "VIN" },
        },
        title: "Tip 1",
        description:
          "Instala solo tapetes diseñados específicamente para tu vehículo.",
      },
      {
        image: {
          mobile: { src: "/images/tapetes/TIP 2 mobile.png", alt: "VIN" },
          desktop: { src: "/images/tapetes/TIP 2.png", alt: "VIN" },
        },
        title: "Tip 2",
        description: "Asegura los tapetes firmemente con los retenedores.",
      },
      {
        image: {
          mobile: { src: "/images/tapetes/TIP 3 mobile.png", alt: "VIN" },
          desktop: { src: "/images/tapetes/TIP 3.png", alt: "VIN" },
        },
        title: "Tip 3",
        description: "Nunca sobrepongas los tapetes.",
      },
      {
        image: {
          mobile: { src: "/images/tapetes/TIP 4 mobile.png", alt: "VIN" },
          desktop: { src: "/images/tapetes/TIP 4.png", alt: "VIN" },
        },
        title: "Tip 4",
        description:
          "Instala siempre los tapetes en la dirección y posición correcta.",
      },
      {
        image: {
          mobile: { src: "/images/tapetes/TIP 5 mobile.png", alt: "VIN" },
          desktop: { src: "/images/tapetes/TIP 5.png", alt: "VIN" },
        },
        title: "Tip 5",
        description:
          "Es tu responsabilidad asegurar que los tapetes estén instalados correctamente.",
      },
    ],
  };

  return (
    <View backgroundColor={"#373948"} color={"#FFF"}>
      <CustomizableSlider
        padding=""
        minWidth=""
        minHeight=""
        head={
          <Flex
            textAlign={{ base: "start", large: "center" }}
            direction={{
              base: "column",
              large: "column",
            }}
            alignItems={"center"}
            paddingBottom={{ base: "0", large: "1.87rem" }}
          >
            <Heading
              level={2}
              fontSize={{ base: "0.875rem", large: "3.5rem" }}
              fontWeight={400}
              fontFamily={{
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-ToyotaType-Regular)",
              }}
              lineHeight={{ base: "140%", large: "110.00000000000001%" }}
              maxWidth={{ large: "17ch" }}
              letterSpacing={{ base: "0", large: "-2px" }}
              color={"inherit"}
            >
              {data.title}
            </Heading>
          </Flex>
        }
        slides={
          <>
            {data.items.map((item) => (
              <SwiperSlide key={item.title}>
                <View
                  padding={{
                    base: "1.875rem 1.875rem 63px 1.875rem",
                    large: "",
                  }}
                  maxWidth={{ large: "min(76.25rem, 80%)" }}
                  margin={"auto"}
                  position={"relative"}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Flex
                        key={item.title}
                        width={"100%"}
                        flex={"0 0 100%"}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Flex
                          key={item.title}
                          direction={{ base: "column", large: "row" }}
                          backgroundColor={"#ffffff"}
                          width={"100%"}
                          flex={"0 0 100%"}
                          margin={"0"}
                          maxWidth={"auto"}
                          gap={"0"}
                        >
                          {isMobile ? (
                            <Image
                              {...item.image.mobile}
                              maxWidth={"100%"}
                              alt={item.image.mobile.alt}
                            />
                          ) : (
                            <Image
                              {...item.image.desktop}
                              maxWidth={"48%"}
                              alt={item.image.desktop.alt}
                            />
                          )}
                          <Flex
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={"0"}
                            padding={{
                              base: "1.31rem 1.31rem 1.56rem 1.87rem",
                            }}
                          >
                            <Flex
                              direction={"column"}
                              gap={"1.5rem"}
                              maxWidth={{ base: "auto", large: "72%" }}
                            >
                              <Heading
                                level={4}
                                fontSize={{
                                  base: "22px",
                                  large: "26px",
                                }}
                                fontWeight={"700"}
                                textAlign={"start"}
                                fontFamily="var(--font-toyotaText)"
                                color={"#000"}
                                lineHeight={"100%"}
                                letterSpacing={"0"}
                              >
                                {item.title}
                              </Heading>

                              <Text
                                fontSize={{
                                  base: "0.75rem",
                                  large: "22px",
                                }}
                                fontWeight={400}
                                lineHeight={"100%"}
                                letterSpacing={"0"}
                                fontFamily="var(--font-ToyotaType-Regular)"
                              >
                                {item.description}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </div>
                  </div>
                </View>
              </SwiperSlide>
            ))}
          </>
        }
      />
    </View>
  );
}
