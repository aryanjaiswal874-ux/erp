import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import API from "../../api/axios";
import { Upload, FileText, Download, Trash2, Shield, Filter, Plus, X, Search, CheckCircle, ArrowLeft } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import DashboardLoader from "../../components/layout/DashboardLoader";

const MyDocuments = () => {
    const toast = useToast();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get("customerId");
    const customerName = queryParams.get("customerName");

    const [docs, setDocs] = useState([]);
    const [docTypes, setDocTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Upload Form State
    const [uploadForm, setUploadForm] = useState({
        file: null,
        name: "",
        type: "Other Documents"
    });

    const [filterCategory, setFilterCategory] = useState("All");

    useEffect(() => {
        fetchData();
    }, [customerId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const docsUrl = customerId ? `/documents?customerId=${customerId}` : "/documents";
            const [docsRes, typesRes] = await Promise.all([
                API.get(docsUrl),
                API.get("/documents/types")
            ]);
            setDocs(docsRes.data);
            setDocTypes(typesRes.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const fetchDocs = async () => {
        try {
            const url = customerId ? `/documents?customerId=${customerId}` : "/documents";
            const { data } = await API.get(url);
            setDocs(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadForm(prev => ({
                ...prev,
                file,
                name: prev.name || file.name.split('.')[0]
            }));
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!uploadForm.file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", uploadForm.file);
        formData.append("name", uploadForm.name);
        formData.append("type", uploadForm.type);
        if (customerId) {
            formData.append("customerId", customerId);
        }

        try {
            await API.post("/documents", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setShowModal(false);
            setUploadForm({ file: null, name: "", type: "Other" });
            fetchDocs();
            toast.success("Document uploaded successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanently delete this secure document?")) {
            try {
                await API.delete(`/documents/${id}`);
                fetchDocs();
                toast.success("Document deleted");
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    const categories = ["All", ...new Set(docTypes.map(t => t.category))];

    const filteredDocs = filterCategory === "All"
        ? docs
        : docs.filter(d => {
            const typeInfo = docTypes.find(t => t.name === d.type);
            return typeInfo?.category === filterCategory;
        });

    if (loading) return <DashboardLoader loading={true} title="Loading Vault" />;

    return (
        <div className="space-y-6 pb-20 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 border border-slate-200 rounded-xl shadow-sm gap-4">
                <div className="flex items-center gap-4">
                    {customerId && (
                        <div className="p-2 bg-slate-100 rounded-full text-slate-400">
                            <ArrowLeft size={16} />
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            {customerId ? `${customerName}'s Vault` : 'Documents Vault'}
                        </h2>
                        <p className="text-xs font-medium text-slate-500 mt-1">
                            {customerId ? `Encrypted repository for ${customerName}` : 'Encrypted storage for your sensitive documents'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-slate-900 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
                >
                    <Upload size={16} /> Upload New
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterCategory === cat
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocs.length > 0 ? filteredDocs.map(doc => {
                    const typeInfo = docTypes.find(t => t.name === doc.type);
                    return (
                        <div key={doc.id} className="bg-white border border-slate-200 rounded-xl hover:border-indigo-200 hover:shadow-lg transition-all group flex flex-col p-5">
                            <div className="flex justify-between items-start mb-4">
                                <a href={`${import.meta.env.VITE_API_BASE_URL}${doc.file_url}`} target="_blank" rel="noreferrer" className="bg-slate-50 p-1 rounded-lg border border-slate-100 text-slate-400 group-hover:text-indigo-600 transition-colors w-12 h-12 flex items-center justify-center overflow-hidden">
                                    {doc.file_url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                                        <img src={`${import.meta.env.VITE_API_BASE_URL}${doc.file_url}`} className="w-full h-full object-cover" alt="thumb" />
                                    ) : (
                                        <FileText size={20} />
                                    )}
                                </a>
                                <span className="bg-slate-100 text-slate-600 text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-md border border-slate-200">
                                    {typeInfo?.category || "Other"}
                                </span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1" title={doc.name}>
                                {doc.name}
                            </h3>
                            <p className="text-[10px] font-medium text-slate-400">
                                {doc.type} • Added {new Date(doc.createdAt).toLocaleDateString()}
                            </p>

                            <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                                <a
                                    href={`${import.meta.env.VITE_API_BASE_URL}${doc.file_url}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest flex items-center gap-1"
                                >
                                    <Download size={14} /> Download
                                </a>
                                <button
                                    onClick={() => handleDelete(doc.id)}
                                    className="text-slate-300 hover:text-rose-600 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="col-span-full py-20 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/30">
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Search size={20} className="text-slate-300" />
                        </div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Repository Empty</h3>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Secure Upload</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleUpload} className="p-6 space-y-5">
                            <div className="space-y-4">
                                <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-500 hover:bg-slate-50 transition-colors cursor-pointer relative group">
                                    <input
                                        type="file"
                                        id="docFile"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                        required
                                    />
                                    <label htmlFor="docFile" className="cursor-pointer block">
                                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:border-indigo-200">
                                            <Upload size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block group-hover:text-indigo-600">Select File</span>
                                        <span className="text-[8px] text-slate-400 font-bold uppercase block mt-1">PDF, JPG, PNG (MAX 10MB)</span>
                                        {uploadForm.file && (
                                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[8px] font-black uppercase tracking-widest rounded-full">
                                                <CheckCircle size={10} /> {uploadForm.file.name}
                                            </div>
                                        )}
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Document Label</label>
                                    <input
                                        required
                                        value={uploadForm.name}
                                        onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                        placeholder="e.g. TAX_DOCUMENT_2025"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Classification</label>
                                    <select
                                        value={uploadForm.type}
                                        onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white outline-none"
                                    >
                                        <option value="">Select Document Type</option>
                                        {docTypes.map(t => (
                                            <option key={t.id} value={t.name}>{t.name} ({t.category})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-slate-900 text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                            >
                                {uploading ? 'Processing...' : 'Confirm Upload'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDocuments;
