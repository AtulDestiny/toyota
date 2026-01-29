"use client";

import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./page.css";

export default function FlexFuelHevPage() {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const paginationClassName = "flex-fuel-hev__pagination";

  const items = [
    {
      id: "slide--1",
      image: {
        mobile: {
          src: "/images/flex-fuel-hev/slide--1.png",
          alt: "Reduce 70% de gases y 99% de partículas. Mejora el aire y protege nuestras ciudades.",
        },
        desktop: {
          src: "/images/flex-fuel-hev/slide--1-desktop.png",
          alt: "Reduce 70% de gases y 99% de partículas. Mejora el aire y protege nuestras ciudades.",
        },
      },
      description:
        "Reduce 70% de gases y 99% de partículas. Mejora el aire y protege nuestras ciudades.",
    },
    {
      id: "slide--2",
      image: {
        mobile: {
          src: "/images/flex-fuel-hev/slide--2.png",
          alt: "Genera 280.000 empleos formales y fortalece el campo colombiano con energía limpia",
        },
        desktop: {
          src: "/images/flex-fuel-hev/slide--2-desktop.png",
          alt: "Genera 280.000 empleos formales y fortalece el campo colombiano con energía limpia",
        },
      },
      description:
        "Genera 280.000 empleos formales y fortalece el campo colombiano con energía limpia",
    },
    {
      id: "slide--3",
      image: {
        mobile: {
          src: "/images/flex-fuel-hev/slide--3.png",
          alt: "Sustituye gasolina importada. Impulsa autonomía con energía renovable producida localmente.",
        },
        desktop: {
          src: "/images/flex-fuel-hev/slide--3-desktop.png",
          alt: "Sustituye gasolina importada. Impulsa autonomía con energía renovable producida localmente.",
        },
      },
      description:
        "Sustituye gasolina importada. Impulsa autonomía con energía renovable producida localmente.",
    },
  ];

  const paginationRef = React.useRef(null);
  const pagination = {
    clickable: true,
    el: paginationRef.current,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}">${index + 1}</span>`;
    },
  };

  return (
    <View className="flex-fuel-hev">
      <Image
        src={
          useBreakpointValue({ base: true, medium: false })
            ? "/images/flex-fuel-hev/banner.jpg"
            : "/images/flex-fuel-hev/banner--desktop.jpg"
        }
        alt="Corolla Cross Flex Hev"
        width={{ base: "100%" }}
      />

      <Flex
        direction={{ base: "column" }}
        alignItems={{ medium: "center" }}
        padding={{ base: "2.875rem 1rem 3.375rem", large: "7rem 2rem" }}
        gap={{ base: "3.4375rem", large: "7rem" }}
      >
        <Flex
          direction={{ base: "column" }}
          alignItems={{ medium: "center" }}
          gap={{ base: "2rem", large: "3.5rem" }}
        >
          <Heading
            level={2}
            maxWidth={{ base: "18ch", small: "31ch" }}
            color={{ base: "#000000" }}
            fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
            fontSize={{ base: "2rem", large: "3.5rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "110.00000000000001%" }}
            letterSpacing={{ base: "-2%" }}
            textAlign={{ base: "center" }}
          >
            Tú decides hacia dónde va Colombia tanquea con sentido, siembra
            energía
          </Heading>

          <Text
            maxWidth={{ medium: "64ch" }}
            color={{ base: "#000000" }}
            fontFamily={{
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-ToyotaType-Regular)",
            }}
            fontSize={{ base: "1rem", large: "1.375rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "190%", large: "100%" }}
            textAlign={{ base: "center" }}
          >
            Toyota Corolla Cross Hybrid Flex-Fuel es símbolo de una movilidad
            más limpia y comprometida. Tanquear no es solo llenar el tanque.
            Tanquea con sentido, siembra energía.
          </Text>
        </Flex>

        <Image
          src={
            isMobile
              ? "/images/flex-fuel-hev/intro.png"
              : "/images/flex-fuel-hev/intro--desktop.png"
          }
          alt="Imágen de referencia"
          width={{ base: "100%", large: "min(100%, 42.9375rem)" }}
        />
      </Flex>

      <Flex
        direction={{ base: "column" }}
        alignItems={{ base: "center" }}
        padding={{ base: "3.125rem 2.3438rem", large: "4.3125rem 2rem" }}
        gap={{ base: "1.25rem", large: "2rem" }}
        backgroundColor={{ base: "#2C363A" }}
      >
        <Heading
          level={2}
          maxWidth={{ base: "18ch", small: "28ch" }}
          color={{ base: "#FFFFFF" }}
          fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
          fontSize={{ base: "1.625rem", large: "3.5rem" }}
          fontWeight={{ base: "700", large: "400" }}
          lineHeight={{ base: "190%", large: "110.00000000000001%" }}
          letterSpacing={{ base: "0%", large: "-2%" }}
          textAlign={{ base: "center" }}
        >
          Elige etanol: energía que impulsa vida, aire y empleo
        </Heading>

        <Text
          maxWidth={{ medium: "72ch" }}
          color={{ base: "#FFFFFF" }}
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            medium: "var(--font-ToyotaType-Regular)",
          }}
          fontSize={{ base: "1rem", large: "1.375rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "190%", large: "100%" }}
          textAlign={{ base: "center" }}
        >
          Colombia lleva más de 20 años usando etanol en sus mezclas de
          gasolina. Hoy, el planeta y el país nos necesitan más. Elige
          voluntariamente mezclas superiores al 10% obligatorio. Así reduces
          emisiones, apoyas la producción nacional y contribuyes a un transporte
          más limpio.
        </Text>
      </Flex>

      <Flex
        direction={{ base: "column" }}
        alignItems={{ medium: "center" }}
        padding={{
          base: "3.375rem .9375rem 1.6125rem",
          large: "7rem 2rem 4.875rem",
        }}
        gap={{ base: "2.25rem", large: "7rem" }}
      >
        <Flex
          direction={{ base: "column" }}
          alignItems={{ small: "center" }}
          gap={{ base: "2rem" }}
        >
          <Heading
            level={2}
            color={{ base: "#000000" }}
            fontFamily={{ base: "var(--font-toyotaDisplay)" }}
            fontSize={{ base: "2rem", large: "56px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "130%", large: "110.00000000000001%" }}
            letterSpacing={{ base: "0%", large: "-2%" }}
            textAlign={{ base: "center" }}
          >
            Etanol: energía limpia que nos mueve
          </Heading>

          <Text
            maxWidth={{ medium: "61ch" }}
            color={{ base: "#000000" }}
            fontFamily={{
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-ToyotaType-Regular)",
            }}
            fontSize={{ base: "1rem", large: "22px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "190%", large: "100%" }}
            textAlign={{ base: "center" }}
          >
            Hoy decides tú. Con mezclas voluntarias, cada tanqueo es una
            elección con impacto: por el planeta, por el país y por ti. La
            diferencia empieza en tu decisión.
          </Text>
        </Flex>

        <View
          backgroundColor={{ base: "#71675E" }}
          width={{ xl: "min(100%, 95.625rem" }}
        >
          <Swiper
            style={{ maxWidth: "100%" }}
            pagination={pagination}
            navigation={{
              nextEl: ".flex-fuel-hev-next",
              prevEl: ".flex-fuel-hev-prev",
              enabled: true,
              disabledClass: "swiper-button-disabled",
              lockClass: "swiper-button-lock",
            }}
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            centeredSlides={true}
            cssMode={false}
            speed={800}
            watchOverflow={true}
            observer={true}
            observeParents={true}
            watchSlidesProgress={true}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.destroyed) return;
                swiper.update();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();

                if (swiper.navigation) {
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }, 200);
            }}
          >
            {items &&
              items.length > 0 &&
              items.map((item, index) => (
                <SwiperSlide key={`slide-${index}-${item.id}`}>
                  <Flex
                    height={"100%"}
                    justifyContent={{ base: "center" }}
                    padding={{
                      base: "1.875rem 2.1875rem 3.9375rem",
                      xl: "6.5938rem 9.6875rem",
                    }}
                    gap={{ base: "0" }}
                  >
                    <Flex
                      direction={{ base: "column", xl: "row" }}
                      justifyContent={{ xl: "center" }}
                      gap={{ base: "0" }}
                      width={{ xl: "min(100%, 76.25rem)" }}
                    >
                      {useBreakpointValue({ base: true, xl: false }) ? (
                        <Image {...item.image.mobile} />
                      ) : (
                        <Image {...item.image.desktop} width={"50%"} />
                      )}

                      <Flex
                        width={{ xl: "50%" }}
                        direction={{ base: "column" }}
                        padding={{
                          base: "1.5rem 1.875rem 3.125rem",
                          xl: "5.4375rem 3.125rem",
                          xxl: "5.4375rem 6.4375rem",
                        }}
                        gap={{ base: ".9375rem" }}
                        backgroundColor={{ base: "#ffffff" }}
                      >
                        <Text
                          color={{ base: "#71675E", xl: "#000000" }}
                          fontFamily={{
                            base: "var(--font-ToyotaType-Regular)",
                          }}
                          fontSize={{ base: ".75rem", xl: "1.375rem" }}
                          fontWeight={{ base: "400" }}
                          lineHeight={{ base: "100%" }}
                        >
                          {item.description}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </SwiperSlide>
              ))}

            <Button
              className="flex-fuel-hev-prev arrowCustom arrowCustom--prev"
              aria-label="Previous slide"
              display={{ base: "none", xl: "flex" }}
              alignItems={"center"}
              justifyContent={"center"}
              border={"none"}
              left={"5.3125rem"}
              position={"absolute"}
              width={"3.125rem"}
              height={"3.125rem"}
              top={"50%"}
              transform={"translateY(-50%)"}
              z-index={"10"}
              backgroundColor={"#ffffff"}
              padding={"10px"}
              borderRadius={"50%"}
              margin={"0 auto"}
              style={{ cursor: "pointer", zIndex: "1" }}
            >
              <Image
                src="/images/arrow-simple-prev--black.svg"
                alt="Previous Arrow"
              />
            </Button>
            <Button
              className="flex-fuel-hev-next arrowCustom arrowCustom--next"
              aria-label="Next slide"
              display={{ base: "none", xl: "flex" }}
              alignItems={"center"}
              justifyContent={"center"}
              border={"none"}
              right={"5.3125rem"}
              position={"absolute"}
              width={"3.125rem"}
              height={"3.125rem"}
              top={"50%"}
              transform={"translateY(-50%)"}
              z-index={"10"}
              backgroundColor={"#ffffff"}
              padding={"10px"}
              borderRadius={"50%"}
              margin={"0 auto"}
              style={{ cursor: "pointer", zIndex: "1" }}
            >
              <Image
                src="/images/arrow-simple-next--black.svg"
                alt="Next Arrow"
              />
            </Button>

            <div
              ref={paginationRef}
              className={`custom-pagination ${paginationClassName}`}
              style={{ bottom: isMobile ? "1.875rem" : "" }}
            ></div>
          </Swiper>
        </View>
      </Flex>
      <Flex
        direction={{ base: "column" }}
        alignItems={{ base: "center" }}
        padding={{
          base: "1.7813rem .9375rem 3.625rem",
          large: "4.875rem 2rem 9.75rem",
        }}
        gap={{ base: "4.25rem", large: "9.75rem" }}
      >
        <Heading
          level={2}
          maxWidth={{ base: "15ch", small: "33ch" }}
          color={{ base: "#000000" }}
          fontFamily={{ base: "var(--font-toyotaDisplay)" }}
          fontSize={{ base: "2rem", large: "3.5rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "130%", large: "110.00000000000001%" }}
          textAlign={{ base: "center" }}
          letterSpacing={{ large: "-2%" }}
        >
          Produce 1.900 GWh/
          {useBreakpointValue({ base: true, small: false }) ? <br /> : <></>}
          año y fortalece una cadena agroindustrial eficiente, limpia y
          sostenible.
        </Heading>

        <Grid
          width={{ base: "min(100%, 48rem)", xl: "min(100%, 95.625rem)" }}
          templateColumns={{ xl: "65.88% 1fr" }}
          gap={{ base: "1.625rem" }}
          margin={{ base: "0 auto" }}
        >
          <Grid
            gap={{ base: "1.625rem" }}
            templateRows={{ xl: "repeat(2, 1fr)" }}
          >
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)" }}
              gap={{ base: "1.25rem" }}
            >
              <Flex
                direction={{ base: "column" }}
                justifyContent={{ base: "center", xl: "unset" }}
                padding={{ base: "1.5rem .9375rem", xl: "2.5rem" }}
                gap={{ base: "1.125rem", xl: "1.875rem" }}
                backgroundColor={{ base: "#365A59" }}
                borderRadius={{ base: ".5rem" }}
              >
                <Heading
                  level={3}
                  color={{ base: "#ffffff" }}
                  fontFamily={{ base: "var(--font-toyotaDisplay)" }}
                  fontSize={{ base: ".875rem", xl: "2rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "140%", xl: "130%" }}
                  textAlign={{ base: "center", xl: "left" }}
                >
                  Tanquea con sentido, siembra energía.
                </Heading>
                <Text
                  color={{ base: "#ffffff" }}
                  fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
                  fontSize={{ base: ".75rem", xl: "1.375rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "100%" }}
                  borderRadius={{ base: ".5rem" }}
                  textAlign={{ base: "center", xl: "left" }}
                >
                  Con nuestra iniciativa de mezclas voluntarias, tú podrás
                  elegir cuánto aportar al planeta, al país y al futuro.
                </Text>
              </Flex>
              <Image
                width={{ base: "100%" }}
                src={
                  isMobile
                    ? "/images/flex-fuel-hev/grid-item--2.png"
                    : "/images/flex-fuel-hev/grid-item--2-desktop.png"
                }
                alt={"Imágen de referencia"}
                borderRadius={{ base: ".5rem" }}
              />
            </Grid>
            <Flex
              alignItems={{ base: "center", xl: "unset" }}
              minHeight={{ base: "13.125rem" }}
              padding={{ base: "1.6875rem 1rem", xl: "2.5rem" }}
              backgroundColor={{ base: "#2C363A" }}
              borderRadius={{ base: ".5rem" }}
            >
              <Text
                color={{ base: "#ffffff" }}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-ToyotaType-Regular)",
                }}
                fontSize={{ base: ".875rem", xl: "2rem" }}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "140%" }}
                textAlign={{ base: "center", xl: "left" }}
              >
                Al elegir etanol, eliges sembrar energia... energia que nace en
                nuestros campos, crece con el trabajo de nuestra gente y se
                convierte en movilidad limpia para todo el país.
              </Text>
            </Flex>
          </Grid>

          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", xl: "1fr" }}
            templateRows={{ xl: "repeat(2, 1fr)" }}
            gap={{ base: "1.25rem" }}
          >
            <Image
              src={
                isMobile
                  ? "/images/flex-fuel-hev/grid-item--4.png"
                  : "/images/flex-fuel-hev/grid-item--4-desktop.png"
              }
              alt={"Imágen de referencia"}
              width={{ base: "100%" }}
              borderRadius={{ base: ".5rem" }}
            />
            <Image
              src={
                isMobile
                  ? "/images/flex-fuel-hev/grid-item--5.png"
                  : "/images/flex-fuel-hev/grid-item--5-desktop.png"
              }
              alt={"Imágen de referencia"}
              width={{ base: "100%" }}
              borderRadius={{ base: ".5rem" }}
            />
          </Grid>
        </Grid>
      </Flex>
    </View>
  );
}
