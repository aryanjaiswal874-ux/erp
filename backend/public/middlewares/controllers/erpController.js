import { ERP_Attendance, ERP_OfficeSetting, ERP_ToDo, ERP_WorkReport, ERP_Payroll, ERP_EmployeeLocation, ERP_Holiday, User, Lead } from "../models/index.js";
import { Op } from "sequelize";
import { sendWhatsAppText, sendWhatsAppImage } from "../utils/whatsappService.js";
import path from "path";
import moment from "moment";

// --- Office Settings ---
export const getOfficeSettings = async (req, res) => {
    try {
        let settings = await ERP_OfficeSetting.findOne();
        if (!settings) {
            settings = await ERP_OfficeSetting.create({
                office_in_time: "09:00:00",
                office_out_time: "18:00:00",
                holidays: [],
                week_offs: ["Sunday"]
            });
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOfficeSettings = async (req, res) => {
    try {
        const { office_in_time, office_out_time, holidays, week_offs } = req.body;
        let settings = await ERP_OfficeSetting.findOne();
        if (settings) {
            await settings.update({ office_in_time, office_out_time, holidays, week_offs });
        } else {
            settings = await ERP_OfficeSetting.create({ office_in_time, office_out_time, holidays, week_offs });
        }
        res.status(200).json({ message: "Settings updated", settings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Holidays ---
export const getHolidays = async (req, res) => {
    try {
        const holidays = await ERP_Holiday.findAll({ order: [['date', 'ASC']] });
        res.status(200).json(holidays);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createHoliday = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const holiday = await ERP_Holiday.create({ title, date, description });
        res.status(201).json(holiday);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteHoliday = async (req, res) => {
    try {
        const { id } = req.params;
        await ERP_Holiday.destroy({ where: { id } });
        res.status(200).json({ message: "Holiday deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Attendance ---
export const markIn = async (req, res) => {
    try {
        const { location, photo } = req.body;
        const employee_id = req.user.id;
        const today = moment().format("YYYY-MM-DD");
        const now = moment().format("HH:mm:ss");

        // 1. Check office timing restriction
        const settings = await ERP_OfficeSetting.findOne();
        if (settings) {
            const officeIn = settings.office_in_time;
            // "office time suru hone ke abad ... not possible"
            // Means if now > officeIn, it's late, so block.
            if (moment(now, "HH:mm:ss").isAfter(moment(officeIn, "HH:mm:ss"))) {
                return res.status(403).json({ message: `Access Denied: Office started at ${officeIn}. Late entry not allowed.` });
            }
        }

        // 2. Check if already marked
        const existing = await ERP_Attendance.findOne({ where: { employee_id, date: today } });
        if (existing) {
            return res.status(400).json({ message: "Already marked in for today" });
        }

        // 3. Create record
        const attendance = await ERP_Attendance.create({
            employee_id,
            date: today,
            in_time: now,
            current_work_status: "start",
            status: "present",
            location,
            photo
        });

        // 4. WhatsApp Notification to Admin (ID 1)
        // Find Admin with ID 1 (Assuming UUID here, mapping to logical first admin)
        // Actually the user said "id - 1 wale user", so if the ID is auto-incremented in DB, I'll filter by that.
        // But our User model uses UUID. I'll search for first super_admin or user with ID 1 if possible.
        // For production, I'll assume it's a specific mobile number or we search by role.
        const admin = await User.findOne({ where: { role: 'super_admin' } }); // Or hardcoded mobile in .env
        if (admin && admin.mobile && photo) {
            const absolutePath = path.join(process.cwd(), photo.startsWith("/") ? photo.substring(1) : photo);
            const caption = `📢 *Attendance Alert: MARK-IN*\n\n*Name:* ${req.user.full_name}\n*In Time:* ${now}\n*Location:* ${location}\n*Date:* ${today}`;
            await sendWhatsAppImage(admin.mobile, caption, absolutePath);
        }

        res.status(201).json({ message: "Marked in successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const markOut = async (req, res) => {
    try {
        const employee_id = req.user.id;
        const today = moment().format("YYYY-MM-DD");
        const now = moment().format("HH:mm:ss");

        const attendance = await ERP_Attendance.findOne({ where: { employee_id, date: today } });
        if (!attendance) return res.status(404).json({ message: "No active session found for today" });
        if (attendance.current_work_status === "stop") return res.status(400).json({ message: "Already marked out" });

        // Check office timing restriction: "office time khatam hone se pahle ... not possible"
        const settings = await ERP_OfficeSetting.findOne();
        if (settings) {
            const officeOut = settings.office_out_time;
            if (moment(now, "HH:mm:ss").isBefore(moment(officeOut, "HH:mm:ss"))) {
                return res.status(403).json({ message: `Access Denied: Office ends at ${officeOut}. Early exit not allowed.` });
            }
        }

        // Calculate work hours
        const duration = moment.duration(moment(now, "HH:mm:ss").diff(moment(attendance.in_time, "HH:mm:ss")));
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const total_work_hours = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;

        await attendance.update({
            out_time: now,
            current_work_status: "stop",
            total_work_hours
        });

        // WhatsApp to Admin
        const admin = await User.findOne({ where: { role: 'super_admin' } });
        if (admin && admin.mobile) {
            const caption = `📢 *Attendance Alert: MARK-OUT*\n\n*Name:* ${req.user.full_name}\n*In Time:* ${attendance.in_time}\n*Out Time:* ${now}\n*Total Hours:* ${total_work_hours}\n*Date:* ${today}`;
            await sendWhatsAppText(admin.mobile, caption);
        }

        res.status(200).json({ message: "Marked out successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmployeeAttendance = async (req, res) => {
    try {
        const { employee_id, startDate, endDate } = req.query;
        let where = {};
        if (employee_id) where.employee_id = employee_id;
        else if (req.user.role === 'employee') where.employee_id = req.user.id;

        if (startDate && endDate) {
            where.date = { [Op.between]: [startDate, endDate] };
        }

        const data = await ERP_Attendance.findAll({
            where,
            include: [{ model: User, attributes: ['full_name', 'designation'] }],
            order: [['date', 'DESC']]
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ToDo List ---
export const getMyToDo = async (req, res) => {
    try {
        const { date } = req.query;
        const where = { employee_id: req.user.id };
        if (date) where.date = date;
        const tasks = await ERP_ToDo.findAll({ where, order: [['createdAt', 'DESC']] });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createToDo = async (req, res) => {
    try {
        const { task, date } = req.body;
        const newTask = await ERP_ToDo.create({
            employee_id: req.user.id,
            task,
            date: date || moment().format("YYYY-MM-DD")
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateToDoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = await ERP_ToDo.findOne({ where: { id, employee_id: req.user.id } });
        if (!task) return res.status(404).json({ message: "Task not found" });
        await task.update({ status });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Work Reports ---
export const createWorkReport = async (req, res) => {
    try {
        const { report_content, date } = req.body;
        const report = await ERP_WorkReport.create({
            employee_id: req.user.id,
            date: date || moment().format("YYYY-MM-DD"),
            report_content
        });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getWorkReports = async (req, res) => {
    try {
        const { employee_id, date } = req.query;
        const where = {};
        if (employee_id) where.employee_id = employee_id;
        else if (req.user.role === 'employee') where.employee_id = req.user.id;
        if (date) where.date = date;

        const reports = await ERP_WorkReport.findAll({
            where,
            include: [{ model: User, attributes: ['full_name', 'designation'] }],
            order: [['date', 'DESC']]
        });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Tracking ---
export const saveLocation = async (req, res) => {
    try {
        const { latitude, longitude, address } = req.body;
        const loc = await ERP_EmployeeLocation.create({
            employee_id: req.user.id,
            latitude,
            longitude,
            address
        });
        res.status(201).json(loc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmployeeLiveLocations = async (req, res) => {
    try {
        // Get the latest location of each active employee
        const locations = await ERP_EmployeeLocation.findAll({
            include: [{ model: User, attributes: ['id', 'full_name', 'designation', 'profile_photo'] }],
            order: [['timestamp', 'DESC']],
            // This is a simplified "latest", in real we might want to grouping
        });
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Payroll ---
export const generateSalarySheet = async (req, res) => {
    try {
        const { month } = req.body; // e.g., "April 2026"
        const employees = await User.findAll({ where: { role: 'employee' } });
        const results = [];

        for (const emp of employees) {
            // Find attendance for this month
            const monthStart = moment(month, "MMMM YYYY").startOf('month').format("YYYY-MM-DD");
            const monthEnd = moment(month, "MMMM YYYY").endOf('month').format("YYYY-MM-DD");

            const presentCount = await ERP_Attendance.count({
                where: {
                    employee_id: emp.id,
                    date: { [Op.between]: [monthStart, monthEnd] },
                    status: 'present'
                }
            });

            // Calculate salary (simplified: gross / 30 * present)
            // In a real app, you'd check Setting.js for gross salary or emp.salary
            const gross = emp.bank_details?.gross_salary || 20000; // Default
            const earned = (gross / 30) * presentCount;
            const net = earned; // assuming 0 deductions for now

            const payroll = await ERP_Payroll.upsert({
                employee_id: emp.id,
                month,
                gross_salary: gross,
                total_present: presentCount,
                earned_salary: earned,
                deductions: 0,
                net_payable: net
            });

            results.push({ employee: emp.full_name, presentCount, earned, net });
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPayrollReports = async (req, res) => {
    try {
        const { month } = req.query;
        const where = {};
        if (month) where.month = month;
        const data = await ERP_Payroll.findAll({
            where,
            include: [{ model: User, attributes: ['full_name', 'designation', 'bank_details'] }],
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
