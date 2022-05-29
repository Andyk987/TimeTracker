import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import { ChromeStorageType } from "../../common/types";
import { timeActions } from "./timeSlice";

const getInitStateApi = async (): Promise<ChromeStorageType> => await chrome.storage.sync.get();

function* getInitState() {
  try {
    const getInitState = yield getInitStateApi();
    if (!getInitState.hasOwnProperty('timeTrackerData')) throw Error();

    yield put(timeActions.getInitStateSuccess(getInitState.timeTrackerData));

  } catch (err) {
    yield put(timeActions.getInitStateFail());
  }
}

function* watchGetInitState() {
  yield takeLatest(timeActions.getInitState, getInitState);
}

export function* timeSaga() {
  yield all([
    fork(watchGetInitState),
  ]);
}
