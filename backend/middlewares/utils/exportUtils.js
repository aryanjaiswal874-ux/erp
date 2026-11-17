import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";

/**
 * Generate PDF Report
 * @param {string} title - Report title
 * @param {Array} columns - Table headers
 * @param {Array} data - Table rows
 * @returns {Buffer}
 */
export const generatePDFBuffer = async (title, columns, data) => {
    const doc = new jsPDF();
    doc.text(title, 14, 15);
    doc.autoTable({
        head: [columns],
        body: data,
        startY: 20,
    });
    return Buffer.from(doc.output("arraybuffer"));
};

/**
 * Generate Invoice PDF
 * @param {Object} order - Order Entity
 * @param {Object} user - User Entity
 * @returns {Buffer}
 */
export const generateInvoicePDF = async (order, user) => {
    const doc = new jsPDF();

    // Company Logo / Header
    doc.setFontSize(22);
    doc.setTextColor(41, 128, 185);
    doc.text("SBGM Services", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("123, Legal Hub, New Delhi, India", 14, 26);
    doc.text("GSTIN: 07AABCU9603R1ZN | support@sbgm.com", 14, 31);

    // Invoice Info
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("TAX INVOICE", 150, 20);
    doc.setFontSize(10);
    doc.text(`Invoice No: INV-${order.id.split('-')[0].toUpperCase()}`, 150, 28);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 33);

    // Bill To
    doc.text("Bill To:", 14, 45);
    doc.setFont(undefined, 'bold');
    doc.text(user.full_name || user.name, 14, 50);
    doc.setFont(undefined, 'normal');
    if (order.company_name) doc.text(order.company_name, 14, 55);
    // doc.text(user.email, 14, 60);

    // Line Items Table
    doc.autoTable({
        startY: 65,
        head: [['#', 'Service Description', 'Amount']],
        body: [
            ['1', order.service_name || "Professional Service", `Rs. ${order.amount}`],
        ],
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
        styles: { fontSize: 10, cellPadding: 3 }
    });

    // Total
    const finalY = doc.lastAutoTable.finalY || 80;
    doc.setFont(undefined, 'bold');
    doc.text(`Total Amount Paid: Rs. ${order.amount}`, 140, finalY + 10);
    doc.setFont(undefined, 'normal');

    doc.setFontSize(8);
    doc.text("This is a computer generated invoice and does not require a signature.", 14, 280);

    return Buffer.from(doc.output("arraybuffer"));
};


/**
 * Generate Excel Report
 * @param {string} sheetName - Sheet name
 * @param {Array} columns - Column definition { header, key, width }
 * @param {Array} data - Rows
 * @returns {Buffer}
 */
export const generateExcelBuffer = async (sheetName, columns, data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = columns;
    worksheet.addRows(data);
    return await workbook.xlsx.writeBuffer();
};
