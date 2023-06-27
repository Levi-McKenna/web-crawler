function main() {
    try {
        if (process.argv.length < 3 || process.argv.length > 4) throw new Error("Invalid URL: No URL or more than one URL passed");
        new URL(process.argv[2]);
        console.info('Good URL');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();