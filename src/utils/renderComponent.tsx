/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import components from "@/components";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

export default function renderComponent(
  componentData: ComponentData
): React.ReactNode {
  const { component, props = {}, children } = componentData;

  // Obtener el componente desde el mapeo
  const Component = components[component as keyof typeof components];

  if (!Component) {
    console.error(`Componente "${component}" no encontrado.`);
    return null;
  }

  // Si hay children, renderízalos recursivamente
  const renderedChildren = children
    ? children.map((child, index) => {
        if (typeof child === "string") {
          return child; // Si es un string, devolverlo directamente
        }
        return (
          <React.Fragment key={index}>{renderComponent(child)}</React.Fragment>
        );
      })
    : null;
  // Renderizar el componente con sus props y children
  return (
    <Component {...(props as unknown as any)}>{renderedChildren}</Component>
  );
}
