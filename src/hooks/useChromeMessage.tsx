import { useRef } from 'react';
import { useEffect, useState } from 'react';
import ChromeFunc from '../Chrome/chromeFunc';
import { ChromeMessage } from '../common/types';

const useChromeMessage = (name: string = 'chrome', ms: number = 4) => {
  const [_message, _setMessage] = useState<ChromeMessage>(null);
  const [result, setResult] = useState<ChromeMessage>(null);
  const delayRef = useRef(null);

  useEffect(() => {
    if (_message && _message.code) {
      const port = ChromeFunc.connectPort(name);
      delayRef.current = setTimeout(() => {
        port.postMessage(_message);
        port.onMessage.addListener((msg) => {
          if (!msg) return;

          setResult(msg);
        });
      }, ms);
    }

    return () => {
      if (delayRef?.current) {
        clearTimeout(delayRef.current);
        setResult(null);
      }
    };
  }, [_message]);

  const toogleState = (msg: ChromeMessage) => {
    console.log(msg, 'in useChrome');
    _setMessage(msg);
  };

  return [result, toogleState] as const;
};

export default useChromeMessage;
