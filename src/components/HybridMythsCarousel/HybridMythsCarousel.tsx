"use client";
import { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Button,
  Flex,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import { motion, AnimatePresence } from "framer-motion";

interface Myth {
  title: string;
  description: string;
  image: string;
}

interface HybridMythsCarouselProps {
  data?: Myth[] | null;
  header?: string;
  subHeader?: string;
  subDescription?: string;
  paddingTop?: string | { base?: string; xl?: string };
  paddingContainer?: string | { base?: string; xl?: string };
  TitlemarginBottom?: string | object;
  TextParagraphHeight?: string | object;
  ViewMaxHeight?: string | object;
}

const defaultMyths: Myth[] = [
  {
    title:
      "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
    description:
      "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
    image: "/images/Desmintiendo.png",
  },
  {
    title:
      "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
    description:
      "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
    image: "/images/Desmintiendo.png",
  },
  {
    title:
      "Es más costoso el consumo de electricidad/gasolina que sólo gasolina o diesel",
    description:
      "En realidad el consumo es mucho menor, porque los vehículos híbridos utilizan cada una de las fases de la conducción para generar energía, ya sea eléctrica, recargando la batería con el movimiento de las ruedas, o la inercia, apagando los motores cuando el vehículo no precisa otro impulso.",
    image: "/images/Desmintiendo.png",
  },
  {
    title: "No sirven para viajes largos",
    description:
      "Los híbridos son perfectamente capaces de hacer trayectos largos con ahorro de combustible.",
    image: "/images/Desmintiendo.png",
  },
  {
    title: "Tardan mucho en recargarse",
    description:
      "Muchos híbridos no se enchufan, se recargan automáticamente al conducir.",
    image: "/images/Desmintiendo.png",
  },
];

const MotionFlex = motion(Flex);

export function HybridMythsCarousel({
  data,
  header = "Desmintiendo mitos sobre los Híbridos",
  subHeader = "Híbridos",
  subDescription,
  paddingTop,
  paddingContainer,
  TitlemarginBottom,
  TextParagraphHeight,
  ViewMaxHeight,
}: HybridMythsCarouselProps): JSX.Element {
  const myths: Myth[] = data && data.length > 0 ? data : defaultMyths;
  const [itemsPerPage, setItemsPerPage] = useState<number>(1);

  const responsiveItems = useBreakpointValue({ base: 1, medium: 3 }) as
    | number
    | undefined;
  const safeItemsPerPage = Number(itemsPerPage);
  const maxPage =
    safeItemsPerPage > 0 ? Math.ceil(myths.length / safeItemsPerPage) : 1;

  const [page, setPage] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  // const safeItemsPerPage = Number(itemsPerPage);

  // const maxPage = Math.ceil(myths.length / safeItemsPerPage);
  const startIndex = page * safeItemsPerPage;
  const endIndex = startIndex + safeItemsPerPage;
  const paginatedMyths = myths.slice(startIndex, endIndex);

  const paginate = (newDirection: 1 | -1) => {
    setDirection(newDirection);
    setPage((prev) => (prev + newDirection + maxPage) % maxPage);
  };

  useEffect(() => {
    if (responsiveItems != null) {
      setItemsPerPage(responsiveItems);
      setPage(0);
    }
  }, [responsiveItems]);
  return (
    <View
      textAlign="center"
      padding={paddingContainer ?? { base: "2rem 15px 62px 15px", xl: "2rem" }}
      paddingTop={paddingTop ?? { base: "63px", xl: "186px" }}
      maxHeight={
        ViewMaxHeight && typeof ViewMaxHeight === "object"
          ? ViewMaxHeight
          : undefined
      }
    >
      <Text
        textAlign={{
          base: "left",
          xl: "center",
        }}
        fontFamily={{
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-ToyotaType-Regular)",
          xl: "var(--font-ToyotaType-Regular)",
        }}
        fontStyle={{
          base: "normal",
          medium: "normal",
          xl: "normal",
        }}
        fontWeight={{
          base: "400",
          medium: "400",
          xl: "400",
        }}
        alignSelf={{
          base: "",
          medium: "",
          xl: "strech",
        }}
        lineHeight={{
          base: "140%",
          medium: "normal",
          xl: "100%",
        }}
        fontSize={{
          base: "14px",
          xl: "18px",
        }}
        display={subHeader === "" ? "none" : "block"}
        style={{ verticalAlign: "middle" }}
        letterSpacing={{ base: "0px", xl: "" }}
      >
        {subHeader}
      </Text>
      <Text
        textAlign={{
          base: "left",
          xl: "center",
        }}
        fontFamily={{
          base: "var(--font-toyotaDisplay)",
          medium: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        }}
        fontWeight={{
          base: "400",
          medium: "400",
          xl: "400",
        }}
        fontSize={{
          base: "32px",
          xl: "56px",
        }}
        lineHeight={{
          base: "130%",
          medium: "normal",
          xl: "100%",
        }}
        letterSpacing={{
          base: "0px",
          medium: "0px",
          xl: "0px",
        }}
        margin={{
          base: "",
          xl: "10px 0px 0px",
        }}
        marginBottom={TitlemarginBottom ? TitlemarginBottom : "2rem"}
        style={{ verticalAlign: "center" }}
        display={header === "" ? "none" : "block"}
      >
        {header}
      </Text>
      {subDescription && (
        <Text
          fontWeight="400"
          textAlign={{
            base: "left",
            xl: "center",
          }}
          marginBottom="96.77px"
        >
          {subDescription}
        </Text>
      )}

      <View
        position="relative"
        height="auto"
        minHeight={
          TextParagraphHeight
            ? TextParagraphHeight
            : {
                base: "490px",
              }
        }
        // overflow="hidden"
        marginTop={
          subDescription === "" ? { base: "45px", xl: "96px" } : "relative.xl"
        }
        marginBottom={
          TitlemarginBottom && TitlemarginBottom !== ""
            ? ""
            : { base: "2rem", medium: "2rem" }
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <MotionFlex
            key={page}
            // position="absolute"
            top="0"
            left="0"
            right="0"
            justifyContent="space-evenly"
            // wrap="wrap"
            gap={{
              base: "4rem",
              medium: "4rem",
              large: "4rem",
              xl: "97px",
              xxl: "97px",
            }}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {paginatedMyths.map((myth, index) => (
              <View
                key={index}
                width={itemsPerPage === 1 ? "100%" : "445px"}
                maxWidth={{
                  base: "300px",
                  medium: "300px",
                  large: "350px",
                  xl: "445px",
                  xxl: "445px",
                }}
                textAlign="left"
              >
                <Image
                  src={myth.image}
                  alt={`Imagen del mito ${index + 1}`}
                  borderRadius="1rem"
                  marginBottom={{ base: "25px", xl: "1rem" }}
                  objectFit="cover"
                  width="100%"
                  minWidth={{ base: "", xl: "300px", xxl: "445px" }}
                  minHeight={{ base: "240px", xl: "200.46px", xxl: "344.46px" }}
                  height="200px"
                />
                <Text
                  marginBottom="28px"
                  textAlign={{
                    base: "left",
                    xl: "left",
                  }}
                  fontFamily={{
                    base: "var(--font-toyotaDisplay)",
                    medium: "var(--font-toyotaDisplay)",
                    xl: "var(--font-ToyotaType-Regular)",
                  }}
                  fontWeight={{
                    base: "400",
                    medium: "400",
                    xl: "400",
                  }}
                  fontSize={{
                    base: "18px",
                    xl: "18px",
                  }}
                  lineHeight={{
                    base: "100%",
                    medium: "normal",
                    xl: "100%",
                  }}
                  letterSpacing={{
                    base: "0px",
                    medium: "0px",
                    xl: "0px",
                  }}
                  style={{ verticalAlign: "middle" }}
                >
                  {myth.title}
                </Text>
                <Text
                  color={{ base: "#000000", xl: "gray" }}
                  fontFamily={{
                    base: "var(--font-toyotaDisplay)",
                    medium: "var(--font-toyotaDisplay)",
                    xl: "var(--font-toyotaDisplay)",
                  }}
                  fontWeight={{
                    base: "400",
                    medium: "400",
                    xl: "400",
                  }}
                  fontSize={{
                    base: "14px",
                    xl: "14px",
                  }}
                  lineHeight={{
                    base: "140%",
                    medium: "normal",
                    xl: "140%",
                  }}
                  letterSpacing={{
                    base: "0px",
                    medium: "0px",
                    xl: "0px",
                  }}
                  style={{ verticalAlign: "middle" }}
                >
                  {myth.description}
                </Text>
              </View>
            ))}
          </MotionFlex>
        </AnimatePresence>
      </View>

      <Flex
        justifyContent={{ base: "space-around", xl: "center" }}
        marginBottom={{
          base: "62px",
          xl: "97px",
          xxl: "97px",
        }}
        alignItems="center"
        gap={{ base: "2rem", xl: "3rem" }}
        marginTop={{
          base: "25px",
          medium: "40px",
          large: "40px",
          xl: "96.77px",
          xxl: "96.77px",
        }}
        maxHeight="30px"
      >
        <Button
          backgroundColor={"#000"}
          color={"fff"}
          onClick={() => paginate(-1)}
          variation="link"
          size="small"
          width="50px"
          height="30px"
          padding="0"
          minWidth="50px"
          minHeight="30px"
        >
          <Image
            src="/images/arrow-simple-prev.svg"
            alt="arrow-icon"
            width="1.3125rem"
            height="0.8125rem"
            objectFit="contain"
          />
        </Button>
        <Text
          textAlign={{ base: "center", xl: "center" }}
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            medium: "var(--font-toyotaDisplay)",
            xl: "var(--font-toyotaDisplay)",
          }}
          fontWeight={{
            base: "400",
            medium: "400",
            xl: "400",
          }}
          fontSize={{
            base: "18px",
            xl: "18px",
          }}
          lineHeight={{
            base: "normal",
            medium: "normal",
            xl: "100%",
          }}
          letterSpacing={{
            base: "0px",
            medium: "0px",
            xl: "0px",
          }}
          style={{ verticalAlign: "middle" }}
        >
          {page + 1} de {data?.length}
        </Text>
        <Button
          backgroundColor={"#000"}
          color={"fff"}
          onClick={() => paginate(1)}
          variation="link"
          size="small"
          width="50px"
          height="30px"
          padding="0"
          minWidth="50px"
          minHeight="30px"
        >
          <Image
            src="/images/arrow-simple-next.svg"
            alt="arrow-icon"
            width="1.3125rem"
            height="0.8125rem"
            objectFit="contain"
          />
        </Button>
      </Flex>
    </View>
  );
}
