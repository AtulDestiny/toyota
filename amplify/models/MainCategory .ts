import { a } from '@aws-amplify/backend';

export const MainCategory = a.model({
    id: a.id().required(),
    name: a.string().required(),
    categories: a.hasMany('Category', 'mainCategoryId'),  
    products: a.hasMany('Product', 'mainCategoryId'),
  });