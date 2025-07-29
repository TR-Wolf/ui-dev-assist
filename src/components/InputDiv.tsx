import React, { ChangeEvent } from 'react';
import { Button, Input, InputContainer, Label, Utility } from '@visa/nova-react';
//import 

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'input-form-control';

export const CustomFormInput = ({input, setInput, onSubmit, clearOutput}) => {
  
  //To maintain input as a state variable we need to handle changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    console.log("input updating")
    setInput(newInput);
  };

  return (
    <form onSubmit={onSubmit}>
      <Utility vFlex vFlexCol vGap={4}>
        <Label htmlFor={id}></Label>
        <InputContainer>
          <Input 
          aria-required="true" 
          id={id} 
          name={id} 
          type="text" 
          placeholder="What UI would you like to build?" 
          value={input}
          onChange={handleChange}
          />
        </InputContainer>
      </Utility>
      <Utility vFlex vFlexRow vGap={8} vMarginTop={16}>
        <Button type="submit">Submit</Button>
        <Button 
          colorScheme="secondary"
          onClick={clearOutput}
          >
          Reset
        </Button>
      </Utility>
    </form>
  );
};

const InputDiv = ({input, setInput, onSubmit, clearOutput}) => {
  return (
    <div className="input-div">
      <CustomFormInput 
      input={input} 
      setInput={setInput} 
      onSubmit={onSubmit} 
      clearOutput={clearOutput}
      />
    </div>
  );
};

export default InputDiv; 