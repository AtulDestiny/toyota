import { a } from '@aws-amplify/backend';

export const RecruitmentByPartner = a.model({
    id: a.id().required(),
    notes: a.string(),
    recruitment: a.boolean(),
    partnerId: a.id(),
    partner: a.belongsTo('Partner', 'partnerId'),
    stepId: a.id(),
    step: a.belongsTo('Step', 'stepId'),
});