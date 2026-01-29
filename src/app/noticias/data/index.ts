export * from './blogPosts';
export * from './blogContent';

import { blogPosts, BlogPost } from './blogPosts';
import { getBlogContent } from './blogContent';

// Helper functions
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getRegularPosts(): BlogPost[] {
  return blogPosts.filter((post) => !post.featured);
}

export function getRelatedPosts(currentSlug?: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}
