import React, { useState } from 'react';
import CodeContainer from './CodeContainer.tsx';
const filePath = '/passwordInput.txt'


const OutputDiv = () => {
    const [code, setCode] = useState("no code found");
    // useEffect(() => {
    fetch(filePath)
        .then(r => r.text())
        .then(setCode)
        .catch((err) => console.error('Error loading code:', err));
        // }, [filePath]);
    return (
        <div className="output-div">
            <h1>Generated code will appear here.</h1>
            <CodeContainer code={code} />
        </div>
    );
};

export default OutputDiv;