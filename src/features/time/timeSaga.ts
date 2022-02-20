import { all, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { timeActions } from "./timeSlice";
import { START_CHECKING } from "../../constants/timeConstants";

async function startCheckingApi() {
  // await chrome.runtime.sendMessage({ code: START_CHECKING });
  await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const id = tabs[0]?.id;

    chrome.tabs.sendMessage(id, { code: START_CHECKING });
  })
}

function* startChecking() {
  try {
    yield startCheckingApi();
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
