import React, { useState, useEffect } from 'react';

// From a google search
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Or any other style
import { VisaCopyHigh, VisaLinkLow } from '@visa/nova-icons-react';
import { Button, Link } from '@visa/nova-react';

//From Visa Design System
import {
  Accordion,
  AccordionHeading,
  AccordionPanel,
  AccordionToggleIcon,
  UtilityFragment,
} from '@visa/nova-react';

export const SmallUiIconButton = () => {
  return (
    <Button aria-label="action" buttonSize="small" colorScheme="tertiary" iconButton>
      <VisaCopyHigh />
    </Button>
  );
};



const CodeContainer = ({ query, sub }: { query: string, sub: string }) => {
  const [code, setCode] = useState('code');
  const [name, setName] = useState('name');
  const [lang, setLang] = useState('language');
  const visaUrl = "https://design.visa.com/components/" + query;
  //Fetch data from Visa Product Design System Website
  useEffect(() => {
    try {
      fetch('/.netlify/functions/component', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, sub }),
        // body: JSON.stringify({ input }),
      }).then(response => {
        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
          return { "code": "Could not fetch code for this component." };
        } else {
          return response.json();
        }
      }).then(data => {
        setCode(data.code);
        setName(data.name);
        setLang(data.language);
      })

    } catch (err) {
      console.error('Error processing UI request:', err);
    }
  }, [query, sub]);




  //lambda function for copying code
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        console.log('Text successfully copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }
  return (
    <div className='code-container' style={{ width: '100%', maxWidth: '800px' }}>
              <span className="v-typography-headline-3 code-heading">
          {name}
          <div className="logo-button-wrapper">
            <Link noUnderline element={<a href={visaUrl} target="_blank" rel="noreferrer" aria-label="View component on Visa Design System" />}>
              <VisaLinkLow />
            </Link>
          </div>
        </span>
      <Accordion style={{ width: '100%' }}>
        <UtilityFragment vAlignItems="center">
          <AccordionHeading buttonSize="large" colorScheme="secondary">
            {/* TODO: Remove this style tag after nova-styles fix */}
            <AccordionToggleIcon style={{ alignSelf: 'center' }} />
            {lang}
            <UtilityFragment vMarginLeft="auto">
              <div className="logo-button-wrapper">
                <Button
                  aria-label="Copy code"
                  buttonSize="small"
                  colorScheme="secondary"
                  iconButton
                  onClick={handleCopy}
                  className="copy-button"
                  style={{ pointerEvents: 'auto' }}
                  onMouseEnter={(e) => e.stopPropagation()}
                  onMouseLeave={(e) => e.stopPropagation()}
                >
                  <VisaCopyHigh />
                </Button>
              </div>
            </UtilityFragment>
          </AccordionHeading>
        </UtilityFragment>
        <AccordionPanel style={{ width: '100%', overflowX: 'auto', padding: 0, margin: 0 }}>
          <SyntaxHighlighter
            language={lang}
            style={dracula}
            showLineNumbers={true} // Enable line numbers
            wrapLongLines={true}
            wrapLines={true}
            customStyle={{
              width: '100%',
              maxWidth: '100%',
              overflow: 'auto',
              margin: 0,
              padding: '16px',
              boxSizing: 'border-box',
              borderRadius: 0,
              border: 'none'
            }}
            codeTagProps={{
              style: {
                whiteSpace: 'pre-wrap',
                fontSize: '14px',
                lineHeight: '1.5'
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
        </AccordionPanel>
      </Accordion>
    </div>
  );
};

export default CodeContainer;