import { a } from '@aws-amplify/backend';

export const Hour = a.model({
    id: a.id().required(),
    name: a.string(),
    type: a.string(),
    start_hour: a.string(),
    end_hour: a.string(),
    week: a.boolean(),
    weekEnd: a.boolean(),
    officeId: a.id(),
    office: a.belongsTo('Office', 'officeId'),
});