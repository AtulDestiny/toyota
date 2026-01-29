import { View, Text, useBreakpointValue } from "@aws-amplify/ui-react";
import React from "react";

type ResponsiveValue = {
  base?: string | number;
  md?: string | number;
  xl?: string | number;
};

// Define a simplified StyleProps interface that we'll use for our component
interface StyleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface MultiParaDescProps {
  title?: string;
  titleStyle?: StyleProps;
  description?: string;
  descriptionStyle?: StyleProps;
  additionalInfo?: string;
  additionalInfoStyle?: StyleProps;
  factorInfo?: string;
  factorInfoStyle?: StyleProps;
  bgColor?: string;
  textColor?: string;
  containerStyle?: StyleProps;
  contentStyle?: StyleProps;
}

export const MultiParaDesc: React.FC<MultiParaDescProps> = (props) => {
  const isMobile = useBreakpointValue({ base: true, large: false }) || false;
  const isTablet =
    useBreakpointValue({ base: false, medium: true, large: false }) || false;
  const isDesktop = useBreakpointValue({ base: false, large: true }) || false;

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

  const title = props.title || "La Marca";
  const description =
    props.description ||
    "El actual logo de Toyota fue introducido en 1989 para conmemorar el aniversario número 50 de la compañía e hizo su debut en el modelo de lujo Celsior.";
  const additionalInfo =
    props.additionalInfo ||
    "Su desarrollo tomó cerca de cinco años, debido a que la empresa necesitaba definir un logo adecuado que respondiera a la creciente presencia de Toyota en los países extranjeros.";
  const factorInfo =
    props.factorInfo ||
    "En su elaboración se consideraron dos factores: el primero, que debía ser fácilmente reconocible a la distancia y anunciara la llegada de Toyota y, segundo que su impacto visual hiciera que la marca se destacara de otros vehículos.";
  const bgColor = props.bgColor || "#2b2d42";
  const textColor = props.textColor || "#fff";

  const titleStyle = props.titleStyle || {};
  const descriptionStyle = props.descriptionStyle || {};
  const additionalInfoStyle = props.additionalInfoStyle || {};
  const factorInfoStyle = props.factorInfoStyle || {};
  const containerStyle = props.containerStyle || {};
  const contentStyle = props.contentStyle || {};

  // Create a safe navigation handler
  return (
    <View
      width="100%"
      padding="0"
      marginBottom={resolveResponsiveValue(containerStyle.marginBottom) || "0"}
    >
      {/* Main content with dark background */}
      <View backgroundColor={bgColor} width="100%">
        <View
          maxWidth={isMobile ? "100%" : "800px"}
          margin="0 auto"
          padding={
            resolveResponsiveValue(contentStyle.padding) ||
            (isMobile ? "0" : "0 20px")
          }
          paddingTop={resolveResponsiveValue(contentStyle.paddingTop)}
          paddingBottom={resolveResponsiveValue(contentStyle.paddingBottom)}
        >
          <View color={textColor}>
            <Text
              fontSize={resolveResponsiveValue(titleStyle.fontSize) || "2rem"}
              fontWeight={
                resolveResponsiveValue(titleStyle.fontWeight) || "400"
              }
              marginBottom={
                resolveResponsiveValue(titleStyle.marginBottom) || "1rem"
              }
              marginTop={resolveResponsiveValue(titleStyle.marginTop)}
              paddingTop={resolveResponsiveValue(titleStyle.paddingTop)}
              paddingBottom={resolveResponsiveValue(titleStyle.paddingBottom)}
              color={titleStyle.color || textColor}
            >
              {title}
            </Text>

            <Text
              fontSize={
                resolveResponsiveValue(descriptionStyle.fontSize) || "1.5rem"
              }
              lineHeight={
                resolveResponsiveValue(descriptionStyle.lineHeight) || "1.75"
              }
              fontWeight={
                resolveResponsiveValue(descriptionStyle.fontWeight) || "700"
              }
              marginBottom={
                resolveResponsiveValue(descriptionStyle.marginBottom) ||
                "1.5rem"
              }
              marginTop={resolveResponsiveValue(descriptionStyle.marginTop)}
              paddingTop={resolveResponsiveValue(descriptionStyle.paddingTop)}
              paddingBottom={resolveResponsiveValue(
                descriptionStyle.paddingBottom
              )}
              color={descriptionStyle.color || textColor}
            >
              {description}
            </Text>

            <Text
              fontSize={
                resolveResponsiveValue(additionalInfoStyle.fontSize) ||
                "1.125rem"
              }
              lineHeight={
                resolveResponsiveValue(additionalInfoStyle.lineHeight) || "1.75"
              }
              fontWeight={resolveResponsiveValue(
                additionalInfoStyle.fontWeight
              )}
              marginBottom={
                resolveResponsiveValue(additionalInfoStyle.marginBottom) ||
                "1rem"
              }
              marginTop={resolveResponsiveValue(additionalInfoStyle.marginTop)}
              paddingTop={resolveResponsiveValue(
                additionalInfoStyle.paddingTop
              )}
              paddingBottom={resolveResponsiveValue(
                additionalInfoStyle.paddingBottom
              )}
              color={additionalInfoStyle.color || textColor}
            >
              {additionalInfo}
            </Text>

            <Text
              style={{ whiteSpace: "pre-line" }}
              fontSize={
                resolveResponsiveValue(factorInfoStyle.fontSize) || "1.125rem"
              }
              lineHeight={
                resolveResponsiveValue(factorInfoStyle.lineHeight) || "1.75"
              }
              fontWeight={resolveResponsiveValue(factorInfoStyle.fontWeight)}
              marginBottom={
                resolveResponsiveValue(factorInfoStyle.marginBottom) || "1.5rem"
              }
              marginTop={resolveResponsiveValue(factorInfoStyle.marginTop)}
              paddingTop={resolveResponsiveValue(factorInfoStyle.paddingTop)}
              paddingBottom={resolveResponsiveValue(
                factorInfoStyle.paddingBottom
              )}
              color={factorInfoStyle.color || textColor}
            >
              {factorInfo}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
