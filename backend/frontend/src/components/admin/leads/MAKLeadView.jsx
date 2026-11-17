import {
    X,
    Printer,
    Phone,
    Mail,
    MapPin,
    Briefcase,
    User,
    Info,
    Calendar,
    Clock,
    CheckCircle2,
    Share2,
    FileText,
    MessageSquare
} from "lucide-react";

const MAKLeadView = ({ lead, onClose }) => {
    const handlePrint = () => {
        window.print();
    };

    const baseURL =
        import.meta.env.VITE_API_BASE_URL_IMG || "http://localhost:5577";

    const getStatusColor = (status) => {
        switch (status) {
            case "Interested": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Not Interested": return "bg-rose-50 text-rose-600 border-rose-200";
            case "May be Interested": return "bg-amber-50 text-amber-700 border-amber-200";
            case "New": return "bg-blue-50 text-blue-700 border-blue-200";
            default: return "bg-gray-50 text-gray-600 border-gray-200";
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:p-0 print:bg-white overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:w-full print:max-w-none border border-gray-100">

                {/* Header Actions */}
                <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100 bg-gray-50/80 print:hidden sticky top-0 backdrop-blur z-10">
                    <div className="flex items-center gap-2">
                        <FileText size={14} className="text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">MAK Lead Profile Report</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                            title="Print"
                        >
                            <Printer size={16} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                            title="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 print:p-0">

                    {/* Top Info Section */}
                    <div className="mb-6">
                        <div className="flex items-start justify-between mb-5">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{lead.name}</h1>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getStatusColor(lead.status)}`}>
                                        {lead.status}
                                    </span>
                                    <span className="text-[10px] font-semibold text-gray-400 tracking-wider">
                                        ID: #{lead.id?.substring(0, 8).toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Assigned To Badge */}
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Assigned Specialist</span>
                                <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                    <div className="w-5 h-5 rounded-full bg-white border border-gray-200 overflow-hidden flex items-center justify-center text-[8px]">
                                        {lead.Assignee?.profile_photo ? (
                                            <img src={lead.Assignee.profile_photo.startsWith("http") ? lead.Assignee.profile_photo : `${baseURL}${lead.Assignee.profile_photo}`} className="w-full h-full object-cover" />
                                        ) : (
                                            lead.Assignee?.full_name?.charAt(0) || <User size={10} />
                                        )}
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-700">{lead.Assignee?.full_name || "Unassigned"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Compact Details Grid */}
                        <div className="bg-gray-50/60 rounded-lg border border-gray-100 p-4 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
                            <div>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Contact</span>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[11px] font-bold text-gray-800 flex items-center gap-1.5">
                                        <Phone size={10} className="text-gray-400" /> {lead.contact}
                                    </span>
                                    {lead.email && (
                                        <span className="text-[11px] font-medium text-gray-600 flex items-center gap-1.5 truncate" title={lead.email}>
                                            <Mail size={10} className="text-gray-400" /> {lead.email}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Location</span>
                                <span className="text-[11px] font-bold text-gray-800 flex items-center gap-1.5">
                                    <MapPin size={10} className="text-gray-400" /> {lead.city || "--"}, {lead.state || "--"}
                                </span>
                            </div>

                            <div>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Professional</span>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[11px] font-bold text-gray-800 flex items-center gap-1.5">
                                        <Briefcase size={10} className="text-gray-400" /> {lead.occupation || "Not Provided"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Origin</span>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[11px] font-bold text-gray-800 flex items-center gap-1.5">
                                        <Share2 size={10} className="text-gray-400" /> {lead.source || "Unknown"}
                                    </span>
                                    <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1.5">
                                        <Calendar size={10} className="text-gray-400" /> {new Date(lead.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="pt-2">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                            <Clock size={12} /> Follow-Up History & Remarks
                        </h3>

                        <div className="space-y-0">
                            {(lead.MAKLeadHistories || []).length === 0 ? (
                                <div className="text-center py-8 bg-gray-50/50 rounded border border-dashed border-gray-200">
                                    <p className="text-[11px] text-gray-400 font-bold italic">No interaction history found</p>
                                </div>
                            ) : (
                                [...lead.MAKLeadHistories].reverse().map((history, idx) => (
                                    <div key={history.id} className="flex gap-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-sm group">
                                        {/* Date Column */}
                                        <div className="w-24 flex-shrink-0 text-right space-y-0.5 pt-0.5">
                                            <div className="text-[10px] font-bold text-gray-600">{new Date(history.createdAt).toLocaleDateString()}</div>
                                            <div className="text-[9px] font-medium text-gray-400">{new Date(history.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-px bg-gray-100 relative top-1 bottom-1">
                                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-blue-400 transition-colors"></div>
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1 pb-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100 uppercase tracking-wide">
                                                    {history.type}
                                                </span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                    by <span className="font-bold text-gray-600">{history.Actor?.full_name || "System"}</span>
                                                </span>
                                            </div>
                                            <p className="text-[11px] font-medium text-gray-700 leading-relaxed">
                                                {history.remark}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Print Footer */}
                    <div className="mt-8 pt-4 border-t border-gray-100 hidden print:flex justify-between items-center opacity-50">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{import.meta.env.VITE_COMPANY_NAME || "ERP System"}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{new Date().toLocaleString()}</span>
                    </div>

                </div>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          @page { size: A4 portrait; margin: 15mm; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white !important; }
          .print-hidden { display: none !important; }
          .fixed { position: relative !important; inset: auto !important; height: auto !important; overflow: visible !important; }
          .max-h-\[90vh\] { max-height: none !important; }
          .overflow-y-auto { overflow: visible !important; }
        }
      `}</style>
        </div>
    );
};

export default MAKLeadView;
