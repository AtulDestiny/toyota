import { a } from "@aws-amplify/backend";

export const UsedVehicle = a.model({
  id: a.id().required(),

  certified: a.boolean().required(),
  price: a.float().required(),
  mileage: a.integer().required(),
  plate: a.string().required(),
  modelYear: a.string(),
  color: a.string().required(),
  engine: a.string().required(),
  combustible: a.string().required(),
  transmission: a.string().required(),
  toyotaWarranty: a.boolean().required(),
  description: a.string(),
  slug: a.string(),
  additionalInfo: a.string(),
  attraction: a.string(),

  galleryAssets: a.hasMany("UsedVehicleAsset", "vehicleId"),
  galleryJson: a.json(), // [{ fileName: string, key: string }]

  // advisor info
  advisorName: a.string(),
  advisorIdCard: a.string(),
  advisorPhone: a.string(),

  // Relations
  dealershipId: a.id().required(),
  dealership: a.belongsTo("UsedDealership", "dealershipId"),

  usedModelId: a.id().required(),
  usedModel: a.belongsTo("UsedModel", "usedModelId"),

  //  Add this for version relation
  modelVersionId: a.id(),
  modelVersion: a.belongsTo("UsedModelVersion", "modelVersionId"),

  cityId: a.id().required(),
  city: a.belongsTo("City", "cityId"),

  presignedAssets: a.hasMany("UsedVehiclePresignedAsset", "vehicleId"),

  // Delete fields
  isDeleted: a.boolean(),
});
