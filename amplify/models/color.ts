import { a } from '@aws-amplify/backend';

export const Color = a.model({
    id: a.id().required(),
    name: a.string(),
    colorsByModel: a.hasMany('ColorByModel', 'colorId'),
});