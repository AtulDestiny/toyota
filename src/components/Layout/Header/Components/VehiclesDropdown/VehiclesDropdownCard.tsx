"use-client";

import { useModelStore } from "@/providers/model-store-provider";
import { Vehicle } from "@/types/vehicle";
import { Card, Flex, Image, Text } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const VehiclesDropdownCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const { setCurrentModelState } = useModelStore((state) => state);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Card
      key={vehicle.id}
      width={"290px"}
      padding={{ base: "1rem", xl: "1rem 1rem 0px " }}
      textAlign={"center"}
      minWidth={{ base: "", xl: "320px", xxl: "320px" }}
    >
      <Text
        fontSize="22px"
        fontStyle="normal"
        lineHeight="109.09%"
        fontFamily="var(--font-ToyotaType-Regular)"
        fontWeight="700"
        textAlign="start"
      >
        {vehicle.name}
      </Text>
      <Link href={vehicle.link ?? "#"}>
        <Image
          src={vehicle.img}
          alt={vehicle.name}
          style={{ width: "100%", borderRadius: "8px" }}
          minWidth={{
            base: "317px",
            medium: "180px",
            large: "190px",
            xl: "317px",
            xxl: "317px",
          }}
          maxHeight={{ base: "100%", xl: "100%", xxl: "100%" }}
        />
      </Link>
      {/* <Text fontSize="0.875rem" fontFamily="var(--font-toyotaDisplay)">
        {vehicle.type}
      </Text> */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"0"}
        width="100%"
        gap={".3125rem"}
      >
        <Link
          href={vehicle.link ?? "#"}
          style={{
            letterSpacing: "0.5px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            padding: 0,
            fontFamily: "var(--font-roboto)",
            fontSize: "14px",
            fontWeight: 500,
            fontStyle: "normal",
            lineHeight: "normal",
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
            textDecorationSkipInk: "none",
            textDecorationThickness: "auto",
            textUnderlineOffset: "auto",
            textUnderlinePosition: "from-font",
          }}
        >
          Ver detalles
        </Link>

        {/* <Image src={"/images/divider.svg"} alt={vehicle.name} /> */}
        <Text
          style={{
            letterSpacing: "0.5px",
            backgroundColor: "white",
            backgroundClip: "text",
            color: "black",
            border: "none",
            padding: 0,
            fontFamily: "var(--font-roboto)",
            fontSize: "14px",
            fontWeight: 500,
            fontStyle: "normal",
            lineHeight: "normal",
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
            textDecorationSkipInk: "none",
            textDecorationThickness: "auto",
            textUnderlineOffset: "auto",
            textUnderlinePosition: "from-font",
            cursor: "pointer",
          }}
          onClick={() => {
            setCurrentModelState(
              vehicle.modelName?.trim().toUpperCase() ||
                vehicle.name.trim().toUpperCase()
            );

            if (pathname === vehicle.cotizarLink) {
              window.location.reload();
              return;
            }

            if (vehicle.cotizarLink) {
              router.push(vehicle.cotizarLink);
              return;
            }

            if (pathname !== "/") {
              router.push("/");
              return;
            }

            window.location.reload();
          }}
        >
          Cotizar
        </Text>
      </Flex>
      <hr
        style={{
          margin: "12px 0px 0px",
          minWidth: "300px",
          opacity: "0.4",
          borderWidth: "1px",
          border: "1px solid #58595B",
        }}
      />
    </Card>
  );
};

export default VehiclesDropdownCard;
