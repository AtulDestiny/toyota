import { Card, Image, Text, View } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

export interface MarketplaceCardProps {
  title: string;
  id?: string | null;
  price: number | string;
  imageSrc: string;
  addedFavorite?: boolean;
  description: string;
  subDescription: string;
  showSuggestedPrice?: boolean;
  showReferenceImage?: boolean;
  useRoundedCorners?: boolean;
  showFavoriteIcon?: boolean;
  backgroundColor?: string;
  minWidth?: string;
  minHeight?: string;
  borderRadius?: string;
  mobileTitle?: string;
  imageHeight?: { base?: string; xl?: string; xxl?: string };
  imageWidth?: { base?: string; xl?: string; xxl?: string };
  cardWidth?: { base?: string; xl?: string; xxl?: string }; // New prop for card width
  cardHeight?: { base?: string; xl?: string; xxl?: string }; // New prop for card height
  maxWidth?: { base?: string; xl?: string; xxl?: string }; // New prop for card width
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down" | "inherit" | "initial" | "unset";
}

export const MarketplaceCard = ({
  title,
  price,
  imageSrc,
  addedFavorite = false,
  description,
  id,
  subDescription,
  showSuggestedPrice = false,
  showReferenceImage = false,
  useRoundedCorners = false,
  showFavoriteIcon = true,
  backgroundColor,
  minWidth,
  minHeight,
  borderRadius,
  mobileTitle,
  imageHeight = { base: "205px", xl: "220px" },
  imageWidth = { base: "100%", xl: "100%" },
  cardWidth, // New prop
  cardHeight, // New prop
  objectFit,
  maxWidth,
}: MarketplaceCardProps) => {
  const [isFavorite, setIsFavorite] = useState(addedFavorite);

  useEffect(() => {
    const existing = JSON.parse(
      localStorage.getItem("favourite-items") || "[]"
    );
    setIsFavorite(existing.includes(id));
  }, [id]);

  const handleToggleFavorite = (id: string) => {
    const existing = JSON.parse(
      localStorage.getItem("favourite-items") || "[]"
    );

    let updatedFavorites;
    if (existing.includes(id)) {
      updatedFavorites = existing.filter((item: string) => item !== id);
    } else {
      updatedFavorites = [...existing, id];
    }

    localStorage.setItem("favourite-items", JSON.stringify(updatedFavorites));
    setIsFavorite(updatedFavorites.includes(id));
  };

  return (
    <Card
      backgroundColor={{
        base: "#F6F6F6",
        xl: backgroundColor ? backgroundColor : "#fff",
      }}
      padding={{ base: "30px 20px 21px 20px", xl: "38px 25px" }}
      borderRadius={borderRadius || (useRoundedCorners ? "15px" : "8px")}
      // maxWidth={cardWidth || { base: "345px", xl: "398px" }}
      minHeight={
        cardHeight || {
          base: "417px",
          xl: minHeight ? minHeight : "432px",
          xxl: minHeight ? minHeight : "432px",
        }
      }
      minWidth={
        cardWidth || {
          base: "345px",
          xl: minWidth ? minWidth : "398px",
          xxl: minWidth ? minWidth : "398px",
        }
      }
      margin={{ base: "0 auto" }}
      width={
        cardWidth || {
          base: "345px",
          xl: minWidth ? minWidth : "398px",
          xxl: minWidth ? minWidth : "398px",
        }
      }
      maxWidth={maxWidth}
    >
      <View position="relative">
        {showFavoriteIcon === true && (
          <Image
            position="absolute"
            top="0px"
            right="0px"
            src={
              isFavorite
                ? "/images/icons/favorite.svg"
                : "/images/icons/notFavorite.svg"
            }
            height={{ base: "17.17px", xl: "22.37px" }}
            width={{ base: "19px", xl: "25px" }}
            alt="Favorito"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (id) {
                handleToggleFavorite(id);
              }
            }}
            style={{ cursor: "pointer", zIndex: "999" }}
          />
        )}
        <Text
          fontFamily={"var(--font-ToyotaType-Regular)"}
          fontSize={{ base: "18px", xl: "18px", xxl: "18px" }}
          color={{ base: "#58595B" }}
          fontWeight="400"
          width={{ base: "calc(100% - 30px)", xl: "83%", xxl: "81%" }}
          minHeight="26px"
          lineHeight="130%"
          marginBottom={{ base: "7px", xl: "9px" }}
          letterSpacing={{ base: "0px", xl: "0px", xxl: "0px" }}
          style={{ verticalAlign: "middle" }}
        >
          <View
            textTransform={"capitalize"}
            display={{ base: "block", xl: "none" }}
          >
            {mobileTitle
              ? mobileTitle.split("/n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index < mobileTitle.split("/n").length - 1 && <br />}
                </span>
              ))
              : title}
          </View>
          <View
            textTransform={"capitalize"}
            display={{ base: "none", xl: "block" }}
          >
            {title}
          </View>
        </Text>
        <Text
          fontFamily={"var(--font-ToyotaType-Regular)"}
          fontSize={{ base: "26px" }}
          color={{ base: "#000000" }}
          lineHeight="100%"
          fontWeight="700"
          letterSpacing={{ base: "0px", xl: "0px", xxl: "0px" }}
          marginBottom={{ base: "11px" }}
          style={{ verticalAlign: "middle" }}
        >
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(Number(price))}
        </Text>
        {showSuggestedPrice && (
          <Text
            fontFamily={"var(--font-ToyotaType-Regular)"}
            fontSize={{ base: "12px" }}
            color={{ base: "#58595B" }}
            fontWeight="400"
            lineHeight="100%"
            letterSpacing={"0"}
          >
            *precio sugerido al público
          </Text>
        )}
        <View
          position="relative"
          marginTop={{ base: "17px", xl: "22px" }}
          marginBottom={{ base: "12px", xl: "16px" }}
          textAlign="center"
        >
          <Image
            width={imageWidth}
            height={imageHeight}
            margin="auto"
            src={imageSrc}
            alt={title}
            objectFit={objectFit || "cover"}
          />
          {showReferenceImage && (
            <Text
              position="absolute"
              bottom="9px"
              right="0"
              left="0"
              textAlign="center"
              fontFamily={"var(--font-ToyotaType-Regular)"}
              fontSize={{ base: "9px", xl: "12px" }}
              color={{ base: "#58595B" }}
              fontWeight="400"
              lineHeight="100%"
            >
              *Imágenes de referencia
            </Text>
          )}
        </View>
        <Text
          fontFamily={"var(--font-ToyotaType-Regular)"}
          fontSize={{ base: "12px", xl: "22px", xxl: "18px" }}
          color={{ base: "#000000" }}
          fontWeight="400"
          lineHeight="100%"
          letterSpacing={{ base: "0px", xl: "0px", xxl: "0px" }}
          style={{ verticalAlign: "middle" }}
          marginBottom={{ base: "9px" }}
          textTransform={"capitalize"}
        >
          {description}
        </Text>
        <Text
          fontFamily={"var(--font-ToyotaType-Regular)"}
          fontSize={{ base: "12px", xl: "16px", xxl: "18px" }}
          color={{ base: "#58595B" }}
          fontWeight="400"
          lineHeight="100%"
          letterSpacing={{ base: "0px", xl: "0px", xxl: "0px" }}
          style={{ verticalAlign: "middle" }}
        >
          {subDescription}
        </Text>
      </View>
    </Card>
  );
};
