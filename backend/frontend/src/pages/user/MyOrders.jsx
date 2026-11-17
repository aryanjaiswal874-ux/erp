import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Download, FileText, Search, Calendar, ChevronRight, ShoppingBag, Eye } from "lucide-react";
import API from "../../api/axios";
import DashboardLoader from "../../components/layout/DashboardLoader";
import { useToast } from "../../context/ToastContext";
import DataTable from "../../components/shared/DataTable";

const MyOrders = () => {
    const toast = useToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await API.get("/orders/myorders");
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch order history", error);
            setLoading(false);
        }
    };

    const handleDownloadInvoice = (orderId) => {
        toast.info(`Invoice for #${orderId.toString().substring(0, 8).toUpperCase()} will be sent to your email.`);
    };

    const orderColumns = [
        {
            header: 'Transaction Details',
            key: 'id',
            sortable: true,
            render: (row) => {
                const serviceName = row.Product?.title || "Specialized Service";
                const typeName = row.Product?.ProductType?.name;
                const groupName = row.Product?.ServiceGroup?.name;
                return (
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                            <ShoppingBag size={18} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-0.5">#{row.id.substring(0, 8).toUpperCase()}</p>
                            <p className="font-semibold text-slate-800 leading-tight">{serviceName}</p>
                            <div className="flex items-center gap-2 mt-1.5 line-clamp-1">
                                {groupName && (
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                                        {groupName}
                                    </span>
                                )}
                                {typeName && (
                                    <>
                                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                        <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight">
                                            {typeName}
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 uppercase font-medium">{new Date(row.createdAt).toLocaleDateString('en-GB')}</p>
                        </div>
                    </div>
                );
            }
        },
        {
            header: 'Fulfillment Status',
            key: 'status',
            sortable: true,
            render: (row) => (
                <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold border ${row.status === 'Delivered' || row.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    row.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        row.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                            'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Total Liability',
            key: 'amount',
            sortable: true,
            render: (row) => <span className="font-bold text-slate-900 text-sm">₹{row.amount?.toLocaleString()}</span>
        },
        {
            header: 'Actions',
            key: 'actions',
            className: 'text-right',
            render: (row) => (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => handleDownloadInvoice(row.id)}
                        className="p-2 bg-white border border-slate-200 rounded-lg hover:border-slate-800 transition-all text-slate-600"
                        title="Download Invoice"
                    >
                        <Download size={14} />
                    </button>
                    <Link
                        to={`/user/orders/${row.id}`}
                        className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all"
                        title="View Details"
                    >
                        <Eye size={14} />
                    </Link>
                </div>
            )
        }
    ];

    if (loading && orders.length === 0) return <DashboardLoader loading={loading} title="Fetching History..." />;

    return (
        <div className="space-y-6 font-sans pb-20">
            <div className="border-b border-slate-200 pb-5">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Legacy Registry</h1>
                <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest">A persistent log of all service cycles and financial commitments</p>
            </div>

            <DataTable
                columns={orderColumns}
                data={orders}
                fileName="Personal_Order_Log"
                pageSize={8}
            />
        </div>
    );
};

export default MyOrders;

