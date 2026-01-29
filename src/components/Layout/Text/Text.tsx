import React from "react";
import { Text as AmplifyText } from "@aws-amplify/ui-react";

// Definir la interfaz para las configuraciones de estilo
interface TextConfig {
  color: string;
  fontSize: {
    base: string;
    xxl: string;
  };
}

// Definir los posibles tipos de texto en un enum
type TextType =
  | "Titulo Principal"
  | "Subtitulo"
  | "Titulo Card 1"
  | "Titulo Card 2"
  | "Titulo Card 3"
  | "Descriptivo Card"
  | "Legal"
  | "CTA Secundario"
  | "Titulo Apoyo"
  | "Texto Descriptivo";

// Definir las props del componente Text
interface TextProps extends React.PropsWithChildren {
  type: TextType;
}

// Crear el objeto de configuración
const textConfig: Record<TextType, TextConfig> = {
  "Titulo Principal": {
    color: "primary",
    fontSize: { base: "xl", xxl: "3xl" },
  },
  Subtitulo: {
    color: "red",
    fontSize: { base: "lg", xxl: "2xl" },
  },
  "Titulo Card 1": {
    color: "cardTitle1",
    fontSize: { base: "md", xxl: "lg" },
  },
  "Titulo Card 2": {
    color: "cardTitle2",
    fontSize: { base: "md", xxl: "lg" },
  },
  "Titulo Card 3": {
    color: "cardTitle3",
    fontSize: { base: "md", xxl: "lg" },
  },
  "Descriptivo Card": {
    color: "cardDescription",
    fontSize: { base: "sm", xxl: "xl" },
  },
  Legal: {
    color: "legalText",
    fontSize: { base: "sm", xxl: "sm" },
  },
  "CTA Secundario": {
    color: "ctaSecondary",
    fontSize: { base: "md", xxl: "lg" },
  },
  "Titulo Apoyo": {
    color: "supportTitle",
    fontSize: { base: "lg", xxl: "xl" },
  },
  "Texto Descriptivo": {
    color: "textDescription",
    fontSize: { base: "sm", xxl: "md" },
  },
};

const Text: React.FC<TextProps> = ({ type, children }) => {
  const config = textConfig[type];

  if (!config) {
    console.warn(
      `No se encontró la configuración para el tipo de texto: ${type}`
    );
    return <AmplifyText>{children}</AmplifyText>;
  }

  return (
    <AmplifyText color={config.color} fontSize={config.fontSize}>
      {children}
    </AmplifyText>
  );
};

export default Text;
