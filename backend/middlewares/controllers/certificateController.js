import fs from "fs/promises";
import path from "path";
import { Partner, PartnerCertificate, User } from "../models/index.js";
import {
  generatePartnerCertificatePdf,
  newCertificateId,
} from "../utils/certificates/generatePartnerCertificatePdf.js";

const TEMPLATE_VERSION = "v3-landscape-resilient";

async function ensureCertificatesDir() {
  const uploadsRoot = path.join(path.resolve(), "uploads");
  const certDir = path.join(uploadsRoot, "certificates");
  await fs.mkdir(certDir, { recursive: true });
  return { uploadsRoot, certDir };
}

function getPublicVerifyUrl(req, certificateId) {
  // Frontend route requested: /verify-partner/:certificateId
  const base =
    process.env.FRONTEND_BASE_URL ||
    `${req.protocol}://${req.get("host")}`; // fallback
  return `${base.replace(/\/$/, "")}/verify-partner/${certificateId}`;
}

export async function ensureActiveCertificate({ partner, user, req }) {
  const refresh = String(req?.query?.refresh || "") === "1";
  const existing = await PartnerCertificate.findOne({
    where: { partnerId: partner.id, revokedAt: null },
    order: [["createdAt", "DESC"]],
  });
  if (existing && !refresh && existing.templateVersion === TEMPLATE_VERSION) return existing;

  const certificateId = newCertificateId();
  const verificationUrl = getPublicVerifyUrl(req, certificateId);
  const signatoryName = process.env.CERT_SIGNATORY_NAME || "Mr. Sankar Gayen";
  const signatoryRole = process.env.CERT_SIGNATORY_ROLE || "Managing Director";

  const { certDir } = await ensureCertificatesDir();
  const filename = `partner-cert-${certificateId}.pdf`;
  const relativePdfPath = path.posix.join("certificates", filename);
  const pdfAbsPath = path.join(certDir, filename);

  const { pdfBuffer, issueDate } = await generatePartnerCertificatePdf({
    partner,
    user,
    certificateId,
    signatoryName,
    signatoryRole,
    verificationUrl,
    companyName: "SBGM Digital India Pvt. Ltd.",
    footerAddress: process.env.COMPANY_ADDRESS || "Registered Office: India",
    footerWebsite: process.env.COMPANY_WEBSITE || "www.sbgmdigitalindia.com",
  });

  await fs.writeFile(pdfAbsPath, pdfBuffer);

  return await PartnerCertificate.create({
    partnerId: partner.id,
    userId: user.id,
    certificateId,
    issueDate,
    authorizedCompanyName: "SBGM Digital India Pvt. Ltd.",
    signatoryName,
    pdfPath: relativePdfPath,
    templateVersion: TEMPLATE_VERSION,
  });
}

export async function generatePartnerCertificateForPartnerId(req, res) {
  const partnerId = req.params.partnerId;
  const partner = await Partner.findByPk(partnerId);
  if (!partner) return res.status(404).json({ message: "Partner not found" });
  if (partner.status !== "Approved" && partner.status !== "active")
    return res.status(400).json({ message: "Partner is not approved" });

  const user = await User.findByPk(partner.userId);
  if (!user) return res.status(404).json({ message: "Partner user not found" });

  const cert = await ensureActiveCertificate({ partner, user, req });
  return res.status(201).json(cert);
}

export async function getMyPartnerCertificateMeta(req, res) {
  const partner = await Partner.findOne({ where: { userId: req.user.id } });
  if (!partner) return res.status(404).json({ message: "Partner not found" });
  if (partner.status !== "Approved" && partner.status !== "active")
    return res.status(403).json({ message: "Not a verified partner" });

  const user = await User.findByPk(partner.userId);
  if (!user) return res.status(404).json({ message: "Partner user not found" });

  // Auto-generate if missing (still after approval)
  const cert = await ensureActiveCertificate({ partner, user, req });

  const verificationUrl = getPublicVerifyUrl(req, cert.certificateId);
  return res.json({ ...cert.toJSON(), verificationUrl });
}

export async function downloadMyPartnerCertificatePdf(req, res) {
  const partner = await Partner.findOne({ where: { userId: req.user.id } });
  if (!partner) return res.status(404).json({ message: "Partner not found" });
  if (partner.status !== "Approved" && partner.status !== "active")
    return res.status(403).json({ message: "Not a verified partner" });

  const user = await User.findByPk(partner.userId);
  if (!user) return res.status(404).json({ message: "Partner user not found" });

  const cert = await ensureActiveCertificate({ partner, user, req });

  const pdfAbs = path.join(path.resolve(), "uploads", cert.pdfPath);
  const pdfBuffer = await fs.readFile(pdfAbs);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=Partner_Certificate_${cert.certificateId}.pdf`
  );
  return res.send(pdfBuffer);
}

export async function verifyPartnerCertificatePublic(req, res) {
  const { certificateId } = req.params;
  const cert = await PartnerCertificate.findOne({ where: { certificateId } });
  if (!cert) return res.status(404).json({ message: "Certificate not found" });

  const partner = await Partner.findByPk(cert.partnerId);
  const user = await User.findByPk(cert.userId, {
    attributes: ["id", "full_name", "email", "mobile", "profile_photo"],
  });

  const verificationUrl = getPublicVerifyUrl(req, cert.certificateId);
  return res.json({
    certificateId: cert.certificateId,
    issueDate: cert.issueDate,
    authorizedCompanyName: cert.authorizedCompanyName,
    signatoryName: cert.signatoryName,
    status: cert.revokedAt ? "Revoked" : "Valid",
    revokedAt: cert.revokedAt,
    revokeReason: cert.revokeReason,
    partner: partner
      ? {
        id: partner.id,
        status: partner.status,
      }
      : null,
    user: user ? user.toJSON() : null,
    verificationUrl,
  });
}

export async function downloadPartnerCertificatePdfForAdmin(req, res) {
  try {
    const { partnerId } = req.params;
    const partner = await Partner.findByPk(partnerId);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    const user = await User.findByPk(partner.userId);
    if (!user) return res.status(404).json({ message: "Partner user not found" });

    const cert = await ensureActiveCertificate({ partner, user, req });
    const pdfAbs = path.join(path.resolve(), "uploads", cert.pdfPath);
    const pdfBuffer = await fs.readFile(pdfAbs);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=Partner_Certificate_${cert.certificateId}.pdf`
    );
    return res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load certificate" });
  }
}

import { transporter } from "../config/mailer.js";

export async function sendPartnerCertificateEmail(req, res) {
  try {
    const { partnerId } = req.params;
    const partner = await Partner.findByPk(partnerId);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    const user = await User.findByPk(partner.userId);
    if (!user) return res.status(404).json({ message: "Partner user not found" });

    const cert = await ensureActiveCertificate({ partner, user, req });
    const pdfAbsPath = path.join(path.resolve(), "uploads", cert.pdfPath);

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7CB342 0%, #558B2F 100%); padding: 30px; text-align: center;">
          <img src="https://sbgmdigital.com/logo.png" alt="SBGM" style="height: 50px; filter: brightness(0) invert(1);" />
          <h1 style="color: white; margin: 15px 0 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Authorization Certificate</h1>
        </div>
        <div style="padding: 40px; background: white;">
          <p style="font-size: 16px;">Dear <strong>${user.full_name}</strong>,</p>
          <p>We are delighted to formally welcome you as an <strong>Authorized Partner</strong> of SBGM Digital India Private Limited.</p>
          <p>Your authorization certificate has been generated and is attached to this email. This document verifies your status as a trusted partner for our suite of digital, compliance, and IT solutions.</p>
          
          <div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-left: 4px solid #7CB342; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #1e293b;">Certificate ID: ${cert.certificateId}</p>
            <p style="margin: 5px 0 0; color: #64748b;">Issued on: ${new Date(cert.issueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>

          <p>You can also access and download your certificate anytime by logging into the <strong>Partner Portal</strong>.</p>
          
          <div style="text-align: center; margin-top: 40px;">
            <a href="${process.env.FRONTEND_BASE_URL || 'https://sbgmdigital.com'}/user/certificate" style="background-color: #ff743d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">View Certificate</a>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">SBGM Digital India Pvt. Ltd.</p>
          <p style="margin: 5px 0 0; font-size: 11px; color: #cbd5e1;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"SBGM Digital India" <${process.env.DEFAULT_FROM_EMAIL}>`,
      to: user.email,
      subject: "Your Partner Authorization Certificate - SBGM Digital India",
      html: htmlContent,
      attachments: [
        {
          filename: `Partner_Certificate_${cert.certificateId}.pdf`,
          path: pdfAbsPath,
          contentType: "application/pdf",
        },
      ],
      replyTo: "sbgmdigitalindiapvtltd@gmail.com"
    });

    res.json({ success: true, message: "Certificate sent successfully to " + user.email });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
}

export async function sendPartnerPdfEmailFromFrontend(req, res) {
  try {
    const { partnerId } = req.params;
    const partner = await Partner.findByPk(partnerId);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    const user = await User.findByPk(partner.userId);
    if (!user) return res.status(404).json({ message: "Partner user not found" });

    const pdfBuffer = req.file?.buffer;
    if (!pdfBuffer) return res.status(400).json({ message: "No PDF file provided" });

    // Use a fixed or current cert ID for display
    const cert = await PartnerCertificate.findOne({ where: { partnerId } });
    const certificateId = cert?.certificateId || `SBGM-AUTH-${Date.now()}`;

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7CB342 0%, #558B2F 100%); padding: 30px; text-align: center;">
          <img src="https://sbgmdigital.com/logo.png" alt="SBGM" style="height: 50px; filter: brightness(0) invert(1);" />
          <h1 style="color: white; margin: 15px 0 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Authorization Certificate</h1>
        </div>
        <div style="padding: 40px; background: white;">
          <p style="font-size: 16px;">Dear <strong>${user.full_name}</strong>,</p>
          <p>We are delighted to formally welcome you as an <strong>Authorized Partner</strong> of SBGM Digital India Private Limited.</p>
          <p>Your authorization certificate has been generated and is attached to this email. This document verifies your status as a trusted partner for our suite of digital, compliance, and IT solutions.</p>
          
          <div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-left: 4px solid #7CB342; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #1e293b;">Certificate ID: ${certificateId}</p>
          </div>

          <p>You can also access and download your certificate anytime by logging into the <strong>Partner Portal</strong>.</p>
          
          <div style="text-align: center; margin-top: 40px;">
            <a href="${process.env.FRONTEND_BASE_URL || 'https://sbgmdigital.com'}/user/certificate" style="background-color: #ff743d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">View Certificate</a>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">SBGM Digital India Pvt. Ltd.</p>
          <p style="margin: 5px 0 0; font-size: 11px; color: #cbd5e1;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"SBGM Digital India" <${process.env.DEFAULT_FROM_EMAIL}>`,
      to: user.email,
      subject: "Your Partner Authorization Certificate - SBGM Digital India",
      html: htmlContent,
      attachments: [
        {
          filename: `Partner_Certificate_${certificateId}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
      replyTo: "sbgmdigitalindiapvtltd@gmail.com"
    });

    res.json({ success: true, message: "Certificate emailed successfully to " + user.email });
  } catch (error) {
    console.error("Manual Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
}

