"use client";
import { MantenimientoOficialBanner } from "@/components/MantenimientoOficialBanner/MantenimientoOficialBanner";
import {
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import "./page.css";

export default function MantenimientoOficialPage(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const types = [
    {
      title: "Mantenimiento Planeado",
      image: {
        mobile: {
          src: "/images/mantenimiento-oficial-planeado.png",
          alt: "Mantenimiento Planeado",
        },
        desktop: {
          src: "/images/mantenimiento-oficial-planeado--desktop.png",
          alt: "Mantenimiento Planeado",
        },
      },
      description:
        "Tenemos mil razones para que vayas por más a bordo de tu Toyota.",
      link: "/mi-toyota/mantenimiento/planeado",
    },
    {
      title: "Mantenimiento Express",
      image: {
        mobile: {
          src: "/images/mantenimiento-oficial-express.png",
          alt: "Mantenimiento Express",
        },
        desktop: {
          src: "/images/mantenimiento-oficial-express--desktop.png",
          alt: "Mantenimiento Express",
        },
      },
      description:
        "El mantenimiento Express, es ideal para clientes que buscan calidad, respaldo, eficiencia, comodidad y reducción en el tiempo de espera.",
      link: "/mi-toyota/mantenimiento/express",
    },
  ];

  return (
    <View>
      <MantenimientoOficialBanner />

      <Flex
        direction={{ base: "column" }}
        padding={{ base: "3.13rem 1rem 5rem", xl: "112px 1rem 7.56rem" }}
        alignItems={{ base: "center" }}
        gap={{ base: "50px", xl: "7.38rem" }}
      >
        <Flex direction={{ base: "column" }} gap={{ base: "10px", xl: "20px" }}>
          <Heading
            level={2}
            fontFamily={"var(--font-toyotaDisplay)"}
            color={"black"}
            textAlign={{ base: "left", xl: "center" }}
            fontSize={{ base: "0.875rem", xl: "1.375rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "140%", xl: "100%" }}
            letterSpacing={"0"}
          >
            Mantenimientos oficiales Toyota
          </Heading>
          <Text
            fontFamily={{
              base: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-toyotaDisplay)",
            }}
            color={"black"}
            textAlign={{ base: "left", xl: "center" }}
            fontSize={{ base: "1.375rem", xl: "2rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "normal", xl: "130%" }}
            maxWidth={{ xl: "41ch" }}
            letterSpacing={"0"}
          >
            Realiza los mantenimiento en nuestros concesionarios autorizados de
            la red y asegura el correcto funcionamiento de tu vehículo.
          </Text>
        </Flex>

        <Grid
          templateColumns={{ xl: "repeat(2, 1fr)" }}
          gap={{ base: "30px", xl: "12.19rem" }}
          maxWidth={"min(87.3125rem, 100%)"}
        >
          {types.map((type, index) => (
            <Flex
              key={index}
              direction={{ base: "column" }}
              gap={{ base: "30px", xl: "1.5rem" }}
            >
              <Flex position={{ base: "relative" }}>
                <Image
                  src={
                    isMobile ? type.image.mobile.src : type.image.desktop.src
                  }
                  alt={type.image.mobile.alt}
                  width={{ base: "100%" }}
                  aspectRatio={{ base: "343 / 200" }}
                />
                <Heading
                  level={3}
                  position={{ base: "absolute" }}
                  top={"0"}
                  left={"0"}
                  right={"0"}
                  bottom={"0"}
                  margin={"auto"}
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  color={"white"}
                  textAlign={{ base: "center" }}
                  fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "100%", xl: "1.9375rem" }}
                  height={{ base: "min-content" }}
                >
                  {type.title}
                </Heading>
              </Flex>

              <Flex
                direction={{ base: "column" }}
                gap={{ base: "30px", xl: "2rem" }}
              >
                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  color={"black"}
                  textAlign={{ base: "left" }}
                  fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "normal", xl: "1.9375rem" }}
                >
                  {type.description}
                </Text>
                <Link
                  href={type.link}
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  color={"#D42224"}
                  textAlign={{ base: "left" }}
                  fontSize={{ base: "0.875rem" }}
                  fontWeight={{ base: "500" }}
                  lineHeight={{ base: "1rem" }}
                  textDecoration={"underline"}
                >
                  Conoce más
                </Link>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Flex>
    </View>
  );
}
