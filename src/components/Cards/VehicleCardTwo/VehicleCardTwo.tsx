"use client";

import Button from "@/components/Layout/Button/Button";
import { Card, Heading, Image, Link, Text, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import "./VehicleCardTwo.css";

interface VehicleCardTwoProps {
  imageSrc: string;
  title: string;
  price?: string;
  description: string;
  buttonText: string;
  link: string;
  data?: VehicleCard["models"]["items"][number];
}

export type VehicleCard = {
  id: string;
  name: string;
  slug: string;
  models: {
    items: {
      id: string;
      name: string;
      slug: string;
      ModelAttrib: {
        items: {
          name: string;
          value: string;
          key: string;
        }[];
      };
    }[];
  };
};

export const VehicleCardTwo = ({
  imageSrc,
  title,
  price,
  description,
  buttonText,
  link,
  data,
}: VehicleCardTwoProps) => {
  const [model, setModel] = useState<
    VehicleCard["models"]["items"][number] | null
  >(data || null);

  useEffect(() => {
    if (data) {
      setModel(data);
    }
  }, [data]);

  const attributes: {
    name: string;
    value: string;
  }[] = [
    {
      name: "Motor",
      value:
        model?.ModelAttrib.items
          .find((attribute) => attribute.key === "engine")
          ?.value.replace("Motor ", "") || "No disponible",
    },
    {
      name: "Velocidades",
      value:
        model?.ModelAttrib.items.find((attribute) => attribute.key === "speeds")
          ?.value || "No disponible",
    },
    {
      name: "Puertas",
      value: `${
        model?.ModelAttrib.items.find((attribute) => attribute.key === "doors")
          ?.value || 0
      } puertas`,
    },
    {
      name: "Pasajeros",
      value: `Capacidad de ${
        model?.ModelAttrib.items.find(
          (attribute) => attribute.key === "passengers"
        )?.value || 0
      } pasajeros`,
    },
  ];

  console.log(model);
  return (
    <Card
      width={"100%"}
      maxWidth={"28.125rem"}
      fontFamily="var(--font-ToyotaType-Regular)"
      padding={{ base: "0 .0625rem 0 0", large: ".9375rem" }}
    >
      <View marginBottom={{ base: "1.25rem", xl: "1.75rem" }}>
        <Image
          src={imageSrc}
          alt={title}
          marginBottom={{ base: "1.4375rem", xl: "1.3125rem" }}
        />
        <Text
          fontSize={{ base: "xs", xl: "ss" }}
          lineHeight={{ base: "normal" }}
          textAlign={"center"}
        >
          *Imágenes de referencia
        </Text>
      </View>
      <View
        paddingRight={{ base: "2.0625rem" }}
        style={{ borderRight: "1px solid #58595B" }}
      >
        <Heading
          level={3}
          fontSize={{ base: "ml", xl: "lg" }}
          lineHeight={{ base: "normal", xl: "130%" }}
          marginBottom={{ base: "1rem", xl: "1.375rem" }}
          style={{
            fontWeight: 400,
            whiteSpace: "pre-line",
          }}
        >
          {title}
        </Heading>
        {price && (
          <View marginBottom={{ base: "1.125rem", xl: "1rem" }}>
            <Text
              fontSize={{ base: "ml" }}
              lineHeight={{ base: "109.09%" }}
              fontWeight={"700"}
            >
              {price}
            </Text>
            <Text
              fontSize={{ base: "xs", xl: "ss" }}
              lineHeight={{ base: "normal" }}
            >
              *Precio sugerido al público desde:
            </Text>
          </View>
        )}
        <Text
          fontSize={{ base: "ss", xl: "sm" }}
          lineHeight={{ base: "normal" }}
          marginBottom={{ base: "1.25rem", xl: "1.6875rem" }}
        >
          {attributes ? (
            <ul style={{ listStyle: "disc" }}>
              {attributes.map((attribute) => (
                <li style={{ marginLeft: "1rem" }} key={attribute.name}>
                  <span>{attribute.name}: </span> <span>{attribute.value}</span>
                </li>
              ))}
            </ul>
          ) : (
            description
          )}
        </Text>
        <Link href={link}>
          <Button
            type="button"
            color="black"
            textColor="white"
            padding="10px 0px"
            className="responsive-button"
            style={{
              width: "182px",
              lineHeight: "1.25rem",
              letterSpacing: "0.1px",
            }}
          >
            {buttonText}
          </Button>
        </Link>
      </View>
    </Card>
  );
};

export default VehicleCardTwo;
