import React from "react";
import {
  Card,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { colors } from "@/theme/colors";

type BannerImage = {
  mobile: string;
  desktop: string;
  alt: string;
};

export type BannerFeature = {
  icon: string;
  label: string;
  available: boolean;
};

interface BannerProps {
  image: BannerImage;
  features?: BannerFeature[];
  title?: string;
  price?: string;
  height?: string;
}

const defaultFeatures: BannerFeature[] = [
  {
    icon: "/images/abs.svg",
    label: "SISTEMA ANTIBLOQUEO DE FRENOS",
    available: true,
  },
  {
    icon: "/images/estability.svg",
    label: "CONTROL ELECTRÓNICO DE ESTABILIDAD",
    available: true,
  },
  {
    icon: "/images/front-alert.svg",
    label: "ALERTA DE COLISIÓN FRONTAL",
    available: true,
  },
  {
    icon: "/images/basy-seat.svg",
    label: "ISOFIX\nSISTEMA DE SUJECIÓN INFANTIL",
    available: false,
  },
  {
    icon: "/images/air-bags.svg",
    label: "BOLSAS DE AIRE (8)",
    available: true,
  },
];

export const Banner = ({
  image,
  features = defaultFeatures,
  title = "Land Cruiser Prado",
  price = "Desde $303.500.000*",
  height,
}: BannerProps) => {
  const isMobile = useBreakpointValue({ base: true, medium: false });

  return (
    <>
      <View
        position={"relative"}
        color={"white"}
        height={{ base: height ? "auto" : "624px", xl: "" }}
        overflow={"hidden"}
      >
        <Image
          src={isMobile ? image?.mobile : image?.desktop}
          alt={image?.alt}
          minHeight={{ base: "100%", xl: height || "630px" }}
          maxHeight={{ xl: height || "630px" }}
          width={"100%"}
          objectFit={"cover"}
        />

        <Flex
          direction={{ base: "column-reverse", large: "row" }}
          width={"100%"}
          position={"absolute"}
          bottom={"0"}
          left={"0"}
          padding={{ base: "1.6875rem .9375rem", xl: "5.9375rem 2.25rem 2rem" }}
          backgroundImage={{
            xl: colors.theme.shadow,
          }}
        >
          <View width={"100%"} maxWidth={"max-content"}>
            <Heading
              level={3}
              color={"inherit"}
              fontSize={{ base: "32px", xl: "xxxxl" }}
              marginBottom={{ xl: ".5rem" }}
              fontWeight={"400"}
              lineHeight={{ base: "130%", xl: "110%" }}
              letterSpacing={{ base: "0", xl: "-2%" }}
              fontFamily={"var(--font-toyotaDisplay)"}
              style={{ verticalAlign: "bottom" }}
            >
              {title}
            </Heading>
            <Text
              color={"inherit"}
              fontSize={{ base: "sm", xl: "ml" }}
              marginBottom={{ base: "14px", xl: ".5rem" }}
              fontFamily={"var(--font-toyotaDisplay)"}
              lineHeight={{ base: "140%", xl: "100%" }}
              fontWeight={"400"}
              letterSpacing={{ base: "0", xl: "0" }}
              style={{ verticalAlign: "middle" }}
            >
              {price}
            </Text>
            <Text
              color={"#E8EEF2"}
              fontSize={{ base: "9px", xl: "ss" }}
              fontWeight={"400"}
              lineHeight={{ base: "120%", xl: "100%" }}
              fontFamily={"var(--font-ToyotaType-Regular)"}
              style={{
                verticalAlign: "middle",
                whiteSpace: isMobile ? "pre-line" : "normal",
              }}
            >
              {isMobile
                ? "*Precio sugerido al público. \nAplican Términos y Condiciones. *Imágenes de referencia."
                : "*Precio sugerido al público. Aplican Términos y Condiciones. *Imágenes de referencia."}
            </Text>
          </View>
          <View width={"100%"}>
            {isMobile ? (
              <></>
            ) : (
              <Grid
                templateColumns={"repeat(5, auto)"}
                gap={{ base: "1rem", xl: "4.75rem" }}
                justifyContent={"center"}
                alignItems={"flex-start"}
                maxWidth={{ xl: "max-content" }}
                height={"100%"}
                margin={"auto auto 0"}
              >
                {features.map((feature, index) => (
                  <Flex
                    direction={"column"}
                    justifyContent={"flex-end"}
                    key={index}
                    backgroundColor={"transparent"}
                    width={{ base: "48px", xl: "80px" }}
                    height={{ base: "auto" }}
                    textAlign={"center"}
                    padding={"0"}
                    gap={"0.25rem"}
                  >
                    <View position={"relative"}>
                      <Image
                        src={feature.icon}
                        alt={feature.label}
                        width={{ base: "50px", xl: "90px" }}
                        aspectRatio={1}
                        style={{
                          filter:
                            "invert(100%) sepia(34%) saturate(584%) hue-rotate(179deg) brightness(114%) contrast(107%)",
                        }}
                      />
                      <Image
                        src={
                          feature.available
                            ? "/images/check.svg"
                            : "/images/not-check.svg"
                        }
                        alt={feature.available ? "Disponible" : "No disponible"}
                        width={{ base: "10px", xl: "21.2px" }}
                        aspectRatio={1}
                        position={"absolute"}
                        left={{ base: "33px", xl: "50px" }}
                        style={{
                          filter:
                            "invert(100%) sepia(34%) saturate(584%) hue-rotate(179deg) brightness(114%) contrast(107%)",
                        }}
                      />
                    </View>
                    <Text
                      fontSize={{ base: "6px", xl: "9px" }}
                      textTransform={"uppercase"}
                      color={"inherit"}
                      fontFamily={"var(--font-toyotaDisplay)"}
                      fontWeight={"400"}
                      lineHeight={"100%"}
                      letterSpacing={"0"}
                    >
                      {feature.label}
                    </Text>
                  </Flex>
                ))}
              </Grid>
            )}
          </View>
        </Flex>
      </View>
    </>
  );
};

export default Banner;
