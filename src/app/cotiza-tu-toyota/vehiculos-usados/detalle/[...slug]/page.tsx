"use client";

import {
  Button as AmplifyButton,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  View,
  useBreakpointValue,
  Divider,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./page.css";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Layout/Button/Button";
import { MarketplaceCard } from "@/components/Cards/MarketplaceCard/MarketplaceCard";
import MarketplaceUsedDialog from "@/components/MarketplaceUsedDialog/MarketplaceUsedDialog";
import { useQuery } from "@tanstack/react-query";
import { fetchSimilarUsedVehiclesByCity, fetchUsedVehicleBySlug, fetchUsedVehicles } from "./queries";
import SkeletonLoader from "./SkeletonLoader";

const vehiclesData: { title: string; src: string }[] = [
  { title: "Yaris", src: "/images/Corolla_Cross_1_8_Seg_Hybrid_Tp_4x2.png" },
  { title: "Yaris", src: "/images/Corolla_Cross_1_8_Seg_Hybrid_Tp_4x2.png" },
  { title: "Yaris", src: "/images/Corolla_Cross_1_8_Seg_Hybrid_Tp_4x2.png" },
  { title: "Yaris", src: "/images/Corolla_Cross_1_8_Seg_Hybrid_Tp_4x2.png" },
];

interface Vehicle {
  id?: string;
  name: string;
  price: string;
  description: string;
  img: string;
  subDescription: string;
  slug: string;
  isFavorite: boolean;
}

interface CertifiedModalProps {
  onClose: () => void;
}

export default function DetalleUsados(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, large: false });
  const [currentDetalle, setCurrentDetalle] = useState<number>(1);
  const [currentDetalleSimilar, setCurrentDetalleSimilar] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const router = useRouter();
  const { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [version, setVersion] = useState<any>(null);
  const [gallery, setGallery] = useState<any>(null)

  const { data: Modeldata, isLoading, isError } = useQuery({
    queryKey: ["vehicle-details", slug?.[0]],
    queryFn: () => fetchUsedVehicleBySlug(slug?.[0] as string),
    enabled: !!slug?.[0],
  });

  const { data: SimilarVehicles, isLoading: isSimilarLoading } = useQuery({
    queryKey: ["similar-vehicles-city", Modeldata?.id],
    queryFn: () =>
      fetchSimilarUsedVehiclesByCity(
        Modeldata?.dealership?.city?.id    // only city ID
      ),
    enabled: !!Modeldata,
  });

  // const gallery = JSON.parse(Modeldata.galleryJson);
  const transformVehicles = (data: any[]): Vehicle[] => {
    return data?.map((item) => {
      const fullName = `${item.usedModel?.modelName || ""} ${item.modelVersion?.versionName?.trim() || ""}`.trim();

      const mainImageUrl =
        item.displayImage || "/images/test-car-image.avif";

      const maxLength = 35;
      const shortName =
        fullName.length > maxLength ? fullName.slice(0, maxLength) + "..." : fullName;

      return {
        id: item.id,
        name: shortName,
        price: item.price,
        description: `${item.modelVersion?.year || ""} | ${item.mileage.toLocaleString("es-CO")} km`,
        img: mainImageUrl,
        subDescription: `${item.dealership?.city?.name?.trim() || ""} - ${item.dealership?.name || ""}`,
        slug: item.slug,
        isFavorite: false,
      };
    });
  };

  const similarVehiclesList: Vehicle[] = Array.isArray(SimilarVehicles)
    ? transformVehicles(
      SimilarVehicles.filter(
        (item: any) => item.id !== Modeldata?.id
      )
    )
    : SimilarVehicles
      ? transformVehicles(
        [SimilarVehicles].filter(
          (item: any) => item.id !== Modeldata?.id
        )
      )
      : [];


  useEffect(() => {
    if (Modeldata) {
      setVersion(Modeldata);

      if (Modeldata.presignedImages) {
        const galleryData = Modeldata.presignedImages.map((img: any) => ({
          title: img.fileName?.replace(/\.[^/.]+$/, "") || "",
          src: img.presignedUrl || "/images/test-car-image.avif"
        }));

        setGallery(galleryData);
      }
    }

  }, [Modeldata, slug]);

  const totalPages = gallery?.length;

  const pagination = {
    clickable: true,
    el: ".custom-pagination",
    renderBullet: function () {
      return '<span class="swiper-pagination-bullet"></span>';
    },
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };


  const CertifiedModal: React.FC<CertifiedModalProps> = ({ onClose }) => {
    useEffect(() => {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, []);
    return (
      <Flex
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        backgroundColor="rgba(0, 0, 0, 0.6)" // ✅ backdrop
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          zIndex: "999999999",
        }}
      >
        <View
          backgroundColor="#161B1E"
          padding={isMobile ? "0px" : "1.5rem"}
          maxWidth={isMobile ? "100%" : ""}
          minWidth={{ base: "auto", xl: "800px", xxl: "800px" }}
          maxHeight={{ base: "952px", xl: "", xxl: "" }}
          position={{ base: "absolute", xl: "absolute" }}
          top={{ base: "0", medium: "0" }}
          left={{ base: "0", medium: "50%", xl: "auto" }}
          transform={{ medium: "translateX(-50%)", xl: "initial" }}
          color="#FFF"
          style={{
            zIndex: "999999999",
            // overflowY: "scroll",
          }}
        >
          {/* Header */}
          <Flex
            justifyContent={{
              base: "",
              xl: "space-between",
              xxl: "space-between",
            }}
            alignItems="flex-start"
            position="relative"
          >
            <View
              backgroundColor="#161B1E"
              width="800px"
              // height={{ base: "auto", xl: "auto" }}
              padding={{ base: "22px 15px 23px", xl: "2rem", xxl: "2rem" }}
              color="#FFF"
              position="relative"
              maxWidth={{ base: "", xl: "800px" }}
              maxHeight={{ base: "952px", xl: "1105px", xxl: "1105px" }}
              height={{ base: "100vh", xl: "calc(100vh - 50px)" }}
              style={{
                overflowY: "scroll",
              }}
            >
              {/* Header */}
              <Flex
                direction="column"
                margin={{ base: "23px 0px 0px 0px", xl: "", xxl: "" }}
                gap="0"
                marginBottom="1.5rem"
              >
                <Text
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "14px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-toyotaDisplay)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "140%", xl: "140%" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "center", xxl: "center" }}
                >
                  Concesionario
                </Text>
                <Text
                  fontWeight={{ base: "700", xl: "400", xxl: "400" }}
                  marginTop="4px"
                  marginBottom="5px"
                  color="#FFF"
                  fontSize={{ base: "26px", xl: "32px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "center", xxl: "center" }}
                >
                  DISTOYOTA Calle 150
                </Text>
                <Text
                  marginTop="4px"
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-ToyotaType-Regular)",
                    xxl: "var(--font-ToyotaType-Regular)",
                  }}
                  lineHeight={{ base: "130%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "center", xxl: "center" }}
                  padding={{ base: "", xl: "0px 30%", xxl: "0px 31%" }}
                >
                  Descubre todos los servicios y facilidades que tenemos para
                  to. Av. Cra 70 # 102 - 02
                </Text>

                <View
                  margin={{ base: "4px 0px 0px", xl: "0 auto", xxl: "0 auto" }}
                >
                  <Link
                    href="/cotizador/prueba"
                    style={{
                      backgroundColor: "#FFF",
                      backgroundClip: "text",
                      color: "#FFF",
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
                    Ver en Google Maps
                  </Link>
                </View>
              </Flex>

              <Divider
                borderColor="#58595B"
                marginBottom={{ base: "1.5rem", xl: "32px" }}
              />

              {/* Horarios de atención */}
              <Text
                color="#FFF"
                fontWeight={{ base: "700", xl: "700", xxl: "700" }}
                fontSize={{ base: "22px", xl: "22px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                lineHeight={{ base: "140%", xl: "109%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
                padding={{ base: "", xl: "", xxl: "" }}
              >
                Horarios de atención
              </Text>

              <Text
                margin={{
                  base: "12px 0 0 0",
                  xl: "12px 0 0 0",
                  xxl: "12px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "18px", xl: "22px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                lineHeight={{ base: "100%", xl: "100%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                Sala de ventas:
              </Text>
              <Flex justifyContent="space-between">
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  Lunes a Viernes
                </Text>
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  8 am a 6 pm
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  Sábado
                </Text>
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  9 am a 4 pm
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  Domingos
                </Text>
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  10 am a 4 pm
                </Text>
              </Flex>

              <Text
                margin={{
                  base: "24px 0 0 0",
                  xl: "24px 0 0 0",
                  xxl: "24px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "18px", xl: "14px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                lineHeight={{ base: "100%", xl: "100%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                Taller y respuestos:
              </Text>
              <Flex justifyContent="space-between">
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  Lunes a Viernes
                </Text>
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  6 am a 8 pm
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  Sábado
                </Text>
                <Text
                  margin={{
                    base: "12px 0 0 0",
                    xl: "12px 0 0 0",
                    xxl: "12px 0 0 0",
                  }}
                  color="#FFF"
                  fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                  fontSize={{ base: "12px", xl: "14px" }}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                    xxl: "var(--font-toyotaDisplay)",
                  }}
                  lineHeight={{ base: "100%", xl: "140%" }}
                  fontStyle={{ base: "normal", xl: "normal" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  textAlign={{ base: "left", xl: "left", xxl: "left" }}
                >
                  8 am a 2 pm
                </Text>
              </Flex>

              <Divider
                borderColor="#58595B"
                marginTop="1.5rem"
                marginBottom="1.5rem"
              />

              {/* Contacto */}
              <Text
                margin={{
                  base: "32px 0 0 0",
                  xl: "32px 0 0 0",
                  xxl: "32px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "700", xl: "700", xxl: "700" }}
                fontSize={{ base: "22px", xl: "22px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                lineHeight={{ base: "109.09%", xl: "109.09%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                Contacto
              </Text>

              <Text
                margin={{
                  base: "12px 0 0 0",
                  xl: "12px 0 0 0",
                  xxl: "12px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "18px", xl: "22px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                lineHeight={{ base: "100%", xl: "100%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                Teléfono:
              </Text>
              <Text
                margin={{
                  base: "12px 0 0 0",
                  xl: "12px 0 0 0",
                  xxl: "12px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "12px", xl: "14px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                lineHeight={{ base: "100%", xl: "140%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                (601) 6430505
              </Text>

              <Text
                margin={{
                  base: "24px 0 0 0",
                  xl: "24px 0 0 0",
                  xxl: "24px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "18px", xl: "22px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                lineHeight={{ base: "100%", xl: "100%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                Teléfono agendamiento de citas:
              </Text>
              <Text
                margin={{
                  base: "12px 0 0 0",
                  xl: "12px 0 0 0",
                  xxl: "12px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "12px", xl: "14px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                lineHeight={{ base: "100%", xl: "140%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                (601) 6430505 Opción 4
              </Text>
              <Text
                margin={{
                  base: "5PX 0 0 0",
                  xl: "1px 0 0 0",
                  xxl: "1px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "12px", xl: "14px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                lineHeight={{ base: "100%", xl: "140%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                311 259 8958
              </Text>

              <Text
                margin={{
                  base: "24px 0 0 0",
                  xl: "24px 0 0 0",
                  xxl: "24px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "18px", xl: "22px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                lineHeight={{ base: "100%", xl: "100%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                Correo electrónico:
              </Text>
              <Text
                margin={{
                  base: "12px 0 0 0",
                  xl: "12px 0 0 0",
                  xxl: "12px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "12px", xl: "14px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                lineHeight={{ base: "100%", xl: "140%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                distoyota102@gmail.com
              </Text>

              <Text
                margin={{
                  base: "24px 0 0 0",
                  xl: "24px 0 0 0",
                  xxl: "24px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "18px", xl: "22px" }}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                lineHeight={{ base: "100%", xl: "100%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
              >
                Página Web:
              </Text>
              <Text
                margin={{
                  base: "10px 0 0 0",
                  xl: "10px 0 0 0",
                  xxl: "10px 0 0 0",
                }}
                color="#FFF"
                fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                fontSize={{ base: "14px", xl: "14px" }}
                fontFamily={{
                  base: "var(--font-roboto)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                lineHeight={{ base: "100%", xl: "140%" }}
                fontStyle={{ base: "normal", xl: "normal" }}
                letterSpacing={{ base: "0px", xl: "0px" }}
                textAlign={{ base: "left", xl: "left", xxl: "left" }}
                style={
                  isMobile
                    ? {
                      textDecorationLine: "underline",
                      textDecorationStyle: "solid",
                      textDecorationSkipInk: "none",
                      textDecorationThickness: "auto",
                      textUnderlineOffset: "auto",
                      textUnderlinePosition: "from-font",
                    }
                    : {}
                }
              >
                https://distoyota.com/
              </Text>
              <Divider
                marginTop={{ base: "24px", xl: "24px", xxl: "24px" }}
                marginBottom="1rem"
                borderColor="#58595B"
              />

              <Flex
                justifyContent="center"
                marginTop={{ base: "36px", xl: "40px", xxl: "40px" }}
              >
                <Button
                  size="small"
                  color="deepred"
                  fontSize={{ base: "14px", xl: "16px" }}
                  fontFamily="var(--font-roboto)"
                  lineHeight={{ base: "142.857%", xl: "125%", xxl: "125%" }}
                  minWidth={{ base: "250px", xl: "290px", xxl: "290px" }}
                  maxHeight={{ base: "40px", xl: "50px", xxl: "50px" }}
                  letterSpacing={{ base: "0.1px", xl: "0.1px" }}
                >
                  ¿Necesitas ayuda? Contáctanos
                </Button>
              </Flex>
            </View>
            <Link
              onClick={() => setIsOpen(false)}
              color="#FFF"
              position="absolute"
              // right={{ base: "15px", medium: "15px" }}
              // top={{ xl: "15px" }}
              top="1rem"
              right="1rem"
              height={{ base: "13.14px", xl: "45px", xxl: "45px" }}
              width={{ base: "13.14px", xl: "45px", xxl: "45px" }}
            >
              <Image
                src={"/images/icons/icon-close-white.png"}
                alt="Favorito"
                style={{ cursor: "pointer", objectFit: "contain" }}
              />
            </Link>
          </Flex>
        </View>
      </Flex>
    );
  };

  return (
    <>
      {
        <style>
          {`
        .swiper-slide , .swiper-slide-active{
        display:flex !important;
        align-items:center !important;
        justify-content:center !important;}

        @media (min-width: 370px) and (max-width: 479px) {
           .custom-swiper-2 .swiper-slide {
            min-width: 350px;
          }
        }
         @media (min-width: 480px) and (max-width: 680px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 250px;
          }
        }

        @media (min-width: 681px) and (max-width: 767px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 250px;
          }
        }
        @media (min-width: 768px) and (max-width: 1200px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 267px;
          }
        }
        @media (min-width: 1201px) and (max-width: 1279px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 250px;
          }
        }
        /* 1280px to 1439px */
        @media (min-width: 1280px) and (max-width: 1439px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 380px;
          }
        }

        /* 1440px to 1599px */
        @media (min-width: 1440px) and (max-width: 1599px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 380px;
          }
        }

        /* 1600px to 1919px */
        @media (min-width: 1600px) and (max-width: 1919px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 380px;
          }
        }

        /* 1920px and up */
        @media (min-width: 1920px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 400px;
          }
        }
    `}
        </style>
      }
      {
        isLoading ? <SkeletonLoader /> : (
          <>
            <MarketplaceUsedDialog
              isOpen={isDialogOpen}
              onToggle={() => setIsDialogOpen(!isDialogOpen)}
              advisorPhone={Modeldata.advisorPhone}
              version={version}
            />
            <View paddingBottom={{ base: "4.25rem", xl: "120px" }}>
              <Link
                href="/cotiza-tu-toyota/vehiculos-usados"
                display={{ base: "inline-block" }}
                width={{ base: "max-content" }}
                padding={{
                  base: "1.12rem 0.94rem 0.94rem",
                  large: "2.69rem 3.1669rem 3.56rem",
                }}
              >
                <Flex gap={{ base: "0.7869rem" }} alignItems={{ base: "center" }}>
                  <Image
                    src="/svgs/arrow--left-black-short.svg"
                    alt="Arrow left"
                    maxHeight={{ base: "24px", xl: "" }}
                    minWidth={{ base: "24px", xl: "" }}
                  />
                  <Text
                    fontFamily={"var(--font-toyotaDisplay)"}
                    textAlign={{ base: "center" }}
                    fontSize={{ base: "0.875rem", xl: "" }}
                    fontWeight={{ base: "400" }}
                    lineHeight={{ base: "140%" }}
                    style={{ verticalAlign: "middle" }}
                    letterSpacing={{ base: "0px" }}
                  >
                    Volver a Resultados
                  </Text>
                </Flex>
              </Link>

              <View padding={{ base: "0 0.94rem" }}>
                <Flex
                  className="detalle"
                  backgroundColor={{ base: "#F6F6F6" }}
                  position={"relative"}
                  width={{ base: "100%", large: "min(76.25rem, 100%)" }}
                  margin={"0 auto"}
                  padding={{
                    base: "0.9375rem 1.25rem 0.9375rem",
                    large: "1.9rem 6.565rem 2.37rem",
                  }}
                  // borderRadius={{ base: "0.5rem" }}
                  alignItems={{ base: "center" }}
                  justifyContent={{ base: "center" }}
                  direction={{ base: "column", large: "row" }}
                  gap={{ base: "0.75rem", large: "9.63rem" }}
                  minHeight={{ base: "420px", xl: "538px", xxl: "538px" }}
                  maxHeight={{ base: "", xl: "538px", xxl: "538px" }}
                  minWidth={{ base: "345px", xl: "1220px" }}
                >

                  {gallery?.length && gallery.length > 1 && (
                    <AmplifyButton
                      className="detalle-prev arrowCustom arrowCustom--prev"
                      display={{ base: "none", large: "flex" }}
                      position={{
                        base: "static",
                        large: "relative",
                        xl: "relative",
                        xxl: "relative",
                      }}
                      left={{ base: "", large: "13%", xl: "20%", xxl: "20%" }}
                      width={50}
                      height={50}
                      borderRadius={"50%"}
                      backgroundColor={"black"}
                      padding="14px 18px 14px 14px"
                      style={{ aspectRatio: "1 / 1", zIndex: "9" }}
                    >
                      <Image src="/images/arrow-simple-prev.svg" alt="Arrow prev" />
                    </AmplifyButton>
                  )}

                  <Flex
                    width={"100%"}
                    direction={{ base: "column" }}
                    gap={{ base: "1.06rem" }}
                  >
                    <Flex direction={{ base: "column" }} gap={{ base: "0.44rem" }}>
                      <Flex
                        justifyContent={{ base: "space-between" }}
                        gap={{ base: "1rem" }}
                      >
                        <Heading
                          as="h2"
                          fontFamily={{
                            base: "var(--font-ToyotaType-Regular)",
                            xl: "var(--font-toyotaDisplay)",
                            xxl: "var(--font-toyotaDisplay)",
                          }}
                          color={"#58595B"}
                          textAlign={{ base: "start", xl: "start", xxl: "start" }}
                          fontSize={{ base: "1.125rem", xl: "32px", xxl: "32px" }}
                          fontWeight={{ base: "400", xl: "400", xxl: "400" }}
                          lineHeight={{ base: "100%", xl: "130%", xxl: "130%" }}
                          style={{ verticalAlign: "middle" }}
                          letterSpacing={{ base: "0px", xl: "0px", xxl: "0px" }}
                          marginLeft={{ base: "", xl: "20%" }}
                        >
                          {version?.modelVersion?.versionName}
                        </Heading>
                        <Image
                          src={
                            isFavorite
                              ? "/images/icons/favorite.svg"
                              : "/svgs/heart.svg"
                          }
                          alt="Heart"
                          style={{ cursor: "pointer" }}
                          maxHeight={{ base: "17px", xl: "34px" }}
                          minWidth={{ base: "", xl: "35px", xxl: "35px" }}
                          minHeight={{ base: "", xl: " 31.32px", xxl: " 31.3px" }}
                          onClick={handleToggleFavorite}
                        />
                      </Flex>

                      <Flex direction={{ base: "column" }} gap={{ base: "0" }}>
                        <Heading
                          as="h3"
                          fontFamily={{
                            base: "var(--font-ToyotaType-Regular)",
                            xl: "var(--font-toyotaDisplay)",
                            xxl: "var(--font-toyotaDisplay)",
                          }}
                          color={"#000"}
                          textAlign={{ base: "left", xl: "start", xxl: "start" }}
                          fontSize={{ base: "1.625rem", xl: "32px", xxl: "32px" }}
                          fontWeight={{ base: "700", xl: "400", xxl: "400" }}
                          lineHeight={{ base: "100%", xl: "130%", xxl: "130%" }}
                          letterSpacing={{ base: "0px", xl: "0px", xxl: "0px" }}
                          style={{ verticalAlign: "middle" }}
                          marginLeft={{ base: "", xl: "20%" }}
                        >
                          $ {version?.price?.toLocaleString("es-CO")}
                        </Heading>
                      </Flex>
                    </Flex>
                    {
                      gallery?.length && gallery.length > 1 ? (<Swiper
                        className="swiper-container"
                        loop
                        slidesPerView={1}
                        centeredSlides
                        pagination={pagination}
                        navigation={{
                          nextEl: ".detalle-next",
                          prevEl: ".detalle-prev",
                        }}
                        onSlideChange={(swiper) =>
                          setCurrentDetalle(swiper.realIndex + 1)
                        }
                        modules={[Pagination, Navigation]}
                      >
                        {gallery?.map((vehicle: any) => (
                          <SwiperSlide key={vehicle.title}>
                            <Flex
                              justifyContent="center"
                              alignItems="center"
                              backgroundColor="white"
                              width={{ base: "305px", xl: "600px" }}
                              height={{ base: "205px", xl: "325px" }}
                            >
                              <Image
                                src={vehicle.src}
                                alt={vehicle.title}
                                width={"100%"}
                                height={"100%"}
                                objectFit={"cover"}
                                maxHeight={{ base: "205px", xl: "325px", xxl: "325px" }}
                                minWidth={{ base: "305px", xl: "" }}
                                maxWidth={{ base: "", xl: "600px", xxl: "600px" }}
                              />
                            </Flex>
                          </SwiperSlide>
                        ))}

                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          gap={"1rem"}
                          paddingTop={"2rem"}
                          width={{ large: "min(27.5rem, 100%)" }}
                          margin={{ large: "0 auto" }}
                          display={{ base: "none", large: "flex" }}
                        >
                          <View className="custom-pagination"></View>
                        </Flex>
                      </Swiper>
                      ) :
                        (
                          <>
                            {gallery?.map((vehicle: any) => (
                              <Flex
                                key={vehicle.title}
                                justifyContent="center"
                                alignItems="center"
                                width={{ base: "305px", xl: "100%" }}
                                height={{ base: "205px", xl: "325px" }}
                              >
                                <Image
                                  src={vehicle.src}
                                  alt={vehicle.title}
                                  width={"100%"}
                                  height={"100%"}
                                  objectFit={"cover"}
                                  maxHeight={{ base: "205px", xl: "325px", xxl: "325px" }}
                                  minWidth={{ base: "305px", xl: "" }}
                                  maxWidth={{ base: "", xl: "600px", xxl: "600px" }}
                                />
                              </Flex>
                            ))}
                          </>)
                    }
                  </Flex>

                  {gallery?.length && gallery.length > 1 && (

                    <AmplifyButton
                      className="detalle-next arrowCustom arrowCustom--next"
                      display={{ base: "none", large: "flex" }}
                      position={{
                        base: "static",
                        large: "relative",
                        xl: "relative",
                        xxl: "relative",
                      }}
                      right={{ base: "", large: "13%", xl: "20%", xxl: "20%" }}
                      width={50}
                      height={50}
                      borderRadius={"50%"}
                      backgroundColor={"black"}
                      padding="14px 14px 14px 18px"
                      style={{ aspectRatio: "1 / 1", zIndex: "9" }}
                    >
                      <Image src="/images/arrow-simple-next.svg" alt="Arrow next" />
                    </AmplifyButton>
                  )}

                  {isMobile ? (
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width={"100%"}
                      maxWidth={{ base: "21.625rem", large: "max-content" }}
                      gap={{ large: "8.75rem" }}
                      margin={{ base: "0 auto" }}
                    >
                      <AmplifyButton
                        className="detalle-prev arrowCustom arrowCustom--prev"
                        color={"transparent"}
                        padding={"0"}
                        width={"3.4375rem"}
                        height={"1.875rem"}
                      >
                        {/* <Image
                    src="/images/arrow-simple-prev.svg"
                    alt="Arrow prev"
                    width={"1.3125rem"}
                    height={".8125rem"}
                  /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="56"
                          height="30"
                          viewBox="0 0 56 30"
                          fill="none"
                        >
                          <rect
                            x="0.5"
                            width="55"
                            height="30"
                            rx="15"
                            fill="url(#paint0_linear_4257_9430)"
                          />
                          <path
                            d="M31.9062 19.59L27.3263 15L31.9062 10.41L30.4963 9L24.4963 15L30.4963 21L31.9062 19.59Z"
                            fill="#FFF"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4257_9430"
                              x1="28"
                              y1="0"
                              x2="28"
                              y2="30"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop />
                              <stop offset="1" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </AmplifyButton>
                      <Text
                        fontWeight={500}
                        fontFamily="var(--font-ToyotaType-Regular)"
                      >
                        {currentDetalle} de {totalPages}
                      </Text>
                      <AmplifyButton
                        className="detalle-next arrowCustom arrowCustom--next"
                        color={"transparent"}
                        padding={"0"}
                        width={"3.4375rem"}
                        height={"1.875rem"}
                      >
                        {/* <Image
                    src="/images/arrow-simple-next.svg"
                    alt="Arrow next"
                    width={"1.3125rem"}
                    height
                    ={".8125rem"}
                  /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="56"
                          height="30"
                          viewBox="0 0 56 30"
                          fill="none"
                        >
                          <rect
                            x="0.5"
                            width="55"
                            height="30"
                            rx="15"
                            fill="url(#paint0_linear_4257_9434)"
                          />
                          <path
                            d="M24.5 10.41L29.08 15L24.5 19.59L25.91 21L31.91 15L25.91 9L24.5 10.41Z"
                            fill="#FFF"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4257_9434"
                              x1="28"
                              y1="0"
                              x2="28"
                              y2="30"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop />
                              <stop offset="1" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </AmplifyButton>
                    </Flex>
                  ) : null}
                </Flex>
              </View>

              <Flex
                direction={{ base: "column", large: "row" }}
                justifyContent={{
                  large: "space-between",
                  xl: "center",
                  xxl: "center",
                }}
                alignItems={{ large: "center" }}
                gap={{ base: "1.9375rem" }}
                width={{ large: "min(76.25rem, 100%)" }}
                margin={"0 auto"}
                padding={{ base: "1.31rem 0.94rem 0", xl: "0px 0px 0px" }}
              >
                <Flex
                  direction={{ base: "column", large: "row" }}
                  gap={{ base: "0", large: "1.25rem" }}
                  padding={{ base: "0 1.25rem", xl: "0" }}
                >
                  <Text
                    fontFamily={"var(--font-ToyotaType-Regular)"}
                    fontSize={{ base: "1.125rem", xl: "22px" }}
                    fontWeight={{ base: "500" }}
                    fontStyle={{ base: "normal" }}
                    lineHeight={{ base: "normal", xl: "100%" }}
                    letterSpacing={{ base: "", xl: "0px" }}
                    style={{ verticalAlign: "middle" }}
                    marginTop={{ base: "", xl: "50px", xxl: "50px" }}
                  >
                    {version?.modelYear} | {version?.mileage} Km
                  </Text>
                  <Text
                    fontFamily={"var(--font-ToyotaType-Regular)"}
                    fontSize={{ base: "1.125rem", xl: "22px" }}
                    fontWeight={{ base: "500" }}
                    fontStyle={{ base: "normal" }}
                    lineHeight={{ base: "normal", xl: "100%" }}
                    letterSpacing={{ base: "", xl: "0px" }}
                    style={{ verticalAlign: "middle" }}
                    marginTop={{ base: "", xl: "50px", xxl: "50px" }}
                  >
                    {" "}
                    {version?.certified ? "Usado certificado" : "Usado Toyota "}
                  </Text>
                  <Flex
                    marginTop={{ base: "", xl: "52px", xxl: "52px" }}
                    onClick={() => setIsOpen(true)}
                  >
                    <Text
                      margin={{ base: "4px 0 0", xl: "4px 0 0" }}
                      minWidth={{ base: "", xl: "19px", xxl: "19px" }}
                      minHeight={{ base: "", xl: "26px", xxl: "26px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 10 14"
                        fill="none"
                      >
                        <path
                          d="M5 10.8146C6.35795 9.76696 7.38532 8.71199 8.08212 7.64971C8.77878 6.58743 9.12712 5.62696 9.12712 4.76829C9.12712 3.61476 8.74154 2.67099 7.97039 1.93697C7.19923 1.20308 6.2091 0.836132 5 0.836132C3.7909 0.836132 2.80077 1.20308 2.02962 1.93697C1.25846 2.67099 0.872885 3.61476 0.872885 4.76829C0.872885 5.61934 1.22122 6.57601 1.91788 7.63829C2.61468 8.70057 3.64205 9.75935 5 10.8146ZM5 11.8816C3.32744 10.6545 2.07596 9.4309 1.24558 8.21082C0.415192 6.99073 0 5.84322 0 4.76829C0 3.37111 0.468718 2.2271 1.40615 1.33626C2.34346 0.445421 3.54141 0 5 0C6.45859 0 7.65654 0.445421 8.59385 1.33626C9.53128 2.2271 10 3.37111 10 4.76829C10 5.84322 9.58481 6.99073 8.75442 8.21082C7.92404 9.4309 6.67256 10.6545 5 11.8816ZM4.98808 6.1215C5.37962 6.1215 5.71122 5.99132 5.98288 5.73097C6.25468 5.47075 6.39058 5.15691 6.39058 4.78947C6.39058 4.42203 6.25468 4.1082 5.98288 3.84797C5.71122 3.58762 5.37962 3.45745 4.98808 3.45745C4.60449 3.45745 4.27885 3.58762 4.01115 3.84797C3.74333 4.1082 3.60942 4.42203 3.60942 4.78947C3.60942 5.15691 3.74333 5.47075 4.01115 5.73097C4.27885 5.99132 4.60449 6.1215 4.98808 6.1215ZM0 14V13.1639H10V14H0Z"
                          fill="#D42224"
                        />
                      </svg>{" "}
                    </Text>
                    <Text
                      display="inline-flex"
                      margin={{ base: "9px 0 0", xl: "" }}
                      fontFamily={"var(--font-roboto)"}
                      fontSize={{ base: "14px", xl: "22px" }}
                      fontWeight={{ base: "600", xl: "500" }}
                      fontStyle={{ base: "normal" }}
                      lineHeight={{ base: "normal" }}
                      color="#D42224"
                      style={{
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                        textDecorationSkipInk: "none",
                        textDecorationThickness: "auto",
                        textUnderlineOffset: "auto",
                        textUnderlinePosition: "from-font",
                      }}
                    >
                      {version?.dealership?.name}
                    </Text>
                  </Flex>
                </Flex>

                {/* {isOpen && <CertifiedModal onClose={() => setIsOpen(false)} />} */}
                <AmplifyButton
                  backgroundColor={{ base: "#D42224" }}
                  color={{ base: "#FFF" }}
                  border={{ base: "none" }}
                  borderRadius={{ base: "6.25rem" }}
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  textAlign={{ base: "center" }}
                  fontSize={{ base: "0.875rem" }}
                  fontWeight={{ base: "500" }}
                  lineHeight={{ base: "1.25rem" }}
                  letterSpacing={{ base: "0.00625rem" }}
                  padding={{ base: "0.62rem", large: "0.94rem" }}
                  width={{ base: "min(27.75rem, 100%)" }}
                  onClick={() => setIsDialogOpen(true)}
                  minWidth={{ base: "345px", xl: "290px", xxl: "290px" }}
                  minHeight={{ base: "40px", xl: "" }}
                  maxHeight={{ base: "", xl: "50px" }}
                  maxWidth={{ base: "", xl: "290px", xxl: "290px" }}
                  style={{ verticalAlign: "middle" }}
                  margin={{
                    base: "",
                    xl: "40px 0px 0px 79px",
                    xxl: "40px 0px 0px 79px",
                  }}
                >
                  Solicitar información
                </AmplifyButton>
              </Flex>

              <Flex
                direction={{ base: "column" }}
                gap={{ base: " 1.88rem", xl: "3.5rem", xxl: "3.5rem" }}
                padding={{
                  base: "3.375rem 0.94rem  2.5625rem",
                  xl: "8rem 0.94rem 0px",
                }}
                width={{ base: "min(71.5625rem, 100%)" }}
                margin={"0 auto"}
              >
                <Heading
                  as="h2"
                  color={{ base: "black" }}
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  textAlign={{ base: "center" }}
                  fontSize={{ base: "1.375rem", xl: "1.625rem" }}
                  fontWeight={{ base: "700" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  lineHeight={{ base: "100%", xl: "100%" }}
                  style={{ verticalAlign: "middle" }}
                >
                  Características principales
                </Heading>

                <Grid
                  templateColumns={{ base: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}
                  gap={{ base: " 0.37rem", xl: "0.63rem" }}
                  minWidth={{ base: "21.625rem", xl: "" }}
                  minHeight={{ base: "27rem", xl: "" }}
                >
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "0.5rem" }}
                    alignItems={{ base: "center" }}
                    justifyContent={{ base: "center" }}
                    padding={{ base: "0.57rem 1rem " }}
                    backgroundColor={{ base: "#F6F6F6" }}
                    minHeight={{ base: "8.75rem", xl: "8.75rem" }}
                  >
                    <Flex
                      direction={{ base: "column" }}
                      gap={{ base: "0.25rem" }}
                      alignItems={{ base: "center" }}
                    >
                      <Image src="/svgs/usados-motor.svg" alt="Motor" />
                      <Heading
                        as="h4"
                        color={{ base: "#373948" }}
                        fontFamily={"var(--font-ToyotaType-Regular)"}
                        textAlign={{ base: "center", xl: "center" }}
                        fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                        fontWeight={{ base: "400", xl: "400" }}
                        lineHeight={{ base: "100%", xl: "100%" }}
                        letterSpacing={{ base: "0px", xl: "0px" }}
                        style={{ verticalAlign: "middle" }}
                      >
                        Motor
                      </Heading>
                    </Flex>

                    <Text
                      color={{ base: "#373948" }}
                      fontFamily={"var(--font-ToyotaType-Regular)"}
                      textAlign={{ base: "center", xl: "center" }}
                      fontSize={{ base: "0.75rem", xl: "1.125rem" }}
                      fontWeight={{ base: "400", xl: "400" }}
                      lineHeight={{ base: "100%", xl: "100%" }}
                      letterSpacing={{ base: "0px", xl: "0px" }}
                      style={{ verticalAlign: "middle" }}
                    >
                      {version?.engine} Litros
                    </Text>
                  </Flex>
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "0.5rem" }}
                    alignItems={{ base: "center" }}
                    justifyContent={{ base: "center" }}
                    padding={{ base: "0.57rem 1rem " }}
                    backgroundColor={{ base: "#F6F6F6" }}
                    minHeight={{ base: "8.75rem", xl: "8.75rem" }}
                  >
                    <Flex
                      direction={{ base: "column" }}
                      gap={{ base: "0.25rem" }}
                      alignItems={{ base: "center" }}
                    >
                      <Image src="/svgs/usados-combustible.svg" alt="combustible" />
                      <Heading
                        as="h4"
                        color={{ base: "#373948" }}
                        fontFamily={"var(--font-ToyotaType-Regular)"}
                        textAlign={{ base: "center", xl: "center" }}
                        fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                        fontWeight={{ base: "400", xl: "400" }}
                        lineHeight={{ base: "100%", xl: "100%" }}
                        letterSpacing={{ base: "0px", xl: "0px" }}
                        style={{ verticalAlign: "middle" }}
                      >
                        Combustible
                      </Heading>
                    </Flex>

                    <Text
                      color={{ base: "#373948" }}
                      fontFamily={"var(--font-ToyotaType-Regular)"}
                      textAlign={{ base: "center", xl: "center" }}
                      fontSize={{ base: "0.75rem", xl: "1.125rem" }}
                      fontWeight={{ base: "400", xl: "400" }}
                      lineHeight={{ base: "100%", xl: "100%" }}
                      letterSpacing={{ base: "0px", xl: "0px" }}
                      style={{ verticalAlign: "middle" }}
                    >
                      {version?.combustible}
                    </Text>
                  </Flex>
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "0.5rem" }}
                    alignItems={{ base: "center" }}
                    justifyContent={{ base: "center" }}
                    padding={{ base: "0.57rem 1rem " }}
                    backgroundColor={{ base: "#F6F6F6" }}
                    minHeight={{ base: "8.75rem", xl: "8.75rem" }}
                  >
                    <Flex
                      direction={{ base: "column" }}
                      gap={{ base: "0.25rem" }}
                      alignItems={{ base: "center" }}
                    >
                      <Image src="/svgs/usados-transmision.svg" alt="transmision" />
                      <Heading
                        as="h4"
                        color={{ base: "#373948" }}
                        fontFamily={"var(--font-ToyotaType-Regular)"}
                        textAlign={{ base: "center", xl: "center" }}
                        fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                        fontWeight={{ base: "400", xl: "400" }}
                        lineHeight={{ base: "100%", xl: "100%" }}
                        letterSpacing={{ base: "0px", xl: "0px" }}
                        style={{ verticalAlign: "middle" }}
                      >
                        Transmisión
                      </Heading>
                    </Flex>

                    <Text
                      color={{ base: "#373948" }}
                      fontFamily={"var(--font-ToyotaType-Regular)"}
                      textAlign={{ base: "center", xl: "center" }}
                      fontSize={{ base: "0.75rem", xl: "1.125rem" }}
                      fontWeight={{ base: "400", xl: "400" }}
                      lineHeight={{ base: "100%", xl: "100%" }}
                      letterSpacing={{ base: "0px", xl: "0px" }}
                      style={{ verticalAlign: "middle" }}
                    >
                      {version?.transmission}
                    </Text>
                  </Flex>
                  {version?.certified && (
                    <Flex
                      direction={{ base: "column" }}
                      gap={{ base: "0.5rem" }}
                      alignItems={{ base: "center" }}
                      justifyContent={{ base: "center" }}
                      padding={{ base: "0.57rem 1rem " }}
                      backgroundColor={{ base: "#F6F6F6" }}
                      minHeight={{ base: "8.75rem", xl: "8.75rem" }}
                    >
                      <Flex
                        direction={{ base: "column" }}
                        gap={{ base: "0.25rem" }}
                        alignItems={{ base: "center" }}
                      >
                        <Image src="/svgs/usados-garantia.svg" alt="Motor" />
                        <Heading
                          as="h4"
                          color={{ base: "#373948" }}
                          fontFamily={"var(--font-ToyotaType-Regular)"}
                          textAlign={{ base: "center", xl: "center" }}
                          fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                          fontWeight={{ base: "400", xl: "400" }}
                          lineHeight={{ base: "100%", xl: "100%" }}
                          letterSpacing={{ base: "0px", xl: "0px" }}
                          style={{ verticalAlign: "middle" }}
                        >
                          Garantía Toyota de
                        </Heading>
                      </Flex>

                      <Text
                        color={{ base: "#373948" }}
                        fontFamily={"var(--font-ToyotaType-Regular)"}
                        textAlign={{ base: "center", xl: "center" }}
                        fontSize={{ base: "0.75rem", xl: "1.125rem" }}
                        fontWeight={{ base: "400", xl: "400" }}
                        lineHeight={{ base: "100%", xl: "100%" }}
                        letterSpacing={{ base: "0px", xl: "0px" }}
                        style={{ verticalAlign: "middle" }}
                      >
                        {version?.certified
                          ? "2 años o 120,000 Km" // Only if certified
                          : ""}
                      </Text>
                    </Flex>
                  )}
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "0.5rem" }}
                    alignItems={{ base: "center", xl: "center" }}
                    justifyContent={{ base: "center" }}
                    padding={{ base: "0.57rem 1rem " }}
                    backgroundColor={{ base: "#F6F6F6" }}
                    minHeight={{ base: "8.75rem", xl: "8.75rem" }}
                  >
                    <Flex
                      direction={{ base: "column" }}
                      gap={{ base: "0.25rem" }}
                      alignItems={{ base: "center" }}
                    >
                      <Image
                        src="/svgs/usados-color--white.svg"
                        alt="usados-colorMotor"
                      />
                      <Heading
                        as="h4"
                        color={{ base: "#373948" }}
                        fontFamily={"var(--font-ToyotaType-Regular)"}
                        textAlign={{ base: "center", xl: "center" }}
                        fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                        fontWeight={{ base: "400", xl: "400" }}
                        lineHeight={{ base: "100%", xl: "100%" }}
                        letterSpacing={{ base: "0px", xl: "0px" }}
                        style={{ verticalAlign: "middle" }}
                      >
                        Color
                      </Heading>
                    </Flex>

                    <Text
                      color={{ base: "#373948" }}
                      fontFamily={"var(--font-ToyotaType-Regular)"}
                      textAlign={{ base: "center", xl: "center" }}
                      fontSize={{ base: "0.75rem", xl: "1.125rem" }}
                      fontWeight={{ base: "400", xl: "400" }}
                      lineHeight={{ base: "100%", xl: "100%" }}
                      letterSpacing={{ base: "0px", xl: "0px" }}
                      style={{ verticalAlign: "middle" }}
                    >
                      {version?.color}
                    </Text>
                  </Flex>
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "0.5rem" }}
                    alignItems={{ base: "center", xl: "center" }}
                    justifyContent={{ base: "center" }}
                    padding={{ base: "0.57rem 1rem " }}
                    backgroundColor={{ base: "#F6F6F6" }}
                    minHeight={{ base: "8.75rem", xl: "8.75rem" }}
                  >
                    <Flex
                      direction={{ base: "column" }}
                      gap={{ base: "0.25rem" }}
                      alignItems={{ base: "center" }}
                    >
                      <Image src="/svgs/usados-code.svg" alt="Motor" />
                      <Heading
                        as="h4"
                        color={{ base: "#373948" }}
                        fontFamily={"var(--font-ToyotaType-Regular)"}
                        textAlign={{ base: "center", xl: "center" }}
                        fontSize={{ base: "1.125rem", xl: "1.375rem" }}
                        fontWeight={{ base: "400", xl: "400" }}
                        lineHeight={{ base: "100%", xl: "100%" }}
                        letterSpacing={{ base: "0px", xl: "0px" }}
                        style={{ verticalAlign: "middle" }}
                      >
                        Último dígito de la placa
                      </Heading>
                    </Flex>

                    <Text
                      color={{ base: "#373948" }}
                      fontFamily={"var(--font-ToyotaType-Regular)"}
                      textAlign={{ base: "center", xl: "center" }}
                      fontSize={{ base: "0.75rem", xl: "1.125rem" }}
                      fontWeight={{ base: "400", xl: "400" }}
                      lineHeight={{ base: "100%", xl: "100%" }}
                      letterSpacing={{ base: "0px", xl: "0px" }}
                      style={{ verticalAlign: "middle" }}
                    >
                      ****{version?.plate ? version.plate.trim().slice(-1) : ""}
                    </Text>
                  </Flex>
                </Grid>
              </Flex>

              <Grid
                gap={{ base: "2.5625rem", large: "1.87rem" }}
                templateColumns={{ large: "repeat(2, 1fr)" }}
                width={{ large: "min(76.25rem, 100%)" }}
                margin={"0 auto"}
                padding={{ base: "0 0.94rem 1.375rem", xl: "6.4375rem 0 6.625rem" }}
              >
                <Flex
                  direction={{ base: "column" }}
                  gap={{ base: "2.5625rem", large: "2.75rem" }}
                >
                  <Heading
                    as="h3"
                    fontFamily={"var(--font-ToyotaType-Regular)"}
                    color={"black"}
                    textAlign={{ base: "left" }}
                    fontSize={{ base: "1.375rem", large: "1.625rem" }}
                    fontWeight={{ base: "700" }}
                    lineHeight={{ base: "100%", xl: "100%" }}
                    letterSpacing={{ base: "0px", xl: "0px" }}
                    style={{ verticalAlign: "middle" }}
                  >
                    Descripción
                  </Heading>
                  <Flex as="ul" direction={{ base: "column" }} gap={{ base: "0" }}>
                    {version?.description && !["Descripción", "", "•", "-", "NA", "N/A"].includes(version.description.trim())
                      ? version.description
                        .split(",")
                        .map((item: any, index: any) => {
                          const text = item
                            .trim()
                            .replace(/^•/, "")  // remove “•”
                            .replace(/^\-/, "") // remove "-"
                            .trim();
                          if (!text) return null;
                          return (
                            <View as="li" key={index} marginLeft={{ base: "3ch" }}>
                              <Text
                                fontFamily={"var(--font-ToyotaType-Regular)"}
                                color={"#58595B"}
                                textAlign={{ base: "left" }}
                                fontSize={{ base: "1.125rem", large: "1.375rem" }}
                                fontWeight={{ base: "400" }}
                                lineHeight={{ base: "100%", xl: "100%" }}
                                letterSpacing={{ base: "0px", xl: "0px" }}
                                style={{ verticalAlign: "middle" }}
                              >
                                {text}
                              </Text>
                            </View>
                          );
                        })
                      : (
                        <View as="li" marginLeft={{ base: "3ch" }}>
                          <Text
                            fontFamily={"var(--font-ToyotaType-Regular)"}
                            color={"#58595B"}
                            textAlign={{ base: "left" }}
                            fontSize={{ base: "1.125rem", large: "1.375rem" }}
                            fontWeight={{ base: "400" }}
                            lineHeight={{ base: "100%", xl: "100%" }}
                            letterSpacing={{ base: "0px", xl: "0px" }}
                            style={{ verticalAlign: "middle" }}
                          >
                            No hay descripción disponible
                          </Text>
                        </View>
                      )}
                  </Flex>


                </Flex>

                <Flex
                  direction={{ base: "column" }}
                  gap={{ base: "1.125rem", large: "2.75rem" }}
                >
                  <Heading
                    as="h4"
                    fontFamily={"var(--font-ToyotaType-Regular)"}
                    color={"#000"}
                    textAlign={{ base: "left" }}
                    fontSize={{ base: "1.125rem", large: "1.625rem" }}
                    fontWeight={{ base: "400", xl: "700" }}
                    lineHeight={{ base: "100%", xl: "100%" }}
                    letterSpacing={{ base: "0px", xl: "0px" }}
                    style={{ verticalAlign: "middle" }}
                  >
                    Información Adicional
                  </Heading>

                  <Flex as="ul" direction="column" gap="0">
                    {version?.additionalInfo && !["Información adicional", "-", "", "NA", "N/A"].includes(version.additionalInfo.trim())
                      ? version.additionalInfo
                        .split(",")
                        .map((item: any, index: any) => {
                          const text = item.trim().replace(/^-/, "").trim(); // clean "-"

                          if (!text) return null;

                          return (
                            <View as="li" key={index} marginLeft="2ch">
                              <Text
                                fontFamily={"var(--font-ToyotaType-Regular)"}
                                color={"#58595B"}
                                textAlign={"justify"}
                                fontSize={{ base: "0.5625rem", large: "0.75rem" }}
                                fontWeight={"400"}
                                lineHeight={"100%"}
                                letterSpacing={"0px"}
                                style={{ verticalAlign: "middle" }}
                              >
                                {text}
                              </Text>
                            </View>
                          );
                        })
                      : (
                        <View as="li" marginLeft="2ch">
                          <Text
                            fontFamily={"var(--font-ToyotaType-Regular)"}
                            color={"#58595B"}
                            textAlign={"justify"}
                            fontSize={{ base: "0.5625rem", large: "0.75rem" }}
                            fontWeight={"400"}
                            lineHeight={"100%"}
                            letterSpacing={"0px"}
                            style={{ verticalAlign: "middle" }}
                          >
                            No hay información adicional disponible
                          </Text>
                        </View>
                      )}
                  </Flex>

                </Flex>

              </Grid>

              <Flex
                direction={{ base: "column", large: "row" }}
                alignItems={{ base: "center" }}
                justifyContent={{ base: "center" }}
                gap={{ base: "2.375rem", large: "5.25rem" }}
                width={{ large: "min(95.5625rem, 65.625%)" }}
                margin={{ base: "0 auto" }}
              >
                {isSimilarLoading ? (
                  <Flex justifyContent="center" alignItems="center" minHeight="200px">
                    Loading....                  </Flex>
                ) : similarVehiclesList?.length > 0 ? (
                  <>
                    {
                      similarVehiclesList.length > 3 && (
                        <AmplifyButton
                          className="detalle-similar-prev arrowCustom arrowCustom--prev"
                          display={{ base: "none", large: "flex" }}
                          position={{ base: "static" }}
                          width={50}
                          height={50}
                          borderRadius={"50%"}
                          backgroundColor={"black"}
                          padding={"0"}
                          style={{ aspectRatio: "1 / 1" }}
                        >
                          <Image
                            src="/images/arrow-simple-prev.svg"
                            alt="Arrow prev"
                            width={"1.3125rem"}
                            height={".8125rem"}
                          />
                        </AmplifyButton>
                      )
                    }

                    <Flex
                      direction={{ base: "column" }}
                      width={{ base: "min(78.75rem, 100%)" }}
                      margin={{ base: "0 auto" }}
                      gap={{ base: "2.38rem" }}
                    >
                      <Heading
                        as="h3"
                        padding={{ base: "0 0.92rem" }}
                        fontFamily={"var(--font-ToyotaType-Regular)"}
                        color={"#000"}
                        textAlign={{ base: "left", xl: "center" }}
                        fontSize={{ base: "1.375rem", large: "1.625rem" }}
                        fontWeight={{ base: "700" }}
                        lineHeight={{ base: "normal", xl: "100%" }}
                        letterSpacing={{ base: "", xl: "0px" }}
                        style={{ verticalAlign: "middle" }}
                      >
                        Vehículos similares
                      </Heading>
                      {
                        similarVehiclesList.length > 3 ? (
                          <Flex
                            className="detalle-similar"
                            direction={{ base: "column" }}
                            gap={{ base: "1.94rem" }}
                            paddingLeft={{ base: "0.94rem" }}
                          >
                            <Swiper
                              className="custom-swiper-2"
                              loop={true}
                              slidesPerView={1} // Show 1.5 cards on mobile by default
                              centeredSlides={true}
                              spaceBetween={20}
                              slidesOffsetAfter={0}
                              breakpoints={{
                                320: {
                                  slidesPerView: 1.3, // Very small screens
                                  spaceBetween: 20,
                                },
                                375: {
                                  slidesPerView: 1, // Standard mobile screens
                                  spaceBetween: 20,
                                },
                                480: {
                                  slidesPerView: 1.8, // Larger mobile screens
                                  spaceBetween: 20,
                                },
                                640: {
                                  slidesPerView: 2.2, // Small tablets
                                  spaceBetween: 20,
                                },
                                768: {
                                  slidesPerView: 2, // Tablets
                                  spaceBetween: 33,
                                },
                                1280: {
                                  slidesPerView: 2,
                                  spaceBetween: 20,
                                },
                                1440: {
                                  slidesPerView: 2,
                                  spaceBetween: 20
                                },
                              }}
                              navigation={{
                                nextEl: ".detalle-similar-next",
                                prevEl: ".detalle-similar-prev",
                              }}
                              onSlideChange={(swiper) =>
                                setCurrentDetalleSimilar(swiper.realIndex + 1)
                              }
                              modules={[Navigation]}
                            >
                              {similarVehiclesList?.map(
                                (vehicle: any, index: number) => {
                                  return (
                                    <SwiperSlide className="" key={`${vehicle.name}-${index}`}>
                                      <Link
                                        href={`/cotiza-tu-toyota/vehiculos-usados/detalle/${vehicle.slug}`}>
                                        <View width="100%">
                                          <MarketplaceCard
                                            title={vehicle.name}
                                            price={vehicle.price}
                                            imageSrc={vehicle.img}
                                            description={vehicle.description}
                                            subDescription={vehicle.subDescription}
                                            backgroundColor="#F6F6F6"
                                            borderRadius="0px"
                                            imageHeight={{ base: "130px", xl: "205px" }}
                                            cardWidth={{ base: "254px", xl: "100%" }}
                                            cardHeight={{ base: "345px", xl: "432px" }}
                                            showFavoriteIcon={false}
                                          />
                                        </View>
                                      </Link>
                                    </SwiperSlide>
                                  );
                                }
                              )}
                            </Swiper>

                            {isMobile ? (
                              <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                width={"100%"}
                                maxWidth={{ base: "21.625rem", large: "max-content" }}
                                gap={{ large: "8.75rem" }}
                                margin={{ base: "0 auto" }}
                              >
                                <AmplifyButton
                                  className="detalle-similar-prev arrowCustom arrowCustom--prev"
                                  color={"transparent"}
                                  padding={"0"}
                                  width={"3.4375rem"}
                                  height={"1.875rem"}
                                >
                                  {/* <Image
                                src="/images/arrow-simple-prev.svg"
                                alt="Arrow prev"
                                width={"1.3125rem"}
                                height={".8125rem"}
                        /> */}

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="55"
                                    height="30"
                                    viewBox="0 0 55 30"
                                    fill="none"
                                  >
                                    <rect
                                      width="55"
                                      height="30"
                                      rx="15"
                                      fill="url(#paint0_linear_4257_9472)"
                                    />
                                    <path
                                      d="M31.4102 19.59L26.8302 15L31.4102 10.41L30.0002 9L24.0002 15L30.0002 21L31.4102 19.59Z"
                                      fill="#FFF"
                                    />
                                    <defs>
                                      <linearGradient
                                        id="paint0_linear_4257_9472"
                                        x1="27.5"
                                        y1="0"
                                        x2="27.5"
                                        y2="30"
                                        gradientUnits="userSpaceOnUse"
                                      >
                                        <stop />
                                        <stop offset="1" />
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                </AmplifyButton>

                                <Text
                                  fontWeight={500}
                                  fontFamily="var(--font-ToyotaType-Regular)"
                                >
                                  {currentDetalleSimilar} de {similarVehiclesList.length}
                                </Text>

                                <AmplifyButton
                                  className="detalle-similar-next detalle-next arrowCustom arrowCustom--next"
                                  color={"transparent"}
                                  padding={"0"}
                                  width={"3.4375rem"}
                                  height={"1.875rem"}
                                >
                                  <Image
                                    src="/images/arrow-simple-next.svg"
                                    alt="Arrow next"
                                    width={"1.3125rem"}
                                    height={".8125rem"}
                                  />
                                </AmplifyButton>
                              </Flex>
                            ) : null}
                          </Flex>
                        ) : (
                          <>
                            {
                              !isMobile ? (
                                <Flex
                                  className="detalle-similar"
                                  direction={{ base: "column", xl: "row" }}
                                  alignItems={{ base: "center" }}
                                  justifyContent={{ base: "center" }}
                                  gap={{ base: "1.94rem" }}
                                  paddingLeft={{ base: "0.94rem" }}
                                >
                                  {similarVehiclesList?.map(
                                    (vehicle: any, index: number) => {
                                      return (
                                        <Link
                                          href={`/cotiza-tu-toyota/vehiculos-usados/detalle/${vehicle.slug}`} key={`${vehicle.name}-${index}`}>
                                          <MarketplaceCard
                                            title={vehicle.name}
                                            price={vehicle.price}
                                            imageSrc={vehicle.img}
                                            description={vehicle.description}
                                            subDescription={vehicle.subDescription}
                                            backgroundColor="#F6F6F6"
                                            borderRadius="0px"
                                            imageHeight={{ base: "130px", xl: "205px" }}
                                            cardWidth={{ base: "254px", xl: "100%" }}
                                            cardHeight={{ base: "345px", xl: "432px" }}
                                            showFavoriteIcon={false}
                                          />
                                        </Link>
                                      );
                                    }
                                  )}
                                </Flex>) :
                                (
                                  <Flex
                                    className="detalle-similar"
                                    direction={{ base: "column" }}
                                    gap={{ base: "1.94rem" }}
                                    paddingLeft={{ base: "0.94rem" }}
                                  >
                                    <Swiper
                                      className="custom-swiper-2"
                                      loop={true}
                                      slidesPerView={1} // Show 1.5 cards on mobile by default
                                      centeredSlides={true}
                                      spaceBetween={20}
                                      slidesOffsetAfter={0}
                                      breakpoints={{
                                        320: {
                                          slidesPerView: 1.3, // Very small screens
                                          spaceBetween: 20,
                                        },
                                        375: {
                                          slidesPerView: 1, // Standard mobile screens
                                          spaceBetween: 20,
                                        },
                                        480: {
                                          slidesPerView: 1.8, // Larger mobile screens
                                          spaceBetween: 20,
                                        },
                                        640: {
                                          slidesPerView: 2.2, // Small tablets
                                          spaceBetween: 20,
                                        },
                                        768: {
                                          slidesPerView: 2, // Tablets
                                          spaceBetween: 33,
                                        },
                                        1280: {
                                          slidesPerView: 2,
                                          spaceBetween: 20,
                                        },
                                        1440: {
                                          slidesPerView: 2,
                                          spaceBetween: 20
                                        },
                                      }}
                                      navigation={{
                                        nextEl: ".detalle-similar-next",
                                        prevEl: ".detalle-similar-prev",
                                      }}
                                      onSlideChange={(swiper) =>
                                        setCurrentDetalleSimilar(swiper.realIndex + 1)
                                      }
                                      modules={[Navigation]}
                                    >
                                      {similarVehiclesList?.map(
                                        (vehicle: any, index: number) => {
                                          return (
                                            <SwiperSlide className="" key={`${vehicle.name}-${index}`}>
                                              <Link
                                                href={`/cotiza-tu-toyota/vehiculos-usados/detalle/${vehicle.slug}`}>
                                                <View width="100%">
                                                  <MarketplaceCard
                                                    title={vehicle.name}
                                                    price={vehicle.price}
                                                    imageSrc={vehicle.img}
                                                    description={vehicle.description}
                                                    subDescription={vehicle.subDescription}
                                                    backgroundColor="#F6F6F6"
                                                    borderRadius="0px"
                                                    imageHeight={{ base: "130px", xl: "205px" }}
                                                    cardWidth={{ base: "254px", xl: "100%" }}
                                                    cardHeight={{ base: "345px", xl: "432px" }}
                                                    showFavoriteIcon={false}
                                                  />
                                                </View>
                                              </Link>
                                            </SwiperSlide>
                                          );
                                        }
                                      )}
                                    </Swiper>

                                    {isMobile ? (
                                      <Flex
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                        width={"100%"}
                                        maxWidth={{ base: "21.625rem", large: "max-content" }}
                                        gap={{ large: "8.75rem" }}
                                        margin={{ base: "0 auto" }}
                                      >
                                        <AmplifyButton
                                          className="detalle-similar-prev arrowCustom arrowCustom--prev"
                                          color={"transparent"}
                                          padding={"0"}
                                          width={"3.4375rem"}
                                          height={"1.875rem"}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="55"
                                            height="30"
                                            viewBox="0 0 55 30"
                                            fill="none"
                                          >
                                            <rect
                                              width="55"
                                              height="30"
                                              rx="15"
                                              fill="url(#paint0_linear_4257_9472)"
                                            />
                                            <path
                                              d="M31.4102 19.59L26.8302 15L31.4102 10.41L30.0002 9L24.0002 15L30.0002 21L31.4102 19.59Z"
                                              fill="#FFF"
                                            />
                                            <defs>
                                              <linearGradient
                                                id="paint0_linear_4257_9472"
                                                x1="27.5"
                                                y1="0"
                                                x2="27.5"
                                                y2="30"
                                                gradientUnits="userSpaceOnUse"
                                              >
                                                <stop />
                                                <stop offset="1" />
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                        </AmplifyButton>

                                        <Text
                                          fontWeight={500}
                                          fontFamily="var(--font-ToyotaType-Regular)"
                                        >
                                          {currentDetalleSimilar} de {similarVehiclesList.length}
                                        </Text>

                                        <AmplifyButton
                                          className="detalle-similar-next detalle-next arrowCustom arrowCustom--next"
                                          color={"transparent"}
                                          padding={"0"}
                                          width={"3.4375rem"}
                                          height={"1.875rem"}
                                        >
                                          <Image
                                            src="/images/arrow-simple-next.svg"
                                            alt="Arrow next"
                                            width={"1.3125rem"}
                                            height={".8125rem"}
                                          />
                                        </AmplifyButton>
                                      </Flex>
                                    ) : null}
                                  </Flex>
                                )
                            }


                          </>
                        )
                      }
                    </Flex>
                    {/* {
                      similarVehiclesList.length > 3 && (
                        <AmplifyButton
                          className="detalle-similar-next slider arrowCustom arrowCustom--next"
                          display={{ base: "none", large: "flex" }}
                          position={{ base: "absolute" }}
                          top={"50%"}
                          left={"10%"}
                          borderRadius={"50%"}
                          backgroundColor={"black"}
                          style={{ aspectRatio: "1 / 1" }}
                        />
                      )
                    } */}
                  </>
                ) : (
                  <Button
                    color="transparentBlack"
                    textColor="black"
                    minWidth={{ base: "220px", xl: "290px" }}
                    minHeight={{ base: "40px", xl: "50px" }}
                    style={{
                      display: "block",
                      margin: "1.75rem auto 0",
                      fontSize: ".875rem",
                      textAlign: "center",
                    }}
                    onClick={() =>
                      router.push("/cotiza-tu-toyota/vehiculos-usados")
                    }
                  >
                    Explora todos los vehículos
                  </Button>
                )}
                {
                  similarVehiclesList.length > 3 && (
                    <AmplifyButton
                      className="detalle-similar-next arrowCustom arrowCustom--next"
                      display={{ base: "none", large: "flex" }}
                      position={{ base: "static" }}
                      width={50}
                      height={50}
                      borderRadius={"50%"}
                      backgroundColor={"black"}
                      padding={"0"}
                      style={{ aspectRatio: "1 / 1" }}
                    >
                      <Image
                        src="/images/arrow-simple-next.svg"
                        alt="Arrow next"
                        width={"1.3125rem"}
                        height={".8125rem"}
                      />
                    </AmplifyButton>
                  )
                }
              </Flex>
            </View>
          </>
        )
      }
    </>
  );
}
