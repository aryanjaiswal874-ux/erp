import { useState, useEffect } from "react";
import { X, Upload, User, Loader2, Save, Phone, Mail, MapPin, Briefcase, Info, Share2, UserPlus, Zap, MessageSquare, Activity } from "lucide-react";
import { createLead, updateLead } from "../../../api/leadService";
import { useToast } from "../../../context/ToastContext";
import API from "../../../api/axios";

const INTERESTED_FOR_OPTIONS = [
  "Braces",
  "Aligners / Invisalign",
  "Root Canal Treatment",
  "Teeth Whitening",
  "Dental Implants",
  "Tooth Extraction",
  "Cavity Filling",
  "Crowns and Bridges",
  "Veneers",
  "Scaling and Cleaning",
  "Kids Dentistry",
  "Routine Checkup",
  "Other"
];

const AddLeadModal = ({ onClose, onSuccess, users = [], currentUser = null, lead = null }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    city: "",
    state: "",
    occupation: "",
    interested_for: "",
    status: "New",
    whatsapp: "",
    additionalInfo: "",
    assignedTo: (currentUser?.role === 'employee') ? currentUser.id : "",
    source: "Meta Ad",
    sameAsContact: true,
  });
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.state) {
      fetchCities(formData.state);
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const fetchStates = async () => {
    try {
      const { data } = await API.get("/locations/states");
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateName) => {
    try {
      const { data } = await API.get(`/locations/districts/${stateName}`);
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || "",
        contact: lead.contact || "",
        email: lead.email || "",
        city: lead.city || "",
        state: lead.state || "",
        occupation: lead.occupation || "",
        interested_for: lead.interested_for || "",
        status: lead.status || "New",
        whatsapp: lead.whatsapp || "",
        additionalInfo: lead.additionalInfo || "",
        assignedTo: lead.assignedTo || "",
        source: lead.source || "Meta Ad",
        sameAsContact: lead.whatsapp === lead.contact && !!lead.contact,
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    if (name === "contact" || name === "whatsapp") {
      value = value.replace(/\D/g, "");
      if (value.startsWith("0")) value = "";
      if (value.length > 10) value = value.slice(0, 10);
    }

    setFormData((prev) => {
      const updates = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "contact" && prev.sameAsContact) updates.whatsapp = value;
      if (name === "sameAsContact")
        updates.whatsapp = checked ? prev.contact : "";
      return updates;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const mobileRegex = /^[1-9][0-9]{9}$/;
    if (!mobileRegex.test(formData.contact)) {
      alert("Contact number must be exactly 10 digits and cannot start with zero.");
      return;
    }

    if (formData.whatsapp && !mobileRegex.test(formData.whatsapp)) {
      alert("WhatsApp number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = { ...formData };
      delete dataToSend.sameAsContact;
      if (!dataToSend.assignedTo) delete dataToSend.assignedTo;

      if (lead) {
        await updateLead(lead.id, dataToSend);
      } else {
        await createLead(dataToSend);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
      <div className="bg-white rounded border border-gray-200 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">
            {lead ? "Update Lead Information" : "Add New Lead"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <User size={10} className="text-cyan-500" /> Full Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all font-bold"
                placeholder="Full Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Phone size={10} className="text-cyan-500" /> Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all font-bold"
                placeholder="Mobile Number"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare size={10} className="text-cyan-500" /> WhatsApp Number
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sameAsContact"
                    checked={formData.sameAsContact}
                    onChange={handleChange}
                    className="w-3 h-3 rounded text-cyan-600 focus:ring-cyan-500 border-gray-300"
                  />
                  <span className="text-[8px] font-bold text-cyan-600 italic">
                    Same as Contact
                  </span>
                </label>
              </div>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                disabled={formData.sameAsContact}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all disabled:opacity-50 font-bold"
                placeholder="WhatsApp Number"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Mail size={10} className="text-cyan-500" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all font-bold"
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest italic flex items-center gap-1.5">
                <MapPin size={10} className="text-cyan-500" /> Select or Type State
              </label>
              <div className="relative">
                <input
                  list="states-list"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all font-bold"
                  placeholder="Select State"
                />
                <datalist id="states-list">
                  {states.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest italic flex items-center gap-1.5">
                <MapPin size={10} className="text-cyan-500" /> Select or Type City
              </label>
              <div className="relative">
                <input
                  list="cities-list"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all font-bold"
                  placeholder="Select City"
                />
                <datalist id="cities-list">
                  {cities.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest italic flex items-center gap-1.5">
                <Briefcase size={10} className="text-cyan-500" /> Occupation
              </label>
              <div className="relative">
                <input
                  list="occupations-list"
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all font-bold"
                  placeholder="Select or Type Occupation"
                />
                <datalist id="occupations-list">
                  <option value="Private Job" />
                  <option value="Government Job" />
                  <option value="Business" />
                  <option value="Housewife" />
                  <option value="Student" />
                </datalist>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Zap size={10} className="text-cyan-500" /> Interested For
              </label>
              <div className="relative">
                <input
                  list="interested-for-list"
                  type="text"
                  name="interested_for"
                  value={formData.interested_for}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-cyan-400 transition-all font-bold"
                  placeholder="Select or Type Interest"
                />
                <datalist id="interested-for-list">
                  {INTERESTED_FOR_OPTIONS.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Activity size={10} className="text-cyan-500" /> Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={lead?.status === "Converted as Customer"}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold focus:bg-white focus:outline-none focus:border-cyan-400 transition-all disabled:opacity-80 disabled:cursor-not-allowed"
              >
                <option value="New">New</option>
                <option value="Interested">Interested</option>
                <option value="May be Interested">May be Interested</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Converted as Customer">Converted as Customer</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Share2 size={10} className="text-cyan-500" /> Lead Source
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold focus:bg-white focus:outline-none focus:border-cyan-400 transition-all"
              >
                <option value="Meta Ad">Meta Ad</option>
                <option value="Google Ad">Google Ad</option>
                <option value="Website">Website</option>
                <option value="Newspaper">Newspaper</option>
                <option value="Offline">Offline</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <UserPlus size={10} className="text-cyan-500" /> Assign to Agent
              </label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                disabled={currentUser?.role === 'employee' || lead?.status === "Converted as Customer"}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold focus:bg-white focus:outline-none focus:border-cyan-400 transition-all font-bold disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-80"
              >
                <option value="">Keep Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <Info size={10} className="text-cyan-500" /> Additional Info
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs focus:bg-white focus:outline-none focus:border-gray-400 transition-all resize-none font-medium"
              placeholder="Add more details about the lead..."
            ></textarea>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-1.5 bg-gray-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : lead ? (
                <Save size={12} />
              ) : null}
              {loading
                ? lead
                  ? "Updating..."
                  : "Adding..."
                : lead
                  ? "Update Lead"
                  : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
