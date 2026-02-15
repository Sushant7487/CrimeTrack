// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import axios from "axios";
// import { FaArrowLeft, FaTrash, FaPlus, FaBuilding, FaMapMarkerAlt, FaCrosshairs, FaSearch } from "react-icons/fa";
// import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox } from '@react-google-maps/api';
// import { BASE_URL } from "../../config";

// // ✅ Google Maps Libraries (Places needed for search)
// const libraries = ["places"];

// const ManageStations = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   // Form State
//   const [form, setForm] = useState({ 
//       name: "", 
//       city: "", 
//       district: "Chandrapur",
//       location: { lat: 19.9615, lng: 79.2961, address: "" } // Default: Chandrapur Center
//   });

//   // Map State
//   const [mapCenter, setMapCenter] = useState({ lat: 19.9615, lng: 79.2961 });
//   const searchBoxRef = useRef(null);
//   const mapRef = useRef(null);

//   // Load Google Maps Script
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // ⚠️ REPLACE THIS
//     libraries: libraries
//   });

//   const fetchData = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get(`${BASE_URL}/api/metadata/stations`, config);
//       setData(data);
//     } catch (err) { toast.error("Failed to load stations"); }
//   };

//   useEffect(() => { fetchData(); }, []);

//   // --- MAP FUNCTIONS ---

//   // 1. Handle Map Drag (Update "Target" Location)
//   const onMapDragEnd = () => {
//       if (mapRef.current) {
//           const center = mapRef.current.getCenter();
//           const lat = center.lat();
//           const lng = center.lng();
//           setForm(prev => ({ ...prev, location: { ...prev.location, lat, lng } }));
//       }
//   };

//   // 2. Get Current Device Location
//   const handleCurrentLocation = () => {
//       if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//               (position) => {
//                   const pos = {
//                       lat: position.coords.latitude,
//                       lng: position.coords.longitude,
//                   };
//                   setMapCenter(pos);
//                   setForm(prev => ({ ...prev, location: { ...prev.location, lat: pos.lat, lng: pos.lng } }));
//                   mapRef.current.panTo(pos);
//                   toast.success("Location Found!");
//               },
//               () => {
//                   toast.error("Error fetching location");
//               }
//           );
//       }
//   };

//   // 3. Handle Search Box Place Changed
//   const onPlacesChanged = () => {
//       const places = searchBoxRef.current.getPlaces();
//       if (places.length === 0) return;

//       const place = places[0];
//       const location = place.geometry.location;
      
//       const pos = { lat: location.lat(), lng: location.lng() };
//       setMapCenter(pos);
//       setForm(prev => ({ ...prev, location: { ...prev.location, lat: pos.lat, lng: pos.lng, address: place.formatted_address } }));
//       mapRef.current.panTo(pos);
//   };

//   // --- SUBMIT ---
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if(!form.name) return toast.error("Station Name is required");
//     if(!form.location.lat) return toast.error("Please select location on map");

//     setLoading(true);
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     try {
//         await axios.post(`${BASE_URL}/api/metadata/stations`, form, { headers: { Authorization: `Bearer ${userInfo.token}` } });
//         toast.success("Station Added Successfully!");
//         setForm({ name: "", city: "", district: "Chandrapur", location: { lat: 19.9615, lng: 79.2961 } });
//         fetchData();
//     } catch (err) { 
//         toast.error("Failed to add station"); 
//         console.error(err);
//     }
//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     if(!window.confirm("Delete this station?")) return;
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     try {
//         await axios.delete(`${BASE_URL}/api/metadata/stations/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
//         toast.success("Deleted");
//         fetchData();
//     } catch (err) { toast.error("Delete Failed"); }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans pt-24">
//       <Navbar />
//       <Toaster />
      
//       {/* Header */}
//       <div className="sticky top-[80px] z-30 bg-gray-900 border-b border-white/10 shadow-lg py-3 px-4 md:px-8">
//           <div className="max-w-4xl mx-auto flex items-center gap-3">
//             <button onClick={() => navigate("/admin/data")} className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all"><FaArrowLeft className="text-sm"/></button>
//             <h1 className="text-xl font-bold flex items-center gap-2"><FaBuilding className="text-cyan-400"/> Police Stations</h1>
//           </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-6 pb-20">
        
//         {/* ADD STATION FORM */}
//         <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5 mb-8 shadow-xl">
//             <h2 className="text-lg font-bold mb-4 text-cyan-100 flex items-center gap-2"><FaPlus className="text-xs"/> Add New Station</h2>
            
//             {/* Input Fields */}
//             <div className="flex flex-col md:flex-row gap-4 mb-4">
//                 <div className="flex-[2]">
//                     <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase">Station Name</label>
//                     <input 
//                         value={form.name} 
//                         onChange={(e) => setForm({...form, name: e.target.value})} 
//                         placeholder="e.g. Ramnagar Police Station" 
//                         className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-cyan-500 transition-all" 
//                     />
//                 </div>
//                 <div className="flex-1">
//                     <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase">City / Area</label>
//                     <input 
//                         value={form.city} 
//                         onChange={(e) => setForm({...form, city: e.target.value})} 
//                         placeholder="e.g. Chandrapur City" 
//                         className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-cyan-500 transition-all" 
//                     />
//                 </div>
//             </div>

//             {/* MAP SECTION */}
//             <div className="mb-6 relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
//                 {isLoaded ? (
//                     <div className="relative w-full h-[350px]">
//                         <GoogleMap
//                             mapContainerStyle={{ width: '100%', height: '100%' }}
//                             center={mapCenter}
//                             zoom={15}
//                             onLoad={map => mapRef.current = map}
//                             onDragEnd={onMapDragEnd}
//                             options={{ disableDefaultUI: true, zoomControl: true }}
//                         >
//                             {/* Search Box on Map */}
//                             <StandaloneSearchBox onLoad={ref => searchBoxRef.current = ref} onPlacesChanged={onPlacesChanged}>
//                                 <div className="absolute top-3 left-3 right-14 z-10">
//                                     <input
//                                         type="text"
//                                         placeholder="Search location on map..."
//                                         className="w-full bg-white text-black p-3 pl-10 rounded-lg shadow-lg outline-none text-sm font-medium"
//                                     />
//                                     <FaSearch className="absolute left-3 top-3.5 text-gray-500" />
//                                 </div>
//                             </StandaloneSearchBox>

//                             {/* "Target" Pin (Center Fixed) */}
//                             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none text-red-500 drop-shadow-2xl">
//                                 <FaMapMarkerAlt className="text-4xl mb-2 animate-bounce" />
//                             </div>
//                         </GoogleMap>

//                         {/* Location Controls */}
//                         <button 
//                             onClick={handleCurrentLocation}
//                             className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition-all"
//                             title="Use My Current Location"
//                         >
//                             <FaCrosshairs className="text-lg" />
//                         </button>

//                         <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded text-xs text-white border border-white/10">
//                             Lat: {form.location.lat.toFixed(6)}, Lng: {form.location.lng.toFixed(6)}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="h-[350px] bg-slate-900 flex items-center justify-center text-gray-500">
//                         Loading Map...
//                     </div>
//                 )}
//             </div>

//             <button onClick={handleAdd} disabled={loading} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all text-sm uppercase tracking-wider">
//                 <FaPlus /> Save Station & Location
//             </button>
//         </div>

//         {/* LIST */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {data.map((item) => (
//                 <div key={item._id} className="flex flex-col p-4 bg-slate-800/40 border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all group">
//                     <div className="flex justify-between items-start">
//                         <div>
//                             <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">{item.name}</h3>
//                             <p className="text-xs text-gray-400 mt-1">{item.city} • {item.district}</p>
//                         </div>
//                         <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all">
//                             <FaTrash className="text-sm" />
//                         </button>
//                     </div>
                    
//                     {/* View on Map Link */}
//                     {item.location && item.location.lat && (
//                         <a 
//                             href={`https://www.google.com/maps/search/?api=1&query=${item.location.lat},${item.location.lng}`} 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             className="mt-3 text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-2 py-1.5 rounded-lg flex items-center gap-2 w-fit hover:bg-cyan-500/20 transition-all"
//                         >
//                             <FaMapMarkerAlt /> View on Google Maps
//                         </a>
//                     )}
//                 </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageStations;






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import axios from "axios";
// import { FaArrowLeft, FaTrash, FaPlus, FaBuilding, FaMapMarkerAlt, FaCrosshairs, FaSearch, FaLocationArrow } from "react-icons/fa";
// import { MapContainer, TileLayer, useMap, useMapEvents, ZoomControl } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { BASE_URL } from "../../config";

// // ✅ Fix for Default Leaflet Marker Icons
// import L from 'leaflet';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// const ManageStations = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   // Default Location: Chandrapur Center
//   const defaultCenter = { lat: 19.9615, lng: 79.2961 };

//   const [form, setForm] = useState({ 
//       name: "", 
//       city: "", 
//       district: "Chandrapur",
//       location: { lat: defaultCenter.lat, lng: defaultCenter.lng, address: "" } 
//   });

//   const [searchQuery, setSearchQuery] = useState("");

//   // --- MAP COMPONENTS ---

//   // 1. Handle Dragging
//   const MapEvents = () => {
//     const map = useMap();
//     useMapEvents({
//       moveend: () => {
//         const center = map.getCenter();
//         setForm(prev => ({ ...prev, location: { ...prev.location, lat: center.lat, lng: center.lng } }));
//       },
//     });
//     return null;
//   };

//   // 2. Smoothly Fly to New Location
//   const RecenterAutomatically = ({ lat, lng }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });
//     }, [lat, lng, map]);
//     return null;
//   };

//   // --- API CALLS ---
//   const fetchData = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get(`${BASE_URL}/api/metadata/stations`, config);
//       setData(data);
//     } catch (err) { toast.error("Failed to load stations"); }
//   };

//   useEffect(() => { fetchData(); }, []);

//   // --- ACTIONS ---

//   const handleSearch = async (e) => {
//       if(e) e.preventDefault();
//       if(!searchQuery) return;

//       const toastId = toast.loading("Searching location...");
//       try {
//           const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
//           if(response.data && response.data.length > 0) {
//               const { lat, lon, display_name } = response.data[0];
//               const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
              
//               setForm(prev => ({ 
//                   ...prev, 
//                   location: { ...prev.location, lat: newPos.lat, lng: newPos.lng, address: display_name } 
//               }));
//               toast.success("Location Found!", { id: toastId });
//           } else {
//               toast.error("Location not found", { id: toastId });
//           }
//       } catch (error) {
//           toast.error("Search failed", { id: toastId });
//       }
//   };

//   const handleCurrentLocation = () => {
//       if (navigator.geolocation) {
//           const toastId = toast.loading("Getting GPS location...");
//           navigator.geolocation.getCurrentPosition(
//               (position) => {
//                   const pos = {
//                       lat: position.coords.latitude,
//                       lng: position.coords.longitude,
//                   };
//                   setForm(prev => ({ ...prev, location: { ...prev.location, lat: pos.lat, lng: pos.lng } }));
//                   toast.success("GPS Location Found!", { id: toastId });
//               },
//               () => {
//                   toast.error("Permission denied for location", { id: toastId });
//               }
//           );
//       } else {
//           toast.error("Geolocation not supported");
//       }
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if(!form.name) return toast.error("Station Name is required");

//     setLoading(true);
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     try {
//         await axios.post(`${BASE_URL}/api/metadata/stations`, form, { headers: { Authorization: `Bearer ${userInfo.token}` } });
//         toast.success("Station Added Successfully!");
//         setForm({ name: "", city: "", district: "Chandrapur", location: { lat: defaultCenter.lat, lng: defaultCenter.lng } });
//         setSearchQuery("");
//         fetchData();
//     } catch (err) { 
//         toast.error(err.response?.data?.message || "Failed to add station"); 
//     }
//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     if(!window.confirm("Delete this station?")) return;
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     try {
//         await axios.delete(`${BASE_URL}/api/metadata/stations/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
//         toast.success("Deleted");
//         fetchData();
//     } catch (err) { toast.error("Delete Failed"); }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans pt-24">
//       <Navbar />
//       <Toaster />
      
//       {/* Sticky Header */}
//       <div className="sticky top-[80px] z-30 bg-gray-900 border-b border-white/10 shadow-lg py-3 px-4 md:px-8">
//           <div className="max-w-5xl mx-auto flex items-center gap-4">
//             <button onClick={() => navigate("/admin/data")} className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all text-gray-300 hover:text-white">
//                 <FaArrowLeft />
//             </button>
//             <h1 className="text-xl font-bold flex items-center gap-2"><FaBuilding className="text-cyan-400"/> Manage Police Stations</h1>
//           </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-4 py-6 pb-20">
        
//         {/* === ADD STATION CARD === */}
//         <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl border border-white/5 shadow-2xl mb-8">
//             <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
//                 <FaPlus /> Add New Station
//             </h2>
            
//             {/* Input Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//                 <div>
//                     <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase mb-1 block">Station Name</label>
//                     <input 
//                         value={form.name} 
//                         onChange={(e) => setForm({...form, name: e.target.value})} 
//                         placeholder="e.g. Ramnagar Police Station" 
//                         className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-cyan-500 focus:bg-black/50 transition-all placeholder-gray-600" 
//                     />
//                 </div>
//                 <div>
//                     <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase mb-1 block">City / Area</label>
//                     <input 
//                         value={form.city} 
//                         onChange={(e) => setForm({...form, city: e.target.value})} 
//                         placeholder="e.g. Chandrapur City" 
//                         className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-cyan-500 focus:bg-black/50 transition-all placeholder-gray-600" 
//                     />
//                 </div>
//             </div>

//             {/* === MAP INTERFACE === */}
//             <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-inner bg-slate-900 mb-5 h-[450px] group">
                
//                 {/* 🔍 CENTERED FLOATING SEARCH BAR (Fixes Overlap) */}
//                 <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-[90%] md:w-96 bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl flex items-center p-1.5 transition-all hover:border-cyan-500/50">
//                     <FaSearch className="text-cyan-400 ml-4 shrink-0" />
//                     <input 
//                         className="w-full bg-transparent border-none text-white text-sm p-2 focus:ring-0 outline-none placeholder-gray-400 font-medium ml-1"
//                         placeholder="Search Location..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
//                     />
//                     <button 
//                         onClick={handleSearch}
//                         className="bg-cyan-600 hover:bg-cyan-500 text-white p-2.5 rounded-full shadow-lg transition-all active:scale-95"
//                     >
//                         <FaLocationArrow className="text-xs" />
//                     </button>
//                 </div>

//                 {/* 🗺️ Map Container */}
//                 <MapContainer 
//                     center={[defaultCenter.lat, defaultCenter.lng]} 
//                     zoom={15} 
//                     style={{ height: '100%', width: '100%' }}
//                     zoomControl={false} // ❌ DISABLE DEFAULT ZOOM (We add Custom below)
//                 >
//                     {/* ✅ STANDARD OPENSTREETMAP TILES (Visible & Clear) */}
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='© OpenStreetMap contributors'
//                     />
                    
//                     <RecenterAutomatically lat={form.location.lat} lng={form.location.lng} />
//                     <MapEvents />

//                     {/* ✅ ZOOM CONTROL - Fixed Bottom Right */}
//                     <ZoomControl position="bottomright" />
//                 </MapContainer>

//                 {/* 🎯 Animated Target Pin (Center) */}
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none flex flex-col items-center justify-center">
//                     <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse">
//                         <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></div>
//                     </div>
//                     {/* Crosshairs */}
//                     <div className="h-6 w-[1px] bg-red-500 absolute top-0 opacity-60"></div>
//                     <div className="h-6 w-[1px] bg-red-500 absolute bottom-0 opacity-60"></div>
//                     <div className="w-6 h-[1px] bg-red-500 absolute left-0 opacity-60"></div>
//                     <div className="w-6 h-[1px] bg-red-500 absolute right-0 opacity-60"></div>
                    
//                     <div className="absolute -top-12 bg-red-900/90 text-red-100 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-red-500/30 whitespace-nowrap shadow-lg tracking-wider">
//                         TARGET LOCKED
//                     </div>
//                 </div>

//                 {/* 📍 Current Location Button (Moved Up from Bottom-Right Zoom) */}
//                 <button 
//                     onClick={handleCurrentLocation}
//                     className="absolute bottom-24 right-3 z-[1000] bg-slate-800 hover:bg-cyan-600 text-white p-3 rounded-lg shadow-xl border border-white/10 transition-all active:scale-95 group"
//                     title="Use My Location"
//                 >
//                     <FaCrosshairs className="text-lg group-hover:rotate-45 transition-transform" />
//                 </button>

//                 {/* 🌐 Coordinates Badge (Bottom Left) */}
//                 <div className="absolute bottom-4 left-4 z-[1000] bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono text-cyan-400 border border-cyan-500/20 shadow-2xl flex items-center gap-3">
//                     <FaMapMarkerAlt /> 
//                     <span className="tracking-wider">{form.location.lat.toFixed(5)}, {form.location.lng.toFixed(5)}</span>
//                 </div>
//             </div>

//             {/* Save Button */}
//             <button 
//                 onClick={handleAdd} 
//                 disabled={loading} 
//                 className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
//             >
//                 {loading ? "Saving..." : <><FaPlus /> Register Station</>}
//             </button>
//         </div>

//         {/* === EXISTING STATIONS LIST === */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {data.map((item) => (
//                 <div key={item._id} className="relative flex flex-col p-5 bg-slate-800/40 border border-white/5 rounded-2xl hover:border-cyan-500/30 hover:bg-slate-800/60 transition-all group overflow-hidden">
                    
//                     <div className="relative z-10 flex justify-between items-start">
//                         <div className="flex items-start gap-4">
//                             <div className="bg-cyan-500/10 p-3 rounded-xl text-cyan-400 border border-cyan-500/20">
//                                 <FaBuilding className="text-xl" />
//                             </div>
//                             <div>
//                                 <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">{item.name}</h3>
//                                 <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//                                     <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span> {item.city}
//                                     <span className="w-1.5 h-1.5 rounded-full bg-gray-600 ml-1"></span> {item.district}
//                                 </p>
//                             </div>
//                         </div>
//                         <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all">
//                             <FaTrash />
//                         </button>
//                     </div>
                    
//                     {/* Location Link */}
//                     {item.location && item.location.lat && (
//                         <div className="relative z-10 mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
//                             <div className="text-[10px] text-gray-500 font-mono bg-black/30 px-2 py-1 rounded border border-white/5">
//                                 {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
//                             </div>
//                             <a 
//                                 href={`https://www.google.com/maps/search/?api=1&query=${item.location.lat},${item.location.lng}`} 
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-cyan-500 hover:text-white transition-all font-medium shadow-lg shadow-cyan-500/10"
//                             >
//                                 <FaMapMarkerAlt /> View Map
//                             </a>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageStations;






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { FaArrowLeft, FaTrash, FaPlus, FaBuilding, FaMapMarkerAlt, FaCrosshairs, FaSearch, FaLocationArrow } from "react-icons/fa";
import { MapContainer, TileLayer, useMap, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BASE_URL } from "../../config";

// ✅ Fix for Default Leaflet Marker Icons
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ManageStations = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Default Location: Chandrapur Center
  const defaultCenter = { lat: 19.9615, lng: 79.2961 };

  const [form, setForm] = useState({ 
      name: "", 
      city: "", 
      district: "Chandrapur",
      location: { lat: defaultCenter.lat, lng: defaultCenter.lng, address: "" } 
  });

  const [searchQuery, setSearchQuery] = useState("");

  // --- MAP COMPONENTS ---

  // 1. Handle Dragging
  const MapEvents = () => {
    const map = useMap();
    useMapEvents({
      moveend: () => {
        const center = map.getCenter();
        setForm(prev => ({ ...prev, location: { ...prev.location, lat: center.lat, lng: center.lng } }));
      },
    });
    return null;
  };

  // 2. Smoothly Fly to New Location
  const RecenterAutomatically = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });
    }, [lat, lng, map]);
    return null;
  };

  // --- API CALLS ---
  const fetchData = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(`${BASE_URL}/api/metadata/stations`, config);
      setData(data);
    } catch (err) { toast.error("Failed to load stations"); }
  };

  useEffect(() => { fetchData(); }, []);

  // --- ACTIONS ---

  const handleSearch = async (e) => {
      if(e) e.preventDefault();
      if(!searchQuery) return;

      const toastId = toast.loading("Searching location...");
      try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
          if(response.data && response.data.length > 0) {
              const { lat, lon, display_name } = response.data[0];
              const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
              
              setForm(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, lat: newPos.lat, lng: newPos.lng, address: display_name } 
              }));
              toast.success("Location Found!", { id: toastId });
          } else {
              toast.error("Location not found", { id: toastId });
          }
      } catch (error) {
          toast.error("Search failed", { id: toastId });
      }
  };

  const handleCurrentLocation = () => {
      if (navigator.geolocation) {
          const toastId = toast.loading("Getting GPS location...");
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                  };
                  setForm(prev => ({ ...prev, location: { ...prev.location, lat: pos.lat, lng: pos.lng } }));
                  toast.success("GPS Location Found!", { id: toastId });
              },
              () => {
                  toast.error("Permission denied for location", { id: toastId });
              }
          );
      } else {
          toast.error("Geolocation not supported");
      }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!form.name) return toast.error("Station Name is required");

    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
        await axios.post(`${BASE_URL}/api/metadata/stations`, form, { headers: { Authorization: `Bearer ${userInfo.token}` } });
        toast.success("Station Added Successfully!");
        setForm({ name: "", city: "", district: "Chandrapur", location: { lat: defaultCenter.lat, lng: defaultCenter.lng } });
        setSearchQuery("");
        fetchData();
    } catch (err) { 
        toast.error(err.response?.data?.message || "Failed to add station"); 
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this station?")) return;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
        await axios.delete(`${BASE_URL}/api/metadata/stations/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
        toast.success("Deleted");
        fetchData();
    } catch (err) { toast.error("Delete Failed"); }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans pt-24">
      <Navbar />
      <Toaster />
      
      {/* Sticky Header */}
      <div className="sticky top-[80px] z-30 bg-gray-900 border-b border-white/10 shadow-lg py-3 px-4 md:px-8">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <button onClick={() => navigate("/admin/data")} className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all text-gray-300 hover:text-white">
                <FaArrowLeft />
            </button>
            <h1 className="text-xl font-bold flex items-center gap-2"><FaBuilding className="text-cyan-400"/> Manage Police Stations</h1>
          </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 pb-20">
        
        {/* === ADD STATION CARD === */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl border border-white/5 shadow-2xl mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
                <FaPlus /> Add New Station
            </h2>
            
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                    <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase mb-1 block">Station Name</label>
                    <input 
                        value={form.name} 
                        onChange={(e) => setForm({...form, name: e.target.value})} 
                        placeholder="e.g. Ramnagar Police Station" 
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-cyan-500 focus:bg-black/50 transition-all placeholder-gray-600" 
                    />
                </div>
                <div>
                    <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase mb-1 block">City / Area</label>
                    <input 
                        value={form.city} 
                        onChange={(e) => setForm({...form, city: e.target.value})} 
                        placeholder="e.g. Chandrapur City" 
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-cyan-500 focus:bg-black/50 transition-all placeholder-gray-600" 
                    />
                </div>
            </div>

            {/* === MAP INTERFACE === */}
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-inner bg-slate-900 mb-5 h-[450px] group">
                
                {/* 🔍 CENTERED FLOATING SEARCH BAR (Fixes Overlap) */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-[90%] md:w-96 bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl flex items-center p-1.5 transition-all hover:border-cyan-500/50">
                    <FaSearch className="text-cyan-400 ml-4 shrink-0" />
                    <input 
                        className="w-full bg-transparent border-none text-white text-sm p-2 focus:ring-0 outline-none placeholder-gray-400 font-medium ml-1"
                        placeholder="Search Location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                    />
                    <button 
                        onClick={handleSearch}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white p-2.5 rounded-full shadow-lg transition-all active:scale-95"
                    >
                        <FaLocationArrow className="text-xs" />
                    </button>
                </div>

                {/* 🗺️ Map Container */}
                <MapContainer 
                    center={[defaultCenter.lat, defaultCenter.lng]} 
                    zoom={15} 
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false} // ❌ DISABLE DEFAULT ZOOM (We add Custom below)
                >
                    {/* ✅ STANDARD OPENSTREETMAP TILES (Visible & Clear) */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© OpenStreetMap contributors'
                    />
                    
                    <RecenterAutomatically lat={form.location.lat} lng={form.location.lng} />
                    <MapEvents />

                    {/* ✅ ZOOM CONTROL - Fixed Bottom Right */}
                    <ZoomControl position="bottomright" />
                </MapContainer>

                {/* 🎯 Animated Target Pin (Center) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse">
                        <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></div>
                    </div>
                    {/* Crosshairs */}
                    <div className="h-6 w-[1px] bg-red-500 absolute top-0 opacity-60"></div>
                    <div className="h-6 w-[1px] bg-red-500 absolute bottom-0 opacity-60"></div>
                    <div className="w-6 h-[1px] bg-red-500 absolute left-0 opacity-60"></div>
                    <div className="w-6 h-[1px] bg-red-500 absolute right-0 opacity-60"></div>
                    
                    <div className="absolute -top-12 bg-red-900/90 text-red-100 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-red-500/30 whitespace-nowrap shadow-lg tracking-wider">
                        TARGET LOCKED
                    </div>
                </div>

                {/* 📍 Current Location Button (Moved Up from Bottom-Right Zoom) */}
                <button 
                    onClick={handleCurrentLocation}
                    className="absolute bottom-24 right-3 z-[1000] bg-slate-800 hover:bg-cyan-600 text-white p-3 rounded-lg shadow-xl border border-white/10 transition-all active:scale-95 group"
                    title="Use My Location"
                >
                    <FaCrosshairs className="text-lg group-hover:rotate-45 transition-transform" />
                </button>

                {/* 🌐 Coordinates Badge (Bottom Left) */}
                <div className="absolute bottom-4 left-4 z-[1000] bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono text-cyan-400 border border-cyan-500/20 shadow-2xl flex items-center gap-3">
                    <FaMapMarkerAlt /> 
                    <span className="tracking-wider">{form.location.lat.toFixed(5)}, {form.location.lng.toFixed(5)}</span>
                </div>
            </div>

            {/* Save Button */}
            <button 
                onClick={handleAdd} 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
                {loading ? "Saving..." : <><FaPlus /> Register Station</>}
            </button>
        </div>

        {/* === EXISTING STATIONS LIST === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item) => (
                <div key={item._id} className="relative flex flex-col p-5 bg-slate-800/40 border border-white/5 rounded-2xl hover:border-cyan-500/30 hover:bg-slate-800/60 transition-all group overflow-hidden">
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div className="flex items-start gap-4">
                            <div className="bg-cyan-500/10 p-3 rounded-xl text-cyan-400 border border-cyan-500/20">
                                <FaBuilding className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">{item.name}</h3>
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span> {item.city}
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 ml-1"></span> {item.district}
                                </p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all">
                            <FaTrash />
                        </button>
                    </div>
                    
                    {/* Location Link */}
                    {item.location && item.location.lat && (
                        <div className="relative z-10 mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                            <div className="text-[10px] text-gray-500 font-mono bg-black/30 px-2 py-1 rounded border border-white/5">
                                {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
                            </div>
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${item.location.lat},${item.location.lng}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-cyan-500 hover:text-white transition-all font-medium shadow-lg shadow-cyan-500/10"
                            >
                                <FaMapMarkerAlt /> View Map
                            </a>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageStations;