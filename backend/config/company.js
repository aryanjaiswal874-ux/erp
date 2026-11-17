/**
 * Central company branding & contact config (from .env).
 * Replace values in backend/.env for your deployment.
 */
export const getCompanyConfig = () => ({
  name: process.env.COMPANY_NAME || "ERP System",
  shortName: process.env.COMPANY_SHORT_NAME || process.env.COMPANY_NAME || "ERP",
  tagline: process.env.COMPANY_TAGLINE || "Business Management Platform",
  address: process.env.COMPANY_ADDRESS || "",
  city: process.env.COMPANY_CITY || "",
  state: process.env.COMPANY_STATE || "",
  pincode: process.env.COMPANY_PINCODE || "",
  phone: process.env.COMPANY_PHONE || "",
  email: process.env.COMPANY_EMAIL || "",
  website: process.env.COMPANY_WEBSITE || "",
  whatsappNumber: process.env.COMPANY_WHATSAPP || "",
  logoUrl: process.env.COMPANY_LOGO_URL || "",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  loginUrl: process.env.FRONTEND_LOGIN_URL || `${process.env.FRONTEND_URL || "http://localhost:5173"}/auth/login`,
});

export const companyName = () => getCompanyConfig().name;
export const companyShortName = () => getCompanyConfig().shortName;
