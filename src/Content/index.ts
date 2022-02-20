import {
  START_CHECKING,
  START_CHECKING_SUCCEESS,
  STOP_CHECKING,
} from "../constants/timeConstants";

// This file is injected as a content script
console.log("Hello from content script!");

interface Message {
  code: string;
}

class Content {
  chrome: typeof chrome = chrome;
  checking: boolean;
  defaultUrl: string;
  prevUrl: string;
  constructor() {
    this.checking = false;
    this.defaultUrl = "www.youtube.com/watch?";
    this.prevUrl = "";
  }

  listenMessage() {
    this.chrome.runtime.onMessage.addListener((msg) => {
      console.log(msg);
    });
  }

  async sendToBackground(msg: Message, cb?: Function) {
    await this.chrome.runtime.sendMessage(msg, (res: Message) => {
      console.log(res, "res");
      if (res.code === START_CHECKING_SUCCEESS) {
        this.checking = true;
      } else {
        return;
      }
    });
  }

  detectUrlChange() {
    const config = { subtree: true, childList: true };

    const observer: MutationObserver = new MutationObserver(() => {
      if (location.href === this.prevUrl) return;
      this.prevUrl = location.href;

      const isEntered: boolean = location.href.includes(this.defaultUrl);
      if (isEntered) {
        const msg = { code: START_CHECKING };
        this.sendToBackground(msg);
      } else {
        if (this.checking) {
          const msg = { code: STOP_CHECKING };
          this.sendToBackground(msg);
        } else {
          return;
        }
      }
    });
    observer.observe(document, config);
  }

  handleChecking(isEntered: boolean) {
    const code: string = isEntered ? START_CHECKING : STOP_CHECKING;
    this.chrome.runtime.sendMessage({ code });
  }
}

const content = new Content();
// content.detectUrlChange();
content.listenMessage();
