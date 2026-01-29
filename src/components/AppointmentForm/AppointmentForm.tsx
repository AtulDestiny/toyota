"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Modal } from "./components/Modal";
import { Stepper } from "./components/Stepper";
import { DataForm } from "./components/DataForm";
import { ContactDetailsForm } from "./components/ContactDetailsForm";
import { VehicleForm } from "./components/VehicleForm";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  vinNumber: string;
}

// Tipos para los pasos y campos
type StepKey = "dataForm" | "contactDetailsForm" | "vehicleForm";
type Field =
  | "firstName"
  | "lastName"
  | "typeDocument"
  | "numberDocument"
  | "phone"
  | "email"
  | "contactType"
  | "dealershipType"
  | "message"
  | "termsAccepted"
  | "dataAuthorized";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;

const GRAPHQL_API_CITIES_QUERY = `
  query ListCities {
    listCities {
      items {
        id
        name
        externalId
      }
    }
  }
`;

const GRAPHQL_API_OFFICES_BY_CITY_QUERY = `
  query ListOfficesByCity($cityId: ID!) {
    listOffices(filter: { cityId: { eq: $cityId } }) {
      items {
        id
        idVitrina
        name
      }
    }
  }
`;

async function fetchCities() {
  const response = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: GRAPHQL_API_CITIES_QUERY,
    }),
  });
  const data = await response.json();
  return data?.data?.listCities?.items || [];
}

async function fetchOfficesByCity(cityId: string) {
  const response = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: GRAPHQL_API_OFFICES_BY_CITY_QUERY,
      variables: { cityId },
    }),
  });
  const data = await response.json();
  return data?.data?.listOffices?.items || [];
}

// Primero, actualiza la interfaz para incluir todos los campos necesarios
interface FormData {
  dataForm: {
    firstName: string;
    lastName: string;
    typeDocument: string;
    numberDocument: string;
    city: string;
    dealer: string;
  };
  contactDetailsForm: {
    phone: string;
    email: string;
  };
  vehicleForm: {
    message: string;
    termsAccepted: string;
    dataAuthorized: string;
  };
  vin?: string; // Agregamos el campo VIN
}

// Función para enviar los datos
const submitAppointmentData = async (formData: FormData, vin: string) => {
  const URL = "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/proxy?action=CampaniasApiV2";
  const TOKEN = "ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL";

  try {
    // Get city data to obtain externalId
    const cityResponse = await fetch(GRAPHQL_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": GRAPHQL_API_KEY!,
      },
      body: JSON.stringify({
        query: GRAPHQL_API_CITIES_QUERY,
      }),
    });
    const cityData = await cityResponse.json();
    const city = cityData?.data?.listCities?.items?.find(
      (c: any) => c.id === formData.dataForm.city
    );

    const body = {
      method: "insertarContacto",
      primerNombre: formData.dataForm.firstName,
      segundoNombre: "",
      primerApellido: formData.dataForm.lastName,
      SegundoApellido: "",
      documento: formData.dataForm.numberDocument,
      tipoDocumento: parseInt(formData.dataForm.typeDocument),
      correoElectronico: formData.contactDetailsForm.email,
      numeroCelular: formData.contactDetailsForm.phone.replace(/\D/g, ''),
      ciudadId: city?.externalId || formData.dataForm.city, // Use externalId from city
      direccion: "No especificada",
      autorizaUsoDatos: formData.vehicleForm.dataAuthorized === "true",
      sucursalId: formData.dataForm.dealer,
      vin: vin,
      preguntasComentarios: formData.vehicleForm.message,
      respuestaServicio: ""
    };

    console.log('Sending form data:', body);

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Server response:', errorData);
      throw new Error(errorData?.message || 'Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al enviar formulario:', error);
    throw error;
  }
};

export function AppointmentForm({ isOpen, onClose, vinNumber }: AppointmentFormProps) {
  const keyboard = useRef(null);
  const [focusedInput, setFocusedInput] = useState("");
  const [inputPattern, setInputPattern] = useState(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isValid, setIsValid] = useState({
    dataForm: false,
    contactDetailsForm: false,
    vehicleForm: false,
  });
  const [formData, setFormData] = useState({
    dataForm: {
      firstName: "",
      lastName: "",
      typeDocument: "",
      numberDocument: "",
      city: "",
      dealer: ""
    },
    contactDetailsForm: {
      phone: "",
      email: "",
    },
    vehicleForm: {
      message: "",
      termsAccepted: "",
      dataAuthorized: "",
    },
  });
  const router = useRouter();

  // Agregar estados para ciudad y concesionario
  const [selectedCity, setSelectedCity] = useState("");
  const [offices, setOffices] = useState<any[]>([]);

  // Agregar queries
  const { data: cities = [], isLoading: loadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
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
    if (field === "message") {
      pattern = /.*/; // Allow all characters for message
    }

    setInputPattern(pattern);
  }, [focusedInput]);

  // Memoized validation handlers to prevent infinite loops
  const handleDataFormValidation = useCallback((isValid: boolean) => {
    setIsValid(prev => ({ ...prev, dataForm: isValid }));
  }, []);

  const handleContactDetailsFormValidation = useCallback((isValid: boolean) => {
    setIsValid(prev => ({ ...prev, contactDetailsForm: isValid }));
  }, []);

  const handleVehicleFormValidation = useCallback((isValid: boolean) => {
    setIsValid(prev => ({ ...prev, vehicleForm: isValid }));
  }, []);

  // Efecto para cargar concesionarios cuando cambia la ciudad
  useEffect(() => {
    if (!selectedCity) {
      setOffices([]);
      return;
    }
    fetchOfficesByCity(selectedCity)
      .then((data) => setOffices(data))
      .catch(console.error);
  }, [selectedCity]);

  const documentTypes = [
    { value: "1", label: "Cédula de ciudadanía" },
    { value: "2", label: "NIT" },
    { value: "3", label: "Cédula de Extranjería" },
    { value: "4", label: "Pasaporte" },
  ];

  const steps = [
    {
      title: "Datos Personales",
      content: (
        <DataForm
          data={formData.dataForm}
          onChange={(data) => handleFormDataChange("dataForm", data)}
          onValidate={handleDataFormValidation}
          onFocus={(field) => setFocusedInput(`dataForm.${field}`)}
          cities={cities}
          loadingCities={loadingCities}
          selectedCity={selectedCity}
          onCityChange={(value: any) => setSelectedCity(value)}
          offices={offices}
          documentTypes={documentTypes}
        />
      ),
    },
    {
      title: "Datos de contacto",
      content: (
        <ContactDetailsForm
          data={formData.contactDetailsForm}
          onChange={(data) => handleFormDataChange("contactDetailsForm", data)}
          onValidate={handleContactDetailsFormValidation}
          onFocus={(field) => setFocusedInput(`contactDetailsForm.${field}`)}
        />
      ),
    },
    {
      title: "Mensaje",
      content: (
        <VehicleForm
          data={formData.vehicleForm}
          onChange={(data) => handleFormDataChange("vehicleForm", data)}
          onValidate={handleVehicleFormValidation}
          vin={vinNumber}
        />
      ),
    },
  ];

  // Actualizar el handleStepSendData
  const handleStepSendData = async () => {
    console.log("handleStepSendData called");
    console.log("Validation states:", {
      dataForm: isValid.dataForm,
      contactDetailsForm: isValid.contactDetailsForm,
      vehicleForm: isValid.vehicleForm
    });

    if (isValid.dataForm && isValid.contactDetailsForm && isValid.vehicleForm) {
      try {
        // Pasar el vinNumber que viene como prop
        const response = await submitAppointmentData(formData, vinNumber);
        console.log('Formulario enviado exitosamente:', response);
        setShowSuccessMessage(true);
        
        // Limpiar formulario
        setFormData({
          dataForm: {
            firstName: "",
            lastName: "",
            typeDocument: "",
            numberDocument: "",
            city: "",
            dealer: ""
          },
          contactDetailsForm: {
            phone: "",
            email: ""
          },
          vehicleForm: {
            message: "",
            termsAccepted: "",
            dataAuthorized: ""
          }
        });

        // Redireccionar después de un pequeño delay
        setTimeout(() => {
          router.push('/gracias');
        }, 2000);

      } catch (error) {
        console.error('Error al enviar formulario:', error);
        alert('Error al enviar el formulario. Por favor intente nuevamente.');
      }
    } else {
      console.log("Formulario inválido - no se puede enviar");
    }
  };

  const handleStepRedirect = () => onClose();

  const handleModalClose = () => {
    onClose();
    setShowSuccessMessage(false);
    setFocusedInput("");
    setFormData({
      dataForm: {
        firstName: "",
        lastName: "",
        typeDocument: "",
        numberDocument: "",
        city: "",
        dealer: ""
      },
      contactDetailsForm: {
        phone: "",
        email: ""
      },
      vehicleForm: {
        message: "",
        termsAccepted: "",
        dataAuthorized: ""
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        title="Agenda tu visita en tu concesionario TOYOTA autorizado"
        description="Agendar tu cita"
        hideHeader={showSuccessMessage}
        keyboardProps={{
          focusedInput,
          keyboard,
          handleInputChange,
          inputPattern,
        }}
      >
        {showSuccessMessage ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            textAlign: 'center',
            flexDirection: "column"
          }}>
            <h2 style={{
              fontSize: '16px',
              color: 'white',
              fontFamily: 'var(--font-ToyotaDisplay)',
              margin: 0
            }}>
              Datos enviados            </h2>   <h2 style={{
                fontSize: '56px',
                color: 'white',
                fontFamily: 'var(--font-ToyotaDisplay)',
                margin: 0
              }}>
              Gracias por diligenciar tus datos
            </h2>
            <h2 style={{
              fontSize: '18px',
              color: 'white',
              marginTop: "10px",

              fontFamily: 'var(--font-ToyotaDisplay)',
              margin: 0
            }}>
              Apreciamos tu tiempo y esfuerzo en brindarnos <br />
              la información necesaria  para poderte contactar            </h2>
            <h2 style={{
              fontSize: '18px',
              color: 'white',
              fontWeight: "700",
              marginTop: "20px",
              fontFamily: 'var(--font-ToyotaDisplay)',
              margin: 0
            }}>
              Gracias por diligenciar tus datos
            </h2>
          </div>
        ) : (
          <Stepper
            steps={steps}
            onStepChange={(e) => {
              if (e === 2) setFocusedInput("");
            }}
            onStepSendData={handleStepSendData}
            onStepRedirect={handleStepRedirect}
            isStepValid={[
              isValid.dataForm,
              isValid.contactDetailsForm,
              isValid.vehicleForm,
            ]}
          />
        )}
      </Modal>
    </>
  );
}
