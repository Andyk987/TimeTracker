import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

export interface TimeState {
  checkingStatus: "Check" | "Stop" | "Loading";
  isChecking: boolean;
  error?: string;
}

const initialState: TimeState = {
  checkingStatus: "Check",
  isChecking: false,
  error: "",
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    getInitState: () => {},
    getInitStateSuccess: (
      state,
      { payload: { checkingStatus, isChecking } }: PayloadAction<TimeState>
    ) => {
      state.checkingStatus = checkingStatus;
      state.isChecking = isChecking;
    },

    startChecking: (state: WritableDraft<TimeState>) => {
      state.checkingStatus = "Loading";
    },
    startCheckingSuccess: (state: WritableDraft<TimeState>) => {
      state.isChecking = true;
      state.checkingStatus = "Stop";
    },
    startCheckingError: (state) => {
      state.error = "fewrf";
    },

    stopChecking: (state: WritableDraft<TimeState>) => {
      state.checkingStatus = "Loading";
    },
    stopCheckingSuccess: (state: WritableDraft<TimeState>) => {
      state.isChecking = false;
      state.checkingStatus = "Check";
    },
    stopCheckingError: (state) => {
      state.error = "fewrfe";
    },
  },
});

export const timeActions = timeSlice.actions;

export default timeSlice.reducer;
