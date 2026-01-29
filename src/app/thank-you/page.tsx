"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";
import { useRouter } from "next/navigation";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

export default function BlogPage() {
  const router = useRouter();
  // Datos para la página de Blog y Noticias
  const pageData: ComponentData[] = [
    // BlogHeader en lugar de MainSlider
    {
      component: "ThankYouModal",
    },
  ];

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
