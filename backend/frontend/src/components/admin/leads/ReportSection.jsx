import { useState, useEffect } from "react";
import { getDailyReport } from "../../../api/leadService";
import API from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import {
    Calendar, Users, MessageSquare, Clock, Phone, Mail,
    Printer, Send, BarChart3, Download,
    FileText, User, ChevronDown, CheckCircle, Info, Loader2, Play
} from "lucide-react";
import React from 'react';

const ReportSection = () => {
    const { user: currentUser } = useAuth();
    const toast = useToast();
    const [date, setDate] = useState(() => {
        const now = new Date();
        // Adjust to Indian Time (UTC+5:30) manually to ensure default date is correct in local
        const offset = 5.5 * 60 * 60 * 1000;
        const indTime = new Date(now.getTime() + offset);
        return indTime.toISOString().split('T')[0];
    });
    const [reportData, setReportData] = useState({});
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';
    const [selectedUser, setSelectedUser] = useState(isAdmin ? "all" : currentUser.full_name);

    useEffect(() => {
        fetchReport();
    }, [date]);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const { data } = await getDailyReport(date);
            setReportData(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load report data.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendReport = async () => {
        if (totalInteractions === 0) return;
        setSending(true);
        try {
            const userReports = selectedUser === "all" ? reportData : { [selectedUser]: reportData[selectedUser] };
            const reportName = selectedUser === "all" ? "Team Report" : selectedUser;

            await API.post("/leads/send-report", {
                date,
                userReports,
                userName: reportName // This will be used in the subject
            });
            toast.success("Work report sent to admin successfully.");
        } catch (error) {
            toast.error("Failed to send report email.");
        } finally {
            setSending(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const teamMembers = Object.keys(reportData);
    const filteredUsers = selectedUser === "all" ? teamMembers : [selectedUser].filter(u => reportData[u]);
    const totalInteractions = filteredUsers.reduce((acc, current) => acc + (reportData[current]?.length || 0), 0);

    const dayName = new Date(date).toLocaleDateString('en-GB', { weekday: 'long' });

    const getIcon = (type) => {
        switch (type) {
            case 'Call': return <Phone size={11} className="text-blue-400" />;
            case 'Email': return <Mail size={11} className="text-amber-400" />;
            case 'Whatsapp': return (
                <svg className="w-3 h-3 fill-green-500" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            );
            default: return <Clock size={11} className="text-slate-300" />;
        }
    };

    const baseURL = import.meta.env.VITE_API_BASE_URL_IMG || "http://localhost:5577";

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Control Bar - Hidden on Print */}
            <div className="bg-white border border-slate-100 p-3 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        <input
                            type="date" value={date} onChange={(e) => setDate(e.target.value)}
                            className="bg-transparent border-none text-[11px] font-semibold text-slate-700 focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="appearance-none bg-white border border-slate-200 rounded-md pl-3 pr-8 py-1.5 text-[11px] font-semibold text-slate-600 focus:outline-none focus:border-blue-300 transition-all cursor-pointer"
                        >
                            {isAdmin && <option value="all">Whole Team Report</option>}
                            <option value={currentUser.full_name}>Only My Report</option>
                            {isAdmin && (
                                <optgroup label="Select Team Member">
                                    {teamMembers.filter(u => u !== currentUser.full_name).map(u => (
                                        <option key={u} value={u}>{u}</option>
                                    ))}
                                </optgroup>
                            )}
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSendReport}
                        disabled={sending || totalInteractions === 0}
                        className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-md font-semibold text-[11px] hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
                    >
                        {sending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                        Send report to admin
                    </button>
                    <button
                        onClick={handlePrint}
                        disabled={totalInteractions === 0}
                        className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 text-slate-600 rounded-md font-semibold text-[11px] hover:bg-slate-200 transition-all shadow-sm disabled:opacity-50"
                    >
                        <Printer size={13} /> Print report
                    </button>
                </div>
            </div>

            {/* Daily Report Print Template */}
            <div id="print-area" className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden print:border-none print:shadow-none print:m-0">
                {/* Print Header */}
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/30">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <BarChart3 size={18} />
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-slate-800 tracking-tight leading-none italic">Daily Performance Report</h1>
                            <p className="text-[10px] font-medium text-slate-400 mt-1 flex items-center gap-2">
                                <Clock size={10} /> {dayName}, {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Report Prepared For</span>
                            <span className="text-[12px] font-bold text-blue-600">{selectedUser === "all" ? "Whole Team Analysis" : selectedUser}</span>
                        </div>
                        <div className="px-4 py-1.5 bg-white rounded-md border border-slate-200 text-center shadow-sm">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none mb-1">Total done</span>
                            <span className="text-base font-black text-slate-800 leading-none">{totalInteractions}</span>
                        </div>
                    </div>
                </div>

                {/* Table Layout */}
                <div className="p-2 print:p-0">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-y border-slate-100">
                                <th className="py-2.5 px-3 text-left text-[9px] font-bold text-slate-500 uppercase tracking-wider w-8">#</th>
                                <th className="py-2.5 px-3 text-left text-[9px] font-bold text-slate-500 uppercase tracking-wider w-40">Lead Name</th>
                                <th className="py-2.5 px-3 text-left text-[9px] font-bold text-slate-500 uppercase tracking-wider w-24">Location</th>
                                <th className="py-2.5 px-3 text-left text-[9px] font-bold text-slate-500 uppercase tracking-wider">Follow-up Note</th>
                                <th className="py-2.5 px-3 text-left text-[9px] font-bold text-slate-500 uppercase tracking-wider w-24">Status</th>
                                <th className="py-2.5 px-3 text-left text-[9px] font-bold text-slate-500 uppercase tracking-wider w-20">Type</th>
                                <th className="py-2.5 px-3 text-left text-[9px] font-bold text-slate-500 uppercase tracking-wider w-24">Attachment</th>
                                <th className="py-2.5 px-3 text-center text-[9px] font-bold text-slate-500 uppercase tracking-wider w-20">Call Log</th>
                                <th className="py-2.5 px-3 text-right text-[9px] font-bold text-slate-500 uppercase tracking-wider w-20">Time</th>
                                {selectedUser === "all" && <th className="py-2.5 px-3 text-right text-[9px] font-bold text-slate-500 uppercase tracking-wider w-32">Employee</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map((user) => (
                                <React.Fragment key={`user-group-${user}`}>
                                    {reportData[user].map((item, idx) => (
                                        <tr key={item.id} className="hover:bg-blue-50/20 transition-colors border-b border-slate-50">
                                            <td className="py-2 px-3 text-[10px] text-slate-300 font-bold">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </td>
                                            <td className="py-2 px-3">
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-bold text-slate-700">{item.Lead?.name || 'Test User'}</span>
                                                    <span className="text-[9px] text-slate-400 font-bold">{item.Lead?.contact}</span>
                                                </div>
                                            </td>
                                            <td className="py-2 px-3">
                                                <span className="text-[10px] text-slate-500 font-semibold">
                                                    {item.Lead?.city || '--'}
                                                </span>
                                            </td>
                                            <td className="py-2 px-3">
                                                <p className="text-[10px] text-slate-600 leading-tight font-medium italic">
                                                    "{item.remark}"
                                                </p>
                                            </td>
                                            <td className="py-2 px-3">
                                                {(() => {
                                                    const displayStatus = item.status || item.Lead?.status || 'Active';
                                                    return (
                                                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold border tracking-tighter ${displayStatus === 'Interested' ? 'bg-green-50 text-green-600 border-green-100' :
                                                            displayStatus === 'Not Interested' ? 'bg-red-50 text-red-600 border-red-100' :
                                                                displayStatus === 'May be Interested' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                                    'bg-slate-50 text-slate-500 border-slate-100'
                                                            }`}>
                                                            {displayStatus}
                                                        </span>
                                                    );
                                                })()}
                                            </td>
                                            <td className="py-2 px-3 text-[10px] font-bold text-slate-500">
                                                <div className="flex items-center gap-1.5">
                                                    {getIcon(item.type)}
                                                    <span>{item.type}</span>
                                                </div>
                                            </td>
                                            <td className="py-2 px-3">
                                                {item.attachments?.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.attachments.map((att, i) => (
                                                            <a key={`att-${i}`} href={`${baseURL}${att}`} target="_blank" rel="noreferrer" className="px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[8px] font-bold hover:bg-blue-100 transition-all print:no-underline">
                                                                File {i + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-[9px] text-slate-300 font-medium tracking-tight">No Attachment</span>
                                                )}
                                            </td>
                                            <td className="py-2 px-3 text-center">
                                                {item.audioRecording ? (
                                                    <a href={`${baseURL}${item.audioRecording}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-full hover:bg-amber-100 transition-all cursor-pointer">
                                                        <Play size={10} fill="currentColor" />
                                                    </a>
                                                ) : (
                                                    <span className="text-[9px] text-slate-300 font-medium">No record</span>
                                                )}
                                            </td>
                                            <td className="py-2 px-3 text-right">
                                                <span className="text-[10px] text-slate-500 font-bold">
                                                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </td>
                                            {selectedUser === "all" && (
                                                <td className="py-2 px-3 text-right">
                                                    <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-slate-600">
                                                        {user}
                                                        <div className="w-5 h-5 rounded-full bg-slate-100 overflow-hidden shadow-sm shrink-0 border border-white">
                                                            {item.Actor?.profile_photo ? (
                                                                <img src={item.Actor.profile_photo.startsWith('http') ? item.Actor.profile_photo : `${baseURL}${item.Actor.profile_photo}`} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-slate-300">{user.charAt(0)}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {totalInteractions === 0 && !loading && (
                        <div className="py-20 text-center">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-100">
                                <Info size={20} className="text-slate-200" />
                            </div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">No Activity Found</h3>
                            <p className="text-[10px] text-slate-300">No follow-up records found for this selection.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="py-20 text-center">
                            <div className="w-8 h-8 border-2 border-slate-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading Report...</p>
                        </div>
                    )}
                </div>

                {/* Footer Logo & Disclaimer - Visible on Print */}
                <div className="p-6 border-t border-slate-100 flex justify-between items-end bg-slate-50/10">
                    <div className="flex flex-col gap-1 text-left">
                        <span className="text-[11px] font-bold text-slate-700 tracking-tight italic">SBGM Digital India Pvt. Ltd.</span>
                        <span className="text-[9px] font-medium text-slate-400 font-bold uppercase tracking-widest">Performance Analytics System</span>
                    </div>
                    <div className="text-right">
                        <span className="text-[9px] font-bold text-slate-300 uppercase block mb-1">Verification Status</span>
                        <div className="flex items-center justify-end gap-2 px-3 py-1 bg-white rounded border border-slate-100 shadow-sm">
                            <CheckCircle size={10} className="text-blue-500" />
                            <span className="text-[10px] font-bold text-slate-600">{currentUser.full_name}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page { size: A4 landscape; margin: 3mm; }
                    html, body { 
                        background: white !important; 
                        margin: 0 !important; 
                        padding: 0 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    /* Remove any overlays or dark backgrounds from parent containers */
                    .fixed, .absolute, .bg-slate-900\\/10, .backdrop-blur, [class*="bg-slate-900"] {
                        background: transparent !important;
                        backdrop-filter: none !important;
                        -webkit-backdrop-filter: none !important;
                    }
                    .print-hidden { display: none !important; }
                    nav, aside, header, .sidebar, .drawer, [role="navigation"], [role="complementary"], button, input, select { display: none !important; }
                    .main-content { width: 100% !important; margin: 0 !important; padding: 0 !important; }
                    #print-area { 
                        border: 1px solid #e2e8f0 !important; 
                        border-radius: 0 !important; 
                        background: white !important;
                        position: relative !important;
                        z-index: 9999 !important;
                    }
                    table { page-break-inside: auto; width: 100% !important; }
                    tr { page-break-inside: avoid; page-break-after: auto; }
                    h1, h2, h3, p, span, td, th { color: black !important; text-shadow: none !important; }
                    .bg-slate-50, .bg-slate-50\\/30 { background-color: #f8fafc !important; }
                    .bg-blue-600 { background-color: #2563eb !important; color: white !important; }
                }
            `}</style>
        </div>
    );
};

export default ReportSection;
