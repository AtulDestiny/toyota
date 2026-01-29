import { View, Text } from "@aws-amplify/ui-react";

interface QuotesProps {
  backgroundImage: string;
  quote: string;
  author: string;
}

export function Quotes({ backgroundImage, quote, author }: QuotesProps) {
  return (
    <View
      backgroundImage={`url(${backgroundImage})`}
      style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      padding="15px"
    >
      <View backgroundColor="#ffffff" padding="20px">
        <Text
          fontSize="12px"
          fontWeight="400"
          fontFamily="var(--font-ToyotaType-Regular)"
          color="#000000"
          marginBottom="12px"
        >
          {quote}
        </Text>
        <Text
          fontSize="18px"
          fontWeight="400"
          fontFamily="var(--font-ToyotaType-Regular)"
          color="#000000"
        >
          {author}
        </Text>
      </View>
    </View>
  );
}
