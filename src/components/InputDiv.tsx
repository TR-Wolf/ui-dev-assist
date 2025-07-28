import React from 'react';
import { Button, Input, InputContainer, Label, Utility } from '@visa/nova-react';
import { FormEvent } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'input-form-control';

export const CustomFormInput = () => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get(id);
    alert(`${query} submitted!`);
  };
  return (
    <form onSubmit={onSubmit}>
      <Utility vFlex vFlexCol vGap={4}>
        <Label htmlFor={id}></Label>
        <InputContainer>
          <Input aria-required="true" id={id} name={id} type="text" placeholder="What UI would you like to build today?" />
        </InputContainer>
      </Utility>
      <Utility vFlex vFlexRow vGap={8} vMarginTop={16}>
        <Button type="submit">Submit</Button>
        <Button colorScheme="secondary" type="reset">
          Reset
        </Button>
      </Utility>
    </form>
  );
};

const InputDiv = () => {
  return (
    <div className="input-div">
      <CustomFormInput />
    </div>
  );
};

export default InputDiv; 