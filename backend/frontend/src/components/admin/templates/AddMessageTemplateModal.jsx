import { useState, useEffect } from "react";
import { X, Save, Loader2, Type, Image as ImageIcon, Video, FileText } from "lucide-react";
import { createMessageTemplate, updateMessageTemplate } from "../../../api/messageTemplateService";
import API from "../../../api/axios";
import { useToast } from "../../../context/ToastContext";

const AddMessageTemplateModal = ({ onClose, onSuccess, template = null }) => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: "",
        type: "text",
        content: ""
    });
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaUrl, setMediaUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadingMedia, setUploadingMedia] = useState(false);

    useEffect(() => {
        if (template) {
            console.log("Editing template:", template);
            setFormData({
                name: template.title || template.name || "",
                type: template.type || "text",
                content: template.message || template.content || ""
            });

            const mediaPath = template.mediaUrl || template.media || template.file || template.url;
            if (mediaPath) {
                if (mediaPath.startsWith('http') || mediaPath.startsWith('data:')) {
                    setMediaUrl(mediaPath);
                } else {
                    const baseUrl = (import.meta.env.VITE_API_BASE_URL_IMG || 'http://localhost:5000').trim();
                    // Remove double slashes if they exist at intersection
                    const cleanPath = mediaPath.startsWith('/') ? mediaPath.substring(1) : mediaPath;
                    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

                    const fullUrl = `${cleanBase}/${cleanPath}`;
                    console.log("Reconstructed Media URL:", fullUrl);
                    setMediaUrl(fullUrl);
                }
            } else {
                setMediaUrl("");
            }
        }
    }, [template]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMediaFile(file);
        setUploadingMedia(true);

        const uploadData = new FormData();
        uploadData.append('files', file);

        try {
            // Use /blogs/upload endpoint which handles file uploads
            const { data } = await API.post('/blogs/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // /blogs/upload returns { urls: [fullUrl, ...] }
            const uploadedUrl = data.urls?.[0] || data.url;
            if (!uploadedUrl) throw new Error("No URL returned from upload");

            setMediaUrl(uploadedUrl);
            toast.success("File uploaded successfully");
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload media");
            setMediaUrl("");
        } finally {
            setUploadingMedia(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Determine relative path for storage
            const baseUrl = (import.meta.env.VITE_API_BASE_URL_IMG || '').trim(); // https://api.sbgmdigital.com
            let storedMedia = mediaUrl;

            if (mediaUrl.startsWith(baseUrl)) {
                storedMedia = mediaUrl.replace(baseUrl, ''); // /uploads/file.jpg or uploads/file.jpg
            }

            // Ensure no double slash if logic was imperfect, or ensure slash if needed.
            // Usually DB stores "uploads/file.png" or "/uploads/file.png". 
            // Let's keep it as is from the replacement. 

            const data = {
                title: formData.name,
                type: formData.type,
                message: formData.content,
                mediaUrl: storedMedia, // Backend likely expects this
                media: storedMedia,    // Fallback
                file: storedMedia,     // Fallback
                url: mediaUrl          // Fallback
            };

            console.log("Saving template:", data);

            if (template) {
                await updateMessageTemplate(template.id, data);
                toast.success("Template updated successfully");
            } else {
                await createMessageTemplate(data);
                toast.success("Template created successfully");
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Template save error:", error);
            toast.error(error.response?.data?.message || "Failed to save template");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
            <div className="bg-white rounded border border-gray-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                        {template ? "Edit Template" : "New Message Template"}
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
                    {/* Size Warning */}
                    <div className="bg-red-50 border border-red-100 rounded px-3 py-2 text-center mb-2">
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                            ⚠️ Maximum File Size: 5MB
                        </p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                            Template Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all font-bold"
                            placeholder="e.g. Welcome Message"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                            Media Type
                        </label>
                        <div className="flex gap-2">
                            {['text', 'image', 'video', 'document'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, type }))}
                                    className={`flex-1 py-1.5 rounded text-[9px] font-bold border uppercase tracking-wider transition-all ${formData.type === type ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-gray-200 hover:border-gray-400'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                            {formData.type === 'text' ? 'Message Content' : 'Caption'} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            required
                            rows={6}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all resize-none font-medium leading-relaxed"
                            placeholder={formData.type === 'text' ? "Type your message here... Use {name} for variable replacement." : "Type your caption here... Use {name} for variable replacement."}
                        />
                        <p className="text-[9px] text-gray-400 mt-1 italic">Tip: Use {"{name}"} to insert lead name dynamically.</p>
                    </div>

                    {formData.type !== 'text' && (
                        <div className="space-y-3 animate-in slide-in-from-top-2">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
                                {formData.type} Preview & Upload
                            </label>

                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center min-h-[160px] relative group">
                                <input
                                    type="file"
                                    accept={formData.type === 'image' ? "image/*" : formData.type === 'video' ? "video/*" : ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar"}
                                    onChange={handleFileChange}
                                    disabled={uploadingMedia}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                                />

                                {uploadingMedia ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 size={24} className="text-blue-500 animate-spin" />
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Uploading...</span>
                                    </div>
                                ) : mediaUrl ? (
                                    <div className="w-full flex flex-col items-center gap-2">
                                        {formData.type === 'image' && (
                                            <img src={mediaUrl} alt="Preview" className="max-h-[140px] rounded shadow-sm object-contain" />
                                        )}
                                        {formData.type === 'video' && (
                                            <video src={mediaUrl} controls className="max-h-[140px] rounded shadow-sm w-full" />
                                        )}
                                        {formData.type === 'document' && (
                                            <div className="flex flex-col items-center gap-1 p-3 bg-white rounded border border-gray-200 shadow-sm">
                                                <FileText size={32} className="text-red-500" />
                                                <span className="text-[10px] font-medium text-gray-600 truncate max-w-[200px]">{mediaUrl.split('/').pop()}</span>
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="bg-black/70 text-white text-[9px] px-2 py-1 rounded font-bold backdrop-blur-sm">Click to Replace</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-400">
                                        {formData.type === 'image' ? <ImageIcon size={32} /> : formData.type === 'video' ? <Video size={32} /> : <FileText size={32} />}
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-center">Click to upload {formData.type}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-all uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-1.5 bg-gray-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading && <Loader2 size={12} className="animate-spin" />}
                            {template ? "Update Template" : "Create Template"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMessageTemplateModal;
