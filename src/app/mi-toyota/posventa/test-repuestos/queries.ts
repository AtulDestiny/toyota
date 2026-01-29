const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const API_AUTHORIZATION = process.env.NEXT_PUBLIC_VEHICLES_API_AUTHORIZATION
const API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY
const VEHICLE_QUERY = `
query MyQuery {
  listVehicles {
    items {
      id
      slug
      image
      name
      category {
        type
      }
      models {
        items {
          modelsByYear {
            items {
              colorsByModel {
                items {
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
        }
      }
    }
  }
}
`
export type Vehicle = {
  id: string;
  slug: string;
  orderDate: string;
  concessionaire: {
    name: string;
    office: {
      name: string;
      location: string;
      address: string;
      hours: {
        items: {
          name: string;
          start_hour: string;
          end_hour: string;
        }[];
      };
      galleriesByOffice: {
        items: {
          id: string;
          name: string;
          gallery: {
            name: string;
            colorsByModel: {
              items: {
                color: {
                  name: string;
                };
                name: string;
              }[];
            };
          };
        }[];
      };
    };
  };
  category: {
    shipmentDate: string;
    type: string;
  };
  customer: {
    id: string;
    customer: boolean;
    vendor: boolean;
    distributor: boolean;
    postulant: boolean;
    phone: string;
    email: string;
    externalId: string;
    firstName: string;
    lastName: string;
    priceList: {
      name: string;
    };
  };
  models: {
    items: {
      name: string;
      modelsByYear: {
        items: {
          name: string;
          priceListsByFeature: {
            items: {
              name: string;
              slug: string;
              warrantiesByFeature: {
                items: {
                  name: string;
                }[];
              };
              priceListLines: {
                items: {
                  value: number;
                  startDate: string;
                  endDate: string;
                }[];
              };
            }[];
          };
        }[];
      };
      documentsByModel: {
        items: {
          document: {
            name: string;
            description: string;
          };
        }[];
      };
    }[];
  };
  products: {
    items: {
      id: string;
      slug: string;
      name: string;
      serialNumber: string;
      customerName: string;
      description: string;
      category: {
        id: string;
        shipmentDate: string;
        type: string;
      };
      productsAttribs: {
        items: {
          id: string;
          name: string;
          value: string;
        }[];
      };
    }[];
  };
};

type Data = {
  success: boolean;
  vehicles: Vehicle[];
};

export async function fetchVehicleSlugs(slug: string, category: string): Promise<string[]> {
  const response = await fetch(API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": API_AUTHORIZATION!,
    },
    body: JSON.stringify({
      slug,
      category,
    }),
  });
  const data:Data = await response.json();
  const vehicles = data?.vehicles || [];  
  return vehicles.map((vehicle) => vehicle.slug);
}

export async function fetchVehicle(slug?: string, category?: string) {
  const response = await fetch(API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY!,
    },
    body: JSON.stringify({
     query: VEHICLE_QUERY,
     variables: { slug },
    }),
  });
  const { data } = await response.json();
  return data?.listVehicles?.items || null;
}
