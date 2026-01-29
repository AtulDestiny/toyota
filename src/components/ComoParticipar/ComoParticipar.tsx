import React, { useEffect, useState } from "react";
import { View, Text, Image, useBreakpointValue } from "@aws-amplify/ui-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./ComoParticipar.css";

interface StepProps {
  imageSrc: string;
  title: string;
  description: string;
  titleColor?: string;
}

const defaultSteps: StepProps[] = [
  {
    imageSrc: "/images/participar_paso1.png",
    title: "PASO 1",
    description: "Descarga el formulario de inscripción",
    titleColor: "#52A942",
  },
  {
    imageSrc: "/images/participar_paso2.png",
    title: "PASO 2",
    description: "Organízalo con tus padres",
    titleColor: "#B62411",
  },
  {
    imageSrc: "/images/participar_paso3.png",
    title: "PASO 3",
    description: "Dibuja el Carro de tus Sueños",
    titleColor: "#00A0E3",
  },
  {
    imageSrc: "/images/participar_paso4.png",
    title: "PASO 4",
    description: "Llévalo o envíalo al distribuidor de tu localidad",
    titleColor: "#6B4EA0",
  },
];

interface ComoParticiparProps {
  title?: string;
  steps?: StepProps[];
  bgimageSrcMain?: string;
  imageMobile: string;
  imageDesktop: string;
}

function StepCard({
  imageSrc,
  title,
  description,
  titleColor = "#05264E",
}: StepProps) {
  return (
    <View
      backgroundColor="#fff"
      borderRadius="16px"
      overflow="hidden"
      textAlign="center"
      width="100%"
      maxWidth="300px"
      minHeight="300px"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      padding="0 0 1rem 0"
    >
      <Image
        src={imageSrc}
        alt={title}
        width="100%"
        height="auto"
        borderRadius="12px 12px 0 0"
        objectFit="cover"
        marginBottom="1rem"
      />
      <Text fontWeight="700" fontSize="1.2rem" color={titleColor}>
        {title}
      </Text>
      <Text fontSize="0.95rem" marginTop="0.5rem" color="#05264E">
        {description}
      </Text>
    </View>
  );
}

export function ComoParticipar({
  title = "¿Cómo puedes participar?",
  steps = defaultSteps,
  // bgimageSrcMain = "/images/white_bg_with_book2.png",
  imageMobile = "/images/carro-de-tus-suenos/participate-bg-mobile.png",
  imageDesktop = "/images/carro-de-tus-suenos/participate-bg-desktop.png",
}: ComoParticiparProps): JSX.Element {
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => {
    setIsDesktop(window?.innerWidth >= 768);
  };

  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  const bgimageSrcMain = isDesktop ? imageDesktop : imageMobile;
  return (
    <View
      backgroundColor="#F6F6F6"
      minHeight={{ base: "750px", xl: "auto" }}
      padding="3rem 1rem"
      textAlign="center"
      position="relative"
      marginTop={{ base: "", medium: "", xl: "" }}
    >
      {/* Background */}
      <Image
        src={bgimageSrcMain}
        alt="Background"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        objectFit="cover"
        style={{ zIndex: 0 }}
      />

      {/* Title */}
      <Text
        as="h2"
        fontSize={{ base: "56px", medium: "56px", xl: "56px" }}
        fontWeight="400"
        padding={{ base: "0 24px", medium: "32px", xl: "36px" }}
        color="#05264E"
        lineHeight="110%"
        marginBottom="2rem"
        position="relative"
        style={{ zIndex: 1 }}
      >
        {title}
      </Text>

      {/* Swiper Slider */}
      <Swiper
        className="comoParticipar-slider"
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        navigation
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
          1250: { slidesPerView: 3 },
          1366: { slidesPerView: 4 },
        }}
        style={{ paddingBottom: "2rem", zIndex: 1 }}
      >
        {steps.map((step, index) => (
          <SwiperSlide key={index}>
            <StepCard {...step} />
          </SwiperSlide>
        ))}
      </Swiper>
    </View>
  );
}
