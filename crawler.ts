export function normalizeURL(urlStr: string): string {
    const url = new URL(urlStr);
    return `${url.hostname}${url.pathname}`;
}

