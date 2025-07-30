import { Handler } from '@netlify/functions';
import * as cheerio from 'cheerio';

interface UIRequest {
    query: string;
}

interface UIResponse {
    code: string;
    message: string;
}
const baseUrl = "https://design.visa.com/components/";

const handler: Handler = async (event, context) => {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
    };

    try {
        // Parse the request body
        const body: UIRequest = event.body ? JSON.parse(event.body) : { query: '' };
        
        if (!body.query) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Name of component requested is required' }),
            };
        }

        //Fetch component data from Visa Design website
        let queryUrl = baseUrl + body.query
        const queryResponse = await fetch(queryUrl);
        if(!queryResponse.ok){
            console.log("Could not read from:")
            console.log(queryUrl)
            const status = 'HTTP error! status: ' + queryResponse.status
            return {
                statusCode: queryResponse.status,
                headers,
                body: JSON.stringify({ error: status, code: "Error"})
            }
        }
        const htmlData = await queryResponse.text();
        console.log("it appears we have html data :)")
        const $ = cheerio.load(htmlData);

        // Limit parsing to just inside #main-content
        // Narrow to the examples container
        const exampleSection = $('.code-page-examples');
        
        console.log(exampleSection.html())
        if (!exampleSection.length) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'No example section found for this component.' }),
            };
        }

        // Find all headings in the examples section (variant labels)
        const variantTitles = exampleSection.find('h2, h3').map((_, el) => {
        return $(el).text().trim();
        }).get();

        console.log("Variant titles fetched for this component")
        console.log(variantTitles)


        //TODO put a REAL call to ^ here to fetch code, and potentially other data.
        //Mock code
        const code = "console.log(\"Hello World!\");";

        const response: UIResponse = {
            code: code,
            message: 'Component generated successfully',
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(response)
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