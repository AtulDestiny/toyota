import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminAddUserToGroupCommand,
  AdminUpdateUserAttributesCommand,
  AdminRemoveUserFromGroupCommand,
  ListUsersCommand,
  AdminListGroupsForUserCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
// import { env } from "$amplify/env/create-user-in-cognito";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
const AMPLIFY_AUTH_USERPOOL_ID = "us-east-2_EhaMuqLKt"
const client = new CognitoIdentityProviderClient({});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "OPTIONS,POST",
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers: corsHeaders, body: "" };
    }

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Method not allowed" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const {
      action,
      email,
      password,
      fullName,
      phone,
      role,
      dealership,
      dealershipId,
      dealershipName,
      cityId,
      cityName,
      isActive, // 👈 NEW FIELD for active/inactive control
    } = body;

    if (!action) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          message: "Missing 'action' field",
        }),
      };
    }

    // ✅ 1️⃣ CREATE USER
    if (action === "create") {
      if (!email || !password || !fullName || !role) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            success: false,
            message: "Missing required fields for user creation",
          }),
        };
      }

      const createUserCmd = new AdminCreateUserCommand({
        UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
        Username: email,
        MessageAction: "SUPPRESS",
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "name", Value: fullName },
          { Name: "phone_number", Value: phone || "" },
          { Name: "custom:dealership", Value: dealership || "" },
          { Name: "custom:dealershipId", Value: dealershipId || "" },
          { Name: "custom:dealershipName", Value: dealershipName || "" },
          { Name: "custom:cityId", Value: cityId || "" },
          { Name: "custom:cityName", Value: cityName || "" },
          { Name: "email_verified", Value: "true" },
        ],
      });
      await client.send(createUserCmd);

      // Set password
      const setPasswordCmd = new AdminSetUserPasswordCommand({
        UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
        Username: email,
        Password: password,
        Permanent: true,
      });
      await client.send(setPasswordCmd);

      // Add to group
      const normalizedRole = role.trim().toLowerCase();

      let groupName = "";

      if (normalizedRole === "admin") {
        groupName = "Admin";
      } else if (normalizedRole === "dealer") {
        groupName = "Dealer";
      } else {
        groupName = "User"; // optional fallback
      }

      await client.send(
        new AdminAddUserToGroupCommand({
          UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
          Username: email,
          GroupName: groupName,
        })
      );

      // ✅ Handle active/inactive status
      if (isActive === false) {
        await client.send(
          new AdminDisableUserCommand({
            UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
            Username: email,
          })
        );
      } else {
        await client.send(
          new AdminEnableUserCommand({
            UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
            Username: email,
          })
        );
      }

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          message: `✅ User ${email} created successfully, added to '${groupName}' group, and ${
            isActive === false ? "disabled" : "enabled"
            }.`,
        }),
      };
    }

    // ✅ 2️⃣ EDIT USER
    if (action === "edit") {
      if (!email) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            success: false,
            message: "Missing email for edit action",
          }),
        };
      }

      const updateAttributes: { Name: string; Value: string }[] = [];
      if (fullName) updateAttributes.push({ Name: "name", Value: fullName });
      if (phone) updateAttributes.push({ Name: "phone_number", Value: phone });
      if (dealership)
        updateAttributes.push({ Name: "custom:dealership", Value: dealership });
      if (dealershipId)
        updateAttributes.push({ Name: "custom:dealershipId", Value: dealershipId });
      if (dealershipName)
        updateAttributes.push({
          Name: "custom:dealershipName",
          Value: dealershipName,
        });
      if (cityId)
        updateAttributes.push({ Name: "custom:cityId", Value: cityId });
      if (cityName)
        updateAttributes.push({ Name: "custom:cityName", Value: cityName });

      if (updateAttributes.length > 0) {
        await client.send(
          new AdminUpdateUserAttributesCommand({
            UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
            Username: email,
            UserAttributes: updateAttributes,
          })
        );
      }

      if (password) {
        await client.send(
          new AdminSetUserPasswordCommand({
            UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
            Username: email,
            Password: password,
            Permanent: true,
          })
        );
      }

      // ✅ Handle active/inactive status
      if (isActive === false) {
        await client.send(
          new AdminDisableUserCommand({
            UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
            Username: email,
          })
        );
      } else if (isActive === true) {
        await client.send(
          new AdminEnableUserCommand({
            UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
            Username: email,
          })
        );
      }

      // ✅ Handle role changes
      if (role) {
        const normalizedRole = role.trim().toLowerCase();

        let groupName = "";

        if (normalizedRole === "admin") {
          groupName = "Admin";
        } else if (normalizedRole === "dealer") {
          groupName = "Dealer";
        } else {
          groupName = "User"; // optional fallback
        }

        const groups = await client.send(
          new AdminListGroupsForUserCommand({
            UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
            Username: email,
          })
        );

        const currentGroup =
          groups.Groups && groups.Groups.length > 0
            ? groups.Groups[0].GroupName
            : null;

        if (currentGroup && currentGroup !== groupName) {
          await client.send(
            new AdminRemoveUserFromGroupCommand({
              UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
              Username: email,
              GroupName: currentGroup,
            })
          );
          await client.send(
            new AdminAddUserToGroupCommand({
              UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
              Username: email,
              GroupName: groupName,
            })
          );
        }
      }

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          message: `✏️ User ${email} updated successfully and ${
            isActive === false ? "disabled" : "enabled"
            }.`,
        }),
      };
    }

    // ✅ 3️⃣ LIST USERS
    if (action === "list") {
      const result = await client.send(
        new ListUsersCommand({
          UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
          Limit: 50,
        })
      );

      const users = result.Users || [];

      // Convert Cognito attributes array → clean object
      const formattedUsers = await Promise.all(
        users.map(async (u: any) => {
          const attrObj: any = {};

          u.Attributes?.forEach((a: any) => {
            attrObj[a.Name] = a.Value;
          });

          // Fetch group details
          const groupsResult = await client.send(
            new AdminListGroupsForUserCommand({
              UserPoolId: AMPLIFY_AUTH_USERPOOL_ID,
              Username: u.Username,
            })
          );

          const groups = groupsResult.Groups?.map((g: any) => g.GroupName) || [];

          return {
            username: u.Username,
            email: attrObj["email"] || null,
            fullName: attrObj["name"] || null,
            phone: attrObj["phone_number"] || null,
            emailVerified: attrObj["email_verified"] === "true",

            // Custom attributes
            dealership: attrObj["custom:dealership"] || null,
            dealershipId: attrObj["custom:dealershipId"] || null,
            dealershipName: attrObj["custom:dealershipName"] || null,
            cityId: attrObj["custom:cityId"] || null,
            cityName: attrObj["custom:cityName"] || null,

            // System metadata
            userStatus: u.UserStatus,
            enabled: u.Enabled,
            createdAt: u.UserCreateDate,
            updatedAt: u.UserLastModifiedDate,

            // Group list
            groups,
          };
        })
      );

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          users: formattedUsers,
        }),
      };
    }

    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        message: `Unknown action '${action}'. Supported: create, edit, list`,
      }),
    };
  } catch (err: any) {
    console.error("Error handling user action:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: err.message,
      }),
    };
  }
};
