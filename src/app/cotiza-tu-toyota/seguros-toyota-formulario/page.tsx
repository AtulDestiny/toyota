"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos para la página de SegurosToyotaFormulario
const pageData: ComponentData[] = [
  {
    component: "SeguraThankYouPage",
  },
];

export default function SegurosToyotaFormulario() {
  return (
    <div>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
