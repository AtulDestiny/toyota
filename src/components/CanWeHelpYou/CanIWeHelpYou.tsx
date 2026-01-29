import { View, Flex, Card, Text, Image } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useBreakpointValue } from "@aws-amplify/ui-react"; //

interface CardData {
  bannerImg: string;
  bannerAlt: string;
  iconImg: string;
  iconAlt: string;
  text: string;
  text2?: string;
  bannerObjectPosition?: string | { base?: string; xl?: string; xxl?: string };
  iconSize?: {
    width: number | { base?: number; xl?: number };
    height: number | { base?: number; xl?: number };
  };
  link?: string;
  secondaryIcon?: {
    src: string;
    alt: string;
    size?: {
      width: number | { base?: number; xl?: number };
      height: number | { base?: number; xl?: number };
    };
  };
  cardSize?: {
    width: number | { base?: number | string; xl?: number | string };
    height: number | { base?: number | string; xl?: number | string };
  };
}

interface CanWeHelpYouProps {
  title?: string;
  subtitle?: string;
  gap?: string;
  titleFontSize?:
    | {
        base?: string | number;
        xl?: string | number;
      }
    | string
    | number; // For responsive font size
  titlePadding?:
    | {
        base?: string | number;
        xl?: string | number;
      }
    | string
    | number; // For responsive padding
  backgroundColor?: string; // For background color
  card1?: CardData;
  card2?: CardData;
  card3?: CardData;
  card4?: CardData;
  showCard3?: boolean; // Add this new prop
}

const defaultCards: Record<string, CardData> = {
  card1: {
    bannerImg: "/images/vehicle-1.png",
    bannerAlt: "vehicle-",
    bannerObjectPosition: "center",
    iconImg: "/images/icons/Vector-1.png",
    iconAlt: "icon-",
    text: "Cotizador",
    iconSize: {
      width: { base: 20, xl: 20 },
      height: { base: 20, xl: 20 },
    },
    link: "/cotiza-tu-toyota/vehiculos-nuevos",
  },
  card2: {
    bannerImg: "/images/boutique-desktop.png",
    bannerAlt: "Boutique Toyota",
    bannerObjectPosition: "center",
    iconImg: "/svgs/boutique-toyota--no-padding.svg",
    iconAlt: "icon-",
    text: "Boutique",
    iconSize: {
      width: { base: 15, xl: 15 },
      height: { base: 19, xl: 19 },
    },
    link: "/mi-toyota/boutique",
  },
  card3: {
    bannerImg: "/images/Rav4_kinto-desktop.png",
    bannerAlt: "Kinto Share",
    bannerObjectPosition: "center",
    iconImg: "/images/icons/Vector-3.png",
    iconAlt: "icon-",
    text: "Alquila ",
    iconSize: {
      width: { base: 25, xl: 25 },
      height: { base: 12.5603, xl: 12 },
    },
    link: "https://www.kinto-mobility.com.co/kinto-share#no-back",
    secondaryIcon: {
      src: "/svgs/kinto.svg",
      alt: "icon-kinto",
      size: {
        width: { base: 76.067, xl: 76.067 },
        height: { base: 19.44, xl: 19.44 },
      },
    },
  },
  card4: {
    bannerImg: "/images/test-drive/icons/test-drive-banner.jpg",
    bannerAlt: "Test Drive",
    iconImg: "/images/test-drive/icons/drive.svg",
    iconAlt: "test-drive-icon",
    text: "Test Drive",
    iconSize: {
      width: { base: 25, xl: 45 },
      height: { base: 12.5603, xl: 25 },
    },
    link: "/cotiza-tu-toyota/test-drive",
  },
};

const defaultTitle = "¿En qué te podemos ayudar?";
const defaultSubtitle = "Herramientas";

export const CanWeHelpYou = (props: CanWeHelpYouProps) => {
  const {
    title = defaultTitle,
    subtitle = defaultSubtitle,
    titleFontSize = { base: "56px", xl: "xxxxl" }, // Default font size
    titlePadding = { base: "0 0 4.8125rem", xl: "0 0 4.8125rem" }, // Default padding
    backgroundColor = "#000", // Default background color
    showCard3 = true, // Default to showing card3
    gap,
  } = props;

  // Handle different formats of props that can be responsive
  const titleFontSizeValue =
    typeof titleFontSize === "object"
      ? titleFontSize
      : { base: titleFontSize, xl: titleFontSize };

  const titlePaddingValue =
    typeof titlePadding === "object"
      ? titlePadding
      : { base: titlePadding, xl: titlePadding };

  const mergedCards = {
    card1: props.card1 || defaultCards.card1,
    card2: props.card2 || defaultCards.card2,
    ...(showCard3 ? { card3: props.card3 || defaultCards.card3 } : {}),
    card4: props.card4 || defaultCards.card4, // Use card3 prop for card4
  };

  const currentIconWidth = useBreakpointValue({
    base: "base",
    xl: "xl",
  });
  return (
    <>
      <View
        backgroundColor={backgroundColor} // Use the background color from props
        textAlign={{ base: "start", xl: "center" }}
        color="white"
        padding={{ base: "3.125rem 1rem", xl: "7rem 1rem 8.875rem" }}
        minHeight={{ xl: "48.75rem" }}
      >
        <Text
          color="inherit"
          fontSize={{ base: "sm", xl: "md" }}
          fontWeight={400}
          fontFamily="var(--font-ToyotaType-Regular)"
          lineHeight={{ base: "1.6044rem", xl: "25.67px" }}
        >
          {subtitle}
        </Text>
        <Text
          color="inherit"
          fontSize={titleFontSizeValue}
          lineHeight={{ base: "110%", xl: "61.6px" }}
          padding={titlePaddingValue}
          fontWeight={{ base: "400", xl: "400" }}
          fontStyle={{ base: "normal", xl: "normal" }}
          fontFamily={{
            base: "var(--font-ToyotaType-Regular)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
          style={{ verticalAlign: "middle" }}
          letterSpacing={{ base: "-2px", xl: "" }}
        >
          {title}
        </Text>

        <Flex
          direction={{ base: "column", xl: "row" }}
          justifyContent="center"
          alignItems={"center"}
          textAlign={"center"}
          gap={{ base: "2.5rem", medium: "1rem", large: "1rem", xl: "1rem" }}
          maxWidth={{ xl: "90%", xxl: "100%" }}
          margin={"auto"}
        >
          {Object.entries(mergedCards).map(([key, card], index) => {
            const width =
              typeof card.iconSize?.width === "object"
                ? (card.iconSize.width[currentIconWidth as "base" | "xl"] ?? 20)
                : (card.iconSize?.width ?? 20);

            const height =
              typeof card.iconSize?.height === "object"
                ? (card.iconSize.height[currentIconWidth as "base" | "xl"] ??
                  20)
                : (card.iconSize?.height ?? 20);

            // Handle custom card dimensions
            const cardWidth = card.cardSize?.width
              ? typeof card.cardSize.width === "object"
                ? card.cardSize.width
                : { base: "100%", xl: card.cardSize.width }
              : { base: "100%", xl: "495px" };

            const cardHeight = card.cardSize?.height
              ? typeof card.cardSize.height === "object"
                ? card.cardSize.height
                : { base: "200px", xl: card.cardSize.height }
              : { xl: "350px", base: "200px" };

            return (
              <Card
                key={key}
                width={cardWidth}
                maxWidth="495px"
                boxShadow="medium"
                // borderRadius="1rem"
                display="flex"
                padding="0"
                position="relative"
                height={cardHeight}
                style={{
                  cursor: card.link ? "pointer" : "default",
                }}
                onClick={() => {
                  if (card.link) {
                    const isExternal = /^https?:\/\//.test(card.link);
                    if (isExternal) {
                      window.open(card.link, "_blank", "noopener,noreferrer");
                    } else {
                      window.location.href = card.link;
                    }
                  }
                }}
              >
                <Image
                  src={card.bannerImg}
                  alt={card.bannerAlt + index}
                  width="100%"
                  height={cardHeight}
                  objectFit="cover"
                  objectPosition={card.bannerObjectPosition || "center"}
                />

                {/* Only render the content if the card has text or icons */}
                {(card.text || card.iconImg) && (
                  <Flex
                    position="absolute"
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    // Remove the backgroundColor property to remove the tint
                  >
                    <View>
                      {card.iconImg && (
                        <Image
                          src={card.iconImg}
                          alt={card.iconAlt + index}
                          width={width}
                          height={height}
                          objectFit="contain"
                        />
                      )}
                      {card.text && (
                        <Text
                          color="#FFF"
                          fontSize={{ base: "18px", xl: "22px" }}
                          fontStyle={{ base: "normal", xl: "normal" }}
                          fontWeight={500}
                          fontFamily="var(--font-ToyotaType-Regular)"
                          lineHeight={{ base: "normal", xl: "normal" }}
                        >
                          {card.text}
                        </Text>
                      )}
                      {card.text2 && (
                        <Image src={card.text2} alt={"text2-" + index} />
                      )}

                      {card.secondaryIcon && (
                        <Image
                          src={card.secondaryIcon.src}
                          alt={card.secondaryIcon.alt + index}
                          width={
                            card.secondaryIcon.size?.width ??
                            card.iconSize?.width
                          }
                          height={
                            card.secondaryIcon.size?.height ??
                            card.iconSize?.height
                          }
                          objectFit="contain"
                        />
                      )}
                    </View>
                  </Flex>
                )}
              </Card>
            );
          })}
        </Flex>
      </View>
    </>
  );
};

export default CanWeHelpYou;
