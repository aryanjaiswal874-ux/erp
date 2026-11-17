import cron from "node-cron";
import moment from "moment";
import { Op } from "sequelize";
import { User, ERP_OfficeSetting, ERP_Attendance, ERP_Holiday, Lead } from "../models/index.js";
import { sendWhatsAppToJID, sendWhatsAppText } from "./whatsappService.js";

// Run every minute
const initCronJobs = () => {
    cron.schedule("* * * * *", async () => {
        try {
            const settings = await ERP_OfficeSetting.findOne();
            if (!settings || !settings.absent_notification_enabled || !settings.absent_notification_time) {
                return;
            }

            const nowTime = moment().format("HH:mm");
            const notifyTime = moment(settings.absent_notification_time, "HH:mm:ss").format("HH:mm");

            // Only trigger exactly at the specified minute
            if (nowTime !== notifyTime) {
                return;
            }

            console.log(`⏰ Triggering Absent Notification Check for ${nowTime}...`);
            const today = moment().format("YYYY-MM-DD");
            const dayName = moment().format("dddd");

            // 1. Check if today is a Holiday
            const holiday = await ERP_Holiday.findOne({
                where: {
                    from_date: { [Op.lte]: today },
                    to_date: { [Op.gte]: today },
                    is_active: true
                }
            });

            if (holiday) {
                console.log("Today is a holiday, skipping absent notifications.");
                return;
            }

            // 2. Fetch all active employees
            const employees = await User.findAll({
                where: {
                    role: { [Op.in]: ['admin', 'employee', 'super_admin'] },
                    is_active: true
                }
            });

            // 3. Get all attendances for today
            const attendances = await ERP_Attendance.findAll({
                where: { date: today }
            });
            const attendedEmpIds = attendances.map(a => a.employee_id.toString());

            let absentees = [];

            // 4. Check who is missing
            for (const emp of employees) {
                // Check week_offs (Employee specific or Global)
                let weekOffs = emp.week_offs || settings.week_offs || ["Sunday"];
                
                // If today is a week off for this employee, skip them
                if (weekOffs.includes(dayName)) {
                    continue;
                }

                if (!attendedEmpIds.includes(emp.id.toString())) {
                    absentees.push(emp.full_name);
                }
            }

            if (absentees.length > 0 && settings.whatsapp_group_jid) {
                const displayDate = moment(today).format("DD MMMM YYYY (dddd)");
                let msg = `⚠️ *Absent Notification*\n\n📅 *Date:* ${displayDate}\n🕒 *Time Check:* ${moment().format("hh:mm A")}\n\n*The following employees have not marked their attendance today:*\n`;
                
                absentees.forEach((name, index) => {
                    msg += `${index + 1}. ${name}\n`;
                });

                await sendWhatsAppToJID(settings.whatsapp_group_jid, msg);
                console.log(`✅ Absent Notification sent to WhatsApp for ${absentees.length} employees.`);
            } else {
                console.log("No absentees to notify or WhatsApp group not configured.");
            }

        } catch (error) {
            console.error("❌ Cron Job Error (Absent Notification):", error.message);
        }
    });

    // Lead Follow-up Reminder Cron (Runs every minute)
    cron.schedule("* * * * *", async () => {
        try {
            const now = new Date();
            const leadsToFollowUp = await Lead.findAll({
                where: {
                    followup_required: true,
                    followup_notified: false,
                    followup_date: {
                        [Op.lte]: now,
                        [Op.ne]: null
                    }
                },
                include: [{ model: User, as: 'Assignee' }] // Ensure we have assignee details
            });

            if (leadsToFollowUp.length > 0) {
                const settings = await ERP_OfficeSetting.findOne();
                const adminNumber = settings ? settings.admin_whatsapp_number : null;

                for (const lead of leadsToFollowUp) {
                    let message = `⏰ *Follow-up Reminder*\n\n`;
                    message += `*Lead Name:* ${lead.name}\n`;
                    message += `*Contact:* ${lead.contact}\n`;
                    message += `*Time:* ${moment(lead.followup_date).format('hh:mm A, DD MMM YYYY')}\n\n`;
                    message += `Please follow up with this lead immediately.`;

                    // Send to admin
                    if (adminNumber) {
                        await sendWhatsAppText(adminNumber, message);
                    }

                    // Send to assigned user if they have a mobile number
                    if (lead.Assignee && lead.Assignee.mobile) {
                        await sendWhatsAppText(lead.Assignee.mobile, message);
                    }

                    // Mark as notified
                    await lead.update({ followup_notified: true });
                }
                console.log(`✅ Sent follow-up reminders for ${leadsToFollowUp.length} leads.`);
            }
        } catch (error) {
            console.error("❌ Cron Job Error (Lead Follow-up):", error.message);
        }
    });

    console.log("✅ Cron jobs initialized.");
};

export default initCronJobs;
