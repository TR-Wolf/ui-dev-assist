import React from 'react';
import './App.css';
import InputDiv from './components/InputDiv.tsx';
import OutputDiv from './components/OutputDiv.tsx';
import { DefaultHorizontalNav } from './components/HorizontalNav.tsx';

const App = () => {
  return (
    <div className="App">
      <DefaultHorizontalNav />
      <header className="App-header">
        <InputDiv />
        <OutputDiv />
      </header>
    </div>
  );
}

export default App;
