"use client";

import { CatalogoPostventaBanner } from "@/components/CatalogPostventaBanner/CatalogoPostventaBanner";
import { Option, Select, SelectTheme } from "@/components/Layout/Select/Select";
import {
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Tabs,
  Text,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import "swiper/css";
import "./page.css";

export type VehicleCategory = "Autos" | "Camionetas" | "Pick Ups" | "Ver todos";

export interface VehicleCardProps {
  id: number;
  name: string;
  img: string;
  link: string;
}

const spareParts: Record<VehicleCategory, VehicleCardProps[]> = {
  Autos: [],
  Camionetas: [],
  "Pick Ups": [],
  "Ver todos": [],
};

spareParts["Ver todos"] = Object.keys(spareParts)
  .filter((category) => category !== "Ver todos")
  .reduce((allVehicles, category) => {
    return allVehicles.concat(spareParts[category as VehicleCategory]);
  }, [] as VehicleCardProps[]);

export interface CatalogoPostventaProps {
  title: string;
  subtitle: string;
  description: string;
  type: string;
  items?: Record<VehicleCategory, VehicleCardProps[]>;
}

export default function CatalogoPostventa({
  title,
  subtitle,
  description,
  type,
  items = spareParts,
}: CatalogoPostventaProps): JSX.Element {
  const [tab, setTab] = useState<VehicleCategory>("Camionetas");
  const [vehicles, setVehicles] = useState<VehicleCardProps[]>([]);

  useEffect(() => {
    setVehicles(items[tab] || []);
  }, [tab, items]);

  const vehicleCategories: Option[] = Object.keys(spareParts).map(
    (category) => ({
      value: category,
      label: category,
    })
  );

  return (
    <>
      <style>
        {`
        @media (max-width: 720px) {
        .css-1d62fnp-control{
        height: 48px !important;

        .css-hlgwow{
        height: 100% !important;
        }
        .css-1qrxvr1-singleValue{
        position:relative !important;
        top:-2px;
        line-height:120% !important;
        letter-spacing:0 !important;
        }

        .css-tj5bde-Svg{
        height:24px !important;
        width:24px !important;}
        }
        }
    `}
      </style>
      <View>
        <CatalogoPostventaBanner
          slides={[
            {
              imageMobile: "/images/banner-repuestos-mobile.jpg",
              imageDesktop: "/images/banner-repuestos-desk.jpg",
              title: "",
              titleSecondLine: "",
              button: "de cada parte de tu vehículo",
              showButton: false,
            },
          ]}
        />

        <Flex
          direction={{ base: "column" }}
          alignItems={{ base: "center" }}
          gap={{ base: "1.5rem", xl: "3.25rem" }}
          padding={{
            base: "40px 21px 72px 21px",
            xl: "120px 2rem 120px",
          }}
        >
          <Heading
            level={2}
            fontFamily={{
              base: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            }}
            color={"black"}
            textAlign={{ base: "center" }}
            fontSize={{ base: "2rem", xl: "3.5rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "130%", xl: "110%" }}
            letterSpacing={{ base: "0", xl: "-0.07rem" }}
            maxWidth={{ base: "14ch", xl: "100%" }}
          >
            {title}
          </Heading>

          <View
            textAlign={{ base: "center" }}
            maxWidth={{ base: "100vw", xl: "100vw" }}
          >
            {description.split("\\n").map((line, index) => (
              <Text
                key={index}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-toyotaDisplay)",
                }}
                color={"#58595B"}
                textAlign={{ base: "center" }}
                fontSize={{ base: "1.125rem", xl: "2rem" }}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal", xl: "130%" }}
                padding={{ base: "0 1.69rem", xl: "0" }}
                display="block"
              >
                {line}
              </Text>
            ))}
          </View>
        </Flex>

        <View
          className="vehicles-tabs"
          padding={{ base: "0 1rem 3.56rem", xl: "0 2rem 123px" }}
        >
          <Text
            fontFamily={{
              base: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-toyotaDisplay)",
            }}
            fontSize={{ base: "18px", xl: "32px" }}
            lineHeight="130%"
            letterSpacing={"0"}
            textAlign="center"
            fontWeight={400}
            color="black"
          >
            {subtitle}
          </Text>
          <Tabs.Container
            defaultValue={tab}
            onValueChange={(value) => {
              setTab(value as unknown as VehicleCategory);
              setVehicles(spareParts[value as unknown as VehicleCategory]);
            }}
          >
            <View
              margin={{ base: "13px auto 3.63rem" }}
              display={{ base: "block", xl: "none" }}
              className="custom-select-container"
            >
              <Select
                options={vehicleCategories.map((opt) =>
                  opt.value === "Camionetas"
                    ? { ...opt, label: "Camionetas y SUV" }
                    : opt
                )}
                selectedOption={tab ? { value: tab, label: tab } : null}
                onSelect={(selected) => {
                  const value = selected?.value;
                  setTab(value as unknown as VehicleCategory);
                  setVehicles(spareParts[value as unknown as VehicleCategory]);
                }}
                theme={SelectTheme.Light}
              />
            </View>
            <Tabs.List
              justifyContent="center"
              width="max-content"
              direction={{ base: "column", xl: "row" }}
              margin={{ base: "32px auto 43px", xl: "2rem auto 5.68rem" }}
              value={tab}
              display={{ base: "none", xl: "flex" }}
            >
              {(Object.keys(spareParts) as VehicleCategory[]).map(
                (category) => (
                  <Tabs.Item
                    key={category}
                    value={category}
                    color="inherit"
                    fontSize={{ base: "sm", xl: "md" }}
                    className="tabs__item"
                    fontWeight={400}
                    lineHeight={"100%"}
                    fontFamily="var(--font-ToyotaType-Regular)"
                  >
                    {category}
                  </Tabs.Item>
                )
              )}
            </Tabs.List>
            {Object.keys(spareParts).map((category) => (
              <Tabs.Panel
                key={category + "1"}
                value={category}
                padding={{ base: "0", xl: "0 0 0 40px" }}
              >
                {vehicles.length > 0 ? (
                  <Grid
                    key={category + "2 "}
                    templateColumns={{ base: "repeat(2, 1fr)" }}
                    columnGap={{ base: "1.25rem" }}
                    rowGap={{ base: "1.5rem", xl: "1.56rem" }}
                    display={{ xl: "flex" }}
                    justifyContent={{ xl: "center" }}
                    maxWidth={{ xl: "76.3125rem" }}
                    margin={{ xl: "0 auto" }}
                    style={{ flexWrap: "wrap" }}
                  >
                    {vehicles.map((vehicle) => (
                      <Link
                        key={vehicle.id}
                        href={vehicle.link + `&type=${type}`}
                      >
                        <Flex
                          direction={{ base: "column" }}
                          gap={{ base: "0.9rem" }}
                          alignItems={{ base: "center" }}
                          justifyContent={{ base: "center" }}
                          padding={{
                            base: "0.6rem 1.13rem 0.75rem",
                            xl: "0.84rem 2.1rem 1.1rem",
                          }}
                          backgroundColor={{ base: "#F6F6F6" }}
                          borderRadius={{ base: "0.23556rem" }}
                          width={{ base: "163px", xl: "auto" }}
                          height={{ base: "135px", xl: "241px" }}
                          className="vehicle-card"
                        >
                          <Flex
                            direction={{ base: "column" }}
                            gap={{ base: "0" }}
                            alignItems={{ base: "center" }}
                          >
                            <Image
                              src={vehicle.img}
                              alt={vehicle.name}
                              // width={{ xl: "13.92713rem" }}
                              height={{ xl: "100px" }}
                            />
                            <Text
                              fontFamily={"var(--font-ToyotaType-Regular)"}
                              color={"#58595B"}
                              textAlign={{ base: "center" }}
                              fontSize={{ base: "0.375rem", xl: "0.75rem" }}
                              fontWeight={{ base: "400" }}
                              lineHeight={{ base: "100%" }}
                              letterSpacing={"0"}
                            >
                              *Imágenes de referencias
                            </Text>
                          </Flex>
                          <Heading
                            as="h3"
                            fontFamily={"var(--font-ToyotaType-Regular)"}
                            color={"#000000"}
                            textAlign={{ base: "center" }}
                            fontSize={{ base: "0.64775rem", xl: "1.375rem" }}
                            fontWeight={{ base: "700", xl: "400" }}
                            letterSpacing={"0"}
                            lineHeight={{ base: "0.70663rem", xl: "100%" }}
                          >
                            {vehicle.name}
                          </Heading>
                        </Flex>
                      </Link>
                    ))}
                  </Grid>
                ) : (
                  <Text textAlign="center" marginTop="2rem">
                    No hay repuestos en esta categoría.
                  </Text>
                )}
              </Tabs.Panel>
            ))}
          </Tabs.Container>
        </View>
      </View>
    </>
  );
}
