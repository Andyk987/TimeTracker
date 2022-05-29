import { TimeState } from "../features/time/timeSlice";

export const storeData = async (data: Partial<TimeState>): Promise<void> => await chrome.storage.sync.set(data);