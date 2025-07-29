import React from 'react';
import CodeContainer from './CodeContainer.tsx';

const OutputDiv = ({ output }: { output: string[] }) => {
    return (
        <div className="output-div">
            {output.map((code, index) => (
                <div key={index}>{<CodeContainer code={code} />}</div>
            ))}
        </div>
    );
};

export default OutputDiv;