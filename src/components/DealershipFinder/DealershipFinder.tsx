/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useState } from "react";
import {
  View,
  Flex,
  useBreakpointValue,
  Button,
  Heading,
  Text,
} from "@aws-amplify/ui-react";
// Try alternative import approaches:
// Option 1: Import with both default and named exports
import DealershipFilters, {
  DealershipFilters as NamedDealershipFilters,
} from "../DealershipFilters/DealershipFilters";
import DealershipResults, {
  DealershipResults as NamedDealershipResults,
} from "../DealershipResults/DealershipResults";
import { Divider, Link, SelectField } from "@aws-amplify/ui-react";
import Modal from "../Layout/Modal/Modal";

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
  gap?: ResponsiveValue;
  [key: string]: ResponsiveValue | string | undefined;
}

// Define filter category interface
interface FilterCategory {
  id: string;
  title: string;
  items: {
    id: string;
    label: string;
    count: number;
    checked: boolean;
  }[];
  isOpen: boolean;
}

// Define dealership interface
interface Dealership {
  id: string;
  name: string;
  address: string;
  city: string;
  serviceType: string;
}

// Sample data for initial state
const initialFilters: FilterCategory[] = [
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

// Sample dealership data
const sampleDealerships: Dealership[] = [
  {
    id: "1",
    name: "Carco SA",
    address: "Cll.13 No.43-64",
    city: "Bogotá",
    serviceType: "Vitrina",
  },
  {
    id: "2",
    name: "Distoyota Calle 102",
    address: "Avenida Cra.70 No.102-02 Barrio Morato",
    city: "Bogotá",
    serviceType: "Vitrina",
  },
  {
    id: "3",
    name: "Distoyota Calle 13",
    address: "Cll.13 No.43-64",
    city: "Bogotá",
    serviceType: "Vitrina",
  },
  {
    id: "4",
    name: "Distoyota Calle 102",
    address: "Avenida Cra.70 No.102-02 Barrio Morato",
    city: "Bogotá",
    serviceType: "Vitrina",
  },
];

interface DealershipFinderProps {
  initialDealerships?: Dealership[];
  initialFilters?: FilterCategory[];
  containerStyle?: StyleProps;
  filterContainerStyle?: StyleProps;
  resultsContainerStyle?: StyleProps;
}

export const DealershipFinder: React.FC<DealershipFinderProps> = ({
  initialDealerships = sampleDealerships,
  initialFilters: propInitialFilters = initialFilters,
  containerStyle = {},
  filterContainerStyle = {},
  resultsContainerStyle = {},
}) => {
  const [filters, setFilters] = useState<FilterCategory[]>(propInitialFilters);
  const [dealerships, setDealerships] =
    useState<Dealership[]>(initialDealerships);
  const [sortOption, setSortOption] = useState<string>("name");

  // New state variables for filter toggle and modal
  const [selectedDealership, setSelectedDealership] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useBreakpointValue({ base: true, medium: false }) || false;

  // Handle applying filters
  const handleApplyFilters = (updatedFilters: FilterCategory[]) => {
    setFilters(updatedFilters);
    setShowFilters(false); // Close filter panel on mobile after applying

    // In a real application, you'd make an API call here
    // For now, we'll just simulate filtering the dealerships
    // This is just a placeholder logic
    const selectedServiceTypes =
      updatedFilters
        .find((category) => category.id === "service-type")
        ?.items.filter((item) => item.checked)
        .map((item) => item.label) || [];

    if (selectedServiceTypes.length === 0) {
      setDealerships(initialDealerships);
    } else {
      const filteredDealerships = initialDealerships.filter((dealership) =>
        selectedServiceTypes.includes(dealership.serviceType)
      );
      setDealerships(filteredDealerships);
    }
  };

  // Handle clearing filters
  const handleClearFilters = () => {
    setDealerships(initialDealerships);
    setShowFilters(false); // Close filter panel on mobile after clearing
  };

  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);

    // Sort dealerships based on selected option
    const sortedDealerships = [...dealerships].sort((a, b) => {
      switch (option) {
        case "name":
          return a.name.localeCompare(b.name);
        case "city":
          return a.city.localeCompare(b.city);
        case "serviceType":
          return a.serviceType.localeCompare(b.serviceType);
        default:
          return 0;
      }
    });

    setDealerships(sortedDealerships);
  };

  // Handle contact dealership
  const handleContactDealership = (id: string) => {
    console.log(`Contact dealership with ID: ${id}`);
    // Implement contact functionality here
  };

  // Handle view dealership details
  const handleViewDealershipDetails = (id) => {
    const dealership = dealerships.find((d) => d.id === id);
    if (dealership) {
      setSelectedDealership(dealership);
      setIsModalOpen(true);
    }
  };

  // Toggle filters visibility for mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <View
      width={containerStyle.width || "100%"}
      maxWidth={containerStyle.maxWidth || "1200px"}
      margin={containerStyle.margin || "0 auto"}
      padding={containerStyle.padding || "1.5rem"}
      backgroundColor={containerStyle.backgroundColor}
    >
      {/* Mobile filter buttons (shown in screenshot 2) */}
      {isMobile && (
        <Flex justifyContent="" marginBottom="1.5rem">
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

          <SelectField
            label=""
            labelHidden={true}
            onChange={(e) => handleSortChange(e.target.value)}
            defaultValue={sortOption}
            style={{
              width: "auto",
              border: "1px solid #000",
              borderRadius: "30px",
              padding: "0.5rem 1rem",
              fontWeight: "700",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            <option value="name">Nombre</option>
            <option value="city">Ciudad</option>
            <option value="serviceType">Tipo de Servicio</option>
          </SelectField>
        </Flex>
      )}
      <Flex
        direction={isMobile ? "column" : "row"}
        gap={containerStyle.gap || "2rem"}
        alignItems="flex-start"
      >
        {/* Filters Section - Modified for the mobile experience */}
        {(!isMobile || (isMobile && showFilters)) && (
          <View
            width={isMobile ? "100%" : "378px"}
            marginBottom={isMobile ? "2rem" : "0"}
            flexShrink={0}
            backgroundColor={isMobile ? "#fff" : "transparent"}
            position={isMobile ? "fixed" : "relative"}
            top={isMobile ? "0" : "auto"}
            left={isMobile ? "0" : "auto"}
            right={isMobile ? "0" : "auto"}
            bottom={isMobile ? "0" : "auto"}
            zIndex={isMobile ? "10" : "0"}
            overflowY={isMobile ? "auto" : "visible"}
            padding={isMobile ? "1rem" : "0"}
            display={isMobile && !showFilters ? "none" : "block"}
          >
            {isMobile && (
              <Flex justifyContent="flex-end" marginBottom="1rem">
                <Button
                  onClick={() => setShowFilters(false)}
                  backgroundColor="transparent"
                  color="#000"
                  fontSize="1.5rem"
                >
                  ✕
                </Button>
              </Flex>
            )}

            {/* Try with both default and named component options */}
            {DealershipFilters ? (
              <DealershipFilters
                categories={filters}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
                containerStyle={filterContainerStyle}
                titleStyle={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid #E5E5E5",
                  paddingBottom: "0.5rem",
                }}
                categoryTitleStyle={{
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
                checkboxStyle={{
                  fontSize: "0.875rem",
                }}
                buttonStyle={{
                  marginTop: "2rem",
                }}
              />
            ) : (
              <NamedDealershipFilters
                categories={filters}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
                containerStyle={filterContainerStyle}
                titleStyle={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid #E5E5E5",
                  paddingBottom: "0.5rem",
                }}
                categoryTitleStyle={{
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
                checkboxStyle={{
                  fontSize: "0.875rem",
                }}
                buttonStyle={{
                  marginTop: "2rem",
                }}
              />
            )}
          </View>
        )}

        {/* Results Section */}
        <View flex="1">
          {DealershipResults ? (
            <DealershipResults
              dealerships={dealerships}
              totalResults={dealerships.length}
              onSortChange={handleSortChange}
              onContactDealership={handleContactDealership}
              onViewDealershipDetails={handleViewDealershipDetails}
              resultsContainerStyle={resultsContainerStyle}
              headerStyle={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
              }}
              gridStyle={{
                gap: "1.5rem",
              }}
            />
          ) : (
            <NamedDealershipResults
              dealerships={dealerships}
              totalResults={dealerships.length}
              onSortChange={handleSortChange}
              onContactDealership={handleContactDealership}
              onViewDealershipDetails={handleViewDealershipDetails}
              resultsContainerStyle={resultsContainerStyle}
              headerStyle={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
              }}
              gridStyle={{
                gap: "1.5rem",
              }}
            />
          )}
        </View>
      </Flex>

      {/* Modal for Dealership Details - shown when a dealership is selected */}
      {isModalOpen && selectedDealership && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size={isMobile ? "full" : "large"}
        >
          <View backgroundColor="#1a1a1a" color="white">
            {/* Modal Header */}
            <View padding="1.5rem" position="relative">
              <Button
                onClick={() => setIsModalOpen(false)}
                backgroundColor="transparent"
                color="white"
                position="absolute"
                top="1rem"
                right="1rem"
                fontSize="1.5rem"
              >
                ✕
              </Button>
              <Heading color="white" level={4} marginTop="0.5rem">
                {selectedDealership.name.toUpperCase()}
              </Heading>
              <Text color="#ccc" fontSize="0.875rem" marginTop="0.5rem">
                Descubre todos los servicios y facilidades que tenemos para ti,{" "}
                {selectedDealership.address}
              </Text>
              <Link
                href={`https://maps.google.com/?q=${selectedDealership.address},${selectedDealership.city}`}
                color="white"
                textDecoration="underline"
                fontSize="0.875rem"
                marginTop="0.75rem"
                display="block"
              >
                Ver en Google Maps
              </Link>
            </View>

            <Divider color="#333" />

            {/* Modal Body with pre-defined content */}
            <View padding="1.5rem">
              {/* Hours section */}
              <View marginBottom="2rem">
                <Heading level={5} color="white" marginBottom="1rem">
                  Horarios de atención
                </Heading>

                <Text color="white" marginBottom="0.5rem">
                  Sala de ventas:
                </Text>
                <Flex justifyContent="space-between" marginBottom="0.25rem">
                  <Text color="#ccc">Lunes a Viernes</Text>
                  <Text color="#ccc">8 am a 6 pm</Text>
                </Flex>
                <Flex justifyContent="space-between" marginBottom="0.25rem">
                  <Text color="#ccc">Sábado</Text>
                  <Text color="#ccc">9 am a 6 pm</Text>
                </Flex>
                <Flex justifyContent="space-between" marginBottom="1.5rem">
                  <Text color="#ccc">Domingos</Text>
                  <Text color="#ccc">10 am a 4 pm</Text>
                </Flex>

                <Text color="white" marginBottom="0.5rem">
                  Mantenimiento Planeado:
                </Text>
                <Flex justifyContent="space-between" marginBottom="0.25rem">
                  <Text color="#ccc">Lunes a Viernes</Text>
                  <Text color="#ccc">6 am a 8 pm</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text color="#ccc">Sábado</Text>
                  <Text color="#ccc">8 am a 2 pm</Text>
                </Flex>
              </View>

              {/* Contact section */}
              <View>
                <Heading level={5} color="white" marginBottom="1rem">
                  Contacto
                </Heading>

                <Text color="white" marginBottom="0.25rem">
                  Teléfono:
                </Text>
                <Text color="#ccc" marginBottom="1rem">
                  (601) 6430505
                </Text>

                <Text color="white" marginBottom="0.25rem">
                  Teléfono agendamiento de citas:
                </Text>
                <Text color="#ccc" marginBottom="0.25rem">
                  (601) 6430505 Opción 4
                </Text>
                <Text color="#ccc" marginBottom="1rem">
                  311 259 8958
                </Text>

                <Text color="white" marginBottom="0.25rem">
                  Correo electrónico:
                </Text>
                <Link
                  href="mailto:distoyota150@distoyota.com.co"
                  color="#ccc"
                  marginBottom="1rem"
                  display="block"
                >
                  distoyota150@distoyota.com.co
                </Link>

                <Text color="white" marginBottom="0.25rem">
                  Página Web:
                </Text>
                <Link
                  href="https://distoyota.com/"
                  color="#ccc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://distoyota.com/
                </Link>
              </View>
            </View>

            <Divider color="#333" />

            {/* Modal Footer */}
            <View padding="1.5rem">
              <Button
                onClick={() => handleContactDealership(selectedDealership.id)}
                backgroundColor="#C12127"
                color="white"
                width="100%"
                padding="0.75rem"
                borderRadius="2rem"
              >
                ¿Necesitas ayuda? Contáctanos
              </Button>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DealershipFinder;
