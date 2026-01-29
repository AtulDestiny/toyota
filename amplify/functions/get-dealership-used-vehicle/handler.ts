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
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
  };

  try {
    // Handle CORS
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

    // Auth check
    const authHeader = event.headers?.authorization || event.headers?.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: "Missing Authorization" }),
      };
    }

    const token = authHeader.replace("Bearer ", "").trim();
    if (token !== TOKEN_SECRET) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: "Invalid token" }),
      };
    }

    // Parse request body
    const body = JSON.parse(event.body || "{}");
    const { Ciudad, Concesionario, externalId, placa, modelo, marca, year } = body;

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

    // Get dealership credentials
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
          error:
            "No credentials found for this Ciudad/Concesionario/externalId combination",
        }),
      };
    }

    // Step 1: Get AgentMotor Auth Token
    const authResponse = await axios.post(
      "https://apipro.agentemotor.com/app/co/customers/authentication",
      {
        tenant: match.Tenant,
        username: match.IdentificadorApiKey,
        password: match.Contrasena,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const agentToken = authResponse.data?.access_token;
    if (!agentToken) throw new Error("Failed to obtain token from AgentMotor");

    // Step 2: Dynamic fetch based on request type
    let vehicleResponse;

    if (placa && !marca && !modelo) {
      // 🟡 Used vehicle (by plate)
      vehicleResponse = await axios.post(
        "https://apipro.agentemotor.com/seguros/co/vehiculos/datos_add",
        { placa, consultas: ["fasecolda"] },
        { headers: { Authorization: `Bearer ${agentToken}` } }
      );
    } else if (marca && modelo) {
      // New vehicles (by characteristics)
      const { ref } = body;

      // Ensure ref is provided
      if (!ref) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            success: false,
            message: "Missing required field: ref",
          }),
        };
      }

      // Construct query params
      const query = new URLSearchParams({
        marca,
        ref,
        modelo,
        ceroKm: "true",
        in_agency: "true",
      });

      const url = `https://apipro.agentemotor.com/seguros/co/vehicles/consultar/vehiculos-por-caracteristica?${query.toString()}`;

      // Call AgentMotor API
      vehicleResponse = await axios.get(url, {
        headers: { Authorization: `Bearer ${agentToken}` },
      });
    } else {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          message: "Invalid parameters: must provide either placa or marca/modelo",
        }),
      };
    }

    // Return clean response
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        type: placa ? "used" : "new",
        data: vehicleResponse.data,
      }),
    };
  } catch (err: any) {
    console.error("Error:", err.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
