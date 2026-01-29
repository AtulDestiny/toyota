"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Modal } from "./components/Modal";
import { Stepper } from "./components/Stepper";
import { DataForm } from "./components/DataForm";
import { ContactDetailsForm } from "./components/ContactDetailsForm";
import { DealerForm } from "./components/DealerForm";
import { VehicleForm } from "./components/VehicleForm";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ModalStepperCopyProps {
  model: string;
  version: string;
  isOpen: boolean;
  vehicleInfo?: any;
  onClose: () => void;
  onRedirect: () => void;
  amplifyConfig: any; // Configuración de Amplify específica del proyecto
}

// Tipos para los pasos y campos
type StepKey = "dataForm" | "contactDetailsForm" | "dealerForm" | "vehicleForm";
type Field =
  | "firstName"
  | "lastName"
  | "typeDocument"
  | "numberempresa"
  | "numberDocument"
  | "phone"
  | "email"
  | "dealer"
  | "city"
  | "vehicleModel"
  | "vehicleVersion";

export function ModalStepperCopy({
  isOpen,
  onClose,
  onRedirect,
  vehicleInfo,
  version,
  model,
}: ModalStepperCopyProps) {
  const router = useRouter();
  const keyboard = useRef(null);
  const [focusedInput, setFocusedInput] = useState("");
  const [inputPattern, setInputPattern] = useState(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isValid, setIsValid] = useState({
    dataForm: false,
    contactDetailsForm: false,
    dealerForm: false,
    vehicleForm: false,
  });
  const [formData, setFormData] = useState({
    dataForm: {
      firstName: "",
      lastName: "",
      typeDocument: "",
      numberDocument: "",
      numberempresa: "",
    },
    contactDetailsForm: {
      phone: "",
      email: "",
    },
    dealerForm: {
      dealer: "",
      city: "",
    },
    vehicleForm: {
      vehicleType: "",
      vehicleVersions: "",
      quantity: "",
    },
  });

  const handleFormDataChange = (
    step: StepKey,
    data: Record<string, string>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...data },
    }));
  };

  const handleInputChange = (value: string) => {
    if (focusedInput) {
      const [step, field] = focusedInput.split(".") as [StepKey, Field];
      setFormData((prevData) => ({
        ...prevData,
        [step]: { ...prevData[step], [field]: value },
      }));
    }
  };

  useEffect(() => {
    const [, field] = focusedInput.split(".") as [StepKey, Field];
    let pattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (field === "numberDocument" || field === "phone") {
      pattern = /^\d+$/;
    }
    if (field === "email") {
      pattern = /.*/;
    }
    if (field === "numberempresa") {
      pattern = /.*/; // Allow all characters for company names
    }

    setInputPattern(pattern);
  }, [focusedInput]);

  const steps = [
    {
      title: "Datos",
      content: (
        <DataForm
          data={formData.dataForm}
          onChange={(data) => handleFormDataChange("dataForm", data)}
          onValidate={(isValid) =>
            setIsValid((prev) => ({ ...prev, dataForm: isValid }))
          }
          onFocus={(field) => setFocusedInput(`dataForm.${field}`)}
        />
      ),
    },
    {
      title: "Datos de contacto",
      content: (
        <ContactDetailsForm
          data={formData.contactDetailsForm}
          onChange={(data) => handleFormDataChange("contactDetailsForm", data)}
          onValidate={(isValid) =>
            setIsValid((prev) => ({ ...prev, contactDetailsForm: isValid }))
          }
          onFocus={(field) => setFocusedInput(`contactDetailsForm.${field}`)}
        />
      ),
    },
    {
      title: "Vehículo a cotizar",
      content: (
        <VehicleForm
          data={formData.vehicleForm}
          vehicleInfo={vehicleInfo}
          onChange={(data) => handleFormDataChange("vehicleForm", data)}
          onValidate={(isValid) =>
            setIsValid((prev) => ({ ...prev, vehicleForm: isValid }))
          }
        />
      ),
    },
    {
      title: "Concesionario",
      content: (
        <DealerForm
          data={formData.dealerForm}
          onChange={(data) => handleFormDataChange("dealerForm", data)}
          onValidate={(isValid) => {
            setIsValid((prev) => ({ ...prev, dealerForm: isValid }));
          }}
        />
      ),
    },
  ];

  function getDianDocumentType(value: string): string {
    const documentTypesDian = [
      { dian: "13", value: "1" },
      { dian: "31", value: "2" },
      { dian: "21", value: "3" },
      { dian: "41", value: "4" },
      { dian: "12", value: "5" },
    ];

    const found = documentTypesDian.find((type) => type.value === value);
    return found ? found.dian : "13"; // default to '13' if not found
  }


  const handleStepSendData = async () => {

    if (isValid.dataForm && isValid.contactDetailsForm && isValid.vehicleForm && isValid.dealerForm) {
      setIsSubmitting(true)
      const URL_LEAD =
        "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/proxy?action=Salesforce";
      const TOKEN =
        "ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL";

      const leadBody = {
        method: "createLeadComposite",
        records: [
          {
            attributes: {
              type: "lead",
              referenceId: Math.floor(Date.now() / 1000).toString(),
            },
            LastName: formData.dataForm.lastName,
            FirstName: formData.dataForm.firstName,
            ATC_Numero_de_documento__c: formData.dataForm.numberDocument,
            ATC_TipoDocumentoCandidato__c: getDianDocumentType(formData.dataForm.typeDocument),
            Email: formData.contactDetailsForm.email,
            MobilePhone: formData.contactDetailsForm.phone.replace(/\D/g, ""),
            ATC_CiudadLista__c: formData.dealerForm.city || "",
            ATC_ConcesionarioLista__c: asignarValor(Number(formData.dealerForm.dealer)) || "",
            ATC_VitrinaLista__c: formData.dealerForm.dealer,
            ACT_Tipo_de_venta__c: "Flotas",
            ATC_Modelo__c: formData.vehicleForm.vehicleType.toUpperCase(),
            ATC_Version__c: formData.vehicleForm.vehicleVersions ? normalize(formData.vehicleForm.vehicleVersions) : "",
            Company: formData.dataForm.numberempresa || "",
            ATC_Autorizacion_tratamiento_de_datos__c: "Si",
            ATC_AceptacionTerminosyCondiciones__c: true,
            LeadSource: "Web to lead ATC",
            ATC_Informacion_adicional__c: formData.vehicleForm.quantity,
          },
        ],
      };

      try {
        const response = await axios.post(URL_LEAD, leadBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });

      } catch (error: any) {
        console.error("Error al enviar formulario:", error);
        alert(error.message || "Error al enviar la información");
      }
      setIsSubmitting(false)
      router.push("/thank-you-corporativas");
    } else {
      alert("Something went wrong!")
      console.log("Form validation failed - cannot submit");
      setIsSubmitting(false)
    }

  };

  function normalize(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toUpperCase();
  }

  function asignarValor(numero: number) {
    const casos: any = {
      1: "1",
      2: "1",
      3: "1",
      4: "2",
      5: "2",
      6: "2",
      7: "2",
      8: "2",
      9: "2",
      10: "2",
      11: "2",
      12: "2",
      14: "2",
      19: "6",
      20: "6",
      21: "7",
      22: "7",
      23: "8",
      24: "8",
      25: "8",
      26: "9",
      70: "8",
      27: "10",
      28: "10",
      29: "11",
      30: "12",
      31: "12",
      34: "15",
      35: "15",
      36: "15",
      37: "15",
      38: "15",
      39: "16",
      41: "17",
      42: "18",
      45: "20",
      46: "21",
      47: "22",
      48: "23",
      53: "26",
      55: "27",
      56: "28",
      57: "29",
      59: "30",
      60: "30",
      61: "30",
      62: "30",
      63: "30",
      72: "18",
    };
    return casos[numero] || null;
  }
  const handleStepRedirect = () => onRedirect();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setFocusedInput("");
          setFormData({
            dataForm: {
              firstName: "",
              lastName: "",
              typeDocument: "",
              numberDocument: "",
              numberempresa: "",
            },
            contactDetailsForm: {
              phone: "",
              email: "",
            },
            dealerForm: {
              dealer: "",
              city: "",
            },
            vehicleForm: {
              vehicleType: "",
              vehicleVersions: "",
              quantity: "",
            },
          });
        }}
        title="Ingresa tus datos para"
        description="Cotizar en linea"
        keyboardProps={{
          focusedInput,
          keyboard,
          handleInputChange,
          inputPattern,
        }}
      >
        <Stepper
          steps={steps}
          onStepChange={(e) => {
            if (e === 2) setFocusedInput("");
          }}
          isSubmitting={isSubmitting}
          onStepSendData={handleStepSendData}
          onStepRedirect={handleStepRedirect}
          isStepValid={[
            isValid.dataForm,
            isValid.contactDetailsForm,
            isValid.vehicleForm,
            isValid.dealerForm,
          ]}
        />
      </Modal>
    </>
  );
}
