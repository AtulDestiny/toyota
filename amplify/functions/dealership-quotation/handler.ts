import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { TOKEN_SECRET } from '../../data/constants/token-secret.constant';
import { credentials } from '../../data/constants/dealership';

interface AuthParams {
  Ciudad: string;
  Concesionario: string;
  externalId: string;
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // 🟩 Define reusable CORS headers (add these to every response)
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
  };

  try {
    // 🟩 Handle CORS preflight
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: "",
      };
    }

    // Only allow POST method
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Method not allowed" }),
      };
    }

    // Parse request body
    const body = JSON.parse(event.body || "{}");
    console.log("Request body:", JSON.stringify(body, null, 2));

    const { payload } = body;
    const { Ciudad, Concesionario, externalId, nextID, quoteData } = payload;

    if (!Ciudad || !Concesionario || !externalId || !payload || !nextID || !quoteData) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          message: "Missing required fields",
        }),
      };
    }

    // Find credentials matching the Ciudad, Concesionario, and externalId
    const match = credentials.find(
      (item) =>
        item.Ciudad === Ciudad &&
        item.Concesionario === Concesionario &&
        item.externalId === externalId
    );

    if (!match) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          message:
            "No credentials found for this combination of Ciudad, Concesionario, and externalId",
        }),
      };
    }

    // 🟩 Step 1: Authenticate to get API token
    const authResponse = await axios.post(
      "https://apipro.agentemotor.com/app/co/customers/authentication",
      {
        tenant: match.Tenant,
        username: match.IdentificadorApiKey,
        password: match.Contrasena,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const accessToken = authResponse.data?.access_token || authResponse.data?.token?.access_token;
    if (!accessToken) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          message: "No toeken received from authentication API",
          data: authResponse.data,
        }),
      };
    }

    // 🟩 Step 2: Call the final API with the token and payload
    await axios.post(
      "https://apipro.agentemotor.com/app/co/customers/quotation",
      quoteData, // send full payload
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: "Quotation created successfully!",
        // data: finalResponse.data,
      }),
    };
  } catch (err: any) {
    console.error("Handler error:", err.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: err.message,
        stack: err.stack,
      }),
    };
  }
};