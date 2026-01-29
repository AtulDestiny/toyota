import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { TOKEN_SECRET } from '../../data/constants/token-secret.constant';
import { credentials } from '../../data/constants/dealership';

interface AuthParams {
    Ciudad: string;
    Concesionario: string;
    externalId: string;
}

interface Credential {
    Ciudad: string;
    Concesionario: string;
    SalaDeVentas: string;
    Tenant: string;
    IdentificadorApiKey: string;
    Contrasena: string;
    Type: string;
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

    // --- JWT AUTH LOGIC START ---
    const authHeader = event.headers?.authorization || event.headers?.Authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers: corsHeaders, // 🟩 ensure CORS included
        body: JSON.stringify({
          success: false,
          message: "Missing or invalid Authorization header",
        }),
      };
    }
        const token = authHeader.replace('Bearer ', '').trim();

    // Validate JWT_SECRET if needed
     if (!token || token !== TOKEN_SECRET) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: "Invalid or missing token" }),
      };
    }

    // Parse request body
    const body = JSON.parse(event.body || "{}");
    console.log("Request body:", JSON.stringify(body, null, 2));

    const { Ciudad, Concesionario, externalId }: AuthParams = body;

    if (!Ciudad || !Concesionario || !externalId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          message: "Missing required fields: Ciudad, Concesionario, or externalId",
        }),
      };
    }

        // Find credentials matching the Ciudad, Concesionario, and externalId
    const match = credentials.find(
            (item) => item.Ciudad === Ciudad && item.Concesionario === Concesionario && item.externalId === externalId
    );

    if (!match) {
      return {
        statusCode: 404,
        headers: corsHeaders, // 🟩 include here too
        body: JSON.stringify({
          error:
            "No credentials found for this combination of Ciudad, Concesionario, and externalId",
        }),
      };
    }

        // Call external authentication API using the matched credentials
    const response = await axios.post(
            'https://apipro.agentemotor.com/app/co/customers/authentication',
      {
        tenant: match.Tenant,
                username: match.IdentificadorApiKey,
                password: match.Contrasena,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return {
      statusCode: 200,
      headers: corsHeaders, // 🟩 always include
      body: JSON.stringify({
        token: response.data,
      }),
    };
  } catch (err: any) {
        console.error('Auth API error:', err.message);
    return {
      statusCode: 500,
      headers: corsHeaders, // 🟩 even in error
      body: JSON.stringify({ error: err.message }),
    };
  }
};
