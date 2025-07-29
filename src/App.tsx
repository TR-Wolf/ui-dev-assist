import React, { useState } from 'react';
import './App.css';
import InputDiv from './components/InputDiv.tsx';
import OutputDiv from './components/OutputDiv.tsx';
import { DefaultHorizontalNav } from './components/HorizontalNav.tsx';
import CodeContainer from './components/CodeContainer.tsx';


const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  //Updates output with new component from fetch
  const addComponent = (code: string) => {
      const newOutput = [code];
      setOutput(newOutput);
  }
  

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Temp Mock API call
    const filePath = '/passwordInput.txt'
    fetch(filePath)
        .then(r => r.text())
        .then(addComponent)
        .catch((err) => console.error('Error loading code:', err));
  };

  const clearOutput = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput('');
    setOutput([]); // should we reset output here?
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
