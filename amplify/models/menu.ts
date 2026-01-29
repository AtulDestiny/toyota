import { a } from '@aws-amplify/backend';

export const Menu = a.model({
    id: a.id().required(),
    name: a.string(),
    position: a.float(),
    description: a.string(),
    slug: a.string()
});