import { a } from '@aws-amplify/backend';

export const ColorByModel = a.model({
    id: a.id().required(),
    name: a.string(),
    colorId: a.id(),
    color: a.belongsTo('Color', 'colorId'),
    galleryId: a.id(),
    gallery: a.belongsTo('Gallery', 'galleryId'),
    modelByYearId: a.id(),
    modelByYear: a.belongsTo('ModelByYear', 'modelByYearId'),
    order: a.integer(),
});