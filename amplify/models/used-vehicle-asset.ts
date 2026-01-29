import { a } from '@aws-amplify/backend';

export const UsedVehicleAsset = a.model({
  id: a.id().required(),
  url: a.string().required(),     // S3 URL
  type: a.string(),               // image, video, 360, etc.
  description: a.string(),

  vehicleId: a.id().required(),
  vehicle: a.belongsTo('UsedVehicle', 'vehicleId'),

  //Soft delete field
  isDeleted: a.boolean(),
});
