import React from 'react';
import CodeContainer from './CodeContainer.tsx';

const OutputDiv = ({ output }: { output: string[] }) => {

    const fetchQuery = (query: string) => {
        console.log("Fetching " + query)
        let code = "This should be replaced with code later"
        return renderCodeContainer(code);
    }

    const renderCodeContainer = (code: string) => {
        return <CodeContainer code={code} />;
    }


    return (
        <div className="output-div">
            {
            output.map((query: string) => 
                fetchQuery(query)
            )}
        </div>
    );
};

export default OutputDiv;