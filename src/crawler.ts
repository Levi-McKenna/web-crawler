export function normalizeURL(urlStr: string): string {
    const url = new URL(urlStr);
    const normalizedURL = `${url.hostname}${url.pathname}`;
    // removes all trailing forward slashes
    if (normalizedURL.length > 0 && normalizedURL[normalizedURL.length-1] === '/'){
        return normalizedURL.slice(0, -1);
    } 
    // if there are no tailing slashes return the string literal
    return normalizedURL;
}

