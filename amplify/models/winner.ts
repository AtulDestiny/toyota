import { a } from '@aws-amplify/backend';

export const Winner = a.model({
    id: a.id().required(),
    end_date: a.string(),
    competitionId: a.id(),
    competition: a.belongsTo('Competition', 'competitionId'),
    participationId: a.id(),
    participation: a.belongsTo('Participation', 'participationId'),
    awardId: a.id(),
    award: a.belongsTo('Award', 'awardId'),
});