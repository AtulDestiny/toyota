"use client";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  useBreakpointValue,
  Flex,
  Divider,
} from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

interface EligibleVehicleModalProps {
  onClose: () => void;
  onRedirect: () => void;
  isInStepper?: boolean;
}

export const EligibleVehicleModal: React.FC<EligibleVehicleModalProps> = ({
  onClose,
  onRedirect,
  isInStepper = false,
}) => {
  const padding = useBreakpointValue({
    base: "1rem",
    medium: "2rem",
    xl: "0px",
  });
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const orderValue = useBreakpointValue({ base: 2, xl: 1 }) as
    | number
    | undefined;
  const orderValue2 = useBreakpointValue({ base: 1, xl: 2 }) as
    | number
    | undefined;

  const router = useRouter();

  // Manage Scroll For Models
  useEffect(() => {
    // Lock scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <Flex
      left="0"
      width="100vw"
      height="100vh"
      backgroundColor="rgba(0,0,0,0.5)" // semi-transparent backdrop
      justifyContent="center"
      alignItems="center"
      position="fixed"
      overflow="auto"
      style={{
        zIndex: 9999999,
      }}
      top="0"
    >
      <Flex
        backgroundColor="#000"
        color="#fff"
        padding={{ base: "0px 1rem", medium: "2rem", xl: "0px" }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap="0px"
        className="eligible-vehicle-modal"
        left={{ base: "0", medium: "", large: "", xl: "" }}
        top={{ base: "50px", medium: "", large: "", xl: "" }}
        position={{
          base: "fixed",
          medium: "absolute",
          large: "absolute",
          xl: "absolute",
        }}
        height={{ base: "100vh", medium: "auto", large: "auto", xl: "auto" }}
        style={{
          zIndex: 9999999,
        }}
        maxWidth={{
          base: "100%",
          medium: "90%",
          large: "93%",
          xl: "80%",
          xxl: "80%",
        }}
        minWidth={{
          base: "100%",
          medium: "90%",
          large: "93%",
          xl: "80%",
          xxl: "80%",
        }}
      >
        <Flex
          position="absolute"
          top={{ base: "20px", xl: "40px" }}
          right={{ base: "20px", xl: "40px" }}
        >
          <img
            src="/images/modal-close.png"
            alt="close"
            width="45"
            height="45"
            style={{ cursor: "Pointer" }}
            onClick={onClose}
          />
        </Flex>

        <Flex
          marginTop={{ base: "88px", xl: "190px" }}
          marginBottom={{ base: "30px", xl: "24px" }}
        >
          <img
            src="/images/eligible-model-icon.png"
            alt="success-icon"
            width="60"
            height="60"
            style={{ objectFit: "contain" }}
          />
        </Flex>

        {/* Heading */}
        <Text
          fontSize={{ base: "22px", medium: "32px", xl: "32px" }}
          fontWeight="400"
          color="#ffffff"
          lineHeight={{ base: "110%", xl: "130%" }}
          letterSpacing={{ base: "0px", xl: "0px" }}
          maxWidth={{ base: "260px", medium: "60%", large: "60%", xl: "500px" }}
          marginBottom={{ base: "24px", xl: "24px" }}
          whiteSpace="pre-line"
          fontFamily={{
            base: "var(--font-ToyotaType-Regular)",
            xl: "var(--font-toyotaDisplay)",
          }}
        >
          A tu vehículo podría aplicarle la cobertura extendida T10
        </Text>

        {/* Description */}
        <Text
          fontSize={{ base: "12px", medium: "18px", xl: "18px" }}
          color="#ffffff"
          maxWidth={{ base: "600px", xl: "670px", xxl: "670px" }}
          marginBottom={{ base: "52px", xl: "130px" }}
          fontWeight={{ base: "400", xl: "400" }}
          whiteSpace="pre-line"
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
        >
          <span>
            Esta consulta es preliminar e informativa, no constituye una oferta
            o cobertura extendida. Para confirmar si a tu vehículo le aplica la
            cobertura extendida T10, contáctate o acércate al concesionario más
            cercano.
          </span>
        </Text>

        <Flex
          justifyContent={{
            base: "",
            medium: "center",
            large: "center",
            xl: "center",
          }}
          gap={{ base: "", xl: "147px" }}
          marginBottom={{ base: "", xl: "150px", xxl: "187px" }}
          direction={{
            base: "column",
            medium: "column",
            xl: "row",
            xxl: "row",
          }}
          alignItems="center"
        >
          <Button
            variation="link"
            color="#ffffff"
            fontSize={{ base: "14px", xl: "14px" }}
            fontWeight="normal"
            fontFamily="var(--font-roboto)"
            marginBottom={{ base: "70px", medium: "", xl: "" }}
            onClick={() => {
              onClose();
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            Consultar otro vehículo
          </Button>

          <Button
            onClick={() => {
              router.push("/concesionarios");
            }}
            backgroundColor="#D42224"
            borderRadius="9999px"
            letterSpacing={{ base: "0.1px", xl: "0.1px" }}
            lineHeight={{ base: "", xl: "125%" }}
            color="#fff"
            fontSize={{ base: "14px", xl: "16px" }}
            fontWeight={{ base: "400", xl: "400" }}
            paddingLeft="2rem"
            paddingRight="2rem"
            minWidth={{ base: "203px", xl: "290px" }}
            maxHeight={{ base: "40px", xl: "50px" }}
            minHeight={{ base: "40px", xl: "50px" }}
            border={{ base: "0px" }}
            style={{
              fontFamily: "var(--font-roboto)",
              order: orderValue2,
            }}
          >
            Contactar al concesionario
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
