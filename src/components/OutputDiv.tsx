import React from 'react';
import CodeContainer from './CodeContainer.tsx';

const OutputDiv = ({ output }: { output: string[] }) => {

    const renderCodeContainer = (query: string, index) => {
        return <CodeContainer query={query} key={index} />;
    }

    return (
        <div className="output-div">
            {
            output.map((query: string, index) => 
                renderCodeContainer(query, index)
            )
            }
        </div>
    );
};

export default OutputDiv;