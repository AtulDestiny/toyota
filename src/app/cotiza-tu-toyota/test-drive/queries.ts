import { TestDriveVehicle } from "./page";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;

type VehiclesName = {
  data: {
    listVehicles: {
      items: {
        name: string;
      }[];
    };
  };
};

const GRAPHQL_API_NAMES_QUERY = `query ListVehicles {
  listVehicles {
    items {
      name
      models {
        name
        }
      }
    }
  }
}
`

export async function fetchVehiclesNames(): Promise<TestDriveVehicle[]> {
  const response = await fetch(GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY!,
    },
    body: JSON.stringify({
      query: GRAPHQL_API_NAMES_QUERY,
    }),
  });
  const data: VehiclesName = await response.json();
  return data?.data?.listVehicles?.items || []
}


