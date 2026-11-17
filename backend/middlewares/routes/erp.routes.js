import express from "express";
import { protect as authenticate, adminOnly as authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
    getOfficeSettings, updateOfficeSettings,
    getHolidays, createHoliday, deleteHoliday,
    markIn, markOut, getEmployeeAttendance,
    getMyToDo, createToDo, updateToDoStatus,
    createWorkReport, getWorkReports,
    saveLocation, getEmployeeLiveLocations,
    generateSalarySheet, getPayrollReports
} from "../controllers/erpController.js";

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
 *               date: { type: string, format: date }
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
router.get("/track/live", authenticate, authorizeAdmin, getEmployeeLiveLocations);

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
router.post("/payroll/generate", authenticate, authorizeAdmin, generateSalarySheet);

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
router.get("/payroll/reports", authenticate, authorizeAdmin, getPayrollReports);

export default router;
