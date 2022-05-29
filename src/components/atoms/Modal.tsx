import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ModalName } from '../../common/types';
import { commonActions } from '../../features/common/commonSlice';

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  modalType?: ModalName;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const StyledModal = styled.div`
  position: absolute;
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 100%;
  top: 0;
  backdrop-filter: brightness(0.4);
`;

export const ModalBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  border-radius: 2px;
  background: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  modalType,
  handleKeyDown,
}) => {
  const modalRef: React.Ref<HTMLDivElement> = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalRef && modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const handleClick = useCallback(
    (e) => {
      if (e.target.nodeName === 'svg' || e.target.nodeName === 'path') return;
      const classList: string[] = e.target.className.split(' ');
      const splitedClass = className.split(' ');
      if (classList.includes(splitedClass[splitedClass.length - 1])) {
        dispatch(
          commonActions.toogleModal({
            modalType,
            modalState: false,
            modalMetaData: {},
          })
        );
      }
    },
    [modalType]
  );

  return (
    <StyledModal
      className={className}
      ref={modalRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <ModalBox>{children}</ModalBox>
    </StyledModal>
  );
};

export default memo(Modal);
