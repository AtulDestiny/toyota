"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos para la página de Concesionarios
const pageData: ComponentData[] = [
  {
    component: "ConcessionaireSearch",
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      imagePosition: "middle",
      viewstyle: {
        alignItems: "left",
      },
    },
  },
];

export default function ConcesionariosPage() {
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
