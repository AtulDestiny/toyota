"use client";

import { SectionTitleMarketplace } from "@/components/Layout/SectionTitleMarketplace/SectionTitleMarketplace";
import { View, Heading, Collection, Flex, Link } from "@aws-amplify/ui-react";
import { MarketplaceCard } from "@/components/Cards/MarketplaceCard/MarketplaceCard";
import { useBreakpointValue } from "@aws-amplify/ui-react";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const itemsList = [
  {
    name: "Corolla Cross 1.8 Seg Hybrid Tp 4x2",
    price: "$ 65.000.000",
    description: "2023 | 42.783 km",
    img: "/images/Corolla_Cross_1_8_Seg_Hybrid_Tp_4x2.png",
    subDescription: "DISTOYOTA Calle 102",
    isFavorite: true,
  },
  {
    name: "Corolla Cross 1.8 Seg Hybrid Tp 4x2",
    price: "$ 18.000.000",
    description: "2023 | 150.00 km",
    img: "/images/Corolla_Cross_1_8_Seg_Hybrid_Tp_4x2_2.png",
    subDescription: "DISTOYOTA Calle 102",
    isFavorite: true,
  },
  {
    name: "Corolla Cross 1.8 Seg Hybrid Tp 4x2",
    price: "$ 65.000.000",
    description: "2023 | 150.783 km",
    img: "/images/Corolla_Cross_1_8_Seg_Hybrid_Tp_4x2_3.png",
    subDescription: "DISTOYOTA Calle 102",
    isFavorite: true,
  },
  {
    name: "Corolla Cross 1.8 Seg Hybrid Tp 4x2",
    price: "$ 99.000.000",
    description: "2023 | 150.000 km",
    img: "/images/Corolla_Cross_1_8_Seg_Hybrid_Tp_4x2_4.png",
    subDescription: "DISTOYOTA Calle 102",
    isFavorite: true,
  },
  {
    name: "Corolla Cross 1.8 Seg Hybrid Tp 4x2",
    price: "$ 65.000.000",
    description: "2023 | 42.783 km",
    img: "/images/Corolla_Cross_1_8_Seg_Hybrid_Tp_4x2.png",
    subDescription: "DISTOYOTA Calle 102",
    isFavorite: true,
  },
];
export default function FavoritosPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const isMobile = useBreakpointValue({ base: true, medium: false });

  const [items, setItems] = useState(itemsList);
  const clearFavorites = () => {
    setItems([]); // clears the list
    // add api call to clear list
  };
  const isEmpty = items.length === 0;
  const getTitle = () => {
    if (type === "usados") return "Usados favoritos";
    if (type === "repuestos") return "Repuestos favoritos";
    if (type === "accesorios") return "Accesorios favoritos";
    if (type === "boutique") return "Boutique favoritos";
  };
  return (
    <>
      <SectionTitleMarketplace
        title={getTitle()}
        titleFontSize={{ base: "lg" }}
        subtitleFontSize={{ base: "sm", xl: "md" }}
        padding={{ base: "22px 0px 0px 15px", xl: "10px 1rem 2.25rem" }}
        backText={"Volver a Resultados"}
        border="0"
      />

      {!isEmpty && (
        <View backgroundColor={{ base: "white", xl: "#F6F6F6" }}>
          <Flex
            justifyContent={{ base: "space-between", xl: "center" }}
            direction={{ base: "row", xl: "column" }}
            alignItems={{ base: "baseline", xl: "center" }}
            padding={{ base: "0px 15px", xl: "4rem 1rem 2.25rem" }}
          >
            <Heading
              level={2}
              fontSize={{ base: "lg", xl: "" }}
              lineHeight={{ base: "130%", xl: "150%" }}
              fontWeight={{ base: "400" }}
              fontFamily={"var(--font-toyotaDisplay)"}
              textAlign={{ base: "left", xl: "center" }}
              textTransform={"capitalize"}
            >
              Favoritos
            </Heading>

            <Link
              display={{
                base: "block",
                medium: "none",
                xl: "none",
                xxl: "none",
              }}
              onClick={clearFavorites}
              style={{
                letterSpacing: "0.5px",
                backgroundColor: "white",
                backgroundClip: "text",
                color: "black",
                border: "none",
                padding: 0,
                fontFamily: "var(--font-roboto)",
                fontSize: "14px",
                fontWeight: 600,
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
              Limpiar favoritos
            </Link>
          </Flex>
          <View backgroundColor={{ base: "white", xl: "#F6F6F6" }}></View>
          <View
            maxWidth={"1440px"}
            margin={"0 auto"}
            padding={{ base: "2rem 1rem", xl: "65px 2.5rem" }}
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              marginBottom={{ base: "1rem", xl: "2rem" }}
            >
              <Heading
                level={4}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-ToyotaType-Regular)",
                }}
                fontSize={{ base: "14px", xl: "22px" }}
                fontWeight={{ base: "400", xl: "600" }}
                lineHeight={{ base: "140%", xl: "" }}
                letterSpacing={{ base: "0px" }}
                style={{ verticalAlign: "middle" }}
                color="#000000"
              >
                {itemsList?.length} Resultados
              </Heading>

              <Link
                onClick={clearFavorites}
                display={{
                  base: "none",
                  medium: "block",
                  xl: "block",
                  xxl: "block",
                }}
                style={{
                  letterSpacing: "0.5px",
                  backgroundColor: "white",
                  backgroundClip: "text",
                  color: "black",
                  border: "none",
                  padding: 0,
                  fontFamily: "var(--font-roboto)",
                  fontSize: "14px",
                  fontWeight: 600,
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
                Limpiar favoritos
              </Link>
            </Flex>

            <Collection
              items={items}
              type="grid"
              gap="20px"
              templateColumns={{
                base: "1fr",
                medium: "repeat(2, 1fr)",
                large: "repeat(3, 1fr)",
              }}
            >
              {(vehicle, index) => (
                <MarketplaceCard
                  key={index}
                  title={vehicle.name}
                  price={vehicle.price}
                  imageSrc={vehicle.img}
                  description={vehicle.description}
                  subDescription={vehicle.subDescription}
                  addedFavorite={vehicle.isFavorite}
                />
              )}
            </Collection>
          </View>
        </View>
      )}

      {isEmpty && (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          backgroundColor="white"
          marginBottom={{ base: "50px", xl: "185px", xxl: "185px" }}
        >
          <div style={{ position: "relative", width: "80px", height: "80px" }}>
            <Image
              src="/images/icons/heart-icon-black.png"
              alt="Heart Icon"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <Heading
            level={3}
            fontSize={{ base: "20px", xl: "28px" }}
            fontFamily="var(--font-toyotaDisplay)"
            fontWeight="600"
            marginBottom="1rem"
          >
            No tienes vehículos favoritos
          </Heading>

          <Heading
            level={5}
            fontSize={{ base: "14px", xl: "16px" }}
            fontWeight="400"
            fontFamily="var(--font-roboto)"
            lineHeight="160%"
            maxWidth="400px"
            marginBottom="2rem"
          >
            Marca como favoritos los vehículos usados que te interesen e
            identifícalos aquí
          </Heading>

          <Link
            href="/test-usados"
            fontSize={{ base: "14px", xl: "16px" }}
            fontWeight="600"
            backgroundColor="#B71C1C"
            color="white"
            padding="12px 24px"
            borderRadius="25px"
            fontFamily="var(--font-roboto)"
          >
            Ver vehículos usados
          </Link>
        </Flex>
      )}
    </>
  );
}
