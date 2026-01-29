// src/graphql/queries.ts

// Query to list all cities
export const listCities = `
  query GetCitiesSortedByNameAsc {
  listAllCitiesSortedByName(
    allCitiesPartition: "GLOBAL_CITY_LIST", # Required for your GSI partition key
    sortDirection: ASC 
  ) {
    items {
      id
      name
      active # Include other fields you need
      allCitiesPartition
    }
    nextToken # Always include for pagination, even if you don't use it on the first call
  }
}
`;

// Query to list offices, filtered by cityId
// This query now accepts a filter input to get offices for a specific city.
export const listOfficesByCity = `
  query ListOfficesByCity($filter: ModelOfficeFilterInput) {
    listOffices(filter: $filter) {
      items {
        id
        name
        address
        phone
        appointmentPhone
        email
        website
        idVitrina
        hours {
          items {
            id
            name
            start_hour
            end_hour
            type
          }
        }
        concessionaire {
          id
          externalId
          name
        }
        city {
          id
          name
          externalId
        }
      }
    }
  }
`;

// A general list offices query if needed, but listOfficesByCity is more specific for this use case
// Keeping this for completeness, though listOfficesByCity will be used for filtering.
export const listAllOffices = `
  query ListAllOffices {
    listOffices {
      items {
        id
        name
        address
        phone
        appointmentPhone
        email
        website
        concessionaire {
          id
          name
        }
        city {
          id
          name
        }
      }
    }
  }
`;