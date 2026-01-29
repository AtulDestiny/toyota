"use client";
import React from "react";
import { View, Text, Button, Flex, Divider } from "@aws-amplify/ui-react";

const ThankYouPage = () => {
  return (
    <Flex
      as="section"
      height="100vh"
      width="100%"
      backgroundColor="black"
      color="white"
      direction="column"
      justifyContent="center"
      alignItems="center"
      padding="1rem"
      textAlign="center"
    >
      <View marginBottom="1rem">
        <Text fontSize="small" color="white">
          Datos enviados
        </Text>
      </View>

      <View marginBottom="1.5rem">
        <Text
          as="h1"
          fontSize={{ base: "32px", xl: "56px" }}
          fontWeight="bold"
          color="white"
        >
          Gracias por diligenciar tus datos
        </Text>
      </View>

      <View marginBottom="2rem" maxWidth="600px">
        <Text fontSize={{ base: "18px", xl: "22px" }} color="white">
          Apreciamos tu tiempo y esfuerzo en brindarnos la información necesaria
          para poderte contactar.
          <br />
          <strong>¡Te contactaremos lo antes posible!</strong>
        </Text>
      </View>
      <Divider maxWidth={{ xl: "80%" }} />
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        gap={"30px"}
        width={{ xl: "100%" }}
      >
        <View marginTop="2rem">
          <Text fontSize="xs" color="white">
            Ir a la página principal
          </Text>
        </View>
        <View width="100%" maxWidth="300px">
          <Button
            variation="primary"
            backgroundColor="red.600"
            borderRadius="9999px"
            width="100%"
            color="white"
          >
            Cotizar otro vehículo
          </Button>
        </View>
      </Flex>
    </Flex>
  );
};

export default ThankYouPage;
