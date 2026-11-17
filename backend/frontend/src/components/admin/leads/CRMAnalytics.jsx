import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { TrendingUp, Users, Target, CheckCircle2 } from 'lucide-react';

const CRMAnalytics = ({ sbgm, mak }) => {
  if (!sbgm || !mak) return null;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']; // Converted, Interested, New, Not Interested

  const preparePieData = (data) => [
    { name: 'Converted', value: data.converted },
    { name: 'Interested', value: data.interested },
    { name: 'New Leads', value: data.newLeads },
    { name: 'Not Interested', value: data.notInterested },
  ].filter(item => item.value > 0);

  const prepareBarData = () => [
    {
      name: import.meta.env.VITE_COMPANY_SHORT_NAME || 'ERP',
      Total: sbgm.total,
      Interacted: sbgm.interested + sbgm.notInterested + sbgm.converted,
      Converted: sbgm.converted,
    },
    {
      name: 'MAK',
      Total: mak.total,
      Interacted: mak.interested + mak.notInterested + mak.converted,
      Converted: mak.converted,
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg">
          <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1">{payload[0].name}</p>
          <p className="text-lg font-black text-blue-600">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Lead Interaction Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Users size={16} className="text-blue-500" /> Interaction Distribution
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Global Status Breakdown</p>
            </div>
            <div className="flex gap-2">
               <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold text-slate-500">REAL-TIME</span>
            </div>
          </div>
          
          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[...preparePieData(sbgm), ...preparePieData(mak)].reduce((acc, curr) => {
                    const existing = acc.find(i => i.name === curr.name);
                    if (existing) existing.value += curr.value;
                    else acc.push({...curr});
                    return acc;
                  }, [])}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {preparePieData(sbgm).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip content={<CustomTooltip />} />
                <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Conversion Progress Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
           <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Target size={16} className="text-rose-500" /> Conversion Progress
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Total Calling vs Converted</p>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <TrendingUp size={18} />
            </div>
          </div>

          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prepareBarData()} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}}
                />
                <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Legend 
                    iconType="rect"
                    formatter={(value) => <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter ml-1">{value}</span>}
                />
                <Bar dataKey="Total" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Interacted" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Converted" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: sbgm.total + mak.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Interacted', value: (sbgm.interested + sbgm.notInterested + sbgm.converted) + (mak.interested + mak.notInterested + mak.converted), icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Converted', value: sbgm.converted + mak.converted, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Conversion Rate', value: (((sbgm.converted + mak.converted) / (sbgm.total + mak.total)) * 100).toFixed(1) + '%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-2.5 ${stat.bg} ${stat.color} rounded-lg`}>
              <stat.icon size={18} />
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-sm font-black text-slate-800 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRMAnalytics;
