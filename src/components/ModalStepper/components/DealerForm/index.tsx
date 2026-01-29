"use client";
import React, { useEffect, useState } from "react";
import type { DealerFormProps } from "../../types";
import styles from "./DealerForm.module.scss";
import { useQuery } from "@tanstack/react-query";
import { Select } from "@/components/Layout/Select/Select";

// Types
interface City {
  id: string;
  externalId?: string;
  name: string;
}

interface Office {
  id: string;
  idVitrina?: string;
  name: string;
  address: string;
  phone: string;
  appointmentPhone?: string;
  email?: string;
  website?: string;
  latitude?: string;
  longitude?: string;
}

interface DealerSelection {
  cityId: string;
  cityName: string;
  cityExternalId: string;
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
function useDealerSelection() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);

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
        } as Office);
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
  }, []);

  // Save selection to localStorage
  const saveSelection = (city: City, office: Office) => {
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
    selectedCity,
    selectedOffice,
    setSelectedCity,
    setSelectedOffice,
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

// Estos datos deberían venir de una API o configuración
const CITIES = [
  { id: "BOG", name: "Bogotá" },
  { id: "MED", name: "Medellín" },
  { id: "CAL", name: "Cali" },
  // Agregar más ciudades según sea necesario
];

const DEALERS = {
  BOG: [
    { id: "1", name: "Concesionario Bogotá Norte" },
    { id: "2", name: "Concesionario Bogotá Sur" },
  ],
  MED: [
    { id: "3", name: "Concesionario Medellín Centro" },
    { id: "4", name: "Concesionario Medellín Este" },
  ],
  CAL: [
    { id: "5", name: "Concesionario Cali Norte" },
    { id: "6", name: "Concesionario Cali Sur" },
  ],
  // Agregar más concesionarios según sea necesario
};

export const DealerForm: React.FC<DealerFormProps> = ({
  data,
  onChange,
  onValidate,
}) => {
  const {
    cities,
    offices,
    loadingCities,
    loadingOffices,
    selectedCity,
    selectedOffice,
    setSelectedCity,
    setSelectedOffice,
    saveSelection,
  } = useDealerSelection();

  const [availableDealers, setAvailableDealers] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    if (data.city) {
      setAvailableDealers(DEALERS[data.city as keyof typeof DEALERS] || []);
    } else {
      setAvailableDealers([]);
    }
  }, [data.city]);

  const validOffices = offices.filter((office: any) => !!office.idVitrina);

  useEffect(() => {
    const isValid = data.city !== "" && data.dealer !== "";
    onValidate(isValid);
  }, [data.city, data.dealer]); // Remove onValidate from dependencies

  return (
    <div className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="city">Ciudad*</label>
        <Select
          options={[...cities]
            .sort((a, b) =>
              a.name.localeCompare(b.name, "es", { sensitivity: "base" })
            )
            .map((city: any) => ({
              value: city.externalId,
              label: city.name,
            }))}
          onSelect={(selected) => {
            const city = cities.find((c: any) => c.externalId === selected!.value);
            if (city) {
              setSelectedCity(city);

              onChange({
                city: city.externalId,
              });
            }
          }}
          placeholder={selectedCity ? selectedCity.name : "Ciudad"}
          theme={SelectTheme.Light}
          value={
            selectedCity
              ? { value: selectedCity.id, label: selectedCity.name }
              : undefined
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dealer">Concesionario*</label>
        <Select
          options={[...validOffices]
            .sort((a, b) =>
              a.name.localeCompare(b.name, "es", { sensitivity: "base" })
            )
            .map((office: any) => ({
              value: office.idVitrina,
              label: office.name,
            }))}
          onSelect={(selected) => {
            const office = offices.find((o: any) => o.idVitrina === selected!.value);
            if (office) {
              setSelectedOffice(office);

              onChange({
                dealer: office.idVitrina,
              });
            }
          }}
          placeholder={selectedOffice ? selectedOffice.name : "Concesionario"}
          theme={SelectTheme.Light}
          value={
            selectedOffice
              ? {
                value: selectedOffice.id,
                label: selectedOffice.name,
              }
              : undefined
          }
        />
      </div>
    </div>
  );
};
