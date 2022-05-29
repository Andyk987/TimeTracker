export type GetValueType<T> = T[keyof T];
export type VoidFunctionCallback<T> = (arg?: T extends void ? null : T) => void;

export type TimeRecord = {
    startTime?: number;
    endTime?: number;
}

export type TimeTrackerData = {
    isChecking: boolean;
    url: string;
    urlIds: number[];
    host?: string;
    title?: string;
    timeRecord?: TimeRecord[];
}

type StartChecking = {};
type StopChecing = {};
type SearchHistory = { input?: string, historyList?: chrome.history.HistoryItem[] };
type EditData = { prevUrl: string };

type Data = {
    startChecking?: StartChecking;
    stopChecking?: StopChecing;
    searchHistory?: SearchHistory;
    editData?: EditData;
    timeTrackerData?: Partial<TimeTrackerData>;
}

export type ChromeMessage = { prevCode?: string, code: string, data?: Data };
export type ChromeStorageType = { [key: string]: any };

export type ModalName = 'urlModal' | 'deleteModal' | 'editModal';