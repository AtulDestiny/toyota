import { a } from '@aws-amplify/backend';

export const Concessionaire = a.model({
    id: a.id().required(),
    externalId: a.string(),
    name: a.string(),
    office: a.hasOne('Office', 'concessionaireId'),
    vehicles: a.hasMany('Vehicle', 'concessionaireId'),
});