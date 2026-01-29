"use client";
import React, { useEffect, useState } from "react";
import { Flex, Text, Image, View } from "@aws-amplify/ui-react";

interface TestimonalCardProps {
  title?: string;
  description?: string;
  backgroundColor?: string;
  imageSrc?: string;
  descriptionFontSize?: Record<string, string>;
  padding?: string | Record<string, string>;
}

const TestimonalCard: React.FC<TestimonalCardProps> = ({
  title,
  description = "Está basado en RBC (Rehabilitación basada en comunidad) en el que se involucra no solo a la familia del beneficiario sino a su entorno y a la sociedad en su proceso rehabilitación psicosocial, llevándolos hacia una rápida adaptación a su nueva condición y preparándolos para enfrentar los nuevos desafíos que le presenta la sociedad",
  backgroundColor = "#000",
  imageSrc = "/images/Vamos-image.png",
  descriptionFontSize = { base: "18px", xl: "22px" },
  padding = { base: "45px 15px" },
}) => {
  const defaultTitle =
    "Modelo implementado por FUNDAFE en el proceso de rehabilitación";
  const defaultImage = "/images/Vamos-image.png";

  // Add state to track if we're in mobile view
  const [isMobile, setIsMobile] = useState(false);

  // Track window width to determine if we're in mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1250); // 1250px is the xl breakpoint
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <View
      backgroundColor={backgroundColor}
      padding={padding ? padding : { base: "45px 15px" }}
    >
      <Flex
        direction="column"
        color="white"
        gap="1.5rem"
        margin={{
          xl: "0 auto",
        }}
        maxWidth={{
          xl: "60%",
        }}
        fontFamily="sans-serif"
      >
        {/* Title is always at the top */}
        <Text
          color={"#fff"}
          textAlign={{ base: "left", xl: "center" }}
          as="h2"
          fontSize={{ base: "32px", xl: "56px" }}
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            medium: "var(--font-ToyotaType-Regular)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
          fontWeight={{
            base: "400",
            medium: "400",
            xl: "400",
          }}
          fontStyle={{
            base: "normal",
            medium: "normal",
            xl: "normal",
          }}
          alignSelf={{
            xl: "stretch",
          }}
          lineHeight={{
            base: "30.4px",
            medium: "normal",
            xl: "110%",
          }}
          margin={{
            base: "",
            medium: "",
            xl: "0 10%",
            xxl: "0 10%",
          }}
          letterSpacing={{
            base: "",
            medium: "",
            xl: "-2%",
          }}
        >
          {title || defaultTitle}
        </Text>

        {/* For mobile: Description comes before image */}
        {isMobile ? (
          <>
            {/* Mobile: Description first, Image after */}
            <Text
              color="#fff"
              textAlign={{ base: "left", xl: "center" }}
              dangerouslySetInnerHTML={{ __html: description ?? "" }}
              fontFamily="var(--font-ToyotaType-Regular)"
              fontSize={descriptionFontSize}
              lineHeight="1.5"
            />
            <Image
              src={imageSrc || defaultImage}
              alt="Proceso de rehabilitación"
              borderRadius="0.375rem"
              objectFit="cover"
              width="100%"
              maxWidth={{ base: "345px", xl: "910px" }}
              height={{ base: "auto" }}
              margin="0 auto"
            />
          </>
        ) : (
          <>
            {/* Desktop: Image first, Description after */}
            <Image
              src={imageSrc || defaultImage}
              alt="Proceso de rehabilitación"
              borderRadius="0.375rem"
              objectFit="cover"
              width="100%"
              maxWidth={{ base: "345px", xl: "910px" }}
              height={{ base: "auto", xl: "305px" }}
              margin="0 auto"
            />
            <Text
              color="#fff"
              textAlign={{ base: "left", xl: "center" }}
              dangerouslySetInnerHTML={{ __html: description ?? "" }}
              fontFamily="var(--font-ToyotaType-Regular)"
              fontSize={descriptionFontSize}
              lineHeight="1.5"
            />
          </>
        )}
      </Flex>
    </View>
  );
};

export default TestimonalCard;
