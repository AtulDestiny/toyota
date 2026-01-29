import { a } from '@aws-amplify/backend';

export const Step = a.model({
    id: a.id().required(),
    first_name: a.string(),
    last_name: a.string(),
    phone: a.string(),
    email: a.string(),
    externalId: a.string(),
    distributor: a.boolean(),
    partnerId: a.id(),
    partner: a.belongsTo('Partner', 'partnerId'),
    recruitmentsByPartner: a.hasMany('RecruitmentByPartner', 'stepId'),
});