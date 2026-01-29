"use client";

import { DealershipSelector } from "@/components/DealershipSelector/DealershipSelector";
import Container from "@/components/Layout/Container/Container";
import {
  ManageableSelector,
  OptionSelector,
  Selector,
} from "@/components/Layout/Selector/Selector";
import ModelToolbar from "@/components/ModelToolbar/ModelToolbar";
import { SpecList } from "@/components/SpecList/SpecList";
import { ColorOption } from "@/types";
import {
  CheckboxField,
  Divider,
  Flex,
  Grid,
  Image,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Gallery360 from "@/components/Gallery/Gallery360/Gallery360";
import { ColorList } from "@/components/ColorList/ColorList";
import Button from "@/components/Layout/Button/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CotizadorSelect } from "./components/CotizadorSelect";
import {
  CotizadorInput,
  CotizadorMobileInput,
} from "./components/InputsSelect";
import { fetchVehicle } from "./queries";
import { calculateFixedInstallment } from "@/utils/pricing";
import { useRouter } from "next/navigation";
import { listCities, listOfficesByCity } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Office } from "@/types/concessionaire";
import { useModelStore } from "@/providers/model-store-provider";

export type CotizadorVehicle = {
  id: string;
  name: string;
  slug: string;
  models: {
    items: {
      id: string;
      name: string;
      slug: string;
      modelsByYear: {
        items: {
          id: string;
          priceListsByFeature: {
            items: {
              id: string;
              priceListLines: {
                items: {
                  value: number;
                }[];
              };
            }[];
          };
          colorsByModel?: {
            items: {
              color: {
                name: string;
              };
              gallery: {
                galleryAssets: {
                  items: {
                    name: string;
                    params: any;
                    type: any;
                    url: string;
                  }[];
                };
              };
            }[];
          };
        }[];
      };
      ModelAttrib: {
        items: {
          name: string;
          value: string;
          key: string;
        }[];
      };
      documentsByModel?: {
        items: {
          document: {
            name: string;
            description: string;
          };
        }[];
      };
    }[];
  };
};

interface CotizadorFormData {
  nombre: string;
  apellido: string;
  email: string;
  tipoDocumento: string;
  numeroDocumento: string;
  celular: string;
  terminos: boolean;
  ciudad: string;
  concesionario: string;
  tratamientoDatos: boolean;
}

const hybridVehicles = ["COROLLA CROSS", "COROLLA", "YARIS CROSS"];

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

const submitRequests = async (
  formData: CotizadorFormData,
  model: any,
  selection: any,
  data: any
) => {
  const URL =
    "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/proxy?action=ToyotaCotizador";
  const URL_LEAD =
    "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/proxy?action=Salesforce";
  const TOKEN =
    "ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL";

  // Prepare both request bodies
  const cotizacionBody = {
    method: "postCotizacion",
    DatosGenerales: {
      PrimerNombre: formData.nombre,
      SegundoNombre: "",
      PrimerApellido: formData.apellido,
      SegundoApellido: "",
      Email: formData.email,
      IdTipoDocumento: parseInt(formData.tipoDocumento),
      NumeroDocumento: formData.numeroDocumento,
      NumeroCelular: formData.celular.replace(/\D/g, ""),
      Direccion: "nn",
      TipoVehiculo: true,
      IdSublinea: model?.idSublinea || "",
      PrecioReferencia:
        model?.modelsByYear?.items[0]?.priceListsByFeature?.items[0]?.priceListLines?.items[0]?.value?.toString() ||
        "",
      IdVitrina: parseInt(selection.officeExternalId),
      AutorizaUsoDatos: formData.tratamientoDatos,
    },
    Financiacion: {
      EsFinanciado: false,
      TipoPlan: "tradicional",
      CuotaMensual: 0,
      IdPlazo: 0,
      CuotaInicial: 0,
      CuotaInicialPorcentaje: 0,
      CuotaFinal: 0,
      CuotaFinalPorcentaje: 0,
    },
    Seguro: {
      EsAsegurado: false,
      FechaNacimiento: "",
      IdGenero: 0,
      CodigoCiudad: "",
      IdServicio: 1,
      IdUso: 1,
    },
  };

  const leadBody = {
    method: "createLeadComposite",
    records: [
      {
        attributes: {
          type: "lead",
          referenceId: Math.floor(Date.now() / 1000).toString(),
        },
        LastName: formData.apellido,
        FirstName: formData.nombre,
        ATC_Numero_de_documento__c: formData.numeroDocumento,
        ATC_TipoDocumentoCandidato__c: getDianDocumentType(
          formData.tipoDocumento
        ),
        Email: formData.email,
        MobilePhone: formData.celular.replace(/\D/g, ""),
        ATC_Modelo__c: data?.name,
        ATC_Version__c: model?.name ? normalize(model.name) : "",
        ATC_CiudadLista__c: selection.cityExternalId,
        ATC_ConcesionarioLista__c: asignarValor(
          parseInt(selection.officeExternalId)
        ),
        ATC_VitrinaLista__c: selection.officeExternalId,
        ATC_Autorizacion_tratamiento_de_datos__c: "Si",
        ATC_AceptacionTerminosyCondiciones__c: true,
        LeadSource: "Web to lead ATC",
      },
    ],
  };

  const [cotizacionResult, leadResult] = await Promise.allSettled([
    axios.post(URL, cotizacionBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }),
    axios.post(URL_LEAD, leadBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }),
  ]);

  const mapResult = (res: PromiseSettledResult<any>) =>
    res.status === "fulfilled"
      ? { success: true, data: res.value.data }
      : {
          success: false,
          error: res.reason?.response?.data || res.reason?.message,
        };

  const response = {
    cotizacion: mapResult(cotizacionResult),
    lead: mapResult(leadResult),
  };

  if (!response.cotizacion.success && !response.lead.success) {
    console.log("Both requests failed", response);
  }

  return response;
};

// Move the initial form state outside the component
const initialFormState: CotizadorFormData = {
  nombre: "",
  apellido: "",
  email: "",
  tipoDocumento: "",
  numeroDocumento: "",
  celular: "",
  terminos: false,
  tratamientoDatos: false,
  ciudad: "",
  concesionario: "",
};

export interface CityInterface {
  id: string;
  externalId?: string | number;
  name: string;
}

interface security {
  key: string;
  label: string;
  icon: string;
}

export interface OfficeInterface {
  id: string;
  idVitrina?: string;
  label?: string;
  name: string;
  address: string;
  phone: string;
  appointmentPhone?: string;
  email?: string;
  website?: string;
  latitude?: string;
  longitude?: string;
  cityId?: string;
  concessionaireId?: string;
}

export default function CotizadorClient({ slug }: { slug: string }) {
  console.log(slug);

  const [model, setModel] = useState<
    CotizadorVehicle["models"]["items"][number] | null
  >(null);
  useEffect(() => {
    if (model) {
      console.log("model updated", model);
    }
  }, [model]);
  const { currentModelState } = useModelStore((state) => state);

  const router = useRouter();
  // Move all hooks to the top of the component
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const dealershipRef = useRef<HTMLDivElement>(null);
  const [scrolledPastDealership, setScrolledPastDealership] = useState(false);
  const [formValues, setFormValues] =
    useState<CotizadorFormData>(initialFormState);

  const [galleryColor, setGalleryColor] = useState<ColorOption | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const client = generateClient();
  const [allOffices, setAllOffices] = useState<Office[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [concessionaireOptions, setConcessionaireOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [formCity, setFormCity] = useState<string>("");

  const [selectedCity, setSelectedCity] = useState<CityInterface | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<OfficeInterface | null>(
    null
  );

  // Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["vehicle"],
    queryFn: slug ? () => fetchVehicle(slug) : undefined,
    enabled: !!slug,
  });

  const fetchCities = useCallback(async () => {
    try {
      const res: any = await client.graphql({ query: listCities });
      const allCities = res?.data?.listAllCitiesSortedByName?.items || [];

      const cities = allCities.filter(
        (city: any) => city.name.toUpperCase() !== "GIRÓN"
      );

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

      // Store full list for later selection lookup
      setAllOffices(offices);

      // Build options list with default item and only offices with idVitrina
      const validOffices = offices.filter((office: any) => !!office.idVitrina);
      const options = [
        ...validOffices.map((office: any) => ({
          value: office.id,
          label: office.name,
          officeExternalId: office.idVitrina,
          cityExternalId: office.city?.externalId,
        })),
      ];

      setConcessionaireOptions(options);
    } catch (error) {
      console.error("Error fetching offices", error);
      setConcessionaireOptions([]);
      setAllOffices([]);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  useEffect(() => {
    if (formCity) {
      fetchOfficesByCity(formCity);
    } else {
      setConcessionaireOptions([]);
    }
  }, [formCity, fetchOfficesByCity]);

  console.log("allOffices", allOffices);

  const mutation = useMutation({
    mutationFn: async (formData: CotizadorFormData) => {
      console.log("formData", formData);

      const selectedOfficeId = formData.concesionario;

      if (!selectedOfficeId) {
        throw new Error("Por favor selecciona un concesionario");
      }

      const selectedOffice = allOffices.find(
        (office) => office.id === selectedOfficeId
      );

      if (!selectedOffice?.idVitrina) {
        throw new Error("El concesionario seleccionado no tiene 'idVitrina'");
      }

      const selection = {
        officeExternalId: selectedOffice.idVitrina,
        cityExternalId: selectedOffice.city?.externalId || "",
      };

      // const selection = {
      //   officeExternalId: selectedOffice.city.externalId,
      //   cityExternalId: selectedOffice.city?.externalId || "",
      // };

      return submitRequests(formData, model, selection, data);
    },

    onSuccess: (data) => {
      console.log("Cotización y Lead enviados exitosamente:", data);
      setFormValues(initialFormState);
      router.push("/gracias");
    },

    onError: (error: any) => {
      console.error("Error al enviar formulario:", error);
      alert(error.message || "Error al enviar la información");
    },
  });

  // Derived state
  const models = data?.models.items;
  const modelAttributes = model?.ModelAttrib.items || [];

  // Sort models by price (lowest to highest) before rendering
  let sortedModels:
    | {
        id: string;
        name: string;
        slug: string;
        modelsByYear: {
          items: {
            id: string;
            priceListsByFeature: {
              items: {
                id: string;
                priceListLines: {
                  items: {
                    value: number;
                  }[];
                };
              }[];
            };
            colorsByModel?: {
              items: {
                color: {
                  name: string;
                };
                gallery: {
                  galleryAssets: {
                    items: {
                      name: string;
                      params: any;
                      type: any;
                      url: string;
                    }[];
                  };
                };
              }[];
            };
          }[];
        };
        ModelAttrib: {
          items: {
            name: string;
            value: string;
            key: string;
          }[];
        };
        documentsByModel?: {
          items: {
            document: {
              name: string;
              description: string;
            };
          }[];
        };
      }[]
    | undefined = [];
  if (models && models.length > 0) {
    sortedModels = [...models].sort((a, b) => {
      const aPrice =
        a.modelsByYear?.items?.[0]?.priceListsByFeature?.items?.[0]
          ?.priceListLines?.items?.[0]?.value ?? 0;
      const bPrice =
        b.modelsByYear?.items?.[0]?.priceListsByFeature?.items?.[0]
          ?.priceListLines?.items?.[0]?.value ?? 0;
      return aPrice - bPrice;
    });
  }

  useEffect(() => {
    if (models && models.length === 1 && !model) {
      setModel(models[0]);
    }
  }, [models, model]);

  useEffect(() => {
    const currentNorm = normalize(currentModelState || "");
    const exactMatch = models?.find(
      (item) => normalize(item.name || "") === currentNorm
    );
    if (exactMatch) {
      setModel(exactMatch);
    } else {
      const nonGRModel = models?.find((item) => {
        const nameNorm = normalize(item.name || "");
        return !nameNorm.includes("GR") && !nameNorm.includes("GR-S");
      });
      if (nonGRModel) {
        setModel(nonGRModel);
      }
    }
  }, [models, currentModelState]);

  useEffect(() => {
    const handleScroll = () => {
      if (!dealershipRef.current) return;
      const rect = dealershipRef.current.getBoundingClientRect();
      if (window.scrollY === 0 && rect.top > 0) {
        setScrolledPastDealership(false);
      } else {
        setScrolledPastDealership(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch offices when selectedCity changes
  // useEffect(() => {
  //   if (!formValues.ciudad) {
  //     setOffices([]);
  //     return;
  //   }
  //   setLoadingOffices(true);
  //   fetchOfficesByCity(formValues.ciudad)
  //     .then((data) => setOffices(data))
  //     .finally(() => setLoadingOffices(false));
  // }, [formValues.ciudad]);

  useEffect(() => {
    if (
      model?.modelsByYear?.items[0]?.colorsByModel?.items &&
      model.modelsByYear.items[0].colorsByModel.items.length > 0
    ) {
      setGalleryColor(
        mapColorItemToColorOption(
          model.modelsByYear.items[0].colorsByModel.items[0],
          0
        )
      );
    } else {
      setGalleryColor(null);
    }
  }, [model]);

  // Event handlers
  const handleFieldChange = (
    field: keyof CotizadorFormData,
    value: string | boolean
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    validateField(field, value);
  };

  // Loading state
  if (isLoading) return <View>Cargando...</View>;

  const validateField = (field: string, value: string | boolean) => {
    let error = "";

    switch (field) {
      case "nombre":
      case "apellido":
        if (
          typeof value === "string" &&
          !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)
        ) {
          error = `El ${field} solo debe contener letras`;
        }
        break;
      case "numeroDocumento":
        if (typeof value === "string" && !/^\d+$/.test(value)) {
          error = "El número de documento debe ser numérico";
        }
        break;
      case "email":
        if (
          typeof value === "string" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          error = "El correo debe tener un formato válido";
        }
        break;
      case "celular":
        if (typeof value === "string" && !/^\d+$/.test(value)) {
          error = "El celular debe contener solo números";
        }
        break;
      case "terminos":
        if (value !== true) {
          error = "Debes aceptar los términos y condiciones";
        }
        break;
      case "tratamientoDatos":
        if (value !== true) {
          error = "Debes autorizar el tratamiento de tus datos personales";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formValues.nombre)) {
      newErrors.nombre = "El nombre solo debe contener letras";
      isValid = false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formValues.apellido)) {
      newErrors.apellido = "El apellido solo debe contener letras";
      isValid = false;
    }

    if (!/^\d+$/.test(formValues.numeroDocumento)) {
      newErrors.numeroDocumento = "El número de documento debe ser numérico";
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "El correo debe tener un formato válido";
      isValid = false;
    }

    if (!/^\d+$/.test(formValues.celular)) {
      newErrors.celular = "El celular debe contener solo números";
      isValid = false;
    }

    if (!formValues.tipoDocumento) {
      newErrors.tipoDocumento = "Debe seleccionar un tipo de documento";
      isValid = false;
    }

    if (!formValues.terminos) {
      newErrors.terminos = "Debes aceptar los términos y condiciones";
      isValid = false;
    }

    if (!formValues.tratamientoDatos) {
      newErrors.tratamientoDatos =
        "Debes autorizar el tratamiento de tus datos personales";
      isValid = false;
    }

    if (!model) {
      newErrors.model = "Debes seleccionar un concesionario";
      isValid = false;
    }

    if (!formValues.terminos) {
      newErrors.terminos = "Debes aceptar los términos y condiciones";
      isValid = false;
    }

    if (!formValues.tratamientoDatos) {
      newErrors.tratamientoDatos =
        "Debes autorizar el tratamiento de tus datos personales";
      isValid = false;
    }
    setFormErrors(newErrors);
    return isValid;
  };

  const isFormValid =
    formValues.nombre.trim() !== "" &&
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formValues.nombre) &&
    formValues.apellido.trim() !== "" &&
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formValues.apellido) &&
    formValues.tipoDocumento.trim() !== "" &&
    /^\d+$/.test(formValues.numeroDocumento) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email) &&
    /^\d+$/.test(formValues.celular) &&
    formValues.terminos &&
    formValues.tratamientoDatos &&
    model !== null;

  const modelByYear = (model?.modelsByYear?.items?.[0] ?? {}) as Record<
    string,
    any
  >;

  const SECURITY_ICONS = [
    {
      key: "security_icon_1",
      label: "SISTEMA ANTIBLOQUEO FRENOS",
      icon: "/images/icons/abs.png",
    },
    {
      key: "security_icon_2",
      label: "CONTROL ELECTRONICO DE ESTABILIDAD",
      icon: "/images/icons/stability.png",
    },
    {
      key: "security_icon_3",
      label: "ALERTA DE COLISIÓN FRONTAL",
      icon: "/images/icons/alerta.png",
    },
    {
      key: "security_icon_4",
      label: "BOLSAS DE AIRE",
      isAirbag: true,
      icon: "/images/icons/airbags.png",
    },
    {
      key: "security_icon_5",
      label: "ISOFIX SISTEMA DE SUJECIÓN INFANTIL",
      icon: "/images/icons/basy-seat.png",
    },
  ];

  return (
    <View>
      <div ref={dealershipRef}>
        <DealershipSelector
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedOffice={selectedOffice}
          setSelectedOffice={setSelectedOffice}
        />
      </div>
      {(isMobile || scrolledPastDealership) && (
        <ModelToolbar
          model={model?.name || "Nombre del Modelo"}
          price={
            Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
              .format(
                model?.modelsByYear.items[0]?.priceListsByFeature.items[0]
                  ?.priceListLines.items[0]?.value ?? 0
              )
              .toString() || "Precio del Vehículo"
          }
        />
      )}

      <View marginTop={{ base: "-93.5px", xl: "0" }}>
        <Container
          padding={{
            base: "calc(55px + 41.91px + 31px) 0 93.5px 0",
            xl: "95px 0 0 0",
          }}
        >
          <View textAlign="center" marginBottom={{ base: "40px", xl: "60px" }}>
            <Text
              fontSize={{ base: "12px", xl: "18px" }}
              fontWeight={500}
              fontFamily="var(--font-ToyotaType-Regular)"
              color="#373948"
              marginBottom={{ base: "16px", xl: "20px" }}
              lineHeight="1.2"
            >
              Personaliza y cotiza tu
            </Text>
            <Text
              fontSize={{ base: "22px", xl: "56px" }}
              fontWeight={500}
              fontFamily="var(--font-ToyotaType-Regular)"
              lineHeight="1.4"
              maxWidth="600px"
              margin="0px auto 80px auto"
            >
              {data?.name || "Nombre del Vehículo"}
            </Text>
          </View>
          <Grid
            templateColumns={{ base: "1fr", xl: "1fr 1fr" }}
            gap={{ base: "0px", xl: "154px" }}
            justifyContent="center"
            position={{ xl: "relative" }}
          >
            <View
              width="100%"
              position={{ xl: "sticky" }}
              top={{ xl: "226px" }}
              left={{ xl: "0px" }}
              height={{ xl: "max-content" }}
            >
              {galleryColor && (
                <Gallery360
                  simple
                  carImages={galleryColor?.imagePath || []}
                  placesList={[]}
                  colorsList={[]}
                  onColorChange={setGalleryColor}
                />
              )}
              {model?.modelsByYear?.items?.[0] && (
                <View marginTop="30px" marginBottom="60px">
                  <Flex
                    gap={{ base: "15px", xl: "33px" }}
                    direction={{ base: "row", xl: "row" }}
                    wrap={{ base: "nowrap", xl: "nowrap" }}
                    justifyContent="center"
                  >
                    {SECURITY_ICONS.map(({ key, label, icon, isAirbag }) => {
                      const isTrue = isAirbag ? true : !!modelByYear?.[key];
                      const count =
                        isAirbag && modelByYear?.airbag_count
                          ? ` (${modelByYear.airbag_count})`
                          : "";
                      return (
                        <Flex
                          key={key}
                          minWidth={{ base: "40px", xl: "100px" }}
                          maxWidth={{ base: "60px", xl: "115px" }}
                          alignItems="center"
                          direction="column"
                          gap="10px"
                        >
                          <View position="relative">
                            <Image src={icon} alt={label} />
                            <Image
                              src={
                                isTrue
                                  ? "/svgs/security-right.svg"
                                  : "/svgs/security-uncheck.svg"
                              }
                              alt={isTrue ? "check" : "uncheck"}
                              position="absolute"
                              top={{ base: "-1px", xl: "-2px" }}
                              right={{ base: "3px", xl: "5px" }}
                              maxWidth={{ base: "20px", xl: "none" }}
                            />
                          </View>
                          <Text
                            maxWidth={{ base: "60px", xl: "75%" }}
                            textAlign="center"
                            fontSize={{ base: "9px", xl: "14px" }}
                          >
                            {label}
                            {count}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </View>
              )}
              <View marginBottom="30px">
                <SpecList
                  details={{
                    engine:
                      modelAttributes.find(
                        (attribute) => attribute.key === "engine"
                      )?.value || "No disponible",
                    gears:
                      modelAttributes.find(
                        (attribute) => attribute.key === "speeds"
                      )?.value || "No disponible",
                    doors:
                      Number(
                        modelAttributes.find(
                          (attribute) => attribute.key === "doors"
                        )?.value
                      ) || 0,
                    passengers:
                      Number(
                        modelAttributes.find(
                          (attribute) => attribute.key === "passengers"
                        )?.value
                      ) || 0,
                    fuelType:
                      modelAttributes.find(
                        (attribute) => attribute.key === "technology"
                      )?.value || "No disponible",
                  }}
                />
              </View>
              <Link
                color="black"
                textDecoration="underline"
                textAlign="center"
                display="block"
                marginTop="30px"
                marginBottom="30px"
                href={
                  model?.documentsByModel?.items.find((item) =>
                    item.document.name.includes("Ficha técnica")
                  )?.document.description || "#"
                }
                target="_blank"
              >
                Ficha técnica del vehículo
              </Link>
            </View>
            <View width="100%">
              <View
                style={{
                  borderLeft: 0,
                  borderRight: 0,
                  borderBottom: 0,
                }}
                paddingBottom={36}
              >
                <Text
                  fontWeight={700}
                  fontFamily="var(--font-ToyotaType-Regular)"
                  fontSize={22}
                  marginTop={{ base: "40px", xl: "0" }}
                  marginBottom={20}
                  marginLeft={5}
                >
                  Elige tu versión
                </Text>
                {sortedModels.length > 0 && model && (
                  <ManageableSelector
                    selectedIndex={sortedModels.findIndex(
                      (item) => item.id === model.id
                    )}
                    handleSelect={(index) =>
                      setModel(sortedModels ? sortedModels[index] : null)
                    }
                  >
                    {sortedModels.map((modelItem) => {
                      if (
                        modelItem.name === "HILUX CH. ESTACAS 4X4 DIÉSEL 2.4 MT"
                      ) {
                        return null;
                      }

                      return (
                        <OptionSelector
                          key={modelItem.name}
                          isSelected={model.id === modelItem.id}
                          onSelect={() => setModel(modelItem)}
                        >
                          <Flex
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Text
                              fontWeight={400}
                              fontFamily="var(--font-ToyotaType-Regular)"
                              fontSize={22}
                              maxWidth={250}
                            >
                              {modelItem.name}
                            </Text>

                            <Flex alignItems="center" gap={4}>
                              {(() => {
                                const category =
                                  modelItem.ModelAttrib.items.find(
                                    (attribute) => attribute.key === "category"
                                  )?.value;
                                return category &&
                                  ["Híbrido", "Hibrido"].some((h) =>
                                    category.includes(h)
                                  ) &&
                                  data?.name &&
                                  hybridVehicles.includes(data.name) ? (
                                  <>
                                    <Image
                                      textAlign={"center"}
                                      src="/assets/icons/icon_car.svg"
                                      alt="Motor"
                                      loading="lazy"
                                      height={18}
                                    />
                                    <Text
                                      fontWeight={400}
                                      fontFamily="var(--font-ToyotaType-Regular)"
                                      fontSize={12}
                                      textTransform={"capitalize"}
                                    >
                                      {category}
                                    </Text>
                                  </>
                                ) : null;
                              })()}
                            </Flex>
                          </Flex>
                          <Text
                            fontWeight={400}
                            fontFamily="var(--font-ToyotaType-Regular)"
                            fontSize={12}
                            marginTop={8}
                            maxWidth={250}
                          >
                            {modelItem.ModelAttrib.items.find(
                              (attribute) => attribute.key === "description"
                            )?.value || "No disponible"}
                          </Text>
                          <Text
                            fontWeight={700}
                            fontFamily="var(--font-ToyotaType-Regular)"
                            fontSize={22}
                            marginTop={16}
                          >
                            {Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(
                              modelItem.modelsByYear.items[0]
                                ?.priceListsByFeature.items[0]?.priceListLines
                                .items[0]?.value ?? 0
                            )}
                          </Text>
                        </OptionSelector>
                      );
                    })}
                  </ManageableSelector>
                )}
              </View>
              <View
                style={{
                  borderLeft: 0,
                  borderRight: 0,
                  borderBottom: 0,
                  borderTop: "1px solid #D9D9D9",
                }}
                paddingBottom={36}
              >
                <Text
                  fontWeight={700}
                  fontFamily="var(--font-ToyotaType-Regular)"
                  fontSize={22}
                  marginTop={40}
                  marginBottom={20}
                  marginLeft={5}
                >
                  Tu motorización
                </Text>
                <Selector>
                  {modelAttributes &&
                  modelAttributes.filter((attribute) =>
                    attribute.key.includes("technology")
                  ).length > 0 ? (
                    modelAttributes
                      .filter((attribute) =>
                        attribute.key.includes("technology")
                      )
                      .map((attribute) => (
                        <OptionSelector key={attribute.key}>
                          <Text
                            fontWeight={400}
                            fontFamily="var(--font-ToyotaType-Regular)"
                            fontSize={22}
                            textTransform={"capitalize"}
                          >
                            {attribute.value || "No disponible"}
                          </Text>
                        </OptionSelector>
                      ))
                  ) : (
                    <OptionSelector>
                      <Text>No hay tecnologías disponibles</Text>
                    </OptionSelector>
                  )}
                </Selector>
              </View>
              <View
                style={{
                  borderLeft: 0,
                  borderRight: 0,
                  borderBottom: 0,
                  borderTop: "1px solid #D9D9D9",
                }}
                paddingBottom={36}
              >
                <Text
                  fontWeight={700}
                  fontFamily="var(--font-ToyotaType-Regular)"
                  fontSize={22}
                  marginTop={40}
                  marginBottom={20}
                  marginLeft={5}
                >
                  Colores disponibles
                </Text>
                <View paddingLeft={5} paddingRight={5}>
                  <ColorList
                    colorLists={
                      model?.modelsByYear?.items[0]?.colorsByModel?.items.map(
                        (colorItem, colorIndex) => ({
                          id: colorItem.color.name,
                          iconPath: `/images/vehicle-colors/hd/${colorItem.color.name
                            .replace(/([a-z])([A-Z])/g, "$1-$2")
                            .replace(/\s+/g, "-")
                            .toLowerCase()}.png`,
                          imagePath:
                            colorItem?.gallery?.galleryAssets?.items.map(
                              (asset: { url: string }) => asset.url
                            ),
                          name: colorItem.color.name,
                          priority: colorIndex,
                        })
                      ) || []
                    }
                    onSelect={(selectedItem) => {
                      const colorOption =
                        model?.modelsByYear?.items[0]?.colorsByModel?.items.find(
                          (colorItem) =>
                            colorItem.color.name === selectedItem.id
                        );
                      if (colorOption) {
                        setGalleryColor(
                          mapColorItemToColorOption(colorOption, 0)
                        );
                      }
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  borderLeft: 0,
                  borderRight: 0,
                  borderBottom: 0,
                  borderTop: "1px solid #D9D9D9",
                }}
                paddingBottom={36}
              >
                <Text
                  fontWeight={700}
                  fontFamily="var(--font-ToyotaType-Regular)"
                  fontSize={22}
                  marginTop={40}
                  marginBottom={20}
                  marginLeft={5}
                >
                  Tus opciones de pago
                </Text>
                <Selector>
                  <View style={{ pointerEvents: "none" }}>
                    <OptionSelector>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text
                          fontWeight={400}
                          fontFamily="var(--font-ToyotaType-Regular)"
                          fontSize={22}
                          maxWidth={250}
                        >
                          Financiación
                        </Text>
                      </Flex>
                      <Text
                        fontWeight={400}
                        fontFamily="var(--font-ToyotaType-Regular)"
                        fontSize={12}
                        marginTop={8}
                        maxWidth={250}
                      >
                        Descripción de las cuotas
                      </Text>
                      <Text
                        fontWeight={700}
                        fontFamily="var(--font-ToyotaType-Regular)"
                        fontSize={22}
                        marginTop={16}
                      >
                        {Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(
                          calculateFixedInstallment(
                            model?.modelsByYear.items[0]?.priceListsByFeature
                              .items[0]?.priceListLines.items[0]?.value ?? 0,
                            0.0115,
                            72
                          )
                        )}
                      </Text>
                      <Text
                        fontWeight={400}
                        fontFamily="var(--font-ToyotaType-Regular)"
                        fontSize={9}
                      >
                        **Plan ofrecido por Toyota Financial Services Colombia.
                        Valor de la cuota aproximado en un crédito tradicional
                        de 72 meses, no representa oferta comercial. Aprobación
                        y tasa de interés sujeta al perfil de crédito del
                        cliente.
                      </Text>
                    </OptionSelector>
                  </View>
                  <View style={{ pointerEvents: "none" }}>
                    <OptionSelector>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text
                          fontWeight={400}
                          fontFamily="var(--font-ToyotaType-Regular)"
                          fontSize={22}
                          maxWidth={250}
                        >
                          Contado
                        </Text>
                      </Flex>
                      <Text
                        fontWeight={400}
                        fontFamily="var(--font-toyotaType-Regular)"
                        fontSize={12}
                        marginTop={8}
                        maxWidth={250}
                      >
                        Este valor corresponde con la cotización y el medio de
                        pago que está solicitando
                      </Text>
                      <Text
                        fontWeight={700}
                        fontFamily="var(--font-ToyotaType-Regular)"
                        fontSize={22}
                        marginTop={16}
                      >
                        {Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(
                          model?.modelsByYear.items[0]?.priceListsByFeature
                            .items[0]?.priceListLines.items[0]?.value ?? 0
                        )}
                      </Text>
                      <Text
                        fontWeight={400}
                        fontFamily="var(--font-ToyotaType-Regular)"
                        fontSize={9}
                      >
                        *Precio sugerido al público
                      </Text>
                    </OptionSelector>
                  </View>
                </Selector>
              </View>

              <View
                padding={{
                  base: "25px 17px",
                  xl: "1.8125rem 1.2188rem 2.75rem ",
                }}
                maxWidth="1220px"
                backgroundColor={"#373948"}
              >
                <Text
                  marginBottom={{ base: "10px", xl: "48px" }}
                  fontSize={{ base: "22px", xl: "26px" }}
                  fontFamily="var(--font-toyotaType-Regular)"
                  fontWeight={700}
                  color="#fff"
                  textAlign="center"
                  maxWidth={{ base: "272px", xl: "100%" }}
                  marginLeft={{ base: "auto", xl: "auto" }}
                  marginRight={{ base: "auto", xl: "auto" }}
                >
                  Ingresa tus datos para cotizar en línea
                </Text>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                  }}
                  gap={{ base: "30px", xl: "20px" }}
                >
                  <CotizadorInput
                    label="Nombre*"
                    placeholder="Tu nombre"
                    id="nombre"
                    value={formValues.nombre}
                    onChange={(e) =>
                      handleFieldChange("nombre", e.target.value)
                    }
                    errorMessage={formErrors.nombre}
                    validatePattern={/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/}
                  />
                  <CotizadorInput
                    label="Apellido*"
                    placeholder="Tu apellido"
                    id="apellido"
                    value={formValues.apellido}
                    onChange={(e) =>
                      handleFieldChange("apellido", e.target.value)
                    }
                    errorMessage={formErrors.apellido}
                    validatePattern={/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/}
                  />

                  <CotizadorSelect
                    label="Tipo de documento*"
                    placeholder="Tu tipo de documento"
                    id="tipoDocumento"
                    value={formValues.tipoDocumento}
                    onChange={(e) =>
                      handleFieldChange("tipoDocumento", e.target.value)
                    }
                    options={[
                      { value: "1", label: "Cédula de ciudadanía" },
                      { value: "2", label: "NIT" },
                      { value: "3", label: "Cédula de Extranjería" },
                      { value: "4", label: "Pasaporte" },
                    ]}
                    errorMessage={formErrors.tipoDocumento}
                  />
                  <CotizadorInput
                    label="Número de documento*"
                    placeholder="Tu número de documento"
                    id="numeroDocumento"
                    value={formValues.numeroDocumento}
                    onChange={(e) =>
                      handleFieldChange("numeroDocumento", e.target.value)
                    }
                    errorMessage={formErrors.numeroDocumento}
                    validatePattern={/^\d*$/}
                  />

                  <>
                    <CotizadorInput
                      label="Correo electrónico*"
                      placeholder="Tu correo electrónico"
                      id="email"
                      value={formValues.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      errorMessage={formErrors.email}
                      // validatePattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                    />
                    <CotizadorMobileInput
                      label="Celular*"
                      placeholder="Tu celular"
                      id="celular"
                      value={formValues.celular}
                      onChange={(e) =>
                        handleFieldChange("celular", e.target.value)
                      }
                      errorMessage={formErrors.celular}
                      validatePattern={/^\d*$/}
                    />

                    <CotizadorSelect
                      label="Ciudad*"
                      placeholder={selectedCity?.name || "Tu ciudad"}
                      id="ciudad"
                      value={selectedCity?.id || formValues.ciudad}
                      onChange={(e) => {
                        const value = e.target.value;
                        const cityObj = citiesOptions.find(
                          (c) => c.value === value
                        );
                        if (cityObj) {
                          setSelectedCity({
                            id: cityObj.value,
                            name: cityObj.label,
                          });
                        } else {
                          setSelectedCity(null);
                        }
                        handleFieldChange(
                          "ciudad",
                          cityObj ? cityObj.label : value
                        );
                        setFormCity(value);
                        handleFieldChange("concesionario", "");
                      }}
                      options={[...citiesOptions].sort((a, b) =>
                        a.label.localeCompare(b.label, "es", {
                          sensitivity: "base",
                        })
                      )}
                      errorMessage={formErrors.ciudad}
                    />

                    <CotizadorSelect
                      label="Concesionario*"
                      placeholder={
                        selectedOffice?.name || "Selecciona un concesionario"
                      }
                      id="concesionario"
                      value={formValues.concesionario || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        const officeObj = concessionaireOptions.find(
                          (c) => c.value === value
                        );
                        const fullOffice = allOffices.find(
                          (office) => office.id === value && office.idVitrina
                        );
                        setSelectedOffice(fullOffice || null);
                        handleFieldChange("concesionario", value);
                      }}
                      options={[...concessionaireOptions].sort((a, b) =>
                        a.label.localeCompare(b.label, "es", {
                          sensitivity: "base",
                        })
                      )}
                      errorMessage={formErrors.concesionario}
                    />
                  </>
                </Grid>
                <Divider
                  orientation="horizontal"
                  borderColor="#E0E0E0"
                  borderWidth="1px"
                  marginTop={{ base: "36px", xl: "48px" }}
                  marginBottom={{ base: "36px", xl: "32px" }}
                />
                <Flex
                  alignItems={{ base: "flex-start" }}
                  justifyContent={{ base: "flex-start", xl: "center" }}
                  gap={{ base: "36px", xl: "16px" }}
                  direction={{ base: "column" }}
                  margin={{ base: "0 auto", xl: "0 auto " }}
                >
                  <CheckboxField
                    label={
                      <>
                        <Text
                          fontSize={{ base: "sm", xl: "14px" }}
                          fontFamily="var(--font-toyotaDisplay)"
                          fontWeight={400}
                          color="#fff"
                        >
                          Conozco los{" "}
                          <Link
                            color={"inherit"}
                            href="/legales/terminos_y_condiciones_cotizador_web"
                            target="_blank"
                            textDecoration="underline"
                          >
                            términos y condiciones{" "}
                          </Link>
                          <Text
                            as="span"
                            fontSize={{ base: "sm", xl: "14px" }}
                            fontFamily="var(--font-toyotaDisplay)"
                            fontWeight={400}
                            color="#fff"
                          >
                            y{" "}
                          </Text>
                          <Link
                            color={"inherit"}
                            href="/legales/politica_de_privacidad"
                            target="_blank"
                            textDecoration="underline"
                          >
                            políticas de privacidad
                          </Link>
                        </Text>
                      </>
                    }
                    name="terms"
                    checked={formValues.terminos}
                    onChange={(e) =>
                      handleFieldChange("terminos", e.target.checked)
                    }
                  />
                  {formErrors.terminos && (
                    <Text
                      color="red"
                      fontSize="12px"
                      fontFamily="var(--font-ToyotaDisplay)"
                      marginTop="-19px"
                    >
                      {formErrors.terminos}
                    </Text>
                  )}

                  <CheckboxField
                    label={
                      <Text
                        fontSize={{ base: "sm", xl: "14px" }}
                        fontFamily="var(--font-toyotaDisplay)"
                        fontWeight={400}
                        color="#fff"
                      >
                        Acepto el{" "}
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
                    name="data"
                    checked={formValues.tratamientoDatos}
                    onChange={(e) =>
                      handleFieldChange("tratamientoDatos", e.target.checked)
                    }
                  />
                  {formErrors.tratamientoDatos && (
                    <Text
                      color="red"
                      fontSize="12px"
                      fontFamily="var(--font-ToyotaDisplay)"
                      marginTop="-19px"
                    >
                      {formErrors.tratamientoDatos}
                    </Text>
                  )}
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  marginTop={{ base: "36px", xl: "44px" }}
                >
                  <View width={{ base: "100%", medium: "min(290px, 100%)" }}>
                    <Button
                      isFullWidth
                      color="red"
                      onClick={() => {
                        console.log("before modal values:", formValues);

                        if (!model) {
                          console.log("no model selected");
                          return;
                        }

                        console.log("after modal values:", formValues);

                        const isValid = validateForm();

                        if (!isValid) {
                          console.warn(
                            "Form has validation errors:",
                            formErrors
                          );
                          return;
                        }
                        console.log("Submitting form with values:", formValues);

                        mutation.mutate(formValues);
                      }}
                      isLoading={mutation.isPending}
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Enviando..." : "Enviar"}
                    </Button>
                  </View>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  marginLeft={{ base: "auto" }}
                  marginRight={{ base: "auto" }}
                  marginTop={{ base: "36px", xl: "44px" }}
                  maxWidth={{ base: "100%", xl: "640px" }}
                >
                  <Text
                    fontSize={{ base: "9px", xl: "12px" }}
                    fontFamily="var(--font-toyotaType-Regular)"
                    fontWeight={400}
                    color="#fff"
                    textAlign="center"
                    maxWidth={"70ch"}
                  >
                    {(() => {
                      const stored = localStorage.getItem(
                        "toyota_dealer_selection"
                      );
                      const selection = stored ? JSON.parse(stored) : {};

                      return `*Tus datos serán enviados a los concesionarios autorizados de Toyota Colombia. Al clickear el botón ENVIAR, estarás certificando que eres mayor de 18 años y que has leído y estás de acuerdo con los Términos de servicios y Política de privacidad.`;
                    })()}
                  </Text>
                </Flex>
              </View>

              <Text
                color={"#373948"}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontSize={{ base: "0.5625rem", xl: "0.75rem" }}
                fontWeight={400}
                lineHeight={"normal"}
                textAlign={{ xl: "center" }}
                padding={{ base: "2.5rem 0", xl: "4.19rem 1.5625rem 4.13rem" }}
              >
                {(() => {
                  const dates = getCurrentMonthDates();
                  const stored = localStorage.getItem(
                    "toyota_dealer_selection"
                  );
                  const selection = stored ? JSON.parse(stored) : {};

                  return `*Precio sugerido al público por los Concesionario Toyota a nivel nacional, vigente desde el ${dates.start} hasta el ${dates.end}. Estos valores incluyen impuestos aplicables de acuerdo con el tipo de vehículo y el mantenimiento planeado Toyota. Los precios pueden variar según el concesionario de la Red Autorizada escogido.`;
                })()}
              </Text>
            </View>
          </Grid>
        </Container>
      </View>
    </View>
  );
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

function mapColorItemToColorOption(
  colorItem: {
    color: { name: string };
    gallery: {
      galleryAssets: {
        items: {
          name: string;
          params: any;
          type: any;
          url: string;
        }[];
      };
    };
  },
  colorIndex: number
): ColorOption {
  return {
    id: colorItem.color.name,
    iconPath: `/images/vehicle-colors/hd/${colorItem.color.name
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .toLowerCase()}.png`,
    imagePath:
      colorItem.gallery?.galleryAssets?.items.map((asset) => asset.url) || [],
    name: colorItem.color.name,
    priority: colorIndex,
  };
}

// Add this function at the top level of your file to format dates
function getCurrentMonthDates() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    start: firstDay.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    end: lastDay.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  };
}

// Add this function at the top level
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
