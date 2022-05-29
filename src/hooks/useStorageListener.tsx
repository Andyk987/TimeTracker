import { useEffect, useRef, useState } from 'react';
import { TimeTrackerData } from '../common/types';

const useStorageListener = () => {
  const [changedData, setChangedData] = useState<TimeTrackerData[]>();
  const storageRef = useRef(null);

  useEffect(() => {
    storageRef.current = chrome.storage?.onChanged.addListener((changes) => {
      if (!Object(changes).hasOwnProperty('timeTrackerData')) return;

      setChangedData(changes.timeTrackerData.newValue);
    });

    return () => {
      if (storageRef && storageRef.current) {
        console.log('Cleaned');
        // chrome.storage.onChanged.removeListener(storageRef.current);
      }
    };
  }, []);

  return [changedData];
};

export default useStorageListener;
