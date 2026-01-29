import { defineFunction, secret } from "@aws-amplify/backend";
import { auth } from "../../auth/resource";

// helper to safely extract userPoolId
// const getUserPoolId = (auth: any) => auth.resources.userPool.id;

export const createUserInCognito = defineFunction({
  name: "create-user-in-cognito",
  entry: "./handler.ts",
  timeoutSeconds: 60,
  environment: {
    // AMPLIFY_AUTH_USERPOOL_ID: getUserPoolId(auth),
    JWT_SECRET: secret("JWT_SECRET"),
  },
});
