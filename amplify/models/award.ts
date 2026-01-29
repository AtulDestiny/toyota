import { a } from '@aws-amplify/backend';

export const Award = a.model({
    id: a.id().required(),
    name: a.string(),
    qty: a.float(),
    qtyAvailable: a.float(),
    winner: a.hasOne('Winner', 'awardId'),
});