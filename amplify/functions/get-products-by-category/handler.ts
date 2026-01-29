import { data, type Schema } from "../../data/resource"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateClient } from "aws-amplify/api";
import '../../helpers/amplify-init';
import { TOKEN_SECRET } from "../../data/constants/token-secret.constant";
import { GET_PRODUCTS_QUERY } from "../../data/graphql/products/queries/get-products.query";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  try {
    // Manejar CORS preflight
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Methods": "POST,OPTIONS",
        },
        body: "",
      };
    }

    // Solo permitir POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Method not allowed" }),
      };
    }

    // --- JWT AUTH LOGIC START ---
    const authHeader = event.headers?.authorization || event.headers?.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ success: false, message: "Missing or invalid Authorization header" }),
      };
    }
    const token = authHeader.replace("Bearer ", "").trim();

    // Validar TOKEN_SECRET
    if (!token || token !== TOKEN_SECRET) {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: "Invalid or missing token" }),
      };
    }

    // Generate a type-safe API client
    const client: any = generateClient<Schema>();

    const body = JSON.parse(event.body || "{}");
    console.log('Request body:', JSON.stringify(body, null, 2));

    const { categoryType } = body;

    // Validate required fields
    if (!categoryType) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          success: false,
          message: "Missing required field: categoryType"
        }),
      };
    }

    // Get all products
    const result = await client.graphql({
      query: GET_PRODUCTS_QUERY,
      authMode: "apiKey"
    });

    console.log('Result:', JSON.stringify(result, null, 2));
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);

      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          success: false,
          message: "Error",
          errors: result.errors
        }),
      };
    }

    // Get products from result
    const products = result.data?.listProducts?.items ?? [];

    // Filter products by category type
    const filteredProducts = products.filter(
      (product: any) => product?.category?.type === categoryType
    );

    // Return success response with filtered products
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        products: filteredProducts
      }),
    };
  } catch (error: unknown) {
    console.error('Error in handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Error getting products by category',
        error: error instanceof Error ? error.message : String(error),
      }),
    };
  }
}