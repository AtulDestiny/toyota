"use client";

import React from "react";
import {
  View,
  Image,
  Text,
  Link,
  Grid,
  useBreakpointValue,
  Divider,
  Flex,
} from "@aws-amplify/ui-react";

interface Feature {
  title: string;
  description: string;
  image: string;
  link: string;
  width?: string | object;
  height?: string | object;
}

interface Styles {
  margin?: string;
  maxWidth?: string;
  padding?: string;
}

const defaultFeatures: Feature[] = [
  {
    title: "Sistema de pre-colisión frontal (PCS)*",
    description:
      "Este sistema puede detectar vehículos automotores que circulan por delante en las calles y autopistas.",
    image: "/images/car_with_slicener.png",
    link: "#",
  },
  {
    title: "Control de velocidad crucero adaptativo (ACC)*",
    description:
      'Es un sistema similar al "control de velocidad crucero" que permite conducir a una velocidad constante predeterminada.',
    image: "/images/car_with_zig.png",
    link: "#",
  },
  {
    title: "Sistema de alerta de cambio de carril (LDA)*",
    description:
      "Este sistema puede alertar al conductor cuando el vehículo se desvía involuntariamente de su carril.",
    image: "/images/car_zig-zag.png",
    link: "#",
  },
  {
    title: "Luces altas automáticas (AHB)*",
    description:
      "El sistema de Luces Altas Automáticas ayuda al conductor a incrementar la visibilidad de noche gracias al uso frecuente de las luces altas sin distraer a otros conductores.",
    image: "/images/car_with_vibration.png",
    link: "#",
  },
];

interface SafetyFeaturesGridProps {
  features?: Feature[];
  isButton?: boolean;
  isDivider?: boolean;
  isMobileDivider?: boolean;
  viewStyle?: Styles;
}

export const SafetyFeaturesGrid: React.FC<SafetyFeaturesGridProps> = ({
  features = defaultFeatures,
  isButton = true,
  isDivider = true,
  isMobileDivider = true,
  viewStyle,
}) => {
  const columns =
    useBreakpointValue({ base: "1fr", medium: "1fr 1fr", xl: "1fr 1fr" }) ||
    "1fr";

  return (
    <View
      padding={viewStyle?.padding || { base: "1rem 0", xxl: "2rem 2rem 0px" }}
      margin={viewStyle?.margin}
      maxWidth={viewStyle?.maxWidth}
      backgroundColor="#fff"
    >
      {isDivider && (
        <Divider
          marginBottom={{
            xl: "30px",
          }}
          display={{
            base: "none",
            medium: "none",
            xl: "block",
          }}
          minWidth={{ base: "338px", medium: "338px", xl: "" }}
          maxHeight={{ base: "0px", xl: "auto" }}
        />
      )}
      <Grid templateColumns={columns} gap={{ base: "2rem", xxl: "7.5rem" }}>
        {features.map((feature, index) => (
          <>
            {isMobileDivider && (
              <Divider
                display={{
                  base: "block",
                  medium: "none",
                  xl: "none",
                }}
              />
            )}

            <View
              key={index}
              borderRadius="0.5rem"
              overflow="hidden"
              backgroundColor="white"
              width={{ base: "auto", xxl: "600px" }}
            >
              <Flex direction="column" gap="0">
                <Text
                  fontFamily="var(--font-ToyotaType-Regular)"
                  fontSize={{ base: "22px", xl: "26px" }}
                  fontWeight="700"
                  textAlign="left"
                  marginBottom={{ base: "30px", medium: "8px" }}
                  marginTop={{ medium: "50px" }}
                  order={{ medium: "2" }}
                >
                  {feature.title}
                </Text>

                <Image
                  src={feature.image}
                  alt={feature.title}
                  // width="100%"
                  // height="auto"
                  objectFit="cover"
                  width={
                    feature.width || {
                      base: "345px",
                      medium: "100%",
                      xxl: "600px",
                    }
                  }
                  height={feature.height || { base: "225px", medium: "395px" }}
                  display={{ base: "flex" }}
                  margin={{ base: "0 auto", xl: "0" }}
                  style={{ borderRadius: "20px" }}
                  order={{ medium: "1" }}
                />
                <Text
                  style={{ whiteSpace: "pre-line" }}
                  fontSize="0.875rem"
                  marginTop={{ base: "30px", xl: "0.5rem" }}
                  marginBottom={{ base: "30px", xl: "20px" }}
                  color="#333"
                  order={{ medium: "3" }}
                >
                  {feature.description}
                </Text>
                {isButton && (
                  <Link
                    fontSize="0.875rem"
                    textDecoration={"underline"}
                    color="#000"
                    href={feature.link}
                    order={{ medium: "4" }}
                  >
                    Conoce más detalles
                  </Link>
                )}
              </Flex>
            </View>
          </>
        ))}
      </Grid>
      {isDivider && (
        <Divider
          marginBottom={{
            xl: "30px",
          }}
          marginTop={{ xl: "74.53px" }}
          display={{
            base: "none",
            medium: "none",
            xl: "block",
          }}
          minWidth={{ base: "338px", medium: "338px", xl: "" }}
          maxHeight={{ base: "0px", xl: "auto" }}
        />
      )}
    </View>
  );
};
