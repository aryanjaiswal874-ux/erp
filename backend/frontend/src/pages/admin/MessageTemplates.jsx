import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Edit, FileText, Image, Video, File, Loader2 } from "lucide-react";
import AddMessageTemplateModal from "../../components/admin/templates/AddMessageTemplateModal";
import { getAllMessageTemplates, deleteMessageTemplate } from "../../api/messageTemplateService";
import { useToast } from "../../context/ToastContext";

const MessageTemplates = () => {
    const toast = useToast();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const { data } = await getAllMessageTemplates();
            setTemplates(data);
        } catch (error) {
            console.error("Error fetching templates:", error);
            toast.error("Failed to load templates.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this template?")) return;
        try {
            await deleteMessageTemplate(id);
            setTemplates(prev => prev.filter(t => t.id !== id));
            toast.success("Template deleted successfully.");
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete template.");
        }
    };

    const handleEdit = (template) => {
        setEditingTemplate(template);
        setIsAddModalOpen(true);
    };

    const filteredTemplates = templates.filter(t => {
        const name = t.title || t.name || "";
        const content = t.message || t.content || "";
        return name.toLowerCase().includes(search.toLowerCase()) ||
            content.toLowerCase().includes(search.toLowerCase());
    });

    const getTypeIcon = (type) => {
        switch (type) {
            case 'image': return <Image size={14} className="text-purple-500" />;
            case 'video': return <Video size={14} className="text-red-500" />;
            case 'document': return <File size={14} className="text-blue-500" />;
            default: return <FileText size={14} className="text-slate-500" />;
        }
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white px-6 py-4 border border-gray-200 rounded-sm shadow-sm ring-1 ring-gray-100/50">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Message Templates</h1>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">Manage reusable message templates for WhatsApp</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { setEditingTemplate(null); setIsAddModalOpen(true); }}
                        className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white rounded-sm hover:bg-black font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm"
                    >
                        <Plus size={12} />
                        New Template
                    </button>
                </div>
            </div>

            {/* Search & List */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden min-h-[60vh]">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-1.5 w-full max-w-sm focus-within:border-blue-300 transition-all">
                        <Search size={14} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            className="bg-transparent border-none outline-none text-[11px] font-medium w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 size={24} className="text-blue-500 animate-spin mb-3" />
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Loading templates...</span>
                    </div>
                ) : filteredTemplates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FileText size={32} className="text-gray-200 mb-3" />
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">No templates found</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {filteredTemplates.map(template => (
                            <div key={template.id} className="group relative bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1.5 rounded-md shadow-sm backdrop-blur-sm">
                                    <button onClick={() => handleEdit(template)} className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                                        <Edit size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(template.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                            {getTypeIcon(template.type)}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-800 leading-tight">{template.title || template.name || "Untitled Template"}</h3>
                                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{template.type}</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-600 font-medium line-clamp-3 leading-relaxed bg-gray-50/50 p-2 rounded border border-gray-100/50 min-h-[4rem]">
                                        {template.message || template.content}
                                    </p>
                                    {(template.mediaUrl || template.media || template.file || template.url) && (() => {
                                        const rawMedia = template.mediaUrl || template.media || template.file || template.url;
                                        const cleanPath = rawMedia.startsWith('/') ? rawMedia.substring(1) : rawMedia;
                                        const baseUrl = (import.meta.env.VITE_API_BASE_URL_IMG || 'http://localhost:5000').trim();
                                        const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
                                        const mediaSrc = (rawMedia.startsWith('http') || rawMedia.startsWith('data:')) ? rawMedia : `${cleanBase}/${cleanPath}`;

                                        return (
                                            <div className="mt-3 rounded border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center relative group/media">
                                                {template.type === 'image' && (
                                                    <img
                                                        src={mediaSrc}
                                                        alt="Template Media"
                                                        className="w-full h-32 object-cover transition-transform group-hover/media:scale-105"
                                                    />
                                                )}
                                                {template.type === 'video' && (
                                                    <div className="w-full h-32 bg-gray-900 flex items-center justify-center relative">
                                                        <video
                                                            src={mediaSrc}
                                                            className="w-full h-32 object-contain"
                                                            controls={false}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                            <Video size={24} className="text-white drop-shadow-md" />
                                                        </div>
                                                    </div>
                                                )}
                                                {template.type === 'document' && (
                                                    <div className="w-full h-32 flex flex-col items-center justify-center gap-2 bg-blue-50/30 p-4">
                                                        <FileText size={32} className="text-blue-500" />
                                                        <span className="text-[10px] font-bold text-gray-500 truncate max-w-full px-4 text-center">
                                                            {cleanPath.split('/').pop()}
                                                        </span>
                                                    </div>
                                                )}
                                                {/* Fallback for generic file if not handled above */}
                                                {!['image', 'video', 'document'].includes(template.type) && (
                                                    <div className="w-full h-32 flex flex-col items-center justify-center gap-2 bg-gray-50 p-4">
                                                        <File size={32} className="text-gray-400" />
                                                        <span className="text-[10px] font-bold text-gray-500">Attached File</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isAddModalOpen && (
                <AddMessageTemplateModal
                    onClose={() => { setIsAddModalOpen(false); setEditingTemplate(null); }}
                    onSuccess={fetchTemplates}
                    template={editingTemplate}
                />
            )}
        </div>
    );
};

export default MessageTemplates;
