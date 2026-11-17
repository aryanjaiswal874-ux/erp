import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import DashboardLoader from '../../components/layout/DashboardLoader';
import DataTable from '../../components/shared/DataTable';

const Support = () => {
    const toast = useToast();
    const [tickets, setTickets] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTicket, setNewTicket] = useState({ subject: '', message: '', category: 'General', priority: 'Medium' });
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await API.get('/support');
            setTickets(response.data);
        } catch (error) {
            console.error("Failed to fetch tickets", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await API.post('/support', newTicket);
            setTickets([response.data, ...tickets]);
            setShowCreateModal(false);
            setNewTicket({ subject: '', message: '', category: 'General', priority: 'Medium' });
            toast.success("Support ticket has been registered.");
        } catch (error) {
            console.error("Failed to create ticket", error);
            toast.error("Submission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 font-sans pb-20">
            {/* Header Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Support Center</p>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-6">Expert Assistance</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="bg-slate-900 text-white px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md"
                            >
                                <Send size={14} /> Raise Ticket
                            </button>
                            <a
                                href="https://wa.me/919239707303"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-white text-green-600 border border-green-200 px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-green-50 transition-all flex items-center gap-2 shadow-md"
                            >
                                <MessageCircle size={14} /> WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Company Contact Info */}
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                        <h3 className="text-[10px] font-black text-slate-800 mb-6 uppercase tracking-[0.2em]">Contact Information</h3>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-900">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Address</p>
                                    <p className="text-xs font-bold text-slate-800 leading-relaxed">High School Road, Gobindakati, Sridharkati,<br />North 24 Parganas, West Bengal, 743439, India</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-900">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Email</p>
                                    <p className="text-sm font-black text-slate-800">sbgmdigitalindiapvtltd@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-900">
                                    <Phone size={16} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Mobile</p>
                                    <p className="text-sm font-black text-slate-800">+91 9239707303, +91 8274973335</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticket Management Section */}
            <div>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Clock size={14} /> Resolved & Pending Inquiries
                </h2>

                {isLoading && tickets.length === 0 ? (
                    <DashboardLoader loading={true} title="Syncing Records" />
                ) : (
                    <DataTable
                        columns={[
                            {
                                header: 'Reference ID',
                                key: 'id',
                                sortable: true,
                                render: (row) => <span className="font-black text-slate-400 uppercase tracking-tighter">#{row.id.substring(0, 8).toUpperCase()}</span>
                            },
                            {
                                header: 'Subject Architecture',
                                key: 'subject',
                                sortable: true,
                                render: (row) => (
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Resolved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                        <span className="font-black text-slate-900 uppercase tracking-tight">{row.subject}</span>
                                    </div>
                                )
                            },
                            {
                                header: 'Department',
                                key: 'category',
                                sortable: true,
                                render: (row) => <span className="font-bold text-slate-500 uppercase text-[9px] tracking-widest">{row.category || 'General'}</span>
                            },
                            {
                                header: 'Temporal Log',
                                key: 'createdAt',
                                sortable: true,
                                render: (row) => <span className="font-bold text-slate-400 text-[10px]">{new Date(row.createdAt).toLocaleDateString('en-GB')}</span>
                            },
                            {
                                header: 'Protocol Status',
                                key: 'status',
                                sortable: true,
                                render: (row) => (
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${row.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        row.status === 'Open' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            'bg-slate-50 text-slate-600 border-slate-100'
                                        }`}>
                                        {row.status}
                                    </span>
                                )
                            }
                        ]}
                        data={tickets}
                        fileName="Support_Ticket_Registry"
                        pageSize={10}
                    />
                )}
            </div>


            {/* Create Ticket Modal */}
            {
                showCreateModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-md shadow-2xl w-full max-w-lg overflow-hidden">
                            <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                                <h3 className="text-xs font-black text-white uppercase tracking-widest">New Support Entry</h3>
                                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleCreateTicket} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-slate-200 rounded px-4 py-3 text-xs font-bold outline-none focus:border-slate-900 transition-all"
                                        placeholder="Brief nature of issue"
                                        value={newTicket.subject}
                                        onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Department</label>
                                        <select
                                            className="w-full border border-slate-200 rounded px-4 py-3 text-xs font-bold outline-none focus:border-slate-900 bg-white"
                                            value={newTicket.category}
                                            onChange={e => setNewTicket({ ...newTicket, category: e.target.value })}
                                        >
                                            <option>General</option>
                                            <option>Billing</option>
                                            <option>Technical</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Priority</label>
                                        <select
                                            className="w-full border border-slate-200 rounded px-4 py-3 text-xs font-bold outline-none focus:border-slate-900 bg-white"
                                            value={newTicket.priority}
                                            onChange={e => setNewTicket({ ...newTicket, priority: e.target.value })}
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Description</label>
                                    <textarea
                                        required
                                        rows="5"
                                        className="w-full border border-slate-200 rounded px-4 py-3 text-xs font-bold outline-none focus:border-slate-900 resize-none"
                                        placeholder="Provide operational details..."
                                        value={newTicket.message}
                                        onChange={e => setNewTicket({ ...newTicket, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="pt-2 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-slate-900 text-white py-3 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70"
                                    >
                                        {loading ? 'Submitting...' : 'Confirm Entry'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Support;
