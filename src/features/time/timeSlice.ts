import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface State {
  checking: boolean;
  complete: boolean;
  error: string;
}

const initialState: State = {
  checking: false,
  complete: false,
  error: '',
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    startChecking: (state) => {
      state.checking = !state.checking;
    },
    startCheckingSuccess: (state, action) => {
      state.complete = action.payload;
    },
    startCheckingError: (state, action) => {
      state.error = 'fewrf'
    },
  },
});

export const timeActions = timeSlice.actions;

export default timeSlice.reducer;
