// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useEffect, useMemo, useState } from "react";
import renderComponent from "@/utils/renderComponent";
import {
  View,
  Text,
  Card,
  Image,
  useBreakpointValue,
  Grid,
  Button,
} from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import ToyotaImageCollage from "@/components/TgrImageGrid/ImageGrid";
import Link from "next/link";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

export function InicioComponent() {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const router = useRouter();

  const [vehicles, setVehicles] = useState([
    {
      id: 2,
      theme: "dark",
      name: "Corolla GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$130.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA GR.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/deportivos-tgr/corolla-gr-s",
      cotizarLink: "/cotizador/corolla",
    },
    {
      id: 3,
      theme: "dark",
      name: "Corolla Cross GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$161.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla Cross GR (1).png",
      imgMobile:
        "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA CROS GR.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/deportivos-tgr/corolla-cross-gr",
      cotizarLink: "/cotizador/corolla-cross",
    },
    {
      id: 4,
      theme: "dark",
      name: "Fortuner GR-S",
      modelName: "FORTUNER GR-S 4X4 DIÉSEL 2.8",
      year: "2026",
      type: "Diésel",
      price: "$335.500.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/vehicle-tabs/Desktop/Fortuner GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE FORTUNER GR.png",
      bgColor: "#161B1E",
      objectPosition: "76%",
      link: "/vehiculos/deportivos-tgr/fortuner-gr-s",
      cotizarLink: "/cotizador/fortuner",
    },
    {
      id: 5,
      theme: "dark",
      name: "Hilux GR-S",
      modelName: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT",
      year: "2026",
      type: "Diésel",
      price: "$309.500.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX GR.png",
      bgColor: "#1F2C40",
      objectPosition: "21%",
      link: "/vehiculos/deportivos-tgr/hilux-gr-s-iv",
      cotizarLink: "/cotizador/hilux",
    },
    {
      id: 6,
      theme: "dark",
      name: "Land Cruiser 300 GR-S",
      modelName: "LC300 GASOLINA GR-S",
      year: "2025",
      type: "Gasolina",
      price: "$662.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/LC 300 GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC300 GR.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/deportivos-tgr/land-cruiser-300-gr-s",
      cotizarLink: "/cotizador/land-cruiser-300",
    },
  ]);

  // Fetch latest prices and update the vehicles state
  useEffect(() => {
    const fetchAllVehiclePrices = async () => {
      try {
        const res = await fetch("/api/prices");
        if (!res.ok) throw new Error("Failed to fetch prices");

        const apiData: any[] = await res.json();

        // Normalize string helper
        const normalizeString = (str: string) =>
          str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/[\u00A0\u200B]+/g, " ") // remove non-breaking/zero-width spaces
            .replace(/\s+/g, " ") // normalize spaces
            .trim()
            .toUpperCase();

        const latestPrices: Record<string, { year: number; price: number }> =
          {};

        apiData.forEach((item) => {
          if (item.ACTIVO !== "true" || !item.VERSION) return;

          const key = normalizeString(item.VERSION);
          const year = Number(item.ANIOMODELO);
          const price = Number(item.PRECIO);

          if (!latestPrices[key] || year > latestPrices[key].year) {
            latestPrices[key] = { year, price };
          }
        });

        setVehicles((prev) =>
          prev.map((v) => {
            const key = normalizeString(v.modelName || v.version || v.name);
            const data = latestPrices[key];
            return data
              ? {
                  ...v,
                  price: `$${data.price.toLocaleString("es-CO")} COP`,
                  year: String(data.year),
                }
              : v;
          })
        );
      } catch (err) {
        console.error("Error fetching vehicle prices:", err);
      }
    };

    fetchAllVehiclePrices();
  }, []);

  const pageData: ComponentData[] = useMemo(() => {
    return [
      {
        component: "AWSAmplifyComponent",
        props: {
          image: {
            src: "/images/toyota-colombia.svg",
            alt: "Lotus flower",
            width: { base: "145px", xl: "283px" },
            maxWidth: {
              xl: "761px",
            },
            margin: {
              base: "0 auto",
            },
            height: "auto",
            display: "block",
            objectFit: "contain",
            padding: { base: "45px 15px 30px", xl: "119px 15px 10px" },
          },
          viewstyle: {
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          title: {
            text: "Conoce nuestros modelos Toyota Gazoo Racing Colombia",
            fontSize: { base: "18px", xl: "36px" },
            fontFamily: "var(--font-decimaMonoPro)",
            fontStyle: "normal",
            fontWeight: "400",
            maxWidth: {
              xl: "34%",
            },
            textAlign: { base: "center", xl: "center" },
            padding: { base: "12px 50px 12px", xl: "52px 0 62px" },
            color: "#000",
          },
          viewstyle: {
            backgroundColor: "#fff",
          },
        },
      },

      {
        component: "VehicleSwiperAll",
        props: {
          titleStyle: {
            fontFamily: {
              base: "var(--font-ToyotaType-Regular)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-toyotaDisplay)",
            },
            fontWeight: {
              base: "700",
              medium: "400",
              xl: "400",
            },
            fontSize: {
              base: "22px",
              xl: "28px",
            },
            lineHeight: {
              base: "24px",
              xl: "41.6px",
            },
          },
          YearandTypeStyle: {
            fontFamily: {
              base: "var(--font-ToyotaType-Regular)",
              medium: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-ToyotaType-Regular)",
            },
            fontWeight: {
              base: "400",
              medium: "",
              xl: "",
            },
            fontSize: { base: "9px", xl: "14px" },
            fontStyle: { base: "normal", xl: "normal" },
            lineHeight: { base: "normal", xl: "normal" },
          },
          descriptionStyle: {
            fontFamily: {
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-toyotaDisplay)",
            },
            fontWeight: {
              base: "400",
              medium: "",
              xl: "",
            },
            fontSize: { base: "14px", xl: "14px" },
            fontStyle: { base: "normal", xl: "normal" },
            lineHeight: { base: "19.6px", xl: "21px" },
          },
          priceStyle: {
            fontSize: { base: "18px", xl: "18px" },
            lineHeight: { base: "normal", xl: "25.67px" },
          },
          isDesktop: "2",
          vehicles: vehicles,
          viewStyle: {
            backgroundColor: "#fff",
            margin: {
              xl: "0 auto",
            },
            padding: {
              xl: "87px 50px 50px",
            },
            maxWidth: {
              xl: "80%",
            },
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          title: {
            text: "TGR Colombia",
            fontSize: { base: "18px", xl: "18px" },
            fontFamily: "var(--font-decimaMonoPro)",
            fontStyle: "normal",
            fontWeight: "400",
            maxWidth: {
              xl: "100%",
            },
            lineHeight: "30.4px",
            textAlign: { base: "center", xl: "center" },
            padding: { base: "32px 16px 0 15px", xl: "125px 0 0px" },
            color: "#fff",
            widht: "100%",
          },
          viewstyle: {
            display: "flex",
            justifyContent: "center",
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          title: {
            text: "Galería",
            fontSize: { base: "56px", xl: "56px" },
            fontFamily: "var(--font-decimaMonoPro)",
            fontStyle: "normal",
            fontWeight: "500",
            maxWidth: {
              xl: "70%",
            },
            lineHeight: "60px",
            textAlign: { base: "center", xl: "center" },
            padding: { base: "10px 16px 58px 15px", xl: "20px 0 98px" },
            color: "#fff",
            width: "100%",
          },
        },
      },
    ];
  }, [vehicles]);

  return (
    <View backgroundColor="#000" margin="0 auto">
      <View display="grid">
        <View
          textAlign={"center"}
          padding={{ base: "72px 16px 58px 16px", xl: "73px  0px 44px" }}
          lineHeight={"1.5"}
        >
          <Text fontSize="32px" color="#FFF">
            Colombia le da la bienvenida a
          </Text>
          <Text fontSize="32px" color="#D42224">
            Toyota Gazoo Racing
          </Text>
        </View>

        {/* Image Banner */}
        <Card textAlign="center" padding="0" backgroundColor={"#000"}>
          <Image
            width="100%"
            height="100%"
            maxWidth={"600px"}
            src="/images/TGR/inicio/my_22.jpg"
            alt="Toyota Gazoo Racing car"
          />
        </Card>

        {/* Meter Icon & Description */}
        <Card
          textAlign={"center"}
          backgroundColor="#000"
          padding={"44px 30px 69px"}
          margin={"0 auto"}
        >
          <View width={isMobile ? "100%" : "375px"}>
            <Image
              width="36px"
              height="30px"
              marginBlockEnd="15px"
              src="/svgs/meter.svg"
              alt="Performance meter"
            />
            <Text
              color="#fff"
              textAlign={"center"}
              fontFamily="var(--font-decimaMonoPro)"
            >
              El equipo de automovilismo y los vehículos ganadores de las
              competencias más retadoras del mundo
            </Text>
          </View>
        </Card>
      </View>

      <View width="100%" backgroundColor="#000">
        <Grid
          templateColumns={{ base: "1fr", medium: "1fr 1fr" }}
          gap="1.5rem"
          padding="3rem 1rem"
          maxHeight={{
            xl: "550px",
          }}
          backgroundColor="#D42224"
          alignItems="center"
          maxWidth="1200px"
          margin="0 auto"
        >
          <View color="#fff">
            <Text
              color="#fff"
              fontSize={{ base: "0.875rem", medium: "1.125rem" }}
              marginBottom="0.5rem"
              fontFamily="var(--font-decimaMonoPro)"
            >
              TGR Colombia
            </Text>
            <Text
              color="#fff"
              fontSize="3.5rem"
              fontWeight="400"
              lineHeight="110%"
              marginBottom="1.5rem"
              fontFamily="var(--font-decimaMonoPro)"
            >
              Historia
            </Text>
            <Text
              color="#fff"
              fontFamily="var(--font-decimaMonoProLt)"
              fontSize={{ base: "1.125rem", medium: "1.375rem" }}
              lineHeight="1.625rem"
              fontWeight="400"
              marginBottom="1.5rem"
            >
              Toyota Gazoo Racing es mucho<br className="br-hide"></br> más que
              el nombre de la<br className="br-hide"></br> división de deportes
              de motor<br className="br-hide"></br> de Toyota Motor Corporation.
            </Text>
            <Text
              color="#fff"
              fontFamily="var(--font-decimaMonoProLt)"
              fontSize={{ base: "1.125rem", medium: "1.375rem" }}
              lineHeight="1.625rem"
            >
              Nuestras actividades de base fundamentan aún más nuestro enfoque.
              Las lecciones que se aprenden en las condiciones extremas de las
              carreras se usan como una oportunidad para crear un mejor
              rendimiento automovilístico.
            </Text>

            <Link href="deportivos-tgr/historia">
              <Button
                size="small"
                marginTop="1.5rem"
                backgroundColor="#000"
                color="#fff"
                borderRadius="999px"
                fontWeight="500"
                fontSize="0.875rem"
                padding="0.5rem 1.25rem"
                border="0"
              >
                Conoce la historia de TGR
              </Button>
            </Link>
          </View>

          <Image
            src="/images/TGR/inicio/gallery/4.png"
            alt="Hero Interior"
            objectFit="cover"
            width="100%"
            borderRadius="0.5rem"
          />
        </Grid>

        <View
          padding={{ base: "3rem 1rem", xl: "3rem 1rem 11.5rem" }}
          color="#fff"
          margin="0 auto"
        >
          <Text
            margin={{
              xl: "0px 251px",
            }}
            maxWidth={{
              xl: "680px",
            }}
            fontFamily="var(--font-decimaMonoProLt)"
            fontSize={{ base: "1.5rem", medium: "1.375rem", xl: "36px" }}
            fontWeight="400"
            lineHeight="2.25rem"
            marginBottom="2rem"
            color={"#fff"}
            padding={{ base: "0 40px", medium: "50px 0px", xl: "104px 0" }}
            textAlign={{ base: "center", large: "left" }}
          >
            Nos inspiramos compitiendo en todo tipo de caminos. Nos inspiramos a
            construir vehículos cada vez mejores.
          </Text>
          <View width="100%" maxWidth="1200px" margin="0 auto" padding="0">
            <Grid templateColumns="1fr 1fr 1fr" gap={{ xl: "82px" }}>
              <Card backgroundColor={"#000"} padding={0}>
                <Image src="/images/TGR/inicio/card-01.png" alt="Card 1" />
              </Card>
              <Card backgroundColor={"#000"} padding={0}>
                <Image src="/images/TGR/inicio/card-02.png" alt="Card 2" />
              </Card>
              <Card backgroundColor={"#000"} padding={0}>
                <Image src="/images/TGR/inicio/card-03.png" alt="Card 3" />
              </Card>
            </Grid>
          </View>
        </View>
      </View>

      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
      <ToyotaImageCollage />
    </View>
  );
}
