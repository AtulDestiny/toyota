import { defineFunction, secret } from '@aws-amplify/backend';

export const getDealershipQuotationFunction = defineFunction({
  name: 'get-dealership-quotation-function',
  entry: './handler.ts', // points to the handler file
  timeoutSeconds: 30,
  environment: {
    JWT_SECRET: secret('JWT_SECRET') // Secret to validate the JWT token if needed
  }
});
