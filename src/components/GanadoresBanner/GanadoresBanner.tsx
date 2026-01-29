import { View, Image, Text, Button, Flex } from "@aws-amplify/ui-react";

interface GanadoresBannerProps {
  backgroundImage?: string;
  girlImage?: string;
  content?: {
    title: string;
    description: string;
  };
  button?: {
    label: string;
    link?: string;
  };
  termsText?: string;
  termsLink?: string;
}

export default function GanadoresBanner({
  backgroundImage,
  girlImage,
  content,
  button,
  termsText,
  termsLink,
}: GanadoresBannerProps) {
  return (
    <View
      position="relative"
      width="100%"
      height="auto"
      padding="4rem 1rem"
      backgroundColor="#F6F6F6"
      textAlign="center"
    >
      {/* Background image */}
      <View
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        style={{ zIndex: 0 }}
        marginBottom="40px"
      >
        <Image
          src={backgroundImage}
          alt="wave image"
          objectFit="cover"
          width="100%"
          height="auto"
        />
      </View>

      {/* Girl Image */}
      <Image
        src={girlImage}
        alt="girl"
        width={{ base: "180px", medium: "220px", xl: "280px" }}
        position="relative"
        style={{ zIndex: 1 }}
        margin="0 auto"
      />

      {/* Content Box */}
      <View
        backgroundColor="#D2E8F7"
        padding="1.5rem"
        borderRadius="12px"
        maxWidth="350px"
        margin="1rem auto 2rem"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        position="relative"
        style={{ zIndex: 1 }}
      >
        <Text as="h2" fontSize="1.25rem" fontWeight="700" color="#05264E">
          {content?.title}
        </Text>
        <Text marginTop="0.5rem" fontSize="0.95rem" color="#05264E">
          {content?.description}
        </Text>
      </View>

      {/* Buttons */}
      {button && (
        <Flex
          direction="column"
          alignItems="center"
          gap="0.75rem"
          position="relative"
          style={{ zIndex: 1 }}
        >
          <Button
            as="a"
            href={button?.link || "#"}
            variation="primary"
            borderRadius="50px"
            backgroundColor="#05264E"
            color="white"
            padding="0.75rem 1.5rem"
          >
            {button?.label}
          </Button>
          <Text
            as="a"
            href={termsLink || "#"}
            fontSize="0.85rem"
            textDecoration="underline"
            color="#05264E"
          >
            {termsText}
          </Text>
        </Flex>
      )}
    </View>
  );
}
