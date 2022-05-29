import { ChromeMessage, ChromeStorageType } from "../common/types";

export type UrlUpdate = (cb: (id: number, info: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => void) => void;
export type UrlRemove = (cb: (id: number, info: chrome.tabs.TabRemoveInfo) => void) => void;
export type DeviceStateChange = (cb: (newState: chrome.idle.IdleState) => void) => void;

interface ChromeFuncMethod {
    getAllWindows: (...arg: any[]) => Promise<number[] | chrome.windows.Window[]>;
    detectUrlUpdated: UrlUpdate;
    detectUrlRemoved: UrlRemove;
    detectDeviceStateChanged: DeviceStateChange;
}

interface ChromeFuncMethodStatic {
    new(): ChromeFuncMethod;
    checkInstalled: (cb: (details: chrome.runtime.InstalledDetails) => void) => Promise<void>;
    getStorageData: (key: string) => Promise<ChromeStorageType>;
    setStorageData: <T>(key: string, value: T) => Promise<void>;
    getMessage: (cb: (msg: ChromeMessage) => void) => Promise<void>;
    sendMessage: <T>(msg: T, cb: (msg: T) => void) => Promise<void>;
    removeUrlUpdated: UrlUpdate;
    removeUrlRemoved: UrlRemove;
    removeDeviceStateChanged: DeviceStateChange;
    searchHistory: (query: chrome.history.HistoryQuery, cb: (res: chrome.history.HistoryItem[]) => void) => void;
}

const StaticImplements = <T>() => {
    return <U extends T>(constructor: U) => { constructor };
}

@StaticImplements<ChromeFuncMethodStatic>()
class ChromeFunc implements ChromeFuncMethod {
    protected readonly _chrome: typeof chrome = chrome;
    static readonly chrome: typeof chrome = chrome;

    constructor() { }

    static async checkInstalled(cb: (details: chrome.runtime.InstalledDetails) => void): Promise<void> {
        return await this.chrome.runtime.onInstalled.addListener(cb);
    }

    static async getStorageData(key?: string): Promise<ChromeStorageType> {
        return await this.chrome.storage.sync.get(key ? [key] : null);
    }

    static async setStorageData<T>(key: string, value: T): Promise<void> {
        return await this.chrome.storage.sync.set({ [key]: value });
    }

    static async getMessage(cb: (msg: ChromeMessage) => void): Promise<void> {
        return await this.chrome.runtime.onMessage.addListener((msg: ChromeMessage, _, sendResponse) => {
            if (!msg && !Object(msg).hasOwnProperty('code')) return;

            console.log(msg);
            const response = cb(msg);
            sendResponse(response);
            return true;
        })
    }

    static async sendMessage<T>(msg: T, cb: (res: T) => void) {
        return await this.chrome.runtime.sendMessage(msg, cb);
    }

    static connectPort(name: string) {
        return this.chrome.runtime.connect({ name });
    }

    static async getPortMessage(cb: (port: chrome.runtime.Port) => void) {
        return await this.chrome.runtime.onConnect.addListener(cb);
    }

    static async removeUrlUpdated(cb: Parameters<UrlUpdate>[0]): Promise<void> {
        return await this.chrome.tabs.onUpdated.removeListener(cb);
    }

    static async removeUrlRemoved(cb: Parameters<UrlRemove>[0]): Promise<void> {
        return await this.chrome.tabs.onRemoved.removeListener(cb);
    }

    static async removeDeviceStateChanged(cb: Parameters<DeviceStateChange>[0]): Promise<void> {
        return await this.chrome.idle.onStateChanged.removeListener(cb);
    }

    static searchHistory(query: chrome.history.HistoryQuery, cb: (res: chrome.history.HistoryItem[]) => void): void {
        return this.chrome.history.search(query, cb);
    }

    async getAllWindows(...arg): Promise<number[] | chrome.windows.Window[]> {
        return await this._chrome.windows.getAll({ populate: true });
    }

    detectUrlUpdated(cb: Parameters<UrlUpdate>[0]): void {
        return this._chrome.tabs.onUpdated.addListener(cb);
    }

    detectUrlRemoved(cb: Parameters<UrlRemove>[0]): void {
        return this._chrome.tabs.onRemoved.addListener(cb);
    }

    detectDeviceStateChanged(cb: Parameters<DeviceStateChange>[0]): void {
        return this._chrome.idle.onStateChanged.addListener(cb);
    }

}

export default ChromeFunc