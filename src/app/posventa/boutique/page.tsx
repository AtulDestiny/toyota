"use client";

import {
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  View,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import "./page.css";
import { CatalogoBoutiqueBanner } from "@/components/CatalogoBoutiqueBanner/CatalogoBoutiqueBanner";
import Link from "next/link";

export default function CatalogoBoutique(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });

  return (
    <View>
      <CatalogoBoutiqueBanner />

      <Flex
        direction={{ base: "column" }}
        alignItems={{ base: "center" }}
        gap={{ base: "1.5rem", xl: "3.25rem" }}
        padding={{
          base: "2.5rem 1.31rem",
          xl: "71px 2rem 92.20px",
        }}
      >
        <Heading
          level={2}
          fontFamily={"var(--font-ToyotaType-Regular)"}
          color={"black"}
          textAlign={{ base: "center" }}
          fontSize={{ base: "2rem", xl: "3.5rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "130%", xl: "110%" }}
          letterSpacing={{ xl: "-2px" }}
          maxWidth={{ base: "14ch", xl: "100%" }}
        >
          Catálogo de Boutique Toyota
        </Heading>

        <Text
          fontFamily={"var(--font-ToyotaType-Regular)"}
          color={"#58595B"}
          textAlign={{ base: "center" }}
          fontSize={{ base: "1.125rem", xl: "2rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "normal", xl: "130%" }}
          padding={{ base: "0 0.69rem", xl: "0" }}
          maxWidth={"49ch"}
        >
          Lleva la pasión por Toyota al siguiente nivel, conoce nuestro catálogo
          de boutique y elige el producto que más te guste.
        </Text>
      </Flex>

      <Flex
        backgroundColor={"#000000"}
        direction={{ base: "column" }}
        alignItems={{ base: "center" }}
        padding={{ base: "3.125rem 14.5px 5rem", xl: "7rem 2rem 7.25rem" }}
        gap={{ base: "3.125rem", xl: "4.875rem" }}
      >
        <Flex direction={{ base: "column" }} gap={{ base: ".625rem" }}>
          {/* <Text
            fontFamily={"var(--font-ToyotaDisplay)"}
            color={"#ffffff"}
            textAlign={{ base: "left", xl: "center" }}
            fontSize={{ base: "0.875rem", xl: "1.125rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "140%", xl: "100%" }}
          >
            Catálogos
          </Text> */}
          <Heading
            as="h2"
            fontFamily={"var(--font-ToyotaType-Regular)"}
            color={"#ffffff"}
            textAlign={{ base: "left", xl: "center" }}
            fontSize={{ base: "3.5rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "110%" }}
            letterSpacing={{ base: "-2px" }}
          >
            Conoce nuestras boutiques
          </Heading>
        </Flex>

        <Grid
          templateColumns={{ xl: "repeat(2, 1fr)" }}
          width={{ base: "min(1012px, 100%)" }}
          gap={{ base: "30px", xl: "1.37rem" }}
        >
          <Link href="/posventa/marketplace?type=boutique-toyota">
            <View position={"relative"}>
              {isMobile ? (
                <Image
                  width={"100%"}
                  src="/images/boutique-toyota--preview.png"
                  alt="Boutique Toyota"
                />
              ) : (
                <Image
                  width={"493px"}
                  height={"350px"}
                  src="/images/boutique-toyota--preview-desktop.png"
                  alt="Boutique Toyota"
                />
              )}

              <Flex
                position={"absolute"}
                top={"50%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
                direction={{ base: "column" }}
                alignItems={{ base: "center" }}
                justifyContent={{ xl: "center" }}
                padding={"1rem"}
                gap={"0"}
              >
                <Image src="/svgs/boutique-toyota.svg" alt="Boutique Toyota" />
                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  color={"#ffffff"}
                  textAlign={"center"}
                  fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "100%" }}
                  letterSpacing={"0"}
                >
                  Boutique Toyota
                </Text>
              </Flex>
            </View>
          </Link>

          <Link href="/mi-toyota/boutique/marketplace?type=boutique-ecofriendly">
            <View position={"relative"}>
              {isMobile ? (
                <Image
                  width={"100%"}
                  src="/images/boutique-ecofriendly--preview.png"
                  alt="Boutique Ecofriendly"
                />
              ) : (
                <Image
                  width={"493px"}
                  height={"350px"}
                  src="/images/boutique-ecofriendly--preview-desktop.png"
                  alt="Boutique Ecofriendly"
                />
              )}

              <Flex
                position={"absolute"}
                width={"100%"}
                top={"50%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
                direction={{ base: "column" }}
                alignItems={{ base: "center" }}
                justifyContent={{ xl: "center" }}
                padding={"1rem"}
                gap={"0"}
              >
                <Image src="/svgs/ecofriendly.svg" alt="Ecofriendly" />
                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  color={"#ffffff"}
                  textAlign={"center"}
                  fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "100%" }}
                  letterSpacing={"0"}
                >
                  Boutique Ecofriendly
                </Text>
              </Flex>
            </View>
          </Link>
        </Grid>
      </Flex>
    </View>
  );
}
