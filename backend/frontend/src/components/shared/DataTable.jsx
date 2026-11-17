import React, { useState, useMemo } from 'react';
import {
    Search, ChevronLeft, ChevronRight, ArrowUpDown,
    Download, Filter, ArrowUp, ArrowDown, ListFilter
} from 'lucide-react';
import * as XLSX from 'xlsx';

/**
 * Reusable DataTable Component
 * @param {Array} columns - [{ header: 'Name', key: 'name', sortable: true, render: (row) => ... }]
 * @param {Array} data - Array of objects
 * @param {string} fileName - Name for excel download
 * @param {number} pageSize - Rows per page
 * @param {string} title - Table title
 * @param {ReactNode} actions - Component to render next to download button
 */
const DataTable = ({
    columns,
    data = [],
    fileName = 'Export',
    pageSize = 10,
    title = '',
    actions = null,
    rowClassName = ''
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Handle Search
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter(row =>
            Object.values(row).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm]);

    // Handle Sort
    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];

                if (aVal < bVal) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aVal > bVal) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    // Handle Pagination
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden font-sans">
            {/* Table Controls */}
            <div className="p-4 md:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    {title && <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">{title}</h2>}
                    <div className="relative flex-grow md:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    {actions}
                    <button
                        onClick={downloadExcel}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        <Download size={14} /> Excel
                    </button>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-2 bg-slate-100 rounded-lg border border-slate-100">
                        {filteredData.length} TOTAL
                    </div>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                        <tr>
                            <th className="px-3 py-3 md:px-6 md:py-4 w-12 md:w-16 text-center">#</th>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className={`px-3 py-3 md:px-6 md:py-4 ${col.sortable ? 'cursor-pointer hover:text-slate-900 select-none' : ''} ${col.className || ''}`}
                                    onClick={() => col.sortable && requestSort(col.key)}
                                >
                                    <div className={`flex items-center gap-2 whitespace-nowrap ${col.className?.includes('text-right') ? 'justify-end' : col.className?.includes('text-center') ? 'justify-center' : ''}`}>
                                        {col.header}
                                        {col.sortable && (
                                            <div className="flex flex-col opacity-40">
                                                <ArrowUp size={8} className={sortConfig.key === col.key && sortConfig.direction === 'asc' ? 'opacity-100 text-slate-900' : ''} />
                                                <ArrowDown size={8} className={sortConfig.key === col.key && sortConfig.direction === 'desc' ? 'opacity-100 text-slate-900' : ''} />
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-[11px] text-slate-700">
                        {paginatedData.length > 0 ? paginatedData.map((row, rowIdx) => (
                            <tr
                                key={row.id || rowIdx}
                                className={`hover:bg-slate-50/50 transition-colors group ${typeof rowClassName === 'function' ? rowClassName(row) : rowClassName}`}
                            >
                                <td className="px-3 py-3 md:px-6 md:py-4 text-center text-slate-400 font-bold">
                                    {(currentPage - 1) * pageSize + rowIdx + 1}
                                </td>
                                {columns.map((col, colIdx) => (
                                    <td key={colIdx} className={`px-3 py-3 md:px-6 md:py-4 ${col.className || ''}`}>
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="py-20 text-center">
                                    <ListFilter size={40} className="mx-auto text-slate-100 mb-4" />
                                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">No matching records found</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="p-5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Showing page {currentPage} of {totalPages}
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <div className="flex items-center gap-1 mx-2">
                            {[...Array(totalPages)].map((_, i) => {
                                // Simple pagination logic: show current, first, last, and neighbors
                                if (i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)) {
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:bg-white border border-transparent hover:border-slate-200'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    );
                                }
                                if (i + 1 === currentPage - 2 || i + 1 === currentPage + 2) {
                                    return <span key={i} className="px-1 text-slate-300 text-xs">...</span>;
                                }
                                return null;
                            })}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
