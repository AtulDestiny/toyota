import { View, Text, Image } from "@aws-amplify/ui-react";

interface FeaturedInfoBlockProps {
  title: string;
  description: string;
  image: string;
  backgroundColor: string;
}

export function FeaturedInfoBlock({
  title,
  description,
  image,
  backgroundColor,
}: FeaturedInfoBlockProps) {
  return (
    <View backgroundColor={backgroundColor} padding="54px 15px">
      <Text
        fontSize="32px"
        fontWeight="400"
        fontFamily="var(--font-ToyotaDisplay)"
        lineHeight="130%"
        color="#ffffff"
        marginBottom="24px"
      >
        {title}
      </Text>
      <Text
        fontSize="16px"
        fontWeight="400"
        fontFamily="var(--font-ToyotaDisplay)"
        lineHeight="190%"
        color="#ffffff"
        marginBottom="40px"
      >
        {description}
      </Text>
      <Image src={image} alt={title} width="100%" height="auto" />
    </View>
  );
}
