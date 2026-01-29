import React, { useState } from "react";
import {
  View,
  Flex,
  Text,
  Image,
  Divider,
  Link,
  Grid,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./VehicleCard.css";
import {
  VehicleCardProps,
  VehicleCardTheme,
} from "@/components/Tabs/VehiclesTabs/VehiclesTabs";
import Button from "@/components/Layout/Button/Button";
import { useModelStore } from "@/providers/model-store-provider";
import { useRouter } from "next/navigation";

export function VehicleCardMain(vehicle: VehicleCardProps) {
  const router = useRouter();
  const { setCurrentModelState } = useModelStore((state) => state);
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const {
    id,
    index = 0,
    bgColor,
    name,
    isOnClickEvent,
    setIsvehicleInfo,
    year,
    type,
    price,
    setIsOpen,
    description,
    img,
    imgMobile,
    style,
    className,
    objectPosition,
  } = vehicle;

  const darkColors = ["#373948", "#29363A", "#161B1E"]; // Cambia estos colores si deseas otros
  const selectedDarkColor = darkColors[index % darkColors.length];

  const defaultTitleStyle: React.CSSProperties = {
    color: "#FFF",
    fontFamily: "ToyotaType-Bold",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "24px",
  };
  const mergedTitleStyle = {
    ...defaultTitleStyle,
    ...vehicle.titleStyle, // override with any custom style passed
  };

  const DefaultYearandTypeStyle: React.CSSProperties = {
    color: "#FFF",
    fontFamily: "Toyota Type",
    fontSize: "9px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  };

  const mergedYearandTypeStyle = {
    ...DefaultYearandTypeStyle,
    ...vehicle.YearandTypeStyle,
  };

  const defaultDescriptionStyle: React.CSSProperties = {
    fontFamily: "Toyota Display",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#FFF",
  };

  const mergedDescriptionStyle = {
    ...defaultDescriptionStyle,
    ...vehicle.descriptionStyle,
  };

  const defaultPriceStyle: React.CSSProperties = {
    fontFamily: "var(--font-ToyotaType-Regular)",
    fontWeight: 400,
    fontSize: "1.125rem",
    lineHeight: "1.6044rem",
    color: "#FFF",
  };

  const mergedPriceStyle = {
    ...defaultPriceStyle,
    ...vehicle.priceStyle,
  };

  return (
    <Grid
      key={id}
      minWidth={{ base: "18.875rem", xl: "650px", xxl: "650px" }}
      minHeight={{ base: "505px", medium: "550px", xl: "100%" }}
      margin={{ base: "0 auto", medium: "0 auto", large: "0 auto" }}
      backgroundColor={bgColor || selectedDarkColor}
      color={bgColor ? "#000000" : "#ffffff"}
      boxShadow="medium"
      borderRadius=".5rem"
      padding={{ base: "1.25rem .9375rem", xl: "0" }}
      autoFlow={{
        xl: bgColor === VehicleCardTheme.dark ? "column" : "row",
      }}
      gap={{ base: "16px", xl: "13px" }}
      // className={`${className} vehicle-card-main`}
      style={style}
      templateRows={{ base: "auto 1fr", xl: "unset" }}
      templateColumns={{ xl: "auto 1fr" }}
    >
      <Flex
        direction={"column"}
        justifyContent={{ base: "space-between" }}
        alignItems={"stretch"}
        position="relative"
        width={{ base: "auto" }}
        gap={"0"}
        className=""
      >
        <Image
          src={isMobile ? imgMobile : img}
          maxWidth={{
            base: "272px",
            medium: "none",
            xl: "290px",
            xxl: "290px",
          }}
          minWidth={{ base: "", xl: "290px", xxl: "290px" }}
          maxHeight={{
            medium: "400px",
            xl: "95%",
            xxl: "inherit",
          }}
          minHeight={{ medium: "250px" }}
          alt={name}
          width="100%"
          borderRadius=".5rem  0 .5rem .5rem"
          height="100%"
          objectFit={{ base: "cover", xl: "cover" }}
          objectPosition={{
            base: "60% 84%",
            medium: "unset",
            xl: vehicle.objectPosition,
            xxl: vehicle.objectPosition,
          }}
        />
        <Text
          width={"100%"}
          display={{ base: "", xl: "flex", xxl: "flex" }}
          backgroundColor="#58595B"
          color="#ffffff"
          fontSize={{ base: "9px", xl: "9px" }}
          borderRadius="0  0 0 0.5rem"
          textAlign="center"
          margin={{ base: "", xl: "0 auto" }}
          minHeight={{ xl: "1.3125rem" }}
          maxWidth={{
            base: "272px",
            medium: "100%",
            xl: "100%",
            xxl: "100%",
          }}
          // width={{ xl: "90%" }}
          // padding={{ xl: "0 0 20px 0" }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          *Imagen de referencia
        </Text>
      </Flex>
      <Flex
        width="auto"
        direction="column"
        justifyContent={{
          xl: "space-between",
          base: "space-between",
          medium: "end",
        }}
        padding={{ base: "0", xl: "1.875rem 0.875rem" }}
        gap={{ xl: "1.6875rem" }}
        // height={{medium:"max-content"}}
        maxHeight={{ xl: "319px" }}
        rowGap={{ medium: "40px" }}
      >
        <View>
          <View>
            {/* <Text
              className="vehicle-card__info"
              fontFamily="var(--font-ToyotaType-Regular)"
              fontSize={{ base: "1.375rem", xl: "lg" }}
              fontWeight="400"
              lineHeight={{ base: "1.5rem", xl: "2.6rem" }}
              color="inherit"
              paddingBottom=".3rem"
            >
              {name}
            </Text> */}
            <Text
              // className="vehicle-card__info"
              fontFamily={mergedTitleStyle.fontFamily}
              fontWeight={mergedTitleStyle.fontWeight}
              fontSize={mergedTitleStyle.fontSize}
              lineHeight={mergedTitleStyle.lineHeight}
              color={mergedTitleStyle.color}
              paddingBottom=".3rem"
            >
              {name}
            </Text>
            <Text
              fontFamily={mergedYearandTypeStyle.fontFamily}
              fontWeight={mergedYearandTypeStyle.fontWeight}
              fontSize={mergedYearandTypeStyle.fontSize}
              lineHeight={mergedYearandTypeStyle.lineHeight}
              color={mergedYearandTypeStyle.color}
            >
              {year} | {type}
            </Text>
          </View>

          <Text
            marginTop={{ base: "4px", medium: "", xl: "" }}
            // className="vehicle-card__info"
            paddingTop={{ base: "0", xl: "39px" }}
            fontFamily={mergedDescriptionStyle.fontFamily}
            fontWeight={mergedDescriptionStyle.fontWeight}
            fontSize={mergedDescriptionStyle.fontSize}
            lineHeight={mergedDescriptionStyle.lineHeight}
            color={mergedDescriptionStyle.color}
          >
            {description}
          </Text>
        </View>
        <Flex
          direction={"column"}
        // gap={"1.4375rem"}
        >
          <View>
            <Text
              fontFamily="var(--font-ToyotaType-Regular)"
              fontWeight="400"
              fontSize="9px"
              paddingTop={{ base: "", xl: "16px" }}
              color="#E0E0E0"
              lineHeight={{ base: "normal", xl: "12.83px" }}
            >
              Desde
            </Text>
            <Text
              fontFamily={mergedPriceStyle.fontFamily}
              fontWeight={mergedPriceStyle.fontWeight}
              fontSize={mergedPriceStyle.fontSize}
              lineHeight={mergedPriceStyle.lineHeight}
              color={mergedPriceStyle.color}
            >
              {price}
            </Text>

            <Text
              fontFamily="var(--font-ToyotaType-Regular)"
              fontWeight="400"
              fontSize={{ base: "9px", medium: "9px", xl: "9px" }}
              color="#E0E0E0"
              paddingBottom=".6875rem"
              lineHeight={"12.83px"}
            >
              *Precio sugerido al público
            </Text>
            <Divider
              orientation="horizontal"
              style={{
                width: "268.0018615722656px",
                height: "0px",
                opacity: "0.4",
                borderBottomWidth: "1px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#58595B",
              }}
            />
          </View>
          <Flex
            fontSize="sm"
            justifyContent="space-between"
            alignItems="center"
          >
            {vehicle.onlyCotizar ? (
              <Button
                color="transparent"
                textColor="white"
                size="small"
                fontSize={{ base: "14px", xl: "13px" }}
                minWidth={{ base: "125px", xl: "118px" }}
                maxHeight={{ base: "40px", xl: "40px" }}
                padding=".625rem 1.5rem"
                // style={{ width: "118px", maxHeight: "40px" }}
                fontFamily="var(--font-roboto)"
                onClick={
                  isOnClickEvent
                    ? () => { setIsOpen(true); setIsvehicleInfo(vehicle) }
                    : () => {
                      setCurrentModelState(vehicle.modelName || vehicle.name);
                      router.push(vehicle.cotizarLink || "#");
                    }
                }
              >
                Cotizar
              </Button>
            ) : (
              <>
                <Link href={vehicle.link}>
                  <Button
                    color="transparent"
                    textColor="white"
                    size="small"
                    fontSize={{ base: "14px", xl: "13px" }}
                    minWidth={{ base: "125px", xl: "118px" }}
                    maxHeight={{ base: "40px", xl: "40px" }}
                    padding=".625rem 1.5rem"
                    // style={{ width: "118px", maxHeight: "40px" }}
                    fontFamily="var(--font-roboto)"
                  >
                    Ver detalles
                  </Button>
                </Link>

                <Text
                  textDecoration="underline"
                  color="white"
                  lineHeight={"16.41px"}
                  fontWeight={"500"}
                  fontFamily="var(--font-roboto)"
                  marginRight={{ base: "19px" }}
                  onClick={() => {
                    setCurrentModelState(vehicle.modelName || vehicle.name);
                    router.push(vehicle.cotizarLink || "#");
                  }}
                >
                  Cotizar
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  );
}
