import { useState, useEffect, useMemo, useRef } from "react";
import { 
  MapPin, 
  Search, 
  Calendar, 
  Download, 
  RefreshCw,
  User,
  Clock,
  Navigation,
  Activity,
  History,
  X,
  ChevronRight,
  Eye,
  Filter,
  Monitor
} from "lucide-react";
import API from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { Helmet } from "react-helmet-async";
import moment from "moment";
import * as XLSX from "xlsx";

const LocationManagement = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('live'); // live, history
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [offlineExpanded, setOfflineExpanded] = useState(false);

  // Data states
  const [liveLocations, setLiveLocations] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  
  const googleMapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef(new Map());
  const infoWindowRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    fetchLiveLocations();
    fetchStaffList();
    loadGoogleMaps();
  }, []);

  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }
    const script = document.createElement('script');
    const key = import.meta.env.VITE_GOOGLE_KEY;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`; 
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (mapLoaded && googleMapRef.current && !mapInstance.current) {
        initMap();
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (mapInstance.current) {
        syncMarkers();
    }
  }, [liveLocations, activeTab, historyData]);

  const initMap = () => {
    const center = { lat: 23.350367, lng: 85.317802 }; // Office Location
    mapInstance.current = new window.google.maps.Map(googleMapRef.current, {
        center: center,
        zoom: 14, // Increased zoom for better initial detail
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: window.google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: true,
        fullscreenControl: true,
        // Removed styles that were hiding POI/Streets to show full details
        styles: [] 
    });
    infoWindowRef.current = new window.google.maps.InfoWindow({ maxWidth: 280 });
    geocoderRef.current = new window.google.maps.Geocoder();
  };

  const createMarkerIcon = (loc, color, callback) => {
    const size = 52;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const drawBase = () => {
        ctx.clearRect(0, 0, size, size);
        // Draw Pin Shape
        ctx.beginPath();
        ctx.moveTo(size/2, size);
        ctx.lineTo(size/2 - 12, size - 18);
        ctx.arc(size/2, size/2 - 6, size/2 - 6, Math.PI * 0.8, Math.PI * 0.2, false);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner Circle bg
        ctx.beginPath();
        ctx.arc(size / 2, size / 2 - 6, (size / 2) - 8, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
    };

    drawBase();

    const photo = getImageUrl(loc.User?.profile_photo || loc.profile_photo);
    if (photo) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = photo;
        img.onload = () => {
            drawBase();
            ctx.save();
            ctx.beginPath();
            ctx.arc(size / 2, size / 2 - 6, (size / 2) - 8, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, size/2 - (size/2 - 8), size/2 - 6 - (size/2 - 8), (size/2 - 8)*2, (size/2 - 8)*2);
            ctx.restore();
            if (callback) callback(canvas.toDataURL());
        };
    }

    return canvas.toDataURL();
  };

  const syncMarkers = () => {
    const currentMarkers = markersRef.current;
    const data = activeTab === 'live' ? (filteredLive.online.concat(filteredLive.offline)) : historyData;
    const bounds = new window.google.maps.LatLngBounds();

    // Clear old markers
    currentMarkers.forEach((marker) => marker.setMap(null));
    currentMarkers.clear();

    data.forEach((loc, idx) => {
      if (!loc.latitude || !loc.longitude) return;
      const pos = { lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude) };
      const status = getStatus(loc);
      const color = status === 'online' ? '#10b981' : (status === 'away' ? '#f59e0b' : '#ef4444');

      const marker = new window.google.maps.Marker({
        position: pos,
        map: mapInstance.current,
        optimized: false,
        icon: {
          url: createMarkerIcon(loc, color, (newUrl) => {
              marker.setIcon({
                  url: newUrl,
                  size: new window.google.maps.Size(52, 52),
                  anchor: new window.google.maps.Point(26, 52),
                  scaledSize: new window.google.maps.Size(52, 52)
              });
          }),
          size: new window.google.maps.Size(52, 52),
          anchor: new window.google.maps.Point(26, 52),
          scaledSize: new window.google.maps.Size(52, 52)
        }
      });

      marker.addListener("click", () => showInfoWindow(marker, loc));
      const mid = activeTab === 'live' ? (loc.employee_id || loc.id) : idx;
      currentMarkers.set(mid, marker);
      bounds.extend(pos);
    });
  };

  const showInfoWindow = (marker, loc) => {
    const status = getStatus(loc);
    const colorClass = status === 'online' ? 'text-emerald-500' : (status === 'away' ? 'text-amber-500' : 'text-rose-500');
    const photo = getImageUrl(loc.User?.profile_photo || loc.profile_photo);

    const content = `
      <div style="padding: 12px; font-family: 'Outfit', sans-serif; min-width: 220px;">
        <div style="display: flex; gap: 12px; align-items: start; margin-bottom: 10px;">
          <div style="width: 48px; height: 48px; border-radius: 12px; overflow: hidden; background: #f1f5f9; border: 2px solid #e2e8f0; flex-shrink: 0;">
            ${photo ? `<img src="${photo}" style="width: 100%; height: 100%; object-fit: cover;" />` : `<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 900; color: #94a3b8;">${(loc.User?.full_name || loc.full_name || "S").charAt(0)}</div>`}
          </div>
          <div style="flex: 1; overflow: hidden;">
            <h4 style="margin: 0; font-size: 13px; font-weight: 900; color: #0f172a; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${loc.User?.full_name || loc.full_name}</h4>
            <p style="margin: 2px 0 0; font-size: 9px; font-weight: 800; color: #64748b; text-transform: uppercase;">${loc.User?.designation || loc.designation || "Staff"}</p>
            <div style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
              <div style="width: 6px; height: 6px; border-radius: 50%; background: ${status === 'online' ? '#10b981' : '#f43f5e'};"></div>
              <span style="font-size: 8px; font-weight: 900; text-transform: uppercase; color: #64748b;">${status}</span>
            </div>
          </div>
        </div>
        <div style="background: #f8fafc; padding: 8px; border-radius: 8px; border: 1px solid #f1f5f9;">
           <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="font-size: 8px; font-weight: 900; color: #94a3b8; text-transform: uppercase;">Time:</span>
              <span style="font-size: 9px; font-weight: 800; color: #1e293b;">${moment(loc.last_update || loc.recorded_at).format("hh:mm:ss A")}</span>
           </div>
           <div id="iw-address" style="display: flex; align-items: start; gap: 6px;">
              <span style="font-size: 8px; font-weight: 900; color: #94a3b8; text-transform: uppercase;">Loc:</span>
              <span style="font-size: 9px; font-weight: 700; color: #475569; line-height: 1.3;">Fetching address...</span>
           </div>
        </div>
      </div>
    `;

    infoWindowRef.current.setContent(content);
    infoWindowRef.current.open(mapInstance.current, marker);

    // Get Address
    if (geocoderRef.current) {
        geocoderRef.current.geocode({ location: { lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude) } }, (results, status) => {
            const addrNode = document.querySelector('#iw-address span:last-child');
            if (addrNode && status === "OK" && results[0]) {
                addrNode.innerText = results[0].formatted_address;
            }
        });
    }
  };

  const getStatus = (loc) => {
    if (loc.gps_status === 'off') return 'offline';
    const lastUpdate = moment(loc.last_update || loc.recorded_at);
    const now = moment();
    const diff = now.diff(lastUpdate, 'minutes');
    if (diff <= 15) return 'online';
    if (diff <= 60) return 'away';
    return 'offline';
  };

  const fetchLiveLocations = async () => {
    setLoading(true);
    try {
      const res = await API.get("/erp/location-tracking/live");
      setLiveLocations(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      if (e.response?.status !== 401) showToast("Error fetching live feed", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffList = async () => {
    try {
      const res = await API.get("/erp/attendance/daily");
      setStaffList(Array.isArray(res.data) ? res.data : []);
    } catch (e) {}
  };

  const fetchHistory = async (empId) => {
    setLoading(true);
    try {
      const res = await API.get(`/erp/location-tracking/history/${empId}/date/${selectedDate}`);
      setHistoryData(Array.isArray(res.data) ? res.data : []);
      setActiveTab('history');
    } catch (e) {
      showToast("Error fetching history", "error");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${path}`;
  };

  const filteredLive = useMemo(() => {
    // 1. Get IDs of employees currently transmitting location
    const transmittingIds = new Set(liveLocations.map(loc => loc.User?.id || loc.employee_id));
    
    // 2. Filter search results from both lists
    const matchedLive = liveLocations.filter(loc => 
      (loc.User?.full_name || loc.full_name)?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchedTotalStaff = staffList.filter(s => 
      s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !transmittingIds.has(s.id)
    );

    return {
      online: matchedLive.filter(l => getStatus(l) === 'online'),
      offline: [
        ...matchedLive.filter(l => getStatus(l) !== 'online'),
        ...matchedTotalStaff
      ]
    };
  }, [liveLocations, staffList, searchTerm]);

  const filteredHistory = useMemo(() => {
    return staffList.filter(s => s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [staffList, searchTerm]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 font-sans overflow-hidden">
      <Helmet>
        <title>Live Employee Tracker | SBGM ERP</title>
      </Helmet>

      {/* Professional Header Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0 shadow-sm relative z-20">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
               <Navigation size={20} className="animate-pulse" />
            </div>
            <div>
               <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase leading-none">Live Tracker</h1>
               <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex h-2 w-2 rounded-full bg-emerald-500 relative">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{filteredLive.online.length + filteredLive.offline.length} Staff Total</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button onClick={() => setActiveTab('live')} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'live' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Live Feed</button>
               <button onClick={() => setActiveTab('history')} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'history' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>History</button>
            </div>
            <button onClick={fetchLiveLocations} className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all text-slate-500">
               <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
         </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
         {/* Map Center Area */}
         <div className="flex-1 relative bg-slate-200 z-10">
            <div ref={googleMapRef} className="w-full h-full" />
            
            {/* Legend (TOP CENTER) */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
               {[
                  { label: 'Online', color: 'bg-emerald-500' },
                  { label: 'Away', color: 'bg-amber-500' },
                  { label: 'Offline', color: 'bg-rose-500' }
               ].map((st) => (
                  <div key={st.label} className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-xl flex items-center gap-2.5 transition-transform hover:scale-105">
                     <div className={`w-2.5 h-2.5 rounded-full ${st.color} shadow-sm shadow-black/10`}></div>
                     <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">{st.label}</span>
                  </div>
               ))}
            </div>

            {/* Tracking Zone Overlay (BOTTOM LEFT) */}
            <div className="absolute bottom-6 left-6 z-20">
               <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl max-w-[200px]">
                  <div className="flex items-center gap-3">
                     <Monitor size={18} className="text-emerald-400" />
                     <h4 className="text-[10px] font-black text-white uppercase tracking-wider">Control Center</h4>
                  </div>
                  <div className="mt-3 space-y-2">
                     <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
                        <span>RADIUS:</span>
                        <span className="text-emerald-400">100M</span>
                     </div>
                     <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[70%]" />
                     </div>
                     <p className="text-[8px] font-bold text-slate-500 uppercase leading-none">GPS LOCK: EXCELLENT</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Compact Side Sidebar (64px width when collapsed, 320px when list) */}
         <div className="w-[340px] bg-white border-l border-slate-200 flex flex-col shrink-0 z-20">
            <div className="p-5 border-b border-slate-100">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search staff members..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 outline-none transition-all uppercase tracking-tight"
                  />
               </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-6">
               {(activeTab === 'live' ? (
                  <>
                    {/* Online Group */}
                    <div className="space-y-3">
                       <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-1 flex items-center gap-2">
                          <Activity size={12} /> Live Now ({filteredLive.online.length})
                       </h3>
                       {filteredLive.online.map((emp, i) => (
                          <StaffCard key={'on'+i} emp={emp} isOnline={true} isSelected={selectedEmployee?.id === emp.id} onClick={() => {
                             setSelectedEmployee(emp);
                             if (mapInstance.current) {
                                mapInstance.current.setZoom(16);
                                mapInstance.current.panTo({ lat: parseFloat(emp.latitude), lng: parseFloat(emp.longitude) });
                             }
                          }} getStatus={getStatus} getImageUrl={getImageUrl} />
                       ))}
                       {filteredLive.online.length === 0 && <p className="text-[9px] font-bold text-slate-300 uppercase px-1">No one online</p>}
                    </div>

                    {/* Away/Offline Group (Collapsible) */}
                    <div className="space-y-3 pt-4 border-t border-slate-50">
                       <button 
                          onClick={() => setOfflineExpanded(!offlineExpanded)}
                          className="w-full flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 py-2 hover:bg-slate-50 rounded-lg transition-all"
                       >
                          <div className="flex items-center gap-2">
                             <Clock size={12} /> Recent / Inactive ({filteredLive.offline.length})
                          </div>
                          {offlineExpanded ? <ChevronRight size={14} className="rotate-90" /> : <ChevronRight size={14} />}
                       </button>
                       
                       {offlineExpanded && (
                          <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                             {filteredLive.offline.map((emp, i) => (
                                <StaffCard key={'off'+i} emp={emp} isOnline={false} isSelected={selectedEmployee?.id === emp.id} onClick={() => {
                                   setSelectedEmployee(emp);
                                   if (mapInstance.current && emp.latitude) {
                                      mapInstance.current.setZoom(15);
                                      mapInstance.current.panTo({ lat: parseFloat(emp.latitude), lng: parseFloat(emp.longitude) });
                                   }
                                }} getStatus={getStatus} getImageUrl={getImageUrl} />
                             ))}
                          </div>
                       )}
                    </div>
                  </>
               ) : (
                  <div className="space-y-3">
                     <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-1">Movement Logs</h3>
                     <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex items-center gap-3 mb-4">
                        <Calendar size={14} className="text-blue-600" />
                        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="bg-transparent border-none p-0 text-[10px] font-black uppercase text-blue-800" />
                     </div>
                     {filteredHistory.map((emp, i) => (
                        <StaffCard key={'hist'+i} emp={emp} isHistory={true} isSelected={selectedEmployee?.id === emp.id} onClick={() => {
                           setSelectedEmployee(emp);
                           fetchHistory(emp.id);
                        }} getStatus={getStatus} getImageUrl={getImageUrl} />
                     ))}
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

// Compact Staff Card Component
const StaffCard = ({ emp, isOnline, isSelected, onClick, getStatus, getImageUrl, isHistory }) => {
   const status = getStatus(emp);
   const photo = getImageUrl(emp.User?.profile_photo || emp.profile_photo);
   const name = emp.User?.full_name || emp.full_name;

   // Color logic based on Online vs Offline
   let cardBg = "bg-[#f0f9ff] border-[#e0f2fe] hover:border-blue-200"; // Default Sea Blue
   let selectedBg = "bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-500/20";
   
   if (isOnline && !isHistory) {
      cardBg = "bg-emerald-50 border-emerald-100 hover:border-emerald-200";
   }

   return (
      <button 
         onClick={onClick}
         className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all group border-2 ${isSelected ? selectedBg : cardBg}`}
      >
         <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center relative">
            {photo ? (
               <img src={photo} className="w-full h-full object-cover" />
            ) : (
               <div className="text-[12px] font-black text-slate-400 capitalize">{name?.charAt(0)}</div>
            )}
         </div>
         <div className="text-left flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
               <p className={`text-[10px] font-black uppercase truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>{name}</p>
               {!isHistory && <span className={`text-[7px] font-black uppercase tracking-widest ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>{moment(emp.last_update || emp.recorded_at).format("hh:mm A")}</span>}
            </div>
            <p className={`text-[8px] font-bold uppercase truncate mt-0.5 tracking-wider ${isSelected ? 'text-emerald-500 bg-white inline-block px-1 rounded-sm' : 'text-slate-400'}`}>
               {emp.User?.designation || emp.designation || "Staff Member"}
            </p>
         </div>
         <ChevronRight size={14} className={`${isSelected ? 'text-white translate-x-1' : 'text-slate-300 group-hover:text-emerald-400'} transition-all`} />
      </button>
   );
};

export default LocationManagement;
