import { a } from '@aws-amplify/backend';

export const UsedModelVersion = a.model({
  id: a.id().required(),
  versionName: a.string().required(), // GLi, XLi, SR5 etc.
  year: a.integer().required(),       // 2020, 2022, etc.

  usedModelId: a.id().required(),
  usedModel: a.belongsTo('UsedModel', 'usedModelId'),

  vehicles: a.hasMany('UsedVehicle', 'modelVersionId'),

  //Soft delete field
  isDeleted: a.boolean(),
});
