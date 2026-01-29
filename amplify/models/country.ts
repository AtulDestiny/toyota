import { a } from '@aws-amplify/backend';

export const Country = a.model({
    id: a.id().required(),
    name: a.string(),
    cities: a.hasMany('City', 'countryId'),
});