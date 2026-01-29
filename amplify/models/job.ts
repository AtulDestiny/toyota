import { a } from '@aws-amplify/backend';

export const Job = a.model({
    id: a.id().required(),
    name: a.string(),
    qty: a.float(),
    description: a.string(),
    recruitments: a.hasMany('Recruitment', 'jobId'),
});