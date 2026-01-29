import React, { useEffect, useState } from "react";
import styles from "./DataForm.module.scss";

// Update FormProps interface in types.ts
interface FormProps {
  data: {
    firstName: string;
    lastName: string;
    typeDocument: string;
    numberDocument: string;
    city?: string;
    dealer?: string;
  };
  onChange: (data: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void;
  onFocus?: (field: string) => void;
  cities: Array<{ id: string; name: string; externalId: string }>;
  loadingCities: boolean;
  selectedCity: string;
  onCityChange: (value: string) => void;
  offices: Array<{ id: string; idVitrina: string; name: string }>;
  documentTypes: Array<{ value: string; label: string }>;
}

export const DataForm: React.FC<FormProps> = ({
  data,
  onChange,
  onValidate,
  onFocus,
  cities = [],
  loadingCities = false,
  selectedCity = "",
  onCityChange,
  offices = [],
  documentTypes = [],
}) => {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    typeDocument: "",
    numberDocument: "",
    city: "",
    dealer: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    typeDocument: false,
    numberDocument: false,
    city: false,
    dealer: false,
  });

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  useEffect(() => {
    const newErrors = {
      firstName: data.firstName.trim() ? "" : "El nombre es obligatorio.",
      lastName: data.lastName.trim() ? "" : "El apellido es obligatorio.",
      typeDocument: data.typeDocument ? "" : "Seleccione un tipo de documento.",
      numberDocument: data.numberDocument.trim()
        ? ""
        : "El número de documento es obligatorio.",
      city: selectedCity ? "" : "Seleccione una ciudad.",
      dealer: data.dealer ? "" : "Seleccione un concesionario.",
    };

    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((msg) => msg === "");
    onValidate(isValid);
  }, [
    data.firstName,
    data.lastName,
    data.typeDocument,
    data.numberDocument,
    selectedCity,
    data.dealer,
  ]);

  return (
    <div className={styles.formContainer}>
      {/* First Name field */}
      <div className={styles.formGroup}>
        <label htmlFor="firstName">Nombre*</label>
        <input
          type="text"
          id="firstName"
          placeholder="Nombre"
          value={data.firstName}
          onChange={(e) => {
            const value = e.target.value;
            // Only allow letters, spaces, and accented characters
            if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value)) {
              onChange({ firstName: value });
            }
          }}
          onFocus={() => onFocus && onFocus("firstName")}
          onBlur={() => handleBlur("firstName")}
        />
        <span className={styles.error}>
          {touched.firstName ? errors.firstName : ""}
        </span>
      </div>

      {/* Last Name field */}
      <div className={styles.formGroup}>
        <label htmlFor="lastName">Apellido*</label>
        <input
          type="text"
          id="lastName"
          placeholder="Apellido"
          value={data.lastName}
          onChange={(e) => {
            const value = e.target.value;
            // Only allow letters, spaces, and accented characters
            if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value)) {
              onChange({ lastName: value });
            }
          }}
          onFocus={() => onFocus && onFocus("lastName")}
          onBlur={() => handleBlur("lastName")}
        />
        <span className={styles.error}>
          {touched.lastName ? errors.lastName : ""}
        </span>
      </div>

      {/* Document Type field */}
      <div className={styles.formGroup}>
        <label htmlFor="typeDocument">Tipo de Documento*</label>
        <select
          id="typeDocument"
          value={data.typeDocument}
          onChange={(e) => onChange({ typeDocument: e.target.value })}
          onFocus={() => onFocus && onFocus("typeDocument")}
          onBlur={() => handleBlur("typeDocument")}
        >
          <option value="">Seleccione tipo de documento</option>
          {documentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <span className={styles.error}>
          {touched.typeDocument ? errors.typeDocument : ""}
        </span>
      </div>

      {/* Document Number field - moved up */}
      <div className={styles.formGroup}>
        <label htmlFor="numberDocument">Número de Documento*</label>
        <input
          type="text"
          id="numberDocument"
          placeholder="Número de Documento"
          value={data.numberDocument}
          onChange={(e) => {
            const value = e.target.value;
            // Only allow numbers for document number
            if (/^\d*$/.test(value)) {
              onChange({ numberDocument: value });
            }
          }}
          onFocus={() => onFocus && onFocus("numberDocument")}
          onBlur={() => handleBlur("numberDocument")}
        />
        <span className={styles.error}>
          {touched.numberDocument ? errors.numberDocument : ""}
        </span>
      </div>

      {/* City field - moved down */}
      <div className={styles.formGroup}>
        <label htmlFor="city">Ciudad*</label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => {
            onCityChange(e.target.value);
            onChange({ city: e.target.value });
          }}
          onFocus={() => onFocus && onFocus("city")}
          onBlur={() => handleBlur("city")}
          disabled={loadingCities}
        >
          <option value="">Seleccione una ciudad</option>
          {loadingCities ? (
            <option disabled>Cargando ciudades...</option>
          ) : (
            [...cities]
              .sort((a, b) =>
                a.name.localeCompare(b.name, "es", { sensitivity: "base" })
              )
              .map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))
          )}
        </select>
        <span className={styles.error}>{touched.city ? errors.city : ""}</span>
      </div>

      {/* Dealer field */}
      <div className={styles.formGroup}>
        <label htmlFor="dealer">Concesionario*</label>
        <select
          id="dealer"
          value={data.dealer || ""}
          onChange={(e) => onChange({ dealer: e.target.value })}
          onFocus={() => onFocus && onFocus("dealer")}
          onBlur={() => handleBlur("dealer")}
          disabled={!selectedCity}
        >
          <option value="">Seleccione un concesionario</option>
          {[...offices]
            .sort((a, b) =>
              a.name.localeCompare(b.name, "es", { sensitivity: "base" })
            )
            .map((office) => (
              <option key={office.id} value={office.idVitrina}>
                {office.name}
              </option>
            ))}
        </select>
        <span className={styles.error}>
          {touched.dealer ? errors.dealer : ""}
        </span>
      </div>
    </div>
  );
};
