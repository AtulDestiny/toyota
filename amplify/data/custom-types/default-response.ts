import { a } from "@aws-amplify/backend"

export const DefaultReturnType = a.customType({
    success: a.boolean(),
    message: a.string()
})