import React, { useState } from "react";
import type { StepperProps } from "../../types";
import styles from "./Stepper.module.scss";

export const Stepper: React.FC<StepperProps> = ({
  steps,
  onStepChange,
  onStepSendData,
  onStepRedirect,
  isSubmitting,
  isStepValid,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      onStepSendData(); // Submit form and redirect on final step
      return;
    }
    if (currentStep < steps.length - 1 && isStepValid[currentStep]) {
      setCurrentStep(currentStep + 1);
      onStepChange(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      onStepChange(currentStep - 1);
    }
  };

  return (
    <div className={styles.stepperContainer}>
      <div className={styles.stepIndicators}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.stepIndicator} ${index === currentStep ? styles.active : ""
              } ${index < currentStep ? styles.completed : ""}`}
          >
            <div className={styles.stepNumber}>{index + 1}</div>
            <div className={styles.stepTitle}>{step.title}</div>
          </div>
        ))}
      </div>

      <div className={styles.stepContent}>{steps[currentStep].content}</div>

      <div className={styles.stepperActions}>
        {currentStep > 0 && (
          <button className={styles.backButton} onClick={handleBack}>
            Atrás
          </button>
        )}
        <button
          className={styles.nextButton}
          onClick={handleNext}
          disabled={!isStepValid[currentStep]}
        >
          {isSubmitting
            ? "Cargando..."
            : currentStep === steps.length - 1
              ? "Finalizar"
              : currentStep === steps.length - 2
                ? "Siguiente"
                : "Siguiente"}
        </button>
      </div>
    </div>
  );
};
