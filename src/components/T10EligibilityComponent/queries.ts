
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

