import { JSDOM } from 'jsdom';

async function crawlPage(currentURL: string, pages: {[index: string]: number}): Promise<{[index: string]: number}> {
    // check if url has already been scraped
    const normalizedCurrURL = normalizeURL(currentURL);
    if (pages[normalizedCurrURL]) {
        pages[normalizedCurrURL] += 1;
        return pages;
    } else {
        pages[normalizedCurrURL] = 1;
    }
    console.log(`crawling with my cock all over the wall at: ${currentURL}`);
    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399){ 
            console.log(`Error status code: ${resp.status} on page: ${currentURL}`);
            return pages;
        }
        const contentType = resp.headers.get("content-type");
        if (contentType !== 'text/html; charset=UTF-8') {
            console.log(`Error: Invalid content-type: ${contentType}, on page: ${currentURL}`);
            return pages;
        }
        const currentURLS = getURLfromHTML(await resp.text(), currentURL);
        // loop through all urls and recurse them
        for (const url of currentURLS) {
            await crawlPage(url, pages);
        }
    } catch (err) {
        console.error(`Error in fetch request: ${err.message}, on: ${currentURL}`);
    }
    return pages;
}

function getURLfromHTML(htmlStr: string, baseURL: string): string[] {
    // parses string to a dom
    const htmlDOM = new JSDOM(htmlStr);
    const possibleURLS: string[] = [];
    // grabs all <a></a> nodes under the dom
    const allHREFS = htmlDOM.window.document.querySelectorAll('a');
    for (const node of allHREFS) {
        // checks for relative URL if so parses the base url to the paths
        if (node.href[0] === '/') {
            // checks to make sure there is not a loop back path
            if (node.href.length === 1) continue;
            try {
                possibleURLS.push(`${baseURL}${node.href}`);
            }catch (err) {
                console.error('INVALID URL');
            }
        } else {
            // checks that node's path does not out source to a new website
            const tmpNodeURL = new URL(node.href);
            const tmpBaseURL = new URL(baseURL);
            try  {
                    if (tmpNodeURL.hostname === tmpBaseURL.hostname) possibleURLS.push(node.href);
                } catch (err) {
                    console.error('INVALID URL');
                }
        }
    }
    return possibleURLS;
}

function normalizeURL(urlStr: string): string {
    const url = new URL(urlStr);
    const normalizedURL = `${url.hostname}${url.pathname}`;
    // removes all trailing forward slashes
    if (normalizedURL.length > 0 && normalizedURL[normalizedURL.length-1] === '/'){ 
        return normalizedURL.slice(0, -1);
    } 
    // if there are no tailing slashes return the string literal
    return normalizedURL;
}


module.exports = {
    normalizeURL,
    getURLfromHTML,
    crawlPage
}

