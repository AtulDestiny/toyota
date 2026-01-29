import React, { useEffect, useState } from "react";
import type { ContactDetailsFormProps } from "../../types";
import styles from "./ContactDetailsForm.module.scss";

export const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  data,
  onChange,
  onValidate,
  onFocus,
}) => {
  
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  useEffect(() => {
    const isEmailValid = validateEmail(data.email.trim());
    const isPhoneValid = data.phone.trim().length >= 10;

    setEmailError(
      !isEmailValid && data.email ? "Ingrese un correo válido con @" : ""
    );
    setPhoneError(
      !isPhoneValid && data.phone ? "El número debe tener al menos 10 dígitos" : ""
    );

    onValidate(isEmailValid && isPhoneValid);
  }, [data.email, data.phone]); // Remove onValidate from dependencies



  return (
    <div className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Correo Electrónico*</label>
        <input
          type="email"
          id="email"
          placeholder="Correo Electrónico"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          onFocus={() => onFocus("email")}
        />
        {emailError && <span className={styles.error} style={{color:"red"}}>{emailError}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Celular*</label>
        <input
          type="tel"
          id="phone"
          placeholder="Celular"
          inputMode="numeric"
          value={data.phone}
          pattern="\d*"
          onChange={(e) => onChange({ phone: e.target.value.replace(/\D/g, "") })}
          onFocus={() => onFocus("phone")}
          maxLength={10}
        />
        {phoneError && <span className={styles.error} style={{color:"red"}}>{phoneError}</span>}

      </div>
    </div>
  );
};
