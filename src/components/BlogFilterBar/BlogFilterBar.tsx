import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  Flex,
  Image,
  Divider,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Option, Select } from "@/components/Layout/Select/Select";

// Define style property types to replace 'any'
type StyleValue = string | number | boolean;
type ResponsiveStyle = StyleValue | Record<string, StyleValue>;
type StyleProps = Record<string, ResponsiveStyle>;

interface BlogFilterBarProps {
  title?: string;
  sortOptions?: string[];
  onSortChange?: (option: string) => void;
  titleStyle?: Record<string, any>;
  containerStyle?: Record<string, any>;
  onFilterClick?: (categories: string[]) => void;
  selectedOption?: string[];
}

export enum SelectTheme {
  Dark = "dark",
  Light = "light",
}

interface FilterProps {
  multiSelect?: boolean;
  onFilterClick?: (value: string | string[]) => void;
}

const filterOptions = [
  { label: "Todas", value: "todas" },
  { label: "Últimas Noticias", value: "Últimas Noticias" },
  { label: "Noticias", value: "noticias" },
  { label: "Artículos", value: "articulos" },
  { label: "Guías", value: "guias" },
  { label: "Consejos", value: "consejos" },
  { label: "Tecnología", value: "tecnología" },
];

export const BlogFilterBar: React.FC<BlogFilterBarProps> = (props) => {
  const {
    title = "Selecciona el tema de tu interés",
    titleStyle,
    containerStyle,
    onSortChange,
  } = props;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showNewsSection, setShowNewsSection] = useState(true);
  const [sortOption, setSortOption] = useState("recientes");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const defaultTitleStyle = {
    fontSize: { base: "22px", medium: "28px", xl: "28px" },
    fontWeight: "700",
    fontFamily: "var(--font-ToyotaType-Regular)",
    color: "#000",
    lineheight: { base: "110%", medium: "36.22px", xl: "36.22px" },
    letterspacing: { base: "0", medium: "0", xl: "0" },
  };

  const defaultContainerStyle = {
    padding: { base: "26px 1rem 0", xl: "80px 0 2rem" },
    borderBottom: "1px solid #E0E0E0",
    margin: "0 auto",
    maxWidth: {
      base: "100%",
      medium: "1200px",
      large: "1200px",
      xl: "1200px",
      xxl: "1530px",
    },
  };

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const toggleSortPanel = () => {
    setIsSortOpen(!isSortOpen);
  };
  
  const applyFilters = () => {
    setIsFilterOpen(false);
    console.log("Applied filters:", selectedFilters);
  };
  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const sortOptions = [
    { label: "Recientes", value: "recientes" },
    { label: "Más Antiguos", value: "antiguos" },
    { label: "A-Z", value: "a-z" },
    { label: "Z-A", value: "z-a" },
  ];

  const handleSortChange = (selected: { value: string }) => {
    if (selected) {
      setSortOption(selected.value);
      setIsSortOpen(false);
      if (onSortChange) {
        onSortChange(selected.value);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    if (isSortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (value: string, multiSelect: boolean = true) => {
    setSelectedFilters((prevFilters) => {
      if (multiSelect) {
        const updatedFilters = prevFilters.includes(value)
          ? prevFilters.filter((v) => v !== value)
          : [...prevFilters, value];

        props.onFilterClick?.(updatedFilters);
        return updatedFilters;
      } else {
        const updatedFilters = prevFilters.includes(value) ? [] : [value];

        props.onFilterClick?.(updatedFilters);
        return updatedFilters;
      }
    });
  };

  return (
    <View {...defaultContainerStyle} {...containerStyle}>
      <Flex
        direction={{ base: "column", medium: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", medium: "center" }}
        gap={{ base: "26px", xl: "1rem" }}
      >
        <Text {...defaultTitleStyle} {...titleStyle}>
          {title}
        </Text>

        <Flex gap="1rem">
          <View
            className="dropdown"
            style={{ position: "relative" }}
            ref={filterRef}
          >
            <Button
              borderRadius="999px"
              padding="10px 20px"
              backgroundColor="white"
              border="1px solid #CCCCCC"
              width="160px"
              color="#000"
              fontWeight="500"
              maxHeight={{ base: "40px",medium:"40px", xl: "51.74px" }}
              minHeight={{ base: "40px",medium:"40px", xl: "50px" }}
              onClick={toggleFilterPanel}
            >
              Filtros{""}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="m7 10l5 5l5-5z" />
              </svg>
              {selectedFilters.length > 0 && `(${selectedFilters.length})`}
            </Button>

            {isFilterOpen && (
              <View
                className="dropdown-content"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  zIndex: 100,
                  padding: "10px",
                  borderRadius: "10px",
                  minWidth: "200px",
                }}
              >
                {filterOptions.map((option) => (
                  <label
                    key={option.value}
                    style={{
                      display: "block",
                      marginTop: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                      style={{ marginRight: "8px" }}
                    />
                    {option.label}
                  </label>
                ))}
              </View>
            )}
          </View>

          <View style={{ position: "relative" }} ref={sortRef}>
            <Button
              variation="link"
              size="small"
              onClick={toggleSortPanel}
              borderRadius="999px"
              paddingLeft="1rem"
              paddingRight="1.5rem"
              paddingTop={{ base: "10px" }}
              paddingBottom={{ base: "10px" }}
              display="flex"
              alignItems="center"
              gap="0.5rem"
              border="1px solid #CCCCCC"
              color="#000"
              width={{ base: "162px", xl: "209.56px" }}
              height={{ base: "40px", xl: "51.74px" }}
            >
              <Text
                fontFamily="var(--font-roboto"
                fontWeight="500"
                fontSize={{ base: "14px", xl: "18.11px" }}
                lineHeight="25.87px"
                letterSpacing="0.13px"
                textAlign="center"
              >
                Organizar por
              </Text>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 10L4 6H12L8 10Z" fill="currentColor" />
              </svg>
            </Button>
            
            {isSortOpen && (
              <View
                position="absolute"
                top="100%"
                left="0"
                width="100%"
                backgroundColor="white"
                border="1px solid #CCCCCC"
                borderRadius="8px"
                boxShadow="0 2px 8px rgba(0,0,0,0.1)"
                style={{ zIndex: 1000 }}
                marginTop="4px"
              >
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    variation="link"
                    onClick={() => handleSortChange(option)}
                    padding="12px 16px"
                    width="100%"
                    textAlign="left"
                    color="#000"
                    fontSize={{ base: "14px", xl: "16px" }}
                    fontFamily="var(--font-roboto)"
                    style={{
                      borderRadius: 0,
                      justifyContent: "flex-start",
                      backgroundColor: sortOption === option.value ? "#f5f5f5" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = sortOption === option.value ? "#f5f5f5" : "transparent";
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </View>
            )}
          </View>
        </Flex>
      </Flex>
      <Divider
        marginTop={{ base: "33px", xl: "62px" }}
        color={"#D9D9D9"}
        marginBottom="0"
      />
    </View>
  );
};
