import { a } from '@aws-amplify/backend';

export const PriceListLine = a.model({
    id: a.id().required(),
    value: a.float(),
    sku: a.string(),
    startDate: a.string(),
    endDate: a.string(),
    priceListByFeatureId: a.id(),
    priceListByFeature: a.belongsTo('PriceListByFeature', 'priceListByFeatureId'),
    priceListId: a.id(),
    priceList: a.belongsTo('PriceList', 'priceListId'),
    productId: a.id(),
    product: a.belongsTo('Product', 'productId'),

    // New field for third-party identifier
    thirdPartyApi_IDENTIFICADORPRODUCTO: a.string(),
});