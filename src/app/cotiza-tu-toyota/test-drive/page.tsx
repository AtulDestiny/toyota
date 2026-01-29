"use client";

import Button from "@/components/Layout/Button/Button";
import { Select, SelectTheme } from "@/components/Layout/Select/Select";
import { listCities, listOfficesByCity } from "@/graphql/queries";
import Holidays from 'date-holidays';
import { Office } from "@/types/concessionaire";
import {
  CheckboxField,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { ChangeEvent, useCallback, useEffect, useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { ThankYouModalTestDrive } from "../../thank-you/ThankYouModalTestDrive";
import {
  TestDriveInput,
  TestDriveMobileInput,
} from "./components/InputsSelect";
import axios from "axios";

const capitalizeFirstLetter: any = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const customEsLocale = {
  ...es,
  localize: {
    ...es.localize,
    month: ((n: number, options?: { width: string }): string => {
      const originalMonthFunction = es.localize.month as any;
      const monthName = originalMonthFunction(n, options);
      return capitalizeFirstLetter(monthName);
    }) as any,

    day: ((n: number, options?: { width: string }): string => {
      const originalDayFunction = es.localize.day as any;
      const dayName = originalDayFunction(n, options);
      return capitalizeFirstLetter(dayName);
    }) as any,
  },
};

registerLocale("es-capitalized", customEsLocale);

export type TestDriveVehicle = {
  name: string;
};

export type CityType = {
  id: string;
  externalId?: string | number;
  name: string;
};

export type Option = {
  value: string;
  label: string;
};

enum FormFieldEnum {
  NAME = "name",
  LAST_NAME = "lastName",
  EMAIL = "email",
  PHONE = "phone",
  TERMS = "terms",
  DATA_PROCESSING = "dataProcessing",
  CITY = "city",
  OFFICE = "office",
}

type FormType = {
  [FormFieldEnum.NAME]: string;
  [FormFieldEnum.LAST_NAME]: string;
  [FormFieldEnum.EMAIL]: string;
  [FormFieldEnum.PHONE]: string;
  [FormFieldEnum.TERMS]: boolean;
  [FormFieldEnum.DATA_PROCESSING]: boolean;
  [FormFieldEnum.CITY]: string;
  [FormFieldEnum.OFFICE]: string;
};
type FormFieldType = string | boolean;
type ValidatorProps = { value: FormFieldType };
type Validator = ({ value }: ValidatorProps) => string;

const INITIAL_FORM_STATE: FormType = {
  [FormFieldEnum.NAME]: "",
  [FormFieldEnum.LAST_NAME]: "",
  [FormFieldEnum.EMAIL]: "",
  [FormFieldEnum.PHONE]: "",
  [FormFieldEnum.TERMS]: false,
  [FormFieldEnum.DATA_PROCESSING]: false,
  [FormFieldEnum.CITY]: "",
  [FormFieldEnum.OFFICE]: "",
};

const ERROR_KEY_MAP: Record<FormFieldEnum, string> = {
  [FormFieldEnum.NAME]: FormFieldEnum.NAME,
  [FormFieldEnum.LAST_NAME]: FormFieldEnum.LAST_NAME,
  [FormFieldEnum.EMAIL]: FormFieldEnum.EMAIL,
  [FormFieldEnum.PHONE]: FormFieldEnum.PHONE,
  [FormFieldEnum.TERMS]: FormFieldEnum.TERMS,
  [FormFieldEnum.DATA_PROCESSING]: FormFieldEnum.DATA_PROCESSING,
  [FormFieldEnum.CITY]: FormFieldEnum.CITY,
  [FormFieldEnum.OFFICE]: FormFieldEnum.OFFICE,
};

const MODELS: { preview: string; option: Option }[] = [
  {
    preview: "/images/test-drive/Yaris_HB.png",
    option: { value: "YARIS SPORT HB CVT", label: "Yaris" },
  },
  {
    preview: "/images/test-drive/Corolla_Sedan.png",
    option: { value: "COROLLA XLI HEV", label: "Corolla" },
  },
  {
    preview: "/images/test-drive/Fortuner.png",
    option: { value: "FORTUNER SRV 4X2 DIÉSEL 2.8", label: "Fortuner" },
  },
  // {
  //   preview: "/images/test-drive/LC_300.png",
  //   option: { value: "LC300 GASOLINA ZX", label: "Land Cruiser 300" },
  // },
  {
    preview: "/images/test-drive/LC_Prado.png",
    option: { value: "LAND CRUISER PRADO DIÉSEL TX", label: "Land Cruiser Prado" },
  },
  {
    preview: "/images/test-drive/Yaris_Cross.png",
    option: { value: "YARIS CROSS XLS HEV", label: "Yaris Cross" },
  },
  {
    preview: "/images/test-drive/Corolla_Cross.png",
    option: { value: "COROLLA CROSS SEG", label: "Corolla Cross" },
  },
  {
    preview: "/images/test-drive/Hilux.png",
    option: { value: "HILUX D.C. 4X4 DIESEL 2.4 MT", label: "Hilux" },
  },
  // {
  //   preview: "/images/test-drive/Hilux_Overlander.png",
  //   option: { value: "HILUX OVERLANDER D.C. 4X4 DIÉSEL 2.4 MT", label: "Hilux Overlander" },
  // },
  // {
  //   preview: "/images/test-drive/LC_79.png",
  //   option: { value: "LAND CRUISER 79", label: "Land Cruiser 79" },
  // },
  // {
  //   preview: "/images/test-drive/Tundra.png",
  //   option: { value: "TUNDRA D.C. 4X4 GASOLINA 3.4 AT", label: "Tundra" },
  // },
  // {
  //   preview: "/images/test-drive/Corolla_GRS.png",
  //   option: { value: "COROLLA GR-S", label: "Corolla GR-S" },
  // },
  // {
  //   preview: "/images/test-drive/Corolla_Cross_GRS.png",
  //   option: { value: "COROLLA CROSS GR-S", label: "Corolla Cross GR-S" },
  // },
  // {
  //   preview: "/images/test-drive/Fortuner_GRS.png",
  //   option: { value: "FORTUNER GR-S 4X4 DIÉSEL 2.8", label: "Fortuner GR-S" },
  // },
  // {
  //   preview: "/images/test-drive/Hilux_GRS.png",
  //   option: { value: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT", label: "Hilux GR-S" },
  // },
  // {
  //   preview: "/images/test-drive/LC_300_GRS.png",
  //   option: { value: "LC300 GASOLINA GR-S", label: "Land Cruiser 300 GR-S" },
  // },
];

const AVAILABILITY_OPTIONS: Option[] = [
  { value: "morning", label: "Disponibilidad en la Mañana" },
  { value: "afternoon", label: "Disponibilidad en la Tarde" },
];

const minSelectableDate = new Date();

function validateTextField({ value }: ValidatorProps): string {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (typeof value === "string" && !regex.test(value)) {
    return `solo debe contener letras`;
  }
  return "";
}

export default function TestDrivePage(): JSX.Element {
  const hd = new Holidays('CO');
  const client = generateClient();
  const isMobile = useBreakpointValue({ base: true, xl: false });

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<FormType>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formValidated, setFormValidated] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [selectedModel, setSelectedModel] = useState<{
    preview: string;
    option: Option;
  } | null>(MODELS[0]);

  const [selectedCity, setSelectedCity] = useState<CityType | null>(null);
  const [citiesOptions, setCitiesOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [officeOptions, setOfficeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [selectedAvailability, setSelectedAvailability] =
    useState<Option | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const isSelectableDate = (date: Date) => {
    const localDate = new Date(date);
    localDate.setHours(12, 0, 0, 0);

    const isSunday = localDate.getDay() === 0;
    const isHoliday = hd.isHoliday(localDate);

    return !isSunday && !isHoliday;
  };

  useEffect(() => {
    if (!startDate) {
      setSelectedAvailability(null);
      return;
    }

    const options = isMorningUnavailable()
      ? AVAILABILITY_OPTIONS.filter(o => o.value !== "morning")
      : AVAILABILITY_OPTIONS;

    setSelectedAvailability(options[0] ?? null);
  }, [startDate]);



  const FIELD_VALIDATORS: Record<FormFieldEnum, Validator> = {
    [FormFieldEnum.NAME]: validateTextField,
    [FormFieldEnum.LAST_NAME]: validateTextField,
    [FormFieldEnum.EMAIL]: function ({ value }: ValidatorProps): string {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value === "string" && !regex.test(value)) {
        return "El correo debe tener un formato válido";
      }
      return "";
    },
    [FormFieldEnum.PHONE]: function ({ value }: ValidatorProps): string {
      const regex = /^\d+$/;
      if (typeof value === "string" && !regex.test(value)) {
        return "El celular debe contener solo números";
      }
      return "";
    },
    [FormFieldEnum.TERMS]: function ({ value }: ValidatorProps): string {
      if (value !== true) {
        return "Debes aceptar los términos y condiciones";
      }
      return "";
    },
    [FormFieldEnum.DATA_PROCESSING]: function ({
      value,
    }: ValidatorProps): string {
      if (value !== true) {
        return "Debes autorizar el tratamiento de tus datos personales";
      }
      return "";
    },
    [FormFieldEnum.CITY]: function ({ value }: ValidatorProps): string {
      if (typeof value === "string" && value.trim() === "") {
        return "Campo requerido";
      }
      return "";
    },
    [FormFieldEnum.OFFICE]: function ({ value }: ValidatorProps): string {
      if (typeof value === "string" && value.trim() === "") {
        return "Campo requerido";
      }
      return "";
    },
  };

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;

    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isMorningUnavailable = (): boolean => {
    if (!startDate) return false;

    const now = new Date();
    return isToday(startDate) && now.getHours() >= 12;
  };


  const availabilityOptions = isMorningUnavailable()
    ? AVAILABILITY_OPTIONS.filter(
      (option) => option.value !== "morning"
    )
    : AVAILABILITY_OPTIONS;

  const fetchCities = useCallback(async () => {
    try {
      const res: any = await client.graphql({ query: listCities });
      const cities = res?.data?.listAllCitiesSortedByName?.items || [];
      const cityOptions = cities.map((city: any) => ({
        value: city.id,
        label: city.name,
      }));
      setCitiesOptions(cityOptions);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  }, []);

  const fetchOfficesByCity = useCallback(async (cityId: string) => {
    try {
      const res: any = await client.graphql({
        query: listOfficesByCity,
        variables: {
          filter: {
            cityId: { eq: cityId },
          },
        },
      });

      const offices = res?.data?.listOffices?.items || [];

      setOffices(offices);

      const validOffices = offices.filter((office: any) => !!office.idVitrina);
      const options = [
        ...validOffices.map((office: any) => ({
          value: office.id,
          label: office.name,
          officeExternalId: office.idVitrina,
          cityExternalId: office.city?.externalId,
        })),
      ];

      setOfficeOptions(options);
    } catch (error) {
      console.error("Error fetching offices", error);
      setOfficeOptions([]);
      setOffices([]);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchOfficesByCity(selectedCity.id);
    } else {
      setOfficeOptions([]);
    }
  }, [selectedCity, fetchOfficesByCity]);

  function normalize(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toUpperCase();
  }

  const formatCustomDateES = (date: Date) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  function onSubmit(valid: boolean): void {
    setIsSubmitting(true)
    const availabilityFormatted =
      (selectedAvailability?.label?.charAt(0).toUpperCase() || "") +
      (selectedAvailability?.label?.slice(1).toLowerCase() || "");
    const additionalInformation = `${startDate ? formatCustomDateES(new Date(startDate)) : ""
      } - ${availabilityFormatted}`;

    const payload = {
      ...formValues,
      selectedModel,
      selectedCity,
      selectedOffice,
      selectedAvailability,
      startDate,
      ATC_Informacion_adicional__c: additionalInformation, // Add additional information
    };

    setFormValidated(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    submitTestDriveRequests(payload, valid);
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

  const submitTestDriveRequests = async (payload: any, valid: boolean) => {
    const URL =
      "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/proxy?action=ToyotaCotizador";
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
          LastName: payload.lastName,
          FirstName: payload.name,
          ATC_Numero_de_documento__c: "",
          ATC_TipoDocumentoCandidato__c: "",
          Email: payload.email,
          MobilePhone: payload.phone.replace(/\D/g, ""),
          ATC_Modelo__c: payload.selectedModel.option.label.toUpperCase(),
          ATC_Version__c: payload.selectedModel.option.value ? normalize(payload.selectedModel.option.value) : "",
          ATC_CiudadLista__c: payload.selectedOffice.city.externalId || "",
          ATC_ConcesionarioLista__c: asignarValor(Number(payload.selectedOffice.idVitrina)) || "",
          ATC_VitrinaLista__c: payload.selectedOffice.idVitrina,
          ATC_Suborigen__c: "Test-Drive",
          ATC_Autorizacion_tratamiento_de_datos__c: "Si",
          ATC_AceptacionTerminosyCondiciones__c: true,
          LeadSource: "Web to lead ATC",
          ATC_Informacion_adicional__c: payload.ATC_Informacion_adicional__c,
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

      setFormValues(INITIAL_FORM_STATE);
      setDialogVisible(valid);
      setIsSubmitting(false)
    } catch (error: any) {
      console.error("Error al enviar formulario:", error);
      alert(error.message || "Error al enviar la información");
      setDialogVisible(false);
      setIsSubmitting(false)
    }
  };

  const renderDivider = (
    <View
      padding={{ base: "0 15px", xl: "0" }}
      paddingTop={{ base: "21px", xl: "23px" }}
      paddingBottom={{ base: "15px", xl: "30px" }}
    >
      <Divider
        orientation="horizontal"
        borderColor="#E0E0E0"
        borderWidth="1px"
      />
    </View>
  );

  const renderAvailability = (
    <Flex
      direction={{ base: "column" }}
      alignItems={{ base: "center", xl: "flex-start" }}
      padding={{ base: "15px 15px 49px", xl: "0" }}
      gap={{ base: "33px" }}
    >
      <Text
        fontFamily="var(--font-ToyotaType-Regular)"
        fontWeight={{ base: "700" }}
        fontStyle={{ base: "bold" }}
        fontSize={{ base: "22px" }}
        lineHeight={{ base: "28px" }}
        letterSpacing={{ base: "0%" }}
        textAlign={{ base: "center" }}
        whiteSpace={{ xl: "nowrap" }}
      >
        ¿Cuál es tu disponibilidad?
      </Text>

      <Flex
        direction={{ base: "column" }}
        width={{ base: "100%" }}
        gap={{ base: "19px" }}
      >
        <Flex className="test-drive__datepicker">
          <DatePicker
            selected={startDate}
            dateFormat="MMMM d, yyyy"
            onChange={(date) => setStartDate(date)}
            filterDate={isSelectableDate}
            minDate={minSelectableDate}
            showIcon
            locale="es-capitalized"
            className="date-picker-custom-input"
            wrapperClassName="date-picker-custom-wrapper"
            icon={
              <svg
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.80775 19.1152C1.30258 19.1152 0.875 18.9403 0.525 18.5903C0.175 18.2402 0 17.8127 0 17.3075V3.923C0 3.41783 0.175 2.99025 0.525 2.64025C0.875 2.29025 1.30258 2.11525 1.80775 2.11525H3.19225V0H4.73075V2.11525H12.3077V0H13.8077V2.11525H15.1923C15.6974 2.11525 16.125 2.29025 16.475 2.64025C16.825 2.99025 17 3.41783 17 3.923V17.3075C17 17.8127 16.825 18.2402 16.475 18.5903C16.125 18.9403 15.6974 19.1152 15.1923 19.1152H1.80775ZM1.80775 17.6152H15.1923C15.2692 17.6152 15.3398 17.5832 15.4038 17.519C15.4679 17.455 15.5 17.3845 15.5 17.3075V7.923H1.5V17.3075C1.5 17.3845 1.53208 17.455 1.59625 17.519C1.66025 17.5832 1.73075 17.6152 1.80775 17.6152ZM1.5 6.423H15.5V3.923C15.5 3.846 15.4679 3.7755 15.4038 3.7115C15.3398 3.64733 15.2692 3.61525 15.1923 3.61525H1.80775C1.73075 3.61525 1.66025 3.64733 1.59625 3.7115C1.53208 3.7755 1.5 3.846 1.5 3.923V6.423ZM8.5 11.6922C8.25517 11.6922 8.0465 11.606 7.874 11.4335C7.70167 11.2612 7.6155 11.0525 7.6155 10.8075C7.6155 10.5627 7.70167 10.354 7.874 10.1815C8.0465 10.0092 8.25517 9.923 8.5 9.923C8.74483 9.923 8.9535 10.0092 9.126 10.1815C9.29833 10.354 9.3845 10.5627 9.3845 10.8075C9.3845 11.0525 9.29833 11.2612 9.126 11.4335C8.9535 11.606 8.74483 11.6922 8.5 11.6922ZM4.5 11.6922C4.25517 11.6922 4.0465 11.606 3.874 11.4335C3.70167 11.2612 3.6155 11.0525 3.6155 10.8075C3.6155 10.5627 3.70167 10.354 3.874 10.1815C4.0465 10.0092 4.25517 9.923 4.5 9.923C4.74483 9.923 4.9535 10.0092 5.126 10.1815C5.29833 10.354 5.3845 10.5627 5.3845 10.8075C5.3845 11.0525 5.29833 11.2612 5.126 11.4335C4.9535 11.606 4.74483 11.6922 4.5 11.6922ZM12.5 11.6922C12.2552 11.6922 12.0465 11.606 11.874 11.4335C11.7017 11.2612 11.6155 11.0525 11.6155 10.8075C11.6155 10.5627 11.7017 10.354 11.874 10.1815C12.0465 10.0092 12.2552 9.923 12.5 9.923C12.7448 9.923 12.9535 10.0092 13.126 10.1815C13.2983 10.354 13.3845 10.5627 13.3845 10.8075C13.3845 11.0525 13.2983 11.2612 13.126 11.4335C12.9535 11.606 12.7448 11.6922 12.5 11.6922ZM8.5 15.6152C8.25517 15.6152 8.0465 15.529 7.874 15.3565C7.70167 15.1842 7.6155 14.9756 7.6155 14.7308C7.6155 14.4858 7.70167 14.2771 7.874 14.1047C8.0465 13.9322 8.25517 13.846 8.5 13.846C8.74483 13.846 8.9535 13.9322 9.126 14.1047C9.29833 14.2771 9.3845 14.4858 9.3845 14.7308C9.3845 14.9756 9.29833 15.1842 9.126 15.3565C8.9535 15.529 8.74483 15.6152 8.5 15.6152ZM4.5 15.6152C4.25517 15.6152 4.0465 15.529 3.874 15.3565C3.70167 15.1842 3.6155 14.9756 3.6155 14.7308C3.6155 14.4858 3.70167 14.2771 3.874 14.1047C4.0465 13.9322 4.25517 13.846 4.5 13.846C4.74483 13.846 4.9535 13.9322 5.126 14.1047C5.29833 14.2771 5.3845 14.4858 5.3845 14.7308C5.3845 14.9756 5.29833 15.1842 5.126 15.3565C4.9535 15.529 4.74483 15.6152 4.5 15.6152ZM12.5 15.6152C12.2552 15.6152 12.0465 15.529 11.874 15.3565C11.7017 15.1842 11.6155 14.9756 11.6155 14.7308C11.6155 14.4858 11.7017 14.2771 11.874 14.1047C12.0465 13.9322 12.2552 13.846 12.5 13.846C12.7448 13.846 12.9535 13.9322 13.126 14.1047C13.2983 14.2771 13.3845 14.4858 13.3845 14.7308C13.3845 14.9756 13.2983 15.1842 13.126 15.3565C12.9535 15.529 12.7448 15.6152 12.5 15.6152Z"
                  fill="url(#paint0_linear_17452_829)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_17452_829"
                    x1="8.5"
                    y1="0"
                    x2="8.5"
                    y2="19.1152"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" />
                  </linearGradient>
                </defs>
              </svg>
            }
          />
        </Flex>

        <Select
          options={availabilityOptions}
          selectedOption={selectedAvailability}
          onSelect={(selected) => setSelectedAvailability(selected)}
          theme={SelectTheme.Light}
        />
      </Flex>
    </Flex>
  );

  function validateField(field: FormFieldEnum, value: FormFieldType): void {
    const validator: Validator = FIELD_VALIDATORS[field];
    let error: string = "";

    if (validator) {
      error = validator({ value });

      if (
        error &&
        (field === FormFieldEnum.NAME || field === FormFieldEnum.LAST_NAME)
      ) {
        error = `El ${field === FormFieldEnum.NAME ? "name" : "lastname"} ${error}`;
      }
    }

    const errorKey: string = ERROR_KEY_MAP[field];

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [errorKey]: error,
    }));
  }

  function onFieldChange(field: FormFieldEnum, value: FormFieldType): void {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    validateField(field, value);
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    let isValid: boolean = true;

    (Object.keys(INITIAL_FORM_STATE) as Array<FormFieldEnum>).forEach(function (
      field: FormFieldEnum
    ): void {
      const value: FormFieldType = formValues[field];
      const errorKey: string = ERROR_KEY_MAP[field];
      let error: string = "";

      if (typeof value === "string" && value.trim() === "") {
        error = "Campo requerido";
      }

      if (typeof value === "boolean" && value === false) {
        if (field === FormFieldEnum.TERMS) {
          error = "Debes aceptar los términos y condiciones";
        }
        if (field === FormFieldEnum.DATA_PROCESSING) {
          error = "Debes autorizar el tratamiento de tus datos personales";
        }
      }

      if (!error && FIELD_VALIDATORS[field]) {
        error = FIELD_VALIDATORS[field]({ value });

        if (
          error &&
          (field === FormFieldEnum.NAME || field === FormFieldEnum.LAST_NAME)
        ) {
          error = `El ${field === FormFieldEnum.NAME ? "nombre" : "apellido"} ${error}`;
        }
      }

      if (error) {
        newErrors[errorKey] = error;
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  }

  const handleFieldChange = (
    field: keyof FormType,
    value: string | boolean
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    validateField(field, value);
  };

  function onInputTextChange(
    event: ChangeEvent<HTMLInputElement>,
    field: FormFieldEnum
  ): void {
    onFieldChange(field, event.target.value);
  }

  function onCheckboxChange(
    event: ChangeEvent<HTMLInputElement>,
    field: FormFieldEnum
  ): void {
    onFieldChange(field, event.target.checked);
  }

  return (
    <>
      {dialogVisible ? (
        <ThankYouModalTestDrive
          onClose={() => {
            setDialogVisible(false);
            setFormValues({ ...INITIAL_FORM_STATE });
            selectedCity && setSelectedCity(null);
            selectedOffice && setSelectedOffice(null);
            setStartDate(new Date());
          }}
          onRedirect={() => setDialogVisible(false)}
          isInStepper={false}
        />
      ) : (
        <Flex
          direction={{ base: "column" }}
          padding={{ base: "2.0625rem 0 .75rem", xl: "6.875rem 2rem 8.25rem" }}
          gap={{ base: "2.875rem", xl: "5.3125rem" }}
        >
          <Flex
            direction={{ base: "column" }}
            alignItems={{ base: "center" }}
            padding={{ base: "" }}
            gap={{ base: ".25rem" }}
          >
            <Heading
              level={2}
              color={{ base: "#000000" }}
              fontFamily={{
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-ToyotaType-Regular)",
              }}
              fontSize={{ base: ".875rem", xl: "1.125rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "140%", xl: "100%" }}
              letterSpacing={{ base: "0%" }}
              textAlign={{ base: "center" }}
            >
              Prueba de ruta
            </Heading>
            <Heading
              level={1}
              color={{ base: "#000000" }}
              fontFamily={{
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-ToyotaType-Regular)",
              }}
              fontSize={{ base: "2rem", xl: "56px" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "130%", xl: "110.00000000000001%" }}
              letterSpacing={{ base: "0%", xl: "-2%" }}
              textAlign={{ base: "center" }}
              maxWidth={{ xl: "17ch" }}
            >
              Reserva tu cita para probar un Toyota
            </Heading>
          </Flex>

          <Grid
            templateColumns={{
              base: "1fr",
              xl: "minmax(39.16%, 752px) min(33.33%, 640px)",
              xxl: "min(39.16%, 752px) min(33.33%, 640px)",
            }}
            justifyContent={{ xl: "center" }}
            alignItems={{ xl: "flex-start" }}
            gap={{ base: "3.0625rem", xl: "9.6875rem" }}
          >
            <View>
              <Flex
                direction={{ base: "column" }}
                padding={{ base: "0 .9375rem", xl: "0" }}
                gap={{ base: "1.875rem", xl: "0" }}
              >
                <Flex
                  direction={{ base: "column" }}
                  gap={{ base: "1.9375rem" }}
                >
                  <Flex
                    direction={{ base: "column" }}
                    alignItems={{ base: "center" }}
                    gap={{ base: "1.125rem" }}
                  >
                    <Text
                      fontFamily="var(--font-ToyotaType-Regular)"
                      fontWeight={{ base: "700" }}
                      fontStyle={{ base: "bold" }}
                      fontSize={{ base: "22px" }}
                      lineHeight={{ base: "28px" }}
                      letterSpacing={{ base: "0%" }}
                      textAlign={{ base: "center" }}
                    >
                      Selecciona un modelo
                    </Text>

                    <View width={{ base: "240px" }}>
                      <Select
                        options={MODELS.map((model) => model.option)}
                        selectedOption={selectedModel?.option || null}
                        onSelect={(selected) => {
                          const newModel = MODELS.find(
                            (model) => model.option.value === selected?.value
                          );
                          setSelectedModel(newModel || null);
                        }}
                        theme={SelectTheme.Light}
                      />
                    </View>
                  </Flex>

                  <Flex
                    direction={{ base: "column" }}
                    alignItems={{ base: "flex-start" }}
                    gap={{ xl: "2px" }}
                  >
                    <Flex
                      width={"100%"}
                      justifyContent={"center"}
                      direction={"column"}
                      alignItems={"center"}
                    >
                      <Image
                        maxWidth={{ medium: "400px" }}
                        height="auto"
                        objectFit="contain"
                        src={selectedModel?.preview || ""}
                        alt={selectedModel?.option.label || ""}
                      />
                      <Text
                        fontFamily="var(--font-toyotaDisplay)"
                        fontWeight={{ base: "400" }}
                        fontStyle={{ base: "normal" }}
                        fontSize={{ base: "14px" }}
                        lineHeight={{ base: "140%" }}
                        letterSpacing={{ base: "0%" }}
                        textAlign={{ base: "center" }}
                      >
                        *Imágenes de referencia
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                {isMobile ? <></> : renderDivider}

                <Grid templateColumns={{ xl: "1fr 1fr" }} gap={{ xl: "66px" }}>
                  <Flex
                    direction={{ base: "column" }}
                    gap={{ base: "33px" }}
                    alignItems={{ base: "center", xl: "flex-start" }}
                  >
                    <Text
                      fontFamily="var(--font-ToyotaType-Regular)"
                      fontWeight={{ base: "700" }}
                      fontStyle={{ base: "bold" }}
                      fontSize={{ base: "22px" }}
                      lineHeight={{ base: "28px" }}
                      letterSpacing={{ base: "0%" }}
                      textAlign={{ base: "center" }}
                    >
                      Selecciona una ubicación
                    </Text>

                    <Flex
                      direction={{ base: "column" }}
                      width={{ base: "100%" }}
                      gap={{ base: "19px" }}
                    >
                      <Flex
                        direction={{ base: "column" }}
                        gap={{ base: "1rem" }}
                      >
                        <Select
                          options={[...citiesOptions].sort((a, b) =>
                            a.label.localeCompare(b.label, "es", {
                              sensitivity: "base",
                            })
                          )}
                          placeholder={selectedCity?.name || "Tu ciudad"}
                          onSelect={(selected) => {
                            setSelectedCity({
                              id: selected?.value || "",
                              name: selected?.label || "",
                            });
                            handleFieldChange(
                              FormFieldEnum.CITY,
                              selected?.label || ""
                            );
                            handleFieldChange(FormFieldEnum.OFFICE, "");
                            setSelectedOffice(null);
                          }}
                          theme={SelectTheme.Light}
                        />
                        {formErrors.city && (
                          <Text
                            color="red"
                            fontSize="12px"
                            fontFamily="var(--font-ToyotaDisplay)"
                          >
                            {formErrors.city}
                          </Text>
                        )}
                      </Flex>

                      <Flex
                        direction={{ base: "column" }}
                        gap={{ base: "1rem" }}
                      >
                        <Select
                          options={[...officeOptions].sort((a, b) =>
                            a.label.localeCompare(b.label, "es", {
                              sensitivity: "base",
                            })
                          )}
                          placeholder={
                            selectedOffice?.name ||
                            "Selecciona un concesionario"
                          }
                          value={{
                            value: formValues[FormFieldEnum.OFFICE],
                            label: formValues[FormFieldEnum.OFFICE],
                          }}
                          onSelect={(selected) => {
                            const fullOffice = offices.find(
                              (office) =>
                                office.id === selected?.value &&
                                office.idVitrina
                            );
                            setSelectedOffice(fullOffice || null);
                            handleFieldChange(
                              FormFieldEnum.OFFICE,
                              selected?.value || ""
                            );
                          }}
                          theme={SelectTheme.Light}
                          noOptionsMessage="Selecciona tu ciudad"
                        />
                        {formErrors.office && formValidated && (
                          <Text
                            color="red"
                            fontSize="12px"
                            fontFamily="var(--font-ToyotaDisplay)"
                          >
                            {selectedCity === null
                              ? "Selecciona una ciudad"
                              : formErrors.office}
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                  {isMobile ? <></> : renderAvailability}
                </Grid>
              </Flex>

              {selectedOffice && (
                <Flex
                  direction={{ base: "column" }}
                  alignItems={{ base: "center", xl: "flex-start" }}
                  padding={{ base: "30px 15px 21px", xl: "30px 0 0 0" }}
                  gap={{ base: "4px" }}
                >
                  <Text
                    fontFamily="var(--font-toyotaDisplay)"
                    fontWeight={{ base: "400" }}
                    fontStyle={{ base: "normal" }}
                    fontSize={{ base: "14px" }}
                    lineHeight={{ base: "140%" }}
                    letterSpacing={{ base: "0%" }}
                    textAlign={{ base: "center", xl: "left" }}
                  >
                    Concesionario
                  </Text>

                  <Text
                    fontFamily="var(--font-ToyotaType-Regular)"
                    fontWeight={{ base: "700" }}
                    fontStyle={{ base: "bold" }}
                    fontSize={{ base: "26px" }}
                    lineHeight={{ base: "100%" }}
                    letterSpacing={{ base: "0%" }}
                    textAlign={{ base: "center", xl: "left" }}
                  >
                    {selectedOffice?.name}
                  </Text>

                  <Text
                    fontFamily="var(--font-ToyotaType-Regular)"
                    fontWeight={{ base: "400" }}
                    fontStyle={{ base: "normal" }}
                    fontSize={{ base: "12px" }}
                    lineHeight={{ base: "17px" }}
                    letterSpacing={{ base: "0%" }}
                    textAlign={{ base: "center", xl: "left" }}
                    maxWidth={{ base: "38ch" }}
                  >
                    Descubre todos los servicios que tenemos para ti,{" "}
                    {selectedOffice?.address} {selectedOffice?.city?.name}
                  </Text>
                </Flex>
              )}

              {isMobile ? renderDivider : <></>}

              {isMobile ? renderAvailability : <></>}
            </View>
            <View
              padding={{
                base: "2.875rem 2.0625rem",
                xl: "1.8125rem 1.25rem 1.75rem ",
              }}
              maxWidth="1220px"
              backgroundColor={"#F6F6F6"}
            >
              <Text
                marginBottom={{ base: "38px", xl: "40px" }}
                fontSize={{ base: "22px" }}
                fontFamily="var(--font-toyotaType-Regular)"
                fontWeight={700}
                color="#000000"
                lineHeight={{ base: "28px", xl: "100%" }}
                textAlign="center"
                maxWidth={{ base: "272px", xl: "100%" }}
                marginLeft={{ base: "auto", xl: "auto" }}
                marginRight={{ base: "auto", xl: "auto" }}
              >
                Datos Personales
              </Text>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  xl: "repeat(2, 1fr)",
                }}
                rowGap={{ base: "1.875rem", xl: ".875rem" }}
                columnGap={{ xl: "1.25rem" }}
              >
                <TestDriveInput
                  label="Nombre*"
                  labelColor="#000000"
                  inputBorder="1px solid #000000"
                  placeholder="Tu nombre"
                  id={FormFieldEnum.NAME}
                  value={formValues.name}
                  onChange={(e) => onInputTextChange(e, FormFieldEnum.NAME)}
                  errorMessage={formErrors.name}
                  validatePattern={/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/}
                />
                <TestDriveInput
                  label="Apellido*"
                  labelColor="#000000"
                  inputBorder="1px solid #000000"
                  placeholder="Tu apellido"
                  id={FormFieldEnum.LAST_NAME}
                  value={formValues.lastName}
                  onChange={(e) =>
                    onInputTextChange(e, FormFieldEnum.LAST_NAME)
                  }
                  errorMessage={formErrors.lastName}
                  validatePattern={/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/}
                />

                <>
                  <TestDriveInput
                    label="Correo electrónico*"
                    labelColor="#000000"
                    inputBorder="1px solid #000000"
                    placeholder="Tu correo electrónico"
                    id={FormFieldEnum.EMAIL}
                    value={formValues.email}
                    onChange={(e) => onInputTextChange(e, FormFieldEnum.EMAIL)}
                    errorMessage={formErrors.email}
                  />
                  <TestDriveMobileInput
                    label="Celular*"
                    labelColor="#000000"
                    inputBorder="1px solid #000000"
                    placeholder="Tu celular"
                    id={FormFieldEnum.PHONE}
                    value={formValues.phone}
                    onChange={(e) => onInputTextChange(e, FormFieldEnum.PHONE)}
                    errorMessage={formErrors.phone}
                    validatePattern={/^\d*$/}
                  />
                </>
              </Grid>
              <Divider
                orientation="horizontal"
                borderColor="#E0E0E0"
                borderWidth="1px"
                marginTop={{ base: "36px", xl: "30px" }}
                marginBottom={{ base: "36px", xl: "30px" }}
              />
              <Grid
                alignItems={{ base: "flex-start" }}
                justifyContent={{ base: "flex-start", xl: "center" }}
                gap={{ base: "36px", xl: "16px" }}
                templateColumns={{ base: "1fr", xl: "1fr 1fr" }}
                margin={{ base: "0 auto", xl: "0 auto " }}
              >
                <Flex direction={{ base: "column" }} gap={{ base: "1.25rem" }}>
                  <CheckboxField
                    label={
                      <>
                        <Text
                          fontSize={{ base: "sm", xl: "14px" }}
                          fontFamily="var(--font-toyotaDisplay)"
                          fontWeight={400}
                          color="#000000"
                        >
                          Acepto los{" "}
                          <Link
                            color={"inherit"}
                            href="/legales/terminos_y_condiciones_cotizador_web"
                            target="_blank"
                            textDecoration="underline"
                          >
                            términos y condiciones
                          </Link>
                        </Text>
                      </>
                    }
                    name={FormFieldEnum.TERMS}
                    checked={formValues.terms}
                    onChange={(e) => onCheckboxChange(e, FormFieldEnum.TERMS)}
                  />
                  {formErrors.terms && (
                    <Text
                      color="red"
                      fontSize="12px"
                      fontFamily="var(--font-ToyotaDisplay)"
                    >
                      {formErrors.terms}
                    </Text>
                  )}
                </Flex>

                <Flex direction={{ base: "column" }} gap={{ base: "1.25rem" }}>
                  <CheckboxField
                    label={
                      <Text
                        fontSize={{ base: "sm", xl: "14px" }}
                        fontFamily="var(--font-toyotaDisplay)"
                        fontWeight={400}
                        color="#000000"
                      >
                        Autorizo el{" "}
                        <Link
                          color={"inherit"}
                          href="/legales/autorizacion_tratamiento_datos_personales"
                          target="_blank"
                          textDecoration="underline"
                        >
                          tratamiento de datos
                        </Link>
                      </Text>
                    }
                    name={FormFieldEnum.DATA_PROCESSING}
                    checked={formValues.dataProcessing}
                    onChange={(e) =>
                      onCheckboxChange(e, FormFieldEnum.DATA_PROCESSING)
                    }
                  />
                  {formErrors.dataProcessing && (
                    <Text
                      color="red"
                      fontSize="12px"
                      fontFamily="var(--font-ToyotaDisplay)"
                    >
                      {formErrors.dataProcessing}
                    </Text>
                  )}
                </Flex>
              </Grid>
              <Flex
                alignItems="center"
                justifyContent="center"
                marginTop={{ base: "36px", xl: "50px" }}
              >
                <View width={{ base: "100%", medium: "min(290px, 100%)" }}>
                  <Button
                    isFullWidth
                    disabled={isSubmitting}
                    minHeight={{ base: "2.5rem", xl: "3.125rem" }}
                    color="deepred"
                    onClick={function (): void {
                      setIsSubmitting(false);
                      const isValid: boolean = validateForm();
                      if (!isValid) {
                        console.error(
                          "Form has validation errors:",
                          formErrors
                        );
                        setIsSubmitting(false);
                        return;
                      }
                      setIsSubmitting(true);
                      onSubmit(isValid);
                    }}
                  >
                    {isSubmitting ? "cargando..." : "Solicitar test drive"}
                  </Button>
                </View>
              </Flex>
              <Flex
                alignItems="center"
                justifyContent="center"
                marginLeft={{ base: "auto" }}
                marginRight={{ base: "auto" }}
                marginTop={{ base: "16px", xl: "49px" }}
              >
                <Text
                  fontSize={{ base: "9px", xl: "12px" }}
                  fontFamily="var(--font-toyotaType-Regular)"
                  fontWeight={400}
                  color="#000000"
                  textAlign="center"
                  maxWidth={"81ch"}
                >
                  Tus datos serán enviados a los concesionarios autorizados de
                  Toyota Colombia. Al clickear el botón "Solicitar Test Drive”,
                  estarás certificando que eres mayor de 18 años y que
                  has leído y estás de acuerdo con los términos y condiciones y
                  el tratamiento de los datos.
                </Text>
              </Flex>
            </View>
          </Grid>
        </Flex>
      )}
    </>
  );
}
