import { View, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { ReactNode } from "react";

interface SectionTitleProps {
  title?: string | ReactNode;
  headingAs?: 1 | 2 | 3 | 4 | 5 | 6;
  subtitle?: string;
  subtitleAs?: 1 | 2 | 3 | 4 | 5 | 6;
  titleFontSize?: string | object;
  subtitleFontSize?: string | object;
  withoutPaddingBottom?: boolean;
  padding?: string | object;
  textAlign?: string | object;
  enableLineBreaks?: boolean; // Add this prop to control line breaks
  SubtitlefontFamily?: string | object;
  titlelineHeight?: string | object;
  SublitlelineHeight?: string | object;
  titleColor?: string; // New prop for title color
  titleFontWeight?: string; // New prop for title font weight
}

export const SectionTitle = ({
  title,
  headingAs = 2,
  subtitle,
  subtitleAs = 5,
  titleFontSize = { base: "lg" },
  subtitleFontSize = { base: "sm", xl: "md" },
  withoutPaddingBottom = false,
  padding,
  textAlign = { base: "left", xl: "center" },
  enableLineBreaks = false, // Default to false
  titlelineHeight,
  SubtitlefontFamily,
  SublitlelineHeight,
  titleColor, // New prop
  titleFontWeight, // New prop
}: SectionTitleProps) => {
  return (
    <View
      padding={
        padding || {
          base: "1rem 0rem",
          xl: withoutPaddingBottom
            ? "1.9375rem 1rem 1.5rem .9375rem"
            : "1.9375rem 0rem 1.25rem 0rem",
        }
      }
      textAlign={textAlign}
    >
      <Heading
        width={{ base: "100%", xl: "100%" }}
        level={headingAs}
        fontSize={titleFontSize}
        fontFamily="var(--font-toyotaDisplay)"
        fontWeight={titleFontWeight || "500"} // Use the prop or default to 500
        lineHeight={titlelineHeight ? titlelineHeight : "140%"}
        letterSpacing={"0%"}
        color={titleColor} // Apply the color prop
        style={{
          textWrap: "pretty",
        }}
      >
        {title}
      </Heading>
      {subtitle && (
        <Heading
          marginTop={{ base: "10px", xl: "10px" }}
          level={subtitleAs}
          fontSize={subtitleFontSize}
          fontFamily={
            SubtitlefontFamily
              ? SubtitlefontFamily
              : "var(--font-toyotaDisplay)"
          }
          fontWeight={"400"}
          lineHeight={SublitlelineHeight ? SublitlelineHeight : "130%"}
          letterSpacing={"0"}
          style={{
            textWrap: "pretty",
            ...(enableLineBreaks && { whiteSpace: "pre-line" }), // Add this conditionally
          }}
        >
          {subtitle}
        </Heading>
      )}
    </View>
  );
};

export default SectionTitle;
