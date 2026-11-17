import { User } from "../models/index.js";
import { transporter } from "../config/mailer.js";
import { Op } from "sequelize";
import { getCompanyConfig } from "../config/company.js";

// Get active employees (admin/employee roles, is_active=true)
export const getActiveEmployees = async (req, res) => {
    try {
        const employees = await User.findAll({
            where: {
                role: { [Op.in]: ["employee", "admin", "super_admin"] },
                is_active: true,
            },
            attributes: [
                "id", "full_name", "email", "mobile", "designation",
                "joining_date", "gross_salary", "profile_photo"
            ],
            order: [["full_name", "ASC"]],
        });
        res.json(employees);
    } catch (error) {
        console.error("Error fetching active employees:", error);
        res.status(500).json({ message: "Failed to fetch employees", error: error.message });
    }
};

// Save offer letter record
export const saveOfferLetter = async (req, res) => {
    try {
        const { ERP_OfferLetter } = await import("../models/index.js");
        const { employee_id, employee_name, employee_email, designation, joining_date, annual_salary, responsibilities } = req.body;

        const record = await ERP_OfferLetter.create({
            employee_id,
            employee_name,
            employee_email,
            designation,
            joining_date,
            annual_salary,
            responsibilities,
            generated_by: req.user.id,
            status: "generated",
        });

        res.status(201).json({ success: true, message: "Offer letter saved", data: record });
    } catch (error) {
        console.error("Error saving offer letter:", error);
        res.status(500).json({ message: "Failed to save offer letter", error: error.message });
    }
};

// Send offer letter email
export const sendOfferLetterEmail = async (req, res) => {
    try {
        const { ERP_OfferLetter } = await import("../models/index.js");
        const { to, subject, htmlContent, employee_name, designation, joining_date, annual_salary, employee_id, pdfAttachment } = req.body;

        if (!to || !subject || !htmlContent) {
            return res.status(400).json({ success: false, message: "to, subject and htmlContent are required" });
        }

        const company = getCompanyConfig();

        // Professional email wrapper
        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); padding: 30px 40px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">${company.name}</h1>
                <p style="margin: 5px 0 0; color: #94a3b8; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Official Communication</p>
            </td>
        </tr>

        <!-- Body -->
        <tr>
            <td style="padding: 40px;">
                <p style="color: #334155; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
                    Dear <strong>${employee_name}</strong>,
                </p>
                <p style="color: #334155; font-size: 14px; line-height: 1.8; margin: 0 0 15px;">
                    Greetings from <strong>${company.name}!</strong>
                </p>
                <p style="color: #334155; font-size: 14px; line-height: 1.8; margin: 0 0 15px;">
                    We are pleased to share your <strong>Offer Letter</strong> for the position of <strong>${designation}</strong>. 
                    Please find the offer letter attached in this email as a detailed document.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                    <tr>
                        <td style="background: #f8fafc; padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Position</td>
                                    <td style="color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">${designation}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Joining Date</td>
                                    <td style="color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">${joining_date}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #f8fafc; padding: 15px 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Annual CTC</td>
                                    <td style="color: #16a34a; font-size: 14px; font-weight: 700; text-align: right;">₹${Number(annual_salary).toLocaleString("en-IN")} /year</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Action Required -->
                <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1px solid #fbbf24; border-radius: 12px; padding: 25px; margin: 25px 0;">
                    <h3 style="margin: 0 0 10px; color: #92400e; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">⚡ Action Required</h3>
                    <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.7;">
                        If you <strong>accept this offer</strong>, please <strong>print one copy of the offer letter, sign it</strong>, and 
                        <strong>reply to this email</strong> with the signed copy attached as confirmation of your acceptance. 
                        You may also bring the signed copy on your date of joining.
                    </p>
                </div>

                <p style="color: #334155; font-size: 14px; line-height: 1.8; margin: 15px 0;">
                    We are excited to have you on board and look forward to a productive and rewarding journey together.
                </p>
                <p style="color: #334155; font-size: 14px; line-height: 1.8; margin: 15px 0;">
                    For any queries, please feel free to reach out to us at 
                    <a href="mailto:${company.email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${company.email}</a>.
                </p>

                <p style="color: #334155; font-size: 14px; line-height: 1.8; margin: 30px 0 5px;">
                    Warm Regards,
                </p>
                <p style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 0;">
                    HR Department<br/>
                    <span style="color: #64748b; font-weight: 400; font-size: 12px;">${company.name}</span>
                </p>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="background: #0f172a; padding: 25px 40px; text-align: center;">
                <p style="margin: 0 0 5px; color: #94a3b8; font-size: 11px; font-weight: 600; letter-spacing: 1px;">
                    ${company.name}
                </p>
                <p style="margin: 0; color: #475569; font-size: 10px;">
                    This is an official communication. Please do not share this email with unauthorized persons.
                </p>
                <p style="margin: 8px 0 0; color: #475569; font-size: 9px;">
                    © ${new Date().getFullYear()} ${company.name}. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;

        const mailOptions = {
            from: `"${company.name}" <${process.env.DEFAULT_FROM_EMAIL}>`,
            to,
            subject,
            html: emailHtml,
            replyTo: company.email || "noreply@company.com",
            attachments: []
        };

        if (pdfAttachment) {
            // pdfAttachment is guaranteed to be pure base64 now
            mailOptions.attachments.push({
                filename: `Offer_Letter_${employee_name.replace(/\s/g, "_")}.pdf`,
                content: Buffer.from(pdfAttachment, 'base64'),
                contentType: 'application/pdf'
            });
        }

        await transporter.sendMail(mailOptions);

        // Update record status if we have employee_id
        if (employee_id) {
            try {
                const record = await ERP_OfferLetter.findOne({
                    where: { employee_id },
                    order: [["createdAt", "DESC"]],
                });
                if (record) {
                    await record.update({ status: "sent", sent_at: new Date() });
                }
            } catch (updateErr) {
                console.log("Record status update skipped:", updateErr.message);
            }
        }

        res.json({ success: true, message: "Offer letter sent successfully" });
    } catch (error) {
        console.error("Error sending offer letter email:", error);
        res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
    }
};

// Get all offer letter history
export const getOfferLetterHistory = async (req, res) => {
    try {
        const { ERP_OfferLetter } = await import("../models/index.js");
        const records = await ERP_OfferLetter.findAll({
            order: [["createdAt", "DESC"]],
            include: [
                { model: User, as: "Employee", attributes: ["full_name", "email", "profile_photo"] },
                { model: User, as: "GeneratedBy", attributes: ["full_name"] },
            ],
        });
        res.json(records);
    } catch (error) {
        console.error("Error fetching offer letter history:", error);
        res.status(500).json({ message: "Failed to fetch history", error: error.message });
    }
};

// Delete offer letter record
export const deleteOfferLetter = async (req, res) => {
    try {
        const { ERP_OfferLetter } = await import("../models/index.js");
        const record = await ERP_OfferLetter.findByPk(req.params.id);

        if (!record) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        await record.destroy();
        res.json({ success: true, message: "Record deleted successfully" });
    } catch (error) {
        console.error("Error deleting offer letter:", error);
        res.status(500).json({ success: false, message: "Failed to delete record", error: error.message });
    }
};
