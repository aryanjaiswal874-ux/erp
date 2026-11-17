import { Sequelize } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Partner from "./Partner.js";
import Product from "./Product.js";
import Order from "./Order.js";
import Document from "./Document.js";
import Customer from "./Customer.js";
import Payment from "./Payment.js";
import Ticket from "./Ticket.js";
import ServiceGroup from "./ServiceGroup.js";
import ProductType from "./ProductType.js";
import Job from "./Job.js";
import Application from "./Application.js";
import Company from "./Company.js";
import TicketMessage from "./TicketMessage.js";
import Setting from "./Setting.js";
import DocumentType from "./DocumentType.js";
import PartnerCertificate from "./PartnerCertificate.js";
import Lead from "./Lead.js";
import LeadHistory from "./LeadHistory.js";
import MAKLead from "./MAKLead.js";
import MAKLeadHistory from "./MAKLeadHistory.js";
import MessageTemplate from "./MessageTemplate.js";
import Location from "./Location.js";
import SmartfloCaller from "./SmartfloCaller.js";
import MAKMember from "./MAKMember.js";
import MAKDocument from "./MAKDocument.js";
import MAKEvent from "./MAKEvent.js";
import Blog from "./Blog.js";
import Review from "./Review.js";
import ERP_Attendance from "./ERP_Attendance.js";
import ERP_OfficeSetting from "./ERP_OfficeSetting.js";
import ERP_ToDo from "./ERP_ToDo.js";
import ERP_WorkReport from "./ERP_WorkReport.js";
import ERP_Payroll from "./ERP_Payroll.js";
import ERP_EmployeeLocation from "./ERP_EmployeeLocation.js";
import ERP_Holiday from "./ERP_Holiday.js";


// User & Partner
// ... existing associations (I will use multi_replace if needed, but let's keep it simple)

// Job & Application
Job.hasMany(Application, { foreignKey: "jobId" });
Application.belongsTo(Job, { foreignKey: "jobId" });

User.hasMany(Application, { foreignKey: "userId" });
Application.belongsTo(User, { foreignKey: "userId" });

// User & Partner
User.hasOne(Partner, { foreignKey: "userId" });
Partner.belongsTo(User, { foreignKey: "userId" });

// Partner & PartnerCertificate
Partner.hasMany(PartnerCertificate, { foreignKey: "partnerId" });
PartnerCertificate.belongsTo(Partner, { foreignKey: "partnerId" });
User.hasMany(PartnerCertificate, { foreignKey: "userId" });
PartnerCertificate.belongsTo(User, { foreignKey: "userId" });

// User & Order
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// User & Document
User.hasMany(Document, { foreignKey: "userId" });
Document.belongsTo(User, { foreignKey: "userId" });

// User & Payment
User.hasMany(Payment, { foreignKey: "userId" });
Payment.belongsTo(User, { foreignKey: "userId" });

// User & Ticket
User.hasMany(Ticket, { foreignKey: "userId" });
Ticket.belongsTo(User, { foreignKey: "userId" });

// User & Company
User.hasMany(Company, { foreignKey: "userId" });
Company.belongsTo(User, { foreignKey: "userId" });

// Partner & Customer
Partner.hasMany(Customer, { foreignKey: "partnerId" });
Customer.belongsTo(Partner, { foreignKey: "partnerId" });

// Customer & Document
Customer.hasMany(Document, { foreignKey: "customerId" });
Document.belongsTo(Customer, { foreignKey: "customerId" });

// Customer & Order
Customer.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(Customer, { foreignKey: "customerId" });

// Product & ServiceGroup / ProductType
ServiceGroup.hasMany(ProductType, { foreignKey: "serviceGroupId" });
ProductType.belongsTo(ServiceGroup, { foreignKey: "serviceGroupId" });

ServiceGroup.hasMany(Product, { foreignKey: "serviceGroupId" });
Product.belongsTo(ServiceGroup, { foreignKey: "serviceGroupId" });

ProductType.hasMany(Product, { foreignKey: "productTypeId" });
Product.belongsTo(ProductType, { foreignKey: "productTypeId" });

// Product & Order
Product.hasMany(Order, { foreignKey: "productId" });
Order.belongsTo(Product, { foreignKey: "productId" });

// Order & Payment
Order.hasMany(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId" });

// Ticket & TicketMessage
Ticket.hasMany(TicketMessage, { foreignKey: "ticketId" });
TicketMessage.belongsTo(Ticket, { foreignKey: "ticketId" });

// Lead & User
User.hasMany(Lead, { foreignKey: "addedBy", as: "CreatedLeads" });
Lead.belongsTo(User, { foreignKey: "addedBy", as: "Creator" });

User.hasMany(Lead, { foreignKey: "assignedTo", as: "AssignedLeads" });
Lead.belongsTo(User, { foreignKey: "assignedTo", as: "Assignee" });

// Lead & LeadHistory
Lead.hasMany(LeadHistory, { foreignKey: "leadId" });
LeadHistory.belongsTo(Lead, { foreignKey: "leadId" });

// LeadHistory & User
User.hasMany(LeadHistory, { foreignKey: "actionBy", as: "LeadActions" });
LeadHistory.belongsTo(User, { foreignKey: "actionBy", as: "Actor" });

// MAKLead & User
User.hasMany(MAKLead, { foreignKey: "addedBy", as: "CreatedMAKLeads" });
MAKLead.belongsTo(User, { foreignKey: "addedBy", as: "Creator" });

User.hasMany(MAKLead, { foreignKey: "assignedTo", as: "AssignedMAKLeads" });
MAKLead.belongsTo(User, { foreignKey: "assignedTo", as: "Assignee" });

// MAKLead & MAKLeadHistory
MAKLead.hasMany(MAKLeadHistory, { foreignKey: "makLeadId" });
MAKLeadHistory.belongsTo(MAKLead, { foreignKey: "makLeadId" });

// MAKLeadHistory & User
User.hasMany(MAKLeadHistory, { foreignKey: "actionBy", as: "MAKLeadActions" });
MAKLeadHistory.belongsTo(User, { foreignKey: "actionBy", as: "Actor" });

// MessageTemplate & User
User.hasMany(MessageTemplate, { foreignKey: "createdBy" });
MessageTemplate.belongsTo(User, { foreignKey: "createdBy" });

// MAK Member Associations
MAKMember.hasMany(MAKDocument, { foreignKey: "memberId", as: "Documents" });
MAKDocument.belongsTo(MAKMember, { foreignKey: "memberId" });

// ERP Associations
User.hasMany(ERP_Attendance, { foreignKey: "employee_id" });
ERP_Attendance.belongsTo(User, { foreignKey: "employee_id" });

User.hasMany(ERP_ToDo, { foreignKey: "employee_id" });
ERP_ToDo.belongsTo(User, { foreignKey: "employee_id" });

User.hasMany(ERP_WorkReport, { foreignKey: "employee_id" });
ERP_WorkReport.belongsTo(User, { foreignKey: "employee_id" });

User.hasMany(ERP_Payroll, { foreignKey: "employee_id" });
ERP_Payroll.belongsTo(User, { foreignKey: "employee_id" });

User.hasMany(ERP_EmployeeLocation, { foreignKey: "employee_id" });
ERP_EmployeeLocation.belongsTo(User, { foreignKey: "employee_id" });


const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully.");

        // Sync models - standard sync, manual patches below handle changes
        await sequelize.sync();

        // Manual check/patch for missing columns in existing tables
        // Sequelize sync({force:false}) doesn't add new columns to existing tables
        try {
            const queryInterface = sequelize.getQueryInterface();

            // Patch Users table
            const userTableInfo = await queryInterface.describeTable('Users');
            const userColumnsToAdd = [
                { name: 'designation', type: Sequelize.STRING },
                { name: 'state', type: Sequelize.STRING },
                { name: 'city', type: Sequelize.STRING },
                { name: 'pincode', type: Sequelize.STRING },
                { name: 'qualification', type: Sequelize.STRING },
                { name: 'age', type: Sequelize.INTEGER },
                { name: 'gender', type: Sequelize.STRING },
                { name: 'secondary_mobiles', type: Sequelize.JSON },
                { name: 'secondary_emails', type: Sequelize.JSON },
                { name: 'bank_details', type: Sequelize.JSON },
                { name: 'is_partner_application_sent', type: Sequelize.BOOLEAN },
                { name: 'is_active', type: Sequelize.BOOLEAN },
                { name: 'smartflo_agent_id', type: Sequelize.STRING },
                { name: 'call_access', type: Sequelize.BOOLEAN },
                { name: 'smartflo_caller_id', type: Sequelize.STRING },
                { name: 'work_mode', type: Sequelize.ENUM('Remote', 'Office') },
            ];

            for (const col of userColumnsToAdd) {
                if (!userTableInfo[col.name]) {
                    console.log(`🛠️  Adding missing column '${col.name}' to Users...`);
                    await queryInterface.addColumn('Users', col.name, {
                        type: col.type,
                        allowNull: true
                    });
                    console.log(`✅ Column '${col.name}' added successfully.`);
                }
            }

            // Manually update ENUM for role
            try {
                await sequelize.query("ALTER TABLE Users MODIFY COLUMN role ENUM('user', 'admin', 'partner', 'employee') DEFAULT 'user';");
                console.log("✅ Role ENUM updated successfully.");
            } catch (enumErr) {
                console.log("ℹ️ Role ENUM update skipped or failed (might already exist):", enumErr.message);
            }

            // Patch PartnerCertificates
            const certTableInfo = await queryInterface.describeTable('PartnerCertificates');
            if (!certTableInfo.templateVersion) {
                console.log("🛠️  Adding missing column 'templateVersion' to PartnerCertificates...");
                await queryInterface.addColumn('PartnerCertificates', 'templateVersion', {
                    type: Sequelize.STRING,
                    allowNull: false,
                    defaultValue: 'v2-landscape-vintage'
                });
                console.log("✅ Column 'templateVersion' added successfully.");
            }

            // Patch LeadHistories status column
            const historyTableInfo = await queryInterface.describeTable('LeadHistories');
            if (!historyTableInfo.status) {
                console.log("🛠️  Adding missing column 'status' to LeadHistories...");
                await queryInterface.addColumn('LeadHistories', 'status', {
                    type: Sequelize.STRING,
                    allowNull: true
                });
                console.log("✅ Column 'status' added successfully.");
            }

            // Patch Leads columns
            const leadTableInfo = await queryInterface.describeTable('Leads');
            if (!leadTableInfo.source) {
                console.log("🛠️  Adding missing column 'source' to Leads...");
                await queryInterface.addColumn('Leads', 'source', {
                    type: Sequelize.STRING,
                    allowNull: true,
                    defaultValue: 'Meta Ad'
                });
                console.log("✅ Column 'source' added successfully.");
            }
            if (!leadTableInfo.interested_for) {
                console.log("🛠️  Adding missing column 'interested_for' to Leads...");
                await queryInterface.addColumn('Leads', 'interested_for', {
                    type: Sequelize.STRING,
                    allowNull: true
                });
                console.log("✅ Column 'interested_for' added successfully.");
            }

            // Patch MAKLeads columns
            try {
                const makLeadTableInfo = await queryInterface.describeTable('MAKLeads');
                if (!makLeadTableInfo.interested_for) {
                    console.log("🛠️  Adding missing column 'interested_for' to MAKLeads...");
                    await queryInterface.addColumn('MAKLeads', 'interested_for', {
                        type: Sequelize.STRING,
                        allowNull: true
                    });
                    console.log("✅ Column 'interested_for' added successfully.");
                }
            } catch (err) {
                console.log("MAKLeads might not exist yet:", err.message);
            }
            // Patch Partner plan_type column
            const partnerTableInfo = await queryInterface.describeTable('Partners');
            if (!partnerTableInfo.plan_type) {
                console.log("🛠️  Adding missing column 'plan_type' to Partners...");
                await queryInterface.addColumn('Partners', 'plan_type', {
                    type: Sequelize.STRING,
                    allowNull: true,
                    defaultValue: 'Member'
                });
                console.log("✅ Column 'plan_type' added successfully.");
            }

            // Patch Payments remarks column
            const paymentTableInfo = await queryInterface.describeTable('Payments');
            if (!paymentTableInfo.remarks) {
                console.log("🛠️  Adding missing column 'remarks' to Payments...");
                await queryInterface.addColumn('Payments', 'remarks', {
                    type: Sequelize.TEXT,
                    allowNull: true
                });
                console.log("✅ Column 'remarks' added successfully.");
            }

            // Patch Payments userId to allow null
            if (paymentTableInfo.userId && paymentTableInfo.userId.allowNull === false) {
                console.log("🛠️  Updating 'userId' to allow null in Payments...");
                await queryInterface.changeColumn('Payments', 'userId', {
                    type: Sequelize.UUID,
                    allowNull: true
                });
                console.log("✅ Column 'userId' updated successfully.");
            }

            // Patch MAKMembers columns
            try {
                const makMemberTableInfo = await queryInterface.describeTable('MAKMembers');
                const makCols = [
                    { name: 'occupation', type: Sequelize.STRING },
                    { name: 'password', type: Sequelize.STRING },
                    { name: 'otp', type: Sequelize.STRING },
                    { name: 'otpExpires', type: Sequelize.DATE },
                    { name: 'idCardUrl', type: Sequelize.STRING },
                    { name: 'certificateUrl', type: Sequelize.STRING },
                ];

                for (const col of makCols) {
                    if (!makMemberTableInfo[col.name]) {
                        console.log(`🛠️  Adding missing column '${col.name}' to MAKMembers...`);
                        await queryInterface.addColumn('MAKMembers', col.name, {
                            type: col.type,
                            allowNull: true
                        });
                        console.log(`✅ Column '${col.name}' added successfully.`);
                    }
                }
            } catch (err) {
                console.log("MAKMembers update error:", err.message);
            }
        } catch (patchError) {
            console.warn("⚠️  Schema patch warning:", patchError.message);
        }

        console.log("✅ Database synced and patched successfully.");
    } catch (error) {
        console.error("❌ Database sync error:", error.message);
        // Don't crash the server, just log the error
    }
};

export {
    sequelize,
    Sequelize,
    syncDatabase,
    User,
    Partner,
    PartnerCertificate,
    Product,
    Order,
    Document,
    Customer,
    Payment,
    Ticket,
    ServiceGroup,
    ProductType,
    Job,
    Application,
    Company,
    TicketMessage,
    Setting,
    DocumentType,
    Lead,

    LeadHistory,
    MAKLead,
    MAKLeadHistory,
    MessageTemplate,
    Location,
    SmartfloCaller,
    MAKMember,
    MAKDocument,
    MAKEvent,
    Blog,
    Review,
    ERP_Attendance,
    ERP_OfficeSetting,
    ERP_ToDo,
    ERP_WorkReport,
    ERP_Payroll,
    ERP_EmployeeLocation,
    ERP_Holiday
};
