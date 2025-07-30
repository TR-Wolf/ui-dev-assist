import React from 'react';
import CodeContainer from './CodeContainer.tsx';

const OutputDiv = ({ output }: { output: Array<{name: string, sub: string}> }) => {

    const renderCodeContainer = (component: {name: string, sub: string}, index: number) => {
        return <CodeContainer query={component.name} sub={component.sub} key={index} />;
    }

    return (
        <div className="output-div">
            {
            output.map((component, index) => 
                renderCodeContainer(component, index)
            )
            }
        </div>
    );
};

export default OutputDiv;