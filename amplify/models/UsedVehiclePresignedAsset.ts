import { a } from '@aws-amplify/backend';

export const UsedVehiclePresignedAsset = a.model({
  id: a.id().required(),

  vehicleId: a.id().required(),
  vehicle: a.belongsTo('UsedVehicle', 'vehicleId'),

  UsedVehiclePresignedImages: a.json(),
  UsedVehiclePresignedImagesName: a.string().required(),
});
