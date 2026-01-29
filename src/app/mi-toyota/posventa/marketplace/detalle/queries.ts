export interface Product {
  id: string;
  name: string;
  slug: string;
  serialNumber?: string;
  customerName?: string;
  description?: string;
  vehicle?: {
    name: string;
    slug: string;
  };
  priceListLines?: {
    items: {
      value: string;
    }[];
  };
  category?: {
    id: string;
    type: string;
    shipmentDate?: string;
  };
  mainCategory?: { id: string; name: string };
  productsAttribs?: {
    items: {
      id: string;
      name: string;
      key: string;
      value: string;
    }[];
  };
  galleries?: {
    items: {
      id: string;
      name: string;
      galleryAssets?: {
        items: {
          id: string;
          name: string;
          url: string;
          description?: string;
          type: string;
        }[];
      };
    }[];
  };
}

import { Vehicle } from "../../test-accesorios/queries";

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;
const GET_PRODUCT = `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      slug
      serialNumber
      customerName
      description
      vehicleId
      vehicle {
        name
        slug
        image
      }
      priceListLines {
        items {
          value
        }
      }
      category {
        id
        type
        shipmentDate
      }
      mainCategory {
         id
         name
       }
      productsAttribs {
        items {
          id
          name
          key
          value
        }
      }
      galleries {
        items {
          id
          name
          galleryAssets {
            items {
              id
              name
              url
              description
              type
            }
          }
        }
      }
      reference {
        items {
          id
          referencedProduct {
            id
            name
            slug
            description
            category {
              id
              type
              shipmentDate
            }
            priceListLines {
              items {
                value
              }
            }
            galleries {
              items {
                galleryAssets {
                  items {
                    url
                  }
                }
              }
            }
            vehicle {
              name
              slug
              image
            }
          }
        }
      }
    }
  }
`;

const VEHICLE_QUERY = `
query ListProducts {
  listProducts {
    items {
      id
      name
      slug
      serialNumber
      customerName
      description
      vehicleId
      vehicle {
        name
        slug
        image
      }
      priceListLines {
        items {
          value
        }
      }
      category {
        id
        type
        shipmentDate
      }
      mainCategory {
        id
        name
      }
      productsAttribs {
        items {
          id
          name
          key
          value
        }
      }
      galleries {
        items {
          id
          name
          galleryAssets {
            items {
              id
              name
              url
              description
              type
            }
          }
        }
      }
    }
  }
}
`;

const GET_VEHICLE_ID_BY_SLUG = `
  query GetVehicleIdBySlug($slug: String!) {
    listVehicles(filter: { slug: { eq: $slug } }) {
      items {
        id
      }
    }
  }
`;

const GET_CATEGORY_ID_BY_TYPE = `
  query GetCategoryIdByType($type: String!) {
    listCategories(filter: { type: { eq: $type } }) {
      items {
        id
      }
    }
  }
`;

type Data = {
  success: boolean;
  vehicles: Vehicle[];
};

export async function fetchProductById(id: string) {
  const response = await fetch(API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY!,
    },
    body: JSON.stringify({
      query: GET_PRODUCT,
      variables: { id },
    }),
  });

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0]?.message ?? "GraphQL error");
  return data?.getProduct ?? null;
}

export async function fetchProduct(slug?: string, category?: string | null) {
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

  return data?.listProducts?.items || null;
}

export async function fetchSimilarProducts(
  vehicleId: string | null,
  categoryId: string | null,
  mainCategoryId: string | null
): Promise<Product[]> {
  const filter: any = {};

  if (vehicleId) filter.vehicleId = { eq: vehicleId };
  if (categoryId) filter.categoryId = { eq: categoryId };
  if (mainCategoryId) filter.mainCategoryId = { eq: mainCategoryId };

  if (Object.keys(filter).length === 0) {
    console.log("⛔ No filter passed, returning []");
    return [];
  }

  const SIMILAR_PRODUCTS_QUERY = `
    query SimilarProducts($filter: ModelProductFilterInput, $limit: Int, $nextToken: String) {
      listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          name
          slug
          description
          category { id type shipmentDate }
          mainCategory { id name }
          priceListLines { items { value } }
          galleries { items { galleryAssets { items { url } } } }
          vehicle { name slug image }
        }
        nextToken
      }
    }
  `;

  let allItems: Product[] = [];
  let nextToken: string | null = null;

  do {
    const response: Response = await fetch(API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY!,
      },
      body: JSON.stringify({
        query: SIMILAR_PRODUCTS_QUERY,
        variables: {
          filter,
          limit: 100,
          nextToken,
        },
      }),
    });

    const raw = await response.json();
    if (raw.errors) throw new Error(raw.errors[0]?.message ?? "GraphQL error");

    const items = raw.data?.listProducts?.items ?? [];
    nextToken = raw.data?.listProducts?.nextToken ?? null;

    allItems = [...allItems, ...items];
  } while (nextToken);

  return allItems;
}



export async function fetchVehicleIdBySlug(
  slug: string
): Promise<string | null> {
  const response = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY! },
    body: JSON.stringify({
      query: GET_VEHICLE_ID_BY_SLUG,
      variables: { slug },
    }),
  });
  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0]?.message ?? "GraphQL error");
  return data?.listVehicles?.items?.[0]?.id || null;
}

export async function fetchCategoryIdByType(
  type: string
): Promise<string | null> {
  const response = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY! },
    body: JSON.stringify({
      query: GET_CATEGORY_ID_BY_TYPE,
      variables: { type },
    }),
  });
  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0]?.message ?? "GraphQL error");
  return data?.listCategories?.items?.[0]?.id || null;
}
