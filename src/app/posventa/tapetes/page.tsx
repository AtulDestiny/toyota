"use client";
import { CampanaTapetesBanner } from "@/components/CampanaTapetesBanner/CampanaTapetesBanner";
import CampanaTapetesSlider from "@/components/CampanaTapetesSlider/CampanaTapetesSlider";
import {
  Flex,
  View,
  Text,
  Heading,
  Grid,
  useBreakpointValue,
  Image,
} from "@aws-amplify/ui-react";
import "./page.css";

export default function CanpanaTapetesPage(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const examples = [
    {
      title: "Tapetes sobrepuestos",
      image: {
        mobile: { src: "/images/tapetes-example-1.png", alt: "Example" },
        desktop: {
          src: "/images/tapetes-example-1--desktop.png",
          alt: "Example",
        },
      },
    },
    {
      title: "Girado o en posición incorrecta",
      image: {
        mobile: { src: "/images/tapetes-example-2.png", alt: "Example" },
        desktop: {
          src: "/images/tapetes-example-2--desktop.png",
          alt: "Example",
        },
      },
    },
    {
      title: "Retenedor sin asegurar",
      image: {
        mobile: { src: "/images/tapetes-example-3.png", alt: "Example" },
        desktop: {
          src: "/images/tapetes-example-3--desktop.png",
          alt: "Example",
        },
      },
    },
  ];

  return (
    <View>
      <CampanaTapetesBanner />

      <Flex
        direction={{ base: "column" }}
        padding={{ base: "2.5rem 2.13rem 2.94rem", xl: "7.63rem 1rem 8.94rem" }}
        gap={{ base: "47px", xl: "141px" }}
        alignItems={{ base: "center" }}
      >
        <Text
          fontFamily={"var(--font-toyotaDisplay)"}
          color={"black"}
          textAlign={{ base: "center" }}
          fontSize={{ base: "0.875rem", xl: "32px" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "140%", xl: "130%" }}
          maxWidth={{ xl: "50ch" }}
          letterSpacing={{ base: "0", xl: "0" }}
        >
          La instalación correcta de los tapetes es esencial para el libre
          funcionamiento de los pedales del acelerador y el freno.
        </Text>

        <Flex
          direction={{ base: "column" }}
          gap={{ base: "1.5rem", xl: "52px" }}
          alignItems={{ base: "center" }}
        >
          <Heading
            level={2}
            fontFamily={"var(--font-ToyotaType-Regular)"}
            color={"black"}
            textAlign={{ base: "center" }}
            fontSize={{ base: "1.375rem", xl: "56px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "normal", xl: "110.00000000000001%" }}
            letterSpacing={{ xl: "-2px" }}
            maxWidth={{ xl: "19ch" }}
          >
            Te invitamos a seguir estas recomendaciones:
          </Heading>
          <Flex
            direction={{ base: "column" }}
            gap={{ base: "1.25rem", xl:"40px" }}
            alignItems={{ base: "flex-start" }}
            fontFamily={"var(--font-ToyotaType-Regular)"}
            color={"black"}
            textAlign={{ base: "left" }}
            fontSize={{ base: "0.75rem", xl: "22px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "normal", xl:"100%" }}
            maxWidth={{ xl: "120ch" }}
            letterSpacing={{ base: "0", xl: "0" }}
          >
            <Text>
            •  Para conducir con seguridad, asegúrate de instalar correctamente
              el tapete del conductor.
            </Text>
            <Text>
            •  Ten en cuenta que los tapetes son piezas de desgaste, que están
              sujetas a cambio, según el estado en que se encuentren.
            </Text>
            <Text>•  Usa siempre tapetes genuinos Toyota.</Text>{" "}
            <Text>
            •  Verifica que los tapetes siempre estén asegurados con los pines de
              seguridad.
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <CampanaTapetesSlider />

      <Flex
        direction={{ base: "column" }}
        gap={{ base: "51px", xl: "116px" }}
        alignItems={{ base: "center" }}
        padding={{ base: "2.5rem 1.31rem 59.66px", xl: "116px 1rem 156px" }}
      >
        <Heading
          level={2}
          fontFamily={{base:"var(--font-toyotaDisplay)", xl:"var(--font-ToyotaType-Regular)"}}
          color={"black"}
          textAlign={{ base: "center" }}
          fontSize={{ base: "2rem", xl: "56px" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "130%", xl: "110%" }}
          letterSpacing={{ base: "0", xl: "-2px" }}
          width={{ base: "16ch", xl: "auto" }}
        >
            <>
              Ejemplos de
              <br />
              instalación incorrecta:
            </>

        </Heading>

        <Grid
          templateColumns={{ base: "1fr", xl: "repeat(3, 1fr)" }}
          gap={{ base: "2.04rem", xl: "10.9rem" }}
          width={"min(100%, 76.25rem)"}
        >
          {examples.map((example) => (
            <Flex
              key={example.title}
              direction={{ base: "column" }}
              gap={{ base: "1.81rem" }}
              alignItems={{ base: "center" }}
            >
              <Heading
                level={3}
                fontFamily={"var(--font-ToyotaType-Regular)"}
                color={"black"}
                textAlign={{ base: "center" }}
                fontSize={{ base: "1.375rem", xl: "22px" }}
                fontWeight={{ base: "700" }}
                lineHeight={{ base: "1.9375rem", xl:"100%" }}
                letterSpacing={{ base: "0", xl: "0" }}
              >
                {example.title}
              </Heading>

              {isMobile ? (
                <Image
                  {...example.image.mobile}
                  alt="Image"
                  width={"270px"}
                  height={"247.33575439453125px"}
                />
              ) : (
                <Image
                  {...example.image.desktop}
                  width={"290px"}
                  height={"266px"}
                  alt="Image"
                />
              )}
            </Flex>
          ))}
        </Grid>
      </Flex>
    </View>
  );
}
