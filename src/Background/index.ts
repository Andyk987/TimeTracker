import "reflect-metadata";
import {
  CHECKING_TRUE,
  GET_TIME,
  START_CHECKING,
  START_CHECKING_ERROR,
  START_CHECKING_SUCCEESS,
  STOP_CHECKING,
  STOP_CHECKING_ERROR,
  STOP_CHECKING_SUCCEESS,
} from "../constants/timeConstants";

interface Message {
  code: string | number;
}

chrome.action.setPopup({
  popup: "popup.html",
});

// This file is ran as a background script
console.log("Hello from background script!");

const defaultUrl = "www.youtube.com/watch?";

class Background {
  private readonly chrome: typeof chrome = chrome;
  private checkingUrl: string;
  private isChecking: boolean;
  private checkingUrlIds: number[];
  private timerId?: NodeJS.Timeout;
  time: number;
  constructor() {
    this.checkingUrl = defaultUrl;
    this.isChecking = false;
    this.checkingUrlIds = [];
    this.timerId = undefined;
    this.time = 0;
  }

  async getMessage(): Promise<void> {
    await this.chrome.runtime.onMessage.addListener(
      (msg: Message, sender: chrome.runtime.MessageSender, sendResponse) => {
        if (!msg.hasOwnProperty("code")) return;
        console.log(msg);
        const result = this.handleMessage(msg);
        sendResponse(result);
      }
    );
  }

  async sendMessage(id: number, msg: Message): Promise<void> {
    await this.chrome.tabs.query({ active: true }, (tabs) => {
      this.chrome.tabs.sendMessage(id, msg, (res) => {
        console.log(res, "success");
      });
    });
  }

  handleMessage(msg: Message) {
    switch (msg.code) {
      case START_CHECKING:
        const startResult = this.startChecking();
        return { code: startResult };
      case STOP_CHECKING:
        const stopResult = this.stopChecking();
        return { code: stopResult };
      case GET_TIME:
        const getTimeResult = this.getTime();
        return { code: getTimeResult };
    }
  }

  getTime(): number {
    const time = this.time;
    return time;
  }

  startChecking(): string {
    try {
      const urlfilter = (tab: chrome.tabs.Tab) => tab.url.includes(defaultUrl);

      this.isChecking = true;
      this.chrome.storage.sync.set({
        isChecking: true,
        checkingStatus: "Stop",
      });
      const allWindows = this.getAllWindows();
      allWindows
        .then((windows: chrome.windows.Window[]) => {
          for (let i = 0; i < windows.length; i++) {
            const included = windows[i].tabs.some(urlfilter);
            if (included) {
              console.log("included");
              this.startTimer();
              console.log("cb in process!");
              break;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("next");
          this.detectUrlChange();
        });
      return START_CHECKING_SUCCEESS;
    } catch (err) {
      console.log(err, "start err");
      return START_CHECKING_ERROR;
    }
  }

  stopChecking(): string {
    try {
      this.isChecking = false;
      this.chrome.storage.sync.set({
        isChecking: false,
        checkingStatus: "Check",
      });
      this.stopTimer();
      console.log(this.time);
      return STOP_CHECKING_SUCCEESS;
    } catch (err) {
      console.log(err);
      return STOP_CHECKING_ERROR;
    }
  }

  detectUrlChange() {
    this.detectUrlCreated();
    this.detectUrlRemoved();
  }

  detectUrlCreated(): void {
    return this.chrome.tabs.onUpdated.addListener(
      (
        tabId: number,
        changeInfo: chrome.tabs.TabChangeInfo,
        tab: chrome.tabs.Tab
      ) => {
        if (!this.isChecking) return this.chrome.tabs.onUpdated.removeListener;

        if (changeInfo.status !== "complete") return;
        if (tab.url.includes(defaultUrl)) {
          this.checkingUrlIds = [...this.checkingUrlIds, tabId];
          this.startTimer();
        }
      }
    );
  }

  detectUrlRemoved() {
    this.chrome.tabs.onRemoved.addListener(
      (id: number, removeInfo: chrome.tabs.TabRemoveInfo) => {
        const ids = this.checkingUrlIds;
        const index = ids.indexOf(id);
        if (index === -1) return;

        ids.splice(index, 1);
        console.log(this.checkingUrlIds);

        if (ids.length === 0) this.stopTimer();
      }
    );
  }

  async getAllWindows() {
    return await this.chrome.windows.getAll({ populate: true });
  }

  async startTimer(): Promise<void> {
    try {
      if (this.timerId) return;

      await new Promise<void>((resolve, reject) => {
        this.timerId = setInterval(() => {
          this.time++;
          console.log(this.time);
        }, 1000);
        resolve();
      });
    } catch (err) {
      console.log(err, "err occ");
    }
  }

  stopTimer() {
    const id = this.timerId;
    console.log(id, "id");
    if (!id) return;

    clearInterval(id);
    this.timerId = undefined;
  }
}

const background = new Background();

chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    if (details.hasOwnProperty("reason")) background.getMessage();
  }
);

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log(tabId, removeInfo);
});
