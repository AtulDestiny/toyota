import { Vehicle } from "@/app/mi-toyota/accesorios/queries";

/* -------------------------------------------------------------------------- */
/* 🧱 GRAPHQL RESPONSE TYPE */
/* -------------------------------------------------------------------------- */
interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

/* -------------------------------------------------------------------------- */
/* ⚙️ ENVIRONMENT CONFIG */
/* -------------------------------------------------------------------------- */
const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!;

/* -------------------------------------------------------------------------- */
/* 🧩 GRAPHQL QUERIES */
/* -------------------------------------------------------------------------- */
const PRODUCT_QUERY_BY_CATEGORY_ID = `
query ListProductsByCategoryId($mainCategoryId: ID!, $nextToken: String) {
  listProducts(limit: 1500, nextToken: $nextToken, filter: { mainCategoryId: { eq: $mainCategoryId } }) {
    items {
      id
      name
      slug
      serialNumber
      customerName
      description
      priceListLines { items { value } }
      vehicle { name slug image }
      category { id type shipmentDate }
      mainCategory { id name }
      productsAttribs { items { id name key value } }
      galleries { items { id name galleryAssets { items { id name url description type } } } }
    }
    nextToken
  }
}
`;

const PRODUCT_QUERY_BY_MODEL = `
query ListVehiclesWithProducts($slug: String!) {
  listVehicles(filter: { slug: { eq: $slug } }) {
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

/* -------------------------------------------------------------------------- */
/* 🧱 TYPES */
/* -------------------------------------------------------------------------- */
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
  productsAttribs?: { items: { id: string; name: string; key: string; value: string }[] };
  galleries?: {
    items: {
      id: string;
      name: string;
      galleryAssets?: {
        items: { id: string; name: string; url: string; description?: string; type: string }[];
      };
    }[];
  };
}

/* -------------------------------------------------------------------------- */
/* 🗺️ CATEGORY MAP & IDs */
/* -------------------------------------------------------------------------- */
const MAIN_CATEGORY_MAP: Record<string, string> = {
  "boutique-toyota": "BOUTIQUE TOYOTA",
  "boutique-ecofriendly": "BOUTIQUE ECO FRIENDLY",
  "boutique-eco-friendly": "BOUTIQUE ECO FRIENDLY",
  "boutique-gazoo-racing": "BOUTIQUE GAZOO RACING",
  "boutique-gazooracing": "BOUTIQUE GAZOO RACING",
};

const MAIN_CATEGORY_ID_MAP: Record<string, string> = {
  "BOUTIQUE TOYOTA": "ccd733e5-11ce-44b9-8e24-b2d5f181338c",
  "BOUTIQUE ECO FRIENDLY": "3a2fbaea-895b-439b-b9a6-89cb2a1c7c49",
  "BOUTIQUE GAZOO RACING": "bbe3ca2e-3ae0-4c20-bd1d-0b934ce0de95",
};

/* -------------------------------------------------------------------------- */
/* 🧠 MEMORY CACHE */
/* -------------------------------------------------------------------------- */
const cacheByCategory: Record<string, Product[]> = {};
const cacheByModelCategory: Record<string, Product[]> = {};

/* -------------------------------------------------------------------------- */
/* ⚡ INSTANT PRODUCT FETCHING WITH BACKGROUND LOAD */
/* -------------------------------------------------------------------------- */
async function fetchProductsByCategoryFromAPI(mainCategoryId: string): Promise<Product[]> {
  const allProducts: Product[] = [];

  // ✅ Fetch first batch immediately
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify({
      query: PRODUCT_QUERY_BY_CATEGORY_ID,
      variables: { mainCategoryId },
    }),
    next: { revalidate: 3600 },
  });

  const firstJson = await res.json();
  const firstData = firstJson.data?.listProducts;
  const firstItems = firstData?.items || [];
  const nextToken = firstData?.nextToken || null;

  allProducts.push(...firstItems);
  cacheByCategory[mainCategoryId] = allProducts;


  //  Fetch remaining pages in background (non-blocking)
  if (nextToken) {
    (async () => {
      try {
        let token = nextToken;
        const backgroundResults: Product[] = [];

        // Fetch remaining sequentially but without blocking the main thread
        while (token) {
          const pageRes = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
            body: JSON.stringify({
              query: PRODUCT_QUERY_BY_CATEGORY_ID,
              variables: { mainCategoryId, nextToken: token },
            }),
          });

          const pageJson = await pageRes.json();
          const pageData = pageJson.data?.listProducts;
          const pageItems = pageData?.items || [];
          token = pageData?.nextToken || null;

          backgroundResults.push(...pageItems);
        }

        if (backgroundResults.length > 0) {
          allProducts.push(...backgroundResults);
          cacheByCategory[mainCategoryId] = allProducts;
          console.log(`[BACKGROUND] Loaded full ${allProducts.length} products for ${mainCategoryId}`);
        }
      } catch (err) {
        console.error("[BG FETCH ERROR]", err);
      }
    })();
  }

  return allProducts;
}

/* -------------------------------------------------------------------------- */
/* 🚀 FETCH PRODUCT ENTRY FUNCTION */
/* -------------------------------------------------------------------------- */
export async function fetchProduct(type?: string | null, model?: string | null) {
  const key = type?.toLowerCase() || null;
  const mappedMainCategory =
    key ? MAIN_CATEGORY_MAP[key] || type?.replace(/-/g, " ").toUpperCase() : null;

  if (!mappedMainCategory) return [];

  // ✅ MODEL + CATEGORY combo
  if (model) {
    const cacheKey = `${model}_${mappedMainCategory}`;
    if (cacheByModelCategory[cacheKey]) {
      return cacheByModelCategory[cacheKey];
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
      body: JSON.stringify({ query: PRODUCT_QUERY_BY_MODEL, variables: { slug: model } }),
      next: { revalidate: 3600 },
    });

    const { data } = await res.json();
    const products = data?.listVehicles?.items?.[0]?.products?.items || [];
    const filtered = products.filter(
      (p: Product) => p?.category?.type?.toLowerCase() === type?.toLowerCase()
    );

    cacheByModelCategory[cacheKey] = filtered;
    return filtered;
  }

  //  CATEGORY ONLY
  const mainCategoryId = MAIN_CATEGORY_ID_MAP[mappedMainCategory];
  if (!mainCategoryId) return [];

  if (cacheByCategory[mappedMainCategory]) {
    return cacheByCategory[mappedMainCategory];
  }

  const products = await fetchProductsByCategoryFromAPI(mainCategoryId);
  cacheByCategory[mappedMainCategory] = products;
  return products;
}

/* -------------------------------------------------------------------------- */
/* 🚗 FETCH VEHICLES */
/* -------------------------------------------------------------------------- */
export async function fetchVehicle(slug?: string | null, category?: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify({ query: VEHICLE_QUERY, variables: { slug } }),
    next: { revalidate: 3600 },
  });

  const { data } = await res.json();
  return data?.listVehicles.items || [];
}
