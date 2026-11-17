import {
    Eye,
    Edit,
    Phone,
    FileText,
    UserPlus,
    Mail,
    MapPin,
    Plus,
    CreditCard,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Filter,
    Calendar,
    User,
    CheckCircle2,
    XCircle,
    LayoutGrid,
    PhoneCall
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import MAKLeadView from "./MAKLeadView";
import { useState } from "react";
import { updateLead, initiateCall } from "../../../api/makLeadService";
import { useToast } from "../../../context/ToastContext";

const TruncatedCell = ({ text, icon: Icon, subtext, color = "orange" }) => {
    return (
        <div className="relative group/cell max-w-[150px]">
            <div className="flex flex-col truncate overflow-hidden">
                <div className="text-[13px] font-bold text-slate-700 tracking-tight flex items-center gap-1.5 truncate">
                    {Icon && <Icon size={11} className={`text-${color}-400 shrink-0`} />}
                    <span className="truncate">{text || "--"}</span>
                </div>
                {subtext && (
                    <div className="text-[10px] text-slate-500 font-medium truncate flex items-center gap-1">
                        <span className="truncate">{subtext}</span>
                    </div>
                )}
            </div>

            {/* Hover Card */}
            <div className="absolute left-0 top-full mt-2 hidden group-hover/cell:block z-[100] w-64 p-3 bg-white border border-slate-200 rounded-lg shadow-xl animate-in fade-in zoom-in slide-in-from-top-2">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-1">
                        <div className={`p-1.5 rounded-md bg-${color}-50 text-${color}-500`}>
                            {Icon && <Icon size={14} />}
                        </div>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Full Detail</span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 break-words leading-relaxed">
                        {text}
                    </div>
                    {subtext && (
                        <div className="text-[10px] font-medium text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 break-words">
                            {subtext}
                        </div>
                    )}
                </div>
                {/* Pointer */}
                <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-l border-t border-slate-200 rotate-45"></div>
            </div>
        </div>
    );
};

const MAKLeadTable = ({
    leads,
    loading,
    users,
    user,
    onFollowUp,
    onEdit,
    refreshLeads,
    selectedLeads = [],
    onSelectionChange,
    onSendWhatsApp
}) => {
    const toast = useToast();
    const [viewLead, setViewLead] = useState(null);
    const [updating, setUpdating] = useState(null);

    // Pagination & Sorting & Filtering State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [creatorFilter, setCreatorFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');
    const [interestFilter, setInterestFilter] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case "Interested":
                return "bg-emerald-50 text-emerald-700 border-emerald-100";
            case "Converted as Customer":
                return "bg-green-600 text-white border-green-700";
            case "Not Interested":
                return "bg-rose-50 text-rose-600 border-rose-100";
            case "May be Interested":
                return "bg-amber-50 text-amber-700 border-amber-100";
            case "New":
                return "bg-blue-50 text-blue-700 border-blue-100";
            default:
                return "bg-gray-50 text-gray-500 border-gray-100";
        }
    };

    const handleAssign = async (leadId, userId) => {
        setUpdating(leadId);
        try {
            await updateLead(leadId, { assignedTo: userId || null });
            toast.success("Lead reassigned.");
            refreshLeads();
        } catch (error) {
            console.error("Failed to assign lead", error);
            toast.error("Error updating assignment.");
        } finally {
            setUpdating(null);
        }
    };

    const handleCall = async (lead) => {
        if (!lead.contact) {
            toast.error("Lead has no contact number.");
            return;
        }
        // Sanitize number: remove non-digits
        const cleanNumber = lead.contact.replace(/\D/g, '');
        let finalNumber = cleanNumber;

        // Ensure 10 digits
        if (finalNumber.length === 10) {
            finalNumber = '91' + finalNumber;
        } else if (finalNumber.length === 12 && finalNumber.startsWith('91')) {
            // already has 91
        } else {
            // Basic validation warning, but try anyway or ask user
            // For now, proceed if length is reasonable, else warn
            if (finalNumber.length < 10) {
                toast.error("Invalid phone number format.");
                return;
            }
        }

        toast.info("Initializing call...");
        try {
            await initiateCall(lead.id, finalNumber);
            toast.success("Call initiated successfully! Your phone should ring shortly.");
        } catch (error) {
            console.error("Call failed:", error);
            toast.error(error.response?.data?.message || "Failed to initiate call.");
        }
    };



    const baseURL =
        import.meta.env.VITE_API_BASE_URL_IMG || "http://localhost:5000";

    // --- Statistics Calculation ---
    const totalLeads = leads.length;
    const totalInterested = leads.filter(l => l.status === "Interested").length;
    const totalConverted = leads.filter(l => l.status === "Converted as Customer").length;
    const totalNotInterested = leads.filter(l => l.status === "Not Interested").length;
    const totalNew = leads.filter(l => l.status === "New").length;
    const totalMaybeInterested = leads.filter(l => l.status === "May be Interested").length;

    // --- Filtering ---
    const filteredLeads = leads.filter(lead => {
        // 1. Creator Filter
        if (creatorFilter) {
            const creatorId = lead.Creator?.id || lead.User?.id || lead.created_by;
            if (String(creatorId) !== String(creatorFilter)) return false;
        }
        // 2. Status Filter
        if (statusFilter && lead.status !== statusFilter) {
            return false;
        }
        // 3. Source Filter
        if (sourceFilter) {
            if (lead.source !== sourceFilter) return false;
        }
        // 4. Interest Filter
        if (interestFilter) {
            if (lead.interested_for !== interestFilter) return false;
        }
        return true;
    });

    // --- Sorting ---
    const sortedLeads = [...filteredLeads].sort((a, b) => {
        if (!sortConfig.key) return 0;

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'createdAt') {
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
        } else if (sortConfig.key === 'creator') {
            aValue = (a.Creator?.full_name || a.User?.full_name || '').toLowerCase();
            bValue = (b.Creator?.full_name || b.User?.full_name || '').toLowerCase();
        } else if (sortConfig.key === 'assignedTo') {
            aValue = a.assignedTo || 0;
            bValue = b.assignedTo || 0;
        } else if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // --- Pagination ---
    const totalPages = Math.ceil(sortedLeads.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLeads = sortedLeads.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Derive Creators list
    const creators = Array.from(new Set(leads.map(l => l.Creator || l.User).filter(Boolean).map(c => JSON.stringify({ id: c.id, name: c.full_name }))))
        .map(s => JSON.parse(s));

    // Lead Sources for Filter
    const leadSources = ["Meta Ad", "Google Ad", "Website", "Newspaper", "Offline", "Other"];

    // Lead Interests for Filter
    const leadInterests = Array.from(new Set(leads.map(l => l.interested_for).filter(Boolean)));

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-sm">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-3 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                    Loading Leads...
                </p>
            </div>
        );
    }

    if (leads.length === 0) {
        return (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-sm">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <FileText size={20} className="text-slate-200" />
                </div>
                <p className="text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                    No leads found.
                </p>
            </div>
        );
    }

    const getRowColor = (status) => {
        switch (status) {
            case "Interested":
                return "bg-emerald-50 hover:bg-emerald-100";
            case "Converted as Customer":
                return "bg-green-50 hover:bg-green-100";
            case "Not Interested":
                return "bg-rose-50 hover:bg-rose-100";
            case "May be Interested":
                return "bg-amber-50 hover:bg-amber-100";
            case "New":
            default:
                return "hover:bg-slate-50 even:bg-slate-50/50";
        }
    };

    return (
        <div className="flex flex-col gap-4">

            {/* Stats Cards Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
                {/* Total Card */}
                <div
                    onClick={() => { setStatusFilter(''); setCurrentPage(1); }}
                    className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all group flex items-center justify-between
            ${statusFilter === '' ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-sm' : 'bg-blue-50/40 border-blue-200 hover:border-blue-400'}`}
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Leads</span>
                        <span className="text-2xl font-black text-slate-800">{totalLeads}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors
              ${statusFilter === '' ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-blue-100 group-hover:bg-blue-100 group-hover:text-blue-500'}`}>
                        <LayoutGrid size={18} />
                    </div>
                </div>

                {/* Interested Card */}
                <div
                    onClick={() => { setStatusFilter('Interested'); setCurrentPage(1); }}
                    className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all group flex items-center justify-between
            ${statusFilter === 'Interested' ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 shadow-sm' : 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-400'}`}
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Interested</span>
                        <span className="text-2xl font-black text-emerald-600">{totalInterested}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors
              ${statusFilter === 'Interested' ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-500 border border-emerald-100 group-hover:bg-emerald-100'}`}>
                        <CheckCircle2 size={18} />
                    </div>
                </div>

                {/* Converted Card */}
                <div
                    onClick={() => { setStatusFilter('Converted as Customer'); setCurrentPage(1); }}
                    className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all group flex items-center justify-between
            ${statusFilter === 'Converted as Customer' ? 'bg-green-600 border-green-700 ring-1 ring-green-700 shadow-sm' : 'bg-green-50 border-green-200 hover:border-green-400'}`}
                >
                    <div className="flex flex-col">
                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${statusFilter === 'Converted as Customer' ? 'text-green-100' : 'text-slate-500'}`}>Converted</span>
                        <span className={`text-2xl font-black ${statusFilter === 'Converted as Customer' ? 'text-white' : 'text-green-600'}`}>{totalConverted}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors
              ${statusFilter === 'Converted as Customer' ? 'bg-white text-green-600' : 'bg-green-600 text-white'}`}>
                        <CheckCircle2 size={18} />
                    </div>
                </div>

                {/* Not Interested Card */}
                <div
                    onClick={() => { setStatusFilter('Not Interested'); setCurrentPage(1); }}
                    className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all group flex items-center justify-between
            ${statusFilter === 'Not Interested' ? 'bg-rose-50 border-rose-500 ring-1 ring-rose-500 shadow-sm' : 'bg-rose-50/40 border-rose-200 hover:border-rose-400'}`}
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Not Interested</span>
                        <span className="text-2xl font-black text-rose-600">{totalNotInterested}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors
              ${statusFilter === 'Not Interested' ? 'bg-rose-600 text-white' : 'bg-white text-rose-500 border border-rose-100 group-hover:bg-rose-100'}`}>
                        <XCircle size={18} />
                    </div>
                </div>

                {/* May be Interested Card */}
                <div
                    onClick={() => { setStatusFilter('May be Interested'); setCurrentPage(1); }}
                    className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all group flex items-center justify-between
            ${statusFilter === 'May be Interested' ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500 shadow-sm' : 'bg-amber-50/40 border-amber-200 hover:border-amber-400'}`}
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">May be Interested</span>
                        <span className="text-2xl font-black text-amber-600">{totalMaybeInterested}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors
              ${statusFilter === 'May be Interested' ? 'bg-amber-600 text-white' : 'bg-white text-amber-500 border border-amber-100 group-hover:bg-amber-100'}`}>
                        <CheckCircle2 size={18} />
                    </div>
                </div>

                {/* New Leads Card */}
                <div
                    onClick={() => { setStatusFilter('New'); setCurrentPage(1); }}
                    className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all group flex items-center justify-between
            ${statusFilter === 'New' ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 shadow-sm' : 'bg-indigo-50/40 border-indigo-200 hover:border-indigo-400'}`}
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">New Leads</span>
                        <span className="text-2xl font-black text-indigo-600">{totalNew}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors
              ${statusFilter === 'New' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-500 border border-indigo-100 group-hover:bg-indigo-100'}`}>
                        <UserPlus size={18} />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden flex flex-col">

                {/* Filters Bar */}
                <div className="p-3 border-b border-slate-100 bg-slate-50/30 flex justify-end gap-3 px-6">

                    {/* Source Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={12} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Source:</span>
                        <select
                            value={sourceFilter}
                            onChange={(e) => { setSourceFilter(e.target.value); setCurrentPage(1); }}
                            className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded px-2 py-1 focus:outline-none focus:border-blue-400 cursor-pointer"
                        >
                            <option value="">All Sources</option>
                            {leadSources.map(src => (
                                <option key={src} value={src}>{src}</option>
                            ))}
                        </select>
                    </div>

                    {/* Interest Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={12} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Interest:</span>
                        <select
                            value={interestFilter}
                            onChange={(e) => { setInterestFilter(e.target.value); setCurrentPage(1); }}
                            className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded px-2 py-1 focus:outline-none focus:border-blue-400 cursor-pointer max-w-[120px]"
                        >
                            <option value="">All</option>
                            {leadInterests.map(interest => (
                                <option key={interest} value={interest}>{interest}</option>
                            ))}
                        </select>
                    </div>

                    {/* Added By Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={12} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Added By:</span>
                        <select
                            value={creatorFilter}
                            onChange={(e) => { setCreatorFilter(e.target.value); setCurrentPage(1); }}
                            className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded px-2 py-1 focus:outline-none focus:border-blue-400 cursor-pointer"
                        >
                            <option value="">All Users</option>
                            {creators.length > 0 ? creators.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            )) : users.map(u => ( // Fallback
                                <option key={u.id} value={u.id}>{u.full_name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-bold text-slate-200 uppercase tracking-wider">
                                {onSelectionChange && (
                                    <th className="py-3 px-4 w-12 text-center text-white">
                                        <input type="checkbox"
                                            className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            checked={currentLeads.length > 0 && currentLeads.every(l => selectedLeads.includes(l.id))}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    const allIds = currentLeads.map(l => l.id);
                                                    const newSelection = [...new Set([...selectedLeads, ...allIds])];
                                                    onSelectionChange(newSelection);
                                                } else {
                                                    const currentIds = currentLeads.map(l => l.id);
                                                    onSelectionChange(selectedLeads.filter(id => !currentIds.includes(id)));
                                                }
                                            }}
                                        />
                                    </th>
                                )}
                                <th className="py-3 px-4 w-12 text-center text-white font-bold">#</th>

                                <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort('name')}>
                                    <div className="flex items-center gap-1.5">
                                        Lead Name
                                        <div className="flex flex-col">
                                            <ChevronUp size={12} className={`text-slate-500 ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                            <ChevronDown size={12} className={`-mt-1.5 text-slate-500 ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                        </div>
                                    </div>
                                </th>

                                <th className="py-3 px-4 text-white">Contact Info</th>

                                <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort('city')}>
                                    <div className="flex items-center gap-1.5">
                                        Location
                                        <div className="flex flex-col">
                                            <ChevronUp size={12} className={`text-slate-500 ${sortConfig.key === 'city' && sortConfig.direction === 'asc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                            <ChevronDown size={12} className={`-mt-1.5 text-slate-500 ${sortConfig.key === 'city' && sortConfig.direction === 'desc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                        </div>
                                    </div>
                                </th>

                                <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort('interested_for')}>
                                    <div className="flex items-center gap-1.5">
                                        Interested For
                                        <div className="flex flex-col">
                                            <ChevronUp size={12} className={`text-slate-500 ${sortConfig.key === 'interested_for' && sortConfig.direction === 'asc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                            <ChevronDown size={12} className={`-mt-1.5 text-slate-500 ${sortConfig.key === 'interested_for' && sortConfig.direction === 'desc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                        </div>
                                    </div>
                                </th>

                                <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort('createdAt')}>
                                    <div className="flex items-center gap-1.5">
                                        Added On
                                        <div className="flex flex-col">
                                            <ChevronUp size={12} className={`text-slate-500 ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                            <ChevronDown size={12} className={`-mt-1.5 text-slate-500 ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                        </div>
                                    </div>
                                </th>

                                <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort('creator')}>
                                    <div className="flex items-center gap-1.5">
                                        Added By
                                        <div className="flex flex-col">
                                            <ChevronUp size={12} className={`text-slate-500 ${sortConfig.key === 'creator' && sortConfig.direction === 'asc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                            <ChevronDown size={12} className={`-mt-1.5 text-slate-500 ${sortConfig.key === 'creator' && sortConfig.direction === 'desc' ? 'text-orange-400' : 'group-hover:text-slate-400'}`} />
                                        </div>
                                    </div>
                                </th>

                                <th className="py-3 px-4 text-white">Assigned To</th>
                                <th className="py-3 px-4 text-white">Current Status</th>
                                <th className="py-3 px-4 text-right text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {currentLeads.map((lead, index) => (
                                <tr
                                    key={lead.id}
                                    className={`${getRowColor(lead.status)} border-b border-slate-100 transition-colors group px-4`}
                                >
                                    {/* Select Checkbox */}
                                    {onSelectionChange && (
                                        <td className="py-3 px-4 text-center">
                                            <input type="checkbox"
                                                className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                checked={selectedLeads.includes(lead.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        onSelectionChange([...selectedLeads, lead.id]);
                                                    } else {
                                                        onSelectionChange(selectedLeads.filter(id => id !== lead.id));
                                                    }
                                                }}
                                            />
                                        </td>
                                    )}

                                    {/* Serial Number */}
                                    <td className="py-3 px-4 text-center text-[10px] font-bold text-slate-400">
                                        {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, "0")}
                                    </td>

                                    {/* Lead Name (Source Info Removed) */}
                                    <td className="py-3 px-4">
                                        <TruncatedCell text={lead.name} color="blue" />
                                        {lead.MAKLeadHistories?.length > 0 && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse mt-1" title="Has History"></div>
                                        )}
                                    </td>

                                    {/* Contact Info */}
                                    <td className="py-3 px-4">
                                        <TruncatedCell
                                            text={lead.contact}
                                            icon={Phone}
                                            subtext={lead.email}
                                            color="orange"
                                        />
                                    </td>

                                    {/* Location - Updated Style */}
                                    <td className="py-3 px-4">
                                        <TruncatedCell
                                            text={lead.city || "--"}
                                            icon={MapPin}
                                            subtext={lead.state ? `, ${lead.state}` : ""}
                                            color="indigo"
                                        />
                                    </td>

                                    <td className="py-3 px-4">
                                        <TruncatedCell text={lead.interested_for || "--"} color="slate" />
                                    </td>

                                    {/* Added On */}
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                                            <Calendar size={11} className="text-orange-400" />
                                            {lead.createdAt
                                                ? new Date(lead.createdAt).toLocaleDateString('en-GB')
                                                : '--'}
                                        </div>
                                    </td>

                                    {/* Added By */}
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-1.5">
                                            <User size={11} className="text-orange-400" />
                                            <span className="text-xs font-semibold text-slate-600">
                                                {lead.Creator?.full_name || lead.User?.full_name || (
                                                    users.find(u => u.id === lead.created_by)?.full_name
                                                ) || "--"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative group/photo">
                                                <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                                                    {lead.Assignee?.profile_photo ? (
                                                        <img
                                                            src={
                                                                lead.Assignee.profile_photo.startsWith("http")
                                                                    ? lead.Assignee.profile_photo
                                                                    : `${baseURL}${lead.Assignee.profile_photo}`
                                                            }
                                                            className="w-full h-full object-cover"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <UserPlus size={12} className="text-slate-300" />
                                                    )}
                                                </div>
                                            </div>
                                            <select
                                                disabled={updating === lead.id || lead.status === "Converted as Customer" || !(user?.role === "admin" || user?.role === "super_admin")}
                                                value={lead.assignedTo || ""}
                                                onChange={(e) => handleAssign(lead.id, e.target.value)}
                                                className={`text-[10px] font-bold border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-300 transition-all w-28 shadow-sm text-slate-600 ${(updating === lead.id || lead.status === "Converted as Customer" || !(user?.role === "admin" || user?.role === "super_admin")) ? "cursor-default opacity-80" : "cursor-pointer"}`}
                                            >
                                                <option value="">Unassigned</option>
                                                {users.filter(u => u.is_active !== false && (u.role === 'admin' || u.role === 'employee' || u.role === 'super_admin')).map((u) => (
                                                    <option key={u.id} value={u.id}>
                                                        {u.full_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-0.5 rounded text-[9px] font-bold border tracking-tight ${getStatusColor(lead.status)}`}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <div className="flex items-center bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
                                                {user?.call_access && (
                                                    <button
                                                        onClick={() => handleCall(lead)}
                                                        className="p-1 px-2 text-green-600 hover:bg-green-50 transition-all border-r border-slate-100"
                                                        title="Call Lead"
                                                    >
                                                        <PhoneCall size={12} />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => onEdit(lead)}
                                                    className="p-1 px-2 text-blue-500 hover:bg-blue-50 transition-all border-r border-slate-100"
                                                    title="Edit Lead"
                                                >
                                                    <Edit size={12} />
                                                </button>
                                                <button
                                                    onClick={() => onFollowUp(lead)}
                                                    className="p-1 px-2 text-emerald-500 hover:bg-emerald-50 transition-all border-r border-slate-100"
                                                    title="Add Follow-up"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                </button>
                                                <button
                                                    onClick={() => onSendWhatsApp && onSendWhatsApp(lead)}
                                                    className="p-1 px-2 text-green-500 hover:bg-green-50 transition-all"
                                                    title="Send WhatsApp"
                                                >
                                                    <FaWhatsapp size={13} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => setViewLead(lead)}
                                                className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 text-white rounded text-[10px] font-bold hover:bg-blue-700 transition-all shadow-sm"
                                            >
                                                <Eye size={11} />
                                                View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-3 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedLeads.length)} of {sortedLeads.length} leads
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-1 rounded border border-slate-200 bg-white text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let p = i + 1;
                            if (totalPages > 5 && currentPage > 3) {
                                p = currentPage - 2 + i;
                                if (p > totalPages) p = p - (p - totalPages);
                                if (p < 1) p = 1;
                            }
                            if (totalPages > 5) {
                                const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                                p = start + i;
                            }
                            return p <= totalPages ? p : null;
                        }).filter(Boolean).map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold border transition-all ${currentPage === number ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'}`}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-1 rounded border border-slate-200 bg-white text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>


                {viewLead && (
                    <MAKLeadView lead={viewLead} onClose={() => setViewLead(null)} />
                )}


            </div>
        </div>
    );
};

export default MAKLeadTable;
