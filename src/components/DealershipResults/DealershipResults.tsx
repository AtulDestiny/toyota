// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { View, Text, Flex, useBreakpointValue } from "@aws-amplify/ui-react";
import { DealershipCard } from "../DealershipCard/DealershipCard";
import { Option, Select, SelectTheme } from "@/components/Layout/Select/Select";

// Type for responsive values
type ResponsiveValue =
  | string
  | number
  | {
      base?: string | number;
      medium?: string | number;
      large?: string | number;
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
  selectWidth?: ResponsiveValue;
  gridTemplateColumns?: ResponsiveValue;
  gap?: ResponsiveValue;
  contentPadding?: ResponsiveValue;
  [key: string]: ResponsiveValue | string | undefined;
}

// Define the dealership interface
interface Dealership {
  id: string;
  name: string;
  address: string;
  city: string;
  serviceType: string;
}

// Define sort options
type SortOption = "name" | "city" | "serviceType";

interface DealershipResultsProps {
  dealerships: Dealership[];
  totalResults: number;
  onSortChange?: (sortOption: SortOption) => void;
  onContactDealership?: (id: string) => void;
  onViewDealershipDetails?: (id: string) => void;
  resultsContainerStyle?: StyleProps;
  headerStyle?: StyleProps;
  gridStyle?: StyleProps;
  cardStyle?: StyleProps;
}

export const DealershipResults: React.FC<DealershipResultsProps> = ({
  dealerships,
  totalResults,
  onSortChange,
  onContactDealership,
  onViewDealershipDetails,
  resultsContainerStyle = {},
  headerStyle = {},
  gridStyle = {},
  cardStyle = {},
}) => {
  const isMobile = useBreakpointValue({ base: true, medium: false }) || false;
  const isTablet =
    useBreakpointValue({
      base: false,
      medium: true,
      large: false,
    }) || false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSortChange) {
      onSortChange(e.target.value as SortOption);
    }
  };

  const resolveResponsiveValue = (
    value?:
      | string
      | number
      | {
          base?: string | number;
          medium?: string | number;
          large?: string | number;
          xl?: string | number;
        }
  ): string | number | undefined => {
    if (!value) return undefined;
    if (typeof value === "string" || typeof value === "number") return value;
    if (typeof value === "object") {
      if (!isMobile && !isTablet)
        return value.xl || value.large || value.medium || value.base;
      if (isTablet) return value.medium || value.base;
      return value.base;
    }
    return undefined;
  };

  return (
    <View
      backgroundColor={resultsContainerStyle.backgroundColor || "transparent"}
      padding={resolveResponsiveValue(resultsContainerStyle.padding) || "0"}
      width={resolveResponsiveValue(resultsContainerStyle.width) || "100%"}
    >
      {/* Header with result count and sorting options */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginBottom={
          resolveResponsiveValue(headerStyle.marginBottom) || "1.5rem"
        }
        flexDirection={isMobile ? "column" : "row"}
        gap={isMobile ? "1rem" : "0"}
      >
        <Text
          fontSize={resolveResponsiveValue(headerStyle.fontSize) || "1.125rem"}
          fontWeight={resolveResponsiveValue(headerStyle.fontWeight) || "600"}
          color={headerStyle.color || "#000000"}
        >
          {totalResults} Resultados
        </Text>

        {/* Sort dropdown */}
        <View
          minWidth={{ base: "230px", medium: "230px", large: "230px", xl: "135px" }}
          maxWidth={{ base: "max-content", medium: "max-content", large: "max-content", xl: "max-content", xxl: "max-content" }}
          marginLeft={"auto"}
          maxHeight={{ xl: "2.5rem" }}
          minHeight={"40px"}
          height={40}
        >
          <Select
            options={[
              { label: "Nombre", value: "name" },
              { label: "Ciudad", value: "city" },
              { label: "Tipo de servicio", value: "serviceType" },
            ]}
            onSelect={(selected) => {
              if (selected && onSortChange) {
                onSortChange(selected.value as SortOption);
              }
            }}
            placeholder="Organizar por"
            theme={SelectTheme.Light}
            customControlStyles={{
              width: "135px",
              height: "40px",
              minHeight: "40px",
              paddingTop: "0px",
              paddingRight: "0px",
              paddingBottom: "0px",
              paddingLeft: "0px",
              gap: "0px",
              fontSize: "14px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          />
        </View>
      </Flex>

      {/* Dealership cards grid */}
      {/* Dealership cards grid - multiple cards side by side */}
      <View
        display="flex"
        gap={resolveResponsiveValue(gridStyle.gap) || "1.5rem"}
        backgroundColor="#F6F6F6"
        style={{ flexWrap: "wrap" }}
        borderRadius="8px"
      >
        {dealerships.map((dealership) => (
          <DealershipCard
            key={dealership.id}
            id={dealership.id}
            name={dealership.name}
            address={dealership.address}
            city={dealership.city}
            serviceType={dealership.serviceType}
            onContact={onContactDealership}
            onViewDetails={onViewDealershipDetails}
            cardStyle={{
              ...cardStyle,
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              border: "1px solid #E5E5E5",
              margin: "0",
            }}
            titleStyle={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
            addressStyle={{
              fontSize: "0.875rem",
              color: "#666666",
              marginBottom: "1.5rem",
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default DealershipResults;
