// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { View, Text, Image, Flex } from "@aws-amplify/ui-react";

interface ParticipantCategoryProps {
  imageSrc: string;
  title: string;
  customStyles?: {
    wrapperMarginTop?: string;
    wrapperMarginLeft?: string;
    wrapperBottom?: string;
    wrapperTop?: string;
  };
}

const defaultCategories: ParticipantCategoryProps[] = [
  {
    imageSrc: "/images/ParticipantCategory_1.jpg",
    title: "Categoría 1 (4-6 años)",
    customStyles: {
      wrapperMarginLeft: "auto",
      wrapperBottom: "-60px",
    },
  },
  {
    imageSrc: "/images/ParticipantCategory_2.jpg",
    title: "Categoría 2 (7-9 años)",
    customStyles: {
      wrapperMarginLeft: "-53%",
    },
  },
  {
    imageSrc: "/images/ParticipantCategory_3.jpg",
    title: "Categoría 3 (10-15 años)",
    customStyles: {
      wrapperMarginLeft: "auto",
      wrapperTop: "-60px",
    },
  },
];

interface QuienesPuedenParticiparProps {
  title?: string;
  categories?: ParticipantCategoryProps[];
  // topWaveImage?: string;
  bottomWaveImage?: string;
}

function ParticipantCategory({
  imageSrc,
  title,
  customStyles = {},
}: ParticipantCategoryProps) {
  const [label, age] = title.match(/^(.*?)\s\((.*?)\)$/)?.slice(1) || [
    title,
    "",
  ];

  return (
    <View
      position="relative"
      width={{ base: "162px", medium: "182px", xl: "290px" }}
      borderRadius="8px"
      backgroundColor="transparent"
      textAlign="center"
      marginTop={customStyles.wrapperMarginTop || undefined}
      marginLeft={customStyles.wrapperMarginLeft || undefined}
      bottom={customStyles.wrapperBottom || undefined}
      top={customStyles.wrapperTop || undefined}
    >
      {/* Card with image */}
      <View
        backgroundColor="#FFF3D4"
        height={{ base: "182px", medium: "220px", xl: "326px" }}
        borderRadius="8px"
        boxShadow="0px 6px 12px rgba(0, 0, 0, 0.15)"
        overflow="hidden"
      >
        <Image
          src={imageSrc}
          alt={title}
          width="100%"
          height={{ base: "182px", medium: "220px", xl: "326px" }}
          style={{ objectFit: "cover" }}
        />
      </View>

      {/* Label overlapping the bottom */}
      <Flex
        direction="column"
        backgroundColor="#FFF3D4"
        gap="0"
        justifyContent="center"
        padding={{ base: "5px 0.75rem", xl: "5px 0.75rem" }}
        borderRadius={{ base: "22px", medium: "", xl: "50px" }}
        width={{ base: "90%", medium: "", xl: "260px" }}
        height={{ base: "45px", medium: "", xl: "80px" }}
        margin="0 auto"
        position="absolute"
        left="50%"
        bottom={{ base: "-1.5rem", xl: "-40px" }}
        transform="translateX(-50%)"
        boxShadow="0px 4px 10px rgba(0,0,0,0.1)"
      >
        <Text
          fontWeight={{ base: "400", medium: "500" }}
          fontSize={{ base: "14px", medium: "18px" }}
          color="#000"
        >
          {label}
        </Text>
        <Text
          fontWeight="400"
          fontSize={{ base: "9px", medium: "12px" }}
          color="#000"
        >
          {age}
        </Text>
      </Flex>
    </View>
  );
}

export function QuienesPuedenParticipar({
  title = "¿Quiénes pueden participar?",
  categories = defaultCategories,
  imageMobile = "/images/carro-de-tus-suenos/yello-waves-mobile.svg",
  imageDesktop = "/images/carro-de-tus-suenos/yello-waves-desktop.svg",
  // bottomWaveImage = "/images/bottom-wave.png",
  // topWaveImage = "/images/top-wave.png",
  // bottomWaveImage = "/images/bottom-wave.png",
}: QuienesPuedenParticiparProps): JSX.Element {
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => {
    setIsDesktop(window?.innerWidth >= 768);
  };

  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  const topWaveImage = isDesktop ? imageDesktop : imageMobile;

  return (
    <View
      position="relative"
      backgroundColor="#F6F6F6"
      height={{ base: "982px", medium: "626px", xl: "834px", xxl: "1057px" }}
    >
      {/* Background Wave Image */}
      <View
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        style={{ zIndex: 0 }}
        // marginBottom="40px"
      >
        <Image
          src={topWaveImage}
          alt="wave image"
          objectFit="cover"
          width="100%"
          height="auto"
          minHeight={{ base: "auto", medium: "", xl: "" }}
        />
      </View>

      {/* Foreground Content */}
      <View
        padding={{ base: "6rem 1rem 4rem", xl: "11rem 2rem 4rem" }}
        textAlign="center"
        position="relative"
        style={{ zIndex: 1 }}
      >
        <Text
          as="h2"
          fontSize={{ base: "56px", medium: "56px", xl: "56px" }}
          marginBottom="3rem"
          fontWeight="400"
          padding={{ base: "0 24px", medium: "32px", xl: "36px" }}
          color="#05264E"
          lineHeight="110%"
        >
          {title}
        </Text>

        <Flex
          direction={{ base: "column", medium: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={{ base: "0", medium: "2rem" }}
        >
          {categories.map((category, index) => (
            <ParticipantCategory
              key={index}
              imageSrc={category.imageSrc}
              title={category.title}
              variant={category.variant} // ✅ Pass this
              customStyles={category.customStyles} // ✅ Pass this
            />
          ))}
        </Flex>
      </View>
    </View>
  );
}
