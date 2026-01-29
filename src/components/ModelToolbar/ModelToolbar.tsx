"use client";

import { Flex, Text, useBreakpointValue } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";

export default function ModelToolbar({
  model,
  year,
  price,
}: {
  model: string;
  year?: string;
  price: string;
}) {
  const isMobile = useBreakpointValue({ base: true, xl: false });

  return (
    <>
      <style>{`
        @keyframes fadeInToolbar {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <Flex
        padding={{ base: "13px 15px", xl: "10px 40px" }}
        backgroundColor="#000"
        justifyContent="space-between"
        alignItems="center"
        gap={20}
        position={{ base: "fixed" }}
        width={"100%"}
        top={{ base: "calc(100% - 93.5px)", xl: "60px" }}
        left={{ base: "0", xl: "0" }}
        style={{
          zIndex: 999999,
          animation: isMobile
            ? "none"
            : "fadeInToolbar 0.4s ease-in-out forwards",
        }}
      >
        <Text
          fontWeight={{ base: 400, large: 700 }}
          fontFamily="var(--font-ToyotaType-Regular)"
          fontSize={{ base: "18px", large: "22px" }}
          color="white"
          padding={0}
          margin={0}
          width="50%"
        >
          {model} {year && `(${year})`}
        </Text>
        <Flex
          direction="column"
          gap="0px"
          alignItems={{ base: "flex-start", large: "flex-end" }}
          justifyContent="center"
          width="50%"
        >
          <Text
            fontWeight={400}
            fontFamily="var(--font-ToyotaType-Regular)"
            fontSize={{ base: "18px", large: "22px" }}
            color="white"
            padding={0}
            margin={0}
          >
            {price}
          </Text>
          <Text
            fontWeight={400}
            fontFamily="var(--font-ToyotaType-Regular)"
            fontSize={{ base: "9px", large: "12px" }}
            color="white"
            padding={0}
            margin={0}
          >
            *Este valor corresponde con la cotización y el medio de pago que
            está solicitando
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
