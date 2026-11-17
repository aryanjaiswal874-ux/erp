import { useState } from "react";
import { Lock, Check, AlertCircle, Save } from "lucide-react";
import API from "../../api/axios";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: "New passwords do not match." });
            return;
        }

        if (formData.newPassword.length < 6) {
            setMessage({ type: 'error', text: "Password must be at least 6 characters long." });
            return;
        }

        setLoading(true);
        try {
            await API.post("/auth/change-password", {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            setMessage({ type: 'success', text: "Password changed successfully!" });
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || "Failed to change password." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6 font-sans">
            <div className="flex justify-between items-center bg-white p-6 border border-slate-100 rounded-xl shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Change Password</h1>
                    <p className="text-sm text-slate-500 mt-1">Update your account security credentials</p>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-8">
                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Current Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-slate-400" size={16} />
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900"
                                placeholder="Enter current password"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900"
                                placeholder="Min 6 characters"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900"
                                placeholder="Re-enter new password"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 text-white px-8 py-2.5 text-sm font-bold rounded-lg hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2 disabled:opacity-70"
                        >
                            {loading ? 'Updating...' : <><Save size={18} /> Update Password</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
