// src/components/News/News.tsx
"use client";
import { View, Flex, Text, Image, Grid, Link } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import "./News.css";
import Button from "../Layout/Button/Button";

type CardData = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  readingTime: string;
  title: string;
  description: string;
  link: string;
};

type viewStyle = {
  backgroundColor?: string;
  color?: string;
  BtnTextColor?: "white" | "black";
};

interface NewsProps {
  data?: CardData[] | null;
  subheader?: string;
  header?: string;
  viewStyle?: viewStyle | null;
  headerWidth?: string | object;
}

const defaultCards: CardData[] = [
  {
    id: "1",
    imageSrc: "/images/blog/blog-00101.png",
    imageAlt: "news-1",
    date: "enero de 2025",
    readingTime: "4 min",
    title: "Toyota Colombia impulsa sostenibilidad, innovación y seguridad",
    description:
      "Automotores Toyota Colombia prioriza la sostenibilidad, la innovación y la satisfacción del cliente, con metas claras hacia una movilidad más accesible, segura y respetuosa con el medio ambiente.",
    link: "/noticias/toyota-colombia-impulsa-sostenibilidad-innovacion-y-seguridad",
  },
  {
    id: "2",
    imageSrc: "/images/blog/blog-02-002.png",
    imageAlt: "news-2",
    date: "abril de 2025",
    readingTime: "4 min",
    title: "Combustible sintético: una apuesta de Toyota",
    description:
      "Toyota apuesta por combustibles sintéticos para un futuro sostenible en la Expo 2025 de Japón",
    link: "/noticias/combustible-sintetico-una-apuesta-de-toyota",
  },
  {
    id: "3",
    imageSrc: "/images/blog-img-thumb.png",
    imageAlt: "Bosque Toyota refuerza el compromiso ambiental de la marca.",
    date: "enero de 2025",
    readingTime: "4 min",
    title: "Bosque Toyota refuerza el compromiso ambiental de la marca.",
    description:
      "El proyecto de reforestación Bosque Toyota reafirma el compromiso de Automotores Toyota Colombia con el cuidado del entorno",
    link: "/noticias/bosque-toyota-refuerza-el-compromiso-ambiental-de-la-marca",
  },
  {
    id: "4",
    imageSrc: "/images/blog/blog-00104.png",
    imageAlt:
      "Toyota Colombia, premiada por seguridad, costos y sostenibilidad.",
    date: "abril de 2025",
    readingTime: "4 min",
    title: "Toyota Colombia, premiada por seguridad, costos y sostenibilidad.",
    description:
      "En su onceava edición, los Premios Vía destacan a Automotores Toyota Colombia por su apuesta en seguridad, costo de reparación y movilidad sostenible",
    link: "/noticias/toyota-colombia-premiada-por-seguridad-costos-y-sostenibilidad",
  },
  {
    id: "5", // Changed from "3" to "5" to ensure unique keys
    imageSrc: "/images/blog/blog-00101.png",
    imageAlt: "news-1",
    date: "enero de 2025",
    readingTime: "4 min",
    title: "Toyota Colombia impulsa sostenibilidad, innovación y seguridad",
    description:
      "Automotores Toyota Colombia prioriza la sostenibilidad, la innovación y la satisfacción del cliente, con metas claras hacia una movilidad más accesible, segura y respetuosa con el medio ambiente.",
    link: "/noticias/toyota-colombia-impulsa-sostenibilidad-innovacion-y-seguridad",
  },
  {
    id: "6", // Changed from "4" to "6" to ensure unique keys
    imageSrc: "/images/blog/blog-02-006.png",
    imageAlt: "news-2",
    date: "abril de 2025",
    readingTime: "4 min",
    title:
      "Automotores Toyota Colombia impulsa una movilidad sostenible y multiruta en Latam Mobility 2025",
    description:
      "Reafirmando su visión de movilidad sostenible a través de su estrategia “Multipath” o multiruta.",
    link: "/noticias/combustible-sintetico-una-apuesta-de-toyota",
  },
];

export const News = ({
  data,
  subheader = "Noticias",
  header = "Nuevas Historias",
  viewStyle,
  headerWidth,
}: NewsProps) => {
  const finalCards = data && data.length > 0 ? data : defaultCards;
  console.log("viewStyle", viewStyle);

  const [isDesktop, setIsDesktop] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3);

  const handleResize = () => {
    const screenWidth = window?.innerWidth;
    setIsDesktop(screenWidth >= 1024);
    setCardsToShow(screenWidth >= 1024 ? 6 : 3);
  };

  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <View
        padding={{
          base: "4.375rem .9375rem 4.875rem",
          xl: "3.125rem 3.5rem 3.5rem",
        }}
        backgroundColor={viewStyle?.backgroundColor ?? undefined}
        backgroundImage={
          !viewStyle?.backgroundColor
            ? "linear-gradient(178.06deg, #E7EDF1 52.85%, #F4F7F9 98.36%)"
            : undefined
        }
        color={viewStyle?.color ?? "#000"}
      >
        <View maxWidth={"min(95.625rem, 100%)"} margin={"0 auto"}>
          <View
            textAlign={{ base: "start", xl: "center" }}
            marginBottom={{ base: "16px", xl: "5.375rem" }}
          >
            {subheader && (
              <Text
                fontSize={{ base: "sm", xl: "md" }}
                fontWeight={400}
                color={viewStyle?.color ?? "#000"}
                lineHeight={{ base: "140%", xl: "" }}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-ToyotaType-Regular)",
                }}
                letterSpacing={{ base: "0px", xl: "" }}
                style={{ verticalAlign: "middle" }}
              >
                {subheader}
              </Text>
            )}
            <Text
              fontSize={{ base: "lg", xl: "xxxxl" }}
              lineHeight={{ base: "130%", xl: "61.6px" }}
              letterSpacing={{ base: "0px", xl: "-2%" }}
              fontWeight={400}
              color={viewStyle?.color ?? "#000"}
              fontFamily={{
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-ToyotaType-Regular)",
              }}
              maxWidth={
                typeof headerWidth === "object"
                  ? headerWidth
                  : {
                      base: headerWidth !== undefined ? headerWidth : "80%",
                      xl: "100%",
                    }
              }
              style={{ verticalAlign: "middle" }}
            >
              {header}
            </Text>
          </View>
          <Grid
            columnGap="1.3125rem"
            rowGap={{ base: "39px", xl: "5.625rem" }}
            templateColumns={{
              base: "1fr 1fr",
              xl: "repeat(4, 1fr)",
              xxl: "repeat(4, 22.82881rem)",
            }}
            marginBottom={{ base: "41px", xl: "3.0625rem" }}
          >
            {finalCards.slice(0, cardsToShow).map((card, index) => {
              const isHighlight = isDesktop ? index < 2 : index === 0;

              return (
                <Flex
                  key={card.id}
                  className={isHighlight ? "grid--highlight" : ""}
                  padding={"0"}
                  backgroundColor="transparent"
                  direction={"column"}
                  width={{
                    base: "auto",
                    xxl: isHighlight ? "fit-content" : "367px",
                  }}
                  gap={{ base: "0px" }}
                >
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    marginBottom={{ base: isHighlight ? "16px" : "26px" }}
                    height={{
                      base: isHighlight ? "auto" : "100px",
                      medium: isHighlight ? "160px" : "200px",
                      xl: isHighlight ? "376px" : "210px",
                    }}
                    minWidth={{
                      base: isHighlight ? "" : "",
                      medium: isHighlight ? "" : "",
                      xl: isHighlight ? "auto" : "auto",
                      xxl: isHighlight ? "755px" : "auto",
                    }}
                    objectFit={"cover"}
                    // maxHeight={{ base: isHighlight ? "160px" : "auto" }}
                    // minHeight={{ xl: "210px" }}
                    borderRadius={{ base: isHighlight ? "8px" : "8px" }}
                  />
                  <Flex
                    marginBottom={{ base: "8px", xl: "20px" }}
                    alignItems="center"
                  >
                    <Text
                      fontWeight={400}
                      fontFamily="var(--font-ToyotaType-Regular)"
                      fontSize={{
                        base: "12px",
                        xl: isHighlight ? "18px" : "12px",
                      }}
                      fontStyle={{ xl: "normal" }}
                      lineHeight={{ xl: "normal" }}
                      color={viewStyle?.color ?? "#000"}
                    >
                      {card.date}
                    </Text>
                    <Text
                      fontWeight={400}
                      fontFamily={{
                        base: "var(--font-ToyotaType-Regular)",
                        xl: isHighlight
                          ? "var(--font-toyotaDisplay)"
                          : "var(--font-ToyotaType-Regular)",
                      }}
                      fontSize={{
                        base: "12px",
                        xl: isHighlight ? "14px" : "12px",
                      }}
                      lineHeight={{ xl: "19.6px" }}
                      color={viewStyle?.color ?? "#58595B"}
                    >
                      <Image
                        src="/images/icons/clock.png"
                        alt="clock"
                        marginRight={".3125rem"}
                        width={".625rem"}
                        style={{ filter: "invert(1)" }}
                      />
                      {card.readingTime}
                    </Text>
                  </Flex>
                  <View marginBottom={{ base: isHighlight ? "14px" : "20px" }}>
                    <Text
                      fontWeight={400}
                      fontFamily={
                        isHighlight
                          ? "var(--font-ToyotaType-Regular)"
                          : "var(--font-ToyotaType-Regular)"
                      }
                      fontSize={{
                        base: isHighlight ? "22px" : "14px",
                        xl: isHighlight ? "22px" : "18px",
                      }}
                      color={viewStyle?.color ?? "#000"}
                      width={{
                        base: isHighlight ? "80%" : "",
                        xl: isHighlight ? "" : "",
                      }}
                      lineHeight={{ base: "100%" }}
                      letterSpacing={{ base: "0px" }}
                      marginBottom="10px"
                    >
                      {card.title}
                    </Text>
                    <Text
                      fontWeight={400}
                      fontFamily={{
                        base: "var(--font-ToyotaDisplay)",
                        xl: isHighlight
                          ? "var(--font-ToyotaType-Regular)"
                          : "var(--font-toyotaDisplay)",
                      }}
                      display={{ base: "none", xl: "block" }}
                      fontSize={{
                        base: ".875rem",
                        xl: isHighlight ? "16px" : "14px",
                      }}
                      color={viewStyle?.color ?? "#000"}
                      lineHeight={isHighlight ? "19.6px" : "140%"}
                      maxHeight="40px"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {card.description}
                    </Text>
                  </View>
                  <Link
                    href={card.link}
                    color={"#D42224"}
                    textDecoration={"underline"}
                    fontFamily="var(--font-roboto)"
                    fontSize={{ base: "14px", xl: "16px" }}
                    fontWeight={500}
                    marginTop={{ base: "auto", xl: "18px" }}
                  >
                    Leer más
                  </Link>
                </Flex>
              );
            })}
          </Grid>
          <Link href="/noticias">
            <Button
              type="button"
              textColor={
                viewStyle?.BtnTextColor ? viewStyle?.BtnTextColor : "black"
              }
              fontFamily="var(--font-roboto)"
              lineHeight={{ xl: "20px" }}
              maxWidth={{ base: "163px", xl: "" }}
              maxHeight={{ base: "40px", xl: "" }}
              backgroundColor="black"
              border="solid white 1px "
              style={{
                width: "290px",
                border: "1px solid black",
                height: "100%", // Corrected: removed comma inside string, added comma after value
                color: "#000", // Corrected: changed #OOO to #000
                maxHeight: "3.125rem",
                display: "block",
                margin: "0 auto",
                padding: "10px 24px",
                textAlign: "center",
                fontSize: "sm",
                borderRadius: "999px",
                borderColor: "black",
                fontWeight: 400,
              }}
            >
              Descubre más
            </Button>
          </Link>
        </View>
      </View>
    </>
  );
};

export default News;
