"use client";

import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "swiper/css";
import { FlotasYVentasBanner } from "../FlotasYVentasBanner/CatalogoPostventaBanner";
import FlotasYVentasSlider from "../FlotasYVentasSlider/PreventiveCampaignsServicesSlider";
import styles from "./FlotasYVentasCorporativas.module.css";
import FlotasYVentasDisponibles from "../FlotasYVentasDisponibles/FlotasYVentasDisponibles";
import { colors as globalsColors } from "@/theme/colors";
import ContactForm from "@/components/ContactForm/ContactForm";
import { ModalStepperCopy } from "@/components/ModalStepper";
import VehicleSwiperAll, {
  VehicleCardTheme,
} from "../VehicleSwiperMain/VehicleSwiper";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicle } from "./getVehicleList";

type VehicleCategory = "Autos" | "Camionetas" | "Pick Ups" | "Ver todos";

export interface VehicleCardProps {
  id: number;
  name: string;
  img: string;
  link: string;
}

const spareParts: Record<VehicleCategory, VehicleCardProps[]> = {
  Autos: [],
  Camionetas: [
    {
      id: 1,
      name: "Prado",
      img: "/images/repuestos/prado.png",
      link: "/servicios/posventa/marketplace?model=prado",
    },
    {
      id: 2,
      name: "FJ Cruiser",
      img: "/images/repuestos/FJ Cruiser.png",
      link: "/servicios/posventa/marketplace?model=fj-cruiser",
    },
    {
      id: 3,
      name: "4Runner",
      img: "/images/repuestos/4Runner.png",
      link: "/servicios/posventa/marketplace?model=4runner",
    },
    {
      id: 4,
      name: "RAV 4",
      img: "/images/repuestos/RAV 4.png",
      link: "/servicios/posventa/marketplace?model=rav-4",
    },
    {
      id: 5,
      name: "Land Cruiser 200",
      img: "/images/repuestos/Land Cruiser 200.png",
      link: "/servicios/posventa/marketplace?model=land-cruiser-200",
    },
    {
      id: 6,
      name: "Fortuner",
      img: "/images/repuestos/Fortuner.png",
      link: "/servicios/posventa/marketplace?model=fortuner",
    },
    {
      id: 7,
      name: "Rush",
      img: "/images/repuestos/Rush.png",
      link: "/servicios/posventa/marketplace?model=rush",
    },
  ],
  "Pick Ups": [],
  "Ver todos": [],
};

spareParts["Ver todos"] = Object.keys(spareParts)
  .filter((category) => category !== "Ver todos")
  .reduce((allVehicles, category) => {
    return allVehicles.concat(spareParts[category as VehicleCategory]);
  }, [] as VehicleCardProps[]);

export interface CatalogoPostventaProps {
  introDescription: string;
  introButtonLabel: string;
  whySubtitle: string;
  isintroButtonLabel?: boolean;
  whyTitle: string;
  whyDescription: string;
  whyDescriptionTwo: string;
  whyList: string[];
}

export function FlotasYVentasCorporativas({
  introDescription,
  introButtonLabel,
  whySubtitle,
  whyTitle,
  isintroButtonLabel = true,
  whyDescription,
  whyDescriptionTwo,
  whyList,
}: CatalogoPostventaProps): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["vehicle"],
    queryFn: () => fetchVehicle(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading vehicles.</p>;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRedirect = () => {
    console.log("Redirecting...");
    setIsOpen(false);
  };
  const bulletItems = whyDescriptionTwo.split(",").map((item) => item.trim());

  // 🔹 Define your custom model order
  const modelOrder = [
    "Hilux",
    "Fortuner",
    "Land Cruiser Prado",
    "Land Cruiser 79",
    "Yaris Cross",
    "Corolla Cross",
    "Corolla",
  ];
  const uniqueByModelName = data.filter(
    (vehicle: any, index: number, self: any[]) =>
      index === self.findIndex((v) => v.modelName === vehicle.modelName)
  );

  // 🔹 Filter only vehicles that are in your desired list
  const filteredVehicles = uniqueByModelName.filter((v: any) =>
    modelOrder.includes(v.modelName)
  );

  // 🔹 Sort vehicles by the defined model order
  const sortedVehicles = filteredVehicles.sort(
    (a: any, b: any) =>
      modelOrder.indexOf(a.modelName) - modelOrder.indexOf(b.modelName)
  );

  // 🔹 Then map to your structure
  const vehicleData =
    sortedVehicles.map((vehicle: any) => {
      const firstModelYear = vehicle.modelsByYear?.items?.[0];
      const firstPriceLine =
        firstModelYear?.priceListsByFeature?.items?.[0]?.priceListLines?.items?.[0];

      return {
        id: vehicle.thirdPartyApiDataId,
        name: vehicle.modelName,
        link: vehicle.detailPageLink,
        cotizarLink: `/cotizador/${vehicle.detailPageLink?.split("/").pop() || ""
          }`,
        objectPosition: vehicle.objectPosition || "unset",
        bgColor: vehicle.bannerBackgroundColor || "#1F2C40",
        year: vehicle.year ?? "2026",
        type: vehicle.vehicleFuelType ?? "",
        price: firstPriceLine
          ? `$${firstPriceLine.value.toLocaleString("es-CO")} COP`
          : "",
        description: vehicle.quotesDescription ?? "",
        img: vehicle.posterImageDesktop,
        imgMobile: vehicle.posterImageMobile,
      };
    }) || [];



  return (
    <View>
      {isOpen && (
        <ModalStepperCopy
          isOpen={isOpen}
          onClose={handleClose}
          onRedirect={handleRedirect}
          model="Corolla Cross"
          version="1.8 XEi CVT"
          amplifyConfig={
            {
              // Aquí iría la configuración de Amplify si la necesitas
            }
          }
        />
      )}
      <FlotasYVentasBanner />

      {/* Add the buttons section here */}
      <Flex
        className="shortcuts"
        width="100%"
        style={{ zIndex: 10 }}
        justifyContent={"space-between"}
        display={{ base: "flex", xl: "none" }}
        position={"sticky"}
        top={{ base: "54.83px", xl: "60px" }}
        left="0px"
      >
        <View width={{ base: "100%", xl: "500px" }} fontSize={"sm"}>
          <Link href="/detalle/prado/galeria">
            <Button
              width={{ base: "100%", xl: "50%" }}
              color={"black"}
              style={{
                borderRadius: "0",
                lineHeight: "1.225rem",
                border: "none",
                fontFamily: "var(--font-ToyotaType-Regular)",
                backgroundColor: "#f6f6f6",
                color: "#FFFFFF",
                position: "relative",

                fontSize: "14px",
                fontWeight: "400",
                padding: "12.5px",
              }}
            >
              Ver concesionarios
            </Button>
          </Link>
        </View>
      </Flex>

      <Flex
        className={styles["intro"]}
        direction={{ base: "column" }}
        alignItems={{ base: "center" }}
        gap={{ base: "2.31rem" }}
        padding={{
          base: "4.38rem 2.69rem 2rem",
          xl: "6.31rem 2rem 3.5rem",
        }}
      >
        <Heading
          level={2}
          fontFamily={{
            base: "var(--font-ToyotaType-Regular)",
            xl: "var(--font-toyotaDisplay)",
          }}
          color={{ base: "black", xl: "black" }}
          textAlign={{ base: "center", xl: "center" }}
          fontSize={{ base: "1.375rem", xl: "2rem" }}
          fontWeight={{ base: "400", xl: "400" }}
          lineHeight={{ base: "normal", xl: "130%" }}
          letterSpacing={"0"}
          maxWidth={{ base: "67ch" }}
        >
          {introDescription}
        </Heading>

        {!isMobile && isintroButtonLabel ? (
          <Button
            color={{ base: "var(--M3-sys-light-on-primary, #FFF)" }}
            textAlign={{ base: "center" }}
            fontSize={{ base: "0.875rem" }}
            fontStyle={{ base: "normal" }}
            fontFamily={"var(--font-roboto)"}
            fontWeight={{ base: "500" }}
            lineHeight={{ base: "1.25rem" }}
            letterSpacing={{ base: "0.1px" }}
            padding={"0.94rem"}
            backgroundColor={"#D42224"}
            minWidth={"18.125rem"}
            border={"none"}
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(true)}
          >
            {introButtonLabel}
          </Button>
        ) : null}
      </Flex>

      <Flex
        direction={"column"}
        alignItems={{ medium: "center" }}
        gap={".625rem"}
        padding={{ base: "1.3106rem 1rem 0", medium: "2rem 2rem 1.5625rem" }}
      >
        <Heading
          level={3}
          textAlign={{ medium: "center" }}
          fontSize={{ base: "14px", medium: "1.125rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "140%", medium: "normal" }}
          color={"#000000"}
        >
          Flotas y Ventas Corporativas
        </Heading>

        <Heading
          level={2}
          color={{ base: "black", medium: "#000" }}
          textAlign={{ medium: "center" }}
          fontSize={{ base: "2rem", medium: "3.5rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "130%", medium: "110.00000000000001%" }}
          letterSpacing={{ base: "normal", medium: "-2%" }}
          maxWidth={{ base: "23ch" }}
        >
          Vehículos Disponibles
        </Heading>
      </Flex>

      <VehicleSwiperAll
        onlyCotizar={true}
        isOnClickEvent={true}
        note="*Aplica Términos y condiciones *Las imágenes del vehículo en referencia pueden variar del modelo actual."
        vehicles={vehicleData}
      />

      <Flex
        maxWidth={{ base: "max-content", xl: "100%" }}
        margin={{ base: "0 auto", xl: "0" }}
        className={styles["why"]}
        direction={{ base: "column" }}
        gap={{ base: "1.5rem", xl: "80px" }}
        padding={{
          base: "2.125rem 1rem 2.625rem",
          xl: "67px 2rem 7.1875rem",
        }}
      >
        <Flex
          direction={{ base: "column" }}
          alignItems={{ xl: "center" }}
          gap={{ base: "0.62rem", xl: "0.625rem" }}
        >
          <Heading
            level={3}
            textAlign={{ base: "left", xl: "center" }}
            fontFamily={{
              base: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            }}
            fontSize={{ base: "0.875rem", xl: "1.125rem" }}
            fontStyle={{ base: "normal", xl: "normal" }}
            fontWeight={{ base: "400", xl: "400" }}
            lineHeight={{ base: "140%", xl: "normal" }}
            color={"#000000"}
          >
            {whySubtitle}
          </Heading>

          <Heading
            level={2}
            fontFamily={{
              base: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            }}
            color={{ base: "black", xl: "#000" }}
            textAlign={{ base: "left", xl: "center" }}
            fontSize={{ base: "2rem", xl: "3.5rem" }}
            fontStyle={{ base: "normal", xl: "normal" }}
            fontWeight={{ base: "400", xl: "400" }}
            lineHeight={{ base: "130%", xl: "110%" }}
            letterSpacing={{ base: "normal", xl: "-0.07rem" }}
            maxWidth={{ base: "23ch" }}
          >
            {whyTitle}
          </Heading>
        </Flex>

        <Flex
          direction={{ base: "column", xl: "row" }}
          justifyContent={{ xl: "center" }}
          gap={{ base: "1.25rem", xl: "calc(7.5625rem + 3ch)" }}
        >
          <Text
            color={{ base: "#000", xl: "#000" }}
            fontFamily={{
              base: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-ToyotaType-Regular)",
            }}
            fontSize={{ base: "1.125rem", xl: "22px" }}
            fontStyle={{ base: "normal", xl: "normal" }}
            fontWeight={{ base: "400", xl: "400" }}
            lineHeight={{ base: "normal", xl: "normal" }}
            maxWidth={{ base: "33ch" }}
          >
            {whyDescription}
          </Text>
          <View as="ul" paddingLeft="1.25rem" style={{ listStyleType: "disc" }}>
            {bulletItems.map((item, index) => (
              <li
                key={index}
                style={{
                  color: "#000",
                  fontFamily: "var(--font-ToyotaType-Regular)",
                  fontSize: "1.125rem",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginBottom: "0.5rem", // spacing between items
                }}
              >
                {item}
              </li>
            ))}
          </View>

          <Flex
            direction={{ base: "column" }}
            gap={{ base: "1.94rem", xl: "0" }}
          >
            {/* <View
              as="ul"
              style={{
                listStyle: "disc",
                color: "var(--Gris-oscuro, #58595B)",
              }}
              paddingLeft={{ base: "3ch", xl: "0" }}
            >
              {whyList.map((item) => (
                <li key={item}>
                  <Text
                    color={{
                      base: "var(--Gris-oscuro, #58595B)",
                      xl: "var(--Gris-oscuro, #58595B)",
                    }}
                    fontFamily={{
                      base: "var(--font-ToyotaType-Regular)",
                      xl: "var(--font-ToyotaType-Regular)",
                    }}
                    fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                    fontStyle={{ base: "normal", xl: "normal" }}
                    fontWeight={{ base: "400", xl: "400" }}
                    lineHeight={{ base: "normal", xl: "100%" }}
                    letterSpacing={"0"}
                  >
                    {item}
                  </Text>
                </li>
              ))}
            </View> */}

            {isMobile ? (
              <Text
                fontFamily="var(--font-ToyotaType-Regular)"
                fontSize="0.5625rem"
                fontStyle="normal"
                fontWeight={400}
                lineHeight="normal"
              >
                Obtén una cotización personalizada para tu flota. Contáctanos a
                ventascorporativas@toyota.com.co
              </Text>
            ) : null}
          </Flex>
        </Flex>
      </Flex>

      <FlotasYVentasSlider />
    </View>
  );
}
