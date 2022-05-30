import _ from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import {
  ADD_DATA_SUCCESS,
  SEARCH_HISTORY,
  SEARCH_HISTORY_SUCCESS,
  EDIT_DATA_SUCCESS,
} from '../../../constants/timeConstants';
import useChromeMessage from '../../../hooks/useChromeMessage';
import useDebounce from '../../../hooks/useDebounce';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Modal, { ModalBox } from '../../atoms/Modal';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../../features/common/commonSlice';
import UrlCards from '../UrlCards';
import ModalHeader from './ModalHeader';
import UrlForm from '../Form/UrlForm';
import { useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { urlRegex } from '../../../constants/urlRegexConstants';
import Loading from '../Loading';
import {
  validateHost,
  validateLastDomain,
  validateUrl,
} from '../../../modules/urlUtil';

interface UrlModalProps {
  children?: React.ReactNode;
}

interface IUrlForm {
  urlModal?: string;
  editModal?: string;
}

const StyledUrlModal = styled(Modal)`
  ${ModalBox} {
    width: 315px;
    height: 260px;
    max-width: 315px;
    max-height: 260px;
  }
`;

const UrlModalWrapper = styled.div`
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 30px 230px;
  justify-content: center;
`;

const UrlButton = styled(Button)<{ errorState?: boolean }>`
  justify-self: center;
  height: 35px;
  font-family: ${(props) => props.theme.font.nunito};
  font-size: 15px;
  border-radius: 2px;
  background: ${(props) =>
    props.errorState ? 'rgba(0, 0, 0, 0.25)' : props.theme.colors.violet};
  transition: all 0.3s ease-in-out;
`;

const UrlModal: React.FC<UrlModalProps> = ({}) => {
  const [errorState, setErrorState] = useState(false);
  const [errMessage, setErrMessage] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [moveFocusIndex, setMoveFocusIndex] = useState(-1);
  const [historyList, setHistoryList] = useState<chrome.history.HistoryItem[]>(
    []
  );

  const timeTrackerData = useAppSelector(
    (state: RootState) => state.time.timeTrackerData
  );
  const currentModal = useAppSelector((state: RootState) => state.common.modal);

  const [msg, sendMessage] = useChromeMessage('crud', 4);
  const { register, handleSubmit, control, setFocus } = useForm();

  const url: string = useWatch({
    control,
    name: currentModal.type,
  });

  // useDebounce<string>(
  //   (iUrl) => {
  //     if (!iUrl) return setHistoryList([]);
  //     if (!urlRegex.test(iUrl)) return;
  //     setLoading(true);
  //     const msg = SEARCH_HISTORY;
  //     sendMessage({ code: msg, data: { searchHistory: { input: iUrl } } });
  //   },
  //   500,
  //   url
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    if (url?.length === 0) return setHistoryList([]);
    if (!urlRegex.test(url)) return;

    sendMessage({
      code: SEARCH_HISTORY,
      data: { searchHistory: { input: url } },
    });
  }, [url]);

  useEffect(() => {
    if (!msg) return;
    if (msg.code === SEARCH_HISTORY_SUCCESS)
      setHistoryList(msg.data?.searchHistory.historyList);
    else if (msg.code === ADD_DATA_SUCCESS || msg.code === EDIT_DATA_SUCCESS) {
      setSubmitLoading(false);
      dispatch(
        commonActions.toogleModal({
          modalType: currentModal.type,
          modalState: false,
          modalMetaData: {},
        })
      );
    }
  }, [msg]);

  useEffect(() => {
    if (moveFocusIndex !== -1) return;

    setFocus(currentModal.type);
  }, [moveFocusIndex]);

  const onSubmit: SubmitHandler<IUrlForm> = (data) => {
    if (!data || !data[currentModal.type]) return;

    const beforeValidateUrl = validateHost(data[currentModal.type]);
    if (!beforeValidateUrl) return;

    const result = validateUrl(beforeValidateUrl);

    const isUrlExist = timeTrackerData.some((v) => v.url === result);
    if (isUrlExist) {
      setErrMessage('This url is exist!');
      return setErrorState(true);
    }

    const isLastDomain = validateLastDomain(result);
    if (!isLastDomain) {
      setErrMessage('Please fill out the URL completely');
      return setErrorState(true);
    }

    setSubmitLoading(true);
    console.log(currentModal.metadata?.msg, 'in url modal');
    sendMessage({
      code: currentModal.metadata?.msg,
      data: {
        editData: { prevUrl: currentModal.metadata?.url },
        timeTrackerData: { url: result },
      },
    });
  };

  const handleInvalid = useCallback((e) => {
    e.target.setCustomValidity(' ');
  }, []);

  const handleInput = useCallback(
    (e) => {
      if (errMessage) setErrMessage('');
      if (e.target.value.length === 0) return setErrorState(false);

      const isValid = urlRegex.test(e.target.value);
      setErrorState(() => (isValid ? false : true));
      e.target.setCustomValidity('');
    },
    [errMessage]
  );

  const handleCloseModal = () => {
    dispatch(
      commonActions.toogleModal({
        modalType: currentModal.type,
        modalState: false,
        modalMetaData: {},
      })
    );
  };

  const handleUrlCardClick = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
      url: string,
      title: string
    ) => {
      e.preventDefault();
      if (!url) return;

      const beforeValidateUrl = validateHost(url);
      const result = validateUrl(beforeValidateUrl);
      if (!result) return;

      setSubmitLoading(true);
      sendMessage({
        code: currentModal.metadata?.msg,
        data: {
          editData: { prevUrl: currentModal.metadata?.url },
          timeTrackerData: { url: result, title },
        },
      });
    },
    []
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (historyList.length === 0) return;
    if (e.key === 'ArrowDown') {
      if (moveFocusIndex === historyList.length - 1) return;
      setMoveFocusIndex((prev) => prev + 1);
    } else if (e.key === 'ArrowUp') {
      if (moveFocusIndex === -1) return;
      setMoveFocusIndex((prev) => prev - 1);
    }
  };

  const handleFocus = () => {
    if (moveFocusIndex === -1) return;
    setMoveFocusIndex(-1);
  };

  return (
    <StyledUrlModal
      className="urlModal"
      modalType={currentModal.type}
      handleKeyDown={handleKeyDown}
    >
      <UrlModalWrapper>
        <ModalHeader handleCloseModal={handleCloseModal} />
        <UrlForm
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          handleInvalid={handleInvalid}
        >
          <Input
            label={currentModal.metadata?.contents}
            placeholder="Url"
            height="35px"
            register={register}
            registerName={currentModal.type}
            required
            type={'text'}
            errMessage={errMessage}
            isError={errorState}
            handleFocus={handleFocus}
          />
          <UrlCards
            historyList={historyList}
            moveFocusIndex={moveFocusIndex}
            handleUrlCardClick={handleUrlCardClick}
          />
          <UrlButton size="big" buttonStyle="Full" errorState={errorState}>
            {submitLoading ? (
              <Loading
                viewBox="0 0 120 35"
                cx="60"
                cy="17.5"
                borderColor="white"
              />
            ) : (
              'Submit'
            )}
          </UrlButton>
        </UrlForm>
      </UrlModalWrapper>
    </StyledUrlModal>
  );
};

export default memo(UrlModal);
