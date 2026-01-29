import { a } from '@aws-amplify/backend';

export const PriceListByFeature = a.model({
    id: a.id().required(),
    name: a.string(),
    slug: a.string(),
    priceListId: a.id(),
    priceList: a.belongsTo('PriceList', 'priceListId'),
    modelByYearId: a.id(),
    modelByYear: a.belongsTo('ModelByYear', 'modelByYearId'),
    warrantiesByFeature: a.hasMany('WarrantyByFeature', 'priceListByFeatureId'),
    priceListLines: a.hasMany('PriceListLine', 'priceListByFeatureId'),
});