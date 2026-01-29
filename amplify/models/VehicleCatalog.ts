import { a } from '@aws-amplify/backend';

export const VehicleCatalog = a.model({
  id: a.id().required(), // internal unique ID
  
  identificadorProducto: a.string(),
  modelo: a.string(),
  codigoModelo: a.string(),
  version: a.string(),
  codigoVersion: a.string(),
  transmision: a.string(),
  traccion: a.string(),
  tapicera: a.string(),
  clase: a.string(),
  carroceria: a.string(),
  motor: a.string(),
  anioModelo: a.integer(),
  descripcion: a.string(),
  combustible: a.string(),
  cilindraje: a.integer(),
  capacidad: a.integer(),
  activo: a.boolean(),
  precio: a.float(),
  valorIva: a.float(),
  valorImpConsumo: a.float(),
  valorBruto: a.float(),
  disponible: a.boolean(),
  grupoSublinea: a.string(),
  codigoKatashiki: a.string()
});
