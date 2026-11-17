import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, MapPin, Image as ImageIcon, Search, Clock, Shield, AlertCircle, X } from "lucide-react";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "../../api/makEventService";
import { useToast } from "../../context/ToastContext";

const MAKEventManagement = () => {
    const toast = useToast();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        isActive: true,
        image: null
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const { data } = await getAllEvents();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
            toast.error("Failed to fetch events");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (event = null) => {
        if (event) {
            setSelectedEvent(event);
            setFormData({
                title: event.title,
                description: event.description,
                date: new Date(event.date).toISOString().split('T')[0],
                location: event.location,
                isActive: event.isActive,
                image: null
            });
        } else {
            setSelectedEvent(null);
            setFormData({
                title: "",
                description: "",
                date: "",
                location: "",
                isActive: true,
                image: null
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("date", formData.date);
        data.append("location", formData.location);
        data.append("isActive", formData.isActive);
        if (formData.image) data.append("image", formData.image);

        try {
            if (selectedEvent) {
                await updateEvent(selectedEvent.id, data);
                toast.success("Event updated successfully");
            } else {
                await createEvent(data);
                toast.success("Event created successfully");
            }
            setIsModalOpen(false);
            fetchEvents();
        } catch (error) {
            console.error("Error saving event:", error);
            toast.error("Failed to save event");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
        try {
            await deleteEvent(id);
            toast.success("Event deleted successfully");
            fetchEvents();
        } catch (error) {
            toast.error("Failed to delete event");
        }
    };

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white px-6 py-6 border border-gray-200 rounded-sm shadow-sm">
                <div>
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">MAK Event Intelligence</h1>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">Strategic scheduling and field operation management</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-sm hover:bg-black font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-200"
                >
                    <Plus size={14} />
                    Schedule New Mission
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 border border-gray-200 rounded-sm flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="SEARCH OPERATIONS BY TITLE OR LOCATION..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[11px] font-bold uppercase tracking-wider outline-none focus:border-indigo-500 focus:bg-white transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Event Grid */}
            {loading && events.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Event Ledger...</p>
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-sm p-20 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
                        <AlertCircle className="text-gray-300" size={40} />
                    </div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">No Strategic Events Found</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 px-4">The operation repository is currently empty or no matches found for your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                            <div className="h-48 bg-slate-100 relative overflow-hidden">
                                {event.image ? (
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL_IMG || 'http://localhost:5577'}${event.image}`}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-none shadow-lg ${event.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                        {event.isActive ? 'Active Mission' : 'Standby'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                                    <MapPin size={12} /> {event.location || 'Central Command'}
                                </div>
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase">
                                    {event.title}
                                </h3>
                                <p className="text-[11px] text-gray-500 font-bold leading-relaxed mb-6 line-clamp-3 uppercase">
                                    {event.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Clock size={14} className="text-indigo-400" />
                                        {new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenModal(event)}
                                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors rounded-none"
                                            title="Edit Mission"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-none"
                                            title="Abort Mission"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-indigo-950/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-6 bg-indigo-950 text-white flex justify-between items-center border-b border-indigo-900">
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em]">
                                    {selectedEvent ? 'Adjust Strategic Intel' : 'Initialize Mission Protocol'}
                                </h2>
                                <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Strategic Command Interface</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-indigo-900 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2 space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Operational Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-xs font-bold uppercase tracking-wider focus:border-indigo-600 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                        placeholder="E.G., HUMAN RIGHTS SUMMIT 2026"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Deployment Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-xs font-bold uppercase tracking-wider focus:border-indigo-600 focus:bg-white outline-none transition-all"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Target Coordinates (Location)</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-xs font-bold uppercase tracking-wider focus:border-indigo-600 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                        placeholder="CITY, STATE"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>

                                <div className="col-span-2 space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Mission Intelligence (Description)</label>
                                    <textarea
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-xs font-bold uppercase tracking-wider focus:border-indigo-600 focus:bg-white outline-none transition-all placeholder:text-gray-300 resize-none"
                                        placeholder="PROVIDE FULL OPERATIONAL CONTEXT..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Field Imagery (Optional)</label>
                                    <div className="relative border-2 border-dashed border-gray-200 bg-gray-50 p-4 text-center cursor-pointer hover:border-indigo-400 transition-colors">
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <ImageIcon size={24} className="text-gray-400" />
                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                                                {formData.image ? formData.image.name : 'Upload Data Packet'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Mission Status:</label>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                        className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all ${formData.isActive ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}
                                    >
                                        {formData.isActive ? 'Active Mission' : 'Standby Mode'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                                >
                                    Cancel protocol
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-10 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-black transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Initializing...' : selectedEvent ? 'Synchronize Updates' : 'Authorize Mission'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MAKEventManagement;
