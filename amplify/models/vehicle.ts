import { a } from '@aws-amplify/backend';

export const Vehicle = a.model({
    id: a.id().required(),
    name: a.string(),
    idLinea: a.string(),
    idRunt: a.string(),
    slug: a.string(),
    image: a.string(),
    orderDate: a.string(),
    concessionaireId: a.id(),
    concessionaire: a.belongsTo('Concessionaire', 'concessionaireId'),
    categoryId: a.id(),
    category: a.belongsTo('Category', 'categoryId'),
    customerId: a.id(),
    customer: a.belongsTo('Partner', 'customerId'),
    models: a.hasMany('Model', 'vehicleId'),
    products: a.hasMany('Product', 'vehicleId'),
    vehicleAttribs: a.hasMany('VehicleAttribs', 'vehicleId'),

    seoContents: a.hasMany('SeoContent', 'vehicleId'),
});