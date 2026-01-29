import { a } from '@aws-amplify/backend';

export const UsedModel = a.model({
  id: a.id().required(),
  modelName: a.string().required(), // Corolla, Hilux, Fortuner etc. 
  versions: a.hasMany('UsedModelVersion', 'usedModelId'),
  // ✅ Vehicles related to this model
  vehicles: a.hasMany('UsedVehicle', 'usedModelId'),

  //Soft delete field
  isDeleted: a.boolean(),
});
