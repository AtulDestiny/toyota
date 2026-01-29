import React, { useEffect, useState } from "react";
import {
  View,
  Flex,
  Text,
  Image,
  Divider,
  Link,
  Grid,
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

export function VehicleCard(vehicle: VehicleCardProps) {
  const router = useRouter();
  const { setCurrentModelState } = useModelStore((state) => state);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile or desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const {
    id,
    index = 0,
    bgColor,
    name,
    year,
    type,
    price,
    description,
    img,
    style,
    className,
    objectPosition,
    modelName,
    imgMobile,
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
      minWidth={{ base: "100%", xl: "630px", xxl: "650px" }}
      minHeight={{ base: "500px", medium: "550px", xl: "100%" }}
      maxHeight={{ large: "100%" }}
      backgroundColor={bgColor || selectedDarkColor}
      color={bgColor ? "#000000" : "#ffffff"}
      boxShadow="medium"
      borderRadius=".5rem"
      padding={{ base: "1.25rem .9375rem", xl: "0" }}
      autoFlow={{
        xl: bgColor === VehicleCardTheme.dark ? "column" : "row",
      }}
      gap={{ base: "6px", xl: "13px" }}
      className={`${className} vehicle-card`}
      style={style}
      templateRows={{ base: "auto 1fr", xl: "unset" }}
      templateColumns={{ xl: "auto 1fr" }}
    >
      <Flex
        direction={"column"}
        justifyContent={{ base: "space-between" }}
        position="relative"
        width={{ base: "auto" }}
        className="vehicle-card__media"
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
          minHeight={{ base: "200px", medium: "250px" }}
          alt={name}
          width="100%"
          borderRadius={{ base: "", xl: ".5rem  0 .5rem .5rem" }}
          height="100%"
          objectFit={{ base: "fill", xl: "fill" }}
          objectPosition={{
            base: "60% 84%",
            medium: "unset",
            xl: vehicle.objectPosition,
            xxl: vehicle.objectPosition,
          }}
          maxHeight={{ base: "93%", xl: "95%" }}
        />
        <Text
          display={{ base: "", xl: "flex", xxl: "flex" }}
          backgroundColor="#58595B"
          color="#ffffff"
          fontSize={{ base: "9px", xl: "9px" }}
          borderRadius="0  0 0 0.5rem"
          position={{ base: "absolute" }}
          bottom={{ base: "-14px", medium: "0", xl: "0" }}
          width={{ base: "", medium: "100%", xl: "99.8%" }}
          left={{ base: "0px" }}
          right={{ base: "0px" }}
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
        padding={{ base: "23px 0 0", xl: "1.875rem 0.875rem" }}
        gap={{ xl: "1.6875rem" }}
        // height={{medium:"max-content"}}
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
              className="vehicle-card__info"
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
            className="vehicle-card__info"
            paddingTop={{ base: "0", xl: "32px" }}
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
            {price && (
              <>
                <Text
                  fontFamily="var(--font-ToyotaType-Regular)"
                  fontWeight="400"
                  fontSize={{ base: "9px", xl: "12px", xxl: "14px" }}
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
                  fontSize={{
                    base: "9px",
                    medium: "9px",
                    xl: "12px",
                    xxl: "14px",
                  }}
                  color="#E0E0E0"
                  paddingBottom=".6875rem"
                  lineHeight={"12.83px"}
                >
                  *Precio sugerido al público
                </Text>
              </>
            )}
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

            {vehicle.cotizarLink && (
              <Text
                textDecoration="underline"
                color="white"
                lineHeight={"16.41px"}
                fontWeight={"500"}
                fontFamily="var(--font-roboto)"
                marginRight={{ base: "19px" }}
                fontSize={{ base: "14px", xl: "18px", xxl: "22px" }}
                onClick={() => {
                  setCurrentModelState(vehicle.modelName || vehicle.name);
                  router.push(vehicle.cotizarLink || "#");
                }}
                style={{ cursor: "pointer" }}
              >
                Cotizar
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  );
}
