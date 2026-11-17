import { useState, useEffect, useMemo } from "react";
import { 
  FileSpreadsheet, 
  Search, 
  Calendar, 
  User, 
  Download, 
  LayoutDashboard, 
  Filter, 
  FileText, 
  Clock,
  ArrowRight,
  ChevronRight,
  Table as TableIcon,
  Info,
  CheckCircle2,
  Trash2,
  Edit,
  UserCheck,
  UserX,
  RefreshCw
} from "lucide-react";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import * as XLSX from "xlsx";

const ERPreports = () => {
  const { user } = useAuth();
  const IMG_URL = import.meta.env.VITE_API_BASE_URL_IMG || import.meta.env.VITE_API_BASE_URL.replace('/api', '');
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const normalizedPath = path.replace(/\\/g, '/').startsWith('/') ? path.replace(/\\/g, '/') : `/${path.replace(/\\/g, '/')}`;
    return `${IMG_URL}${normalizedPath}`;
  };
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('attendance'); 

  // Filters state
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  const [filters, setFilters] = useState({
    employee_id: ""
  });

  // For the Work Report UI
  const [workDate, setWorkDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [workReports, setWorkReports] = useState([]); 

  const isSuperAdmin = user?.role === 'super_admin';
  const isAdminOrSuper = isSuperAdmin || user?.role === "admin";

  useEffect(() => {
    fetchEmployeesForReport();
  }, [workDate]);

  useEffect(() => {
    if (activeTab === 'attendance') {
        if (filters.employee_id) {
            fetchAttendanceDetail();
        } else {
            fetchAttendanceSummary();
        }
    } else {
        fetchWorkReportsByDate();
    }
  }, [selectedMonth, filters.employee_id, activeTab, workDate]);

  const fetchEmployeesForReport = async () => {
    try {
      const res = await API.get(`/erp/attendance/daily?date=${workDate}`);
      if (Array.isArray(res.data)) {
        setEmployees(res.data);
      }
    } catch (e) {}
  };

  const fetchAttendanceDetail = async () => {
    setLoading(true);
    try {
      const start = moment(selectedMonth).startOf('month').format("YYYY-MM-DD");
      const end = moment(selectedMonth).endOf('month').format("YYYY-MM-DD");
      const res = await API.get("/erp/attendance/history", { 
        params: { 
          startDate: start,
          endDate: end,
          employee_id: filters.employee_id 
        } 
      });
      setReportData(Array.isArray(res.data) ? res.data : []);
      setSummaryData([]);
    } catch (e) {
      showToast("Error loading attendance", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceSummary = async () => {
    setLoading(true);
    try {
      const res = await API.get("/erp/attendance/monthly-summary", {
        params: { month: selectedMonth }
      });
      setSummaryData(Array.isArray(res.data) ? res.data : []);
      setReportData([]);
    } catch (e) {
      showToast("Error loading summary", "error");
      setSummaryData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkReportsByDate = async () => {
    setLoading(true);
    try {
      const res = await API.get("/erp/work-report", { 
          params: { startDate: workDate, endDate: workDate } 
      });
      const reports = Array.isArray(res.data) ? res.data : [];
      setWorkReports(reports);
      
      // Auto-select first report of the new date to ensure UI shows content
      if (reports.length > 0) {
          setSelectedEmpId(reports[0].employee_id.toString());
      } else {
          setSelectedEmpId(""); // Clear if no reports found for this date
      }
    } catch (e) {
      showToast("Error loading work reports", "error");
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (activeTab === 'attendance' && !reportData.length && !summaryData.length) return showToast("No data to export", "warning");
    if (activeTab === 'work' && !workReports.length) return showToast("No data to export", "warning");

    let dataToExport = [];
    let fileName = `Report_${moment().format('DD-MM-YYYY')}.xlsx`;

    if (activeTab === 'attendance') {
      if (filters.employee_id) {
          dataToExport = reportData.map((item, idx) => ({
            "SN": idx + 1,
            "Employee": item.User?.full_name || "N/A",
            "Date": moment(item.date).format("DD-MM-YYYY"),
            "In Time": item.in_time || "--",
            "Out Time": item.out_time || "--",
            "Worked": item.total_work_hours || "--",
            "Status": item.status?.toUpperCase()
          }));
      } else {
          dataToExport = summaryData.map((item, idx) => ({
            "SN": idx + 1,
            "Employee": item.full_name,
            "Contact": item.mobile,
            "Working Days": item.total_working_days,
            "Present": item.total_present,
            "Absent": item.total_absent
          }));
      }
    } else {
      dataToExport = workReports.map((item, idx) => ({
        "SN": idx + 1,
        "Employee": item.User?.full_name,
        "Date": moment(item.date).format("DD-MM-YYYY"),
        "Report": item.report_content
      }));
    }

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, fileName);
  };

  const selectedReport = useMemo(() => {
     if (!selectedEmpId) return null;
     return workReports.find(r => r.employee_id?.toString().toLowerCase() === selectedEmpId?.toString().toLowerCase());
  }, [workReports, selectedEmpId]);

  return (
    <div className="p-2 md:p-3 space-y-3 bg-slate-50 min-h-screen font-sans">
      <Helmet>
        <title>Analytics | SBGM ERP</title>
      </Helmet>

      {/* Mini Header */}
      <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white shadow-sm">
               <FileSpreadsheet size={16} />
            </div>
            <div>
               <h1 className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none">System Analytics & Reports</h1>
               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Export office operations data</p>
            </div>
         </div>
         <button onClick={exportToExcel} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2">
            <Download size={12} /> Export
         </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-200/50 p-1 rounded-lg w-fit">
         <button onClick={() => setActiveTab('attendance')} className={`px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'attendance' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            Attendance History
         </button>
         <button onClick={() => setActiveTab('work')} className={`px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'work' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            Daily Work Reports
         </button>
      </div>

      {activeTab === 'attendance' ? (
        <div className="space-y-3 animate-in fade-in transition-all">
           <div className="flex flex-wrap gap-3 items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer relative">
                 <Calendar size={13} className="text-emerald-600" />
                 <input 
                   type="month" 
                   value={selectedMonth} 
                   onChange={(e) => setSelectedMonth(e.target.value)} 
                   className="text-[10px] font-black text-slate-800 outline-none uppercase bg-transparent cursor-pointer w-full" 
                 />
              </div>
              <div className="h-4 w-px bg-slate-200 mx-1"></div>
              <div className="flex flex-col gap-1 flex-1 max-w-[200px]">
                 <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Staff Member</label>
                 <select value={filters.employee_id} onChange={(e) => setFilters({...filters, employee_id: e.target.value})} className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold outline-none">
                    <option value="">All Employees</option>
                    {employees.map(e => <option key={e.id} value={e.id}>{e.full_name}</option>)}
                 </select>
              </div>
           </div>

           <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden relative min-h-[300px]">
               <table className="w-full border-collapse">
                 {!filters.employee_id ? (
                    <>
                      <thead>
                         <tr className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest">
                            <th className="px-4 py-2 text-center w-12">SN</th>
                            <th className="px-4 py-2 text-left">Employee</th>
                            <th className="px-4 py-2 text-left">Contact Details</th>
                            <th className="px-4 py-2 text-center">Working</th>
                            <th className="px-4 py-2 text-center text-emerald-100">Present</th>
                            <th className="px-4 py-2 text-center text-rose-100">Absent</th>
                            <th className="px-4 py-2 text-right">Action</th>
                         </tr>
                      </thead>
                      <tbody className="text-[10px] font-bold text-slate-700">
                         {summaryData.map((item, idx) => (
                            <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                               <td className="px-4 py-2 text-center text-slate-400">{idx + 1}</td>
                               <td className="px-4 py-2">
                                  <div className="flex items-center gap-2">
                                     <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                        <img src={getImageUrl(item.profile_photo)} className="w-full h-full object-cover" />
                                     </div>
                                     <div className="flex flex-col leading-none">
                                        <span className="text-slate-800">{item.full_name}</span>
                                        <span className="text-[7px] text-slate-400 uppercase mt-0.5">{item.designation}</span>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-4 py-2 flex flex-col gap-0.5">
                                  <span className="leading-tight">{item.mobile}</span>
                                  <span className="text-[8px] text-slate-300 font-medium italic">{item.email}</span>
                               </td>
                               <td className="px-4 py-2 text-center">{item.total_working_days}</td>
                               <td className="px-4 py-2 text-center text-emerald-600 font-black">{item.total_present || 0}</td>
                               <td className="px-4 py-2 text-center text-rose-500 font-black">{item.total_absent || 0}</td>
                               <td className="px-4 py-2 text-right">
                                  <button onClick={() => setFilters({ employee_id: item.id || item.employee_id })} className="text-blue-600 hover:underline bg-blue-50 px-2 py-0.5 rounded text-[8px]">Details</button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                    </>
                 ) : (
                    <>
                      <thead>
                         <tr className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest">
                            <th className="px-4 py-2 text-center w-12">SN</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-center">Status</th>
                            <th className="px-4 py-2 text-center">In / Out</th>
                            <th className="px-4 py-2 text-center">Worked</th>
                            <th className="px-4 py-2 text-center">Action</th>
                         </tr>
                      </thead>
                      <tbody className="text-[10px] font-bold text-slate-700">
                         {reportData.map((item, idx) => (
                            <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50">
                               <td className="px-4 py-2 text-center text-slate-400">{idx + 1}</td>
                               <td className="px-4 py-2">{moment(item.date).format("DD-MM-YYYY")}</td>
                               <td className="px-4 py-2 text-center">
                                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${item.status === 'present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>{item.status}</span>
                               </td>
                               <td className="px-4 py-2 text-center text-slate-500 font-medium">
                                  {item.in_time ? moment(item.in_time, "HH:mm:ss").format("hh:mm A") : "--"} ➔ {item.out_time ? moment(item.out_time, "HH:mm:ss").format("hh:mm A") : "--"}
                               </td>
                               <td className="px-4 py-2 text-center text-blue-600 font-black">{item.total_work_hours || "--"}</td>
                               <td className="px-4 py-2 text-center">
                                  <button onClick={() => setFilters({ employee_id: "" })} className="text-slate-400 hover:text-slate-600"><ArrowRight size={12} className="rotate-180 inline mx-auto" /></button>
                               </td>
                            </tr>
                         ))}
                         {reportData.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center opacity-30 text-[10px] font-black uppercase">No Logs Found</td></tr>}
                      </tbody>
                    </>
                 )}
              </table>
               {loading && (
                  <div className="absolute top-[34px] inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">
                     <RefreshCw className="text-emerald-600 animate-spin" size={24} />
                  </div>
               )}
            </div>
         </div>
      ) : (
        <div className="space-y-3 animate-in fade-in transition-all">
           <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                 <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer">
                      <Calendar size={13} className="text-emerald-600" />
                      <input 
                        type="date" 
                        value={workDate} 
                        onChange={(e) => setWorkDate(e.target.value)} 
                        className="text-[10px] font-black text-slate-800 outline-none uppercase bg-transparent cursor-pointer w-full" 
                      />
                 </div>
                <div className="h-6 w-px bg-slate-200 mx-1"></div>
                <p className="text-[9px] font-bold text-slate-400 italic">Progress tracking for {moment(workDate).format("DD-MM-YYYY")}</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden max-h-[450px] relative">
                 {loading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">
                       <RefreshCw className="text-emerald-600 animate-spin" size={20} />
                    </div>
                 )}
                 <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h4 className="text-[8px] font-black text-slate-800 uppercase tracking-widest">Active Staff</h4>
                    <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-full text-[7px] font-black">{employees.length}</span>
                 </div>
                 <div className="flex-1 overflow-y-auto custom-scrollbar p-1 space-y-1">
                    {employees.map((emp, idx) => {
                       const report = workReports.find(r => r.employee_id?.toString().toLowerCase() === emp.id?.toString().toLowerCase());
                       const isPresent = emp.attendance?.status === 'present';
                       const isSelected = selectedEmpId?.toString().toLowerCase() === emp.id?.toString().toLowerCase();
                       return (
                          <div key={emp.id} onClick={() => setSelectedEmpId(emp.id?.toString())} className={`flex items-center gap-3 p-1.5 rounded cursor-pointer border ${isSelected ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-white text-slate-700 border-slate-100 hover:bg-slate-50'}`}>
                             <span className={`text-[8px] font-black w-3 ${isSelected ? 'text-emerald-200' : 'text-slate-300'}`}>{idx + 1}</span>
                             <div className="w-7 h-7 rounded bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-inner">
                                <img src={getImageUrl(emp.profile_photo)} className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1 leading-tight min-w-0">
                                <p className={`text-[10px] font-black truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>{emp.full_name}</p>
                                <p className={`text-[7px] font-bold uppercase truncate ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>{emp.designation}</p>
                             </div>
                             <div className="flex flex-col items-end gap-0.5">
                                {report && <CheckCircle2 size={10} className={isSelected ? 'text-white' : 'text-emerald-500'} />}
                                <span className={`text-[7px] font-black uppercase px-1 rounded ${isPresent ? (isSelected ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600') : (isSelected ? 'bg-white/20' : 'bg-rose-50 text-rose-500')}`}>
                                    {isPresent ? 'PRESENT' : 'ABSENT'}
                                </span>
                             </div>
                          </div>
                       );
                    })}
                 </div>
              </div>

              <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                 <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                       <FileText size={14} className="text-emerald-600" />
                       {selectedReport ? `${selectedReport.User?.full_name}` : "Member Report"}
                    </h3>
                    {selectedReport && <span className="text-[8px] font-bold text-slate-400">{moment(selectedReport.date).format("DD-MM-YYYY")}</span>}
                 </div>
                 <div className="flex-1 p-4 overflow-y-auto max-h-[350px]">
                    {selectedEmpId ? (
                       selectedReport ? (
                          <div className="p-4 bg-slate-50 rounded border border-slate-100">
                             <div className="text-[10px] font-medium text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedReport.report_content}</div>
                          </div>
                       ) : (
                          <div className="flex flex-col items-center justify-center py-12 opacity-30 italic text-[10px] font-bold uppercase tracking-widest text-slate-400">No report submitted for today</div>
                       )
                    ) : (
                       <div className="flex flex-col items-center justify-center py-12 opacity-10">
                          <ArrowRight size={24} className="animate-pulse" />
                          <p className="text-[10px] font-black uppercase tracking-widest mt-2">Select a member</p>
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ERPreports;
