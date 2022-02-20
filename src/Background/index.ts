import {
  GET_MESSAGE_ERROR,
  START_CHECKING,
  START_CHECKING_ERROR,
  START_CHECKING_SUCCEESS,
  STOP_CHECKING,
  STOP_CHECKING_ERROR,
  STOP_CHECKING_SUCCEESS,
} from "../constants/timeConstants";

interface StringArray {
  [index: number]: string;
}

interface Message {
  code: string;
}

// This file is ran as a background script
console.log("Hello from background script!");

const defaultUrl = "www.youtube.com/watch?";

class Background {
  readonly chrome: typeof chrome = chrome;
  checking: boolean;
  timerId?: NodeJS.Timeout;
  time: number;
  timeStamp?: Date[];
  constructor() {
    this.checking = false;
    this.timerId = undefined;
    this.time = 0;
    this.timeStamp = [];
  }

  async getFromContent() {
    await this.chrome.runtime.onMessage.addListener(
      (msg: Message, sender, sendResponse) => {
        console.log(msg);
      //   switch (msg.code) {
      //     case START_CHECKING:
      //       this.startChecking();
      //       sendResponse({ code: START_CHECKING_SUCCEESS });
      //       break;
      //     case STOP_CHECKING:
      //       this.stopChecking();
      //       sendResponse({ code: STOP_CHECKING_SUCCEESS });
      //       break;
      //     default:
      //       sendResponse({ code: GET_MESSAGE_ERROR });
      //   }
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

  if (manifest.content_scripts && manifest.content_scripts[0]) {
    chrome.tabs.query(
      { url: manifest.content_scripts[0].matches },
      (tabs: chrome.tabs.Tab[]) => {
        if (tabs[0] && tabs[0].id) {
          chrome.scripting.executeScript(
            {
              target: { tabId: tabs[0].id, allFrames: true },
              files: ["content.js"],
            },
            (res) => {
              console.log(res);
            }
          );
        }
      }
    );
  }

  const background = new Background();
  background.getFromContent();
});
