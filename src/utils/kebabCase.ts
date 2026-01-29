// src/utils/kebabCase.ts

/**
 * Converts a string to kebab-case.
 * Example: "Land Cruiser 300" => "land-cruiser-300"
 */
export function kebabCase(str: string): string {
  return str
    .normalize('NFD') // Remove accents
    .replace(/([\u0300-\u036f])/g, '')
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-'); // Remove multiple dashes
}
