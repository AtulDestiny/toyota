// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import {
  View,
  Text,
  Image,
  useTheme,
  Flex,
  useBreakpointValue,
} from "@aws-amplify/ui-react";

// Define responsive value type
type ResponsiveValue = {
  base?: string | number;
  md?: string | number;
  xl?: string | number;
};

// Enhanced style props with responsive values
interface StyleProps {
  fontSize?: string | number | ResponsiveValue;
  fontWeight?: string | number | ResponsiveValue;
  color?: string;
  textAlign?: string | ResponsiveValue;
  lineHeight?: string | number | ResponsiveValue;
  padding?: ResponsiveValue | string;
  paddingTop?: ResponsiveValue | string;
  paddingBottom?: ResponsiveValue | string;
  marginTop?: ResponsiveValue | string;
  marginBottom?: ResponsiveValue | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface EnvironmentalInitiativesProps {
  title1?: string;
  title1Style?: StyleProps;
  description1?: string;
  description1Style?: StyleProps;

  title2?: string;
  title2Style?: StyleProps;
  description2?: string;
  description2Style?: StyleProps;

  title3?: string;
  title3Style?: StyleProps;
  description3?: string;
  description3Style?: StyleProps;

  title4?: string;
  title4Style?: StyleProps;
  description4?: string;
  description4Style?: StyleProps;

  title5?: string;
  title5Style?: StyleProps;
  description5?: string;
  description5Style?: StyleProps;

  title6?: string;
  title6Style?: StyleProps;

  image1?: string;
  image1Style?: StyleProps;
  image2?: string;
  image2Style?: StyleProps;
  image3?: string;
  image3Style?: StyleProps;
  image4?: string;
  image4Style?: StyleProps;

  bgColor1?: string;
  bgColor2?: string;
  bgColor3?: string;
  bgColor4?: string;
  bgColor5?: string;
  textColor?: string;

  containerStyle?: StyleProps;
  flexGap?: string | ResponsiveValue;
  layoutType?: "3-2" | "3-3"; // New prop to control layout
}

export const EnvironmentalInitiatives: React.FC<
  EnvironmentalInitiativesProps
> = (props) => {
  const { tokens } = useTheme();
  // const isMobile = useBreakpointValue({ base: true, large: false });
  const isTablet = useBreakpointValue({
    base: false,
    medium: true,
    large: false,
  });
  const isDesktop = useBreakpointValue({ base: false, large: true });

  // Helper function to resolve responsive values
  const resolveResponsiveValue = (
    value?: string | number | ResponsiveValue
  ): string | number | undefined => {
    if (typeof value === "string" || typeof value === "number") return value;
    if (typeof value === "object") {
      if (isDesktop) return value?.xl ?? value?.md ?? value?.base;
      if (isTablet) return value?.md ?? value?.base;
      return value?.base;
    }
    return undefined;
  };

  // Default values
  const title1 = props.title1 || "Desafío Medioambiental Toyota 2050";
  const description1 =
    props.description1 ||
    "Nuestro deber en conservar los recursos y gestionar nuestra huella ecológica para las generaciones futuras.";
  const title2 =
    props.title2 || "Emprendemos iniciativas ambientales desde 1960";
  const description2 =
    props.description2 ||
    "En 1992 constituimos el Estatuto de la Tierra, y en 2015 formulamos nuestras iniciativas a largo plazo que quedaron recogidas en el Desafío Medioambiental Toyota 2050.";
  const title3 = props.title3 || "Buscamos reducir las emisiones de CO₂";
  const description3 = props.description3 || "";
  const description3Style = props.description3Style || {};
  // New props for 6-card layout
  const title4 = props.title4 || "";
  const description4 = props.description4 || "";
  const title5 = props.title5 || "";
  const description5 = props.description5 || "";
  const title6 = props.title6 || "";

  const image1 = props.image1 || "/images/medio-image01.png";
  const image2 = props.image2 || "/images/medio-image02.png";
  const image3 = props.image3 || "/images/medio-image02.png";
  const image4 = props.image4 || "/images/medio-image02.png";

  const bgColor1 = props.bgColor1 || "#1b2236";
  const bgColor2 = props.bgColor2 || "#2c2e3e";
  const bgColor3 = props.bgColor3 || "#2c2e3e";
  const bgColor4 = props.bgColor4 || "#2c2e3e";
  const bgColor5 = props.bgColor5 || "#2c2e3e";
  const textColor = props.textColor || "#fff";

  const layoutType = props.layoutType || "3-2";

  // Extract all style props
  const title1Style = props.title1Style || {};
  const description1Style = props.description1Style || {};
  const title2Style = props.title2Style || {};
  const description2Style = props.description2Style || {};
  const title3Style = props.title3Style || {};
  const title4Style = props.title4Style || {};
  const description4Style = props.description4Style || {};
  const title5Style = props.title5Style || {};
  const description5Style = props.description5Style || {};
  const title6Style = props.title6Style || {};
  const image1Style = props.image1Style || {};
  const image2Style = props.image2Style || {};
  const image3Style = props.image3Style || {};
  const image4Style = props.image4Style || {};
  const containerStyle = props.containerStyle || {};

  const flexGap = resolveResponsiveValue(props.flexGap) || tokens.space.medium;

  // For desktop layout with 3-2 or 3-3 structure
  if (isDesktop) {
    if (layoutType === "3-3") {
      return (
        <Flex
          direction="column"
          gap={flexGap}
          padding={
            resolveResponsiveValue(containerStyle.padding) || tokens.space.large
          }
          backgroundColor={containerStyle.backgroundColor || "#f9f9f9"}
          color={textColor}
          {...containerStyle}
        >
          {/* Row 1 - Desktop: 3 cards layout */}
          <Flex gap="24px">
            {/* Card 1 */}
            <View
              backgroundColor={bgColor1}
              color={textColor}
              padding={resolveResponsiveValue(title1Style.padding) || "24px"}
              borderRadius={tokens.radii.medium}
              width="33.33%"
              height="415px"
            >
              <Text
                color={title1Style.color || textColor}
                fontWeight={
                  resolveResponsiveValue(title1Style.fontWeight) || "400"
                }
                fontSize={
                  resolveResponsiveValue(title1Style.fontSize) || "32px"
                }
                {...title1Style}
              >
                {title1}
              </Text>
              <Text
                color={description1Style.color || textColor}
                fontSize={
                  resolveResponsiveValue(description1Style.fontSize) || "22px"
                }
                marginTop={
                  resolveResponsiveValue(description1Style.marginTop) ||
                  tokens.space.xs
                }
                {...description1Style}
              >
                {description1}
              </Text>
            </View>

            {/* Card 2 */}
            <Image
              src={image1}
              alt="Environmental image 1"
              borderRadius={tokens.radii.medium}
              width="33.33%"
              height="415px"
              objectFit="cover"
              {...image1Style}
            />

            {/* Card 3 */}
            <View
              backgroundImage={`url('${image3}')`}
              borderRadius={tokens.radii.medium}
              color={textColor}
              width="33.33%"
              height="415px"
              padding={
                resolveResponsiveValue(title3Style.padding) ||
                tokens.space.medium
              }
              display="block"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                ...image3Style.style,
              }}
            >
              <Text
                fontWeight={
                  resolveResponsiveValue(title3Style.fontWeight) || "400"
                }
                fontSize={
                  resolveResponsiveValue(title3Style.fontSize) || "32px"
                }
                color={title3Style.color || textColor}
                {...title3Style}
              >
                {title3}
              </Text>

              <Text
              className="description3Style-text"
                color={description3Style.color || textColor}
                fontSize={
                  resolveResponsiveValue(description3Style.fontSize) || "22px"
                }
                marginTop={
                  resolveResponsiveValue(description3Style.marginTop) ||
                  tokens.space.xs
                }
                {...description3Style}
              >
                {description3}
              </Text>
            </View>
          </Flex>

          {/* Row 2 - Desktop: 3 cards layout */}
          <Flex gap="24px">
            {/* Card 4 - Image */}
            <Image
              src={image2}
              alt="Environmental image 2"
              borderRadius={tokens.radii.medium}
              width="33.33%"
              height="415px"
              objectFit="cover"
              {...image2Style}
            />

            {/* Card 5 - Text content */}
            <View
              backgroundColor={bgColor4}
              color={textColor}
              padding={resolveResponsiveValue(title4Style.padding) || "24px"}
              borderRadius={tokens.radii.medium}
              width="33.33%"
              height="415px"
            >
              <Text
                fontWeight={
                  resolveResponsiveValue(title4Style.fontWeight) || "400"
                }
                fontSize={
                  resolveResponsiveValue(title4Style.fontSize) || "32px"
                }
                color={title4Style.color || textColor}
                {...title4Style}
              >
                {title4}
              </Text>
              <Text
                fontSize={
                  resolveResponsiveValue(description4Style.fontSize) || "22px"
                }
                marginTop={
                  resolveResponsiveValue(description4Style.marginTop) ||
                  tokens.space.xs
                }
                color={description4Style.color || textColor}
                {...description4Style}
              >
                {description4}
              </Text>
            </View>

            {/* Card 6 - Background image with text */}
            <View
              backgroundImage={`url('${image4}')`}
              borderRadius={tokens.radii.medium}
              color={textColor}
              width="33.33%"
              height="415px"
              padding={
                resolveResponsiveValue(title6Style.padding) ||
                tokens.space.medium
              }
              display="flex"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                ...image4Style.style,
              }}
            >
              <Text
                fontWeight={
                  resolveResponsiveValue(title6Style.fontWeight) || "400"
                }
                fontSize={
                  resolveResponsiveValue(title6Style.fontSize) || "32px"
                }
                color={title6Style.color || textColor}
                {...title6Style}
              >
                {title6}
              </Text>
            </View>
          </Flex>
        </Flex>
      );
    }

    // Original 3-2 layout
    return (
      <Flex
        direction="column"
        gap={flexGap}
        padding={
          resolveResponsiveValue(containerStyle.padding) || tokens.space.large
        }
        backgroundColor={containerStyle.backgroundColor || "#f9f9f9"}
        color={textColor}
        {...containerStyle}
      >
        {/* Row 1 - Desktop: 3 cards layout */}
        <Flex gap="24px">
          {/* Card 1 */}
          <View
            backgroundColor={bgColor1}
            color={textColor}
            padding={resolveResponsiveValue(title1Style.padding) || "24px"}
            borderRadius={tokens.radii.medium}
            width="33.33%"
            height="415px"
          >
            <Text
              color={title1Style.color || textColor}
              fontWeight={
                resolveResponsiveValue(title1Style.fontWeight) || "400"
              }
              fontSize={resolveResponsiveValue(title1Style.fontSize) || "32px"}
              {...title1Style}
            >
              {title1}
            </Text>
            <Text
              color={description1Style.color || textColor}
              fontSize={
                resolveResponsiveValue(description1Style.fontSize) || "22px"
              }
              marginTop={
                resolveResponsiveValue(description1Style.marginTop) ||
                tokens.space.xs
              }
              {...description1Style}
            >
              {description1}
            </Text>
          </View>

          {/* Card 2 */}
          <Image
            src={image1}
            alt="Environmental image 1"
            borderRadius={tokens.radii.medium}
            width="33.33%"
            height="415px"
            objectFit="cover"
            {...image1Style}
          />

          {/* Card 3 */}
          <View
            backgroundImage={`url('${image3}')`}
            borderRadius={tokens.radii.medium}
            color={textColor}
            width="33.33%"
            height="415px"
            padding={
              resolveResponsiveValue(title3Style.padding) || tokens.space.medium
            }
            display="flex"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              ...image3Style.style,
            }}
          >
            <Text
              fontWeight={
                resolveResponsiveValue(title3Style.fontWeight) || "400"
              }
              fontSize={resolveResponsiveValue(title3Style.fontSize) || "32px"}
              color={title3Style.color || textColor}
              {...title3Style}
            >
              {title3}
            </Text>
          </View>
        </Flex>

        {/* Row 2 - Desktop: 2 cards layout */}
        <Flex gap="24px">
          {/* Card 4 */}
          <View
            backgroundColor={bgColor2}
            color={textColor}
            padding={resolveResponsiveValue(title2Style.padding) || "24px"}
            borderRadius={tokens.radii.medium}
            width="75%"
            height="415px"
          >
            <Text
              fontWeight={
                resolveResponsiveValue(title2Style.fontWeight) || "400"
              }
              fontSize={resolveResponsiveValue(title2Style.fontSize) || "32px"}
              color={title2Style.color || textColor}
              {...title2Style}
            >
              {title2}
            </Text>
            <Text
              fontSize={
                resolveResponsiveValue(description2Style.fontSize) || "22px"
              }
              marginTop={
                resolveResponsiveValue(description2Style.marginTop) ||
                tokens.space.xs
              }
              color={description2Style.color || textColor}
              {...description2Style}
            >
              {description2}
            </Text>
          </View>

          {/* Card 5 */}
          <Image
            src={image2}
            alt="Environmental image 2"
            borderRadius={tokens.radii.medium}
            width="50%"
            height="415px"
            objectFit="cover"
            {...image2Style}
          />
        </Flex>
      </Flex>
    );
  }

  // Mobile/Tablet Layout (unchanged from original)
  return (
    <Flex
      direction="column"
      gap={flexGap}
      padding={
        resolveResponsiveValue(containerStyle.padding) || tokens.space.large
      }
      backgroundColor={containerStyle.backgroundColor || "#f9f9f9"}
      color={textColor}
      {...containerStyle}
    >
      {/* Row 1 */}
      <Flex gap={tokens.space.small}>
        <View
          backgroundColor={bgColor1}
          color={textColor}
          padding={resolveResponsiveValue(title1Style.padding) || "15px"}
          borderRadius={tokens.radii.medium}
          width="100%"
        >
          <Text
            color={title1Style.color || textColor}
            fontWeight={
              resolveResponsiveValue(title1Style.fontWeight) || "bold"
            }
            fontSize={
              resolveResponsiveValue(title1Style.fontSize) || {
                base: "14px",
                xl: "32px",
              }
            }
            {...title1Style}
          >
            {title1}
          </Text>
          <Text
            color={description1Style.color || textColor}
            fontSize={
              resolveResponsiveValue(description1Style.fontSize) || {
                base: "12px",
                xl: "22px",
              }
            }
            marginTop={
              resolveResponsiveValue(description1Style.marginTop) ||
              tokens.space.xs
            }
            {...description1Style}
          >
            {description1}
          </Text>
        </View>

        <Image
          src={image1}
          alt="Nature blurred"
          borderRadius={
            resolveResponsiveValue(image1Style.borderRadius) ||
            tokens.radii.medium
          }
          width={
            resolveResponsiveValue(image1Style.width) || {
              base: "50%",
              xl: "100%",
            }
          }
          height={resolveResponsiveValue(image1Style.height)}
          objectFit={image1Style.objectFit || "cover"}
          {...image1Style}
        />
      </Flex>

      {/* Row 2 */}
      <View
        backgroundColor={bgColor2}
        color={textColor}
        padding={
          resolveResponsiveValue(title2Style.padding) || tokens.space.medium
        }
        borderRadius={tokens.radii.medium}
        width="100%"
      >
        <Text
          fontWeight={resolveResponsiveValue(title2Style.fontWeight) || "bold"}
          fontSize={
            resolveResponsiveValue(title2Style.fontSize) ||
            tokens.fontSizes.medium
          }
          color={title2Style.color || textColor}
          {...title2Style}
        >
          {title2}
        </Text>
        <Text
          fontSize={
            resolveResponsiveValue(description2Style.fontSize) ||
            tokens.fontSizes.small
          }
          marginTop={
            resolveResponsiveValue(description2Style.marginTop) ||
            tokens.space.xs
          }
          color={description2Style.color || textColor}
          {...description2Style}
        >
          {description2}
        </Text>
      </View>

      {/* Row 3 */}
      <Flex gap={tokens.space.small}>
        <Image
          src={image2}
          alt="Nature blurred"
          borderRadius={
            resolveResponsiveValue(image2Style.borderRadius) ||
            tokens.radii.medium
          }
          width={
            resolveResponsiveValue(image2Style.width) || {
              base: "50%",
              xl: "100%",
            }
          }
          height={
            resolveResponsiveValue(image2Style.height) || {
              base: "150px",
              xl: "auto",
            }
          }
          objectFit={image2Style.objectFit || "cover"}
          {...image2Style}
        />

        <View
          backgroundImage={`url('${image3}')`}
          borderRadius={
            resolveResponsiveValue(image3Style.borderRadius) ||
            tokens.radii.medium
          }
          color={textColor}
          width={
            resolveResponsiveValue(image3Style.width) || {
              base: "50%",
              xl: "100%",
            }
          }
          height={
            resolveResponsiveValue(image3Style.height) || {
              base: "150px",
              xl: "auto",
            }
          }
          padding={
            resolveResponsiveValue(title3Style.padding) || {
              base: "10px",
              xl: tokens.space.medium,
            }
          }
          display="flex"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            ...image3Style.style,
          }}
        >
          <Text
            fontWeight={
              resolveResponsiveValue(title3Style.fontWeight) || "bold"
            }
            fontSize={
              resolveResponsiveValue(title3Style.fontSize) || {
                base: "12px",
                xl: tokens.fontSizes.medium,
              }
            }
            color={title3Style.color || textColor}
            {...title3Style}
          >
            {title3}
          </Text>
        </View>
      </Flex>
    </Flex>
  );
};
