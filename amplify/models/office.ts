import { a } from '@aws-amplify/backend';

export const Office = a.model({
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
    concessionaireId: a.id(),
    city: a.belongsTo('City', 'cityId'),
    concessionaire: a.belongsTo('Concessionaire', 'concessionaireId'),
    hours: a.hasMany('Hour', 'officeId'),
    galleriesByOffice: a.hasMany('GalleryByOffice', 'officeId'),
});