import React from "react";
import { Flex, Text, View } from "@aws-amplify/ui-react";

type QuoteBlockProps = {
  quote?: string;
  author?: string;
  backgroundImage?: string;
};

export const QuoteBlock: React.FC<QuoteBlockProps> = ({
  quote,
  author,
  backgroundImage,
}) => {
  const defaultQuote =
    "“Estamos convencidos que si todos hacemos un aporte, en este caso un árbol más, lograremos disminuir la huella de carbono en el planeta. El Bosque Toyota representa nuestra filosofía de ir por más, por eso trabajamos en acciones que nos permiten ser actores positivos dentro del ecosistema ambiental de Colombia”";

  const defaultAuthor =
    "Edge Egashira, presidente de Automotores Toyota Colombia.";

  const defaultBackground = "/images/quote-bg.png";

  return (
    <View
      backgroundImage={`url(${backgroundImage || defaultBackground})`}
      padding={{ base: "2rem 1rem", large: "4rem 2rem" }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      margin={{
        base: "60px 15px 60px",
        xl: "141px 195px 188px",
      }}
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        padding="2rem"
        backgroundColor="white"
        borderRadius="medium"
        boxShadow="medium"
        maxWidth="800px"
        margin="0 auto"
        textAlign="center"
      >
        <Text
          fontSize={{ base: "1rem", small: "1rem", large: "1.125rem" }}
          color="#333"
          lineHeight="1.6"
          fontStyle="italic"
          marginBottom="1rem"
          textAlign={{
            base: "left",
            xl: "center",
          }}
        >
          {quote || defaultQuote}
        </Text>
        <Text
          fontWeight="bold"
          fontSize={{ base: "1rem", small: "1rem", large: "1.125rem" }}
          color="#000"
          textAlign={{
            base: "left",
            xl: "center",
          }}
        >
          {author || defaultAuthor}
        </Text>
      </Flex>
    </View>
  );
};
