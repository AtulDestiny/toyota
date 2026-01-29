import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { AGENT_MOTOR_URL } from '../../data/constants/token-secret.constant';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Request body is required' }),
      };
    }

    const { marca, modelo, year } = JSON.parse(event.body);

    if (!marca || !modelo) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'marca and modelo are required',
        }),
      };
    }

    const url =
      `${AGENT_MOTOR_URL}?` +
      `marca=${encodeURIComponent(marca)}` +
      `&modelo=${encodeURIComponent(modelo)}` +
      `&ceroKm=True` +
      `&in_agency=True`;

    const response = await fetch(url, {
      headers: {
        // 'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({
          message: 'AgentMotor API error',
          error: errorText,
        }),
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data: result }),
    };
  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error }),
    };
  }
};
