import { urlRegex, hostValidRegex, protocolGmValid, protocolValidRegex, webValidRegex } from "../constants/urlRegexConstants";

export const validateLastDomain = (url: string): boolean => {
    try {
        if (!url) throw Error();

        const isLastDomain = url.split('').filter(v => v === '.').length > 1 ? true : false;
        if (!isLastDomain) throw Error();
        return true;

    } catch (err) {
        console.log(err);
        return false;
    }
}

export const validateHost = (url: string): string => {
    try {
        if (!url) throw Error();

        if (!urlRegex.test(url)) throw Error('not passed with urlRegex');
        if (hostValidRegex.test(url) && url.charAt(url.length - 1) === '/') return url.slice(0, -1);

        return url;
    } catch (err) {
        console.log(err);
        return;
    }
}

export const validateUrl = (url: string): string => {
    try {
        if (!url) throw Error();

        if (protocolGmValid.exec(url) !== null) {
            if (protocolValidRegex.exec(url) === null) throw Error('not passed with protocalValidRegex');

            let splitUrl: string = url.includes('https://') ? url.split('https://')[1] : url.split('http://')[1];
            if (webValidRegex.exec(splitUrl) !== null) return 'https://' + splitUrl;
            return 'https://www.' + splitUrl;
        } else {
            if (webValidRegex.exec(url) !== null) return 'https://' + url;
            return 'https://www.' + url;
        }
    } catch (err) {
        console.log(err);
        return;
    }
}