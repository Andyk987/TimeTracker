import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import { ModalName } from './common/types';
import DeleteModal from './components/molecules/Modal/DeleteModal';
import UrlModal from './components/molecules/Modal/UrlModal';
import { timeActions } from './features/time/timeSlice';
import useStorageListener from './hooks/useStorageListener';
import MainPage from './pages/Main';

const AppStyled = styled.div`
  position: relative;
  max-width: 375px;
  max-height: 600px;
  width: 375px;
  height: 600px;
`;

const App = () => {
  const [changedData] = useStorageListener();

  const modal = useAppSelector((state: RootState) => state.common.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(timeActions.getInitState());
  }, []);

  useEffect(() => {
    if (changedData) {
      dispatch(timeActions.detectDataChanged(changedData));
    }
  }, [changedData]);

  const modalList = {
    urlModal: <UrlModal />,
    editModal: <UrlModal />,
    deleteModal: <DeleteModal />,
  };

  return (
    <AppStyled>
      <MainPage />
      {modal.state && modalList[modal.type]}
    </AppStyled>
  );
};

export default App;
