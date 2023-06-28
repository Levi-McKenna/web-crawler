function printReports(pages: {[index: string]: number}): void {
    console.info("=======");
    console.info("REPORT");
    console.info("=======");
    const sortedPages = sortPages(pages);
    for (const page of sortedPages) {
        console.log(`Found the url: ${page[0]}, was used ${page[1]} time(s)!`);
        console.info("=======");
    }
    console.info("=======");
    console.info("END");
    console.info("=======");
}

function sortPages(pages: {[index: string]: number}): [string, number][] {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a: [string, number], b: [string, number]) => {
        // sorts based of hits in the page's object value
        return a[1] - b[1];
    });
    return pagesArr;
}

module.exports = {
    printReports,
    sortPages
}