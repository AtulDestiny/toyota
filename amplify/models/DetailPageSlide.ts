import { a } from '@aws-amplify/backend';

export const DetailPageSlide = a.model({
  id: a.id().required(),
  sliderId: a.id().required(),

  // Relationship
  slider: a.belongsTo('DetailPageSlider', 'sliderId'),

  // Actual slide content
  image: a.string().required(),
  title: a.string(),
  description: a.string(),
  order: a.integer(),
  isActive: a.boolean().default(true),
});
