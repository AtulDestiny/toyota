"use client";

import { Flex, Text, Button, Divider, Link } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

export default function thankYou() {
  const router = useRouter();
  return (
    <Flex
      height="80vh"
      width="100%"
      backgroundColor="black"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        direction="column"
        alignItems="center"
        maxWidth="700px"
        padding="1rem"
        color="white"
        textAlign="center"
      >
        <Text
          fontSize="0.9rem"
          color="#FFF"
          fontWeight="400"
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
        >
          Datos enviados
        </Text>

        <Text
          fontSize="2.5rem"
          color="#FFF"
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
        >
          Gracias por diligenciar tus datos
        </Text>

        <Text
          fontSize="1rem"
          marginTop="1.5rem"
          lineHeight="1.6"
          color="#FFF"
          textAlign="center"
        >
          Apreciamos tu tiempo y esfuerzo en brindarnos la información necesaria
          para poderte contactar.
          <Text
            as="span"
            fontWeight="700"
            display={{ base: "block", medium: "inline" }}
            marginTop={{ base: "1rem", medium: "0" }}
            color="#FFF"
          >
            {" "}
            <strong>¡Te contactaremos lo antes posible!</strong>
          </Text>
        </Text>

        <Divider
          marginTop="2rem"
          borderColor="rgba(255,255,255,0.2)"
          display={{ base: "none", xl: "inline" }}
        />

        <Flex
          direction={{ base: "column", xl: "row-reverse" }}
          alignItems="center"
          gap="1rem"
          marginTop="2rem"
        >
          {/* Primary red button */}
          <Button
            backgroundColor="#E53935"
            color="white"
            borderRadius="999px"
            padding="0.75rem 2rem"
            fontWeight="bold"
            onClick={() =>
              (window.location.href =
                "/descubre-toyota/toyota-sostensible/a-ambiental/reconecta")
            }
            order={{ base: 0, xl: 1 }} // 🔝 top on mobile, second on desktop
          >
            Volver a ReConecta
          </Button>
          {/*  Link-style button  */}
          <Button
            variation="link"
            color="#ffffff"
            padding="0.75rem 2rem"
            fontSize={{ base: "14px", medium: "14px" }}
            fontWeight="normal"
            fontFamily="var(--font-roboto)"
            onClick={() => router.push("/")}
            style={{
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textDecorationSkipInk: "none",
              textDecorationThickness: "auto",
              textUnderlineOffset: "auto",
              textUnderlinePosition: "from-font",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
            order={{ base: 1, xl: 0 }} // 🔝 top on mobile, second on desktop
          >
            Ir a la página principal
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
