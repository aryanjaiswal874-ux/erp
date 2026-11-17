import React, { useState, useEffect, useRef } from "react";
import API from "../../api/axios";
import {
  Layers,
  FolderOpen,
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Loader2,
  List,
  Grid,
  FileCheck,
  MapPin,
  Search,
  ChevronDown,
  RefreshCcw,
  PhoneCall
} from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import DashboardLoader from "../../components/layout/DashboardLoader";
import DataTable from "../../components/shared/DataTable";

const MetadataManagement = () => {
  const { user } = useAuth();
  const toast = useToast();
  const isSuperAdmin = user?.role === "super_admin";
  const [activeTab, setActiveTab] = useState("categories");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Categories (Product Categories)
  const [categories, setCategories] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    description: "",
    icon: "",
    isActive: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Types (Product Types)
  const [types, setTypes] = useState([]);
  const [typeModal, setTypeModal] = useState(false);
  const [currentType, setCurrentType] = useState({
    name: "",
    description: "",
    serviceGroupId: "",
    isActive: true,
  });

  // Document Types
  const [docTypes, setDocTypes] = useState([]);
  const [docTypeModal, setDocTypeModal] = useState(false);
  const [currentDocType, setCurrentDocType] = useState({
    name: "",
    description: "",
    isRequired: false,
    isActive: true,
  });

  // Locations
  const [locations, setLocations] = useState([]);
  const [locationModal, setLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    state: "",
    district: "",
    postOffice: "",
    pincode: "",
  });
  const [locSearch, setLocSearch] = useState("");
  const [locPage, setLocPage] = useState(1);
  const [locTotal, setLocTotal] = useState(0);

  // New Location Filter States
  const [allStates, setAllStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ state: "", district: "" });

  // Callers
  const [callers, setCallers] = useState([]);
  const [callerModal, setCallerModal] = useState(false);
  const [currentCaller, setCurrentCaller] = useState({
    company_name: "",
    caller_number: ""
  });

  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    setLoading(true);
    try {
      const [catsRes, typesRes, docsRes] = await Promise.all([
        API.get("/products/groups/all"),
        API.get("/products/types/all"),
        API.get("/documents/types"),
      ]);
      setCategories(catsRes.data);
      setTypes(typesRes.data);
      setDocTypes(docsRes.data);
      fetchStates();
      fetchLocations();
      fetchCallers();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCallers = async () => {
    try {
      const { data } = await API.get("/smartflo/callers");
      setCallers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // --- CATEGORY HANDERS ---
  const openCategoryModal = (cat = null) => {
    if (cat) {
      setCurrentCategory(cat);
      setPreviewUrl(
        cat.icon ? `${import.meta.env.VITE_API_BASE_URL_IMG}${cat.icon}` : "",
      );
    } else {
      setCurrentCategory({
        name: "",
        description: "",
        icon: "",
        isActive: true,
      });
      setPreviewUrl("");
    }
    setSelectedFile(null);
    setCategoryModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", currentCategory.name);
      formData.append("description", currentCategory.description || "");
      formData.append("isActive", currentCategory.isActive);
      if (selectedFile) formData.append("icon", selectedFile);

      if (currentCategory.id) {
        await API.put(`/products/groups/${currentCategory.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/products/groups", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setCategoryModal(false);
      fetchMetadata();
      toast.success("Category saved successfully");
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Remove this category?")) return;
    try {
      await API.delete(`/products/groups/${id}`);
      fetchMetadata();
      toast.success("Category removed");
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  // --- TYPE HANDLERS ---
  const openTypeModal = (type = null) => {
    if (type) setCurrentType(type);
    else
      setCurrentType({
        name: "",
        description: "",
        serviceGroupId: categories[0]?.id || "",
        isActive: true,
      });
    setTypeModal(true);
  };

  const handleSaveType = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (currentType.id) {
        await API.put(`/products/types/${currentType.id}`, currentType);
      } else {
        await API.post("/products/types", currentType);
      }
      setTypeModal(false);
      fetchMetadata();
      toast.success("Type saved successfully");
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteType = async (id) => {
    if (!window.confirm("Remove this type?")) return;
    try {
      await API.delete(`/products/types/${id}`);
      fetchMetadata();
      toast.success("Type removed");
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  // --- DOCUMENT TYPE HANDLERS ---
  const openDocTypeModal = (doc = null) => {
    if (doc) setCurrentDocType(doc);
    else
      setCurrentDocType({
        name: "",
        description: "",
        isRequired: false,
        isActive: true,
      });
    setDocTypeModal(true);
  };

  const handleSaveDocType = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (currentDocType.id) {
        await API.put(`/documents/types/${currentDocType.id}`, currentDocType);
      } else {
        await API.post("/documents/types", currentDocType);
      }
      setDocTypeModal(false);
      fetchMetadata();
      toast.success("Document type saved");
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDocType = async (id) => {
    if (!window.confirm("Remove this document type?")) return;
    try {
      await API.delete(`/documents/types/${id}`);
      fetchMetadata();
      toast.success("Document type removed");
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  // --- LOCATION HANDLERS ---
  const fetchStates = async () => {
    try {
      const { data } = await API.get("/locations/states");
      setAllStates(data);
      if (data.length > 0 && !selectedFilters.state) {
        handleStateFilterChange(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistricts = async (stateName) => {
    try {
      if (!stateName) {
        setAllDistricts([]);
        return;
      }
      const { data } = await API.get(`/locations/districts/${stateName}`);
      setAllDistricts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocations = async (page = 1, search = "", state = "", district = "") => {
    try {
      const { data } = await API.get(`/locations`, {
        params: {
          page,
          search,
          state,
          district,
          limit: 20
        }
      });
      setLocations(data.locations);
      setLocTotal(data.total);
      setLocPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStateFilterChange = (stateName) => {
    setSelectedFilters(prev => ({ ...prev, state: stateName, district: "" }));
    fetchDistricts(stateName);
    fetchLocations(1, locSearch, stateName, "");
  };

  const handleDistrictFilterChange = (districtName) => {
    setSelectedFilters(prev => ({ ...prev, district: districtName }));
    fetchLocations(1, locSearch, selectedFilters.state, districtName);
  };

  const openLocationModal = (loc = null) => {
    if (loc) setCurrentLocation(loc);
    else setCurrentLocation({ state: "", district: "", postOffice: "", pincode: "" });
    setLocationModal(true);
  };

  const handleSaveLocation = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (currentLocation.id) {
        await API.put(`/locations/${currentLocation.id}`, currentLocation);
      } else {
        await API.post("/locations", currentLocation);
      }
      setLocationModal(false);
      fetchLocations(locPage, locSearch);
      toast.success("Location saved");
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteLocation = async (id) => {
    if (!window.confirm("Remove this location?")) return;
    try {
      await API.delete(`/locations/${id}`);
      fetchLocations(locPage, locSearch);
      toast.success("Location removed");
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  // --- CALLER HANDLERS ---
  const openCallerModal = (caller = null) => {
    if (caller) setCurrentCaller(caller);
    else setCurrentCaller({ company_name: "", caller_number: "" });
    setCallerModal(true);
  };

  const handleSaveCaller = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // NOTE: Callers doesn't currently support PUT according to index.js backend edits
      // we only added POST and DELETE, but since id won't be modified often, skipping PUT or just adding it if user tries to "edit" - actually wait, there is no put in backend. 
      // If we only have Add/Delete, we just POST if no ID. Wait, I will just do POST for all as an added element OR write an API put. But to keep it bulletproof, I'll only display ADD and DELETE for callers.
      await API.post("/smartflo/callers", currentCaller);
      setCallerModal(false);
      fetchCallers();
      toast.success("Caller saved");
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCaller = async (id) => {
    if (!window.confirm("Remove this caller?")) return;
    try {
      await API.delete(`/smartflo/callers/${id}`);
      fetchCallers();
      toast.success("Caller removed");
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="space-y-4 pb-20 font-sans relative">
      <DashboardLoader loading={loading} title="Loading Metadata" />
      <div className="flex justify-between items-center bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            System Settings
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Manage categories, product types, requirements, and locations.
          </p>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit shadow-inner border border-slate-200">
        {[
          { id: "categories", label: "Categories", icon: Grid },
          { id: "types", label: "Types", icon: List },
          { id: "documents", label: "Documents", icon: FileCheck },
          { id: "locations", label: "Locations", icon: MapPin },
          { id: "callers", label: "Smartflo Callers", icon: PhoneCall },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 ${activeTab === tab.id
              ? "bg-slate-900 text-white shadow-lg"
              : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-700"
              }`}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">
            {activeTab === "categories" ? "All Categories" :
              activeTab === "types" ? "All Product Types" :
                activeTab === "documents" ? "Document Requirements" :
                  activeTab === "locations" ? "Location Registry" :
                    "Smartflo Dispatchers"}
          </h2>
          <button
            onClick={() => {
              if (activeTab === "categories") openCategoryModal();
              if (activeTab === "types") openTypeModal();
              if (activeTab === "documents") openDocTypeModal();
              if (activeTab === "locations") openLocationModal();
              if (activeTab === "callers") openCallerModal();
            }}
            className="bg-slate-900 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md shadow-slate-200"
          >
            <Plus size={14} /> New Entry
          </button>
        </div>

        {activeTab === "categories" && (
          <DataTable
            columns={[
              {
                header: "Name",
                key: "name",
                sortable: true,
                render: (row) => (
                  <div className="flex items-center gap-3 font-bold text-slate-900 uppercase">
                    <div className="w-8 h-8 bg-slate-100 rounded border border-slate-200 overflow-hidden flex-shrink-0 p-1">
                      {row.icon ? (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL_IMG}${row.icon} `}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Layers size={14} className="text-slate-400 m-auto" />
                      )}
                    </div>
                    {row.name}
                  </div>
                ),
              },
              {
                header: "Description",
                key: "description",
                render: (row) => (
                  <span className="text-slate-500 text-[11px] line-clamp-1 italic">
                    {row.description || "N/A"}
                  </span>
                ),
              },
              {
                header: "Status",
                key: "isActive",
                sortable: true,
                render: (row) => (
                  <span
                    className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${row.isActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                  >
                    {row.isActive ? "Online" : "Terminated"}
                  </span>
                ),
              },
              {
                header: "Actions",
                key: "actions",
                className: "text-left",
                render: (row) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openCategoryModal(row)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit Category"
                    >
                      <Edit size={16} />
                    </button>
                    {isSuperAdmin && (
                      <button
                        onClick={() => handleDeleteCategory(row.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Category"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ),
              },
            ]}
            data={categories}
            fileName="Meta_Category_Registry"
            pageSize={10}
          />
        )}

        {activeTab === "types" && (
          <DataTable
            columns={[
              {
                header: "Classification",
                key: "name",
                sortable: true,
                render: (row) => (
                  <div>
                    <div className="font-bold text-slate-900 uppercase">{row.name}</div>
                    <div className="text-[9px] text-indigo-500 font-black uppercase tracking-widest mt-0.5">
                      Origin: {categories.find((c) => c.id === row.serviceGroupId)?.name || "N/A"}
                    </div>
                  </div>
                ),
              },
              {
                header: "Functionality",
                key: "description",
                render: (row) => (
                  <span className="text-slate-500 text-[11px] line-clamp-1">
                    {row.description || "Core Implementation"}
                  </span>
                ),
              },
              {
                header: "Actions",
                key: "actions",
                className: "text-left",
                render: (row) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openTypeModal(row)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit Type"
                    >
                      <Edit size={16} />
                    </button>
                    {isSuperAdmin && (
                      <button
                        onClick={() => handleDeleteType(row.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Type"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ),
              },
            ]}
            data={types}
            fileName="Meta_Type_Registry"
            pageSize={10}
          />
        )}

        {activeTab === "documents" && (
          <DataTable
            columns={[
              {
                header: "Document Type",
                key: "name",
                sortable: true,
                render: (row) => (
                  <div>
                    <div className="font-bold text-slate-900 uppercase">{row.name}</div>
                    <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                      Category: {row.category || "General"}
                    </div>
                  </div>
                ),
              },
              {
                header: "Status",
                key: "isRequired",
                sortable: true,
                render: (row) => (
                  <div className="flex gap-2">
                    {row.isRequired && (
                      <span className="bg-amber-50 text-amber-700 border border-amber-100 text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-widest">
                        Required
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border tracking-widest ${row.isActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                    >
                      {row.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                ),
              },
              {
                header: "Actions",
                key: "actions",
                className: "text-left",
                render: (row) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openDocTypeModal(row)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit Document Type"
                    >
                      <Edit size={16} />
                    </button>
                    {isSuperAdmin && (
                      <button
                        onClick={() => handleDeleteDocType(row.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Document Type"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ),
              },
            ]}
            data={docTypes}
            fileName="Meta_Document_Registry"
            pageSize={10}
          />
        )}

        {activeTab === "locations" && (
          <div className="space-y-4">
            <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Filter by State</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={selectedFilters.state}
                    onChange={(e) => handleStateFilterChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-10 py-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-slate-900 transition-all cursor-pointer appearance-none"
                  >
                    <option value="">All States</option>
                    {allStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select District</label>
                <div className="relative">
                  <List size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    disabled={!selectedFilters.state}
                    value={selectedFilters.district}
                    onChange={(e) => handleDistrictFilterChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-10 py-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-slate-900 transition-all cursor-pointer appearance-none disabled:bg-slate-100 disabled:text-slate-200"
                  >
                    <option value="">All Districts</option>
                    {allDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Search</label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    placeholder="PIN, District, Service Areas..."
                    value={locSearch}
                    onChange={(e) => {
                      setLocSearch(e.target.value);
                      fetchLocations(1, e.target.value, selectedFilters.state, selectedFilters.district);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedFilters({ state: "", district: "" });
                    setLocSearch("");
                    fetchLocations(1, "", "", "");
                  }}
                  className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCcw size={14} /> Reset
                </button>
                <button
                  onClick={() => openLocationModal()}
                  className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Add New
                </button>
              </div>
            </div>

            <DataTable
              columns={[
                { header: "State", key: "state", sortable: true, className: "font-bold uppercase text-slate-800" },
                { header: "District", key: "district", sortable: true, className: "font-bold text-slate-500 uppercase" },
                { header: "Post Office", key: "postOffice", sortable: true, className: "italic text-slate-500" },
                { header: "PIN Code", key: "pincode", sortable: true, className: "font-mono font-black text-slate-900 text-center bg-slate-50/50" },
                {
                  header: "Actions",
                  key: "actions",
                  className: "text-right",
                  render: (row) => (
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => openLocationModal(row)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit Entry"><Edit size={14} /></button>
                      {isSuperAdmin && (
                        <button onClick={() => handleDeleteLocation(row.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Remove Entry"><Trash2 size={14} /></button>
                      )}
                    </div>
                  )
                }
              ]}
              data={locations}
              fileName="System_Location_Registry"
              pageSize={20}
              title={`${locTotal} Registered Points`}
            />
          </div>
        )}

        {activeTab === "callers" && (
          <DataTable
            columns={[
              {
                header: "Company Name",
                key: "company_name",
                sortable: true,
                className: "font-bold text-slate-900 uppercase"
              },
              {
                header: "Caller Number",
                key: "caller_number",
                className: "font-mono font-bold text-slate-700 bg-slate-50/50"
              },
              {
                header: "Actions",
                key: "actions",
                className: "text-right",
                render: (row) => (
                  <div className="flex gap-2 justify-end">
                    {isSuperAdmin && (
                      <button
                        onClick={() => handleDeleteCaller(row.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Caller"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ),
              },
            ]}
            data={callers}
            fileName="System_Callers_Registry"
            pageSize={10}
          />
        )}
      </div>

      {/* --- MODALS --- */}

      {/* CATEGORY MODAL */}
      {categoryModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {currentCategory.id ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={() => setCategoryModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Category Name
                </label>
                <input
                  required
                  value={currentCategory.name}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Icon/Image
                </label>
                <div className="mt-1 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-slate-50 border border-dashed border-slate-300 rounded flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Upload className="text-slate-300" size={24} />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold uppercase border border-slate-200 px-3 py-2 rounded hover:bg-slate-50"
                  >
                    Select Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Description
                </label>
                <textarea
                  value={currentCategory.description || ""}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  rows="2"
                ></textarea>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCategory.isActive}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      isActive: e.target.checked,
                    })
                  }
                />
                <span className="text-xs font-bold text-slate-600 uppercase">
                  Active
                </span>
              </label>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCategoryModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-500 font-bold text-xs uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-slate-900 text-white py-2 rounded font-bold text-xs uppercase hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                  {submitting ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TYPE MODAL */}
      {typeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {currentType.id ? "Edit Type" : "Add Type"}
              </h3>
              <button
                onClick={() => setTypeModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveType} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Primary Category
                </label>
                <select
                  required
                  value={currentType.serviceGroupId}
                  onChange={(e) =>
                    setCurrentType({
                      ...currentType,
                      serviceGroupId: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500 bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Type Name
                </label>
                <input
                  required
                  value={currentType.name}
                  onChange={(e) =>
                    setCurrentType({ ...currentType, name: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setTypeModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-500 font-bold text-xs uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-slate-900 text-white py-2 rounded font-bold text-xs uppercase hover:bg-slate-800 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                  {submitting ? "Saving..." : "Save Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DOCUMENT TYPE MODAL */}
      {docTypeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                Document Type
              </h3>
              <button
                onClick={() => setDocTypeModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveDocType} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Category
                </label>
                <input
                  list="docCategories"
                  value={currentDocType.category || ""}
                  onChange={(e) =>
                    setCurrentDocType({
                      ...currentDocType,
                      category: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  placeholder="e.g. Identity Proof, Address Proof"
                />
                <datalist id="docCategories">
                  <option value="Identity Proof" />
                  <option value="Address Proof" />
                  <option value="Business Registration" />
                  <option value="Tax Documents" />
                  <option value="Financial Proof" />
                  <option value="Mandatory Forms" />
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Document Name
                </label>
                <input
                  required
                  value={currentDocType.name}
                  onChange={(e) =>
                    setCurrentDocType({
                      ...currentDocType,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentDocType.isRequired}
                    onChange={(e) =>
                      setCurrentDocType({
                        ...currentDocType,
                        isRequired: e.target.checked,
                      })
                    }
                  />
                  <span className="text-xs font-bold text-slate-600 uppercase">
                    Required
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentDocType.isActive}
                    onChange={(e) =>
                      setCurrentDocType({
                        ...currentDocType,
                        isActive: e.target.checked,
                      })
                    }
                  />
                  <span className="text-xs font-bold text-slate-600 uppercase">
                    Active
                  </span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setDocTypeModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-500 font-bold text-xs uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-slate-900 text-white py-2 rounded font-bold text-xs uppercase hover:bg-slate-800 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LOCATION MODAL */}
      {locationModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                {currentLocation.id ? "Modify Location" : "New Location Entry"}
              </h3>
              <button onClick={() => setLocationModal(false)} className="text-slate-400 hover:bg-slate-50 p-1 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveLocation} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">State</label>
                  <input
                    required
                    value={currentLocation.state}
                    onChange={(e) => setCurrentLocation({ ...currentLocation, state: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">District</label>
                  <input
                    value={currentLocation.district}
                    onChange={(e) => setCurrentLocation({ ...currentLocation, district: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-slate-900"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Post Office</label>
                <input
                  value={currentLocation.postOffice}
                  onChange={(e) => setCurrentLocation({ ...currentLocation, postOffice: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-slate-900"
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PIN Code</label>
                <input
                  maxLength="6"
                  value={currentLocation.pincode}
                  onChange={(e) => setCurrentLocation({ ...currentLocation, pincode: e.target.value.replace(/\D/g, "") })}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-slate-900"
                  placeholder="Optional"
                />
              </div>

              <div className="pt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setLocationModal(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                  {submitting ? "Saving..." : "Save Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CALLER MODAL */}
      {callerModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                Register New Caller
              </h3>
              <button onClick={() => setCallerModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveCaller} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name</label>
                <input
                  required
                  value={currentCaller.company_name}
                  onChange={(e) => setCurrentCaller({ ...currentCaller, company_name: e.target.value })}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Caller Number</label>
                <input
                  required
                  value={currentCaller.caller_number}
                  onChange={(e) => setCurrentCaller({ ...currentCaller, caller_number: e.target.value })}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  placeholder="e.g. +1234567890"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCallerModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-500 font-bold text-xs uppercase rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-slate-900 text-white py-2 rounded font-bold text-xs uppercase hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                  {submitting ? "Saving..." : "Save Caller"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MetadataManagement;
