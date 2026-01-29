import { Flex, Image, Grid, Text, View } from "@aws-amplify/ui-react";

export interface BannerFeature {
  icon: string;
  label: string;
  available: boolean;
}

interface BannerFeaturesProps {
  features: BannerFeature[];
}

export function BannerFeatures({ features }: BannerFeaturesProps) {
  return (
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
                  "sepia(34%) saturate(584%) hue-rotate(179deg) brightness(114%) contrast(107%)",
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
                  "sepia(34%) saturate(584%) hue-rotate(179deg) brightness(114%) contrast(107%)",
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
  );
}
