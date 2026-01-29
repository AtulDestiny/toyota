import { a } from '@aws-amplify/backend';
export const ProductReference = a.model({
    id: a.id().required(),
    name: a.string(),
    // The product that owns the reference
    productId: a.id(),
    product: a.belongsTo('Product', 'productId'),
    // The product being referenced
    referencedProductId: a.id().required(),
    referencedProduct: a.belongsTo('Product', 'referencedProductId'),
  });
  