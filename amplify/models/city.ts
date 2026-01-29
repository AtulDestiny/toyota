import { a } from '@aws-amplify/backend';

export const City = a.model({
    id: a.id().required(),
    externalId: a.string(),
    name: a.string(),
    active: a.boolean(),
    countryId: a.id(),
    country: a.belongsTo('Country', 'countryId'),
    offices: a.hasMany('Office', 'cityId'),
    dealerships: a.hasMany('UsedDealership', 'cityId'),
    UsedVehicles:a.hasMany('UsedVehicle', 'cityId'),
    allCitiesPartition: a.string().default('GLOBAL_CITY_LIST')
}).secondaryIndexes((index) => [
    index('allCitiesPartition') 
      .sortKeys(['name'])       
      .queryField('listAllCitiesSortedByName'),
]);