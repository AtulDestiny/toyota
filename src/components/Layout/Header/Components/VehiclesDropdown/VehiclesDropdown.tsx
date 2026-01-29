import React, { useState } from "react";
import {
  Tabs,
  View,
  Flex,
  Text,
  Image,
  Grid,
  ScrollView,
  createTheme,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import VehiclesDropdownCard from "./VehiclesDropdownCard";
import Button from "@/components/Layout/Button/Button";
import { Vehicle } from "@/types/vehicle";
import Link from "next/link";

type VehicleCategory =
  | "Camionetas y SUV"
  | "Autos"
  | "Pick Ups"
  | "Híbridos"
  | "Deportivos TGR"
  | "Ver todos";

const tabsTheme = createTheme({
  name: "vehicles-dropdown-tabs-theme",
  tokens: {
    components: {
      tabs: {
        borderColor: { value: "hsl(210, 5%, 87%)" },
        item: {
          _active: {
            borderColor: { value: "black" },
          },
        },
      },
    },
  },
});

const VehiclesDropdown = (data: Record<VehicleCategory, Vehicle[]>) => {
  const [tab, setTab] = useState<VehicleCategory>("Autos");

  return (
    <View
      style={{
        position: "fixed",
        top: "60px", // Espacio para el header
        paddingTop: "30px",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 9999999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ThemeProvider theme={tabsTheme}>
        <Tabs.Container defaultValue={tab}>
          <Tabs.List
            justifyContent="center"
            width="max-content"
            margin="0 auto"
            value={tab}
            onChange={(value) => setTab(value as unknown as VehicleCategory)}
            // gap={"1.875rem"}
          >
            {(Object.keys(data) as VehicleCategory[]).map((category) => (
              <Tabs.Item
                key={category}
                value={category}
                color="inherit"
                className="tabs__item"
                fontWeight={500}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontSize={"1.125rem"}
                lineHeight={"1.6044rem"}
              >
                {category}
              </Tabs.Item>
            ))}
          </Tabs.List>
          {Object.keys(data).map((category) => (
            <Tabs.Panel key={category} value={category}>
              {data[category as VehicleCategory].length > 0 ? (
                <View
                  className="test-scroll"
                  textAlign="center"
                  height={{ base: "auto", large: "60vh" }}
                  width={{ base: "auto", xl: "100%" }}
                  maxWidth={{ base: "auto", xl: "95%" }}
                  margin={"0 auto"}
                  overflow={{ base: "auto" }}
                >
                  <Grid
                    display="inline-grid"
                    justifyContent="center"
                    alignItems="center"
                    templateColumns="repeat(3, 1fr)"
                    gap={{ base: "1rem", xl: "56px", xxl: "56px 175px" }}
                    padding="1rem 2rem 0 2rem"
                  >
                    {[...data[category as VehicleCategory]]
                      .slice()
                      .sort((a, b) => {
                        const parsePrice = (priceStr: string) => {
                          if (!priceStr) return 0;
                          const cleaned = priceStr
                            .replace(/[^\d,]/g, "")
                            .replace(/,/g, "");
                          return Number(cleaned) || 0;
                        };
                        const priceA = parsePrice(a.price);
                        const priceB = parsePrice(b.price);
                        return priceA - priceB;
                      })
                      .map((vehicle) => (
                        <VehiclesDropdownCard
                          key={vehicle.id}
                          vehicle={vehicle}
                        />
                      ))}
                  </Grid>
                </View>
              ) : (
                <Text textAlign="center" margin="2rem">
                  No hay vehículos disponibles en esta categoría.
                </Text>
              )}
            </Tabs.Panel>
          ))}
        </Tabs.Container>
      </ThemeProvider>
      <Flex
        backgroundColor={"#F6F6F6"}
        marginTop="auto"
        justifyContent="center"
        alignItems="center"
        padding="20px"
        gap={{ base: "20px", medium: "20px", xl: "64px", xxl: "64px" }}
      >
        <Button
          color="black"
          style={{
            minWidth: "290px",
            minHeight: "50px",
            maxWidth: "290px",
            maxHeight: "50px",
          }}
        >
          <Link href="/cotiza-tu-toyota/vehiculos-usados">
            <View
              as="span"
              fontSize={"0.875rem"}
              fontWeight={"500"}
              lineHeight={"1.0256rem"}
              minWidth={{ xl: "290px", xxl: "290px" }}
              minHeight={{ xl: "50px", xxl: "50px" }}
            >
              <Text
                color="#fff"
                textDecoration="none"
                textAlign="right"
                fontFamily="var(--font-roboto)"
                fontSize="14px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="125%"
                letterSpacing="0.1px"
              >
                Vehículos usados
              </Text>
            </View>
          </Link>
        </Button>
        <Flex alignItems={"center"} gap={"0.44rem"}>
          <Link href="/cotiza-tu-toyota/vehiculos-nuevos">
            <View
              as="span"
              fontSize={"0.875rem"}
              fontWeight={"500"}
              lineHeight={"1.0256rem"}
              textDecoration={"underline"}
              paddingBottom={"0.25rem"}
            >
              <Text color="#000">Ver todos los vehículos</Text>
            </View>
          </Link>
          <Image
            src="/svgs/arrow--black-short.svg"
            alt="Arrow Black Short"
            height={".4631rem"}
          />
        </Flex>
      </Flex>
    </View>
  );
};

export default VehiclesDropdown;
