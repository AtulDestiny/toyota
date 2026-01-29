"use client";

import { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import { NewVehiclesFilter as Filter } from "@/components/Filter";
import { Grid, View } from "@aws-amplify/ui-react";
import { NewVehiclesCardList } from "@/components/CardsList";
import { useSearchParams } from "next/navigation";
import { Vehicle } from "@/components/CardsList/NewVehicles/NewVehicles";

const vehiclesData: Vehicle[] = [
  {
    name: "Yaris",
    modelName: "YARIS XS HB CVT",
    id: "yaris",
    slug: "yaris",
    description: "Tu primer Toyota",
    image: "/images/seleccion-toyota-jun-Yaris.png",
    cotizarLink: "/cotizador/yaris",
    link: "/vehiculos/autos/yaris",
    category: { type: ["Automoviles"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "5",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Yaris",
          value: "Yaris",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$87.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Fortuner",
    modelName: "FORTUNER SR 4X2 DIÉSEL 2.8",
    id: "Fortuner",
    slug: "fortuner",
    description: "Cada destino es mejor en compañía",
    image: "/images/seleccion-toyota-jun-Fortuner.png",
    cotizarLink: "/cotizador/fortuner",
    link: "/vehiculos/camionetas/fortuner",
    type: "Gasolina / Diésel",
    category: { type: ["Camionetas"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "7",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Fortuner",
          value: "Fortuner",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$239.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Land Cruiser 300",
    id: "land-cruiser",
    slug: "land-cruiser",
    description: "Una presencia robusta",
    image: "/images/seleccion-toyota-jun-LC300.png",
    cotizarLink: "/cotizador/land-cruiser-300",
    type: "Gasolina",
    link: "/vehiculos/camionetas/land-cruiser-300",
    category: { type: ["Camionetas"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "7",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Land Cruiser 300",
          value: "Land Cruiser 300",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$633.500.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Land Cruiser 300 GR-S",
    modelName: "LC300 GASOLINA GR-S",
    id: "land-cruiser-gr-s",
    slug: "land-cruiser-gr-s",
    description: "Una presencia robusta",
    image: "/images/seleccion-toyota-jun-LC300GR.png",
    cotizarLink: "/cotizador/land-cruiser-300-gr-s",
    link: "/vehiculos/camionetas/land-cruiser-300-gr-s",
    category: { type: ["Camionetas", "Deportivos"] },
    type: "Gasolina",
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "7",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Land Cruiser 300 GR-S",
          value: "Land Cruiser 300 GR-S",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$662.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Land Cruiser Prado",
    type: "Gasolina / Diésel",
    id: "land-cruiser-prado",
    slug: "land-cruiser-prado",
    description: "El legado que abre nuevos caminos",
    image: "/images/seleccion-toyota-jun-LCPrado.png",
    cotizarLink: "/cotizador/land-cruiser-prado",
    link: "/vehiculos/camionetas/land-cruiser-prado",
    category: { type: ["Camionetas"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "7",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Land Cruiser Prado",
          value: "Land Cruiser Prado",
          modelsByYear: {
            items: [
              {
                name: "2025",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$303.500.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Hilux",
    id: "hilux",
    slug: "hilux",
    description: "Fuerza y durabilidad",
    image: "/images/seleccion-toyota-jun-Hilux.png",
    cotizarLink: "/cotizador/hilux",
    type: "Gasolina / Diésel",
    link: "/vehiculos/pick-ups/hilux",
    category: { type: ["Pick-Ups"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "5",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Hilux",
          value: "Hilux",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$175.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  // {
  //   name: "Hilux Cargo Max",
  //   modelName: "HILUX CH. ESTACAS 4X4 DIÉSEL 2.4 MT",
  //   id: "cargo-max",
  //   slug: "cargo-max",
  //   description: "Potencia y rendimiento",
  //   image: "/images/seleccion-toyota-jun-HiluxCargoMax.png",
  //   cotizarLink: "/cotizador/hilux",
  //   type: "Diésel",
  //   link: "/vehiculos/pick-ups/hilux-cargomax",
  //   category: { type: ["Pick-Ups"] },
  //   vehicleAttribs: {
  //     items: [
  //       {
  //         name: "Asientos Disponibles",
  //         value: "5",
  //       },
  //     ],
  //   },
  //   models: {
  //     items: [
  //       {
  //         id: "model-1",
  //         name: "Hilux",
  //         value: "Hilux",
  //         modelsByYear: {
  //           items: [
  //             {
  //               name: "2026",
  //               priceListsByFeature: {
  //                 items: [
  //                   {
  //                     priceList: {
  //                       name: "$185.500.000",
  //                     },
  //                   },
  //                 ],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   },
  // },
  {
    name: "Hilux GR-S",
    modelName: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT",
    id: "hilux-gr-s",
    slug: "hilux-gr-s",
    description: "Fuerza y durabilidad",
    image: "/images/seleccion-toyota-jun-HiluxGR.png",
    cotizarLink: "/cotizador/hilux-gr-s",
    type: "Diésel",
    link: "/vehiculos/pick-ups/hilux-gr-s",
    category: { type: ["Pick-Ups", "Deportivos"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "5",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Hilux GR-S",
          value: "Hilux GR-S",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$309.500.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Fortuner GR-S",
    modelName: "FORTUNER GR-S 4X4 DIÉSEL 2.8",
    id: "fortuner-gr-s",
    slug: "fortuner-gr-s",
    description: "Cada destino es mejor en compañía",
    image: "/images/seleccion-toyota-jun-FortunerGR.png",
    cotizarLink: "/cotizador/fortuner-gr-s",
    link: "/vehiculos/camionetas/fortuner-gr-s",
    type: "Diesel",
    category: { type: ["Camionetas", "Deportivos"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "7",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Fortuner GR-S",
          value: "Fortuner GR-S",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$335.500.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Land Cruiser 79",
    id: "land-cruiser-79",
    slug: "land-cruiser-79",
    description: "Un ícono de resistencia y durabilidad",
    image: "/images/seleccion-toyota-jun-LC79.png",
    cotizarLink: "/cotizador/land-cruiser",
    type: "Gasolina",
    link: "/vehiculos/pick-ups/hilux-cargomax",
    category: { type: ["Pick-Ups"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "5",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Land Cruiser 79",
          value: "Land Cruiser 79",
          modelsByYear: {
            items: [
              {
                name: "2025",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$255.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  // {
  //   name: "Tundra",
  //   id: "tundra",
  //   slug: "tundra",
  //   description: "Creada para despertar miradas",
  //   image: "/images/seleccion-toyota-jun-Tundra.png",
  //   cotizarLink: "/cotizador/tundra",
  //   type: "Gasolina",
  //   link: "/vehiculos/pick-ups/tundra",
  //   category: { type: ["Pick-Ups"] },
  //   vehicleAttribs: {
  //     items: [
  //       {
  //         name: "Asientos Disponibles",
  //         value: "5",
  //       },
  //     ],
  //   },
  //   models: {
  //     items: [
  //       {
  //         id: "model-1",
  //         name: "Land Cruiser 79",
  //         value: "Land Cruiser 79",
  //         modelsByYear: {
  //           items: [
  //             {
  //               name: "2025",
  //               priceListsByFeature: {
  //                 items: [
  //                   {
  //                     priceList: {
  //                       name: "$432.000.000",
  //                     },
  //                   },
  //                 ],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   },
  // },
  {
    name: "Corolla",
    id: "corolla",
    slug: "corolla",
    description: "En cada camino empieza una historia",
    image: "/images/seleccion-toyota-jun-Corolla.png",
    cotizarLink: "/cotizador/corolla",
    type: "Gasolina / Híbrido",
    link: "/vehiculos/hibridos/corolla",
    category: { type: ["Automoviles", "Hibridos"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "5",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Corolla",
          value: "Corolla",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$109.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Yaris Cross",
    modelName: "YARIS CROSS XS HEV",
    id: "yaris-cross",
    slug: "yaris-cross",
    description: "Kilómetros de eficiencia en cada viaje",
    image: "/images/seleccion-toyota-jun-YarisCross.png",
    cotizarLink: "/cotizador/yaris-cross",
    type: "Híbrido",
    link: "/vehiculos/hibridos/yaris-cross",
    category: { type: ["Camionetas", "Hibridos"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "5",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Yaris Cross",
          value: "Yaris Cross",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$132.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Corolla Cross",
    modelName: "COROLLA CROSS XEI HEV",
    id: "crolla-cross",
    slug: "crolla-cross",
    description: "Muévete a tu mejor versión",
    image: "/images/seleccion-toyota-jun-CorollaCross.png",
    cotizarLink: "/cotizador/corolla-cross",
    type: "Gasolina / Híbrido",
    link: "/vehiculos/hibridos/corolla-cross",
    category: { type: ["Camionetas", "Hibridos"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "5",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Corolla Cross",
          value: "Corolla Cross",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$135.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Corolla Cross GR-S",
    id: "crolla-cross-gr-s",
    slug: "crolla-cross-gr-s",
    description: "Muévete a tu mejor versión",
    image: "/images/seleccion-toyota-jun-CorollaCrossGR.png",
    cotizarLink: "/cotizador/corolla-cross-gr-s",
    type: "Gasolina",
    link: "/vehiculos/hibridos/corolla-cross-gr-s",
    category: { type: ["Camionetas", "Deportivos"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "5",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Corolla Cross GR-S",
          value: "Corolla Cross GR-S",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$161.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Corolla GR-S",
    id: "crolla-gr-s",
    slug: "crolla-gr-s",
    description: "En cada camino empieza una historia",
    image: "/images/seleccion-toyota-jun-CorollaGR.png",
    cotizarLink: "/cotizador/corolla-gr-s",
    type: "Gasolina",
    link: "/vehiculos/deportivos-tgr/corolla-gr-s",
    category: { type: ["Automoviles", "Deportivos"] },
    vehicleAttribs: {
      items: [
        {
          name: "Asientos Disponibles",
          value: "5",
        },
      ],
    },
    models: {
      items: [
        {
          id: "model-1",
          name: "Corolla GR-S",
          value: "Corolla GR-S",
          modelsByYear: {
            items: [
              {
                name: "2026",
                priceListsByFeature: {
                  items: [
                    {
                      priceList: {
                        name: "$130.900.000",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
];

export default function App() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo");

  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [filterPanel, setFilterPanel] = useState<boolean>(false);

  // Map URL parameter to filter values
  const getFilterValueForTipo = (tipo: string | null): string | null => {
    switch (tipo?.toLowerCase()) {
      case "autos":
        return "Automoviles";
      case "camionetas":
        return "Camionetas";
      case "pick-ups":
        return "Pick-Ups";
      case "hibridos":
        return "Hibridos";
      case "deportivos":
        return "Deportivos";
      default:
        return null;
    }
  };

  useEffect(() => {
    if (tipo) {
      const filterValue = getFilterValueForTipo(tipo);
      if (filterValue) {
        setFilters({ Vehículos: [filterValue] });
      }
    }
  }, [tipo]);

  function toggleFilterPanel(): void {
    setFilterPanel(!filterPanel);
  }

  return (
    <>
      <SectionTitle
        title="Vehículos Toyota Colombia"
        subtitle="Encuentra el Toyota perfecto para ti:"
        titleFontSize={{ base: "lg" }}
        subtitleFontSize={{ base: "sm", xl: "md" }}
        titlelineHeight="130%"
        titleFontWeight="400"
        SublitlelineHeight="normal"
        SubtitlefontFamily="var(--font-ToyotaType-Regular)"
        padding={{ base: "31px 1rem 21px", xl: "4rem 1rem 2.75rem" }}
      />
      <View backgroundColor={"#F6F6F6"} border={"4px solid white"}>
        <Grid
          templateColumns={{ xl: "auto 1fr", xxl: "378px auto" }}
          gap={{ xl: "2rem", xxl: "5.4375rem" }}
          maxWidth={"1920px"}
          position={{ base: "static", xl: "relative" }}
          margin={"0 auto"}
        >
          <View
            position={{ xl: "sticky" }}
            top={{ xl: "50px" }}
            alignSelf="start"
          >
            <Filter
              filters={filters}
              setFilters={setFilters}
              opened={filterPanel}
              toggle={toggleFilterPanel}
              filterData={vehiclesData}
            />
          </View>
          <NewVehiclesCardList
            filters={filters}
            toggleFilterPanel={toggleFilterPanel}
            destailsButton={true}
            data={vehiclesData}
          />
        </Grid>
      </View>
    </>
  );
}
