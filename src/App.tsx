import React, { useState } from 'react';
import './App.css';
import InputDiv from './components/InputDiv.tsx';
import OutputDiv from './components/OutputDiv.tsx';
import { DefaultHorizontalNav } from './components/HorizontalNav.tsx';


const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<Array<{name: string, sub: string}>>([]);

  //Updates output with new component from fetch
  // const addComponent = (components: string[]) => {
  //     setOutput(components);
  // }

  //Form Events
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (input.length === 0) return;
    try {
      const response = await fetch('/.netlify/functions/process-ui-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOutput(data.components);
    } catch (err) {

      console.error('Error processing UI request:', err);
    }
  };

  const clearOutput = () => {
    setInput('');
    setOutput([]);
  }

  return (
    <div className="App">
      <DefaultHorizontalNav />
      <header className="App-header">
        <InputDiv
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          clearOutput={clearOutput}
        />
        <OutputDiv
          output={output}
        />

      </header>
    </div>
  );
}

export default App;
