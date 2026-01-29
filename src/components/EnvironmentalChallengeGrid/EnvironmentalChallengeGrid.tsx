import {
  View,
  Image,
  Text,
  useBreakpointValue,
  Flex,
  Button,
} from "@aws-amplify/ui-react";
import React from "react";

// Define more restricted types that match Amplify UI expectations
interface IconItem {
  src?: string;
  alt?: string;
  size?: string | number;
}

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

interface EnvironmentalChallengeProps {
  title?: string;
  titleStyle?: StyleProps;
  description?: string;
  descriptionStyle?: StyleProps;
  image?: string;
  imageStyle?: StyleProps;
  buttonText?: string;
  buttonStyle?: StyleProps;
  bgColor?: string;
  textColor?: string;
  icons?: (string | IconItem)[];
  link?: string;
  containerStyle?: StyleProps;
  contentStyle?: StyleProps;
}

export const EnvironmentalChallengeGrid: React.FC<
  EnvironmentalChallengeProps
> = (props) => {
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

  const title = props.title || "Reto medio ambiental Toyota 2050";
  const description =
    props.description ||
    "En Toyota entendemos que somos más que una compañía que ofrece soluciones integrales de movilidad. Somos ciudadanos del mundo y, por consiguiente, tenemos una responsabilidad con el planeta: dejarlo incluso mejor de como lo encontramos.";
  const image = props.image || "/images/Retomedio.png";
  const buttonText = props.buttonText || "Conoce más";
  const bgColor = props.bgColor || "#2b2d42";
  const textColor = props.textColor || "#fff";
  const icons = props.icons || [
    "/images/CloudIcon.png",
    "/images/FIreIcon.png",
    "/images/BrightNessIcon.png",
    "/images/DropIcon.png",
  ];
  const link = props.link || "#";

  const titleStyle = props.titleStyle || {};
  const descriptionStyle = props.descriptionStyle || {};
  const imageStyle = props.imageStyle || {};
  const buttonStyle = props.buttonStyle || {};
  const containerStyle = props.containerStyle || {};
  const contentStyle = props.contentStyle || {};

  // Create a safe navigation handler
  const handleButtonClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = link;
    }
  };

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
                resolveResponsiveValue(titleStyle.marginBottom) || ""
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
                resolveResponsiveValue(descriptionStyle.fontSize) || "1.125rem"
              }
              lineHeight={
                resolveResponsiveValue(descriptionStyle.lineHeight) || "1.75"
              }
              fontWeight={resolveResponsiveValue(descriptionStyle.fontWeight)}
              marginBottom={resolveResponsiveValue(
                descriptionStyle.marginBottom
              )}
              marginTop={resolveResponsiveValue(descriptionStyle.marginTop)}
              paddingTop={resolveResponsiveValue(descriptionStyle.paddingTop)}
              paddingBottom={resolveResponsiveValue(
                descriptionStyle.paddingBottom
              )}
              color={descriptionStyle.color || textColor}
            >
              {description}
            </Text>

            <Image
              src={image}
              alt={title}
              width="100%"
              height={resolveResponsiveValue(imageStyle.height) || "auto"}
              objectFit="cover"
              marginTop={resolveResponsiveValue(imageStyle.marginTop) || "1rem"}
              marginBottom={
                resolveResponsiveValue(imageStyle.marginBottom) || "1rem"
              }
              borderRadius={imageStyle.borderRadius || "0rem"}
            />

            {isMobile ? (
              <Button
                backgroundColor={buttonStyle.backgroundColor || "#fff"}
                borderRadius={buttonStyle.borderRadius || "999px"}
                paddingLeft={
                  resolveResponsiveValue(buttonStyle.paddingLeft) || "2rem"
                }
                paddingRight={
                  resolveResponsiveValue(buttonStyle.paddingRight) || "2rem"
                }
                paddingTop={
                  resolveResponsiveValue(buttonStyle.paddingTop) || "0.5rem"
                }
                paddingBottom={
                  resolveResponsiveValue(buttonStyle.paddingBottom) || "0.5rem"
                }
                marginTop={resolveResponsiveValue(buttonStyle.marginTop)}
                marginBottom={resolveResponsiveValue(buttonStyle.marginBottom)}
                color={buttonStyle.color || "#000"}
                fontWeight={
                  resolveResponsiveValue(buttonStyle.fontWeight) || "bold"
                }
                fontSize={
                  resolveResponsiveValue(buttonStyle.fontSize) || "1rem"
                }
                minHeight={
                  resolveResponsiveValue(buttonStyle.minHeight) || ""
                }
                minWidth={
                  resolveResponsiveValue(buttonStyle.minWidth) || ""
                }
                onClick={handleButtonClick}
                position={buttonStyle.position}
                top={resolveResponsiveValue(buttonStyle.top)}
              >
                {buttonText}
              </Button>
            ) : (
              <Flex
                justifyContent="center"
                width="100%"
                marginTop={
                  resolveResponsiveValue(buttonStyle.marginTop) || "1rem"
                }
                marginBottom={resolveResponsiveValue(buttonStyle.marginBottom)}
                position={buttonStyle.position}
                top={resolveResponsiveValue(buttonStyle.top)}
              >
                <Button
                  backgroundColor={buttonStyle.backgroundColor || "#fff"}
                  borderRadius={buttonStyle.borderRadius || "999px"}
                  paddingLeft={
                    resolveResponsiveValue(buttonStyle.paddingLeft) || "2rem"
                  }
                  paddingRight={
                    resolveResponsiveValue(buttonStyle.paddingRight) || "2rem"
                  }
                  paddingTop={
                    resolveResponsiveValue(buttonStyle.paddingTop) || "0.5rem"
                  }
                  paddingBottom={
                    resolveResponsiveValue(buttonStyle.paddingBottom) ||
                    "0.5rem"
                  }
                  color={buttonStyle.color || "#000"}
                  fontWeight={
                    resolveResponsiveValue(buttonStyle.fontWeight) || "bold"
                  }
                  fontSize={
                    resolveResponsiveValue(buttonStyle.fontSize) || "1rem"
                  }
                  onClick={handleButtonClick}
                >
                  {buttonText}
                </Button>
              </Flex>
            )}
          </View>
        </View>
      </View>

      {/* Icon bar - right-aligned with background only behind icons */}
      <View
        width="100%"
        backgroundColor="transparent"
        marginTop="-1px"
        position="relative"
        style={{ zIndex: 1 }} // Using style object for zIndex instead of direct prop
      >
        <View
          width={isMobile ? "241px" : "485px"}
          marginLeft="auto"
          marginRight="0"
          backgroundColor={bgColor}
        >
          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            padding="1rem"
            minHeight={{base:"64px"}}
          >
            {icons.map((icon, index) => {
              // Check if icon is a string (emoji) or a path to an image
              if (typeof icon === "string") {
                // If it starts with '/' or 'http', treat as image URL
                if (icon.startsWith("/") || icon.startsWith("http")) {
                  return (
                    <Image
                      key={index}
                      src={icon}
                      alt={`Icon ${index}`}
                      width="27.625px"
                      height="28.636px"
                      objectFit="contain"
                    />
                  );
                } else {
                  // Otherwise, treat as emoji
                  return (
                    <Text key={index} fontSize="1.5rem" color={textColor}>
                      {icon}
                    </Text>
                  );
                }
              } else if (typeof icon === "object" && icon !== null) {
                // Handle icon object with src property
                return (
                  <Image
                    key={index}
                    src={icon.src || ""}
                    alt={icon.alt || `Icon ${index}`}
                    width={icon.size || "24px"}
                    height={icon.size || "24px"}
                    objectFit="contain"
                  />
                );
              }
              return null;
            })}
          </Flex>
        </View>
      </View>
    </View>
  );
};
