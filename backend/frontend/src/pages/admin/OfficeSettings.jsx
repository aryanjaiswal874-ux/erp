import { useState, useEffect } from "react";
import { 
  Clock, 
  Settings, 
  Save, 
  Calendar, 
  Plus, 
  Trash2,
  AlertCircle,
  Clock3,
  CalendarDays,
  CheckCircle2,
  Bell,
  MessageSquare,
  QrCode,
  Smartphone,
  RefreshCw,
  Hash,
  ShieldCheck,
  Zap,
  Power,
  XCircle,
  Info
} from "lucide-react";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import { QRCodeSVG } from "qrcode.react";

const OfficeSettings = ({ initialTab = "timing" }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Timing State
  const [settings, setSettings] = useState({
    office_in_time: "09:00:00",
    office_out_time: "18:00:00",
    max_allowed_late: 15,
    max_allowed_early: 15,
    week_offs: ["Sunday"],
    whatsapp_group_jid: "120363426215512132@g.us",
    absent_notification_enabled: false,
    absent_notification_time: "10:30",
    admin_whatsapp_number: ""
  });

  // Holiday State
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ title: "", from_date: "", to_date: "", description: "" });

  // WhatsApp State
  const [waStatus, setWaStatus] = useState({ isConnected: false, qr: null, user: null });
  const [polling, setPolling] = useState(false);

  const isSuperAdmin = user?.role === 'super_admin';

  useEffect(() => {
    fetchSettings();
    fetchHolidays();
    if (isSuperAdmin) {
        fetchWhatsAppStatus();
        const interval = setInterval(fetchWhatsAppStatus, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const fetchSettings = async () => {
    try {
      const res = await API.get("/erp/office-settings");
      if (res.data) {
        setSettings(prev => ({
          ...prev,
          ...res.data,
          week_offs: Array.isArray(res.data.week_offs) ? res.data.week_offs : prev.week_offs
        }));
      }
    } catch (error) {
      showToast("Failed to fetch office settings", "error");
    }
  };

  const fetchHolidays = async () => {
    try {
      const res = await API.get("/erp/holidays");
      if (Array.isArray(res.data)) {
        setHolidays(res.data);
      } else {
        setHolidays([]);
      }
    } catch (error) {
      showToast("Failed to fetch holidays", "error");
    }
  };

  const fetchWhatsAppStatus = async () => {
    try {
        const res = await API.get("/erp/whatsapp/status");
        setWaStatus(res.data);
    } catch (error) {
        console.error("WA Status Error:", error);
    }
  };

  const handleUpdateSettings = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      await API.post("/erp/office-settings", settings);
      showToast("Settings updated successfully", "success");
    } catch (error) {
      showToast("Error updating settings", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    if (!newHoliday.title || !newHoliday.from_date || !newHoliday.to_date) return;
    
    const start = moment(newHoliday.from_date);
    const end = moment(newHoliday.to_date);
    if (end.isBefore(start)) {
        showToast("End date must be after start date", "warning");
        return;
    }

    setLoading(true);
    try {
      const res = await API.post("/erp/holidays", newHoliday);
      showToast(res.data.message || "Holiday added successfully", "success");
      setNewHoliday({ title: "", from_date: "", to_date: "", description: "" });
      fetchHolidays();
    } catch (error) {
      const msg = error.response?.data?.message || "Error adding holiday";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHoliday = async (id) => {
    if (!window.confirm("Delete this holiday?")) return;
    try {
      await API.delete(`/erp/holidays/${id}`);
      showToast("Holiday deleted", "success");
      fetchHolidays();
    } catch (error) {
      showToast("Error deleting holiday", "error");
    }
  };

  const daysEnum = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
      <Helmet>
        <title>Office Settings | {import.meta.env.VITE_COMPANY_SHORT_NAME || 'ERP'}</title>
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Office Operations</h1>
          <p className="text-xs text-slate-500 font-medium italic">Manage shift timings, holidays and system notifications</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-xl w-fit border border-slate-200">
        <button 
          onClick={() => setActiveTab('timing')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'timing' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Clock size={16} /> Office Timing
        </button>
        <button 
          onClick={() => setActiveTab('holidays')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'holidays' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Calendar size={16} /> Holidays
        </button>
        {isSuperAdmin && (
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Bell size={16} /> Notification Settings
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-500">
        {activeTab === 'timing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                   <h3 className="text-slate-800 font-bold text-sm flex items-center gap-3">
                     <Clock3 size={20} className="text-blue-500" /> Shift & Grace Timing
                   </h3>
                   <button 
                     onClick={handleUpdateSettings}
                     disabled={loading}
                     className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-xs font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                   >
                     {loading ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} 
                     Update Settings
                   </button>
                </div>

                <div className="p-8 space-y-10">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="group">
                           <label className="text-xs font-bold text-slate-500 mb-2 block ml-1">Official In-Time</label>
                           <input 
                             type="time" 
                             value={settings.office_in_time}
                             onChange={(e) => setSettings({...settings, office_in_time: e.target.value})}
                             className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                           />
                        </div>
                        <div className="group">
                           <label className="text-xs font-bold text-slate-500 mb-2 block ml-1">Official Out-Time</label>
                           <input 
                             type="time" 
                             value={settings.office_out_time}
                             onChange={(e) => setSettings({...settings, office_out_time: e.target.value})}
                             className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                           />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="group">
                           <label className="text-xs font-bold text-slate-500 mb-2 block ml-1">Late Grace Period (Mins)</label>
                           <div className="relative">
                              <Zap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                              <input 
                                type="number" 
                                value={settings.max_allowed_late || 0}
                                onChange={(e) => setSettings({...settings, max_allowed_late: parseInt(e.target.value) || 0})}
                                className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                              />
                           </div>
                        </div>
                        <div className="group">
                           <label className="text-xs font-bold text-slate-500 mb-2 block ml-1">Early Exit Tolerance (Mins)</label>
                           <div className="relative">
                              <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                              <input 
                                type="number" 
                                value={settings.max_allowed_early || 0}
                                onChange={(e) => setSettings({...settings, max_allowed_early: parseInt(e.target.value) || 0})}
                                className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                              />
                           </div>
                        </div>
                      </div>
                   </div>

                   <div className="border-t border-slate-100 pt-8">
                      <label className="text-xs font-bold text-slate-500 mb-6 block ml-1">Recurring Weekly Offs</label>
                      <div className="flex flex-wrap gap-3">
                         {daysEnum.map(day => {
                            const isSelected = settings.week_offs?.includes(day);
                            return (
                               <button 
                                 key={day}
                                 type="button"
                                 onClick={() => {
                                   const newVal = isSelected 
                                     ? settings.week_offs.filter(d => d !== day)
                                     : [...settings.week_offs, day];
                                   setSettings({...settings, week_offs: newVal});
                                 }}
                                 className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all border ${isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-500'}`}
                               >
                                 {day}
                               </button>
                            );
                         })}
                      </div>
                   </div>
                </div>
              </div>
            </div>

             <div className="space-y-8">
               <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700"></div>
                  <Smartphone className="text-blue-500 mb-6" size={32} />
                  <h4 className="text-sm font-bold text-slate-800 mb-2">Shift Overview</h4>
                  <p className="text-xs text-slate-500 mb-8 leading-relaxed">System automatically tracks attendance and late marks based on these timings.</p>
                  
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-xs font-semibold text-slate-500">Shift Window</span>
                        <span className="text-xs font-bold text-slate-700">{settings.office_in_time} - {settings.office_out_time}</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-xs font-semibold text-slate-500">Grace Time</span>
                        <span className="text-xs font-bold text-blue-600">+{settings.max_allowed_late} mins</span>
                     </div>
                  </div>
               </div>

               <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-4">
                  <AlertCircle className="text-blue-600 shrink-0" size={20} />
                  <p className="text-xs text-blue-900 font-medium leading-relaxed">
                    Changes to shift timings will take effect from the next duty cycle.
                  </p>
               </div>
            </div>
          </div>
        )}

        {/* Holidays Tab */}
        {activeTab === 'holidays' && (
          <div className="space-y-6 max-w-5xl">
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                   <h3 className="text-slate-800 font-bold text-sm flex items-center gap-3">
                     <CalendarDays size={20} className="text-orange-500" /> Holidays List
                   </h3>
                </div>
                
                <div className="p-8">
                   <form onSubmit={handleAddHoliday} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 bg-slate-50 p-6 rounded-xl border border-slate-100 relative">
                      {newHoliday.from_date && newHoliday.to_date && (
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-orange-600 text-white rounded-full text-[10px] font-black shadow-lg animate-bounce">
                          {Math.max(0, moment(newHoliday.to_date).diff(moment(newHoliday.from_date), 'days') + 1)} Days Holiday
                        </div>
                      )}
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 mb-1.5 block ml-1 uppercase tracking-wider">From Date</label>
                        <input 
                          type="date" 
                          required
                          value={newHoliday.from_date}
                          onChange={(e) => setNewHoliday({...newHoliday, from_date: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 mb-1.5 block ml-1 uppercase tracking-wider">To Date</label>
                        <input 
                          type="date" 
                          required
                          min={newHoliday.from_date}
                          value={newHoliday.to_date}
                          onChange={(e) => setNewHoliday({...newHoliday, to_date: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 mb-1.5 block ml-1 uppercase tracking-wider">Event Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Independence Day"
                          value={newHoliday.title}
                          onChange={(e) => setNewHoliday({...newHoliday, title: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 mb-1.5 block ml-1 uppercase tracking-wider">Details</label>
                        <input 
                          type="text" 
                          placeholder="Optional info..."
                          value={newHoliday.description}
                          onChange={(e) => setNewHoliday({...newHoliday, description: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                        />
                      </div>
                      <div className="flex items-end pb-0.5">
                         <button 
                           type="submit" 
                           disabled={loading}
                           className="w-full bg-slate-800 text-white h-[42px] rounded-lg text-xs font-bold shadow-md hover:bg-slate-900 transition-all flex items-center justify-center gap-2 group active:scale-95"
                         >
                           <Plus size={16} /> Add Holiday
                         </button>
                      </div>
                   </form>

                   <div className="overflow-x-auto rounded-xl border border-slate-100">
                      <table className="w-full text-left">
                         <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                               <th className="px-8 py-4">From</th>
                               <th className="px-8 py-4">To</th>
                               <th className="px-8 py-4 text-center">Days</th>
                               <th className="px-8 py-4">Occasion</th>
                               <th className="px-8 py-4">Description</th>
                               <th className="px-8 py-4 text-right">Delete</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {holidays.length > 0 ? holidays.map((holiday) => (
                              <tr key={holiday.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100/50">
                                 <td className="px-8 py-4 text-xs font-bold text-slate-700">{moment(holiday.from_date).format('DD MMM YYYY')}</td>
                                 <td className="px-8 py-4 text-xs font-bold text-slate-700">{moment(holiday.to_date).format('DD MMM YYYY')}</td>
                                 <td className="px-8 py-4 text-center">
                                    <span className="px-2.5 py-1 bg-orange-50 text-orange-600 rounded-md text-[10px] font-black border border-orange-100">{holiday.total_days}</span>
                                 </td>
                                 <td className="px-8 py-4">
                                    <span className="text-sm font-bold text-slate-800">{holiday.title}</span>
                                 </td>
                                 <td className="px-8 py-4 text-xs text-slate-500">{holiday.description || "N/A"}</td>
                                 <td className="px-8 py-4 text-right">
                                    <button onClick={() => handleDeleteHoliday(holiday.id)} className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-90">
                                       <Trash2 size={18} />
                                    </button>
                                 </td>
                              </tr>
                            )) : (
                               <tr>
                                  <td colSpan="6" className="py-20 text-center text-slate-300 text-xs italic font-medium">No holidays scheduled in the system.</td>
                                </tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        )}

         {/* Notification Tab */}
         {activeTab === 'notifications' && isSuperAdmin && (
            <div className="max-w-6xl space-y-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* WhatsApp Bot Connection Card */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                     <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className={`p-3 rounded-lg border ${waStatus.isConnected ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                              <MessageSquare size={20} />
                           </div>
                           <div>
                              <h3 className="text-slate-800 font-bold text-sm">{import.meta.env.VITE_COMPANY_SHORT_NAME || 'ERP'} WhatsApp Connect</h3>
                              <p className={`text-[10px] font-bold uppercase ${waStatus.isConnected ? 'text-emerald-600' : 'text-orange-600'}`}>{waStatus.isConnected ? 'Connected' : 'Scanner Required'}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <button onClick={async () => {
                              if (!window.confirm("This will disconnect WhatsApp and delete session. Continue?")) return;
                              setLoading(true);
                              try {
                                 await API.post("/erp/whatsapp/reset");
                                 showToast("Session cleared. Waiting for new QR...", "success");
                                 fetchWhatsAppStatus();
                              } catch (e) {
                                 showToast("Reset failed", "error");
                              } finally {
                                 setLoading(false);
                              }
                           }} className="p-2 text-rose-400 hover:text-rose-600 transition-all" title="Logout/Reset">
                              <Power size={18} />
                           </button>
                           <button onClick={fetchWhatsAppStatus} className="p-2 text-slate-400 hover:text-blue-600 transition-all" title="Refresh Status">
                              <RefreshCw size={18} className={polling ? 'animate-spin' : ''} />
                           </button>
                        </div>
                     </div>

                    <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-8">
                       {waStatus.isConnected ? (
                          <div className="w-full space-y-8 text-center">
                             <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                                <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping"></div>
                                <div className="relative w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                                   <Smartphone size={32} />
                                </div>
                             </div>
                             
                             <div className="space-y-2">
                                <h4 className="text-md font-bold text-slate-800">Connection Secure</h4>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-xs font-bold">
                                   <Zap size={12} className="fill-emerald-600" /> +{waStatus.user?.number}
                                </div>
                             </div>

                             <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-left space-y-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Device Info</p>
                                <div className="grid grid-cols-2 gap-4">
                                   <div className="p-4 bg-white rounded-lg border border-slate-100">
                                      <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">Session</p>
                                      <p className="text-xs font-bold text-slate-800 truncate">{waStatus.user?.id}</p>
                                   </div>
                                   <div className="p-4 bg-white rounded-lg border border-slate-100">
                                      <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">Name</p>
                                      <p className="text-xs font-bold text-slate-800 truncate uppercase">{waStatus.user?.name || 'ERP Bot'}</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       ) : waStatus.qr ? (
                          <div className="flex flex-col items-center space-y-6 w-full">
                             <div className="p-4 bg-white rounded-xl shadow-lg border border-slate-100 transform hover:scale-105 transition-all">
                                <QRCodeSVG value={waStatus.qr} size={256} level="L" includeMargin={true} />
                             </div>
                             <div className="text-center space-y-2">
                                <h4 className="text-sm font-bold text-slate-800">{import.meta.env.VITE_COMPANY_SHORT_NAME || 'ERP'} WhatsApp Connect</h4>

                                <p className="text-xs text-slate-500 leading-relaxed italic">Scan the QR code below using your WhatsApp mobile app to link your account.</p>
                             </div>
                             <div className="flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full border border-orange-100 text-[10px] font-bold animate-pulse">
                               <RefreshCw size={12} className="animate-spin" /> Waiting for Link...
                             </div>
                          </div>
                       ) : (
                          <div className="text-center space-y-4">
                             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-dashed border-slate-200">
                                <RefreshCw size={24} className="text-slate-300 animate-spin" />
                             </div>
                             <p className="text-xs font-bold text-slate-400 uppercase">Engine waking up...</p>
                          </div>
                       )}
                    </div>
                  </div>

                  {/* Configuration and Relay Management */}
                  <div className="space-y-8">
                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-500">
                                 <Hash size={20} />
                              </div>
                              <div>
                                 <h3 className="text-slate-800 font-bold text-sm">Attendance Groups</h3>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase">Broadcast Target</p>
                              </div>
                           </div>
                        </div>
                        <div className="p-8 space-y-8">
                           <form onSubmit={handleUpdateSettings}>
                              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6 space-y-6">
                                 <div>
                                   <label className="text-xs font-bold text-slate-500 mb-3 block ml-1">WhatsApp Group JID</label>
                                   <div className="relative group">
                                      <QrCode size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                      <input 
                                        type="text" 
                                        value={settings.whatsapp_group_jid}
                                        onChange={(e) => setSettings({...settings, whatsapp_group_jid: e.target.value})}
                                        placeholder="e.g. 120363@g.us"
                                        className="w-full pl-12 pr-5 py-3 rounded-lg bg-white border border-slate-200 text-sm font-bold text-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                                      />
                                   </div>
                                   <div className="mt-4 p-4 bg-white/50 border border-slate-100 rounded-lg flex items-start gap-3">
                                      <Info className="text-blue-500 shrink-0" size={16} />
                                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                         Notifications for Attendance and Work Reports will be sent here.
                                      </p>
                                   </div>
                                 </div>
                                 
                                 <div className="border-t border-slate-200 pt-6">
                                    <h4 className="text-sm font-bold text-slate-800 mb-4">Daily Absent Notifications</h4>
                                    
                                    <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 mb-4">
                                        <div>
                                            <p className="text-xs font-bold text-slate-700">Enable Notification</p>
                                            <p className="text-[10px] text-slate-500">Send an automated message for absent employees</p>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => setSettings(p => ({...p, absent_notification_enabled: !p.absent_notification_enabled}))}
                                            className={`w-12 h-6 rounded-full transition-all relative ${settings.absent_notification_enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.absent_notification_enabled ? 'left-7' : 'left-1'}`} />
                                        </button>
                                    </div>
                                    
                                    <div className="group">
                                       <label className="text-xs font-bold text-slate-500 mb-2 block ml-1">Notification Time</label>
                                       <input 
                                         type="time" 
                                         value={settings.absent_notification_time || "10:30"}
                                         onChange={(e) => setSettings({...settings, absent_notification_time: e.target.value})}
                                         className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 focus:bg-slate-50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                                       />
                                    </div>
                                 </div>

                                 <div className="border-t border-slate-200 pt-6">
                                    <h4 className="text-sm font-bold text-slate-800 mb-4">Admin WhatsApp Alert Settings</h4>
                                    <div className="group">
                                       <label className="text-xs font-bold text-slate-500 mb-2 block ml-1">Admin WhatsApp Number (For CRM Alerts)</label>
                                       <div className="relative">
                                          <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                          <input 
                                            type="text" 
                                            maxLength="15"
                                            value={settings.admin_whatsapp_number || ""}
                                            onChange={(e) => setSettings({...settings, admin_whatsapp_number: e.target.value})}
                                            placeholder="e.g. 919876543210"
                                            className="w-full pl-12 pr-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 focus:bg-slate-50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                                          />
                                       </div>
                                       <p className="text-[10px] text-slate-500 mt-2 ml-1 italic">Enter 10 or 12 digit number without '+' sign.</p>
                                    </div>
                                 </div>
                              </div>
                              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-xs font-bold shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                 <Save size={16} /> Save Changes
                              </button>
                           </form>
                        </div>
                     </div>

                     <div className="bg-white p-10 rounded-xl text-slate-800 border border-slate-200 shadow-sm relative overflow-hidden">
                        <ShieldCheck className="text-emerald-500 mb-4" size={24} />
                        <h4 className="text-sm font-bold mb-2">Platform Security</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                          WhatsApp communication is encrypted end-to-end. SBGM ERP does not store your message content.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>

    </div>
  );
};

export default OfficeSettings;
