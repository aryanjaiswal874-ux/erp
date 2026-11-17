import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import puppeteer from "puppeteer";
import { buildMAKIdCardHtml, buildMAKCertificateHtml } from "./makDocumentTemplates.js";

async function readImageAsDataUri(absPath) {
    try {
        if (!fs.existsSync(absPath)) return null;
        const buf = fs.readFileSync(absPath);
        const ext = path.extname(absPath).toLowerCase();
        const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "application/octet-stream";
        return `data:${mime};base64,${buf.toString("base64")}`;
    } catch {
        return null;
    }
}

export async function generateMAKMemberDocuments(member) {
    const repoRoot = path.resolve();
    const publicDir = path.join(repoRoot, "..", "MAK", "public");
    const uploadsDir = path.join(repoRoot, "uploads", "mak");
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 1. Prepare Base Assets
    const backendPublicDir = path.join(repoRoot, "public");

    // helper to find asset in either public dir
    const getAssetPath = (filename) => {
        const backendPath = path.join(backendPublicDir, filename);
        if (fs.existsSync(backendPath)) return backendPath;
        return path.join(publicDir, filename);
    };

    const logoDataUri = await readImageAsDataUri(getAssetPath("logo.png"));
    const sarmLogoFullDataUri = await readImageAsDataUri(getAssetPath("sarmlogofull.png"));
    const sarmLogoWatermarkDataUri = await readImageAsDataUri(getAssetPath("sarmlogo.png"));
    const stampDataUri = await readImageAsDataUri(getAssetPath("stamp.png"));

    // 2. Prepare Member Photo
    let photoDataUri = null;
    if (member.photo) {
        const photoAbs = path.join(repoRoot, "uploads", member.photo.replace(/^\/?uploads\//, ""));
        photoDataUri = await readImageAsDataUri(photoAbs);
    }
    if (!photoDataUri) {
        // Fallback to empty if photo missing
        photoDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    }

    const idNumber = `MAK-${member.id.toString().substring(0, 6).toUpperCase()}`;
    const now = member.createdAt || new Date();
    const idIssueDate = new Date(now).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
    const certIssueDate = new Date(now).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    const dob = member.dob || "N/A";

    const puppeteerOptions = {
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        defaultViewport: {
            width: 1100,
            height: 780,
            deviceScaleFactor: 2
        }
    };

    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        puppeteerOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    } else if (process.platform === 'linux' && fs.existsSync('/usr/bin/chromium-browser')) {
        puppeteerOptions.executablePath = '/usr/bin/chromium-browser';
    }

    const browser = await puppeteer.launch(puppeteerOptions);

    try {
        const page = await browser.newPage();

        // --- GENERATE ID CARD ---
        const idCardHtml = buildMAKIdCardHtml({
            fullName: member.fullName,
            idNumber,
            designation: member.membershipType || "Member",
            dob,
            phone: member.phone,
            address: member.address || "N/A",
            photoDataUri,
            logoDataUri,
            sarmLogoFullDataUri,
            stampDataUri,
            issueDate: idIssueDate
        });

        await page.setViewport({ width: 320, height: 500, deviceScaleFactor: 2 });
        await page.setContent(idCardHtml, { waitUntil: "load", timeout: 60000 });
        const idCardFilename = `idcard-${member.id}.png`;
        const idCardPath = path.join(uploadsDir, idCardFilename);
        await page.screenshot({
            path: idCardPath,
            type: 'png'
        });

        // --- GENERATE CERTIFICATE ---
        const certHtml = buildMAKCertificateHtml({
            fullName: member.fullName,
            idNumber,
            designation: member.membershipType || "Member",
            issueDate: certIssueDate,
            logoDataUri,
            sarmLogoFullDataUri,
            sarmLogoWatermarkDataUri,
            stampDataUri
        });

        await page.setViewport({ width: 1100, height: 780, deviceScaleFactor: 2 });
        await page.setContent(certHtml, { waitUntil: "load", timeout: 60000 });
        const certFilename = `certificate-${member.id}.png`;
        const certPath = path.join(uploadsDir, certFilename);
        await page.screenshot({
            path: certPath,
            type: 'png'
        });

        return {
            idCardUrl: `/uploads/mak/${idCardFilename}`,
            certificateUrl: `/uploads/mak/${certFilename}`
        };

    } finally {
        await browser.close();
    }
}
