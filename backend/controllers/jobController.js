import { Job, Application } from "../models/index.js";

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private/Admin
export const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all active jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({ where: { is_active: true } });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: "Job not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private/Admin
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (job) {
            await job.update(req.body);
            res.json(job);
        } else {
            res.status(404).json({ message: "Job not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (job) {
            await job.destroy();
            res.json({ message: "Job removed" });
        } else {
            res.status(404).json({ message: "Job not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit application
// @route   POST /api/jobs/:id/apply
// @access  Public
export const applyForJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const applicationData = {
            ...req.body,
            jobId,
            userId: req.user ? req.user.id : null,
            resume_url: req.file ? `/uploads/${req.file.filename}` : req.body.resume_url,
        };

        const application = await Application.create(applicationData);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all applications
// @route   GET /api/jobs/applications
// @access  Private/Admin
export const getApplications = async (req, res) => {
    try {
        const applications = await Application.findAll({
            include: [{ model: Job, attributes: ["title"] }],
        });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update application status
// @route   PUT /api/jobs/applications/:id
// @access  Private/Admin
export const updateApplicationStatus = async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.id);
        if (application) {
            application.status = req.body.status;
            await application.save();
            res.json(application);
        } else {
            res.status(404).json({ message: "Application not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
