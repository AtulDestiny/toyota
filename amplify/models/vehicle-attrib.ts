import { a } from '@aws-amplify/backend';

export const VehicleAttribs = a.model({
    id: a.id().required(),
    key: a.string(),
    name: a.string(),
    value: a.string(),
    vehicleId: a.id(),
    vehicle: a.belongsTo('Vehicle', 'vehicleId'),
});