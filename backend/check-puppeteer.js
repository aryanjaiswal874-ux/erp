import puppeteer from "puppeteer";

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    console.log("Browser launched.");
    await browser.close();
    console.log("Browser closed.");
})();
