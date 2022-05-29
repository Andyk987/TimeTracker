import { TimeRecord } from "../common/types";
import { END_TIME } from "../constants/timeConstants";

export const diffTime = (end: number, start: number): number => (end - start) / 1000;

export const addTime = (record: TimeRecord[]): number => {
    return record.reduce((acc, obj) => {
        if (!Object(obj).hasOwnProperty(END_TIME)) return acc + diffTime(new Date().getTime(), obj.startTime);
        return acc + diffTime(obj.endTime, obj.startTime);
    }, 0)
}

export const secondsToTime = (sec = 0) => {
    const hour = Math.floor((sec / (60 * 60)) % 24);
    const minute = Math.floor((sec / 60) % 60);
    const seconds = Math.floor(sec % 60);

    return { hour, minute, seconds };
}