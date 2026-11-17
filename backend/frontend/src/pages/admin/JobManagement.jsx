import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import {
    CheckCircle,
    XCircle,
    Plus,
    Edit,
    Trash2,
    Save,
    MapPin,
    Briefcase,
    Users,
    Eye,
    Loader2,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import DashboardLoader from "../../components/layout/DashboardLoader";
import DataTable from "../../components/shared/DataTable";

const JobManagement = () => {
    const { user } = useAuth();
    const toast = useToast();
    const isSuperAdmin = user?.role === "super_admin";
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [activeTab, setActiveTab] = useState("postings");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [currentJob, setCurrentJob] = useState({
        title: "",
        description: "",
        department: "",
        location: "",
        job_type: "Full-Time",
        experience: "",
        is_active: true,
    });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "postings") {
                const { data } = await API.get("/careers");
                setJobs(data);
            } else {
                const { data } = await API.get("/careers/applications");
                setApplications(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleJobSave = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editMode) {
                await API.put(`/careers/${currentJob.id}`, currentJob);
            } else {
                await API.post("/careers", currentJob);
            }
            setShowModal(false);
            fetchData();
            toast.success(`Job ${editMode ? "updated" : "posted"} successfully`);
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    const handleJobDelete = async (id) => {
        if (window.confirm("Permanently archive this job posting?")) {
            try {
                await API.delete(`/careers/${id}`);
                fetchData();
                toast.success("Job archived");
            } catch (error) {
                toast.error("Archive failed");
            }
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await API.put(`/careers/applications/${id}`, { status });
            fetchData();
            toast.success(`Status updated to ${status}`);
        } catch (error) {
            toast.error("Status update failed");
        }
    };

    if (loading && jobs.length === 0 && applications.length === 0)
        return <DashboardLoader loading={true} title="Recruitment Hub" />;

    const jobColumns = [
        {
            header: "Status",
            key: "is_active",
            render: (row) => (
                <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${row.is_active
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                >
                    {row.is_active ? "Active" : "Archived"}
                </span>
            ),
        },
        {
            header: "Job Title",
            key: "title",
            sortable: true,
            render: (row) => (
                <div>
                    <div className="text-slate-900 font-bold">{row.title}</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">
                        {row.department} • {row.job_type}
                    </div>
                </div>
            ),
        },
        {
            header: "Location",
            key: "location",
            render: (row) => (
                <div className="text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <MapPin size={10} /> {row.location}
                    </div>
                </div>
            ),
        },
        {
            header: "Actions",
            key: "actions",
            render: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setEditMode(true);
                            setCurrentJob(row);
                            setShowModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-all"
                        title="Edit Posting"
                    >
                        <Edit size={14} />
                    </button>
                    {isSuperAdmin && (
                        <button
                            onClick={() => handleJobDelete(row.id)}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-all"
                            title="Delete Posting"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            ),
        },
    ];

    const applicationColumns = [
        {
            header: "Candidate",
            key: "full_name",
            sortable: true,
            render: (row) => (
                <div>
                    <div className="text-slate-900 font-bold">{row.full_name}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{row.email}</div>
                </div>
            ),
        },
        {
            header: "Applied For",
            key: "jobTitle",
            render: (row) => (
                <div className="text-xs font-medium text-slate-600">
                    {row.Job?.title || "General Application"}
                </div>
            ),
        },
        {
            header: "Status",
            key: "status",
            sortable: true,
            render: (row) => (
                <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${row.status === "New"
                        ? "text-blue-600 border-blue-100 bg-blue-50"
                        : row.status === "Shortlisted"
                            ? "text-emerald-600 border-emerald-100 bg-emerald-50"
                            : row.status === "Rejected"
                                ? "text-rose-600 border-rose-100 bg-rose-50"
                                : "text-slate-500 border-slate-100 bg-slate-50"
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            header: "Resume",
            key: "resume_url",
            render: (row) => (
                <a
                    href={`${import.meta.env.VITE_API_BASE_URL_IMG}${row.resume_url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-all flex items-center gap-1 w-fit"
                    title="View Resume"
                >
                    <Eye size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">View</span>
                </a>
            ),
        },
        {
            header: "Update",
            key: "actions",
            render: (row) => (
                <select
                    onChange={(e) => handleStatusUpdate(row.id, e.target.value)}
                    value={row.status}
                    className="bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-wider rounded px-1.5 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-sm"
                >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                </select>
            ),
        },
    ];

    return (
        <div className="space-y-4 pb-20 font-sans">
            {/* Professional Header */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm gap-4">
                <div>
                    <h1 className="text-lg font-bold text-slate-800">Careers & Hiring</h1>
                    <p className="text-[10px] font-medium text-slate-500">
                        Manage job postings and track incoming applications.
                    </p>
                </div>
                {activeTab === "postings" && (
                    <button
                        onClick={() => {
                            setEditMode(false);
                            setCurrentJob({
                                title: "",
                                description: "",
                                department: "",
                                location: "",
                                job_type: "Full-Time",
                                experience: "",
                                is_active: true,
                            });
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all rounded-lg shadow-md"
                    >
                        <Plus size={14} /> New Posting
                    </button>
                )}
            </div>

            {/* Modern Tabs */}
            <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit shadow-inner border border-slate-200">
                {[
                    { id: "postings", label: "Jobs", icon: Briefcase },
                    { id: "applications", label: "Applicants", icon: Users },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 ${activeTab === tab.id
                            ? "bg-slate-900 text-white shadow-lg"
                            : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-700"
                            }`}
                    >
                        <tab.icon size={12} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="animate-in fade-in duration-500">
                {activeTab === "postings" ? (
                    <DataTable
                        columns={jobColumns}
                        data={jobs}
                        fileName="Job_Postings"
                        pageSize={10}
                    />
                ) : (
                    <DataTable
                        columns={applicationColumns}
                        data={applications}
                        fileName="Job_Applications"
                        pageSize={10}
                    />
                )}
            </div>

            {/* Job Posting Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-100 rounded-xl w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-base font-bold text-slate-800">
                                {editMode ? "Edit Job Posting" : "Create New Job Posting"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                                disabled={submitting}
                            >
                                <XCircle size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleJobSave} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wide">
                                        Job Title
                                    </label>
                                    <div className="relative">
                                        <Briefcase
                                            size={14}
                                            className="absolute left-3 top-3 text-slate-400"
                                        />
                                        <input
                                            required
                                            type="text"
                                            value={currentJob.title}
                                            onChange={(e) =>
                                                setCurrentJob({ ...currentJob, title: e.target.value })
                                            }
                                            className="w-full border border-slate-200 rounded-lg pl-9 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                            placeholder="e.g. Senior Marketing Manager"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wide">
                                        Department
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={currentJob.department}
                                        onChange={(e) =>
                                            setCurrentJob({
                                                ...currentJob,
                                                department: e.target.value,
                                            })
                                        }
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                        placeholder="e.g. Marketing"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wide">
                                        Employment Type
                                    </label>
                                    <select
                                        value={currentJob.job_type}
                                        onChange={(e) =>
                                            setCurrentJob({ ...currentJob, job_type: e.target.value })
                                        }
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                                    >
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Remote">Remote</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wide">
                                        Description
                                    </label>
                                    <textarea
                                        required
                                        rows="4"
                                        value={currentJob.description}
                                        onChange={(e) =>
                                            setCurrentJob({
                                                ...currentJob,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
                                        placeholder="Enter job description..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wide">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin
                                            size={14}
                                            className="absolute left-3 top-2.5 text-slate-400"
                                        />
                                        <input
                                            required
                                            type="text"
                                            value={currentJob.location}
                                            onChange={(e) =>
                                                setCurrentJob({
                                                    ...currentJob,
                                                    location: e.target.value,
                                                })
                                            }
                                            className="w-full border border-slate-200 rounded-lg pl-9 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                            placeholder="e.g. Delhi, India"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-4">
                                    <input
                                        type="checkbox"
                                        id="job_active"
                                        checked={currentJob.is_active}
                                        onChange={(e) =>
                                            setCurrentJob({
                                                ...currentJob,
                                                is_active: e.target.checked,
                                            })
                                        }
                                        className="w-3.5 h-3.5 border-slate-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <label
                                        htmlFor="job_active"
                                        className="text-xs font-medium text-slate-700 cursor-pointer select-none"
                                    >
                                        Active (Visible to applicants)
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-slate-900 text-white py-2.5 text-xs font-bold rounded-lg hover:bg-slate-800 transition-all shadow hover:shadow-md flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Save size={16} />
                                )}
                                {submitting ? "Processing..." : editMode ? "Update Posting" : "Save Posting"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobManagement;
