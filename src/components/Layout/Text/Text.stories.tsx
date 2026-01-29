import React from "react";
import Text from "./Text";

// Meta información de la historia
export default {
  title: "Components/Text",
  component: Text,
} as const;

// Historia por defecto: Titulo Principal
export const TituloPrincipal = () => (
  <Text type="Titulo Principal">Este es el Título Principal</Text>
);

// Historia: Subtitulo
export const Subtitulo = () => (
  <Text type="Subtitulo">Este es un Subtítulo</Text>
);

// Historia: Titulo Card 1
export const TituloCard1 = () => (
  <Text type="Titulo Card 1">Este es el Título del Card 1</Text>
);

// Historia: Texto Descriptivo
export const TextoDescriptivo = () => (
  <Text type="Texto Descriptivo">Este es un texto descriptivo</Text>
);
