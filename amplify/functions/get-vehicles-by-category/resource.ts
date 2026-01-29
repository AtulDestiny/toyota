import { defineFunction, secret } from '@aws-amplify/backend';

export const getVehicleByCategoryFunction = defineFunction({
  name: 'get-vehicle-by-category-function',
  entry: './handler.ts',
  environment: {
    JWT_SECRET: secret('JWT_SECRET')
  }
});