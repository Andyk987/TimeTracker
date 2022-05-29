import { useEffect } from 'react';
import { useState } from 'react';
import ChromeFunc from '../Chrome/chromeFunc';

const pattern =
  /((?:[a-z\d](?:[a-z\d-]{0,63}[a-z\d])?|\*)\.)+[a-z\d][a-z\d-]{0,63}[a-z\d]/g;

const useHistorySearch = (url: string) => {
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    const pattern =
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
    if (pattern.test(url)) {
    }
  }, [url]);

  return [urlList];
};

export default useHistorySearch;
