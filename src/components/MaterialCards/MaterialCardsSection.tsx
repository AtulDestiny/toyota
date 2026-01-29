import { useState } from "react";

import Container from "@/components/Layout/Container/Container";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import { MaterialCard } from "@/components/MaterialCards/MaterialCards";
import { colors } from "@/theme/colors";
import "@aws-amplify/ui-react/styles.css";

import { Card, Collection, Flex, Heading, Image } from "@aws-amplify/ui-react";

export const MaterialCardsSection = ({
  items,
  containerBackground,
  title,
  logo,
}: {
  items: MaterialCard[];
  containerBackground: string;
  title?: string;
  logo?: { src: string; alt: string };
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <Container
      backgroundColor={containerBackground}
      padding={{ base: "22px 0 4.125rem", xl: "3.625rem 0 96px" }}
    >
      {title ? (
        <SectionTitle
          title={title}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Materiales Descargables"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
      ) : (
        <></>
      )}

      {logo ? (
        <>
          <Flex justifyContent={"center"}>
            <Image {...logo} />
          </Flex>
          <SectionTitle
            subtitle={"Materiales Descargables"}
            textAlign={{ base: "center"  }}
            subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
          />
        </>
      ) : (
        <></>
      )}

      <Collection
        type="grid"
        items={items}
        autoFlow={"column"}
        autoColumns={{ base: "15.875rem" }}
        justifyContent={{  base: items.length === 1 ? "center" : "flex-start", xl: "center" }}
        overflow={"auto"}
        marginTop={{ base: "32.2px" }}
      >
        {(item, index) => (
          <a
            key={index}
            href={item.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Card
              height={{ base: "14.6875rem", xl: "16.6875rem" }}
              padding="0"
              paddingTop={
                hoveredIndex === index
                  ? "0"
                  : { base: "2.1875rem", xl: "1.4375rem" }
              }
              backgroundColor={colors.theme.blueSecondary}
              onMouseEnter={() => setHoveredIndex(index)}
              onTouchStart={() => setHoveredIndex(index)}
              style={{
                transition: "padding-top 0.2s ease",
                cursor: "pointer",
                height: "100%",
              }}
            >
              <Flex
                backgroundColor={item.bgColor}
                height={"100%"}
                direction={"column"}
                justifyContent={"space-between"}
                padding={{
                  base: "1.25rem 2.3125rem 2.0625rem 1.25rem",
                  xl: "1.4375rem 2.625rem 2.125rem 1.4375rem",
                }}
              >
                <Heading
                  level={5}
                  color={item.txtColor}
                  fontSize={{ base: "ml" }}
                  lineHeight={{ base: "normal" }}
                  fontWeight={"400"}
                >
                  {item.title}
                </Heading>

                <Flex justifyContent={"space-between"} alignItems={"flex-end"}>
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    // width={{ base: "2.1875rem", xl: "2.625rem" }}
                  />
                  <Image
                    src="/images/icons/rigth-arrow-white.svg"
                    alt="rigth-arrow"
                    width={{ base: ".9375rem", xl: "1.0625rem" }}
                    height={{ base: "1.5rem", xl: "1.6875rem" }}
                  />
                </Flex>
              </Flex>
            </Card>
          </a>
        )}
      </Collection>
    </Container>
  );
};
