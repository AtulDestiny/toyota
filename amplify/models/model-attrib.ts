import { a } from '@aws-amplify/backend';
import { Model } from './model';

export const ModelAttrib = a.model({
    id: a.id().required(),
    key: a.string(),
    name: a.string(),
    value: a.string(),
    modelId: a.id(),
    model: a.belongsTo('Model', 'modelId'),
});