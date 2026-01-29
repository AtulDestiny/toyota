import React from "react";
import { Flex, Text, View } from "@aws-amplify/ui-react";

type QuoteBlockProps = {
  quote?: string;
  author?: string;
  backgroundImage?: string;
};

export const QuoteBlockReconecta: React.FC<QuoteBlockProps> = ({
  quote,
  author,
  backgroundImage,
}) => {
  const defaultQuote =
    "“Estamos convencidos que si todos hacemos un aporte, en este caso un árbol más, lograremos disminuir la huella de carbono en el planeta. El Bosque Toyota representa nuestra filosofía de ir por más, por eso trabajamos en acciones que nos permiten ser actores positivos dentro del ecosistema ambiental de Colombia”";

  const defaultAuthor =
    "Edge Egashira, presidente de Automotores Toyota Colombia.";

  const defaultBackground = "/images/reconecta-04web-2025.png";

  return (
    <View
      backgroundImage={`url(${backgroundImage || defaultBackground})`}
      padding={{ base: "1rem", large: "2.0625rem 4.6875rem" }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      margin={{
        base: "60px 15px 30px",
        xl: "100px 195px 40px",
      }}
    >
      <Flex
        direction="column"
        alignItems={"center"}
        justifyContent="center"
        gap="2rem"
        padding={{ base: "1.25rem", large: "6.25rem 2rem" }}
        backgroundColor="white"
        boxShadow="medium"
        width={"max-content"}
        maxWidth="100%"
        margin="0 auto"
        textAlign="center"
      >
        <Text
          fontWeight="bold"
          fontSize={{ base: "1rem", small: "1rem", large: "1.375rem" }}
          color="#000"
          textAlign={{
            base: "left",
            xl: "center",
          }}
        >
          {author || defaultAuthor}
        </Text>
        <Text
          fontSize={{ base: "1rem", small: "1rem", large: "1.375rem" }}
          fontWeight="400"
          color="#000"
          whiteSpace="pre-line"
          lineHeight="1.6"
          fontStyle="normal"
          textAlign={{
            base: "left",
            xl: "center",
          }}
          maxWidth={"59ch"}
        >
          {quote || defaultQuote}
        </Text>
      </Flex>
    </View>
  );
};
