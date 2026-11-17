import { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Send, 
  FileText, 
  ListTodo,
  Calendar,
  User,
  RefreshCw,
  Hash,
  AlertCircle,
  MessageSquare,
  Edit,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from "lucide-react";
import moment from "moment";
import * as XLSX from "xlsx";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";

const TaskBoard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('todo'); // todo, report

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [newTaskAssignedTo, setNewTaskAssignedTo] = useState("");
  const [employees, setEmployees] = useState([]);

  // Work Report Logic
  const [workReport, setWorkReport] = useState("1. ");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [selectedReportDate, setSelectedReportDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    fetchTasks();
    fetchReports();
    if (user?.role === 'super_admin') {
      fetchEmployees();
    }
  }, [activeTab]);

  const [reports, setReports] = useState([]);
  const [reportMonth, setReportMonth] = useState(moment().format("YYYY-MM"));

  const fetchTasks = async () => {
    try {
      const res = await API.get("erp/todo");
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (e) {}
  };

  const fetchEmployees = async () => {
    try {
      const res = await API.get("auth/public-users"); 
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    if (user?.role === 'super_admin' && !newTaskAssignedTo) {
        return showToast("Please select an employee to assign", "warning");
    }
    setLoading(true);
    try {
      const payload = { 
          task: newTask,
          deadline: newTaskDeadline || null,
          assigned_to: newTaskAssignedTo || undefined
      };
      const { data } = await API.post("erp/todo", payload);
      
      // Add the assigned user object temporarily for UI if needed
      if (user?.role === 'super_admin') {
         data.assignedUser = employees.find(emp => emp.id === newTaskAssignedTo);
      }
      
      setTasks([data, ...tasks]);
      setNewTask("");
      setNewTaskDeadline("");
      setNewTaskAssignedTo("");
      showToast("Task updated in list", "success");
    } catch (e) {
      showToast("Error adding task", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await API.put(`erp/todo/${id}`, { status: newStatus });
      setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (e) {}
  };

  const editTask = async (id, task, status, existingDeadline, assignedBy) => {
    if (status === 'completed') return;
    if (user?.role !== 'super_admin' && assignedBy) {
        return showToast("You cannot edit a task assigned by Super Admin", "error");
    }
    const newTaskDesc = prompt("Edit Task:", task);
    if (!newTaskDesc || newTaskDesc === task) return;
    try {
      await API.put(`erp/todo/${id}/edit`, { task: newTaskDesc });
      setTasks(tasks.map(t => t.id === id ? { ...t, task: newTaskDesc } : t));
      showToast("Task updated", "success");
    } catch (e) {
      showToast(e.response?.data?.message || "Edit failed", "error");
    }
  };

  const deleteTask = async (id, assignedBy) => {
    if (user?.role !== 'super_admin' && assignedBy) {
        return showToast("You cannot delete a task assigned by Super Admin", "error");
    }
    if (!confirm("Are you sure?")) return;
    try {
      await API.delete(`erp/todo/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      showToast("Task removed", "success");
    } catch (e) {
      showToast(e.response?.data?.message || "Delete failed", "error");
    }
  };

  const fetchReports = async () => {
    try {
        const start = moment(reportMonth, "YYYY-MM").startOf('month').format("YYYY-MM-DD");
        const end = moment(reportMonth, "YYYY-MM").endOf('month').format("YYYY-MM-DD");
        // We'll use getWorkReports with current user
        const res = await API.get(`erp/work-report?startDate=${start}&endDate=${end}`);
        setReports(Array.isArray(res.data) ? res.data : []);
    } catch (e) {}
  };

  // Auto-numbering logic for work report
  const handleReportKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const lines = workReport.split('\n');
      const lastLine = lines[lines.length - 1];
      const match = lastLine.match(/^(\d+)\.\s/);
      
      if (match) {
        const nextNum = parseInt(match[1]) + 1;
        setWorkReport(prev => prev + '\n' + nextNum + '. ');
      } else {
        setWorkReport(prev => prev + '\n1. ');
      }
    }
  };

  const handleSubmitReport = async () => {
    if (workReport.trim() === "1." || workReport.trim() === "") return showToast("Report content required", "warning");
    
    const targetDate = selectedReportDate || moment().format("YYYY-MM-DD");
    const isToday = moment(targetDate).isSame(moment(), 'day');
    
    if (!isToday) {
       const confirmPast = confirm(`Are you sure you want to submit a report for ${moment(targetDate).format("DD MMM")}? No WhatsApp notification will be sent for past dates.`);
       if (!confirmPast) return;
    }

    setIsSubmittingReport(true);
    try {
      await API.post("erp/work-report", { 
          report_content: workReport,
          date: targetDate 
      });
      showToast(isToday ? "Daily report submitted & broadcasted" : "Historical report saved (No Broadcast)", "success");
      setWorkReport("1. ");
      fetchReports();
    } catch (e) {
      showToast(e.response?.data?.message || "Error submitting report", "error");
    } finally {
      setIsSubmittingReport(false);
    }
  };

  const exportReports = () => {
    const data = reports.map((r, i) => ({
      "SN": i+1,
      "Date": moment(r.date).format("DD-MM-YYYY"),
      "Report Content": r.report_content
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Work_Reports");
    XLSX.writeFile(wb, `My_Work_Reports_${reportMonth}.xlsx`);
  };

  const renderCalendar = () => {
    const startObj = moment(reportMonth, "YYYY-MM").startOf('month');
    const startDayOfWeek = startObj.day();
    const daysInMonth = startObj.daysInMonth();
    
    const elements = [];
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    weekdays.forEach(day => {
       elements.push(<div key={`h-${day}`} className="text-center text-[10px] font-black text-slate-400 py-1 uppercase">{day}</div>);
    });

    for (let i = 0; i < startDayOfWeek; i++) {
       elements.push(<div key={`e-${i}`} className="p-2"></div>);
    }

    const reportCache = {};
    reports.forEach(r => { reportCache[moment(r.date).format("YYYY-MM-DD")] = r; });

    for (let i = 1; i <= daysInMonth; i++) {
        const fullDate = moment(reportMonth, "YYYY-MM").date(i).format("YYYY-MM-DD");
        const hasReport = !!reportCache[fullDate];
        const isSelected = selectedReportDate === fullDate;

        elements.push(
            <div 
              key={`d-${i}`} 
              onClick={() => { if(hasReport) setSelectedReportDate(fullDate); }}
              className={`relative flex items-center justify-center h-8 rounded-lg text-xs font-bold transition-all ${
                isSelected ? 'bg-emerald-500 text-white shadow-md' : 
                hasReport ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 cursor-pointer' : 
                'text-slate-400'
              }`}
            >
               {i}
               {hasReport && !isSelected && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>}
               {hasReport && isSelected && <CheckCircle2 size={10} className="absolute top-0.5 right-0.5 text-white" />}
            </div>
        );
    }
    return elements;
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen font-sans text-slate-800">
      <Helmet>
        <title>Task Board | SBGM ERP</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Work Management</h1>
          <p className="text-xs text-slate-500 font-medium italic">Manage your daily tasks and submit work reports</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white p-1 rounded-xl w-fit border border-slate-200">
        <button 
          onClick={() => setActiveTab('todo')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'todo' ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <ListTodo size={16} /> My To-Do List
        </button>
        <button 
          onClick={() => setActiveTab('report')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'report' ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <FileText size={16} /> Daily Work Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 max-w-6xl">
        {activeTab === 'todo' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Task Creation Card */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Plus size={18} className="text-emerald-600" /> Create New Task
                </h3>
                <form onSubmit={handleAddTask} className="space-y-4">
                  <textarea 
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="What needs to be done today?"
                    className="w-full h-24 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                  />
                  {user?.role === 'super_admin' && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Assign To</label>
                            <select 
                                value={newTaskAssignedTo}
                                onChange={(e) => setNewTaskAssignedTo(e.target.value)}
                                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-blue-400"
                            >
                                <option value="">-- Select Employee --</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.full_name} ({emp.role})</option>
                                ))}
                            </select>
                        </div>
                    </div>
                  )}
                  <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Deadline (Optional)</label>
                      <input 
                        type="datetime-local" 
                        value={newTaskDeadline}
                        onChange={(e) => setNewTaskDeadline(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-blue-400"
                      />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-emerald-500 text-white py-3 rounded-lg text-xs font-bold shadow-md hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                  >
                    Add to List
                  </button>
                </form>
              </div>

              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                  <AlertCircle className="text-emerald-600 shrink-0" size={20} />
                  <p className="text-xs text-blue-900 font-medium leading-relaxed">
                    Personal to-do tasks are private to you. They help you stay organized throughout your shift.
                  </p>
                </div>
              </div>
            </div>

            {/* Task List Table */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <h4 className="text-sm font-bold text-slate-800">My Tasks</h4>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">
                    {tasks.filter(t => t.status !== 'completed').length} Pending
                  </span>
                </div>
                <div className="p-0">
                   {tasks.length > 0 ? (
                     <div className="flex flex-col">
                        {tasks.map((task, idx) => (
                           <div key={task.id} className={`flex items-center justify-between p-4 transition-all border-b border-slate-100 ${task.status === 'completed' ? 'bg-emerald-50/70 border-emerald-100 shadow-sm' : (idx % 2 !== 0 ? 'bg-indigo-50/40' : 'bg-white')} hover:bg-emerald-50/50`}>
                             <div className="flex items-center gap-4 flex-1">
                                <span className="text-[10px] font-black text-slate-400 w-4">{idx + 1}.</span>
                                <div className="flex flex-col">
                                    <span className={`text-sm font-black ${task.status === 'completed' ? 'text-blue-900 line-through decoration-slate-400 decoration-2' : 'text-slate-800'}`}>
                                      {task.task}
                                    </span>
                                    <div className="flex items-center gap-2 mt-1">
                                        {task.deadline && (
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${moment().isAfter(moment(task.deadline)) && task.status !== 'completed' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                                                Due: {moment(task.deadline).format("DD MMM, hh:mm A")}
                                            </span>
                                        )}
                                        {task.assigned_by && (
                                            <span className="text-[9px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                                                Assigned By Super Admin
                                            </span>
                                        )}
                                    </div>
                                </div>
                             </div>
                             <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleTask(task.id, task.status)}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${task.status === 'completed' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-4 ring-emerald-500/10' : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white'}`}
                                >
                                  {task.status === 'completed' ? <CheckCircle2 size={12} /> : <CheckCircle2 size={12} className="opacity-50" />}
                                  {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
                                </button>
                                <button 
                                  onClick={() => editTask(task.id, task.task, task.status, task.deadline, task.assigned_by)}
                                  disabled={task.status === 'completed' || (user?.role !== 'super_admin' && task.assigned_by)}
                                  className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all border border-transparent hover:border-emerald-100 disabled:opacity-20 disabled:cursor-not-allowed"
                                  title={user?.role !== 'super_admin' && task.assigned_by ? "Cannot edit assigned task" : "Edit Task"}
                                >
                                   <Edit size={16} />
                                </button>
                                <button 
                                  onClick={() => deleteTask(task.id, task.assigned_by)}
                                  disabled={user?.role !== 'super_admin' && task.assigned_by}
                                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all border border-transparent hover:border-rose-100 disabled:opacity-20 disabled:cursor-not-allowed"
                                  title={user?.role !== 'super_admin' && task.assigned_by ? "Cannot delete assigned task" : "Delete Task"}
                                >
                                   <Trash2 size={16} />
                                </button>
                             </div>
                           </div>
                        ))}
                     </div>
                   ) : (
                     <div className="py-24 flex flex-col items-center justify-center text-slate-300 space-y-4">
                        <ListTodo size={48} className="opacity-20" />
                        <p className="text-xs font-bold italic">No tasks found. Start by adding one!</p>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-8 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                     <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <FileText size={18} className="text-emerald-600" /> Today's Work Report
                     </h3>
                     <p className="text-[10px] font-bold text-slate-400">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
                  </div>
                  <div className="p-8 space-y-6">
                     <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 ml-1">Write your points here (Use Enter for numbers)</label>
                        <textarea 
                          value={workReport}
                          onKeyDown={handleReportKeyDown}
                          onChange={(e) => setWorkReport(e.target.value)}
                          placeholder="1. My first task completed..."
                          className="w-full h-80 p-6 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 leading-relaxed focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                        />
                     </div>
                     <button 
                       onClick={handleSubmitReport}
                       disabled={isSubmittingReport}
                       className="w-full bg-emerald-600 text-white py-4 rounded-lg text-xs font-bold shadow-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                     >
                       {isSubmittingReport ? <RefreshCw size={18} className="animate-spin" /> : <><Send size={18} /> Submit Task Report to Group</>}
                     </button>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                     <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Report History</h4>
                     <button onClick={exportReports} className="text-emerald-600 hover:text-emerald-700 p-1.5 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm" title="Download Monthly Excel">
                        <Download size={14} />
                     </button>
                  </div>
                  
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                     <div className="flex items-center gap-4 mb-4">
                        <input 
                          type="month" 
                          value={reportMonth} 
                          onChange={(e) => setReportMonth(e.target.value)}
                          className="flex-1 p-2 text-xs font-black bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer hover:border-blue-400 transition-all"
                        />
                     </div>
                     
                     <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                        <div className="grid grid-cols-7 gap-1">
                           {renderCalendar()}
                        </div>
                     </div>

                     {(() => {
                        const selectedReport = reports.find(r => moment(r.date).format('YYYY-MM-DD') === selectedReportDate);
                        if (selectedReport) {
                           return (
                              <div className="mt-4 p-5 bg-emerald-50 rounded-xl border border-emerald-100 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                                 <div className="flex items-center justify-between mb-3 border-b border-blue-200/50 pb-2">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                                      <Calendar size={12} /> {moment(selectedReport.date).format("DD MMMM YYYY (ddd)")}
                                    </p>
                                    <span className="px-2 py-0.5 bg-emerald-500 text-white rounded text-[8px] font-bold uppercase tracking-wider">Submitted</span>
                                 </div>
                                 <div className="text-xs font-bold text-slate-700 whitespace-pre-wrap leading-relaxed">
                                    {selectedReport.report_content}
                                 </div>
                              </div>
                           );
                        } else if (reports.length > 0) {
                           return (
                              <div className="mt-4 text-center p-6 border-2 border-dashed border-slate-100 rounded-xl text-slate-400">
                                 <p className="text-xs font-bold tracking-tight">Select any marked date on the calendar</p>
                              </div>
                           );
                        }
                        return null;
                     })()}

                     {reports.length === 0 && (
                        <div className="py-8 text-center text-slate-300 border-2 border-dashed border-slate-100 rounded-xl">
                           <FileText size={32} className="mx-auto mb-2 opacity-20" />
                           <p className="text-[10px] font-bold uppercase tracking-widest leading-none">No reports logged</p>
                        </div>
                     )}
                  </div>
               </div>

               <div className="p-6 bg-emerald-600 rounded-xl text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full transition-transform duration-700"></div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3 text-blue-400">Reporting Policy</h4>
                  <p className="text-xs font-medium leading-relaxed italic opacity-80">
                    "Daily reports help track project pulse and ensure transparency across teams."
                  </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
