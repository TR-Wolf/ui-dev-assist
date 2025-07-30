import { Handler } from '@netlify/functions';

interface UIRequest {
  input: string;
}

interface UIResponse {
  components: Array<{name: string, sub: string}>;
  message: string;
}

const handler: Handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST',
  };

  try {
    // Parse the request body
    const body: UIRequest = event.body ? JSON.parse(event.body) : { input: '' };
    
    if (!body.input) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Input is required' }),
      };
    }

    // TODO: Replace this with actual NLP API call
    // For now, we'll return a mock response
    // const components = ["button", "divider", "dropdown-menu"];
    
    const components = [
        {"name":"input", "sub":"Input with form control"},
        {"name":"input", "sub":"Input with masked field"}
    ];

    // const components = [
    //     {"name":"divider", "sub":"default"},
    //     {"name":"avatar", "sub":"Small image avatar"}
    // ];
    

    const response: UIResponse = {
      components: components,
      message: 'Components generated successfully',
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler }; 