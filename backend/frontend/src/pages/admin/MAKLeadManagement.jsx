import { useState, useEffect } from "react";
import { Plus, Search, Filter, Download, FileText, CheckCircle, Clock, XCircle, LayoutGrid, List as ListIcon, Calendar as CalendarIcon, User as UserIcon, Mic, Image as ImageIcon, Send, PhoneCall, Video, CheckSquare, MessageSquare, BarChart2, ChevronDown, MapPin, FileSpreadsheet } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import MAKLeadTable from "../../components/admin/leads/MAKLeadTable";
import AddMAKLeadModal from "../../components/admin/leads/AddMAKLeadModal";
import FollowUpMAKModal from "../../components/admin/leads/FollowUpMAKModal";
import MAKReportSection from "../../components/admin/leads/MAKReportSection";
import WhatsAppSender from "../../components/admin/leads/WhatsAppSender";
import { getAllLeads, importLeads, updateLead, getSmartfloToken, bulkAssignLeads } from "../../api/makLeadService";
import ExcelImportModal from "../../components/shared/ExcelImportModal";
import API from "../../api/axios";
import * as XLSX from 'xlsx';
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

const MAKLeadManagement = () => {
    const { user } = useAuth();
    const toast = useToast();
    const [view, setView] = useState("list");
    const [activeTab, setActiveTab] = useState((user?.role === 'admin' || user?.role === 'super_admin') ? "all" : "assigned");
    const [leads, setLeads] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [editLead, setEditLead] = useState(null);

    // Selection & WhatsApp
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
    const [waInitialData, setWaInitialData] = useState({ message: "", type: "text" });
    const [bulkAssignUser, setBulkAssignUser] = useState("");

    const [filters, setFilters] = useState({
        status: "All",
        search: "",
        startDate: "",
        endDate: "",
        assignedTo: "",
    });

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        fetchLeads();
    }, [activeTab, filters, refreshTrigger, view]);

    useEffect(() => {
        fetchUsers();
        checkSmartfloToken();
    }, []);

    const checkSmartfloToken = async () => {
        try {
            const { data } = await getSmartfloToken();
            console.log("Calling Token:", data.token);
        } catch (error) {
            console.error("Smartflo Token Error:", error);
        }
    };

    const fetchLeads = async () => {
        if (view === "report") return;
        setLoading(true);
        try {
            const params = {
                ...filters,
                myLeads: activeTab === "assigned",
            };
            const { data } = await getAllLeads(params);
            setLeads(data);
        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await API.get("/admin/users");
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenFollowUp = (lead) => {
        setSelectedLead(lead);
        setIsFollowUpModalOpen(true);
    };

    const handleOpenEdit = (lead) => {
        setEditLead(lead);
        setIsAddModalOpen(true);
    };

    const handleSearch = (e) => {
        setFilters((prev) => ({ ...prev, search: e.target.value }));
    };

    const refreshLeads = () => setRefreshTrigger((prev) => prev + 1);

    const exportToExcel = () => {
        try {
            const dataToExport = leads.map((lead, index) => ({
                "S.No": lead.serialNo || index + 1,
                "Name": lead.name,
                "Contact": lead.contact,
                "WhatsApp": lead.whatsapp || lead.contact,
                "Email": lead.email || "N/A",
                "City": lead.city || "N/A",
                "State": lead.state || "N/A",
                "Occupation": lead.occupation || "N/A",
                "Status": lead.status,
                "Added On": new Date(lead.createdAt).toLocaleDateString(),
                "Added By": lead.Creator?.full_name || "N/A",
                "Assigned To": lead.Assignee?.full_name || "Unassigned"
            }));

            const worksheet = XLSX.utils.json_to_sheet(dataToExport);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "MAK_Leads");
            XLSX.writeFile(workbook, `MAK_Leads_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
            toast.success("Excel exported successfully!");
        } catch (error) {
            console.error("Export failed:", error);
            toast.error("Failed to export Excel.");
        }
    };

    const handleImportLeads = async (importedData) => {
        try {
            const { data } = await importLeads(importedData);
            toast.success(data.message);
            if (data.skipped > 0) {
                toast.error(`${data.skipped} duplicates skipped.`);
            }
            refreshLeads();
        } catch (error) {
            console.error(error);
            toast.error("Failed to import leads.");
        }
    };

    const handleBulkAssign = async () => {
        if (!bulkAssignUser || selectedLeads.length === 0) return;
        setLoading(true);
        try {
            await bulkAssignLeads(selectedLeads, bulkAssignUser);
            toast.success("Leads assigned successfully");
            setSelectedLeads([]);
            setBulkAssignUser("");
            refreshLeads();
        } catch (error) {
            console.error("Bulk assign failed:", error);
            toast.error("Failed to assign leads");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white px-6 py-4 border border-gray-200 rounded-sm shadow-sm ring-1 ring-gray-100/50">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">MAK Lead Management</h1>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">Manage and track your MAK leads efficiently</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setView(view === "list" ? "report" : "list")}
                        className={`flex items-center gap-2 px-3 py-1.5 border rounded-sm font-bold text-[10px] uppercase tracking-widest transition-all ${view === "report" ? "bg-orange-500 border-orange-600 text-white shadow-orange-200 shadow-sm" : "bg-white border-orange-200 text-orange-600 hover:bg-orange-50"}`}
                    >
                        {view === "list" ? <BarChart2 size={12} /> : <ListIcon size={12} />}
                        {view === "list" ? "Follow-up Report" : "Lead List"}
                    </button>
                    {view === "list" && (
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 border border-blue-600 rounded-sm text-white hover:bg-blue-700 font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm shadow-blue-200"
                        >
                            <Download size={12} />
                            Export
                        </button>
                    )}


                    <button
                        onClick={() => {
                            setWaInitialData({ message: "", type: "text" });
                            setIsWhatsAppModalOpen(true);
                        }}
                        disabled={true}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-sm font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                        title="Bulk WhatsApp is temporarily disabled"
                    >
                        <FaWhatsapp size={14} />
                        Send WhatsApp Message ({selectedLeads.length})
                    </button>

                    {/* Bulk Assign */}
                    {selectedLeads.length > 0 && (
                        <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-sm p-1 ml-2 transition-all animate-in fade-in zoom-in">
                            <select
                                value={bulkAssignUser}
                                onChange={(e) => setBulkAssignUser(e.target.value)}
                                className="text-[10px] font-bold border-gray-200 rounded-sm px-2 py-1 bg-white focus:outline-none focus:border-blue-300 w-32 cursor-pointer"
                            >
                                <option value="">Select User</option>
                                {users.filter(u => u.is_active !== false && (u.role === 'admin' || u.role === 'employee' || u.role === 'super_admin')).map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.full_name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleBulkAssign}
                                disabled={!bulkAssignUser}
                                className="bg-blue-600 text-white rounded-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Assign
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => { setEditLead(null); setIsAddModalOpen(true); }}
                        className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-sm hover:bg-indigo-700 font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm shadow-indigo-200"
                    >
                        <Plus size={12} />
                        Add New MAK Lead
                    </button>

                    <button
                        onClick={() => setIsImportModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white border border-emerald-600 rounded-sm hover:bg-emerald-700 font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm"
                        title="Import from Excel"
                    >
                        <FileSpreadsheet size={12} />
                        Import
                    </button>
                </div>
            </div>

            {
                view === "list" ? (
                    <>
                        {/* Control Panel */}
                        <div className="bg-[#E0F7FA]/40 border border-[#B2EBF2] rounded-sm shadow-sm overflow-hidden">
                            {/* Upper Controls */}
                            <div className="px-5 py-3 border-b border-[#B2EBF2]/50 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#E0F7FA]/60">
                                <div className="flex border border-gray-200 rounded-sm overflow-hidden bg-white">
                                    {(user?.role === 'admin' || user?.role === 'super_admin') && (
                                        <button
                                            onClick={() => setActiveTab("all")}
                                            className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === "all" ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-50"}`}
                                        >
                                            All Leads
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setActiveTab("assigned")}
                                        className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider transition-all border-l border-gray-100 ${activeTab === "assigned" ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-50"}`}
                                    >
                                        My Leads
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-sm px-3 py-1.5 w-full md:w-96 group focus-within:border-gray-400 transition-all">
                                    <Search size={12} className="text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or contact..."
                                        className="bg-transparent border-none outline-none text-[11px] font-medium w-full placeholder:text-gray-300"
                                        value={filters.search}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>

                            {/* Filter Matrix */}
                            <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-5 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <CheckSquare size={10} /> Status
                                    </label>
                                    <select
                                        name="status"
                                        value={filters.status}
                                        onChange={handleFilterChange}
                                        className="w-full text-[11px] font-semibold border-gray-200 rounded-sm bg-white py-1.5 focus:border-gray-400 focus:ring-0 transition-all cursor-pointer"
                                    >
                                        <option value="All">All Statuses</option>
                                        <option value="New">New</option>
                                        <option value="Interested">Interested</option>
                                        <option value="May be Interested">May be Interested</option>
                                        <option value="Not Interested">Not Interested</option>
                                        <option value="Converted as Customer">Converted as Customer</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <CalendarIcon size={10} /> Date From
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={filters.startDate}
                                        onChange={handleFilterChange}
                                        className="w-full text-[11px] font-medium border-gray-200 rounded-sm bg-white py-1.5 focus:border-gray-400 focus:ring-0 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <CalendarIcon size={10} /> Date To
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={filters.endDate}
                                        onChange={handleFilterChange}
                                        className="w-full text-[11px] font-medium border-gray-200 rounded-sm bg-white py-1.5 focus:border-gray-400 focus:ring-0 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <MapPin size={10} /> Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="City or State"
                                        value={filters.location || ''}
                                        onChange={handleFilterChange}
                                        className="hidden"
                                    />
                                    <select
                                        name="location"
                                        value={filters.location || ''}
                                        onChange={handleFilterChange}
                                        className="w-full text-[11px] font-semibold border-gray-200 rounded-sm bg-white py-1.5 focus:border-gray-400 focus:ring-0 transition-all cursor-pointer"
                                    >
                                        <option value="">All Locations</option>
                                        {[...new Set(leads.map(l => l.state).filter(Boolean))].sort().map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <UserIcon size={10} /> Assigned To
                                    </label>
                                    <select
                                        name="assignedTo"
                                        value={filters.assignedTo}
                                        onChange={handleFilterChange}
                                        className="w-full text-[11px] font-semibold border-gray-200 rounded-sm bg-white py-1.5 focus:border-gray-400 focus:ring-0 transition-all cursor-pointer"
                                    >
                                        <option value="">All Users</option>
                                        <option value="unassigned">Unassigned</option>
                                        {users.filter(u => u.is_active !== false && (u.role === 'admin' || u.role === 'employee' || u.role === 'super_admin')).map(u => (
                                            <option key={u.id} value={u.id}>{u.full_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Registry Table */}
                        <div className="mt-2 text-[11px]">
                            <div className="flex items-center gap-2 mb-2 px-1">
                                <span className="font-bold text-gray-400 uppercase tracking-widest text-[9px]">MAK Lead List</span>
                            </div>
                             <MAKLeadTable
                                leads={leads}
                                loading={loading}
                                users={users}
                                user={user}
                                onFollowUp={handleOpenFollowUp}
                                onEdit={handleOpenEdit}
                                refreshLeads={refreshLeads}
                                selectedLeads={selectedLeads}
                                onSelectionChange={setSelectedLeads}
                                onSendWhatsApp={(lead) => {
                                    setSelectedLeads([lead.id]);
                                    setWaInitialData({ message: "", type: "text" });
                                    setIsWhatsAppModalOpen(true);
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-sm p-4 min-h-[60vh]">
                        <MAKReportSection />
                    </div>
                )
            }

            {/* Modal Layers */}
            {
                isAddModalOpen && (
                    <AddMAKLeadModal
                        onClose={() => { setIsAddModalOpen(false); setEditLead(null); }}
                        onSuccess={refreshLeads}
                        users={users}
                        lead={editLead}
                    />
                )
            }

            {
                isFollowUpModalOpen && selectedLead && (
                    <FollowUpMAKModal
                        lead={selectedLead}
                        onClose={() => setIsFollowUpModalOpen(false)}
                        onSuccess={refreshLeads}
                    />
                )
            }

            {
                isWhatsAppModalOpen && (
                    <WhatsAppSender
                        selectedLeads={leads.filter(l => selectedLeads.includes(l.id))}
                        apiUrl={import.meta.env.VITE_WA_API_URL_MAK || 'http://localhost:5000'}
                        currentUserId={user?.id}
                        initialMessage={waInitialData.message}
                        initialType={waInitialData.type}
                        onClose={() => setIsWhatsAppModalOpen(false)}
                        onSuccess={() => {
                            setIsWhatsAppModalOpen(false);
                            setSelectedLeads([]);
                            toast.success("Messages processed!");
                        }}
                    />
                )
            }


            <ExcelImportModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImport={handleImportLeads}
                title="Import MAK Leads"
                users={users}
                currentUser={user}
            />
        </div >
    );
};

export default MAKLeadManagement;
