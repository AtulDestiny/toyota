"use client";
import { Flex, View, Image, Heading, Text } from "@aws-amplify/ui-react";
import { CustomizableSlider } from "@/components/CustomizableSlider/CustomizableSlider";
import { SwiperSlide } from "swiper/react";
export function MantenimientoPlaneadoSlider() {
  const data = {
    title: "Beneficios Principales",
    items: [
      {
        image: {
          src: "/images/beneficios-principales-planeado.jpg",
          alt: "Precios Preferenciales",
        },
        texts: [
          "Mantenimiento realizado por técnicos calificados y certificados.",
          "Uso de repuestos genuinos Toyota.",
          "Tendrás un precio preferencial por cada tipo de mantenimiento durante 3 años o 50.000 km, lo primero que ocurra.",
        ],
      },
    ],
  };

  return (
    <View backgroundColor={"#29363A"} color={"#FFF"}>
      <CustomizableSlider
        padding=""
        minWidth=""
        minHeight=""
        showPagination={false}
        showNavigation={false}
        head={
          <Flex
            textAlign={{ base: "start", xl: "center" }}
            direction={{
              base: "column",
              xl: "column",
            }}
            alignItems={{ base: "flex-start", xl: "center" }}
            paddingBottom={{ base: "", xl: "5.88rem" }}
            gap={{ base: "1.25rem", xl: "0.63rem" }}
          >
            <Heading
              level={2}
              fontSize={{ base: "2rem", xl: "3.5rem" }}
              fontWeight={{ base: 400, xl: 400 }}
              fontFamily="var(--font-toyotaDisplay)"
              lineHeight={{ base: "130%", xl: "130%" }}
              maxWidth={{ xl: "19ch" }}
              color={"inherit"}
            >
              {data.title}
            </Heading>
          </Flex>
        }
        slides={
          <>
            {data.items.map((item) => (
              <SwiperSlide key={item.image.alt}>
                <View
                  padding={{
                    base: "3.44rem 1.875rem 63px 1.875rem",
                    xl: "",
                  }}
                  maxWidth={{ xl: "min(76.25rem, 80%)" }}
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
                        width={"100%"}
                        flex={"0 0 100%"}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Flex
                          direction={{ base: "column", xl: "row" }}
                          backgroundColor={"#ffffff"}
                          width={"100%"}
                          flex={"0 0 100%"}
                          margin={"0"}
                          maxWidth={"auto"}
                          gap={"0"}
                        >
                          <Image
                            {...item.image}
                            maxWidth={{ base: "100%", xl: "48%" }}
                            alt={item.image.alt}
                          />
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
                              gap={"2.5rem"}
                              maxWidth={{ base: "100%", xl: "80%" }}
                            >
                              <Flex
                                direction={"column"}
                                gap={{ base: "1rem", xl: "1.25rem" }}
                              >
                                <ul style={{ paddingLeft: "1.5rem", margin: 0, listStyle: "initial" }}>
                                  {item.texts.map((line, idx) => (
                                    <li
                                      key={idx}
                                      style={{
                                        color: "#000",
                                        fontSize: "1.1rem",
                                        fontFamily: "var(--font-toyotaType-Regular)",
                                        marginBottom: "0.75rem",
                                      }}
                                    >
                                      {line}
                                    </li>
                                  ))}
                                </ul>
                              </Flex>
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
