import { useState, useEffect } from "react";
import { X, Send, Image as ImageIcon, FileText, Video, Loader2 } from "lucide-react";
import API from "../../../api/axios";
import { useToast } from "../../../context/ToastContext";

const WhatsAppSender = ({ onClose, selectedLeads, apiUrl, onSuccess, initialMessage = "", initialType = "text", currentUserId }) => {
    const toast = useToast();
    const [step, setStep] = useState(1); // 1: Select Template/Compose, 2: Confirm
    const [templates, setTemplates] = useState([]);
    const [loadingTemplates, setLoadingTemplates] = useState(false);

    // Message State
    const [messageType, setMessageType] = useState(initialType); // text, image, video, document
    const [message, setMessage] = useState(initialMessage); // For text or caption
    const [mediaUrl, setMediaUrl] = useState("");
    const [fileName, setFileName] = useState(""); // For documents

    const [sending, setSending] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState({ success: 0, failed: 0 });

    const [mediaFile, setMediaFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        setLoadingTemplates(true);
        try {
            const { data } = await API.get("/message-templates");
            setTemplates(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load templates");
        } finally {
            setLoadingTemplates(false);
        }
    };

    const handleTemplateSelect = (template) => {
        setMessageType(template.type);
        setMessage(template.message || template.content || "");
        const rawMedia = template.media || template.mediaUrl || template.file || template.url;
        if (rawMedia) {
            const baseUrl = (import.meta.env.VITE_API_BASE_URL_IMG || 'http://localhost:5000').trim();
            if (rawMedia.startsWith('http') || rawMedia.startsWith('data:')) {
                setMediaUrl(rawMedia);
                setPreview(rawMedia);
            } else {
                const url = `${baseUrl}${rawMedia.startsWith('/') ? '' : '/'}${rawMedia}`;
                setMediaUrl(url); // Use full URL for external send
                setPreview(url);
            }
        } else {
            setMediaUrl("");
            setPreview(null);
        }
        setFileName(rawMedia ? rawMedia.split('/').pop() : "");
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMediaFile(file);
        setPreview(URL.createObjectURL(file));
        setUploading(true);

        const formData = new FormData();
        formData.append('files', file); // /blogs/upload uses 'files' array
        try {
            const { data } = await API.post('/blogs/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            // /blogs/upload returns { urls: [fullUrl, ...] }
            const uploadedUrl = data.urls?.[0] || data.url;
            if (!uploadedUrl) throw new Error("No URL returned from upload");

            setMediaUrl(uploadedUrl);
            if (messageType === 'document') setFileName(file.name);
            toast.success("File uploaded!");
        } catch (err) {
            console.error(err);
            toast.error("Upload failed");
            setMediaUrl("");
        } finally {
            setUploading(false);
        }
    };

    const handleSend = async () => {
        if (!mediaUrl && messageType !== 'text') {
            toast.error("Please upload media or provide a URL");
            return;
        }

        setSending(true);
        setStep(3); // Sending Progress
        let s = 0;
        let f = 0;

        for (let i = 0; i < selectedLeads.length; i++) {
            const lead = selectedLeads[i];
            let number = lead.whatsapp || lead.contact;
            if (!number) continue;

            try {
                // Ensure number is in 10-digit format for backend to handle
                let cleanNumber = number.replace(/\D/g, '');
                if (cleanNumber.length > 10) cleanNumber = cleanNumber.slice(-10);

                if (apiUrl) {
                    // EXTERNAL API MODE (e.g. MAK)
                    let endpoint = "";
                    let fetchOptions = {
                        method: 'POST',
                        headers: { 'apikey': 'sbgm834004' } // Keeping user's apikey if relevant, though not in provided spec.Spec didn't mention it.
                    };

                    if (messageType === 'text') {
                        // User specified: https://whatsappmak.manavadhikarkendra.org/send
                        endpoint = `${apiUrl}/send`;
                        fetchOptions.headers['Content-Type'] = 'application/json';
                        fetchOptions.body = JSON.stringify({
                            number: cleanNumber,
                            message: message
                        });
                    } else if (messageType === 'image') {
                        // User specified: https://whatsappmak.manavadhikarkendra.org/send-image (multipart)
                        endpoint = `${apiUrl}/send-image`;
                        const formData = new FormData();
                        formData.append('number', cleanNumber);
                        formData.append('message', message || "");

                        if (mediaFile) {
                            formData.append('image', mediaFile);
                        } else if (mediaUrl) {
                            // If we only have URL (from template), we must fetch it as blob
                            try {
                                const blobRes = await fetch(mediaUrl);
                                const blob = await blobRes.blob();
                                const file = new File([blob], fileName || "image.jpg", { type: blob.type });
                                formData.append('image', file);
                            } catch (blobErr) {
                                console.error("Blob conversion failed", blobErr);
                                throw new Error("Could not process image from URL for MAK API");
                            }
                        }
                        fetchOptions.body = formData;
                        // For FormData, Fetch will set Content-Type with boundary automatically
                    } else {
                        // For video/doc, MAK didn't provide specs, so fallback to generic or throw
                        throw new Error(`Message type ${messageType} not supported for MAK API yet`);
                    }

                    console.log(`[WhatsAppSender] Sending to MAK API: ${endpoint}`);
                    const response = await fetch(endpoint, fetchOptions);
                    const resData = await response.json();

                    if (response.ok && (resData.status === "sent" || resData.success === true || resData.message?.toLowerCase().includes("sent"))) {
                        s++;
                        toast.success(`Sent to ${lead.name}`);
                    } else {
                        f++;
                        toast.error(`Failed for ${lead.name}: ${resData.message || resData.error || "Unknown error"}`);
                    }
                } else {
                    // INTERNAL BACKEND MODE (SBGM) - Connected Phone
                    console.log(`[WhatsAppSender] Sending via SBGM Backend for ${number}`);
                    const response = await API.post("/admin/send-whatsapp", {
                        number: cleanNumber,
                        message,
                        messageType,
                        mediaUrl,
                        fileName: fileName || 'document.pdf'
                    });

                    if (response.data.status === "sent") {
                        s++;
                        toast.success(`Sent to ${lead.name}`);
                    } else {
                        f++;
                        toast.error(`Failed for ${lead.name}: ${response.data.error || "Backend error"}`);
                    }
                }

            } catch (err) {
                console.error(`Failed to send to ${number}`, err);
                f++;
            }
            setProgress(Math.round(((i + 1) / selectedLeads.length) * 100));
        }

        setResults({ success: s, failed: f });
        setSending(false);
        if (onSuccess) onSuccess();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
            <div className="bg-white rounded-md shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-100 p-1.5 rounded-full">
                            <Send size={14} className="text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-800">Send WhatsApp</h2>
                            <p className="text-[10px] text-gray-500">
                                To: <span className="font-bold text-blue-600">{selectedLeads.length} recipients</span>
                            </p>
                        </div>
                    </div>
                    {!sending && (
                        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                            <X size={16} className="text-gray-500" />
                        </button>
                    )}
                </div>

                {/* Body */}
                <div className="p-5 overflow-y-auto flex-1 bg-white">
                    {step === 1 && (
                        <div className="space-y-4">
                            {/* Size Warning */}
                            <div className="bg-red-50 border border-red-100 rounded px-3 py-2 text-center mb-2">
                                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                                    ⚠️ Maximum File Size: 5MB
                                </p>
                            </div>

                            {/* Template Selection */}
                            <div className="bg-blue-50/50 p-3 rounded-md border border-blue-50">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                                    Template
                                </label>
                                <select
                                    onChange={(e) => {
                                        const t = templates.find(t => t.id === e.target.value);
                                        if (t) handleTemplateSelect(t);
                                    }}
                                    className="w-full text-xs border-gray-200 rounded-sm shadow-sm focus:border-green-500 focus:ring-green-500 py-1.5 bg-white"
                                >
                                    <option value="">Select a template...</option>
                                    {templates.map(t => (
                                        <option key={t.id} value={t.id}>{t.title || t.name} ({t.type})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Message Type */}
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                                    Message Type
                                </label>
                                <div className="flex gap-2">
                                    {['text', 'image', 'video', 'document'].map(type => (
                                        <label key={type} className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 rounded-md border text-[10px] font-bold cursor-pointer transition-all ${messageType === type ? 'bg-green-50 border-green-500 text-green-700 shadow-sm' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                                            <input
                                                type="radio"
                                                name="msgType"
                                                value={type}
                                                checked={messageType === type}
                                                onChange={(e) => {
                                                    setMessageType(e.target.value);
                                                    setMediaUrl("");
                                                    setPreview(null);
                                                    setMediaFile(null);
                                                }}
                                                className="hidden"
                                            />
                                            {type === 'text' && <FileText size={14} />}
                                            {type === 'image' && <ImageIcon size={14} />}
                                            {type === 'video' && <Video size={14} />}
                                            {type === 'document' && <FileText size={14} />}
                                            <span className="capitalize">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Content Inputs */}
                            <div className="space-y-3">
                                {messageType !== 'text' && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                                            Upload {messageType}
                                        </label>

                                        <div className="relative group">
                                            <input
                                                type="file"
                                                accept={messageType === 'image' ? "image/*" : messageType === 'video' ? "video/*" : ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar"}
                                                onChange={handleFileSelect}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex items-center gap-3 px-3 py-2 border border-dashed border-gray-300 rounded-md bg-gray-50 hover:bg-blue-50 transition-colors">
                                                <div className="p-1.5 bg-white rounded-full shadow-sm">
                                                    {uploading ? <Loader2 size={14} className="animate-spin text-blue-500" /> : <ImageIcon size={14} className="text-gray-400" />}
                                                </div>
                                                <span className="text-xs text-gray-500 font-medium truncate">
                                                    {uploading ? "Uploading..." : mediaFile ? mediaFile.name : `Click to select ${messageType}`}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Preview */}
                                        {preview && (
                                            <div className="mt-2 border rounded-md overflow-hidden bg-black/5 flex items-center justify-center p-2">
                                                {messageType === 'image' && (
                                                    <img src={preview} alt="Preview" className="w-full h-auto max-h-[250px] object-contain rounded-sm" />
                                                )}
                                                {messageType === 'video' && (
                                                    <video src={preview} controls className="w-full h-auto max-h-[250px] rounded-sm" />
                                                )}
                                                {messageType === 'document' && (
                                                    <div className="flex items-center gap-2 p-2 bg-white rounded-sm w-full">
                                                        <FileText size={20} className="text-red-500" />
                                                        <span className="text-xs font-bold truncate">{fileName || "Document"}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                                        {messageType === 'text' ? 'Message' : 'Caption'}
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={4}
                                        placeholder={messageType === 'text' ? "Hi user, we have a great offer..." : "Add a caption..."}
                                        className="w-full text-xs border-gray-200 rounded-md focus:border-green-500 focus:ring-green-500 py-2 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col items-center justify-center py-6 space-y-4">
                            {sending ? (
                                <>
                                    <Loader2 size={32} className="text-green-600 animate-spin" />
                                    <div className="w-full max-w-[200px] bg-gray-100 rounded-full h-1.5 mt-2">
                                        <div className="bg-green-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 mt-1">Sending... {progress}%</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-1">
                                        <Send size={24} className="text-green-600" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-800">Complete!</h3>
                                    <div className="flex gap-6 text-center mt-2">
                                        <div>
                                            <p className="text-xl font-black text-green-600">{results.success}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Success</p>
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-red-500">{results.failed}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Failed</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                    {step === 1 && (
                        <button
                            onClick={handleSend}
                            disabled={sending || uploading || (!message && !mediaUrl)}
                            className="flex items-center gap-2 px-6 py-1.5 bg-green-600 text-white rounded-md text-xs font-bold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            <Send size={12} />
                            Send Message
                        </button>
                    )}
                    {step === 3 && !sending && (
                        <button
                            onClick={onClose}
                            className="px-4 py-1.5 bg-gray-800 text-white rounded-md text-xs font-bold hover:bg-black transition-all shadow-sm"
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WhatsAppSender;
