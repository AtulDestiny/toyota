"use client";

import { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { UsedVehiclesFilter as Filter } from "@/components/Filter";
import { Flex, Grid, Heading, Image, Text, View } from "@aws-amplify/ui-react";
import { Usados } from "@/components/CardsList";
import { useBreakpointValue } from "@aws-amplify/ui-react"; // or from Chakra UI if using Chakra

export default function App() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [filterPanel, setFilterPanel] = useState<boolean>(false);
  const [showCertifiedModal, setShowCertifiedModal] = useState(false);

  function toggleFilterPanel(): void {
    setFilterPanel(!filterPanel);
  }

  const currentIconWidth = useBreakpointValue({
    base: "base",
    xl: "xl",
  });
  const textThirdCard = useBreakpointValue({
    base: "Tranquilidad en la compra. Eliminando los riesgos del mercado de usados en Colombia.",
    xl: "Tranquilidad en la compra. Eliminando los riesgos del mercado de usados en Colombia.",
  });
  const CertifiedModal = ({ onClose }: { onClose: () => void }) => {
    useEffect(() => {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, []);
    return (
      <View
        position="absolute"
        top={{ base: "0", xl: "0", xxl: "0" }}
        left={{ base: "0", xl: "0", xxl: "0" }}
        minWidth={{ base: "100%", xl: "1220px", xxl: "1530px" }}
        // minHeight={{ base: "", xl: "900px", xxl: "1076px" }}
        backgroundColor="rgba(0,0,0,0.5)"
        style={{
          zIndex: "999999999",
          justifyContent: "center",
          alignItems: "center",
        }}
        display="flex"
      >
        <View
          backgroundColor="#000"
          color="#fff"
          padding={{ base: "0px 15px", xl: "2rem" }}
          width={{ base: "", xl: "70%" }}
          minWidth={{ base: "", xl: "1220px", xxl: "1530px" }}
          // minHeight={{ base: "", xl: "900px", xxl: "1076px" }}
          style={{
            zIndex: "10",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 0px)",
            overflowY: "auto",
          }}
          position="relative"
        >
          <View
            onClick={onClose}
            color="#FFF"
            position="absolute"
            top={{ base: "1rem", xl: "56px" }}
            right={{ base: "15px", xl: "56px" }}
            height={{ base: "13.14px", xl: "45px", xxl: "45px" }}
            width={{ base: "13.14px", xl: "45px", xxl: "45px" }}
          >
            <Image
              src={"/images/icons/icon-close-white.png"}
              alt="Favorito"
              style={{ cursor: "pointer", objectFit: "contain" }}
            />
          </View>
          <Flex
            direction="column"
            alignItems="center"
            gap={{ base: "0px", xl: "0px", xxl: "0px" }}
          >
            <Text
              color="white"
              margin={{
                base: "42px 0px 0px",
                xl: "84px auto 0",
                xxl: "84px auto 0",
              }}
              fontFamily={"var(--font-toyotaDisplay)"}
              textAlign={{ base: "start", xl: "" }}
              fontSize={{ base: "32px", xl: "32px", xxl: "32px" }}
              fontWeight={{ base: "400", xl: "400" }}
              lineHeight={{ base: "130%", xl: "130%", xxl: "130%" }}
              style={{ verticalAlign: "middle" }}
              letterSpacing={{ base: "0px" }}
            >
              Vehículos Usados Certificados
            </Text>

            <Flex
              backgroundColor="#000"
              onClick={() => setShowCertifiedModal(true)}
              borderRadius={"10px"}
              justifyContent={{ base: "start", xl: "center" }}
              alignItems={{ base: "center", xl: "center" }}
              gap={{ base: "10px", xl: "12px" }}
              margin={{ base: "21px 0px 20.59px", xl: "" }}
              padding={{ base: "", xl: "30px", xxl: "30px" }}
              style={{
                cursor: "pointer",
              }}
              width={{ base: "100%", xl: "auto" }}
              height={{ base: "auto", xl: "auto" }}
              minWidth={{ base: "", xl: "290px" }}
              maxHeight={{ base: "", xl: "115px" }}
            >
              <Image
                src="/images/usados_certificados.svg"
                alt="used-vehicles"
                width={{ base: "42.82px", xl: "67px" }}
                height={{ base: "42.75px", xl: "67px" }}
                maxWidth={{ base: "42.82px", xl: "" }}
                minWidth={{ base: "42.82px", xl: "" }}
              ></Image>
              <Text
                fontSize={{ base: "9px", xl: "14px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                color="#FFF"
                lineHeight={{ base: "130%", xl: "140%" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "", xl: "left", xxl: "left" }}
              >
                USADOS <br /> CERTIFICADOS <br /> TOYOTA
              </Text>
            </Flex>
            <Text
              color="white"
              margin={{
                base: "",
                xl: "0 11%",
                xxl: "0px 19%",
              }}
              fontFamily={{
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-toyotaDisplay)",
                xxl: "var(--font-toyotaDisplay)",
              }}
              textAlign={{ base: "start", xl: "start", xxl: "start" }}
              fontSize={{ base: "14px", xl: "18px" }}
              fontStyle="normal"
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "140%", xl: "130%", xxl: "130%" }}
              style={{ verticalAlign: "middle" }}
              letterSpacing={{ base: "0px" }}
            >
              Puedes optar por un Usado Certificado Toyota que te garantiza que
              el vehículo de tu interés ha sido revisado en 155 puntos por
              técnicos expertos, por lo que cuenta con garantía de hasta 2 años
              o 20.000 Km.*, todas las campañas de seguridad realizadas y
              tranquilidad para ti en todo el proceso de compra.
            </Text>
          </Flex>
          <Flex direction="column" alignItems="start">
            <Text
              color="white"
              fontFamily={"var(--font-ToyotaType-Regular)"}
              textAlign={{ base: "start" }}
              fontSize={{ base: "09px", xl: "12px", xxl: "12px" }}
              fontWeight={{ base: "400", xl: "400", xxl: "400" }}
              lineHeight={{ base: "100%", xl: "100%" }}
              style={{ verticalAlign: "middle" }}
              margin={{
                base: "10px 0px 0px 0px ",
                xl: "9px 0px 0px 11%",
                xxl: "9px 0px 0px 19%",
              }}
              letterSpacing={{ base: "0px" }}
            >
              *Lo que primero ocurra.
            </Text>
          </Flex>
          <Text
            marginTop="2rem"
            color="white"
            margin={{
              base: "50px 0px  16px 0px",
              xl: "60px 0px 0px 11%",
              xxl: "60px 0px 0px 19%",
            }}
            fontFamily={"var(--font-ToyotaType-Regular)"}
            textAlign={{ base: "start", xl: "start", xxl: "start" }}
            fontSize={{ base: "1rem", xl: "22px", xxl: "22px" }}
            fontWeight={{ base: "400", xl: "400", xxl: "400" }}
            lineHeight={{ base: "140%", xl: "100%", xxl: "100%" }}
            style={{ verticalAlign: "middle" }}
            letterSpacing={{ base: "0px" }}
          >
            Características
          </Text>
          <Grid
            templateColumns={{ base: "1fr 1fr", xl: "1fr 1fr" }}
            width="100%"
            gap="0px"
            maxWidth={{ base: "", xl: "918px", xxl: "918px" }}
            margin={{ base: "", xl: "32px auto", xxl: "32px auto" }}
            border="0.5px solid #2A2A2A"
          >
            {[
              {
                icon: "/svgs/usados-garantia.svg",
                iconSize: {
                  width: { base: 15, xl: 25 },
                  height: { base: 19, xl: 32 },
                },

                text: `Garantía limitada de <br> 2 años o 20.000 Km.`,
              },
              {
                icon: "/svgs/search_menu.svg",
                iconSize: {
                  width: { base: 30, xl: 50.53 },
                  height: { base: 19, xl: 32 },
                },

                text: `155 puntos <br> inspeccionados por Técnicos Maestros Toyota.`,
              },
              {
                icon: "/svgs/red_square.svg",
                iconSize: {
                  width: { base: 26, xl: 43.79 },
                  height: { base: 19, xl: 32 },
                },

                text: textThirdCard,
              },
              {
                icon: "/svgs/search_security.svg",
                iconSize: {
                  width: { base: 15, xl: 25.26 },
                  height: { base: 19, xl: 32 },
                },

                text: `Todas las campañas <br> de seguridad realizadas.`,
              },
            ].map(({ icon, text, iconSize }, i) => {
              const width =
                typeof iconSize?.width === "object"
                  ? (iconSize.width[currentIconWidth as "base" | "xl"] ?? 20)
                  : (iconSize?.width ?? 20);

              const height =
                typeof iconSize?.height === "object"
                  ? (iconSize.height[currentIconWidth as "base" | "xl"] ?? 20)
                  : (iconSize?.height ?? 20);
              return (
                <Flex
                  key={i}
                  direction="column"
                  alignItems="center"
                  justifyContent="start"
                  textAlign="center"
                  gap="10px"
                  padding={{
                    base: "10px",
                    xl: "24px 42px",
                    xxl: "24px 42px",
                  }}
                  border="1px solid #161B1E"
                  style={{
                    borderBottom: i < 2 ? "0.5px solid #2A2A2A" : undefined,
                    borderRight:
                      i % 2 === 0 ? "0.5px solid #2A2A2A" : undefined,
                  }}
                  height={{ base: "120px", xl: "201px", xxl: "201px" }}
                  maxWidth={{ base: "183px", xl: "", xxl: "" }}
                >
                  <Image
                    src={icon}
                    alt={
                      typeof text === "string"
                        ? text.replace(/<[^>]+>/g, "")
                        : ""
                    }
                    width={width}
                    height={height}
                  />
                  <Text
                    color="white"
                    fontSize={{ base: "12px", xl: "22px", xxl: "22px" }}
                    fontFamily="var(--font-ToyotaType-Regular)"
                    lineHeight="140%"
                    dangerouslySetInnerHTML={{ __html: String(text) }}
                  />
                </Flex>
              );
            })}
          </Grid>

          <Text
            opacity={0.6}
            color="white"
            backgroundColor="#000"
            margin={{
              base: "10px 0px 38px",
              xl: "32px 0px 0px",
              xxl: "32px 0px 0px",
            }}
            fontFamily={"var(--font-ToyotaType-Regular)"}
            textAlign={{ base: "start", xl: "start" }}
            fontSize={{ base: "9px", xl: "12px" }}
            fontWeight={{ base: "400", xl: "400" }}
            lineHeight={{ base: "140%", xl: "normal" }}
            style={{ verticalAlign: "middle" }}
            letterSpacing={{ base: "0px" }}
            marginLeft={{ base: "", xl: "10%", xxl: "18.5%" }}
          >
            *Consulta a un asesor y revisa en los documentos del vehículo los
            términos y condiciones aplicables.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View textAlign={{ xl: "center" }}>
        <Flex
          maxWidth={"1920px"}
          margin={"0 auto"}
          alignItems={"center"}
          justifyContent="space-between"
          padding={{
            base: "2rem 1rem 0",
            xl: "2.9375rem 2rem 4.25rem 2rem",
          }}
          direction={{ base: "column", xl: "row" }}
        >
          <View width={{ base: "100%", xl: "50%" }} textAlign={"left"}>
            <Heading
              level={2}
              fontSize={32}
              fontFamily={"var(--font-toyotaDisplay)"}
              fontWeight={400}
              lineHeight={"130%"}
              letterSpacing={"0px"}
              style={{
                textWrap: "pretty",
              }}
            >
              Vehículos Usados
            </Heading>
            <Heading
              level={5}
              fontFamily={"var(--font-toyotaDisplay)"}
              fontSize={{ base: "14px", xl: "18px" }}
              fontWeight={"400"}
              lineHeight={{ base: "140%", xl: "100%" }}
              style={{
                textWrap: "pretty",
                verticalAlign: "middle",
              }}
              letterSpacing={{ base: "0%" }}
              maxWidth="620px"
              marginTop={{ base: "25px", xl: "0px" }}
            >
              Son vehículos que se encuentran en óptimas condiciones para que
              vayas por más, con toda la garantía y experiencia que nos
              caracteriza.
            </Heading>
          </View>
          <Flex
            width={{ base: "100%", xl: "50%" }}
            justifyContent={{ base: "center", xl: "flex-end" }}
          >
            <Flex
              backgroundColor="#F6F6F6"
              onClick={() => setShowCertifiedModal(true)}
              borderRadius={"10px"}
              justifyContent="center"
              alignItems="center"
              gap={{ base: "10px", xl: "24px" }}
              padding={24}
              style={{
                cursor: "pointer",
              }}
              width={{ base: "163px", xl: "auto" }}
              height={{ base: "104px", xl: "auto" }}
              minWidth={{ base: "", xl: "290px" }}
              maxHeight={{ base: "", xl: "115px" }}
            >
              <Image
                src="/images/usados_certificados.svg"
                alt="used-vehicles"
                width={{ base: "42.82px", xl: "67px" }}
                height={{ base: "42.75px", xl: "67px" }}
                maxWidth={{ base: "42.82px", xl: "" }}
                minWidth={{ base: "42.82px", xl: "" }}
              ></Image>
              <Text
                fontSize={{ base: "9px", xl: "14px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                lineHeight={{ base: "100%", xl: "140%" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "", xl: "left", xxl: "left" }}
              >
                USADOS <br /> CERTIFICADOS <br /> TOYOTA
              </Text>
              <Image
                marginTop="73px"
                marginLeft="auto"
                height="15px"
                alt={"right"}
                minWidth={{
                  base: "",
                  xl: "22.672065734863303px",
                  xxl: "22.672065734863303px",
                }}
                maxHeight={{
                  base: "",
                  xl: "14.000000000000012px",
                  xxl: "14.000000000000012px",
                }}
                src={"/images/icons/left_arrow.svg"}
                style={{
                  transform: "scaleX(-1)",
                }}
              />
            </Flex>
            <Flex
              backgroundColor="#F6F6F6"
              borderRadius={"10px"}
              justifyContent="center"
              alignItems="center"
              gap={{ base: "10px", xl: "24px" }}
              padding={24}
              margin={{
                base: "",
                xl: "0px 0px 0px 0px",
                xxl: "0px 163px 0px 0px",
              }}
              minWidth={{ base: "", xl: "290px" }}
              maxHeight={{ base: "", xl: "115px" }}
              style={{
                cursor: "pointer",
              }}
              width={{ base: "163px", xl: "auto" }}
              height={{ base: "104px", xl: "auto" }}
            >
              <Image
                src="/images/usados.svg"
                alt="used-vehicles"
                width={{ base: "42.82px", xl: "67px" }}
                height={{ base: "42.75px", xl: "67px" }}
                maxWidth={{ base: "42.82px", xl: "" }}
                minWidth={{ base: "42.82px", xl: "" }}
              ></Image>
              <Text
                fontSize={{ base: "9px", xl: "14px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                lineHeight={{ base: "100%", xl: "140%" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "", xl: "left", xxl: "left" }}
              >
                USADOS <br /> TOYOTA
              </Text>
              <Image
                marginTop="73px"
                marginLeft="auto"
                height="15px"
                alt={"right"}
                minWidth={{
                  base: "",
                  xl: "22.672065734863303px",
                  xxl: "22.672065734863303px",
                }}
                maxHeight={{
                  base: "",
                  xl: "14.000000000000012px",
                  xxl: "14.000000000000012px",
                }}
                src={"/images/icons/left_arrow.svg"}
                style={{
                  transform: "scaleX(-1)",
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </View>

      {showCertifiedModal && (
        <CertifiedModal onClose={() => setShowCertifiedModal(false)} />
      )}

      <View backgroundColor={"#F6F6F6"}>
        <Grid
          templateColumns={{ xl: "auto 1fr" }}
          gap={{ xl: "2rem", xxl: "5.4375rem" }}
          maxWidth={"1920px"}
          margin={"0 auto"}
          className="item-wrapper"
        >
          <Filter
            filters={filters}
            setFilters={setFilters}
            opened={filterPanel}
            toggle={toggleFilterPanel}
          />

          <Usados
            filters={filters}
            toggleFilterPanel={toggleFilterPanel}
            destailsButton={true}
          />
        </Grid>
      </View>
    </>
  );
}
