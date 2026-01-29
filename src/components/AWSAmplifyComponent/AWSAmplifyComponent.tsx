"use client";
import {
  Flex,
  View,
  Text,
  Heading,
  Image,
  ViewProps,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React, { useEffect, useState } from "react";

// Utility types

type ResponsiveValue = {
  base?: string | number;
  md?: string | number;
  xl?: string | number;
};

type StyleObject = Record<
  string,
  string | number | ResponsiveValue | undefined
>;

interface StyleProps {
  [key: string]: string | number | ResponsiveValue | undefined;
  fontSize?: string | ResponsiveValue;
  fontFamily?: string;
  fontWeight?: string | number;
  fontStyle?: string;
  lineHeight?: string;
  textAlign?: string;
  padding?: string | ResponsiveValue;
  marginTop?: string;
  marginBottom?: string;
  borderRadius?: string;
  objectFit?: string;
  letterSpacing?: string;
  color?: string;
  width?: string | number | ResponsiveValue;
  height?: string | number;
  maxWidth?: string | number;
  alignSelf?: string | number;
  justifyContent?: string | number;
  minWidth?: string | object;
  verticalAlign?: string | number;
}

interface ImageProps extends StyleProps {
  src: string;
  alt: string;
  width?: string | number | ResponsiveValue;
  height?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  display?: string | number;
}

interface TextBlockProps extends StyleProps {
  [key: string]: string | number | ResponsiveValue | undefined;
  text?: string;
  margin?: string;
  alignSelf?: string;
}

interface AWSAmplifyComponentProps {
  isDesktop?: boolean;
  title?: TextBlockProps;
  description?: TextBlockProps;
  image?: ImageProps;
  viewstyle?: React.CSSProperties;
  sections?: Section[];
  sectionTitleStyle?: StyleProps;
  sectionDescriptionStyle?: StyleProps;
  layoutProps?: ViewProps;
}

interface Section {
  title: string;
  description: string;
}

// Responsive resolver
const resolveResponsiveValue = (
  value?: string | number | ResponsiveValue,
  isMobile?: boolean,
  isTablet?: boolean,
  isDesktop?: boolean
): string | number | undefined => {
  if (typeof value === "string" || typeof value === "number") return value;
  if (typeof value === "object") {
    if (isDesktop) return value?.xl ?? value?.md ?? value?.base;
    if (isTablet) return value?.md ?? value?.base;
    return value?.base;
  }
  return undefined;
};

export const resolveAllResponsiveStyles = (
  styles: StyleObject = {},
  isMobile: boolean,
  isTablet: boolean,
  isDesktop: boolean
): Record<string, unknown> => {
  const resolved: Record<string, unknown> = {};
  for (const key in styles) {
    resolved[key] = resolveResponsiveValue(
      styles[key],
      isMobile,
      isTablet,
      isDesktop
    );
  }
  return resolved;
};

// Main component
export const AWSAmplifyComponent: React.FC<AWSAmplifyComponentProps> = ({
  title,
  description,
  image,
  viewstyle = {},
  sections = [],
  sectionTitleStyle = {},
  sectionDescriptionStyle = {},
  layoutProps = {},
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resolvedTitleStyles = resolveAllResponsiveStyles(
    title,
    isMobile,
    isTablet,
    isDesktop
  );
  const resolvedDescriptionStyles = resolveAllResponsiveStyles(
    description,
    isMobile,
    isTablet,
    isDesktop
  );

  const resolvedSectionTitleStyle = resolveAllResponsiveStyles(
    sectionTitleStyle,
    isMobile,
    isTablet,
    isDesktop
  );
  const resolvedSectionDescriptionStyle = resolveAllResponsiveStyles(
    sectionDescriptionStyle,
    isMobile,
    isTablet,
    isDesktop
  );

  const resolvedImageStyles = resolveAllResponsiveStyles(
    image,
    isMobile,
    isTablet,
    isDesktop
  );

  if (sections && sections.length > 0) {
    return (
      <View
        padding={resolveResponsiveValue(
          { base: "49px 16px 0px", md: "70px 40px 0px", xl: "88px" },
          isMobile,
          isTablet,
          isDesktop
        )}
        borderRadius="8px"
        maxWidth="min(95.625rem, 100%)"
        margin="0 auto"
        textAlign="left"
        style={{
          display: "flex",
          flexWrap: isDesktop ? "wrap" : "wrap",
          gap: isDesktop ? "40px 30px" : "44px",
          justifyContent: "space-between",
          padding: "88px",
        }}
      >
        {sections.map((section, index) => (
          <View
            key={index}
            style={{
              flex: isDesktop ? "0 1 calc(33.33% - 20px)" : "0 1 100%",
              marginBottom: isDesktop ? "40px" : "",
            }}
          >
            <Heading level={3} {...resolvedSectionTitleStyle}>
              {section.title}
            </Heading>
            <Text {...resolvedSectionDescriptionStyle}>
              {section.description}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <Flex
      width={viewstyle.width}
      padding={viewstyle.padding}
      // margin={viewstyle.margin}
      backgroundColor={viewstyle.backgroundColor}
      justifyContent={viewstyle.justifyContent}
      {...layoutProps}
      style={{
        display: isDesktop ? "block" : "block",
        flexDirection: "row",
        alignItems: viewstyle.alignItems ? viewstyle.alignItems : "",
        gap: viewstyle.gap ? viewstyle.gap : "20px",
        margin: isDesktop ? "0 auto" : "0",
        flexWrap: isDesktop ? "nowrap" : "wrap",
        // justifyContent: viewstyle.justifyContent,
        maxHeight: viewstyle.maxHeight,
        ...(isDesktop && viewstyle),
      }}
    >
      {image && (
        <View display={isDesktop ? "flex" : "block"}>
          <Image
            src={image.src}
            alt={image.alt}
            padding={image.padding}
            minHeight={image.minHeight}
            maxHeight={image.maxHeight}
            marginTop={image.marginTop}
            borderRadius={image.borderRadius}
            width={image.width}
            height={image.height}
            objectFit={image.objectFit}
            maxWidth={image.maxWidth}
            margin={image.margin}
            style={{ display: resolvedImageStyles.display as any }}
          />
        </View>
      )}
      {(title?.text || description?.text) && (
        <View
          style={
            image
              ? {
                  padding: isDesktop ? "0px 0px 32px 68px" : "0px",
                  maxWidth: isDesktop ? "auto" : "100%",
                }
              : undefined
          }
        >
          {title?.text && (
            <Flex
              gap={{ base: "0px", xl: "154px" }}
              justifyContent={isDesktop ? "center" : "left"}
              alignItems={isMobile ? "center" : "start"}
              direction={{ base: "row", xl: "row" }}
            >
              <Heading
                level={3}
                {...resolvedTitleStyles}
                dangerouslySetInnerHTML={{ __html: title.text }}
                style={resolvedTitleStyles}
              />
            </Flex>
          )}

          {description?.text && (
            <Text
              style={{ whiteSpace: "pre-line" }}
              {...resolvedDescriptionStyles}
              dangerouslySetInnerHTML={{ __html: description.text }}
            />
          )}
        </View>
      )}
    </Flex>
  );
};
