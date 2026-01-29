import { a } from '@aws-amplify/backend';

export const Document = a.model({
    id: a.id().required(),
    name: a.string(),
    description: a.string(),
    documentsByModel: a.hasMany('DocumentByModel', 'documentId'),
});