/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { View, Image, Text, useBreakpointValue } from "@aws-amplify/ui-react";
import React from "react";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";

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

interface FamilySafetyProps {
  title?: string;
  titleStyle?: StyleProps;
  description?: string;
  descriptionStyle?: StyleProps;
  image?: string;
  video?: string;
  isYoutube?: boolean;
  imageStyle?: StyleProps;
  buttonText?: string;
  buttonStyle?: StyleProps;
  bgColor?: string;
  textColor?: string;
  icons?: (string | IconItem)[];
  link?: string;
  containerStyle?: StyleProps;
  contentStyle?: StyleProps;
  videoOverlay?: boolean;
}

export const FamilySafetyGrid: React.FC<FamilySafetyProps> = (props) => {
  const isMobile = useBreakpointValue({ base: true, large: false }) || false;
  const isTablet =
    useBreakpointValue({ base: false, medium: true, large: false }) || false;
  const isDesktop = useBreakpointValue({ base: false, large: true }) || false;

  const resolveResponsiveValue = (
    value?: string | number | ResponsiveValue
  ): string | number | undefined => {
    if (typeof value === "string" || typeof value === "number") return value;
    if (typeof value === "object" && value !== null) {
      if (isDesktop) return value.xl ?? value.lg ?? value.md ?? value.base;
      if (isTablet) return value.md ?? value.base;
      return value.base;
    }
    return undefined;
  };

  const title =
    props.title || "Trabajamos para tu seguridad y la de tu familia";
  const description =
    props.description ||
    "Con tu conciencia vial, responsabilidad y la mejor tecnología en seguridad de Toyota podemos hacer grandes cambios.";
  const image = props.image || "/images/family-safety.png";
  const buttonText = props.buttonText || "Conoce más";
  const bgColor = props.bgColor || "#6b635b";
  const textColor = props.textColor || "#fff";
  const icons = props.icons || [
    "/images/CloudIcon.png",
    "/images/FIreIcon.png",
    "/images/BrightNessIcon.png",
    "/images/DropIcon.png",
  ];
  const link = props.link || "#";
  const videoOverlay = props.videoOverlay || true;

  const video = props.video;
  const isYoutube = props.isYoutube;

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
      {/* Main content with background */}
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
              textAlign={resolveResponsiveValue(titleStyle.textAlign)}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {/* Image container with potential video overlay */}
            <View
              position="relative"
              marginTop={resolveResponsiveValue(imageStyle.marginTop) || "1rem"}
              marginBottom={
                resolveResponsiveValue(imageStyle.marginBottom) || "1rem"
              }
            >
              {video ? (
                <VideoPlayer
                  videoSrc={video}
                  isYoutube={isYoutube}
                  containerResponsiveStyle={{
                    paddingTop: {
                      base: "20.25%",
                      md: "60%",
                      xl: "65%",
                    },
                    marginBottom: {
                      base: "0px",
                      md: "10%",
                      xl: "14.25%",
                    },
                    marginTop: {
                      base: "0px",
                      lg: "20px",
                      xl: "20px",
                    },
                    minHeight: {
                      base: "200px",
                      lg: "350px",
                      xl: "auto",
                    },
                  }}
                />
              ) : (
                <Image
                  src={image}
                  alt={title}
                  width="100%"
                  height={resolveResponsiveValue(imageStyle.height) || "auto"}
                  objectFit="cover"
                  borderRadius={imageStyle.borderRadius || "0rem"}
                />
              )}

              {/* Video play button overlay */}
              {!isYoutube && videoOverlay && (
                <View
                  position="absolute"
                  top="50%"
                  left="50%"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <View
                    backgroundColor="rgba(255, 255, 255, 0.8)"
                    borderRadius="50%"
                    width="60px"
                    height="60px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <View
                      width="0"
                      height="0"
                      borderStyle="solid"
                      borderWidth="10px 0 10px 20px"
                      borderColor="transparent transparent transparent #000"
                      style={{ marginLeft: "5px" }}
                    />
                  </View>
                </View>
              )}
            </View>

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
              textAlign="center"
            >
              {description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
