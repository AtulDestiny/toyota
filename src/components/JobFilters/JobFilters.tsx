// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useState } from "react";
import {
  View,
  Text,
  Flex,
  Button,
  CheckboxField,
  Radio,
  RadioGroupField,
  useBreakpointValue,
} from "@aws-amplify/ui-react";

// Define filter item interface
interface FilterItem {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
}

// Define filter category interface
interface FilterCategory {
  id: string;
  title: string;
  type: "checkbox" | "radio";
  items: FilterItem[];
  isOpen: boolean;
}

// Define style props interface
interface StyleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Define component props
interface JobFiltersProps {
  categories?: FilterCategory[];
  onApplyFilters?: (filters: FilterCategory[]) => void;
  onClearFilters?: () => void;
  onClose?: () => void;
  titleStyle?: StyleProps;
  buttonStyle?: StyleProps;
  categoryTitleStyle?: StyleProps;
  checkboxStyle?: StyleProps;
  containerStyle?: StyleProps;
  isOpen?: boolean;
}

export const JobFilters: React.FC<JobFiltersProps> = (props) => {
  const {
    onApplyFilters,
    onClearFilters,
    onClose,
    titleStyle = {},
    buttonStyle = {},
    categoryTitleStyle = {},
    checkboxStyle = {},
    containerStyle = {},
    isOpen = false,
  } = props;

  // Default filter categories if none provided
  const defaultCategories: FilterCategory[] = [
    {
      id: "locations",
      title: "Ubicación",
      type: "checkbox",
      isOpen: true,
      items: [
        { id: "bogota", label: "Bogotá", count: 12, checked: false },
        { id: "medellin", label: "Medellín", count: 8, checked: false },
        { id: "cali", label: "Cali", count: 5, checked: false },
        { id: "barranquilla", label: "Barranquilla", count: 3, checked: false },
      ],
    },
    {
      id: "work-type",
      title: "Tipo de trabajo",
      type: "checkbox",
      isOpen: true,
      items: [
        {
          id: "full-time",
          label: "Tiempo Completo",
          count: 18,
          checked: false,
        },
        { id: "part-time", label: "Medio Tiempo", count: 7, checked: false },
        { id: "contract", label: "Por Contrato", count: 5, checked: false },
      ],
    },
    {
      id: "modality",
      title: "Modalidad",
      type: "radio",
      isOpen: true,
      items: [
        { id: "hybrid", label: "Híbrida", count: 15, checked: false },
        { id: "remote", label: "Remoto", count: 10, checked: false },
        { id: "on-site", label: "Presencial", count: 5, checked: false },
      ],
    },
    {
      id: "seniority",
      title: "Nivel de experiencia",
      type: "checkbox",
      isOpen: true,
      items: [
        { id: "entry", label: "Junior", count: 7, checked: false },
        { id: "mid", label: "Semi Senior", count: 10, checked: false },
        { id: "senior", label: "Senior", count: 8, checked: false },
        { id: "expert", label: "Experto", count: 5, checked: false },
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

  // Function to set radio selection
  const setRadioSelection = (categoryId: string, itemId: string) => {
    setFilterCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) => ({
                ...item,
                checked: item.id === itemId,
              })),
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

    if (onClose && isMobile) {
      onClose();
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

  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <View
      backgroundColor="#FFFFFF"
      padding={resolveResponsiveValue(containerStyle.padding) || "1.5rem"}
      borderRadius={containerStyle.borderRadius || "0.5rem"}
      boxShadow={containerStyle.boxShadow || "0 1px 3px rgba(0,0,0,0.1)"}
      width={resolveResponsiveValue(containerStyle.width) || "100%"}
      maxWidth={resolveResponsiveValue(containerStyle.maxWidth)}
      style={{
        position: isMobile ? "fixed" : "relative",
        top: isMobile ? 0 : "auto",
        left: isMobile ? 0 : "auto",
        right: isMobile ? 0 : "auto",
        bottom: isMobile ? 0 : "auto",
        zIndex: isMobile ? 1000 : 1,
        height: isMobile ? "100vh" : "auto",
        overflowY: isMobile ? "auto" : "visible",
      }}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginBottom="1.5rem"
      >
        <Text
          fontSize={resolveResponsiveValue(titleStyle.fontSize) || "1.25rem"}
          fontWeight={resolveResponsiveValue(titleStyle.fontWeight) || "600"}
          color={titleStyle.color || "#000000"}
        >
          Filtros
        </Text>

        {isMobile && (
          <Button
            backgroundColor="transparent"
            color="#000000"
            padding="0.5rem"
            onClick={onClose}
          >
            ✕
          </Button>
        )}
      </Flex>

      <View
        style={{ borderBottom: "1px solid #E5E5E5" }}
        paddingBottom="1rem"
        marginBottom="1.5rem"
      />

      {filterCategories.map((category) => (
        <View key={category.id} marginBottom="1.5rem">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            onClick={() => toggleCategory(category.id)}
            style={{ cursor: "pointer" }} // Move cursor to style prop
            marginBottom="0.75rem"
          >
            <Text
              fontSize={
                resolveResponsiveValue(categoryTitleStyle.fontSize) || "1rem"
              }
              fontWeight={
                resolveResponsiveValue(categoryTitleStyle.fontWeight) || "600"
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
              {category.type === "checkbox" ? (
                // Checkbox filters
                category.items.map((item) => (
                  <CheckboxField
                    key={item.id}
                    label={`${item.label} ${item.count ? `(${item.count})` : ""}`}
                    name={item.id}
                    value={item.id}
                    checked={item.checked}
                    onChange={() => toggleCheckbox(category.id, item.id)}
                    fontSize={
                      resolveResponsiveValue(checkboxStyle.fontSize) ||
                      "0.875rem"
                    }
                    marginBottom="0.75rem"
                  />
                ))
              ) : (
                // Radio button filters
                <RadioGroupField
                  name={category.id}
                  onChange={(e) =>
                    setRadioSelection(category.id, e.target.value)
                  }
                  value={category.items.find((item) => item.checked)?.id || ""}
                  label=""
                >
                  {category.items.map((item) => (
                    <View key={item.id} marginBottom="0.75rem">
                      <Radio
                        value={item.id}
                        name={category.id}
                        label={`${item.label} ${item.count ? `(${item.count})` : ""}`}
                      />
                    </View>
                  ))}
                </RadioGroupField>
              )}
            </View>
          )}
        </View>
      ))}

      <Flex
        direction="column"
        gap="0.75rem"
        marginTop={resolveResponsiveValue(buttonStyle.marginTop) || "2rem"}
      >
        <Button
          backgroundColor="#FFFFFF"
          color="#333333"
          borderColor="#CCCCCC"
          border="1px solid"
          padding="0.75rem 1rem"
          borderRadius="999px"
          fontSize={resolveResponsiveValue(buttonStyle.fontSize) || "0.875rem"}
          width="100%"
          onClick={handleClearFilters}
        >
          Limpiar filtros
        </Button>
      </Flex>
    </View>
  );
};

export default JobFilters;
