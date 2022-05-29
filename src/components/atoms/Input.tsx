import React, { memo, useEffect, useRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { ModalName } from '../../common/types';

interface InputProps {
  label?: ModalName;
  defaultValue?: string | number | readonly string[];
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  height?: string;
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
  len?: number;
  isError?: boolean;
  errMessage?: string;
  handleFocus?: () => void;
}

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledInputBoxWrapper = styled.div`
  position: relative;
`;

const StyledLabelBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-family: ${(props) => props.theme.font.nunito};
  font-size: 15px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.dimgray};

  &:nth-child(2) {
    font-size: 13px;
    color: ${(props) => props.theme.colors.darkRed};
  }
`;

const StyledInput = styled.input<{
  isError: boolean;
}>`
  padding-left: 70px;
  width: 100%;
  height: ${(props) => props.height};
  border: none;
  border-radius: 8px;
  font-family: ${(props) => props.theme.font.nunito};
  font-weight: 300;
  font-size: 15px;
  color: ${(props) => props.theme.colors.dimgray};
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  caret-color: ${(props) => props.theme.colors.dimgray};
  box-shadow: 0px 0px 4px
    ${(props) =>
      props.isError ? props.theme.colors.darkRed : 'rgba(0, 0, 0, 0.25)'};

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-weight: 300;
  }
`;

const InputProtocolBox = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 100%;
  text-align: center;

  font-family: ${(props) => props.theme.font.nunito};
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.dimgrayHalf};
`;

const InputProtocol = styled.span``;

const Input: React.FC<InputProps> = ({
  defaultValue,
  type,
  placeholder,
  label,
  height = 'auto',
  register,
  required = true,
  errMessage,
  isError,
  handleFocus,
}) => {
  const defualt = {
    defaultValue,
    type,
    placeholder,
    height,
  };

  return (
    <StyledInputWrapper>
      <StyledLabelBox>
        <StyledLabel>{label === 'urlModal' ? 'Url' : 'ChangeUrl'}</StyledLabel>
        {errMessage && <StyledLabel>{errMessage}</StyledLabel>}
      </StyledLabelBox>
      <StyledInputBoxWrapper>
        <StyledInput
          {...defualt}
          required
          {...register(label, {
            required,
          })}
          autoComplete="off"
          isError={isError}
          onFocus={handleFocus}
        />
        <InputProtocolBox>
          <InputProtocol>https://</InputProtocol>
        </InputProtocolBox>
      </StyledInputBoxWrapper>
    </StyledInputWrapper>
  );
};

export default memo(Input);
