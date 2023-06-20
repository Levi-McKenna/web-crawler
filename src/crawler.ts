export function normalizeURL(urlStr: string): string {
    const url = new URL(urlStr);
    const normalizedURL = `${url.hostname}${url.pathname}`;
    if (normalizedURL.length > 0 && normalizedURL[normalizedURL.length-1] === '/'){ 
        return normalizedURL.slice(0, -1);
    } 
    return normalizedURL;
}

