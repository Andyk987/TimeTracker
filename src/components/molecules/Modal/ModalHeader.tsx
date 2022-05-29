import CloseButton from '../../../assets/close-button.svg';
import { memo } from 'react';
import styled from 'styled-components';
import React from 'react';

interface ModalHeaderProps {
  handleCloseModal?: () => void;
}

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: end;
  padding: 12px 12px 0 0;
`;

const ModalHeader: React.FC<ModalHeaderProps> = ({ handleCloseModal }) => {
  return (
    <StyledModalHeader>
      <CloseButton
        onClick={handleCloseModal}
        width="18"
        height="18"
        style={{
          transform: 'rotate(45deg)',
          cursor: 'pointer',
        }}
      />
    </StyledModalHeader>
  );
};

export default memo(ModalHeader);
