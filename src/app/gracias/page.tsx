"use client";

import Button from "@/components/Layout/Button/Button";
import { Divider, Flex, Heading, Text } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useSearchParams } from "next/navigation";

function ImportantText({ children }: { children: React.ReactNode }) {
  return <span style={{ fontWeight: "bold" }}>{children}</span>;
}

export default function GraciasPage() {
  const searchParams = useSearchParams();

  const vehicleName = searchParams.get("vehicleName") || "";
  const vehiclePrice = searchParams.get("vehiclePrice") || "";
  const consecionaireName = searchParams.get("consecionaireName") || "";
  const sendData = searchParams.get("sendData") || "false";
  const isSendData = sendData === "true";
  const customButtonText = searchParams.get("customButtonText") || "";
  const customButtonLink = searchParams.get("customButtonLink") || "";

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction={"column"}
      backgroundColor="black"
      height={{ base: "auto", xl: "100vh" }}
      padding={{ base: "70px 15px", xl: "0px" }}
    >
      <Heading
        level={2}
        fontSize={{ base: "14px", xl: "18px" }}
        lineHeight={"100%"}
        color={"white"}
        fontFamily="var(--font-ToyotaType-Regular)"
        textAlign={"center"}
        maxWidth={{ base: "345px", xl: "910px" }}
        style={{
          textWrap: "pretty",
        }}
      >
        Datos enviados
      </Heading>
      <Heading
        level={5}
        fontSize={{ base: "32px", xl: "56px" }}
        fontFamily="var(--font-ToyotaType-Regular)"
        fontWeight={"400"}
        lineHeight={{ base: "130%", xl: "100%" }}
        color={"white"}
        textAlign={"center"}
        maxWidth={{ base: "340px", xl: "910px" }}
        style={{
          textWrap: "pretty",
        }}
      >
        Gracias por diligenciar tus datos
      </Heading>
      <Text
        fontWeight={400}
        fontFamily="var(--font-ToyotaType-Regular)"
        fontSize={{ base: "12px", xl: "22px" }}
        marginTop={{ base: "19px", xl: "49px" }}
        marginBottom={{ base: "35px", xl: "56px" }}
        color={"white"}
        maxWidth={{ base: "345px", xl: "910px" }}
        textAlign={"center"}
      >
        Apreciamos tu tiempo y esfuerzo en brindarnos la información necesaria para poderte contactar.
        <br />
        <br />
        ¡Te contactaremos lo antes posible!
        {/* {isSendData ? (
          <>
            Apreciamos tu tiempo y esfuerzo en brindarnosla información
            necesaria para poderte contactar.{" "}
            <ImportantText>¡Te contactaremos lo antes posible!</ImportantText>
          </>
        ) : (
          <>
            Tu solicitud de información sobre el{" "}
            <ImportantText>{vehicleName}</ImportantText>, con un precio de{" "}
            <ImportantText>{vehiclePrice}</ImportantText> fue enviada. El equipo
            de <ImportantText>{consecionaireName}</ImportantText> se pondrá en
            contacto contigo para brindarte más detalles y asesorarte en el
            proceso.
          </>
        )} */}
      </Text>
      <Divider
        orientation="horizontal"
        borderColor={"white"}
        size="small"
        maxWidth={{ base: "345px", xl: "910px" }}
        display={{ base: "none", xl: "flex" }}
      />
      <Flex
        marginTop={{ base: "0", xl: "49px" }}
        maxWidth={{ base: "345px", xl: "910px" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={{ base: "0px", xl: "147px" }}
        direction={{ base: "column-reverse", xl: "row" }}
      >
        {/* <Button
          type="button"
          color="underlined"
          textColor="white"
          style={{ textDecoration: "underline" }}
        >
          Ir a la página principal
        </Button> */}
        <Button
          type="button"
          color="red"
          className="slide-button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Ir a la página principal
        </Button>
      </Flex>
    </Flex>
  );
}
