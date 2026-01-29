import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import fetch, { HeadersInit } from 'node-fetch';
import { TOKEN_SECRET } from "../../data/constants/token-secret.constant";

const TARGET_BASE_URL = "http://toyota.com.co.php74-39.phx1-1.websitetestlink.com/services/index.php";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // CORS preflight
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        },
        body: "",
      };
    }

    // Validar TOKEN_SECRET
    const authHeader = event.headers?.authorization || event.headers?.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, message: "Missing or invalid Authorization header" }),
      };
    }
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token || token !== TOKEN_SECRET) {
      return {
        statusCode: 401,
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, message: "Invalid or missing token" }),
      };
    }

    // Construir URL destino con query params
    const queryString = event.queryStringParameters
      ? "?" + Object.entries(event.queryStringParameters)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? "")}`)
          .join("&")
      : "";
    const targetUrl = TARGET_BASE_URL + queryString;

    // Preparar headers (sin el Authorization original)
    const headers: HeadersInit = {
      "Content-Type": event.headers["content-type"] || event.headers["Content-Type"] || "application/json",
    };

    // Preparar opciones de fetch
    const fetchOptions: any = {
      method: event.httpMethod,
      headers,
      body: ["GET", "HEAD"].includes(event.httpMethod) ? undefined : event.body,
    };

    // Hacer la petición al endpoint externo
    const response = await fetch(targetUrl, fetchOptions);
    const responseBody = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": response.headers.get("content-type") || "application/json"
      },
      body: responseBody,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: error.message || "Proxy error" }),
    };
  }
};