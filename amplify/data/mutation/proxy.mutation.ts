import { a } from '@aws-amplify/backend';
import { proxyFunction } from '../../functions/proxy/resource';

export const Proxy = a.query()
    .arguments({
    })
    .returns(a.ref('DefaultReturnType'))
    .authorization(allow => [allow.publicApiKey()])
    .handler(a.handler.function(proxyFunction));