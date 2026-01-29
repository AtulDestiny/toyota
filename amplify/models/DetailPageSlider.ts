import { a } from '@aws-amplify/backend';

export const DetailPageSlider = a.model({
  id: a.id().required(),

  // One slider → many models
  models: a.hasMany('Model', 'sliderId'),

  // Metadata
  title: a.string(),
  description: a.string(),
  type: a.string(),
  order: a.integer(),

  slides: a.hasMany('DetailPageSlide', 'sliderId'),

  isActive: a.boolean().default(true),
});
