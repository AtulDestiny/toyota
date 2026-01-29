import { a } from '@aws-amplify/backend';

export const UsedDealership = a.model({
    id: a.id().required(),
    idVitrina: a.string(),
    name: a.string(),
    address: a.string(),
    phone: a.string(),
    latitude: a.string(),
    longitude: a.string(),
    appointmentPhone: a.string(),
    autopartPhone: a.string(),
    email: a.email(),
    website: a.string(),
    cityId: a.id(),
    city: a.belongsTo('City', 'cityId'),
    vehicles: a.hasMany('UsedVehicle', 'dealershipId'),

    //Soft delete field
    isDeleted: a.boolean(),
});


