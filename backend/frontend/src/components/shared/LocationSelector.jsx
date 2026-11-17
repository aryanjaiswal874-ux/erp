import { useState, useEffect } from "react";
import { MapPin, Search, Loader2, Check } from "lucide-react";
import API from "../../api/axios";

const LocationSelector = ({
  formData,
  setFormData,
  pincodeField = "pincode",
  stateField = "state",
  districtField = "district",
  cityField = "city", // Maps to postOffice/city
  showLabels = true,
}) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState({
    states: false,
    districts: false,
    pincode: false,
  });

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      setLoading((prev) => ({ ...prev, states: true }));
      try {
        const { data } = await API.get("/locations/states");
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoading((prev) => ({ ...prev, states: false }));
      }
    };
    fetchStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    if (!formData[stateField]) {
      setDistricts([]);
      return;
    }
    const fetchDistricts = async () => {
      setLoading((prev) => ({ ...prev, districts: true }));
      try {
        const { data } = await API.get(
          `/locations/districts/${formData[stateField]}`,
        );
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setLoading((prev) => ({ ...prev, districts: false }));
      }
    };
    fetchDistricts();
  }, [formData[stateField]]);

  // PIN Code auto-fill logic - Using useEffect for better reliability on subsequent changes
  useEffect(() => {
    const pin = formData[pincodeField];

    const fetchLocationByPin = async () => {
      if (pin && pin.length === 6) {
        setLoading((prev) => ({ ...prev, pincode: true }));
        try {
          const { data } = await API.get(`/locations/pincode/${pin}`);
          if (data && data.length > 0) {
            const first = data[0];
            setFormData((prev) => ({
              ...prev,
              [stateField]: first.state,
              [districtField]: first.district,
            }));
          }
        } catch (error) {
          console.error("Error fetching location by pincode:", error);
        } finally {
          setLoading((prev) => ({ ...prev, pincode: true })); // Intentionally re-setting to trigger any dependent UI if needed, but really just cleaning up
          setLoading((prev) => ({ ...prev, pincode: false }));
        }
      }
    };

    fetchLocationByPin();
  }, [formData[pincodeField]]);

  const handlePincodeChange = (e) => {
    const pin = e.target.value.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({ ...prev, [pincodeField]: pin }));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-3.5 mt-3.5">
      {/* State and District Group */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
            State
          </label>
          <select
            name={stateField}
            value={formData[stateField]}
            onChange={handleFieldChange}
            className="block w-full h-9 bg-slate-50 border border-slate-200 rounded text-[11px] font-medium px-3 focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:bg-white outline-none transition-all cursor-pointer shadow-sm"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
            City / District
          </label>
          <select
            name={districtField}
            value={formData[districtField]}
            onChange={handleFieldChange}
            className="block w-full h-9 bg-slate-50 border border-slate-200 rounded text-[11px] font-medium px-3 focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:bg-white outline-none transition-all cursor-pointer shadow-sm disabled:opacity-50"
            disabled={!formData[stateField] || loading.districts}
          >
            <option value="">Select City / District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pincode Field - Standard Compact */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
          Postal Code <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search
              className="text-slate-400 group-focus-within:text-orange-500 transition-colors"
              size={14}
            />
          </div>
          <input
            required
            type="text"
            name={pincodeField}
            value={formData[pincodeField]}
            onChange={handlePincodeChange}
            placeholder="6-Digit PIN Code"
            className="block w-full h-9 bg-slate-50 border border-slate-200 rounded text-[11px] font-bold pl-9 pr-10 focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:bg-white outline-none transition-all text-orange-600 shadow-sm"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {loading.pincode ? (
              <Loader2 className="animate-spin text-orange-500" size={14} />
            ) : (
              formData[pincodeField]?.length === 6 && (
                <Check className="text-emerald-500" size={14} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
