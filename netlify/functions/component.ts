import { Handler } from '@netlify/functions';
// import * as cheerio from 'cheerio';
//Instead of reading the data based on a request we are just going to have a few samples
const componentData = 
{
    "components": [
      {
        "name": "input",
        "subcomponents": [
          {
            "name":"default",
            "code_blocks":[
              {
                "language":"Typescript",
                "code":"import { Input, InputContainer, Label, Utility } from '@visa/nova-react';\n\n// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react\nconst id = 'input-default';\n\nexport const DefaultInput = () => {\n  return (\n    <Utility vFlex vFlexCol vGap={4}>\n      <Label htmlFor={id}>Label (required)</Label>\n      <InputContainer>\n        <Input aria-required=\"true\" id={id} type=\"text\" />\n      </InputContainer>\n    </Utility>\n  );\n};"
              }
            ]
          },
          {
            "name":"Input with masked field",
            "code_blocks":[
              {
                "language":"Typescript",
                "code":"import { VisaPasswordHideTiny, VisaPasswordShowTiny } from '@visa/nova-icons-react';\nimport { Button, Input, InputContainer, Label, Utility } from '@visa/nova-react';\nimport { useState } from 'react';\n\n// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react\nconst id = 'input-mask-button';\n\nexport const MaskButtonInput = () => {\n  const [showPassword, setShowPassword] = useState(false);\n\n  return (\n    <Utility vFlex vFlexCol vGap={4}>\n      <Label htmlFor={id}>Label (required)</Label>\n      <InputContainer>\n        <Input aria-required=\"true\" defaultValue=\"password\" id={id} type={showPassword ? 'text' : 'password'} />\n        <Button\n          aria-label={showPassword ? 'hide text' : 'show text'}\n          buttonSize=\"small\"\n          colorScheme=\"tertiary\"\n          iconButton\n          onClick={() => setShowPassword(!showPassword)}\n        >\n          {showPassword ? <VisaPasswordHideTiny /> : <VisaPasswordShowTiny />}\n        </Button>\n      </InputContainer>\n    </Utility>\n  );\n};"
              }
            ]
          },
          {
            "name":"Input with form control",
            "code_blocks":[
              {
                "language":"Typescript",
                "code":"import { Button, Input, InputContainer, Label, Utility } from '@visa/nova-react';\nimport { FormEvent } from 'react';\n\n// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react\nconst id = 'input-form-control';\n\nexport const CustomFormInput = () => {\n  const onSubmit = (event: FormEvent<HTMLFormElement>) => {\n    event.preventDefault();\n    const formData = new FormData(event.currentTarget);\n    const query = formData.get(id);\n    alert(`${query} submitted!`);\n  };\n  return (\n    <form onSubmit={onSubmit}>\n      <Utility vFlex vFlexCol vGap={4}>\n        <Label htmlFor={id}>Label (required)</Label>\n        <InputContainer>\n          <Input aria-required=\"true\" id={id} name={id} type=\"text\" />\n        </InputContainer>\n      </Utility>\n      <Utility vFlex vFlexRow vGap={8} vMarginTop={16}>\n        <Button type=\"submit\">Submit</Button>\n        <Button colorScheme=\"secondary\" type=\"reset\">\n          Reset\n        </Button>\n      </Utility>\n    </form>\n  );\n};"
              }
            ]
          }
        ]
      },
      {
        "name": "radio",
        "subcomponents": [
          {
            "name":"Radio button with label",
            "code_blocks":[
              {
                "language":"typescript",
                "code":"import { Label, Radio, Utility } from '@visa/nova-react';\r\n\r\n// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react\r\nconst id = 'default-radio';\r\n\r\nexport const DefaultRadio = () => {\r\n  return (\r\n    <Utility vAlignItems=\"center\" vFlex vGap={2}>\r\n      <Radio id={id} name={id} />\r\n      <Label htmlFor={id}>Label</Label>\r\n    </Utility>\r\n  );\r\n};"
              }
            ]
          }
        ]
      },
      {
        "name": "divider",
        "subcomponents": [
          {
            "name":"default",
            "code_blocks":[
              {
                "language":"Typescript",
                "code":"import { Divider } from '@visa/nova-react';\n\nexport const DefaultDivider = () => {\n  return <Divider />;\n};"
              }
            ]
          }
        ]
      },
      {
        "name": "avatar",
        "subcomponents": [
          {
            "name":"Small image avatar",
            "code_blocks":[
              {
                "language":"Typescript",
                "code":"import { Avatar } from '@visa/nova-react';\n\n/// This is the base url for where your site is deployed. `import.meta.env.BASE_URL` is the environment variable used to import the base url for Vite. Change this import to match your build tool's base url.\nconst BASE_URL = import.meta.env.BASE_URL;\nconst user = 'Alex Miller';\n\nexport const SmallImageAvatar = () => {\n  return <Avatar alt={user} small tag=\"img\" src={BASE_URL + '/alex-miller-stock.png'} />;\n};"
              }
            ]
          }
        ]
      },
      {
        "name": "No components found",
        "subcomponents": [
          {
            "name":"nothing",
            "code_blocks":[
              {
                "language":"any",
                "code":"Code for an existing component would appear here."
              }
            ]
          }
        ]
      }
    ]
};

interface UIRequest {
    query: string;
    sub: string;
}

interface UIResponse {
    code: string;
    message: string;
    name: string;
    language: string;
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
        /* FETCHING FROM VISA DESIGN WEBSITE DOESNT WORK*/
        //Fetch component data from Visa Design website
        // let queryUrl = baseUrl + body.query
        // const queryResponse = await fetch(queryUrl);
        // if(!queryResponse.ok){
        //     console.log("Could not read from:")
        //     console.log(queryUrl)
        //     const status = 'HTTP error! status: ' + queryResponse.status
        //     return {
        //         statusCode: queryResponse.status,
        //         headers,
        //         body: JSON.stringify({ error: status, code: "Error"})
        //     }
        // }
        // const htmlData = await queryResponse.text();
        // console.log("it appears we have html data :)")
        // const $ = cheerio.load(htmlData);

        // Limit parsing to just inside #main-content
        // Narrow to the examples container
        // const exampleSection = $('.code-page-examples');
        
        // console.log(exampleSection.html())
        // if (!exampleSection.length) {
        //     return {
        //         statusCode: 404,
        //         body: JSON.stringify({ error: 'No example section found for this component.' }),
        //     };
        // }

        // Find all headings in the examples section (variant labels)
        // const variantTitles = exampleSection.find('h2, h3').map((_, el) => {
        // return $(el).text().trim();
        // }).get();

        // console.log("Variant titles fetched for this component")
        // console.log(variantTitles)

        //TODO put a REAL call to ^ here to fetch code, and potentially other data.
        
        //Fetching the data in real time does not work 
        // because it is a java-script rendered website
        // regardless the overhead would be too much,
        // Tried creating scraper and ran into issues
        //Instead just created stubbed json file based on what scraper
        //should return, in case a scraper is made in the future with
        //complete data set
        // Embedded component data to avoid file system issues
        

        const component = componentData.components.find(comp => comp.name.toLowerCase() === body.query.toLowerCase());

        console.log("Read through json and found this component")
        console.log(component)

        if (!component) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Component not found' })
            };
        }

        // Find the specific subcomponent
        const subcomponent = component.subcomponents.find(sub => 
            sub.name.toLowerCase() === body.sub.toLowerCase()
        );

        if (!subcomponent) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Subcomponent not found' })
            };
        }

        const codeBlock = subcomponent.code_blocks[0];
        const code = codeBlock.code;

        const response: UIResponse = {
            code: code,
            message: 'Component generated successfully',
            name: subcomponent.name,
            language: codeBlock.language,
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