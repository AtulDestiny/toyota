"use client";
import {
  Flex,
  View,
  Image,
  Heading,
  Text,
  Pagination,
} from "@aws-amplify/ui-react";
import { CustomizableSlider } from "@/components/CustomizableSlider/CustomizableSlider";
import { SwiperSlide } from "swiper/react";

export default function FlotasYVentasSlider(): JSX.Element {
  const data = {
    title: "Razones para tener tu flota de vehículos con Toyota",
    subtitle: "Beneficios",
    items: [
      {
        image: {
          src: "/images/imz2.png",
          alt: "Maximizar la operacion de tu negocio",
        },
        title: "Maximizar la operacion de tu negocio",
        description: {
          intro:
            "Los vehículos Toyota son confiables, duraderos y tienen bajos costos de operación y mantenimiento. Ofrecen alto valor de reventa, opciones de financiamiento, sistemas de seguridad avanzados y una amplia variedad de modelos para adaptarse a las necesidades de tu empresa.",
        },
      },
      {
        image: {
          src: "/images/LC-7R47822-movimiento.jpg",
          alt: "Precios preferenciales",
        },
        title: "Precios preferenciales",
        description: {
          intro:
            "Toyota ofrece descuentos especiales a las empresas interesadas en formar una flota, dependiendo de la cantidad de unidades que adquieran. Estos descuentos están diseñados para brindar un mayor beneficio económico a aquellas empresas que requieran múltiples vehículos.",
        },
      },
      {
        image: {
          src: "/images/imz3.png",
          alt: "Vehículos especializados",
        },
        title: "Vehículos especializados",
        description: {
          intro:
            "Toyota ofrece una amplia gama de vehículos diseñados específicamente para satisfacer las necesidades de empresas de transporte, minería, agricultura, salud y entidades gubernamentales, entre otros sectores. Estos vehículos están construidos considerando los requerimientos y desafíos de cada industria, lo que facilita las tareas y maximiza la eficiencia operativa.",
        },
      },
      {
        image: {
          src: "/images/imz1.png",
          alt: "Programas de mantenimiento",
        },
        title: "Programas de mantenimiento",
        description: {
          intro:
            "Toyota cuenta con un programa de mantenimiento denominado 'Mantenimiento Planeado Toyota' (MPT), que asegura el correcto cuidado, funcionamiento y servicio de la flota de nuestros clientes.",
        },
      },
    ],
  };

  return (
    <>
      <style jsx global>{`
        @media (max-width: 524px) {
          .slider-section .custom-pagination {
            bottom: 50px !important;
            display: flex !important;
            justify-content: space-between !important;
            position: absolute !important;
            gap: 6.34px;
          }

          .image-gradient-overlay {
            display: none !important;
          }

          .image-overlay-text {
            display: none !important;
          }
        }

        @media (min-width: 525px) and (max-width: 1250px) {
          .slider-section .custom-pagination {
            bottom: 50px !important;
            display: flex !important;
            justify-content: space-between !important;
            position: absolute !important;
            gap: 6.34px;
          }

          .slider-section .arrowCustom--prev,
          .slider-section .arrowCustom--next {
            display: none !important;
          }

          .tablet-card {
            width: 70vw !important;
            max-width: 70vw !important;
          }

          .image-gradient-overlay {
            display: none !important;
          }

          .image-overlay-text {
            display: none !important;
          }
        }

        @media (min-width: 1281px) and (max-width: 1439px) {
          .slider-section .arrowCustom--prev {
            margin-left: 5px !important;
          }

          .slider-section .arrowCustom--next {
            margin-right: 5px !important;
          }
        }

        @media (min-width: 1281px) {
          .slider-section .custom-pagination {
            display: none !important;
          }

          .slider-section .arrowCustom--prev,
          .slider-section .arrowCustom--next {
            border: 0;
          }

          .slider-section .swiper-slide {
            min-height: 455px !important;
            display: flex !important;
            align-items: center !important;
          }

          .image-container {
            position: relative !important;
            display: block !important;
          }

          .image-gradient-overlay {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 108.9999465942387px !important;
            background: linear-gradient(
              180.63deg,
              rgba(0, 0, 0, 0) 0.54%,
              rgba(0, 0, 0, 0.8) 96.49%,
              rgba(0, 0, 0, 0.6) 99.46%
            ) !important;
            z-index: 5 !important;
          }

          .image-overlay-text {
            position: absolute !important;
            bottom: 11px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            color: white !important;
            font-size: 0.875rem !important;
            font-family: var(--font-toyotaType-Regular) !important;
            z-index: 10 !important;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5) !important;
          }
        }
      `}</style>

      <View backgroundColor={"#373948"} color={"#FFF"}>
        <CustomizableSlider
          showPagination={true}
          padding={{
            base: "2.8125rem .9375rem 1.875rem",
            xl: "96px 0 125px",
          }}
          minWidth=""
          minHeight=""
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
                level={3}
                color={"#FFF"}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-ToyotaType-Regular)",
                }}
                fontSize={{ base: "0.875rem", xl: "1.125rem" }}
                fontWeight={{ base: "400", xl: "400" }}
                lineHeight={{ base: "140%" }}
              >
                {data.subtitle}
              </Heading>

              <Heading
                level={2}
                fontSize={{ base: "2rem", xl: "3.5rem" }}
                fontWeight={{ base: 400, xl: 400 }}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-ToyotaType-Regular)",
                }}
                lineHeight={{ base: "130%", xl: "110%" }}
                maxWidth={{ xl: "25ch" }}
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
                      base: "3.44rem 0 63px 0",
                      xl: "0",
                    }}
                    maxWidth={{ xl: "min(76.25rem, 80%)" }}
                    margin={"auto"}
                    position={"relative"}
                  >
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      width={"100%"}
                    >
                      <Flex
                        direction={{ base: "column", xl: "row" }}
                        backgroundColor={"#ffffff"}
                        width={{ base: "100%", xl: "1220px" }}
                        margin={"0"}
                        maxWidth={{ base: "277px", xl: "1220px" }}
                        gap={"0"}
                        className="tablet-card"
                      >
                        <View
                          className="image-container"
                          width={{ base: "100%", xl: "600px" }}
                          height={{ base: "249px", xl: "455px" }}
                          maxWidth={{ base: "100%", xl: "600px" }}
                        >
                          <Image
                            {...item.image}
                            width={{ base: "100%", xl: "600px" }}
                            height={{ base: "249px", xl: "455px" }}
                            maxWidth={{ base: "100%", xl: "600px" }}
                            alt={item.image.alt}
                            objectFit={"cover"}
                          />
                          <View className="image-gradient-overlay" />
                          <Text className="image-overlay-text">
                            *Imágenes de referencia
                          </Text>
                        </View>
                        <Flex
                          direction={"column"}
                          justifyContent={{ base: "start", xl: "center" }}
                          alignItems={"center"}
                          gap={"0"}
                          width={{ base: "auto", xl: "620px" }}
                          minHeight={{ base: "205px", xl: "none" }}
                          padding={{
                            base: "30px 21px 25px 30px",
                          }}
                        >
                          <Flex
                            direction={"column"}
                            gap={{ base: "12px", xl: "12px" }}
                            maxWidth={{ base: "100%", xl: "80%" }}
                          >
                            <Heading
                              level={4}
                              fontSize={{ base: "22px", xl: "1.625rem" }}
                              fontWeight={"700"}
                              textAlign={"start"}
                              fontFamily="var(--font-toyotaText)"
                              color={"#000"}
                            >
                              {item.title}
                            </Heading>
                            <Flex
                              direction={"column"}
                              gap={{ base: "1rem", xl: "1.25rem" }}
                            >
                              <Text
                                fontSize={{ base: "12px", xl: "1.375rem" }}
                                fontWeight={400}
                                fontFamily="var(--font-toyotaType-Regular)"
                              >
                                {item.description.intro}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </View>
                </SwiperSlide>
              ))}
            </>
          }
        />
      </View>
    </>
  );
}
