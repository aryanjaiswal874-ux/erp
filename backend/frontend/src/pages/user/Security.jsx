import React, { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";

const Security = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("New passwords do not match");
    }
    if (formData.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    setLoading(true);
    try {
      await API.post("/auth/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast.success("Password changed successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Shield className="text-indigo-600" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Security Settings
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Manage your account protection and password.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Lock size={16} className="text-slate-400" />
                Change Password
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-slate-900 outline-none transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-slate-900 outline-none transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-slate-900 outline-none transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-80">
                Security Tips
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-200">
                    Use a combination of uppercase, lowercase letters, numbers,
                    and symbols.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-200">
                    Avoid using personal information like your birthdate or
                    name.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-200">
                    Change your password every 3-6 months for maximum
                    protection.
                  </p>
                </li>
              </ul>
            </div>
            <Shield
              className="absolute -bottom-8 -right-8 opacity-10"
              size={160}
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
            <div className="flex gap-3">
              <AlertTriangle className="text-amber-600 shrink-0" size={20} />
              <div>
                <h4 className="text-[10px] font-black text-amber-900 uppercase tracking-widest mb-1">
                  Warning
                </h4>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  If you suspect your account has been compromised, change your
                  password immediately and contact your administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
