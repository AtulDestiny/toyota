import { defineFunction, secret } from '@aws-amplify/backend';

export const getDealershipCredFunction = defineFunction({
  name: 'get-dealership-cred-function',
  entry: './handler.ts', // points to the handler file
  environment: {
    JWT_SECRET: secret('JWT_SECRET') // Secret to validate the JWT token if needed
  }
});
