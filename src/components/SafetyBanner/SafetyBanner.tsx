import React from "react";
import { View, Text, Image, useTheme } from "@aws-amplify/ui-react";

interface ViewResponsiveProp {
  base?: string;
  medium?: string;
  xl?: string;
}

interface ViewStyleProps {
  margin?: string | ViewResponsiveProp;
  maxWidth?: string | ViewResponsiveProp;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface SafetyBannerProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  videoIconSrc?: string;
  viewStyle?: ViewStyleProps;
  isVideoIcon?:boolean;
}

export const SafetyBanner = ({
  title = "Trabajamos para tu seguridad y la de tu familia",
  description = "Con tu conciencia vial, responsabilidad y la mejor tecnología en seguridad de Toyota podemos hacer grandes cambios.",
  imageSrc = "https://placehold.co/800x450?text=Toyota+Seguridad",
  videoIconSrc = "/path/to/video-icon.png",
  viewStyle,
  isVideoIcon = true
}: SafetyBannerProps) => {
  const { tokens } = useTheme();

  return (
    <View
      as="section"
      backgroundColor="black"
      padding={tokens.space.large}
      textAlign="center"
      margin={viewStyle?.margin}
      maxWidth={viewStyle?.maxWidth}
    >
      {/* Title */}
      <Text
        as="h2"
        fontSize={{
          base: "14px",
          xl: "26px",
        }}
        fontWeight="bold"
        marginBottom={tokens.space.large}
        color="white"
      >
        {title}
      </Text>
      <View
        position="relative"
        width="100%"
        maxWidth="800px"
        margin="0 auto"
        marginBottom={tokens.space.large}
      >
        <Image
          src={imageSrc}
          alt="Toyota Seguridad"
          width="100%"
          borderRadius={tokens.radii.medium}
        />
        {
          isVideoIcon && (
            <Image
              src={videoIconSrc}
              alt="Play Video"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="80px"
              height="80px"
            />
          )
        }
      </View>

      <Text
        fontSize={tokens.fontSizes.small}
        lineHeight="1.6"
        maxWidth="800px"
        margin="0 auto"
        color="white"
        textAlign={{
          base: "left",
        }}
      >
        {description}
      </Text>
    </View>
  );
};
