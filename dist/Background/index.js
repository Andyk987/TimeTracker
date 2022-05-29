var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "reflect-metadata";
import ChromeFunc from "../Chrome/chromeFunc";
import { START_CHECKING, START_CHECKING_ERROR, START_CHECKING_SUCCESS, STOP_CHECKING, STOP_CHECKING_SUCCESS } from "../constants/timeConstants";
// This file is ran as a background script
console.log("Hello from background script!");
class Background extends ChromeFunc {
    constructor() {
        super();
        this._timerData = [
            {
                isChecking: true,
                url: "https://www.youtube.com/",
                urlIds: [],
                timerId: undefined,
                time: 0
            },
            {
                isChecking: false,
                url: "Github.com",
                urlIds: [],
                timerId: undefined,
                time: 0,
            },
        ];
    }
    getTimerData() {
        const timerData = [...this._timerData];
        return timerData;
    }
    setTimerData(data) {
        const timerData = [...this._timerData];
        const isArray = Array.isArray(data);
        if (isArray)
            return this._timerData = data;
        timerData.push(data);
        return this._timerData = timerData;
    }
    getUrlIndex(url) {
        const timerData = [...this._timerData];
        const getIndex = timerData.findIndex(v => v.url === url);
        return getIndex;
    }
    getAllWindows(index, url) {
        return super.getAllWindows()
            .then((windows) => {
            const timerData = [...this._timerData];
            const includedIds = [];
            windows.forEach(window => {
                window.tabs.forEach(tab => {
                    if (tab.url === url)
                        includedIds.push(tab.id);
                });
            });
            const dataIndex = index === -1 ? timerData.length - 1 : index;
            const addArray = timerData[dataIndex].urlIds.concat(...includedIds); // need to be refactoring
            timerData[dataIndex].urlIds = [...new Set(addArray)];
            this._timerData = timerData;
        });
    }
    detectUrlUpdated(cb) {
        const isDetecting = this._chrome.tabs.onUpdated.hasListeners();
        if (isDetecting)
            return;
        return super.detectUrlUpdated(cb);
    }
    detectUrlRemoved(cb) {
        const isDetecting = this._chrome.tabs.onRemoved.hasListeners();
        if (isDetecting)
            return;
        return super.detectUrlRemoved(cb);
    }
    startTimer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timerId = yield setInterval(() => {
                }, 1000);
            }
            catch (err) {
                console.log(err, "err occ");
            }
        });
    }
    stopTimer() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
const background = new Background();
const beforeUseTimer = (action, idsLength) => {
    if (action === 'START_TIMER') {
        if (idsLength > 1)
            return;
        background.startTimer();
    }
    else {
        if (idsLength !== 0)
            return;
        background.stopTimer();
    }
};
const urlUpdateCallback = (id, info, tab) => {
    const timerData = background.getTimerData();
    const getCheckingLength = timerData.filter(v => v.isChecking).length;
    if (getCheckingLength === 0)
        return ChromeFunc.chrome.tabs.onUpdated.removeListener(urlUpdateCallback);
    if (info.status !== "complete")
        return;
    timerData.forEach((v) => {
        const urlState = v.url === tab.url ? 'enter' : 'leave';
        const getIdIndex = v.urlIds.findIndex(e => e === id);
        if (urlState === 'enter') {
            if (getIdIndex !== -1)
                return;
            v.urlIds.push(id);
            beforeUseTimer('START_TIMER', v.urlIds.length);
            return false;
        }
        else {
            if (getIdIndex === -1)
                return;
            v.urlIds.splice(getIdIndex, 1);
            beforeUseTimer('STOP_TIMER', v.urlIds.length);
            return false;
        }
    });
    console.log(timerData);
    background.setTimerData(timerData);
};
const urlRemoveCallback = (id, info) => {
    const timerData = background.getTimerData();
    const getCheckingLength = timerData.filter(v => v.isChecking).length;
    if (getCheckingLength === 0)
        ChromeFunc.chrome.tabs.onRemoved.removeListener(urlRemoveCallback);
    timerData.forEach((v) => {
        const getIdIndex = v.urlIds.findIndex(e => e === id);
        if (getIdIndex === -1)
            return;
        v.urlIds.splice(getIdIndex, 1);
        beforeUseTimer('STOP_TIMER', v.urlIds.length);
        return false;
    });
};
const handleMessage = (msg) => {
    switch (msg.code) {
        case START_CHECKING:
            try {
                const index = background.getUrlIndex(msg.url);
                if (index === -1) {
                    const newData = {
                        isChecking: true,
                        url: msg.url,
                        urlIds: [],
                        timerId: undefined,
                        time: 0
                    };
                    background.setTimerData(newData);
                }
                background.getAllWindows(index, msg.url);
                background.detectUrlUpdated(urlUpdateCallback);
                background.detectUrlRemoved(urlRemoveCallback);
                return { code: START_CHECKING_SUCCESS };
            }
            catch (err) {
                console.log(err);
                return { code: START_CHECKING_ERROR };
            }
        case STOP_CHECKING:
            return { code: STOP_CHECKING_SUCCESS };
    }
};
ChromeFunc.checkInstalled((details) => {
    if (!details)
        return;
    ChromeFunc.getMessage(handleMessage);
});
// class Background {
//   private readonly chrome: typeof chrome = chrome;
//   private checkingUrl: string;
//   private isChecking: boolean;
//   private checkingUrlIds: number[];
//   private timerId?: NodeJS.Timeout;
//   time: number;
//   constructor() {
//     // super()
//     this.checkingUrl = defaultUrl;
//     this.isChecking = false;
//     this.checkingUrlIds = [];
//     this.timerId = undefined;
//     this.time = 0;
//   }
//   async getStorageSyncData() {
//   }
//   async initInstance() {
//     const result = this.getStorageSyncData();
//     result.then((res) => {
//     })
//   }
//   async getMessage(): Promise<void> {
//     await this.chrome.runtime.onMessage.addListener(
//       (msg: any, _, sendResponse) => {
//         if (!msg.hasOwnProperty("code")) return;
//         console.log(msg);
//         const result = this.handleMessage(msg);
//         sendResponse(result);
//       }
//     );
//   }
//   async sendMessage(id: number, msg: Message): Promise<void> {
//     await this.chrome.tabs.query({ active: true }, (tabs) => {
//       this.chrome.tabs.sendMessage(id, msg, (res) => {
//         console.log(res, "success");
//       });
//     });
//   }
//   handleMessage(msg: Message) {
//     switch (msg.code) {
//       case START_TIMER:
//         const startResult = this.startTimer();
//         return { code: startResult };
//       case STOP_TIMER:
//         const stopResult = this.stopTimer();
//         return { code: stopResult };
//     }
//   }
//   checkWindowsContainedUrl(checkingUrl: string, windows: chrome.windows.Window[]) {
//     const idsList = [];
//     for (let i = 0; i < windows.length; i++) {
//       const window = windows[i];
//       for (let j = 0; j < window.tabs.length; j++) {
//         const tab = window.tabs[j];
//         if (tab.url.includes(checkingUrl)) {
//           idsList[idsList.length] = tab.id;
//         }
//       }
//     }
//     return idsList;
//   }
//   startTimer(): string {
//     try {
//       this.isChecking = true;
//       this.chrome.storage.sync.set({
//         isChecking: true
//       });
//       const allWindows = this.getAllWindows();
//       allWindows
//         .then((windows: chrome.windows.Window[]) => {
//           const url = defaultUrl;
//           const ids = [...this.checkingUrlIds];
//           const containedArr: number[] = this.checkWindowsContainedUrl(url, windows);
//           if (containedArr.length === 0) return;
//           const removedArr = removeDuplicates<number>(ids, containedArr);
//           this.checkingUrlIds = removedArr;
//           this.startChecking();
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//         .finally(() => {
//           this.detectUrlChange();
//         });
//       return START_TIMER_SUCCESS;
//     } catch (err) {
//       console.log(err, "start err");
//       return START_TIMER_ERROR;
//     }
//   }
//   stopTimer(): string {
//     try {
//       this.isChecking = false;
//       this.chrome.storage.sync.set({
//         isChecking: false
//       });
//       this.stopChecking();
//       console.log(this.time);
//       return STOP_TIMER_SUCCESS;
//     } catch (err) {
//       console.log(err);
//       return STOP_TIMER_ERROR;
//     }
//   }
//   detectUrlChange() {
//     this.testUrlUpdated();
//     this.testUrlRemoved();
//   }
//   // need refactoring
//   detectUrlCreated(): void {
//     return this.chrome.tabs.onUpdated.addListener(
//       (
//         tabId: number,
//         changeInfo: chrome.tabs.TabChangeInfo,
//         tab: chrome.tabs.Tab
//       ) => {
//         if (!this.isChecking) return this.chrome.tabs.onUpdated.removeListener;
//         if (changeInfo.status !== "complete") return;
//         if (tab.url.includes(defaultUrl)) {
//           this.checkingUrlIds = [...this.checkingUrlIds, tabId]; // require doubleCheck that id is existed in ids
//           this.startChecking();
//         }
//       }
//     );
//   }
//   testUrlUpdated() {
//     return this.chrome.tabs.onUpdated.addListener(
//       (
//         tabId: number,
//         changeInfo: chrome.tabs.TabChangeInfo,
//         tab: chrome.tabs.Tab
//       ) => {
//         if (!this.isChecking) return this.chrome.tabs.onUpdated.removeListener;
//         if (changeInfo.status !== "complete") return;
//         const ids = [...this.checkingUrlIds];
//         if (tab.url.includes(defaultUrl)) {
//           console.log('contained!');
//           if (ids.includes(tab.id)) return;
//           this.checkingUrlIds = [...ids, tabId];
//           this.startChecking();
//         } else {
//           console.log('!contained!');
//           const index = ids.indexOf(tabId);
//           if (index === -1) return;
//           this.checkingUrlIds = ids.splice(index, 1);
//           if (ids.length === 0) this.stopChecking();
//         }
//       })
//   }
//   detectUrlRemoved() {
//     this.chrome.tabs.onRemoved.addListener(
//       (removedId: number, removeInfo: chrome.tabs.TabRemoveInfo) => {
//         const ids = this.checkingUrlIds;
//         const deletedIds = ids.filter((id: number) => id !== removedId);
//         this.checkingUrlIds = deletedIds;
//         console.log(this.checkingUrlIds);
//         if (ids.length === 0) this.stopChecking();
//       }
//     );
//   }
//   testUrlRemoved() {
//     this.chrome.tabs.onRemoved.addListener(
//       (removedId: number, removeInfo: chrome.tabs.TabRemoveInfo) => {
//         if (!this.isChecking) return this.chrome.tabs.onRemoved.removeListener(this.testUrlRemoved);
//         const ids = [...this.checkingUrlIds];
//         const removedIndex = ids.indexOf(removedId);
//         if (removedIndex === -1) return;
//         this.checkingUrlIds = ids.splice(removedIndex, 1);;
//         if (ids.length === 0) this.stopChecking();
//       }
//     )
//   }
//   async getAllWindows() {
//     return await this.chrome.windows.getAll({ populate: true });
//   }
//   async startChecking(): Promise<void> {
//     try {
//       if (this.timerId) return;
//       await new Promise<void>((resolve, reject) => {
//         this.timerId = setInterval(() => {
//           this.time++;
//           console.log(this.time);
//         }, 1000);
//         resolve();
//       });
//     } catch (err) {
//       console.log(err, "err occ");
//     }
//   }
//   stopChecking() {
//     const id = this.timerId;
//     console.log(id, "id");
//     if (!id) return;
//     clearInterval(id);
//     this.timerId = undefined;
//   }
// }
// const background = new Background();
// chrome.runtime.onInstalled.addListener(
//   (details: chrome.runtime.InstalledDetails) => {
//     if (details.hasOwnProperty("reason")) background.getMessage();
//   }
// );
//# sourceMappingURL=index.js.map