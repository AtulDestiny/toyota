"use client";
import { colors } from "@/theme/colors";
import { Card, Collection, Flex, Heading, Image } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";

export interface MaterialCard {
  title: string;
  imageSrc: string;
  alt: string;
  bgColor: string;
  txtColor: string;
  downloadUrl?: string;
}

export const MaterialCards = ({ items }: { items: MaterialCard[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <Collection
      type="grid"
      items={items}
      templateColumns={{
        base: "repeat(3, 15.875rem)",
        xl: "repeat(19.375rem)",
      }}
      justifyContent={{ xl: "center" }}
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
                level={3}
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
  );
};

export default MaterialCards;
