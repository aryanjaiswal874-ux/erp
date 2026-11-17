import express from "express";
import { protect as authenticate, adminOnly as authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
    getOfficeSettings, updateOfficeSettings,
    getHolidays, createHoliday, deleteHoliday,
    markIn, markOut, takeBreak, resumeWork, getEmployeeAttendance, getDailyAttendanceSummary, markAllAbsent, markAbsent,
    getMyToDo, createToDo, updateToDoStatus, updateToDoTask, deleteToDo,
    createWorkReport, getWorkReports, getWorkReportDates,
    saveLocation,
    generateSalarySheet, getPayrollReports, updatePayrollConfig, getMonthlyAttendanceSummary,
    getWhatsAppStatus, resetWhatsApp, checkTomorrowHoliday,
    getWAChats, getWAMessages, sendWASingleMessage,
    sendWAImage, sendWAMedia,
    sendWorkReportReminder, sendPunchOutReminder, autoPunchOut


} from "../controllers/erpController.js";
import { recordLocation, getLiveLocations, getHistoryByEmployee } from "../controllers/locationTrackingController.js";
import { superAdminOnly } from "../middlewares/authMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/whatsapp/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ERP
 *   description: HR & Operations (Attendance, Payroll, Tasks)
 */

/**
 * @swagger
 * /api/erp/office-settings:
 *   get:
 *     summary: Get office settings
 *     tags: [ERP]
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Update office settings
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               office_in_time: { type: string }
 *               office_out_time: { type: string }
 *               week_offs: { type: array, items: { type: string } }
 *     responses:
 *       200:
 *         description: OK
 */
// --- Office Settings ---
router.get("/office-settings", getOfficeSettings);
router.post("/office-settings", authenticate, authorizeAdmin, updateOfficeSettings);
router.get("/whatsapp/status", authenticate, authorizeAdmin, getWhatsAppStatus);

/**
 * @swagger
 * /api/erp/whatsapp/reset:
 *   post:
 *     summary: Reset/Logout WhatsApp Bot
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/whatsapp/reset", authenticate, authorizeAdmin, resetWhatsApp);
router.get("/whatsapp/chats", authenticate, authorizeAdmin, getWAChats);
router.get("/whatsapp/messages/:jid", authenticate, authorizeAdmin, getWAMessages);
router.post("/whatsapp/send", authenticate, authorizeAdmin, sendWASingleMessage);
router.post("/whatsapp/send-image", authenticate, authorizeAdmin, upload.single('image'), sendWAImage);
router.post("/whatsapp/send-media", authenticate, authorizeAdmin, upload.single('file'), sendWAMedia);



/**
 * @swagger
 * /api/erp/holidays:
 *   get:
 *     summary: Get all holidays
 *     tags: [ERP]
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Create a holiday
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               from_date: { type: string, format: date }
 *               to_date: { type: string, format: date }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: OK
 */
router.get("/holidays", getHolidays);
router.post("/holidays", authenticate, authorizeAdmin, createHoliday);

/**
 * @swagger
 * /api/erp/holidays/{id}:
 *   delete:
 *     summary: Delete a holiday
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/holidays/:id", authenticate, authorizeAdmin, deleteHoliday);

/**
 * @swagger
 * /api/erp/holidays/check-tomorrow:
 *   get:
 *     summary: Public API to check holiday for tomorrow and notify on WhatsApp (CRON)
 *     tags: [ERP]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/holidays/check-tomorrow", checkTomorrowHoliday);

/**
 * @swagger
 * /api/erp/attendance/in:
 *   post:
 *     summary: Mark attendance In
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location: { type: string }
 *               photo: { type: string }
 *     responses:
 *       201:
 *         description: Marked in
 *       403:
 *         description: Late entry not allowed
 */
router.post("/attendance/in", authenticate, markIn);

/**
 * @swagger
 * /api/erp/attendance/out:
 *   post:
 *     summary: Mark attendance Out
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Marked out
 *       403:
 *         description: Early exit not allowed
 */
router.post("/attendance/out", authenticate, markOut);
router.post("/attendance/break", authenticate, takeBreak);
router.post("/attendance/resume", authenticate, resumeWork);

/**
 * @swagger
 * /api/erp/attendance/history:
 *   get:
 *     summary: Get attendance history
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         schema: { type: string }
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: List of attendances
 */
router.get("/attendance/history", authenticate, getEmployeeAttendance);
router.get("/attendance/daily", authenticate, getDailyAttendanceSummary);
router.get("/attendance/mark-absent", authenticate, authorizeAdmin, markAbsent);
router.get("/attendance/mark-absent-all", markAllAbsent); // Public for CRON

/**
 * @swagger
 * /api/erp/todo:
 *   get:
 *     summary: Get My Todos
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: List of todos
 *   post:
 *     summary: Create ToDo
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task: { type: string }
 *               date: { type: string }
 *     responses:
 *       201:
 *         description: ToDo created
 */
// --- ToDo ---
router.get("/todo", authenticate, getMyToDo);
router.post("/todo", authenticate, createToDo);

/**
 * @swagger
 * /api/erp/todo/{id}:
 *   put:
 *     summary: Update ToDo Status
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string }
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/todo/:id", authenticate, updateToDoStatus);
router.put("/todo/:id/edit", authenticate, updateToDoTask);
router.delete("/todo/:id", authenticate, deleteToDo);

/**
 * @swagger
 * /api/erp/work-report:
 *   post:
 *     summary: Create daily work report
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               report_content: { type: string }
 *               date: { type: string }
 *     responses:
 *       201:
 *         description: Report added
 *   get:
 *     summary: Get work reports
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         schema: { type: string }
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Work reports list
 */
// --- Work Reports ---
router.post("/work-report", authenticate, createWorkReport);
router.get("/work-report", authenticate, getWorkReports);
router.get("/work-report/dates", authenticate, getWorkReportDates);

/**
 * @swagger
 * /api/erp/track/location:
 *   post:
 *     summary: Save employee location periodically
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude: { type: number }
 *               longitude: { type: number }
 *               address: { type: string }
 *     responses:
 *       201:
 *         description: Location saved
 */
// --- Tracking ---
router.post("/track/location", authenticate, saveLocation);

/**
 * @swagger
 * /api/erp/track/live:
 *   get:
 *     summary: Get live locations
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Live locations
 */
router.get("/track/live", authenticate, authorizeAdmin);

/**
 * @swagger
 * /api/erp/payroll/generate:
 *   post:
 *     summary: Generate salary sheet
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month: { type: string }
 *     responses:
 *       200:
 *         description: Payroll generated
 */
// --- Payroll ---
router.post("/payroll/generate", authenticate, superAdminOnly, generateSalarySheet);

/**
 * @swagger
 * /api/erp/payroll/reports:
 *   get:
 *     summary: Get payroll reports
 *     tags: [ERP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Payroll lists
 */
router.get("/payroll/reports", authenticate, superAdminOnly, getPayrollReports);
router.get("/attendance/monthly-summary", authenticate, authorizeAdmin, getMonthlyAttendanceSummary);
router.put("/payroll/config/:id", authenticate, superAdminOnly, updatePayrollConfig);

// --- Location Tracking (Enhanced - From DigiTrand Style) ---
router.post("/location-tracking/record", authenticate, recordLocation);
router.get("/location-tracking/live", authenticate, superAdminOnly, getLiveLocations);
router.get("/location-tracking/history/:employee_id/date/:date", authenticate, superAdminOnly, getHistoryByEmployee);
/**
 * @swagger
 * /api/erp/attendance/public/mark-all-absent:
 *   get:
 *     summary: Public API to mark all employees without attendance as absent (CRON)
 *     tags: [ERP]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/attendance/public/mark-all-absent", markAllAbsent);

// --- Automated Notifications & Cron Jobs (Public) ---

/**
 * @swagger
 * /api/erp/notify/work-report-reminder:
 *   get:
 *     summary: Public API to send WhatsApp reminders to employees for work report submission (CRON)
 *     tags: [ERP]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/notify/work-report-reminder", sendWorkReportReminder);

/**
 * @swagger
 * /api/erp/notify/punch-out-reminder:
 *   get:
 *     summary: Public API to send WhatsApp reminders for Punch-Out (CRON)
 *     tags: [ERP]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/notify/punch-out-reminder", sendPunchOutReminder);

/**
 * @swagger
 * /api/erp/notify/auto-punch-out:
 *   get:
 *     summary: Public API to automatically punch out all active employees (CRON)
 *     tags: [ERP]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/notify/auto-punch-out", autoPunchOut);

export default router;
