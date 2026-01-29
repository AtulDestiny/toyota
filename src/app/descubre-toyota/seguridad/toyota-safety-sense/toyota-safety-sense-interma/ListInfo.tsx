import React from "react";
import { Flex, Text } from "@aws-amplify/ui-react";

interface BulletListInfoProps {
  items?: string[];
}

const defaultItems = [
  "Cuando el vehículo que precede tenga una forma irregular, por ejemplo: un tractor.",
  "Cuando la altura del vehículo que precede sea menor con respecto al ancho total, si tiene una caja o sobresale el parachoques trasero, por ejemplo: motos, bicicletas o vehículos ultra livianos.",
  "Si el vehículo que precede no tiene las luces traseras encendidas.",
  "Si la luz del sol u otra con mucha intensidad se refleja frente a tu auto.",
  "Cuando manejes de noche, al amanecer o entrando a un túnel sin las luces encendidas.",
  "Si el sistema detecta una intersección elevada, letrero o cartel publicitario frente a tu auto.",
];

const BulletListInfo: React.FC<BulletListInfoProps> = ({ items }) => {
  const lines = items || defaultItems;

  return (
    <Flex
      direction="column"
      padding={{ base: "1rem", medium: "2rem" }}
      maxWidth="800px"
      margin="0 auto"
      backgroundColor="white"
      fontFamily="sans-serif"
    >
      {lines.map((line, index) => {
        const isBullet = line.trim().startsWith("-");
        const text = isBullet ? line.trim().substring(1).trim() : line;

        return isBullet ? (
          <ul
            key={index}
            style={{ paddingLeft: "1rem", margin: 0, listStyleType: "disc" }}
          >
            <li>
              <Text
                fontSize={{ base: "0.9rem", medium: "1rem" }}
                lineHeight="1.5"
                fontFamily={"var(--font-ToyotaType-Regular)"}
              >
                {text}
              </Text>
            </li>
          </ul>
        ) : (
          <Text
            key={index}
            fontSize={{ base: "0.9rem", medium: "1rem" }}
            lineHeight="1.5"
            marginTop="1rem"
                            fontFamily={"var(--font-ToyotaType-Regular)"}
          >
            {text}
          </Text>
        );
      })}
    </Flex>
  );
};

export default BulletListInfo;
