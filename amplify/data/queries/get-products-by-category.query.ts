import { a } from '@aws-amplify/backend';
import { getProductsByCategoryFunction } from '../../functions/get-products-by-category/resource';

export const GetProductsByCategory = a.query()
    .arguments({
    })
    .returns(a.ref('DefaultReturnType'))
    .authorization(allow => [allow.publicApiKey()])
    .handler(a.handler.function(getProductsByCategoryFunction));