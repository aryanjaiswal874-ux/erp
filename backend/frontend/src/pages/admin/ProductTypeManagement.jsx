import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import { Plus, Edit, Trash2, CheckCircle, XCircle, Save, Layers, FolderOpen } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import DashboardLoader from "../../components/layout/DashboardLoader";

const ProductTypeManagement = () => {
    const toast = useToast();
    const [types, setTypes] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentType, setCurrentType] = useState({
        name: "",
        serviceGroupId: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const groupsRes = await API.get("/products/groups/all");
            setGroups(groupsRes.data);
            const typesRes = await API.get("/products/types/all");
            setTypes(typesRes.data);
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
                await API.put(`/products/types/${currentType.id}`, currentType);
            } else {
                await API.post("/products/types", currentType);
            }
            setShowModal(false);
            fetchData();
            resetForm();
            toast.success(`Service type ${editMode ? 'updated' : 'created'} successfully`);
        } catch (error) {
            toast.error("Error saving type");
        }
    };

    const resetForm = () => {
        setCurrentType({
            name: "",
            serviceGroupId: ""
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this service type?")) {
            try {
                await API.delete(`/products/types/${id}`);
                fetchData();
                toast.success("Service type deleted");
            } catch (error) {
                toast.error("Deletion failed");
            }
        }
    };

    if (loading) return <DashboardLoader loading={true} title="Loading Service Types" />;

    return (
        <div className="space-y-6 pb-20 font-sans">
            <div className="flex justify-between items-center bg-white p-6 border border-slate-100 rounded-xl shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Service Types</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage service sub-types</p>
                </div>
                <button
                    onClick={() => { setEditMode(false); resetForm(); setShowModal(true); }}
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-slate-800 transition-all rounded-lg shadow-md"
                >
                    <Plus size={18} /> Add Service Type
                </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                            <th className="px-6 py-4 w-20 text-center">Icon</th>
                            <th className="px-6 py-4">Type Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                        {types.map((type) => (
                            <tr key={type.id} className="hover:bg-slate-50 transition-all">
                                <td className="px-6 py-4 text-center">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-500">
                                        <Layers size={16} />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">{type.name}</td>
                                <td className="px-6 py-4 text-slate-500">
                                    {groups.find(g => g.id === type.serviceGroupId)?.name || 'Uncategorized'}
                                </td>
                                <td className="px-6 py-4 text-center space-x-3">
                                    <button onClick={() => { setEditMode(true); setCurrentType(type); setShowModal(true); }} className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">Edit</button>
                                    <button onClick={() => handleDelete(type.id)} className="text-red-500 hover:text-red-700 font-medium transition-colors">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                            <h3 className="text-lg font-bold text-slate-800">
                                {editMode ? 'Edit Service Type' : 'Add Service Type'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors"><XCircle size={20} /></button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-4">Service Type Details</label>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Category</label>
                                        <div className="relative">
                                            <FolderOpen size={18} className="absolute left-3 top-2.5 text-slate-400" />
                                            <select
                                                required
                                                value={currentType.serviceGroupId}
                                                onChange={(e) => setCurrentType({ ...currentType, serviceGroupId: e.target.value })}
                                                className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all bg-white"
                                            >
                                                <option value="">Select Category</option>
                                                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Type Name</label>
                                        <div className="relative">
                                            <Layers size={18} className="absolute left-3 top-2.5 text-slate-400" />
                                            <input
                                                required
                                                type="text"
                                                value={currentType.name}
                                                onChange={(e) => setCurrentType({ ...currentType, name: e.target.value })}
                                                placeholder="e.g. Registration"
                                                className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
                                <Save size={18} /> Save Service Type
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTypeManagement;
