// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaMapMarkerAlt, FaPhoneAlt, FaExclamationCircle, FaUserShield, FaCheckCircle, FaUser } from "react-icons/fa";
// import SkeletonLoader from "../common/SkeletonLoader";


// // ✅ Accept 'onSOSResolved' prop from Parent
// const EmergencyAlerts = ({ onSOSResolved }) => {
//   const [alerts, setAlerts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [chatData, setChatData] = useState(null); 

//   const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

//   const fetchAlerts = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/all", config);
      
//       const sosAlerts = data.filter(c => 
//           c.isSOS === true && 
//           c.status !== "Closed" && 
//           c.selectedStation === userInfo.station
//       );
      
//       setAlerts(sosAlerts);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//       fetchAlerts();
//       const interval = setInterval(fetchAlerts, 5000);
//       return () => clearInterval(interval);
//   }, []);

//   const assignToMe = async (id) => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         await axios.put(`http://localhost:5000/api/crime/update/${id}`, { action: "assign_self" }, config);
        
//         toast.success("Emergency Case Assigned to You!");
        
//         // ✅ TRIGGER SIREN STOP
//         if (onSOSResolved) {
//             console.log("Stopping Siren...");
//             onSOSResolved(); 
//         }

//         fetchAlerts(); // Refresh UI immediately
//       } catch (error) { 
//           toast.error("Assignment Failed"); 
//           console.error(error);
//       }
//   };

//   const openMap = (lat, lng) => {
//       if(!lat || !lng) return toast.error("GPS Coordinates Missing");
//       window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
//   };

//   // ✅ Open Contact Page (Chat/Call)
//   if (chatData) {
//       return (
//         <ContactPage 
//             complaint={chatData} 
//             currentUser={userInfo} 
//             onBack={() => setChatData(null)} 
//         />
//       );
//   }

//   return (
//     <div className="space-y-4 md:space-y-6">
        
//         {/* Header */}
//         <div className="bg-red-900/40 p-4 md:p-6 rounded-xl border border-red-500 flex justify-between items-center animate-pulse">
//             <div>
//                 <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
//                     <FaExclamationCircle className="text-red-500" /> LIVE SOS FEED
//                 </h2>
//                 <p className="text-red-300 text-xs md:text-sm">Monitoring Station: {userInfo.station}</p>
//             </div>
//             <button onClick={fetchAlerts} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded font-bold text-xs md:text-sm transition-transform active:scale-95 whitespace-nowrap">
//                 Sync Now
//             </button>
//         </div>

//         {loading ? <SkeletonLoader count={2} /> : alerts.length === 0 ? (
//             <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
//                 <p className="text-green-400 font-bold text-lg">No Active Emergencies.</p>
//             </div>
//         ) : (
//             <div className="grid gap-3 md:gap-4">
//                 {alerts.map(alert => {
//                     const isAssignedToMe = alert.assignedOfficer === `${userInfo.designation} ${userInfo.firstName} ${userInfo.lastName}` || 
//                                            alert.assignedOfficer.includes(userInfo.firstName);
                    
//                     return (
//                         <div key={alert._id} className="bg-gray-900 border-2 border-red-600 p-4 md:p-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.2)] flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-red-900/40 transition-all">
                            
//                             <div className="flex-1">
//                                 <div className="flex gap-2 mb-3">
//                                     <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-bold uppercase animate-pulse">CRITICAL SOS</span>
//                                     <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-[10px] md:text-xs font-mono">
//                                         {new Date(alert.createdAt).toLocaleTimeString()}
//                                     </span>
//                                 </div>
                                
//                                 <h3 className="text-lg md:text-xl font-bold text-white mb-2">{alert.crimeType}</h3>
//                                 <p className="text-gray-300 bg-red-900/20 p-3 rounded border border-red-500/30 text-sm mb-4 italic">
//                                     "{alert.description}"
//                                 </p>
                                
//                                 <div className="flex flex-wrap gap-4 text-sm text-gray-400 bg-black/20 p-3 rounded-lg">
//                                     <p className="flex items-center gap-2">
//                                         <FaUser className="text-gray-500" /> 
//                                         <strong className="text-gray-500">Citizen:</strong> 
//                                         <span className="text-white">{alert.reporterName}</span>
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="md:w-72 flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pt-0 pl-0 md:pl-6">
//                                 <button 
//                                     onClick={() => openMap(alert.location?.lat, alert.location?.lng)}
//                                     className="w-full py-2.5 md:py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
//                                 >
//                                     <FaMapMarkerAlt /> View Live Location
//                                 </button>

//                                 {alert.assignedOfficer === "Not Assigned" || !alert.assignedOfficer ? (
//                                     <button 
//                                         onClick={() => assignToMe(alert._id)}
//                                         className="w-full py-2.5 md:py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 animate-bounce hover:animate-none transition-all shadow-lg shadow-red-900/50 text-sm md:text-base"
//                                     >
//                                         <FaUserShield /> ACCEPT & ASSIGN
//                                     </button>
//                                 ) : isAssignedToMe ? (
//                                     <button 
//                                         onClick={() => setChatData(alert)}
//                                         className="w-full py-2.5 md:py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-green-900/30 transition-transform active:scale-95 text-sm md:text-base"
//                                     >
//                                         <FaPhoneAlt /> Open Secure Line
//                                     </button>
//                                 ) : (
//                                     <div className="bg-gray-800 p-3 rounded-lg text-center border border-gray-700">
//                                         <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold mb-1">Handled By</p>
//                                         <div className="flex items-center justify-center gap-2 text-yellow-500 font-bold text-sm">
//                                             <FaCheckCircle /> {alert.assignedOfficer}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         )}
//     </div>
//   );
// };

// export default EmergencyAlerts;
















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom"; // ✅ Import Navigation Hook
// import { FaMapMarkerAlt, FaPhoneAlt, FaExclamationCircle, FaUserShield, FaCheckCircle, FaUser } from "react-icons/fa";
// import SkeletonLoader from "../common/SkeletonLoader";


// const EmergencyAlerts = ({ onSOSResolved }) => {
//   const [alerts, setAlerts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [chatData, setChatData] = useState(null); 

//   const navigate = useNavigate(); // ✅ Initialize Navigation
//   const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

//   const fetchAlerts = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/all", config);
      
//       const sosAlerts = data.filter(c => 
//           c.isSOS === true && 
//           c.status !== "Closed" && 
//           c.selectedStation === userInfo.station
//       );
      
//       setAlerts(sosAlerts);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//       fetchAlerts();
//       const interval = setInterval(fetchAlerts, 5000);
//       return () => clearInterval(interval);
//   }, []);

//   const assignToMe = async (id) => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         await axios.put(`http://localhost:5000/api/crime/update/${id}`, { action: "assign_self" }, config);
        
//         toast.success("Emergency Case Assigned to You!");
        
//         // ✅ TRIGGER SIREN STOP
//         if (onSOSResolved) {
//             onSOSResolved(); 
//         }

//         fetchAlerts(); 
//       } catch (error) { 
//           toast.error("Assignment Failed"); 
//           console.error(error);
//       }
//   };

//   // ✅ NEW: Navigate to Internal Live Tracking Page
//   const handleLiveTracking = (alertId) => {
//       navigate(`/police/live-tracking/${alertId}`);
//   };

//   // ✅ Open Contact Page
//   if (chatData) {
//       return (
//         <ContactPage 
//             complaint={chatData} 
//             currentUser={userInfo} 
//             onBack={() => setChatData(null)} 
//         />
//       );
//   }

//   return (
//     <div className="space-y-4 md:space-y-6">
        
//         {/* Header */}
//         <div className="bg-red-900/40 p-4 md:p-6 rounded-xl border border-red-500 flex justify-between items-center animate-pulse">
//             <div>
//                 <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
//                     <FaExclamationCircle className="text-red-500" /> LIVE SOS FEED
//                 </h2>
//                 <p className="text-red-300 text-xs md:text-sm">Monitoring Station: {userInfo.station}</p>
//             </div>
//             <button onClick={fetchAlerts} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded font-bold text-xs md:text-sm transition-transform active:scale-95 whitespace-nowrap">
//                 Sync Now
//             </button>
//         </div>

//         {loading ? <SkeletonLoader count={2} /> : alerts.length === 0 ? (
//             <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
//                 <p className="text-green-400 font-bold text-lg">No Active Emergencies.</p>
//             </div>
//         ) : (
//             <div className="grid gap-3 md:gap-4">
//                 {alerts.map(alert => {
//                     const isAssignedToMe = alert.assignedOfficer === `${userInfo.designation} ${userInfo.firstName} ${userInfo.lastName}` || 
//                                            alert.assignedOfficer.includes(userInfo.firstName);
                    
//                     return (
//                         <div key={alert._id} className="bg-gray-900 border-2 border-red-600 p-4 md:p-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.2)] flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-red-900/40 transition-all">
                            
//                             <div className="flex-1">
//                                 <div className="flex gap-2 mb-3">
//                                     <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-bold uppercase animate-pulse">CRITICAL SOS</span>
//                                     <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-[10px] md:text-xs font-mono">
//                                         {new Date(alert.createdAt).toLocaleTimeString()}
//                                     </span>
//                                 </div>
                                
//                                 <h3 className="text-lg md:text-xl font-bold text-white mb-2">{alert.crimeType}</h3>
//                                 <p className="text-gray-300 bg-red-900/20 p-3 rounded border border-red-500/30 text-sm mb-4 italic">
//                                     "{alert.description}"
//                                 </p>
                                
//                                 <div className="flex flex-wrap gap-4 text-sm text-gray-400 bg-black/20 p-3 rounded-lg">
//                                     <p className="flex items-center gap-2">
//                                         <FaUser className="text-gray-500" /> 
//                                         <strong className="text-gray-500">Citizen:</strong> 
//                                         <span className="text-white">{alert.reporterName}</span>
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="md:w-72 flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pt-0 pl-0 md:pl-6">
                                
//                                 {/* ✅ UPDATED BUTTON: Opens Internal Map Page */}
//                                 <button 
//                                     onClick={() => handleLiveTracking(alert._id)}
//                                     className="w-full py-2.5 md:py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
//                                 >
//                                     <FaMapMarkerAlt /> View Live Tracking
//                                 </button>

//                                 {alert.assignedOfficer === "Not Assigned" || !alert.assignedOfficer ? (
//                                     <button 
//                                         onClick={() => assignToMe(alert._id)}
//                                         className="w-full py-2.5 md:py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 animate-bounce hover:animate-none transition-all shadow-lg shadow-red-900/50 text-sm md:text-base"
//                                     >
//                                         <FaUserShield /> ACCEPT & ASSIGN
//                                     </button>
//                                 ) : isAssignedToMe ? (
//                                     <button 
//                                         onClick={() => setChatData(alert)}
//                                         className="w-full py-2.5 md:py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-green-900/30 transition-transform active:scale-95 text-sm md:text-base"
//                                     >
//                                         <FaPhoneAlt /> Open Secure Line
//                                     </button>
//                                 ) : (
//                                     <div className="bg-gray-800 p-3 rounded-lg text-center border border-gray-700">
//                                         <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold mb-1">Handled By</p>
//                                         <div className="flex items-center justify-center gap-2 text-yellow-500 font-bold text-sm">
//                                             <FaCheckCircle /> {alert.assignedOfficer}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         )}
//     </div>
//   );
// };

// export default EmergencyAlerts;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom"; // ✅ Navigation Hook
// import { FaMapMarkerAlt, FaPhoneAlt, FaExclamationCircle, FaUserShield, FaCheckCircle, FaUser, FaSyncAlt } from "react-icons/fa";
// import SkeletonLoader from "../common/SkeletonLoader";


// const EmergencyAlerts = ({ onSOSResolved }) => {
//   const [alerts, setAlerts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [chatData, setChatData] = useState(null); 

//   const navigate = useNavigate(); 
//   const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

//   const fetchAlerts = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
//       // ✅ Fetch All Data
//       const { data } = await axios.get("http://localhost:5000/api/crime/all", config);
      
//       console.log("Fetched Alerts:", data); // Debugging

//       // ✅ FIX: Robust Filter Logic
//       const sosAlerts = data.filter(c => 
//           // 1. SOS Check (Handles 'true' boolean AND "true" string)
//           (c.isSOS === true || c.isSOS === "true") && 
          
//           // 2. Status Check
//           c.status !== "Closed" &&

//           // 3. Station Check (RESTORED & IMPROVED)
//           // Dono taraf se space hata kar match karega (e.g. "Pune" == "Pune ")
//           c.selectedStation?.trim() === userInfo.station?.trim()
//       );
      
//       setAlerts(sosAlerts);
//       setLoading(false);
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//       fetchAlerts();
//       const interval = setInterval(fetchAlerts, 5000);
//       return () => clearInterval(interval);
//   }, []);

//   const assignToMe = async (id) => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         await axios.put(`http://localhost:5000/api/crime/update/${id}`, { action: "assign_self" }, config);
        
//         toast.success("Emergency Case Assigned to You!");
        
//         // ✅ Stop Siren Signal
//         if (onSOSResolved) {
//             onSOSResolved(); 
//         }

//         fetchAlerts(); 
//       } catch (error) { 
//           toast.error("Assignment Failed"); 
//           console.error(error);
//       }
//   };

//   // ✅ Navigate to Internal Live Tracking Page
//   const handleLiveTracking = (alertId) => {
//       navigate(`/police/live-tracking/${alertId}`);
//   };

//   if (chatData) {
//       return (
//         <ContactPage 
//             complaint={chatData} 
//             currentUser={userInfo} 
//             onBack={() => setChatData(null)} 
//         />
//       );
//   }

//   return (
//     <div className="space-y-4 md:space-y-6">
        
//         {/* Header */}
//         <div className="bg-red-900/40 p-4 md:p-6 rounded-xl border border-red-500 flex justify-between items-center animate-pulse">
//             <div>
//                 <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
//                     <FaExclamationCircle className="text-red-500" /> LIVE SOS FEED
//                 </h2>
//                 <p className="text-red-300 text-xs md:text-sm">Monitoring Station: {userInfo.station}</p>
//             </div>
//             <button onClick={fetchAlerts} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded font-bold text-xs md:text-sm transition-transform active:scale-95 whitespace-nowrap flex items-center gap-2">
//                 <FaSyncAlt /> Sync Now
//             </button>
//         </div>

//         {loading ? <SkeletonLoader count={2} /> : alerts.length === 0 ? (
//             <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
//                 <p className="text-green-400 font-bold text-lg">No Active Emergencies.</p>
//                 <p className="text-gray-500 text-sm">Everything is calm at {userInfo.station}.</p>
//             </div>
//         ) : (
//             <div className="grid gap-3 md:gap-4">
//                 {alerts.map(alert => {
//                     const isAssignedToMe = alert.assignedOfficer === `${userInfo.designation} ${userInfo.firstName} ${userInfo.lastName}` || 
//                                            alert.assignedOfficer.includes(userInfo.firstName);
                    
//                     return (
//                         <div key={alert._id} className="bg-gray-900 border-2 border-red-600 p-4 md:p-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.2)] flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-red-900/40 transition-all">
                            
//                             <div className="flex-1">
//                                 <div className="flex gap-2 mb-3">
//                                     <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-bold uppercase animate-pulse">CRITICAL SOS</span>
//                                     <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-[10px] md:text-xs font-mono">
//                                         {new Date(alert.createdAt).toLocaleTimeString()}
//                                     </span>
//                                 </div>
//                                 <h3 className="text-lg md:text-xl font-bold text-white mb-2">{alert.crimeType}</h3>
//                                 <p className="text-gray-300 bg-red-900/20 p-3 rounded border border-red-500/30 text-sm mb-4 italic">
//                                     "{alert.description}"
//                                 </p>
//                                 <div className="flex flex-wrap gap-4 text-sm text-gray-400 bg-black/20 p-3 rounded-lg">
//                                     <p className="flex items-center gap-2">
//                                         <FaUser className="text-gray-500" /> 
//                                         <strong className="text-gray-500">Citizen:</strong> 
//                                         <span className="text-white">{alert.reporterName}</span>
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="md:w-72 flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pt-0 pl-0 md:pl-6">
                                
//                                 {/* ✅ Live Tracking Button */}
//                                 <button 
//                                     onClick={() => handleLiveTracking(alert._id)}
//                                     className="w-full py-2.5 md:py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
//                                 >
//                                     <FaMapMarkerAlt /> View Live Tracking
//                                 </button>

//                                 {alert.assignedOfficer === "Not Assigned" || !alert.assignedOfficer ? (
//                                     <button 
//                                         onClick={() => assignToMe(alert._id)}
//                                         className="w-full py-2.5 md:py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 animate-bounce hover:animate-none transition-all shadow-lg shadow-red-900/50 text-sm md:text-base"
//                                     >
//                                         <FaUserShield /> ACCEPT & ASSIGN
//                                     </button>
//                                 ) : isAssignedToMe ? (
//                                     <button 
//                                         onClick={() => setChatData(alert)}
//                                         className="w-full py-2.5 md:py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-green-900/30 transition-transform active:scale-95 text-sm md:text-base"
//                                     >
//                                         <FaPhoneAlt /> Open Secure Line
//                                     </button>
//                                 ) : (
//                                     <div className="bg-gray-800 p-3 rounded-lg text-center border border-gray-700">
//                                         <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold mb-1">Handled By</p>
//                                         <div className="flex items-center justify-center gap-2 text-yellow-500 font-bold text-sm">
//                                             <FaCheckCircle /> {alert.assignedOfficer}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         )}
//     </div>
//   );
// };

// export default EmergencyAlerts;







import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaExclamationTriangle, 
  FaUserShield, 
  FaCheckCircle, 
  FaUser, 
  FaSyncAlt, 
  FaClock 
} from "react-icons/fa";
import SkeletonLoader from "../common/SkeletonLoader";


const EmergencyAlerts = ({ onSOSResolved }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatData, setChatData] = useState(null); 

  const navigate = useNavigate(); 
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const fetchAlerts = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      const { data } = await axios.get("http://localhost:5000/api/crime/all", config);
      
      const sosAlerts = data.filter(c => 
          (c.isSOS === true || c.isSOS === "true") && 
          c.status !== "Closed" &&
          c.selectedStation?.trim() === userInfo.station?.trim()
      );
      
      setAlerts(sosAlerts);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchAlerts();
      const interval = setInterval(fetchAlerts, 5000);
      return () => clearInterval(interval);
  }, []);

  const assignToMe = async (id) => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.put(`http://localhost:5000/api/crime/update/${id}`, { action: "assign_self" }, config);
        
        toast.success("Emergency Case Assigned to You!");
        
        if (onSOSResolved) {
            onSOSResolved(); 
        }

        fetchAlerts(); 
      } catch (error) { 
          toast.error("Assignment Failed"); 
          console.error(error);
      }
  };

  const handleLiveTracking = (alertId) => {
      navigate(`/police/live-tracking/${alertId}`);
  };

  if (chatData) {
      return (
        <ContactPage 
            complaint={chatData} 
            currentUser={userInfo} 
            onBack={() => setChatData(null)} 
        />
      );
  }

  return (
    <div className="space-y-6">
        
        {/* --- Header Panel --- */}
        <div className="bg-gradient-to-r from-red-900/80 to-slate-900 p-6 rounded-2xl border border-red-500/50 flex justify-between items-center shadow-[0_0_30px_rgba(220,38,38,0.2)] backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-3 uppercase tracking-wider">
                    <FaExclamationTriangle className="text-red-500 animate-pulse" /> Active SOS Feed
                </h2>
                <p className="text-red-300/80 text-xs md:text-sm font-mono mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    Monitoring Station: <span className="text-white font-bold">{userInfo.station}</span>
                </p>
            </div>
            
            <button 
                onClick={fetchAlerts} 
                className="relative z-10 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-lg font-bold text-xs md:text-sm transition-all active:scale-95 flex items-center gap-2 shadow-lg"
            >
                <FaSyncAlt className={loading ? "animate-spin" : ""} /> REFRESH
            </button>
        </div>

        {/* --- Alerts Grid --- */}
        {loading ? <SkeletonLoader count={3} /> : alerts.length === 0 ? (
            <div className="text-center py-24 bg-slate-900/50 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                    <FaCheckCircle className="text-4xl text-green-500" />
                </div>
                <div>
                    <p className="text-white font-bold text-xl tracking-wide">ALL CLEAR</p>
                    <p className="text-slate-400 text-sm mt-1">No active emergency signals detected.</p>
                </div>
            </div>
        ) : (
            <div className="grid gap-5">
                {alerts.map(alert => {
                    const isAssignedToMe = alert.assignedOfficer === `${userInfo.designation} ${userInfo.firstName} ${userInfo.lastName}` || 
                                           alert.assignedOfficer.includes(userInfo.firstName);
                    
                    return (
                        <div key={alert._id} className="group bg-slate-900/80 border border-slate-700 hover:border-red-500/50 p-5 rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden">
                            
                            {/* Decorative Glow */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-600 to-transparent"></div>

                            <div className="flex flex-col md:flex-row gap-6 relative z-10">
                                
                                {/* --- Left: Info Section --- */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="bg-red-600/20 text-red-400 border border-red-600/30 px-3 py-1 rounded-md text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> CRITICAL
                                        </span>
                                        <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-md text-[10px] md:text-xs font-mono flex items-center gap-1">
                                            <FaClock className="text-xs" /> {new Date(alert.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">
                                        {alert.crimeType}
                                    </h3>
                                    
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed bg-slate-800/50 p-3 rounded-lg border-l-2 border-slate-600 italic">
                                        "{alert.description}"
                                    </p>

                                    <div className="flex items-center gap-3 text-sm text-slate-400 mt-2">
                                        <div className="bg-slate-800 p-2 rounded-lg flex items-center gap-2 border border-slate-700">
                                            <FaUser className="text-cyan-400" /> 
                                            <span className="font-bold text-white uppercase">{alert.reporterName}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* --- Right: Action Buttons --- */}
                                <div className="md:w-80 flex flex-col gap-3 justify-center md:pl-6 md:border-l border-slate-700/50">
                                    
                                    {/* Live Tracking Button */}
                                    <button 
                                        onClick={() => handleLiveTracking(alert._id)}
                                        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm uppercase tracking-wide rounded-xl shadow-lg shadow-cyan-900/30 flex items-center justify-center gap-2 transition-all active:scale-95 group-hover:shadow-cyan-500/20"
                                    >
                                        <FaMapMarkerAlt className="text-lg animate-bounce" /> Live Tracking
                                    </button>

                                    {/* Dynamic Action Button */}
                                    {alert.assignedOfficer === "Not Assigned" || !alert.assignedOfficer ? (
                                        <button 
                                            onClick={() => assignToMe(alert._id)}
                                            className="w-full py-3 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-black text-sm uppercase tracking-wide rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/50 transition-all active:scale-95 hover:shadow-red-500/40"
                                        >
                                            <FaUserShield className="text-lg" /> TAKE CHARGE
                                        </button>
                                    ) : isAssignedToMe ? (
                                        <button 
                                            onClick={() => setChatData(alert)}
                                            className="w-full py-3 bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-600 hover:to-emerald-500 text-white font-bold text-sm uppercase tracking-wide rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all active:scale-95"
                                        >
                                            <FaPhoneAlt /> CONTACT CITIZEN
                                        </button>
                                    ) : (
                                        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center backdrop-blur-sm">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Assigned Officer</p>
                                            <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold text-sm uppercase">
                                                <FaCheckCircle /> {alert.assignedOfficer}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
    </div>
  );
};

export default EmergencyAlerts;