import { Flex, Text, Image, Link, Button } from "@aws-amplify/ui-react";

export default function BoutiqueTGRComponent() {
  return (
    <Flex
      direction="column"
      // alignItems={{ base: "left", large: "center" }}
      justifyContent="center"
      backgroundColor="black"
      color="white"
      fontFamily="monospace"
      padding={{ base: "50px 16px 30px", xl: "159px 16px 90px " }}
    >
      <Text
        fontSize={{ base: ".875rem", medium: "1.125rem" }}
        textAlign={{ base: "left", large: "center" }}
        color="white"
      >
        Marketplace Colombia
      </Text>
      <Text
        fontFamily="var(--font-decimaMonoProLt)"
        fontSize="56px"
        lineHeight="100%"
        fontWeight="400"
        color="#FFF"
        textAlign={{ base: "left", large: "center" }}
      >
        Boutique TGR
      </Text>
      <Flex
        alignItems={{ large: "center" }}
        direction="column"
        position="relative"
        paddingTop={{ base: "30px", large: "0" }}
        paddingRight={{ base: "50px", large: "0" }}
        marginTop={{ base: "30px", large: "0" }}
      >
        <Image
          src="/images/TGR/GR-tag.png"
          alt="TGR Hoodies"
          position={{ base: "absolute", large: "relative" }}
          right="0"
          top="0"
          width="100%"
          maxWidth={{ base: "80px", large: "283px" }}
          height={"auto"}
          margin={{
            xl: "56px 0 78px",
          }}
        />

        <Link href="/deportivos-tgr/marketplace?type=boutique-gazoo-racing">
          <Image
            src="/images/TGR/Hoddie.png"
            alt="TGR Hoodies"
            width="100%"
            maxWidth="573px"
            marginBottom={{
              base: "1rem",
              //  xl: "3.75rem" // temporarily hide
            }}
          />
        </Link>
      </Flex>
      {/* temporarily hide */}
      {/* <Link
        style={{
          textAlign: "center",
        }}
        href={"/servicios/posventa/marketplace?type=boutique&model=tgr"}
      >
        <Button
          alignItems={"center"}
          backgroundColor="#d42224"
          fontFamily="var(--font-roboto)"
          color="#FFF"
          fontWeight="500"
          fontSize={{ base: "14px", xl: "20px" }}
          lineHeight={"20px"}
          border={"none"}
          width={{ base: "222px", xl: "289px" }}
          height={{ xl: "50px" }}
          margin={"0 auto"}
        >
          Ir a la Boutique
        </Button>
      </Link> */}
    </Flex>
  );
}
