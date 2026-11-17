import express from "express";
import { transporter } from "../config/mailer.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { User, Partner, Lead } from "../models/index.js";
import { Op } from "sequelize";

const router = express.Router();

/**
 * @swagger
 * /api/mail/send:
 *   post:
 *     summary: Send Email
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - body
 *             properties:
 *               fromName:
 *                 type: string
 *                 example: Notifications
 *               to:
 *                 type: string
 *                 example: user@gmail.com
 *               cc:
 *                 type: string
 *               bcc:
 *                 type: string
 *               subject:
 *                 type: string
 *                 example: Welcome Email
 *               body:
 *                 type: string
 *                 example: "<h1>Hello</h1><p>Welcome to SBGM</p>"
 *     responses:
 *       200:
 *         description: Email sent successfully
 */
router.post("/send", async (req, res) => {
  try {
    const { fromName, to, cc, bcc, subject, body } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({
        success: false,
        message: "to, subject and body are required",
      });
    }

    const mailOptions = {
      from: `"${fromName || "SBGM Digital India PVT LTD."}" <${process.env.DEFAULT_FROM_EMAIL}>`,
      to,
      subject,
      html: body,
      replyTo: "sbgmdigitalindiapvtltd@gmail.com"
    };

    if (cc) mailOptions.cc = cc;
    if (bcc) mailOptions.bcc = bcc;

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Mail sending failed",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/mail/broadcast:
 *   post:
 *     summary: Broadcast Email to Multiple Users (Admin Only)
 *     tags: [Mail]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - message
 *               - targetGroup
 *             properties:
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               targetGroup:
 *                 type: string
 *                 enum: [all, users, partners, individual]
 *               individualEmails:
 *                 type: array
 *                 items:
 *                   type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Broadcast sent successfully
 */
router.post("/broadcast", protect, adminOnly, async (req, res) => {
  try {
    const { subject, message, targetGroup, individualEmails, imageUrl } = req.body;

    if (!subject || !message || !targetGroup) {
      return res.status(400).json({
        success: false,
        message: "subject, message and targetGroup are required",
      });
    }

    let recipients = [];

    // Get recipients based on target group
    if (targetGroup === "all") {
      const users = await User.findAll({ attributes: ["email", "full_name"] });
      const leads = await Lead.findAll({ attributes: ["email", "name"], where: { email: { [Op.ne]: null } } });
      recipients = [
        ...users.map(u => ({ email: u.email, name: u.full_name })),
        ...leads.map(l => ({ email: l.email, name: l.name }))
      ];
    } else if (targetGroup === "leads") {
      const leads = await Lead.findAll({ attributes: ["email", "name"], where: { email: { [Op.ne]: null } } });
      recipients = leads.map(l => ({ email: l.email, name: l.name }));
    } else if (targetGroup === "users") {
      const users = await User.findAll({
        where: { role: "user" },
        attributes: ["email", "full_name"]
      });
      recipients = users.map(u => ({ email: u.email, name: u.full_name }));
    } else if (targetGroup === "partners") {
      const partners = await Partner.findAll({
        where: { status: "Approved" },
        include: [{ model: User, attributes: ["email", "full_name"] }]
      });
      recipients = partners.map(p => ({ email: p.User?.email, name: p.User?.full_name })).filter(r => r.email);
    } else if (targetGroup === "partner_customers") {
      const { Customer } = await import("../models/index.js");
      const customers = await Customer.findAll({
        where: req.body.partnerId ? { partnerId: req.body.partnerId } : {},
        attributes: ["email", "full_name"]
      });
      recipients = customers.map(c => ({ email: c.email, name: c.full_name }));
    } else if (targetGroup === "individual" && individualEmails?.length > 0) {
      recipients = individualEmails.map(email => ({ email, name: "" }));
    }

    if (recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No recipients found for the selected group",
      });
    }

    // Create HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
            <td style="background: linear-gradient(135deg, #ff743d 0%, #f59e0b 100%); padding: 30px; text-align: center;">
              <img src="https://sbgmdigital.com/logo.png" alt="SBGM" style="height: 50px; margin-bottom: 10px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">${subject}</h1>
            </td>
          </tr>
          
          <!-- Image (if provided) -->
          ${imageUrl ? `
          <tr>
            <td style="padding: 20px;">
              <img src="${imageUrl}" alt="Banner" style="width: 100%; height: auto; border-radius: 8px;" />
            </td>
          </tr>
          ` : ''}
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <div style="color: #334155; font-size: 15px; line-height: 1.7;">
                ${message}
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 25px; text-align: center;">
              <p style="margin: 0 0 10px; color: #94a3b8; font-size: 12px;">
                SBGM Digital India Pvt. Ltd.
              </p>
              <p style="margin: 0; color: #64748b; font-size: 11px;">
                © ${new Date().getFullYear()} All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send emails in batches to avoid rate limiting
    let sentCount = 0;
    let failedCount = 0;

    for (const recipient of recipients) {
      try {
        await transporter.sendMail({
          from: `"SBGM Digital India" <${process.env.DEFAULT_FROM_EMAIL}>`,
          to: recipient.email,
          subject: subject,
          html: htmlTemplate,
          replyTo: "sbgmdigitalindiapvtltd@gmail.com"
        });
        sentCount++;
      } catch (emailError) {
        console.error(`Failed to send to ${recipient.email}:`, emailError.message);
        failedCount++;
      }
    }

    res.json({
      success: true,
      message: `Broadcast completed`,
      stats: {
        total: recipients.length,
        sent: sentCount,
        failed: failedCount
      }
    });
  } catch (error) {
    console.error("Broadcast error:", error);
    res.status(500).json({
      success: false,
      message: "Broadcast failed",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/mail/recipients:
 *   get:
 *     summary: Get all users for email selection (Admin Only)
 *     tags: [Mail]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/recipients", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "full_name", "role"],
      order: [["full_name", "ASC"]]
    });

    const partners = await Partner.findAll({
      where: { status: "Approved" },
      include: [{ model: User, attributes: ["id", "email", "full_name"] }]
    });

    const leads = await Lead.findAll({
      attributes: ["id", "email", "name", "contact"],
      where: { email: { [Op.ne]: null } }
    });

    res.json({
      users: users.filter(u => u.role === "user"),
      partners: partners.map(p => p.User).filter(Boolean),
      leads: leads.map(l => ({ id: l.id, email: l.email, full_name: l.name, role: 'lead' })),
      all: users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

