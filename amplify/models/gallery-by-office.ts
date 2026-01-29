import { a } from '@aws-amplify/backend';

export const GalleryByOffice = a.model({
    id: a.id().required(),
    name: a.string(),
    galleryId: a.id(),
    gallery: a.belongsTo('Gallery', 'galleryId'),
    officeId: a.id(),
    office: a.belongsTo('Office', 'officeId'),
});