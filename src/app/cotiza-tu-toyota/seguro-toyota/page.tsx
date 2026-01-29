// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React, { useRef, useState } from "react";
import renderComponent from "@/utils/renderComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css"; // basic styles
import {
  View,
  Text,
  Button,
  Card,
  Flex,
  Image,
  Heading,
  Grid,
  useBreakpointValue,
  Button as AmplifyButton,
} from "@aws-amplify/ui-react";
import ContactForm from "@/components/ContactForm/ContactForm";
import ContactForm1 from "@/components/ContactForm/ContactForm1";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

type BenefitItem = {
  icon: string;
  title: string;
  heading: string;
  points: string[];
  bgcolor?: string;
};

const cardData: BenefitItem[] = [
  {
    icon: "/images/Beneficios-Persona.png",
    bgcolor: "red",
    heading: "Beneficios Persona",
    points: [
      "Aceptamos vehículos nuevos y usados de hasta 15 años con garantía de reparación en concesionarios autorizados Toyota.",
      "Coberturas Plus que no afectan la póliza por reclamación.",
      "Descuento especial en vehículo Toyota nuevo en caso de pérdida total o hurto.",
      // "Deducible 0% por hurto o pérdida total.",
      "Repuestos Genuinos Toyota.",
    ],
  },
  {
    icon: "/images/Servicios-del-vehículo.png",
    heading: "Servicios del vehículo",
    bgcolor: "#1F2C40",
    points: [
      "Deducible de 0% por hurto o pérdida total.",
      "Deducible fijo sin importar el valor de reparación.",
      "Facilidades de financiación.",
      "Vehículo de reemplazo.",
      "Coberturas plus que no afectan la póliza por reclamación.",
    ],
  },
];

const sliderData: ComponentData[] = [
  {
    component: "MainSlider", // Component name
    props: {
      slides: [
        {
          imageMobile: "/images/banner_seguros_1_escritorio_1_mob.png",
          imageDesktop: "/images/banner_seguros_1_escritorio_1.png",
          title: "Así también se ve un Toyota Seguro ",
        },

        {
          imageMobile: "/images/banner_seguros_1_escritorio_3_mob.png",
          imageDesktop: "/images/banner_seguros_1_escritorio_3.png",
          title: " ¿Y este? También es un Toyota seguro",
        },
        {
          imageMobile: "/images/banner_seguros_1_escritorio_2_mob.png",
          imageDesktop: "/images/banner_seguros_1_escritorio_2.png",
          title: " Así también",
        },
        // {
        //   imageMobile: "/images/seguros-mobile.png",
        //   imageDesktop: "/images/seguros-desktop.png",
        //   title: " ",
        // },
      ], // Passing slides data inline
      sliderConfig: {
        slidesPerView: 1, // Number of slides visible at a time
        spaceBetween: 10, // Space between slides
        loop: true, // Infinite loop of slides
        isButton: false, // Show navigation buttons
        autoplay: {
          delay: 3000, // Autoplay delay in ms
          disableOnInteraction: false, // Keep autoplay even when user interacts
        },
        pagination: {
          clickable: true, // Allow click pagination
        },
        navigation: true, // Enable navigation buttons (next/prev)
      }, // Passing slider configuration inline
      customStyles: {
        heading: {
          marginTop: {
            base: "38px",
            xl: "58px",
          },
        },
      },
    },
  },
];
// Datos para la página de SeguroToyota
const pageData: ComponentData[] = [
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "¿Qué te ofrecemos?",
        fontSize: { base: "14px", xl: "18px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "140%",
        textAlign: "left",
        padding: { base: "24px 15px 10px", xl: "70px 0 0" },
        letterSpacing: "-1.12px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "La mejor alternativa de protección diseñada exclusivamente para ti",
        fontSize: { base: "32px", xl: "32px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "130%",
        textAlign: { base: "left", xl: "center" },
        maxWidth: {
          xl: "34%",
        },
        padding: { base: "0px 15px 12px", xl: "10px 0 16px" },
        letterSpacing: "-1.12px",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: `Sabemos lo importante que es para ti contar con un seguro hecho a tu medida, que<br> brinda una amplia gama de coberturas y servicios para ser atendido siempre en nuestra red de <br>concesionarios y disfrutar de la tranquilidad de contar con la garantía y calidad de la marca Toyota.`,
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          medium: "100%",
          large: "100%",
          xl: "100%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "12px 16px 28px 16px", xl: "16px  0px 50px" },
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/images/suesoue-picture.png",
        alt: "t10-car",
        width: { base: "100%", xl: "80%" },
        maxWidth: {
          base: "",
          medium: "912px",
          large: "912px",
          xl: "912px",
        },
        maxHeight: {
          base: "",
          medium: "412px",
          large: "412px",
          xl: "412px",
        },
        margin: {
          medium: "0 auto",
          large: "0 auto",
          xl: "0 auto",
        },
        height: "auto",
        objectFit: "contain",
        padding: { base: "28px 15px 72px", xl: "50px 15px 100px" },
      },
    },
  },
];

export default function CarroDeTusSuenos() {
  const [isOpen, setIsOpen] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [currentDetalle, setCurrentDetalle] = useState(1);
  const totalPages = cardData.length;
  const isMobileOrTablet = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
  });
  return (
    <div>
      {isOpen && <ContactForm1 setIsOpen={setIsOpen} />}
      {sliderData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
      <View display={"flex"} style={{ justifyContent: "center" }}>
        <Text
          fontSize={{ base: "22px", xl: "32px" }}
          fontFamily="var(--font-toyotaDisplay)"
          fontStyle="normal"
          fontWeight="500"
          maxWidth={{ xl: "65%" }}
          lineHeight={{ base: "150%", xl: "130%" }}
          textAlign={{ base: "center", xl: "center" }}
          padding={{ base: "40px 60px 32px 60px", xl: "114px  0px 32px" }}
        >
          Con el Seguro Toyota tienes beneficios exclusivos que te permiten
          disfrutar al máximo de tu vehículo con total tranquilidad
        </Text>
      </View>

      <View
        display={"flex"}
        style={{ justifyContent: "center" }}
        padding={{ base: "0 0 32px", xl: "0 0 70px" }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          width={{ base: "345px", xl: "329px" }}
          height={{ base: "40px", xl: "50px" }}
          fontSize={{ base: "14px", xl: "16px" }}
          fontWeight="400"
          color={"white"}
          backgroundColor={"#D42224"}
          border="0"
        >
          Cotízalo aquí
        </Button>
      </View>

      <View padding={{ base: "2rem 1rem", xl: "2rem" }}>
        {/* <Grid
          templateColumns={{
            base: "1fr",
            medium: "auto auto",
            xl: "auto auto",
          }}
          gap="2rem"
          justifyContent="center"
        > */}

        {isMobileOrTablet ? (
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentDetalle(swiper.realIndex + 1)}
            spaceBetween={16}
            loop={true}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              768: { slidesPerView: 1, centeredSlides: true },
              1250: { slidesPerView: 1, centeredSlides: true }, // Keep 2 slides and center them
            }}
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            {cardData.map((item, index) => (
              <SwiperSlide key={index}>
                <Card
                  key={index}
                  backgroundColor={"#1F2C40"}
                  borderRadius="medium"
                  padding={{
                    base: "2rem 1rem 4.9375rem",
                    xl: "2.8125rem 6.4375rem 2.8125rem 2.1875rem",
                  }}
                  width={{
                    xl: "445px",
                  }}
                  maxHeight={{ base: "415px", xl: "436px" }}
                  variation="elevated"
                  margin="0 auto"
                >
                  <Flex direction="column" alignItems="flex-start" gap="0">
                    {item.icon && (
                      <Flex
                        direction="row"
                        alignItems="center"
                        gap="0.75rem"
                        marginBottom={{ base: "45px", xl: "25px" }}
                      >
                        <Image src={item.icon} alt={item.title || "icon"} />
                      </Flex>
                    )}
                    <Heading
                      level={4}
                      color="white"
                      marginTop="0"
                      marginBottom={{ base: "28px", xl: "29px" }}
                    >
                      {item.heading}
                    </Heading>
                    <View
                      as="ul"
                      margin="0"
                      paddingLeft="1.25rem"
                      color="white"
                      style={{ listStyleType: "disc" }}
                    >
                      {item.points.map((point, idx) => (
                        <Text
                          as="li"
                          color={"white"}
                          key={idx}
                          fontSize="small"
                          marginBottom="0.5rem"
                          style={{
                            listStyleType: "disc",
                            display: "list-item",
                          }} // this is the key
                        >
                          {point}
                        </Text>
                      ))}
                    </View>
                  </Flex>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              medium: "auto auto",
              xl: "auto auto",
            }}
            gap="2rem"
            justifyContent="center"
          >
            {cardData.map((item, index) => (
              <Card
                key={index}
                backgroundColor={"#1F2C40"}
                borderRadius="medium"
                padding={{
                  base: "2rem 1rem 4.9375rem",
                  xl: "2.8125rem 6.4375rem 2.8125rem 2.1875rem",
                }}
                width={{
                  xl: "445px",
                }}
                variation="elevated"
              >
                <Flex direction="column" alignItems="flex-start" gap="0">
                  {item.icon && (
                    <Flex
                      direction="row"
                      alignItems="center"
                      gap="0.75rem"
                      marginBottom={{ base: "45px", xl: "25px" }}
                    >
                      <Image src={item.icon} alt={item.title || "icon"} />
                    </Flex>
                  )}
                  <Heading
                    level={4}
                    color="white"
                    marginTop="0"
                    marginBottom={{ base: "28px", xl: "29px" }}
                  >
                    {item.heading}
                  </Heading>
                  <View
                    as="ul"
                    margin="0"
                    paddingLeft="1.25rem"
                    color="white"
                    style={{ listStyleType: "disc" }}
                  >
                    {item.points.map((point, idx) => (
                      <Text
                        as="li"
                        color={"white"}
                        key={idx}
                        fontSize="small"
                        marginBottom="0.5rem"
                        style={{ listStyleType: "disc", display: "list-item" }} // this is the key
                      >
                        {point}
                      </Text>
                    ))}
                  </View>
                </Flex>
              </Card>
            ))}
          </Grid>
        )}

        {isMobileOrTablet && (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            maxWidth="21.625rem"
            margin="0 auto"
            position="relative"
            marginTop="20px"
          >
            <AmplifyButton
              onClick={() => swiperRef.current?.slidePrev()}
              className="detalle-prev arrowCustom arrowCustom--prev"
              padding="0"
              width="3.4375rem"
              height="1.875rem"
            >
              <Image
                src="/images/arrow-simple-prev.svg"
                alt="Arrow prev"
                width="1.3125rem"
                height=".8125rem"
              />
            </AmplifyButton>

            <Text fontWeight={500} fontFamily="var(--font-ToyotaType-Regular)">
              {currentDetalle} de {totalPages}
            </Text>

            <AmplifyButton
              onClick={() => swiperRef.current?.slideNext()}
              className="detalle-next arrowCustom arrowCustom--next"
              padding="0"
              width="3.4375rem"
              height="1.875rem"
            >
              <Image
                src="/images/arrow-simple-next.svg"
                alt="Arrow next"
                width="1.3125rem"
                height=".8125rem"
              />
            </AmplifyButton>
          </Flex>
        )}
      </View>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
