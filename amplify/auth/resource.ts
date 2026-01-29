import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * Adds custom attributes for dealership and city
 */
export const auth = defineAuth({
  loginWith: { email: true },
  userAttributes: {
    "custom:dealership": {
      dataType: "String",
      mutable: true,
    },
    "custom:dealershipId": {
      dataType: "String",
      mutable: true,
    },
    "custom:dealershipName": {
      dataType: "String",
      mutable: true,
    },
    "custom:cityId": {
      dataType: "String",
      mutable: true,
    },
    "custom:cityName": {
      dataType: "String",
      mutable: true,
    },
  },
});