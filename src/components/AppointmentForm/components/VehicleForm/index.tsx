import React, { useEffect, useState } from "react";
import type { FormProps } from "../../types";
import styles from "./VehicleForm.module.scss";

export const VehicleForm: React.FC<FormProps & { vin?: string }> = ({
  data,
  onChange,
  onValidate,
  vin,
}) => {
  const [errors, setErrors] = useState({
    message: "",
    termsAccepted: "",
    dataAuthorized: "",
  });

  useEffect(() => {
    // All required fields must be filled
    const isValid = 
      data.message !== "" && 
      data.termsAccepted === "true" && 
      data.dataAuthorized === "true";
    
    const newErrors = {
      message: data.message ? "" : "El mensaje es obligatorio.",
      termsAccepted: data.termsAccepted === "true" ? "" : "Debe aceptar los términos y condiciones.",
      dataAuthorized: data.dataAuthorized === "true" ? "" : "Debe autorizar el tratamiento de sus datos.",
    };

    setErrors(newErrors);
    onValidate(isValid);
  }, [data.message, data.termsAccepted, data.dataAuthorized]);

  // Solo establecer el valor por defecto si el textarea está vacío
  useEffect(() => {
    if (vin && (!data.message || data.message === "")) {
      onChange({
        message: `Deseo agendar visita - Campaña especial de servicio para el VIN ${vin}`,
      });
    }
    // eslint-disable-next-line
  }, [vin]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="message">Escribe tu Mensaje*</label>
        <textarea
          id="message"
          placeholder="Escribe tu mensaje aquí..."
          value={data.message || ""}
          onChange={(e) => onChange({ message: e.target.value })}
          rows={4}
          className={styles.textarea}
        />
        <span className={styles.error}>{errors.message}</span>
      </div>

      <div className={styles.checkboxContainer}>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={data.termsAccepted === "true"}
              onChange={(e) => onChange({ termsAccepted: e.target.checked ? "true" : "false" })}
            />
            <span className={styles.checkboxText}>Acepto los Términos y condiciones</span>
          </label>
          <span className={styles.error}>{errors.termsAccepted}</span>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={data.dataAuthorized === "true"}
              onChange={(e) => onChange({ dataAuthorized: e.target.checked ? "true" : "false" })}
            />
            <span className={styles.checkboxText}>Autorizo el Tratamiento de mis datos</span>
          </label>
          <span className={styles.error}>{errors.dataAuthorized}</span>
        </div>
      </div>
    </div>
  );
};
