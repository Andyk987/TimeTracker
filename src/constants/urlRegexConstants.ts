export const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const hostValidRegex = /^((http(s)?:\/\/)?([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-z0-9])\.)*([a-zA-Z0-9]|[a-zA-Z0-9\-]*[a-zA-Z0-9])\/?$/;
export const webValidRegex = /^w{3}\./;
export const protocolValidRegex = /^http(s)?:\/\//;
export const protocolGmValid = /^h(t)?(t)?p(s)?:\/(\/)?/;

export const lastDomainRegex = /\.([a-zA-Z0-9]|[a-zA-Z0-9\W]*[a-zA-Z0-9\W])$/;