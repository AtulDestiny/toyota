import { data, type Schema } from "../../data/resource"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateClient } from "aws-amplify/api";
import { GET_VEHICLE_BY_SLUG_QUERY } from "../../data/graphql/vehicles/queries/get-vehicle-by-slug.query";
import '../../helpers/amplify-init';
import { TOKEN_SECRET } from "../../data/constants/token-secret.constant";

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

    const { slug, category } = body;

    // Validate required fields
    if (!slug || !category) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          success: false,
          message: "Missing required fields: slug, category"
        }),
      };
    }

    // Get vehicles by slug
    const result = await client.graphql({
      query: GET_VEHICLE_BY_SLUG_QUERY,
      variables: { slug },
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

    // Get vehicles from result
    const vehicles = result.data?.listVehicles?.items ?? [];

    // Filter products by category type for each vehicle
    const vehiclesWithFilteredProducts = vehicles.map((vehicle: any) => ({
      ...vehicle,
      products: {
        ...vehicle.products,
        items: (vehicle.products?.items ?? []).filter(
          (product: any) => product?.category?.type === category
        ),
      },
    }));

    // Return success response with filtered vehicles
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        vehicles: vehiclesWithFilteredProducts
      }),
    };
  } catch (error: unknown) {
    console.error('Error in handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Error login admin user',
        error: error instanceof Error ? error.message : String(error),
      }),
    };
  }
}