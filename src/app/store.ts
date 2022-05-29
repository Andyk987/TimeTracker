import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { timeSaga } from "../features/time/timeSaga";
import CommonReducer from "../features/common/commonSlice";
import TimeReducer from "../features/time/timeSlice";

const sagaMiddleware = createSagaMiddleware();

function* saga() {
  yield all([fork(timeSaga)]);
}

export const store = configureStore({
  reducer: {
    common: CommonReducer,
    time: TimeReducer
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;