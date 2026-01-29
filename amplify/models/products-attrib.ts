import { a } from '@aws-amplify/backend';

export const ProductsAttrib = a.model({
    id: a.id().required(),
    key: a.string(),
    name: a.string(),
    value: a.string(),
    productId: a.id(),
    product: a.belongsTo('Product', 'productId'),
});