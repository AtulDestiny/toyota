"use client";
import React from "react";
import { View, Text, Button, Flex, Divider } from "@aws-amplify/ui-react";
import Link from "next/link";
import "./style.css";

const SeguraThankYouPage = () => {
  return (
    <div className="responsiveSection">
      <Flex
        // height={{ base: "75vh", medium:"50vh", large:"50vh" ,xl: "92vh" ,xxl: "100vh" }}
        width="100%"
        backgroundColor="black"
        color="white"
        direction="column"
        alignItems="center"
        textAlign="center"
        gap="0px"
      >
        <Text
          fontSize={{ base: "14px", xl: "18px" }}
          margin={{ base: "88px auto 0px", xl: "190px auto 0px" }}
          color="white"
          backgroundColor="black"
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
          fontWeight="400"
          lineHeight={{ base: "140%", xl: "100%" }}
          letterSpacing="0px"
          style={{
            verticalAlign: "center",
          }}
        >
          Datos enviados
        </Text>

        <Text
          fontSize={{ base: "32px", xl: "56px" }}
          margin={{ base: "10px auto 0px", xl: "10px auto 0px" }}
          color="white"
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
          fontWeight="400"
          lineHeight={{ base: "130%", xl: "100%" }}
          letterSpacing="0px"
          style={{
            verticalAlign: "center",
          }}
        >
          <span>
            Gracias por{" "}
            <br
              style={{
                display: "block",
              }}
              className="mobile-break"
            />
            diligenciar tus datos
          </span>
        </Text>

        <View>
          <Text
            fontSize={{ base: "12px", xl: "22px" }}
            margin={{ base: "24px 15px 0px", xl: "80px auto 87px" }}
            padding={{ base: "0px 30px 0px", xl: "" }}
            color="white"
            fontFamily={{
              base: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-ToyotaType-Regular)",
            }}
            fontWeight="400"
            lineHeight={{ base: "130%", xl: "100%" }}
            letterSpacing="0px"
            style={{
              verticalAlign: "center",
            }}
          >
            <span>
              Apreciamos tu tiempo y esfuerzo en brindarnos la{" "}
              <br className="mobile-break" />
              información necesaria para poderte contactar.{" "}
              <br className="mobile-break" />
              ¡Te contactaremos lo antes posible!
            </span>
          </Text>
        </View>

        <Divider
          maxWidth={{ xl: "70%" }}
          display={{ base: "none", xl: "block" }}
        />

        <Flex
          marginTop={{ base: "68px", xl: "68px" }}
          direction={{ base: "column", xl: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={{ base: "16px", xl: "24px" }}
          marginBottom={{
            medium: "60px",
            large: "60px",
            xl: "150px",
            xxl: "187px",
          }}
          width="auto"
        >
          <Button
            variation="primary"
            backgroundColor="red.600"
            fontFamily={"var(--font-roboto)"}
            lineHeight={{ base: "20px", xl: "" }}
            letterSpacing={{ base: "0.1px", xl: "" }}
            fontSize={{ base: "14px", xl: "26px" }}
            borderRadius="9999px"
            width="100%"
            maxWidth={{ base: "162px", xl: "" }}
            minWidth={{ base: "162px", xl: "" }}
            maxHeight={{ base: "40px", xl: "" }}
            color="white"
            onClick={() => {
              window.location.href = "/cotiza-tu-toyota/seguro-toyota";
            }}
          >
            Cotizar otro vehículo
          </Button>

          <Link href="/" className="seguro-toyota-ir-a-la-link">
            <Text
              color="white"
              margin={{ base: "24px 0px 70px", xl: "" }}
              fontFamily={"var(--font-roboto)"}
              fontWeight="500"
              lineHeight={{ base: "100%", xl: "" }}
              fontSize={{ base: "14px", xl: "26px" }}
              textDecoration="underline"
              letterSpacing="0"
              style={{
                verticalAlign: "middle",
                textDecorationStyle: "solid",
                textDecorationThickness: "0",
              }}
            >
              Ir a la página principal
            </Text>
          </Link>
        </Flex>
      </Flex>
    </div>
  );
};

export default SeguraThankYouPage;
