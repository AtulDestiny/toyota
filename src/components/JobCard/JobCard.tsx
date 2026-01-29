import React from "react";
import { View, Text, Button, useBreakpointValue } from "@aws-amplify/ui-react";

interface StyleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface JobCardProps {
  id: string;
  location: string;
  title: string;
  publishedDays: number;
  workType?: string;
  workModality?: string;
  onViewDetails?: (id: string) => void;
  cardStyle?: StyleProps;
  locationStyle?: StyleProps;
  titleStyle?: StyleProps;
  publishedStyle?: StyleProps;
  workInfoStyle?: StyleProps;
  buttonStyle?: StyleProps;
}

export const JobCard: React.FC<JobCardProps> = ({
  id,
  location,
  title,
  publishedDays,
  workType,
  workModality,
  onViewDetails,
  cardStyle = {},
  locationStyle = {},
  titleStyle = {},
  publishedStyle = {},
  workInfoStyle = {},
  buttonStyle = {},
}) => {
  const isMobile = useBreakpointValue({ base: true, medium: false }) || false;

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    }
  };

  const resolveResponsiveValue = (
    value?:
      | string
      | number
      | {
          base?: string | number;
          medium?: string | number;
          xl?: string | number;
        }
  ): string | number | undefined => {
    if (!value) return undefined;
    if (typeof value === "string" || typeof value === "number") return value;
    if (typeof value === "object") {
      if (!isMobile) return value.xl || value.medium || value.base;
      return value.base;
    }
    return undefined;
  };

  return (
    <View
      backgroundColor={cardStyle.background ? undefined : (cardStyle.backgroundColor || "#F2F3F5")}
      padding={resolveResponsiveValue(cardStyle.padding) || resolveResponsiveValue({ base: "1.5rem", medium: "40px 25.8px" })}
      borderRadius={resolveResponsiveValue(cardStyle.borderRadius) || resolveResponsiveValue({ base: "0.5rem", medium: "25.8px" })}
      width={resolveResponsiveValue(cardStyle.width) || resolveResponsiveValue({ base: "100%", medium: "445px" })}
      height={resolveResponsiveValue(cardStyle.height) || resolveResponsiveValue({ base: "auto", medium: "253.04348754882812px" })}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "1rem" : "0px",
        background: cardStyle.background,
        ...(cardStyle.background && { backgroundColor: undefined }),
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
        marginBottom={
          resolveResponsiveValue(locationStyle.marginBottom) || "1.28px"
        }
      >
        <Text
          fontSize={
            resolveResponsiveValue(locationStyle.fontSize) || "0.875rem"
          }
          color={locationStyle.color || "#555555"}
          fontWeight={resolveResponsiveValue(locationStyle.fontWeight) || "500"}
        >
          {location}
        </Text>
        <Text
          fontSize={
            resolveResponsiveValue(publishedStyle.fontSize) || "0.65rem"
          }
          color={publishedStyle.color || "#555555"}
          fontWeight={
            resolveResponsiveValue(publishedStyle.fontWeight) || "normal"
          }
        >
          Publicado hace {publishedDays} días
        </Text>
      </View>

      <Text
        fontSize={resolveResponsiveValue(titleStyle.fontSize) || "1.5rem"}
        fontWeight={resolveResponsiveValue(titleStyle.fontWeight) || "600"}
        color={titleStyle.color || "#000000"}
        marginBottom={
          resolveResponsiveValue(titleStyle.marginBottom) || "1.5rem"
        }
        lineHeight={resolveResponsiveValue(titleStyle.lineHeight) || "1.2"}
      >
        {title}
      </Text>

      <Text
        fontSize={resolveResponsiveValue(workInfoStyle.fontSize) || "1rem"}
        color={workInfoStyle.color || "#555555"}
        marginBottom={
          resolveResponsiveValue(workInfoStyle.marginBottom) || "2rem"
        }
      >
        {workType && workModality
          ? `${workType}, ${workModality}`
          : workModality || workType || ""}
      </Text>

      <View style={{ marginTop: "auto" }}>
        <Button
          backgroundColor={buttonStyle.backgroundColor || "#000000"}
          color={buttonStyle.color || "#FFFFFF"}
          borderRadius={buttonStyle.borderRadius || "99px"}
          padding={
            resolveResponsiveValue(buttonStyle.padding) || "0.75rem 1.5rem"
          }
          fontSize={resolveResponsiveValue(buttonStyle.fontSize) || "0.875rem"}
          fontWeight={resolveResponsiveValue(buttonStyle.fontWeight) || "500"}
          onClick={handleViewDetails}
          width={resolveResponsiveValue(buttonStyle.width) || "auto"}
        >
          Ver Detalle Cargo
        </Button>
      </View>
    </View>
  );
};

export default JobCard;
