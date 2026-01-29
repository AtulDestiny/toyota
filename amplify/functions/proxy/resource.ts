import { defineFunction, secret } from '@aws-amplify/backend';

export const proxyFunction = defineFunction({
  name: 'proxy-function',
  entry: './handler.ts',
  environment: {
    JWT_SECRET: secret('JWT_SECRET')
  }
});