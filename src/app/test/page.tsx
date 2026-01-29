"use client";

import { useState } from "react";
import { ModalStepperCopy } from "@/components/ModalStepper";
import { Button } from "@aws-amplify/ui-react";

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRedirect = () => {
    console.log("Redirecting...");
    setIsOpen(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal Stepper</Button>

      <ModalStepperCopy
        isOpen={isOpen}
        onClose={handleClose}
        onRedirect={handleRedirect}
        model="Corolla Cross"
        version="1.8 XEi CVT"
        amplifyConfig={
          {
            // Aquí iría la configuración de Amplify si la necesitas
          }
        }
      />
    </div>
  );
}
