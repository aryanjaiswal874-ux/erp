import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLoader({ loading = false, title = "Loading" }) {
    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-slate-50/95 backdrop-blur-[2px]"
                >
                    {/* Modern Orange Loader */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative flex flex-col items-center gap-5"
                    >
                        {/* Spinning Circles */}
                        <div className="relative w-16 h-16">
                            {/* Outer ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-500 border-r-orange-400"
                            />
                            {/* Middle ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 rounded-full border-[3px] border-transparent border-t-orange-400 border-l-orange-300"
                            />
                            {/* Inner ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 rounded-full border-[3px] border-transparent border-b-orange-500 border-r-orange-400"
                            />
                            {/* Center pulse */}
                            <motion.div
                                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/40"
                            />
                        </div>

                        {/* Page Title Text */}
                        <div className="flex items-center gap-1">
                            <motion.span
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700"
                            >
                                {title}
                            </motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                                className="text-orange-500 text-lg font-bold"
                            >.</motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                                className="text-orange-500 text-lg font-bold"
                            >.</motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                                className="text-orange-500 text-lg font-bold"
                            >.</motion.span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
