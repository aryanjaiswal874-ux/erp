import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2, Lock, User, Eye, EyeOff, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QuickLoginModal = ({ isOpen, onClose, onSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await login(email, password);
            onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/20"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-10"
                    >
                        <X size={16} />
                    </button>

                    <div className="p-8 md:p-10">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-black text-slate-900 mb-2">Welcome Back</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Login to continue your purchase
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 text-slate-400" size={16} />
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-[#7CB342] focus:border-transparent outline-none transition-all placeholder:text-slate-300 text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center pl-1 pr-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Password
                                    </label>
                                    <Link
                                        to="/auth/forgot-password"
                                        onClick={onClose}
                                        className="text-[10px] font-bold text-[#ff743d] hover:text-[#e65100] transition-colors uppercase tracking-wider"
                                    >
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 text-slate-400" size={16} />
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-xs font-bold focus:ring-2 focus:ring-[#7CB342] focus:border-transparent outline-none transition-all placeholder:text-slate-300 text-slate-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-[10px] font-bold bg-red-50 p-3 rounded-lg text-center uppercase tracking-wide border border-red-100"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#0891b2] text-white py-3.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-cyan-500/20 hover:bg-[#06b6d4] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Quick Login"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p className="text-xs text-slate-500 font-medium">
                                Don't have an account?{' '}
                                <Link
                                    to="/auth/signup"
                                    onClick={onClose}
                                    className="font-black text-slate-900 hover:text-[#ff743d] transition-colors uppercase tracking-wider ml-1"
                                >
                                    Register Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickLoginModal;
