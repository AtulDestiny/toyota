/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { View, Image, Text, Flex } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Button from "../Layout/Button/Button";
import './blogHeader.css';

// Define style property types
type StyleValue = string | number | boolean;
type ResponsiveStyle = StyleValue | Record<string, StyleValue>;
type StyleProps = Record<string, ResponsiveStyle>;

// Updated interface for responsive images
interface ResponsiveImageProps {
  src: string;
  alt: string;
  size?: ResponsiveStyle; // Now can accept { base: "60px", medium: "80px", xl: "100px" }
  position?: {
    top?: ResponsiveStyle;
    left?: ResponsiveStyle;
    right?: ResponsiveStyle;
    bottom?: ResponsiveStyle;
  };
}

// Updated interface for responsive labels
interface ResponsiveLabelProps {
  text: string;
  position: {
    top?: ResponsiveStyle;
    left?: ResponsiveStyle;
    right?: ResponsiveStyle;
    bottom?: ResponsiveStyle;
  };
  light?: boolean;
  style?: StyleProps; // Added for custom styling per breakpoint
}

interface BlogHeaderProps {
  title?: string;
  subtitle?: string;
  mainImage?: string;
  images?: ResponsiveImageProps[];
  labels?: ResponsiveLabelProps[];
  titleStyle?: StyleProps;
  subtitleStyle?: StyleProps;
  containerStyle?: StyleProps;
  contentStyle?: StyleProps;
  mainImageStyle?: StyleProps; // Added for responsive main image styling
  showButton?: Boolean;
  isTopLogo?: Boolean;
  buttonStyle?: StyleProps;
}

export const BlogHeader: React.FC<BlogHeaderProps> = (props) => {
  // Default values with fallbacks
  const title = props.title || "Blog y Noticias";
  const showButton = props.showButton ?? false;
  const isTopLogo = props.isTopLogo ?? true;

  const subtitle =
    props.subtitle ||
    "Todas las historias, innovaciones, noticias y novedades de Toyota en Colombia";
  const mainImage = props.mainImage || "/images/blog/blog-main-image.png";

  const images = props.images || [
    {
      src: "/images/blog/image-circle-1.png",
      alt: "Toyota Image 1",
      size: { base: "60px", medium: "70px", xl: "80px" },
      position: {
        left: { base: "10%", medium: "15%", xl: "20%" },
        top: { base: "15%", medium: "18%", xl: "20%" },
      },
    },
    {
      src: "/images/blog/image-circle-2.png",
      alt: "Toyota Image 2",
      size: { base: "70px", medium: "85px", xl: "100px" },
      position: {
        left: { base: "5%", medium: "5%", xl: "5%" },
        bottom: { base: "5%", medium: "8%", xl: "10%" },
      },
    },
    {
      src: "/images/blog/image-circle-3.png",
      alt: "Toyota Image 3",
      size: { base: "60px", medium: "75px", xl: "90px" },
      position: {
        right: { base: "8%", medium: "9%", xl: "10%" },
        top: { base: "8%", medium: "9%", xl: "10%" },
      },
    },
    {
      src: "/images/blog/image-circle-4.png",
      alt: "Toyota Image 4",
      size: { base: "80px", medium: "95px", xl: "110px" },
      position: {
        right: { base: "12%", medium: "16%", xl: "20%" },
        bottom: { base: "10%", medium: "12%", xl: "15%" },
      },
    },
  ];

  const labels = props.labels || [
    {
      text: "Descubre Toyota Colombia",
      position: {
        left: { base: "5%", medium: "6%", xl: "8%" },
        top: { base: "35%", medium: "40%", xl: "45%" },
      },
      light: false,
      style: {
        fontSize: "14px",
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontWeight: "400",
        lineHeight: "100%",
        letterSpacing: "0%",
        textAlign: "center",
        width: "203.17px",
        height: "29.23px",
      },
    },
    {
      text: "Toyota se adelanta al futuro",
      position: {
        right: { base: "5%", medium: "6%", xl: "8%" },
        bottom: { base: "15%", medium: "18%", xl: "20%" },
      },
      light: true,
      style: {
        fontSize: { base: "10px", medium: "12px", xl: "14px" },
        padding: {
          base: "0.3rem 0.6rem",
          medium: "0.4rem 0.8rem",
          xl: "0.5rem 1rem",
        },
      },
    },
  ];

  const modifiedSubtitleStyle = {
    ...props.subtitleStyle,
    maxWidth: "100%",
    width: "100%",
    whiteSpace: "break-spaces",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: { base: "0", xl: "0 0 1rem" },
  };

  const subtitleStyle = modifiedSubtitleStyle || {
    fontSize: { base: "16px", medium: "18px", xl: "22px" },
    fontWeight: "400",
    fontFamily: "var(--font-ToyotaType-Regular)",
    textAlign: "center",
    lineHeight: { base: "1.5", medium: "1.4", xl: "1.4" },
    width: "100%",
    color: "#333",
    letterspacing: { base: "0", medium: "0", xl: "0" },
  };

  const titleStyle = props.titleStyle || {
    fontSize: { base: "32px", medium: "46px", xl: "56px" },
    fontWeight: "400",
    fontFamily: "var(--font-ToyotaType-Regular)",
    textAlign: "center",
    lineHeight: {
      base: "1.2",
      medium: "110.00000000000001%",
      xl: "110.00000000000001%",
    },
    margin: { base: "2rem 0 1rem", xl: "1rem 0 1.5rem" },
    letterspacing: { base: "0.02em", medium: "-2%", xl: "-2%" },
    color: "#000",
  };

  const containerStyle = props.containerStyle || {
    padding: { base: "1rem", medium: "1.5rem 0", xl: "2rem 0" },
    backgroundColor: "#f2f3f4",
    width: "100%",
  };

  const contentStyle = props.contentStyle || {
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
  };

  const mainImageStyle = props.mainImageStyle || {
    width: { base: "70%", medium: "50%", xl: "50%" },
    height: { base: "100%", medium: "80%", xl: "90%" },
    borderRadius: { base: "40px", medium: "50px", xl: "60px" },
  };

  return (
    <View {...containerStyle}>
      <View {...contentStyle}>
        {/* Icon at the top */}
        {isTopLogo && (
          <Flex
            justifyContent="center"
            margin={{
              base: "1.125rem 0 1rem",
              medium: "1.5rem 0",
              xl: "2rem 0 1rem",
            }}
          >
            <View>
              <svg
                width="40"
                height="36"
                viewBox="0 0 40 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 35.2855V0H39.2061V35.2855H0ZM2.34153 32.9302H36.8645V2.35531H2.34153V32.9302ZM8.36121 26.9908H30.8449V24.636H8.36121V26.9908ZM8.36121 18.7366H15.7815V8.29468H8.36121V18.7366ZM21.2064 18.7366H30.8449V16.3813H21.2064V18.7366ZM21.2064 10.6495H30.8449V8.29468H21.2064V10.6495Z"
                  fill="url(#paint0_linear_7280_765)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_7280_765"
                    x1="19.603"
                    y1="0"
                    x2="19.603"
                    y2="35.2855"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" />
                  </linearGradient>
                </defs>
              </svg>
            </View>
          </Flex>
        )}

        {/* Title */}
        <Text {...titleStyle} dangerouslySetInnerHTML={{ __html: title }} />
        {/* Subtitle */}
        <Text
          {...subtitleStyle}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />

        {/* Visual infographic section */}
        <View
          position="relative"
          width="100%"
          height={{ base: "300px", medium: "350px", xl: "400px" }}
          marginBottom={{
            base: "2rem",
            medium: showButton ? "" : "2.5rem",
            xl: "0rem",
          }}
          overflow="hidden"
        >
          {/* Main curved image in the center */}
          <View
            position="absolute"
            width={mainImageStyle.width}
            height={mainImageStyle.height}
            top={{base:"40%", xl:"50%"}}
            left="50%"
            style={{
              transform: "translate(-50%, -50%)",
              borderRadius:
                typeof mainImageStyle.borderRadius === "object"
                  ? mainImageStyle.borderRadius.base
                  : mainImageStyle.borderRadius,
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            <Image
              src={mainImage}
              alt="Toyota Blog Main"
              // objectFit={{base:"cover", medium:"contain", xl:"contain"}}
              width="100%"
              height="100%"
              className="blog-main-image"
            />
          </View>

          {/* Circular images around */}
          {images.map((img, index) => {
            // Handle responsive size
            const sizeValue =
              typeof img.size === "object" ? img.size.base : img.size || "80px";

            // Handle responsive positions
            const topValue = img.position?.top
              ? typeof img.position.top === "object"
                ? img.position.top.base
                : img.position.top
              : undefined;

            const leftValue = img.position?.left
              ? typeof img.position.left === "object"
                ? img.position.left.base
                : img.position.left
              : undefined;

            const rightValue = img.position?.right
              ? typeof img.position.right === "object"
                ? img.position.right.base
                : img.position.right
              : undefined;

            const bottomValue = img.position?.bottom
              ? typeof img.position.bottom === "object"
                ? img.position.bottom.base
                : img.position.bottom
              : undefined;

            return (
              <View
                key={index}
                position="absolute"
                width={img.size}
                height={img.size}
                top={img.position?.top}
                left={img.position?.left}
                right={img.position?.right}
                bottom={img.position?.bottom}
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  zIndex: 2,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </View>
            );
          })}

          {/* Text labels */}
          {labels.map((label, index) => {
            // Get responsive label styling
            const labelStyle = label.style || {
              fontSize: { base: "12px", medium: "14px", xl: "16px" },
              padding: {
                base: "0.3rem 0.6rem",
                medium: "0.4rem 0.8rem",
                xl: "0.5rem 1rem",
              },
            };

            return (
              <View
                key={index}
                position="absolute"
                top={label.position?.top}
                left={label.position?.left}
                right={label.position?.right}
                bottom={label.position?.bottom}
                padding={
                  labelStyle.width && labelStyle.height
                    ? "0"
                    : labelStyle.padding
                }
                width={labelStyle.width || "auto"}
                height={labelStyle.height || "auto"}
                backgroundColor={label.light ? "white" : "#f8f8f8"}
                boxShadow="0 2px 10px rgba(0,0,0,0.1)"
                style={{
                  zIndex: "3",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  fontSize={labelStyle.fontSize}
                  fontWeight={labelStyle.fontWeight || "500"}
                  fontFamily={labelStyle.fontFamily}
                  lineHeight={labelStyle.lineHeight}
                  style={{
                    letterSpacing: labelStyle.letterSpacing,
                    textAlign: labelStyle.textAlign || "center",
                  }}
                  color={label.light ? "#000" : "#333"}
                >
                  {label.text}
                </Text>
              </View>
            );
          })}
        </View>

        {showButton && (
          <>
            <Text
              fontSize={{ base: "14px", xl: "14px" }}
              fontWeight="500"
              fontFamily={"var(--font-ToyotaType-Display)"}
              lineHeight="19.6px2"
              textAlign="center"
              color="#333"
              margin={{ base: "18px 0", xl: "0px  0px 18px 0" }}
            >
              Te invitamos a seguir explorando
            </Text>

            <Button
              type="button"
              color="red"
              className="slide-button"
              onClick={() => window.open(props.buttonLink || "/", "_self")}
              display="flex"
              minWidth={{ base: "175px", xl: "250px" }}
              maxHeight={{ base: "40px", xl: "48px" }}
              fontSize={{ base: "14px", xl: "16px" }}
              fontWeight={{ base: "500", xl: "500" }}
              fontFamily={{ base: "var(--font-roboto)" }}
              padding={{ base: "10px 24px", xl: "12px 28px" }}
              lineHeight={{ base: "20px", xl: "24px" }}
              margin={{
                base: "0 auto",
                medium: "1rem auto 78px",
                large: "1rem auto 78px",
                xl: "1rem auto 78px",
              }}
              minHeight={{ base: "50px", xl: "50px" }}
              maxWidth={{ base: "290px", xl: "290px" }}
            >
              Ir al inicio
            </Button>
          </>
        )}
      </View>
    </View>
  );
};
