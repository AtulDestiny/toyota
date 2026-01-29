import { a } from '@aws-amplify/backend';

export const SeoContent = a.model({
    id: a.id().required(),

    // Identity & mapping
    pageType: a.string().required(),
    slug: a.string().required(),
    canonicalUrl: a.url().required(),

    // Relations
    modelId: a.id().required(),
    Model: a.belongsTo('Model', 'modelId'),

    vehicleId: a.id().required(),
    Vehicle: a.belongsTo('Vehicle', 'vehicleId'),

    // Core SEO meta tags
    seoTitle: a.string().required(),
    seoDescription: a.string().required(),
    h1: a.string(),

    // Content fields
    contentTopic: a.string(),
    contentBody: a.string(),
    contentType: a.string(),
    targetAudience: a.string(),
    author: a.string(),
    publicationDate: a.datetime(),

    //
    primaryKeywords: a.string().array(),
    secondaryKeywords: a.string().array(),
    semanticKeywords: a.string().array(),

    // Image SEO
    imageUrls: a.string().array(),
    imageAltTexts: a.string().array(),

    // Technical SEO
    schemaLdJson: a.json(),
    robots: a.string().default("index, follow"),
    updatedAt: a.datetime(),

    // Optional business fields
    businessGoal: a.string(),
    journeyStage: a.string(),
    relatedLinks: a.string().array(),
});