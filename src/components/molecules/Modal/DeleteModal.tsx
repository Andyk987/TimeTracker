import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import {
  DELETE_DATA,
  DELETE_DATA_SUCCESS,
} from '../../../constants/timeConstants';
import { commonActions } from '../../../features/common/commonSlice';
import useChromeMessage from '../../../hooks/useChromeMessage';
import Button from '../../atoms/Button';
import Modal, { ModalBox } from '../../atoms/Modal';
import Span from '../../atoms/Span';
import Loading from '../Loading';
import ModalHeader from './ModalHeader';

interface DeleteModalProps {
  children?: React.ReactNode;
}

const StyledDeleteModal = styled(Modal)`
  ${ModalBox} {
    width: 315px;
    height: 160px;
    max-width: 315px;
    max-height: 160px;
  }
`;

const DeleteModalWrapper = styled.div`
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 30px 130px;
  justify-content: center;

  font-family: ${(props) => props.theme.font.nunito};
  font-weight: 400;
  font-size: 15px;
  color: ${(props) => props.theme.colors.dimgray};
`;

const DeleteModalBox = styled.div`
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: 1fr 1fr;
`;

const DeleteModalMessage = styled.div`
  width: 100%;
  text-align: center;
`;

const DeleteModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const DeleteButton = styled(Button)`
  height: 35px;

  &:nth-child(2) {
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    color: ${(props) => props.theme.colors.dimgray};
  }
`;

const DeleteModal: React.FC<DeleteModalProps> = () => {
  const [msg, sendMessage] = useChromeMessage('crud', 1000);
  const [loading, setLoading] = useState(false);

  const currentModal = useAppSelector((state: RootState) => state.common.modal);

  useEffect(() => {
    if (!msg) return;
    if (msg.code === DELETE_DATA_SUCCESS) {
      setLoading(false);
      dispatch(
        commonActions.toogleModal({
          modalType: currentModal.type,
          modalState: false,
          modalMetaData: {},
        })
      );
    }
  }, [msg]);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(
      commonActions.toogleModal({
        modalType: currentModal.type,
        modalState: false,
        modalMetaData: {},
      })
    );
  };

  const handleDelete = useCallback(() => {
    setLoading(true);
    sendMessage({
      code: currentModal.metadata?.msg,
      data: { timeTrackerData: { url: currentModal.metadata.url } },
    });
  }, []);

  const handleCancel = () => {
    dispatch(
      commonActions.toogleModal({
        modalType: currentModal.type,
        modalState: false,
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    setLoading(true);
    console.log(currentModal.metadata.msg, 'in delete modal');
    sendMessage({
      code: currentModal.metadata?.msg,
      data: { timeTrackerData: { url: currentModal.metadata.url } },
    });
  };

  return (
    <StyledDeleteModal
      className="deleteModal"
      modalType={currentModal.type}
      handleKeyDown={handleKeyDown}
    >
      <DeleteModalWrapper>
        <ModalHeader handleCloseModal={handleCloseModal} />
        <DeleteModalBox>
          <DeleteModalMessage>
            <Span>Do you want to delete?</Span>
          </DeleteModalMessage>
          <DeleteModalButtons>
            <DeleteButton
              size="small"
              buttonStyle="Full"
              onClick={handleDelete}
            >
              {loading ? (
                <Loading
                  viewBox="0 0 100 35"
                  cx="50"
                  cy="17.5"
                  borderColor="white"
                />
              ) : (
                'Delete'
              )}
            </DeleteButton>
            <DeleteButton
              size="small"
              buttonStyle="Full"
              onClick={handleCancel}
            >
              Cancel
            </DeleteButton>
          </DeleteModalButtons>
        </DeleteModalBox>
      </DeleteModalWrapper>
    </StyledDeleteModal>
  );
};

export default memo(DeleteModal);
