const fs = require('fs');

function fixFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const r of replacements) {
        content = content.replace(r.search, r.replace);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${filePath}`);
}

// 1. Fix ERPreports.jsx
fixFile('ERPreports.jsx', [
    {
        search: /<div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden relative">\s+(?:\{loading && \(\s+<div className="absolute inset-0 bg-white\/60 backdrop-blur-\[1px\] z-50 flex items-center justify-center">\s+<RefreshCw className="text-emerald-600 animate-spin" size=\{24\} \/>\s+<\/div>\s+\)\}\s+)?<table className="w-full border-collapse">/,
        replace: '<div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden relative min-h-[300px]">\n               <table className="w-full border-collapse">'
    },
    {
        search: /<\/table>\s+(?:<div className="flex flex-col items-center justify-center py-20 opacity-30 italic text-\[10px\] font-bold uppercase tracking-widest text-slate-400">No report data found for this month<\/div>\s+)?<\/div>\s+<\/div>\s+\) : \(/,
        replace: '</table>\n               {loading && (\n                  <div className="absolute top-[34px] inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">\n                     <RefreshCw className="text-emerald-600 animate-spin" size={24} />\n                  </div>\n               )}\n            </div>\n         </div>\n      ) : ('
    }
]);

// 2. Fix PayrollManagement.jsx
fixFile('PayrollManagement.jsx', [
    {
        search: /<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-\[400px\] relative">\s+<table className="w-full border-collapse">/,
        replace: '<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] relative">\n         <table className="w-full border-collapse">'
    },
    {
        search: /<\/table>\s+(?:\{filteredData.length === 0 && \(|{loading && \()/,
        replace: '</table>\n         {loading && (\n            <div className="absolute top-[48px] inset-0 bg-white/60 backdrop-blur-[2px] z-[50] flex items-center justify-center">\n               <RefreshCw className="text-emerald-600 animate-spin" size={32} />\n            </div>\n         )}\n         {filteredData.length === 0 && ('
    }
]);
