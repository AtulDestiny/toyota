import { Flex, Image, Text } from "@aws-amplify/ui-react";
import styles from "./SpecListItem.module.scss";

interface SpecListItemType {
  img: {
    alt: string;
    src: string;
  };
  title: string;
  description: string;
}

interface SpecListItemProps {
  item: SpecListItemType | SpecListItemType[];
  isLarge?: boolean;
}

export function SpecListItem({ item, isLarge: isLast }: SpecListItemProps) {
  const renderCard = (card: SpecListItemType, isLastCard: boolean = false) => (
    <Flex
      className={`${styles.card} ${isLastCard ? styles.lastCard : ""}`}
      key={card.title}
    >
      <Image
        textAlign={"center"}
        className={styles.icon}
        src={card.img.src}
        alt={card.img.alt}
        loading="lazy"
      />
      <Text
        textAlign={"center"}
        fontSize={{ base: "18px", xxl: "xxl" }}
        fontWeight="500"
        className={styles.title}
      >
        {card.title}
      </Text>
      <Text
        textAlign={"center"}
        fontSize={{ base: "12px", xxl: "large" }}
        fontFamily="var(--font-toyotaDisplay)"
        className={styles.description}
      >
        {card.description}
      </Text>
    </Flex>
  );

  if (Array.isArray(item)) {
    return (
      <>
        {item.map((card, idx) =>
          renderCard(card, isLast && idx === item.length - 1)
        )}
      </>
    );
  }
  return renderCard(item, isLast);
}
