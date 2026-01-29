import React from "react";
import type { ModalProps } from "../../types";
import styles from "./Modal.module.scss";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <p className={styles.modalDescription}>{description}</p>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};
