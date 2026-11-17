import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import {
    BarChart3,
    TrendingUp,
    Users,
    Download,
    FileSpreadsheet,
    Check,
    X,
    ChevronDown,
    RefreshCw,
    CreditCard,
    Briefcase,
    PieChart,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";
import DashboardLoader from "../../components/layout/DashboardLoader";
import DataTable from "../../components/shared/DataTable";

const MasterReport = () => {
    const toast = useToast();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("users");

    useEffect(() => {
        fetchAllReports();
    }, []);

    const fetchAllReports = async () => {
        setLoading(true);
        try {
            const { data: usersData } = await API.get("/reports/users");
            setUsers(usersData);
        } catch (error) {
            console.error("Report fetch error", error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount || 0);
    };

    const userReportColumns = [
        {
            header: "User Details",
            key: "full_name",
            sortable: true,
            render: (row) => (
                <div>
                    <div className="font-bold text-slate-900">{row.full_name}</div>
                    <div className="text-[10px] text-slate-400 font-medium">
                        {row.email} • {row.mobile}
                    </div>
                </div>
            ),
        },
        {
            header: "Activity",
            key: "order_count",
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <div className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                        <span className="text-xs font-black text-slate-700">
                            {row.order_count || 0}
                        </span>
                        <span className="text-[9px] font-black text-slate-400 uppercase ml-1.5">
                            Orders
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "Lifetime Spending",
            key: "total_spent",
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-2 text-emerald-600 font-black text-xs">
                    <CreditCard size={14} />
                    {formatCurrency(row.total_spent)}
                </div>
            ),
        },
    ];

    if (loading && users.length === 0)
        return <DashboardLoader loading={true} title="Analyzing Systems" />;

    return (
        <div className="space-y-6 pb-20 font-sans">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 border border-slate-200 rounded-xl shadow-sm gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Master Report</h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Global performance metrics and financial analysis reports.
                    </p>
                </div>
                <button
                    onClick={fetchAllReports}
                    className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all rounded-lg border border-slate-200"
                >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    Refresh Registry
                </button>
            </div>

            <DataTable
                columns={userReportColumns}
                data={users}
                fileName="User_Spending_Report"
                pageSize={10}
                title="Direct User Financials"
            />
        </div>
    );
};

export default MasterReport;
