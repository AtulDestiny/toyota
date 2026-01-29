import { View, Text, Image, Flex } from "@aws-amplify/ui-react";

interface BlogLabel {
  text: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    responsive?: {
      top?: { base: string; xl: string };
      bottom?: { base: string; xl: string };
      left?: { base: string; xl: string };
      right?: { base: string; xl: string };
    };
  };
}
// Define responsive font size type
type FontSize = string | { base: string; medium: string; xl: string };

// Define the type for the style object
interface Style {
  textAlign?: string;
  fontFamily?: string;
  fontSize?: FontSize; // Allow both string or responsive object
  fontStyle?: string;
  fontWeight?: number;
  lineHeight?: string | { base: string; medium: string; xl: string }; // Allow both string or responsive object
  color?: string;
  maxWidth?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
}
interface BlogNewsSectionProps {
  mainImage?: string;
  leftImage?: string;
  rightImage?: string;
  floatingSvgs?: {
    left: string;
    right: string;
  };
  labels?: BlogLabel[];
  descriptionStyle?: Style;
  titleStyle?: Style;
  sectionDescription?: string;
  sectionTitle?: string;
  topIcon?: string;
}

const defaultMainImage =
  "/images/blog/66dec791c0eff0e2b5e8d123934597f4f6204280.png";
const defaultLeftImage =
  "/images/blog/bddc6316a4a7f28c4428d4210ffd235f2de08a6b.png";
const defaultRightImage =
  "/images/blog/faed7663d484960370d62c2cf3291ffa92fb93c4.png";
const defaultFloatingSvgs = {
  left: "/svgs/Group_657323991.svg",
  right: "/svgs/Vector.svg",
};
const defaultTopIcon = "/svgs/blog_sectino_top_Vector.svg";
const defaultSectionTitle = "Blog y Noticias";
const defaultSectionDescription =
  "Todas las historias, innovaciones, noticias y novedades de Toyota en Colombia";

const defaultLabels: BlogLabel[] = [
  {
    text: "Toyota se adelanta al futuro",
    position: {
      responsive: {
        bottom: { base: "96%", xl: "48%" },
        right: { base: "56%", xl: "4%" },
      },
    },
  },
  {
    text: "Descubre Toyota Colombia",
    position: {
      responsive: {
        top: { base: "29%", xl: "23%" },
        left: { base: "38%", xl: "17%" },
      },
    },
  },
];

type ResponsiveValue = string | { base: string; medium: string; xl: string };

// Helper function to resolve responsive values
// Helper function to resolve responsive values
const getResponsiveValue = (
  value: ResponsiveValue | undefined
): string | undefined => {
  const width = window.innerWidth; // Get the current window width

  if (value === undefined) {
    return undefined; // Return undefined if value is not provided
  }

  if (typeof value === "string") {
    return value; // Return string if not responsive
  }

  // Check the screen size and return the appropriate value
  if (width >= 1200) {
    return value?.xl;
  }
  if (width >= 768) {
    return value?.medium;
  }
  return value?.base;
};

const defaultTitleStyle = {
  textAlign: "center",
  fontFamily: "var(--font-ToyotaType-Regular)",
  fontSize: {
    base: "24px", // Default font size for base screens
    medium: "28px", // Font size for medium screens
    xl: "56px", // Font size for extra large screens
  },
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: {
    base: "61.6px", // Line height for base screens
    medium: "125%", // Line height for medium screens
    xl: "130%", // Line height for extra large screens
  },
  letterSpacing: "-1.12px",
};

const defaultDescriptionStyle = {
  textAlign: "center",
  fontFamily: "var(--font-ToyotaType-Regular)",
  fontSize: {
    base: "14px", // Default font size for base screens
    medium: "16px", // Font size for medium screens
    xl: "22px", // Font size for extra large screens
  },
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: {
    base: "140%", // Line height for base screens
    medium: "150%", // Line height for medium screens
    xl: "160%", // Line height for extra large screens
  },
};

export function BlogNewsSection({
  topIcon = defaultTopIcon,
  titleStyle = defaultTitleStyle,
  descriptionStyle = defaultDescriptionStyle,
  sectionTitle = defaultSectionTitle,
  sectionDescription = defaultSectionDescription,
  mainImage = defaultMainImage,
  leftImage = defaultLeftImage,
  rightImage = defaultRightImage,
  floatingSvgs = defaultFloatingSvgs,
  labels = defaultLabels,
}: BlogNewsSectionProps): JSX.Element {
  return (
    <View
      backgroundColor="#f4f6f9"
      padding={{ base: "3rem 1rem", xl: "6rem 3rem" }}
      textAlign="center"
      position="relative"
      overflow="hidden"
    >
      {/*  Top Icon */}
      <View marginBottom="1rem">
        <Image
          src={topIcon}
          alt="Top Icon"
          width="40px"
          height="40px"
          margin="0 auto"
        />
      </View>

      {/*  Section Title and Description */}
      <View marginBottom="2rem">
        <Text
          as="h2"
          fontSize={getResponsiveValue(titleStyle.fontSize)}
          fontWeight={titleStyle.fontWeight}
          marginBottom="0.5rem"
          textAlign={getResponsiveValue(titleStyle.textAlign)}
          fontFamily={getResponsiveValue(titleStyle.fontFamily)}
          fontStyle={getResponsiveValue(titleStyle.fontStyle)}
          lineHeight={getResponsiveValue(titleStyle.lineHeight)}
          color={getResponsiveValue(titleStyle.color)}
        >
          {sectionTitle}
        </Text>

        {/* Description */}
        <Text
          fontSize={getResponsiveValue(descriptionStyle.fontSize)}
          fontWeight={descriptionStyle.fontWeight}
          margin="0 auto"
          textAlign={getResponsiveValue(descriptionStyle.textAlign)}
          fontFamily={getResponsiveValue(descriptionStyle.fontFamily)}
          fontStyle={getResponsiveValue(descriptionStyle.fontStyle)}
          lineHeight={getResponsiveValue(descriptionStyle.lineHeight)}
          color={getResponsiveValue(descriptionStyle.color)} // Dynamically set color
        >
          {sectionDescription}
        </Text>
      </View>

      <View
        maxWidth="1200px"
        margin="0 auto"
        position="relative"
        height={{ base: "500px", xl: "600px" }}
      >
        {/* Main Big Oval Image */}
        <View
          width={{ base: "254px", xl: "500px" }}
          height={{ base: "143px", xl: "300px" }}
          overflow="hidden"
          borderRadius="50% / 80%"
          position="absolute"
          top={{ base: "50px", xl: "30%" }}
          left="50%"
          style={{ transform: "translate(-50%, -50%)" }}
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
        >
          <Image
            src={mainImage}
            alt="Main Image"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </View>

        {/* Small Circle Images */}
        <View
          width={{ base: "80px", xl: "120px" }}
          height={{ base: "86px", xl: "120px" }}
          overflow="hidden"
          borderRadius="50%"
          position="absolute"
          top={{ base: "22%", xl: "25%" }}
          left={{ base: "14%", xl: "18%" }}
        >
          <Image
            src={leftImage}
            alt="Small Left Image"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </View>

        <View
          width={{ base: "80px", xl: "120px" }}
          height={{ base: "80px", xl: "120px" }}
          overflow="hidden"
          borderRadius="50%"
          position="absolute"
          bottom={{ base: "56%", xl: "60%" }}
          right={{ base: "5%", xl: "16%" }}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        >
          <Image
            src={rightImage}
            alt="Small Right Image"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </View>

        {/* Floating SVGs */}
        <Flex
          width="60px"
          height="60px"
          backgroundColor="#1F2C40"
          borderRadius="50%"
          position="absolute"
          top={{ base: "6%", xl: "7%" }}
          left={{ base: "5%", xl: "26%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={floatingSvgs.left}
            alt="Floating SVG Left"
            width="30px"
            height="30px"
          />
        </Flex>

        <Flex
          width="60px"
          height="60px"
          backgroundColor="#22695E"
          borderRadius="50%"
          position="absolute"
          top={{ base: "0%", xl: "7%" }}
          right={{ base: "14%", xl: "26%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={floatingSvgs.right}
            alt="Floating SVG Right"
            width="30px"
            height="30px"
          />
        </Flex>

        {/* Labels */}
        {labels.map((label, index) => (
          <Text
            key={index}
            position="absolute"
            {...label.position.responsive}
            backgroundColor="white"
            padding="8px 16px"
            borderRadius="20px"
            fontSize={{
              base: "9px",
              medium: "22px",
              xl: "14px",
            }}
            boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
          >
            {label.text}
          </Text>
        ))}
      </View>
    </View>
  );
}
