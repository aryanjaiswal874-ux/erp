import React, { useState, useEffect } from "react";
import { Search, Filter, MessageSquare, CheckCircle, Clock, AlertCircle, X, Send } from "lucide-react";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";

const SupportTicketManagement = () => {
    const toast = useToast();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        fetchTickets();
    }, [refreshTrigger]);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/support/all');
            setTickets(data);
            if (selectedTicket) {
                const updated = data.find(t => t.id === selectedTicket.id);
                if (updated) setSelectedTicket(updated);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredTickets = tickets.filter(t => filterStatus === 'All' || t.status === filterStatus);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await API.put(`/support/${id}`, { status: newStatus });
            setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
            if (selectedTicket && selectedTicket.id === id) {
                setSelectedTicket({ ...selectedTicket, status: newStatus });
            }
            toast.success(`Ticket marked as ${newStatus}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    const sendReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim() || !selectedTicket) return;

        try {
            await API.post(`/support/${selectedTicket.id}/reply`, {
                message: replyText,
                status: 'In Progress'
            });
            setReplyText("");
            setRefreshTrigger(prev => prev + 1);
            toast.success("Reply sent");
        } catch (error) {
            console.error(error);
            toast.error("Failed to send reply");
        }
    };

    const getMessages = (ticket) => {
        return ticket.TicketMessages || [];
    };

    return (
        <div className="space-y-4 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 border border-slate-200 rounded-md shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Support Tickets</h1>
                    <p className="text-sm text-slate-500">Manage and resolve user queries</p>
                </div>
                <div className="flex gap-1 bg-slate-100 p-1 rounded border border-slate-200">
                    {['All', 'Open', 'In Progress', 'Resolved'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${filterStatus === status
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
                {/* List */}
                <div className="bg-white border border-slate-200 rounded-md overflow-hidden flex flex-col shadow-sm">
                    <div className="p-3 border-b border-slate-100 bg-slate-50">
                        <div className="relative">
                            <Search className="absolute left-3 top-2 text-slate-400" size={14} />
                            <input
                                placeholder="Search..."
                                className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-1">
                        {loading && <div className="p-4 text-center text-xs text-slate-400">Loading...</div>}
                        {!loading && filteredTickets.length === 0 && <div className="p-8 text-center text-xs text-slate-400">No tickets.</div>}

                        {filteredTickets.map(ticket => (
                            <div
                                key={ticket.id}
                                onClick={() => setSelectedTicket(ticket)}
                                className={`p-3 rounded border cursor-pointer transition-all ${selectedTicket?.id === ticket.id
                                    ? 'bg-slate-50 border-slate-400'
                                    : 'bg-white border-slate-100 hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-[10px] text-slate-400">#{ticket.id.split('-')[0].slice(0, 6)}</span>
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${ticket.status === 'Open' ? 'text-red-600 bg-red-50' :
                                        ticket.status === 'Resolved' ? 'text-green-600 bg-green-50' :
                                            'text-indigo-600 bg-indigo-50'
                                        }`}>
                                        {ticket.status}
                                    </span>
                                </div>
                                <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{ticket.subject}</h3>
                                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                                    <span>{ticket.User?.full_name}</span>
                                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-md overflow-hidden flex flex-col shadow-sm">
                    {selectedTicket ? (
                        <>
                            <div className="p-4 border-b border-slate-100 flex justify-between items-start bg-white">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-md font-bold text-slate-900">{selectedTicket.subject}</h2>
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${selectedTicket.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'}`}>
                                            {selectedTicket.priority}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-medium">
                                        {selectedTicket.User?.full_name} ({selectedTicket.User?.email}) • {selectedTicket.category}
                                    </div>
                                </div>
                                <div>
                                    {selectedTicket.status !== 'Resolved' && (
                                        <button
                                            onClick={() => handleStatusChange(selectedTicket.id, 'Resolved')}
                                            className="bg-green-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-green-700 transition-colors"
                                        >
                                            Resolve
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3">
                                {getMessages(selectedTicket).map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] rounded p-3 border ${msg.senderRole === 'admin'
                                            ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                                            : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                                            }`}>
                                            <p className="text-xs">{msg.message}</p>
                                            <p className={`text-[9px] mt-2 ${msg.senderRole === 'admin' ? 'text-slate-400' : 'text-slate-400'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-3 border-t border-slate-100 bg-white">
                                <form onSubmit={sendReply} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Type reply..."
                                        className="flex-1 border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!replyText.trim()}
                                        className="bg-slate-900 text-white px-4 py-2 rounded font-bold text-xs uppercase hover:bg-slate-800 disabled:opacity-50"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                            <MessageSquare size={48} className="mb-2 opacity-10" />
                            <p className="font-bold text-sm uppercase tracking-widest">Select Ticket</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupportTicketManagement;
