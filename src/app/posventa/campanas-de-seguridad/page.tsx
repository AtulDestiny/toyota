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

  const campaigns = [
    {
      image: "/svgs/control-principal-elevavidrios.svg",
      title: "Control principal elevavidrios",
      description:
        "El control maestro elevavidrios de dichos vehículos eventualmente puede fallar, y se presenta cuando se percibe una sensación carrasposa o de atascamiento al ser operado. La campaña de servicio consiste en verificar el estado de control maestro de los elevavidrios, aplicar una grasa especialmente fabricada por Toyota que permita la adecuada lubricación de la pieza, y en aquellos vehículos en que se encuentre que la pieza se averió, se procederá a reemplazarla.",
    },
    {
      image: "/svgs/refuerzo-cinturon-de-seguridad.svg",
      title: "Refuerzo cinturón de seguridad",
      description:
        "Los retractores de los cinturones de seguridad para el conductor y pasajero delantero se encuentran instalados en el panel de la puerta de acceso del vehículo. Debido a una deficiente resistencia de la lámina del papel, se pueden desarrollar grietas si la puerta de acceso es cerrada fuertemente y repetidamente por los usuarios durante un periodo de tiempo prolongado. La campaña de servicio consiste en inspeccionar y reforzar el panel de la puerta de acceso trasera en vehículos FJ Cruiser para prevenir que se generen fisuras en la base del retractor del cinturón de seguridad.",
    },
    {
      image: "/svgs/rotula-inferior-de-suspension.svg",
      title: "Rótula inferior de suspensión",
      description:
        "Esta campaña especial de servicio está orientada a inspeccionar el sistema de suspensión delantera del vehículo, para verificar el adecuado estado de los empaques de la rótula, de forma tal que no exista goteo de aceite en dichas piezas. En caso de que se presente goteo, la rótula se puede aflojar y finalmente desprender. El evento en que se encuentre que los empaques no están en condiciones normales, se procederá al reemplazo de la rótula.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title: "Inflador del airbag",
      description:
        "Los vehículos involucrados están equipados con airbag frontal del conductor con infladores de una etapa. Durante la fabricación del inflador, la humedad en el ambiente pudo no haber sido controlada debidamente. Las rejillas propulsoras pudieron haber quedado expuestas sin control al ambiente cuando la línea de ensamblaje fue temporalmente detenida, aumentando la probabilidad a las rejillas de absorber la humedad del aire. Si es absorbida la suficiente humedad, en el caso de una colisión que resulte en el despliegue de la bolsa de aire frontal del conductor, la presión interior del conjunto inflador podría aumentar de manera anormal y el cuerpo inflador podría romperse, aumentando el riesgo a lesiones.",
    },
    {
      image: "/svgs/campana-preventiva-aceite-motor-coexito.svg",
      title: "Campaña preventiva aceite motor coexito",
      description:
        "Con relación al número total de vehículos atendidos, al 17 de junio de 2015: un total de 110 vehículos con motor gasolina han presentado ruidos en el motor; y un total de 1 vehículo con motor diesel ha presentado ruidos en el motor. Como consecuencia de la posibilidad de identificar una causa común en dichos ruidos en el motor Yokomotor:\n  – Suspendió el suministro de dicho aceite en los primeros días del mes de mayo.\n – Comunico a ATC dicha situación con la finalidad de que nuestros técnicos iniciaran revisión del problema que presentaban dichos motores.\n – Como parte de una medida acordada entre el productor, Coexito y Yokomotor, desde el pasado mes de mayo se inició un proceso de llamado a cada uno de los clientes de los vehículos atendidos con el fin de cambiar el aceite lubricante de motor e identificar si los motores presentaban ruidos y en los casos aislados donde se presentaban daños al motor ser realizaron las reparaciones correspondientes.\n – Ninguno de los costos y gastos generados por cuenta de los eventos aquí descritos será asumidos por el cliente.",
    },
    {
      image: "/svgs/bolsa-aire-pasajero-corolla-tdv.svg",
      title: "Campaña bolsa de aire del conductor RAV4 y Corolla",
      description:
        "Los vehículos sujetos de este llamado de servicio equipados con un inflador de airbag frontal de conductor. Toyota cree que estos infladores pueden tener una mayor probabilidad de entrada de humedad con el paso del tiempo. La intrusión de humedad podría hacer al inflador más susceptible de romperse durante un accidente. Una ruptura del inflador puede generar fragmentos metálicos que podrían entrar en contacto con un ocupante, aumentando el riesgo de lesiones. \n El inflador es un dispositivo contenido dentro del ensamblaje del airbag. Este contiene propulsores que son encendidos en el evento que el despliegue del airbag sea necesario. Cuando se realiza el encendido, el propulsor se expande con un gas inerte que infla el airbag. \n En la actualidad no existen indicios de que la condición se haya presentado en territorio colombiano, sin embargo la condición no causa que el airbag se infle en eventos que no sean necesarios. Adicionalmente este airbag es diseñado para inflarse únicamente en ciertos eventos(colisiones).",
    },
    {
      image: "/svgs/bolsa-aire-pasajero-corolla-tdv.svg",
      title: "Bolsa de aire pasajero (inflador del airbag) Corolla TDV",
      description:
        "Algunos de los vehículos fabricados con infladores de airbag en el lado del pasajero, pudieron haber sido ensamblados con propulsores fabricados de forma inadecuada. Estos propulsores pueden causar la ruptura del inflador y un despliegue anormal del airbag en caso de colisión, incrementando el riesgo de lesiones. \n Adicionalmente, en ciertos modelos equipados con sistema de airbag lado pasajero tipo sencillo, provistos igualmente por el proveedor Takata, estos infladores pudieron haber sido ensamblados de manera tal que pueden presentar entrada de humedad en el tiempo. La causa de esta entrada de humedad y su relación con el riesgo de la ruptura del inflador(si existiera), es desconocida.",
    },
    {
      image: "/svgs/control-principal-elevavidrios.svg",
      title: "Campaña elevavidrios Corolla, RAV4 y Camry",
      description:
        "Los vehículos están equipados con un interruptor maestro (PWMS) que contiene módulos deslizantes de contacto eléctrico en el lado del conductor, lubricadas con grasa en spray, dicha grasa pudo haber sido aplicada de manera inconsistente durante el proceso de fabricación, no proporcionando la suficiente cobertura.\n Durante el funcionamiento normal, los residuos causados por el desgaste de los puntos de contacto eléctrico se pueden acumular entre los terminales donde la grasa no fue aplicada, y se podría formar un corto circuito entre los puntos de contacto por los residuos y la humedad conductora que puede entrar en el módulo.Si se produce un cortocircuito, el conjunto del interruptor puede sobrecalentarse y fundirse. Un interruptor fundido puede producir humo y potencialmente, provocar un incendio.",
    },
    {
      image: "/svgs/instalacion-cubiertas-de-asiento-rav-4.svg",
      title: "Instalación cubiertas de asiento RAV4",
      description:
        "Los vehículos involucrados en esta campaña están equipados con cinturones de cintura y hombro de 3 puntos en ambos asientos laterales de la segunda fila de asientos. \n Debido a la forma metal del marco del cojín del asiento, en el caso de una colisión de alta velocidad, principalmente en la dirección frontal, hay una posibilidad de que la correa del cinturón podría ponerse en contacto con una porción del marco del cojín del asiento, se corte y se separare. Si esto ocurre, el cinturón de seguridad no puede contener adecuadamente al ocupante, lo que podría aumentar el riesgo de lesiones para el ocupante en caso el accidente.",
    },
    {
      image: "/svgs/campana-bolsa-de-aire-conductor-rav-4-y-corolla.svg",
      title:
        "Campaña especial de servicio - Reemplazo del conjunto de placa de succión",
      description:
        "Los vehículos indicados están equipados con una unidad de control de evaporativas (Canister) ensamblado al tanque de combustible. Hay la posibilidad que una grieta pueda desarrollarse en el borde del canal de resina para el flujo de gases de escape debido a una forma inadecuada del borde del canal en esa posición. En esta condición, la grieta puede expandirse en el tiempo, y eventualmente puede escapar combustible de la grieta cuando el tanque del vehículo esté lleno de gasolina.  Combustible o vapores de combustible en presencia de una fuente de ignición pueden incrementar el riesgo de fuego en el vehículo.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title:
        "Campaña bolsa de aire del conductor Corolla ZRE expansión mayo 2017",
      description:
        "Los vehículos involucrados están equipados con airbag frontal de producción Takata, los cuales pueden ser potencialmente susceptibles a desplegarse de manera anormal en caso de un accidente, aunque la condición no ha sido identificada, esta es una medida preventiva y para investigación en la cual se está expandiendo el llamado relacionado con el airbag frontal. \n El inflador es un dispositivo contenido dentro del airbag. Contiene un propulsor el cual se enciende en el evento que sea necesario el despliegue del airbag. Cuando se enciende, el propulsor se expande en un gas inerte, inflando el airbag.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title: "Airbag frontal - Lado conductor IMV expansión mayo 2017",
      description:
        "Los vehículos involucrados están equipados con airbag frontal de producción Takata, los cuales pueden ser potencialmente susceptibles a desplegarse de manera anormal en caso de un accidente, aunque la condición no ha sido identificada, esta es una medida preventiva y para investigación en la cual se está expandiendo el llamado relacionado con el airbag frontal. \n El inflador es un dispositivo contenido dentro del airbag. Contiene un propulsor el cual se enciende en el evento que sea necesario el despliegue del airbag. Cuando se enciende, el propulsor se expande en un gas inerte, inflando el airbag.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title:
        "Campaña especial de servicio - Airbag frontal, lado conductor (almohadilla)",
      description:
        "Los vehículos en relación está equipados con infladores de airbag frontal para conductor (Takata – designados SDI) y/o infladores de airbag para pasajeros (Takata – designados SDI; SPI; SPI-2 Y PSPI-6), los cuales contienen un detonador en fase estabilizado de nitrato de amonio no-desecado. \n De acuerdo al reporte Takata, un defecto relacionado con la seguridad del vehículo podrá surgir en los infladores debido a la degradación del propelente que ocurre luego de la exposición prolongada a la alta humedad, altas temperaturas, y altos ciclos de temperatura. \n La activación de un inflador de nitrato de amonio no-desecado con el detonador degradado podría dar como resultado la ruptura del inflador. Una ruptura del inflador podría causar fragmentos de metal que pasen a través de la bolsa de aire al interior del vehículo a alta velocidad, lo que puede causar lesiones o la muerte de los ocupantes.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title:
        "Campaña especial de servicio - Airbag frontal, lado conductor (detonador)",
      description:
        "Los vehículos en relación están equipados con infladores de airbag frontal para conductor (Takata – designados SDI) y/o infladores de airbag para pasajeros (Takata – designados SDI; SPI; SPI-2 Y PSPI-6), los cuales contienen un detonador en fase estabilizado de nitrato de amonio no-desecado. \n De acuerdo al reporte Takata, un defecto relacionado con la seguridad del vehículo podrá surgir en los infladores debido a la degradación del detonador, ocurre luego de la exposición prolongada a la alta humedad, altas temperaturas, y altos ciclos de temperatura. \n La activación de un inflador de nitrato de amonio no-desecado con el detonador degradado podría dar como resultado la ruptura del inflador. Una ruptura del inflador podría causar fragmentos de metal que pasen a través de la bolsa de aire al interior del vehículo a alta velocidad, lo que puede causar lesiones o la muerte de los ocupantes.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title: "Reemplazo airbag lado pasajero 4Runner",
      description:
        "Los vehículos involucrados están equipados con infladores airbag para copiloto, el cual contienen un detonador (propelente) en fase estabilizado de nitrato de amonio no-desecado. \n  De acuerdo a la parte de reportes enviados por Takata, un defecto relacionado con la seguridad del vehículo motorizado puede surgir en los infladores, debido a la degradación del propelente que ocurre de una exposición prolongada a alta humedad absoluta, alta temperatura y altos ciclos de alta temperatura. \n  La activación del inflador de nitrato de amonio no-desecado con degradación en el propelente podrá resultar en la ruptura del inflador. Una ruptura del inflador podrá causar que fragmentos de metal pasen a través de la bolsa de aire y al interior del vehículo a alta velocidad, lo que puede provocar lesiones o la muerte de los ocupantes del vehículo.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title: "Reemplazo airbag lado pasajero 4Runner (alterna)",
      description:
        "Los vehículos involucrados están equipados con infladores airbag para copiloto, los cuales contienen un detonador (propelente) en fase estabilizado de nitrato de amonio no-desecado. \n  De acuerdo a la parte de reportes enviados por Takata, un defecto relacionado con la seguridad del vehículo motorizado puede surgir en los infladores, debido a la degradación del propelente que ocurre de una exposición prolongada a alta humedad absoluta, alta temperatura y altos ciclos de alta temperatura. \n La activación del inflador de nitrato de amonio no-desecado con degradación en el propelente podrá resultar en la ruptura del inflador. Una ruptura del inflador podrá causar que fragmentos de metal pasen a través de la bolsa de aire y al interior del vehículo a alta velocidad, lo que puede provocar lesiones o la muerte de los ocupantes del vehículo.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title: "Reemplazo detonador airbag lado pasajero Corolla",
      description:
        "Los vehículos indicados están equipados con infladores de airbag frontal para pasajero, los cuales contienen un detonador en fase estabilizado de nitrato de amonio no-desecado. \n  De acuerdo al reporte de Takata, un defecto relacionado con la seguridad del vehículo podrá surgir en los infladores debido a la degradación del propelente que ocurre luego de la exposición prolongada a la alta humedad, altas temperaturas y altos ciclos de temperatura. \n La activación de un inflador de nitrato de amonio no-desecado con el propelente degradado podría dar como resultado la ruptura del inflador. Una ruptura del inflador podrá causar fragmentos de metal que pasen a través de la bolsa de aire al interior del vehículo a alta velocidad, lo que puede provocar lesiones o la muerte de los ocupantes",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title: "Reemplazo detonador airbag lado pasajero 4Runner",
      description:
        "Los vehículos indicados están equipados con infladores de airbag frontal para pasajero, los cuales contienen un detonador en fase estabilizado de nitrato de amonio no-desecado. \n  De acuerdo al reporte de Takata, un defecto relacionado con la seguridad del vehículo podrá surgir en los infladores debido a la degradación del propelente que ocurre luego de la exposición prolongada a la alta humedad, altas temperaturas y altos ciclos de temperatura. \n La activación de un inflador de nitrato de amonio no-desecado con el propelente degradado podría dar como resultado la ruptura del inflador. Una ruptura del inflador podrá causar fragmentos de metal que pasen a través de la bolsa de aire al interior del vehículo a alta velocidad, lo que puede provocar lesiones o la muerte de los ocupantes.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title: "Airbag lado conductor Hilux - Fortuner",
      description:
        "Esta Campaña de Seguridad Takata tiene como objetivo atender a los vehículos indicados que corresponda, los cuales están equipados con infladores de airbag frontal para el conductor y/o infladores de airbag frontales para el pasajero de adelante, que contienen un propelente de nitrato de amonio en fase estabilizado no desecado. De acuerdo con los reportes de Takata, un defecto relacionado con la seguridad del vehículo puede ocurrir en los infladores debido a degradación del propelente que ocurre después de exposición prolongada a alta humedad absoluta, altas temperaturas y altos ciclos de temperatura. La activación de un inflador de nitrato de amonio no desecado con el propelente degradado podría resultar en la ruptura del inflador. La ruptura de un inflador podría causar que fragmentos metálicos pasen a través del airbag al interior del vehículo a alta velocidad, lo cual podría causar lesiones o la muerte de ocupantes del vehículo.",
    },
    {
      image: "/svgs/cable-espiral-airbag.svg",
      title: "Reemplazo bomba de combustible",
      description:
        "Esta CAMPAÑA DE SEGURIDAD Toyota aplica para los vehículos indicados, los cuales están equipados con una bomba de gasolina de baja presión, localizada en el tanque de combustible, que suministra presión de combustible al sistema de inyección de gasolina. Estas bombas de gasolina pueden incluir impulsores los cuales han sido fabricados con baja densidad. Si estos impulsores también son del tipo de baja resistencia en la superficie o de un tipo diferente pero fueron expuestos a solventes de secado de producción por un periodo de tiempo más largo, altos niveles de fisuras en la superficie puede ocurrir. En esta condición, excesiva absorción de gasolina puede ocurrir, resultando en un incremento en la deformación del impulsor. En algunos casos, el impulsor se puede deformar a un punto que crea suficiente interferencia con el cuerpo de la bomba de gasolina causando que la bomba de gasolina sea inoperativa. \n  Una bomba de gasolina inoperativa debido a estas condiciones puede resultar en el encendido del testigo de revision de motor y todos los indicadores del cuadro de instrumentos, funcionamiento irregular del motor, condición de no arranque del motor/ o parada del vehículo mientras se está conduciendo a baja velocidad. Sin embargo, en raras ocasiones, una parada del vehículo puede ocurrir mientras se está conduciendo a alta velocidad, incrementando el riesgo de accidentes.",
    },
    {
      image: "/svgs/inflador-del-airbag.svg",
      title: "Reemplazo inflador airbag lado conductor RAV4",
      description:
        "Esta CAMPAÑA DE SEGURIDAD Toyota aplica para los vehículos indicados, los cuales esta equipados con un inflador de airbag del conductor sin-azida de una etapa (Designación TAKATA-NADI) como equipo original; estos infladores no contienen propulsor de nitrato de amonio estabilizado en fase (PSAN). Aunque Toyota no lo ha confirmado en este momento con respecto a los vehículos involucrados, de acuerdo al informe de Información de Defectos presentado por Takata el 26 de noviembre de 2019 (19E-080), el propulsor en algunos de los infladores involucrados puede absorber humedad con el tiempo, lo que Takata cree que está relacionado con el sello de aluminio del inflador. La absorción de humedad en el propulsor con el tiempo podría provocar un despliegue lento o la rotura del inflador en situaciones en las que se ordena que se desplieguen las bolsas de aire. La posibilidad de que ocurran estos escenarios de despliegue anormales puede requerir o verse agravada por otros factores y variables más allá de la absorción de humedad del propulsor y aún no son completamente comprendidos por Takata o Toyota. Si se produce un despliegue anormal del airbag del conductor, esto podría aumentar el riesgo de lesiones en caso de accidente. Se desconoce la probabilidad de que esto ocurra en los vehículos involucrados, pero, por precaución, Toyota presenta este informe.",
    },
  ];

  return (
    <View>
      <style>
        {`
          .mobile-campaigns-title {
            white-space: pre-line !important;
          }
        `}
      </style>

      <PreventiveCampaignsServicesBanner />
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
            {isMobile ? "Campañas\nde Seguridad" : "Campañas de Seguridad"}
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
            Automotores Toyota Colombia S.A.S., en atención a los principios de
            calidad, seguridad, y atención al cliente dispuestos por TOYOTA,
            informa a los propietarios y usuarios de vehículos de la marca que
            fueron comercializados en Colombia sobre el inicio y desarrollo de
            campaña(s) especial(es) de servicio para algunas unidades de sus
            modelos. <br />
            Para conocer si tu vehículo es requerido para adelantar algún
            procedimiento relacionado, agradecemos digitar el número de
            VIN/Chasis en el espacio dispuesto a continuación. Ten presente que
            este código se compone de 17 caracteres alfanuméricos que se
            encuentran en los documentos que acreditan la propiedad del vehículo
            (tarjeta de propiedad):
            <br />
            Es preciso aclarar que la(s) campaña(s) de servicio no aplica(n)
            para todos los modelos y líneas de vehículos comercializados en el
            país. De igual forma, las intervenciones y repuestos para
            implementar la campaña de servicio en tu vehículo, en caso de ser
            requerido, no representarán ningún costo para ti. Si tu vehículo
            está incluido dentro de alguna de nuestras campañas de servicio, por
            favor comunícate a la mayor brevedad con tu concesionario TOYOTA
            autorizado de confianza y concreta una cita para servicio.
            <br />
            Para mayor información, te invitamos a comunicarte con nosotros a
            través de la línea gratuita nacional 01 8000 123 691.
          </Text>
        </Flex>

        <iframe
          src="https://www.youtube.com/embed/KVS9oscMATo"
          width="100%"
          height="400"
          title="Campañas de Seguridad - Video"
          style={{ border: 0, maxWidth: "47.17088rem" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* <Image
          src="/images/campanas-preventivas-servicio-video.png"
          alt="Video"
          width={{ base: "100%", xl: "min(100%, 47.17088rem)" }}
        /> */}
      </Flex>

      <Flex
        maxWidth={{ base: "1530px" }}
        direction={{ base: "column" }}
        gap={{ base: "0" }}
        margin={{ base: "0 auto" }}
      >
        <Flex
          direction={{ base: "column", xl: "row" }}
          width={{ xl: "100%" }}
          gap={{ base: "0" }}
        >
          <Flex
            width={{ xl: "50%" }}
            direction={{ base: "column" }}
            padding={{ base: "2.125rem .9375rem", xl: "4.75rem 1rem" }}
            backgroundColor={{ base: "#E7EDF1" }}
            justifyContent={{ xl: "center" }}
          >
            <Flex
              direction={{ base: "column" }}
              alignItems={{ base: "center" }}
              gap={{ base: "0.56rem", xl: "2rem" }}
            >
              <Flex
                direction={{ base: "column" }}
                alignItems={{ base: "center" }}
                gap={{ base: "1rem", xl: "2rem" }}
              >
                <Heading level={2}>
                  <Flex
                    gap={{ base: "0.25rem" }}
                    alignItems={{ base: "center" }}
                  >
                    <View
                      as="span"
                      fontFamily={"var(--font-ToyotaType-Regular)"}
                      color={"black"}
                      textAlign={{ base: "center" }}
                      fontSize={{ base: "0.875rem", xl: "1.375rem" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "140%", xl: "1.9375rem" }}
                    >
                      VIN
                    </View>
                    <Image
                      src="/svgs/info-icon.svg"
                      alt="Info"
                      width={{ xl: "1.0625rem" }}
                      style={{ cursor: "pointer" }}
                      onClick={openInfoModal}
                    />
                  </Flex>
                </Heading>

                <Heading
                  level={3}
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  color={"black"}
                  textAlign={{ base: "center" }}
                  fontSize={{ base: "1.375rem", xl: "2rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "normal", xl: "130%" }}
                  maxWidth={{ xl: "24ch" }}
                >
                  Verifica aquí si tu vehículo es objeto de alguna Campaña de
                  Seguridad, Servicio o Satisfacción.
                </Heading>
              </Flex>

              {/* <Text
                fontFamily={"var(--font-ToyotaType-Regular)"}
                color={"black"}
                textAlign={{ base: "center" }}
                fontSize={{ base: "0.5625rem", xl: "0.875rem" }}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "normal", xl: "140%" }}
                maxWidth={{ xl: "58ch" }}
              >
                Estas campañas no aplican a todos los modelos, y las
                intervenciones o repuestos necesarios, de ser incluidos, no
                tendrán costo alguno.
              </Text> */}
            </Flex>
          </Flex>

          <Flex
            width={{ xl: "50%" }}
            direction={{ base: "column" }}
            alignItems={{ base: "center" }}
            justifyContent={{ xl: "center" }}
            padding={{
              base: "3.1875rem 0.9375rem 3.6875rem",
              xl: "4.75rem 1rem",
            }}
            gap={{ base: "1.875rem", xl: "2rem" }}
            backgroundImage={{
              base: "url(/images/vin-query__background.png)",
            }}
          >
            <Heading
              level={2}
              fontFamily={"var(--font-toyotaDisplay)"}
              color={"white"}
              textAlign={{ base: "center" }}
              fontSize={{ base: "2rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "130%" }}
            >
              Consulta tu VIN
            </Heading>

            <Flex
              direction={{ base: "column" }}
              width={{ base: "100%" }}
              alignItems={{ base: "center" }}
              gap={{ base: "1.875rem", xl: "2rem" }}
            >
              <Input
                className="vin-input"
                placeholder="ej. 1GNCS13Z6M0216591"
                value={vinNumber}
                onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                maxLength={17}
                padding={{ base: "0.97rem" }}
                border={{ base: ".0625rem solid #FFF" }}
                borderRadius={{ base: "7.5rem" }}
                fontFamily={"var(--font-toyotaDisplay)"}
                color={"white"}
                textAlign={{ base: "center" }}
                fontSize={{ base: "0.875rem" }}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "120%" }}
                maxWidth={{ base: "21.5625rem", xl: "27.75rem" }}
              />

              <Button
                onClick={validateAndSubmit}
                disabled={mutation.isPending}
                minWidth={{ base: "10.9375rem", xl: "18.125rem" }}
                padding={{ base: "10px 24px" }}
                backgroundColor={{ base: "white" }}
                borderRadius={{ base: "6.25rem" }}
                color={"black"}
                fontFamily={"var(--font-ttoyotaDisplay)"}
                textAlign={{ base: "center" }}
                fontSize={{ base: "0.875rem" }}
                fontWeight={{ base: "400" }}
                lineHeight={{ base: "140%", xl: "1.25rem" }}
                letterSpacing={{ xl: "0.00625rem" }}
                border={{ base: "none" }}
              >
                {mutation.isPending ? "Consultando..." : "Consultar"}
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Text
          padding={{ base: "1rem 2.6875rem 2.5rem", xl: "2rem 1rem 7.13rem" }}
          backgroundColor={{ base: "#E7EDF1", xl: "white" }}
          color={"black"}
          fontFamily={"var(--font-ToyotaType-Regular)"}
          textAlign={{ base: "center" }}
          fontSize={{ base: "0.5625rem", xl: "0.75rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "normal", xl: "1.0625rem" }}
          letterSpacing={"0"}
        >
          Para mayor información, te invitamos a comunicarte con nosotros a
          través de la línea gratuita nacional 01 8000 123 691 o la línea (601)
          380 9424 en Bogotá.
        </Text>
      </Flex>

      <PreventiveCampaignsServicesSlider
        items={[
          {
            image: {
              src: "/images/01_Infografiia_VIN.jpg",
              alt: "VIN",
              width: "100%",
              height: "auto",
            },
          },
          {
            image: {
              src: "/images/02_Infografiia_VIN.jpg",
              alt: "VIN",
              width: "100%",
              height: "auto",
            },
          },
          {
            image: {
              src: "/images/03_Infografiia_VIN.jpg",
              alt: "VIN",
              width: "100%",
              height: "auto",
            },
          },
        ]}
      />

      <Flex
        direction={{ base: "column" }}
        gap={{ base: "2.63rem", xl: "4.58rem" }}
        padding={{
          base: "3.38rem 14px 3.5rem 15px",
          xl: "7.25rem 1rem 7.13rem",
        }}
      >
        <Flex
          direction={{ base: "column" }}
          gap={{ base: "0.56rem", xl: "0.75rem" }}
          alignItems={{ base: "center" }}
        >
          <Heading
            level={2}
            fontFamily={"var(--font-ToyotaType-Regular)"}
            color={"black"}
            textAlign={{ base: "center" }}
            fontSize={{ base: "1.375rem", xl: "52px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "1.9375rem", xl: "110%" }}
            letterSpacing={{ xl: "-2px" }}
            maxWidth={{ xl: "17ch" }}
          >
            Campañas de Servicio y Prevención
          </Heading>

          <Text
            fontFamily={"var(--font-ToyotaType-Regular)"}
            color={"black"}
            textAlign={{ base: "center" }}
            fontSize={{ base: "0.75rem", xl: "18px" }}
            fontWeight={{ base: "400" }}
            lineHeight={{ base: "100%" }}
            letterSpacing={"0"}
          >
            Selecciona una opción para ver los detalles
          </Text>
        </Flex>

        <Flex
          direction={{ base: "column" }}
          alignItems={{ base: "center" }}
          gap={{ base: "2.06rem", xl: "4.92rem" }}
        >
          <Grid
            width={{ base: "min(21.625rem, 100%)", xl: "min(95.625rem, 100%)" }}
            templateColumns={{
              base: "repeat(2, 1fr)",
              xl: "repeat(auto-fill, 18.125rem)",
            }}
            justifyContent={{ base: "center" }}
            autoRows={{ base: "6.25rem", xl: "12rem" }}
            gap={{ base: "6px" }}
            position={{ base: "relative" }}
          >
            {campaigns.map((campaign, index) => (
              <Flex
                key={index}
                direction={{ base: "column" }}
                alignItems={{ base: "center" }}
                justifyContent={{ base: "center" }}
                gap={{ base: "0.31rem", xl: ".75rem" }}
                padding={{ base: "0.94rem 1.62rem" }}
                onClick={() => openModal(campaign)}
                backgroundImage={{
                  base: "var(--Gradient-Blue, linear-gradient(178deg, #E7EDF1 52.85%, #F4F7F9 98.36%))",
                }}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  transform={{ xl: "scale(1.1)" }}
                  height={{ base: "25px", xl: "32px" }}
                  width={{ base: "25px", xl: "32px" }}
                />

                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  color={"black"}
                  textAlign={{ base: "center" }}
                  fontSize={{ base: "0.75rem", xl: "16px" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "normal" }}
                  letterSpacing={"0"}
                  maxWidth={{ xl: "17ch" }}
                >
                  {campaign.title}
                </Text>
              </Flex>
            ))}

            <View
              position={{ base: "absolute" }}
              bottom={{ base: "0" }}
              width={{ base: "100%" }}
              height={{ base: "4.875rem" }}
            ></View>
          </Grid>
          <Button
            display={"none"}
            borderRadius={{ base: "6.25rem" }}
            border={{ base: ".0625rem solid #161B1E" }}
            fontFamily={"var(--font-ToyotaType-Regular)"}
            color={"black"}
            textAlign={{ base: "center" }}
            fontSize={{ base: "0.875rem", xl: "18px" }}
            fontWeight={{ base: "500", xl: "400" }}
            lineHeight={{ base: "1.25rem", xl: "100%" }}
            letterSpacing={{ base: "0.00625rem", xl: "0" }}
            width={{ base: "170px", xl: "290px" }}
            height={{ base: "40px", xl: "50px" }}
          >
            Ver más Campañas
          </Button>
        </Flex>
      </Flex>
      {isModalOpen && selectedCampaign && (
        <View
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0,0,0,0.4)"
          display="flex"
          padding="1rem"
          style={{
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999",
          }}
        >
          <View
            position="relative"
            backgroundColor="white"
            borderRadius="1rem"
            padding={{ base: "1.5rem", xl: "2.5rem" }}
            maxWidth="60rem"
            width="100%"
            boxShadow="0px 8px 24px rgba(0,0,0,0.2)"
          >
            {/* Close Icon */}
            <View
              position="absolute"
              top="1rem"
              right="1rem"
              fontSize="1.5rem"
              fontWeight="bold"
              style={{ cursor: "pointer" }}
              onClick={closeModal}
            >
              ✕
            </View>

            {/* Title */}
            <Text
              fontFamily="var(--font-toyotaDisplay)"
              fontSize={{ base: "1.25rem", xl: "32px" }}
              color="black"
              fontWeight="400"
              marginBottom="1rem"
              textAlign="left"
              position="relative"
              lineHeight="130%"
              style={{ verticalAlign: "middle" }}
            >
              {selectedCampaign.title}
            </Text>

            {/* Description */}
            <Text
              style={{ whiteSpace: "pre-line" }}
              fontFamily="var(--font-ToyotaType-Regular)"
              fontSize={{ base: "1rem", xl: "1.125rem" }}
              letterSpacing="0px"
              color="black"
              textAlign="justify"
              lineHeight="1.6"
            >
              {selectedCampaign.description}
            </Text>
          </View>
        </View>
      )}
      {/* info modal */}
      {isInfoModalOpen && (
        <View
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0,0,0,0.5)"
          display="flex"
          padding="1rem"
          style={{
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9999",
          }}
        >
          <View
            backgroundColor="white"
            padding={{ base: "1.5rem", xl: "2.5rem" }}
            borderRadius="1rem"
            width={{ base: "100%", xl: "34rem" }}
            boxShadow="0px 8px 24px rgba(0,0,0,0.2)"
            position="relative"
            // style={{
            //   borderTop: "solid black 100px",
            //   borderBottom: "solid black 58px",
            //   borderRight: "solid black 40px",
            //   borderLeft: "solid black 40px",
            // }}
          >
            {/* Close Icon */}
            <Text
              position="absolute"
              top="1rem"
              right="1rem"
              fontSize="1.25rem"
              fontWeight="bold"
              style={{ cursor: "pointer" }}
              onClick={closeInfoModal}
            >
              ✕
            </Text>

            {/* Title */}
            <Text
              fontFamily="var(--font-toyotaDisplay)"
              fontSize={{ base: "1rem", xl: "1.75rem" }}
              fontWeight="400"
              color="black"
              textAlign="left"
              marginBottom="0.75rem"
            >
              ¿Qué es el número VIN?
            </Text>

            {/* Description */}
            <Text
              fontFamily="var(--font-ToyotaType-Regular)"
              fontSize={{ base: "0.875rem", xl: "1.125rem" }}
              color="black"
              textAlign="left"
              lineHeight="1.6"
            >
              Es una secuencia alfanumérica de identificación del vehículo o
              número de chasis. El equivalente al ID o cédula de ciudadanía para
              los automóviles.
            </Text>
          </View>
        </View>
      )}

      {/* VIN Results Modal */}
      {isVinResultsModalOpen && (
        <View>
          <View
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            backgroundColor="rgba(0,0,0,0.5)"
            display="flex"
            padding="1rem"
            style={{
              justifyContent: "center",
              alignItems: "center",
              zIndex: "9999",
            }}
            onClick={closeVinResultsModal}
          ></View>

          <View
            backgroundColor="white"
            borderRadius="1rem"
            width={{ base: "min(375px, 90%)", xl: "min(1530px, 90%)" }}
            maxHeight={"80svh"}
            boxShadow="0px 8px 24px rgba(0,0,0,0.2)"
            position="fixed"
            padding={{ base: "40px 20px", xl: "139px 163px 76px 162px" }}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
            style={{
              overflow: "auto",
              zIndex: "9999",
            }}
          >
            {/* Close Icon */}
            <Text
              position="fixed"
              top="1rem"
              right="1rem"
              lineHeight={"100%"}
              style={{
                cursor: "pointer",
                fontSize: "45px",
                fontWeight: "normal",
                color: "black",
              }}
              onClick={closeVinResultsModal}
            >
              ✕
            </Text>
            {campaign.length === 0 ? (
              <View
                display={"flex"}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "-webkit-fill-available",
                  flexDirection: "column",
                }}
              >
                <Heading
                  level={3}
                  marginBottom="26px"
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "black",
                  }}
                >
                  Resultado:
                </Heading>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    color: "black",
                    whiteSpace: "pre-line",
                    marginBottom: "48px",
                  }}
                >
                  El VIN ingresado no hace parte de la Campaña de Seguridad
                </Text>
              </View>
            ) : (
              <>
                {campaign.map((item, index) => (
                  <>
                    <Heading
                      level={3}
                      marginBottom="26px"
                      style={{
                        fontFamily: "var(--font-ToyotaType-Regular)",
                        fontWeight: "700",
                        fontSize: "26px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "black",
                      }}
                    >
                      {`${index + 1})`} Campaña
                    </Heading>
                    <Text
                      style={{
                        fontFamily: "var(--font-ToyotaType-Regular)",
                        fontWeight: "400",
                        fontSize: "18px",
                        lineHeight: "140%",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        color: "black",
                        marginBottom: "48px",
                      }}
                    >
                      {item?.nombre}
                    </Text>

                    {/* Description Section */}
                    <Heading
                      level={3}
                      marginBottom="26px"
                      style={{
                        fontFamily: "var(--font-ToyotaType-Regular)",
                        fontWeight: "700",
                        fontSize: "26px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "black",
                      }}
                    >
                      Descripción
                    </Heading>
                    <Text
                      style={{
                        fontFamily: "var(--font-ToyotaType-Regular)",
                        fontWeight: "400",
                        fontSize: "18px",
                        lineHeight: "140%",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        color: "black",
                        marginBottom: "48px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item?.descripcion}
                    </Text>

                    {/* Observations Section */}
                    <Heading
                      level={3}
                      marginBottom="26px"
                      style={{
                        fontFamily: "var(--font-ToyotaType-Regular)",
                        fontWeight: "700",
                        fontSize: "26px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "black",
                      }}
                    >
                      Observaciones
                    </Heading>
                    <Text
                      style={{
                        fontFamily: "var(--font-ToyotaType-Regular)",
                        fontWeight: "400",
                        fontSize: "18px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        color: "black",
                        marginBottom: "48px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item?.observaciones}
                      <Text
                        as="span"
                        style={{
                          display: "block",
                          fontSize: "20px",
                          fontFamily: "var(--font-ToyotaType-Regular)",
                          color: item.realizado ? "#000000" : "#D42224",
                          fontWeight: "700",
                          lineHeight: "140%",
                          letterSpacing: "0%",
                        }}
                      >
                        {item.realizado ? "Realizada" : "No realizada"}
                      </Text>
                    </Text>
                    {item.realizado ? (
                      <></>
                    ) : (
                      <>
                        <hr />
                        <Flex justifyContent="center">
                          <Button
                            onClick={openAppointmentForm}
                            backgroundColor="#D42224"
                            color="white"
                            border="none"
                            borderRadius="6.25rem"
                            padding="0.75rem 2rem"
                            fontFamily="var(--font-ToyotaType-Regular)"
                            fontSize="0.875rem"
                            fontWeight="400"
                            width="375px"
                            style={{ cursor: "pointer" }}
                          >
                            Agenda tu visita
                          </Button>
                        </Flex>
                      </>
                    )}
                  </>
                ))}
              </>
            )}
          </View>
        </View>
      )}

      {/* Appointment Form Modal */}
      <AppointmentForm
        isOpen={isAppointmentFormOpen}
        onClose={closeAppointmentForm}
        vinNumber={vinNumber}
      />
    </View>
  );
}
