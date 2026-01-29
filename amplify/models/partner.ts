import { a } from '@aws-amplify/backend';

export const Partner = a.model({
    id: a.id().required(),
    customer: a.boolean(),
    vendor: a.boolean(),
    distributor: a.boolean(),
    postulant: a.boolean(),
    phone: a.string(),
    email: a.string(),
    externalId: a.string(),
    firstName: a.string(),
    lastName: a.string(),
    vehicles: a.hasMany('Vehicle', 'customerId'),
    steps: a.hasMany('Step', 'partnerId'),
    recruitmenstByPartner: a.hasMany('RecruitmentByPartner', 'partnerId'),
    participations: a.hasMany('Participation', 'partnerId'),
    priceList: a.hasOne('PriceList', 'customerId'),
});