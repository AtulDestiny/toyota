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
            {isMobile ? "Consentimiento\nde Cookies" : "Consentimiento de Cookies"}
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
            Para ofrecerte la mejor experiencia de navegación posible en nuestro sitio web, utilizamos cookies. <br/><br/>
            Estas pequeñas herramientas digitales nos permiten recordar tus preferencias, 
            como el idioma o la configuración de visualización, y entender cómo interactúas con nuestras páginas. <br/><br/>
            De esta manera, podemos personalizar tu visita y hacerla más eficiente y agradable.<br/><br/>
            Es importante que sepas que empleamos tanto cookies propias como cookies de terceros. <br/><br/>
            Las cookies propias son generadas directamente por nuestro sitio para funciones esenciales,
            como mantener tu sesión activa o recordar los artículos en tu carrito de compras. <br/><br/>
            Por otro lado, las cookies de terceros provienen de servicios externos que hemos integrado, 
            como herramientas de análisis de tráfico web o plataformas de redes sociales, 
            y nos ayudan a mejorar continuamente nuestros contenidos y servicios.<br/><br/>
            El uso de estas tecnologías se realiza con el objetivo de optimizar la 
            funcionalidad de nuestra plataforma y proporcionarte contenido más relevante.<br/> <br/>
            La información recopilada a través de las cookies nos permite analizar patrones de uso, 
            identificar áreas de mejora y, en última instancia, enriquecer tu experiencia general en nuestro sitio.<br/><br/>
            Al continuar navegando por esta página web, estás aceptando el tratamiento de la información obtenida 
            mediante el uso de estas cookies. Este consentimiento se otorga de acuerdo con los términos detallados
            en nuestra <a href="/">Políticas y Privacidad</a>, donde podrás encontrar información más exhaustiva sobre qué son las cookies,
            cómo las utilizamos y cómo puedes gestionarlas o deshabilitarlas si lo deseas.<br/>
          </Text>
        </Flex>
      </Flex>
    </View>
  );
}
