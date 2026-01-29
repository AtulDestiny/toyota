import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "toyota-web-files",
  access: (allow) => ({
    'images/*': [allow.guest.to(['get'])],
    'files/*': [allow.guest.to(['read'])],
    "used-vehicles/*": [
      allow.guest.to(["get"]),
      allow.authenticated.to(["get", "write", "delete"])
    ],
  }),
});