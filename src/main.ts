const { crawlPage } = require('./crawler');
const { printReports } = require('./report');

async function main() {
    try {
        if (process.argv.length < 3) throw new Error();
        new URL(process.argv[2]);
        console.info('Good URL');
    } catch (err) {
        console.error("Bad URL present or No URL present");
        process.exit(1);
    }
    const baseURL = process.argv[2];
    // crawl page and log all pages
    const pages = await crawlPage(baseURL, {});
    printReports(pages);
}

main();