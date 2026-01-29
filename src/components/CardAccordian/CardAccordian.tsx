/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  useBreakpointValue,
  Flex,
  Button,
} from "@aws-amplify/ui-react";

// Define types for items
interface Item {
  icon?: string;
  iconAlt?: string;
  description?: string;
  images?: Array<{
    src: string;
    alt: string;
    width?: string | number | ResponsiveValue;
    height?: string | number | ResponsiveValue;
  }>;
}

// Define responsive value type
type ResponsiveValue = {
  base?: string | number;
  md?: string | number;
  xl?: string | number;
};

// Define style props interface
interface StyleProps {
  [key: string]: string | number | ResponsiveValue | undefined;
}

// Main component props
interface CardAccordianProps {
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  expandButtonColor?: string;

  // Style props for period header customization
  yearContainerStyle?: StyleProps;
  yearTextStyle?: StyleProps;
  periodBoxStyle?: StyleProps;
  periodIconStyle?: StyleProps;
  periodTextStyle?: StyleProps;
  periodButtonStyle?: StyleProps;
  buttonContainerStyle?: StyleProps;

  // Content props
  periodYear?: string;
  periodTitle?: string;
  periodIcon?: string;
  periodIconAlt?: string;
  expandButtonText?: string;
  collapseButtonText?: string;
  items?: Item[];
  containerStyle?: StyleProps;
}

export const CardAccordian: React.FC<CardAccordianProps> = (props) => {
  // Setup responsive breakpoints
  const isMobile = useBreakpointValue({ base: true, large: false }) || false;
  const isDesktop = useBreakpointValue({ base: false, large: true }) || false;

  // State for expanded status
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Helper function to resolve responsive values
  const resolveResponsiveValue = (
    value?: string | number | ResponsiveValue
  ): string | number | undefined => {
    if (typeof value === "string" || typeof value === "number") return value;
    if (typeof value === "object" && value !== null) {
      if (isDesktop) return value.xl ?? value.md ?? value.base;
      return value.base;
    }
    return undefined;
  };

  // Default or provided values
  const bgColor = props.bgColor || "#fff";
  const textColor = props.textColor || "#ffffff";
  const accentColor = props.accentColor || "#c8312b";
  const expandButtonColor = props.expandButtonColor || "#000000";

  // Get the period data from props
  const periodYear = props.periodYear || "";
  const periodTitle = props.periodTitle || "";
  const periodIcon = props.periodIcon || "";
  const periodIconAlt = props.periodIconAlt || "Period icon";

  // Button text
  const expandButtonText = props.expandButtonText || "Ver Más +";
  const collapseButtonText = props.collapseButtonText || "Ver Menos —";

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <View
      width="100%"
      backgroundColor="#fff"
      padding="2rem 15px 0 15px"
      color={textColor}
    >
      <View
        maxWidth="1200px"
        margin="0 auto"
        padding={resolveResponsiveValue(props.containerStyle?.padding) || "0"}
      >
        {/* Year Badge */}
        <View
          backgroundColor={
            resolveResponsiveValue(props.yearContainerStyle?.backgroundColor) ||
            "#D42224"
          }
          padding={
            resolveResponsiveValue(props.yearContainerStyle?.padding) ||
            "0.5rem 1.5rem"
          }
          margin={
            resolveResponsiveValue(props.yearContainerStyle?.margin) || "0 auto"
          }
          width={
            resolveResponsiveValue(props.yearContainerStyle?.width) ||
            "fit-content"
          }
          borderRadius={
            resolveResponsiveValue(props.yearContainerStyle?.borderRadius) ||
            "5px"
          }
        >
          <Text
            color={
              resolveResponsiveValue(props.yearTextStyle?.color) || "#ffffff"
            }
            fontSize={
              resolveResponsiveValue(props.yearTextStyle?.fontSize) || "1.25rem"
            }
            fontWeight={
              resolveResponsiveValue(props.yearTextStyle?.fontWeight) || "500"
            }
            textAlign={
              resolveResponsiveValue(props.yearTextStyle?.textAlign) || "center"
            }
          >
            {periodYear}
          </Text>
        </View>

        {/* Period Info Box */}
        <View
          backgroundColor={
            resolveResponsiveValue(props.periodBoxStyle?.backgroundColor) ||
            "#1e1e1e"
          }
          padding={
            resolveResponsiveValue(props.periodBoxStyle?.padding) || "1.5rem"
          }
          borderRadius={
            resolveResponsiveValue(props.periodBoxStyle?.borderRadius) || "0px"
          }
          marginTop={
            resolveResponsiveValue(props.periodBoxStyle?.marginTop) || "0rem"
          }
          maxWidth={
            resolveResponsiveValue(props.periodBoxStyle?.maxWidth) || "100%"
          }
          border={
            resolveResponsiveValue(props.periodBoxStyle?.border) || "none"
          }
          margin={
            resolveResponsiveValue(props.periodBoxStyle?.margin) || "0 auto"
          }
        >
          <Flex justifyContent="center" alignItems="center" direction="column">
            {/* Icon */}
            {periodIcon && (
              <Image
                src={periodIcon}
                alt={periodIconAlt}
                width={
                  resolveResponsiveValue(props.periodIconStyle?.width) || "36px"
                }
                height={
                  resolveResponsiveValue(props.periodIconStyle?.height) ||
                  "36px"
                }
                marginBottom={
                  resolveResponsiveValue(props.periodIconStyle?.marginBottom) ||
                  "1rem"
                }
              />
            )}

            {/* Title Text */}
            <Text
              color={
                resolveResponsiveValue(props.periodTextStyle?.color) ||
                "#ffffff"
              }
              fontSize={
                resolveResponsiveValue(props.periodTextStyle?.fontSize) ||
                "1rem"
              }
              textAlign={
                resolveResponsiveValue(props.periodTextStyle?.textAlign) ||
                "center"
              }
              fontWeight={
                resolveResponsiveValue(props.periodTextStyle?.fontWeight) ||
                "400"
              }
              marginBottom={
                resolveResponsiveValue(props.periodTextStyle?.marginBottom) ||
                "0"
              }
            >
              {periodTitle}
            </Text>
          </Flex>
        </View>

        {/* Button Container */}
        <Flex
          justifyContent="center"
          alignItems="center"
          padding={
            resolveResponsiveValue(props.buttonContainerStyle?.padding) ||
            "1rem 0"
          }
        >
          <Button
            variant="outline"
            backgroundColor={
              resolveResponsiveValue(
                props.periodButtonStyle?.backgroundColor
              ) || "transparent"
            }
            color={
              resolveResponsiveValue(props.periodButtonStyle?.color) ||
              expandButtonColor
            }
            borderColor={
              resolveResponsiveValue(props.periodButtonStyle?.borderColor) ||
              "#ccc"
            }
            onClick={toggleExpand}
            padding={
              resolveResponsiveValue(props.periodButtonStyle?.padding) ||
              "0.25rem 0.75rem"
            }
            fontSize={
              resolveResponsiveValue(props.periodButtonStyle?.fontSize) ||
              "0.75rem"
            }
            borderRadius={
              resolveResponsiveValue(props.periodButtonStyle?.borderRadius) ||
              "0"
            }
            style={{ textDecoration: "underline", fontWeight: "500" }}
          >
            {isExpanded ? collapseButtonText : expandButtonText}
          </Button>
        </Flex>

        {/* Content Area - Only shown when expanded */}
        {isExpanded && props.items && props.items.length > 0 && (
          <View marginTop="2rem">
            {props.items.map((item, index) => (
              <View key={`item-${index}`} marginBottom="0rem">
                {item.images && item.images.length > 0 && (
                  <Flex
                    direction="row"
                    gap={{ base: "0.5rem", medium: "1rem" }}
                    flexWrap="nowrap"
                    justifyContent="center"
                    position="relative"
                  >
                    {item.images.map((img, imgIndex) => (
                      <View
                        key={`img-${index}-${imgIndex}`}
                        width={
                          resolveResponsiveValue(img.width) || {
                            base: "45%",
                            medium: "45%",
                            large: "45%",
                          }
                        }
                        position="relative"
                        // We maintain the same relative positioning but scale it down for mobile
                        style={
                          imgIndex === 1
                            ? {
                                position: "relative",
                                top: isMobile ? "60px" : "111px",
                              }
                            : undefined
                        }
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width="100%"
                          height={resolveResponsiveValue(img.height) || "auto"}
                          objectFit="cover"
                        />
                      </View>
                    ))}
                  </Flex>
                )}
                {/* Item Description */}
                {item.description && (
                  <Text
                    fontSize={{ base: "16px", medium: "18px", large: "22px" }}
                    lineHeight="1.5"
                    textAlign={{ base: "left", xl: "center" }}
                    color={textColor}
                    marginBottom="1.5rem"
                    marginTop={{
                      base: "62px",
                      medium: "150px",
                      large: "173px",
                    }}
                  >
                    {item.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
