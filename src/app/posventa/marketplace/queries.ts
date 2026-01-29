import { Vehicle } from "../accesorios/queries";

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;

const PRODUCT_QUERY_BY_MODEL = `
query ListVehiclesWithProducts($slug: String!) {
  listVehicles(filter: {slug: {eq: $slug}}) {
    items {
      id
      name
      slug
      products {
        items {
          id
          name
          slug
          serialNumber
          customerName
          description
          vehicle {
            name
            slug
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
  }
}
`;

const PRODUCT_QUERY_BY_TYPE = `
query ListProducts($nextToken: String) {
  listProducts(limit: 100, nextToken: $nextToken) {
    items {
      id
      name
      slug
      serialNumber
      customerName
      description
      priceListLines {
        items {
          value
        }
      }
      vehicle {
       name
       slug
       image
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
    nextToken
  }
}
`;

const VEHICLE_QUERY = `
query ListVehicles {
 listVehicles {
   items {
      id
      slug
      image
      category {
        type
      }
   }
  }
}
`;
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

type Data = {
  success: boolean;
  vehicles: Vehicle[];
};

// Define special mapping for main categories
const MAIN_CATEGORY_MAP: Record<string, string> = {
  "boutique-toyota": "BOUTIQUE TOYOTA",
  "boutique-ecofriendly": "BOUTIQUE ECO FRIENDLY",
  "boutique-eco-friendly": "BOUTIQUE ECO FRIENDLY",
  "boutique-gazoo-racing": "BOUTIQUE GAZOO RACING",
  "boutique-gazooracing": "BOUTIQUE GAZOO RACING",

};

export async function fetchProduct(
  type?: string | null,
  model?: string | null
) {
  const isModelPresent = !!model;

  // Normalize the key for mapping (lowercase, keep dashes)
  const key = type ? type.toLowerCase() : null;

  // Use map if exists, else fallback to replacing dashes with spaces
  const mappedMainCategory = key
    ? MAIN_CATEGORY_MAP[key] || type?.replace(/-/g, " ").toUpperCase()
    : null;


  // Model present, keep original flow
  if (isModelPresent) {
    const response = await fetch(API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY!,
      },
      body: JSON.stringify({
        query: PRODUCT_QUERY_BY_MODEL,
        variables: { slug: model },
      }),
    });

    const { data } = await response.json();
    const products = data?.listVehicles?.items?.[0]?.products?.items || [];

    return products.filter(
      (product: Product) =>
        product?.category?.type?.toLowerCase() === type?.toLowerCase()
    );
  }

  // Category only (no model) → paginated fetch
  let allProducts: Product[] = [];
  let nextToken: string | null = null;

  do {
    const response: any = await fetch(API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY!,
      },
      body: JSON.stringify({
        query: PRODUCT_QUERY_BY_TYPE,
        variables: { nextToken },
      }),
    });

    const { data } = await response.json();
    const pageItems = data?.listProducts?.items || [];
    allProducts = [...allProducts, ...pageItems];
    nextToken = data?.listProducts?.nextToken;
  } while (nextToken);

  return allProducts.filter(
    (product: Product) =>
      // product?.category?.type?.toUpperCase() === normalizedType ||
      product?.mainCategory?.name?.toUpperCase() === mappedMainCategory
  );
}

export async function fetchVehicle(slug?: string | null, category?: string) {
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
  return data?.listVehicles.items || null;
}
