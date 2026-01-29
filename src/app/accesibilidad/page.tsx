"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { PreventiveCampaignsServicesBanner } from "@/components/preventiveCampaignsServicesBanner/PreventiveCampaignsServicesBanner";
import PreventiveCampaignsServicesSlider from "@/components/PreventiveCampaignsServicesSlider/PreventiveCampaignsServicesSlider";
import { AppointmentForm } from "@/components/AppointmentForm/AppointmentForm";
import {
  Flex,
  Heading,
  View,
  Text,
  Image,
  Input,
  Button,
  Grid,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import "./page.css";

type Campaign = {
  idCampania: number;
  nombre: string;
  fechaInicio: string;
  fechaFinal: string;
  realizado: boolean;
  descripcion: string;
  observaciones: string | null;
};

const URL = "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/proxy";
const TOKEN =
  "ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL";

const fetchCampaignsByVin = async (vin: string) => {
  if (!vin || vin.length !== 17) {
    throw new Error("El VIN debe tener exactamente 17 caracteres");
  }

  const response = await fetch(
    `${URL}?action=CampaniasApiV2&method=consultaPorVin&vin=${vin}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("Server response:", errorData);
    throw new Error(errorData?.message || "Error al consultar las campañas");
  }

  const data = await response.json();
  console.log("Campaign data:", data);
  return data;
};

export default function PreventiveCampaignsServices(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isVinResultsModalOpen, setVinResultsModalOpen] = useState(false);
  const [isAppointmentFormOpen, setAppointmentFormOpen] = useState(false);
  const [campaign, setCampaign] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [vinNumber, setVinNumber] = useState("");

  const openModal = (campaign: { title: string; description: string }) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  const openInfoModal = () => setInfoModalOpen(true);
  const closeInfoModal = () => setInfoModalOpen(false);

  const openVinResultsModal = () => setVinResultsModalOpen(true);
  const closeVinResultsModal = () => setVinResultsModalOpen(false);

  const openAppointmentForm = () => {
    setVinResultsModalOpen(false);
    setAppointmentFormOpen(true);
  };
  const closeAppointmentForm = () => setAppointmentFormOpen(false);

  const mutation = useMutation({
    mutationFn: fetchCampaignsByVin,
    onSuccess: (data) => {
      console.log("Campañas consultadas exitosamente:", data);

      const encontrado = data?.data?.encontrado;
      const lstCampanias = data?.data?.lstCampanias;

      if (encontrado && lstCampanias && lstCampanias.length > 0) {
        setCampaign(lstCampanias);
      } else {
        setCampaign([]);
      }
      openVinResultsModal();
    },
    onError: (error: any) => {
      console.error("Error al consultar campañas:", error);
      alert(error.message || "Error al consultar las campañas");
    },
  });

  const validateAndSubmit = () => {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    const cleanedVin = vinNumber.trim().toUpperCase();

    if (!vinRegex.test(cleanedVin)) {
      alert("El VIN debe tener 17 caracteres");
      return;
    }
    mutation.mutate(cleanedVin);
  };

  return (
    <View>
      <style>
        {`
          .mobile-campaigns-title {
            white-space: pre-line !important;
          }
        `}
      </style>

      
      <Flex
        direction={{ base: "column" }}
        alignItems={{ base: "center" }}
        gap={{ base: "2.63rem", xl: "4.5rem" }}
        padding={{
          base: "2.5rem 1rem 3.31rem 1rem",
          xl: "7.06rem 2rem 7.12rem",
        }}
      >
        <Flex
          direction={{ base: "column" }}
          alignItems={{ base: "center" }}
          gap={{ base: "1.5rem", xl: "3.25rem" }}
        >
          <Heading
            level={2}
            className={isMobile ? "mobile-campaigns-title" : ""}
            fontFamily={"var(--font-ToyotaType-Regular)"}
            color={"black"}
            textAlign={{ base: "center" }}
            fontSize={{ base: "2rem", xl: "3.5rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "130%", xl: "110%" }}
            letterSpacing={{ base: "0", xl: "-0.07rem" }}
          >
            {isMobile ? "Accesibilidad" : "Accesibilidad"}
          </Heading>

          <Text
            fontFamily={"var(--font-ToyotaType-Regular)"}
            color={"black"}
            textAlign={{ base: "justify" }}
            fontSize={{ base: "1.125rem", xl: "1rem" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "normal", xl: "130%" }}
            padding={{ base: "0 27px", xl: "0" }}
            maxWidth={"70ch"}
          >
            Toyota se compromete a garantizar que toda la experiencia digital sea inclusiva para personas con discapacidad.<br/><br/>

Cumplimos los estándares WCAG 2.1 Nivel AA, lo que incluye alto contraste, etiquetas ARIA, navegación por teclado y texto alternativo para imágenes.<br/><br/>

Si encuentras alguna barrera de accesibilidad o tienes sugerencias, contáctanos: <a href="mailto:accesibilidad@toyota.co">accesibilidad@toyota.co.</a><br/><br/>

Actualizamos periódicamente según mejores prácticas y consultas de usuarios con diversidad funcional.
          </Text>
        </Flex>
      </Flex>
    </View>
  );
}
