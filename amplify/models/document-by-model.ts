import { a } from '@aws-amplify/backend';

export const DocumentByModel = a.model({
    id: a.id().required(),
    name: a.string(),
    fieldName: a.string(),
    type: a.string(),
    documentId: a.id(),
    document: a.belongsTo('Document', 'documentId'),
    modelId: a.id(),
    model: a.belongsTo('Model', 'modelId'),
});