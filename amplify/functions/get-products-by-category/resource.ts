import { defineFunction, secret } from '@aws-amplify/backend';

export const getProductsByCategoryFunction = defineFunction({
  name: 'get-products-by-category-function',
  entry: './handler.ts',
  environment: {
    JWT_SECRET: secret('JWT_SECRET')
  }
});