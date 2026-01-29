"use client";

import React, { useEffect, useRef } from "react";
import renderComponent from "@/utils/renderComponent";
import { QuoteForm } from "@/components/QuoteForm/QuoteForm";
import { ChatContact } from "@/components/ChatContact/ChatContact";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import './page.css';

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;
const URL = "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/proxy?action=FormulariosToyota";
const TOKEN = "ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL";

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

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Define form data interface
interface ContactFormData {
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  correo: string;
  celular: string;
  ciudad: string;
  direccion: string;
  fijo?: string;
  mensaje: string;
  terminos: boolean;
  tratamientoDatos: boolean;
}

// Document type options (actualizados con los valores solicitados)
const documentTypeOptions = [
  { value: "1", label: "Cédula de ciudadanía" },
  { value: "2", label: "NIT" },
  { value: "3", label: "Cédula de Extranjería" },
  { value: "4", label: "Pasaporte" },
];

// Form fields configuration
const formFieldsBase: any = [
  {
    id: "nombre",
    type: "text",
    label: "*Nombre",
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
    id: "tipoDocumento",
    type: "select",
    label: "Tipo de documento",
    placeholder: "Tipo de documento",
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
    id: "ciudad",
    type: "select",
    label: "Ciudad",
    placeholder: "Ciudad",
    required: true,
  },
  {
    id: "direccion",
    type: "text",
    label: "Dirección",
    placeholder: "Dirección",
    required: true,
  },
  // {
  //   id: "fijo",
  //   type: "tel",
  //   label: "Fijo",
  //   placeholder: "",
  //   required: false,
  // },
  {
    id: "mensaje",
    type: "textarea",
    label: "Escribe tu Mensaje",
    placeholder: "",
    required: true,
    rows: 5,
  },
  // {
  //   id: "terminos",
  //   type: "checkbox",
  //   label: "Acepto los Términos y condiciones",
  //   required: true,
  //   link: "/terminos-y-condiciones",
  //   linkText: "Términos y condiciones",
  // },
  {
    id: "tratamientoDatos",
    type: "checkbox",
    label: "Autorizo el Tratamiento de mis datos",
    required: true,
    link: "/legales",
    linkText: "Tratamiento de mis datos",
  },
];

async function fetchCities(): Promise<{ id: string; name: string }[]> {
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

// Datos para la página de Contacto
const pageData: ComponentData[] = [
  {
    component: "MainSlider",
    props: {
      slides: [
        {
          imageDesktop: "/images/contact-banner-desk.png",
          imageMobile: "/images/contact-banner-mob.png",
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
        text: "En Automotores Toyota Colombia la atención al cliente es una prioridad.",
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
        text: "Contáctanos por medio de cualquiera de los siguientes medios y con gusto te atenderemos.",
        fontSize: { base: "22px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "400",
        maxWidth: {
          xl: "100%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "left", xl: "center" },
        padding: { base: "22px 16px 43px 15px", xl: "43px 0px 73px 58px" },
      },
    },
  },
  {
    component: "ContactInfo",
  },
];

// Create a custom component to combine ToyotaWorld with the form
const ContactTabbedForm: React.FC = () => {
  const router = useRouter();
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Obtener ciudades con TanStack Query
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  useEffect(() => {
    const dynamicFields = formFieldsBase.map((field: any) =>
      field.id === "ciudad"
        ? {
            ...field,
            options: (cities || []).map((city: any) => ({
              value: city.externalId, // Usar externalId como value
              label: city.name,
            })),
          }
        : field
    );

    const applyInputStyles = () => {
      const formInputs = document.querySelectorAll(
        "#contacto-form-container input, #contacto-form-container select, #contacto-form-container textarea"
      );
      formInputs.forEach((input: any) => {
        input.style.backgroundColor = "#fff";
        input.style.border = "none";
        input.style.borderRadius = "20px";
        input.style.padding = "10px 23px";
      });
    };

    applyInputStyles();
    setTimeout(applyInputStyles, 1000);

    const observer = new MutationObserver(applyInputStyles);
    const formContainer = document.getElementById("contacto-form-container");

    if (formContainer) {
      observer.observe(formContainer, {
        childList: true,
        subtree: true,
      });
    }

    if (formContainerRef.current) {
      const formContainer = formContainerRef.current;
      formContainer.innerHTML = "";

      const formDiv = document.createElement("div");
      formDiv.id = "contacto-form-container";
      formContainer.appendChild(formDiv);

      const formRoot = document.getElementById("contacto-form-container");
      if (formRoot) {
        const form = React.createElement(QuoteForm, {
          title: "",
          fields: dynamicFields,
          layout: "grid",
          gridColumns: { base: 1, medium: 2 },
          containerStyle: {
            maxWidth: "1000px",
            margin: "1rem auto",
            padding: "1rem",
            backgroundColor: "#f8f8f8",
            borderRadius: "0",
          },
          submitButtonText: "Enviar",
          onSubmit: async (formData: any) => {
            try {
              const body = {
                method: "insertarContacto",
                cliente: {
                  primerNombre: formData.nombre,
                  segundoNombre: "",
                  primerApellido: formData.apellido,
                  tipoDocumento: formData.tipoDocumento,
                  documentoIdentidad: formData.numeroDocumento,
                  ciudadId: formData.ciudad,
                  direccion: formData.direccion,
                  numeroContacto: formData.celular,
                  numeroContactoDos: formData.fijo || "",
                  correoElectronico: formData.correo,
                  autorizaDatos: formData.tratamientoDatos,
                },
                mensaje: formData.mensaje,
              };

              await axios.post(URL, body, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${TOKEN}`,
                },
              });
              
              // Replace alert with redirect
              router.push('/gracias');
            } catch (error) {
              alert("Error al enviar el formulario");
              console.error(error);
            }
          },
        });

        import("react-dom/client")
          .then((ReactDOM) => {
            const root = ReactDOM.createRoot(formRoot);
            root.render(form);
          })
          .catch((err) => {
            console.error("Error rendering form:", err);
          });
      }
    }
    return () => {
      observer.disconnect();
    };
  }, [cities]);

  return (
    <div className="contacto-wordls-tabs">
      {renderComponent({
        component: "ToyotaWorld",
        props: {
          showTitle: false,
          mainTitle: "Contáctanos",
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
              label: "Formulario",
              value: "contacto-form",
              content: (
                <div
                  ref={formContainerRef}
                  id="form-mount-point"
                  style={{ width: "100%" }}
                ></div>
              ),
              sections: [
                {
                  titleStyle: {
                    fontSize: "26px",
                    fontWeight: 700,
                    marginBottom: "1rem",
                  },
                  descriptionStyle: {
                    fontSize: "16px",
                    fontWeight: 400,
                    marginBottom: "1.5rem",
                  },
                  padding: "0 1rem",
                },
              ],
            },
            // {
            //   label: "Contacto",
            //   value: "info-contacto",
            //   content: (
            //     <ChatContact
            //       title="Toyota Colombia"
            //       subtitle=" "
            //       description=" "
            //       logoSrc="/images/tlogo.svg"
            //       chatButtonText="Ir al chat"
            //       whatsappText="¿Aún no tienes WhatsApp?"
            //       whatsappLinkText="Descargar"
            //       containerStyle={{
            //         padding: { base: "2rem 1rem", xl: "58px 2rem" },
            //         backgroundColor: "#ffffff",
            //         borderRadius: "0",
            //         maxWidth: "800px",
            //         margin: "0 auto",
            //       }}
            //       titleStyle={{
            //         fontSize: { base: "26px", xl: "26px" },
            //         fontWeight: "700",
            //         fontFamily: "var(--font-ToyotaType-Regular)",
            //         marginBottom: "0.5rem",
            //         textAlign: "center",
            //       }}
            //       chatButtonStyle={{
            //         backgroundColor: "#118C7E",
            //         color: "#FFFFFF",
            //         fontFamily: "var(--font-roboto)",
            //         fontWeight: "500",
            //         fontSize: "14px",
            //         lineHeight: "20px",
            //         letterSpacing: "0.1px",
            //         width: "330px",
            //         height: "50px",
            //         borderRadius: "full",
            //         padding: "0",
            //         display: "flex",
            //         alignItems: "center",
            //         justifyContent: "center",
            //       }}
            //       onChatClick={() => {
            //         console.log("Chat button clicked");
            //         // Add your chat functionality here
            //       }}
            //       onWhatsappClick={() => {
            //         window.open("https://www.whatsapp.com/download", "_blank");
            //       }}
            //     />
            //   ),
            // },
          ],
          defaultValue: "contacto-form",
          showFooter: false,
        },
      })}
    </div>
  );
};

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
      <option value="">Seleccione una ciudad</option>
      {cities?.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  );
}

async function sendContactoForm() {
  const body = {
    method: "insertarContacto",
    cliente: {
      primerNombre: "Jhonatan",
      segundoNombre: "",
      primerApellido: "Ocampo",
      tipoDocumento: "1",
      documentoIdentidad: "1053123456",
      ciudadId: "a9c35f4c-6db8-4de6-a5bb-0ba3daf0d4f1",
      direccion: "Calle Falsa 123",
      numeroContacto: "3146776079",
      numeroContactoDos: "",
      correoElectronico: "jhonatanocampo@destiny.ws",
      autorizaDatos: true,
    },
    mensaje: "Me gustaría recibir más información sobre el servicio",
  };

  const response = await axios.post(URL, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
}

export default function ContactoPage() {
  useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  return (
    <div>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
      <ContactTabbedForm />
    </div>
  );
}
