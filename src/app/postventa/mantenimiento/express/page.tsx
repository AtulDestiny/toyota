"use client";

import ConcessionaireSearch from "@/components/ConcessionaireSearch/ConcessionaireSearch";
import { MantenimientoExpressBanner } from "@/components/MantenimientoExpressBanner/MantenimientoExpressBanner";
import { Flex, Grid, Heading, Text } from "@aws-amplify/ui-react";
import React from "react";

export default function MantenimientoExpressPage() {
  return (
    <div>
      <MantenimientoExpressBanner />

      <Flex
        direction={{ base: "column" }}
        alignItems={{ base: "center" }}
        gap={{ base: "1.5rem" }}
        padding={{
          base: "1.75rem 2.69rem 3.13rem",
          large: "6.25rem 2rem 142px",
        }}
      >
        <Heading
          level={2}
          color={{ base: "#000000" }}
          textAlign={{ base: "center" }}
          fontFamily={{ base: "var(--font-toyotaDisplay)" }}
          fontSize={{ base: "2rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "130%" }}
        >
          Mantimiento Express
        </Heading>
        <Text
          color={{ base: "#58595B" }}
          textAlign={{ base: "center" }}
          fontFamily={{ base: "var(--font-ToyotaType-Regular)", xl: "var(--font-toyotaDisplay)" }}
          fontSize={{ base: "1.125rem", xl: "32px" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "normal", xl: "130%" }}
          maxWidth={{ base: "69ch",xl: "1220px" }}
          letterSpacing={{ base: "0", large: "0" }}
        >
          Programa de mantenimiento, que ofrece Toyota en algunos de concesionarios a nivel nacional. Ofrece la posibilidad a nuestros clientes de recibir el mantenimiento de sus vehículos en un tiempo máximo* de (1) una hora, a cargo de tres Técnicos de Servicio Certificados Toyota.
        </Text>
      </Flex>

      <Flex justifyContent={{ base: "center" }} padding={{ xl: "0 3rem" }}>
        <Flex
          direction={{ base: "column" }}
          alignItems={{ base: "center" }}
          gap={{ base: "1.5rem", large: "4.5rem" }}
          padding={{
            base: "2.5rem 2.69rem",
            large: "2.5rem 9.6875rem 4.94rem",
          }}
          backgroundColor={{ base: "#373948" }}
          width={{ base: "min(95.625rem, 100%)" }}
        >
          <Heading
            level={2}
            color={{ base: "#FFF" }}
            textAlign={{ base: "center" }}
            fontFamily={{ base: "var(--font-ToyotaType-Regular)", xl: "var(--font-toyotaDisplay)" }}
            fontSize={{ base: "1.375rem", large: "2rem" }}
            fontWeight={{ base: "700", xl:"400" }}
            lineHeight={{ base: "normal", large: "130%" }}
            letterSpacing={{ base: "0", large: "0" }}
          >
            Beneficios
          </Heading>

          <Grid
            gap={{ base: "0.9rem", large: "2rem" }}
            alignItems={{ base: "center", large: "flex-start" }}
            templateColumns={{ large: "repeat(2, 1fr)" }}
            width={{ base: "min(76.1875rem, max-content)" }}
            margin={{ base: "0 auto" }}
          >
            <Flex
              as="ul"
              gap={{ base: "0.9rem" }}
              direction={{ base: "column" }}
              style={{ 
                listStyleType: "none", 
                paddingLeft: "1.5rem",
                display: "block"
              }}
            >
              <Text
                as="li"
                color={{ base: "#FFF" }}
                textAlign={{ base: "center", large: "left" }}
                fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
                fontSize={{ base: "0.75rem", xl: "22px" }}
                letterSpacing={"0"}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
                style={{ 
                  display: "list-item",
                  marginBottom: "calc(0.9rem + 15px)",
                  position: "relative",
                  paddingLeft: "0"
                }}
              >
                <span style={{
                  position: "absolute",
                  left: "-1.4rem",
                  top: "0.7em",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  display: "inline-block"
                }}></span>
                Operación sincronizada con tres técnicos altamente capacitados.
              </Text>

              <Text
                as="li"
                color={{ base: "#FFF" }}
                textAlign={{ base: "center", large: "left" }}
                fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
                fontSize={{ base: "0.75rem", xl: "22px" }}
                letterSpacing={"0"}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
                style={{ 
                  display: "list-item",
                  marginBottom: "calc(0.9rem + 15px)",
                  position: "relative",
                  paddingLeft: "0"
                }}
              >
                <span style={{
                  position: "absolute",
                  left: "-1.4rem",
                  top: "0.7em",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  display: "inline-block"
                }}></span>
                Bahía de trabajo especialmente acondicionada con herramental
                especial.
              </Text>

              <Text
                as="li"
                color={{ base: "#FFF" }}
                textAlign={{ base: "center", large: "left" }}
                fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
                fontSize={{ base: "0.75rem", xl: "22px" }}
                letterSpacing={"0"}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
                style={{ 
                  display: "list-item",
                  marginBottom: "calc(0.9rem + 15px)",
                  position: "relative",
                  paddingLeft: "0"
                }}
              >
                <span style={{
                  position: "absolute",
                  left: "-1.4rem",
                  top: "0.7em",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  display: "inline-block"
                }}></span>
                Reducción del tiempo de espera; horario de entrega garantizado.
              </Text>
            </Flex>

            <Flex 
              as="ul" 
              gap={{ base: "0.9rem" }} 
              direction={{ base: "column" }}
              style={{ 
                listStyleType: "none", 
                paddingLeft: "1.5rem",
                display: "block"
              }}
            >
              <Text
                as="li"
                color={{ base: "#FFF" }}
                textAlign={{ base: "center", large: "left" }}
                fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
                fontSize={{ base: "0.75rem", xl: "1.375rem" }}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
                style={{ 
                  display: "list-item",
                  marginBottom: "calc(0.9rem + 15px)",
                  position: "relative",
                  paddingLeft: "0"
                }}
              >
                <span style={{
                  position: "absolute",
                  left: "-1.4rem",
                  top: "0.7em",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  display: "inline-block"
                }}></span>
                Posibilidad de ver los trabajos realizados en el vehículo.
              </Text>

              <Text
                as="li"
                color={{ base: "#FFF" }}
                textAlign={{ base: "center", large: "left" }}
                fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
                fontSize={{ base: "0.75rem", xl: "22px" }}
                letterSpacing={"0"}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
                style={{ 
                  display: "list-item",
                  marginBottom: "calc(0.9rem + 15px)",
                  position: "relative",
                  paddingLeft: "0"
                }}
              >
                <span style={{
                  position: "absolute",
                  left: "-1.4rem",
                  top: "0.7em",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  display: "inline-block"
                }}></span>
                Comodidad total durante la espera.
              </Text>

              <Text
                as="li"
                color={{ base: "#FFF" }}
                textAlign={{ base: "center", large: "left" }}
                fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
                fontSize={{ base: "0.75rem", xl: "22px" }}
                letterSpacing={"0"}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal" }}
                style={{ 
                  display: "list-item",
                  marginBottom: "calc(0.9rem + 15px)",
                  position: "relative",
                  paddingLeft: "0"
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "-1.4rem",
                    top: "0.7em",
                    width: "6px",
                    height: "6px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                ></span>
                Balanceo y alineación incluidos en el mantenimiento.
              </Text>
            </Flex>
          </Grid>
        </Flex>
      </Flex>

<ConcessionaireSearch paddingTop="42px" />    </div>
  );
}
