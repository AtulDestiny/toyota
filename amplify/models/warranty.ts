import { a } from '@aws-amplify/backend';

export const Warranty = a.model({
    id: a.id().required(),
    name: a.string(),
    warrantyByFeatureId: a.id(),
    warrantyByFeature: a.belongsTo('WarrantyByFeature', 'warrantyByFeatureId'),
});