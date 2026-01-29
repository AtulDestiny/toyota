import { defineFunction, secret } from '@aws-amplify/backend';

export const fetchDealershipUsedVehicleFunction = defineFunction({
  name: 'get-dealership-used-vehicle',
  entry: './handler.ts', // points to the handler file
  timeoutSeconds: 45,
  environment: {
    JWT_SECRET: secret('JWT_SECRET') // Secret to validate the JWT token if needed
  }
});
