import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

interface State {
  checkingStatus: "Check" | "Stop" | "Loading";
  isChecking: boolean;
  complete: boolean;
  error: string;
}

const initialState: State = {
  checkingStatus: "Check",
  isChecking: false,
  complete: false,
  error: "",
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    startChecking: (state: WritableDraft<State>) => {
      state.checkingStatus = "Loading";
    },
    startCheckingSuccess: (state: WritableDraft<State>) => {
      state.isChecking = true;
      state.checkingStatus = "Stop";
    },
    startCheckingError: (state) => {
      state.error = "fewrf";
    },

    stopChecking: (state: WritableDraft<State>) => {
      state.isChecking = false;
      state.checkingStatus = "Check";
    }
  },
});

export const timeActions = timeSlice.actions;

export default timeSlice.reducer;
