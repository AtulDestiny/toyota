import { Flex, Image, Text } from "@aws-amplify/ui-react";

export default function TgrFooterComponent() {
  return (
    <Flex
      className="tgr-footer"
      direction="column"
      alignItems="center"
      backgroundColor="black"
      color="white"
      padding="40px 20px"
      fontFamily="monospace"
      gap="30px"
    >
      <Flex direction="column" alignItems="center" gap="0">
        {/* <Image
          src="/images/TGR/decorations.png"
          alt="Toyota Gazoo Racing Colombia"
        /> */}
        <Text
          className="bg-image-before-toyoto"
          color="white"
          fontSize="1.5rem"
          lineHeight="130%"
        >
          Toyota
        </Text>
        <Text color="white" fontSize="1.5rem">
          Gazoo Racing Colombia
        </Text>
      </Flex>

      <Flex direction="row" justifyContent="center" gap="40px">
        <Image src="/images/TGR/youtube-icon.png" alt="YouTube" />
        <Image src="/images/TGR/x-icon.png" alt="X" />
        <Image src="/images/TGR/instagram-icon.png" alt="Instagram" />
      </Flex>
    </Flex>
  );
}
