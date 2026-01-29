import React from "react";
import { Flex, Text, Image, ViewProps } from "@aws-amplify/ui-react";

interface CardData {
  image: string;
  title: string;
  price: string;
  subText?: string;
}

interface TwoCardProps {
  cards?: CardData[];
  viewStyle?: Pick<ViewProps, "margin" | "padding" | "maxWidth">;
}

const defaultCards: CardData[] = [
  {
    image: "/images/servicios-conectados/planes/grantisCard.png",
    title: "SEGURIDAD CONECTADA",
    price: "GRATIS",
  },
  {
    image: "/images/servicios-conectados/planes/connectado.png",
    title: "SIEMPRE CONECTADO",
    price: "$150.000/MES",
    subText: "Bonificado por 12 meses",
  },
];

const TwoCard: React.FC<TwoCardProps> = ({
  cards = defaultCards,
  viewStyle,
}) => {
  return (
    <Flex
      wrap="wrap"
      padding={{ base: "0 10.7px", medium: "0" }}
      justifyContent="center"
      gap={{ base: "1rem", medium: "1.3125rem" }}
      {...viewStyle}
    >
      {cards.map((card, idx) => (
        <Flex
          key={idx}
          direction="column"
          borderRadius="1rem"
          gap={0}
          overflow="hidden"
          backgroundColor="white"
          boxShadow="0px 4px 15px 0px #0000001A"
          width={{ base: "100%", small: "45%", large: "445px" }}
        >
          <Flex
            color="#fff"
            alignItems="center"
            justifyContent="center"
            gap="0.5rem"
            minHeight="120px"
          >
            <Image src={card.image} alt="image" />
          </Flex>
          {card.subText && card.price && (
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              padding={{ base: "1.5rem 1rem", large: "40px  40px 48px" }}
              textAlign="center"
              gap="0.25rem"
              minHeight={{ base: "118px", large: "163px" }}
            >
              <Text
                fontSize={{ base: "22px", large: "22px" }}
                fontWeight="bold"
              >
                {card.price}
              </Text>

              <Text fontSize={{ base: "0.75rem", large: "14px" }} color="#555">
                {card.subText}
              </Text>
            </Flex>
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default TwoCard;
