import React, { useEffect, useState } from "react";
import {
  Tabs,
  View,
  Flex,
  Text,
  Image,
  Heading,
  Link,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { colors } from "@/theme/colors";
import "./WorldTabs.css";

interface WorldTabsProps {
  customClass?: string;
}

type VehicleCategory =
  | "Tecnología Toyota"
  | "Seguro Toyota"
  | "Cobertura extendida T10";

interface Vehicle {
  id: number;
  imageMobile: string;
  imageDesktop: string;
  name: string;
  link: string;
  description: string;
  imageStyle?: React.CSSProperties;
  objectFit?:
    | string
    | {
        base?: string;
        xl?: string;
        medium?: string;
        xxl?: string;
      };
}

const vehiclesData: Record<VehicleCategory, Vehicle[]> = {
  "Tecnología Toyota": [
    {
      id: 1,
      imageMobile: "/images/Toyota-Sostenible-002.png",
      imageDesktop: "/images/Toyota-Sostenible-002.png",
      name: "2024",
      link: "/descubre-toyota/seguridad/toyota-safety-sense",
      description:
        "Descubre la innovación y tecnología que hace único a Toyota.",
      imageStyle: {
        maxHeight: "300px",
        width: "auto",
      },
      objectFit: {
        base: "contain",
        medium: "contain",
        xl: "cover",
        xxl: "cover",
      },
    },
  ],
  "Seguro Toyota": [
    {
      id: 1,
      imageMobile: "/images/Toyota-Sostenible-001.png",
      imageDesktop: "/images/Toyota-Sostenible-001.png",
      name: "2024",
      link: "/cotiza-tu-toyota/seguro-toyota",
      description:
        "La mejor alternativa de protección diseñada exclusivamente para ti.",
      imageStyle: {
        maxHeight: "300px",
        width: "auto",
      },
      objectFit: {
        base: "contain",
        medium: "contain",
        xl: "cover",
        xxl: "cover",
      },
    },
  ],
  "Cobertura extendida T10": [
    {
      id: 1,
      imageMobile: "/images/Cobertura_extendida_T10_mobile.png",
      imageDesktop: "/images/Cobertura_extendida_T10_desktop.png",
      name: "2024",
      link: "/mi-toyota/cobertura-extendida-t10",
      description:
        "Protege tu Toyota por hasta 10 años o 200.000 KM, lo primero que ocurra.",
      imageStyle: {
        width: "auto",
      },
      objectFit: {
        base: "contain",
        medium: "contain",
        xl: "cover",
        xxl: "cover",
      },
    },
  ],
};

export const WorldTabs: React.FC<WorldTabsProps> = ({ customClass }) => {
  const [tab, setTab] = useState<VehicleCategory>("Tecnología Toyota");
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => {
    setIsDesktop(window?.innerWidth >= 1024);
  };

  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <View
      className={` ${customClass || ""}`}
      padding={{ base: "3.125rem 1rem", xl: "2.6875rem 1rem 4.4375rem" }}
      backgroundColor={colors.theme.darkerGray}
      color={colors.theme.white}
      overflow={"hidden"}
      textAlign="center"
    >
      <View
        textAlign={{
          base: "start",
          medium: "center",
          large: "center",
          xl: "center",
        }}
      >
        <Text
          fontSize={{ base: "14px", xl: "18px" }}
          color="#FFF"
          lineHeight={{ base: "19.6px", xl: "normal" }}
          marginBottom={".625rem"}
          fontWeight={400}
          fontStyle={"normal"}
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
        >
          Descubre
        </Text>
        <Heading
          level={2}
          fontSize={{ base: "56px", xl: "56px" }}
          lineHeight={{ base: "110.00000000000001%", xl: "61.6px" }}
          color="#FFF"
          fontStyle={"normal"}
          marginBottom={"2.625rem"}
          fontWeight={400}
          fontFamily={"var(--font-ToyotaType-Regular)"}
          letterSpacing={{ base: "-2%", xl: "-1.12px" }}
        >
          Descubre Toyota
        </Heading>
      </View>
      <Tabs.Container defaultValue={tab} width={"100%"}>
        <Tabs.List
          width={{
            base: "100%",
            medium: "max-content",
            large: "max-content",
            xl: "max-content",
          }}
          margin="0 auto"
          className="tabs-no-scrollbar"
          minWidth={{ base: "", xl: "", xxl: "" }}
          maxWidth={{ base: "", xl: "716px", xxl: "716px" }}
          value={tab}
          onChange={(value) => {
            setTab(value as unknown as VehicleCategory);
            console.log(value as unknown as VehicleCategory);
          }}
          justifyContent={{ medium: "center", large: "center" }}
          // gap={{ xl: "53px" }}
          style={{
            overflowX: "auto",
            scrollBehavior: "smooth",
            overflowY: "hidden",
          }}
        >
          {(Object.keys(vehiclesData) as VehicleCategory[]).map((category) => (
            <Tabs.Item
              key={category}
              value={category}
              className={`world__tabs__item ${tab === category ? "selected-tab" : ""}`}
              color="inherit"
              fontSize={{ base: "14px", xl: "18px" }}
              margin={{ base: "", xl: "", xxl: "" }}
              fontStyle={"normal"}
              lineHeight={{ base: "19.6px", xl: "normal" }}
              fontWeight={400}
              // marginRight={{ xl: "53px" }}
              fontFamily={{
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-ToyotaType-Regular)",
              }}
            >
              {category}
            </Tabs.Item>
          ))}
        </Tabs.List>

        {Object.keys(vehiclesData).map((category) => (
          <Tabs.Panel
            key={category}
            value={category}
            padding={{ base: "2.1875rem 0 1.25rem", xl: "1.875rem 0 2.5rem" }}
          >
            {vehiclesData[category as VehicleCategory].length > 0 ? (
              <Flex
                justifyContent="center"
                alignItems="center"
                gap="1rem"
                marginTop="1rem"
              >
                {vehiclesData[category as VehicleCategory].map((vehicle) => (
                  <View
                    key={vehicle.id}
                    maxWidth="57.1875rem"
                    boxShadow="medium"
                    borderRadius="1rem"
                  >
                    <Link href={vehicle.link} height={"100%"}>
                      <Image
                        src={
                          isDesktop ? vehicle.imageDesktop : vehicle.imageMobile
                        }
                        alt={vehicle.name}
                        width="100%"
                        style={vehicle.imageStyle}
                      />
                    </Link>
                    <Text
                      fontFamily={{
                        base: "var(--font-ToyotaType-Regular)",
                        xl: "var(--font-ToyotaType-Regular)",
                      }}
                      color="#F6F5F5"
                      fontSize={{ base: "18px", xl: "22px" }}
                      fontStyle={{ base: "normal", xl: "normal" }}
                      fontWeight={400}
                      lineHeight={{ base: "normal", xl: "normal" }}
                      textAlign={{ base: "start", xl: "center" }}
                      margin={{
                        base: "20px 26px 35px 0px",
                        xl: "31px 0px 35px 0px",
                      }}
                    >
                      {vehicle.description}
                    </Text>
                    <Link
                      className="conoce_mas_link"
                      href={vehicle.link}
                      fontFamily="var(--font-roboto)"
                      fontSize={{ base: "14px", xl: "16px", xxl: "16px" }}
                      fontWeight="500"
                      lineHeight="20px"
                      color="#000"
                      backgroundColor="#FFF"
                      textDecoration="none"
                      padding="10px 24px"
                      borderRadius="9999px"
                      display={{ base: "flex", xl: "flex", xxl: "flex" }}
                      maxWidth={{ base: "132px", xl: "290px" }}
                      minHeight={{ base: "20px", xl: "50px" }}
                      minWidth={{ xl: "290px", xxl: "290px" }}
                      letterSpacing="0.1px"
                      margin={{ base: "", xl: "0 auto", xxl: "0 auto" }}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Conoce más
                    </Link>
                  </View>
                ))}
              </Flex>
            ) : (
              <Text textAlign="center" marginTop="2rem" color="inherit">
                No hay vehículos en esta categoría.
              </Text>
            )}
          </Tabs.Panel>
        ))}
      </Tabs.Container>
      {/* <Text
        textAlign={{ base: "start", xl: "center" }}
        color="inherit"
        fontSize={{ base: "md", xl: "ml" }}
        fontWeight={400}
        fontFamily="var(--font-ToyotaType-Regular)"
      >
        Conoce la historia de Toyota en Colombia desde sus inicios.
      </Text>
      <Button
        type="button"
        color="white"
        style={{
          margin: "2rem auto 0",
          display: "inline-flex",
        }}
      >
        Conoce más
      </Button> */}
    </View>
  );
};

export default WorldTabs;
