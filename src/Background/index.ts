import "reflect-metadata";
import {
  CHECKING_TRUE,
  START_CHECKING,
  START_CHECKING_ERROR,
  START_CHECKING_SUCCEESS,
  STOP_CHECKING,
  STOP_CHECKING_ERROR,
  STOP_CHECKING_SUCCEESS,
} from "../constants/timeConstants";

interface Message {
  code: string;
}

chrome.action.setPopup({
  popup: "popup.html",
});

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


// This file is ran as a background script
console.log("Hello from background script!");

const defaultUrl = "www.youtube.com/watch?";

function stateCheck (target, property, descriptor: PropertyDescriptor) {
  descriptor.value = (arg) => {
    console.log(arg)
    if (!arg) throw Error("State is checked!");
  }
  return descriptor;
}

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

  @stateCheck
  test(state: boolean) {
  }

  async getMessage(): Promise<void> {
    await this.chrome.runtime.onMessage.addListener(
      (msg: Message, sender: chrome.runtime.MessageSender, sendResponse) => {
        if (!msg.hasOwnProperty("code")) return;
        console.log(msg);
        const { code } = this.handleMessage(msg);
        sendResponse(START_CHECKING_SUCCEESS);
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
        const startResult = this.start();
        return { code: startResult };
      case STOP_CHECKING:
        const stopResult = this.stop();
        return { code: stopResult };
    }
  }

  start(): string {
    try {
      this.test(this.isChecking)
      this.isChecking = true;
      this.chrome.storage.sync.set({
        isChecking: true,
        checkingStatus: "Stop",
      });
      this.detectUrlChange();
      return START_CHECKING_SUCCEESS
    } catch (err) {
      console.log(err, 'start err');
      return START_CHECKING_ERROR
    }
    
  }

  stop() {
    try {
      this.isChecking = false;
      this.chrome.storage.sync.set({
        isChecking: false,
        checingStatus: "Check",
      });
      return STOP_CHECKING_SUCCEESS
    } catch (err) {
      console.log(err);
      return STOP_CHECKING_ERROR
    }
  }

  detectUrlChange() {
    return this.chrome.tabs.onUpdated.addListener((
      tabId: number,
      changeInfo: chrome.tabs.TabChangeInfo,
      tab: chrome.tabs.Tab
    ) => {
      if (!this.isChecking) return this.chrome.tabs.onUpdated.removeListener;

      if (changeInfo.status !== "complete") return;
      if (tab.url.includes(defaultUrl)) {
        const id = this.timerId;
      }
    })
  }

  getAllWindows() {
    this.chrome.windows.getAll((windows: chrome.windows.Window[]) => {
      windows &&
        windows.forEach((window) => {
          window.tabs?.forEach((tab: chrome.tabs.Tab) => {});
        });
    });
  }

  async startChecking(id: NodeJS.Timeout): Promise<void> {
    try {
      if (id) return;

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
    if (!id) return;

    clearInterval(id);
    this.timerId = undefined;
  }
}

const background = new Background();

chrome.runtime.onInstalled.addListener((details: chrome.runtime.InstalledDetails) => {
  if (details.hasOwnProperty('reason')) background.getMessage();
})