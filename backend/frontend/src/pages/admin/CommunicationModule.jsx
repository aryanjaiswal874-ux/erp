import React, { useState, useEffect, useRef } from "react";
import {
    Send, Users, Mail, Image, FileText,
    CheckCircle2, AlertCircle, Loader2, X, Search, Radio,
    Phone, MessageSquare, Paperclip, Smile, MoreVertical,
    Check, CheckCheck, Video, File, Download, User,
    BookTemplate, FileUp, FileType, FilePlus2
} from "lucide-react";
import { useLocation } from "react-router-dom";
import API from "../../api/axios";
import axios from "axios";
import { useToast } from "../../context/ToastContext";
import DashboardLoader from "../../components/layout/DashboardLoader";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { QRCodeSVG } from 'qrcode.react';

const WA_API_URL = import.meta.env.VITE_WHATSAPP_API_URL || "http://localhost:5012";

const CommunicationModule = () => {
    const toast = useToast();
    const location = useLocation();
    
    // Module States
    const [activeTab, setActiveTab] = useState("email"); // Default to Email
    const [loading, setLoading] = useState(false);

    // Email Module States
    const [sendingEmail, setSendingEmail] = useState(false);
    const [recipients, setRecipients] = useState({ users: [], leads: [], all: [] });
    const [showEmailSuccess, setShowEmailSuccess] = useState(false);
    const [emailResult, setEmailResult] = useState(null);
    const [emailFormData, setEmailFormData] = useState({
        subject: "",
        message: "",
        targetGroup: "all",
        individualEmails: [],
        imageUrl: ""
    });
    const [emailSearchTerm, setEmailSearchTerm] = useState("");
    const [showRecipientPicker, setShowRecipientPicker] = useState(false);

    // WhatsApp Module States
    const [waConnected, setWaConnected] = useState(false);
    const [waApiError, setWaApiError] = useState(null);
    const [waQR, setWaQR] = useState(null);
    const [waChats, setWaChats] = useState([]);
    const [waSelectedJid, setWaSelectedJid] = useState(null);
    const [waMessages, setWaMessages] = useState([]);
    const [waNewMsg, setWaNewMsg] = useState("");
    const [waSearchTerm, setWaSearchTerm] = useState("");
    const [waSending, setWaSending] = useState(false);
    const [waLoadingChats, setWaLoadingChats] = useState(false);
    const [waFile, setWaFile] = useState(null);
    const [waFilePreview, setWaFilePreview] = useState(null);
    const [waShowTemplates, setWaShowTemplates] = useState(false);
    const [waTemplates, setWaTemplates] = useState([]);
    const [waLoadingTemplates, setWaLoadingTemplates] = useState(false);
    const [waShowAttachMenu, setWaShowAttachMenu] = useState(false);
    
    const messagesEndRef = useRef(null);
    const waFileInputRef = useRef(null);
    const waDocInputRef = useRef(null);

    // Initial Fetch
    useEffect(() => {
        fetchRecipients();
        checkWAStatus();
        fetchWATemplates();
        const statusInterval = setInterval(checkWAStatus, 5000); 
        return () => clearInterval(statusInterval);
    }, []);

    // Separate effect for chat polling when connected
    useEffect(() => {
        let chatInterval;
        if (waConnected) {
            fetchWAChats(); // Initial fetch
            chatInterval = setInterval(fetchWAChats, 10000); // Fetch chats every 10s
        }
        return () => {
            if (chatInterval) clearInterval(chatInterval);
        };
    }, [waConnected]);

    // WhatsApp Polling & Fetching
    const checkWAStatus = async () => {
        try {
            const { data } = await axios.get(`${WA_API_URL}/health`);
            setWaConnected(data.connected);
            setWaQR(data.qr);
            setWaApiError(null);
        } catch (error) {
            console.error("WA Health Check Failed", error);
            setWaConnected(false);
            setWaApiError("API Connection Error - Check if backend is running");
        }
    };

    const fetchWAChats = async () => {
        if (!waConnected) return;
        setWaLoadingChats(true);
        try {
            const { data } = await axios.get(`${WA_API_URL}/api/chats`);
            setWaChats(data);
        } catch (error) {
            console.error("Failed to fetch WA chats", error);
        } finally {
            setWaLoadingChats(false);
        }
    };

    const fetchWAMessages = async (jid) => {
        try {
            const { data } = await axios.get(`${WA_API_URL}/api/messages/${jid}`);
            setWaMessages(data);
            scrollToBottom();
        } catch (error) {
            console.error("Failed to fetch WA messages", error);
        }
    };

    // Auto-refresh messages for selected chat
    useEffect(() => {
        let interval;
        if (waSelectedJid && waConnected) {
            fetchWAMessages(waSelectedJid);
            interval = setInterval(() => fetchWAMessages(waSelectedJid), 3000);
        }
        return () => clearInterval(interval);
    }, [waSelectedJid, waConnected]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Email Logic
    const fetchRecipients = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/mail/recipients");
            setRecipients(data);
        } catch (error) {
            console.error("Failed to fetch recipients", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!emailFormData.subject.trim() || !emailFormData.message.trim()) {
            toast.error("Please fill in subject and message.");
            return;
        }
        setSendingEmail(true);
        try {
            const { data } = await API.post("/mail/broadcast", emailFormData);
            setEmailResult(data);
            setShowEmailSuccess(true);
            setEmailFormData({
                subject: "",
                message: "",
                targetGroup: "all",
                individualEmails: [],
                imageUrl: ""
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send broadcast");
        } finally {
            setSendingEmail(false);
        }
    };

    const handleSendWAMessage = (e) => {
        e?.preventDefault();
        handleWAsend();
    };

    // WhatsApp Actions
    const handleWAsend = async () => {
        if (!waNewMsg.trim() && !waFile) return;
        if (!waSelectedJid) return;

        setWaSending(true);
        try {
            if (waFile) {
                const formData = new FormData();
                formData.append("number", waSelectedJid);
                formData.append("caption", waNewMsg);
                
                let endpoint = "/send-image";
                
                if (waFile.type.startsWith("video/")) {
                    endpoint = "/send-media";
                    formData.append("type", "video");
                    formData.append("file", waFile);
                } else if (!waFile.type.startsWith("image/")) {
                    endpoint = "/send-media";
                    formData.append("type", "document");
                    formData.append("file", waFile);
                } else {
                    formData.append("image", waFile);
                }

                await axios.post(`${WA_API_URL}${endpoint}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await axios.post(`${WA_API_URL}/send`, {
                    number: waSelectedJid,
                    message: waNewMsg
                });
            }
            
            setWaNewMsg("");
            setWaFile(null);
            setWaFilePreview(null);
            fetchWAMessages(waSelectedJid);
        } catch (error) {
            toast.error("Failed to send WhatsApp message");
        } finally {
            setWaSending(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setWaFile(file);
            setWaShowAttachMenu(false);
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => setWaFilePreview(reader.result);
                reader.readAsDataURL(file);
            } else {
                setWaFilePreview(null);
            }
        }
    };

    // Template Functions
    const fetchWATemplates = async () => {
        setWaLoadingTemplates(true);
        try {
            const { data } = await API.get("/message-templates");
            setWaTemplates(data);
        } catch (error) {
            console.error("Failed to load templates", error);
        } finally {
            setWaLoadingTemplates(false);
        }
    };

    const handleTemplateSend = async (template) => {
        if (!waSelectedJid) {
            toast.error("Please select a chat first");
            return;
        }
        setWaSending(true);
        try {
            const rawMedia = template.media || template.mediaUrl || template.file || template.url;
            const caption = template.message || template.content || "";

            if (rawMedia && template.type !== 'text') {
                const baseUrl = (import.meta.env.VITE_API_BASE_URL_IMG || 'http://localhost:5000').trim();
                let fullUrl = rawMedia;
                if (!rawMedia.startsWith('http')) {
                    fullUrl = `${baseUrl}${rawMedia.startsWith('/') ? '' : '/'}${rawMedia}`;
                }

                // Fetch blob from URL and send as file
                const blobRes = await fetch(fullUrl);
                const blob = await blobRes.blob();
                const fileName = rawMedia.split('/').pop() || 'file';
                const file = new File([blob], fileName, { type: blob.type });

                const formData = new FormData();
                formData.append("number", waSelectedJid);
                formData.append("caption", caption);

                if (template.type === 'image') {
                    formData.append("image", file);
                    await axios.post(`${WA_API_URL}/send-image`, formData, { headers: { "Content-Type": "multipart/form-data" } });
                } else {
                    formData.append("type", template.type === 'video' ? 'video' : 'document');
                    formData.append("file", file);
                    await axios.post(`${WA_API_URL}/send-media`, formData, { headers: { "Content-Type": "multipart/form-data" } });
                }
            } else {
                await axios.post(`${WA_API_URL}/send`, {
                    number: waSelectedJid,
                    message: caption
                });
            }

            toast.success("Template sent!");
            setWaShowTemplates(false);
            fetchWAMessages(waSelectedJid);
        } catch (error) {
            console.error("Template send failed", error);
            toast.error("Failed to send template");
        } finally {
            setWaSending(false);
        }
    };

    const getFileIcon = (file) => {
        if (!file) return <File size={18} className="text-slate-400" />;
        if (file.type.startsWith('image/')) return <Image size={18} className="text-emerald-500" />;
        if (file.type.startsWith('video/')) return <Video size={18} className="text-blue-500" />;
        if (file.type === 'application/pdf') return <FileText size={18} className="text-red-500" />;
        return <File size={18} className="text-orange-500" />;
    };

    const getFileTypeLabel = (file) => {
        if (!file) return 'File';
        if (file.type.startsWith('image/')) return 'Image';
        if (file.type.startsWith('video/')) return 'Video';
        if (file.type === 'application/pdf') return 'PDF';
        if (file.type.includes('word') || file.name?.endsWith('.doc') || file.name?.endsWith('.docx')) return 'Word Doc';
        if (file.type.includes('sheet') || file.type.includes('excel') || file.name?.endsWith('.xls')) return 'Spreadsheet';
        return 'Document';
    };

    // UI Helpers
    const filteredWAChats = waChats.filter(chat => 
        chat.name?.toLowerCase().includes(waSearchTerm.toLowerCase()) ||
        chat.jid?.includes(waSearchTerm)
    );

    // Helper to get unique list of recipients
    const allUniqueRecipients = Array.from(new Map([
        ...(recipients.all || []),
        ...(recipients.leads || []).map(l => ({ ...l, role: 'lead' }))
    ].map(item => [item.email, item])).values());

    const toggleRecipient = (email) => {
        setEmailFormData(prev => ({
            ...prev,
            individualEmails: prev.individualEmails.includes(email)
                ? prev.individualEmails.filter(e => e !== email)
                : [...prev.individualEmails, email]
        }));
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col font-sans bg-slate-50/50 overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
            {/* Header + Tabs */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4 shrink-0 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shadow-md border border-slate-200 transition-transform hover:scale-105">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            Communication Hub
                            <span className="flex items-center gap-1.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Live
                            </span>
                        </h1>
                        <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest leading-none">
                            Unified Communication & Broadcasting
                        </p>
                    </div>
                </div>

                {/* Tabs Removed */}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {activeTab === "whatsapp" ? (
                    <div className="h-full flex flex-col">
                        {!waConnected ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-50 relative overflow-hidden">
                                {/* Subtle Background Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

                                <div className="max-w-md w-full p-8 bg-white rounded-2xl border border-slate-200 shadow-xl relative z-10 transition-all">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-slate-100">
                                        <div className="relative">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-10 h-10" />
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">MAK WhatsApp Connect</h2>
                                    {waApiError && (
                                        <div className="flex items-center justify-center gap-2 text-red-600 text-[10px] font-bold uppercase mb-6 py-1.5 bg-red-50 rounded-lg border border-red-100 px-4 tracking-wider">
                                            <AlertCircle size={12} />
                                            {waApiError}
                                        </div>
                                    )}
                                    <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
                                        Scan the QR code below using your WhatsApp mobile app to link your account.
                                    </p>
                                    
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner inline-block relative group">
                                        {waQR ? (
                                            <div className="flex flex-col items-center">
                                                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 transition-transform group-hover:scale-[1.02]">
                                                    <QRCodeSVG value={waQR} size={180} className="rounded-lg" level="H" />
                                                </div>
                                                <div className="mt-6 flex items-center gap-2 text-emerald-700 font-bold text-[10px] uppercase tracking-widest bg-emerald-100/50 px-4 py-2 rounded-lg border border-emerald-200">
                                                    <Loader2 size={12} className="animate-spin" />
                                                    Waiting for scan...
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-[180px] h-[180px] flex flex-col items-center justify-center text-slate-400 gap-4">
                                                <div className="relative">
                                                    <Loader2 size={40} className="animate-spin text-emerald-500" />
                                                    <MessageSquare size={16} className="absolute inset-0 m-auto text-emerald-500" />
                                                </div>
                                                <p className="font-bold text-[10px] uppercase tracking-widest">Generating QR...</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 grid grid-cols-3 gap-4">
                                        {[
                                            { t: "Step 1", d: "Open WhatsApp" },
                                            { t: "Step 2", d: "Linked Devices" },
                                            { t: "Step 3", d: "Scan Code" }
                                        ].map((step, i) => (
                                            <div key={i} className="text-center">
                                                <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{step.t}</p>
                                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{step.d}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex overflow-hidden">
                                {/* Sidebar - Chat List */}
                                <div className="w-72 lg:w-80 border-r border-slate-200 bg-white flex flex-col shrink-0">
                                    <div className="p-4 border-b border-slate-100">
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Chats</p>
                                            <button 
                                                onClick={fetchWAChats}
                                                disabled={waLoadingChats}
                                                className={`p-1.5 hover:bg-slate-100 rounded-lg transition-all ${waLoadingChats ? 'animate-spin text-emerald-600' : 'text-slate-400'}`}
                                            >
                                                <Radio size={14} />
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                                            <input 
                                                type="text" 
                                                placeholder="Search chats..."
                                                value={waSearchTerm}
                                                onChange={(e) => setWaSearchTerm(e.target.value)}
                                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                                        {waLoadingChats ? (
                                            <div className="p-8 text-center">
                                                <Loader2 className="animate-spin text-emerald-500 mx-auto mb-2" size={20} />
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading...</p>
                                            </div>
                                        ) : filteredWAChats.length > 0 ? (
                                            filteredWAChats.map((chat) => (
                                                <button
                                                    key={chat.jid}
                                                    onClick={() => setWaSelectedJid(chat.jid)}
                                                    className={`w-full flex items-center gap-3 p-4 text-left border-l-4 transition-all hover:bg-slate-50 ${waSelectedJid === chat.jid ? 'bg-emerald-50/50 border-emerald-500' : 'border-transparent'}`}
                                                >
                                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 border border-emerald-200 uppercase text-emerald-700 font-bold text-xs ring-1 ring-white">
                                                        {chat.name?.charAt(0) || chat.jid.charAt(0) || "U"}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-baseline mb-0.5">
                                                            <h3 className="text-xs font-bold text-slate-800 truncate tracking-tight">{chat.name || chat.jid.split('@')[0]}</h3>
                                                            {chat.timestamp && (
                                                                <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap ml-2">
                                                                    {new Date(chat.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex justify-between items-center gap-2">
                                                            <p className="text-[11px] text-slate-500 truncate font-medium">
                                                                {chat.lastMessage || "Click to start chat"}
                                                            </p>
                                                            {chat.unread > 0 && (
                                                                <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                                                    {chat.unread}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-10 text-center text-slate-400">
                                                <p className="text-[10px] font-bold uppercase tracking-widest">No conversations</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Chat Window */}
                                <div className="flex-1 flex flex-col bg-[#f0f2f5] relative overflow-hidden shadow-inner">
                                    {/* Wallpaper Pattern Overlay */}
                                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>

                                    {waSelectedJid ? (
                                        <>
                                            {/* Chat Header */}
                                            <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center shrink-0 relative z-10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md border-2 border-white">
                                                        {waChats.find(c => c.jid === waSelectedJid)?.name?.charAt(0) || "U"}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-bold text-slate-800 leading-tight">
                                                            {waChats.find(c => c.jid === waSelectedJid)?.name || waSelectedJid.split('@')[0]}
                                                        </h3>
                                                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-[9px] uppercase tracking-wider">
                                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                                            Online
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-slate-400">
                                                    <button className="p-2 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-all"><Video size={18} /></button>
                                                    <button className="p-2 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-all"><Phone size={16} /></button>
                                                    <div className="h-4 w-px bg-slate-200 mx-1"></div>
                                                    <button className="p-2 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-all"><MoreVertical size={18} /></button>
                                                </div>
                                            </div>

                                            {/* Messages */}
                                            <div className="flex-1 overflow-y-auto p-6 space-y-3 relative z-10 scroll-smooth custom-scrollbar">
                                                {waMessages.map((msg, idx) => (
                                                    <div 
                                                        key={msg.id || idx} 
                                                        className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
                                                    >
                                                        <div className={`max-w-[85%] lg:max-w-[70%] rounded-xl px-4 py-2 text-xs font-medium shadow-sm relative transition-all ${
                                                            msg.fromMe 
                                                                ? 'bg-[#dcf8c6] text-slate-800 rounded-tr-none' 
                                                                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                                                        }`}>
                                                            {!msg.fromMe && (
                                                                <p className="text-[9px] font-bold text-emerald-600 mb-0.5 uppercase tracking-wider">{msg.pushName || "User"}</p>
                                                            )}
                                                            {msg.mediaUrl && (
                                                                <div className="mb-2 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                                                                    {msg.type?.includes('image') ? (
                                                                        <img 
                                                                            src={msg.mediaUrl} 
                                                                            alt="Media" 
                                                                            className="max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                                                                            onClick={() => window.open(msg.mediaUrl, '_blank')}
                                                                        />
                                                                    ) : (
                                                                        <div className="p-3 flex items-center gap-3">
                                                                            <File size={20} className="text-slate-400" />
                                                                            <span className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">Document</span>
                                                                            <Download size={14} className="text-slate-400 ml-auto cursor-pointer" onClick={() => window.open(msg.mediaUrl, '_blank')} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                            <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                                            <div className="flex items-center justify-end gap-1 mt-1 opacity-50">
                                                                <span className="text-[8px] font-bold">
                                                                    {new Date(msg.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                                {msg.fromMe && (
                                                                    <CheckCheck size={12} className="text-[#34b7f1]" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div ref={messagesEndRef} />
                                            </div>

                                            {/* Template Panel */}
                                            {waShowTemplates && (
                                                <div className="absolute bottom-24 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-20 animate-in slide-in-from-bottom-4 max-h-[50%] flex flex-col">
                                                    <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 shrink-0">
                                                        <div className="flex items-center gap-2">
                                                            <FileText size={14} className="text-emerald-600" />
                                                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Message Templates</p>
                                                        </div>
                                                        <button onClick={() => setWaShowTemplates(false)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X size={14} /></button>
                                                    </div>
                                                    <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                                                        {waLoadingTemplates ? (
                                                            <div className="flex items-center justify-center py-8">
                                                                <Loader2 size={20} className="animate-spin text-emerald-500" />
                                                            </div>
                                                        ) : waTemplates.length === 0 ? (
                                                            <p className="text-center text-[10px] text-slate-400 font-bold py-8 uppercase tracking-widest">No templates available</p>
                                                        ) : (
                                                            waTemplates.map(t => {
                                                                const rawMedia = t.media || t.mediaUrl || t.file || t.url;
                                                                return (
                                                                    <div key={t.id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 transition-all group cursor-pointer" onClick={() => handleTemplateSend(t)}>
                                                                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                                                                            {t.type === 'image' ? <Image size={16} className="text-emerald-500" /> : t.type === 'video' ? <Video size={16} className="text-blue-500" /> : t.type === 'document' ? <FileText size={16} className="text-red-500" /> : <MessageSquare size={16} className="text-slate-400" />}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs font-bold text-slate-700 truncate">{t.title || t.name}</p>
                                                                            <p className="text-[10px] text-slate-400 truncate">{(t.message || t.content || '').substring(0, 60)}...</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-2 shrink-0">
                                                                            <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                                                                                t.type === 'image' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                                                                t.type === 'document' ? 'bg-red-50 text-red-600 border-red-200' :
                                                                                t.type === 'video' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                                                                'bg-slate-50 text-slate-500 border-slate-200'
                                                                            }`}>{t.type}</span>
                                                                            {rawMedia && <Paperclip size={10} className="text-slate-300" />}
                                                                            <Send size={12} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* File Preview */}
                                            {waFile && (
                                                <div className="absolute bottom-24 left-6 right-6 p-4 bg-white border border-slate-200 rounded-xl shadow-2xl z-20 animate-in slide-in-from-bottom-4">
                                                    <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 bg-slate-50 flex items-center justify-center rounded-lg border border-slate-100">
                                                                {getFileIcon(waFile)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[10px] font-bold text-slate-800 truncate max-w-[200px]">{waFile.name}</p>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{(waFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                                                    <span className="text-[8px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded border border-slate-200 uppercase">{getFileTypeLabel(waFile)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => { setWaFile(null); setWaFilePreview(null); }}
                                                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                    {waFilePreview && (
                                                        <img src={waFilePreview} alt="Preview" className="w-full max-h-48 object-contain rounded-lg shadow-inner bg-slate-50" />
                                                    )}
                                                    {!waFilePreview && !waFile.type.startsWith('image/') && (
                                                        <div className="flex items-center justify-center py-4 bg-slate-50 rounded-lg border border-slate-100">
                                                            {getFileIcon(waFile)}
                                                            <span className="ml-2 text-xs font-bold text-slate-500">{getFileTypeLabel(waFile)} ready to send</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Attach Menu Popup */}
                                            {waShowAttachMenu && (
                                                <div className="absolute bottom-20 left-4 bg-white border border-slate-200 rounded-xl shadow-2xl z-30 p-2 w-48 animate-in slide-in-from-bottom-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => { waFileInputRef.current?.click(); }}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-left transition-all group"
                                                    >
                                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                                            <Image size={14} className="text-emerald-600" />
                                                        </div>
                                                        <span className="text-[11px] font-bold text-slate-700">Photo / Video</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => { waDocInputRef.current?.click(); }}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 text-left transition-all group"
                                                    >
                                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                                            <FileText size={14} className="text-orange-600" />
                                                        </div>
                                                        <span className="text-[11px] font-bold text-slate-700">Document / PDF</span>
                                                    </button>
                                                    <div className="border-t border-slate-100 my-1"></div>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setWaShowTemplates(true); setWaShowAttachMenu(false); }}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-left transition-all group"
                                                    >
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                            <FileType size={14} className="text-blue-600" />
                                                        </div>
                                                        <span className="text-[11px] font-bold text-slate-700">Use Template</span>
                                                    </button>
                                                </div>
                                            )}

                                            {/* Input Area */}
                                            <div className="bg-white border-t border-slate-200 p-4 shrink-0 relative z-10">
                                                <form onSubmit={handleSendWAMessage} className="flex items-center gap-3 max-w-5xl mx-auto">
                                                    <div className="relative">
                                                        <button 
                                                            type="button"
                                                            onClick={() => setWaShowAttachMenu(!waShowAttachMenu)}
                                                            className={`p-2.5 rounded-xl transition-all ${waShowAttachMenu ? 'text-emerald-600 bg-emerald-50 rotate-45' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
                                                            title="Attach File / Template"
                                                        >
                                                            <FilePlus2 size={20} />
                                                        </button>
                                                    </div>
                                                    <input type="file" hidden ref={waFileInputRef} accept="image/*,video/*" onChange={handleFileChange} />
                                                    <input type="file" hidden ref={waDocInputRef} accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar" onChange={handleFileChange} />
                                                    
                                                    <div className="flex-1 relative group">
                                                        <Smile size={18} className="absolute left-3 top-2.5 text-slate-400 cursor-pointer hover:text-emerald-600 transition-colors" />
                                                        <input 
                                                            type="text" 
                                                            placeholder={waFile ? "Add a caption..." : "Type a message..."}
                                                            value={waNewMsg}
                                                            onChange={(e) => setWaNewMsg(e.target.value)}
                                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 shadow-inner"
                                                        />
                                                    </div>

                                                    <button 
                                                        type="submit"
                                                        disabled={waSending || (!waNewMsg.trim() && !waFile)}
                                                        className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 shadow-lg shadow-emerald-200 disabled:opacity-50 transition-all active:scale-95"
                                                    >
                                                        {waSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                                    </button>
                                                </form>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 select-none">
                                            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl border-4 border-white animate-bounce-subtle">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-16 h-16 grayscale opacity-20" />
                                            </div>
                                            <h2 className="text-lg font-bold text-slate-500 mb-1">WhatsApp Web</h2>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Select a chat to begin messaging</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">
                            {/* Email Broadcast Form */}
                            <div className="flex-1">
                                <form onSubmit={handleEmailSubmit} className="bg-white border border-slate-200 rounded-2xl shadow-lg flex flex-col overflow-hidden transition-all hover:shadow-xl">
                                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600">
                                                <Mail size={22} />
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-none mb-1">Email Broadcast</h2>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Communication Deployment</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-right">
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Queue Status</p>
                                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active Ready</p>
                                            </div>
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50" />
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 space-y-8">
                                        {/* Target Selection */}
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <div className="w-1 h-3 bg-orange-500 rounded-full" />
                                                1. Target Audience
                                            </label>
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                                {[
                                                    { id: "all", label: "Everyone", icon: Users, color: "bg-blue-500", count: recipients.all.length + (recipients.leads?.length || 0) },
                                                    { id: "users", label: "Members", icon: User, color: "bg-indigo-500", count: recipients.users.length },
                                                    { id: "leads", label: "Lead Gen", icon: FileText, color: "bg-purple-500", count: (recipients.leads || []).length },
                                                    { id: "individual", label: "Custom", icon: CheckCircle2, color: "bg-emerald-500", count: emailFormData.individualEmails.length }
                                                ].map(group => (
                                                    <button
                                                        key={group.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setEmailFormData(prev => ({ ...prev, targetGroup: group.id }));
                                                            if (group.id === "individual") setShowRecipientPicker(true);
                                                        }}
                                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 relative ${emailFormData.targetGroup === group.id ? 'border-orange-500 bg-orange-50/30' : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200'}`}
                                                    >
                                                        <div className={`w-8 h-8 ${group.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                                                            <group.icon size={16} />
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter leading-none mb-1">{group.label}</p>
                                                            <p className="text-[11px] text-slate-400 font-bold">{group.count}</p>
                                                        </div>
                                                        {emailFormData.targetGroup === group.id && (
                                                            <div className="absolute top-1 right-1 bg-orange-500 text-white p-0.5 rounded-full"><Check size={10} /></div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <div className="w-1 h-3 bg-orange-500 rounded-full" />
                                                2. Broadcast Subject
                                            </label>
                                            <input 
                                                type="text" 
                                                value={emailFormData.subject}
                                                onChange={(e) => setEmailFormData(prev => ({ ...prev, subject: e.target.value }))}
                                                placeholder="Enter email subject line..."
                                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 focus:bg-white outline-none transition-all shadow-inner"
                                            />
                                        </div>

                                        {/* Editor */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <div className="w-1 h-3 bg-orange-500 rounded-full" />
                                                3. Email Content
                                            </label>
                                            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-inner">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={emailFormData.message}
                                                    onChange={(c) => setEmailFormData(prev => ({ ...prev, message: c }))}
                                                    className="min-h-[300px] text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-200">
                                                <AlertCircle size={14} />
                                            </div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest italic opacity-70">Anti-Spam protocols active</p>
                                        </div>
                                        <button 
                                            type="submit"
                                            disabled={sendingEmail}
                                            className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 shadow-lg shadow-slate-200"
                                        >
                                            {sendingEmail ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                            {sendingEmail ? "Deploying..." : "Launch Campaign"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Sticky Preview Panel */}
                            <div className="w-full xl:w-80 2xl:w-96">
                                <div className="sticky top-6 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col aspect-[4/5] xl:aspect-auto xl:h-[700px]">
                                    <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                                            <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                        </div>
                                        <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Real-time Preview</p>
                                    </div>
                                    
                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex-1 bg-white rounded-xl shadow-inner overflow-hidden flex flex-col group">
                                            <div className="bg-orange-600 p-8 text-center relative overflow-hidden shrink-0">
                                                <Mail size={32} className="text-white mx-auto mb-3 relative z-10" />
                                                <h4 className="text-white font-bold text-sm leading-tight relative z-10 line-clamp-2 px-2">
                                                    {emailFormData.subject || "Define Subject Line"}
                                                </h4>
                                                {/* Decorative circles */}
                                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                                                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-black/5 rounded-full" />
                                            </div>
                                            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                                                <div 
                                                    className="text-[12px] text-slate-600 leading-relaxed preview-content prose prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: emailFormData.message || "<p style='color: #94a3b8; font-style: italic;'>Campaign content will materialize here...</p>" }}
                                                />
                                            </div>
                                            <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                                                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest italic">Hub Messenger Pro</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals - Standardized with Small Corners */}
            {showRecipientPicker && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 lg:p-6">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-none mb-1">Target Selection</h3>
                                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{emailFormData.individualEmails.length} recipients selected</p>
                            </div>
                            <button onClick={() => setShowRecipientPicker(false)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-3 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search by name or email..."
                                    value={emailSearchTerm}
                                    onChange={(e) => setEmailSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {allUniqueRecipients.filter(r => 
                                    r.full_name?.toLowerCase().includes(emailSearchTerm.toLowerCase()) || 
                                    r.email?.toLowerCase().includes(emailSearchTerm.toLowerCase())
                                ).map(user => (
                                    <div 
                                        key={user.email}
                                        onClick={() => toggleRecipient(user.email)}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${emailFormData.individualEmails.includes(user.email) ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}
                                    >
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all ${emailFormData.individualEmails.includes(user.email) ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            {emailFormData.individualEmails.includes(user.email) ? <Check size={14} strokeWidth={3} /> : <User size={16} />}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-slate-800 truncate leading-tight mb-0.5">{user.full_name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 truncate uppercase tracking-tighter">{user.role || 'Client'}</p>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button onClick={() => setShowRecipientPicker(false)} className="px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">Discard</button>
                            <button onClick={() => setShowRecipientPicker(false)} className="bg-slate-900 text-white px-8 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">Link Recipients</button>
                        </div>
                    </div>
                </div>
            )}

            {showEmailSuccess && emailResult && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[110] p-4 lg:p-6">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-white animate-in zoom-in-95 duration-200">
                         <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-50">
                            <CheckCircle2 size={32} strokeWidth={3} />
                         </div>
                         <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">Broadcast Success</h3>
                         <p className="text-slate-500 text-[12px] font-medium leading-relaxed mb-8">Your communication has been successfully queued for delivery across all selected channels.</p>
                         
                         <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Queue ID</p>
                                <p className="text-xs font-bold text-slate-700">#{emailResult.broadcastId?.slice(-6) || "N/A"}</p>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-inner">
                                <p className="text-[9px] font-bold text-emerald-600/60 uppercase tracking-widest mb-1">Impact</p>
                                <p className="text-xs font-bold text-emerald-700">{emailResult.totalRecipients || 0} Nodes</p>
                            </div>
                         </div>
                         
                         <button 
                            onClick={() => setShowEmailSuccess(false)}
                            className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                         >
                            Acknowledge
                         </button>
                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
                
                .preview-content h1 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.8rem; line-height: 1.2; }
                .preview-content h2 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.6rem; line-height: 1.2; }
                .preview-content p { margin-bottom: 0.8rem; }
                .preview-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.8rem; }
                .preview-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 0.8rem; }
            `}</style>
        </div>
    );
};

export default CommunicationModule;
