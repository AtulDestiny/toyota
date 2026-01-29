import { View, Text, Image, Flex } from "@aws-amplify/ui-react";

interface ListItem {
  title: string;
  description?: string;
}

interface FeaturedHybridComponentProps {
  title: string;
  subtitle: string;
  image: string;
  list: ListItem[];
}

export function FeaturedHybridComponent({
  title,
  subtitle,
  image,
  list,
}: FeaturedHybridComponentProps) {
  return (
    <View
      backgroundImage={"linear-gradient(to bottom, #E7EDF1, #F4F7F9)"}
      width="100%"
      padding={{ base: "27px 15px", xl: "4rem 51px" }}
      display={"flex"}
      style={{ flexWrap: "wrap", justifyContent: "space-between" }}
    >
      <Flex
        width={{ base: "100%", xl: "40%" }}
        maxWidth={{ base: "100%", xl: "488px" }}
        direction="column"
        padding="0px"
        gap="10px"
      >
        <Text
          fontSize={{ base: "14px", xl: "3.5rem" }}
          fontWeight="400"
          fontFamily="var(--font-toyotaDisplay)"
          lineHeight="140%"
          color="#000000"
        >
          {title}
        </Text>
        <Text
          fontSize={{ base: "56px", xl: "3.5rem" }}
          fontWeight="400"
          fontFamily="var(--font-ToyotaType-Regular)"
          color="#000000"
          letterSpacing="-2%"
          lineHeight="110%"
          marginBottom="8px"
        >
          {subtitle}
        </Text>
        <Image
          src={image}
          alt={title}
          width="100%"
          height="auto"
          objectFit="cover"
          marginBottom="16px"
        />
      </Flex>
      <Flex
        width={{ base: "100%", xl: "60%" }}
        wrap={{ base: "", xl: "wrap" }}
        direction={{ base: "column", xl: "row" }}
        alignSelf="flex-start"
        padding="0px"
        gap="10px"
      >
        {list.map((item, index) => (
          <Flex
            key={index}
            className="list-item"
            backgroundImage={"linear-gradient(to bottom, #E7EDF1, #F4F7F9)"}
            padding={{ base: "15px", xl: "14px" }}
            height={{ base: "auto", xl: "max-content" }}
            maxWidth={{
              xl: "300px",
              xxl: "400px",
            }}
            minHeight={{ base: "auto", xl: "120px" }}
            width={{ base: "100%", xl: "50%" }}
            gap="49px"
          >
            <Text
              fontSize="18px"
              fontWeight="400"
              fontFamily="var(--font-ToyotaType-Regular)"
              color="#000000"
              lineHeight={{ base: "normal", xl: "" }}
              maxWidth={{ base: "100px", xl: "" }}
            >
              {item.title}
            </Text>
            <Text
              fontSize="14px"
              fontWeight="400"
              fontFamily="var(--font-toyotaDisplay)"
              color="#000000"
              maxWidth={{ base: "160px", xl: "" }}
              dangerouslySetInnerHTML={{ __html: item.description || "" }}
            />
          </Flex>
        ))}
      </Flex>
    </View>
  );
}
