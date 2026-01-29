import { Button, Flex, Image, Text } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

export function CookiesModal() {
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    setOpened(!accepted);
  }, []);

  function close() {
    setOpened(false);
  }

  function handleAccept() {
    localStorage.setItem("cookiesAccepted", "true");
    close();
  }

  if (!opened) return null;

  return (
    <Flex
      direction={"column"}
      gap={"0"}
      position="fixed"
      bottom="0"
      right="0"
      style={{ zIndex: 9999999 }}
      alignItems="flex-end"
    >
      <Image
        src="/svgs/close--red.svg"
        alt="Cookies Modal close"
        width={{ base: "40px" }}
        height={{ base: "40px" }}
        style={{ cursor: "pointer" }}
        onClick={close}
      />
      <Flex
        direction="column"
        alignItems={"flex-start"}
        gap={{ base: "1.5rem", large: "2rem" }}
        backgroundColor={"#fff"}
        width={{ base: "100%", large: "405px" }}
        padding={{ base: "1.6038rem .9375rem", large: "2.0412rem 3.5313rem" }}
        border={"1px solid #E0E0E0"}
      >
        <Image
          src="/svgs/logo.svg"
          alt="Logo Toyota"
          width={{ base: "125px" }}
          height={{ base: "20.67px" }}
        />
        <Text
          color={"#000"}
          fontFamily="var(--font-toyotaDisplay)"
          fontSize={{ base: ".875rem", large: "1rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "140%", large: "190%" }}
        >
          Utilizamos "cookies" para mejorar tu experiencia en línea. Esta página
          web utiliza "cookies" y otra tecnología propia de terceros. Si
          continúas navegando, aceptas el tratamiento de la información obtenida
          en el mismo, de acuerdo con esta política.
        </Text>
        <Button
          backgroundColor={"#000000"}
          color={"#fff"}
          fontFamily="var(--font-toyotaDisplay)"
          lineHeight={{ base: "20px" }}
          fontSize={{ base: ".875rem" }}
          fontWeight={{ base: "500" }}
          padding={{ base: ".625rem 4.125rem" }}
          border={"none"}
          style={{ outline: "none" }}
          onClick={handleAccept}
        >
          Aceptar
        </Button>
      </Flex>
    </Flex>
  );
}
