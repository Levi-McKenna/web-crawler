const { crawlPage } = require('./crawler');

function main() {
    try {
        if (process.argv.length < 3) throw new Error();
        new URL(process.argv[2]);
        console.info('Good URL');
    } catch (err) {
        console.error("Bad URL present or No URL present");
        process.exit(1);
    }
    const baseURL = process.argv[2];

    crawlPage(baseURL);
}

main();