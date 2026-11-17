import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Menu,
  X,
  LayoutDashboard,
  ShoppingBag,
  Users,
  LogOut,
  FileText,
  Settings,
  ShoppingCart,
  Heart,
  Briefcase,
  Award,
  Boxes,
  FileBadge,
  FolderOpen,
  Layers,
  Lock,
  Percent,
  MessageSquare,
  Home,
  Clock,
  Package,
  ExternalLink,
  Radio,
  Phone,
  CheckSquare,
} from "lucide-react";
import {
  Bell,
  User as UserIcon,
  Calendar,
  Database,
  LifeBuoy,
  Megaphone,
  LayoutTemplate,
  ChevronRight,
  ArrowLeft,
  Grid,
  ClipboardList,
  FileSpreadsheet,
  MapPin
} from "lucide-react";
import API from "../../api/axios";
import CRMAnalytics from "../admin/leads/CRMAnalytics";
import { company, apiImageUrl } from "../../config/company";

// Menu Groups for Admin/Office View
const ADMIN_CATEGORIES = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    iconColor: "text-blue-500",
    to: "/admin/dashboard",
    items: [{ to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard, color: "text-blue-600", bg: "bg-blue-50", darkBg: "bg-blue-500" }]
  },
  {
    id: "hr",
    label: "Administration",
    icon: Users,
    iconColor: "text-indigo-500",
    to: "/admin/cat/hr",
    items: [
      { to: "/user/profile", label: "Profile", icon: UserIcon, color: "text-indigo-600", bg: "bg-indigo-50", darkBg: "bg-indigo-500" },
      { to: "/admin/attendance", label: "Attendance", icon: Clock, color: "text-rose-600", bg: "bg-rose-50", darkBg: "bg-rose-500" },
      { to: "/admin/tasks", label: "Task Board", icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50", darkBg: "bg-blue-500" },
      { to: "/admin/reports", label: "ERP Reports", icon: FileSpreadsheet, color: "text-slate-600", bg: "bg-slate-50", darkBg: "bg-slate-500", adminOnly: true },
      { to: "/admin/office-settings", label: "Office Settings", icon: Settings, color: "text-slate-600", bg: "bg-slate-50", darkBg: "bg-slate-500", superAdminOnly: true },
      { to: "/admin/payroll", label: "Payroll Management", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50", darkBg: "bg-emerald-500", superAdminOnly: true },
      { to: "/admin/location-tracking", label: "Location Tracker", icon: MapPin, color: "text-blue-600", bg: "bg-blue-50", darkBg: "bg-blue-500", superAdminOnly: true },
      { to: "/admin/users", label: "Users", icon: Users, color: "text-blue-600", bg: "bg-blue-50", darkBg: "bg-blue-500", adminOnly: true },
      { to: "/admin/jobs", label: "Jobs", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50", darkBg: "bg-emerald-500", adminOnly: true },
      { to: "/admin/offer-letter", label: "Offer Letter", icon: FileText, color: "text-violet-600", bg: "bg-violet-50", darkBg: "bg-violet-500", superAdminOnly: true }
    ]
  },
  {
    id: "crm",
    label: "CRM",
    icon: Megaphone,
    iconColor: "text-rose-500",
    to: "/admin/cat/crm",
    items: [
      { to: "/admin/leads", label: "Leads", icon: Megaphone, color: "text-orange-600", bg: "bg-orange-50", darkBg: "bg-orange-500" }
    ]
  },
  {
    id: "comm",
    label: "Communication",
    icon: Radio,
    iconColor: "text-orange-500",
    to: "/admin/cat/comm",
    items: [
      { to: "/admin/communication", label: "Broadcast", icon: Radio, color: "text-pink-600", bg: "bg-pink-50", darkBg: "bg-pink-500" },
      { to: "/admin/support", label: "Support", icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-50", darkBg: "bg-emerald-500" },
      { to: "/admin/templates", label: "Templates", icon: LayoutTemplate, color: "text-slate-600", bg: "bg-slate-100", darkBg: "bg-slate-500" },
      { to: "/admin/blogs", label: "News & Blogs", icon: Megaphone, color: "text-blue-600", bg: "bg-blue-50", darkBg: "bg-blue-500" }
    ]
  },
  {
    id: "products",
    label: "Products",
    icon: Boxes,
    iconColor: "text-violet-500",
    to: "/admin/cat/products",
    items: [
      { to: "/admin/products", label: "Master Products", icon: Boxes, color: "text-violet-600", bg: "bg-violet-50", darkBg: "bg-violet-500" },
      { to: "/admin/groups", label: "Service Groups", icon: Layers, color: "text-indigo-600", bg: "bg-indigo-50", darkBg: "bg-indigo-500" },
      { to: "/admin/types", label: "Product Types", icon: FolderOpen, color: "text-blue-600", bg: "bg-blue-50", darkBg: "bg-blue-500" },
      { to: "/admin/orders", label: "Orders", icon: ShoppingCart, color: "text-emerald-600", bg: "bg-emerald-50", darkBg: "bg-emerald-500" }
    ]
  },
  {
    id: "config",
    label: "Configuration",
    icon: Settings,
    iconColor: "text-slate-600",
    to: "/admin/cat/config",
    items: [
      { to: "/admin/metadata", label: "Metadata", icon: Database, color: "text-blue-600", bg: "bg-blue-50", darkBg: "bg-blue-500" },
      { to: "/admin/master-report", label: "MasterData", icon: FileText, color: "text-orange-600", bg: "bg-orange-50", darkBg: "bg-orange-500" }
    ]
  }
];

const SidebarContent = ({ categories, isSidebarOpen, navigate, location, isSuperAdmin }) => {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-6">
      {categories.map((category) => {
        // Filter items based on superAdminOnly and adminOnly flags
        const filteredItems = category.items.filter(item => {
          if (item.superAdminOnly && !isSuperAdmin) return false;
          if (item.adminOnly && !isSuperAdmin && !isAdmin) return false;
          return true;
        });

        if (filteredItems.length === 0) return null;

        return (
          <div key={category.id} className="space-y-1">
            {isSidebarOpen && (
              <div className="px-5 mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {category.label}
                </span>
              </div>
            )}
            {filteredItems.map((item, idx) => (
              <NavItem
                key={idx}
                to={item.to}
                label={item.label}
                icon={item.icon}
                iconColor={item.color}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const DashboardLayout = () => {
  const { user, logout, updateUserState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Open sidebar by default only on desktop
    if (window.innerWidth > 768) {
      setIsSidebarOpen(true);
    }
  }, []);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const isSuperAdmin = user?.role === "super_admin";
  const isAdmin = user?.role === "admin" || isSuperAdmin;
  const isEmployee = user?.role === "employee";
  const canAccessAdminPanel = isAdmin || isEmployee || isSuperAdmin;

  // Sync profile on mount to ensure photo is up to date
  useEffect(() => {
    const syncProfile = async () => {
      try {
        // Only fetch if we have a user but maybe missing details or just to stay fresh
        if (user) {
          const { data } = await API.get("/auth/profile");
          updateUserState(data);
        }
      } catch (error) {
        console.error("Profile sync failed", error);
        if (error.response?.status === 401) logout();
      }
    };
    syncProfile();
  }, []);

  // TimeDisplay component to prevent parent re-renders
  const TimeDisplay = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase();
      return `${day}/${month}/${year} (${dayName})`;
    };

    const formatTime = (date) => {
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    };

    return (
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-2.5 px-4 py-2 bg-orange-50 rounded-lg border border-orange-100">
          <Calendar size={16} className="text-orange-500" />
          <span className="text-xs font-bold tracking-wide text-orange-700">
            {formatDate(time)}
          </span>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-100">
          <Clock size={16} className="text-emerald-500" />
          <span className="text-xs font-bold tracking-wide text-emerald-700">
            {formatTime(time)}
          </span>
        </div>
      </div>
    );
  };

  // Get role badge info
  const getRoleBadge = () => {
    if (isSuperAdmin)
      return {
        text: "Super Admin",
        color: "bg-gradient-to-r from-amber-500 to-orange-600",
      };
    if (isAdmin)
      return {
        text: "Admin",
        color: "bg-gradient-to-r from-red-500 to-pink-500",
      };
    if (isEmployee)
      return {
        text: "Employee",
        color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      };
    return {
      text: "User",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    };
  };

  const roleBadge = getRoleBadge();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Collapsed sidebar NavItem (icon only)
  const CollapsedNavItem = ({ to, icon: Icon, isActive, external = false }) => (
    <div className="flex justify-center py-2">
      {external ? (
        <button
          onClick={() => navigate(to)}
          className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white hover:shadow-lg transition-all cursor-pointer"
          title="Go to Home"
        >
          <Icon size={18} />
        </button>
      ) : (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${isActive
              ? "bg-slate-900 text-white shadow-lg"
              : "bg-orange-50 text-orange-400 hover:bg-orange-100 hover:text-orange-500"
            }`
          }
        >
          <Icon size={18} />
        </NavLink>
      )}
    </div>
  );

  // Expanded sidebar NavItem
  const NavItem = ({ to, icon: Icon, label, external = false, iconColor }) => {
    // When sidebar is collapsed, show only icons
    if (!isSidebarOpen) {
      return <CollapsedNavItem to={to} icon={Icon} external={external} />;
    }

    if (external) {
      return (
        <div className="px-2 mb-1">
          <button
            onClick={() => navigate(to)}
            className="w-full flex items-center px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/30 font-medium text-xs tracking-wide"
          >
            <Icon size={18} className="mr-3 flex-shrink-0" />
            <span className="truncate">{label}</span>
          </button>
        </div>
      );
    }

    const isActive =
      location.pathname === to || location.pathname.startsWith(to + "/");

    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate(to);
          // Close sidebar on mobile after navigation
          if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
          }
        }}
        className={`w-full flex items-center px-5 py-2.5 transition-all duration-200 cursor-pointer border-l-4 group relative ${isActive
          ? "bg-slate-900 border-slate-900 text-white"
          : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          } text-xs font-semibold`}
      >
        <div
          className={`mr-3 flex-shrink-0 transition-colors ${isActive ? "text-white" : iconColor || "text-orange-500"}`}
        >
          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        <span className="truncate">{label}</span>
      </button>
    );
  };

  // TileItem component for modular reuse
  const TileItem = ({ item, isLarge = false, isHighlight = false }) => (
    <button
      onClick={() => navigate(item.to)}
      className={`group w-full ${item.bg || 'bg-white'} p-4 rounded-xl border ${isHighlight ? 'border-blue-200' : 'border-slate-200/50'} shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col items-center text-center gap-2 cursor-pointer relative overflow-hidden ${isLarge ? 'h-36' : 'h-32'} justify-center`}
    >
      <div className={`absolute top-0 right-0 w-16 h-16 ${isHighlight ? 'bg-blue-500/10' : 'bg-white/20'} rounded-bl-full -mr-8 -mt-8`}></div>

      <div className={`w-12 h-12 ${item.darkBg || 'bg-slate-800'} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg ring-2 ring-white/20`}>
        <item.icon size={22} className="text-white" />
      </div>

      <div className="mt-1">
        <h3 className={`text-[10px] font-black uppercase tracking-widest ${item.color?.replace('-600', '-900') || 'text-slate-900'} leading-tight group-hover:scale-105 transition-transform`}>
          {item.label}
        </h3>
      </div>
    </button>
  );

  // TileMenu component for category views
  const CategoryTileMenu = () => {
    const catId = location.pathname.split("/").pop();
    const category = ADMIN_CATEGORIES.find(c => c.id === catId);
    const [stats, setStats] = useState({ sbgm: null, mak: null, loading: false });

    useEffect(() => {
      if (catId === 'crm') {
        fetchCRMStats();
      }
    }, [catId]);

    const fetchCRMStats = async () => {
      setStats(prev => ({ ...prev, loading: true }));
      try {
        const [sbgmRes, makRes] = await Promise.all([
          API.get("/leads"),
          API.get("/mak-leads")
        ]);

        const processLeads = (leads) => {
          const total = leads.length;
          const converted = leads.filter(l => l.status === "Converted as Customer").length;
          const interested = leads.filter(l => ["Interested", "May be Interested"].includes(l.status)).length;
          const notInterested = leads.filter(l => l.status === "Not Interested").length;
          const newLeads = leads.filter(l => !l.status || l.status === "New" || l.status === "All").length;

          return { total, converted, interested, notInterested, newLeads };
        };

        setStats({
          sbgm: processLeads(sbgmRes.data),
          mak: processLeads(makRes.data),
          loading: false
        });
      } catch (error) {
        console.error("Failed to fetch CRM stats", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    if (!category) return null;

    const filteredItems = category.items.filter(item => {
      if (item.superAdminOnly && !isSuperAdmin) return false;
      if (item.adminOnly && !isSuperAdmin && !isAdmin) return false;
      return true;
    });

    if (filteredItems.length === 0) return null;

    // Progress Bar Sub-component
    const LeadProgress = ({ label, data, colorClass, borderColor }) => (
      <div className={`flex-1 min-w-[280px] bg-white p-5 rounded-2xl border ${borderColor} shadow-sm space-y-4`}>
        <div className="flex justify-between items-center">
          <h4 className={`text-[11px] font-black uppercase tracking-widest ${colorClass.replace('bg-', 'text-')}`}>{label} Intelligence</h4>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total: {data.total}</span>
        </div>

        {/* Main Progress Bar */}
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          <div className="bg-emerald-500 h-full border-r border-white/20 transition-all duration-1000" style={{ width: `${(data.converted / data.total * 100) || 0}%` }} title="Converted" />
          <div className="bg-blue-500 h-full border-r border-white/20 transition-all duration-1000" style={{ width: `${(data.interested / data.total * 100) || 0}%` }} title="Interested" />
          <div className="bg-orange-500 h-full border-r border-white/20 transition-all duration-1000" style={{ width: `${(data.newLeads / data.total * 100) || 0}%` }} title="New/Pending" />
          <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: `${(data.notInterested / data.total * 100) || 0}%` }} title="Not Interested" />
        </div>

        {/* Legend / Detailed Stats */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase leading-none">Converted</p>
              <p className="text-[11px] font-black text-slate-800">{data.converted}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm" />
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase leading-none">Interested</p>
              <p className="text-[11px] font-black text-slate-800">{data.interested}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm" />
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase leading-none">New Leads</p>
              <p className="text-[11px] font-black text-slate-800">{data.newLeads}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 shadow-sm" />
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase leading-none">Not Interested</p>
              <p className="text-[11px] font-black text-slate-800">{data.notInterested}</p>
            </div>
          </div>
        </div>
      </div>
    );

    // Custom layout for Administration (HR group)
    if (catId === 'hr') {
      const rightPaths = ["/admin/attendance", "/admin/tasks", "/admin/location-tracking"];
      const rightItems = filteredItems.filter(i => rightPaths.includes(i.to));
      const leftItems = filteredItems.filter(i => !rightPaths.includes(i.to));

      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-300 max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
              <category.icon size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{category.label}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Control Center Overview</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* General Modules - LEFT SIDE */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-3 px-1">
                <div className="h-4 w-1 bg-blue-500 rounded-full"></div>
                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Management & Reports</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {leftItems.map((item, idx) => (
                  <TileItem key={idx} item={item} />
                ))}
              </div>
            </div>

            {/* Operational Modules - RIGHT SIDE - TRAY STYLE */}
            <div className="w-full lg:w-96 min-h-full bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex flex-col shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-blue-600 rounded-full"></div>
                <h3 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Daily Operations</h3>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4 items-start">
                {rightItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(item.to)}
                    className="flex flex-col items-center gap-3 group px-2 py-4 rounded-xl hover:bg-white/50 transition-all cursor-pointer active:scale-95"
                  >
                    <div className={`w-14 h-14 ${item.darkBg || 'bg-slate-800'} rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 shadow-blue-500/10`}>
                      <item.icon size={26} className="text-white" />
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none group-hover:text-blue-600 transition-colors">{item.label.split(" ")[0]}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1 block">Quick Access</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-slate-900 text-white shadow-xl scale-110`}>
              <category.icon size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{category.label}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Choose a module to continue</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12">
          {filteredItems.map((item, idx) => (
            <TileItem key={idx} item={item} isLarge />
          ))}
        </div>

        {/* CRM Intelligence Graphs below icons */}
        {catId === 'crm' && (
          <div className="animate-in fade-in zoom-in duration-700">
            {stats.loading ? (
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 border-4 border-slate-100 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fetching Global Lead Statistics...</p>
              </div>
            ) : stats.sbgm && (
              <CRMAnalytics sbgm={stats.sbgm} mak={stats.mak} />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-5 flex-shrink-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2.5 hover:bg-slate-100 rounded-lg text-slate-500 focus:outline-none transition-colors cursor-pointer"
          >
            <Menu size={20} />
          </button>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate(canAccessAdminPanel ? "/admin/dashboard" : "/user/dashboard")}
          >
            <img src="/logo.png" alt={company.name} className="h-9 w-auto hidden sm:block" />
            {/* <span className="font-bold text-sm text-slate-800 hidden md:block">{company.shortName}</span> */}
          </div>
          <TimeDisplay />
        </div>

        {/* Center - Empty/Removed */}
        <div></div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user?.call_access && (
            <a
              href="https://cloudphone.tatateleservices.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[10px] font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-green-500/30 transition-all cursor-pointer no-underline"
            >
              <Phone size={14} />
              SmartFlo CRM
            </a>
          )}

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-3 px-2 py-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white overflow-hidden ring-2 ring-orange-500 shadow-lg">
                {user?.profile_photo ? (
                  <img
                    src={
                      user.profile_photo.startsWith("http") ||
                        user.profile_photo.startsWith("data:")
                        ? user.profile_photo
                        : `${apiImageUrl}${user.profile_photo}`
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={20} />
                )}
              </div>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-xs font-bold text-slate-700">
                  {user?.name || user?.full_name}
                </span>
                <span
                  className={`text-[8px] font-black uppercase tracking-wider text-white px-2 py-0.5 rounded-full ${roleBadge.color}`}
                >
                  {roleBadge.text}
                </span>
              </div>
            </button>

            {isProfileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-xs font-bold text-slate-800">
                      {user?.name || user?.full_name}
                    </p>
                    <p className="text-[10px] text-slate-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/user/profile");
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-3 cursor-pointer"
                  >
                    <UserIcon size={14} /> Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate(
                        isAdmin
                          ? "/admin/security"
                          : "/user/security",
                      );
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-3 cursor-pointer"
                  >
                    <Lock size={14} /> Change Password
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/auth/login");
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            bg-white border-r border-slate-200/80 flex-shrink-0 transition-transform duration-300 ease-in-out flex flex-col z-40 shadow-xl md:shadow-sm overflow-x-hidden
            fixed top-16 left-0 h-[calc(100%-4rem)] md:top-0 md:h-full md:relative
            ${isSidebarOpen ? "translate-x-0 w-64 md:w-56" : "-translate-x-full md:translate-x-0 md:w-16"}
          `}
        >
          {/* Sidebar Header - Only close button for mobile */}
          <div className="p-4 flex items-center justify-between md:hidden border-b border-slate-100">
            <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Menu</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-slate-400 p-2 hover:bg-slate-100 rounded-lg cursor-pointer active:scale-95 transition-transform"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto py-3 custom-scrollbar">
            <nav className={`space-y-1 ${isSidebarOpen ? "px-2" : "px-1"}`}>
              {canAccessAdminPanel ? (
                <>
                  {ADMIN_CATEGORIES.filter(cat => {
                    return cat.items.some(item => {
                      if (item.superAdminOnly && !isSuperAdmin) return false;
                      if (item.adminOnly && !isSuperAdmin && !isAdmin) return false;
                      return true;
                    });
                  }).map((cat) => (
                    <NavItem
                      key={cat.id}
                      to={cat.to}
                      icon={cat.icon}
                      label={cat.label}
                      iconColor={cat.iconColor}
                    />
                  ))}
                </>
              ) : (
                <>
                  <NavItem
                    to="/user/dashboard"
                    icon={LayoutDashboard}
                    label="Dashboard"
                  />
                  <NavItem
                    to="/user/orders"
                    icon={ShoppingBag}
                    label="Orders"
                  />
                  <NavItem to="/user/profile" icon={Settings} label="Profile" />
                  <NavItem
                    to="/user/documents"
                    icon={FileBadge}
                    label="Documents"
                  />
                  <NavItem to="/user/support" icon={LifeBuoy} label="Support" />
                </>
              )}
            </nav>

          </div>

          {/* Footer */}
          <div
            className={`p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3 ${!isSidebarOpen && "hidden"}`}
          >
            <div className="bg-white rounded-xl border border-slate-200/60 p-3 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2.5 px-1">{company.name}</h4>

              <div className="space-y-2">
                {(company.phone || company.email) && (
                  <div className="flex items-center gap-2.5 text-slate-500 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                    <Phone size={10} className="text-orange-500 shrink-0" />
                    <span className="text-[9px] font-bold tracking-wide truncate">{company.phone || company.email}</span>
                  </div>
                )}

                {company.email && company.phone && (
                  <div className="flex items-center gap-2.5 text-slate-500 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                    <MessageSquare size={10} className="text-blue-500 shrink-0" />
                    <span className="text-[9px] font-bold tracking-wide truncate">{company.email}</span>
                  </div>
                )}

                {(company.city || company.state || company.address) && (
                  <div className="flex items-start gap-2.5 text-slate-500 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                    <MapPin size={10} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-[9px] font-bold leading-relaxed">
                      {company.city && company.state ? `${company.city}, ${company.state}` : company.address}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed text-center px-2">
              {company.copyright}
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-2 sm:p-4 md:p-8 lg:p-10 relative scroll-smooth w-full mobile-main-content">
          {/* Dashboard Back Nav for Staff */}
          {canAccessAdminPanel && location.pathname !== "/admin/dashboard" && !location.pathname.includes("/admin/cat/") && (
            <div className="mb-6 flex items-center justify-between animate-in fade-in slide-in-from-left duration-300">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-100 group-hover:bg-rose-100 transition-all shadow-sm">
                  <ArrowLeft size={14} className="text-rose-600" />
                </div>
                Back to previous
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-emerald-700 hover:bg-emerald-100 transition-all shadow-sm"
                >
                  <LayoutDashboard size={12} className="text-emerald-800" /> Dashboard
                </button>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-sm"
                >
                  <Menu size={12} /> Menu
                </button>
              </div>
            </div>
          )}

          {location.pathname.includes("/admin/cat/") ? (
            <CategoryTileMenu />
          ) : (
            <Outlet />
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="mobile-bottom-nav md:hidden">
          {[
            { to: canAccessAdminPanel ? "/admin/dashboard" : "/user/dashboard", icon: LayoutDashboard, label: "Home" },
            { to: "/admin/attendance", icon: Clock, label: "Attend" },
            { to: "/admin/tasks", icon: CheckSquare, label: "Tasks" },
            { to: "/user/profile", icon: UserIcon, label: "Profile" },
          ].map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
            return (
              <button
                key={item.to}
                onClick={() => {
                  navigate(item.to);
                  setIsSidebarOpen(false);
                }}
                className={`mobile-bottom-nav-item ${isActive ? "active" : ""}`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;

