import { a } from '@aws-amplify/backend';

export const Competition = a.model({
    id: a.id().required(),
    name: a.string(),
    start_date: a.string(),
    end_date: a.string(),
    categoryId: a.id(),
    category: a.belongsTo('Category', 'categoryId'),
    participations: a.hasMany('Participation', 'competitionId'),
    winners: a.hasMany('Winner', 'competitionId'),
});