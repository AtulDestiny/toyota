export const GET_PRODUCTS_QUERY = `
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
      category {
        id
        type
        shipmentDate
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
}`;