const fs = require('fs');
const path = 'd:\\Current Projects\\SBGM\\SBGM\\SBGM_Frontend\\src\\pages\\admin\\ERPreports.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the first loader and add min-h
content = content.replace(
    /<div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden relative">\s+\{loading && \(\s+<div className="absolute inset-0 bg-white\/60 backdrop-blur-\[1px\] z-50 flex items-center justify-center">\s+<RefreshCw className="text-emerald-600 animate-spin" size=\{24\} \/>\s+<\/div>\s+\)\}/,
    '<div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden relative min-h-[300px]">'
);

// 2. Add the first loader back below the thead
// Since there are two theads (summary and detail), we add it once at the end of the table
content = content.replace(
    /<\/table>(\s+)<\/div>(\s+)<\/div>(\s+)\) : \(/,
    '</table>$1{loading && (\n                  <div className="absolute top-[34px] inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">\n                     <RefreshCw className="text-emerald-600 animate-spin" size={24} />\n                  </div>\n               )}$2</div>$3</div>$4'
);

// 3. Fix the work report staff list loader
content = content.replace(
    /\{loading && \(\s+<div className="absolute inset-0 bg-white\/60 backdrop-blur-\[1px\] z-50 flex items-center justify-center">\s+<RefreshCw className="text-emerald-600 animate-spin" size=\{20\} \/>\s+<\/div>\s+\)\}\s+<div className="px-3 py-2 border-b border-slate-100 bg-slate-50\/50 flex items-center justify-between">/,
    '<div className="px-3 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">'
);

content = content.replace(
    /<div className="flex-1 overflow-y-auto custom-scrollbar p-1 space-y-1">/,
    '<div className="flex-1 overflow-y-auto custom-scrollbar p-1 space-y-1 relative min-h-[100px]">\n                     {loading && (\n                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">\n                           <RefreshCw className="text-emerald-600 animate-spin" size={20} />\n                        </div>\n                     )}'
);

fs.writeFileSync(path, content);
console.log('Done');
