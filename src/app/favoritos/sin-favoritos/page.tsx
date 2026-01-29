"use client";

import Button from "@/components/Layout/Button/Button";
import { View, Image, Text, Flex } from "@aws-amplify/ui-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SinFavoritosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get values from search params with defaults
  const buttonText = searchParams.get("buttonText") || "Volver a ver artículos";
  const buttonLink = searchParams.get("buttonLink") || "/marketplace";
  const backLink = searchParams.get("backLink") || "/marketplace";
  const title = searchParams.get("title") || "No tienes artículos favoritos";
  const description =
    searchParams.get("description") ||
    "Marca como favoritos los artículos de la boutique que te interesen e identifícalos aquí";

  return (
    <>
      <View position="relative" maxWidth={"1920px"} margin={"0 auto"}>
        <View
          position={{ base: "relative", xl: "absolute" }}
          top={{ base: "0", xl: "30px" }}
        >
          <Button
            color="transparent"
            textColor="black"
            onClick={() => router.push(backLink)}
            padding={{ base: "17px", xl: "0 40px" }}
          >
            <Image
              height="15px"
              marginRight={"15px"}
              alt={"right"}
              src={"/images/icons/left_arrow.svg"}
            />
            <Text
              fontFamily={"var(--font-ToyotaType-Regular)"}
              fontSize={{ base: "12px", xl: "18px" }}
            >
              Volver a Resultados
            </Text>
          </Button>
        </View>
      </View>
      <View backgroundColor={{ base: "white", xl: "#fff" }}>
        <View maxWidth={"1920px"} margin={"0 auto"} height="100%">
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight={{ base: "50vh", xl: "90vh" }}
            padding={{ base: "2rem 1rem", xl: "2rem" }}
            gap={0}
          >
            <Image
              src="/images/icons/notFavorite.svg"
              alt="No favoritos"
              width="50px"
              marginBottom={{ base: "1.5rem", xl: "40px" }}
            />
            <Text
              fontFamily="var(--font-ToyotaType-Regular)"
              fontSize={{ base: "22px", xl: "56px" }}
              fontWeight="400"
              color="#000000"
              marginBottom={{ base: "4px", xl: "32px" }}
            >
              {title}
            </Text>
            <Text
              fontFamily="var(--font-ToyotaType-Regular)"
              fontSize={{ base: "14px", xl: "22px" }}
              color="#000000"
              textAlign="center"
              maxWidth={{ base: "324px", xl: "475px" }}
              marginBottom={{ base: "2rem", xl: "56px" }}
            >
              {description}
            </Text>
            <Link href={buttonLink} style={{ textDecoration: "none" }}>
              <Button
                type="button"
                color="red"
                padding={{ base: "0.75rem 1.5rem", xl: "1rem 2rem" }}
                style={{
                  fontFamily: "var(--font-roboto)",
                }}
              >
                {buttonText}
              </Button>
            </Link>
          </Flex>
        </View>
      </View>
    </>
  );
}
