import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FileText, Clock, CheckCircle, AlertCircle, TrendingUp, ShoppingCart, ArrowUpRight, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import DashboardLoader from "../../components/layout/DashboardLoader";
import StatsCard from "../../components/shared/StatsCard";

const UserDashboard = () => {
    const { user, updateUserState } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState("");

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
            console.error("Failed to fetch dashboard data", error);
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        const serviceName = order.Product?.title || "Specialized Service";
        const matchesSearch =
            (order.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (serviceName.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesDate = !dateFilter || new Date(order.createdAt).toISOString().split('T')[0] === dateFilter;
        return matchesSearch && matchesDate;
    }).slice(0, 5);

    // Calculate stats
    const totalRequests = orders.length;
    const activeRequests = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Completed' && o.status !== 'Cancelled').length;
    const completedRequests = orders.filter(o => o.status === 'Delivered' || o.status === 'Completed').length;
    const pendingPayment = orders.filter(o => o.status === 'Pending').length;

    return (
        <div className="space-y-6 font-sans pb-10 relative min-h-[400px]">
            <DashboardLoader loading={loading} title="Syncing..." />

            <div className="flex justify-between items-end border-b border-slate-200 pb-5">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">Welcome back, {user?.full_name || 'User'}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="TOTAL ORDERS"
                    value={totalRequests}
                    icon={FileText}
                    index={3}
                />
                <StatsCard
                    title="IN PROGRESS"
                    value={activeRequests}
                    icon={Clock}
                    index={7}
                />
                <StatsCard
                    title="COMPLETED"
                    value={completedRequests}
                    icon={CheckCircle}
                    index={1}
                />
                <StatsCard
                    title="PENDING PAYMENT"
                    value={pendingPayment}
                    icon={AlertCircle}
                    index={4}
                />
            </div>

            {/* Cart Section (If not empty) */}
            {user?.cart?.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50/30">
                        <div className="flex items-center gap-2">
                            <ShoppingCart size={16} className="text-emerald-600" />
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">Pending Services in Cart</h2>
                        </div>
                        <Link to="/user/cart" className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 tracking-widest transition-colors flex items-center gap-1">
                            Checkout Now <ArrowUpRight size={10} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 text-slate-400 text-[9px] uppercase tracking-widest font-black">
                                    <th className="py-3 px-6 w-12 text-center">S.No</th>
                                    <th className="py-3 px-6">Service Name</th>
                                    <th className="py-3 px-6">Category</th>
                                    <th className="py-3 px-6 text-right">Cost</th>
                                    <th className="py-3 px-6 text-center w-24">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] text-slate-700 divide-y divide-slate-50">
                                {user.cart.map((item, idx) => (
                                    <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3 px-6 text-center text-slate-400 font-bold">{idx + 1}</td>
                                        <td className="py-3 px-6 font-bold text-slate-900 uppercase tracking-tight">
                                            {item.name || item.title}
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-100">
                                                {item.ProductType?.name || item.category || 'Service'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-right font-black text-slate-900">₹{item.price.toLocaleString()}</td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => {
                                                    const updatedCart = user.cart.filter((_, i) => i !== idx);
                                                    updateUserState({ ...user, cart: updatedCart });
                                                }}
                                                className="text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Recent Services Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center bg-white gap-4">
                    <h2 className="text-sm font-bold text-slate-800">Recent Orders</h2>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-48">
                            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Order ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:border-slate-400"
                            />
                        </div>
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] focus:outline-none focus:border-slate-400"
                        />
                        <Link to="/user/orders" className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-800 tracking-widest transition-colors shrink-0">View All</Link>
                    </div>
                </div>

                {filteredOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                                    <th className="py-3 px-6">ID</th>
                                    <th className="py-3 px-6">Service Name</th>
                                    <th className="py-3 px-6 text-right">Amount</th>
                                    <th className="py-3 px-6">Date</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] text-slate-700 divide-y divide-slate-50 font-medium">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3 px-6 font-bold text-slate-900 uppercase">#{order.id.toString().substring(0, 8)}</td>
                                        <td className="py-3 px-6 font-bold text-slate-800">
                                            {order.Product?.title || "Specialized Service"}
                                            {order.Product?.ProductType && (
                                                <div className="text-[9px] text-slate-400 font-medium uppercase mt-0.5">
                                                    {order.Product.ProductType.name}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-right font-black text-slate-900">
                                            ₹{order.amount}
                                        </td>
                                        <td className="py-3 px-6 text-slate-400 font-bold uppercase text-[9px]">
                                            {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold border ${order.status === 'Delivered' || order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    'bg-amber-50 text-amber-700 border-amber-100'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <Link to={`/user/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-800 font-bold text-[10px] uppercase tracking-widest transition-colors">Details</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-10 text-center text-slate-400">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <FileText size={20} className="text-slate-300" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">No recent orders</p>
                        <Link to="/products" className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest mt-4 inline-block hover:underline">Browse Services</Link>
                    </div>
                )}
            </div>

            {/* Need Help Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="text-sm font-black tracking-wide uppercase">Need Assistance?</h3>
                    <p className="text-slate-400 text-xs font-medium mt-1">Our support team is available 24/7 to help you.</p>
                </div>
                <Link to="/contact" className="px-6 py-2.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all whitespace-nowrap">
                    Contact Support
                </Link>
            </div>
        </div>
    );
};

export default UserDashboard;
