import {
  all,
  delay,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { timeActions } from "./timeSlice";
import {
  START_CHECKING,
  START_CHECKING_SUCCEESS,
  STOP_CHECKING,
  STOP_CHECKING_SUCCEESS,
} from "../../constants/timeConstants";

const getInitStateApi = async () => await chrome.storage.sync.get();

async function startCheckingApi() {
  await chrome.runtime.sendMessage({ code: START_CHECKING }, (res) => {
    console.log(res);
    if (res !== START_CHECKING_SUCCEESS) throw Error;
  });
}

async function stopCheckingApi() {
  await chrome.runtime.sendMessage({ code: STOP_CHECKING }, (res) => {
    console.log(res);
    if (res !== STOP_CHECKING_SUCCEESS) throw Error;
  });
}

function* getInitState() {
  try {
    const { checkingStatus, isChecking } = yield getInitStateApi();
    if (!(checkingStatus || isChecking)) throw Error();
    yield put(timeActions.getInitStateSuccess({ checkingStatus, isChecking }));
  } catch (err) {
    console.log(err);
    yield put(
      timeActions.getInitStateSuccess({
        checkingStatus: "Check",
        isChecking: false,
      })
    );
  }
}

function* startChecking() {
  try {
    yield startCheckingApi();
    yield delay(1000);
    yield put(timeActions.startCheckingSuccess());
  } catch (err) {
    console.log(err);
    yield put(timeActions.startCheckingError);
  }
}

function* stopChecking() {
  try {
    yield stopCheckingApi();
    yield delay(1000);
    yield put(timeActions.stopCheckingSuccess());
  } catch (err) {
    console.log(err);
    yield put(timeActions.stopCheckingError);
  }
}

function* watchGetInitState() {
  yield takeLatest(timeActions.getInitState, getInitState);
}

function* watchStartCheck() {
  yield takeLatest(timeActions.startChecking, startChecking);
}

function* watchStopCheck() {
  yield takeLatest(timeActions.stopChecking, stopChecking);
}

export function* timeSaga() {
  yield all([
    fork(watchStartCheck),
    fork(watchStopCheck),
    fork(watchGetInitState),
  ]);
}
