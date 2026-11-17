import { useState, useEffect, useMemo } from "react";
import { 
  Award, 
  Settings, 
  Search, 
  Calendar, 
  Download, 
  Edit, 
  Table as TableIcon,
  CheckCircle2,
  User,
  CreditCard,
  Briefcase,
  TrendingUp,
  Clock,
  X,
  Plus,
  RefreshCw,
  FileSpreadsheet,
  Phone
} from "lucide-react";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import * as XLSX from "xlsx";

const PayrollManagement = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('config'); // config, generate
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));

  // Data states
  const [employees, setEmployees] = useState([]);
  const [salaryReports, setSalaryReports] = useState([]);

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [formData, setFormData] = useState({
    gross_salary: "",
    joining_date: "",
    upi_id: ""
  });

  const IMG_URL = import.meta.env.VITE_API_BASE_URL_IMG || import.meta.env.VITE_API_BASE_URL.replace('/api', '');
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${IMG_URL}${normalizedPath}`;
  };

  useEffect(() => {
    fetchActiveStaff();
    fetchSalaryReport();
  }, [selectedMonth]);

  const fetchActiveStaff = async () => {
    setLoading(true);
    try {
      const res = await API.get("/erp/attendance/daily");
      if (Array.isArray(res.data)) {
        setEmployees(res.data);
      }
    } catch (e) {}
    setLoading(false);
  };

  const fetchSalaryReport = async () => {
    setLoading(true);
    try {
      const res = await API.get("/erp/payroll/reports", { params: { month: selectedMonth } });
      setSalaryReports(Array.isArray(res.data) ? res.data : []);
    } catch (e) {}
    setLoading(false);
  };

  const handleEdit = (emp) => {
    setEditingEmp(emp);
    setFormData({
      gross_salary: emp.gross_salary || "",
      joining_date: emp.joining_date || moment().format("YYYY-MM-DD"),
      upi_id: emp.upi_id || ""
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateConfig = async () => {
    try {
      await API.put(`/erp/payroll/config/${editingEmp.id}`, formData);
      showToast("Configuration saved", "success");
      setIsEditModalOpen(false);
      fetchActiveStaff();
    } catch (e) {
      showToast("Update failed", "error");
    }
  };

  const generateSalarySheet = async () => {
    setLoading(true);
    try {
      const res = await API.post("/erp/payroll/generate", { month: selectedMonth });
      setSalaryReports(res.data);
      showToast(`Payroll generated for ${moment(selectedMonth).format("MMMM YYYY")}`, "success");
    } catch (e) {
      showToast("Generation failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const dataToExport = activeTab === 'config' ? employees : salaryReports;
    if (!dataToExport.length) return showToast("No data to export", "warning");

    const formattedData = dataToExport.map((item, idx) => ({
      "SN": idx + 1,
      "Name": item.full_name,
      "Designation": item.designation,
      "Mobile": item.mobile,
      "Gross Salary": item.gross_salary || 0,
      "UPI ID": item.upi_id || "N/A",
      ...(activeTab === 'generate' ? {
        "Working Days": item.total_working_days,
        "Present": item.total_present,
        "Absent": item.total_absent,
        "Net Payable": Math.round(item.net_payable)
      } : {
        "Joining Date": item.joining_date ? moment(item.joining_date).format("DD/MM/YYYY") : "N/A"
      })
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payroll");
    const fileName = activeTab === 'config' ? "Payroll_Config.xlsx" : `Payroll_${selectedMonth}.xlsx`;
    XLSX.writeFile(wb, fileName);
    showToast("Report Exported", "success");
  };

  const filteredData = useMemo(() => {
    const list = activeTab === 'config' ? employees : salaryReports;
    return list.filter(e => 
      e.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.mobile?.includes(searchTerm) ||
      e.designation?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, employees, salaryReports, searchTerm]);

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
      <Helmet>
        <title>Payroll Management | SBGM</title>
      </Helmet>

      {/* Professional Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
               <Award size={24} />
            </div>
            <div>
               <h1 className="text-xl font-black text-slate-800 tracking-tight">Payroll Management</h1>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Control Center Overview • Admin Access Only</p>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <button 
               onClick={exportToExcel}
               className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
               <FileSpreadsheet size={14} /> Export Report
            </button>
            <button 
               onClick={fetchActiveStaff}
               className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all"
            >
               <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
         </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
            <button 
                onClick={() => { setActiveTab('config'); setSearchTerm(""); }}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'config' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
                Configuration
            </button>
            <button 
                onClick={() => { setActiveTab('generate'); setSearchTerm(""); }}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'generate' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
                Generate Salary Sheet
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
             <div className="relative group min-w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by name or mobile..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                />
             </div>
             {activeTab === 'generate' && (
                <>
                   <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200">
                      <Calendar size={14} className="text-emerald-600" />
                      <input 
                        type="month" 
                        value={selectedMonth} 
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="text-[10px] font-black border-none focus:ring-0 p-0 text-slate-700 uppercase"
                      />
                   </div>
                   <button 
                     onClick={generateSalarySheet}
                     disabled={loading}
                     className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                   >
                      <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                      {salaryReports.length ? 'Re-Generate' : 'Generate'}
                   </button>
                </>
             )}
          </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] relative">
         <table className="w-full border-collapse">
            <thead>
               <tr className="bg-emerald-600 text-white text-[9px] uppercase font-black tracking-widest">
                  <th className="py-4 px-6 text-center w-16 border-r border-white/10">SN</th>
                  <th className="py-4 px-6 text-left">Staff Member</th>
                  <th className="py-4 px-6 text-center">Contact</th>
                  {activeTab === 'config' ? (
                     <>
                        <th className="py-4 px-6 text-center">Join Date</th>
                        <th className="py-4 px-6 text-center">Gross (P.A.)</th>
                        <th className="py-4 px-6 text-center">Monthly Salary</th>
                        <th className="py-4 px-6 text-center">UPI ID</th>
                        <th className="py-4 px-6 text-center w-24">Edit</th>
                     </>
                  ) : (
                     <>
                        <th className="py-4 px-6 text-center">Gross Sal.</th>
                        <th className="py-4 px-6 text-center">W.Days</th>
                        <th className="py-4 px-6 text-center">Present</th>
                        <th className="py-4 px-6 text-center">Absent</th>
                        <th className="py-4 px-6 text-center">Net Payable</th>
                     </>
                  )}
               </tr>
            </thead>
            <tbody className="text-[11px] font-bold text-slate-700">
               {filteredData.map((item, idx) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-emerald-50/20 transition-colors even:bg-slate-50/50">
                     <td className="px-6 py-3 text-center text-slate-400 font-medium border-r border-slate-100">{idx + 1}</td>
                     <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                           <div className="w-9 h-9 rounded-lg bg-slate-200 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center">
                              {item.profile_photo ? (
                                 <img src={getImageUrl(item.profile_photo)} className="w-full h-full object-cover" />
                              ) : (
                                 <div className="text-[10px] font-black text-slate-400 uppercase">{item.full_name?.charAt(0)}</div>
                              )}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-slate-900 font-black leading-tight">{item.full_name}</span>
                              <span className="text-[8px] text-slate-400 uppercase tracking-widest mt-0.5">{item.designation || "No Designation"}</span>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-3 text-center border-x border-slate-50">
                        <div className="flex flex-col items-center">
                           <span className="text-[10px] font-black text-slate-600 tracking-tighter">{item.mobile || "--"}</span>
                           {item.email && <span className="text-[7px] text-slate-400 lowercase truncate max-w-[100px]">{item.email}</span>}
                        </div>
                     </td>

                     {activeTab === 'config' ? (
                        <>
                           <td className="px-6 py-3 text-center text-slate-500 font-black border-r border-slate-50">
                              {item.joining_date ? moment(item.joining_date).format("DD/MM/YYYY") : "--"}
                           </td>
                           <td className="px-6 py-3 text-center text-slate-900 font-black border-r border-slate-50">
                              ₹{(item.gross_salary || 0).toLocaleString()}
                           </td>
                           <td className="px-6 py-3 text-center text-emerald-600 font-black border-r border-slate-50">
                              ₹{Math.round((item.gross_salary || 0) / 12).toLocaleString()}
                           </td>
                           <td className="px-6 py-3 text-center text-slate-400 font-medium tracking-tight border-r border-slate-50">
                              {item.upi_id || "--"}
                           </td>
                           <td className="px-6 py-3 text-center">
                              <button onClick={() => handleEdit(item)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm active:scale-90">
                                 <Edit size={14} />
                              </button>
                           </td>
                        </>
                     ) : (
                        <>
                           <td className="px-6 py-3 text-center text-slate-500 font-bold border-r border-slate-50">₹{(item.gross_salary || 0).toLocaleString()}</td>
                           <td className="px-6 py-3 text-center border-r border-slate-50">{item.total_working_days}</td>
                           <td className="px-6 py-3 text-center text-emerald-600 font-black border-r border-slate-50">{item.total_present}</td>
                           <td className="px-6 py-3 text-center text-rose-500 font-black border-r border-slate-50">{item.total_absent}</td>
                           <td className="px-6 py-3 text-center">
                              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg font-black text-[10px] border border-emerald-100 shadow-sm">
                                 ₹{Math.round(item.net_payable).toLocaleString()}
                              </span>
                           </td>
                        </>
                     )}
                  </tr>
               ))}
            </tbody>
         </table>
         {loading && (
            <div className="absolute top-[48px] inset-0 bg-white/60 backdrop-blur-[2px] z-[50] flex items-center justify-center">
               <RefreshCw className="text-emerald-600 animate-spin" size={32} />
            </div>
         )}
         {filteredData.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-3">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                  <Search size={32} />
               </div>
               <p className="text-xs font-black uppercase tracking-widest text-slate-400">No records found</p>
            </div>
         )}
      </div>

      {/* Edit Modal - Config */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
           <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                 <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Configuration</h3>
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">{editingEmp?.full_name}</p>
                 </div>
                 <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                    <X size={18} />
                 </button>
              </div>
              <div className="p-6 space-y-5">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gross Salary (P.A. - Yearly)</label>
                    <input 
                      type="number" 
                      value={formData.gross_salary}
                      onChange={(e) => setFormData({...formData, gross_salary: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-all shadow-inner"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Joining Date</label>
                    <input 
                      type="date" 
                      value={formData.joining_date}
                      onChange={(e) => setFormData({...formData, joining_date: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-all shadow-inner"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">UPI ID (salary transfer)</label>
                    <input 
                      type="text" 
                      value={formData.upi_id}
                      onChange={(e) => setFormData({...formData, upi_id: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-all shadow-inner"
                      placeholder="bank@upi"
                    />
                 </div>
              </div>
              <div className="p-6 bg-slate-50 flex items-center justify-end gap-3">
                 <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600">Cancel</button>
                 <button onClick={handleUpdateConfig} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">Save Changes</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PayrollManagement;
