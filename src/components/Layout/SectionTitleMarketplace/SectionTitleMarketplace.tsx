import { Heading, Flex, View, Image, Text } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

interface SectionTitleMarketplaceProps {
  title?: string | null;
  subtitle?: string | null;
  titleFontSize?: string | object;
  subtitleFontSize?: string | object;
  withoutPaddingBottom?: boolean;
  padding?: string | object;
  backText?: string;
  backLink?: string;
  border?: string;
}

export const SectionTitleMarketplace = ({
  title,
  subtitle,
  titleFontSize = { base: "32px" },
  subtitleFontSize = { base: "18px", xl: "22px" },
  withoutPaddingBottom = false,
  padding,
  backText,
  backLink,
  border,
}: SectionTitleMarketplaceProps) => {
  const router = useRouter();
  return (
    <>
      <style>
        {`
        @media (max-width: 720px) {
        .css-1d62fnp-control{
        height:40px !important;
        width:162px !important;
        position: absolute;
        top: -19px;
        left: -27vw;
        }
        }
        }
    `}
      </style>
      <View position="relative" maxWidth={"1920px"} margin={"0 auto"}>
        <View
          position={{ base: "relative", xl: "absolute" }}
          top={{ base: "0", xl: "40px" }}
        >
          {(backText || backLink) && (
            <Button
              color="transparent"
              textColor="black"
              onClick={() => (backLink ? router.push(backLink) : router.back())}
              padding={{ base: "24px 0px 0px 23px", xl: "0 40px" }}
              border="0"
            >
              <Image
                height={{ base: "12px", xl: "15px" }}
                width={{ base: "12px", xl: "15px" }}
                marginRight={{ base: "8px", xl: "15.45px" }}
                alt={"left arrow"}
                src={"/images/icons/left_arrow.svg"}
              />
              <Text
                fontFamily={"var(--font-toyotaDisplay)"}
                fontSize={{ base: "14px", xl: "18px" }}
                fontWeight={{ base: "400", xl: "400" }}
                lineHeight={{ base: "140%", xl: "100%" }}
                letterSpacing={{ base: "0px", xl: "0" }}
                style={{ verticalAlign: "middle" }}
              >
                {backText || "Volver"}
              </Text>
            </Button>
          )}
        </View>
        <Flex
          justifyContent={"center"}
          direction={"column"}
          alignItems={"center"}
          gap={"12px"}
          padding={
            padding || {
              base: "2rem 1rem",
              xl: withoutPaddingBottom
                ? "1.9375rem 1rem 1.5rem .9375rem"
                : "1.9375rem 1rem 4.25rem .9375rem",
            }
          }
          textAlign={"center"}
        >
          {title && (
            <Heading
              level={2}
              fontSize={
                typeof titleFontSize === "object"
                  ? { base: "22px", ...titleFontSize }
                  : { base: "22px", xl: titleFontSize || "32px" }
              }
              lineHeight={{ base: "100%", xl: "130%" }}
              fontWeight={{ base: "400" }}
              fontFamily={"var(--font-toyotaDisplay)"}
              style={{
                textWrap: "pretty",
                borderBottom: subtitle ? "1px solid #D42224" : "none",
                paddingBottom: subtitle ? "8px" : "0",
              }}
              textAlign={"center"}
              textTransform={"capitalize"}
              letterSpacing={"0"}
              padding={{ base: "0 8px 8px 8px", xl: "0px 20px 10px 20px" }}
            >
              {title.replace(/-/g, ' ')}
            </Heading>
          )}
          {subtitle && (
            <Heading
              level={2}
              fontFamily={"var(--font-toyotaDisplay)"}
              textTransform={"capitalize"}
              fontSize={
                typeof subtitleFontSize === "object"
                  ? { base: "18px", ...subtitleFontSize }
                  : { base: "18px", xl: subtitleFontSize || "22px" }
              }
              lineHeight={{ base: "100%", xl: "130%" }}
              style={{
                textWrap: "pretty",
              }}
            >
              {subtitle}
            </Heading>
          )}
        </Flex>
      </View>
    </>
  );
};
