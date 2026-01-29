import { a } from '@aws-amplify/backend';

export const ModelCategory = a.model({
  id: a.id().required(),
  modelId: a.id(),
  categoryId: a.id(),
  model: a.belongsTo('Model', 'modelId'),
  category: a.belongsTo('Category', 'categoryId'),
});
