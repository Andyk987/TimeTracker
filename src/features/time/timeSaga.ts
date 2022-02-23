import { all, delay, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { timeActions } from "./timeSlice";
import { START_CHECKING, START_CHECKING_SUCCEESS } from "../../constants/timeConstants";

async function startCheckingApi() {
  await chrome.runtime.sendMessage({ code: START_CHECKING }, (res) => {
    if (res !== START_CHECKING_SUCCEESS) throw Error;
  });
}

function* startChecking() {
  try {
    yield startCheckingApi();
    yield delay(1000);
    yield put(timeActions.startCheckingSuccess());
  } catch (err) {
    console.log(err)
    yield put(timeActions.startCheckingError);
  }
}

function* watchGetUrl() {
  yield takeLatest(timeActions.startChecking, startChecking);
}

export function* timeSaga() {
  yield all([fork(watchGetUrl)]);
}
