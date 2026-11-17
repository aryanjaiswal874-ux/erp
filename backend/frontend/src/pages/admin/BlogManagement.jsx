import React, { useState, useEffect, useRef } from "react";
import API from "../../api/axios";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Video,
  Globe,
  Settings,
  Eye,
  RefreshCw,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";
import DashboardLoader from "../../components/layout/DashboardLoader";
import moment from "moment";

const BlogManagement = () => {
  const toast = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("SBGM"); // SBGM, CSP, MAK
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: "",
    content: "",
    type: "image",
    mediaUrls: [],
    author: "Admin",
    isPublished: true,
    category: "SBGM",
  });

  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = ["SBGM", "CSP", "MAK"];
  const baseURL = import.meta.env.VITE_API_BASE_URL_IMG || "http://localhost:5000";

  const getMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;
    return `${baseURL}${cleanUrl}`;
  };

  useEffect(() => {
    fetchBlogs();
  }, [activeTab]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/blogs?category=${activeTab}`);
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setCurrentBlog(blog);
    } else {
      setCurrentBlog({
        title: "",
        content: "",
        type: "image",
        mediaUrls: [],
        author: "Admin",
        isPublished: true,
        category: activeTab,
      });
    }
    setIsModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    setSubmitting(true);
    try {
      const { data } = await API.post("/blogs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });
      setCurrentBlog((prev) => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...data.urls],
      }));
      toast.success(`${files.length} file(s) uploaded successfully`);
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveMedia = (index) => {
    setCurrentBlog((prev) => ({
      ...prev,
      mediaUrls: prev.mediaUrls.filter((_, i) => i !== index),
    }));
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!currentBlog.title.trim()) return toast.error("Title is required");
    
    setSubmitting(true);
    try {
      if (currentBlog.id) {
        await API.put(`/blogs/${currentBlog.id}`, currentBlog);
        toast.success("Blog updated successfully");
      } else {
        await API.post("/blogs", currentBlog);
        toast.success("Blog created successfully");
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Permanently delete this blog?")) return;
    try {
      await API.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success("Blog deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6 pb-20 font-sans">
      <DashboardLoader loading={loading} title="Loading News & Blogs" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
            <Globe className="text-blue-500" size={24} /> News & Blog Center
          </h1>
          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
            Manage announcements and updates across all platforms.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-slate-900 text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200 active:scale-95"
        >
          <Plus size={16} /> Create New Post
        </button>
      </div>

      {/* Modern Platform Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl w-fit border border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all flex items-center gap-2 ${
              activeTab === cat
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {cat === "MAK" && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />}
            {cat === "CSP" && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
            {cat === "SBGM" && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
            {cat} Portal
          </button>
        ))}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Media Preview */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                {blog.mediaUrls?.[0] ? (
                  <img
                    src={getMediaUrl(blog.mediaUrls[0])}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon size={48} strokeWidth={1} />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-lg ${
                    blog.category === "MAK" ? "bg-orange-500" : blog.category === "CSP" ? "bg-emerald-500" : "bg-blue-600"
                  }`}>
                    {blog.category}
                  </span>
                  {blog.mediaUrls?.length > 1 && (
                    <span className="bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-full text-[8px] font-black uppercase">
                      +{blog.mediaUrls.length - 1} Images
                    </span>
                  )}
                </div>
                {!blog.isPublished && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">Draft Mode</span>
                    </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-black text-slate-800 line-clamp-2 leading-snug uppercase">
                    {blog.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-3 mb-4 leading-relaxed font-medium">
                  {blog.content}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600 border border-slate-200 shadow-sm">
                      {blog.author?.charAt(0)}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">{blog.author}</span>
                  </div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                    {moment(blog.createdAt).format("DD MMM YYYY")}
                  </div>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => handleOpenModal(blog)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-sm"
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="w-10 flex items-center justify-center py-2 bg-white border border-slate-200 text-rose-500 rounded-lg hover:bg-rose-50 transition-all shadow-sm"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-white border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center opacity-40">
            <FileText size={48} className="text-slate-300 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              No reports found in {activeTab} Portal
            </p>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !submitting && setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-200 border border-white/20">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${currentBlog.id ? "bg-blue-500" : "bg-emerald-500"}`} />
                  {currentBlog.id ? "Editing Post" : "Compose New Post"}
                </h2>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">
                  Target: {currentBlog.category} Portal
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-600 shadow-sm border border-transparent hover:border-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveBlog} className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Form */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                    <input
                      required
                      value={currentBlog.title}
                      onChange={(e) => setCurrentBlog(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter a catchy headline..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                      <select
                        value={currentBlog.type}
                        onChange={(e) => setCurrentBlog(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none cursor-pointer"
                      >
                        <option value="image">Image Gallery</option>
                        <option value="video">Video Post</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Portal</label>
                      <select
                        value={currentBlog.category}
                        onChange={(e) => setCurrentBlog(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none cursor-pointer"
                      >
                        {categories.map(c => <option key={c} value={c}>{c} Platform</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Content</label>
                    <textarea
                      rows={8}
                      value={currentBlog.content}
                      onChange={(e) => setCurrentBlog(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Share your story..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none custom-scrollbar"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                    <Globe size={16} className="text-blue-500" />
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-blue-900 uppercase">Visibility Settings</p>
                      <p className="text-[8px] font-bold text-blue-600 uppercase tracking-wider">Publicly visible on selected platform website</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentBlog.isPublished}
                        onChange={(e) => setCurrentBlog(prev => ({ ...prev, isPublished: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Right Side: Media Upload */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Media Assets</label>
                    <div 
                      onClick={() => fileInputRef.current.click()}
                      className="relative h-64 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all group cursor-pointer"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 group-hover:scale-110 transition-transform">
                        <Upload className="text-slate-400 group-hover:text-blue-500" size={32} />
                      </div>
                      <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Drop Images or <span className="text-blue-500">Browse</span>
                      </p>
                      <p className="mt-1 text-[8px] font-bold text-slate-300 uppercase tracking-tighter">
                        Supports multiple JPG, PNG, WEBP (Max 5MB)
                      </p>

                      {submitting && uploadProgress > 0 && (
                        <div className="absolute inset-x-8 bottom-8">
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                            <div 
                              className="h-full bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/50" 
                              style={{ width: `${uploadProgress}%` }} 
                            />
                          </div>
                          <p className="text-center mt-2 text-[10px] font-black text-blue-500">{uploadProgress}% Uploading...</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Uploaded List */}
                  {currentBlog.mediaUrls?.length > 0 && (
                    <div className="grid grid-cols-4 gap-3">
                      {currentBlog.mediaUrls.map((url, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group/item shadow-sm">
                          <img src={getMediaUrl(url)} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveMedia(i)}
                            className="absolute inset-0 bg-black/60 opacity-0 group-item:hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-700 transition-all"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleSaveBlog}
                disabled={submitting}
                className="bg-slate-900 text-white px-8 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-50"
              >
                {submitting ? <RefreshCw className="animate-spin" size={14} /> : <Save size={14} />}
                {currentBlog.id ? "Update Post" : "Publish Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
