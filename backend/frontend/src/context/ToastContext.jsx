import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        if (duration !== Infinity) {
            setTimeout(() => removeToast(id), duration);
        }
    }, [removeToast]);

    const toastValue = {
        showToast,
        success: (msg, dur) => showToast(msg, 'success', dur),
        error: (msg, dur) => showToast(msg, 'error', dur),
        info: (msg, dur) => showToast(msg, 'info', dur),
        warning: (msg, dur) => showToast(msg, 'warning', dur),
    };

    return (
        <ToastContext.Provider value={toastValue}>
            {children}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <ToastItem key={t.id} {...t} onRemove={() => removeToast(t.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

const ToastItem = ({ message, type, onRemove }) => {
    const icons = {
        success: <CheckCircle size={14} className="text-emerald-500" />,
        error: <XCircle size={14} className="text-rose-500" />,
        warning: <AlertCircle size={14} className="text-amber-500" />,
        info: <Info size={14} className="text-blue-500" />,
    };

    const bgColors = {
        success: 'bg-emerald-50 border-emerald-100',
        error: 'bg-rose-50 border-rose-100',
        warning: 'bg-amber-50 border-amber-100',
        info: 'bg-blue-50 border-blue-100',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-lg border shadow-lg shadow-slate-200/50 ${bgColors[type]} min-w-[200px] max-w-sm`}
        >
            <div className="shrink-0">{icons[type]}</div>
            <p className="text-[11px] font-bold text-slate-700 leading-tight flex-1">
                {message}
            </p>
            <button
                onClick={onRemove}
                className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
            >
                <X size={12} />
            </button>
        </motion.div>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
