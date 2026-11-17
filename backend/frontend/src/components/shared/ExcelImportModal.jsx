import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, Check, Loader2, ArrowRight } from 'lucide-react';
import * as XLSX from 'xlsx';

const ExcelImportModal = ({ isOpen, onClose, onImport, title = "Import Leads from Excel", users = [], currentUser }) => {
    const [step, setStep] = useState(1); // 1: Upload, 2: Map
    const [file, setFile] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [mapping, setMapping] = useState({
        name: '',
        contact: '',
        email: '',
        city: '',
        state: '',
        interested_for: ''
    });
    const [assignedTo, setAssignedTo] = useState("");
    const [importing, setImporting] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
            readExcel(selectedFile);
        }
    };

    const readExcel = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

                if (jsonData.length > 0) {
                    setHeaders(jsonData[0]);
                    setData(jsonData.slice(1)); // Remove header row
                    setStep(2);
                } else {
                    setError("Excel file appears to be empty.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to parse Excel file. Please ensure it is a valid .xlsx or .xls file.");
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleImport = async () => {
        if (!mapping.name || !mapping.contact) {
            setError("Please map at least Name and Contact Number fields.");
            return;
        }

        setImporting(true);

        // Map data
        const mappedData = data.map(row => {
            const rowObj = {};

            // Helper to get value by index of header
            const getValue = (headerName) => {
                const index = headers.indexOf(headerName);
                if (index === -1) return null;
                return row[index];
            };

            if (mapping.name) rowObj.name = getValue(mapping.name);
            if (mapping.contact) {
                let rawContact = String(getValue(mapping.contact) || '');
                // Clean: Remove non-digits and take last 10
                let clean = rawContact.replace(/\D/g, '');
                if (clean.length > 10) clean = clean.slice(-10);
                rowObj.contact = clean;
            }
            if (mapping.email) rowObj.email = getValue(mapping.email);
            if (mapping.city) rowObj.city = getValue(mapping.city);
            if (mapping.state) rowObj.state = getValue(mapping.state);
            if (mapping.interested_for) rowObj.interested_for = getValue(mapping.interested_for);
            rowObj.assignedTo = assignedTo || null;
            if (currentUser) {
                rowObj.addedBy = currentUser.id;
            }

            return rowObj;
        }).filter(item => {
            // Basic validation: Must have name and contact
            const hasName = item.name && String(item.name).trim() !== '';
            const hasContact = item.contact && String(item.contact).trim() !== '';
            return hasName && hasContact;
        });

        if (mappedData.length === 0) {
            setError("No valid records found based on the mapping.");
            setImporting(false);
            return;
        }

        try {
            await onImport(mappedData);
            // Reset and close on success
            setStep(1);
            setFile(null);
            setMapping({ name: '', contact: '', email: '', city: '', state: '', interested_for: '' });
            setAssignedTo("");
            onClose();
        } catch (err) {
            setError("Import failed. Please check the console or try again.");
        } finally {
            setImporting(false);
        }
    };

    const reset = () => {
        setStep(1);
        setFile(null);
        setMapping({ name: '', contact: '', email: '', city: '', state: '', interested_for: '' });
        setAssignedTo("");
        setError(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                            <FileSpreadsheet size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                            <p className="text-xs text-gray-500 font-medium">Bulk upload leads from your spreadsheet</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={importing}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1 bg-white">

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3 border border-red-100">
                            <AlertCircle size={20} />
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative">
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                <Upload size={32} className="text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Click or Drag Excel File Here</h3>
                            <p className="text-slate-500 text-sm">Supports .xlsx and .xls formats</p>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left: Instructions / Summary */}
                            <div className="space-y-6">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                                        <AlertCircle size={14} /> Import Instructions
                                    </h4>
                                    <ul className="text-xs text-blue-700 space-y-1.5 list-disc pl-4">
                                        <li>Map the columns from your Excel file to the required fields.</li>
                                        <li><strong>Name</strong> and <strong>Contact Number</strong> are mandatory.</li>
                                        <li>Optional fields can be left unmapped.</li>
                                        <li>We will filter out any rows missing required data.</li>
                                    </ul>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">
                                        File Summary
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">File Name:</span>
                                            <span className="font-bold text-slate-800">{file?.name}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Total Rows:</span>
                                            <span className="font-bold text-slate-800">{data.length}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Columns Detected:</span>
                                            <span className="font-bold text-slate-800">{headers.length}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={reset}
                                    className="text-xs font-bold text-red-500 hover:text-red-700 underline"
                                >
                                    Choose a different file
                                </button>
                            </div>

                            {/* Right: Mapping Form */}
                            <div className="space-y-4">
                                <h3 className="text-md font-bold text-slate-800 border-b border-slate-100 pb-2">Map Columns</h3>

                                {/* Name (Required) */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                                        Lead Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1">
                                            <select
                                                value={mapping.name}
                                                onChange={(e) => setMapping({ ...mapping, name: e.target.value })}
                                                className={`w-full text-sm border-2 rounded-lg px-3 py-2 outline-none transition-all ${!mapping.name ? 'border-red-200 bg-red-50 focus:border-red-400' : 'border-green-200 bg-green-50 focus:border-green-400'}`}
                                            >
                                                <option value="">Select Excel Column</option>
                                                {headers.map(h => <option key={h} value={h}>{h}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact (Required) */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                                        Contact Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex-1">
                                        <select
                                            value={mapping.contact}
                                            onChange={(e) => setMapping({ ...mapping, contact: e.target.value })}
                                            className={`w-full text-sm border-2 rounded-lg px-3 py-2 outline-none transition-all ${!mapping.contact ? 'border-red-200 bg-red-50 focus:border-red-400' : 'border-green-200 bg-green-50 focus:border-green-400'}`}
                                        >
                                            <option value="">Select Excel Column</option>
                                            {headers.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Email (Optional) */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                        Email Address (Optional)
                                    </label>
                                    <select
                                        value={mapping.email}
                                        onChange={(e) => setMapping({ ...mapping, email: e.target.value })}
                                        className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select Excel Column</option>
                                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                                    </select>
                                </div>

                                {/* State (Optional) */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                        State (Optional)
                                    </label>
                                    <select
                                        value={mapping.state}
                                        onChange={(e) => setMapping({ ...mapping, state: e.target.value })}
                                        className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select Excel Column</option>
                                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                                    </select>
                                </div>

                                {/* City (Optional) */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                        City (Optional)
                                    </label>
                                    <select
                                        value={mapping.city}
                                        onChange={(e) => setMapping({ ...mapping, city: e.target.value })}
                                        className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select Excel Column</option>
                                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                                    </select>
                                </div>

                                {/* Interested For (Optional) */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                        Interested For (Optional)
                                    </label>
                                    <select
                                        value={mapping.interested_for}
                                        onChange={(e) => setMapping({ ...mapping, interested_for: e.target.value })}
                                        className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select Excel Column</option>
                                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                                    </select>
                                </div>

                                {/* Assign To (Bulk) */}
                                <div className="space-y-1 pt-4 border-t border-slate-100 mt-4">
                                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                                        Assign To (Optional)
                                    </label>
                                    <select
                                        value={assignedTo}
                                        onChange={(e) => setAssignedTo(e.target.value)}
                                        className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                    >
                                        <option value="">Unassigned (System)</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.full_name}</option>
                                        ))}
                                    </select>
                                    <p className="text-[10px] text-slate-400">Selected user will be assigned to all imported leads.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 transition-all">
                    <button
                        onClick={onClose}
                        disabled={importing}
                        className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors uppercase tracking-wider"
                    >
                        Cancel
                    </button>
                    {step === 2 && (
                        <button
                            onClick={handleImport}
                            disabled={importing || !mapping.name || !mapping.contact}
                            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-md shadow-green-200 transition-all flex items-center gap-2 disabled:opacity-50 disabled:shadow-none"
                        >
                            {importing ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" /> Importing...
                                </>
                            ) : (
                                <>
                                    <Check size={16} /> Complete Import
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div >
        </div >
    );
};

export default ExcelImportModal;
