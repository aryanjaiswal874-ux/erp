import asyncHandler from "express-async-handler";

import { MAKMember, MAKDocument, MAKEvent } from "../models/index.js";
import { transporter } from "../config/mailer.js";
import { getWelcomeEmailTemplate, getWelcomeWhatsAppTemplate } from "../utils/makMessageTemplates.js";
import { sendWhatsAppText, sendWhatsAppImage } from "../utils/whatsappService.js";
import { generateMAKMemberDocuments } from "../utils/mak/generateMAKDocuments.js";
import fs from "fs";
import path from "path";

/**
 * @desc    Enroll a new MAK member
 * @route   POST /api/mak/members
 * @access  Private (Admin only)
 */
export const enrollMember = asyncHandler(async (req, res) => {
    try {
        const setNull = (v) => (!v || v.trim() === '' || v === 'Invalid date' ? null : v);

        const fullName = setNull(req.body.fullName);
        const address = setNull(req.body.address);
        const occupation = setNull(req.body.occupation);
        const gender = setNull(req.body.gender);
        const religion = setNull(req.body.religion);
        const dob = setNull(req.body.dob);
        const membershipType = setNull(req.body.membershipType) || 'Member';
        const email = setNull(req.body.email);
        const phone = setNull(req.body.phone);
        const whatsapp = setNull(req.body.whatsapp);
        const paymentAmount = setNull(req.body.paymentAmount);

        // Check if member exists by phone (ONLY if phone is provided)
        if (phone && phone.trim() !== '') {
            const memberExists = await MAKMember.findOne({ where: { phone } });
            if (memberExists) {
                return res.status(400).json({ message: "Member with this phone number already exists" });
            }
        }

        // 1. Photo and Payment Receipt (files)
        const photo = req.files?.photo?.[0]?.path ? `/${req.files.photo[0].path.replace(/\\/g, '/')}` : null;
        const paymentReceipt = req.files?.paymentReceipt?.[0]?.path ? `/${req.files.paymentReceipt[0].path.replace(/\\/g, '/')}` : null;

        // 2. Format WhatsApp (Add 91 prefix if not present)
        let formattedWhatsapp = whatsapp ? whatsapp.replace(/\D/g, '') : null;
        if (formattedWhatsapp && formattedWhatsapp.length === 10) {
            formattedWhatsapp = "91" + formattedWhatsapp;
        }

        // 3. Password: Use DOB (YYYY-MM-DD or DD-MM-YYYY) as temporary password
        // Or random, but user asked for "dob as password can be used"
        const plainPassword = dob ? dob.replace(/-/g, '') : "password123";
        const hashedPassword = plainPassword;

        // 4. Create Member
        const member = await MAKMember.create({
            fullName,
            address,
            occupation,
            gender,
            religion,
            dob,
            photo,
            membershipType,
            email,
            phone,
            whatsapp: formattedWhatsapp,
            paymentAmount,
            paymentReceipt,
            password: hashedPassword,
            role: 'member',
            isActive: true,
        });

        // 5. Handle Additional Documents (multi-upload)
        if (req.files?.documents) {
            let docNamesArray = [];
            if (req.body.documentNames) {
                docNamesArray = Array.isArray(req.body.documentNames)
                    ? req.body.documentNames
                    : [req.body.documentNames];
            }

            const docPromises = req.files.documents.map((file, idx) => {
                const nameFromInput = docNamesArray[idx];
                const finalName = nameFromInput && nameFromInput.trim() !== ''
                    ? nameFromInput.trim()
                    : file.originalname.split('.')[0];

                return MAKDocument.create({
                    memberId: member.id,
                    documentName: finalName,
                    documentPath: `/${file.path.replace(/\\/g, '/')}`,
                    fileType: file.mimetype.split('/')[1]
                });
            });
            await Promise.all(docPromises);
        }

        // 6. Send Communications
        const loginUrl = process.env.FRONTEND_LOGIN_URL || "https://manavadhikarkendra.org/mak-login";

        // Send Email
        if (email) {
            try {
                await transporter.sendMail({
                    from: `"MAK Team" <${process.env.SMTP_USER}>`,
                    to: email,
                    subject: "Welcome to Manav Adhikar Kendra - Your Membership Credentials",
                    html: getWelcomeEmailTemplate(fullName, phone, plainPassword, loginUrl)
                });
            } catch (err) {
                console.error("Email failed:", err.message);
            }
        }

        // Send WhatsApp Professional Welcome (Welcome Text Only on Enroll)
        if (formattedWhatsapp) {
            try {
                const waMsg = getWelcomeWhatsAppTemplate(fullName, phone || "Member", loginUrl);
                await sendWhatsAppText(formattedWhatsapp, waMsg);
            } catch (waErr) {
                console.error("WhatsApp Welcome failed:", waErr.message);
            }
        }

        res.status(201).json({
            message: "Member enrolled successfully",
            memberId: member.id,
            credentials: {
                id: phone,
                password: plainPassword
            }
        });

    } catch (error) {
        console.error("Enrollment error:", error);
        res.status(500).json({ message: "Member enrollment failed", error: error.message });
    }
});

/**
 * @desc    Get all MAK members
 * @route   GET /api/mak/members
 * @access  Private (Admin only)
 */
export const getMembers = asyncHandler(async (req, res) => {
    const members = await MAKMember.findAll({
        where: { role: 'member' },
        include: [{ model: MAKDocument, as: 'Documents' }],
        order: [['createdAt', 'DESC']]
    });
    res.json(members);
});

/**
 * @desc    Get member details for dashboard
 * @route   GET /api/mak/members/profile
 * @access  Private (Member only)
 */
export const getMemberProfile = asyncHandler(async (req, res) => {
    const member = await MAKMember.findByPk(req.user.id, {
        include: [{ model: MAKDocument, as: 'Documents' }]
    });

    if (member) {
        res.json(member);
    } else {
        res.status(404).json({ message: "Member not found" });
    }
});

/**
 * @desc    Update member details
 * @route   PATCH /api/mak/members/:id
 * @access  Private (Admin/Member)
 */
export const updateMember = asyncHandler(async (req, res) => {
    const member = await MAKMember.findByPk(req.params.id);

    if (member) {
        // Handle basic fields
        const fields = ['fullName', 'occupation', 'gender', 'religion', 'dob', 'membershipType', 'email', 'phone', 'whatsapp', 'paymentAmount', 'address', 'isActive'];

        fields.forEach(key => {
            if (req.body[key] !== undefined) {
                member[key] = req.body[key];
            }
        });

        // Handle file updates
        if (req.files?.photo) {
            member.photo = `/${req.files.photo[0].path.replace(/\\/g, '/')}`;
        }
        if (req.files?.paymentReceipt) {
            member.paymentReceipt = `/${req.files.paymentReceipt[0].path.replace(/\\/g, '/')}`;
        }

        // Handle New Additional Documents
        if (req.files?.documents) {
            const { MAKDocument } = await import("../models/index.js");
            let docNamesArray = [];
            if (req.body.documentNames) {
                docNamesArray = Array.isArray(req.body.documentNames)
                    ? req.body.documentNames
                    : [req.body.documentNames];
            }

            const docPromises = req.files.documents.map((file, idx) => {
                const nameFromInput = docNamesArray[idx];
                const finalName = nameFromInput && nameFromInput.trim() !== ''
                    ? nameFromInput.trim()
                    : file.originalname.split('.')[0];

                return MAKDocument.create({
                    memberId: member.id,
                    documentName: finalName,
                    documentPath: `/${file.path.replace(/\\/g, '/')}`,
                    fileType: file.mimetype.split('/')[1]
                });
            });
            await Promise.all(docPromises);
        }

        const updatedMember = await member.save();
        res.json(updatedMember);
    } else {
        res.status(404).json({ message: "Member not found" });
    }
});

/**
 * @desc    Delete a member
 * @route   DELETE /api/mak/members/:id
 * @access  Private (Admin only)
 */
export const deleteMember = asyncHandler(async (req, res) => {
    const member = await MAKMember.findByPk(req.params.id);
    if (member) {
        await member.destroy();
        res.json({ message: "Member removed" });
    } else {
        res.status(404).json({ message: "Member not found" });
    }
});
/**
 * @desc    Resend welcome communication (WhatsApp/Email)
 * @route   POST /api/mak/members/resend-welcome/:id
 * @access  Private (Admin only)
 */
export const resendWelcome = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const member = await MAKMember.findByPk(id);

    if (!member) {
        return res.status(404).json({ message: "Member not found" });
    }

    // 1. WhatsApp Formatting
    let formattedWA = member.whatsapp || member.phone;
    formattedWA = formattedWA.replace(/\D/g, '');
    if (formattedWA.length === 10) {
        formattedWA = "91" + formattedWA;
    }

    // 2. Credentials
    const plainPassword = member.dob ? member.dob.replace(/-/g, '') : "password123";
    const loginUrl = process.env.FRONTEND_LOGIN_URL || "https://manavadhikarkendra.org/mak-login";

    const results = { whatsapp: false, email: false };

    // 3. Send WhatsApp
    try {
        const waMsg = getWelcomeWhatsAppTemplate(member.fullName, member.phone, loginUrl);
        await sendWhatsAppText(formattedWA, waMsg);

        // ALWAYS regenerate on resend to ensure design updates (stamp/watermark) apply
        const docs = await generateMAKMemberDocuments(member);
        if (docs) {
            member.idCardUrl = docs.idCardUrl;
            member.certificateUrl = docs.certificateUrl;
            await member.save();
        }

        // Helper to send file if it exists
        const sendFile = async (relativeBtnPath, caption) => {
            if (!relativeBtnPath) return;
            const cleanPath = relativeBtnPath.startsWith('/') ? relativeBtnPath.substring(1) : relativeBtnPath;
            const absolutePath = path.join(path.resolve(), cleanPath);
            if (fs.existsSync(absolutePath)) {
                await sendWhatsAppImage(formattedWA, caption, absolutePath);
            }
        };

        // ID Card
        if (member.idCardUrl) {
            await sendFile(member.idCardUrl, `Official Identity Card: ${member.fullName}`);
        }

        // Certificate
        if (member.certificateUrl) {
            await sendFile(member.certificateUrl, `Membership Certificate: ${member.fullName}`);
        }

        results.whatsapp = true;
    } catch (waErr) {
        console.error("Resend WA Error (Text/Docs):", waErr);
    }

    // 4. Send Email
    if (member.email) {
        try {
            await transporter.sendMail({
                from: `"MAK Team" <${process.env.SMTP_USER}>`,
                to: member.email,
                subject: "Reminder: Your Manav Adhikar Kendra Member Portal Access",
                html: getWelcomeEmailTemplate(member.fullName, member.phone, plainPassword, loginUrl)
            });
            results.email = true;
        } catch (mailErr) {
            console.error("Resend Email Error:", mailErr.message);
        }
    }

    res.json({
        message: "Communication resend attempt completed",
        results
    });
});


/**
 * @desc    Send ID Card manually via WhatsApp
 * @route   POST /api/mak/members/send-idcard/:id
 * @access  Private (Admin only)
 */
export const sendIDCardWhatsApp = asyncHandler(async (req, res) => {
    const member = await MAKMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    let formattedWA = member.whatsapp || member.phone;
    formattedWA = formattedWA.replace(/\D/g, '');
    if (formattedWA.length === 10) formattedWA = "91" + formattedWA;

    try {
        // ALWAYS regenerate manually to ensure latest template/data
        const docs = await generateMAKMemberDocuments(member);
        if (docs) {
            member.idCardUrl = docs.idCardUrl;
            member.certificateUrl = docs.certificateUrl;
            await member.save();
        }

        if (member.idCardUrl) {
            const idCardPath = path.join(path.resolve(), member.idCardUrl.startsWith('/') ? member.idCardUrl.substring(1) : member.idCardUrl);
            console.log("Attempting to send ID Card. Path:", idCardPath);
            if (fs.existsSync(idCardPath)) {
                const waRes = await sendWhatsAppImage(formattedWA, `Official Identity Card: ${member.fullName}`, idCardPath);
                console.log("WhatsApp Send ID Card Result:", waRes);
                return res.json({ success: true, message: "ID Card sent successfully" });
            } else {
                console.error("ID Card file not found on disk:", idCardPath);
                return res.status(404).json({ message: "ID Card file not found on server" });
            }
        } else {
            console.error("ID Card URL is missing for member:", member.id);
            return res.status(404).json({ message: "ID Card record not found" });
        }
    } catch (err) {
        console.error("sendIDCardWhatsApp ERROR:", err);
        res.status(500).json({ message: "Failed to send ID Card", error: err.message });
    }
});

/**
 * @desc    Send Certificate manually via WhatsApp
 * @route   POST /api/mak/members/send-certificate/:id
 * @access  Private (Admin only)
 */
export const sendCertificateWhatsApp = asyncHandler(async (req, res) => {
    const member = await MAKMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    let formattedWA = member.whatsapp || member.phone;
    formattedWA = formattedWA.replace(/\D/g, '');
    if (formattedWA.length === 10) formattedWA = "91" + formattedWA;

    try {
        // ALWAYS regenerate manually to ensure latest template/data
        const docs = await generateMAKMemberDocuments(member);
        if (docs) {
            member.idCardUrl = docs.idCardUrl;
            member.certificateUrl = docs.certificateUrl;
            await member.save();
        }

        if (member.certificateUrl) {
            const certPath = path.join(path.resolve(), member.certificateUrl.startsWith('/') ? member.certificateUrl.substring(1) : member.certificateUrl);
            console.log("Attempting to send Certificate. Path:", certPath);
            if (fs.existsSync(certPath)) {
                const waRes = await sendWhatsAppImage(formattedWA, `Membership Certificate: ${member.fullName}`, certPath);
                console.log("WhatsApp Send Certificate Result:", waRes);
                return res.json({ success: true, message: "Certificate sent successfully" });
            } else {
                console.error("Certificate file not found on disk:", certPath);
                return res.status(404).json({ message: "Certificate file not found on server" });
            }
        } else {
            console.error("Certificate URL is missing for member:", member.id);
            return res.status(404).json({ message: "Certificate record not found" });
        }
    } catch (err) {
        console.error("sendCertificateWhatsApp ERROR:", err);
        res.status(500).json({ message: "Failed to send Certificate", error: err.message });
    }
});
/**
 * @desc    Get public MAK members (No auth)
 * @route   GET /api/mak/members/public
 * @access  Public
 */
export const getPublicMembers = asyncHandler(async (req, res) => {
    const makMembers = await MAKMember.findAll({
        where: {
            isActive: true,
            role: 'member' // Explicitly only show members, not admins
        },
        attributes: [
            'id',
            'fullName',
            'photo',
            'membershipType',
            'address',
            'createdAt'
        ],
        order: [['createdAt', 'DESC']]
    });

    const normalized = makMembers.map(m => {
        const data = m.get({ plain: true });

        let city = "India";
        if (data.address && typeof data.address === 'string') {
            const parts = data.address.split(',');
            if (parts.length > 1) {
                city = parts[parts.length - 2].trim();
            }
        }

        return {
            id: data.id,
            full_name: data.fullName,
            profile_photo: data.photo,
            designation: data.membershipType,
            address: data.address,
            city,
            createdAt: data.createdAt,
            role: 'member'
        };
    });

    res.json(normalized);
});
