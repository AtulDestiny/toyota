import React, { useEffect, useState } from "react";
import type { FormProps } from "../../types";
import styles from "./DealerForm.module.scss";

// Estos datos deberían venir de una API o configuración
const CITIES = [
  { id: "BOG", name: "Bogotá" },
  { id: "MED", name: "Medellín" },
  { id: "CAL", name: "Cali" },
  { id: "BAR", name: "Barranquilla" },
  { id: "CAR", name: "Cartagena" },
  { id: "BUC", name: "Bucaramanga" },
  { id: "PER", name: "Pereira" },
  { id: "IBG", name: "Ibagué" },
];

const DEALERS = {
  BOG: [
    { id: "1", name: "Toyota Norte - Bogotá" },
    { id: "2", name: "Toyota Sur - Bogotá" },
    { id: "3", name: "Toyota Zona Rosa - Bogotá" },
  ],
  MED: [
    { id: "4", name: "Toyota Centro - Medellín" },
    { id: "5", name: "Toyota Poblado - Medellín" },
  ],
  CAL: [
    { id: "6", name: "Toyota Norte - Cali" },
    { id: "7", name: "Toyota Sur - Cali" },
  ],
  BAR: [{ id: "8", name: "Toyota Barranquilla" }],
  CAR: [{ id: "9", name: "Toyota Cartagena" }],
  BUC: [{ id: "10", name: "Toyota Bucaramanga" }],
  PER: [{ id: "11", name: "Toyota Pereira" }],
  IBG: [{ id: "12", name: "Toyota Ibagué" }],
};

export const DealerForm: React.FC<FormProps> = ({
  data,
  onChange,
  onValidate,
}) => {
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

  useEffect(() => {
    const isValid = data.city !== "" && data.dealer !== "";
    onValidate(isValid);
  }, [data.city, data.dealer]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="city">Ciudad*</label>
        <select
          id="city"
          value={data.city}
          onChange={(e) => {
            onChange({ city: e.target.value, dealer: "" });
          }}
        >
          <option value="">Seleccione una ciudad...</option>
          {[...CITIES]
            .sort((a, b) =>
              a.name.localeCompare(b.name, "es", { sensitivity: "base" })
            )
            .map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dealer">Concesionario*</label>
        <select
          id="dealer"
          value={data.dealer}
          onChange={(e) => onChange({ dealer: e.target.value })}
          disabled={!data.city}
        >
          <option value="">Seleccione un concesionario...</option>
          {[...availableDealers]
            .sort((a, b) =>
              a.name.localeCompare(b.name, "es", { sensitivity: "base" })
            )
            .map((dealer) => (
              <option key={dealer.id} value={dealer.id}>
                {dealer.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
