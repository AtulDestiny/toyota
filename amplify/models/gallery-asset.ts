import { a } from '@aws-amplify/backend';

export const GalleryAsset = a.model({
    id: a.id().required(),
    name: a.string(),
    url: a.string(),
    description: a.string(),
    type: a.string(),
    initDate: a.string(),
    endDate: a.string(),
    params: a.string(),
    galleryId: a.id(),
    gallery: a.belongsTo('Gallery', 'galleryId')
});