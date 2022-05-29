import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeTrackerData } from "../../common/types";

export type ButtonState = "Check" | "Stop" | "Loading";
export type ReduxTimeTrackerData = Partial<Omit<TimeTrackerData, 'urlIds' | 'time' | 'timerId' | 'host'>>;

export interface TimeState {
  timeTrackerData: ReduxTimeTrackerData[];
  currentIndex: number;
}

const initialState: TimeState = {
  timeTrackerData: [],
  currentIndex: 0
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    getInitState: () => { },
    getInitStateSuccess: (state, action: PayloadAction<TimeTrackerData[]>) => {
      state.timeTrackerData = action.payload;
    },
    getInitStateFail: () => { },

    detectDataChanged: (state, action: PayloadAction<TimeTrackerData[]>) => {
      state.timeTrackerData = action.payload;
    },

    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    }
  },
});

export const timeActions = timeSlice.actions;

export default timeSlice.reducer;
