const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;

// ---------------------------
// ✅ Fetch All Non-Deleted Used Vehicles
// ---------------------------
export async function fetchCitiesVehicles() {
  if (!GRAPHQL_API_URL) throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  if (!GRAPHQL_API_KEY) throw new Error("NEXT_PUBLIC_GRAPHQL_API_KEY is not defined");

  const query = `
    query ListUsedVehicles($filter: ModelUsedVehicleFilterInput) {
      listUsedVehicles(filter: $filter) {
        items {
          id
          isDeleted
          dealership {
            id
            name
            city {
              id
              name
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query,
      variables: { filter: { isDeleted: { ne: true } } },
    }),
  });

  const { data, errors } = await res.json();

  if (errors) throw new Error(errors[0].message);

  const vehicles = data.listUsedVehicles.items ?? [];

  const cityMap = new Map();

  vehicles.forEach((v: any) => {
    const city = v.dealership?.city;
    if (city && !cityMap.has(city.id)) {
      cityMap.set(city.id, { id: city.id, name: city.name });
    }
  });

  return Array.from(cityMap.values());
}

// ---------------------------
// ✅ Fetch All models
// ---------------------------
export async function fetchModels() {
  if (!GRAPHQL_API_URL) throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  if (!GRAPHQL_API_KEY) throw new Error("NEXT_PUBLIC_GRAPHQL_API_KEY is not defined");
  const query = `
 query ListUsedVehicles {
      listUsedVehicles(filter: {
       isDeleted: { ne: true }
       }) {
        items {
          id
          isDeleted
          dealership {
            id
            name
            city {
              id
              name
            }
          }
          usedModel {
            id
            modelName
          }
        }
      }
    }
`;

  const res = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  const { data, errors } = await res.json();

  if (errors) {
    console.error("❌ GraphQL Error:", errors);
    throw new Error(errors[0].message);
  }

  return data.listUsedVehicles.items ?? [];
}

// ---------------------------
// ✅ Fetch All dealerships
// ---------------------------

export async function fetchUsedDealershipsFromVehicles() {
  if (!GRAPHQL_API_URL) throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  if (!GRAPHQL_API_KEY) throw new Error("NEXT_PUBLIC_GRAPHQL_API_KEY is not defined");

  const query = `
    query ListUsedVehicles($filter: ModelUsedVehicleFilterInput) {
      listUsedVehicles(filter: $filter) {
        items {
          id
          isDeleted
          dealership {
            id
            name
            city {
              id
              name
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query,
      variables: { filter: { isDeleted: { ne: true } } }, // only non-deleted
    }),
  });

  const { data, errors } = await res.json();

  if (errors) throw new Error(errors[0].message);

  const vehicles = data.listUsedVehicles.items ?? [];

  // -------------------------------
  //  Extract Unique Dealerships
  // -------------------------------
  const dealershipMap = new Map();

  vehicles.forEach((v: any) => {
    const d = v.dealership;
    if (d && !dealershipMap.has(d.id)) {
      dealershipMap.set(d.id, {
        id: d.id,
        name: d.name,
        city: d.city, // include city (optional)
      });
    }
  });

  return Array.from(dealershipMap.values());
}

