import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { timeSaga } from "../features/time/timeSaga";
import TimeReducer from "../features/time/timeSlice";
const sagaMiddleware = createSagaMiddleware();
function* saga() {
    yield all([fork(timeSaga)]);
}
export const store = configureStore({
    reducer: {
        time: TimeReducer
    },
    middleware: [sagaMiddleware],
});
sagaMiddleware.run(saga);
//# sourceMappingURL=store.js.map