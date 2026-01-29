import { a } from '@aws-amplify/backend';

export const WarrantyByFeature = a.model({
    id: a.id().required(),
    name: a.string(),
    priceListByFeatureId: a.id(),
    priceListByFeature: a.belongsTo('PriceListByFeature', 'priceListByFeatureId'),
    warranties: a.hasMany('Warranty', 'warrantyByFeatureId'),
});