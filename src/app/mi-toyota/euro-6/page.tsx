"use client";

import React, { useEffect, useMemo, useState } from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos de prueba


// A Component needs to be added here

export default function Home() {

  const [vehicles, setVehicles] = useState([
    {
      id: 5,
      theme: "dark",
      name: "Fortuner",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "", // <- will be filled dynamically
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
      name: "Land Cruiser Prado",
      year: "2025",
      type: "Gasolina / Diésel",
      price: "",
      description: "El legado que abre nuevos caminos",
      img: "/images/vehicle-tabs/Desktop/LC Prado (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE LC PRADO.png",
      bgColor: "#161B1E",
      objectPosition: "21%",
      link: "/vehiculos/camionetas/land-cruiser-prado",
      cotizarLink: "/cotizador/land-cruiser-prado",
    },
    {
      id: 7,
      theme: "dark",
      name: "Hilux",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "",
      description: "Fuerza y durabilidad",
      img: "/images/vehicle-tabs/Desktop/Hilux (1).png",
      imgMobile: "/images/vehicle-tabs/Mobile/F CARDS MOBILE HILUX.png",
      bgColor: "#1F2C40",
      objectPosition: "unset",
      link: "/vehiculos/pick-ups/hilux",
      cotizarLink: "/cotizador/hilux",
    },
  ]);

  // 👉 Fetch latest prices and update the vehicles state
  useEffect(() => {
    const fetchAllVehiclePrices = async () => {
      try {
        const res = await fetch("/api/prices");
        if (!res.ok) throw new Error("Failed to fetch prices");

        type PriceItem = {
          MODELO: string;
          ACTIVO: string;
          ANIOMODELO: string;
          PRECIO: string;
        };

        const apiData: PriceItem[] = await res.json();

        const latestPrices: Record<string, { year: number; price: number }> = {};

        apiData.forEach((item) => {
          const model = item.MODELO?.toUpperCase();
          if (!model || item.ACTIVO !== "true") return;

          const year = Number(item.ANIOMODELO);
          const price = Number(item.PRECIO);

          if (!latestPrices[model]) {
            latestPrices[model] = { year, price };
          } else {
            const cur = latestPrices[model];
            if (year > cur.year || (year === cur.year && price < cur.price)) {
              latestPrices[model] = { year, price };
            }
          }
        });

        // Format & update prices
        setVehicles((prev) =>
          prev.map((v) => {
            const key = v.name.toUpperCase();
            const data = latestPrices[key];
            return data
              ? {
                ...v,
                price: `$${data.price.toLocaleString("es-CO")} COP`,
              }
              : v;
          })
        );
      } catch (err) {
        console.error("Error fetching vehicle prices:", err);
      }
    };

    fetchAllVehiclePrices();
  }, []);


  // 👉 Build pageData AFTER vehicles update
  const pageData: ComponentData[] = useMemo(() => {
    return [
      // Update the MainSlider component to accept dynamic props
      {
        component: "MainSlider", // Component name
        props: {
          slides: [
            {
              videoUrl: "https://www.youtube.com/embed/lCrBIJQouzo",
              title: "",
              description: "",
            },
            // {
            //   imageMobile: "/images/normativa-euro-6.png",
            //   imageDesktop: "/images/normativa-euro-6.png",
            //   title: "Euro 6",
            // },
            // {
            //   imageMobile: "/images/normativa-euro-6.png",
            //   imageDesktop: "/images/normativa-euro-6.png",
            //   title: "Euro 6",
            // },
            // {
            //   imageMobile: "/images/normativa-euro-6.png",
            //   imageDesktop: "/images/normativa-euro-6.png",
            //   title: "Euro 6",
            // },
            // {
            //   imageMobile: "/images/normativa-euro-6.png",
            //   imageDesktop: "/images/normativa-euro-6.png",
            //   title: "Euro 6",
            // },
          ], // Passing slides data inline
          sliderConfig: {
            slidesPerView: 1, // Number of slides visible at a time
            spaceBetween: 10, // Space between slides
            loop: true, // Infinite loop of slides
            isButton: false,
            autoplay: {
              delay: 3000, // Autoplay delay in ms
              disableOnInteraction: false, // Keep autoplay even when user interacts
            },
            pagination: {
              clickable: true, // Allow click pagination
            },
            navigation: true, // Enable navigation buttons (next/prev)
          }, // Passing slider configuration inline
          isPlayicon: false,
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          imagePosition: "bottom", // Keep this as bottom
          isDesktop: false, // IMPORTANT: Force mobile rendering mode even on desktop
          layout: "horizontal",
          title: {
            text: "¿Qué es EURO 6 Diésel?",
            fontSize: {
              base: "56px",
              medium: "56px",
              xl: "56px",
            },
            lineHeight: {
              base: "110%",
              medium: "61.6px",
              xl: "61.6px",
            },
            fontFamily: {
              base: "var(--font-ToyotaType-Regular)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            },
            fontWeight: "400",
            fontStyle: "normal",
            textAlign: {
              base: "center", // Changed to center for all breakpoints
              medium: "center",
              xl: "center",
            },
            margin: {
              base: "45px auto 0px", // Changed to auto horizontal margins
              medium: "45px auto 0px",
              xl: "114px auto 0px",
            },
            letterSpacing: "-1.12px",
            color: "",
            verticalAlign: "middle",
          },
          description: {
            text: `Cuando hablamos de EURO 6, nos referimos a una norma europea de control de emisiones que establece los límites máximos permitidos para los vehículos. En Colombia, esta norma comenzó a regir en 2023 para todos los vehículos con motor diésel.`,
            fontSize: { base: "16px", medium: "12px", xl: "22px" },
            fontFamily: {
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-ToyotaType-Regular)",
            },
            fontStyle: {
              base: "normal",
              medium: "normal",
              xl: "normal",
            },
            width: {
              base: "90%", // Set width for all breakpoints
              medium: "90%",
              xl: "80%",
            },
            fontWeight: {
              base: "400",
              medium: "400",
              xl: "400",
            },
            textAlign: {
              base: "left", // Center for all breakpoints
              medium: "center",
              xl: "center",
            },
            lineHeight: {
              base: "30.4px",
              medium: "normal",
              xl: "normal",
            },
            padding: {
              base: "",
              medium: "",
              xl: "0 0 25px",
            },
            margin: {
              base: "36px auto", // Changed to auto horizontal margins
              medium: "10px auto",
              xl: "52px auto",
            },
          },
          viewstyle: {
            display: "flex",
            flexDirection: "column", // Direct value instead of responsive object
            alignItems: "center",
            justifyContent: "center",
            maxHeight: "none", // Remove height restrictions
            width: "100%",
            padding: {
              base: "20px",
              medium: "30px",
              xl: "30px 30px 60px",
            },
            margin: "0 auto",
          },
          layoutProps: {
            direction: "column", // Force column direction
            alignItems: "center", // Force center alignment
            width: "100%",
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          layout: "horizontal",
          title: {
            text: "¿Cómo funciona?",
            fontSize: {
              base: "32px",
              medium: "32px",
              xl: "26px",
            },
            lineHeight: {
              base: "41.6px",
              medium: "61.6px",
              xl: "normal",
            },
            fontFamily: {
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            },
            fontWeight: {
              base: "400",
              medium: "400",
              xl: "700",
            },
            fontStyle: {
              base: "normal",
              medium: "normal",
              xl: "normal",
            },
            textAlign: "left",
            margin: {
              base: "46px 15px 0",
              medium: "",
              xl: "",
            },
          },
          description: {
            text: `Para cumplir con el límite de emisiones establecido por la normativa, los vehículos certificados con EURO 6 incorporan un sistema integral que filtra y trata los gases de escape, reduciendo contaminantes como el material particulado y los óxidos de nitrógeno (NOx).`,
            fontSize: { base: "16px", medium: "12px", xl: "22px" },
            fontFamily: {
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-ToyotaType-Regular)",
            },
            fontStyle: {
              base: "normal",
              medium: "normal",
              xl: "normal",
            },
            fontWeight: {
              base: "400",
              medium: "400",
              xl: "400",
            },
            alignSelf: {
              base: "",
              medium: "",
              xl: "strech",
            },
            textAlign: "left",
            lineHeight: {
              base: "30.4px",
              medium: "normal",
              xl: "normal",
            },
            // padding: "38px 16px 0",
            padding: {
              base: "34px 16px 0px",
              medium: "10px 0px 0px 0px",
              xl: "40px 0px 0px 0px",
            },
            margin: {
              base: "",
              medium: "auto",
              xl: "auto",
            },
          },
          image: {
            src: "/images/cars/euro_6_unsplash_tysecUm5HJA.png",
            alt: "Toyota Hybrid Car",
            width: { base: "100%", xl: "100%" },
            height: "auto",
            objectFit: "fill",
            padding: {
              base: "46px 16px 0px 17px",
              medium: "0px 0px 0px 0px",
              xl: "0px 0px 0px 0px",
            },
            margin: {
              base: "0px 0px 0px 0px",
              medium: "0px 0px 0px 0px",
              xl: "0px auto",
            },
            borderRadius: {
              base: "",
              medium: "",
              xl: "8px",
            },
            maxWidth: {
              base: "",
              medium: "",
              xl: "500px",
            },
            minHeight: {
              base: "",
              medium: "450px",
              xl: "450px",
            },
          },
          viewstyle: {
            display: "flex",
            flexDirection: { base: "column", xl: "row" },
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            maxHeight: {
              base: "auto",
              medium: "450px",
              xl: "450px",
            },
            width: {
              base: "",
              medium: "",
              xl: "100%",
            },
            // padding: {
            //   base: "",
            //   medium: "",
            //   xl: "0 30px",
            // },
            margin: {
              base: "",
              medium: "113px auto",
              xl: "0px auto 0px ",
            },
          },
        },
      },
      {
        component: "AWSAmplifyComponent",
        props: {
          layout: "horizontal",
          title: {
            text: "Si tienes un vehículo Diésel Toyota debes tener en cuenta lo siguiente:",
            fontSize: {
              base: "26px",
              medium: "32px",
              xl: "26px",
            },
            lineHeight: {
              base: "normal",
              medium: "61.6px",
              xl: "normal",
            },
            fontFamily: {
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-toyotaDisplay)",
              xl: "700px",
            },
            fontWeight: {
              base: "700",
              medium: "700",
              xl: "700",
            },
            fontStyle: {
              base: "normal",
              medium: "normal",
              xl: "700px",
            },
            textAlign: "left",
            margin: {
              base: "70px 15px 47px 16px",
              medium: "70px 15px 47px 16px",
              xl: "70px 0px 52px ",
            },
            color: "",
          },
          description: {
            text: `Los vehículos diésel con sistema EURO 6 requieren una regeneración del filtro de partículas cuando alcanzan ciertos niveles de saturación. Este proceso puede realizarse de manera automática o de forma manual. La regeneración elimina los residuos acumulados. Por ello, es importante que tengas en cuenta que:`,
            fontSize: { base: "16px", medium: "12px", xl: "22px" },
            fontFamily: {
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-ToyotaType-Regular)",
            },
            fontStyle: {
              base: "normal",
              medium: "normal",
              xl: "normal",
            },
            fontWeight: {
              base: "400",
              medium: "400",
              xl: "400",
            },
            alignSelf: {
              base: "",
              medium: "",
              xl: "strech",
            },
            textAlign: {
              base: "left", 
              xl: "center",
            }, 
            lineHeight: {
              base: "30.4px",
              medium: "normal",
              xl: "normal",
            },
            // padding: "38px 16px 0",
            padding: {
              base: "20px 20px",
              medium: "20px 20px",
              xl: "40px 40px",
            },
            margin: {
              base: "",
              medium: "auto",
              xl: "auto",
            },
          },
          viewstyle: {
            display: "flex",
            flexDirection: { base: "column", xl: "row" },
            alignItems: "center",
            justifyContent: "center",
            maxHeight: {
              base: "auto",
              medium: "450px",
              xl: "450px",
            },

            padding: {
              base: "",
              medium: "",
              xl: "0 30px",
            },
            margin: {
              base: "",
              medium: "113px auto",
              xl: "0",
            },
          },
        },
      },

      // Update this slider to Accpet the dynamic data : Slide 1: (ADBLUE), Slide 2: Regeneración automática (DPF).
      {
        component: "SliderSection",
        props: {
          showButton: false, // Boolean value instead of string
          theme: "light",
          displayType: "card",
          customStyles: {
            padding: {
              base: "2.8125rem 1.5rem 3rem",
              xl: "3.375rem 150px 5rem",
            },
            maxWidth: {
              base: "100%",
              xl: "100%",
            },
            margin: {
              base: "0 auto",
              xl: "0 auto",
            },
          },
          items: [
            // {
            //   title: "ADBLUE®",
            //   description:
            //     "Su almacenamiento depende del distribuidor, pero principalmente se debe hacer en contenedores de polipropileno, en espacios donde no estén directamente a la luz solar ni superen temperaturas por debajo de los -11°C",
            //   // Mobile logo - single image
            //   mobileLogos: [
            //     {
            //       src: "/images/basf-combined.svg",
            //       alt: "BASF Logo",
            //       height: "80px",
            //       width: "auto",
            //       objectFit: "contain",
            //     },
            //   ],
            //   // Desktop logos - multiple images with custom dimensions
            //   desktopLogos: [
            //     {
            //       src: "/images/basf1.svg",
            //       alt: "BASF Logo 1",
            //       height: "100px",
            //       width: "auto",
            //       objectFit: "contain",
            //     },
            //     {
            //       src: "/images/basf2.svg",
            //       alt: "BASF Logo 2",
            //       height: "100px",
            //       width: "auto",
            //       objectFit: "contain",
            //     },
            //     {
            //       src: "/images/basf3.svg",
            //       alt: "BASF Logo 3",
            //       height: "100px",
            //       width: "auto",
            //       objectFit: "contain",
            //     },
            //   ],
            // },
            {
              title: "Tu vehículo tiene un Filtro de Partículas Diésel (DPF)",
              description: " ",
              primaryTitlePoints: [
                "Este filtro atrapa el hollín del motor diésel y lo quema, reduciendo emisiones y protegiendo el medio ambiente sin que tú lo notes.",
              ],
              secondaryDescription: "¿Cómo funciona?",
              bulletPoints: [
                "El DPF captura las partículas sólidas que hay en los gases del escape de tu vehículo, evitando que se liberen al ambiente.",
                "Cuando el filtro se satura, necesita limpiarse para seguir funcionando. Este proceso se llama regeneración y hace que el hollín acumulado se queme y de esta manera quede limpio.",
              ],
            },
            {
              title:
                "Regeneración automática del Filtro de Partículas Diésel (DPF)",
              description:
                "El vehículo realizaría la regeneración automáticamente siempre y cuando en el trayecto recorrido se cumplan con las siguientes condiciones:",
              primaryTitlePoints: [
                "Mantén una conducción continua de 20 a 30 minutos a una velocidad aproximada de 60 km/h.",
              ],
              secondaryDescription:
                "Si no se cumplen las condiciones para que se realice la regeneración del filtro de manera automática, entonces deberá hacerse la limpieza manual: ",
              bulletPoints: [
                "El testigo indicará cuándo es necesario realizar la regeneración mediante la activación del interruptor.",
                "El vehículo aumentará automáticamente las revoluciones por minuto del motor... ¡No te preocupes ni lo apagues! Es normal. ",
                "Realiza el proceso en espacios abiertos, alejados de sustancias inflamables y con suficiente distancia de personas y animales, ya que comenzará a salir una gran cantidad de humo blanco con un olor diferente al habitual, lo cual es normal mientras se realiza el proceso. ",
                "El vehículo te indicará cuando el proceso haya finalizado. ",
              ],
            },
            {
              title: "Durante la conducción tu vehículo consumirá AdBlue®",
              description:
                "La tecnología Reducción Catalítica Selectiva (SCR) limpia los gases del motor diésel, transformando contaminantes NOx en vapor de agua y nitrógeno usando AdBlue® (urea automotriz).",
              bulletPoints: [
                "El sistema mostrará una advertencia en la pantalla del tablero de instrumentos cuando la autonomía restante sea de 2.400 km y luego de 800 km, indicando la necesidad de recargar la urea automotriz AdBlue®.",
                "AdBlue® es un producto registrado que debe cumplir la norma ISO 22241-1.",
                "Podrás conseguirla en cualquiera de nuestros concesionarios de la red o en establecimientos de comercio confiables, de alto tráfico y de marcas reconocidas.",
                "El consumo de AdBlue® podrá variar de las condiciones de uso del vehículo y la calidad del combustible, por eso ten en cuenta las recomendaciones.",
              ],
            },
            {
              title:
                "Para que tu Sistema de Control de Emisiones Diésel Euro 6 funciones adecuadamente, te sugerimos: ",
              description: " ",
              bulletPoints: [
                "Tanquear el vehículo en estaciones de servicio confiables, de alto tráfico y de marcas reconocidas.",
                "Revisar el nivel de saturación del filtro a través del indicador en la pantalla del tablero de instrumentos. Bajo ciertas condiciones, el proceso de regeneración se activará automáticamente o solicitará su ejecución de forma manual.",
                "Mantén la urea automotriz en los niveles adecuados, revisando el testigo en el tablero del vehículo (si aplica) o verificando el depósito de urea automotriz que disponga tu vehículo.",
                "Cualquier duda adicional, consulta el Manual del Propietario o visita el concesionario de la red Toyota de tu preferencia. ",
              ],
            },
            // {
            //   title: "Regeneración automática (DPF)",
            //   description:
            //     "La regeneración comienza cuando el vehículo cumple con las siguientes condiciones: Se debe llevar una conducción continua entre 20 a 30 minutos a una velocidad aproximada de 60 km/h y el motor debe ir mínimo a 1.800 rpm.",
            //   secondaryDescription:
            //     "Se puede requerir una regeneración manual si usualmente utiliza el vehículo bajo alguna o varias de las siguientes condiciones:",
            //   bulletPoints: [
            //     "Manejo en cortos períodos de tiempo: menos de 10 minutos.",
            //     "Manejo constante a bajas velocidades: Menos de 20 km/h.",
            //     "Circulación constante a más de 4.000 metros sobre el nivel del mar.",
            //   ],
            // },
          ],
        },
      },
      {
        component: "AWSAmplifyComponent",
        props: {
          layout: "horizontal",
          title: {
            text: "En el caso que tu vehículo lo requiera, este proceso se podrá realizar de forma manual",
            fontSize: {
              base: "26px",
              medium: "26px",
              xl: "26px",
            },
            lineHeight: {
              base: "normal",
              medium: "normal",
              xl: "normal",
            },
            fontFamily: {
              base: "var(--font-ToyotaType-Regular)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            },
            fontWeight: "700",
            fontStyle: "normal",
            textAlign: {
              base: "left",
              medium: "center",
              xl: "center",
            },
            margin: {
              base: "87.01px 15px 0px 16px",
              medium: "",
              xl: "85px 0px 0px",
            },
            color: "",
          },

          viewstyle: {
            display: "flex",
            flexDirection: { base: "column", xl: "row" },
            alignItems: "center",
            justifyContent: "center",
            width: {
              base: "",
              medium: "",
              xl: "",
            },
            maxHeight: {
              base: "auto",
              medium: "450px",
              xl: "450px",
            },

            padding: {
              base: "",
              medium: "",
              xl: "0 30px",
            },
            margin: {
              base: "",
              medium: "",
              xl: "auto",
            },
          },
        },
      },

      // Make this component to accept Dynamic data .
      {
        component: "SliderSection",
        props: {
          theme: "light", // or "light" depending on your design
          // title: "Innovative Social Impact Programs",
          // description:
          //   "Explore our efforts to promote diversity, equity, and inclusion through powerful community-driven projects.",
          items: [
            {
              image: {
                src: "/images/card1.png",
                alt: "Breast Cancer Awareness Campaign",
                objectFit: "contain",
              },
              title: "1",
              description:
                "Busca un lugar despejado al aire libre, alejado de sustancias inflamables, personas y animales para realizar el proceso de regeneración del filtro.",
            },
            {
              image: {
                src: "/images/card2.png",
                alt: "Captura-de-pantalla",
                objectFit: "contain",
              },
              title: "2",
              description:
                "Asegura el vehículo activando el freno de estacionamiento. Para los vehículos con transmisión manual, coloca la palanca de cambios en la posición neutra. En el caso de los vehículos con transmisión automática, selecciónala en la posición 'P' (Parking).",
            },
            {
              image: {
                src: "/images/card3.png",
                alt: "car_engine.png",
                objectFit: "contain",
              },
              title: "3",
              description:
                "Tener el motor encendido y en su temperatura normal de operación.​",
            },
            {
              image: {
                src: "/images/card4.png",
                alt: "Breast Cancer Awareness Campaign",
                objectFit: "contain",
              },
              title: "4",
              description:
                "No utilices ni presiones ningún pedal—ya sea el acelerador, el freno o el embrague—según el tipo de transmisión del vehículo.",
            },
            {
              image: {
                src: "/images/card5.png",
                alt: "Captura-de-pantalla",
                objectFit: "contain",
              },
              title: "5",
              description:
                "Activa el botón de regeneración del filtro cuando el vehículo lo requiera, inicia el proceso y espera entre 10 y 30 minutos.",
            },
            {
              image: {
                src: "/images/card6.png",
                alt: "car_engine.png",
                objectFit: "contain",
              },
              title: "6",
              description:
                "Durante el proceso de regeneración es posible que el motor se revolucione, expulse humo blanco y se perciba un cambio en el olor.​​",
            },
            {
              image: {
                src: "/images/card7.png",
                alt: "car_engine.png",
                objectFit: "contain",
              },
              title: "7",
              description:
                "Una vez el proceso de regeneración haya finalizado, se podrá validar en la pantalla del tablero de instrumentos que los niveles estén en un punto mínimo.​​",
            },
          ],
        },
      },
      //fan Svg

      // {
      //   component: "AWSAmplifyComponent",
      //   props: {
      //     image: {
      //       src: "/svgs/fan.svg",
      //       alt: "Fan Image",
      //       width: { base: "100%", xl: "100%" },
      //       height: { base: "80px", xl: "200px" },
      //       objectFit: "contain",
      //       padding: {
      //         base: "40px 170px 0px",
      //         medium: "",
      //         xl: "110px 170px 40px 140px",
      //       },
      //     },
      //     viewstyle: {
      //       margin: {
      //         base: "",
      //         medium: "0 auto",
      //         xl: "0 auto",
      //       },
      //     },
      //   },
      // },

      // {
      //   component: "AWSAmplifyComponent",
      //   props: {
      //     layout: "horizontal",
      //     title: {
      //       text: `¿Cuáles son los modelos Toyota que cumplen con la norma  EURO 6 en el país?`,
      //       fontSize: {
      //         base: "18px",
      //         medium: "26px",
      //         xl: "56px",
      //       },
      //       lineHeight: {
      //         base: "normal",
      //         medium: "normal",
      //         xl: "61.6px",
      //       },
      //       fontFamily: {
      //         base: "var(--font-ToyotaType-Regular)",
      //         medium: "var(--font-toyotaDisplay)",
      //         xl: "var(--font-ToyotaType-Regular)",
      //       },
      //       fontWeight: "400",
      //       fontStyle: "normal",
      //       textAlign: {
      //         base: "center", // Changed from "left" to "center"
      //         medium: "center",
      //         xl: "center",
      //       },
      //       padding: {
      //         base: "20px 70px 40px 70px",
      //         medium: "",
      //         xl: "0px 270px 40px 270px",
      //       },
      //       margin: {
      //         base: "0 auto",
      //         medium: "",
      //         xl: "40px",
      //       },
      //       letterSpacing: "-1.12px",
      //       color: "",
      //     },
      //     viewstyle: {
      //       display: "flex",
      //       flexDirection: { base: "column", xl: "row" },
      //       alignItems: "center",
      //       justifyContent: {
      //         base: "center", // Changed from "start" to "center"
      //         medium: "center",
      //         xl: "center",
      //       },
      //       width: {
      //         base: "100%", // Changed from "220px" to "100%" for better mobile display
      //         medium: "",
      //         xl: "100%",
      //       },
      //       maxHeight: {
      //         base: "auto",
      //         medium: "450px",
      //         xl: "450px",
      //       },
      //       padding: {
      //         base: "0 50px",
      //         medium: "0 210px",
      //         xl: "0 210px",
      //       },
      //       margin: {
      //         base: "auto",
      //         medium: "",
      //         xl: " 100px",
      //       },
      //     },
      //   },
      // },
      // A Component needs to be added here
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
          layout: "horizontal",
          title: {
            text: `Los vehículos con sistema EURO 6 pueden requerir una liberación de gases manual que depende de 3 factores: circulación constante a más de 4.000 metros sobre el nivel del mar.`,
            fontSize: {
              base: "16px",
              medium: "32px",
              xl: "32px",
            },
            lineHeight: {
              base: "normal",
              medium: "normal",
              xl: "61.6px",
            },
            width: {
              base: "100%",
              medium: "calc(100% - 80px",
              xl: "calc(100% - 80px",
            },

            fontFamily: {
              base: "var(--font-ToyotaType-Regular)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-toyotaDisplay)",
            },
            fontWeight: "400",
            fontStyle: "normal",
            textAlign: {
              base: "center",
              medium: "center",
              xl: "center",
            },
            padding: {
              base: "50px 37.5px",
              medium: "",
              xl: "100px 50px",
            },
            margin: {
              base: "0 auto",
              medium: "",
              xl: "32px 0px 87px",
            },
            color: "white",
          },
          viewstyle: {
            display: "flex",
            flexDirection: { base: "column", xl: "row" },
            alignItems: "center",
            backgroundColor: "#000",
            justifyContent: {
              base: "start",
              medium: "center",
              xl: "center",
            },
            width: {
              base: "100%",
              medium: "",
              xl: "100%",
            },
            maxHeight: {
              base: "auto",
              medium: "450px",
              xl: "450px",
            },
            padding: {
              base: "",
              medium: "",
              xl: "0 30px",
            },
            margin: {
              base: "auto",
              medium: "",
              xl: "auto",
            },
          },
        },
      },

      /* add here components Filtro de Partículas Diesel */

      {
        component: "AWSAmplifyComponent",
        props: {
          title: "Preguntas Frecuentes",
          fontSize: { base: "32px", xl: "2rem" },
          fontFamily: "var(--font-toyotaDisplay)",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "41.6px",
          textAlign: "center",
          padding: "40px 15px 0px 15px",
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
                  title: "¿En qué consiste la reglamentación 0762 de 2022?",
                  content:
                    "Con el objeto de proteger el ambiente, la salud, el derecho a un ambiente sano y a la vida humana, la reglamentación 0762 de 2022 define los límites permitidos para la emisión de partículas contaminantes que deben cumplir las fuentes móviles terrestres con motor Diesel, bajo la reglamentación Euro 6. Esta implementación aplica si las unidades son importadas, ensambladas o de fabricación nacional. Adicionalmente, reglamenta los requisitos y certificaciones a las que están sujetas y adopta otras disposiciones en pro de la garantía de los derechos de salud y al medio ambiente sano teniendo como fecha de entrada en vigor el próximo 1 de enero del 2023.",
                },
                {
                  title: "¿Qué es la clasificación Euro?",
                  content:
                    "La normativa Euro es la más importante a nivel global en cuanto al control de emisiones contaminantes generadas por vehículos propulsados por algún combustible fósil. Cada etapa del Euro incluye límites más estrictos basándose en los lineamientos que existen a nivel global y a las condiciones exigidas en cada país. Actualmente, el nivel más estricto de control de emisiones a nivel mundial es el denominado Euro 6.",
                },
                {
                  title: "¿Qué significa la normativa  EURO 6 para su marca",
                  content:
                    "Para cumplir con la norma, nuestro equipo definió que el portafolio Diesel integrará los sistemas: Filtro de Partículas Diesel DPF y Reducción Catalítica Selectiva SCR, para dar cumplimiento a esta normativa. La integración de esta tecnología iniciará con Toyota Prado. • DPF: su objetivo es recolectar y purificar el material particulado que viaja en los gases generados por la combustión del motor. Su funcionamiento responde a un filtro que atrapa las partículas y las purifica. A medida que el material particulado se acumula en el filtro, el sistema indica el estado de saturación de este en el tablero de instrumentos. Una vez alcanza el límite de saturación, debe iniciar el proceso de regeneración o limpieza del filtro. Para este proceso, existen dos modalidades, la regeneración automática o la manual. La primera se ejecuta bajo tres condiciones: que el vehículo lleve una conducción continua entre los 20-30 minutos a una velocidad promedio de 60 km/h y que el motor vaya a 1.800 rpm o más. Mientras que, al no cumplirse las condiciones de regeneración automática, es necesario realizarla de manera manual. El tablero muestra una alerta indicando que se debe realizar una regeneración manual, para la cual es necesario oprimir un botón situado al lado inferior izquierdo del tablero de instrumentos. Para este proceso se debe seguir los siguientes pasos: 1. Estacionarse en un lugar seguro al aire libre. 2. Asegurarse de que no haya personas, animales, ni materiales inflamables cerca al tubo de escape. 3. Mantener encendido el vehículo. 4. Dejarlo en posición de parqueo (P). 5. No accionar en ningún momento el pedal de freno o acelerador, ya que se interrumpiría el proceso. • SCR: este sistema tiene como objetivo reducir las emisiones de óxidos nitrosos (NOX). Para ello se requiere el uso del aditivo AdBlue® (urea automotriz), el cual es mezclado con los gases que viajan por el escape generando reacciones químicas que tienen como resultado partículas de nitrógeno y vapor de agua. Adicionalmente, se sugiere utilizar siempre combustible Diesel (ACPM) con 10 ppm de azufre o menos alineado con el estándar de emisiones Euro 6. Sin embargo, dada la calidad del combustible disponible en el país, que puede tener mayor contenido de azufre, es normal que se produzca un olor fuerte y grandes cantidades de humo blanco por el sistema de escape del vehículo durante la ejecución del proceso de regeneración.",
                },
              ],
            },
          ],
          viewStyle: {
            bgColor: { base: "fff", xl: "#F6F6F6" },
            margin: {
              base: "57px 25px 42px",
              xl: "148px auto 82px",
            },
            padding: {
              base: "auto",
              xl: "50px",
            },
            maxWidth: {
              base: "100%",
              xl: "80%",
            },
          },
        },
      },

      {
        component: "AWSAmplifyComponent",
        props: {
          layout: "horizontal",
          title: {
            text: `Euro 6`,
            fontSize: { base: "14px", xl: "14px" },
            fontFamily: {
              base: "var(--font-ToyotaType-Regular)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-toyotaDisplay)",
            },
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "19.6px",
            margin: { base: "0", xl: "0 auto" },
            textAlign: { base: "left", xl: "center" },
            padding: {
              base: "48px 15px 0px",
              medium: "48px 15px 0px",
              xl: "48px 15px 0px",
            },
          },
          description: {
            text: `Materiales Descargables`,
            fontSize: {
              base: "32px",
              medium: "26px",
              xl: "56px",
            },
            lineHeight: {
              base: "41.6px",
              medium: "normal",
              xl: "61.6px",
            },
            fontFamily: {
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            },
            fontWeight: "400",
            fontStyle: "normal",
            textAlign: {
              base: "left",
              medium: "center",
              xl: "center",
            },
            letterSpacing: {
              base: "",
              medium: "",
              xl: "-1.12px",
            },
            margin: {
              base: "auto",
              medium: "",
              xl: "0 auto",
            },
            padding: {
              base: "10px 15px 0px",
              medium: "",
              xl: "12px 0px 78px",
            },
            color: "",
          },
          viewstyle: {
            display: "flex",
            flexDirection: { base: "column", xl: "row" },
            backgroundColor: "#E7EDF1",
            alignItems: "center",
            justifyContent: "center",
            width: {
              base: "100%",
              medium: "",
              xl: "100%",
            },
            maxHeight: {
              base: "auto",
              medium: "450px",
              xl: "450px",
            },

            padding: {
              base: "",
              medium: "",
              xl: "0 30px",
            },
            marginTop: {
              base: "85px",
              medium: "85px",
              xl: "85px",
            },
          },
        },
      },
      {
        component: "RedCardInfo",
        props: {
          title: "Informe de Sostenibilidad 2023",
          leftIcon: "/images/icons/filterVector.png",
          rightIcon: "/images/icons/right-arrow-Vector.png",
          iconAltLeft: "Car Check",
          iconAltRight: "Arrow",
          downloadUrl: "/images/pdf/Informe_sostenibilidad_2023_Toyota.pdf",
        },
      },
    ];
    [vehicles]
  }, [vehicles]); // ✅ <-- dependency array


  return (
    <div>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
