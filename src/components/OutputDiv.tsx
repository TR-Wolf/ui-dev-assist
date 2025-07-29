import React, { useState } from 'react';
import CodeContainer from './CodeContainer.tsx';
const filePath = '/passwordInput.txt'


const OutputDiv = () => {

    //TEMP FOR SIMMING FETCHED CODE
    const [code, setCode] = useState("no code found");
    // useEffect(() => {
    fetch(filePath)
        .then(r => r.text())
        .then(setCode)
        .catch((err) => console.error('Error loading code:', err));
        // }, [filePath]);
    
    const disp = [<CodeContainer code={code} />]
    // const disp = [];
    return (
        <div className="output-div">
            {disp.map(component => 
                <>{component}</>
            )}
        </div>
    );
};

export default OutputDiv;