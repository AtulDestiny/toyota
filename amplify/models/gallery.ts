import { a } from '@aws-amplify/backend';

export const Gallery = a.model({
    id: a.id().required(),
    name: a.string(),
    type: a.string(),
    description: a.string(),
    initDate: a.string(),
    endDate: a.string(),
    categoryId: a.id(),
    category: a.belongsTo('Category', 'categoryId'),
    productId: a.id(),
    product: a.belongsTo('Product', 'productId'),
    galleriesByOffice: a.hasMany('GalleryByOffice', 'galleryId'),
    colorsByModel: a.hasMany('ColorByModel', 'galleryId'),
    galleryAssets: a.hasMany('GalleryAsset', 'galleryId'),
});