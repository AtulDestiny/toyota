"use client";
import React from "react";
import {
  View,
  Text,
  Button,
  useBreakpointValue,
  Flex,
  Divider,
} from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

interface ThankYouModalTestDriveProps {
  onClose: () => void;
  onRedirect: () => void;
  isInStepper: boolean;
}

export const ThankYouModalTestDrive: React.FC<ThankYouModalTestDriveProps> = ({
  onClose,
  onRedirect,
  isInStepper = false,
}) => {
  const padding = useBreakpointValue({
    base: "1rem",
    medium: "2rem",
    xl: "0px",
  });

  const orderValue = useBreakpointValue({ base: 2, xl: 1 }) as
    | number
    | undefined;
  const orderValue2 = useBreakpointValue({ base: 1, xl: 2 }) as
    | number
    | undefined;

  const router = useRouter();

  return (
    <Flex
      backgroundColor="#000"
      color="#fff"
      padding={{ base: "0px 1rem", medium: "2rem", xl: "0px" }}
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap="0px"
      className="thank-you-modal"
    >
      {/* Top small label */}
      {/* Heading */}
      <Text
        fontSize={{ base: "32px", medium: "56px", xl: "56px" }}
        fontWeight="400"
        color="#ffffff"
        lineHeight={{ base: "110%", xl: "110%" }}
        letterSpacing={{ base: "", xl: "-1.12px" }}
        marginTop={{ base: "88px", xl: "190px" }}
        marginBottom={{ base: "24px", xl: "64px" }}
        fontFamily={{
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        }}
        maxWidth={{ base: "300px", medium: "", xl: "" }}
      >
        Gracias por diligenciar tus datos
      </Text>

      {/* Description */}
      <Flex
        direction={{ base: "column" }}
        gap={{ base: "1.625rem", xl: "2rem" }}
        alignItems={"center"}
        marginBottom={{ base: "", xl: "72px" }}
      >
        <Text
          fontSize={{ base: "1rem", medium: "22px", xl: "22px" }}
          color="#ffffff"
          maxWidth={{ base: "600px", xl: "760px", xxl: "760px" }}
          fontWeight={{ base: "400", xl: "400" }}
          whiteSpace="pre-line"
          textAlign={"center"}
        >
          Apreciamos tu tiempo y esfuerzo en brindarnosla información necesaria
          para poderte contactar.{" "}
        </Text>

        <Text as="span" fontWeight="bold" color="#ffffff" textAlign={"center"}>
          ¡Te contactaremos lo antes posible para confirmar tu reserva!
        </Text>
      </Flex>

      {/* Divider (optional if design has it) */}
      <View
        height="1px"
        width="100px"
        backgroundColor="#ffffff"
        opacity={0.2}
        marginBottom="2rem"
        minWidth={{ base: "", xl: "910px" }}
        maxWidth={{ base: "0px", xl: "", xxl: "" }}
      />

      {/* Buttons */}
      <Flex
        justifyContent={{
          base: "",
          medium: "center",
          large: "center",
          xl: "center",
        }}
        gap={{ base: "", xl: "147px" }}
        marginBottom={{ base: "", xl: "150px", xxl: "187px" }}
        direction={{ base: "column", medium: "column", xl: "row", xxl: "row" }}
        alignItems="center"
      >
        <Button
          backgroundColor={"transparent"}
          border={"none"}
          color="#ffffff"
          fontSize={{ base: "14px", xl: "14px" }}
          fontWeight="normal"
          fontFamily="var(--font-roboto)"
          marginBottom={{ base: "70px", medium: "", xl: "" }}
          onClick={() => {
            onClose();
            router.push("/");
          }}
          style={{
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
            textDecorationSkipInk: "none",
            textDecorationThickness: "auto",
            textUnderlineOffset: "auto",
            textUnderlinePosition: "from-font",
            order: orderValue,
          }}
        >
          Ir a la página principal
        </Button>

        <Button
          onClick={() => {
            onClose();
          }}
          backgroundColor="#e4002b"
          borderRadius="9999px"
          letterSpacing={{ base: "0.1px", xl: "0.1px" }}
          lineHeight={{ base: "", xl: "125%" }}
          color="#fff"
          fontSize={{ base: "14px", xl: "16px" }}
          fontWeight={{ base: "500px", xl: "500px" }}
          paddingLeft="2rem"
          paddingRight="2rem"
          minWidth={{ base: "162px", xl: "" }}
          maxHeight={{ base: "40px", xl: "190px" }}
          border={"none"}
          style={{
            fontFamily: "var(--font-roboto)",
            order: orderValue2,
          }}
        >
          Agendar otra prueba de ruta
        </Button>
      </Flex>
    </Flex>
  );
};
