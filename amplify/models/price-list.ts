import { a } from '@aws-amplify/backend';

export const PriceList = a.model({
    id: a.id().required(),
    name: a.string(),
    priceListsByFeature: a.hasMany('PriceListByFeature', 'priceListId'),
    customerId: a.id(),
    customer: a.belongsTo('Partner', 'customerId'),
    priceListLines: a.hasMany('PriceListLine', 'priceListId'),
});