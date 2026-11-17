import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { FileText, Search, Send, Download, ChevronDown, RefreshCw, X, Check, Mail, History, Users, Trash2 } from "lucide-react";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import { jsPDF } from "jspdf";
import { toJpeg } from "html-to-image";
import { company, fullAddress } from "../../config/company";

const numberToWords = (num) => {
  if (num === 0) return "Zero";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const scales = ["", "Thousand", "Lakh", "Crore"];
  const convert = (n) => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + convert(n % 100) : "");
  };
  if (num < 1000) return convert(num);
  let result = "";
  const groups = [];
  groups.push(num % 1000); num = Math.floor(num / 1000);
  while (num > 0) { groups.push(num % 100); num = Math.floor(num / 100); }
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i]) result += (result ? " " : "") + convert(groups[i]) + (scales[i] ? " " + scales[i] : "");
  }
  return result.trim() + " Rupees Only";
};

const OfferLetterManagement = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [employees, setEmployees] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('generate');
  const [autoSend, setAutoSend] = useState(false);
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);

  const [formData, setFormData] = useState({
    joining_date: moment().add(7, "days").format("YYYY-MM-DD"),
    designation: "",
    annual_salary: "",
    responsibilities: "",
  });

  const IMG_URL = import.meta.env.VITE_API_BASE_URL_IMG || import.meta.env.VITE_API_BASE_URL.replace('/api', '');
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${IMG_URL}${normalizedPath}`;
  };

  useEffect(() => {
    fetchEmployees();
    fetchHistory();
  }, []);

  useEffect(() => {
    if (autoSend && showPreview) {
      setAutoSend(false);
      handleSendEmail();
    }
  }, [autoSend, showPreview]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await API.get("/offer-letters/employees");
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (e) { showToast("Failed to fetch employees", "error"); }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const res = await API.get("/offer-letters/history");
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (e) { console.error("Failed to fetch history"); }
  };

  const handleSelectEmployee = (emp) => {
    setSelectedEmp(emp);
    setFormData({
      joining_date: emp.joining_date || moment().add(7, "days").format("YYYY-MM-DD"),
      designation: emp.designation || "",
      annual_salary: emp.gross_salary || "",
      responsibilities: "",
    });
    setDropdownOpen(false);
    setSearchTerm("");
  };

  const handleRegenerate = (record) => {
    const emp = employees.find(e => e.id === record.employee_id) || {
      id: record.employee_id,
      full_name: record.employee_name,
      email: record.employee_email,
      designation: record.designation,
      profile_photo: record.Employee?.profile_photo || null,
      gross_salary: record.annual_salary
    };
    setSelectedEmp(emp);
    setFormData({
      joining_date: record.joining_date,
      designation: record.designation,
      annual_salary: record.annual_salary,
      responsibilities: record.responsibilities || ""
    });
    setDropdownOpen(false);
    setShowPreview(false);
    setActiveTab('generate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectSend = (record) => {
    const emp = employees.find(e => e.id === record.employee_id) || {
      id: record.employee_id,
      full_name: record.employee_name,
      email: record.employee_email,
      designation: record.designation,
      profile_photo: record.Employee?.profile_photo || null,
      gross_salary: record.annual_salary
    };
    
    flushSync(() => {
      setSelectedEmp(emp);
      setFormData({
        joining_date: record.joining_date,
        designation: record.designation,
        annual_salary: record.annual_salary,
        responsibilities: record.responsibilities || ""
      });
      setDropdownOpen(false);
      setShowPreview(true);
      setAutoSend(true);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer letter record?")) return;
    try {
      await API.delete(`/offer-letters/${id}`);
      showToast("Record deleted", "success");
      fetchHistory();
    } catch (e) {
      showToast("Failed to delete record", "error");
    }
  };

  const handleGeneratePreview = () => {
    if (!selectedEmp) return showToast("Please select an employee", "error");
    if (!formData.designation) return showToast("Please enter designation", "error");
    if (!formData.annual_salary) return showToast("Please enter annual salary", "error");
    if (!formData.joining_date) return showToast("Please select joining date", "error");
    setShowPreview(true);
  };

  const generatePDFData = async () => {
    if (!page1Ref.current || !page2Ref.current) throw new Error("Preview element not found");
    
    const pdf = new jsPDF("p", "mm", "a4");
    const pW = pdf.internal.pageSize.getWidth();
    const pH = pdf.internal.pageSize.getHeight();
    
    const pages = [page1Ref.current, page2Ref.current];
    
    for (let i = 0; i < pages.length; i++) {
      const el = pages[i];
      const dataUrl = await toJpeg(el, { 
        quality: 0.8, 
        pixelRatio: 1.5,
        backgroundColor: '#ffffff'
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => { img.onload = resolve; });

      if (i > 0) pdf.addPage();
      
      const ratio = pW / img.width;
      const scaledH = img.height * ratio;
      
      pdf.addImage(dataUrl, "JPEG", 0, 0, pW, scaledH);
    }
    
    return pdf;
  };

  const handleDownloadPDF = async () => {
    try {
      showToast("Generating PDF...", "info");
      const pdf = await generatePDFData();
      pdf.save(`Offer_Letter_${selectedEmp.full_name.replace(/\s/g, "_")}.pdf`);

      // Attempt to save record history when downloaded
      try {
        await API.post("/offer-letters/save", {
          employee_id: selectedEmp.id,
          employee_name: selectedEmp.full_name,
          employee_email: selectedEmp.email,
          designation: formData.designation,
          joining_date: formData.joining_date,
          annual_salary: Number(formData.annual_salary),
          responsibilities: formData.responsibilities,
        });
        fetchHistory();
      } catch (e) { }

      showToast("PDF Downloaded!", "success");
    } catch (e) { 
        console.error("PDF generation failed:", e);
        showToast("PDF generation failed. Please try again.", "error"); 
    }
  };

  const handleSendEmail = async () => {
    if (!selectedEmp?.email) return showToast("Employee email not found", "error");
    setSending(true);
    try {
      showToast("Preparing document for email...", "info");
      const pdf = await generatePDFData();
      // Send pure base64 string instead of a data URI to avoid parsing/regex crashes in Nodemailer
      const rawDataUri = pdf.output('datauristring');
      const pdfAttachment = rawDataUri.includes('base64,') ? rawDataUri.split('base64,')[1] : rawDataUri;
      
      await API.post("/offer-letters/save", {
        employee_id: selectedEmp.id,
        employee_name: selectedEmp.full_name,
        employee_email: selectedEmp.email,
        designation: formData.designation,
        joining_date: formData.joining_date,
        annual_salary: Number(formData.annual_salary),
        responsibilities: formData.responsibilities,
      });

      await API.post("/offer-letters/send", {
        to: selectedEmp.email,
        subject: `Offer Letter - ${formData.designation} | ${company.name}`,
        htmlContent: "Generated PDF via frontend", // Not heavily used
        employee_name: selectedEmp.full_name,
        designation: formData.designation,
        joining_date: moment(formData.joining_date).format("DD MMMM, YYYY"),
        annual_salary: formData.annual_salary,
        employee_id: selectedEmp.id,
        pdfAttachment
      });

      showToast(`Offer letter and attachment sent to ${selectedEmp.email}`, "success");
      fetchHistory();
    } catch (e) { 
        console.error("Email error:", e);
        showToast("Failed to send email", "error"); 
    }
    setSending(false);
  };

  const filteredEmps = employees.filter(e =>
    e.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const monthlySalary = formData.annual_salary ? Math.round(Number(formData.annual_salary) / 12) : 0;
  const salaryInWords = formData.annual_salary ? numberToWords(Number(formData.annual_salary)) : "";
  const joiningFormatted = formData.joining_date ? moment(formData.joining_date).format("DD MMMM, YYYY") : "";

  // Common Header Component for A4 Pages
  const LetterHeader = () => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0f172a", paddingBottom: "15px", marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img src="/logo.png" alt={company.name} style={{ height: "60px" }} />
        <div>
          <h1 style={{ margin: 0, fontSize: "16pt", fontWeight: 800, color: "#0f172a", letterSpacing: "1px", textTransform: "uppercase" }}>{company.name}</h1>
          <p style={{ margin: "2px 0 0", fontSize: "8pt", color: "#64748b", letterSpacing: "3px", textTransform: "uppercase" }}>{company.tagline}</p>
          <p style={{ margin: "4px 0 0", fontSize: "8pt", color: "#475569", lineHeight: "1.4" }}>
            {fullAddress}<br />
            {company.email} | {company.phone}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
      <Helmet><title>Offer Letter | {company.shortName}</title></Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Offer Letter Management</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Super Admin Access Only</p>
          </div>
        </div>
        <button onClick={() => { fetchEmployees(); fetchHistory(); }} className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Tabs */}
      {!showPreview && (
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
            <button 
                onClick={() => { setActiveTab('generate'); setShowPreview(false); }} 
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'generate' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
                Generate Offer Letter
            </button>
            <button 
                onClick={() => { setActiveTab('history'); setShowPreview(false); }} 
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'history' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
                Reprint Generated
            </button>
          </div>
      )}

      {/* Employee Selection + Form */}
      {!showPreview && activeTab === 'generate' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Select Employee</h2>

          {/* Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl text-left hover:border-violet-300 transition-all cursor-pointer"
            >
              {selectedEmp ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-black text-sm overflow-hidden border border-violet-200 shadow-sm">
                    {selectedEmp.profile_photo ? (
                      <img src={getImageUrl(selectedEmp.profile_photo)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      selectedEmp.full_name?.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{selectedEmp.full_name}</p>
                    <p className="text-[10px] text-slate-400">{selectedEmp.email} • {selectedEmp.designation || "No Designation"}</p>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-slate-400">Click to select an employee...</span>
              )}
              <ChevronDown size={18} className={`text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-80 overflow-hidden">
                <div className="p-3 border-b border-slate-100 sticky top-0 bg-white">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text" placeholder="Search employee..." value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} autoFocus
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-violet-400"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-60">
                  {filteredEmps.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">No employees found</div>
                  ) : (
                    filteredEmps.map((emp) => (
                      <button key={emp.id} onClick={() => handleSelectEmployee(emp)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-violet-50 transition-all cursor-pointer text-left border-b border-slate-50 last:border-0"
                      >
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs shrink-0 overflow-hidden border border-slate-200">
                          {emp.profile_photo ? (
                            <img src={getImageUrl(emp.profile_photo)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            emp.full_name?.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate">{emp.full_name}</p>
                          <p className="text-[9px] text-slate-400 truncate">{emp.email} • {emp.designation || "N/A"}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          {selectedEmp && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Designation / Position</label>
                <input type="text" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Software Developer"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-violet-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Annual Salary (CTC)</label>
                <input type="number" value={formData.annual_salary} onChange={(e) => setFormData({ ...formData, annual_salary: e.target.value })}
                  placeholder="e.g. 300000"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-violet-500 transition-all"
                />
                {formData.annual_salary && <p className="text-[9px] text-violet-500 font-bold">Monthly: ₹{monthlySalary.toLocaleString("en-IN")} • {salaryInWords}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Joining Date</label>
                <input type="date" value={formData.joining_date} onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-violet-500 transition-all"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Key Responsibilities (One per line)</label>
                <textarea value={formData.responsibilities} onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="E.g. Develop and maintain web applications&#10;Collaborate with cross-functional teams"
                  rows={4}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-violet-500 transition-all resize-y"
                />
              </div>
            </div>
          )}

          {selectedEmp && (
            <div className="flex justify-end pt-2">
              <button onClick={handleGeneratePreview}
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <FileText size={14} /> Generate Preview
              </button>
            </div>
          )}
        </div>
      )}

      {/* History Table */}
      {!showPreview && activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History size={18} className="text-slate-400" />
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Generated History</h2>
            </div>
          </div>
          {history.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-400 font-bold">No offer letters have been generated yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">
                    <th className="px-6 py-4 border-b border-slate-100">Employee</th>
                    <th className="px-6 py-4 border-b border-slate-100">Designation</th>
                    <th className="px-6 py-4 border-b border-slate-100">CTC</th>
                    <th className="px-6 py-4 border-b border-slate-100">Status</th>
                    <th className="px-6 py-4 border-b border-slate-100">Date Generated</th>
                    <th className="px-6 py-4 border-b border-slate-100 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {history.map((record) => (
                    <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 overflow-hidden shadow-sm">
                            {record.Employee?.profile_photo ? (
                              <img src={getImageUrl(record.Employee.profile_photo)} alt="" className="w-full h-full object-cover" />
                            ) : (
                              record.employee_name.charAt(0)
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{record.employee_name}</p>
                            <p className="text-[9px] text-slate-400">{record.employee_email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-600">{record.designation}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600">₹{Number(record.annual_salary).toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${record.status === 'sent' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                          }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium text-[11px]">{moment(record.createdAt).format("DD MMM YYYY, hh:mm A")}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {record.status === 'generated' && (
                            <button onClick={() => handleDirectSend(record)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              <Send size={12} /> Send Email
                            </button>
                          )}
                          <button onClick={() => handleRegenerate(record)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-600 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                          >
                            <RefreshCw size={12} /> Regenerate
                          </button>
                          <button onClick={() => handleDelete(record.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Preview + Actions */}
      {showPreview && (
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-4 z-10">
            <button onClick={() => setShowPreview(false)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
            ><X size={14} /> Back to Edit</button>
            <div className="flex-1" />
            <button onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
            ><Download size={14} /> Download PDF</button>
            <button onClick={handleSendEmail} disabled={sending}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >{sending ? <RefreshCw size={14} className="animate-spin" /> : <Mail size={14} />} {sending ? "Sending..." : "Send Email"}</button>
          </div>

          {/* TWO EXPLICIT A4 PAGES */}
          <div className="flex flex-col items-center gap-8">
            
            {/* PAGE 1 */}
            <div className="shadow-2xl border border-slate-200 bg-white">
              <div ref={page1Ref}
                style={{ width: "210mm", height: "297mm", padding: "15mm 20mm", backgroundColor: "#ffffff", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#1e293b", fontSize: "11pt", lineHeight: "1.7", position: "relative", boxSizing: "border-box" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(90deg, #0f172a 0%, #334155 50%, #f59e0b 100%)" }} />
                
                <LetterHeader />

                <div style={{ textAlign: "center", margin: "15px 0 25px", padding: "10px", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <h2 style={{ margin: 0, fontSize: "16pt", fontWeight: 800, color: "#0f172a", letterSpacing: "4px", textTransform: "uppercase" }}>OFFER LETTER</h2>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "9.5pt" }}>
                  <p style={{ margin: 0 }}><strong>Date:</strong> {moment().format("DD MMMM, YYYY")}</p>
                  <p style={{ margin: 0 }}><strong>Ref:</strong> {company.shortName}/OL/{moment().format("YYYY")}/{String(Math.floor(Math.random() * 900) + 100)}</p>
                </div>

                <p style={{ fontSize: "11pt", marginBottom: "15px" }}><strong>Dear {selectedEmp.full_name},</strong></p>
                <p style={{ fontSize: "10.5pt", textAlign: "justify" }}>
                  We are pleased to offer you the position of <strong>{formData.designation}</strong> at <strong>{company.name}</strong>.
                  We were impressed with your qualifications and believe you will be a valuable addition to our team. Please review the following terms and conditions of your employment:
                </p>

                {/* Key Details Table - Compact & Professional */}
                <table style={{ width: "100%", borderCollapse: "collapse", margin: "15px 0", fontSize: "9.5pt", border: "1px solid #cbd5e1" }}>
                  <tbody>
                    {[
                      ["Position / Designation", formData.designation],
                      ["Date of Joining", joiningFormatted],
                      ["Reporting Time & Address", `9:30 AM at ${company.name}, ${fullAddress}`],
                      ["Annual Salary (CTC)", `₹${Number(formData.annual_salary).toLocaleString("en-IN")} /- Per Annum`],
                      ["Salary in Words", salaryInWords],
                      ["Monthly Salary", `₹${monthlySalary.toLocaleString("en-IN")} /- Per Month`],
                      ["Salary Payment Date", "10th of every month (may vary according to bank holidays)"],
                      ["Weekly Off", "Sunday (Paid Off)"],
                    ].map(([label, value], i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #cbd5e1" }}>
                        <td style={{ padding: "6px 12px", fontWeight: 700, color: "#475569", width: "38%", verticalAlign: "top", borderRight: "1px solid #cbd5e1", background: "#f8fafc" }}>{label}</td>
                        <td style={{ padding: "6px 12px", fontWeight: 600, color: "#0f172a", verticalAlign: "top" }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Responsibilities Section */}
                {formData.responsibilities && formData.responsibilities.trim() && (
                  <div style={{ marginTop: "15px" }}>
                    <h3 style={{ fontSize: "10.5pt", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px" }}>Key Responsibilities</h3>
                    <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "9.5pt", lineHeight: "1.5", color: "#334155" }}>
                      {formData.responsibilities.split('\n').filter(r => r.trim()).map((res, idx) => (
                        <li key={idx} style={{ marginBottom: "3px" }}>{res.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Footer Page 1 */}
                <div style={{ position: "absolute", bottom: "5mm", left: "20mm", right: "20mm", borderTop: "1px solid #e2e8f0", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
                  <p style={{ margin: 0, fontSize: "7.5pt", color: "#94a3b8" }}>This is a computer-generated document. For queries, contact: {company.email}</p>
                  <p style={{ margin: 0, fontSize: "8pt", color: "#64748b", fontWeight: "bold" }}>Page 1 of 2</p>
                </div>
              </div>
            </div>

            {/* PAGE 2 */}
            <div className="shadow-2xl border border-slate-200 bg-white">
              <div ref={page2Ref}
                style={{ width: "210mm", height: "297mm", padding: "15mm 20mm", backgroundColor: "#ffffff", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#1e293b", fontSize: "11pt", lineHeight: "1.7", position: "relative", boxSizing: "border-box" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(90deg, #0f172a 0%, #334155 50%, #f59e0b 100%)" }} />
                
                <LetterHeader />

                {/* Terms & Conditions */}
                <h3 style={{ fontSize: "12pt", fontWeight: 800, color: "#0f172a", margin: "15px 0 12px", borderBottom: "2px solid #f59e0b", paddingBottom: "6px", textTransform: "uppercase", letterSpacing: "2px" }}>Terms & Conditions</h3>

                <ul style={{ paddingLeft: "20px", fontSize: "9pt", textAlign: "justify", listStyleType: "disc", margin: 0, lineHeight: "1.6" }}>
                  <li style={{ marginBottom: "10px", paddingLeft: "5px" }}>
                    <strong>Probation Period:</strong> The first <strong>15 days</strong> of employment shall be considered as the probation period.
                    <ul style={{ paddingLeft: "18px", marginTop: "4px", listStyleType: "circle" }}>
                      <li>If the employee voluntarily resigns during the probation period, <strong>no salary shall be payable</strong> for the days worked.</li>
                      <li>If the employer terminates the employee during probation due to unsuitability for the role, the employer shall decide at its discretion whether to release the salary for the days worked.</li>
                    </ul>
                  </li>
                  <li style={{ marginBottom: "10px", paddingLeft: "5px" }}>
                    <strong>Leave Policy:</strong> Upon successful completion of <strong>90 days</strong> of continuous employment, you shall be entitled to <strong>2 Casual Leaves (CL) per month</strong>.
                    Any leave availed before completing 90 days shall be treated as <strong>unpaid leave</strong> and will result in a proportional salary deduction.
                  </li>
                  <li style={{ marginBottom: "10px", paddingLeft: "5px" }}>
                    <strong>Late Coming Policy:</strong> If an employee arrives late to the office on <strong>3 occasions within a calendar month</strong>, it will result in a deduction equivalent to <strong>1 day's salary</strong> from the monthly payable amount.
                  </li>
                  <li style={{ marginBottom: "10px", paddingLeft: "5px" }}>
                    <strong>Notice Period:</strong> Once the employee accepts this offer and joins the organization, a <strong>15-day notice period</strong> must be served before resignation.
                    Failure to serve the notice period will result in the <strong>salary being put on hold</strong>, and the equivalent amount shall be <strong>deducted as a penalty</strong>.
                  </li>
                  <li style={{ marginBottom: "10px", paddingLeft: "5px" }}>
                    <strong>Target & Performance:</strong> Upon meeting the assigned targets, the <strong>full salary shall be paid</strong> along with any applicable <strong>incentives</strong>.
                    If targets are not met, the company reserves the right to make <strong>proportional salary deductions</strong> as per the performance evaluation policy.
                  </li>
                  <li style={{ marginBottom: "10px", paddingLeft: "5px" }}>
                    <strong>Confidentiality & Conduct:</strong> Any employee found responsible for <strong>leaking organizational secrets</strong>, damaging the company's <strong>reputation</strong>,
                    or engaging in any activity detrimental to the company's interests shall be subject to <strong>legal action</strong>.
                    This may also result in <strong>salary withholding, deductions, or immediate termination</strong> of employment without notice.
                  </li>
                  <li style={{ marginBottom: "10px", paddingLeft: "5px" }}>
                    <strong>Salary Payment:</strong> Salary shall be credited on the <strong>10th of every month</strong> for the previous month's service, subject to applicable deductions and company policies.
                  </li>
                </ul>

                {/* Acceptance */}
                <div style={{ margin: "20px 0", padding: "12px 18px", border: "2px solid #dc2626", borderRadius: "6px", background: "#fef2f2" }}>
                  <p style={{ margin: 0, fontSize: "10pt", fontWeight: 600, color: "#dc2626" }}>
                    By accepting this offer and joining the organization, you acknowledge that you have read, understood, and agreed to all the above terms and conditions of employment at {company.name}.
                  </p>
                </div>

                <p style={{ fontSize: "10.5pt", marginBottom: "12px" }}>
                  We look forward to welcoming you aboard and wish you a successful career with us.
                </p>

                {/* Signature Section */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "25px", pageBreakInside: "avoid" }}>
                  <div style={{ width: "45%" }}>
                    <p style={{ fontSize: "9pt", color: "#64748b", marginBottom: "4px" }}>For & on behalf of</p>
                    <p style={{ fontWeight: 800, fontSize: "10pt", color: "#0f172a", marginBottom: "10px" }}>{company.name}</p>
                    <img src="/sbgmStamp.png" alt="Authorised Signature" style={{ height: "80px", objectFit: "contain" }} />
                    <div style={{ borderTop: "2px solid #0f172a", paddingTop: "6px", marginTop: "6px" }}>
                      <p style={{ margin: 0, fontSize: "9pt", fontWeight: 700, color: "#0f172a" }}>Authorised Signatory</p>
                    </div>
                  </div>
                  <div style={{ width: "45%", textAlign: "right" }}>
                    <p style={{ fontSize: "9pt", color: "#64748b", marginBottom: "4px" }}>Employee Acceptance</p>
                    <div style={{ height: "80px", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                      <p style={{ fontSize: "9pt", color: "#94a3b8", fontStyle: "italic" }}>(Signature)</p>
                    </div>
                    <div style={{ borderTop: "2px solid #0f172a", paddingTop: "6px", marginTop: "6px", textAlign: "right" }}>
                      <p style={{ margin: 0, fontSize: "9pt", fontWeight: 700, color: "#0f172a" }}>{selectedEmp.full_name}</p>
                      <p style={{ margin: 0, fontSize: "8pt", color: "#64748b" }}>Date: _______________</p>
                    </div>
                  </div>
                </div>

                {/* Footer Page 2 */}
                <div style={{ position: "absolute", bottom: "5mm", left: "20mm", right: "20mm", borderTop: "1px solid #e2e8f0", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
                  <p style={{ margin: 0, fontSize: "7.5pt", color: "#94a3b8" }}>This is a computer-generated document. For queries, contact: {company.email}</p>
                  <p style={{ margin: 0, fontSize: "8pt", color: "#64748b", fontWeight: "bold" }}>Page 2 of 2</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default OfferLetterManagement;
