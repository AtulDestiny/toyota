const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!;

export const VEHICLES_SLUG_QUERY = `query ListVehicles { listVehicles { items { slug } } }`;

export const VEHICLE_QUERY = `
  query GetVehicleBySlug($slug: String!) {
    listVehicles(filter: { slug: { eq: $slug } }) {
      items {
        id
        slug
        speeds
        traction
        technology
        engine
        yearModel
        passengers
        doors
        orderDate
        concessionaire {
          name
          office {
              name
              location
              address
              hours {
                  items {
                      name
                      start_hour
                      end_hour
                  }
              }
              galleriesByOffice {
                  items {
                      id
                      name
                      gallery {
                          name
                          colorsByModel {
                              items {
                                  color {
                                      name
                                  }
                                  name
                              }
                          }
                      }
                  }
              }
          }
        }
        category {
          shipmentDate
        }
        customer {
          id
          customer
          vendor
          distributor
          postulant
          phone
          email
          externalId
          firstName
          lastName
          priceList {
              name
          }
        }
        models {
          items {
              name
              modelsByYear {
                  items {
                      name
                      technology
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
              warrantiesByModel {
                  items {
                      warranty {
                          name
                      }
                  }
              }
          }
        }
      }
    }
  }
`

export async function fetchVehicleSlugs() {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      query: VEHICLES_SLUG_QUERY,
    }),
  });
  const data = await response.json();  
  return data?.data?.listVehicles?.items || [];
}

export async function fetchVehicle(slug: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      query: VEHICLE_QUERY,
      variables: { slug },
    }),
  });
  const data = await response.json();
  return data?.data?.listVehicles?.items[0] || null;
}
