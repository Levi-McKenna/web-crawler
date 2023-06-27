import { JSDOM } from 'jsdom';

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
}

