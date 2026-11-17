import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const colorPalettes = [
    { bg: 'bg-violet-50', iconBg: 'bg-violet-100', iconColor: 'text-violet-600', textColor: 'text-violet-900', borderColor: 'border-violet-100' },
    { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', textColor: 'text-emerald-900', borderColor: 'border-emerald-100' },
    { bg: 'bg-amber-50', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', textColor: 'text-amber-900', borderColor: 'border-amber-100' },
    { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', textColor: 'text-blue-900', borderColor: 'border-blue-100' },
    { bg: 'bg-rose-50', iconBg: 'bg-rose-100', iconColor: 'text-rose-600', textColor: 'text-rose-900', borderColor: 'border-rose-100' },
    { bg: 'bg-indigo-50', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', textColor: 'text-indigo-900', borderColor: 'border-indigo-100' },
    { bg: 'bg-cyan-50', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600', textColor: 'text-cyan-900', borderColor: 'border-cyan-100' },
    { bg: 'bg-orange-50', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', textColor: 'text-orange-900', borderColor: 'border-orange-100' },
];

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, index = 0, subtext }) => {
    // Select color based on index to ensure consistency (or randomness if preferred, but index is better for stability)
    const palette = colorPalettes[index % colorPalettes.length];

    return (
        <div className={`${palette.bg} border ${palette.borderColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${palette.iconBg} ${palette.iconColor}`}>
                    {Icon && <Icon size={24} strokeWidth={2} />}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>

            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{title}</h3>
            <div className={`text-2xl font-black ${palette.textColor} tracking-tight`}>
                {value}
            </div>
            {subtext && <p className="text-[10px] font-medium text-slate-400 mt-2">{subtext}</p>}
        </div>
    );
};

export default StatsCard;
