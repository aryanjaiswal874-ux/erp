import fs from "fs/promises";
import path from "path";
import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";
import { buildPartnerCertificateHtml } from "./partnerCertificateTemplate.js";

function toDataUri(mimeType, buffer) {
  const base64 = buffer.toString("base64");
  return `data:${mimeType};base64,${base64}`;
}

async function readOptionalFileAsDataUri(absPath) {
  try {
    const buf = await fs.readFile(absPath);
    const ext = path.extname(absPath).toLowerCase();
    const mime =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
          ? "image/jpeg"
          : "application/octet-stream";
    return toDataUri(mime, buf);
  } catch {
    return null;
  }
}

export async function generatePartnerCertificatePdf({
  partner,
  user,
  certificateId,
  signatoryName,
  signatoryRole,
  verificationUrl,
  companyName = "SBGM Digital India Pvt. Ltd.",
  footerAddress = "India",
  footerWebsite = "www.sbgmdigitalindia.com",
}) {
  const issueDate = user?.createdAt ? new Date(user.createdAt) : new Date();
  const issueDateText = issueDate.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const finalSignatoryName = signatoryName || "Mr. Sankar Gayen";
  const finalSignatoryRole = signatoryRole || "Managing Director";

  const repoRoot = path.resolve(); // process cwd expected as backend root in most setups
  const logoAbs = path.join(repoRoot, "..", "frontend", "public", "logo.png");
  const logoDataUri = await readOptionalFileAsDataUri(logoAbs);
  const watermarkDataUri = logoDataUri;

  // partner photo: prefer partner.photo / partner.profileImage / user.profile_photo
  const photoRelative =
    partner?.photo || partner?.profileImage || user?.profile_photo || null;

  // For local `/uploads/...` we embed as data URI; for http(s)/data URLs we pass
  // the URL directly so Puppeteer can fetch it when rendering the page.
  let partnerPhotoDataUri = null;
  if (photoRelative) {
    const asString = String(photoRelative);
    if (
      asString.startsWith("http://") ||
      asString.startsWith("https://") ||
      asString.startsWith("data:")
    ) {
      partnerPhotoDataUri = asString;
    } else {
      const photoAbs = path.isAbsolute(asString)
        ? asString
        : path.join(
          repoRoot,
          "uploads",
          asString.replace(/^\/?uploads\//, "")
        );
      partnerPhotoDataUri = await readOptionalFileAsDataUri(photoAbs);
    }
  }

  const html = buildPartnerCertificateHtml({
    companyName,
    certificateTitle: "Certificate of Authorization",
    logoDataUri,
    watermarkDataUri,
    partnerPhotoDataUri,
    partnerFullName: user?.full_name || user?.name || "Partner",
    partnerId: partner?.id || "",
    certificateId,
    issueDateText,
    signatoryName: finalSignatoryName,
    signatoryRole: finalSignatoryRole,
    verificationUrl,
    footerAddress,
    footerWebsite,
  });

  // Auto-detect system Chromium for Ubuntu/ARM environments
  const commonPaths = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable'
  ];

  let executablePath = null;
  for (const p of commonPaths) {
    if (p) {
      try {
        await fs.access(p);
        executablePath = p;
        break;
      } catch (e) { }
    }
  }

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: executablePath || undefined, // fallback to bundled if not found
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920,1080",
    ],
  });

  try {
    const page = await browser.newPage();
    // Use a longer timeout and wait for network to be mostly idle (networkidle2 is less strict than networkidle0)
    await page.setContent(html, { waitUntil: "networkidle2", timeout: 90000 });

    // Additional delay to ensure fonts are fully rendered by the engine
    await new Promise(r => setTimeout(r, 2000));

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });
    return { pdfBuffer, issueDate };
  } catch (err) {
    console.error("Puppeteer PDF generation failed:", err);
    throw new Error(`Failed to generate PDF: ${err.message}`);
  } finally {
    await browser.close();
  }
}

export function newCertificateId() {
  // Human-friendly, still unique
  const u = uuidv4().replace(/-/g, "").slice(0, 12).toUpperCase();
  return `SBGM-AUTH-${u}`;
}

