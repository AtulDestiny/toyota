import { a } from '@aws-amplify/backend';
import { getVehicleByCategoryFunction } from '../../functions/get-vehicles-by-category/resource';

export const GetVehicleByCategory = a.query()
    .arguments({
    })
    .returns(a.ref('DefaultReturnType'))
    .authorization(allow => [allow.publicApiKey()])
    .handler(a.handler.function(getVehicleByCategoryFunction));