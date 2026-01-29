"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ContactForm.module.scss";
import { useEffect, useRef } from "react";
import { CotizadorSelect } from "@/app/cotizador/[slug]/components/CotizadorSelect";
import {
  CityInterface,
  OfficeInterface,
} from "@/app/cotizador/[slug]/CotizadorClient";
import { listOfficesByCity } from "@/graphql/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Office } from "@/types/concessionaire";
import { generateClient } from "aws-amplify/api";
import axios from "axios";
import { VersionSelect } from "./VersionSelect";
import { Text, View } from "@aws-amplify/ui-react";
import CitySelectInput from "./CityDropdown";

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

type ContactFormProps = {
  setIsOpen: (value: boolean) => void;
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
  tipoVehiculo?: "nuevo" | "usado"; // Vehicle type
  placa?: string; // License plate
  marca?: string; // Brand (optional for 'nuevo', fixed to Toyota)
  modelo?: string; // Model
  anio?: number;
  ref?: string; // Year
  [key: string]: any;
}
const initialFormState: any = {
  placa: "",
  marca: "",
  linea: "",
  use_type: "",
  modelo: "",
  tipoPlaca: "",
  valorAccesorios: "",
  precioVehiculo: "",
  tipoUso: "",
  // ciudad: "",
  ciudadCirculacion: "",
  tipoDocumento: "",
  numeroDocumento: "",
  nombre: "",
  apellido: "",
  fechaNacimiento: "",
  genero: "",
  nacionalidad: "",
  ocupacion: "",
  estadoCivil: "",
  telefono: "",
  correo: "",
  ref: "",
  terminos: false,
  autorizacion: false,
};

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
export default function ContactForm1({ setIsOpen }: ContactFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const client = generateClient();

  const ref = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<CityInterface | any>(null);
  const [selectedOffice, setSelectedOffice] = useState<OfficeInterface | any>(
    null
  );
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [citiesOptions, setCitiesOptions] = useState<
    { value: string; label: string; externalId?: string }[]
  >([]);
  const [isMobile, setIsMobile] = useState(false);
  const [concessionaireOptions, setConcessionaireOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [formValues, setFormValues] =
    useState<CotizadorFormData>(initialFormState);
  const [searchTerm, setSearchTerm] = useState("");

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [model, setModel] = useState<
    CotizadorVehicle["models"]["items"][number] | null
  >(null);
  const [allOffices, setAllOffices] = useState<Office[]>([]);
  const [formCity, setFormCity] = useState<string>("");
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [isToyotaVehicle, setIsToyotaVehicle] = useState<boolean | null>(null);
  const [vehicleSelected, setVehicleSelected] = useState(false);

  const CityOffice = [
    {
      Ciudad: "BOGOTÁ, D.C.",
      Concesionario: "DISTOYOTA CALLE 102",
      SalaDeVentas: "DTS Cll 102",
      Tenant: "dtscll102.co.agentemotor.com",
      IdentificadorApiKey: "dtscalle102",
      Contrasena: `h]\"7n=B&%:-;-1r{m|}Qjw783R/3V\\1v`,
      Type: "Privada",
      externalId: "11001",
    },
    {
      Ciudad: "BOGOTÁ, D.C.",
      Concesionario: "TOYONORTE CALLE 127",
      SalaDeVentas: "Toyonorte",
      Tenant: "toyonorte.co.agentemotor.com",
      IdentificadorApiKey: "toyonorte",
      Contrasena: "i-f9Rpr{yq5OY}\\qW)W$\\#D-[C]M1y7#",
      Type: "Privada",
      externalId: "11001",
    },
    {
      Ciudad: "BOGOTÁ, D.C.",
      Concesionario: "YOKOMOTOR 72",
      SalaDeVentas: "Yokomotor 72",
      Tenant: "yokomotor72.co.agentemotor.com",
      IdentificadorApiKey: "ycalle72",
      Contrasena: "5CYK:<k!$;hhRa*~6^(2Z*(dV-0XB=I}",
      Type: "Privada",
      externalId: "11001",
    },
    {
      Ciudad: "BOGOTÁ, D.C.",
      Concesionario: "YOKOMOTOR 173",
      SalaDeVentas: "Yokomotor 134",
      Tenant: "yokomotor134.co.agentemotor.com",
      IdentificadorApiKey: "ycalle134",
      Contrasena: "9VQd1wseS4p`iY*cClg<q>QPTRE7ydRr",
      Type: "Privada",
      externalId: "11001",
    },
    {
      Ciudad: "BOGOTÁ, D.C.",
      Concesionario: "CARCO S.A",
      SalaDeVentas: "Carco",
      Tenant: "carco.co.agentemotor.com",
      IdentificadorApiKey: "carco",
      Contrasena: "N7NbSx^?]}$[A?1w<;4In(m;JhiIt$0J",
      Type: "Privada",
      externalId: "11001",
    },
    {
      Ciudad: "BOGOTÁ, D.C.",
      Concesionario: "DISTOYOTA CALLE 150",
      SalaDeVentas: "DTS Cll 150",
      Tenant: "dts150.co.agentemotor.com",
      IdentificadorApiKey: "dts150",
      Contrasena: "pu07fus{Eu8gb7<Z@cs{Xyv{Kmj>JI9A",
      Type: "Privada",
      externalId: "11001",
    },
    {
      Ciudad: "BOGOTÁ, D.C.",
      Concesionario: "DISTOYOTA CALLE 13",
      SalaDeVentas: "DTS Cll 13",
      Tenant: "dts13.co.agentemotor.com",
      IdentificadorApiKey: "dtscalle13",
      Contrasena: "\\)$U4r72I`'rPLYO'q2z{OT\"wp)$HD?Y",
      Type: "Privada",
      externalId: "11001",
    },
    {
      Ciudad: "BOGOTÁ, D.C.",
      Concesionario: "CVI AUTOPISTA",
      SalaDeVentas: "CVI / BOG",
      Tenant: "cvi.co.agentemotor.com",
      IdentificadorApiKey: "cvi",
      Contrasena: "Gu4()EsSIBD{yOII*dlg@1G7jp,h1fYi",
      Type: "Privada",
      externalId: "11001",
    },
    {
      Ciudad: "CHÍA",
      Concesionario: "NOVAMOTORS",
      SalaDeVentas: "Novamotors",
      Tenant: "novamotors.co.agentemotor.com",
      IdentificadorApiKey: "novamotors",
      Contrasena: ".lRDhL2_*(U[6m|UAz7Bx0j-m*t(kWoc",
      Type: "Privada",
      externalId: "25175",
    },
    {
      Ciudad: "MEDELLÍN",
      Concesionario: "TUYOMOTOR INDUSTRIALES",
      SalaDeVentas: "Tuyomotor",
      Tenant: "tuyomotort.co.agentemotor.com",
      IdentificadorApiKey: "tuyomotort",
      Contrasena: "ok:drjV2#ck%QFkHa<75k]^>bMH%J7sv",
      Type: "Privada",
      externalId: "05001",
    },
    {
      Ciudad: "MEDELLÍN",
      Concesionario: "AUTOAMERICA PALACE",
      SalaDeVentas: "Autoamérica Palacé",
      Tenant: "autoamericapalace.co.agentemotor.com",
      IdentificadorApiKey: "autoamericapa",
      Contrasena: "%b1OQ/jvs1LC_dv[@mO$<A2$P]0F9X|^",
      Type: "Privada",
      externalId: "05001",
    },
    {
      Ciudad: "MEDELLÍN",
      Concesionario: "YOKOMOTOR GUAYABAL",
      SalaDeVentas: "Yokomotor Guayabal",
      Tenant: "yokoguayabal.co.agentemotor.com",
      IdentificadorApiKey: "yguayabal",
      Contrasena: "yg+rpBF*&8)/:-t454^1`CgtXy+I`;z'",
      Type: "Privada",
      externalId: "05001",
    },
    {
      Ciudad: "MEDELLÍN",
      Concesionario: "AUTOAMERICA ENVIGADO",
      SalaDeVentas: "Autoamérica Sur",
      Tenant: "autoamericasur.co.agentemotor.com",
      IdentificadorApiKey: "autoamericas",
      Contrasena: "4i8er3A?KcN8Ny?:2G,b|J)XEy|)L2T7",
      Type: "Privada",
      externalId: "05001",
    },
    {
      Ciudad: "MEDELLÍN",
      Concesionario: "YOKOMOTOR PALACE",
      SalaDeVentas: "Yokomotor Palace",
      Tenant: "yokomotorpalace.co.agentemotor.com",
      IdentificadorApiKey: "ypalace",
      Contrasena: 'p]T"8sy`i10NwbyM/o|aH\'O"rtv3YwKj',
      Type: "Privada",
      externalId: "05001",
    },
    {
      Ciudad: "MEDELLÍN",
      Concesionario: "YOKOMOTOR EL TESORO",
      SalaDeVentas: "Yokomotor El Tesoro",
      Tenant: "yokomotoreltesoro.co.agentemotor.com",
      IdentificadorApiKey: "yeltesoro",
      Contrasena: "Ag0v8#r{>(6ZgiBlfmG`Cr=nPD~1zE,n",
      Type: "Privada",
      externalId: "05001",
    },
    {
      Ciudad: "MEDELLÍN",
      Concesionario: "AUTOAMERICA APARTADO",
      SalaDeVentas: "Autoamérica Apartadó",
      Tenant: "autoamericapartado.co.agentemotor.com",
      IdentificadorApiKey: "autoamericaap",
      Contrasena: 'DOLFVE0AkmH"jqZ"w-?HCej=0~um-5i5',
      Type: "Privada",
      externalId: "05001",
    },
    {
      Ciudad: "CÚCUTA",
      Concesionario: "CUCUTA MOTORS - CUCUTA",
      SalaDeVentas: "Cucuta Motors",
      Tenant: "cucutamotors.co.agentemotor.com",
      IdentificadorApiKey: "cucutamotors",
      Contrasena: "Z6NXknp?qcj,Hq~=l5_22cKZv2H'-CmQ",
      Type: "Privada",
      externalId: "54001",
    },
    {
      Ciudad: "VILLAVICENCIO",
      Concesionario: "VEHICULOS DEL LLANO SAS",
      SalaDeVentas: "Vehillanos",
      Tenant: "vehillanos.co.agentemotor.com",
      IdentificadorApiKey: "vehillanos",
      Contrasena: "q\\']8QH)M*Z[N&iO2aA_E+1wq5<h`~\"_",
      Type: "Privada",
      externalId: "50001",
    },
    {
      Ciudad: "BUCARAMANGA",
      Concesionario: "DISTOYOTA BUCARAMANGA - CRA 27",
      SalaDeVentas: "DTS Bucaramanga",
      Tenant: "dtsbucaramanga.co.agentemotor.com",
      IdentificadorApiKey: "dtsbmanga",
      Contrasena: '>RhK.Q"]z/^+ROT8\\N.#HiQu265C{;lV',
      Type: "Privada",
      externalId: "68001",
    },
    {
      Ciudad: "IBAGUÉ",
      Concesionario: "DISTOYOTA IBAGUE",
      SalaDeVentas: "DTS Ibagué",
      Tenant: "dtsibague.co.agentemotor.com",
      IdentificadorApiKey: "dtsibague",
      Contrasena: 'pQ[\\F5053GF.R]FqvA44y#K;;4E6"Bqr',
      Type: "Privada",
      externalId: "73001",
    },
    {
      Ciudad: "NEIVA",
      Concesionario: "DISTOYOTA NEIVA",
      SalaDeVentas: "DTS Neiva",
      Tenant: "dtsneiva.co.agentemotor.com",
      IdentificadorApiKey: "dtsneiva",
      Contrasena: "ZBXTCtHb6l(!l081_T/\\t=uP*:@sPZ_,",
      Type: "Privada",
      externalId: "NEIVA",
    },
    {
      Ciudad: "TUNJA",
      Concesionario: "ALBORAUTOS TUNJA",
      SalaDeVentas: "Alborautos Tunja",
      Tenant: "alborautostunja.co.agentemotor.com",
      IdentificadorApiKey: "alborautost",
      Contrasena: "IK5TH8#rj`,8P{Fe*GY]y1&#7CQ~477g",
      Type: "Privada",
      externalId: "15001",
    },
    {
      Ciudad: "BARRANCABERMEJA",
      Concesionario: "SANAUTOS MOTOR SA",
      SalaDeVentas: "Sanautos Motor",
      Tenant: "sanautosmotor.co.agentemotor.com",
      IdentificadorApiKey: "sanautosm",
      Contrasena: "Ua%vnNKf3eE);gZ1*HPOjn:jTUaI%05W",
      Type: "Privada",
      externalId: "68081",
    },
    {
      Ciudad: "YOPAL",
      Concesionario: "ALBORAUTOS YOPAL",
      SalaDeVentas: "Alborautos Yopal",
      Tenant: "alborautosyopal.co.agentemotor.com",
      IdentificadorApiKey: "aborautosy",
      Contrasena: "}]fb}|GvWhs3)'1=_,t7v]\"BC*KDdo8%",
      Type: "Privada",
      externalId: "85001",
    },
    {
      Ciudad: "LA DORADA",
      Concesionario: "DISTOYOTA LA DORADA",
      SalaDeVentas: "DTS Dorada",
      Tenant: "dtsdorada.co.agentemotor.com",
      IdentificadorApiKey: "dtsdorada",
      Contrasena: "*19f10piqE!?{UPnDE`'(QZyKtRTmJb%",
      Type: "Privada",
      externalId: "17380",
    },
    {
      Ciudad: "CALI",
      Concesionario: "AUTOMOTORA NORTE Y SUR - SUR",
      SalaDeVentas: "Automotora Norte y Sur",
      Tenant: "autonorteysur.co.agentemotor.com",
      IdentificadorApiKey: "autonortes",
      Contrasena: '}s)\\)4q"8C"T60B1pv+z?5${.)igO\'s[',
      Type: "Privada",
      externalId: "76001",
    },
    {
      Ciudad: "CALI",
      Concesionario: "AUTOMOTORA NORTE Y SUR - NORTE",
      SalaDeVentas: "Automotora Norte y Sur - Norte",
      Tenant: "autonorteysurnorte.co.agentemotor.com",
      IdentificadorApiKey: "autonsn",
      Contrasena: "~6BrG`GB#\\03Alg`WzIP9?PiA\\QqQ*gf",
      Type: "Privada",
      externalId: "76001",
    },
    {
      Ciudad: "CALI",
      Concesionario: "AGRICOLA AUTOMOTRIZ CALI",
      SalaDeVentas: "Agrícola Automotriz",
      Tenant: "agricolautom.co.agentemotor.com",
      IdentificadorApiKey: "agricolauto",
      Contrasena: "azr*J5E(U<dTk[6ij;auA7r()pf7iM~.",
      Type: "Privada",
      externalId: "76001",
    },
    {
      Ciudad: "TULUÁ",
      Concesionario: "AGRICOLA AUTOMOTRIZ TULUA",
      SalaDeVentas: "Agrícola Automotriz Tulua",
      Tenant: "agriautomtulua.co.agentemotor.com",
      IdentificadorApiKey: "agricolatulua",
      Contrasena: "5SynmJEo:!#<5;Y5Zb|F8D%ckBex*Xq/",
      Type: "Privada",
      externalId: "76834",
    },
    {
      Ciudad: "MANIZALES",
      Concesionario: "VEHICULOS DE CALDAS S.A. - VEHICALDAS S.A.",
      SalaDeVentas: "Vehicaldas",
      Tenant: "vehicaldas.co.agentemotor.com",
      IdentificadorApiKey: "vehicaldas",
      Contrasena: "rtEi0+Y(BmgT0)wI$$`&k28su0>J4z%)",
      Type: "Privada",
      externalId: "17001",
    },
    {
      Ciudad: "PEREIRA",
      Concesionario: "AUTOMOTORA DE OCCIDENTE S.A.",
      SalaDeVentas: "Automotora de Occidente",
      Tenant: "automoccidente.co.agentemotor.com",
      IdentificadorApiKey: "autoccidente",
      Contrasena: "f<Mi|{n>vW-Xe[<fVu/42`4<?0=Lhuhg",
      Type: "Privada",
      externalId: "66001",
    },
    {
      Ciudad: "PEREIRA",
      Concesionario: "VEHICULOS DEL CAFE S.A.",
      SalaDeVentas: "Vehicafé",
      Tenant: "vehicafe.co.agentemotor.com",
      IdentificadorApiKey: "vehicafe",
      Contrasena: 'e+07"`zpX}1F^Qfo^l?xJ*P@@d*^a98E',
      Type: "Privada",
      externalId: "66001",
    },
    {
      Ciudad: "PASTO",
      Concesionario: "DISTOYOTA PASTO",
      SalaDeVentas: "DTS Pasto",
      Tenant: "dtspasto.co.agentemotor.com",
      IdentificadorApiKey: "dtspasto",
      Contrasena: "G\\ieG(2~.7'1T\"C+uj\\Z`U@W|-h~.7XN",
      Type: "Privada",
      externalId: "52001",
    },
    {
      Ciudad: "ARMENIA",
      Concesionario: "AUTOCORDILLERA S.A",
      SalaDeVentas: "Autocordillera",
      Tenant: "autocordillera.co.agentemotor.com",
      IdentificadorApiKey: "cordillera",
      Contrasena: "m5GU;W1|L\\Q1l{z%~dN4NS<LQ?/#^wFq",
      Type: "Privada",
      externalId: "63001",
    },
    {
      Ciudad: "CARTAGENA",
      Concesionario: "JUANAUTOS EL CERRO S.A",
      SalaDeVentas: "Juanautos El Cerro",
      Tenant: "juanautos.co.agentemotor.com",
      IdentificadorApiKey: "juanautos",
      Contrasena: "28YM-{tF+yI=4W!(RH32rVl-H)wH^I,O",
      Type: "Privada",
      externalId: "13001",
    },
    {
      "Ciudad": "BARRANQUILLA",
      "Concesionario": "AUTOTROPICAL CALLE 77",
      "SalaDeVentas": "Autotropical calle 77",
      "Tenant": "autotrobquillaprincipal.co.agentemotor.com",
      "IdentificadorApiKey": "autotrobquillaprinc",
      "Contrasena": `{6TlUP:yf]x=T2\`)zk5\pF<E)31?@CQ`,
      "Type": "Privada",
      "externalId": "08001"
    },
    {
      Ciudad: "BARRANQUILLA",
      Concesionario: "AUTOMERCANTIL DEL CARIBE - CIRCUNVALAR",
      SalaDeVentas: "Automercantil del Caribe",
      Tenant: "automercaribe.co.agentemotor.com",
      IdentificadorApiKey: "mercaribe",
      Contrasena: "Ay>aE<Z;.Ho;(*4!f`L3J33E8X48mF;S",
      Type: "Privada",
      externalId: "08001",
    },
    {
      Ciudad: "MONTERIA",
      Concesionario: "AUTO ROBLE MONTERIA",
      SalaDeVentas: "Auto Roble Monteria",
      Tenant: "autoroblemon.co.agentemotor.com",
      IdentificadorApiKey: "roblemon",
      Contrasena: '9@fe@*RHfAXq8/*2McfQ-\\bQ4EXly^"w',
      Type: "Privada",
      externalId: "23001",
    },

    {
      Ciudad: "SINCELEJO",
      Concesionario: "AUTO ROBLE SINCELEJO",
      SalaDeVentas: "Auto Roble Sincelejo",
      Tenant: "autorosince.co.agentemotor.com",
      IdentificadorApiKey: "roblesince",
      Contrasena: "3Y&-xK^)gZ#3-NZjS*v;^4f~>(AC9G8,",
      Type: "Privada",
      externalId: "70001",
    },
    {
      Ciudad: "RIOACHA",
      Concesionario: "AUTOTROPICAL RIOHACHA",
      SalaDeVentas: "Autotropical Riohacha",
      Tenant: "autrotroriohacha.co.agentemotor.com",
      IdentificadorApiKey: "topiriohacha",
      Contrasena: "n^e5OKF{3r5w/5m7PW5*Lg1jm*0?=_/b",
      Type: "Privada",
      externalId: "0",
    },
    {
      Ciudad: "SANTA MARTA",
      Concesionario: "AUTOTROPICAL S.A.S. STA MARTA",
      SalaDeVentas: "Autotropical Santa Marta",
      Tenant: "autotropsama.co.agentemotor.com",
      IdentificadorApiKey: "tropisama",
      Contrasena: '9?y%4FKldgr"w4lw!\\G+U<5(#.^PR~~c',
      Type: "Privada",
      externalId: "47001",
    },
    {
      Ciudad: "VALLEDUPAR",
      Concesionario: "AUTOTROPICAL S.A.S. V/DUPAR",
      SalaDeVentas: "Autotropical Valledupar",
      Tenant: "autotrovdupar.co.agentemotor.com",
      IdentificadorApiKey: "tropivalle",
      Contrasena: '%$"+n~iVgL@1kf3)tFc&z*j<d<4P)5mP',
      Type: "Privada",
      externalId: "20001",
    },
    {
      Ciudad: "BARRANQUILLA",
      Concesionario: "AUTOTROPICAL CRA 52",
      SalaDeVentas: "Autotropical Barranquilla",
      Tenant: "autotrobquilla.co.agentemotor.com",
      IdentificadorApiKey: "tropibquilla",
      Contrasena: "YWI&>80J<olJnn>HLqxL9u30W/Ce,^c4",
      Type: "Privada",
      externalId: "08001",
    },
  ];

  // useEffect(() => {

  //   // Only run if both city and office are selected
  //   if (selectedCity && selectedOffice) {
  //     const cityName = selectedCity.name || "";;
  //     const officeName = selectedOffice.label || "";;
  //     const creds = getCredentials(cityName, officeName);

  //     if (officeName !== "" && officeName !== undefined && !creds) {
  //       alert("No credentials found for selected city/office");
  //       console.error("No credentials found for selected city/office");
  //       return;
  //     }

  //     const login = async () => {
  //       const raw = JSON.stringify({
  //         Ciudad: creds?.Ciudad,
  //         Concesionario: creds?.Concesionario,
  //         externalId: creds?.externalId
  //       });
  //       const apiToken = 'Bearer ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL'

  //       try {
  //         const response = await fetch(
  //           "https://9ztgbiqeyi.execute-api.us-east-2.amazonaws.com/prod/getDealershipCred",
  //           {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json", "Authorization": `${apiToken}`, },
  //             body: raw,
  //             redirect: "follow"
  //           }
  //         );
  //         const result = await response.json();
  //         if (result.token.access_token) {
  //           setAccessToken(result.token.access_token);
  //         } else {
  //           console.error("No access token received");
  //         }
  //       } catch (error) {
  //         console.error("Login error:", error);
  //       }
  //     };

  //     login();
  //   }
  // }, [selectedOffice]);

  const steps = [
    { label: `Selecciona tu </br> concesionario` },
    { label: `Tipo </br> vehículo` },
    { label: `Confirma tu </br>vehículo` },
    { label: `Tipo de uso </br> de tu vehículo` },
    { label: `Propietario </br> vehículo` },
    { label: `Información </br>de contacto` },
  ];

  const [formData, setFormData] = useState({
    placa: "",
    marca: "",
    linea: "",
    use_type: "",
    modelo: "",
    tipoPlaca: "",
    valorAccesorios: "",
    precioVehiculo: "",
    tipoUso: "",
    // ciudad: "",
    ciudadCirculacion: "",
    tipoDocumento: "",
    numeroDocumento: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    genero: "",
    nacionalidad: "",
    ocupacion: "",
    estadoCivil: "",
    telefono: "",
    correo: "",
    terminos: false,
    autorizacion: false,
  });

  const handleInputChange = (
    field: keyof CotizadorFormData,
    value: string | boolean
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    const isValid = validateField(field, value);

    if (isValid) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleNextStep = async (selectedVehicle?: any) => {
    // Ignore event if called by button click without argument
    if (selectedVehicle?.nativeEvent) selectedVehicle = undefined;

    // prevent next step if brand is not TOYOTA for "usado" vehicles
    if (
      currentStep === 2 &&
      formValues.tipoVehiculo === "usado" &&
      isToyotaVehicle === false
    ) {
      return; // stop here
    }
    // Step 3: check for selected vehicle
    const vehicleForValidation =
      currentStep === 3
        ? vehicleSelected
          ? vehicleData?.selectedVersion
          : null
        : undefined;

    // if (currentStep === 3 && !vehicleForValidation) {
    //   setFormErrors({ vehicle: "Debes seleccionar un vehículo para continuar" });
    //   return;
    // }

    if (validateStep(currentStep, vehicleForValidation)) {
      if (currentStep === 7) {
        try {
          setIsLoading(true);
          const isNew = formValues.tipoVehiculo === "nuevo";

          const cityName = selectedCity.name || "";
          const officeName = selectedOffice.label || "";
          const creds: any = getCredentials(cityName, officeName);

          // Build the quotation data
          const quoteData = {
            name: "event-create-quote",
            tenant_data: {
              name: creds.Tenant,
            },
            callback: {
              url_callback: "https://callback.agencia-backend.com",
              callback_param: "xxxxxxxx",
              channel_name: "channel-name1001@agencia.co.agentemotor.com",
            },
            data: {
              business_line: "vehiculos",
              insurable_objects: [
                {
                  type: "vehicle",
                  vehicle: {
                    plate: formValues.placa,
                    codification: {
                      code: vehicleData.selectedVersion.code || "",
                      code_cf: vehicleData?.selectedVersion?.codeCf || "",
                    },
                    ...(isNew && {
                      model: vehicleData.selectedVersion?.model || "",
                    }),

                    vehicle_risk: {
                      accesories_price: formValues.valorAccesorios || "0",
                      in_agency:
                        formValues.tipoVehiculo === "nuevo" ? true : false,
                      plate_type: formValues.tipoPlaca,
                      use_type: formValues.use_type,
                      protection_type: "alarma",
                      reference_price:
                        parseFloat(
                          vehicleData.selectedVersion.referencePrice
                        ) || 0,
                      commercial_price:
                        parseFloat(
                          vehicleData.selectedVersion.commercial_price
                        ) || 0,
                    },
                  },
                },
              ],
              parties: [
                {
                  party_rol: "Asegurado",
                  party_type: "person",
                  person: {
                    identification_type: formValues.tipoDocumento,
                    identification_number: formValues.numeroDocumento,
                    firstname: formValues.nombre,
                    lastname: formValues.apellido,
                    gender: formValues.genero,
                    birht_date: formValues.fechaNacimiento,
                    occupation: "Profesional Dependiente",
                    educational_level: "primary",
                    marital_status: "single",
                    contact_data: [
                      {
                        contact_info: {
                          email: formValues.correo || "",
                          phone: formValues.telefono || "",
                        },
                        contact_tag: "contact",
                      },
                    ],
                  },
                },
              ],
              ubication: {
                place: {
                  city_code: formValues.ciudadCirculacion,
                  country_code: formValues.nacionalidad || "NA",
                },
              },
            },
          };

          // ✅ Wrap everything into the structure your Lambda expects
          const body = {
            payload: {
              Ciudad: creds?.Ciudad,
              Concesionario: creds?.Concesionario,
              externalId: creds?.externalId,
              nextID:
                "ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL", // ← you can make this dynamic if needed
              quoteData,
            },
          };

          // ✅ Send request to your deployed API Gateway endpoint
          const response = await fetch(
            "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/getDealershipQuotation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || "API error");
          }

          router.push("/cotiza-tu-toyota/seguros-toyota-formulario");
        } catch (error: any) {
          console.error("Error submitting quotation:", error);
          alert(
            error.message ||
            "Hubo un error al enviar la información. Por favor, inténtalo de nuevo."
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const validateStep = (step: number, vehicleForValidation?: any): boolean => {
    const newErrors: Record<string, string> = {};
    const fieldsToValidate: (keyof CotizadorFormData)[] = [];
    switch (step) {
      case 1:
        fieldsToValidate.push("ciudad", "concesionario");
        break;
      case 2:
        fieldsToValidate.push("tipoVehiculo");
        if (formValues.tipoVehiculo === "usado") fieldsToValidate.push("placa");
        if (formValues.tipoVehiculo === "nuevo")
          fieldsToValidate.push("modelo", "version");
        break;
      // case 3:
      //   if (!vehicleForValidation) {
      //     newErrors.vehicle = "Debes seleccionar un vehículo para continuar";
      //   }
      //   break;
      case 4:
        fieldsToValidate.push(
          "tipoPlaca",
          "valorAccesorios",
          // "precioVehiculo",
          "use_type",
          "ciudadCirculacion"
        );
        break;
      case 5:
        fieldsToValidate.push(
          "tipoDocumento",
          "nombre",
          "apellido",
          "fechaNacimiento",
          "numeroDocumento",
          "genero"
        );
        // Include nacionalidad only if tipoDocumento is "ce" or "passport"
        if (["ce", "passport"].includes(formValues.tipoDocumento)) {
          fieldsToValidate.push("nacionalidad");
        }
        break;
      case 6:
        fieldsToValidate.push("telefono", "correo", "terminos", "autorizacion");
        break;
    }

    fieldsToValidate.forEach((field) => {
      const isValid = validateField(field, formValues[field]);
      if (!isValid)
        newErrors[field] = formErrors[field] || "Este campo es requerido";
    });

    setFormErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    return Object.keys(newErrors).length === 0;
  };
  const handlePrevStep = () => {
    setErrors({});
    if (currentStep === 3) {
      setVehicleData(null); // ✅ Clear all vehicle info
      setFormValues((prev) => ({
        ...prev,
        modelo: "", // ✅ Clear year/model
        version: "", // ✅ Clear selected version
      }));
    }

    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  const closeModal = () => setIsOpen(false);
  //  const { data, isLoading, isError } = useQuery({
  //     queryKey: ["vehicle"],
  //     queryFn: slug ? () => fetchVehicle(slug) : undefined,
  //     enabled: !!slug,
  //   });

  const countries = [
    { code: "AR", name: "Argentina" },
    { code: "AU", name: "Australia" },
    { code: "BR", name: "Brasil" },
    { code: "CA", name: "Canadá" },
    { code: "CL", name: "Chile" },
    { code: "CO", name: "Colombia" },
    { code: "CR", name: "Costa Rica" },
    { code: "CU", name: "Cuba" },
    { code: "EC", name: "Ecuador" },
    { code: "SV", name: "El Salvador" },
    { code: "ES", name: "España" },
    { code: "US", name: "Estados Unidos" },
    { code: "GT", name: "Guatemala" },
    { code: "HN", name: "Honduras" },
    { code: "IN", name: "India" },
    { code: "IT", name: "Italia" },
    { code: "JP", name: "Japón" },
    { code: "MX", name: "México" },
    { code: "NI", name: "Nicaragua" },
    { code: "PA", name: "Panamá" },
    { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Perú" },
    { code: "PT", name: "Portugal" },
    { code: "UY", name: "Uruguay" },
    { code: "VE", name: "Venezuela" },
    { code: "GB", name: "Reino Unido" },
    { code: "DE", name: "Alemania" },
    { code: "FR", name: "Francia" },
    { code: "CN", name: "China" },
    { code: "KR", name: "Corea del Sur" },
    { code: "RU", name: "Rusia" },
    { code: "ZA", name: "Sudáfrica" },
    { code: "AE", name: "Emiratos Árabes Unidos" },
  ];

  useEffect(() => {
    // Create a map to store unique cities
    const uniqueCityMap = new Map();

    CityOffice.forEach((item) => {
      const city = item.Ciudad;
      const externalId = item.externalId;

      // Only add if this city hasn't been added yet
      if (!uniqueCityMap.has(city)) {
        uniqueCityMap.set(city, {
          label: city,
          value: city, // Can change later to ID if needed
          externalId: externalId || "", // attach externalId
        });
      }
    });

    const uniqueCities = Array.from(uniqueCityMap.values());

    setCitiesOptions(
      uniqueCities.sort((a, b) =>
        a.label.localeCompare(b.label, "es", { sensitivity: "base" })
      )
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust breakpoint
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!formCity) {
      setConcessionaireOptions([]);
      setSelectedOffice(null);
      return;
    }

    // Filter dealers from your local CityOffice array
    const filteredDealers = CityOffice.filter(
      (item) => item.Ciudad === formCity
    ).map((office) => ({
      label: office.Concesionario,
      value: office.Concesionario, // Could be office.IdentificadorApiKey later
      externalId: office.IdentificadorApiKey, // ✅ This will work when externalId is added
    }));

    // Remove duplicates if necessary
    const uniqueDealers = Array.from(
      new Map(filteredDealers.map((item) => [item.label, item])).values()
    );

    setConcessionaireOptions(uniqueDealers);
  }, [formCity]);

  const normalizeCityOffice = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .trim();

  const getCredentials = (cityName: string, officeName: string) => {
    const normalizeCityOffice = (str: string) =>
      str
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/\s+/g, " ") // collapse spaces
        .trim();

    const normCity = normalizeCityOffice(cityName);
    const normOffice = normalizeCityOffice(officeName);

    const result = CityOffice.find((office) => {
      const cityNormalized = normalizeCityOffice(office.Ciudad);
      const concesionarioNormalized = normalizeCityOffice(office.Concesionario);
      const salaNormalized = normalizeCityOffice(office.SalaDeVentas);

      const cityMatch = cityNormalized === normCity;

      const officeMatch =
        salaNormalized.includes(normOffice) ||
        normOffice.includes(salaNormalized) ||
        concesionarioNormalized.includes(normOffice) ||
        normOffice.includes(concesionarioNormalized);

      return cityMatch && officeMatch;
    });

    if (!result) {
      console.warn("⚠️ No credentials found for:", { cityName, officeName });
    } else {
      // do nothing as of now
    }

    return result;
  };

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

      return submitRequests(formData, model, selection, "");
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

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // This function will handle the change in form fields
  const handlevehicleTypeChange = (
    field: keyof typeof formValues,
    value: string | boolean
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Call validation after the field change if it's "placa"
    if (field === "placa") {
      debounceValidatePlaca(value as string);
    }
  };

  // Manual debounce function using setTimeout and clearTimeout
  const debounceValidatePlaca = (placa: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      // Trigger the validation after the delay
      fetchVehicleData(placa);
    }, 1000);
  };

  const validateField = (
    field: keyof CotizadorFormData,
    value: string | boolean
  ) => {
    let error = "";

    if (typeof value === "string" && value.trim() === "") {
      error = "Este campo es requerido";
    }

    switch (field) {
      case "nombre":
      case "apellido":
        if (!error && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value as string)) {
          error = `El ${field} solo debe contener letras`;
        }
        break;
      case "modelo":
        if (!value) {
          error = "Debes seleccionar un modelo";
        }
        break;
      case "ciudad":
        if (!value || value === "") {
          error = "Debes seleccionar una ciudad";
        }
        break;
      case "concesionario":
        if (!value || value === "") {
          error = "Debes seleccionar un concesionario";
        }
        break;
      case "placa":
        if (!value) {
          error = "Debes ingresar la placa del vehículo";
        } else if (!/^[A-Z0-9]{5,7}$/i.test(value as string)) {
          error = "La placa debe tener un formato válido (Ej: ABC123)";
        } else if ((value as string).length > 7) {
          error = "La placa no puede tener más de 7 caracteres";
        }
        break;
      case "version":
        if (!value) {
          error = "Debes seleccionar una versión del vehículo";
        }
        break;
      case "tipoVehiculo":
        if (field === "tipoVehiculo" && !value) {
          error = "Debes seleccionar un tipo de vehículo";
        }
        break;
      case "tipoPlaca":
        if (!value) error = "Debes seleccionar un tipo de placa";
        break;

      case "valorAccesorios":
        if (!value) error = "Debes ingresar el valor de los accesorios";
        else if (Number(value) < 0) error = "El valor no puede ser negativo";
        break;

      // case "precioVehiculo":
      //   if (!value) error = "El precio del vehículo es obligatorio";
      //   break;

      case "use_type":
        if (!value) error = "Debes seleccionar el tipo de uso del vehículo";
        break;

      case "ciudadCirculacion":
        if (!value) error = "Debes seleccionar una ciudad de circulación";
        break;
      case "numeroDocumento":
        if (!value) {
          error = "Debes ingresar tu número de documento";
        } else {
          // Allow letters only if tipoDocumento = PASSPORT
          const tipoDocumento = formValues.tipoDocumento; // ensure you have access to this
          if (tipoDocumento !== "PA" && !/^\d+$/.test(value as string)) {
            error = "El número de documento debe ser numérico";
          } else if (
            tipoDocumento === "PA" &&
            !/^[A-Za-z0-9]+$/.test(value as string)
          ) {
            error =
              "El número de pasaporte debe contener solo letras o números";
          }
        }
        break;

      case "email":
        if (!error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
          error = "El correo debe tener un formato válido";
        }
        break;

      case "telefono":
        if (!value) {
          error = "Debes ingresar un número de celular";
        } else if (!/^\d+$/.test(value as string)) {
          error = "El teléfono debe contener solo números";
        } else if (
          (value as string).length < 8 ||
          (value as string).length > 15
        ) {
          error = "El número de celular debe tener entre 8 y 15 dígitos";
        }
        break;

      case "celular":
        if (!error && !/^\d+$/.test(value as string)) {
          error = "El teléfono debe contener solo números";
        }
        break;

      case "terminos":
        if (value !== true) error = "Debes aceptar los términos y condiciones";
        break;

      case "autorizacion":
        if (value !== true)
          error = "Debes autorizar el tratamiento de tus datos personales";
        break;

      case "nombre":
      case "apellido":
        if (!error && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value as string)) {
          error = `El ${field} solo debe contener letras`;
        }
        break;
      case "tipoDocumento":
        if (!value) error = "Debes seleccionar un tipo de documento";
        break;
      case "fechaNacimiento":
        if (!value) error = "Debes ingresar tu fecha de nacimiento";
        break;
      case "numeroDocumento":
        if (!error && !/^\d+$/.test(value as string)) {
          error = "El número de documento debe ser numérico";
        }
        break;
      case "nacionalidad":
        if (["ce", "passport"].includes(formValues.tipoDocumento) && !value) {
          error = "Debes seleccionar tu nacionalidad";
        }
        break;
      case "genero":
        if (!value) error = "Debes seleccionar un género";
        break;
      case "celular":
        if (!error && !/^\d+$/.test(value as string)) {
          error = "El teléfono debe contener solo números";
        }
        break;
      case "correo":
        if (!error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
          error = "El correo debe tener un formato válido";
        }
        break;
      case "terminos":
        if (value !== true) error = "Debes aceptar los términos y condiciones";
        break;
      case "autorizacion":
        if (value !== true)
          error = "Debes autorizar el tratamiento de tus datos personales";
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));

    return error === "";
  };

  useEffect(() => {
    if (vehicleData?.selectedVersion?.referencePrice) {
      handleInputChange(
        "precioVehiculo",
        vehicleData.selectedVersion.referencePrice
      );
    }
  }, [vehicleData?.selectedVersion]);

  let labelName;

  switch (currentStep) {
    case 1:
      labelName = "Selecciona tu concesionario";
      break;
    case 2:
      labelName = "Tipo vehículo";
      break;
    case 3:
      labelName = "Confirma tu vehículo";
      break;
    case 4:
      labelName = "Tipo de uso de tu vehículo";
      break;
    case 5:
      labelName = "Propietario vehículo";
      break;
    case 6:
      labelName = "Información de contacto";
      break;
    default:
      labelName = "";
      break;
  }

  const useTypeOptions = [
    { value: "particular", label: "Particular" },
    { value: "cargo_transport_own_goods", label: "Carga - bienes propios" },
    {
      value: "cargo_transport_of_merchandise_third_party",
      label: "Carga - terceros",
    },
    { value: "special_body_cargo", label: "Carrocería especial" },
    { value: "fuel_transport_load", label: "Transporte de combustible" },
    { value: "trailer", label: "Remolque" },
    {
      value: "utility_rental_companies_passengers_merchandise",
      label: "Alquiler de utilitarios",
    },
    {
      value: "utility_urban_transport_own_goods",
      label: "Urbano - bienes propios",
    },
    {
      value: "utility_urban_transport_freight_third_party",
      label: "Urbano - carga terceros",
    },
    { value: "hotel_taxi", label: "Taxi hotelero" },
    { value: "urban_taxi", label: "Taxi urbano" },
    { value: "school_passenger_transport", label: "Escolar" },
    { value: "passenger_crew_transport", label: "Personal / tripulación" },
    { value: "urban_passenger_transport", label: "Pasajeros urbanos" },
    {
      value: "intermunicipal_passenger_transport",
      label: "Pasajeros intermunicipal",
    },
    {
      value: "interdepartmental_passenger_transport",
      label: "Pasajeros interdepartamental",
    },
  ];

  const fetchVehicleData = async (placa: any) => {
    if (!placa) {
      setFormErrors({ placa: "Por favor ingresa una placa." });
      return;
    }

    setIsLoading(true);
    setFormErrors({});
    setIsToyotaVehicle(null);

    // Only run if both city and office are selected
    if (selectedCity && selectedOffice) {
      const cityName = selectedCity.name || "";
      const officeName = selectedOffice.label || "";
      const creds = getCredentials(cityName, officeName);

      if (officeName !== "" && officeName !== undefined && !creds) {
        console.error("No credentials found for selected city/office");
        return;
      }

      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //  Use valid Bearer token
        myHeaders.append(
          "Authorization",
          "Bearer ItSry30SEviCPSmiSu1rvC7XoYexzeiVzxX5Wu6RiuwMmH65y7fCY861W4eo4PtqQSWjf6I3cYt5BUfc2rFtfe82ahsCeLeFr26SCWxzUE82QphsMOukkZP5QSjL"
        );

        //Build request body according to working cURL
        const raw = JSON.stringify({
          Ciudad: creds?.Ciudad,
          Concesionario: creds?.Concesionario,
          externalId: creds?.externalId,
          placa: placa,
        });

        const response = await fetch(
          "https://apvc4zmjfi.execute-api.us-east-2.amazonaws.com/prod/getDealershipUsedVehicle",
          {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          }
        );

        const result = await response.json();

        const brand = result?.data?.data?.vehicle?.brand?.toUpperCase();

        if (brand === "TOYOTA") {
          const vehicle = result.data.data.vehicle;

          setIsToyotaVehicle(true);
          setVehicleData({
            versions: [
              {
                ...vehicle,
                referencePrice: vehicle.vehicle_risk?.reference_price,
                commercial_price: vehicle.vehicle_risk?.commercial_price,
              },
            ],
            selectedVersion: {
              id: vehicle.id ?? "",
              type: vehicle.type,
              line: vehicle.line,
              line2: vehicle.vehicle_codification.line2,
              brand: vehicle.brand,
              model: vehicle.model,
              cylinder: vehicle.codification?.cylinder,
              airBags: vehicle.vehicle_codification?.air_bags,
              codeCf: vehicle.codification?.code_cf,
              code: vehicle.codification?.code,
              referencePrice: vehicle.vehicle_risk?.reference_price,
              commercial_price: vehicle.vehicle_risk?.commercial_price,
            },
          });
          setFormErrors({ ...formErrors, placa: "" });
        } else {
          setIsToyotaVehicle(false);
          setFormErrors({
            ...formErrors,
            placa: `Gracias por tu interés. Por ahora, solo podemos cotizar seguros para vehículos Toyota. 
                Descubre los beneficios de ser parte de nuestra familia y cotiza tu próximo vehículo <a href="/cotiza-tu-toyota/vehiculos-nuevos" style="color: #E50000; text-decoration: underline;">aquí</a>.`,
          });
          setVehicleData(null);
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        setFormErrors({
          placa: "No se pudo validar la placa. Intenta de nuevo.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const cityName = selectedCity?.name || "";
  const officeName = selectedOffice?.label || "";
  const creds = getCredentials(cityName, officeName);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Close Button */}
        <button
          onClick={closeModal}
          className={styles.closeButton}
          type="button"
        >
          <img
            className={styles.closeImage}
            style={{ margin: "8px" }}
            src="/svgs/close-icon-white.svg"
            alt=""
          />
        </button>
        {currentStep !== 7 ? (
          <View marginBottom={{ base: "4.375rem" }}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <Text
                maxWidth={"76.25rem"}
                marginTop={{ base: "", xl: "124px" }}
                fontSize={{ base: "xs", xl: "18px" }}
                fontStyle={"regular"}
                lineHeight={{ base: "100%", xl: "100%" }}
                fontWeight={{ base: "400", xl: "400" }}
                letterSpacing="0px"
                textAlign={{ xl: "center" }}
                margin={"0 auto"}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                }}
                style={{
                  verticalAlign: "middle",
                  color: "white",
                  opacity: "1",
                }}
              >
                Ingresa tus datos para
              </Text>

              <Text
                maxWidth={"76.25rem"}
                marginTop={{ base: "", xl: "10px" }}
                fontSize={{ base: "xs", xl: "32px" }}
                fontStyle={"regular"}
                lineHeight={{ base: "100%", xl: "130%" }}
                fontWeight={{ base: "400", xl: "400" }}
                letterSpacing="0px"
                textAlign={{ xl: "center" }}
                margin={"0 auto"}
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-toyotaDisplay)",
                }}
                style={{
                  verticalAlign: "middle",
                  color: "white",
                  opacity: "1",
                }}
              >
                Cotizar en línea
              </Text>
            </div>

            <div>
              <link
                rel="stylesheet"
                href="https://clientes.agentemotor.com/public_apps/co/web-client-form/static/css/agm_bundle.css"
              />

              <div id="AGMroot" ref={ref}></div>
            </div>

            {/* <div
          id="AGMroot"
          tenant="U2FsdGVkX18Ec6rAl"
          redirect-to="https://dominio.com/comparativo"
          asesor="example@mail.com"
          >
          </div> */}

            {/* Stepper */}
            <div className={styles.stepIndicators}>
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = currentStep > stepNumber;
                const isActive = currentStep === stepNumber;

                return (
                  <div
                    key={index}
                    className={`${styles.stepIndicator} 
                      ${isActive ? styles.active : ""} 
                      ${isCompleted ? styles.completed : ""}`}
                  >
                    <div className={styles.stepNumber}>
                      {isCompleted ? (
                        <img src="/svgs/right-icon-white.svg" alt="Completed" />
                      ) : (
                        <Text
                          fontSize={{ base: "32px", xl: "32px" }}
                          fontStyle="normal"
                          lineHeight={{ base: "100%", xl: "130%" }}
                          fontWeight={{ base: "400", xl: "400" }}
                          letterSpacing="0px"
                          textAlign={{ xl: "center" }}
                          margin="0 auto"
                          fontFamily={{
                            base: "var(--font-ToyotaType-Regular)",
                            xl: "var(--font-toyotaDisplay)",
                          }}
                          style={{
                            marginBlockStart: "0",
                            verticalAlign: "middle",
                            opacity: 1,
                            color: isActive ? "white" : "black",
                          }}
                        >
                          {stepNumber}
                        </Text>
                      )}
                    </div>
                    <Text
                      as="span"
                      className={styles.stepTitle}
                      dangerouslySetInnerHTML={{ __html: step.label }}
                    ></Text>
                  </div>
                );
              })}
            </div>
            <div className={styles.mobileSection}>
              <div className={styles.closeNavs}>
                <button
                  onClick={closeModal}
                  className={styles.closeButtonMobile}
                  type="button"
                >
                  <img
                    className={styles.closeImage}
                    style={{ margin: "8px" }}
                    src="/svgs/close-icon-white.svg"
                    alt=""
                  />
                </button>
              </div>
              <div className={styles.modalHeader}>
                <Text
                  maxWidth={"76.25rem"}
                  marginTop={{ base: "", xl: "124px" }}
                  fontSize={{ base: "10px", xl: "18px" }}
                  fontStyle={"regular"}
                  lineHeight={{ base: "100%", xl: "100%" }}
                  fontWeight={{ base: "400", xl: "400" }}
                  letterSpacing="0px"
                  textAlign={{ xl: "center" }}
                  margin={"0 auto"}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-ToyotaType-Regular)",
                  }}
                  style={{
                    verticalAlign: "middle",
                    color: "white",
                    opacity: "1",
                  }}
                >
                  Ingresa tus datos para
                </Text>

                <Text
                  maxWidth={"76.25rem"}
                  marginTop={{ base: "8px", xl: "10px" }}
                  fontSize={{ base: "14px", xl: "32px" }}
                  fontStyle={"regular"}
                  lineHeight={{ base: "100%", xl: "130%" }}
                  fontWeight={{ base: "400", xl: "400" }}
                  letterSpacing="0px"
                  textAlign={{ xl: "center" }}
                  margin={"0 auto"}
                  fontFamily={{
                    base: "var(--font-ToyotaType-Regular)",
                    xl: "var(--font-toyotaDisplay)",
                  }}
                  style={{
                    verticalAlign: "middle",
                    color: "white",
                    opacity: "1",
                  }}
                >
                  Cotizar en línea
                </Text>
              </div>
              <div className={styles.mobileNav}>
                <div className={styles.mobileLabel}>{labelName}</div>
                <div className={styles.mobileIndicator}>
                  <div className={styles.indicatorNumber}>
                    {currentStep} / <span>6</span>
                  </div>
                  pasos
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className={styles.formContent + " " + styles.mobileResponsive}>
              {currentStep === 1 && (
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <CotizadorSelect
                      label="Ciudad*"
                      placeholder={selectedCity?.name || ""}
                      id="ciudad"
                      value={selectedCity?.name || formValues.ciudad}
                      onChange={(e) => {
                        const value = e.target.value;
                        const cityObj = citiesOptions.find(
                          (c) => c.value === value
                        );
                        if (cityObj) {
                          setSelectedCity({
                            id: cityObj.value,
                            name: cityObj.label,
                            city_code: cityObj.externalId,
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
                      options={[
                        { value: "", label: "Selecciona una ciudad" },
                        ...citiesOptions,
                      ]}
                      errorMessage={formErrors.ciudad}
                    />
                  </div>

                  <div className={styles.formGroup}>
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
                        setSelectedOffice(
                          (officeObj || null) as OfficeInterface | null
                        );
                        handleFieldChange("concesionario", value);
                      }}
                      options={[...concessionaireOptions].sort((a, b) =>
                        a.label.localeCompare(b.label, "es", {
                          sensitivity: "base",
                        })
                      )}
                      errorMessage={formErrors.concesionario}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className={styles.step2Container}>
                    {/* Step 2: Usados / Nuevos Selection */}
                    <div className={styles.formGroup}>
                      <label
                        className={styles.formInputlabel}
                        htmlFor="tipoVehiculo"
                      >
                        Tipo de Vehículo*
                      </label>
                      <select
                        id="tipoVehiculo"
                        value={formValues.tipoVehiculo || ""}
                        onChange={(e) =>
                          handleFieldChange("tipoVehiculo", e.target.value)
                        }
                        className={styles.selectInput}
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "80px",
                          border: "none",
                          color: "#58595B",
                          fontSize: "14px",
                          fontFamily: "var(--font-toyotaDisplay)",
                          padding: "10px 23px",
                          appearance: "none",
                          backgroundImage:
                            "url('/images/icons/arrow--down--grey.svg')",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 18px center",
                          outline: "none",
                          maxWidth: "444px",
                          fontWeight: "400",
                        }}
                      >
                        <option value="" disabled hidden>
                          Vehículo{" "}
                        </option>
                        <option value="nuevo">Nuevo</option>
                        <option value="usado">Usado</option>
                      </select>

                      {formErrors.tipoVehiculo && (
                        <p className={styles.errorMessage_tp}>
                          {formErrors.tipoVehiculo}
                        </p>
                      )}
                    </div>
                    {/* Step 2-2: Usados - License Plate Input */}
                    {formValues.tipoVehiculo === "usado" && (
                      <div className={styles.usadoSection}>
                        <div className={styles.formGroup}>
                          <label
                            className={styles.formInputlabel}
                            htmlFor="placa"
                          >
                            Placa*
                          </label>
                          <input
                            type="text"
                            id="placa"
                            placeholder="Ej: ABC123"
                            value={formValues.placa || ""}
                            onChange={(e) =>
                              handlevehicleTypeChange("placa", e.target.value)
                            }
                            className={styles.inputField}
                            maxLength={7}
                          />

                          {/* {formErrors.placa && (
                              <p className={styles.errorMessage_tp}>{formErrors.placa}</p>
                            )} */}
                        </div>
                      </div>
                    )}

                    {/* Step 2.2 Nuevos - Fields for New Vehicle */}
                    {formValues.tipoVehiculo === "nuevo" && (
                      <div className={styles.nuevoSection}>
                        <div className={styles.formGroup}>
                          <label
                            className={styles.formInputlabel}
                            htmlFor="modelo"
                          >
                            Año modelo*
                          </label>
                          <select
                            id="modelo"
                            value={formValues.modelo || ""}
                            onChange={(e) =>
                              handleFieldChange("modelo", e.target.value)
                            }
                            className={styles.selectInput}
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "80px",
                              border: "none",
                              color: "#58595B",
                              fontSize: "14px",
                              fontFamily: "var(--font-ToyotaDisplay)",
                              padding: "10px 23px",
                              appearance: "none",
                              backgroundImage:
                                "url('/images/icons/arrow--down--grey.svg')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 18px center",
                              outline: "none",
                              maxWidth: "444px",
                            }}
                          >
                            <option value="" disabled hidden>
                              Seleccione modelo
                            </option>
                            {/* <option value="2024">2024</option> */}
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                          </select>

                          {formErrors.modelo && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.modelo}
                            </p>
                          )}
                        </div>

                        <div
                          className={styles.formGroup}
                          style={{ display: "none" }}
                        >
                          <label
                            className={styles.formInputlabel}
                            htmlFor="modelo"
                          >
                            Marca*
                          </label>
                          <select
                            id="tipoVehiculo"
                            value={formValues.modelo || ""}
                            onChange={(e) =>
                              handleFieldChange("modelo", e.target.value)
                            }
                            className={styles.selectInput}
                          >
                            <option value="Toyota" selected>
                              Toyota
                            </option>
                          </select>
                        </div>
                      </div>
                    )}

                    {formValues.tipoVehiculo === "nuevo" && (
                      <div className={styles.nuevoSection}>
                        <div
                          className={styles.formGroup}
                          style={{ display: "none" }}
                        >
                          <label
                            className={styles.formInputlabel}
                            htmlFor="modelo"
                          >
                            Ref*
                          </label>
                          <input
                            type="text"
                            placeholder="Nombre"
                            name="ref"
                            value={formValues.ref || ""}
                            onChange={(e) =>
                              handleInputChange("ref", e.target.value)
                            }
                          />
                        </div>
                        <div className={styles.formGroup}>
                          {/* Versión — dynamically loaded */}
                          <VersionSelect
                            marca={formValues.marca || "TOYOTA"}
                            modelo={formValues.modelo} // this is the selected model/year
                            year={formValues.modelo} // we use year for filtering in the component
                            value={formValues.version || ""}
                            vehicleType={formValues.tipoVehiculo}
                            onChange={(val) => {
                              handleFieldChange("version", val);
                              handleInputChange("ref", val);
                            }}
                            vehicleData={vehicleData}
                            setVehicleData={setVehicleData}
                            creds={creds}
                            setParentLoading={setIsLoading}
                          />
                          {formErrors.version && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.version}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {formErrors.placa && formValues.tipoVehiculo === "usado" && (
                    <div className={styles.errorMessageWrapper}>
                      <p
                        className={styles.errorMessage}
                        dangerouslySetInnerHTML={{ __html: formErrors.placa }}
                      />
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <div className={styles.container}>
                    <h2 className={styles.title}>Selecciona tu vehículo</h2>
                    <div className={styles.searchBox}>
                      <input
                        type="text"
                        placeholder="Busca tu vehículo"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.input}
                      />
                      <button className={styles.iconButton}>
                        <img src="/svgs/search-icon-white.svg" alt="" />
                      </button>
                    </div>
                  </div>

                  <div className={styles.vehicleGrid}>
                    {vehicleData?.versions &&
                      vehicleData.versions.length > 0 ? (
                      vehicleData.versions
                        // ✅ Filter BEFORE mapping
                        .filter((v: any) => {
                          if (!searchTerm) return true;
                          const term = searchTerm.toLowerCase();
                          return (
                            v.type?.toLowerCase().includes(term) ||
                            v.line?.toLowerCase().includes(term) ||
                            v.vehicle_codification?.line2
                              ?.toLowerCase()
                              .includes(term) ||
                            v.cylinder?.toString().includes(term) ||
                            v.model?.toString().includes(term)
                          );
                        })
                        .map((v: any, index: number) => (
                          <div key={index} className={styles.vehicleCard}>
                            <h3 className={styles.vehicleTitle}>
                              {v.type ?? ""}
                            </h3>
                            {/* <p className={styles.vehicleDetails}>{v.line ?? ""}</p> */}

                            <p className={styles.vehicleDetails}>
                              Toyota {v.line ?? ""}
                              {/* {v.line2}{" "}
                                {v.cylinder} CC{" "}
                                {v.airBags} AB ABC */}
                            </p>
                            <div>
                              <p>
                                <span className={styles.vehicleInfo}>
                                  Cod.Fasecolda:
                                </span>{" "}
                                <span className={styles.vehicleInfo_data}>
                                  {" "}
                                  {v.code}
                                </span>
                              </p>
                              <p>
                                <span className={styles.vehicleInfo}>
                                  Modelo:
                                </span>{" "}
                                <span className={styles.vehicleInfo_data}>
                                  {v.model}
                                </span>
                              </p>
                              <p>
                                <span className={styles.vehicleInfo}>
                                  Cilindraje:
                                </span>{" "}
                                <span className={styles.vehicleInfo_data}>
                                  {v.cylinder} CC{" "}
                                </span>
                              </p>
                              <p>
                                <span className={styles.vehicleInfo}>
                                  Precio de referencia:
                                </span>{" "}
                                <span className={styles.vehicleInfo_data}>
                                  $
                                  {v.referencePrice
                                    ? v.referencePrice.toLocaleString("es-CO")
                                    : "N/A"}
                                </span>
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setVehicleData((prev: any) => ({
                                  ...prev,
                                  selectedVersion: v,
                                }));
                                setVehicleSelected(true);
                                setTimeout(() => handleNextStep(v), 0);
                              }}
                              className={styles.vehicleButton}
                              type="button"
                            >
                              Es mi vehículo
                            </button>
                          </div>
                        ))
                    ) : (
                      <p>
                        No se encontraron vehículos para esta placa o no es
                        Toyota.
                      </p>
                    )}
                  </div>

                  {formErrors.vehicle && (
                    <p
                      className={styles.errorMessage_tp}
                      style={{ marginTop: "10px" }}
                    >
                      {formErrors.vehicle}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <>
                  {!isMobile ? (
                    // 💻 DESKTOP VERSION (your current layout)
                    <div className={styles.formGrid}>
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Tipo de placa*
                          </label>
                          <select
                            value={formValues.tipoPlaca}
                            onChange={(e) =>
                              handleInputChange("tipoPlaca", e.target.value)
                            }
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "80px",
                              border: "none",
                              color: "#58595B",
                              fontSize: "14px",
                              fontFamily: "var(--font-ToyotaDisplay)",
                              padding: "10px 23px",
                              appearance: "none",
                              backgroundImage:
                                "url('/images/icons/arrow--down--grey.svg')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 18px center",
                              outline: "none",
                              maxWidth: "444px",
                            }}
                          >
                            <option value="" disabled hidden>
                              Seleccione un tipo de placa
                            </option>
                            <option value="particular">Privado</option>
                            <option value="publico">Público</option>
                          </select>
                          {formErrors.tipoPlaca && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.tipoPlaca}
                            </p>
                          )}
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Valor adicional en accesorios*
                          </label>

                          <div className={styles.numberInputWrapper}>
                            <input
                              type="text"
                              placeholder="$0"
                              value={
                                formValues.valorAccesorios
                                  ? `$${Number(formValues.valorAccesorios).toLocaleString()}`
                                  : ""
                              }
                              onChange={(e) => {
                                // Remove $ and commas before saving
                                const numericValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                handleInputChange(
                                  "valorAccesorios",
                                  numericValue
                                );
                              }}
                              className={styles.numberInput}
                            />

                            <div className={styles.customArrows}>
                              <button
                                type="button"
                                className={styles.arrowUp}
                                onClick={() =>
                                  handleInputChange(
                                    "valorAccesorios",
                                    String(
                                      Number(formValues.valorAccesorios || 0) +
                                      1
                                    )
                                  )
                                }
                              />
                              <button
                                type="button"
                                className={styles.arrowDown}
                                onClick={() =>
                                  handleInputChange(
                                    "valorAccesorios",
                                    String(
                                      Math.max(
                                        0,
                                        Number(
                                          formValues.valorAccesorios || 0
                                        ) - 1
                                      )
                                    )
                                  )
                                }
                              />
                            </div>
                          </div>

                          <span className={styles.si_no_tienes}>
                            Si no tienes accesorios, puedes dejar este campo en
                            $0.
                          </span>
                          {formErrors.valorAccesorios && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.valorAccesorios}
                            </p>
                          )}
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Precio del vehículo*
                          </label>
                          <input
                            type="text"
                            placeholder="$118,500,000"
                            disabled
                            value={
                              formValues.precioVehiculo
                                ? `$${parseInt(formValues.precioVehiculo.toString().replace(/\D/g, ""), 10).toLocaleString()}`
                                : ""
                            }
                          />
                          {formErrors.precioVehiculo && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.precioVehiculo}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Tipo de uso*
                          </label>
                          <select
                            value={formValues.use_type || ""}
                            onChange={(e) =>
                              handleInputChange("use_type", e.target.value)
                            }
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "80px",
                              border: "none",
                              color: "#58595B",
                              fontSize: "14px",
                              fontFamily: "var(--font-ToyotaDisplay)",
                              padding: "10px 23px",
                              appearance: "none",
                              backgroundImage:
                                "url('/images/icons/arrow--down--grey.svg')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 18px center",
                              outline: "none",
                              maxWidth: "444px",
                            }}
                          >
                            <option value="" disabled hidden>
                              Seleccione el tipo de uso
                            </option>
                            {[...useTypeOptions]
                              .sort((a, b) =>
                                a.label.localeCompare(b.label, "es", {
                                  sensitivity: "base",
                                })
                              )
                              .map((city) => (
                                <option key={city.value} value={city.label}>
                                  {city.label}
                                </option>
                              ))}
                          </select>
                          {formErrors.use_type && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.use_type}
                            </p>
                          )}
                        </div>

                        {/* <div className={styles.formGroup}>
                            <label className={styles.formInputlabel} >Ciudad de circulación*</label>
                            <select
                              value={formValues.ciudadCirculacion || ""}
                              onChange={(e) => handleInputChange("ciudadCirculacion", e.target.value)}
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "80px",
                                border: "none",
                                color: "#58595B",
                                fontSize: "14px",
                                fontFamily: "var(--font-ToyotaDisplay)",
                                padding: "10px 23px",
                                appearance: "none",
                                backgroundImage: "url('/images/icons/arrow--down--grey.svg')",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 18px center",
                                outline: "none",
                                maxWidth: "444px"
                              }}
                            >
                              <option value="" disabled hidden>Seleccione una ciudad</option>
                              {[...citiesOptions]
                                .sort((a, b) => a.label.localeCompare(b.label, "es", { sensitivity: "base" }))
                                .map((city) => (
                                  <option key={city.value} value={city.label}>
                                    {city.label}
                                  </option>
                                ))}
                            </select>
                            {formErrors.ciudadCirculacion && <p className={styles.errorMessage_tp}>{formErrors.ciudadCirculacion}</p>}

                          </div> */}
                        <CitySelectInput
                          formValues={formValues}
                          formErrors={formErrors}
                          handleInputChange={handleInputChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={styles.formGrid}>
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Tipo de placa*
                          </label>
                          <select
                            value={formValues.tipoPlaca}
                            onChange={(e) =>
                              handleInputChange("tipoPlaca", e.target.value)
                            }
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "80px",
                              border: "none",
                              color: "#58595B",
                              fontSize: "14px",
                              fontFamily: "var(--font-ToyotaDisplay)",
                              padding: "10px 23px",
                              appearance: "none",
                              backgroundImage:
                                "url('/images/icons/arrow--down--grey.svg')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 18px center",
                              outline: "none",
                              maxWidth: "444px",
                            }}
                          >
                            <option value="" disabled hidden>
                              Seleccione un tipo de placa
                            </option>
                            <option value="particular">Privado</option>
                            <option value="publico">Público</option>
                          </select>
                          {formErrors.tipoPlaca && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.tipoPlaca}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 2️⃣ Tipo de uso */}
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Tipo de uso*
                          </label>
                          <select
                            value={formValues.use_type || ""}
                            onChange={(e) =>
                              handleInputChange("use_type", e.target.value)
                            }
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "80px",
                              border: "none",
                              color: "#58595B",
                              fontSize: "14px",
                              fontFamily: "var(--font-ToyotaDisplay)",
                              padding: "10px 23px",
                              appearance: "none",
                              backgroundImage:
                                "url('/images/icons/arrow--down--grey.svg')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 18px center",
                              outline: "none",
                              maxWidth: "444px",
                            }}
                          >
                            <option value="" disabled hidden>
                              Seleccione el tipo de uso
                            </option>
                            {[...useTypeOptions]
                              .sort((a, b) =>
                                a.label.localeCompare(b.label, "es", {
                                  sensitivity: "base",
                                })
                              )
                              .map((city) => (
                                <option key={city.value} value={city.label}>
                                  {city.label}
                                </option>
                              ))}
                          </select>
                          {formErrors.use_type && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.use_type}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 3️⃣ Valor adicional en accesorios */}
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Valor adicional en accesorios*
                          </label>

                          <div className={styles.numberInputWrapper}>
                            <input
                              type="text"
                              placeholder="$0"
                              value={
                                formValues.valorAccesorios
                                  ? `$${Number(formValues.valorAccesorios).toLocaleString()}`
                                  : ""
                              }
                              onChange={(e) => {
                                // Remove $ and commas before saving
                                const numericValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                handleInputChange(
                                  "valorAccesorios",
                                  numericValue
                                );
                              }}
                              className={styles.numberInput}
                            />

                            <div className={styles.customArrows}>
                              <button
                                type="button"
                                className={styles.arrowUp}
                                onClick={() =>
                                  handleInputChange(
                                    "valorAccesorios",
                                    String(
                                      Number(formValues.valorAccesorios || 0) +
                                      1
                                    )
                                  )
                                }
                              />
                              <button
                                type="button"
                                className={styles.arrowDown}
                                onClick={() =>
                                  handleInputChange(
                                    "valorAccesorios",
                                    String(
                                      Math.max(
                                        0,
                                        Number(
                                          formValues.valorAccesorios || 0
                                        ) - 1
                                      )
                                    )
                                  )
                                }
                              />
                            </div>
                          </div>
                          <span className={styles.si_no_tienes}>
                            Si no tienes accesorios, puedes dejar este campo en
                            $0.
                          </span>
                          {formErrors.valorAccesorios && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.valorAccesorios}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 4️⃣ Ciudad de circulación */}
                      <div className={styles.formCard}>
                        <CitySelectInput
                          formValues={formValues}
                          formErrors={formErrors}
                          handleInputChange={handleInputChange}
                        />
                      </div>

                      {/* 5️⃣ Precio del vehículo */}
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Precio del vehículo*
                          </label>
                          <input
                            type="text"
                            placeholder="$118,500,000"
                            disabled
                            value={
                              formValues.precioVehiculo
                                ? `$${parseInt(formValues.precioVehiculo.toString().replace(/\D/g, ""), 10).toLocaleString()}`
                                : ""
                            }
                          />
                          {formErrors.precioVehiculo && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.precioVehiculo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {currentStep === 5 && (
                <>
                  {" "}
                  {!isMobile ? (
                    <div className={styles.formGrid}>
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Tipo de documento *
                          </label>
                          <select
                            value={formValues.tipoDocumento}
                            onChange={(e) =>
                              handleInputChange("tipoDocumento", e.target.value)
                            }
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "80px",
                              border: "none",
                              color: "#58595B",
                              fontSize: "14px",
                              fontFamily: "var(--font-ToyotaDisplay)",
                              padding: "10px 23px",
                              appearance: "none",
                              backgroundImage:
                                "url('/images/icons/arrow--down--grey.svg')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 18px center",
                              outline: "none",
                              maxWidth: "444px",
                            }}
                          >
                            <option value="" disabled hidden>
                              Seleccione un documento
                            </option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="NIT">NIT</option>
                            <option value="PA">Pasaporte</option>
                          </select>
                          {formErrors.tipoDocumento && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.tipoDocumento}
                            </p>
                          )}
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Nombre *
                          </label>
                          <input
                            type="text"
                            placeholder="Nombre"
                            value={formValues.nombre}
                            onChange={(e) =>
                              handleInputChange("nombre", e.target.value)
                            }
                          />
                          {formErrors.nombre && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.nombre}
                            </p>
                          )}
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Fecha de nacimiento*
                          </label>
                          <input
                            type="date"
                            placeholder="Selecciona una fecha"
                            value={formValues.fechaNacimiento || ""}
                            max={
                              new Date(
                                new Date().getFullYear() - 18,
                                new Date().getMonth(),
                                new Date().getDate()
                              )
                                .toISOString()
                                .split("T")[0]
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "fechaNacimiento",
                                e.target.value
                              )
                            }
                            className={styles.dateInput}
                          />

                          {formErrors.fechaNacimiento && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.fechaNacimiento}
                            </p>
                          )}
                        </div>

                        {["CE", "PA"].includes(formValues.tipoDocumento) && (
                          <div className={styles.formGroup}>
                            <label className={styles.formInputlabel}>
                              Nacionalidad*
                            </label>
                            <select
                              value={formValues.nacionalidad} // store country code
                              onChange={(e) =>
                                handleInputChange(
                                  "nacionalidad",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled hidden>
                                Selecciona tu nacionalidad
                              </option>
                              {countries
                                .sort((a, b) =>
                                  a.name.localeCompare(b.name, "es", {
                                    sensitivity: "base",
                                  })
                                )
                                .map((country) => (
                                  <option
                                    key={country.code}
                                    value={country.code}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                            </select>
                            {formErrors.nacionalidad && (
                              <p className={styles.errorMessage_tp}>
                                {formErrors.nacionalidad}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Número de documento *
                          </label>
                          <input
                            type={
                              formValues.tipoDocumento === "PA"
                                ? "text"
                                : "number"
                            }
                            placeholder="Número de documento"
                            value={formValues.numeroDocumento}
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "80px",
                              border: "none",
                              color: "#58595B",
                              fontSize: "14px",
                              fontFamily: "var(--font-ToyotaDisplay)",
                              padding: "10px 23px",
                              appearance: "none",
                              // backgroundImage: "url('/images/icons/arrow--down--grey.svg')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 18px center",
                              outline: "none",
                              maxWidth: "444px",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                "numeroDocumento",
                                e.target.value
                              )
                            }
                          />
                          {formErrors.numeroDocumento && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.numeroDocumento}
                            </p>
                          )}
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Apellido *
                          </label>
                          <input
                            type="text"
                            placeholder="Apellido"
                            value={formValues.apellido}
                            onChange={(e) =>
                              handleInputChange("apellido", e.target.value)
                            }
                          />
                          {formErrors.apellido && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.apellido}
                            </p>
                          )}
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Género *
                          </label>
                          <select
                            value={formValues.genero}
                            onChange={(e) =>
                              handleInputChange("genero", e.target.value)
                            }
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "80px",
                              border: "none",
                              color: "#58595B",
                              fontSize: "14px",
                              fontFamily: "var(--font-ToyotaDisplay)",
                              padding: "10px 23px",
                              appearance: "none",
                              backgroundImage:
                                "url('/images/icons/arrow--down--grey.svg')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 18px center",
                              outline: "none",
                              maxWidth: "444px",
                            }}
                          >
                            <option value="" disabled hidden>
                              Género
                            </option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                          </select>
                          {formErrors.genero && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.genero}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.formGrid}>
                      {/* Tipo de documento */}
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Tipo de documento *
                          </label>
                          <select
                            value={formValues.tipoDocumento}
                            onChange={(e) =>
                              handleInputChange("tipoDocumento", e.target.value)
                            }
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "80px",
                              border: "none",
                              color: "#58595B",
                              fontSize: "14px",
                              fontFamily: "var(--font-ToyotaDisplay)",
                              padding: "10px 23px",
                              appearance: "none",
                              backgroundImage:
                                "url('/images/icons/arrow--down--grey.svg')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 18px center",
                              outline: "none",
                              maxWidth: "444px",
                            }}
                          >
                            <option value="" disabled hidden>
                              Seleccione un documento
                            </option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="NIT">NIT</option>
                            <option value="PA">Pasaporte</option>
                          </select>
                          {formErrors.tipoDocumento && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.tipoDocumento}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Número de documento */}
                      <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Número de documento *
                          </label>
                          <input
                            type={
                              formValues.tipoDocumento === "PA"
                                ? "text"
                                : "number"
                            }
                            placeholder="Número de documento"
                            value={formValues.numeroDocumento}
                            onChange={(e) =>
                              handleInputChange(
                                "numeroDocumento",
                                e.target.value
                              )
                            }
                          />
                          {formErrors.numeroDocumento && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.numeroDocumento}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Nombre */}
                      <div className={styles.formGroup}>
                        <label className={styles.formInputlabel}>
                          Nombres *
                        </label>
                        <input
                          type="text"
                          placeholder="Nombres"
                          value={formValues.nombre}
                          onChange={(e) =>
                            handleInputChange("nombre", e.target.value)
                          }
                        />
                        {formErrors.nombre && (
                          <p className={styles.errorMessage_tp}>
                            {formErrors.nombre}
                          </p>
                        )}
                      </div>

                      {/* Apellidos */}
                      <div className={styles.formGroup}>
                        <label className={styles.formInputlabel}>
                          Apellidos *
                        </label>
                        <input
                          type="text"
                          placeholder="Apellidos"
                          value={formValues.apellido}
                          onChange={(e) =>
                            handleInputChange("apellido", e.target.value)
                          }
                        />
                        {formErrors.apellido && (
                          <p className={styles.errorMessage_tp}>
                            {formErrors.apellido}
                          </p>
                        )}
                      </div>

                      {/* Fecha de nacimiento */}
                      <div className={styles.formGroup}>
                        <label className={styles.formInputlabel}>
                          Fecha de nacimiento *
                        </label>
                        <input
                          type="date"
                          placeholder="Selecciona una fecha"
                          value={formValues.fechaNacimiento || ""}
                          max={
                            new Date(
                              new Date().getFullYear() - 18,
                              new Date().getMonth(),
                              new Date().getDate()
                            )
                              .toISOString()
                              .split("T")[0]
                          }
                          onChange={(e) =>
                            handleInputChange("fechaNacimiento", e.target.value)
                          }
                          className={styles.dateInput}
                        />

                        {formErrors.fechaNacimiento && (
                          <p className={styles.errorMessage_tp}>
                            {formErrors.fechaNacimiento}
                          </p>
                        )}
                      </div>

                      {/* Género */}
                      <div className={styles.formGroup}>
                        <label className={styles.formInputlabel}>
                          Género *
                        </label>
                        <select
                          value={formValues.genero}
                          onChange={(e) =>
                            handleInputChange("genero", e.target.value)
                          }
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: "80px",
                            border: "none",
                            color: "#58595B",
                            fontSize: "14px",
                            fontFamily: "var(--font-ToyotaDisplay)",
                            padding: "10px 23px",
                            appearance: "none",
                            backgroundImage:
                              "url('/images/icons/arrow--down--grey.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 18px center",
                            outline: "none",
                            maxWidth: "444px",
                          }}
                        >
                          <option value="" disabled hidden>
                            Género
                          </option>
                          <option value="M">Masculino</option>
                          <option value="F">Femenino</option>
                        </select>
                        {formErrors.genero && (
                          <p className={styles.errorMessage_tp}>
                            {formErrors.genero}
                          </p>
                        )}
                      </div>

                      {/* Nacionalidad (only if CE or PASSPORT) */}
                      {["CE", "PA"].includes(formValues.tipoDocumento) && (
                        <div className={styles.formGroup}>
                          <label className={styles.formInputlabel}>
                            Nacionalidad *
                          </label>
                          <select
                            value={formValues.nacionalidad}
                            onChange={(e) =>
                              handleInputChange("nacionalidad", e.target.value)
                            }
                          >
                            <option value="" disabled hidden>
                              Selecciona tu nacionalidad
                            </option>
                            {countries
                              .sort((a, b) =>
                                a.name.localeCompare(b.name, "es", {
                                  sensitivity: "base",
                                })
                              )
                              .map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.name}
                                </option>
                              ))}
                          </select>
                          {formErrors.nacionalidad && (
                            <p className={styles.errorMessage_tp}>
                              {formErrors.nacionalidad}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {currentStep === 6 && (
                <div>
                  <div className={styles.formGrid}>
                    <div className={styles.formCard}>
                      <div className={styles.formGroup1}>
                        <label className={styles.formInputlabel}>
                          Número de celular*
                        </label>
                        <input
                          type="tel"
                          placeholder="Ej. 3001234567"
                          value={formValues.telefono}
                          maxLength={15}
                          onChange={(e) => {
                            const numeric = e.target.value.replace(/\D/g, "");
                            handleInputChange("telefono", numeric.slice(0, 15));
                          }}
                        />
                        {formErrors.telefono && (
                          <p className={styles.errorMessage_tp}>
                            {formErrors.telefono}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={styles.formCard}>
                      <div className={styles.formGroup1}>
                        <label className={styles.formInputlabel}>
                          Correo electrónico*
                        </label>
                        <input
                          type="email"
                          placeholder="Ej: ejemplocorreo@gmail.com"
                          value={formValues.correo}
                          onChange={(e) =>
                            handleInputChange("correo", e.target.value)
                          }
                        />
                        {formErrors.correo && (
                          <p className={styles.errorMessage_tp}>
                            {formErrors.correo}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.formCard}>
                    <div
                      className={`${styles.checkboxGroup} ${styles.checkboxGroup_main}`}
                    >
                      <input
                        type="checkbox"
                        id="autorizacion"
                        checked={formValues.autorizacion}
                        onChange={(e) =>
                          handleInputChange("autorizacion", e.target.checked)
                        }
                      />
                      <label
                        className={styles.formInputlabel}
                        htmlFor="autorizacion"
                      >
                        Conozco los{" "}
                        <a
                          href="/legales/terminos_y_condiciones_cotizador_web"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.whiteUnderlineLink}
                        >
                          Términos y Condiciones
                        </a>{" "}
                        y{" "}
                        <a
                          href="/legales/politica_de_privacidad"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.whiteUnderlineLink}
                        >
                          Políticas de Privacidad
                        </a>{" "}
                      </label>
                      {formErrors.autorizacion && (
                        <p className={styles.errorMessage_tp}>
                          {formErrors.autorizacion}
                        </p>
                      )}
                    </div>
                    <div className={styles.checkboxGroup}>
                      <input
                        type="checkbox"
                        id="terminos"
                        checked={formValues.terminos}
                        onChange={(e) =>
                          handleInputChange("terminos", e.target.checked)
                        }
                      />
                      <label
                        className={styles.formInputlabel}
                        htmlFor="terminos"
                      >
                        Acepto el{" "}
                        <a
                          href="/legales/autorizacion_tratamiento_datos_personales"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.whiteUnderlineLink}
                        >
                          Tratamiento de Datos
                        </a>{" "}
                      </label>
                      {formErrors.terminos && (
                        <p className={styles.errorMessage_tp}>
                          {formErrors.terminos}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </View>
        ) : (
          <div>
            {/* Header */}
            {isMobile ? (
              /* -------------------- MOBILE VIEW -------------------- */
              <div className={styles.mobileContainer}>
                <div className={styles.mobileSection}>
                  <div className={styles.closeNavs}>
                    <button
                      onClick={closeModal}
                      className={styles.closeButtonMobile}
                      type="button"
                    >
                      <img
                        className={styles.closeImage}
                        src="/svgs/close-icon-white.svg"
                        alt=""
                      />
                    </button>
                  </div>
                  <div className={styles.modalHeader}>
                    <h3
                      className={styles.modalTitle}
                      style={{ marginTop: "0" }}
                    >
                      Datos recolectados
                    </h3>
                    <h2 className={styles.modalSubtitle}>
                      Resumen de la cotización
                    </h2>
                  </div>
                </div>

                <div className={styles.modalContent1}>
                  {/* Concessionary Section */}
                  <hr />
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Concesionario</h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Ciudad:</strong> {selectedCity?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Concesionario:</strong>{" "}
                        {selectedOffice?.label || "N/A"}
                      </p>
                    </div>
                  </div>
                  <hr />

                  {/* New Vehicle Section */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                      Vehículo{" "}
                      {formValues.tipoVehiculo!.charAt(0).toUpperCase() +
                        formValues.tipoVehiculo!.slice(1)}{" "}
                    </h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Modelo:</strong>{" "}
                        {vehicleData.selectedVersion?.model || "N/A"}
                      </p>
                      <p>
                        <strong>Versión:</strong>{" "}
                        {vehicleData.selectedVersion?.line || "N/A"}
                      </p>
                    </div>
                  </div>
                  <hr />

                  {/* Vehicle Use Type Section */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                      Tipo de uso de tu vehículo
                    </h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Tipo de placa:</strong>{" "}
                        {formValues.tipoPlaca || "N/A"}
                      </p>
                      <p>
                        <strong>Valor adicional en accesorios:</strong> $
                        {formValues.valorAccesorios || 0}
                      </p>
                      <p>
                        <strong>Ciudad de circulación:</strong>{" "}
                        {formValues.ciudadCirculacion || "N/A"}
                      </p>
                      <p>
                        <strong>Precio del vehículo:</strong> $
                        {vehicleData.selectedVersion?.referencePrice?.toLocaleString(
                          "es-CO"
                        ) || 0}
                      </p>
                    </div>
                  </div>
                  <hr />

                  {/* Owner Section */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Propietario</h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Tipo de documento:</strong>{" "}
                        {formValues.tipoDocumento || "N/A"}
                      </p>
                      <p>
                        <strong>Número de documento:</strong>{" "}
                        {formValues.numeroDocumento || "N/A"}
                      </p>
                      <p>
                        <strong>Nombre:</strong> {formValues.nombre || "N/A"}
                      </p>
                      <p>
                        <strong>Apellidos:</strong>{" "}
                        {formValues.apellido || "N/A"}
                      </p>
                      <p>
                        <strong>Fecha de nacimiento:</strong>{" "}
                        {formValues.fechaNacimiento || "N/A"}
                      </p>
                      <p>
                        <strong>Género:</strong> {formValues.genero || "N/A"}
                      </p>
                      {formValues.nacionalidad && (
                        <p>
                          <strong>Nacionalidad:</strong>{" "}
                          {formValues.nacionalidad}
                        </p>
                      )}
                    </div>
                  </div>
                  <hr />

                  {/* Contact Information Section */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                      Información de contacto
                    </h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Número Celular:</strong>{" "}
                        {formValues.telefono || "N/A"}
                      </p>
                      <p>
                        <strong>Correo electrónico:</strong>{" "}
                        {formValues.correo || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* -------------------- DESKTOP VIEW -------------------- */
              <div>
                {/* Header */}
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>Datos recolectados</h3>
                  <h2 className={styles.modalSubtitle}>
                    Resumen de la cotización
                  </h2>
                </div>

                <div className={styles.modalContent1}>
                  {/* Concessionary Section */}
                  <hr />
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Concesionario</h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Ciudad:</strong> {selectedCity?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Concesionario:</strong>{" "}
                        {selectedOffice?.label || "N/A"}
                      </p>
                    </div>
                  </div>
                  <hr />

                  {/* New Vehicle Section */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                      Vehículo{" "}
                      {formValues.tipoVehiculo!.charAt(0).toUpperCase() +
                        formValues.tipoVehiculo!.slice(1)}{" "}
                    </h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Modelo:</strong>{" "}
                        {vehicleData.selectedVersion?.model || "N/A"}
                      </p>
                      <p>
                        <strong>Versión:</strong>{" "}
                        {vehicleData.selectedVersion?.line || "N/A"}
                      </p>
                    </div>
                  </div>
                  <hr />

                  {/* Vehicle Use Type Section */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                      Tipo de uso de tu vehículo
                    </h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Tipo de placa:</strong>{" "}
                        {formValues.tipoPlaca || "N/A"}
                      </p>
                      <p>
                        <strong>Valor adicional en accesorios:</strong> $
                        {formValues.valorAccesorios || 0}
                      </p>
                      <p>
                        <strong>Ciudad de circulación:</strong>{" "}
                        {formValues.ciudadCirculacion || "N/A"}
                      </p>
                      <p>
                        <strong>Precio del vehículo:</strong> $
                        {vehicleData.selectedVersion?.referencePrice?.toLocaleString(
                          "es-CO"
                        ) || 0}
                      </p>
                    </div>
                  </div>
                  <hr />

                  {/* Owner Section */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Propietario</h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Tipo de documento:</strong>{" "}
                        {formValues.tipoDocumento || "N/A"}
                      </p>
                      <p>
                        <strong>Número de documento:</strong>{" "}
                        {formValues.numeroDocumento || "N/A"}
                      </p>
                      <p>
                        <strong>Nombre:</strong> {formValues.nombre || "N/A"}
                      </p>
                      <p>
                        <strong>Apellidos:</strong>{" "}
                        {formValues.apellido || "N/A"}
                      </p>
                      <p>
                        <strong>Fecha de nacimiento:</strong>{" "}
                        {formValues.fechaNacimiento || "N/A"}
                      </p>
                      <p>
                        <strong>Género:</strong> {formValues.genero || "N/A"}
                      </p>
                      {formValues.nacionalidad && (
                        <p>
                          <strong>Nacionalidad:</strong>{" "}
                          {formValues.nacionalidad}
                        </p>
                      )}
                    </div>
                  </div>
                  <hr />

                  {/* Contact Information Section */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                      Información de contacto
                    </h4>
                    <div className={styles.sectionInner}>
                      <p>
                        <strong>Número Celular:</strong>{" "}
                        {formValues.telefono || "N/A"}
                      </p>
                      <p>
                        <strong>Correo electrónico:</strong>{" "}
                        {formValues.correo || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Navigation Buttons */}
        <div
          className={styles.navigationButtons}
          style={{
            justifyContent: currentStep === 1 ? "flex-end" : "space-between",
          }}
        >
          {currentStep !== 1 && (
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`${styles.navButton} ${styles.prevButton}`}
              type="button"
            >
              {!isMobile && "Volver"}
            </button>
          )}
          {currentStep !== 3 && (
            <button
              onClick={handleNextStep}
              className={`${styles.navButton} ${styles.nextButton}`}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Siguiente"}
            </button>
          )}
        </div>
      </div>
    </div>
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
