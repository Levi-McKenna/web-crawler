import { JSDOM } from 'jsdom';

async function crawlPage(currentURL: string) {
    console.log(`crawling with my cock all over the wall at: ${currentURL}`);
    // get request to current url
    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399){ 
            console.log(`Error status code: ${resp.status} on page: ${currentURL}`);
            return;
        }
        const contentType = resp.headers.get("content-type");
        if (contentType !== 'text/html; charset=UTF-8') {
            console.log(`Error: Invalid content-type: ${contentType}, on page: ${currentURL}`);
            return;
        }
        // log html
        console.log(await resp.text());
    } catch (err) {
        console.error(`Error in fetch request: ${err.message}, on: ${currentURL}`);
    }
}

function getURLfromHTML(htmlStr: JSDOM, baseURL: string): string[] {
    // parses string to a dom
    const htmlDOM = new JSDOM(`${htmlStr}`);
    const possibleURLS: string[] = [normalizeURL(baseURL)];
    // grabs all <a></a> nodes under the dom
    const allHREFS = htmlDOM.window.document.querySelectorAll('a');
    allHREFS.forEach(node => {
        // checks for relative URL if so parses the base url to the paths
        if (node.href[0] === '/') {
            try {
                possibleURLS.push(normalizeURL(`${baseURL}${node}`));
            }catch (err) {
                console.error('INVALID URL');
            }
        } else{
            try  {
                possibleURLS.push(normalizeURL(node.href));
            } catch (err) {
                console.error('INVALID URL');
            }
        }
    });
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

