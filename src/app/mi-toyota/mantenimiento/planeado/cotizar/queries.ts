import { VehicleCardProps } from "./MantenimientoPlaneadoClient";

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

export async function fetchVehicle(slug?: string, category?: string): Promise<VehicleCardProps> {

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
