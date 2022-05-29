var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { START_CHECKING, STOP_CHECKING } from "../constants/timeConstants";
// This file is injected as a content script
console.log("Hello from content script!");
class Content {
    constructor() {
        this.chrome = chrome;
        this.isChecking = false;
        this.defaultUrl = "www.youtube.com/watch?";
        this.prevUrl = "";
    }
    getMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chrome.runtime.onMessage.addListener((msg) => {
                console.log(msg);
            });
        });
    }
    sendMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chrome.runtime.sendMessage(msg, (res) => {
                console.log(res, "Response");
            });
        });
    }
    detectUrlChange() {
        const config = { subtree: true, childList: true };
        const observer = new MutationObserver(() => {
            if (location.href === this.prevUrl)
                return;
            this.prevUrl = location.href;
            const isEntered = location.href.includes(this.defaultUrl);
            this.handleUrlChanged(isEntered);
        });
        observer.observe(document, config);
    }
    handleUrlChanged(isEntered) {
        if (!this.isChecking)
            return;
        if (isEntered) {
            this.sendMessage({ code: START_CHECKING });
        }
        else {
            this.sendMessage({ code: STOP_CHECKING });
        }
    }
}
const content = new Content();
// content.detectUrlChange();
// content.getMessage();
//# sourceMappingURL=index.js.map