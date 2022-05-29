import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    buttonState: "Check",
    isChecking: false,
    time: {
        hour: '00',
        minute: '00',
        seconds: '00'
    }
};
const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers: {
        getInitState: (_, action) => { },
        getInitStateSuccess: (state, { payload: { isChecking } }) => {
            state.isChecking = isChecking;
            state.buttonState = isChecking ? 'Stop' : 'Check';
        },
        getInitStateFail: (state) => {
        },
        startChecking: (state) => {
            state.buttonState = "Loading";
        },
        startCheckingSuccess: (state) => {
            state.buttonState = 'Stop';
        },
        stopChecking: (state) => {
            state.buttonState = "Loading";
        },
        stopCheckingSuccess: (state) => {
            state.buttonState = 'Check';
        }
    },
});
export const timeActions = timeSlice.actions;
export default timeSlice.reducer;
//# sourceMappingURL=timeSlice.js.map