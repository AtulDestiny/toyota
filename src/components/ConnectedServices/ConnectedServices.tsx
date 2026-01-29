import { Flex, Image, Text, View } from "@aws-amplify/ui-react";

const ConnectedServices = () => {
  return (
    <View padding="0" width="100%">
      <Flex
        direction={{ base: "column", xl: "row" }}
        gap="0"
        alignItems="center"
        justifyContent="center"
        width="100%"
        backgroundColor="#F5F8FA"
        style={{
          background:
            "linear-gradient(178.06deg, #E7EDF1 52.85%, #F4F7F9 98.36%)",
        }}
        maxWidth={{
          base: "100%",
          xl: "1530px",
        }}
        margin={{
          base: "auto",
          xl: "0 auto",
        }}
      >
        <View width={{ base: "100%", xl: "50.138%" }}>
          <Image
            src="/images/servicios-conectados/toyota-app/app_Toyota.jpg"
            alt="Seguro Conectado"
            width="100%"
            height={{
              base: "100%",
              xl: "372px",
            }}
            objectFit="cover"
          />
        </View>

        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          width={{ base: "100%", xl: "49.862%" }}
          padding={{ base: "2rem", xl: "70px 90px 79px 90px" }}
          gap="1rem"
        >
          <Text
            fontFamily="var(--font-toyotaDisplay)"
            fontSize={{ base: "1rem", xl: "2rem" }}
            color="#000"
          >
            Descárgala ya desde tu tienda de aplicaciones y disfruta sus beneficios en cualquier parte del país.
          </Text>

          <Flex gap="0.5rem" marginTop="1rem">
            <a
              href="https://play.google.com/store/apps/details?id=com.toyotaargentina.oneapp&fbclid=PAQ0xDSwLt3JxleHRuA2FlbQIxMAABpwMXXP5iOlNope7HGfsk2iaSpCWRTUHc28oSmCBcEmO4XME4aXTOwtgIc0Dj_aem_jVkMAXHKG7Bqqy0wxTIB7Q"
              target="_blank"
              rel="noopener noreferrer"
            >
            <Image
              src="/images/icons/goggle-play-store.png"
              alt="Download on Google Play"
              width={{ base: "111px", xl: "180px" }}
              height={{ base: "37px", xl: "60px" }}
              objectFit="contain"
            />
            </a>
            <a
              href="https://apps.apple.com/co/app/toyota-latam/id1597365457"
              target="_blank"
              rel="noopener noreferrer"
            >
            <Image
              src="/images/icons/apple-playstore.png"
              alt="Download on App Store"
              width={{ base: "111px", xl: "180px" }}
              height={{ base: "37px", xl: "60px" }}
              objectFit="contain"
            />
            </a>
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
};

export default ConnectedServices;
