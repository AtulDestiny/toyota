import { a } from '@aws-amplify/backend';

export const Participation = a.model({
    id: a.id().required(),
    date: a.string(),
    nameImage: a.string(),
    image: a.string(),
    partnerId: a.id(),
    partner: a.belongsTo('Partner', 'partnerId'),
    competitionId: a.id(),
    competition: a.belongsTo('Competition', 'competitionId'),
    winners: a.hasMany('Winner', 'participationId'),
});