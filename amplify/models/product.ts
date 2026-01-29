import { a } from '@aws-amplify/backend';

export const Product = a.model({
    id: a.id().required(),
    name: a.string(),
    slug: a.string(),
    serialNumber: a.string(),
    customerName: a.string(),
    description: a.string(),
    vehicleId: a.id(),
    vehicle: a.belongsTo('Vehicle', 'vehicleId'),
    categoryId: a.id(),
    category: a.belongsTo('Category', 'categoryId'),
    productsAttribs: a.hasMany('ProductsAttrib', 'productId'),
    galleries: a.hasMany('Gallery', 'productId'),
    priceListLines: a.hasMany('PriceListLine', 'productId'),

    // New field: MainCategory selection
    mainCategoryId: a.id(),
    mainCategory: a.belongsTo('MainCategory', 'mainCategoryId'),

    // NEW FIELD for similar product references
    reference: a.hasMany('ProductReference', 'productId'), 
    referencedIn: a.hasMany('ProductReference', 'referencedProductId'),   
});