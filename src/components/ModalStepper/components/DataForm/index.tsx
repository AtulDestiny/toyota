import React, { useEffect, useState } from "react";
import type { DataFormProps } from "../../types";
import styles from "./DataForm.module.scss";

export const DataForm: React.FC<DataFormProps> = ({
  data,
  onChange,
  onValidate,
  onFocus,
}) => {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    typeDocument: "",
    numberDocument: "",
    numberempresa: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    typeDocument: false,
    numberDocument: false,
    numberempresa: false,
  });

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };
  useEffect(() => {
    const isValid =
      data.firstName.trim() !== "" &&
      data.lastName.trim() !== "" &&
      data.typeDocument !== "" &&
      data.numberDocument.trim() !== "";
    onValidate(isValid);
  }, [data.firstName, data.lastName, data.typeDocument, data.numberDocument]); // Remove onValidate from dependencies

  useEffect(() => {
    const newErrors = {
      firstName: data.firstName.trim() ? "" : "El nombre es obligatorio.",
      lastName: data.lastName.trim() ? "" : "El apellido es obligatorio.",
      typeDocument: data.typeDocument ? "" : "Seleccione un tipo de documento.",
      numberDocument: data.numberDocument.trim()
        ? ""
        : "El número de documento es obligatorio.",
      numberempresa: "",
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((msg) => msg === "");
    onValidate(isValid);
  }, [
    data.firstName,
    data.lastName,
    data.typeDocument,
    data.numberDocument,
    data.numberempresa,
  ]); // Specific dependencies
  return (
    <div className={styles.formContainer}>
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
          onFocus={() => onFocus("firstName")}
          onBlur={() => handleBlur("firstName")}
        />
        <span className={styles.error}>
          {touched.firstName ? errors.firstName : ""}
        </span>
      </div>

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
          onFocus={() => onFocus("lastName")}
          onBlur={() => handleBlur("lastName")}
        />
        <span className={styles.error}>
          {touched.lastName ? errors.lastName : ""}
        </span>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="typeDocument">Tipo de Documento*</label>
        <select
          id="typeDocument"
          value={data.typeDocument}
          onChange={(e) => onChange({ typeDocument: e.target.value })}
          onFocus={() => onFocus("typeDocument")}
          onBlur={() => handleBlur("typeDocument")}
        >
          <option value="">Seleccione...</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="NIT">NIT</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="PA">Pasaporte</option>
        </select>
        <span className={styles.error}>
          {touched.typeDocument ? errors.typeDocument : ""}
        </span>
      </div>

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
          onFocus={() => onFocus("numberDocument")}
          onBlur={() => handleBlur("numberDocument")}
        />
        <span className={styles.error}>
          {touched.numberDocument ? errors.numberDocument : ""}
        </span>
      </div>
      {
        data.typeDocument === "NIT" ? (
          <div className={styles.formGroup}>
            <label htmlFor="numberempresa">Nombre de la empresa*</label>
            <input
              type="text"
              id="numberempresa"
              placeholder="Nombre de la empresa"
              value={data.numberempresa}
              onChange={(e) => {
                const value = e.target.value;
                onChange({ numberempresa: value });
              }}
              onFocus={() => onFocus("numberempresa")}
              onBlur={() => handleBlur("numberempresa")}
            />
            <span className={styles.error}>
              {touched.numberempresa ? errors.numberempresa : ""}
            </span>
          </div>
        ) : null
      }
    </div>
  );
};
