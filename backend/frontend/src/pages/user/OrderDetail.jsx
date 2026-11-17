import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Clock, ShieldCheck, Download, ExternalLink, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import API from "../../api/axios";
import DashboardLoader from "../../components/layout/DashboardLoader";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const { data } = await API.get(`/orders/${id}`);
            setOrder(data);
            setLoading(false);
        } catch (err) {
            console.error("Order Fetch Error:", err);
            setError("Could not find this order. It might have been deleted.");
            setLoading(false);
        }
    };

    if (loading) return <DashboardLoader loading={loading} title="Loading Order Insights..." />;

    if (error || !order) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Order Not Found</h2>
                <p className="text-sm text-slate-500 text-center max-w-xs mb-8">{error}</p>
                <button
                    onClick={() => navigate('/user/orders')}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
                >
                    <ArrowLeft size={16} /> Back to History
                </button>
            </div>
        );
    }

    const { status, amount, createdAt, Product: product } = order;

    return (
        <div className="space-y-6 font-sans pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">Order Detail</span>
                            <span className="text-[10px] font-medium text-slate-400">PLACED ON {new Date(createdAt).toLocaleDateString('en-GB')}</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">REF: #{id.substring(0, 8).toUpperCase()}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                        <Download size={14} /> Invoice
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg">
                        <ExternalLink size={14} /> Track Status
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side - Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Item Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Package size={14} /> Service Content
                        </h3>

                        <div className="space-y-6">
                            {product ? (
                                <div className="flex gap-6 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shrink-0">
                                        <FileText className="text-slate-300" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-base font-bold text-slate-900">{product.title}</h4>
                                            <span className="text-base font-bold text-slate-900">₹{amount?.toLocaleString()}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                            {product.description || "Comprehensive legal documentation and filing service provided by SBGM Digital India."}
                                        </p>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-emerald-500" /> Authorized</span>
                                            {product.ProductType && <span className="flex items-center gap-1.5"><Clock size={12} className="text-blue-500" /> {product.ProductType.name}</span>}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400">Product information unavailable</p>
                            )}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Clock size={14} /> Activity Timeline
                        </h3>

                        <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                            {[
                                { status: 'Delivered', date: '2026-01-28', note: 'Service asset has been dispatched/completed.', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                { status: 'Processing', date: '2026-01-28', note: 'Documents are being reviewed by experts.', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
                                { status: 'Pending', date: '2026-01-28', note: 'Payment verified and order placed.', icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-50' }
                            ].map((step, idx) => {
                                const isActive = status === step.status || (status === 'Delivered' && idx > 0);
                                return (
                                    <div key={idx} className={`relative pl-10 ${!isActive ? 'opacity-40 grayscale' : ''}`}>
                                        <div className={`absolute left-0 top-0 w-6 h-6 rounded-full ${isActive ? step.bg : 'bg-slate-100'} border-2 border-white flex items-center justify-center z-10 shadow-sm`}>
                                            <step.icon size={12} className={isActive ? step.color : 'text-slate-400'} />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className={`text-sm font-bold ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{step.status}</h4>
                                                <span className="text-[10px] font-medium text-slate-400">{step.date}</span>
                                            </div>
                                            <p className="text-xs text-slate-500">{step.note}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Side - Summary */}
                <div className="space-y-6">
                    <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Order Summary</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400 font-medium">Subtotal</span>
                                <span className="font-bold font-mono">₹{amount?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400 font-medium">Taxation</span>
                                <span className="font-bold text-emerald-400">Inclusive</span>
                            </div>
                            <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Net Amount</span>
                                <span className="text-2xl font-bold">₹{amount?.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className={`w-full py-3 rounded-lg text-center text-xs font-bold uppercase tracking-widest border ${status === 'Completed' || status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            }`}>
                            {status}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <ShieldCheck size={14} /> Digital Guarantee
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            This service is delivered digitally. You will receive all final documents and acknowledgements via this portal and your registered email address.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
