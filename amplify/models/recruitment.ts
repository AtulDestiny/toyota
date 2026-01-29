import { a } from '@aws-amplify/backend';

export const Recruitment = a.model({
    id: a.id().required(),
    name: a.string(),
    qty: a.float(),
    phone: a.string(),
    email: a.string(),
    firstName: a.string(),
    lastName: a.string(),
    jobId: a.id(),
    job: a.belongsTo('Job', 'jobId'),
});