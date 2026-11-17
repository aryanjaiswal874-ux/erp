import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Camera,
  Briefcase,
  Building2,
  CheckCircle,
  X,
  Factory,
  FileText,
  MapPin,
  Calendar,
  User as UserIcon,
  GraduationCap,
} from "lucide-react";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import {
  indianStatesCities,
  designations,
} from "../../Data/indianStatesCities";

const UserProfile = () => {
  const { user, updateUserState } = useAuth();
  const toast = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    secondary_mobiles: [],
    secondary_emails: [],
    address: { line1: "" },
    state: "",
    city: "",
    pincode: "",
    designation: "",
    qualification: "",
    age: "",
    gender: "",
    bank_details: {
      account_holder: "",
      account_number: "",
      bank_name: "",
      ifsc: "",
    },
    profile_photo: "",
  });
  const [docs, setDocs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Company Management State
  const [companies, setCompanies] = useState([]);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({
    company_name: "",
    cin: "",
    tan: "",
    gstin: "",
    pan: "",
    address: { line1: "", city: "", state: "", pincode: "" },
    contact_person: "",
    contact_mobile: "",
    contact_email: "",
  });
  const [companyEditMode, setCompanyEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchCompanies();
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data } = await API.get("/documents");
      setDocs(data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const { data } = await API.get("/auth/companies");
      setCompanies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/auth/profile");
      setFormData({
        ...data,
        address: {
          line1:
            data.address?.line1 ||
            (typeof data.address === "string" ? data.address : ""),
        },
        state: data.state || data.address?.state || "",
        city: data.city || data.address?.city || "",
        pincode: data.pincode || data.address?.pincode || "",

        designation: data.designation || "",
        qualification: data.qualification || "",
        age: data.age || "",
        gender: data.gender || "",

        bank_details: data.bank_details || {
          account_holder: "",
          account_number: "",
          bank_name: "",
          ifsc: "",
        },
        secondary_mobiles: data.secondary_mobiles || [],
        secondary_emails: data.secondary_emails || [],
      });
      updateUserState(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile" || name.endsWith("_mobile")) {
      value = value.replace(/\D/g, "");
      if (value.startsWith("0")) value = "";
      if (value.length > 10) value = value.slice(0, 10);
    }

    if (name === "age") {
      value = value.replace(/\D/g, "");
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Mobile Validation
    const mobileRegex = /^[1-9][0-9]{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      toast.error(
        "Primary mobile number must be exactly 10 digits and cannot start with zero.",
      );
      return;
    }

    // Secondary Mobiles Validation
    for (const mob of formData.secondary_mobiles) {
      if (mob && !mobileRegex.test(mob)) {
        toast.error(`Secondary mobile "${mob}" is invalid. Must be 10 digits.`);
        return;
      }
    }

    try {
      const { profile_photo, ...dataToSave } = formData;

      const payload = {
        ...dataToSave,
        address: {
          line1: dataToSave.address.line1,
          city: dataToSave.city,
          state: dataToSave.state,
          pincode: dataToSave.pincode,
        },
      };

      const { data } = await API.put("/auth/profile", payload);
      updateUserState(data);
      setIsSaved(true);
      toast.success("Profile updated successfully");
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCompanyChange = (e) => {
    let { name, value } = e.target;

    if (name === "contact_mobile") {
      value = value.replace(/\D/g, "");
      if (value.startsWith("0")) value = "";
      if (value.length > 10) value = value.slice(0, 10);
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCurrentCompany((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setCurrentCompany((prev) => ({ ...prev, [name]: value }));
    }
  };

  const saveCompany = async (e) => {
    e.preventDefault();

    // Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      currentCompany.contact_email &&
      !emailRegex.test(currentCompany.contact_email)
    ) {
      toast.error("Please enter a valid company contact email.");
      return;
    }

    const mobileRegex = /^[1-9][0-9]{9}$/;
    if (
      currentCompany.contact_mobile &&
      !mobileRegex.test(currentCompany.contact_mobile)
    ) {
      toast.error(
        "Company contact mobile must be 10 digits and cannot start with zero.",
      );
      return;
    }

    try {
      if (companyEditMode) {
        await API.put(`/auth/companies/${currentCompany.id}`, currentCompany);
      } else {
        await API.post("/auth/companies", currentCompany);
      }
      setShowCompanyModal(false);
      fetchCompanies();
      resetCompanyForm();
      toast.success(companyEditMode ? "Company updated" : "Company registered");
    } catch (error) {
      toast.error("Error saving company");
    }
  };

  const deleteCompany = async (id) => {
    if (window.confirm("Remove this company?")) {
      try {
        await API.delete(`/auth/companies/${id}`);
        fetchCompanies();
        toast.success("Company removed");
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const setDefaultCompany = async (id) => {
    try {
      await API.put(`/auth/companies/${id}/default`);
      fetchCompanies();
      toast.success("Default company updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const resetCompanyForm = () => {
    setCurrentCompany({
      company_name: "",
      cin: "",
      tan: "",
      gstin: "",
      pan: "",
      address: { line1: "", city: "", state: "", pincode: "" },
      contact_person: "",
      contact_mobile: "",
      contact_email: "",
    });
  };

  if (loading)
    return (
      <div className="p-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
        Loading...
      </div>
    );

  const cities = formData.state ? indianStatesCities[formData.state] || [] : [];

  return (
    <div className="space-y-4 pb-20 font-sans">
      <div className="flex justify-between items-center bg-white p-6 border border-slate-200 rounded-md shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Settings
          </h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
            Profile & Business Configuration
          </p>
        </div>
        <button
          onClick={handleSave}
          className="bg-slate-900 text-white px-6 py-2 rounded font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      {isSaved && (
        <div className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
          <CheckCircle size={14} /> Profile Saved Successfully
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white border border-slate-200 p-6 rounded-md shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-6">
              <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                <UserIcon size={14} /> Personal Information
              </h2>
              {formData.createdAt && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  <Calendar size={12} className="text-slate-400" />
                  Joined:{" "}
                  {new Date(formData.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="relative w-32 h-32 rounded-lg bg-slate-100 border-4 border-white shadow-lg group cursor-pointer overflow-hidden">
                  {formData.profile_photo ? (
                    <img
                      src={
                        formData.profile_photo.startsWith("http") ||
                        formData.profile_photo.startsWith("data:")
                          ? formData.profile_photo
                          : `${import.meta.env.VITE_API_BASE_URL_IMG}${formData.profile_photo}`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-3xl uppercase bg-slate-50">
                      {formData.full_name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={24} />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      // Preview local
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData((prev) => ({
                          ...prev,
                          profile_photo: reader.result,
                        }));
                      };
                      reader.readAsDataURL(file);

                      // Upload real
                      const uploadData = new FormData();
                      uploadData.append("file", file);
                      try {
                        const { data } = await API.put(
                          "/auth/profile/photo",
                          uploadData,
                        );
                        updateUserState(data);
                        setFormData((prev) => ({
                          ...prev,
                          profile_photo: data.profile_photo,
                        }));
                        toast.success("Profile photo updated");
                      } catch (err) {
                        toast.error("Photo upload failed");
                      }
                    }}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Change Photo
                </span>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-800">
                    {formData.full_name}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {formData.designation || "No Designation"}
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                      Full Name
                    </label>
                    <input
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                      Age
                    </label>
                    <input
                      name="age"
                      type="text"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Years"
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                      Primary Mobile
                    </label>
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                      Email Address
                    </label>
                    <input
                      name="email"
                      disabled
                      value={formData.email}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Secondary Contacts
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          secondary_mobiles: [...p.secondary_mobiles, ""],
                        }))
                      }
                      className="text-[9px] font-bold uppercase text-indigo-600 border border-indigo-100 px-2 py-1 rounded bg-white hover:bg-indigo-50"
                    >
                      Add
                    </button>
                  </div>
                  {formData.secondary_mobiles?.map((mob, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        value={mob}
                        onChange={(e) => {
                          const newMobs = [...formData.secondary_mobiles];
                          newMobs[idx] = e.target.value;
                          setFormData({
                            ...formData,
                            secondary_mobiles: newMobs,
                          });
                        }}
                        className="flex-1 border border-slate-200 rounded text-xs px-2 py-1.5 focus:border-indigo-500 outline-none"
                      />
                      <button
                        onClick={() => {
                          const newMobs = formData.secondary_mobiles.filter(
                            (_, i) => i !== idx,
                          );
                          setFormData({
                            ...formData,
                            secondary_mobiles: newMobs,
                          });
                        }}
                        className="text-red-400 hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Professional & Address Info */}
          <div className="bg-white border border-slate-200 p-6 rounded-md shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-6">
              <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                <Briefcase size={14} /> Professional & Location
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                  Designation
                </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none bg-white"
                >
                  <option value="">Select Designation</option>
                  {designations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                  Qualification
                </label>
                <div className="relative">
                  <GraduationCap
                    size={16}
                    className="absolute left-3 top-2.5 text-slate-400"
                  />
                  <input
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech, MBA"
                    className="w-full border border-slate-200 rounded pl-9 pr-3 py-2 text-sm focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                    Address Line
                  </label>
                  <textarea
                    name="address.line1"
                    value={formData.address.line1}
                    onChange={handleChange}
                    rows="2"
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none resize-none"
                    placeholder="Street, House No, Landmark"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={(e) => {
                      handleChange(e);
                      setFormData((prev) => ({
                        ...prev,
                        state: e.target.value,
                        city: "",
                      }));
                    }}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none bg-white"
                  >
                    <option value="">Select State</option>
                    {Object.keys(indianStatesCities).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.state}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none bg-white disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                    Pincode
                  </label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white border border-slate-200 p-6 rounded-md shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-6">
              <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                <Building2 size={14} /> Bank Payout Details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                  Account Holder
                </label>
                <input
                  name="bank_details.account_holder"
                  value={formData.bank_details.account_holder}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                  Account Number
                </label>
                <input
                  name="bank_details.account_number"
                  value={formData.bank_details.account_number}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                  Bank Name
                </label>
                <input
                  name="bank_details.bank_name"
                  value={formData.bank_details.bank_name}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                  IFSC Code
                </label>
                <input
                  name="bank_details.ifsc"
                  value={formData.bank_details.ifsc}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-md shadow-sm h-fit">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-4">
            <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
              <FileText size={14} /> Verification Documents
            </h2>
            <label className="bg-slate-900 text-white text-[9px] px-3 py-1.5 rounded font-bold uppercase tracking-wider hover:bg-slate-800 cursor-pointer flex items-center gap-2">
              <Plus size={12} /> Upload
              <input
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const name = prompt(
                    "Enter document name (e.g. Aadhaar Card):",
                    file.name,
                  );
                  if (!name) return;

                  const uploadData = new FormData();
                  uploadData.append("file", file);
                  uploadData.append("name", name);
                  uploadData.append("type", "Identity");

                  try {
                    await API.post("/documents", uploadData);
                    fetchDocuments();
                    toast.success("Document uploaded successfully");
                  } catch (err) {
                    toast.error("Upload failed");
                  }
                }}
              />
            </label>
          </div>

          <div className="space-y-3">
            {docs.length > 0 ? (
              docs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <a
                      href={`${import.meta.env.VITE_API_BASE_URL_IMG}${doc.file_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white p-1 rounded border border-slate-200 text-slate-400 hover:text-indigo-600 transition-colors overflow-hidden w-10 h-10 flex items-center justify-center"
                    >
                      {doc.file_url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL_IMG}${doc.file_url}`}
                          className="w-full h-full object-cover"
                          alt="preview"
                        />
                      ) : (
                        <FileText size={16} />
                      )}
                    </a>
                    <div>
                      <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                        {doc.name}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      if (window.confirm("Delete this document?")) {
                        try {
                          await API.delete(`/documents/${doc.id}`);
                          fetchDocuments();
                          toast.success("Document deleted");
                        } catch (err) {
                          toast.error("Delete failed");
                        }
                      }
                    }}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 rounded border border-dashed border-slate-200">
                No documents deposited
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column / Bottom for Companies */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div>
              <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">
                Business Units
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setCompanyEditMode(false);
                resetCompanyForm();
                setShowCompanyModal(true);
              }}
              className="bg-white border border-slate-200 text-slate-700 p-1.5 rounded hover:bg-slate-50 transition-all font-bold"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="p-4 flex-1 space-y-3">
            {companies.length === 0 ? (
              <div className="text-center py-10 opacity-40">
                <Factory size={32} className="mx-auto text-slate-400 mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-wider">
                  No Records
                </p>
              </div>
            ) : (
              companies.map((company) => (
                <div
                  key={company.id}
                  className={`p-4 border rounded flex flex-col gap-3 transition-all ${company.is_default ? "border-slate-800 bg-slate-50" : "border-slate-200 bg-white"}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                        {company.company_name}
                        {company.is_default && (
                          <span className="text-[8px] font-bold uppercase text-slate-400">
                            Default
                          </span>
                        )}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">
                        {company.address?.city} • {company.address?.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1 pt-3 border-t border-slate-100">
                    {!company.is_default && (
                      <button
                        type="button"
                        onClick={() => setDefaultCompany(company.id)}
                        className="flex-1 text-[9px] font-bold uppercase text-slate-500 hover:text-slate-900 py-1.5 bg-slate-50 rounded"
                      >
                        Default
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setCompanyEditMode(true);
                        setCurrentCompany(company);
                        setShowCompanyModal(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-indigo-600"
                    >
                      <Briefcase size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCompany(company.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {showCompanyModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-md shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                {companyEditMode ? "Modify Entity" : "Register Entity"}
              </h3>
              <button
                onClick={() => setShowCompanyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={saveCompany}
              className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
            >
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                  Business Name
                </label>
                <input
                  required
                  name="company_name"
                  value={currentCompany.company_name}
                  onChange={handleCompanyChange}
                  className="w-full border border-slate-200 rounded px-4 py-2.5 text-xs font-bold focus:border-slate-900 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                    CIN
                  </label>
                  <input
                    name="cin"
                    value={currentCompany.cin}
                    onChange={handleCompanyChange}
                    className="w-full border border-slate-200 rounded px-4 py-2 text-xs font-bold focus:border-slate-900 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                    GSTIN
                  </label>
                  <input
                    name="gstin"
                    value={currentCompany.gstin}
                    onChange={handleCompanyChange}
                    className="w-full border border-slate-200 rounded px-4 py-2 text-xs font-bold focus:border-slate-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-50 pb-1">
                  Address
                </h4>
                <div className="space-y-4">
                  <input
                    name="address.line1"
                    value={currentCompany.address.line1}
                    onChange={handleCompanyChange}
                    className="w-full border border-slate-200 rounded px-4 py-2.5 text-xs font-bold focus:border-slate-900 outline-none transition-all"
                    placeholder="Street Address"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="address.city"
                      value={currentCompany.address.city}
                      onChange={handleCompanyChange}
                      className="w-full border border-slate-200 rounded px-4 py-2.5 text-xs font-bold focus:border-slate-900 outline-none transition-all"
                      placeholder="City"
                    />
                    <input
                      name="address.pincode"
                      value={currentCompany.address.pincode}
                      onChange={handleCompanyChange}
                      className="w-full border border-slate-200 rounded px-4 py-2.5 text-xs font-bold focus:border-slate-900 outline-none transition-all"
                      placeholder="Pincode"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-3.5 rounded text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-slate-800 transition-all"
              >
                Confirm Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
