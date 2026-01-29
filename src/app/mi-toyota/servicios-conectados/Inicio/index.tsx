// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useEffect, useMemo, useState } from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

export function InicioComponent() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "Corolla",
      year: "2026",
      type: "Híbrido",
      price: "$109.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla (2).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/hibridos/corolla",
      cotizarLink: "/cotizador/corolla",
    },
    {
      id: 2,
      theme: "dark",
      name: "Corolla GR-S",
      modelName: "COROLLA GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$130.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA GR.png",
      bgColor: "#29363A",
      objectPosition: "21%",
      link: "/vehiculos/deportivos-tgr/corolla-gr-s",
    },
    {
      id: 3,
      name: "Corolla Cross",
      year: "2026",
      type: "Híbrido",
      price: "$135.900.000 COP",
      description: "Muévete a tu mejor versión",
      img: "/images/vehicle-tabs/Desktop/Corolla Cross (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA CROSS.png",
      bgColor: "#29363A",
      objectPosition: "38%",
      link: "/vehiculos/hibridos/corolla-cross",
      cotizarLink: "/cotizador/corolla-cross",
    },
    {
      id: 4,
      theme: "dark",
      name: "Corolla Cross GR-S",
      modelName: "COROLLA CROSS GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$161.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/vehicle-tabs/Desktop/Corolla Cross GR (1).png",
      imgMobile:
        "/images/vehicle-tabs/Mobile/F CARDS MOBILE COROLLA CROS GR.png",
      bgColor: "#1F2C40",
      objectPosition: "76%",
      link: "/vehiculos/deportivos-tgr/corolla-cross-gr",
    },
    {
      id: 5,
      name: "Fortuner",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "$239.900.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/vehicle-tabs/Desktop/Fortuner (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE FORTUNER.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/camionetas/fortuner",
      cotizarLink: "/cotizador/fortuner",
    },
    {
      id: 6,
      theme: "dark",
      name: "Fortuner GR-S",
      modelName: "FORTUNER GR-S 4X4 DIÉSEL 2.8",
      year: "2026",
      type: "Diésel",
      price: "$335.500.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/vehicle-tabs/Desktop/Fortuner GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE FORTUNER GR.png",
      bgColor: "#161B1E",
      objectPosition: "21%",
      link: "/vehiculos/deportivos-tgr/fortuner-gr-s",
    },
    {
      id: 7,
      name: "Hilux",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "$175.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX.png",
      bgColor: "#1F2C40",
      objectPosition: "36%",
      link: "/vehiculos/pick-ups/hilux",
      cotizarLink: "/cotizador/hilux",
    },
    {
      id: 8,
      name: "Hilux Overlander",
      year: "2026",
      type: "Diésel",
      price: "$234.900.000",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux Overlander.png",
      imgMobile:
        "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX OVERLANDER.png",
      bgColor: "#1F2C40",
      objectPosition: "36%",
      link: "/vehiculos/pick-ups/hilux-overlander",
      cotizarLink: "/cotizador/hilux",
    },
    {
      id: 9,
      theme: "dark",
      name: "Hilux GR-S",
      modelName: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT",
      year: "2026",
      type: "Diésel",
      price: "$309.500.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux GR (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX GR.png",
      bgColor: "#1F2C40",
      objectPosition: "76%",
      link: "/vehiculos/deportivos-tgr/hilux-gr-s-iv",
    },
  ]);
  // Fetch latest prices and update the vehicles state
  useEffect(() => {
    const fetchAllVehiclePrices = async () => {
      try {
        const res = await fetch("/api/prices");
        if (!res.ok) throw new Error("Failed to fetch prices");

        const apiData: any[] = await res.json();

        // ---- Helpers ----
        const toNumber = (val: string) =>
          Number(val?.replace(/[^\d.-]/g, "")) || 0;

        const normalize = (str: string) =>
          str
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/[\u00A0\u200B]+/g, " ") // remove NBSP/zero-width
            .replace(/\s+/g, " ")
            .trim()
            .toUpperCase();

        // ---- 1️⃣ Gather latest price by VERSION ----
        const versionPrices: Record<string, { year: number; price: number }> =
          {};

        apiData.forEach((item) => {
          if (item.ACTIVO !== "true" || !item.VERSION) return;
          const key = normalize(item.VERSION);
          const year = Number(item.ANIOMODELO);
          const price = toNumber(item.PRECIO);

          if (
            !versionPrices[key] ||
            year > versionPrices[key].year ||
            (year === versionPrices[key].year &&
              price < versionPrices[key].price)
          ) {
            versionPrices[key] = { year, price };
          }
        });

        // ---- 2️⃣ Gather lowest price of LATEST YEAR by MODELO ----
        const modelPrices: Record<
          string,
          { year: number; lowestPrice: number }
        > = {};

        apiData.forEach((item) => {
          if (item.ACTIVO !== "true") return;
          const key = normalize(item.MODELO);
          const year = Number(item.ANIOMODELO);
          const price = toNumber(item.PRECIO);

          if (!modelPrices[key]) {
            modelPrices[key] = { year, lowestPrice: price };
          } else {
            const current = modelPrices[key];
            if (year > current.year) {
              modelPrices[key] = { year, lowestPrice: price };
            } else if (year === current.year && price < current.lowestPrice) {
              current.lowestPrice = price;
            }
          }
        });

        // ---- 3️⃣ Update State ----
        setVehicles((prev) =>
          prev.map((v) => {
            const versionKey = normalize(v.version || v.modelName || v.name);
            const modelKey = normalize(v.modelName || v.MODELO || v.name);

            const versionData = versionPrices[versionKey];
            const modelData = modelPrices[modelKey];

            if (versionData) {
              //  Prefer version match if available
              return {
                ...v,
                price: `$${versionData.price.toLocaleString("es-CO")} COP`,
                year: String(versionData.year),
              };
            } else if (modelData) {
              //  Fallback to model match
              return {
                ...v,
                price: `$${modelData.lowestPrice.toLocaleString("es-CO")} COP`,
                year: String(modelData.year),
              };
            }
            return v; // no match → unchanged
          })
        );
      } catch (err) {
        console.error("Error fetching vehicle prices:", err);
      }
    };

    fetchAllVehiclePrices();
  }, []);

  const pageData: ComponentData[] = useMemo(() => {
    return [
      {
        component: "AWSAmplifyComponent",
        props: {
          image: {
            src: "/images/servicios-conectados/inicio/toyota-servicios-conectados.png",
            alt: "toyota-servicios-conectados",
            width: { base: "100%", xl: "auto" },
            maxWidth: {
              xl: "761px",
            },
            height: "auto",
            objectFit: "contain",
            margin: { base: "45px auto 70px", xl: "45px auto 0px" },
            display: "inherit",
            borderRadius: { base: "0", xl: "20px" },
          },
        },
      },
      {
        component: "AWSAmplifyComponent",
        props: {
          title: {
            text: "Ahora podrás tener toda la información de tu vehículo a mano a través de la app de Toyota. Monitorea el estado del vehículo, controla su seguridad con rastreo, seteo de delimitación geográfica y alerta de velocidad. Toda la información que necesitas de forma integrada para mejorar tu experiencia de manejo.",
            fontSize: { base: "16px", xl: "22px" },
            fontFamily: "var(--font-toyotaDisplay)",
            fontStyle: "normal",
            fontWeight: "500",
            maxWidth: {
              xl: "70%",
            },
            lineHeight: "30.4px",
            textAlign: { base: "left", xl: "center" },
            padding: { base: "32px 16px 58px 15px", xl: "66px  0px 172px" },
          },
        },
      },
      {
        component: "AWSAmplifyComponent",
        props: {
          layout: "horizontal",
          title: {
            text: "Funcionalidades",
            fontSize: { base: "32px", xl: "56px" },
            fontFamily: "var(--font-ToyotaType-Regular)",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "61.6px",
            textAlign: "left",
            padding: { base: "0px 15px 0px", xl: "0" },
            letterSpacing: "-1.12px",
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          title: {
            text: "Acceso a más de 10 servicios para mantener tu vehículo siempre conectado y seguro.",
            fontSize: { base: "16px", xl: "22px" },
            fontFamily: "var(--font-toyotaDisplay)",
            fontStyle: "normal",
            fontWeight: "500",
            maxWidth: {
              xl: "70%",
            },
            lineHeight: "30.4px",
            textAlign: { base: "left", xl: "center" },
            padding: { base: "22px 16px 0px 15px", xl: "32px  0px 120px" },
          },
        },
      },
      {
        component: "SafetyFeaturesGrid",
        props: {
          features: [
            {
              title: "Estado y diagnóstico del vehículo",
              description:
                "Accede a diagnósticos de tu vehículo, identifica las advertencias técnicas generadas por el vehículo y mantenlo seguro. Además, accede a la información de tu vehículo, como nivel de combustible, kilometraje e historial de viajes.",
              image:
                "/images/servicios-conectados/inicio/diagnostico-del-vehiculo.png",
              link: "#",
            },
            {
              title: "Seguridad",
              description:
                "Monitorea la ubicación de tu vehículo, configura delimitaciones geográficas y alertas de velocidad. Además, podrás rastrear tu vehículo en caso de robo y solicitar su inmovilización.",
              image: "/images/servicios-conectados/inicio/seguridad.jpg",
              link: "#",
            },
            // {
            //   title: "Estado del vehículo",
            //   description:
            //     "Accede a toda la información de tu vehículo, como nivel de combustible, kilometraje e historial de viajes.",
            //   image: "/images/servicios-conectados/inicio/estado-del-vehiculo.png",
            //   link: "#",
            // },
            // {
            //   title: "Wi-fi a bordo",
            //   description:
            //     "Como servicio opcional, podrás conectar hasta 8 dispositivos asegurando el acceso a internet y la conectividad a bordo.",
            //   image: "/images/servicios-conectados/inicio/wi-fi-a-bordo.png",
            //   link: "#",
            // },
          ],
          isButton: false,
          isDivider: false,
          isMobileDivider: false,
          viewStyle: {
            margin: {
              base: "0",
              xl: "0 auto",
            },
            maxWidth: {
              xl: "80%",
            },
          },
        },
      },
      // ----

      {
        component: "AWSAmplifyComponent",
        props: {
          image: {
            src: "/images/icons/handIcon.svg",
            alt: "toyota-servicios-conectados",
            width: { base: "100%", xl: "auto" },
            // margin: "0 auto",
            height: { base: "45px", xl: "55px" },
            objectFit: "contain",
            margin: { base: "45px auto 10px", xl: "172px auto 32px" },
          },
          viewstyle: {
            display: "flex",
            flexDirection: { base: "column", xl: "row" },
            alignItems: "center",
            justifyContent: "center",
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          layout: "horizontal",
          title: {
            text: "*Conoce los modelos disponibles con Servicios Conectados",
            fontSize: { base: "18px", xl: "56px" },
            fontFamily: "var(--font-ToyotaType-Regular)",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: { base: "normal", xl: "61.6px" },
            textAlign: { base: "center", xl: "center" },
            maxWidth: {
              xl: "80%",
            },
            padding: { base: "10px 55px 56px 55px", xl: "0" },
          },
          viewstyle: {
            display: "flex",
            flexDirection: { base: "column", xl: "row" },
            alignItems: "center",
            justifyContent: "center",
          },
        },
      },
      {
        component: "VehicleSwiperAll",
        props: {
          titleStyle: {
            fontFamily: {
              base: "var(--font-ToyotaType-Regular)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-toyotaDisplay)",
            },
            fontWeight: {
              base: "700",
              medium: "400",
              xl: "400",
            },
            fontSize: {
              base: "22px",
              xl: "28px",
            },
            lineHeight: {
              base: "24px",
              xl: "41.6px",
            },
          },
          YearandTypeStyle: {
            fontFamily: {
              base: "var(--font-ToyotaType-Regular)",
              medium: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-ToyotaType-Regular)",
            },
            fontWeight: {
              base: "400",
              medium: "",
              xl: "",
            },
            fontSize: { base: "9px", xl: "14px" },
            fontStyle: { base: "normal", xl: "normal" },
            lineHeight: { base: "normal", xl: "normal" },
          },
          descriptionStyle: {
            fontFamily: {
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-toyotaDisplay)",
            },
            fontWeight: {
              base: "400",
              medium: "",
              xl: "",
            },
            fontSize: { base: "14px", xl: "14px" },
            fontStyle: { base: "normal", xl: "normal" },
            lineHeight: { base: "19.6px", xl: "21px" },
          },
          priceStyle: {
            fontSize: { base: "18px", xl: "18px" },
            lineHeight: { base: "normal", xl: "25.67px" },
          },
          isDesktop: "2",
          vehicles: vehicles,
          viewStyle: {
            margin: {
              xl: "0 auto",
            },
            padding: {
              xl: "87px 50px 50px",
            },
            maxWidth: {
              xl: "80%",
            },
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          image: {
            src: "/svgs/mobile.svg",
            alt: "toyota-servicios-conectados",
            width: { base: "100%", xl: "auto" },
            display: "block",
            height: { base: "40px", xl: "auto" },
            objectFit: "contain",
            margin: { base: "45px auto 18px", xl: "105px auto 32px" },
          },
          viewstyle: {
            display: "flex",
            flexDirection: { base: "column", xl: "row" },
            alignItems: "center",
            justifyContent: "center",
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          layout: "horizontal",
          title: {
            text: "Toyota App",
            fontSize: { base: "22px", xl: "56px" },
            fontFamily: "var(--font-ToyotaType-Regular)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: { base: "normal", xl: "61.6px" },
            textAlign: { base: "center", xl: "center" },
            maxWidth: {
              xl: "80%",
            },
            width: {
              xl: "386px",
            },
            padding: { base: "10px 15px 0px", xl: "0" },
            margin: { base: "0 auto", xl: "" },
            letterSpacing: "-1.12px",
          },
          viewstyle: {
            display: { base: "flex" },
            flexDirection: { base: "column" },
            alignItems: { base: "center" },
            justifyContent: { base: "center" },
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          title: {
            text: "Toda la experiencia Toyota en un solo lugar.",
            fontSize: { base: "14px", xl: "22px" },
            fontFamily: "var(--font-toyotaDisplay)",
            fontStyle: "normal",
            fontWeight: "500",
            maxWidth: {
              xl: "70%",
            },
            lineHeight: { base: "normal", xl: "30.4px" },
            textAlign: { base: "center", xl: "center" },
            padding: { base: "11px 15px 35px 15px", xl: "32px  0px 72px" },
            margin: { base: "0 auto", xl: "" },
          },
        },
      },

      // playstore component
      {
        component: "ConnectedServices",
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          title: {
            text: "Línea de atención gratuita para clientes con vehículos con Servicios Conectados: (01 800) 519 1353.",
            fontSize: { base: "12px", xl: "16px" },
            fontFamily: {
              base: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-toyotaDisplay)",
            },
            fontStyle: "normal",
            fontWeight: { base: "400", xl: "400" },
            maxWidth: {
              // xl: "70%",
            },
            lineHeight: { base: "100%", xl: "30.4px" },
            textAlign: {
              base: "start",
              medium: "center",
              large: "center",
              xl: "center",
            },
            padding: { base: "24px 15px 23px 0px", xl: "32px  0px 72px" },
            margin: { base: "0 auto", xl: "" },
            letterSpacing: { base: "0px", xl: "" },
          },
        },
      },

      {
        component: "AmplifyAccordion",
        props: {
          data: [
            {
              sectionTitle: "Preguntas Frecuentes",
              items: [
                {
                  title: "Servicios Conectados",
                  content:
                    "*Toyota Servicios Conectados te permite controlar los datos de tu vehículo desde la app de Toyota. Podrás ver la ubicación, consumo de combustible, últimos viajes, recibir alertas, delimitar velocidad máxima y mucho más.",
                },
                {
                  title: "¿Cuántas opciones de planes hay disponibles?",
                  content:
                    "*Hay 2 paquetes disponibles: Siempre Conectado (paquete de 5 servicios) y Seguridad Conectada (los 5 servicios anteriores + servicios adicionales).",
                },
                {
                  title: "¿Qué servicios incluye el plan Siempre Conectado?",
                  content:
                    "*El plan Siempre Conectado incluye 5 servicios: estado del vehículo, recordatorio de mantenimiento, indicador de nivel de combustible, últimos viajes y diagnóstico del vehículo.",
                },
                {
                  title: "¿Qué servicios incluye el plan Seguridad Conectada?",
                  content:
                    "Incluye todos los 5 servicios del plan Siempre Conectado y algunas funciones adicionales como la delimitación geográfica, notificación de alarma, rastreo de vehículo robado, alerta de velocidad, inmovilización del vehículo, monitoreo mejorado y aviso de desconexión del módulo.",
                },
                {
                  title: "¿Cómo utilizo Servicios Conectados?",
                  content: `*Lo primero que tienes que hacer es activar el vehículo en el concesionario. Después, descarga la app disponible en la tienda de tu celular (Toyota en Android y Toyota LATAM en iOS) e inicia sesión utilizando la misma dirección de correo electrónico utilizada para activar el vehículo (puedes apoyarte en tu concesionario). Una vez que hayas iniciado sesión, tu vehículo aparecerá en la pestaña "Mi Toyota". Solo tienes que seguir los pasos de activación y al finalizar ya podrás utilizar los Servicios Conectados.`,
                },
                {
                  title: "¿Cómo activo mi vehículo conectado?",
                  content:
                    "*La activación se realiza al momento de entrega del vehículo en el concesionario. Si aún no lo activaste, acércate a un concesionario oficial de la red Toyota Colombia.",
                },
                {
                  title: "¿Cómo configuro una alerta de velocidad en la app?",
                  content: `Ingresa a la pestaña "Mi Toyota" y selecciona la opción Alerta de Velocidad. Ahí podrás configurar la alerta haciendo clic en la tarjeta para establecer la velocidalímite.`,
                },
                {
                  title: "¿Puedo configurar más de una alerta de velocidad?",
                  content: "No, sólo podrás configurar una alerta a la vez.",
                },
                {
                  title: "¿Cómo sé si la alerta de velocidad está activada?",
                  content: `En la pestaña "Mi Toyota", la tarjeta de Alerta de Velocidad muestra el estado actual, si se encuentra Activado o Desactivado.`,
                },
                {
                  title: "¿Quién puede crear una alerta de velocidad?",
                  content: `Sólo el usuario con el perfil "Propietario" puede crear una alerta de velocidad.`,
                },
                {
                  title:
                    "¿Quién recibirá una notificación si se supera el límite de velocidad?",
                  content:
                    "El propietario y los conductores adicionales registrados recibirán una alerta si se supera el límite de velocidad establecido.",
                },
                {
                  title: "¿Cómo funciona la delimitación geográfica?",
                  content: `Este servicio crea una geo-valla virtual alrededor del vehículo utilizando la posición GPS. Si la valla se rompe, recibirás una notificación en tu aplicación y podrás solicitar asistencia al Centro de Atención al Cliente de Toyota. Para que funcione, la valla debe haber sido creada previamente por el usuario con el perfil "Propietario".`,
                },
                {
                  title: "¿Cuántas delimitaciones puedo crear al mismo tiempo?",
                  content:
                    "Puedes crear hasta 5 delmitaciones geográficas al mismo tiempo.",
                },
                {
                  title:
                    "¿Quién recibirá una notificación si se rompe una geo-valla?",
                  content:
                    "Todos los usuarios registrados recibirán una notificación en la aplicación si se rompe una geo-valla.",
                },
                {
                  title: "¿Cómo funciona la notificación de alarma?",
                  content:
                    "Este servicio genera una notificación en la App cuando se activa la alarma del vehículo, ya sea abriendo puertas, rompiendo ventanillas o moviendo el vehículo.",
                },
                {
                  title:
                    "¿Qué hacer cuando se recibe una notificación de alarma?",
                  content:
                    "Cuando recibas una notificación de alarma, puedes elegir entre varias acciones: 1 - Llamar al Centro de Atención al Cliente; 2 - Solicitar la activación del seguimiento del vehículo.",
                },
                {
                  title:
                    "He recibido una notificación de alarma. ¿Cómo funciona la activación del seguimiento de vehículo?",
                  content:
                    "Cuando recibas una notificación de alarma, verás la opción de “Solicitar la activación del seguimiento del vehículo”. Al hacer clic en esta opción, el Centro de Atención al Cliente recibirá la solicitud, se pondrá en contacto con el propietario para confirmar la identidad y activar el seguimiento.",
                },
                {
                  title:
                    "¿Cómo funciona el servicio de inmovilización de vehículo?",
                  content:
                    "Puedes ponerte en contacto con el Centro de Atención al Cliente a través de la aplicación o por teléfono para solicitar la inmobilización del vehículo. Tras confirmar tu identidad, el Centro de Atención al Cliente enviará la señal de inmovilización. Así, una vez que se apague el motor del vehículo, no volverá a arrancar hasta que se desactive la inmovilización.",
                },
                {
                  title:
                    "¿Quién puede solicitar la inmovilización del vehículo?",
                  content: `Sólo el usuario con el perfil "Propietario" puede solicitar la inmovilización del vehículo.`,
                },
                {
                  title: "¿Cómo funciona la alerta de desconexión del módulo?",
                  content: `El Centro de Atención al Cliente recibirá una notificación si el módulo se desconecta. A continuación, se pondrá en contacto con la persona registrada como "propietario" para confirmar si se encuentra en una situación particular o para ayudarlo con el error.`,
                },
              ],
            },
          ],
          viewStyle: {
            bgColor: { base: "#fff", xl: "#F6F6F6" },
            margin: {
              base: "57px 0 42px",
              xl: "148px auto 82px",
            },
            padding: {
              base: "0",
              xl: "6.5rem 9.6875rem 5.25rem",
            },
            maxWidth: {
              base: "100%",
              xl: "95.625rem",
            },
          },
        },
      },

      // add slider here
      // {
      //   component: "VehicleCardList",
      //   props: {
      //     vehicles: [
      //       {
      //         imageSrc: "/svgs/mobile.svg",
      //         title: "title",
      //         price: "55d4ee",
      //         description: "dnekjhdkhejhdhegdjehhdehdfhge",
      //         buttonText: "button",
      //       },
      //       {
      //         imageSrc: "/svgs/mobile.svg",
      //         title: "title",
      //         price: "55d4ee",
      //         description: "dnekjhdkhejhdhegdjehhdehdfhge",
      //         buttonText: "button",
      //       },
      //       {
      //         imageSrc: "/svgs/mobile.svg",
      //         title: "title",
      //         price: "55d4ee",
      //         description: "dnekjhdkhejhdhegdjehhdehdfhge",
      //         buttonText: "button",
      //       },
      //     ],
      //   }
      // },
      {
        component: "AWSAmplifyComponent",
        props: {
          title: {
            text:
              "(*) Servicios Conectados son aplicables de acuerdo con el tipo de vehículo y versión. Se refiere a los servicios de movilidad que, mediante la integración de tecnologías digitales, proporciona una variedad de características y funcionalidades que permitan al propietario tener más seguridad y comodidad en su vehículo. Podrá obtener toda información, planes vigentes, condiciones o limitaciones que puedan aplicarse a los servicios, así como una lista completa de sus características en el presente sitio. A todo evento, resultan de aplicación los Términos y Condiciones del servicio. " +
              '<a style="color: blue" href="https://www.toyota.com.co/legales/terminos_y_condiciones_de_uso_de_los_servicios_conectados" target="_blank" rel="noopener noreferrer">https://www.toyota.com.co/legales/terminos_y_condiciones_de_uso_de_los_servicios_conectados</a>\n' +
              "(**) Servicios válidos y vigentes dentro del Territorio Colombiano. Precio sugerido al público, vigente desde el 1/08/2025 hasta el 31/12/2025. Los valores informados incluyen IVA e impuestos internos vigentes; cualquier otro impuesto, alícuota, percepción, tasa, contribución y/o tributo que pudiere establecerse, modificará el importe detallado.\n" +
              "(***) Servicio provisto por la compañía de telecomunicaciones disponible para consulta desde la Toyota App. Con quien usted deberá suscribir un contrato de adhesión. Aplican los Términos y Condiciones, así como la Política de Privacidad de la empresa prestadora del servicio.",
            fontSize: { base: "12px", xl: "12px" },
            fontFamily: "var(--font-toyotaDisplay)",
            wordBreak: "break-word",
            fontStyle: "normal",
            fontWeight: "400",
            maxWidth: {
              base: "100%",
              xl: "95.625rem",
            },
            lineHeight: "100%",
            textAlign: { base: "left", xl: "left" },
            padding: { base: "32px 16px 0px 15px", xl: "32px 16px 0px 16px" },
            color: "#000",
            whiteSpace: "pre-line",
          },
        },
      },
    ];
  }, [vehicles]);

  return (
    <React.Fragment>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
      {/* <View backgroundColor="#ffffff" maxWidth="800px" margin="0 auto">
          <View>
            <HybridMythsCarousel />
          </View>
        </View> */}
    </React.Fragment>
  );
}
