import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import path from "path";
import compression from "compression";
import apicache from "apicache";
import mailRoutes from "./routes/mail.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import partnerRoutes from "./routes/partner.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import documentRoutes from "./routes/document.routes.js";
import supportRoutes from "./routes/support.routes.js";
import careerRoutes from "./routes/career.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import reportRoutes from "./routes/report.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import seoRoutes from "./routes/seoRoutes.js";
import leadRoutes from "./routes/lead.routes.js";
import makLeadRoutes from "./routes/makLead.routes.js";
import messageTemplateRoutes from "./routes/messageTemplate.routes.js";
import locationRoutes from "./routes/location.routes.js";
import smartfloRoutes from "./routes/smartfloRoutes.js";
import makAuthRoutes from "./routes/makAuth.routes.js";
import makMemberRoutes from "./routes/makMember.routes.js";
import makEventRoutes from "./routes/makEvent.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import makSeoRoutes from "./routes/makSeo.routes.js";
import erpRoutes from "./routes/erp.routes.js";


dotenv.config();

const app = express();
// Initializing app

app.use(cors());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const cache = apicache.middleware;

// Static Folder for Uploads with Cache Control
const __dirname = path.resolve();
app.use("/uploads", (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    next();
}, express.static(path.join(__dirname, "/uploads")));

app.use("/", seoRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/mak-leads", makLeadRoutes);
app.use("/api/message-templates", messageTemplateRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/smartflo", smartfloRoutes);
app.use("/api/mak/auth", makAuthRoutes);
app.use("/api/mak/members", makMemberRoutes);
app.use("/api/mak/events", makEventRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/mak/seo", makSeoRoutes);
app.use("/api/erp", erpRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
