// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  View,
  Image,
  Text,
  useBreakpointValue,
  Flex,
  Card,
  Heading,
  Button,
} from "@aws-amplify/ui-react";
import React from "react";

type ResponsiveValue = {
  base?: string | number;
  md?: string | number;
  xl?: string | number;
};

// Define a more specific StyleProps interface to avoid 'any'
interface StyleProps {
  [key: string]: string | number | ResponsiveValue | undefined;
}

interface PlanRenueveCardProps {
  title?: string;
  titleStyle?: StyleProps;
  tagline?: string;
  taglineStyle?: StyleProps;
  image?: string;
  imageStyle?: StyleProps;
  description1?: string;
  description2?: string;
  descriptionStyle?: StyleProps;
  bgColor?: string;
  textColor?: string;
  containerStyle?: StyleProps;
  cardStyle?: StyleProps;
}

export const PlanRenueveCard: React.FC<PlanRenueveCardProps> = (props) => {
  // Removed unused isMobile variable and kept the useful breakpoint values
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

  const title = props.title || "PLAN RENUEVE";
  const tagline =
    props.tagline ||
    "¡Toma el control del crédito y disfruta la mejor vida útil del TOYOTA que te gusta!";
  const image = props.image || "/images/plan-renueve.png";
  const description1 =
    props.description1 ||
    "Con este plan puedes congelar una parte del valor del carro para decidir, después de 2 o 3 años, qué hacer con él.";
  const description2 =
    props.description2 ||
    "Mientras tanto, pagas cuotas mensuales cómodas, con la tranquilidad de tener tiempo suficiente para decidir: si al final de este plazo cambias el carro por otro nuevo o si te lo quedas!";
  const bgColor = props.bgColor || "#ffffff";
  const textColor = props.textColor || "#000000";

  const titleStyle = props.titleStyle || {};
  const taglineStyle = props.taglineStyle || {};
  const imageStyle = props.imageStyle || {};
  const descriptionStyle = props.descriptionStyle || {};
  const containerStyle = props.containerStyle || {};
  const cardStyle = props.cardStyle || {};

  return (
    <View
      width="100%"
      padding={resolveResponsiveValue(containerStyle.padding) || "20px 0"}
      marginBottom={
        resolveResponsiveValue(containerStyle.marginBottom) || "30px"
      }
      marginTop={resolveResponsiveValue(containerStyle.marginTop) || "0"}
    >
      <Card
        borderRadius={resolveResponsiveValue(cardStyle.borderRadius) || "8px"}
        backgroundColor={bgColor}
        maxWidth={resolveResponsiveValue(cardStyle.maxWidth) || "650px"}
        margin="0 auto"
        padding={resolveResponsiveValue(cardStyle.padding) || "30px"}
      >
        <Flex direction="column" gap="16px">
          {/* Title */}
          <Heading
            level={2}
            fontSize={resolveResponsiveValue(titleStyle.fontSize) || "28px"}
            fontWeight={resolveResponsiveValue(titleStyle.fontWeight) || "700"}
            color={titleStyle.color || textColor}
            textAlign={titleStyle.textAlign || "left"}
          >
            {title}
          </Heading>

          {/* Tagline */}
          <Text
            fontSize={resolveResponsiveValue(taglineStyle.fontSize) || "18px"}
            fontWeight={
              resolveResponsiveValue(taglineStyle.fontWeight) || "400"
            }
            color={taglineStyle.color || textColor}
            lineHeight={
              resolveResponsiveValue(taglineStyle.lineHeight) || "1.4"
            }
          >
            {tagline}
          </Text>

          {/* Image */}
          <View
            marginTop={resolveResponsiveValue(imageStyle.marginTop) || "15px"}
            marginBottom={
              resolveResponsiveValue(imageStyle.marginBottom) || "15px"
            }
          >
            <Image
              src={image}
              alt="Plan Renueve"
              width={resolveResponsiveValue(imageStyle.width) || "100%"}
              height={resolveResponsiveValue(imageStyle.height) || "auto"}
              objectFit="cover"
              borderRadius={imageStyle.borderRadius || "8px"}
            />
          </View>

          {/* Description paragraphs */}
          <Text
            fontSize={
              resolveResponsiveValue(descriptionStyle.fontSize) || "16px"
            }
            lineHeight={
              resolveResponsiveValue(descriptionStyle.lineHeight) || "1.6"
            }
            color={descriptionStyle.color || textColor}
            marginBottom={
              resolveResponsiveValue(descriptionStyle.marginBottom) || "12px"
            }
          >
            {description1}
          </Text>

          <Text
            fontSize={
              resolveResponsiveValue(descriptionStyle.fontSize) || "16px"
            }
            lineHeight={
              resolveResponsiveValue(descriptionStyle.lineHeight) || "1.6"
            }
            color={descriptionStyle.color || textColor}
          >
            {description2}
          </Text>

          <Button
            width="291px"
            height="50px"
            borderRadius="100px"
            backgroundColor="#D42224"
            padding="8px 16px"
            fontFamily="var(--font-roboto)"
            fontWeight="500"
            fontSize="14px"
            lineHeight="20px"
            letterSpacing="0.1px"
            color="white"
            border="none"
            style={{ cursor: "pointer" }}
          >
            Conoce más
          </Button>
        </Flex>
      </Card>
    </View>
  );
};
