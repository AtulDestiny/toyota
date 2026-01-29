import { VehicleCard } from "@/components/Cards/VehicleCardTwo/VehicleCardTwo";


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
            ModelAttrib {
              items {
                name
                value
                key
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

export async function fetchVehicle(slug: string): Promise<VehicleCard | null> {
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

