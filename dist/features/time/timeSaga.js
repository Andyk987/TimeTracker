var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { all, fork, put, takeLatest, } from "redux-saga/effects";
import { storeData } from "../../api/timerApi";
import { timeActions } from "./timeSlice";
const arraysEqual = (a, b) => {
    if (a.length !== b.length)
        return false;
    const sortedA = a.sort();
    const sortedB = b.sort();
    for (let i = 0; i < sortedA.length; i++) {
        if (sortedA[i] !== sortedB[i])
            return false;
    }
    return true;
};
const getInitDataList = ['isChecking'];
const getInitStateApi = () => __awaiter(void 0, void 0, void 0, function* () { return yield chrome.storage.sync.get(getInitDataList); });
function* getInitState(action) {
    try {
        const result = yield getInitStateApi();
        const isAllDataStored = arraysEqual(Object.keys(result), getInitDataList);
        if (!isAllDataStored)
            throw Error();
        yield put(timeActions.getInitStateSuccess(result));
    }
    catch (err) {
        yield storeData(action.payload);
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
//# sourceMappingURL=timeSaga.js.map