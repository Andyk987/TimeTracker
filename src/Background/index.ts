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

class Background {
  private readonly chrome: typeof chrome = chrome;
  private checkingUrl: string;
  private isChecking: boolean;
  timerId?: NodeJS.Timeout;
  time: number;
  timeStamp?: Date[];
  constructor() {
    this.checkingUrl = defaultUrl;
    this.isChecking = true;
    this.timerId = undefined;
    this.time = 0;
    this.timeStamp = [];
  }

  detectTabCreated() {
    this.chrome.tabs.onCreated.addListener((tab: chrome.tabs.Tab) => {
      console.log(tab)
      if (!this.isChecking) return;
      this.sendMessage(tab.id, { code: CHECKING_TRUE });
    });
  }

  async getMessage() {
    await this.chrome.runtime.onMessage.addListener(
      (msg: Message, sender: chrome.runtime.MessageSender, sendResponse) => {
        if (!msg.hasOwnProperty("code")) return;
        const { code } = this.handleMessage(msg);
        sendResponse(code);
      }
    );
  }

  async sendMessage(id: number, msg: Message) {
    await this.chrome.tabs.query({ active: true }, (tabs) => {
      this.chrome.tabs.sendMessage(id, msg, (res) => {
        console.log(res, 'success')
      });
    })
  }

  handleMessage(msg: Message) {
    switch (msg.code) {
      case START_CHECKING:
        this.isChecking = true;
        return { code: START_CHECKING_SUCCEESS };
      case STOP_CHECKING:
        this.isChecking = false;
        return { code: STOP_CHECKING_SUCCEESS };
    }
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
        reject();
      });
    } catch (err) {
      console.log("err occ");
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

chrome.runtime.onInstalled.addListener((res) => {
  const manifest = chrome.runtime.getManifest();

  chrome.tabs.query({ url: manifest.content_scripts[0].matches }, (tabs) => {
    const id = tabs[0]?.id;

    chrome.scripting.executeScript(
      {
        target: { tabId: id, allFrames: true },
        files: ["content.js"],
      },
      (res) => {
        console.log(res);
      }
    );
  });

  const background = new Background();
  background.detectTabCreated();
  background.getMessage();
});
