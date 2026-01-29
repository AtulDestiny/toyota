"use client";
import React, { useState } from "react";
import {
  View,
  Text,
  Flex,
  Button,
  SelectField,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import { JobCard } from "../JobCard/JobCard";

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

// Define style props interface with proper typing
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
  paddingBottom?: ResponsiveValue;
  borderBottom?: string;
  gap?: ResponsiveValue;
  gridTemplateColumns?: ResponsiveValue;
  [key: string]: ResponsiveValue | string | undefined;
}

// Define job interface
interface Job {
  id: string;
  location: string;
  title: string;
  publishedDays: number;
  workType?: string;
  workModality?: string;
}

// Define sort options
type SortOption = "recent" | "title" | "location";

interface JobListingsProps {
  jobs: Job[];
  title?: string;
  subtitle?: string;
  onViewJobDetails?: (id: string) => void;
  onOpenFilters?: () => void;
  containerStyle?: StyleProps;
  headerStyle?: StyleProps;
  titleStyle?: StyleProps;
  subtitleStyle?: StyleProps;
  filtersStyle?: StyleProps;
  gridStyle?: StyleProps;
  cardStyle?: StyleProps;
}

export const JobListings: React.FC<JobListingsProps> = ({
  jobs,
  title = "Conoce las ofertas laborales",
  subtitle = "que tenemos para ti",
  onViewJobDetails,
  onOpenFilters,
  containerStyle = {},
  headerStyle = {},
  titleStyle = {},
  subtitleStyle = {},
  gridStyle = {},
  cardStyle = {},
}) => {
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [sortedJobs, setSortedJobs] = useState<Job[]>(jobs);

  const isMobile = useBreakpointValue({ base: true, medium: false }) || false;
  const isTablet =
    useBreakpointValue({
      base: false,
      medium: true,
      large: false,
    }) || false;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value as SortOption;
    setSortOption(option);

    const newSortedJobs = [...jobs].sort((a, b) => {
      switch (option) {
        case "recent":
          return a.publishedDays - b.publishedDays;
        case "title":
          return a.title.localeCompare(b.title);
        case "location":
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    setSortedJobs(newSortedJobs);
  };

  const handleViewDetails = (id: string) => {
    if (onViewJobDetails) {
      onViewJobDetails(id);
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

  // Determine grid template columns
  const gridTemplateColumns =
    resolveResponsiveValue(gridStyle.gridTemplateColumns) ||
    (isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)");

  return (
    <View
      width={resolveResponsiveValue(containerStyle.width) || "100%"}
      maxWidth={resolveResponsiveValue(containerStyle.maxWidth) || "1200px"}
      margin={resolveResponsiveValue(containerStyle.margin) || "0 auto"}
      padding={resolveResponsiveValue(containerStyle.padding) || "2rem 1.5rem"}
    >
      {/* Header with title and filters */}
      <Flex
        direction="column"
        marginBottom={
          resolveResponsiveValue(headerStyle.marginBottom) || "2.5rem"
        }
      >
        <View marginBottom="2rem">
          <Text
            fontSize={resolveResponsiveValue(titleStyle.fontSize) || "2rem"}
            fontWeight={resolveResponsiveValue(titleStyle.fontWeight) || "600"}
            color={titleStyle.color || "#000000"}
            marginBottom={
              resolveResponsiveValue(titleStyle.marginBottom) || "0.25rem"
            }
          >
            {title}
          </Text>
          <Text
            fontSize={resolveResponsiveValue(subtitleStyle.fontSize) || "2rem"}
            fontWeight={
              resolveResponsiveValue(subtitleStyle.fontWeight) || "600"
            }
            color={subtitleStyle.color || "#000000"}
          >
            {subtitle}
          </Text>
        </View>

        <View
          style={{
            borderBottom: headerStyle.borderBottom || "1px solid #E5E5E5",
          }}
          paddingBottom={
            resolveResponsiveValue(headerStyle.paddingBottom) || "1.5rem"
          }
        />

        <Flex
          justifyContent="flex-end"
          alignItems="center"
          marginTop="1.5rem"
          gap="1rem"
        >
          <Button
            backgroundColor="#FFFFFF"
            color="#000000"
            border="1px solid #000000"
            borderRadius="999px"
            padding="0.5rem 1rem"
            fontSize="0.875rem"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            onClick={onOpenFilters}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4H14M4 8H12M6 12H10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filtros
          </Button>

          <Flex alignItems="center" gap="0.5rem">
            <Text fontSize="0.875rem" color="#000000">
              Organizar por
            </Text>
            <SelectField
              name="sortOption"
              value={sortOption}
              onChange={handleSortChange}
              size="small"
              width="auto"
              label="Ordenar por"
              labelHidden={true}
            >
              <option value="recent">Más recientes</option>
              <option value="title">Título</option>
              <option value="location">Ubicación</option>
            </SelectField>
          </Flex>
        </Flex>
      </Flex>

      {/* Job cards grid */}
      <View
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns,
          gap: resolveResponsiveValue(gridStyle.gap) || "1.5rem",
        }}
      >
        {sortedJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            location={job.location}
            title={job.title}
            publishedDays={job.publishedDays}
            workType={job.workType}
            workModality={job.workModality}
            onViewDetails={handleViewDetails}
            cardStyle={cardStyle}
          />
        ))}
      </View>
    </View>
  );
};

export default JobListings;
