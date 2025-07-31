import { Handler } from '@netlify/functions';

interface UIRequest {
  input: string;
}

interface UIResponse {
  components: Array<{name: string, sub: string}>;
  message: string;
}

// Simple function to generate components based on input
function generateComponentsFromInput(input: string): Array<{name: string, sub: string}> {
  const lowerInput = input.toLowerCase();
  const components: Array<{name: string, sub: string}> = [];
  
  if (lowerInput.includes('form')) {
    components.push({"name":"input", "sub":"Input with form control"});
  }
  if (lowerInput.includes('login')) {
    components.push( {"name":"input", "sub":"Input with masked field"});
  }
  if (lowerInput.includes('remember')) {
    components.push( {"name":"radio", "sub":"Radio button with label"});
  }
  if (lowerInput.includes('divide')) {
    components.push( {"name":"divider", "sub":"default"});
  }
  if (lowerInput.includes('avatar')) {
    components.push( {"name":"avatar", "sub":"Small image avatar"});
  }

  if (components.length === 0){
    components.push({"name":"No components found", "sub":"nothing"});
  }
  
  
  return components;
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

    // Generate components based on input keywords
    const components = generateComponentsFromInput(body.input);
    

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