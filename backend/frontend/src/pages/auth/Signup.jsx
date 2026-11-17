import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2, User, Mail, Phone, MapPin, AlertCircle, Building, Map, Hash, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { company } from "../../config/company";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      if (["admin", "super_admin", "employee"].includes(loggedInUser.role)) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    }
  }, [loggedInUser, navigate]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "full_name" && value.length > 0) {
      value = value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    if (name === "mobile") {
      value = value.replace(/\D/g, "");
      if (value.startsWith("0")) value = "";
      if (value.length > 10) value = value.slice(0, 10);
    }

    if (name === "pincode") {
      value = value.replace(/\D/g, "");
      if (value.length > 6) value = value.slice(0, 6);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const mobileRegex = /^[1-9][0-9]{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setError("Mobile number must be exactly 10 digits and cannot start with zero.");
      return;
    }

    setIsLoading(true);
    try {
      const addressParts = [formData.address, formData.district, formData.state].filter(Boolean);
      let fullAddress = addressParts.join(", ");
      if (formData.pincode) {
        fullAddress += fullAddress ? ` - ${formData.pincode}` : formData.pincode;
      }
      
      const payload = {
        ...formData,
        address: fullAddress,
        city: formData.district,
        state: formData.state,
        pincode: formData.pincode,
      };
      delete payload.district;

      const registeredUser = await register(payload);
      if (["admin", "super_admin", "employee"].includes(registeredUser.role)) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundImage: "url('/authbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <Helmet>
        <title>Create Account — {company.name}</title>
        <meta name="description" content={`Register for ${company.name} ERP`} />
      </Helmet>

      {/* Dark overlay to ensure contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-lg relative z-10 my-8">
        <div className="glass-card bg-white/95 backdrop-blur-xl border border-white/20 p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl">
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <img src="/logo.png" alt={company.name} className="h-16 object-contain drop-shadow-sm" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Create Account
            </h2>
            <p className="text-sm mt-1.5 text-slate-500 font-medium">
              Join {company.shortName} to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Full Name *
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input required name="full_name" value={formData.full_name} onChange={handleInputChange} placeholder="Full Name" className="erp-input pl-10 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Email *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@company.com" className="erp-input pl-10 bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Mobile *</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input required type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="9876543210" className="erp-input pl-10 bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Address</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Flat, Building, Street" className="erp-input pl-10 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">State</label>
                <div className="relative">
                  <Map size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select 
                    name="state" 
                    value={formData.state} 
                    onChange={handleInputChange} 
                    className="erp-input pl-10 pr-8 bg-slate-50 border-slate-200 focus:bg-white appearance-none truncate cursor-pointer"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">City</label>
                <div className="relative">
                  <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="district" value={formData.district} onChange={handleInputChange} placeholder="City name" className="erp-input pl-10 bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pincode</label>
              <div className="relative">
                <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" className="erp-input pl-10 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs font-semibold p-3 rounded-lg bg-red-50 text-red-600 border border-red-100">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 mt-4 shadow-lg shadow-blue-500/30">
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-6 text-center border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium">
              Already have an account?{" "}
              <Link to="/auth/login" className="font-semibold text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        
        <p className="text-center text-[11px] mt-6 text-white/80 font-medium tracking-wide drop-shadow-md">
          {company.copyright}
        </p>
      </div>
    </div>
  );
};

export default Signup;
