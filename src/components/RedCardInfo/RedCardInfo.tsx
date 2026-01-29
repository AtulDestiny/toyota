import React from "react";
import { Card, Flex, Image, Text, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Base card props
interface RedCardBoxProps {
  title: string;
  leftIcon: string;
  rightIcon: string;
  iconAltLeft?: string;
  iconAltRight?: string;
  titleFontSize?: string | Record<string, string>;
  downloadUrl?: string;
  backgroundColor?: string;
}

// Accept either a single card or a wrapped list in `card`
interface RedCardInfoProps extends Partial<RedCardBoxProps> {
  card?: RedCardBoxProps[]; // Optional array of cards
}

const SingleCard = ({
  title = "Informe de Sostenibilidad",
  leftIcon = "/images/icons/reportVector.png",
  rightIcon = "/images/icons/right-arrow-Vector.png",
  iconAltLeft = "Car Check",
  iconAltRight = "Arrow",
  titleFontSize = "1.1rem",
  downloadUrl = "/images/pdf/Manual_del_buen_conductor_Toyota.pdf",
  backgroundColor
}: RedCardBoxProps) => (
  <a
    href={downloadUrl}
    download
    target="_blank"
    style={{ textDecoration: "none" }}
  >
    <Card
      width="fit-content"
      padding="1.5rem"
      backgroundColor={ backgroundColor ? backgroundColor : "#D50000"}
      borderRadius={{base:"" ,xl:"0.5rem"}}
      boxShadow="medium"
      color="white"
      maxWidth="290px"
      minHeight="235px"
      minWidth={{base:"235px" ,xl:""}}
      display="flex"
      style={{ flexDirection: "column", justifyContent: "space-between" }}
    >
      <Text
        fontSize={titleFontSize}
        fontWeight={400}
        lineHeight="1.5rem"
        color={backgroundColor == "#FFF" ?  "#000" : "#fff"}
        fontFamily="var(--font-ToyotaType-Regular)"
        dangerouslySetInnerHTML={{ __html: title }} />

      <Flex justifyContent="space-between" alignItems="end" marginTop="1rem">
        <Image src={leftIcon} alt={iconAltLeft} width="35px" height="46px" />
        <Image src={rightIcon} alt={iconAltRight} width="17px" height="29px" />
      </Flex>
    </Card>
  </a>
);

const RedCardInfo = (props: RedCardInfoProps) => {
  const { card, ...singleCardProps } = props;

  const cardsToRender: RedCardBoxProps[] = Array.isArray(card)
    ? card
    : [singleCardProps as RedCardBoxProps]; // fallback to single card

  return (
    <View backgroundColor="#E7EDF1" padding="2rem">
      <Flex wrap="wrap" justifyContent="center" alignItems="center" gap="0rem">
        {cardsToRender.map((c, index) => (
          <SingleCard key={index} {...c} />
        ))}
      </Flex>
    </View>
  );
};

export default RedCardInfo;
