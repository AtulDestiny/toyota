/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import {
  View,
  Text,
  Flex,
  Button,
  TextField,
  SelectField,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { JobCard } from "../JobCard/JobCard";

// Define style property types
type ResponsiveValue =
  | string
  | number
  | {
      base?: string | number;
      medium?: string | number;
      large?: string | number;
      xl?: string | number;
    };

type StyleProps = Record<string, ResponsiveValue | string | undefined>;

interface JobListing {
  id: string;
  location: string;
  title: string;
  publishedDays: number;
  workType?: string;
  workModality?: string;
  department?: string;
  slug?: string;
}

interface JobFinderProps {
  title: string;
  subtitle: string;
  containerStyle?: StyleProps;
  initialJobs: JobListing[];
  onViewJobDetails?: (id: string) => void;
}

export const JobFinder: React.FC<JobFinderProps> = ({
  title,
  subtitle,
  containerStyle = {},
  initialJobs = [],
  onViewJobDetails,
}) => {
  const [jobs] = useState<JobListing[]>(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("recent");

  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, medium: false }) || false;
  const isTablet =
    useBreakpointValue({
      base: false,
      medium: true,
      large: false,
    }) || false;

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation =
      !locationFilter || job.location.includes(locationFilter);
    const matchesDepartment =
      !departmentFilter ||
      (job.department && job.department.includes(departmentFilter));

    return matchesSearch && matchesLocation && matchesDepartment;
  });

  // Sort jobs based on selected option
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortOption) {
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

  // Handle job card click
  const handleJobClick = (id: string) => {
    const job = jobs.find((j) => j.id === id);
    if (job) {
      const slug = job.slug || convertToSlug(job.title);
      console.log(`Navigating to: /trabaja-con-nosotros/${slug}`);

      // Add a small delay to make sure the console.log completes before navigation
      setTimeout(() => {
        router.push(`/trabaja-con-nosotros/${slug}`);
      }, 100);
    } else {
      console.error(`Job with id ${id} not found`);
    }
  };

  const convertToSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Determine grid template columns based on screen size
  const gridTemplateColumns = isMobile
    ? "1fr"
    : isTablet
      ? "repeat(2, 1fr)"
      : "repeat(3, 1fr)";

  return (
    <View
      width="100%"
      maxWidth={containerStyle.maxWidth || "1200px"}
      margin={containerStyle.margin || "0 auto"}
      padding={containerStyle.padding || { base: "1rem", medium: "2rem" }}
    >
      {/* Header */}
      <Flex
        direction="column"
        marginBottom={{ base: "2rem", medium: "2.5rem" }}
      >
        <View />

        {/* Search and Filters */}
        <Flex
          direction={{ base: "column", medium: "row" }}
          justifyContent={{ base: "center", medium: "space-between" }}
          alignItems={{ base: "flex-start", medium: "center" }}
          marginTop="1.5rem"
          marginBottom="2rem"
          style={{
            borderBottom: "1px solid #E5E5E5",
          }}
          paddingBottom="1.5rem"
          gap={{ base: "1rem", medium: "0" }}
        >
          <Text
            fontSize={{ base: "18px", medium: "1.5rem", xl: "1.5rem" }}
            fontWeight={{ base: "400", medium: "700" }}
            fontFamily="var(--font-ToyotaType-Regular)"
            textAlign={{base:"center", xl:"left"}}
            marginBottom="0.5rem"
            style={{ whiteSpace: "pre-line" }}
          >
            {title}
          </Text>

          <Flex alignItems="center" gap="1rem">
            <Button
              onClick={toggleFilters}
              backgroundColor="transparent"
              border="1px solid #000"
              borderRadius="30px"
              color="#000"
              padding="0.5rem 1.5rem"
              fontSize="0.875rem"
            >
              <span>
                <img
                  style={{ paddingRight: "10px" }}
                  src="/images/funnel.svg"
                  alt=""
                />
              </span>{" "}
              Filtros
            </Button>

            {/* Custom dropdown solution */}
            <div
              style={{
                position: "relative",
                height: "38px",
                minWidth: "150px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  border: "1px solid #000000",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 16px",
                  backgroundColor: "#FFFFFF",
                  zIndex: 1,
                }}
                onClick={() => {
                  // Toggle a custom dropdown instead of using the native select
                  const dropdown = document.getElementById("custom-dropdown");
                  if (dropdown) {
                    dropdown.style.display =
                      dropdown.style.display === "none" ? "block" : "none";
                  }
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span style={{ fontSize: "0.875rem", fontWeight: "700" }}>
                    Organizar por
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Hidden custom dropdown menu */}
              <div
                id="custom-dropdown"
                style={{
                  display: "none",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E0E0E0",
                  borderRadius: "4px",
                  marginTop: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  zIndex: 10,
                }}
              >
                {[
                  { value: "recent", label: "Organizar por" },
                  { value: "recent", label: "Más recientes" },
                  { value: "title", label: "Título" },
                  { value: "location", label: "Ubicación" },
                ].map((option, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "700",
                      borderBottom: index !== 3 ? "1px solid #E0E0E0" : "none",
                      backgroundColor:
                        sortOption === option.value ? "#F5F5F5" : "transparent",
                    }}
                    onClick={() => {
                      setSortOption(option.value);
                      const dropdown =
                        document.getElementById("custom-dropdown");
                      if (dropdown) {
                        dropdown.style.display = "none";
                      }
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>

              {/* Completely hidden actual select field for form submission if needed */}
              <select
                name="sortOption"
                value={sortOption}
                onChange={handleSortChange}
                style={{ display: "none", fontWeight: "700" }}
              >
                <option value="recent">Organizar por</option>
                <option value="recent">Más recientes</option>
                <option value="title">Título</option>
                <option value="location">Ubicación</option>
              </select>
            </div>
          </Flex>
        </Flex>

        {showFilters && !isMobile && (
          <Flex
            direction={{ base: "column", medium: "row" }}
            gap="1rem"
            marginBottom="2rem"
          >
            <TextField
              label="Buscar vacantes"
              placeholder="Ej: Ingeniero, Ventas, Marketing..."
              onChange={(e) => setSearchTerm(e.target.value)}
              flex="1"
            />

            <SelectField
              label="Ubicación"
              placeholder="Seleccionar ubicación"
              onChange={(e) => setLocationFilter(e.target.value)}
              flex="1"
            >
              <option value="">Todas las ubicaciones</option>
              <option value="BOGOTÁ">Bogotá</option>
              <option value="MEDELLÍN">Medellín</option>
              <option value="CALI">Cali</option>
              <option value="BARRANQUILLA">Barranquilla</option>
            </SelectField>

            <SelectField
              label="Departamento"
              placeholder="Seleccionar departamento"
              onChange={(e) => setDepartmentFilter(e.target.value)}
              flex="1"
            >
              <option value="">Todos los departamentos</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Marketing">Marketing</option>
              <option value="Ventas">Ventas</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Producción">Producción</option>
            </SelectField>
          </Flex>
        )}
      </Flex>

      {/* Job Listings Grid */}
      <View
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns,
          gap: "1.5rem",
        }}
      >
        {sortedJobs.length > 0 ? (
          sortedJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              location={job.location}
              title={job.title}
              publishedDays={job.publishedDays}
              workType={job.workType}
              workModality={job.workModality}
              onViewDetails={() => handleJobClick(job.id)}
              cardStyle={{
                background: "linear-gradient(178.06deg, #E7EDF1 52.85%, #F4F7F9 98.36%)",
                padding: { base: "1.5rem", xl: "2rem" },
              }}
              titleStyle={{
                fontSize: "1.25rem",
                fontWeight: "700",
              }}
            />
          ))
        ) : (
          <View
            backgroundColor="white"
            borderRadius="8px"
            boxShadow="0 2px 8px rgba(0,0,0,0.1)"
            padding="2rem"
            textAlign="center"
          >
            <Text
              fontSize="1.1rem"
              fontFamily="var(--font-ToyotaType-Regular)"
              marginBottom="1rem"
            >
              No se encontraron vacantes con los criterios seleccionados.
            </Text>
            <Text
              fontSize="0.9rem"
              fontFamily="var(--font-toyotaDisplay)"
              color="#666"
            >
              Intenta con diferentes términos de búsqueda o filtros.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default JobFinder;
