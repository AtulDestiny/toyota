import { a } from '@aws-amplify/backend';

export const Article = a.model({
    id: a.id().required(),
    shipmentDate: a.string()
});