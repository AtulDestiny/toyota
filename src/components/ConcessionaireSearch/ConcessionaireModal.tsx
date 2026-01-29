"use client";

import { useEffect, useMemo } from "react";
import { View, Text, Flex, Link, Divider, Image } from "@aws-amplify/ui-react";
import Button from "@/components/Layout/Button/Button";
import { Office, Schedule, Contact } from "@/types/concessionaire"; // Import all necessary types
import "./ConcessionaireModal.css"; // Corrected: This should be the only CSS import for this component
import { useQuery } from "@tanstack/react-query";

interface ConcessionaireModalProps {
  office: Office | null;
  onClose: () => void;
}

type Hour = {
  id: string;
  type: string;
  name: string;
  start_hour: string;
  end_hour: string;
};

export const ConcessionaireModal = ({
  office,
  onClose,
}: ConcessionaireModalProps) => {
  const HOUR_QUERY = `
  query GetOfficeHours {
    listHours(filter: {officeId: {eq: "${office?.id}"}}) {
      items {
        id
        name
        start_hour
        end_hour
        type
      }
    }
  }
`;

  // function useDealerSelection(): {
  //   hourData: Hour[];
  //   loadingHourData: boolean;
  // } {
  //   const { data: hourData = [], isLoading: loadingHourData } = useQuery({
  //     queryKey: ["hour"],
  //     queryFn: async () => {
  //       const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-api-key": process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!,
  //         },
  //         body: JSON.stringify({ query: HOUR_QUERY }),
  //       });
  //       const data = await response.json();
  //       return data?.data?.listHours?.items || [];
  //     },
  //     enabled: !!office,
  //   });

  //   return {
  //     hourData,
  //     loadingHourData,
  //   };
  // }
  // const { hourData, loadingHourData } = useDealerSelection();

  const HourRow = ({ name, start_hour, end_hour }: Hour) => (
    <Flex justifyContent="space-between">
      <Text
        margin="8px 0 0 0"
        color="#FFF"
        fontWeight="400"
        fontSize={{ base: "12px", xl: "14px" }}
        fontFamily="var(--font-ToyotaType-Regular)"
        lineHeight={{ base: "100%", xl: "140%" }}
        fontStyle="normal"
        letterSpacing="0px"
        textAlign="left"
      >
        {name}
      </Text>
      <Text
        margin={{ base: "8px 0 0 0", xl: "8px 0 0 0", xxl: "8px 0 0 0" }}
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
        {start_hour} a {end_hour}
      </Text>
    </Flex>
  );

  const HourGroup = ({ type, hours }: { type: string; hours: Hour[] }) => {
    function capitalize(value: string) {
      if (!value) {
        return "";
      }

      const textoMinusculas = value.toLowerCase();
      const primeraLetraMayuscula = textoMinusculas.charAt(0).toUpperCase();

      const restoDelTexto = textoMinusculas.slice(1);

      return primeraLetraMayuscula + restoDelTexto;
    }

    const order = ["Lunes a viernes", "Sábado", "Domingo", "Domingo y festivo"];

    const capitalizedHours = hours.map((hour) => {
      hour.name = capitalize(hour.name);
      return hour;
    });

    capitalizedHours.sort((a, b) => {
      const indexA = order.indexOf(a.name);
      const indexB = order.indexOf(b.name);

      return indexA - indexB;
    });

    return (
      <Flex direction={{ base: "column" }} gap={{ base: "1.5rem" }} key={type}>
        <View>
          <Text
            margin={{ base: "12px 0 0 0", xl: "12px 0 0 0", xxl: "12px 0 0 0" }}
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
            textTransform={{ base: "capitalize" }}
          >
            {type}:
          </Text>
          {capitalizedHours.map((hour: Hour) => {
            return (
              <HourRow
                key={hour.id}
                name={hour.name}
                start_hour={hour.start_hour}
                end_hour={hour.end_hour}
                id={hour.id}
                type={hour.type}
              />
            );
          })}
        </View>
      </Flex>
    );
  };

  const groupedHours = useMemo<Record<string, Hour[]>>(() => {
    const items = office?.hours?.items;

    if (!Array.isArray(items)) return {};

    return items.reduce(
      (acc, hour) => {
        const h = hour as Hour;
        if (!acc[h.type]) acc[h.type] = [];
        acc[h.type].push(h);
        return acc;
      },
      {} as Record<string, Hour[]>
    );
  }, [office?.hours?.items]);

  const hourGroups = Object.entries(groupedHours) as [string, Hour[]][];

  const DefaultHoursFallback = () => (
    <View>
      <Text
        margin={{ base: "12px 0 0 0" }}
        color="#FFF"
        fontWeight="400"
        fontSize={{ base: "18px", xl: "22px" }}
        fontFamily="var(--font-ToyotaType-Regular)"
        lineHeight="100%"
        textAlign="left"
      >
        Sala de ventas:
      </Text>
      <HourRow
        name="Lunes a viernes"
        start_hour="8 am"
        end_hour="6 pm"
        id={"1"}
        type={"Sala de ventas"}
      />
      <HourRow
        name="Sábado"
        start_hour="9 am"
        end_hour="4 pm"
        id={"2"}
        type={"Sala de ventas"}
      />
      <HourRow
        name="Domingo"
        start_hour="10 am"
        end_hour="4 pm"
        id={"3"}
        type={"Sala de ventas"}
      />
      <Text
        margin={{ base: "12px 0 0 0" }}
        color="#FFF"
        fontWeight="400"
        fontSize={{ base: "18px", xl: "22px" }}
        fontFamily="var(--font-ToyotaType-Regular)"
        lineHeight="100%"
        textAlign="left"
      >
        Taller y respuestos:
      </Text>
      <HourRow
        name="Lunes a viernes"
        start_hour="6 am"
        end_hour="8 pm"
        id={"4"}
        type={"Taller y respuestos"}
      />
      <HourRow
        name="Sábado"
        start_hour="8 am"
        end_hour="2 pm"
        id={"5"}
        type={"Taller y respuestos"}
      />
    </View>
  );

  const renderHours = () => {
    // if (loadingHourData) {
    //   return <Text>Cargando horarios...</Text>;
    // }

    if (hourGroups.length > 0) {
      const sortedHourGroups = [...hourGroups].sort((a, b) => {
        return b[0].localeCompare(a[0]);
      });

      return (
        <Flex direction="column" gap="1.5rem">
          {sortedHourGroups.map(([type, hours]) => (
            <HourGroup key={type} type={type} hours={hours} />
          ))}
        </Flex>
      );
    }

    return <DefaultHoursFallback />;
  };

  if (!office) {
    return (
      <View className="concessionaire-modal">
        <Flex className="concessionaire-modal__content-wrapper">
          <View className="concessionaire-modal__content" padding="2rem">
            <Text className="concessionaire-modal__title">
              Oficina no encontrada
            </Text>
            <Text className="concessionaire-modal__subtitle">
              Por favor, intenta con otra selección.
            </Text>
          </View>
          <Link onClick={onClose} className="concessionaire-modal__close-btn">
            X
          </Link>
        </Flex>
      </View>
    );
  }

  const schedules: Schedule[] = Array.isArray(office.schedules)
    ? office.schedules
    : typeof office.schedules === "string"
      ? JSON.parse(office.schedules)
      : [];

  const contact: Contact | null =
    typeof office.contact === "string"
      ? JSON.parse(office.contact)
      : office.contact || null;
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  return (
    <View className="concessionaire-modal">
      <Flex className="concessionaire-modal__content-wrapper">
        <View className="concessionaire-modal__content">
          <Flex
            direction="column"
            margin={{ base: "23px 0px 0px 0px", xl: "", xxl: "" }}
            gap="0"
            marginBottom="1.5rem"
          >
            <Text
              fontWeight={{ base: "700", xl: "400", xxl: "400" }}
              marginTop="4px"
              color="#FFF"
              fontSize={{ base: "26px", xl: "32px" }}
              fontFamily={{
                base: "var(--font-ToyotaType-Regular)",
                xl: "var(--font-toyotaDisplay)",
                xxl: "var(--font-toyotaDisplay)",
              }}
              lineHeight={{ base: "100%", xl: "140%" }}
              letterSpacing={{ base: "0px", xl: "0px" }}
              textAlign={{
                base: "left",
                medium: "center",
                xl: "center",
                xxl: "center",
              }}
              maxWidth={{ base: "80%", xl: "none" }}
            >
              {office.name}
            </Text>
            <Text
              marginTop="8px"
              color="#FFF"
              fontWeight={{ base: "400", xl: "400", xxl: "400" }}
              fontSize={{ base: "12px", xl: "14px" }}
              fontFamily={{
                base: "var(--font-ToyotaType-Regular)",
                xl: "var(--font-ToyotaType-Regular)",
                xxl: "var(--font-ToyotaType-Regular)",
              }}
              lineHeight={{ base: "100%", xl: "140%" }}
              fontStyle={{ base: "normal", xl: "normal" }}
              letterSpacing={{ base: "0px", xl: "0px" }}
              textAlign={{ base: "left", xl: "center", xxl: "center" }}
              padding={{ base: "", xl: "0px 30%", xxl: "0px 30%" }}
            >
              Descubre todos los servicios que
              <br /> tenemos para ti. <br />
              {office.address} {office.city?.name}
            </Text>

            <View margin={{ base: "4px 0px 0px", xl: "0 auto", xxl: "0 auto" }}>
              <Link
                href={`https://maps.google.com/?q=$${encodeURIComponent(office.name + ", " + office.address + ", " + (office.city?.name || ""))}`}
                target="_blank"
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
          <Divider borderColor="#333" marginBottom="1.5rem" />
          <Text
            color="#FFF"
            fontWeight={{ base: "700", xl: "700", xxl: "700" }}
            fontSize={{ base: "22px", xl: "22px" }}
            fontFamily={{
              base: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-ToyotaType-Regular)",
              xxl: "var(--font-toyotaDisplay)",
            }}
            lineHeight={{ base: "140%", xl: "109%" }}
            fontStyle={{ base: "normal", xl: "normal" }}
            letterSpacing={{ base: "0px", xl: "0px" }}
            textAlign={{ base: "left", xl: "left", xxl: "left" }}
            padding={{ base: "", xl: "", xxl: "" }}
          >
            Horarios de atención
          </Text>

          {renderHours()}

          <Divider
            borderColor="#333"
            marginTop="1.5rem"
            marginBottom="1.5rem"
          />

          {(office.phone ||
            office.appointmentPhone ||
            (contact && contact.email) ||
            office.website) && (
            <Flex direction="column" gap="xs">
              <Text className="concessionaire-modal__contact-item-title first">
                Contacto
              </Text>
              {office.phone && (
                <>
                  {" "}
                  <Text className="concessionaire-modal__contact-item-title">
                    Teléfono Vitrina:
                  </Text>
                  <Link
                    href={`tel:${office.phone}`}
                    isExternal
                    className="concessionaire-modal__contact-item-value phone"
                    target="_blank"
                  >
                    {office.phone}
                  </Link>
                </>
              )}
              {office.appointmentPhone && (
                <>
                  {" "}
                  <Text className="concessionaire-modal__contact-item-title">
                    Número adicional de contacto:
                  </Text>
                  <Link
                    href={`tel:${office.appointmentPhone}`}
                    isExternal
                    className="concessionaire-modal__contact-item-value phone"
                    target="_blank"
                  >
                    {office.appointmentPhone}
                  </Link>
                </>
              )}
              {office.email && (
                <>
                  {" "}
                  <Text className="concessionaire-modal__contact-item-title">
                    Correo Electrónico:
                  </Text>
                  <Link
                    href={`mailto:${office.email}`}
                    isExternal
                    className="concessionaire-modal__contact-item-value phone"
                    target="_blank"
                  >
                    {office.email}
                  </Link>
                </>
              )}
              {office.website && (
                <>
                  {" "}
                  <Text className="concessionaire-modal__contact-item-title">
                    Pagina Web:
                  </Text>
                  <Link
                    href={`${office.website}`}
                    isExternal
                    className="concessionaire-modal__contact-item-value phone"
                    target="_blank"
                  >
                    {office.website}
                  </Link>
                </>
              )}
            </Flex>
          )}
        </View>
        <Link
          onClick={onClose}
          className="concessionaire-modal__close-btn"
          position="absolute"
          top={{ base: "1rem", xl: "1rem" }}
          right={{ base: "1rem", xl: "1rem" }}
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
  );
};
