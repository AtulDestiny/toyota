/* eslint-disable @next/next/no-img-element */
"use client";

import ConcessionaireSearch from "@/components/ConcessionaireSearch/ConcessionaireSearch";
import { MantenimientoPlaneadoBanner } from "@/components/MantenimientoPlaneadoBanner/MantenimientoPlaneadoBanner";
import { MantenimientoPlaneadoSlider } from "@/components/MantenimientoPlaneadoSLider/MantenimientoPlaneado";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import React from "react";

function MantenimeintoPlaneadoPage() {
  const isMobile = useBreakpointValue({ base: true, large: false }) ?? false;
  return (
    <div>
      <MantenimientoPlaneadoBanner />

      {isMobile && (
        <Flex
          justifyContent={{ base: "center" }}
          padding={{ base: ".75rem" }}
          backgroundColor={{ base: "#D42224" }}
          color={{ base: "#FFFFFF" }}
          textAlign={{ base: "center" }}
          fontFamily={{ base: "var(--font-toyotaDisplay)" }}
          fontSize={{ base: "0.875rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "140%" }}
          position={"relative"}
          top={"-5px"}
        >
          Cotiza tu Mantenimiento Planeado
        </Flex>
      )}

      <Flex
        direction={{ base: "column" }}
        alignItems={{ base: "center" }}
        gap={{ base: "24px" }}
        padding={{
          base: "1.75rem 2.69rem 2.81rem",
          large: "6.25rem 2rem 7.94rem",
        }}
      >
        <Heading
          level={2}
          color={{ base: "#000000" }}
          textAlign={{ base: "center" }}
          fontFamily={{ base: "var(--font-toyotaDisplay)" }}
          fontSize={{ base: "32px" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "130%" }}
          letterSpacing={"0"}
        >
          ¿Qué es el Mantenimiento Planeado Toyota?
        </Heading>
        <Text
          color={{ base: "#58595B" }}
          textAlign={{ base: "center" }}
          fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
          fontSize={{ base: "18px" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "normal" }}
          maxWidth={{ base: "62ch" }}
        >
          Es un beneficio diferencial que hace parte del Plan de Fidelidad que
          Toyota ha desarrollado para sus clientes brindándoles un Mantenimiento
          Planeado Toyota* a precio preferencial en su red de concesionarios
          autorizados con repuestos genuinos y personal calificado.
        </Text>

        {!isMobile && (
          <Button
            backgroundColor={{ base: "#D42224" }}
            color={{ base: "#FFFFFF" }}
            textAlign={{ base: "center" }}
            fontFamily={{ base: "var(--font-toyotaDisplay)" }}
            fontSize={{ base: "0.875rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "140%" }}
            padding={{ base: "0.94rem 2.47rem" }}
            maxWidth={{ base: "18.125rem" }}
            borderRadius={{ base: "6.25rem" }}
            border={{ base: "none" }}
            whiteSpace={{ base: "nowrap" }}
            onClick={() =>
              (window.location.href =
                "/mi-toyota/mantenimiento/planeado/cotizar")
            }
          >
            Conoce tu Mantimiento Planeado Toyota
          </Button>
        )}
      </Flex>

      <Flex
        direction={{ base: "column" }}
        gap={{ base: "1.5rem", large: "1.25rem" }}
        paddingBottom={{ base: "4.41rem", large: "7.94rem" }}
      >
        <Grid
          gap={{ base: "0.81rem", large: "1.25rem" }}
          padding={{ base: "0 0.94rem", large: "0 2rem" }}
          templateRows={{ large: "repeat(2, 1fr)" }}
          maxWidth={{ base: "76.25rem" }}
          margin={{ base: "0 auto" }}
          autoFlow={{ base: "row", large: "column" }}
        >
          <Flex
            backgroundColor={{ base: "#F6F6F6" }}
            justifyContent={{ base: "center" }}
            alignItems={{ base: "center" }}
            height={{ base: "84px", large: "100%" }}
            width={{ base: "345px", large: "100%" }}
            padding={{ base: "20px 15px", large: "2.47rem 3.75rem" }}
          >
            <Text
              color={{ base: "#000000" }}
              textAlign={{ base: "center" }}
              fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
              fontSize={{ base: "12px", large: " 1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
              letterSpacing={{ base: "0", large: "0" }}
            >
              El plan tiene una vigencia de 3 años o 50.000 km., lo primero que
              ocurra.
            </Text>
          </Flex>

          <Flex
            backgroundColor={{ base: "#F6F6F6" }}
            justifyContent={{ base: "center" }}
            alignItems={{ base: "center" }}
            padding={{ base: "1.56rem 2.28rem", large: "2.19rem 3.75rem" }}
          >
            <Text
              color={{ base: "#000000" }}
              textAlign={{ base: "center" }}
              fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
              fontSize={{ base: "12px", large: " 1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
              letterSpacing={{ base: "0", large: "0" }}
            >
              Tu primer mantenimiento debes realizarlo 30 días después de la
              entrega de tu vehículo o al cumplir los primeros 1.000 km., lo
              primero que - ocurra; y se encuentra incluido en la revisión del
              primer mes.
            </Text>
          </Flex>

          <Flex
            backgroundColor={{ base: "#F6F6F6" }}
            justifyContent={{ base: "center" }}
            alignItems={{ base: "center" }}
            padding={{ base: "1.56rem 2.28rem", large: "2.19rem 3.75rem" }}
          >
            <Text
              color={{ base: "#000000" }}
              textAlign={{ base: "center" }}
              fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
              fontSize={{ base: "12px", large: " 1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
              letterSpacing={{ base: "0", large: "0" }}
            >
              Por cada tipo de mantenimiento pagarás un precio único.
            </Text>
          </Flex>

          <Flex
            backgroundColor={{ base: "#F6F6F6" }}
            justifyContent={{ base: "center" }}
            alignItems={{ base: "center" }}
            padding={{ base: "1.56rem 2.28rem", large: "2.19rem 3.75rem" }}
          >
            <Text
              color={{ base: "#000000" }}
              textAlign={{ base: "center" }}
              fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
              fontSize={{ base: "12px", large: " 1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
              letterSpacing={{ base: "0", large: "0" }}
            >
              La garantía** de tu vehículo tiene vigencia durante 5 años o
              120.000 km., lo primero que ocurra.
            </Text>
          </Flex>
        </Grid>

        <Flex
          direction={{ base: "column" }}
          alignItems={{ base: "center" }}
          padding={{ base: "0 1.31rem", large: "0 2rem" }}
          gap={{ base: "3.12rem", large: "7.94rem" }}
        >
          <View
            color={{ base: "#000000" }}
            textAlign={{ base: "center" }}
            fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
            fontSize={{ base: "9px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "normal" }}
            maxWidth={{ base: "129ch" }}
            letterSpacing={"0"}
          >
            <p>
              *Mantenimiento Planeado Toyota es prestado por todos{" "}
              {isMobile && <br />}los concesionarios autorizados de la red
              Toyota en Colombia.
            </p>
            ** 3 años o 100.000 km. correspondientes a la garantía de fábrica y
            2 años o 20.000 km. adicionales correspondientes a la garantía
            suplementaria ofrecida por ATC, con las condiciones descritas en el
            certificado de garantía.
          </View>
        </Flex>
      </Flex>

      <MantenimientoPlaneadoSlider />

      <Flex
        direction={{ base: "column" }}
        gap={{ base: "38.2px", large: "3.75rem" }}
        paddingTop={{ base: "4.01rem", large: "7.19rem" }}
      >
        <Flex
          direction={{ base: "column" }}
          alignItems={{ base: "center" }}
          gap={{ base: "0.62rem", large: "0.75rem" }}
          padding={{ base: "0 0.94rem", large: "0 2rem" }}
        >
          <img
            src="/svgs/exclamation.svg"
            alt="Exclamation"
            width={"39.60000228881836px"}
            height={"39.60000228881836"}
          />

          <Heading
            level={2}
            color={{ base: "#000000" }}
            textAlign={{ base: "center" }}
            fontFamily={{ base: "var(--font-toyotaDisplay)" }}
            fontSize={{ base: "2rem", large: "3.5rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "130%", large: "110%" }}
            letterSpacing={{ base: "0", large: "0rem" }}
          >
            Debes tener{isMobile && <br />} en cuenta
          </Heading>

          <Text
            color={{ base: "#000000" }}
            textAlign={{ base: "center" }}
            fontFamily={{ base: "var(--font-toyotaDisplay)" }}
            fontSize={{ base: "0.875rem", large: "1.375rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "140%", large: "normal" }}
            letterSpacing={{ base: "0", large: "0rem" }}
          >
            Revisión del primer mes
          </Text>
        </Flex>

        <Grid
          templateColumns={{ large: "repeat(2, 1fr)" }}
          gap={{ base: "0.81rem", large: "1.19rem" }}
          padding={{ base: "0 0.94rem" }}
          width={{ base: "min(76.1875rem, 100%)" }}
          margin={{ base: "0 auto" }}
        >
          <Flex
            backgroundColor={{ base: "#F6F6F6" }}
            padding={{ base: "20px 36.5px", large: "2.19rem 3.75rem" }}
            width={{ base: "345px", large: "100%" }}
            height={{ base: "101px", large: "100%" }}
          >
            <Text
              color={{ base: "#000000" }}
              textAlign={{ base: "center" }}
              fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
              fontSize={{ base: "0.75rem", large: "1.125rem" }}
              fontWeight={{ base: "400" }}
              letterSpacing={"0"}
              lineHeight={{ base: "normal" }}
            >
              Es importante que coordines y programes la revisión del primer mes
              con el Asesor Comercial en el momento de la entrega de tu
              vehículo.
            </Text>
          </Flex>

          <Flex
            backgroundColor={{ base: "#F6F6F6" }}
            padding={{ base: "1.56rem 2.28rem", large: "2.19rem 3.75rem" }}
            width={{ base: "345px", large: "100%" }}
            height={{ base: "118px", large: "100%" }}
          >
            <Text
              color={{ base: "#000000" }}
              textAlign={{ base: "center" }}
              fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
              fontSize={{ base: "0.75rem", large: "1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
              letterSpacing={"0"}
            >
              Tu primer mantenimiento debes realizarlo 30 días después de la
              entrega de tu vehículo o al cumplir los primeros 1.000 km., lo
              primero que ocurra, y no tendrá ningún costo adicional.
            </Text>
          </Flex>
        </Grid>
      </Flex>

      <Flex
        direction={{ base: "column" }}
        gap={{ base: "2.39rem", large: "3.75rem" }}
        padding={{ base: "3.68rem 0 3.83rem", large: "6.69rem 2rem 53px" }}
      >
        <Flex
          direction={{ base: "column" }}
          alignItems={{ base: "center" }}
          gap={{ base: "0.62rem" }}
          padding={{ base: "0 0.94rem" }}
        >
          <img
            src="/svgs/notification-alert.svg"
            alt="Notification Alert"
            width={"31.649999618530273px"}
            height={"40.28450012207031px"}
          />

          <Heading
            level={2}
            color={{ base: "#000000" }}
            textAlign={{ base: "center" }}
            fontFamily={{ base: "var(--font-toyotaDisplay)" }}
            fontSize={{ base: "2rem", large: "3.5rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "130%", large: "110%" }}
            letterSpacing={{ base: "0", large: "-0.07rem" }}
          >
            Recuerda
          </Heading>

          <Text
            color={{ base: "#000000" }}
            textAlign={{ base: "center" }}
            fontFamily={{ base: "var(--font-toyotaDisplay)" }}
            fontSize={{ base: "0.875rem", large: "1.375rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "140%", large: "normal" }}
            letterSpacing={{ base: "0", large: "-0.07rem" }}
          >
            Revisiones de Kilometraje
          </Text>
        </Flex>

        <Grid
          gap={{ base: "0.81rem", large: "1.25rem" }}
          padding={{ base: "0 0.94rem", large: "0 2rem" }}
          templateColumns={{ large: "repeat(3, 1fr)" }}
          width={{ base: "min(115rem, 100%)" }}
          margin={{ base: "0 auto" }}
        >
          <Flex
            backgroundColor={{ base: "#F6F6F6" }}
            alignItems={{ base: "center" }}
            justifyContent={{ base: "center" }}
            direction={{ base: "column" }}
            gap={{ base: "2.39rem", large: "3.75rem" }}
            padding={{ base: "1.56rem 2.28rem", large: "2.19rem 3.75rem" }}
          >
            <Text
              color={{ base: "#000000" }}
              textAlign={{ base: "center" }}
              fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
              fontSize={{ base: "0.75rem", large: "1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
            >
              El periodo de aceptación de las revisiones es de ± 1.000 km., es
              decir, la revisión de 5.000 km. puedes realizarla entre los 4.000
              y 6.000 km.
            </Text>
          </Flex>

          <Flex
            backgroundColor={{ base: "#F6F6F6" }}
            alignItems={{ base: "center" }}
            justifyContent={{ base: "center" }}
            direction={{ base: "column" }}
            gap={{ base: "2.39rem", large: "3.75rem" }}
            padding={{ base: "1.56rem 2.28rem", large: "2.19rem 3.75rem" }}
          >
            <Text
              color={{ base: "#000000" }}
              textAlign={{ base: "center" }}
              fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
              fontSize={{ base: "0.75rem", large: "1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
            >
              Si no atiendes el mantenimiento en este periodo de kilometraje,
              perderás el beneficio del precio especial.
            </Text>
          </Flex>

          <Flex
            backgroundColor={{ base: "#F6F6F6" }}
            alignItems={{ base: "center" }}
            justifyContent={{ base: "center" }}
            direction={{ base: "column" }}
            gap={{ base: "2.39rem", large: "3.75rem" }}
            padding={{ base: "1.56rem 2.28rem", large: "2.19rem 3.75rem" }}
          >
            <Text
              color={{ base: "#000000" }}
              textAlign={{ base: "center" }}
              fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
              fontSize={{ base: "0.75rem", large: "1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
            >
              En todo caso, el vencimiento de la revisión a precio especial no
              exime de la realización del mantenimiento periódico de tu
              vehículo, que es necesario para no perder la garantía.
            </Text>
          </Flex>
        </Grid>
      </Flex>

      <ConcessionaireSearch />
    </div>
  );
}

export default MantenimeintoPlaneadoPage;
