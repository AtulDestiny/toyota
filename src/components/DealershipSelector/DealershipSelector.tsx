"use client";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Flex,
  Heading,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import "./DealershipSelector.css";
import { Option, Select } from "@/components/Layout/Select/Select";
import Button from "../Layout/Button/Button";
import Modal from "../Layout/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { ConcessionaireModal } from "../ConcessionaireSearch/ConcessionaireModal";
import {
  CityInterface,
  OfficeInterface,
} from "@/app/cotizador/[slug]/CotizadorClient";

interface DealerSelection {
  cityId: string;
  cityName: string;
  cityExternalId: string | number;
  officeId: string;
  officeName: string;
  officeExternalId: string;
  timestamp: number;
}

// GraphQL Queries
const CITIES_QUERY = `
  query ListCities {
    listCities {
      items {
        id
        externalId
        name
      }
    }
  }
`;

const OFFICES_BY_CITY_QUERY = `
  query ListOfficesByCity($cityId: ID!) {
    listOffices(filter: { cityId: { eq: $cityId } }) {
      items {
        id
        idVitrina
        name
        address
        phone
        appointmentPhone
        email
        website
        latitude
        longitude
      }
    }
  }
`;

// Constants
const STORAGE_KEY = "toyota_dealer_selection";
const SELECTION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Custom hook for dealer selection
function useDealerSelection(
  selectedCity: CityInterface | null,
  setSelectedCity: (city: CityInterface | null) => void,
  selectedOffice: OfficeInterface | null,
  setSelectedOffice: (office: OfficeInterface | null) => void
) {
  // Fetch cities
  const { data: cities = [], isLoading: loadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!,
        },
        body: JSON.stringify({ query: CITIES_QUERY }),
      });
      const data = await response.json();
      return data?.data?.listCities?.items || [];
    },
  });

  // Fetch offices by city
  const { data: offices = [], isLoading: loadingOffices } = useQuery({
    queryKey: ["offices", selectedCity?.id],
    queryFn: async () => {
      if (!selectedCity?.id) return [];
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!,
        },
        body: JSON.stringify({
          query: OFFICES_BY_CITY_QUERY,
          variables: { cityId: selectedCity.id },
        }),
      });
      const data = await response.json();
      return data?.data?.listOffices?.items || [];
    },
    enabled: !!selectedCity?.id,
  });

  // Load stored selection on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const selection: DealerSelection = JSON.parse(stored);
      if (Date.now() - selection.timestamp < SELECTION_EXPIRY) {
        setSelectedCity({
          id: selection.cityId,
          name: selection.cityName,
          externalId: selection.cityExternalId,
        });
        setSelectedOffice({
          id: selection.officeId,
          name: selection.officeName,
          idVitrina: selection.officeExternalId,
        } as OfficeInterface);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    // Cleanup on unmount: clear selection
    return () => {
      localStorage.removeItem(STORAGE_KEY);
      setSelectedCity(null);
      setSelectedOffice(null);
    };
  }, [setSelectedCity, setSelectedOffice]);

  // Save selection to localStorage
  const saveSelection = (city: CityInterface, office: OfficeInterface) => {
    const selection: DealerSelection = {
      cityId: city.id,
      cityName: city.name,
      cityExternalId: city.externalId || "",
      officeId: office.id,
      officeName: office.name,
      officeExternalId: office.idVitrina || "",
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    setSelectedCity(city);
    setSelectedOffice(office);
  };

  return {
    cities,
    offices,
    loadingCities,
    loadingOffices,
    saveSelection,
  };
}

export enum SelectTheme {
  Dark = "dark",
  Light = "light",
  Transparent = "transparent",
}

const modalData = {
  title: "Mantenimiento Planeado",
  subtitle: "DISTOYOTA 150",
  description:
    "Descubre todos los servicios y facilidades que tenemos para ti, Av. Cra 70 # 102 - 02",
  locationUrl: "https://www.google.com/maps?q=Av.+Cra+70+%23+102+-+02",
  salesSchedules: [
    { day: "Lunes a Viernes", hours: "8 am a 6 pm" },
    { day: "Sábado", hours: "9 am a 6 pm" },
    { day: "Domingos", hours: "10 am a 4 pm" },
  ],
  maintenanceSchedules: [
    { day: "Lunes a Viernes", hours: "8 am a 6 pm" },
    { day: "Sábado", hours: "9 am a 6 pm" },
  ],
  contact: {
    phone: "(601) 6430505",
    appointmentPhone: "(601) 6430505 Opción 4 - 311 259 8958",
    email: "distoyota150@distoyota.com.co",
    website: "https://distoyota.com/",
  },
};

export interface DealershipSelectorProps {
  selectedCity: CityInterface | null;
  setSelectedCity: (city: CityInterface | null) => void;
  selectedOffice: OfficeInterface | null;
  setSelectedOffice: (office: OfficeInterface | null) => void;
}

export function DealershipSelector({
  selectedCity,
  setSelectedCity,
  selectedOffice,
  setSelectedOffice,
}: DealershipSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const isMobile = useBreakpointValue({ base: true, xl: false });

  const { cities, offices, loadingCities, loadingOffices, saveSelection } =
    useDealerSelection(
      selectedCity,
      setSelectedCity,
      selectedOffice,
      setSelectedOffice
    );

  function toggleModal() {
    setModal(!modal);
    document.body.style.overflow = modal ? "auto" : "hidden";
  }

  function toggleInfoModal() {
    setIsOpen(true);
  }

  function select(): void {
    if (selectedCity && selectedOffice) {
      saveSelection(selectedCity, selectedOffice);
      toggleModal();
    }
  }

  return (
    <>
      <Flex
        width={"100%"}
        backgroundColor={"#D42224"}
        padding={{ base: "0.56rem 0.94rem" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={{ base: "sticky" }}
        top={{ base: "3.4269rem", xl: "60px" }}
        left={{ base: "0" }}
        style={{ zIndex: "999999" }}
      >
        <Flex>
          <Text
            color={"#ffffff"}
            style={{ cursor: "pointer" }}
            onClick={toggleModal}
          >
            {selectedOffice?.name || "Selecciona un concesionario"}
          </Text>
        </Flex>

        {selectedOffice && (
          <>
            <Text
              fontSize={"0.875rem"}
              fontWeight={"500"}
              lineHeight={"1rem"}
              textDecoration={"underline"}
              color={"#ffffff"}
              style={{ cursor: "pointer" }}
              onClick={toggleInfoModal}
            >
              Información
            </Text>
          </>
        )}
      </Flex>

      {modal && (
        <Flex
          justifyContent={"center"}
          width={"100%"}
          minHeight={"100svh"}
          position={"fixed"}
          top={"0"}
          left={"0"}
          backgroundImage={{
            base: "url('/images/dealership-selector__background.png')",
            xl: "url('/images/dealership-selector__background--desktop.png')",
          }}
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left top",
            zIndex: 9999999,
          }}
        >
          <Flex
            direction={{ base: "column" }}
            justifyContent={"center"}
            gap={{ base: "1.61rem", xl: "2.31rem" }}
            padding={{
              base: "1.3781rem .9375rem 4.375rem",
              xl: "4.5rem 8.125rem",
            }}
            width={{ base: "min(100%, 23.4375rem)", xl: "100%" }}
          >
            <Image
              alignSelf={"flex-end"}
              src="/svgs/close-modal.svg"
              alt="Close icon"
              width={{ base: "0.82119rem", xl: "2.8125rem" }}
              style={{ cursor: "pointer" }}
              onClick={toggleModal}
            />

            <Flex
              direction={{ base: "column" }}
              gap={{ base: "2.25rem", xl: "3.94rem" }}
            >
              <Flex
                direction={{ base: "column" }}
                alignItems={"center"}
                gap={{ base: "0.5rem", xl: "0.88rem" }}
              >
                <Heading
                  level={2}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "",
                  }}
                  fontSize={{ base: "1.375rem", xl: "3.5rem" }}
                  fontWeight={{ base: "700", xl: "400" }}
                  lineHeight={{ base: "1.5rem", xl: "3.85rem" }}
                  letterSpacing={{ xl: "-0.07rem" }}
                  color={"#ffffff"}
                >
                  Concesionarios Toyota
                </Heading>
                <Heading
                  level={3}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "",
                  }}
                  fontSize={{ base: "0.75rem", xl: "1.375rem" }}
                  fontWeight={{ base: "400", xl: "400" }}
                  lineHeight={{ base: "1.0625rem", xl: "1.9375rem" }}
                  color={"#ffffff"}
                >
                  Elige el concesionario de tu preferencia:
                </Heading>
              </Flex>

              <Flex
                direction={"column"}
                width={{ xl: "27.75rem" }}
                maxWidth={{ base: "21.5625rem", xl: "unset" }}
                alignItems={{ xl: "center" }}
                alignSelf={{ medium: "center" }}
                gap={{ base: "2.25rem", xl: "2.56rem" }}
              >
                <Flex
                  direction={{ base: "column" }}
                  width={"100%"}
                  gap={{ base: "1.19rem" }}
                >
                  <View>
                    <Select
                      options={cities
                        .slice()
                        .sort((a: any, b: any) => a.name.localeCompare(b.name))
                        .map((city: any) => ({
                          value: city.id,
                          label: city.name,
                        }))}
                      onSelect={(selected) => {
                        const city = cities.find(
                          (c: any) => c.id === selected!.value
                        );
                        if (city) setSelectedCity(city);
                      }}
                      placeholder={selectedCity ? selectedCity.name : "Ciudad"}
                      theme={SelectTheme.Transparent}
                      value={
                        selectedCity
                          ? { value: selectedCity.id, label: selectedCity.name }
                          : undefined
                      }
                    />
                  </View>
                  <View>
                    <Select
                      options={offices
                        .slice()
                        .sort((a: any, b: any) => a.name.localeCompare(b.name))
                        .map((office: any) => ({
                          value: office.id,
                          label: office.name,
                        }))}
                      onSelect={(selected) => {
                        const office = offices.find(
                          (o: any) => o.id === selected!.value
                        );
                        if (office) setSelectedOffice(office);
                      }}
                      placeholder={
                        selectedOffice ? selectedOffice.name : "Concesionario"
                      }
                      theme={SelectTheme.Transparent}
                      value={
                        selectedOffice
                          ? {
                            value: selectedOffice.id,
                            label: selectedOffice.name,
                          }
                          : undefined
                      }
                    />
                  </View>
                </Flex>

                <Button
                  type="button"
                  color="white"
                  style={{
                    width: "100%",
                    maxWidth: "162px",
                    height: isMobile ? "2.5rem" : "3.125rem",
                    maxHeight: isMobile ? "2.5rem" : "3.125rem",
                    padding: "0",
                  }}
                  onClick={select}
                  disabled={!selectedCity || !selectedOffice}
                >
                  <Text
                    as="span"
                    lineHeight={"1.25rem"}
                    color={"inherit"}
                    fontWeight={"500"}
                  >
                    Aceptar
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}

      {infoModal && (
        <Flex
          position={"fixed"}
          right={"0"}
          left={"0"}
          top={"55px"}
          bottom={"0"}
          justifyContent={"center"}
          margin={"auto"}
          style={{
            zIndex: 10,
          }}
        >
          <Modal {...modalData} onClose={toggleInfoModal} />
        </Flex>
      )}

      {isOpen && selectedOffice && (
        <ConcessionaireModal
          office={{
            ...selectedOffice,
            cityId: selectedOffice.cityId ?? "",
            concessionaireId: selectedOffice.concessionaireId ?? "",
          }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
