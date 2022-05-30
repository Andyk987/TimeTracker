import ChromeFunc, { DeviceStateChange, UrlRemove, UrlUpdate } from "../Chrome/chromeFunc";
import { ChromeMessage, TimeRecord, TimeTrackerData } from "../common/types";
import {
  ADD_DATA,
  ADD_DATA_ERROR,
  ADD_DATA_SUCCESS,
  DELETE_DATA,
  DELETE_DATA_ERROR,
  DELETE_DATA_SUCCESS,
  EDIT_DATA,
  EDIT_DATA_SUCCESS,
  END_TIME,
  SEARCH_HISTORY,
  SEARCH_HISTORY_SUCCESS,
  SEARCH_VISITS,
  SEARCH_VISITS_SUCCESS,
  START_CHECKING,
  START_CHECKING_ERROR,
  START_CHECKING_SUCCESS,
  START_TIME,
  STOP_CHECKING,
  STOP_CHECKING_ERROR,
  STOP_CHECKING_SUCCESS,
  TIME_TRACKER_DATA
} from "../constants/timeConstants";
import { lastDomainRegex } from "../constants/urlRegexConstants";

interface BackgroundMethod {
  initializeTimerData: (data: TimeTrackerData[]) => TimeTrackerData[];
  getTimerData: () => TimeTrackerData[];
  editTimerData: (index: number, data: Partial<TimeTrackerData>) => TimeTrackerData[];
  getUrlIndex: (url: string) => number;
  getAllWindows: (index: number, url: string) => Promise<number[] | chrome.windows.Window[]>;
  detectUrlUpdated: UrlUpdate;
  detectUrlRemoved: UrlRemove;
  checkTimeRecordProperty: (record: TimeRecord[], ppt: keyof TimeRecord) => TimeRecord[];
}

// This file is ran as a background script
console.log("Hello from background script!");

class Background extends ChromeFunc implements BackgroundMethod {
  private _timerData: TimeTrackerData[];

  constructor() {
    super()

    this._timerData = [];
  }

  initializeTimerData(data: TimeTrackerData[]): TimeTrackerData[] {
    if (data.length === 0) return;

    return this._timerData = data;
  }

  getTimerData(): TimeTrackerData[] {
    const timerData = [...this._timerData];
    return timerData;
  }

  setNewTimerData(data: TimeTrackerData): TimeTrackerData[] {
    if (!data) return;
    this._timerData.push(data);
    return [...this._timerData];
  }

  createTimerData(url: string, title: string): TimeTrackerData {
    try {
      if (!url) throw Error();
      const data = [...this._timerData];
      const checkUrl = data.findIndex(v => v.url === url);
      if (checkUrl !== -1) return;

      const newData: TimeTrackerData = {
        isChecking: false,
        url,
        urlIds: [],
        host: '',
        timeRecord: [],
        title
      }
      return newData;
    } catch (err) {
      console.log(err);
    }
  }

  editTimerData(index: number, data: Partial<TimeTrackerData>): TimeTrackerData[] {
    try {
      const timerData = [...this._timerData];
      timerData[index] = { ...timerData[index], ...data };
      this._timerData[index] = { ...timerData[index], ...data };
      return timerData;
    } catch (err) {
      console.log(err);
    }
  }

  deleteTimerData(index: number): TimeTrackerData[] {
    try {
      this._timerData.splice(index, 1);
      return [...this._timerData];
    } catch (err) {
      console.log(err);
    }
  }

  getUrlIndex(url: string): number {
    const timerData = [...this._timerData];
    const getIndex = timerData.findIndex(v => v.url === url);
    return getIndex;
  }

  async getAllWindows(index: number, url: string): Promise<number[]> {
    const timerData = [...this._timerData];
    if (index === -1) return;

    return await super.getAllWindows()
      .then((windows: chrome.windows.Window[]) => {
        const matchUrlIds: number[] = timerData[index].urlIds;

        windows.forEach(window => {
          window.tabs.forEach(tab => {
            if (tab.url.includes(url)) matchUrlIds.push(tab.id);
          })
        });

        const result = [...new Set(matchUrlIds)];
        return result;
      });
  }

  async initializeWindowsUrl(data: TimeTrackerData[]) {
    if (!data) return;

    return await super.getAllWindows()
      .then((windows: chrome.windows.Window[]) => {
        windows.forEach(window => {
          window.tabs.forEach(tab => {
            for (let i = 0; i < data.length; i++) {
              if (!data[i].isChecking) continue;
              if (tab.url.includes(data[i].url)) {
                data[i].urlIds.push(tab.id);
              }
            }
          })
        })
        return data;
      })
  }

  detectUrlUpdated(cb: Parameters<UrlUpdate>[0]): void {
    const isDetecting = this._chrome.tabs.onUpdated.hasListeners();
    if (isDetecting) return;

    return super.detectUrlUpdated(cb);
  }

  detectUrlRemoved(cb: Parameters<UrlRemove>[0]): void {
    const isDetecting = this._chrome.tabs.onRemoved.hasListeners();
    if (isDetecting) return;

    return super.detectUrlRemoved(cb);
  }

  detectDeviceStateChanged(cb: Parameters<DeviceStateChange>[0]): void {
    return super.detectDeviceStateChanged(cb);
  }

  checkTimeRecordProperty(record: TimeRecord[], ppt: keyof TimeRecord): TimeRecord[] {
    if (!record || !ppt) return record;

    const len = record.length;
    if (len === 0 && ppt === START_TIME) {
      record[0] = { startTime: new Date().getTime() };
      return record;
    }

    const opp = ppt === START_TIME ? END_TIME : START_TIME;
    const isInclude = Object(record[len - 1]).hasOwnProperty(ppt);
    const isOppInclude = Object(record[len - 1]).hasOwnProperty(opp);

    if (ppt === START_TIME) {
      if (!isInclude) {
        record[len - 1] = { ...record[len - 1], startTime: new Date().getTime() };
        return record;
      }
      if (!isOppInclude) return record;
      record[len] = { startTime: new Date().getTime() };
      return record;
    } else {
      if (isInclude) return record;
      if (!isOppInclude) return record;
      record[len - 1] = { ...record[len - 1], endTime: new Date().getTime() };
      return record;
    }
  };

  preProcessTitle(url: string): string {
    try {
      if (!url) throw Error('not url');

      const host = new URL(url).host;
      const lastDomain = lastDomainRegex.exec(host.slice(4))[0];
      const preProcessedTitle = host.slice(4).split(lastDomain)[0].toUpperCase();
      return preProcessedTitle;

    } catch (err) {
      console.log(err);
      return url;
    }
  }
}


const background = new Background();

const urlUpdateCallback: Parameters<UrlUpdate>[0] = (id, info, tab) => {
  const timerData = background.getTimerData();

  const isChecking = timerData.some(v => v.isChecking);
  if (!isChecking) return ChromeFunc.removeUrlUpdated(urlUpdateCallback);

  if (info.status !== "complete") return;

  for (let i = 0; i < timerData.length; i++) {
    if (!timerData[i].isChecking) continue;
    const isUrlMatch = tab.url.includes(timerData[i].url);
    const getIdIndex = timerData[i].urlIds.findIndex(e => e === id);

    if (isUrlMatch) {
      if (getIdIndex !== -1) break; // if id is included in urlIds

      timerData[i].urlIds.push(id);
      const timeRecord = timerData[i].urlIds.length === 1 ?
        background.checkTimeRecordProperty(timerData[i].timeRecord, START_TIME) :
        timerData[i].timeRecord;

      const revisedData = background.editTimerData(i, { urlIds: timerData[i].urlIds, timeRecord });
      ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, revisedData);

      console.log(timerData[i].timeRecord, 'updateCb-entry');
      break;
    } else {
      if (getIdIndex === -1) continue;  // if id is not included in urlIds = Leave or <Noting>

      timerData[i].urlIds.splice(getIdIndex, 1);

      const timeRecord = timerData[i].urlIds.length === 0 ?
        background.checkTimeRecordProperty(timerData[i].timeRecord, END_TIME) :
        timerData[i].timeRecord;

      const revisedData = background.editTimerData(i, { urlIds: timerData[i].urlIds, timeRecord });
      ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, revisedData);

      console.log(timerData[i].timeRecord, 'updateCb-leaveOrNot');
      break;
    }
  }
};

const urlRemoveCallback: Parameters<UrlRemove>[0] = (id, info) => {
  const timerData = background.getTimerData();

  const isChecking = timerData.find(v => v.isChecking);
  if (!isChecking) return ChromeFunc.removeUrlRemoved(urlRemoveCallback);

  for (let i = 0; i < timerData.length; i++) {
    if (!timerData[i].isChecking) continue;
    const getIdIndex = timerData[i].urlIds.findIndex(v => v === id);
    if (getIdIndex === -1) continue;  // if id is not included in urlIds = Leave or <Noting>

    timerData[i].urlIds.splice(getIdIndex, 1);

    const timeRecord = timerData[i].urlIds.length === 0 ?
      background.checkTimeRecordProperty(timerData[i].timeRecord, END_TIME) :
      timerData[i].timeRecord;

    const revisedData = background.editTimerData(i, { urlIds: timerData[i].urlIds, timeRecord });
    ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, revisedData);

    console.log(timerData[i].timeRecord, 'removeCb');
    break;
  }
};

const deviceStateChangedCallback: Parameters<DeviceStateChange>[0] = (newState) => {
  const timerData = background.getTimerData();
  const isChecking = timerData.find(v => v.isChecking);
  if (!isChecking) return ChromeFunc.removeDeviceStateChanged(deviceStateChangedCallback);

  if (newState === 'idle') return;
  if (newState === 'active') {
    return background.initializeWindowsUrl(timerData)
      .then(data => {
        if (!data) return;

        for (let i = 0; i < data.length; i++) {
          if (!data[i].isChecking) continue;
          if (data[i].urlIds.length === 0) continue;
          const timeRecord = background.checkTimeRecordProperty(data[i].timeRecord, START_TIME);

          const revisedData = background.editTimerData(i, { urlIds: data[i].urlIds, timeRecord });
          ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, revisedData);

          console.log(timeRecord, 'stateChangeCb-active');
        }
      })
  }

  // device state is locked
  for (let i = 0; i < timerData.length; i++) {
    if (!timerData[i].isChecking) continue;
    const timeRecord = background.checkTimeRecordProperty(timerData[i].timeRecord, END_TIME);

    const revisedData = background.editTimerData(i, { urlIds: [], timeRecord });
    ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, revisedData);

    console.log(timeRecord, 'stateChangeCb-idle');
  }
}

const handlePortMessage = (port: chrome.runtime.Port, msg: ChromeMessage) => {
  switch (msg.code) {
    case ADD_DATA:
      try {
        if (!msg.data.timeTrackerData.url) throw Error('nope');
        const { url, title } = { ...msg.data.timeTrackerData };

        if (!title) {
          ChromeFunc.searchVisits({ url }, (res) => {
            if (res.length === 0) {
              const preTitle = background.preProcessTitle(url);

              const newData = background.createTimerData(url, preTitle);
              if (!newData) throw Error('creat err');

              const result = background.setNewTimerData(newData);
              ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, result);

              return port.postMessage(<ChromeMessage>{ code: ADD_DATA_SUCCESS });
            }
            const id = res[0].id;
            const startTime = res[0].visitTime;

            chrome.history.search({ text: url, startTime }, (res) => {
              const title = res.filter((v) => v.id === id)[0].title;

              const newData = background.createTimerData(url, title);
              if (!newData) throw Error('creat err');

              const result = background.setNewTimerData(newData);
              ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, result);

              return port.postMessage(<ChromeMessage>{ code: ADD_DATA_SUCCESS });
            })
          });
        } else {
          const newData = background.createTimerData(url, title);
          if (!newData) throw Error('creat err');

          const result = background.setNewTimerData(newData);
          ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, result);

          return port.postMessage(<ChromeMessage>{ code: ADD_DATA_SUCCESS });
        }

        return;
      } catch (err) {
        console.log(err, 'add data err');
        return port.postMessage(<ChromeMessage>{ code: ADD_DATA_ERROR, prevCode: msg.code });
      }

    case DELETE_DATA:
      try {
        if (!msg.data.timeTrackerData.url) throw Error('nope');
        const data = background.getTimerData();
        const getUrlIndex = data.findIndex(v => v.url === msg.data.timeTrackerData.url);
        if (getUrlIndex === -1) throw Error("url doesn't exist");
        const deletedData = background.deleteTimerData(getUrlIndex);
        if (deletedData) ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, deletedData);

        return port.postMessage(<ChromeMessage>{ code: DELETE_DATA_SUCCESS });
      } catch (err) {
        console.log(err, 'delete data err');
        return port.postMessage(<ChromeMessage>{ code: DELETE_DATA_ERROR, prevCode: msg.code });
      }

    case EDIT_DATA:
      try {
        if (!msg.data.editData.prevUrl) throw Error('not url');
        const { url, title } = { ...msg.data.timeTrackerData };
        const data = background.getTimerData();
        const getUrlIndex = data.findIndex(v => v.url === msg.data.editData.prevUrl);
        if (getUrlIndex === -1) throw Error("url doesn't exist");

        const preTitle = background.preProcessTitle(url);
        const editedData = background.createTimerData(url, title ? title : preTitle);
        const result = background.editTimerData(getUrlIndex, editedData);

        ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, result);

        return port.postMessage(<ChromeMessage>{ code: EDIT_DATA_SUCCESS });
      } catch (err) {
        console.log(err, 'edit data err');
        return port.postMessage(<ChromeMessage>{ code: EDIT_DATA_SUCCESS, prevCode: msg.code });
      }

    case START_CHECKING:
      try {
        if (!msg.data.timeTrackerData.url) throw Error('not url');
        const timerData = background.getTimerData();
        const index = background.getUrlIndex(msg.data.timeTrackerData.url);
        if (index === -1) throw Error('index Error');
        console.log(timerData, index, 'start-checking index');
        background.getAllWindows(index, msg.data.timeTrackerData.url)
          .then(urlIds => {
            if (!urlIds) return;
            if (urlIds.length === 0) return;

            const timeRecord = background.checkTimeRecordProperty(timerData[index].timeRecord, START_TIME);

            const revisedData = background.editTimerData(index, { urlIds, timeRecord });
            console.log(revisedData, 'start_checking-revisedData');
            ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, revisedData);
          });
        const revisedData = background.editTimerData(index, { isChecking: true });

        background.detectUrlUpdated(urlUpdateCallback);
        background.detectUrlRemoved(urlRemoveCallback);
        background.detectDeviceStateChanged(deviceStateChangedCallback);

        ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, revisedData);

        return port.postMessage(<ChromeMessage>{ code: START_CHECKING_SUCCESS, data: { timeTrackerData: { url: msg.data.timeTrackerData.url } } });
      } catch (err) {
        console.log(err, 'start checking err');
        return port.postMessage(<ChromeMessage>{ code: START_CHECKING_ERROR, prevCode: msg.code, data: { timeTrackerData: { url: msg.data.timeTrackerData.url } } });
      }

    case STOP_CHECKING:
      try {
        if (!msg.data.timeTrackerData.url) throw Error('not url');
        const timerData = background.getTimerData();
        const index = background.getUrlIndex(msg.data.timeTrackerData.url);
        if (index === -1) throw Error('index Error');

        const timeRecord = background.checkTimeRecordProperty(timerData[index].timeRecord, END_TIME);

        const revisedData = background.editTimerData(index, { isChecking: false, urlIds: [], timeRecord });
        ChromeFunc.setStorageData<TimeTrackerData[]>(TIME_TRACKER_DATA, revisedData);

        return port.postMessage(<ChromeMessage>{ code: STOP_CHECKING_SUCCESS, data: { timeTrackerData: { url: msg.data.timeTrackerData.url } } });
      } catch (err) {
        console.log(err, 'stop checking err');
        return port.postMessage(<ChromeMessage>{ code: STOP_CHECKING_ERROR, prevCode: msg.code, data: { timeTrackerData: { url: msg.data.timeTrackerData.url } } });
      }

    case SEARCH_HISTORY:
      try {
        if (!msg.data.searchHistory.input) throw Error('not input');

        chrome.history.search({ text: msg.data.searchHistory.input, startTime: 0, endTime: Date.now(), maxResults: 500 }, (res) => {
          port.postMessage(<ChromeMessage>{ code: SEARCH_HISTORY_SUCCESS, data: { searchHistory: { historyList: res } } });
        })
        return;
      } catch (err) {
        console.log(err, 'search history err');
      }
  }
};

let lifeline;

const keepAliveForced = () => {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

const keepAlive = async () => {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: '*://*/*' })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => chrome.runtime.connect({ name: 'keepAlive' }),
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) { }
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

const retryOnTabUpdate = async (tabId, info, tab) => {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
}

ChromeFunc.getPortMessage((port: chrome.runtime.Port) => {
  if (port.name === 'keepAlive') {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }

  port.onMessage.addListener((msg: ChromeMessage) => {
    const getData = background.getTimerData();

    if (getData.length !== 0) return handlePortMessage(port, msg);

    ChromeFunc.getStorageData(TIME_TRACKER_DATA)
      .then(data => {
        if (!Object(data).hasOwnProperty(TIME_TRACKER_DATA)) return handlePortMessage(port, msg);

        background.initializeTimerData(data.timeTrackerData);
        handlePortMessage(port, msg);
      })
  })
})

keepAlive();