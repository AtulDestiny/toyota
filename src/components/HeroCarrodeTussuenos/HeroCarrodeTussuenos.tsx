// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@aws-amplify/ui-react";

interface HeroCarrodeTussuenosProps {
  title?: string;
  subtitle?: string;
  kidImage?: string;
  topIcon?: string;
  backgroundColor?: string;
  penIcon?: string;
  starIcon?: string;
  mindIcon?: string;
  kidImagemain?: string;
  imageMobile: string;
  imageDesktop: string;
}

export function HeroCarrodeTussuenos({
  // title = "Crea el Carro de tus Sueños de Toyota",
  // subtitle,
  imageMobile = "/images/carro-de-tus-suenos/kids-banner-mobile.png",
  imageDesktop = "/images/carro-de-tus-suenos/kids-banner-desktop.png",
  kidImage = "/images/single-frame-image1.png",
  // topIcon = "/images/toyota-dream-car-contex.png",
  backgroundColor = "",
}: HeroCarrodeTussuenosProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => {
    setIsDesktop(window?.innerWidth >= 768);
  };

  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  const selectedImage = isDesktop ? imageDesktop : imageMobile;

  return (
    <View
      backgroundColor={backgroundColor}
      textAlign="center"
      paddingTop={{ base: "0", xl: "0" }}
      // paddingBottom={{ base: "2rem", xl: "25px" }}
      position="relative"
      overflow="hidden"
    >
      {/* Top Icon */}
      {/* <View
        // margin={}
        margin={{ base: "5%", medium: "87px 0px 4px", xl: "87px 0px 4px" }}
      > */}
      {/* <Image
          src={topIcon}
          alt="Top Icon"
          width={{ base: "50px", medium: "60px", large: "70px" }}
          margin="0 auto"
        /> */}
      {/* </View> */}
      <View
        position={{ base: "absolute", medium: "absolute", xl: "absolute" }}
        width={{ base: "", medium: "100%", xl: "100%" }}
        display={{ base: "flex", medium: "flex", xl: "flex" }}
      >
        <Text
          fontFamily="var(--font-toyotaDisplay)"
          fontWeight="400"
          color="white"
          fontSize={{ base: "56px", medium: "56px", xl: "56px" }}
          lineHeight={{ base: "110%", medium: "110%", large: "61.6px" }}
          padding={{
            base: "1rem",
            medium: "190px 0px 10px",
            xl: "195px 0px 10px",
          }}
          letterSpacing="-1.12px"
          margin={{ base: "64px 10px", medium: "0 auto", xl: "0 auto" }}
          width={{ base: "100%", medium: "52%", xl: "34%" }}
          position={{ base: "", medium: "relative", xl: "relative" }}
          textAlign={{ base: "", medium: "relative", xl: "relative" }}
        >
          {/* {title} */}
          El carro de tus sueños
        </Text>
      </View>
      <View
        minHeight={{
          base: "350px",
          medium: "",
          xl: "723px",
        }}
      >
        <Image
          src={selectedImage}
          alt="Dream car kid"
          objectFit={{
            base: "cover",
            medium: "cover",
            xl: "cover",
          }}
          width={{
            base: "100%",
            medium: "100%",
            xl: "",
          }}
          minHeight={{
            base: "350px",
            medium: "723px",
            xl: "723px",
          }}
          maxWidth="100%"
        />
      </View>
      {/* Title + Floating Icons */}
      {/* <View position="relative">
        <Image
          src={penIcon}
          alt="Pen Icon"
          position="absolute"
          right={{ base: "5%", medium: "8%", xl: "10%" }}
          top={{ base: "5%", medium: "8%", xl: "10%" }}
          height="auto"
        />
        <Image
          src={starIcon}
          alt="Star Icon"
          position="absolute"
          right={{ base: "5%", medium: "8%", xl: "10%" }}
          top={{ base: "90%", medium: "95%", xl: "100%" }}
          height="auto"
        />
        <Image
          src={mindIcon}
          alt="Mind Icon"
          position="absolute"
          left={{ base: "20%", medium: "24%", xl: "27%" }}
          top={{ base: "5%", medium: "8%", xl: "10%" }}
          transform="translateX(-50%)"
          height="auto"
        />
      </View> */}

      {/* Kid Image + Wave */}
      {/* Wave at bottom */}

      {/* <View
        position="relative"
        zIndex={2} // Kid is on top of wave
        marginTop="2rem"
      >
        <Image
          src={kidImage}
          alt="Dream car kid"
          objectFit="contain"
          width={{
            base: "180px",
            medium: "220px",
            xl: "280px",
          }}
          maxWidth="100%"
          margin="0 auto"
        />
      </View>

      <View
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        zIndex={1} // Ensure it's above the background
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 375 82"
          fill="none"
          width="100%"
          height="auto"
          preserveAspectRatio="none"
        >
          <path
            d="M375.757 0H0C0 7.95521 14.5002 58.5793 80.501 47.008C133.302 37.7511 131.636 26.4622 206.503 68.7041C281.369 110.946 381.59 42.7894 375.757 0Z"
            fill="#9C29B2"
          />
        </svg>
      </View> */}
    </View>
  );
}
