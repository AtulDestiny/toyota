const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const API_AUTHORIZATION = process.env.NEXT_PUBLIC_VEHICLES_API_AUTHORIZATION
const API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY
const VEHICLE_QUERY = `
  query ListModels($filter: ModelModelFilterInput) {
  listModels(filter: $filter) {
    items {
      thirdPartyApiDataId
      modelCategories {
        items {
          category {
            id
            type
            name
          }
        }
      }
      vehicleFuelType
      posterImageMobile
      quotesMainImage
      posterImageDesktop
      idSublinea
      isVehicleShownOnHomePage
      bannerBackgroundColor
      isActive
      objectPosition
      modelName
      detailPageLink
        modelName
      modelYear
      modelSeats
      cotizarLink
      quotesDescription
      modelsByYear {
        items {
          priceListsByFeature {
            items {
              id
              name
              slug
              priceListLines {
                items {
                  value
                }
              }
            }
          }
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
`;

export async function fetchVehicle(slug?: string, category?: string) {
  const response = await fetch(API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY!,
    },
    body: JSON.stringify({
      query: VEHICLE_QUERY,
      variables: {
        slug,
        filter: {
          isVehicleShownOnHomePage: { eq: true }
        }
      },
    }),
  });

  const { data } = await response.json();

  const models = data?.listModels?.items || [];

  const filteredModels = models.filter(
    (model: any) => model.isVehicleShownOnHomePage === true
  );
  return filteredModels.length ? filteredModels : null;
}
