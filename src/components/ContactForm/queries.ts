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
const VEHICLES_API_URL = process.env.NEXT_PUBLIC_VEHICLES_API_URL;
const VEHICLES_API_AUTHORIZATION = process.env.NEXT_PUBLIC_VEHICLES_API_AUTHORIZATION;

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;

type VehiclesSlugsData = {
  data: {
    listVehicles: {
      items: {
        slug: string;
      }[];
    };
  };
};

const GRAPHQL_API_SLUGS_QUERY = `query ListVehicles { listVehicles { items { slug } } }`
const GRAPHQL_API_VEHICLE_QUERY = `
  query GetVehicleAndModelsBySlug($slug: String!) {
    listVehicles(filter: {slug: {eq: $slug}}) {
      items {
        id
        name
        idLinea
        idRunt
        slug
        models {
          items {
            id
            idSublinea
            name
            slug
            modelsByYear {
              items {
                id
                security_icon_1
                security_icon_2
                security_icon_3
                security_icon_4
                security_icon_5
                airbag_count
                priceListsByFeature {
                  items {
                    id
                    priceListLines {
                      items {
                        value
                      }
                    }
                  }
                }
                colorsByModel {
                  items {
                    color {
                      name
                    }
                    gallery {
                      galleryAssets {
                        items {
                          name
                          params
                          type
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
            ModelAttrib {
              items {
                name
                value
                key
              }
            }
            documentsByModel {
              items {
                document {
                  name
                  description
                }
              }
            }
          }
        }
      }
    }
  }
`;

const listCitiesQuery = /* GraphQL */ `
  query ListAllCitiesSortedByName {
    listAllCitiesSortedByName(
      allCitiesPartition: "GLOBAL_CITY_LIST"
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

const listOfficesByCityQuery = /* GraphQL */ `
  query ListOfficesByCity($filter: ModelOfficeFilterInput) {
    listOffices(filter: $filter) {
      items {
        id
        name
        address
        phone
        appointmentPhone
        email
        website
        idVitrina
        concessionaire {
          id
          name
        }
        city {
          id
          name
          externalId
        }
      }
    }
  }
`;


export const fetchOfficesByCityRaw = async (cityId: string) => {
  if (!cityId) return [];

  try {
    const res = await fetch(GRAPHQL_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": GRAPHQL_API_KEY!,
      },
      body: JSON.stringify({
        query: listOfficesByCityQuery,
        variables: {
          filter: { cityId: { eq: cityId } } // Correct field name
        },
      }),
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return [];
    }
    const offices = json?.data?.listOffices?.items || [];

    return offices.map((office: any) => ({
      value: office.id,
      label: office.name,
      officeExternalId: office.idVitrina,
      cityExternalId: office.city?.externalId,
    }));
  } catch (error) {
    console.error("Error fetching offices:", error);
    return [];
  }
};


export const fetchCitiesRaw = async () => {
  try {
    const response = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: listCitiesQuery,
    }),
  });

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return [];
    }

    const cities = result?.data?.listAllCitiesSortedByName?.items || [];

    return cities.map((city: any) => ({
      value: city.id,
      label: city.name,
      externalId: city.externalId,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};


export async function fetchVehiclesSlugs(): Promise<{ slug: string }[]> {
  const response = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: GRAPHQL_API_SLUGS_QUERY,
    }),
  });
  const data: VehiclesSlugsData = await response.json();
  return data?.data?.listVehicles?.items || []
}

export async function fetchVehicle(slug: string): Promise<CotizadorVehicle | null> {
  const response = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: GRAPHQL_API_VEHICLE_QUERY,
      variables: { slug },
    }),
  });
  const data = await response.json();
  return data?.data?.listVehicles.items[0] || null;
}

