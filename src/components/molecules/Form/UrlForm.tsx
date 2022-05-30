import React, { memo } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import styled from 'styled-components';

interface UrlFormProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<{ urlModal?: string; editModal?: string }>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleInput: (e: any) => void;
  handleInvalid: (e: any) => void;
}

const StyledUrlForm = styled.form`
  display: grid;
  grid-template-rows: 55px 120px 55px;
  align-items: start;
  justify-content: center;
  margin: 0 auto;
  width: 250px;
  height: 100%;
`;

const UrlForm: React.FC<UrlFormProps> = ({
  children,
  onSubmit,
  handleSubmit,
  handleInput,
  handleInvalid,
}) => {
  return (
    <StyledUrlForm
      onSubmit={handleSubmit(onSubmit)}
      onInput={handleInput}
      onInvalid={handleInvalid}
    >
      {children}
    </StyledUrlForm>
  );
};

export default memo(UrlForm);
