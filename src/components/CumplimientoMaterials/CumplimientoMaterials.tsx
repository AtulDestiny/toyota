import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  View,
} from "@aws-amplify/ui-react";
import styles from "./styles.module.css";

export function CumplimientoMaterials() {
  const items = [
    {
      title: "Código de ética y conducta",
      logo: {
        src: "/svgs/codigo-de-etica-y-conducta.svg",
        alt: "Código de ética y conducta",
      },
      link: "/images/pdf/codigo-de-etica-y-conducta.pdf",
    },
    {
      title: "Guía de uso",
      logo: {
        src: "/svgs/guia-de-uso.svg",
        alt: "Guía de uso",
      },
      link: "/images/pdf/guia-de-uso.pdf",
    },
    {
      title: "Política de privacidad ATC",
      logo: {
        src: "/svgs/politica-de-privacidad-atc.svg",
        alt: "Política de privacidad ATC",
      },
      link: "https://www.toyota.com.co/legales/politica_de_privacidad",
    },
    {
      title: "Programa de transparencia y ética empresarial",
      logo: {
        src: "/svgs/programa-de-transparencia-y-etica-empresarial.svg",
        alt: "Programa de transparencia y ética empresarial",
      },
      link: "/images/pdf/programa-de-transparencia-y-etica-empresarial.pdf",
    },
    {
      title: "Programa de Transparência e Ética Empresarial",
      logo: {
        src: "/svgs/programa-de-transparencia-y-etica-empresarial.svg",
        alt: "Programa de Transparência e Ética Empresarial",
      },
      link: "/images/pdf/programa-de-transparencia-y-etica-empresarial-portugues.pdf",
    },
    {
      title: "ビジネス透明性及び企業論理プログラム",
      logo: {
        src: "/svgs/programa-de-transparencia-y-etica-empresarial.svg",
        alt: "Business Transparency and Corporate Logic Program (japanese)",
      },
      link: "/images/pdf/programa-de-transparencia-y-etica-empresarial-japones.pdf",
    },
    {
      title: "Manual SAGRILAFT (English version)",
      logo: {
        src: "/svgs/programa-de-transparencia-y-etica-empresarial.svg",
        alt: "Manual SAGRILAFT (English version)",
      },
      link: "/images/pdf/manual-sagrilaft-english-version.pdf",
    },
    {
      title: "Transparency And Business Ethics Program",
      logo: {
        src: "/svgs/programa-de-transparencia-y-etica-empresarial.svg",
        alt: "Transparency And Business Ethics Program",
      },
      link: "/images/pdf/transparency-and-business-ethics-program.pdf",
    },
  ];

  return (
    <Flex
      direction={{ base: "column" }}
      padding={{ base: "2.5rem 0", xl: "3.25rem 2rem" }}
      gap={{ base: "2.5rem", xl: "4.5rem" }}
      backgroundColor={{ base: "#E7EDF1" }}
    >
      <Flex
        direction={{ base: "column" }}
        gap={{ base: "2.5rem", xl: "4.5rem" }}
      >
        <Flex
          direction={{ base: "column" }}
          padding={{ base: "0 .9375rem" }}
          gap={{ base: ".625rem" }}
        >
          <Text
            fontFamily={{
              base: "var(--font-toyotaDisplay)",
              large: "var(--font-ToyotaType-Regular)",
            }}
            fontSize={{ base: "14px", large: "18px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "140%", large: "100%" }}
            letterSpacing={{ base: "0%", large: "0%" }}
            textAlign={{ large: "center" }}
          >
            Responsabilidad
          </Text>
          <Heading
            maxWidth={{ base: "9ch", small: "100%" }}
            fontFamily={{
              base: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            }}
            fontSize={{ base: "32px", xl: "56px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "130%", xl: "110.00000000000001%" }}
            letterSpacing={{ base: "0%", xl: "-2%" }}
            textAlign={{ large: "center" }}
          >
            Materiales Descargables
          </Heading>
        </Flex>

        <Flex
          paddingLeft={{ base: ".9375rem", large: "0" }}
          justifyContent={{ large: "center" }}
        >
          <Grid
            paddingRight={{ base: ".9375rem", large: "unset" }}
            padding={{ large: "0 .9375rem", xl: "0" }}
            width={{ base: "100%" }}
            height={{ base: "15.625rem", large: "unset" }}
            templateColumns={{
              base: `repeat(${items.length}, 1fr)`,
              large: "repeat(4, 1fr)",
              xxl: "repeat(4, 19.4375rem)",
            }}
            autoRows={{ large: "15.25rem" }}
            gap={{ large: "1.25rem" }}
            overflow={{ base: "scroll", large: "unset" }}
            alignItems={{ base: "flex-end" }}
            justifyContent={{ large: "center" }}
          >
            {items.map((item) => (
              <Flex
                key={item.title}
                as="a"
                href={item.link}
                target={item.link.startsWith("/images/") ? "_blank" : ""}
                className={`${styles.item}`}
                width={{ base: "254px", large: "100%" }}
                direction={{ base: "column" }}
                justifyContent={{ base: "space-between" }}
                alignItems={{ base: "stretch" }}
                padding={{
                  base: "1.25rem 2.3125rem 1.25rem 1.25rem",
                  large: "1.3125rem 2.8581rem 2.3469rem 1.5rem",
                }}
                gap={{ base: "1rem" }}
              >
                <Heading
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                  }}
                  fontSize={{ base: "22px" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "100%", large: "2.1703rem" }}
                  letterSpacing={{ base: "0%" }}
                >
                  {item.title}
                </Heading>

                <Flex
                  justifyContent={{ base: "space-between" }}
                  gap={{ base: "1rem" }}
                  alignItems={{ base: "flex-end" }}
                >
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={{ base: "2.015rem", xl: "2.9931rem" }}
                  />
                  <Image
                    src={"/svgs/arrow--short-right.svg"}
                    alt={"Arrow short right"}
                    width={{ base: "1.4969rem", xl: "26.75px" }}
                    height={{ base: ".9375rem", xl: "1.1462rem" }}
                  />
                </Flex>
              </Flex>
            ))}
          </Grid>
        </Flex>
      </Flex>

      <Flex justifyContent={{ base: "center" }}>
        <Button
          as="a"
          href="https://www.canaldeintegridadtoyotacolombia.com/"
          fontFamily={{
            base: "var(--font-ToyotaType-Regular)",
          }}
          fontSize={{ base: "14px", xl: "1.125rem" }}
          fontWeight={{ base: "500" }}
          lineHeight={{ base: "1.25rem", xl: "100%" }}
          letterSpacing={{ base: "0.1px", xl: "0%" }}
          border={{ base: ".0625rem solid #161B1E" }}
          backgroundColor={{ base: "transparent" }}
          padding={{ base: ".625rem 1.5rem", xl: ".75rem 2.0938rem" }}
        >
          Conoce nuestro canal de integridad
        </Button>
      </Flex>
    </Flex>
  );
}
