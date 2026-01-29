// src/components/ConcessionaireSearch/ConcessionaireSearch.tsx
"use client";

import { View, Card, Text, Grid } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./ConcessionaireSearch.css";
import { Option, Select, SelectTheme } from "@/components/Layout/Select/Select";
import Button from "../Layout/Button/Button";
import { useState, useEffect, useCallback } from "react";
import { ConcessionaireModal } from "@/components/ConcessionaireSearch/ConcessionaireModal";
import { Concessionaire, Office, City } from "@/types/concessionaire"; // Import updated types
import { generateClient } from "aws-amplify/api";
import { listCities, listOfficesByCity } from "@/graphql/queries"; // Import updated queries

const client = generateClient();

interface ConcessionaireSearchProps {
  paddingTop?: string;
}

export const ConcessionaireSearch = ({
  paddingTop,
}: ConcessionaireSearchProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);

  const [location, setLocation] = useState<Option | null>(null);
  const [selectedConcessionaireOption, setSelectedConcessionaireOption] =
    useState<Option | null>(null);
  const [service, setService] = useState<Option | null>(null); // This state is not currently used in the logic for filtering offices.

  const [citiesOptions, setCitiesOptions] = useState<Option[]>([]);
  const [allOffices, setAllOffices] = useState<Office[]>([]); // Stores all offices fetched for the selected city
  const [filteredConcessionairesOptions, setFilteredConcessionairesOptions] =
    useState<Option[]>([]);

  // Function to fetch cities
  const fetchCities = useCallback(async () => {
    try {
      const cityData: any = await client.graphql({ query: listCities });
      const cities =
        (cityData.data as any)?.listAllCitiesSortedByName?.items || [];
      const options = cities.map((city: City) => ({
        value: city.id,
        label: city.name,
      }));
      setCitiesOptions(options);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }, []);

  // Function to fetch offices based on selected city
  const fetchOfficesByCity = useCallback(async (cityId: string) => {
    try {
      const officeData: any = await client.graphql({
        query: listOfficesByCity,
        variables: { filter: { cityId: { eq: cityId } } },
      });
      const offices = (officeData.data as any)?.listOffices?.items || [];
      setAllOffices(offices); // Store all offices for the selected city

      // Map offices to options for the concessionaire dropdown
      const concessionaireOptions = offices.map((office: Office) => ({
        value: office.id, // Use office ID as value
        label: office.name, // Display concessionaire name or office name
      }));
      setFilteredConcessionairesOptions(concessionaireOptions);
      setSelectedConcessionaireOption(null); // Reset concessionaire selection when city changes
    } catch (error) {
      console.error("Error fetching offices by city:", error);
      setAllOffices([]);
      setFilteredConcessionairesOptions([]);
      setSelectedConcessionaireOption(null);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  // Effect to fetch offices when a city is selected
  useEffect(() => {
    if (location) {
      fetchOfficesByCity(location.value);
    } else {
      setAllOffices([]);
      setFilteredConcessionairesOptions([]);
      setSelectedConcessionaireOption(null);
    }
  }, [location, fetchOfficesByCity]);

  const handleSearch = () => {
    if (selectedConcessionaireOption) {
      // Find the selected office from the allOffices array
      const office = allOffices.find(
        (off) => off.id === selectedConcessionaireOption.value
      );
      if (office) {
        setSelectedOffice(office);
        setIsOpen(true);
      } else {
        console.warn("Selected office not found in the list.");
        // Optionally, show an alert or message to the user
      }
    }
  };

  const sortedConcessionairesOptions = filteredConcessionairesOptions
    .slice()
    .sort((a, b) => {
      const labelA = a.label.toUpperCase();
      const labelB = b.label.toUpperCase();

      if (labelA < labelB) {
        return -1;
      }
      if (labelA > labelB) {
        return 1;
      }
      return 0;
    });

  return (
    <>
      <View className="concessionaire-search" paddingTop={paddingTop}>
        <Card className="concessionaire-search__card Card">
          <Grid
            className="concessionaire-search__grid"
            templateColumns={{ base: "1fr", xl: "1fr 444px" }}
            gap={{ base: "1.25rem", xl: "1.875rem" }}
          >
            <View className="concessionaire-search__header">
              <Text
                className="concessionaire-search__title"
                color="inherit"
                fontFamily="var(--font-ToyotaType-Regular)"
                fontSize={{ base: "2rem", xl: "3.625rem" }}
                fontWeight="400"
                lineHeight="110%"
                letterSpacing="0px"
              >
                Encuentra tu concesionario Toyota más cercano
              </Text>
              <Text
                className="concessionaire-search__subtitle"
                color="inherit"
                fontFamily="var(--font-roboto)"
                fontWeight="400"
                lineHeight="140%"
                letterSpacing="0.1px"
              >
                Selecciona tu ubicación para encontrar el concesionario más
                cercano.
              </Text>
            </View>
            <div className="concessionaire-search__select-container">
              {/* Dropdown 1: Cities */}
              <Select
                className="concessionaire-search_select"
                options={citiesOptions}
                onSelect={setLocation}
                placeholder="Selecciona tu ubicación"
                theme={SelectTheme.Dark}
                selectedOption={location}
                minHeight="3rem"
              />
              {/* Dropdown 2: Filtered Concessionaires/Offices */}
              <Select
                className="concessionaire-search_select"
                options={sortedConcessionairesOptions}
                onSelect={setSelectedConcessionaireOption}
                placeholder={
                  filteredConcessionairesOptions.length === 0 && location
                    ? "No hay concesionarios disponibles para esta ciudad"
                    : "Selecciona un Concesionario"
                }
                theme={SelectTheme.Dark}
                selectedOption={selectedConcessionaireOption}
                minHeight="3rem"
              />
              <Button
                type="button"
                color="white"
                minWidth={{ base: "10.9375rem", xl: "18.125rem" }}
                padding={{ base: ".5625rem", xl: "15px 121px" }}
                maxHeight={{ base: "48px", xl: "50px" }}
                className="concessionaire-search__button"
                onClick={handleSearch}
                disabled={!location || !selectedConcessionaireOption}
              >
                <Text
                  as="span"
                  lineHeight={"1.25rem"}
                  color={"inherit"}
                  fontFamily="var(--font-roboto)"
                  fontWeight={"500"}
                >
                  Buscar
                </Text>
              </Button>
            </div>
          </Grid>
        </Card>
      </View>
      {isOpen && (
        <ConcessionaireModal
          office={selectedOffice}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
export default ConcessionaireSearch;
