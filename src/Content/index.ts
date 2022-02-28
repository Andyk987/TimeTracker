import {
  CHECKING_TRUE,
  START_CHECKING,
  START_CHECKING_SUCCEESS,
  STOP_CHECKING,
} from "../constants/timeConstants";

interface Message {
  code: string;
}

// This file is injected as a content script
console.log("Hello from content script!");

class Content {
  chrome: typeof chrome = chrome;
  isChecking: boolean;
  defaultUrl: string;
  prevUrl: string;
  constructor() {
    this.isChecking = false;
    this.defaultUrl = "www.youtube.com/watch?";
    this.prevUrl = "";
  }

  async getMessage(): Promise<void> {
    await this.chrome.runtime.onMessage.addListener((msg) => {
      console.log(msg);
      this.handleMessage(msg);
    });
  }

  async sendMessage(msg: Message): Promise<void> {
    await this.chrome.runtime.sendMessage(msg, (res) => {
      console.log(res, "Response");
    });
  }

  handleMessage(msg: Message) {
    switch (msg.code) {
      case CHECKING_TRUE:
        this.isChecking = true;
    }
  }

  detectUrlChange(): void {
    const config = { subtree: true, childList: true };

    const observer: MutationObserver = new MutationObserver(() => {
      if (location.href === this.prevUrl) return;
      this.prevUrl = location.href;

      const isEntered: boolean = location.href.includes(this.defaultUrl);
      this.handleUrlChanged(isEntered);
    });

    observer.observe(document, config);
  }

  handleUrlChanged(isEntered: boolean): void {
    if (!this.isChecking) return;

    if (isEntered) {
      this.sendMessage({ code: START_CHECKING });
    } else {
      this.sendMessage({ code: STOP_CHECKING });
    }
  }
}

const content = new Content();
content.detectUrlChange();
content.getMessage();