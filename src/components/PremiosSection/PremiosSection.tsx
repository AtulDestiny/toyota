import React, { useEffect, useState } from "react";
import { View, Flex, Text, Image } from "@aws-amplify/ui-react";
import "./PremiosSection.css";

interface PrizeItemProps {
  imageSrc: string;
  description: string;
}

const defaultPrizes: PrizeItemProps[] = [
  {
    imageSrc: "/images/price-section_image_1.png",
    description: "Descripción premio",
  },
  {
    imageSrc: "/images/price-section_image_1.png",
    description: "Descripción premio",
  },
  {
    imageSrc: "/images/price-section_image_1.png",
    description: "Descripción premio",
  },
  {
    imageSrc: "/images/price-section_image_1.png",
    description: "Descripción premio",
  },
];

interface PremiosSectionProps {
  title?: string;
  backgroundImage?: string;
  imageMobile?: string;
  imageDesktop?: string;
  subtitle?: string;
  prizes?: PrizeItemProps[];
}

export function PremiosSection({
  title = "Premios",
  // backgroundImage = "/images/carro-de-tus-suenos/Clouds-brown.png",
  imageMobile = "/images/carro-de-tus-suenos/clouds-brown-mobile.svg",
  imageDesktop = "/images/carro-de-tus-suenos/clouds-brown-desktop.png",
  subtitle = "Categorías 1, 2 y 3",
  prizes = defaultPrizes,
}: PremiosSectionProps): JSX.Element {
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => {
    setIsDesktop(window?.innerWidth >= 768);
  };

  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  const backgroundImage = isDesktop ? imageDesktop : imageMobile;

  return (
    <View
      position="relative"
      overflow="hidden"
      minHeight={{ base: "890px", medium: "705px", xxl: "991px" }}
    >
      {/* Background Image Layer */}
      <View
        backgroundColor="#F6F6F6"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        style={{ zIndex: 0 }}
      >
        <Image
          src={backgroundImage}
          alt="background"
          objectFit="cover"
          width="100%"
          height={{ base: "100%", medium: "100%", xl: "" }}
        />
      </View>

      {/* Optional Decoration Layer (still in back) */}
      <View
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundImage="url('/images/background-decorations.png')"
        opacity="0.05"
        style={{ zIndex: 1 }}
      />

      {/* Foreground Content Layer */}
      <View
        position="relative"
        paddingTop={{ base: "8rem", xxl: "18rem" }}
        paddingBottom="8rem"
        paddingLeft="2rem"
        paddingRight="2rem"
        textAlign="center"
        style={{ zIndex: 2 }}
      >
        <Text
          as="h2"
          fontSize={{ base: "56px", medium: "56px", xl: "56px" }}
          lineHeight="130%"
          color="white"
          fontWeight="400"
        >
          {title}
        </Text>
        <Text
          as="h3"
          fontSize={{ base: "12px", medium: "16px", large: "16px" }}
          color="white"
          fontWeight="normal"
          marginTop="0.5rem"
        >
          {subtitle}
        </Text>

        {/* Prize Items */}
        <Flex
          className="awardsCards"
          marginTop="2.625rem"
          display="flex"
          direction={{ base: "column", medium: "row", xl: "row" }}
          wrap="wrap"
          justifyContent="center"
          gap={{ base: "0", medium: "3rem", xl: "5.5rem" }}
        >
          {prizes.map((prize, index) => (
            <View
              className="awardsCard"
              key={index}
              display="flex"
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <View
                width={{ base: "128px", xl: "200px" }}
                height={{ base: "128px", xl: "200px" }}
                borderRadius="9999px"
                overflow="hidden"
                backgroundColor="white"
                display="flex"
                boxShadow="4px 0px 20px 0px #1D67F240"
              >
                <Image
                  src={prize.imageSrc}
                  alt={prize.description}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </View>
              <Text
                color="white"
                fontSize={{ base: "14px", xl: "22px" }}
                fontWeight="normal"
                marginTop="5px"
              >
                {prize.description}
              </Text>
            </View>
          ))}
        </Flex>
      </View>

      {/* Bottom Decorative Waves (also above bg) */}
      <View position="relative" style={{ zIndex: 2 }}>
        {/* Repeat or optimize SVG as needed */}
      </View>
    </View>
  );
}
