/**
 * Company branding — controlled via frontend/.env
 * Update VITE_COMPANY_* variables to rebrand the entire ERP UI.
 */
export const company = {
  name: import.meta.env.VITE_COMPANY_NAME || "ERP System",
  shortName: import.meta.env.VITE_COMPANY_SHORT_NAME || "ERP",
  tagline: import.meta.env.VITE_COMPANY_TAGLINE || "Business Management Platform",
  address: import.meta.env.VITE_COMPANY_ADDRESS || "",
  city: import.meta.env.VITE_COMPANY_CITY || "",
  state: import.meta.env.VITE_COMPANY_STATE || "",
  pincode: import.meta.env.VITE_COMPANY_PINCODE || "",
  phone: import.meta.env.VITE_COMPANY_PHONE || "",
  email: import.meta.env.VITE_COMPANY_EMAIL || "",
  website: import.meta.env.VITE_COMPANY_WEBSITE || "",
  whatsapp: import.meta.env.VITE_COMPANY_WHATSAPP || "",
  copyright: import.meta.env.VITE_COMPANY_COPYRIGHT || `© ${new Date().getFullYear()} ERP System`,
};

export const fullAddress = [
  company.address,
  [company.city, company.state, company.pincode].filter(Boolean).join(", "),
]
  .filter(Boolean)
  .join(" • ");

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
export const apiImageUrl = import.meta.env.VITE_API_BASE_URL_IMG || "http://127.0.0.1:5577";
