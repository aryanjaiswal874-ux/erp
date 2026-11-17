import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { Search, Filter, RefreshCw, FileText, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight, IndianRupee, Plus } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import DashboardLoader from "../../components/layout/DashboardLoader";
import DataTable from "../../components/shared/DataTable";

const OrderManagement = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/admin/orders");
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await API.put(`/admin/orders/${orderId}/status`, { status });
            fetchOrders();
            toast.success("Order status updated");
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const STATUS_OPTIONS = ["Pending", "Processing", "Completed", "Cancelled", "Payment Failed"];

    const filteredOrders = useMemo(() => {
        return orders.filter(o => {
            const matchesStatus = filterStatus === 'all' || o.status.toLowerCase() === filterStatus.toLowerCase();
            return matchesStatus;
        });
    }, [orders, filterStatus]);

    const orderColumns = [
        {
            header: 'Order ID',
            key: 'id',
            sortable: true,
            render: (row) => <span className="font-black text-slate-900">#{row.id.toString().substring(0, 8).toUpperCase()}</span>
        },
        {
            header: 'Customer',
            key: 'userName',
            sortable: true,
            render: (row) => (
                <div>
                    <div className="font-bold text-slate-900">{row.User?.full_name || 'Guest User'}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-tight">{row.User?.email}</div>
                </div>
            )
        },
        {
            header: 'Service',
            key: 'productTitle',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                        <FileText size={14} />
                    </span>
                    <div>
                        <div className="font-bold text-slate-700">{row.Product?.title || 'Unknown Service'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-medium transform uppercase tracking-wide">
                            <Clock size={10} /> {new Date(row.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: 'Payment',
            key: 'amount',
            sortable: true,
            render: (row) => (
                <div>
                    <div className="font-black text-slate-900 flex items-center">
                        <IndianRupee size={12} className="mr-0.5" />
                        {row.amount}
                    </div>
                    <div className={`text-[9px] font-black uppercase tracking-wider mt-0.5 ${row.payment_status === 'Paid' ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {row.payment_status}
                    </div>
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            sortable: true,
            render: (row) => (
                <div className="relative">
                    <select
                        className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-1 border cursor-pointer transition-all ${row.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-200' :
                            row.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100 ring-blue-200' :
                                row.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-100 ring-rose-200' :
                                    'bg-amber-50 text-amber-700 border-amber-100 ring-amber-200'
                            }`}
                        value={row.status}
                        onChange={(e) => handleUpdateStatus(row.id, e.target.value)}
                    >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            )
        }
    ];

    if (loading && orders.length === 0) return <DashboardLoader loading={true} title="Securing Transactions" />;

    return (
        <div className="space-y-6 font-sans pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 border border-slate-200 rounded-xl shadow-sm gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Orders</h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">Manage and track all customer orders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/admin/orders/new")}
                        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-all shadow-md"
                    >
                        <Plus size={14} /> New Order
                    </button>
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                        {["all", "Pending", "Processing", "Completed"].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all ${filterStatus === status
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={fetchOrders}
                        className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                        title="Refresh Registry"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>

            <DataTable
                columns={orderColumns}
                data={filteredOrders}
                fileName="Order_Registry"
                pageSize={10}
            />
        </div>
    );
};

export default OrderManagement;

