import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { company } from "../../config/company";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      if (["admin", "super_admin", "employee"].includes(loggedInUser.role)) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    }
  }, [loggedInUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post("/auth/forgot-password", { email });
      setIsSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
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
        <title>Forgot Password — {company.name}</title>
      </Helmet>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-10 relative overflow-hidden group">
        
        {/* Glow Effects */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <Link to="/" className="mb-8 transform transition-transform duration-300 hover:scale-105">
            <img 
              src="/logo.png" 
              alt={company.name} 
              className="h-16 w-auto drop-shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden text-3xl font-black bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent tracking-tight">
              {company.shortName}
            </div>
          </Link>

          {!isSent ? (
            <div className="w-full">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Reset Password</h2>
                <p className="text-xs text-slate-500 mt-2 font-medium">Enter your registered email to receive a new password</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-blue-600 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transform transition-all duration-200 hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={18} /> Processing...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link to="/auth/login" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 hover:text-blue-700 transition-colors">
                  <ArrowLeft size={14} /> Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full text-center py-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner border-4 border-white">
                ✓
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Check your inbox</h3>
              <p className="text-sm text-slate-500 mb-8 px-4 leading-relaxed">
                A new password has been sent to <br/><strong className="text-slate-800">{email}</strong>
              </p>
              
              <Link 
                to="/auth/login" 
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-all"
              >
                Return to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
