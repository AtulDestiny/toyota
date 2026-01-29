const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const API_AUTHORIZATION = process.env.NEXT_PUBLIC_VEHICLES_API_AUTHORIZATION;
const API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY
const VEHICLE_QUERY = `
query ListVehicles {
 listVehicles {
   items {
      id
      slug
      image
      name
      vehicleAttribs {
        items {
          id
          key
          name
          value
        }
      }
       models {
        items {
            name
            modelsByYear {
                items {
                    name
                    priceListsByFeature {
                        items {
                            name
                            slug
                            priceList {
                              name
                            }
                            warrantiesByFeature {
                                items {
                                    name
                                }
                            }
                        }
                    }
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
      products {
        items {
            id
            slug
            name
            serialNumber
            customerName
            description
            category {
                id
                shipmentDate
                type
            }
            productsAttribs {
                items {
                    id
                    name
                    value
                }
            }
        }
      }
      category {
        type
      }
   }
  }
}
`

export async function fetchVehicleSlugs(slug?: string, category?: string): Promise<string[]> {
  const response = await fetch(API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": API_AUTHORIZATION!,
    },
    body: JSON.stringify({
      slug,
      categoryType:category,
    }),
  });
  const data = await response.json();
  const vehicles = data?.products || [];
  return vehicles;
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
  const {data} = await response.json();

  return data?.listVehicles?.items || [];
}
