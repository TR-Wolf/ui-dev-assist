import React from 'react';

// From a google search
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Or any other style
import { VisaCopyTiny } from '@visa/nova-icons-react';
import { Button } from '@visa/nova-react';

export const SmallUiIconButton = () => {
  return (
    <Button aria-label="action" buttonSize="small" colorScheme="tertiary" iconButton>
      <VisaCopyTiny />
    </Button>
  );
};

const CodeContainer = ({code}) => {
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
    <div className='code-container'>
      <SyntaxHighlighter 
        language={'typescript'} 
        style={dracula}
        showLineNumbers={true} // Enable line numbers
        wrapLongLines={true}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
      <div className="copy-button-wrapper">
        <Button 
          aria-label="Copy code" 
          buttonSize="small" 
          colorScheme="secondary" 
          iconButton
          onClick={handleCopy}
          className="copy-button"
        >
          <VisaCopyTiny />
        </Button>
      </div>
    </div>
  );
};

export default CodeContainer;