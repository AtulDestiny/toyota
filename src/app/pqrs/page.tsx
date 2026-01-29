// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import renderComponent from "@/utils/renderComponent";
import { QuoteForm } from "@/components/QuoteForm/QuoteForm";
import { ChatContact } from "@/components/ChatContact/ChatContact";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import './page.css';

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Define interface for form data
interface PQRFormData {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  tipoDocumento: string;
  numeroDocumento: string;
  ciudad: string;
  concesionario: string;
  tipoVehiculo: string;
  anoModelo: string;
  placa: string;
  vin?: string; // Optional field
  kilometraje: string;
  mensaje: string;
  terminos: boolean;
  tratamientoDatos: boolean;
}

// Document type options
const documentTypeOptions = [
  { value: "1", label: "Cédula de ciudadanía" },
  { value: "2", label: "NIT" },
  { value: "3", label: "Cédula de Extranjería" },
  { value: "4", label: "Pasaporte" },
];

// GraphQL queries
const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;

const GRAPHQL_API_CITIES_QUERY = `
  query GetCitiesSortedByNameAsc {
  listAllCitiesSortedByName(
    allCitiesPartition: "GLOBAL_CITY_LIST", 
    sortDirection: ASC 
  ) {
    items {
      id
      name
      externalId
      active 
      allCitiesPartition
    }
    nextToken
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
        address
        phone
        email
        website
      }
    }
  }
`;

const GRAPHQL_API_MODELS_QUERY = `
  query ListModels {
    listModels {
      items {
        id
        name
        idSublinea
        modelsByYear {
          items {
            id
            name
          }
        }
        vehicle {
          name
          idRunt
        }
      }
    }
  }
`;

// NUEVA QUERY PARA VEHÍCULOS
const GRAPHQL_API_VEHICLES_QUERY = `
  query ListVehicles {
    listVehicles {
      items {
        id
        name
        idRunt
      }
    }
  }
`;

// Fetch all cities
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
  return data?.data?.listAllCitiesSortedByName?.items || [];
}

// Fetch offices by cityId
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

// Update the fetchModels function to filter models with idRunt
async function fetchModels() {
  const response = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: GRAPHQL_API_MODELS_QUERY,
    }),
  });
  const data = await response.json();
  // Filter models with idRunt here instead of in the query
  return (data?.data?.listModels?.items || []).filter((model: any) => model?.vehicle?.idRunt !== null);
}

// FUNCIÓN PARA OBTENER VEHÍCULOS
async function fetchVehicles() {
  const response = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: GRAPHQL_API_VEHICLES_QUERY,
    }),
  });
  const data = await response.json();
  // NO filtrar por idRunt, usar todos los vehículos
  return data?.data?.listVehicles?.items || [];
}

// Model year options
const modelYearOptions = [
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "older", label: "2019 o anterior" },
];

// Dynamic form fields (city and concessionaire will be injected)
const formFieldsBase = [
  {
    id: "nombre",
    type: "text",
    label: "Nombre",
    placeholder: "Nombre",
    required: true,
  },
  {
    id: "apellido",
    type: "text",
    label: "Apellido",
    placeholder: "Apellido",
    required: true,
  },
  {
    id: "correo",
    type: "email",
    label: "Correo electrónico",
    placeholder: "Correo electrónico",
    required: true,
  },
  {
    id: "celular",
    type: "tel",
    label: "Celular",
    placeholder: "Celular",
    required: true,
    countryCode: "+57",
  },
  {
    id: "tipoDocumento",
    type: "select",
    label: "Tipo de documento",
    placeholder: "Seleccione un tipo de documento",
    required: true,
    options: documentTypeOptions,
  },
  {
    id: "numeroDocumento",
    type: "text",
    label: "Número de documento",
    placeholder: "Número de documento",
    required: true,
  },
  // city (dynamic)
  // concesionario (dynamic)
  {
    id: "fijo",
    type: "text",
    label: "Teléfono fijo",
    placeholder: "Teléfono fijo",
    required: false,
  },
  {
    id: "anoModelo",
    type: "select",
    label: "Año modelo",
    placeholder: "Seleccione año",
    required: false,
    options: modelYearOptions,
  },
  {
    id: "placa",
    type: "text",
    label: "Placa",
    placeholder: "",
    required: true,
  },
  {
    id: "vin",
    type: "text",
    label: "VIN",
    placeholder: "",
    required: false,
  },
  {
    id: "kilometraje",
    type: "text",
    label: "Kilometraje",
    placeholder: "",
    required: true,
  },
  {
    id: "mensaje",
    type: "textarea",
    label: "Escribe tu Mensaje",
    placeholder: "",
    required: true,
    rows: 5,
  },
  {
    id: "terminos",
    type: "checkbox",
    label: "Acepto los Términos y condiciones",
    required: true,
    link: "/terminos-y-condiciones",
    linkText: "Términos y condiciones",
  },
  {
    id: "tratamientoDatos",
    type: "checkbox",
    label: "Autorizo el Tratamiento de mis datos",
    required: true,
    link: "/tratamiento-de-datos",
    linkText: "Tratamiento de mis datos",
  },
];

// Datos para la página de PQRs
const pageData: ComponentData[] = [
  {
    component: "MainSlider",
    props: {
      slides: [
        {
          imageMobile: "/images/md.png",
        },
      ],
      sliderConfig: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        isButton: false,
        autoplay: false,
        pagination: {
          clickable: true,
        },
        navigation: false,
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "PREGUNTAS, QUEJAS O RECLAMOS",
        fontSize: { base: "16px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: { base: "700", xl: "700" },
        lineHeight: "100%",
        textAlign: "left",
        padding: { base: "63px 15px 0px", xl: "114px 0 0" },
        letterSpacing: "-1.12px",
      },
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "De conformidad con lo establecido por la Supertintendencia de Industria y Comercio ponemos a tu disposición el siguiente mecanismo para la recepción y trámite de las peticiones, quejas o reclamos (PQR) de nuestros clientes.",
        fontSize: { base: "22px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "400",
        maxWidth: {
          xl: "100%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "22px 16px 43px 15px", xl: "43px 80px 73px 80px" },
      },
    },
  },
  {
    component: "ContactInfo",
  },
];

// CityDropdown component for custom rendering
function CityDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const { data: cities, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  if (isLoading) return <select disabled><option>Cargando...</option></select>;

  return (
    <select value={value} onChange={onChange}>
      {cities?.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  );
}

// First add the necessary imports and constants
const URL = "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/proxy?action=FormulariosToyota";
const TOKEN = "ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL";

// Add the mutation function
const submitPQRForm = async (formData: PQRFormData) => {
  try {
    const selectedCity = formData.ciudad;
    // Find the city to get externalId
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
    const city = cityData?.data?.listAllCitiesSortedByName?.items?.find(
      (c: any) => c.id === selectedCity
    );

    const body = {
      method: "insertarPQR",
      cliente: {
        primerNombre: formData.nombre,
        primerApellido: formData.apellido,
        tipoDocumento: formData.tipoDocumento,
        documentoIdentidad: formData.numeroDocumento,
        ciudadId: city?.externalId || selectedCity,
        numeroContacto: formData.celular.replace(/\D/g, ''), // Remove non-digits
        numeroContactoDos: formData.fijo || "", // Teléfono fijo
        correoElectronico: formData.correo,
        autorizaDatos: formData.tratamientoDatos
      },
      ciudadConcesionario: city?.externalId || selectedCity,
      idConcesionario: formData.concesionario,
      modelo: formData.anoModelo || "2024", // Año modelo
      idRunt: formData.tipoVehiculo,
      nombreLinea: formData.tipoVehiculo,
      placa: formData.placa?.toUpperCase?.() || "",
      vin: formData.vin || "",
      kilometraje: parseInt(formData.kilometraje, 10) || 0,
      mensaje: formData.mensaje
    };

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
      throw new Error(errorData?.message || 'Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

// Create a custom component to combine ToyotaWorld with the form
const PQRSTabbedForm: React.FC = () => {
  const router = useRouter();

  // Add form values state
  const [formValues, setFormValues] = React.useState<PQRFormData>({} as PQRFormData);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Offices state and loading
  const [offices, setOffices] = React.useState<any[]>([]);
  const [loadingOffices, setLoadingOffices] = React.useState(false);

  // Add models query
  const { data: models = [], isLoading: loadingModels } = useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
  });

  // OBTENER VEHÍCULOS CON REACT-QUERY
  const { data: vehicles = [], isLoading: loadingVehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });

  // Get cities with react-query
  const { data: cities = [], isLoading: loadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  // Fetch offices when selectedCity changes
  useEffect(() => {
    if (!formValues.ciudad) {
      setOffices([]);
      return;
    }
    setLoadingOffices(true);
    fetchOfficesByCity(formValues.ciudad)
      .then((data) => setOffices(data))
      .finally(() => setLoadingOffices(false));
  }, [formValues.ciudad]);

  // Add mutation hook before the useEffect
  const mutation = useMutation({
    mutationFn: async (formData: PQRFormData) => {
      // Get city data
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
      const city = cityData?.data?.listAllCitiesSortedByName?.items?.find(
        (c: any) => c.id === formData.ciudad
      );

      // Get selected model
      const selectedModel = models.find((m: any) => m?.vehicle?.idRunt === formData.tipoVehiculo);

      // Busca el vehículo seleccionado por id
      const selectedVehicle = vehicles.find((v: any) => v.id === formData.tipoVehiculo);

      const body = {
        method: "insertarPQR",
        cliente: {
          primerNombre: formData.nombre,
          primerApellido: formData.apellido,
          tipoDocumento: formData.tipoDocumento,
          documentoIdentidad: formData.numeroDocumento,
          ciudadId: city?.externalId || formData.ciudad,
          numeroContacto: formData.celular.replace(/\D/g, ''),
          numeroContactoDos: formData.fijo || "",
          correoElectronico: formData.correo,
          autorizaDatos: formData.tratamientoDatos
        },
        ciudadConcesionario: city?.externalId || formData.ciudad,
        idConcesionario: parseInt(formData.concesionario),
        modelo: formData.anoModelo || "2024",
        idRunt: selectedVehicle?.idRunt || "",
        nombreLinea: selectedVehicle?.name || "",
        placa: formData.placa.toUpperCase(),
        vin: formData.vin || "",
        kilometraje: parseInt(formData.kilometraje, 10) || 0,
        mensaje: formData.mensaje
      };

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
        throw new Error(errorData?.message || 'Network response was not ok');
      }

      const responseData = await response.json();
      return responseData;
    },
    onSuccess: (data) => {
      router.push('/gracias');
    },
    onError: (error: any) => {
    }
  });

  // Separa la construcción de los campos dinámicos fuera del efecto
  const getDynamicFields = () => {
    const vehicleTypeOptions = loadingVehicles
      ? [{ value: "", label: "Cargando..." }]
      : vehicles.map((vehicle: any) => ({
        value: vehicle.id,
        label: vehicle.name,
      }));

    return [
      // nombre, apellido, correo, celular
      ...formFieldsBase.slice(0, 4),
      // Dropdown Año modelo después de celular
      {
        id: "anoModelo",
        type: "select",
        label: "Año modelo",
        placeholder: "Seleccione año",
        required: false,
        value: formValues.anoModelo,
        options: modelYearOptions,
      },
      // Input Teléfono fijo después de año modelo
      {
        id: "fijo",
        type: "text",
        label: "Teléfono fijo",
        placeholder: "Teléfono fijo",
        required: false,
        value: formValues.fijo,
      },
      // tipoDocumento, numeroDocumento
      ...formFieldsBase.slice(4, 6),
      // ciudad
      {
        id: "ciudad",
        type: "select",
        label: "Ciudad",
        required: true,
        placeholder: "Seleccione una ciudad",
        value: formValues.ciudad,
        options: [
          ...(loadingCities
            ? [{ value: "", label: "Cargando..." }]
            : cities.map((city: any) => ({
              value: city.id,
              label: city.name,
            }))
          )
        ],
        onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
          const value = event.target.value;
          setFormValues(prev => ({
            ...prev,
            ciudad: value,
            concesionario: ''
          }));
        }
      },
      // concesionario
      {
        id: "concesionario",
        type: "select",
        label: "Concesionario",
        placeholder: "Seleccione un concesionario",
        required: true,
        value: formValues.concesionario,
        options: loadingOffices
          ? [{ value: "", label: "Cargando..." }]
          : offices.map((office: any) => ({
            value: office.idVitrina,
            label: office.name
          })),
        disabled: !formValues.ciudad
      },
      // tipoVehiculo
      {
        id: "tipoVehiculo",
        type: "select",
        label: "Tipo de Vehículo (línea)",
        placeholder: "Seleccione un vehículo",
        required: true,
        value: formValues.tipoVehiculo,
        options: vehicleTypeOptions,
        disabled: loadingVehicles
      },
      // placa, vin, kilometraje, mensaje, terminos, tratamientoDatos
      ...formFieldsBase.slice(8),
    ];
  };

  useEffect(() => {
    const applyInputStyles = () => {
      const formInputs = document.querySelectorAll(
        "#pqr-form-container input, #pqr-form-container select, #pqr-form-container textarea"
      );
      formInputs.forEach((input) => {
        input.style.backgroundColor = "#fff";
        input.style.border = "none";
        input.style.borderRadius = "20px";
        input.style.padding = "10px 23px";
      });
    };

    if (formContainerRef.current) {
      const formContainer = formContainerRef.current;
      formContainer.innerHTML = "";

      const formDiv = document.createElement("div");
      formDiv.id = "pqr-form-container";
      formContainer.appendChild(formDiv);

      const formRoot = document.getElementById("pqr-form-container");
      if (formRoot) {
        const form = React.createElement(QuoteForm, {
          title: "Ingresa tus datos para tramitar tu PQR",
          fields: getDynamicFields(),
          layout: "grid",
          gridColumns: { base: 1, medium: 2 },
          containerStyle: {
            maxWidth: "1000px",
            margin: "0 auto 3rem",
            backgroundColor: "#f8f8f8",
          },
          submitButtonText: "Enviar",
          loading: mutation.isPending,
          initialValues: formValues,
          onSubmit: (formData: PQRFormData) => {
            mutation.mutate(formData);
          },
          successMessage: "Tu PQR ha sido enviada exitosamente",
          errorMessage: "Hubo un error al enviar tu PQR. Por favor intenta nuevamente.",
          onFieldChange: (id: string, value: any) => {
            if (["nombre", "apellido"].includes(id)) {
              const cleanValue = value.replace(/[^a-zA-ZÁÉÍÓÚáéíóúÑñ\s]/g, "");
              setFormValues(prev => ({ ...prev, [id]: cleanValue }));
              return;
            }

            if (id === "correo") {
              setFormValues(prev => ({ ...prev, [id]: value }));
              return;
            }

            if (["celular", "numeroDocumento"].includes(id)) {
              const numericValue = value.replace(/\D/g, "");
              setFormValues(prev => ({ ...prev, [id]: numericValue }));
              return;
            }

            // Default: allow all other fields to update normally
            setFormValues(prev => ({ ...prev, [id]: value }));
          }

        });

        import("react-dom/client")
          .then((ReactDOM) => {
            const root = ReactDOM.createRoot(formRoot);
            root.render(form);
          })
          .catch((err) => {
          });
      }

      applyInputStyles();
      const observer = new MutationObserver(applyInputStyles);
      observer.observe(formContainer, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [cities, loadingCities, offices, loadingOffices, formValues.ciudad, loadingModels]); // Update dependencies

  return (
    <div className="pqrs-worlds-tabs">
      {renderComponent({
        component: "ToyotaWorld",
        props: {
          showTitle: false,
          mainTitle: "Peticiones, Quejas o Reclamos",
          mainSubtitle: "Toyota Colombia",
          mainTitleStyle: {
            fontSize: "xxxxl",
            lineHeight: "110%",
            paddingBottom: "3rem",
            fontWeight: 500,
            letterSpacing: "-1%",
          },
          mainSubtitleStyle: {
            fontSize: { base: "md", xl: "lg" },
            fontWeight: 400,
            marginBottom: "0.5rem",
          },
          containerStyle: {
            margin: { base: "40px 20px 60px", xl: "80px 0 100px" },
          },
          items: [
            {
              label: "Formulario PQR",
              value: "pqr-form",
              content: (
                <div
                  ref={formContainerRef}
                  id="form-mount-point"
                  style={{ width: "100%" }}
                ></div>
              ),
            },
            {
              label: "Información Adicional",
              value: "info-adicional",
              content: (
                <ChatContact
                  title="Toyota Colombia"
                  subtitle=" "
                  description=" "
                  logoSrc="/images/tlogo.svg"
                  chatButtonText="Chatear ahora"
                  whatsappText="¿Aún no tienes WhatsApp?"
                  whatsappLinkText="Descargar"
                  containerStyle={{
                    padding: { base: "2rem 1rem", xl: "3rem 2rem" },
                    backgroundColor: "#f8f8f8",
                    borderRadius: "0",
                    maxWidth: "800px",
                    margin: "0 auto",
                  }}
                  titleStyle={{
                    fontSize: { base: "26px", xl: "32px" },
                    fontWeight: "700",
                    fontFamily: "var(--font-toyotaDisplay)",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                  chatButtonStyle={{
                    backgroundColor: "#4D8B76",
                    color: "white",
                    fontWeight: "500",
                    fontSize: { base: "16px", xl: "18px" },
                    paddingX: "3rem",
                    paddingY: "0.75rem",
                    borderRadius: "full",
                    width: { base: "80%", xl: "auto" },
                    maxWidth: "300px",
                  }}
                  onChatClick={() => {
                    console.log("PQR Chat button clicked");
                  }}
                  onWhatsappClick={() => {
                    window.open("https://www.whatsapp.com/download", "_blank");
                  }}
                />
              ),
            },
          ],
          defaultValue: "pqr-form",
          showFooter: false,
        },
      })}
    </div>
  );
};

export default function PQRSPage() {
  return (
    <div>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
      <PQRSTabbedForm />
    </div>
  );
}
