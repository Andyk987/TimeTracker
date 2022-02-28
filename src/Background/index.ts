import "reflect-metadata";
import {
  CHECKING_TRUE,
  START_CHECKING,
  START_CHECKING_SUCCEESS,
  STOP_CHECKING,
  STOP_CHECKING_ERROR,
  STOP_CHECKING_SUCCEESS,
} from "../constants/timeConstants";

interface Message {
  code: string;
}

// This file is ran as a background script
console.log("Hello from background script!");

const defaultUrl = "www.youtube.com/watch?";

const valid = (target, property, descriptor: PropertyDescriptor) => {
  console.log(descriptor);
  descriptor.value = (state) => {
    console.log(state);
  };
  return descriptor;
};

class Background {
  private readonly chrome: typeof chrome = chrome;
  private checkingUrl: string;
  isChecking: boolean;
  timerId?: NodeJS.Timeout;
  time: number;
  timeStamp?: Date[];
  constructor() {
    this.checkingUrl = defaultUrl;
    this.isChecking = false;
    this.timerId = undefined;
    this.time = 0;
    this.timeStamp = [];
  }

  async getMessage(): Promise<void> {
    await this.chrome.runtime.onMessage.addListener(
      (msg: Message, sender: chrome.runtime.MessageSender, sendResponse) => {
        if (!msg.hasOwnProperty("code")) return;
        console.log(msg);
        const { code } = this.handleMessage(msg);
        sendResponse(code);
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
        this.isChecking = true;
        this.chrome.storage.sync.set({ isChecking: true, checkingStatus: "Stop" });
        this.detectUrlChange();
        return { code: START_CHECKING_SUCCEESS };
      case STOP_CHECKING:
        this.isChecking = false;
        this.chrome.storage.sync.set({ isChecking: false, checkingStatus: "Check" });
        return { code: STOP_CHECKING_SUCCEESS };
    }
  }

  updateListener(
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ) {
    console.log(this.isChecking);
    if (!this.isChecking)
      return this.chrome.tabs.onUpdated.removeListener(this.updateListener);

    // isChecking === true
    if (changeInfo.status !== "complete") return;
    console.log(tab);
  }

  detectUrlChange() {
    return this.chrome.tabs.onUpdated.addListener(
      (
        tabId: number,
        changeInfo: chrome.tabs.TabChangeInfo,
        tab: chrome.tabs.Tab
      ) => {
        if (!this.isChecking)
          return this.chrome.tabs.onUpdated.removeListener;

        // isChecking === true
        if (changeInfo.status !== "complete") return;
        console.log(tab);
      }
    );
  }

  getAllWindows() {
    this.chrome.windows.getAll((windows: chrome.windows.Window[]) => {
      windows &&
        windows.forEach((window) => {
          window.tabs?.forEach((tab: chrome.tabs.Tab) => {});
        });
    });
  }

  async startChecking() {
    try {
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

  stopChecking() {
    const id = this.timerId;
    console.log(id, "id");
    if (!id)
      return this.chrome.runtime.sendMessage({ code: STOP_CHECKING_ERROR });

    clearInterval(id);
    this.timerId = undefined;
  }
}

const background = new Background();

chrome.runtime.onInstalled.addListener((res) => {
  const manifest = chrome.runtime.getManifest();

  chrome.tabs.query({ url: manifest.content_scripts[0].matches }, (tabs) => {
    tabs.forEach((v, i) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[i]?.id },
        files: ["content.js"],
      });
    });
  });
});

background.getMessage();
