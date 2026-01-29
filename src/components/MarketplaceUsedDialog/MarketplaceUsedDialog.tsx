"use client";

import {
  Button as AmplifyButton,
  CheckboxField,
  Divider,
  Flex,
  Grid,
  Image,
  Input,
  Label,
  Link,
  SelectField,
  Tabs,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useMemo, useState } from "react";
import styles from "./MarketplaceUsedDialog.module.css";
import Button from "@/components/Layout/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

type TabsType = "Formulario" | "Contacto";

interface CustomInputProps {
  label: string;
  placeholder: string;
  id: string;
  disabled?: boolean;
  value: string;
  isPhone?: boolean;
  countryCode?: string;
  flagSrc?: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
// Document type options (actualizados con los valores solicitados)
const documentTypeOptions = [
  { value: "", label: "Selecciona tipo de documento" },
  { value: "1", label: "Cédula de ciudadanía" },
  { value: "2", label: "NIT" },
  { value: "3", label: "Cédula de Extranjería" },
  { value: "4", label: "Pasaporte" },
];
interface CustomSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | { label: string; value: string }[];
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
}

const defaultDealers = [
  { label: "Distoyota Calle 102", value: "Distoyota Calle 102" },
  { label: "Distoyota Calle 13", value: "Distoyota Calle 13" },
  { label: "Carco SA", value: "Carco SA" },
];
export const CustomSelect = ({
  label,
  id,
  value,
  onChange,
  options,
  disabled = false,
  loading = false,
  placeholder = "Selecciona",
}: CustomSelectProps) => {
  // Normalize options to { label, value }
  const normalizedOptions =
    typeof options[0] === "string"
      ? (options as string[])
        .filter((opt) => !opt.toLowerCase().startsWith("selecciona"))
        .map((opt) => ({
          label: opt,
          value: opt,
        }))
      : (options as { label: string; value: string }[]).filter(
        (opt) => !opt.label.toLowerCase().startsWith("selecciona")
      );

  const selectMaxWidth = useBreakpointValue({
    base: "",
    small: "",
    large: "100%",
  }) as string;
  return (
    <Flex direction="column" gap="8px">
      <Label
        htmlFor={id}
        color="#58595B"
        fontSize={{ base: "14px", xl: "18px" }}
        fontFamily={{
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        }}
        lineHeight="100%"
        letterSpacing="0px"
      >
        {label}
      </Label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          backgroundColor: "#fff",
          borderRadius: "80px",
          border: "none",
          padding: "10px 23px",
          color: "#58595B",
          fontSize: "14px",
          fontFamily: "var(--font-ToyotaType-Regular)",
          minHeight: "40px",
          width: "99%",
          maxWidth: selectMaxWidth,
        }}
      >
        {loading ? (
          <option disabled>Cargando...</option>
        ) : (
          <>
            <option value="">{placeholder}</option>
            {normalizedOptions.map((opt, idx) => (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </>
        )}
      </select>
    </Flex>
  );
};

const CustomInput = ({
  label,
  placeholder,
  id,
  disabled = false,
  value,
  isPhone = false,
  countryCode = "+57",
  flagSrc = "/svgs/Col_flag.svg",
  onChange,
  errorMessage,
}: CustomInputProps) => {
  return (
    <Flex direction="column" gap={{ base: "8px", xl: "8px" }}>
      <Label
        htmlFor={id}
        color="#58595B"
        fontSize={{ base: "14px", xl: "18x", xxl: "18px" }}
        fontFamily={{
          base: "var(--font-toyotaDisplay)",
          xl: "var(--font-ToyotaType-Regular)",
        }}
        lineHeight={{ base: "140%", xl: "100%" }}
        letterSpacing={{ base: "0px", xl: "0px" }}
        style={{ verticalAlign: "middle" }}
      >
        {label}
      </Label>

      {isPhone ? (
        <Flex
          backgroundColor="#F8F8F8"
          borderRadius="80px"
          overflow="hidden"
          alignItems="center"
          padding="4px 8px"
          gap="8px"
          width="100%"
        >
          {/* Flag + Code */}
          <Flex
            alignItems="center"
            backgroundColor="white"
            borderRadius="40px"
            padding="6px 12px"
            gap="6px"
          >
            <Image src={flagSrc} alt="flag" width="20px" height="14px" />
            <Text
              fontSize="14px"
              color="#58595B"
              fontFamily={{
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-ToyotaType-Regular)",
              }}
              lineHeight={{ base: "140%", xl: "100%" }}
              letterSpacing={{ base: "0px", xl: "0px" }}
              style={{ verticalAlign: "middle" }}
            >
              {countryCode}
            </Text>
          </Flex>

          {/* Input field */}
          <Input
            id={id}
            name={id}
            placeholder={placeholder}
            backgroundColor="white"
            borderRadius="40px"
            border="none"
            color="#58595B"
            disabled={disabled}
            fontSize="14px"
            fontFamily="var(--font-ToyotaType-Regular)"
            padding="10px 16px"
            value={value}
            onChange={onChange}
            width="100%"
            flex="1"
          />
        </Flex>
      ) : (
        <Input
          backgroundColor={"#fff"}
          borderRadius={"80px"}
          border="none"
          id={id}
          name={id}
          placeholder={placeholder}
          disabled={disabled}
          color="#58595B"
          fontSize={{ base: "12px", xl: "14px" }}
          fontFamily={{
            base: "var(--font-ToyotaType-Regular)",
            xl: "var(--font-toyotaDisplay)",
          }}
          letterSpacing={{ base: "0px", xl: "0px" }}
          padding={{ base: "10px 23px", xl: "10px 23px" }}
          lineHeight={{ base: "100%", xl: "140%" }}
          value={value}
          minWidth={{
            base: "311px",
            medium: "auto",
            large: "80%",
            xl: "425px",
          }}
          minHeight={{ base: "40px", xl: "40px" }}
          onChange={onChange}
        />
      )}

      {/*  Error message if any */}
      {errorMessage && (
        <Text color="red" fontSize="12px" marginTop="4px">
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
};

interface MarketplaceUsedDialogProps {
  product?: {
    name: string;
    id: string;
  };
  isOpen: boolean;
  advisorPhone?: string;
  onToggle: () => void;
  version?: any;
}

async function fetchCities() {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: `
        query ListCities {
          listCities {
            items {
              id
              name
              externalId
            }
          }
        }
      `,
    }),
  });
  const data = await response.json();
  return data?.data?.listCities?.items || [];
}

async function fetchOfficesByCity(cityId: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: `
        query ListOfficesByCity($cityId: ID!) {
          listOffices(filter: { cityId: { eq: $cityId } }) {
            items {
              id
              idVitrina
              name
            }
          }
        }
      `,
      variables: { cityId },
    }),
  });
  const data = await response.json();
  return data?.data?.listOffices?.items || [];
}

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  tipoDocumento: string;
  numeroDocumento: string;
  celular: string;
  terminos: boolean;
  tratamientoDatos: boolean;
}

function MarketplaceUsedDialog({
  isOpen,
  product,
  onToggle,
  advisorPhone,
  version
}: MarketplaceUsedDialogProps): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const fullUrl = window.location.href;

  const [tab, setTab] = useState<TabsType>("Contacto");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [dealer, setDealer] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataAccepted, setDataAccepted] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [formValues, setFormValues] = useState<FormData>({
    nombre: "",
    apellido: "",
    email: "",
    tipoDocumento: "",
    numeroDocumento: "",
    celular: "",
    terminos: false,
    tratamientoDatos: false,
  });
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMobile(phone);
  }, [phone]);
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  function toggle(): void {
    onToggle();
  }

  useEffect(() => {
    if (version?.dealership) {
      const cityId = version.dealership.city?.id;
      const dealerIdVitrina = version.dealership.idVitrina;

      if (cityId) {
        setSelectedCity(cityId);
      }

      if (dealerIdVitrina) {
        setDealer(dealerIdVitrina);

        // Persist for mutation usage (same logic you already have)
        localStorage.setItem(
          "toyota_dealer_selection",
          JSON.stringify({
            name: version.dealership.name,
            idVitrina: dealerIdVitrina,
          })
        );
      }
    }
  }, [version]);

  // Add React Query hooks
  const { data: cities = [], isLoading: loadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  const selectedCityLabel = useMemo(() => {
    const match = cities.find((c: any) => c.id === selectedCity);
    return match?.name || selectedCity || "Bogotá";
  }, [selectedCity, cities]);

  const { data: offices = [], isLoading: loadingOffices } = useQuery({
    queryKey: ["offices", selectedCity],
    queryFn: () => fetchOfficesByCity(selectedCity),
    enabled: !!selectedCity,
  });

  const selectedDealerLabel = useMemo(() => {
    if (loadingOffices) return "Cargando concesionarios...";

    const matched = offices.find(
      (d: any) => String(d.idVitrina) === String(dealer)
    );

    return matched?.name || dealer;
  }, [dealer, offices, loadingOffices]);

  // Add mutation
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const stored = localStorage.getItem("toyota_dealer_selection");
      if (!stored) throw new Error("Por favor selecciona un concesionario");

      const selection = JSON.parse(stored);
      return submitLead(formData, selection);
    },
    onSuccess: () => {
      setFormValues({
        nombre: "",
        apellido: "",
        email: "",
        tipoDocumento: "",
        numeroDocumento: "",
        celular: "",
        terminos: false,
        tratamientoDatos: false,
      });
      // Add redirect after successful submission
      router.push("/gracias");
    },
    onError: (error: any) => {
      console.log("Error submitting lead:", error);
    },
  });

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

  const defaultCities = [
    { label: "Bogotá", value: "Bogotá" },
    { label: "Medellín", value: "Medellín" },
    { label: "Cali", value: "Cali" },
    { label: "Barranquilla", value: "Barranquilla" },
  ];
  // Modify the submit button onClick handler
  const handleSubmit = () => {

    if (
      !formValues.nombre ||
      !formValues.apellido ||
      !formValues.email ||
      !formValues.tipoDocumento ||
      !formValues.numeroDocumento ||
      !formValues.celular ||
      !formValues.terminos ||
      !formValues.tratamientoDatos
    ) {
      toast.error("Por favor completa todos los campos obligatorios", {
        position: "top-right",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      toast.error("Correo electrónico inválido", { position: "top-right" });
      return;
    }

    mutation.mutate(formValues);
  };

  // Update the submitLead function to properly include city and dealer
  const submitLead = async (formData: FormData, selection: any) => {
    const URL_LEAD =
      "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/proxy?action=Salesforce";
    const TOKEN =
      "ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL";

    // Set NumeroDocumento based on type
    let tipoInteres = 2; // default value
    switch (type) {
      case "boutique":
        tipoInteres = 1;
        break;
      case "accesorios":
        tipoInteres = 2;
        break;
      case "repuestos":
        tipoInteres = 3;
        break;
      default:
        tipoInteres = 2;
    }

    // Find the selected city data
    const selectedCityData = cities.find((c: any) => c.id === selectedCity);
    if (!selectedCityData) {
      throw new Error("Ciudad no válida");
    }

    // Find the selected dealer data
    const selectedOfficeData = offices.find((o: any) => o.idVitrina === dealer);
    if (!selectedOfficeData) {
      throw new Error("Concesionario no válido");
    }

    const leadBody = {
      method: "createLeadComposite",
      records: [
        {
          LastName: formData.apellido,
          FirstName: formData.nombre,
          ATC_Numero_de_documento__c: formData.numeroDocumento,
          ATC_TipoDocumentoCandidato__c: formData.tipoDocumento,
          Email: formData.email,
          MobilePhone: formData.celular.replace(/\D/g, ""),
          ATC_CiudadLista__c: selectedCityData.externalId,
          ATC_ConcesionarioLista__c: asignarValor(Number(dealer)) || "",
          ATC_VitrinaLista__c: dealer,
          ACT_Tipo_de_venta__c: "Usados",
          ATC_W2L_Usados__c: true,
          ATC_DeterminacionInteres__c: "Compra",
          ATC_Marca__c: "1",
          ATC_Autorizacion_tratamiento_de_datos__c: "Si",
          ATC_AceptacionTerminosyCondiciones__c: true,
          LeadSource: "Web to lead ATC",
          ATC_Informacion_adicional__c: version.plate,
        },
      ],
    };

    const response = await axios.post(URL_LEAD, leadBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Basic validation
    if (!value.includes("@")) {
      setEmailError('El correo debe contener un símbolo "@"');
    } else {
      setEmailError("");
    }
  };

  const phoneNumber = advisorPhone || "573114810880"; // fallback
  // Encode a default message (optional)
  const Holamessage = encodeURIComponent(
    `Hola. Quiero más información sobre el vehículo. ${fullUrl}`
  ); // optional message

  const whatsappLink = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${Holamessage}&type=phone_number&app_absent=0&utm_source=Whatsapp_Toyota`;

  return (
    <View
      className={`${styles.marketplaceUsedDialog} ${isOpen
        ? styles.marketplaceUsedDialogOpen
        : styles.marketplaceUsedDialogClose
        }`}
      position={"fixed"}
      top={"0"}
      left={"0"}
      width={"100%"}
      height={"100%"}
      backgroundColor={"white"}
    >
      <Flex
        width={"100%"}
        maxWidth={"120rem"}
        height={"100%"}
        margin={"0 auto"}
        direction={"column"}
        gap={{ base: "", xl: "0" }}
        padding={{ base: "0 0.94rem 1.38rem", xl: " 6.37rem 8.13rem" }}
        overflow={"auto"}
      >
        <Image
          src="/svgs/close-modal--black.svg"
          alt="Close Icon"
          width={{ base: "0.82119rem", xl: "2.8125rem" }}
          alignSelf={{ base: "flex-end" }}
          margin={{
            base: "10px 0.46rem",
            medium: "5rem 5rem ",
            large: "5rem 5rem",
            xl: "",
          }}
          style={{ cursor: "pointer" }}
          position={{ base: "absolute", xl: "" }}
          onClick={() => toggle()}
        ></Image>

        <Tabs.Container
          value={tab}
          onValueChange={(value) => setTab(value as TabsType)}
          width={"100%"}
          maxWidth={"76.25rem"}
          margin={{ base: "56px auto 0", xl: "80px auto 0" }}
        >
          <Tabs.List
            justifyContent="center"
            width="max-content"
            margin="0 auto"
            value={tab}
            onChange={(value) => setTab(value as unknown as TabsType)}
            marginBottom={{ base: "2.3125rem", xl: "4.5rem" }}
            borderColor=" #E0E0E0"
          >
            {/* <Tabs.Item
              value="Formulario"
              color="inherit"
              className={styles.tabs__item}
              fontWeight={400}
              fontSize={{ base: "14px", xl: "18px", xxl: "18px" }}
              lineHeight={{ base: "140%", xl: "100%", xxl: "100%" }}
              letterSpacing={{ base: "0px", xl: "0px" }}
              style={{
                verticalAlign: "middle",
                opacity: tab === "Formulario" ? 1 : 0.5,
                transition: "opacity 0.3s ease",
                borderBottomWidth: "4px",
              }}
              fontFamily={{
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-ToyotaType-Regular)",
              }}
            >
              Formulario
            </Tabs.Item> */}
            <Tabs.Item
              value="Contacto"
              color="inherit"
              className={styles.tabs__item}
              fontWeight={400}
              fontSize={{ base: "14px", xl: "18px", xxl: "18px" }}
              lineHeight={{ base: "140%", xl: "100%", xxl: "100%" }}
              letterSpacing={{ base: "0px", xl: "0px" }}
              style={{
                verticalAlign: "middle",
                opacity: tab === "Contacto" ? 1 : 0.5,
                transition: "opacity 0.3s ease",
                borderBottomWidth: "4px",
              }}
              fontFamily={{
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-ToyotaType-Regular)",
              }}
            >
              Contacto
            </Tabs.Item>
          </Tabs.List>

          <Tabs.Panel
            minWidth={{ base: "345px", xl: "" }}
            maxHeight={{ base: "1027px", xl: "" }}
            margin={{ base: "0 auto" }}
            value="Formulario"
            padding={{ base: "0" }}
            overflow={"auto"}
          >
            <View
              backgroundColor={{ base: "#F6F6F6" }}
              padding={{
                base: " 1.71875rem 1.06rem 0px",
                xl: "2.4375rem 8.4375rem 38px 8.4375rem",
              }}
              maxHeight={{
                base: "",
                medium: "fit-content",
                large: "fit-content",
                xl: "fit-content",
                xxl: "fit-content",
              }}
              maxWidth={{
                base: "",
                medium: "620px",
                large: "720px",
                xl: "",
                xxl: "",
              }}
              margin={{
                base: "",
                medium: "0 auto",
                large: "0 auto",
                xl: "",
                xxl: "",
              }}
            >
              <View
                padding={{ base: "0 0px 27.5px", xl: "0px 0px " }}
                maxWidth="1220px"
                backgroundColor={"#F6F6F6"}
                margin={{ base: "0", xl: "0 auto" }}
              >
                <Text
                  fontSize={{ base: "22px", xl: "26px" }}
                  fontFamily="var(--font-ToyotaType-Regular)"
                  fontWeight={700}
                  color="#58595B"
                  textAlign={{
                    base: "center",
                    medium: "center",
                    large: "center",
                    xl: "center",
                    xxl: "center",
                  }}
                  maxWidth={{
                    base: "100%",
                    medium: "100%",
                    large: "100%",
                    xl: "100%",
                  }}
                  marginLeft={{ base: "0", xl: "auto" }}
                  marginRight={{ base: "0", xl: "auto" }}
                  padding={{
                    base: "0 19.5px 40px",
                    medium: "0 0 40px",
                    large: "0 0 40px",
                    xl: "0 0 48px",
                  }}
                  lineHeight={{ base: "100%", xl: "100%" }}
                  letterSpacing={{ base: "0px", xl: "0px" }}
                  style={{ verticalAlign: "middle" }}
                >
                  Ingresa tus datos para cotizar en línea
                </Text>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                  }}
                  className={styles.mobile_res}
                  gap={{ base: "30px", xl: "40px", xxl: "40px" }}
                >
                  <CustomInput
                    label="Nombre*"
                    placeholder="Nombre"
                    id="firstName"
                    value={formValues.nombre}
                    onChange={(e) => {
                      const value = e.target.value;
                      const onlyLettersRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]*$/; // allow empty too
                      if (onlyLettersRegex.test(value)) {
                        handleInputChange("nombre", value);
                      }
                    }}
                  />

                  <CustomInput
                    label="Apellido*"
                    placeholder="Apellido"
                    id="lastName"
                    value={formValues.apellido}
                    onChange={(e) => {
                      const value = e.target.value;
                      const onlyLettersRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]*$/; // allow typing progressively
                      if (onlyLettersRegex.test(value)) {
                        handleInputChange("apellido", value);
                      }
                    }}
                  />

                  <CustomInput
                    label="Correo electrónico*"
                    placeholder="Correo electrónico"
                    id="email"
                    value={formValues.email}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleInputChange("email", value);

                      // Basic validation
                      if (!value.includes("@")) {
                        setEmailError('El correo debe contener un símbolo "@"');
                      } else {
                        setEmailError("");
                      }
                    }}
                    errorMessage={emailError}
                  />

                  <CustomInput
                    label="Celular*"
                    placeholder="Celular"
                    id="mobile"
                    value={formValues.celular}
                    onChange={(e) =>
                      handleInputChange(
                        "celular",
                        e.target.value.replace(/[^0-9]/g, "") // allows only numbers
                      )
                    }
                    isPhone={true}
                    countryCode="+57"
                    flagSrc="/svgs/Col_flag.svg"
                  />

                  {/* Add document type and number here */}
                  {/* <SelectField
                    label="Tipo de documento*"
                    placeholder="Selecciona tipo de documento"
                    value={formValues.tipoDocumento}
                    onChange={(e) =>
                      handleInputChange("tipoDocumento", e.target.value)
                    }
                    backgroundColor={"#fff"}
                    borderRadius={"80px"}
                    border="none"
                    color="#58595B"
                    fontSize={{ base: "12px", xl: "14px" }}
                    padding={{ base: "10px 23px", xl: "10px 23px" }}
                  >
                    <option value="">Selecciona tipo de documento</option>
                    {documentTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField> */}

                  <CustomSelect
                    label="Tipo de documento*"
                    id="tipoDocumento"
                    value={formValues.tipoDocumento} // use from formValues
                    onChange={(e) =>
                      handleInputChange("tipoDocumento", e.target.value)
                    }
                    options={documentTypeOptions}
                  />

                  <CustomInput
                    label="Número de documento*"
                    placeholder="Número de documento"
                    id="documentNumber"
                    value={formValues.numeroDocumento}
                    onChange={(e) => {
                      const value = e.target.value;
                      const onlyNumbersRegex = /^[0-9]*$/; // Allow only digits

                      if (onlyNumbersRegex.test(value)) {
                        handleInputChange("numeroDocumento", value);
                      }
                    }}
                  />

                  {/* Existing city and dealer fields */}
                  {/* <SelectField 
                    label="Ciudad*"
                    placeholder="Selecciona una ciudad"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    backgroundColor={"#fff"}
                    borderRadius={"80px"}
                    border="none"
                    color="#58595B"
                    fontSize={{ base: "12px", xl: "14px" }}
                    padding={{ base: "10px 23px", xl: "10px 23px" }}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {loadingCities ? (
                      <option disabled>Cargando ciudades...</option>
                    ) : (
                      cities.map((city: any) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))
                    )}
                  </SelectField>  */}

                  <CustomInput
                    label="Ciudad*"
                    placeholder="Ciudad"
                    id="Ciudad"
                    disabled={true}
                    value={selectedCityLabel}
                    onChange={(e) => { }}
                  />
                  <CustomInput
                    label="Concesionario*"
                    placeholder="Concesionario"
                    id="Concesionario"
                    disabled={true}
                    value={selectedDealerLabel}
                    onChange={(e) => { }}
                  />

                  {/* <SelectField
                    label="Concesionario*"
                    placeholder="Selecciona un concesionario"
                    value={dealer}
                    onChange={(e) => setDealer(e.target.value)}
                    backgroundColor={"#fff"}
                    borderRadius={"80px"}
                    border="none"
                    color="#58595B"
                    fontSize={{ base: "12px", xl: "14px" }}
                    padding={{ base: "10px 23px", xl: "10px 23px" }}
                    disabled={!selectedCity}
                  >
                    <option value="">Selecciona un concesionario</option>
                    {loadingOffices ? (
                      <option disabled>Cargando concesionarios...</option>
                    ) : (
                      offices.map((office: any) => (
                        <option key={office.id} value={office.idVitrina}>
                          {office.name}
                        </option>
                      ))
                    )}
                  </SelectField> */}

                  {/* <CustomSelect
                    label="Concesionario*"
                    id="dealer"
                    disabled={true}
                    value={dealer}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setDealer(selectedValue);

                      // Find the selected office data (either from offices or fallback)
                      const selectedOffice = offices.find(
                        (o: any) => o.idVitrina === selectedValue
                      ) || {
                        name: selectedValue,
                        idVitrina: selectedValue,
                      };

                      // Save to localStorage for mutation usage
                      localStorage.setItem(
                        "toyota_dealer_selection",
                        JSON.stringify(selectedOffice)
                      );
                    }}
                    placeholder="Selecciona un concesionario"
                    loading={loadingOffices}
                    options={
                      loadingOffices || !offices.length
                        ? [
                          {
                            label: "Distoyota Calle 102",
                            value: "Distoyota Calle 102",
                          },
                          {
                            label: "Distoyota Calle 13",
                            value: "Distoyota Calle 13",
                          },
                          { label: "Carco SA", value: "Carco SA" },
                        ].sort((a, b) =>
                          a.label.localeCompare(b.label, "es", {
                            sensitivity: "base",
                          })
                        )
                        : [...offices]
                          .map((office: any) => ({
                            label: office.name,
                            value: office.idVitrina,
                          }))
                          .sort((a, b) =>
                            a.label.localeCompare(b.label, "es", {
                              sensitivity: "base",
                            })
                          )
                    }
                  /> */}

                  {/* Add message textarea that spans both columns */}
                  <View
                    style={{
                      gridColumn: "span 2",
                    }}
                  >
                    {/* <Flex direction="column" gap={{ base: "8px", xl: "8px" }}>
                      <Label
                        htmlFor="message"
                        color="#58595B"
                        fontSize={{ base: "14px", xl: "18x" }}
                        fontFamily={{
                          base: "var(--font-toyotaDisplay)",
                          xl: "var(--font-ToyotaType-Regular)",
                        }}
                      >
                        Mensaje*
                      </Label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe tu mensaje aquí"
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "20px",
                          border: "none",
                          padding: "10px 23px",
                          color: "#58595B",
                          fontSize: "14px",
                          fontFamily: "var(--font-ToyotaType-Regular)",
                          width: "100%",
                          minHeight: "100px",
                          resize: "vertical",
                        }}
                      />
                    </Flex> */}
                  </View>
                </Grid>
                {/*<Flex
                  direction="column"
                  gap="8px"
                  marginTop={{ base: "30px", xl: "40px" }}
                >
                  <Label
                    htmlFor="message"
                    color="#58595B"
                    fontSize={{ base: "14px", xl: "18px" }}
                    fontFamily={{
                      base: "var(--font-toyotaDisplay)",
                      xl: "var(--font-ToyotaType-Regular)",
                    }}
                    lineHeight={{ base: "140%", xl: "100%" }}
                    letterSpacing="0px"
                    style={{ verticalAlign: "middle" }}
                  >
                    Escribe tu Mensaje*
                  </Label>

                  <View
                    as="textarea"
                    id="message"
                    name="message"
                    placeholder={`Deseo cotizar el artículo ${product?.name ? product?.name : ""}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    backgroundColor="white"
                    // borderRadius="80px"
                    border="none"
                    padding="16px 23px"
                    fontSize="14px"
                    fontFamily="var(--font-ToyotaType-Regular)"
                    color="#58595B"
                    lineHeight="140%"
                    width="100%"
                    // resize="none"
                    minWidth={{ xl: "800px", xxl: "949px" }}
                    minHeight={{ base: "100px", xl: "130px", xxl: "157px" }}
                    style={{
                      outline: "none",
                      fontWeight: "400",
                    }}
                  />
                </Flex>*/}
                <Divider
                  orientation="horizontal"
                  borderColor="#E0E0E0"
                  borderWidth="1px"
                  marginTop={{ base: "36px", xl: "48px" }}
                  marginBottom={{ base: "36px", xl: "32px" }}
                  minWidth={{ base: "311px", xl: "" }}
                />
                <Flex
                  alignItems={{ base: "flex-start", xl: "center" }}
                  justifyContent={{
                    base: "flex-start",
                    medium: "center",
                    large: "center",
                    xl: "center",
                  }}
                  gap={{ base: "36px", xl: "60px" }}
                  direction={{ base: "column", xl: "row" }}
                  margin={{
                    base: "0 auto",
                    medium: "0 25%",
                    large: "0 30%",
                    xl: "0 auto ",
                  }}
                >
                  <CheckboxField
                    className="custom-checkbox"
                    size="large"
                    style={{ width: "24px", height: "24px" }}
                    margin={{
                      base: "",
                      medium: "0 auto",
                      large: "0 auto",
                      xl: " ",
                    }}
                    label={
                      <Text
                        fontSize={{ base: "14px", xl: "14px" }}
                        fontFamily="var(--font-toyotaDisplay)"
                        fontWeight={400}
                        lineHeight={{ base: "140%", xl: "140%", xxl: "140%" }}
                        letterSpacing={{ base: "0px", xl: "0px" }}
                        style={{ verticalAlign: "middle" }}
                        color="#58595B"
                        display={{ base: "flex", xl: "flex", xxl: "flex" }}
                      >
                        Acepto los{" "}
                        <Link
                          color={"inherit"}
                          href="/legales"
                          target="_blank"
                          textDecoration="underline"
                          fontFamily="var(--font-toyotaDisplay)"
                          fontSize={{ base: "14px", xl: "14px" }}
                          fontWeight={400}
                          lineHeight={{ base: "140%", xl: "140%", xxl: "140%" }}
                          letterSpacing={{ base: "0px", xl: "0px" }}
                          style={{ verticalAlign: "middle" }}
                          marginLeft={{ base: "3px", xl: "3px", xxl: "3px" }}
                        >
                          Términos y condiciones
                        </Link>
                      </Text>
                    }
                    name="terms"
                    checked={formValues.terminos}
                    onChange={(e) =>
                      handleInputChange("terminos", e.target.checked)
                    }
                  />
                  <CheckboxField
                    className="custom-checkbox"
                    size="large"
                    checked={formValues.tratamientoDatos}
                    onChange={(e) =>
                      handleInputChange("tratamientoDatos", e.target.checked)
                    }
                    label={
                      <Text
                        fontSize={{ base: "14px", xl: "14px" }}
                        fontFamily="var(--font-toyotaDisplay)"
                        fontWeight={400}
                        lineHeight={{ base: "140%", xl: "140%", xxl: "140%" }}
                        letterSpacing={{ base: "0px", xl: "0px" }}
                        style={{ verticalAlign: "middle" }}
                        display={{ base: "flex", xl: "flex", xxl: "flex" }}
                        color="#58595B"
                      >
                        Autorizo el{" "}
                        <Link
                          color={"inherit"}
                          href="/legales"
                          target="_blank"
                          textDecoration="underline"
                          fontFamily="var(--font-toyotaDisplay)"
                          fontSize={{ base: "14px", xl: "14px" }}
                          fontWeight={400}
                          lineHeight={{ base: "140%", xl: "140%", xxl: "140%" }}
                          letterSpacing={{ base: "0px", xl: "0px" }}
                          style={{ verticalAlign: "middle" }}
                          marginLeft={{ base: "3px", xl: "3px", xxl: "3px" }}
                        >
                          Tratamiento de mis datos
                        </Link>
                      </Text>
                    }
                    name="data"
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  marginTop={{ base: "36px", xl: "44px" }}
                >
                  <Button
                    minWidth={{ base: "162px", xl: "291px" }}
                    minHeight={{ base: "40px", xl: "50px" }}
                    padding={{ base: "10px 24px", xl: "" }}
                    color="deepred"
                    onClick={handleSubmit}
                    isLoading={mutation.isPending}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Enviando..." : "Enviar"}
                  </Button>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  marginLeft={{ base: "auto" }}
                  marginRight={{ base: "auto" }}
                  marginTop={{ base: "36px", xl: "35px" }}
                  maxWidth={{ base: "100%", xl: "640px" }}
                  padding={{ base: "7px", xl: "" }}
                >
                  <Text
                    fontSize={{ base: "9px", xl: "12px" }}
                    fontFamily="var(--font-ToyotaType-Regular)"
                    fontStyle={{ base: "normal" }}
                    lineHeight={{ base: "normal", xl: "130%", xxl: "130%" }}
                    fontWeight={400}
                    maxWidth={{ base: "311px", xl: "" }}
                    minWidth={{ base: "", xl: "650px", xxl: "650px" }}
                    minHeight={{ base: "", xl: "50px", xxl: "50px" }}
                    style={{ verticalAlign: "middle" }}
                    letterSpacing={{ base: "0px", xl: "0px" }}
                    color="#58595B"
                    textAlign="center"
                  >
                    {offices.find((o: any) => o.idVitrina === dealer) &&
                      selectedCityLabel ? (
                      <span>
                        Tus datos serán enviados al concesionario{" "}
                        {selectedDealerLabel
                          .replace(/\d+/g, "")
                          .replace(/\s+/g, " ")
                          .trim()}{" "}
                        {selectedCityLabel}, Colombia.
                      </span>
                    ) : (
                      <></>
                    )}
                    <View display={{ base: "none", xl: "inline" }}>
                      <br />
                    </View>
                    Al clickear el botón ENVIAR, estarás certificando que eres
                    mayor de 18 años y que has leído
                    <View display={{ base: "none", xl: "inline" }}>
                      <br />
                    </View>
                    y estás de acuerdo con los Términos de servicios y Política
                    de privacidad.
                  </Text>
                </Flex>
                <ToastContainer
                  position="top-center" // or "bottom-center", if you prefer
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  style={{
                    zIndex: 9999,
                    marginTop: "10%",
                  }} // make sure it's above everything
                />{" "}
              </View>
            </View>
          </Tabs.Panel>

          <Tabs.Panel value="Contacto" padding={{ base: "0" }}>
            <Flex
              direction={{ base: "column" }}
              alignItems={{ base: "center" }}
              gap={{ base: "3.1875rem", xl: "94px" }}
              paddingTop={{ xl: "2.25rem" }}
            >
              <Flex
                direction={{ base: "column" }}
                width={{ base: "100%" }}
                alignItems={{ base: "center" }}
                gap={{ base: "1.0625rem", xl: "25px", xxl: "25px" }}
              >
                <Flex
                  direction={{ base: "column" }}
                  alignItems={{ base: "center" }}
                  gap={{ base: "1.38rem", xl: "3.31rem" }}
                >
                  <Image
                    src="/images/Logo.svg"
                    alt="Distoyota logo"
                    width={{ base: "7.5rem", xl: "11.1875rem" }}
                  ></Image>

                  <Flex
                    direction={{ base: "column" }}
                    alignItems={{ base: "center" }}
                    gap={{ base: "0.37rem", xl: "0.25rem" }}
                  >
                    <Text
                      color={{ base: "var(--Gris-oscuro, #58595B)" }}
                      fontFamily="var(--font-toyotaDisplay)"
                      fontSize={{ base: "0.875rem", xl: "1.125rem" }}
                      fontStyle={{ base: "normal" }}
                      fontWeight={{ base: "400" }}
                      lineHeight={{ base: "140%", xl: "100%" }}
                      letterSpacing={{ base: "0px", xl: "0px", xxl: "0px" }}
                      style={{ verticalAlign: "middle" }}
                    >
                      Tu asesor de usados
                    </Text>
                  </Flex>
                </Flex>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AmplifyButton
                    width={{ base: "100%" }}
                    maxWidth={"20.625rem"}
                    margin={"0 auto"}
                    backgroundColor={{ base: "#118C7E" }}
                    borderRadius={{ base: "6.25rem" }}
                    padding={{ base: "0.625rem" }}
                    color={{ base: "var(--Blanco-principal, #FFF)" }}
                    fontFamily="var(--font-toyotaDisplay)"
                    fontSize={{ base: "0.875rem" }}
                    fontStyle={{ base: "normal" }}
                    fontWeight={{ base: "500" }}
                    lineHeight={{ base: "1.25rem" }}
                    letterSpacing={{ base: "0.00625rem" }}
                    minWidth={{ base: "345px", xl: "330px", xxl: "330px" }}
                    minHeight={{ base: "", xl: "50px", xxl: "50px" }}
                    maxHeight={{ base: "40px", xl: "50px", xxl: "50px" }}
                  >
                    Ir al chat
                  </AmplifyButton>
                </a>
              </Flex>
              <Flex
                direction={{ base: "column" }}
                alignItems={{ base: "center" }}
                gap={{ base: "0.37rem", xl: "0.25rem" }}
              >
                <Text
                  color={{ base: "var(--Gris-oscuro, #58595B)" }}
                  fontFamily="var(--font-toyotaDisplay)"
                  fontSize={{ base: "0.875rem", xl: "1.125rem" }}
                  fontStyle={{ base: "normal" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "140%", xl: "100%", xxl: "100%" }}
                  letterSpacing={{ base: "0px", xl: "0px", xxl: "0px" }}
                  style={{ verticalAlign: "middle" }}
                >
                  ¿Aún no tienes WhatsApp?
                </Text>
                <Text
                  as="a"
                  href="https://www.whatsapp.com/download"
                  target="_blank"
                  color={{ base: "var(--Gris-oscuro, #58595B)" }}
                  fontFamily="var(--font-toyotaDisplay)"
                  fontSize={{ base: "0.875rem" }}
                  fontStyle={{ base: "normal" }}
                  fontWeight={{ base: "500" }}
                  lineHeight={{ base: "100%" }}
                  textDecoration={{ base: "underline" }}
                  style={{ cursor: "pointer", verticalAlign: "middle" }}
                >
                  Descargar
                </Text>
              </Flex>
            </Flex>
          </Tabs.Panel>
        </Tabs.Container>
      </Flex>
    </View>
  );
}

export default MarketplaceUsedDialog;
