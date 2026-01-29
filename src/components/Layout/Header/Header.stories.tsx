import React from "react";
import Header from "./Header";

// Meta información de la historia
export default {
  title: "Components/Header", // Ubicación en el Storybook
  component: Header,
} as const;

// Historia: Versión Desktop por defecto
export const Desktop = () => <Header />;

// Historia: Versión con Menú Compacto
export const CompactMenu = () => (
  <Header />
  // Aquí puedes modificar la lógica de `Header` si hay una versión compacta o agregar props.
);

// Historia: Versión con Menú Oscuro
export const DarkTheme = () => (
  <div style={{ backgroundColor: "black", padding: "10px" }}>
    <Header />
  </div>
);
