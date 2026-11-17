const fs = require('fs');
const path = 'ERPreports.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix the Sidebar mapping
content = content.replace(
    /const report = workReports\.find\(r => r\.employee_id\.toString\(\) === emp\.id\.toString\(\)\);/g,
    'const report = workReports.find(r => r.employee_id?.toString().toLowerCase() === emp.id?.toString().toLowerCase());'
);

content = content.replace(
    /const isSelected = selectedEmpId\.toString\(\) === emp\.id\.toString\(\);/g,
    'const isSelected = selectedEmpId?.toString().toLowerCase() === emp.id?.toString().toLowerCase();'
);

content = content.replace(
    /onClick=\{\(\) => setSelectedEmpId\(emp\.id\.toString\(\)\)\}/g,
    'onClick={() => setSelectedEmpId(emp.id?.toString())}'
);

fs.writeFileSync(path, content);
console.log('Fixed ERPreports sidebar');
