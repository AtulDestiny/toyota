import React from "react";
import styles from "./ShippingConfirmation.module.scss";

export const ShippingConfirmation: React.FC = () => {
  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.icon}>✓</div>
      <h3 className={styles.title}>¡Gracias por tu interés!</h3>
      <p className={styles.message}>
        Hemos recibido tu información correctamente. Un asesor se pondrá en
        contacto contigo pronto.
      </p>
    </div>
  );
};
