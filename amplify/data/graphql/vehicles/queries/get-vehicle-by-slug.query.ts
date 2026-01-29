export const GET_VEHICLE_BY_SLUG_QUERY = `
query GetVehicleBySlug($slug: String!) {
  listVehicles(filter: { slug: { eq: $slug } }) {
    items {
      id
      slug
      orderDate
      concessionaire {
        id
        name
        office {
            id
            name
            idVitrina
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
                        id
                        name
                        colorsByModel {
                            items {
                                color {
                                    id
                                    name
                                }
                                id
                                name
                            }
                        }
                    }
                }
            }
        }
      }
      category {
        id
        shipmentDate
        type
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
            id
            name
            idSublinea
            modelsByYear {
                items {
                    id
                    name
                    priceListsByFeature {
                        items {
                            id
                            externalId
                            name
                            slug
                            warrantiesByFeature {
                                items {
                                    name
                                }
                            }
                            priceListLines {
                                items {
                                    value
                                    startDate
                                    endDate
                                }
                            }
                        }
                    }
                }
            }
            documentsByModel {
                items {
                    id
                    document {
                        id
                        name
                        description
                    }
                }
            }
        }
      }
      products {
        items {
            id
            slug
            name
            serialNumber
            customerName
            description
            category {
                id
                shipmentDate
                type
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
    }
  }
}`;