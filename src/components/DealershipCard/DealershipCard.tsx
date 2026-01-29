// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import {
  View,
  Text,
  Button,
  Flex,
  useBreakpointValue,
} from "@aws-amplify/ui-react";

// Type for responsive values
type ResponsiveValue =
  | string
  | number
  | {
      base?: string | number;
      medium?: string | number;
      xl?: string | number;
    };

// Style properties interface
interface StyleProps {
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  padding?: ResponsiveValue;
  margin?: ResponsiveValue;
  width?: ResponsiveValue;
  maxWidth?: ResponsiveValue;
  border?: string;
  color?: string;
  fontSize?: ResponsiveValue;
  fontWeight?: ResponsiveValue;
  marginBottom?: ResponsiveValue;
  contentPadding?: ResponsiveValue;
  borderColor?: string;
  [key: string]: ResponsiveValue | string | undefined;
}

interface DealershipCardProps {
  id: string;
  name: string;
  address: string;
  city: string;
  serviceType: string;
  onContact?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  cardStyle?: StyleProps;
  cityBadgeStyle?: StyleProps;
  serviceTypeBadgeStyle?: StyleProps;
  titleStyle?: StyleProps;
  addressStyle?: StyleProps;
  buttonStyle?: StyleProps;
}

export const DealershipCard: React.FC<DealershipCardProps> = ({
  id,
  name,
  address,
  city,
  serviceType,
  onContact,
  onViewDetails,
  cardStyle = {},
  cityBadgeStyle = {},
  serviceTypeBadgeStyle = {},
  titleStyle = {},
  addressStyle = {},
  buttonStyle = {},
}) => {
  const isMobile = useBreakpointValue({ base: true, medium: false }) || false;

  const handleContact = () => {
    if (onContact) onContact(id);
  };

  const handleViewDetails = () => {
    if (onViewDetails) onViewDetails(id);
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
      backgroundColor={cardStyle.backgroundColor || "#FFFFFF"}
      borderRadius={cardStyle.borderRadius || "2px"}
      padding={resolveResponsiveValue(cardStyle.padding) || "0"}
      margin={resolveResponsiveValue(cardStyle.margin) || "0 0 1rem 0"}
      width={
        resolveResponsiveValue(cardStyle.width) || {
          base: "100%",
          medium: "445px",
        }
      }
      maxWidth={resolveResponsiveValue(cardStyle.maxWidth)}
    >
      <Flex direction="column" height="100%">
        {/* City and Service Type Badges */}
        <Flex justifyContent="space-between" padding="0">
          <View
            backgroundColor={cityBadgeStyle.backgroundColor || "#ffffff"}
            padding={
              resolveResponsiveValue(cityBadgeStyle.padding) || "0.5rem 1rem"
            }
            borderTopLeftRadius={cardStyle.borderRadius || "8px"}
          >
            <Text
              color={cityBadgeStyle.color || "#333333"}
              fontSize={
                resolveResponsiveValue(cityBadgeStyle.fontSize) || "0.875rem"
              }
              fontWeight={
                resolveResponsiveValue(cityBadgeStyle.fontWeight) || "normal"
              }
            >
              {city}
            </Text>
          </View>
          <View
            backgroundColor={serviceTypeBadgeStyle.backgroundColor || "#ffffff"}
            padding={
              resolveResponsiveValue(serviceTypeBadgeStyle.padding) ||
              "0.5rem 1rem"
            }
            borderTopRightRadius={cardStyle.borderRadius || "8px"}
          >
            <Text
              color={serviceTypeBadgeStyle.color || "#D42224"}
              fontSize={
                resolveResponsiveValue(serviceTypeBadgeStyle.fontSize) ||
                "0.875rem"
              }
              fontWeight={
                resolveResponsiveValue(serviceTypeBadgeStyle.fontWeight) ||
                "normal"
              }
            >
              {serviceType}
            </Text>
          </View>
        </Flex>

        {/* Dealership Info */}
        <View
          padding={
            resolveResponsiveValue(cardStyle.contentPadding) || "1.25rem"
          }
          flex="1"
        >
          <Text
            fontSize={resolveResponsiveValue(titleStyle.fontSize) || "1.25rem"}
            fontWeight={resolveResponsiveValue(titleStyle.fontWeight) || "600"}
            color={titleStyle.color || "#000000"}
            marginBottom={
              resolveResponsiveValue(titleStyle.marginBottom) || "0.75rem"
            }
          >
            {name}
          </Text>
          <Text
            fontSize={
              resolveResponsiveValue(addressStyle.fontSize) || "0.875rem"
            }
            color={addressStyle.color || "#666666"}
            marginBottom={
              resolveResponsiveValue(addressStyle.marginBottom) || "1.5rem"
            }
          >
            {address}
          </Text>

          {/* Contact Button and View Details Link */}
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="auto"
          >
            <Button
              width="auto"
              backgroundColor={buttonStyle.backgroundColor || "#FFFFFF"}
              color={buttonStyle.color || "#000000"}
              borderColor={buttonStyle.borderColor || "#CCCCCC"}
              border="1px solid"
              borderRadius={buttonStyle.borderRadius || "20px"}
              padding={
                resolveResponsiveValue(buttonStyle.padding) || "0.5rem 3rem"
              }
              fontSize={
                resolveResponsiveValue(buttonStyle.fontSize) || "0.875rem"
              }
              fontWeight={
                resolveResponsiveValue(buttonStyle.fontWeight) || "normal"
              }
              onClick={handleContact}
            >
              Contáctanos
            </Button>
            <Text
              color="#000"
              fontSize="0.875rem"
              textDecoration="underline"
              style={{ cursor: "pointer" }}
              onClick={handleViewDetails}
            >
              Ver detalle
            </Text>
          </Flex>
        </View>
      </Flex>
    </View>
  );
};

export default DealershipCard;
