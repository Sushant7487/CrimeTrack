// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import axios from "axios";
// import { FaArrowLeft, FaSyncAlt } from "react-icons/fa";

// // ✅ Fix for Leaflet Marker Icons in React
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const ENDPOINT = "http://localhost:5000";

// // ✅ Component to Auto-Center Map on Move
// const RecenterAutomatically = ({ lat, lng }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView([lat, lng]);
//   }, [lat, lng, map]);
//   return null;
// };

// const LiveTracking = () => {
//   const { id } = useParams(); // URL se Complaint ID milegi
//   const navigate = useNavigate();
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [lastUpdated, setLastUpdated] = useState(new Date());

//   // ✅ Fetch Location Function
//   const fetchLocation = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
//       // Backend API call to get fresh data
//       const { data } = await axios.get(`${ENDPOINT}/api/crime/track/${id}`, config);
      
//       if (data && data.location) {
//         setLocation(data.location);
//         setLastUpdated(new Date());
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Tracking Error:", error);
//     }
//   };

//   // ✅ Polling: Har 5 Seconds main update
//   useEffect(() => {
//     fetchLocation(); // First time immediate
//     const interval = setInterval(fetchLocation, 5000);
//     return () => clearInterval(interval);
//   }, [id]);

//   return (
//     <div className="h-screen w-screen flex flex-col bg-gray-900 relative">
      
//       {/* --- HEADER --- */}
//       <div className="absolute top-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center text-white">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="bg-gray-800/80 p-3 rounded-full hover:bg-red-600 transition backdrop-blur-md border border-white/20"
//         >
//           <FaArrowLeft />
//         </button>
        
//         <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-red-500/50 flex flex-col items-center">
//           <h2 className="text-lg font-bold text-red-400 tracking-wider animate-pulse">LIVE TRACKING ACTIVE</h2>
//           <p className="text-[10px] text-gray-300 flex items-center gap-1">
//             <FaSyncAlt className="animate-spin text-xs"/> Updating every 5s
//           </p>
//         </div>

//         <div className="hidden md:block"></div> {/* Spacer */}
//       </div>

//       {/* --- MAP --- */}
//       {loading || !location ? (
//         <div className="h-full w-full flex items-center justify-center text-white bg-gray-900">
//           <div className="flex flex-col items-center gap-3">
//             <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//             <p className="animate-pulse">Acquiring Satellite Signal...</p>
//           </div>
//         </div>
//       ) : (
//         <MapContainer center={[location.lat, location.lng]} zoom={15} scrollWheelZoom={true} className="h-full w-full z-0">
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
          
//           <Marker position={[location.lat, location.lng]}>
//             <Popup>
//               <div className="text-center">
//                 <strong className="text-red-600">Citizen Location</strong><br/>
//                 Last Update: {lastUpdated.toLocaleTimeString()}
//               </div>
//             </Popup>
//           </Marker>

//           {/* Auto Center Map whenever location changes */}
//           <RecenterAutomatically lat={location.lat} lng={location.lng} />
//         </MapContainer>
//       )}

//       {/* --- BOTTOM INFO PANEL --- */}
//       {location && (
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] w-[90%] max-w-md bg-gray-900/90 backdrop-blur-xl border border-gray-700 p-4 rounded-2xl shadow-2xl">
//             <div className="flex justify-between items-center text-white">
//                 <div>
//                     <p className="text-xs text-gray-400 uppercase">Latitude</p>
//                     <p className="font-mono font-bold text-yellow-400">{location.lat.toFixed(6)}</p>
//                 </div>
//                 <div className="h-8 w-[1px] bg-gray-600"></div>
//                 <div>
//                     <p className="text-xs text-gray-400 uppercase">Longitude</p>
//                     <p className="font-mono font-bold text-yellow-400">{location.lng.toFixed(6)}</p>
//                 </div>
//             </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveTracking;

















// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import axios from "axios";
// import { FaArrowLeft, FaSyncAlt, FaCrosshairs, FaUserSecret, FaUserShield } from "react-icons/fa";

// // ✅ CUSTOM ICONS (Red for Citizen, Blue for Police)
// const citizenIcon = new L.Icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const policeIcon = new L.Icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const ENDPOINT = "http://localhost:5000";

// // ✅ Component to Handle Map FlyTo Animations
// const MapController = ({ targetLocation, viewMode }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (targetLocation) {
//       // Smoothly fly to the new location
//       map.flyTo([targetLocation.lat, targetLocation.lng], map.getZoom());
//     }
//   }, [targetLocation, viewMode, map]);

//   return null;
// };

// const LiveTracking = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [citizenLocation, setCitizenLocation] = useState(null);
//   const [policeLocation, setPoliceLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
  
//   // 'citizen' means map follows citizen, 'police' means map stays on police
//   const [viewMode, setViewMode] = useState('citizen'); 

//   // ✅ 1. Fetch Citizen Location (Every 5 Seconds)
//   const fetchCitizenLocation = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
//       const { data } = await axios.get(`${ENDPOINT}/api/crime/track/${id}`, config);
      
//       if (data && data.location) {
//         console.log("📍 Citizen Location Updated:", data.location);
//         setCitizenLocation(data.location);
//         setLastUpdated(new Date());
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Tracking Error:", error);
//     }
//   };

//   // ✅ 2. Get Police (Self) Location
//   const handleMyLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const newPos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setPoliceLocation(newPos);
//           setViewMode('police'); // Map will focus on Police now
//         },
//         (error) => {
//           alert("Could not fetch your location. Please enable GPS.");
//         }
//       );
//     } else {
//       alert("Geolocation not supported by this browser.");
//     }
//   };

//   // ✅ 3. Auto-Focus Logic (Switch back to citizen if user wants)
//   const focusOnCitizen = () => {
//     setViewMode('citizen');
//     fetchCitizenLocation(); // Immediate fetch
//   };

//   // ✅ Polling Effect
//   useEffect(() => {
//     fetchCitizenLocation();
//     const interval = setInterval(fetchCitizenLocation, 5000); // 5 Seconds Loop
//     return () => clearInterval(interval);
//   }, [id]);

//   // ✅ Initial Police Location (Optional: Load once on start)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((pos) => {
//         setPoliceLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
//       });
//     }
//   }, []);

//   return (
//     <div className="h-screen w-screen flex flex-col bg-gray-900 relative">
      
//       {/* --- HEADER --- */}
//       <div className="absolute top-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-b from-black/90 to-transparent flex justify-between items-center text-white pointer-events-none">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="bg-gray-800/80 p-3 rounded-full hover:bg-red-600 transition backdrop-blur-md border border-white/20 pointer-events-auto"
//         >
//           <FaArrowLeft />
//         </button>
        
//         <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-red-500/50 flex flex-col items-center">
//           <h2 className="text-lg font-bold text-red-400 tracking-wider animate-pulse flex items-center gap-2">
//             <FaUserSecret /> LIVE TRACKING
//           </h2>
//           <p className="text-[10px] text-gray-300 flex items-center gap-1">
//             <FaSyncAlt className="animate-spin text-xs"/> Updating Live
//           </p>
//         </div>

//         <div className="hidden md:block"></div> 
//       </div>

//       {/* --- MAP --- */}
//       {loading || !citizenLocation ? (
//         <div className="h-full w-full flex items-center justify-center text-white bg-gray-900">
//           <div className="flex flex-col items-center gap-3">
//             <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//             <p className="animate-pulse">Connecting to Satellite...</p>
//           </div>
//         </div>
//       ) : (
//         <MapContainer 
//             center={[citizenLocation.lat, citizenLocation.lng]} 
//             zoom={15} 
//             scrollWheelZoom={true} 
//             className="h-full w-full z-0"
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
          
//           {/* 🔴 CITIZEN MARKER */}
//           <Marker position={[citizenLocation.lat, citizenLocation.lng]} icon={citizenIcon}>
//             <Popup>
//               <div className="text-center">
//                 <strong className="text-red-600">TARGET (Citizen)</strong><br/>
//                 Last Update: {lastUpdated.toLocaleTimeString()}
//               </div>
//             </Popup>
//           </Marker>

//           {/* 🔵 POLICE MARKER (Shows only if location fetched) */}
//           {policeLocation && (
//             <Marker position={[policeLocation.lat, policeLocation.lng]} icon={policeIcon}>
//               <Popup>
//                 <div className="text-center">
//                   <strong className="text-blue-600">YOU (Police)</strong><br/>
//                   Current Position
//                 </div>
//               </Popup>
//             </Marker>
//           )}

//           {/* 🎮 CONTROLLER: Handles Movement */}
//           <MapController 
//             targetLocation={viewMode === 'citizen' ? citizenLocation : policeLocation} 
//             viewMode={viewMode}
//           />

//         </MapContainer>
//       )}

//       {/* --- BOTTOM CONTROLS --- */}
//       <div className="absolute bottom-8 right-4 z-[1000] flex flex-col gap-3">
        
//         {/* Button: Focus on Citizen */}
//         <button 
//             onClick={focusOnCitizen}
//             className={`p-4 rounded-full shadow-xl transition-all border-2 ${viewMode === 'citizen' ? 'bg-red-600 border-white scale-110' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
//             title="Focus on Citizen"
//         >
//             <FaUserSecret className="text-xl" />
//         </button>

//         {/* Button: Focus on Me (Police) */}
//         <button 
//             onClick={handleMyLocation}
//             className={`p-4 rounded-full shadow-xl transition-all border-2 ${viewMode === 'police' ? 'bg-blue-600 border-white scale-110' : 'bg-gray-800 border-gray-600 text-white'}`}
//             title="My Location"
//         >
//             <FaCrosshairs className="text-xl" />
//         </button>

//       </div>

//       {/* --- LIVE COORDINATES PANEL --- */}
//       {citizenLocation && (
//         <div className="absolute bottom-8 left-4 z-[1000] bg-black/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 shadow-lg hidden md:block">
//             <p className="text-xs text-gray-400 mb-1">TARGET COORDINATES</p>
//             <div className="flex gap-4 font-mono text-yellow-400 font-bold">
//                 <span>LAT: {citizenLocation.lat.toFixed(5)}</span>
//                 <span>LNG: {citizenLocation.lng.toFixed(5)}</span>
//             </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default LiveTracking;



















import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { FaArrowLeft, FaSyncAlt, FaCrosshairs, FaUserSecret } from "react-icons/fa";

// ✅ 1. ICONS CONFIGURATION
const citizenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Police ke liye Blue Marker
const policeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ENDPOINT = "http://localhost:5000";

// ✅ 2. MAP CONTROLLER (Smooth Animation)
const MapController = ({ targetLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (targetLocation) {
      map.flyTo([targetLocation.lat, targetLocation.lng], map.getZoom(), {
        animate: true,
        duration: 1.5 // Smooth fly effect
      });
    }
  }, [targetLocation, map]);
  return null;
};

const LiveTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [citizenLocation, setCitizenLocation] = useState(null);
  const [policeLocation, setPoliceLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // 'citizen' = Focus Target, 'police' = Focus Me
  const [viewMode, setViewMode] = useState('citizen'); 

  // Watch ID store karne ke liye (Self tracking stop karne ke liye)
  const watchIdRef = useRef(null);

  // ============================================
  // 🔍 1. FETCH CITIZEN LOCATION (Backend Check)
  // ============================================
  const fetchCitizenLocation = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return;

      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      const { data } = await axios.get(`${ENDPOINT}/api/crime/track/${id}`, config);
      
      // ✅ DEBUGGING: Browser Console check karein
      console.log("📡 Backend Data Received:", data); 

      if (data && data.location && data.location.lat && data.location.lng) {
        setCitizenLocation(data.location);
        setLastUpdated(new Date());
      } else {
        console.warn("⚠️ Backend sent empty location");
      }
      setLoading(false);
    } catch (error) {
      console.error("❌ Tracking Error:", error);
    }
  };

  // ============================================
  // 👮 2. TRACK MY LOCATION (Live Watch)
  // ============================================
  useEffect(() => {
    if (navigator.geolocation) {
      // watchPosition use kiya hai taaki continuous update ho
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setPoliceLocation(newPos);
          // Agar mode 'police' hai to map user ke saath move karega
        },
        (error) => console.error("GPS Error:", error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }

    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  // Polling for Citizen Location (Every 4 seconds)
  useEffect(() => {
    fetchCitizenLocation();
    const interval = setInterval(fetchCitizenLocation, 4000);
    return () => clearInterval(interval);
  }, [id]);


  // Button Handlers
  const handleFocusCitizen = () => {
    setViewMode('citizen');
    fetchCitizenLocation();
  };

  const handleFocusPolice = () => {
    setViewMode('police');
    if(!policeLocation) alert("Detecting your location... please wait.");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 relative">
      
      {/* --- HEADER --- */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center text-white pointer-events-none">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-gray-800/80 p-3 rounded-full hover:bg-red-600 transition backdrop-blur-md border border-white/20 pointer-events-auto"
        >
          <FaArrowLeft />
        </button>
        
        <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-red-500/50 flex flex-col items-center">
          <h2 className="text-lg font-bold text-red-400 tracking-wider animate-pulse flex items-center gap-2">
            <FaUserSecret /> LIVE OPERATION
          </h2>
          <p className="text-[10px] text-gray-300 flex items-center gap-1">
             {lastUpdated ? `Last Sync: ${lastUpdated.toLocaleTimeString()}` : "Waiting for updates..."}
          </p>
        </div>

        <div className="hidden md:block"></div> 
      </div>

      {/* --- MAP --- */}
      {loading && !citizenLocation ? (
        <div className="h-full w-full flex items-center justify-center text-white bg-gray-900">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="animate-pulse">Tracking Satellite Signal...</p>
          </div>
        </div>
      ) : (
        <MapContainer 
            center={citizenLocation ? [citizenLocation.lat, citizenLocation.lng] : [20.5937, 78.9629]} 
            zoom={15} 
            scrollWheelZoom={true} 
            className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* 🔴 1. CITIZEN MARKER (TARGET) */}
          {citizenLocation && (
              <Marker position={[citizenLocation.lat, citizenLocation.lng]} icon={citizenIcon}>
                <Popup>
                  <div className="text-center">
                    <strong className="text-red-600 text-lg">⚠️ TARGET</strong><br/>
                    Location Detected<br/>
                    <span className="text-xs text-gray-500">
                      {citizenLocation.lat.toFixed(4)}, {citizenLocation.lng.toFixed(4)}
                    </span>
                  </div>
                </Popup>
              </Marker>
          )}

          {/* 🔵 2. POLICE MARKER (SELF) - WITH PULSING CIRCLE */}
          {policeLocation && (
            <>
              {/* Accuracy Circle (Halo Effect) */}
              <Circle 
                center={[policeLocation.lat, policeLocation.lng]}
                radius={80} // 80 meters radius circle
                pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
              />
              
              <Marker position={[policeLocation.lat, policeLocation.lng]} icon={policeIcon}>
                <Popup>
                  <div className="text-center">
                    <strong className="text-blue-600">👮 YOU (Live)</strong><br/>
                    Moving...
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          {/* 🎮 CONTROLLER */}
          <MapController targetLocation={viewMode === 'citizen' ? citizenLocation : policeLocation} />

        </MapContainer>
      )}

      {/* --- BOTTOM CONTROLS --- */}
      <div className="absolute bottom-10 right-4 z-[1000] flex flex-col gap-4">
        
        {/* Track Citizen Button */}
        <button 
            onClick={handleFocusCitizen}
            className={`p-4 rounded-full shadow-2xl transition-all border-4 flex items-center justify-center ${
                viewMode === 'citizen' 
                ? 'bg-red-600 border-white text-white scale-110 shadow-red-900/50' 
                : 'bg-gray-800 border-gray-600 text-gray-400'
            }`}
            title="Focus on Citizen"
        >
            <FaUserSecret className="text-xl" />
        </button>

        {/* Track Me (Police) Button */}
        <button 
            onClick={handleFocusPolice}
            className={`p-4 rounded-full shadow-2xl transition-all border-4 flex items-center justify-center ${
                viewMode === 'police' 
                ? 'bg-blue-600 border-white text-white scale-110 shadow-blue-900/50' 
                : 'bg-gray-800 border-gray-600 text-white'
            }`}
            title="Focus on My Location"
        >
            <FaCrosshairs className={`text-xl ${viewMode === 'police' ? 'animate-spin-slow' : ''}`} />
        </button>

      </div>
    </div>
  );
};

export default LiveTracking;