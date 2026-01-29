// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  View,
  Image,
  Text,
  useBreakpointValue,
  Flex,
} from "@aws-amplify/ui-react";
import React from "react";

// Define responsive value type for consistent styling
type ResponsiveValue = {
  base?: string | number;
  md?: string | number;
  xl?: string | number;
};

// Generic style properties interface
interface StyleProps {
  [key: string]: string | number | ResponsiveValue | undefined;
}

// Main component props
interface HistoryComponentProps {
  title?: string;
  titleStyle?: StyleProps;
  description?: string;
  descriptionStyle?: StyleProps;
  image?: string;
  imageStyle?: StyleProps;
  bgColor?: string;
  textColor?: string;
  containerStyle?: StyleProps;
  contentStyle?: StyleProps;
}

export const HistoryComponent: React.FC<HistoryComponentProps> = (props) => {
  // Responsive breakpoints
  const isMobile = useBreakpointValue({ base: true, large: false }) || false;
  const isTablet =
    useBreakpointValue({ base: false, medium: true, large: false }) || false;
  const isDesktop = useBreakpointValue({ base: false, large: true }) || false;

  // Helper function to resolve responsive values based on current breakpoint
  const resolveResponsiveValue = (
    value?: string | number | ResponsiveValue
  ): string | number | undefined => {
    if (typeof value === "string" || typeof value === "number") return value;
    if (typeof value === "object" && value !== null) {
      if (isDesktop) return value.xl ?? value.md ?? value.base;
      if (isTablet) return value.md ?? value.base;
      return value.base;
    }
    return undefined;
  };

  // Default or provided values
  const title = props.title || "Historia";
  const description =
    props.description ||
    "La palabra Toyota se originó a partir del apellido del fundador, Kiichiro Toyoda. En sus inicios, los vehículos producidos por la empresa eran vendidos originalmente con el emblema Toyoda. El logo tenía los colores de la bandera japonesa rojo y blanco y la katakana de Toyota.";
  const image = props.image || "/images/toyota-logo.png";
  const bgColor = props.bgColor || "#c8312b";
  const textColor = props.textColor || "#fff";

  // Styles with defaults
  const titleStyle = props.titleStyle || {};
  const descriptionStyle = props.descriptionStyle || {};
  const imageStyle = props.imageStyle || {};
  const containerStyle = props.containerStyle || {};
  const contentStyle = props.contentStyle || {};

  return (
    <View
      width="100%"
      backgroundColor={bgColor}
      padding="0"
      marginBottom={resolveResponsiveValue(containerStyle.marginBottom) || "0"}
    >
      <Flex
        direction={isMobile ? "column-reverse" : "row"}
        alignItems="center"
        justifyContent="space-between"
        padding={resolveResponsiveValue(contentStyle.padding) || "3rem"}
        maxWidth="1200px"
        margin="0 auto"
      >
        {/* Image section */}
        <View
          width={isMobile ? "100%" : "40%"}
          textAlign={isMobile ? "center" : ""}
          padding={resolveResponsiveValue(imageStyle.padding) || "1rem"}
        >
          <Image
            src={image}
            alt="Toyota Logo"
            width={resolveResponsiveValue(imageStyle.width) || "100%"}
            height={resolveResponsiveValue(imageStyle.height) || "auto"}
            objectFit="contain"
            maxWidth={resolveResponsiveValue(imageStyle.maxWidth)}
          />
        </View>

        {/* Content section */}
        <View
          width={isMobile ? "100%" : "60%"}
          padding={isMobile ? "1rem 1rem 27px 1rem" : "1rem 1rem 1rem 3rem"}
          color={textColor}
          textAlign={isMobile ? "center" : ""}
        >
          <Text
            fontSize={resolveResponsiveValue(titleStyle.fontSize) || "3rem"}
            fontWeight={resolveResponsiveValue(titleStyle.fontWeight) || "400"}
            lineHeight={resolveResponsiveValue(titleStyle.lineHeight) || "1.2"}
            marginBottom={
              resolveResponsiveValue(titleStyle.marginBottom) || "1.5rem"
            }
            fontFamily={resolveResponsiveValue(titleStyle.fontFamily)}
            color={textColor} // Add this line
          >
            {title}
          </Text>

          <Text
            fontSize={
              resolveResponsiveValue(descriptionStyle.fontSize) || "1.125rem"
            }
            lineHeight={
              resolveResponsiveValue(descriptionStyle.lineHeight) || "1.6"
            }
            fontWeight={
              resolveResponsiveValue(descriptionStyle.fontWeight) || "400"
            }
            fontFamily={resolveResponsiveValue(descriptionStyle.fontFamily)}
            color={textColor} // Add this line
          >
            {description}
          </Text>
        </View>
      </Flex>
    </View>
  );
};
