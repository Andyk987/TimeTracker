(()=>{"use strict";var e=function(e,t,n,s){return new(n||(n=Promise))((function(i,o){function r(e){try{h(s.next(e))}catch(e){o(e)}}function c(e){try{h(s.throw(e))}catch(e){o(e)}}function h(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}h((s=s.apply(e,t||[])).next())}))};console.log("Hello from content script!"),(new class{constructor(){this.chrome=chrome,this.isChecking=!1,this.defaultUrl="www.youtube.com/watch?",this.prevUrl=""}getMessage(){return e(this,void 0,void 0,(function*(){yield this.chrome.runtime.onMessage.addListener((e=>{console.log(e),this.handleMessage(e)}))}))}sendMessage(t){return e(this,void 0,void 0,(function*(){yield this.chrome.runtime.sendMessage(t,(e=>{console.log(e,"Response")}))}))}handleMessage(e){"CHECKING_TRUE"===e.code&&(this.isChecking=!0)}detectUrlChange(){new MutationObserver((()=>{if(location.href===this.prevUrl)return;this.prevUrl=location.href;const e=location.href.includes(this.defaultUrl);this.handleUrlChanged(e)})).observe(document,{subtree:!0,childList:!0})}handleUrlChanged(e){this.isChecking&&(e?this.sendMessage({code:"START_CHECKING"}):this.sendMessage({code:"STOP_CHECKING"}))}}).getMessage()})();