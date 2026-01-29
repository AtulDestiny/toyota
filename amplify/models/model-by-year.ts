import { a } from '@aws-amplify/backend';

export const ModelByYear = a.model({
    id: a.id().required(),
    name: a.string(),
    modelId: a.id(),
    model: a.belongsTo('Model', 'modelId'),
    priceListsByFeature: a.hasMany('PriceListByFeature', 'modelByYearId'),
    colorsByModel: a.hasMany('ColorByModel', 'modelByYearId'),

    // Add new fields for security icon for each modelYear
    security_icon_1: a.boolean().default(false), // SISTEMA ANTIBLOQUEO FRENOS
    security_icon_2: a.boolean().default(false), // CONTROL ELECTRONICO DE ESTABILIDAD
    security_icon_3: a.boolean().default(false), // ALERTA DE COLISIÓN FRONTAL
    security_icon_4: a.boolean().default(false), // BOLSAS DE AIRE
    security_icon_5: a.boolean().default(false), // ISOFIX SISTEMA DE SUJECIÓN INFANTIL

    airbag_count: a.integer().default(0), // related to security_icon_4 so we can get the airbags count
});