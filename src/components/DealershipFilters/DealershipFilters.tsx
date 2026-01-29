"use client";
import React, { useState } from "react";
import {
  View,
  Text,
  Flex,
  Button,
  CheckboxField,
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

// Define style props interface with proper typing
interface StyleProps {
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  padding?: ResponsiveValue;
  margin?: ResponsiveValue;
  width?: ResponsiveValue;
  maxWidth?: ResponsiveValue;
  color?: string;
  fontSize?: ResponsiveValue;
  fontWeight?: ResponsiveValue;
  marginBottom?: ResponsiveValue;
  paddingBottom?: ResponsiveValue;
  marginTop?: ResponsiveValue;
  borderBottom?: string;
  cursor?: string;
  [key: string]: ResponsiveValue | string | undefined;
}

// Define filter item interface
interface FilterItem {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

// Define filter category interface
interface FilterCategory {
  id: string;
  title: string;
  items: FilterItem[];
  isOpen: boolean;
}

// Define component props
interface DealershipFiltersProps {
  categories?: FilterCategory[];
  onApplyFilters?: (filters: FilterCategory[]) => void;
  onClearFilters?: () => void;
  titleStyle?: StyleProps;
  buttonStyle?: StyleProps;
  categoryTitleStyle?: StyleProps;
  checkboxStyle?: StyleProps;
  containerStyle?: StyleProps;
}

export const DealershipFilters: React.FC<DealershipFiltersProps> = (props) => {
  const {
    onApplyFilters,
    onClearFilters,
    titleStyle = {},
    buttonStyle = {},
    categoryTitleStyle = {},
    checkboxStyle = {},
    containerStyle = {},
  } = props;

  // Default filter categories if none provided
  const defaultCategories: FilterCategory[] = [
    {
      id: "service-type",
      title: "Tipo de Servicio",
      isOpen: true,
      items: [
        { id: "vitrina", label: "Vitrina", count: 2, checked: true },
        { id: "taller", label: "Taller", count: 7, checked: false },
        { id: "usados", label: "Usados", count: 3, checked: false },
        { id: "repuestos", label: "Repuestos", count: 4, checked: false },
        {
          id: "mantenimiento",
          label: "Mantenimiento Express",
          count: 5,
          checked: false,
        },
      ],
    },
  ];

  // State for filter categories
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(
    props.categories || defaultCategories
  );

  const isMobile = useBreakpointValue({ base: true, medium: false }) || false;

  // Function to toggle a filter category's expanded state
  const toggleCategory = (categoryId: string) => {
    setFilterCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, isOpen: !category.isOpen }
          : category
      )
    );
  };

  // Function to toggle a checkbox
  const toggleCheckbox = (categoryId: string, itemId: string) => {
    setFilterCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : category
      )
    );
  };

  // Function to clear all filters
  const handleClearFilters = () => {
    setFilterCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        items: category.items.map((item) => ({
          ...item,
          checked: false,
        })),
      }))
    );

    if (onClearFilters) {
      onClearFilters();
    }
  };

  // Function to apply filters
  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(filterCategories);
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
      padding={resolveResponsiveValue(containerStyle.padding)}
      width={resolveResponsiveValue(containerStyle.width) || "100%"}
      maxWidth={resolveResponsiveValue(containerStyle.maxWidth)}
    >
      <View
        style={{
          borderBottom: titleStyle.borderBottom || "1px solid #000",
          paddingBottom:
            resolveResponsiveValue(titleStyle.paddingBottom) || "0.5rem",
        }}
      >
        <Text
          fontSize={resolveResponsiveValue(titleStyle.fontSize) || "1.25rem"}
          fontWeight={resolveResponsiveValue(titleStyle.fontWeight) || "600"}
          marginBottom={
            resolveResponsiveValue(titleStyle.marginBottom) || "1.5rem"
          }
          color={titleStyle.color || "#000000"}
        >
          Filtros
        </Text>
      </View>

      {filterCategories.map((category) => (
        <View key={category.id} marginBottom="1.5rem">
          {/* Fixed: Move cursor to style prop */}
          <Flex
            justifyContent="space-between"
            alignItems="center"
            onClick={() => toggleCategory(category.id)}
            marginBottom="0.75rem"
            style={{ cursor: "pointer" }}
          >
            <Text
              fontSize={
                resolveResponsiveValue(categoryTitleStyle.fontSize) || "1rem"
              }
              fontWeight={
                resolveResponsiveValue(categoryTitleStyle.fontWeight) || "500"
              }
              color={categoryTitleStyle.color || "#000000"}
            >
              {category.title}
            </Text>
            <Text fontSize="1.25rem" fontWeight="300">
              {category.isOpen ? "−" : "+"}
            </Text>
          </Flex>

          {category.isOpen && (
            <View paddingLeft="0.5rem">
              {category.items.map((item) => (
                <View key={item.id} marginBottom="0.5rem">
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize:
                        resolveResponsiveValue(checkboxStyle.fontSize) ||
                        "0.875rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleCheckbox(category.id, item.id)}
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        backgroundColor: item.checked ? "black" : "white",
                        border: "2px solid black",
                        borderRadius: "2px",
                        width: "16px",
                        height: "16px",
                        marginRight: "8px",
                        cursor: "pointer",
                        position: "relative",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    <span style={{ color: "black" }}>
                      {item.label} [{item.count}]
                    </span>
                  </label>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="0.75rem"
        marginTop={resolveResponsiveValue(buttonStyle.marginTop) || "2rem"}
      >
        {/* "Limpiar filtros" as a simple text link */}
        <Text
          color="#000000"
          fontSize="0.875rem"
          fontWeight="400"
          style={{ cursor: "pointer" }}
          textDecoration="underline"
          onClick={handleClearFilters}
        >
          Limpiar filtros
        </Text>
      </Flex>
    </View>
  );
};

export default DealershipFilters;
