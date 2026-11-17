import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import { Plus, Edit, Trash2, CheckCircle, XCircle, Save, FolderOpen, Image as ImageIcon } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import DashboardLoader from "../../components/layout/DashboardLoader";

const ServiceGroupManagement = () => {
    const toast = useToast();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentGroup, setCurrentGroup] = useState({
        name: "",
        description: "",
        image: ""
    });

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const { data } = await API.get("/products/groups/all");
            setGroups(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await API.put(`/products/groups/${currentGroup.id}`, currentGroup);
            } else {
                await API.post("/products/groups", currentGroup);
            }
            setShowModal(false);
            fetchGroups();
            resetForm();
            toast.success(`Category ${editMode ? 'updated' : 'created'} successfully`);
        } catch (error) {
            toast.error("Error saving category");
        }
    };

    const resetForm = () => {
        setCurrentGroup({
            name: "",
            description: "",
            image: ""
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await API.delete(`/products/groups/${id}`);
                fetchGroups();
                toast.success("Category deleted");
            } catch (error) {
                toast.error("Deletion failed");
            }
        }
    };

    if (loading) return <DashboardLoader loading={true} title="Loading Categories" />;

    return (
        <div className="space-y-6 pb-20 font-sans">
            <div className="flex justify-between items-center bg-white p-6 border border-slate-100 rounded-xl shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Service Categories</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage service categories</p>
                </div>
                <button
                    onClick={() => { setEditMode(false); resetForm(); setShowModal(true); }}
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-slate-800 transition-all rounded-lg shadow-md"
                >
                    <Plus size={18} /> Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <div key={group.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
                        <div className="h-40 bg-slate-100 relative group overflow-hidden">
                            <img
                                src={group.image || "https://placehold.co/600x400/f1f5f9/94a3b8?text=NO+IMAGE"}
                                alt={group.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-lg font-bold text-white shadow-sm">{group.name}</h3>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                                {group.description || "No description provided."}
                            </p>
                            <div className="mt-auto pt-4 border-t border-slate-50 flex gap-3">
                                <button
                                    onClick={() => { setEditMode(true); setCurrentGroup(group); setShowModal(true); }}
                                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(group.id)}
                                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                            <h3 className="text-lg font-bold text-slate-800">
                                {editMode ? 'Edit Category' : 'Add New Category'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors"><XCircle size={20} /></button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Category Name</label>
                                <div className="relative">
                                    <FolderOpen size={18} className="absolute left-3 top-2.5 text-slate-400" />
                                    <input
                                        required
                                        type="text"
                                        value={currentGroup.name}
                                        onChange={(e) => setCurrentGroup({ ...currentGroup, name: e.target.value })}
                                        placeholder="e.g. GST Services"
                                        className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Image URL</label>
                                <div className="relative">
                                    <ImageIcon size={18} className="absolute left-3 top-2.5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={currentGroup.image}
                                        onChange={(e) => setCurrentGroup({ ...currentGroup, image: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Description</label>
                                <textarea
                                    rows="4"
                                    value={currentGroup.description}
                                    onChange={(e) => setCurrentGroup({ ...currentGroup, description: e.target.value })}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-400"
                                    placeholder="Enter category description..."
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
                                <Save size={18} /> Save Category
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceGroupManagement;
