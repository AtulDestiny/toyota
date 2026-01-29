import { a } from '@aws-amplify/backend';

export const Category = a.model({
    id: a.id().required(),
    name: a.string(),
    type: a.string(),
    shipmentDate: a.string(),
    parent: a.id(),
    galleries: a.hasMany('Gallery', 'categoryId'),
    vehicles: a.hasMany('Vehicle', 'categoryId'),
    competition: a.hasMany('Competition', 'categoryId'),
    products: a.hasMany('Product', 'categoryId'),
    mainCategoryId: a.id(),
    mainCategory: a.belongsTo('MainCategory', 'mainCategoryId'),
    modelCategories: a.hasMany('ModelCategory', 'categoryId'),
});