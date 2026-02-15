// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { FaPhoneAlt, FaCheckDouble, FaExclamationCircle, FaShieldAlt } from "react-icons/fa";

// const EmergencyScreen = ({ onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   const [sosSent, setSosSent] = useState(false);
//   const [sosData, setSosData] = useState(null); 
//   const [assignedStatus, setAssignedStatus] = useState(null); 
//   // const [contactMode, setContactMode] = useState(false); // ❌ Hata diya kyunki ContactPage nahi hai

//   const [formData, setFormData] = useState({
//       station: "Central Station",
//       description: "",
//       severity: "Critical"
//   });

//   const stations = [
//       "Ramnagar Police Station", 
//       "City Kotwali", 
//       "MIDC Police Station", 
//       "Durgapur Police Station", 
//       "Ghugus Police Station"
//   ];

//   // Poll for Officer Assignment
//   useEffect(() => {
//       let interval;
//       if (sosSent && sosData?._id) {
//           interval = setInterval(async () => {
//               try {
//                   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//                   const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//                   const { data } = await axios.get(`https://crimetrack-api.onrender.com/api/crime/track/${sosData._id}`, config);
                  
//                   if (data.assignedOfficer && data.assignedOfficer !== "Not Assigned") {
//                       setAssignedStatus(data);
//                       toast.success(`Officer ${data.assignedOfficer} Assigned!`);
//                       clearInterval(interval);
//                   }
//               } catch (error) { console.error("Tracking Error"); }
//           }, 5000); 
//       }
//       return () => clearInterval(interval);
//   }, [sosSent, sosData]);

//   const handleSOS = async () => {
//     if(!formData.description.trim()) return toast.error("Please describe the emergency!");
//     setLoading(true);
    
//     if (!navigator.geolocation) {
//         toast.error("Geolocation not supported.");
//         submitSOS(0, 0);
//         return;
//     }

//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const { latitude, longitude } = position.coords;
//             submitSOS(latitude, longitude);
//         },
//         (error) => {
//             toast.error("Location blocked. Sending alert without precise location.");
//             submitSOS(0, 0);
//         }
//     );
//   };

//   const submitSOS = async (lat, lng) => {
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const payload = {
//               ...formData,
//               lat, lng,
//               contact: userInfo.mobile || "9999999999",
//               name: userInfo.name
//           };

//           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//           const { data } = await axios.post("https://crimetrack-api.onrender.com/api/crime/sos", payload, config);
          
//           setSosData(data);
//           setSosSent(true);
//           toast.success("SOS SENT! POLICE ALERTED!");
//       } catch (error) {
//           console.error(error);
//           toast.error("Failed to send SOS.");
//       } finally {
//           setLoading(false);
//       }
//   };

//   // ❌ Woh "ContactPage" wala IF block yahan se hata diya hai

//   return (
//     <div className="fixed inset-0 bg-red-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-md">
//       <motion.div 
//         initial={{ scale: 0.8, opacity: 0 }} 
//         animate={{ scale: 1, opacity: 1 }} 
//         className="bg-gray-900 border-2 border-red-600 w-full max-w-lg rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.5)] overflow-hidden"
//       >
//         <div className="bg-red-600 p-6 text-center animate-pulse">
//             <h2 className="text-3xl font-black text-white uppercase tracking-widest flex justify-center items-center gap-3">
//                 <FaExclamationCircle /> Emergency SOS
//             </h2>
//             <p className="text-white font-bold text-sm mt-1">LIVE LOCATION TRACKING ENABLED</p>
//         </div>

//         <div className="p-8 space-y-6">
//             {!sosSent ? (
//                 <>
//                     {/* --- FORM SECTION START --- */}
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Nearest Police Station</label>
//                         <select 
//                             className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500"
//                             value={formData.station} 
//                             onChange={(e) => setFormData({...formData, station: e.target.value})}
//                         >
//                             <option value="">-- Select Station --</option>
//                             {stations.map(s => <option key={s} value={s}>{s}</option>)}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Emergency Description</label>
//                         <textarea 
//                             className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500"
//                             rows="3" 
//                             placeholder="Describe incident (e.g. Accident, Theft in progress)..."
//                             value={formData.description} 
//                             onChange={(e) => setFormData({...formData, description: e.target.value})}
//                         ></textarea>
//                     </div>

//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Severity Level</label>
//                         <div className="flex gap-2">
//                             {['Low', 'Medium', 'Critical'].map(level => (
//                                 <button 
//                                     key={level} 
//                                     onClick={() => setFormData({...formData, severity: level})}
//                                     className={`flex-1 py-2 rounded font-bold text-sm border ${
//                                         formData.severity === level 
//                                         ? (level === 'Critical' ? 'bg-red-600 border-red-600 text-white' : 'bg-yellow-600 border-yellow-600 text-black') 
//                                         : 'bg-transparent border-gray-600 text-gray-500'
//                                     }`}
//                                 >
//                                     {level}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     <button 
//                         onClick={handleSOS} 
//                         disabled={loading}
//                         className="w-full py-4 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-black text-xl uppercase rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-3"
//                     >
//                         {loading ? "Locating..." : <><FaShieldAlt /> Urgently Call Police</>}
//                     </button>
//                     {/* --- FORM SECTION END --- */}
//                 </>
//             ) : (
//                 <div className="text-center space-y-6">
//                     <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-green-500 animate-bounce">
//                         <FaCheckDouble className="text-4xl text-green-500" />
//                     </div>
//                     <div>
//                         <h3 className="text-2xl font-bold text-white">Alert Sent Successfully!</h3>
//                         <p className="text-gray-400 text-sm mt-2">Station: <span className="text-red-400">{formData.station}</span><br/>Tracking enabled.</p>
//                     </div>
                    
//                     <div className="bg-black/40 p-4 rounded-xl border border-gray-700">
//                         {assignedStatus ? (
//                             <div className="space-y-4">
//                                 <p className="text-green-400 font-bold uppercase text-sm">✅ Officer Assigned</p>
//                                 <div className="bg-gray-800 p-3 rounded flex items-center gap-3 text-left">
//                                     <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">👮‍♂️</div>
//                                     <div>
//                                         <p className="text-white font-bold text-sm">{assignedStatus.assignedOfficer}</p>
//                                         <p className="text-gray-500 text-xs">Is heading to your location</p>
//                                     </div>
//                                 </div>
//                                 {/* ❌ Button temporarily disabled/removed because ContactPage is deleted */}
//                                 <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-200 text-xs">
//                                    Stay where you are. Officer is on the way.
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="flex flex-col items-center gap-2">
//                                 <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
//                                 <p className="text-yellow-500 text-xs font-bold uppercase animate-pulse">Waiting for Officer Response...</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
        
//         <div className="bg-gray-800 p-4 flex justify-center">
//             <button onClick={onCancel} className="text-gray-500 hover:text-white text-sm underline">Cancel & Close</button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default EmergencyScreen;










// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { toast } from "react-hot-toast";
// // import axios from "axios";
// // import { FaPhoneAlt, FaCheckDouble, FaExclamationCircle, FaShieldAlt } from "react-icons/fa";


// // const EmergencyScreen = ({ onCancel }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [sosSent, setSosSent] = useState(false);
// //   const [sosData, setSosData] = useState(null); 
// //   const [assignedStatus, setAssignedStatus] = useState(null); 
// //   const [contactMode, setContactMode] = useState(false); 

// //   const [formData, setFormData] = useState({
// //       station: "Central Station", // Default value
// //       description: "",
// //       severity: "Critical"
// //   });

// //   const stations = [
// //       "Ramnagar Police Station", 
// //       "City Kotwali", 
// //       "MIDC Police Station", 
// //       "Durgapur Police Station", 
// //       "Ghugus Police Station"
// //   ];

// //   // Poll for Officer Assignment
// //   useEffect(() => {
// //       let interval;
// //       if (sosSent && sosData?._id) {
// //           interval = setInterval(async () => {
// //               try {
// //                   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
// //                   const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
// //                   const { data } = await axios.get(`https://crimetrack-api.onrender.com/api/crime/track/${sosData._id}`, config);
                  
// //                   if (data.assignedOfficer && data.assignedOfficer !== "Not Assigned") {
// //                       setAssignedStatus(data);
// //                       toast.success(`Officer ${data.assignedOfficer} Assigned!`);
// //                       clearInterval(interval);
// //                   }
// //               } catch (error) { console.error("Tracking Error"); }
// //           }, 5000); 
// //       }
// //       return () => clearInterval(interval);
// //   }, [sosSent, sosData]);

// //   const handleSOS = async () => {
// //     if(!formData.description.trim()) return toast.error("Please describe the emergency!");
// //     setLoading(true);
    
// //     if (!navigator.geolocation) {
// //         toast.error("Geolocation not supported.");
// //         submitSOS(0, 0);
// //         return;
// //     }

// //     navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //             const { latitude, longitude } = position.coords;
// //             submitSOS(latitude, longitude);
// //         },
// //         (error) => {
// //             toast.error("Location blocked. Sending alert without precise location.");
// //             submitSOS(0, 0);
// //         }
// //     );
// //   };

// //   const submitSOS = async (lat, lng) => {
// //       try {
// //           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
// //           const payload = {
// //               ...formData,
// //               lat, lng,
// //               contact: userInfo.mobile || "9999999999",
// //               name: userInfo.name
// //           };

// //           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
// //           // Make sure this matches your backend route
// //           const { data } = await axios.post("https://crimetrack-api.onrender.com/api/crime/sos", payload, config);
          
// //           setSosData(data);
// //           setSosSent(true);
// //           toast.success("SOS SENT! POLICE ALERTED!");
// //       } catch (error) {
// //           console.error(error);
// //           toast.error("Failed to send SOS.");
// //       } finally {
// //           setLoading(false);
// //       }
// //   };

// //   if (contactMode && assignedStatus) {
// //       return <ContactPage complaint={assignedStatus} currentUser={JSON.parse(localStorage.getItem("userInfo"))} onBack={() => setContactMode(false)} />;
// //   }

// //   return (
// //     <div className="fixed inset-0 bg-red-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-md">
// //       <motion.div 
// //         initial={{ scale: 0.8, opacity: 0 }} 
// //         animate={{ scale: 1, opacity: 1 }} 
// //         className="bg-gray-900 border-2 border-red-600 w-full max-w-lg rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.5)] overflow-hidden"
// //       >
// //         <div className="bg-red-600 p-6 text-center animate-pulse">
// //             <h2 className="text-3xl font-black text-white uppercase tracking-widest flex justify-center items-center gap-3">
// //                 <FaExclamationCircle /> Emergency SOS
// //             </h2>
// //             <p className="text-white font-bold text-sm mt-1">LIVE LOCATION TRACKING ENABLED</p>
// //         </div>

// //         <div className="p-8 space-y-6">
// //             {!sosSent ? (
// //                 <>
// //                     {/* --- FORM SECTION START --- */}
// //                     <div>
// //                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Nearest Police Station</label>
// //                         <select 
// //                             className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500"
// //                             value={formData.station} 
// //                             onChange={(e) => setFormData({...formData, station: e.target.value})}
// //                         >
// //                             <option value="">-- Select Station --</option>
// //                             {stations.map(s => <option key={s} value={s}>{s}</option>)}
// //                         </select>
// //                     </div>

// //                     <div>
// //                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Emergency Description</label>
// //                         <textarea 
// //                             className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500"
// //                             rows="3" 
// //                             placeholder="Describe incident (e.g. Accident, Theft in progress)..."
// //                             value={formData.description} 
// //                             onChange={(e) => setFormData({...formData, description: e.target.value})}
// //                         ></textarea>
// //                     </div>

// //                     <div>
// //                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Severity Level</label>
// //                         <div className="flex gap-2">
// //                             {['Low', 'Medium', 'Critical'].map(level => (
// //                                 <button 
// //                                     key={level} 
// //                                     onClick={() => setFormData({...formData, severity: level})}
// //                                     className={`flex-1 py-2 rounded font-bold text-sm border ${
// //                                         formData.severity === level 
// //                                         ? (level === 'Critical' ? 'bg-red-600 border-red-600 text-white' : 'bg-yellow-600 border-yellow-600 text-black') 
// //                                         : 'bg-transparent border-gray-600 text-gray-500'
// //                                     }`}
// //                                 >
// //                                     {level}
// //                                 </button>
// //                             ))}
// //                         </div>
// //                     </div>

// //                     <button 
// //                         onClick={handleSOS} 
// //                         disabled={loading}
// //                         className="w-full py-4 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-black text-xl uppercase rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-3"
// //                     >
// //                         {loading ? "Locating..." : <><FaShieldAlt /> Urgently Call Police</>}
// //                     </button>
// //                     {/* --- FORM SECTION END --- */}
// //                 </>
// //             ) : (
// //                 <div className="text-center space-y-6">
// //                     <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-green-500 animate-bounce">
// //                         <FaCheckDouble className="text-4xl text-green-500" />
// //                     </div>
// //                     <div>
// //                         <h3 className="text-2xl font-bold text-white">Alert Sent Successfully!</h3>
// //                         <p className="text-gray-400 text-sm mt-2">Station: <span className="text-red-400">{formData.station}</span><br/>Tracking enabled.</p>
// //                     </div>
                    
// //                     <div className="bg-black/40 p-4 rounded-xl border border-gray-700">
// //                         {assignedStatus ? (
// //                             <div className="space-y-4">
// //                                 <p className="text-green-400 font-bold uppercase text-sm">✅ Officer Assigned</p>
// //                                 <div className="bg-gray-800 p-3 rounded flex items-center gap-3 text-left">
// //                                     <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">👮‍♂️</div>
// //                                     <div>
// //                                         <p className="text-white font-bold text-sm">{assignedStatus.assignedOfficer}</p>
// //                                         <p className="text-gray-500 text-xs">Is heading to your location</p>
// //                                     </div>
// //                                 </div>
// //                                 <button onClick={() => setContactMode(true)} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2">
// //                                     <FaPhoneAlt /> Call / Chat Officer
// //                                 </button>
// //                             </div>
// //                         ) : (
// //                             <div className="flex flex-col items-center gap-2">
// //                                 <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
// //                                 <p className="text-yellow-500 text-xs font-bold uppercase animate-pulse">Waiting for Officer Response...</p>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
        
// //         <div className="bg-gray-800 p-4 flex justify-center">
// //             <button onClick={onCancel} className="text-gray-500 hover:text-white text-sm underline">Cancel & Close</button>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default EmergencyScreen;







// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { FaCheckDouble, FaExclamationCircle, FaShieldAlt, FaSyncAlt } from "react-icons/fa";
// import { io } from "socket.io-client";

// const ENDPOINT = "https://crimetrack-api.onrender.com";

// const EmergencyScreen = ({ onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   const [sosSent, setSosSent] = useState(false);
//   const [sosData, setSosData] = useState(null);
//   const [assignedStatus, setAssignedStatus] = useState(null);

//   // ✅ DYNAMIC STATIONS STATE
//   const [stations, setStations] = useState([]);
//   const [loadingStations, setLoadingStations] = useState(true);

//   const [formData, setFormData] = useState({
//       station: "", // Initially empty
//       description: "",
//       severity: "Critical"
//   });

//   const socketRef = useRef(null);

//   // ✅ 1. FETCH STATIONS FROM BACKEND
//   useEffect(() => {
//       const fetchStations = async () => {
//           try {
//               // Metadata endpoint se stations lao
//               const { data } = await axios.get(`${ENDPOINT}/api/metadata/all`);
              
//               if (data.stations && data.stations.length > 0) {
//                   // Extract names from station objects
//                   const stationNames = data.stations.map(s => s.name);
//                   setStations(stationNames);
                  
//                   // Default to first station
//                   setFormData(prev => ({ ...prev, station: stationNames[0] }));
//               } else {
//                   toast.error("No stations found in database.");
//               }
//           } catch (error) {
//               console.error("Station Fetch Error:", error);
//               toast.error("Failed to load police stations.");
//           } finally {
//               setLoadingStations(false);
//           }
//       };

//       fetchStations();
//   }, []);

//   // ✅ 2. SOCKET CONNECTION
//   useEffect(() => {
//       if (!socketRef.current) {
//           socketRef.current = io(ENDPOINT, { transports: ['websocket'], reconnection: true });
//           socketRef.current.on("connect", () => console.log("🟢 Citizen Socket Connected"));
//       }
//       return () => {
//           if (socketRef.current) { socketRef.current.disconnect(); socketRef.current = null; }
//       };
//   }, []);

//   // ✅ 3. TRACKING LOGIC (Running after SOS sent)
//   useEffect(() => {
//       let interval;
//       if (sosSent && sosData?._id) {
//           interval = setInterval(async () => {
//               try {
//                   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//                   const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//                   const { data } = await axios.get(`${ENDPOINT}/api/crime/track/${sosData._id}`, config);

//                   if (data.assignedOfficer && data.assignedOfficer !== "Not Assigned") {
//                       setAssignedStatus(data);
//                       toast.success(`Officer ${data.assignedOfficer} Assigned!`);
//                       clearInterval(interval);
//                   }
//               } catch (error) { console.error("Tracking Error"); }
//           }, 5000);
//       }
//       return () => clearInterval(interval);
//   }, [sosSent, sosData]);

//   const handleSOS = async () => {
//     if(!formData.station) return toast.error("Please select a Police Station!");
//     if(!formData.description) return toast.error("Please describe the emergency!");
//     setLoading(true);

//     if (!navigator.geolocation) {
//         toast.error("Geolocation not supported.");
//         submitSOS(0, 0);
//         return;
//     }

//     navigator.geolocation.getCurrentPosition(
//         (position) => { submitSOS(position.coords.latitude, position.coords.longitude); },
//         (error) => { toast.error("Location blocked."); submitSOS(0, 0); setLoading(false); }
//     );
//   };

//   const submitSOS = async (lat, lng) => {
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const payload = { ...formData, lat, lng, contact: userInfo.mobile || "9999999999", name: userInfo.name };
//           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          
//           const { data } = await axios.post(`${ENDPOINT}/api/crime/sos`, payload, config);

//           if (socketRef.current) {
//               console.log("🚀 Emitting SOS...");
//               socketRef.current.emit("sos_alert", data); 
//           }

//           setSosData(data);
//           setSosSent(true);
//           toast.success("SOS SENT! POLICE ALERTED!");
//           setLoading(false);
//       } catch (error) {
//           toast.error("Failed to send SOS.");
//           setLoading(false);
//       }
//   };

//   return (
//     <div className="fixed inset-0 bg-red-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
//       <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gray-900 border-2 border-red-600 w-full max-w-lg rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.5)] overflow-hidden">
//         <div className="bg-red-600 p-6 text-center animate-pulse">
//             <h2 className="text-3xl font-black text-white uppercase tracking-widest flex justify-center items-center gap-3"><FaExclamationCircle /> Emergency SOS</h2>
//             <p className="text-white font-bold text-sm mt-1">LIVE LOCATION TRACKING ENABLED</p>
//         </div>
//         <div className="p-8 space-y-6">
//             {!sosSent ? (
//                 <>
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Select Nearest Station</label>
//                         {loadingStations ? (
//                             <div className="text-white text-sm animate-pulse flex items-center gap-2"><FaSyncAlt className="animate-spin"/> Loading Stations from Database...</div>
//                         ) : (
//                             <select className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500" value={formData.station} onChange={(e) => setFormData({...formData, station: e.target.value})}>
//                                 <option value="" disabled>-- Select Police Station --</option>
//                                 {stations.map(st => <option key={st} value={st}>{st}</option>)}
//                             </select>
//                         )}
//                     </div>
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Emergency Description</label>
//                         <textarea className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500" rows="3" placeholder="Accident, Robbery, etc..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
//                     </div>
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Severity Level</label>
//                         <div className="flex gap-2">
//                             {['Low', 'Medium', 'Critical'].map(level => (
//                                 <button key={level} onClick={() => setFormData({...formData, severity: level})} className={`flex-1 py-2 rounded font-bold text-sm border ${formData.severity === level ? (level === 'Critical' ? 'bg-red-600 border-red-600 text-white' : 'bg-yellow-600 border-yellow-600 text-black') : 'bg-transparent border-gray-600 text-gray-500'}`}>{level}</button>
//                             ))}
//                         </div>
//                     </div>
//                     <button onClick={handleSOS} disabled={loading || loadingStations} className="w-full py-4 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-black text-xl uppercase rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
//                         {loading ? "Locating..." : <><FaShieldAlt /> Urgently Call Police</>}
//                     </button>
//                 </>
//             ) : (
//                 <div className="text-center space-y-6">
//                     <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-green-500 animate-bounce"><FaCheckDouble className="text-4xl text-green-500" /></div>
//                     <div><h3 className="text-2xl font-bold text-white">Alert Sent Successfully!</h3><p className="text-gray-400 text-sm mt-2">Station: <span className="text-red-400">{formData.station}</span><br/>Tracking enabled.</p></div>
//                     <div className="bg-black/40 p-4 rounded-xl border border-gray-700">
//                         {assignedStatus ? (
//                             <div className="space-y-4"><p className="text-green-400 font-bold uppercase text-sm">✅ Officer Assigned</p><div className="bg-gray-800 p-3 rounded flex items-center gap-3 text-left"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">👮‍♂️</div><div><p className="text-white font-bold text-sm">{assignedStatus.assignedOfficer}</p><p className="text-gray-500 text-xs">Is heading to your location</p></div></div></div>
//                         ) : (
//                             <div className="flex flex-col items-center gap-2"><div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div><p className="text-yellow-500 text-xs font-bold uppercase animate-pulse">Waiting for Officer Response...</p></div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//         <div className="bg-gray-800 p-4 flex justify-center"><button onClick={onCancel} className="text-gray-500 hover:text-white text-sm underline">Cancel & Close</button></div>
//       </motion.div>
//     </div>
//   );
// };

// export default EmergencyScreen;





// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { FaCheckDouble, FaExclamationCircle, FaShieldAlt, FaSyncAlt } from "react-icons/fa";
// import { io } from "socket.io-client";

// const ENDPOINT = "https://crimetrack-api.onrender.com";

// const EmergencyScreen = ({ onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   const [sosSent, setSosSent] = useState(false);
//   const [sosData, setSosData] = useState(null);
//   const [assignedStatus, setAssignedStatus] = useState(null);
//   const [stations, setStations] = useState([]);
//   const [loadingStations, setLoadingStations] = useState(true);

//   const [formData, setFormData] = useState({
//       station: "",
//       description: "",
//       severity: "Critical"
//   });

//   const socketRef = useRef(null);
//   const trackingIntervalRef = useRef(null); // ✅ Ref for Tracking Loop

//   // 1. Fetch Stations
//   useEffect(() => {
//       const fetchStations = async () => {
//           try {
//               const { data } = await axios.get(`${ENDPOINT}/api/metadata/all`);
//               if (data.stations && data.stations.length > 0) {
//                   const stationNames = data.stations.map(s => s.name);
//                   setStations(stationNames);
//                   setFormData(prev => ({ ...prev, station: stationNames[0] }));
//               } else {
//                   toast.error("No stations found.");
//               }
//           } catch (error) { toast.error("Failed to load stations."); } 
//           finally { setLoadingStations(false); }
//       };
//       fetchStations();
//   }, []);

//   // 2. Socket Connection
//   useEffect(() => {
//       if (!socketRef.current) {
//           socketRef.current = io(ENDPOINT, { transports: ['websocket'], reconnection: true });
//       }
//       return () => {
//           if (socketRef.current) { socketRef.current.disconnect(); socketRef.current = null; }
//       };
//   }, []);

//   // 3. Officer Assignment Tracking & ✅ LIVE LOCATION PUSH
//   useEffect(() => {
//       // Logic 1: Poll for Officer Assignment
//       let statusInterval;
//       if (sosSent && sosData?._id) {
//           statusInterval = setInterval(async () => {
//               try {
//                   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//                   const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//                   const { data } = await axios.get(`${ENDPOINT}/api/crime/track/${sosData._id}`, config);

//                   if (data.assignedOfficer && data.assignedOfficer !== "Not Assigned") {
//                       setAssignedStatus(data);
//                       toast.success(`Officer ${data.assignedOfficer} Assigned!`);
//                       clearInterval(statusInterval);
//                   }
//               } catch (error) { console.error("Tracking Error"); }
//           }, 5000);

//           // Logic 2: ✅ Send Live Location Updates
//           console.log("📍 Live Tracking Started...");
//           trackingIntervalRef.current = setInterval(() => {
//             navigator.geolocation.getCurrentPosition(
//                 async (position) => {
//                     const { latitude, longitude } = position.coords;
//                     try {
//                         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//                         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//                         // Hit new backend route
//                         await axios.put(`${ENDPOINT}/api/crime/track/update/${sosData._id}`, { lat: latitude, lng: longitude }, config);
//                     } catch (err) { console.error("Loc Update Failed"); }
//                 },
//                 (err) => console.error(err),
//                 { enableHighAccuracy: true }
//             );
//           }, 5000); // Every 5 seconds
//       }

//       return () => {
//           if (statusInterval) clearInterval(statusInterval);
//           if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
//       };
//   }, [sosSent, sosData]);

//   const handleSOS = async () => {
//     if(!formData.station) return toast.error("Please select a Police Station!");
//     if(!formData.description) return toast.error("Please describe the emergency!");
//     setLoading(true);

//     if (!navigator.geolocation) {
//         toast.error("GPS not supported.");
//         submitSOS(0, 0);
//         return;
//     }

//     navigator.geolocation.getCurrentPosition(
//         (position) => { submitSOS(position.coords.latitude, position.coords.longitude); },
//         (error) => { toast.error("Location blocked."); submitSOS(0, 0); setLoading(false); }
//     );
//   };

//   const submitSOS = async (lat, lng) => {
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const payload = { ...formData, lat, lng, contact: userInfo.mobile || "9999999999", name: userInfo.name };
//           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          
//           const { data } = await axios.post(`${ENDPOINT}/api/crime/sos`, payload, config);

//           if (socketRef.current) socketRef.current.emit("sos_alert", data); 

//           setSosData(data);
//           setSosSent(true);
//           toast.success("SOS SENT! LIVE TRACKING ON.");
//           setLoading(false);
//       } catch (error) {
//           toast.error("Failed to send SOS.");
//           setLoading(false);
//       }
//   };

//   return (
//     <div className="fixed inset-0 bg-red-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
//       <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gray-900 border-2 border-red-600 w-full max-w-lg rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.5)] overflow-hidden">
//         <div className="bg-red-600 p-6 text-center animate-pulse">
//             <h2 className="text-3xl font-black text-white uppercase tracking-widest flex justify-center items-center gap-3"><FaExclamationCircle /> Emergency SOS</h2>
//             <p className="text-white font-bold text-sm mt-1">LIVE LOCATION TRACKING ENABLED</p>
//         </div>
//         <div className="p-8 space-y-6">
//             {!sosSent ? (
//                 <>
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Select Nearest Station</label>
//                         {loadingStations ? (
//                             <div className="text-white text-sm animate-pulse flex items-center gap-2"><FaSyncAlt className="animate-spin"/> Loading Stations...</div>
//                         ) : (
//                             <select className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500" value={formData.station} onChange={(e) => setFormData({...formData, station: e.target.value})}>
//                                 <option value="" disabled>-- Select Police Station --</option>
//                                 {stations.map(st => <option key={st} value={st}>{st}</option>)}
//                             </select>
//                         )}
//                     </div>
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Emergency Description</label>
//                         <textarea className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500" rows="3" placeholder="Accident, Robbery, etc..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
//                     </div>
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Severity Level</label>
//                         <div className="flex gap-2">
//                             {['Low', 'Medium', 'Critical'].map(level => (
//                                 <button key={level} onClick={() => setFormData({...formData, severity: level})} className={`flex-1 py-2 rounded font-bold text-sm border ${formData.severity === level ? (level === 'Critical' ? 'bg-red-600 border-red-600 text-white' : 'bg-yellow-600 border-yellow-600 text-black') : 'bg-transparent border-gray-600 text-gray-500'}`}>{level}</button>
//                             ))}
//                         </div>
//                     </div>
//                     <button onClick={handleSOS} disabled={loading || loadingStations} className="w-full py-4 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-black text-xl uppercase rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
//                         {loading ? "Locating..." : <><FaShieldAlt /> Urgently Call Police</>}
//                     </button>
//                 </>
//             ) : (
//                 <div className="text-center space-y-6">
//                     <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-green-500 animate-bounce"><FaCheckDouble className="text-4xl text-green-500" /></div>
//                     <div><h3 className="text-2xl font-bold text-white">Alert Sent Successfully!</h3><p className="text-gray-400 text-sm mt-2">Station: <span className="text-red-400">{formData.station}</span><br/>Tracking enabled.</p></div>
//                     <div className="bg-black/40 p-4 rounded-xl border border-gray-700">
//                         {assignedStatus ? (
//                             <div className="space-y-4"><p className="text-green-400 font-bold uppercase text-sm">✅ Officer Assigned</p><div className="bg-gray-800 p-3 rounded flex items-center gap-3 text-left"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">👮‍♂️</div><div><p className="text-white font-bold text-sm">{assignedStatus.assignedOfficer}</p><p className="text-gray-500 text-xs">Is heading to your location</p></div></div></div>
//                         ) : (
//                             <div className="flex flex-col items-center gap-2"><div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div><p className="text-yellow-500 text-xs font-bold uppercase animate-pulse">Waiting for Officer Response...</p></div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//         <div className="bg-gray-800 p-4 flex justify-center"><button onClick={onCancel} className="text-gray-500 hover:text-white text-sm underline">Cancel & Close</button></div>
//       </motion.div>
//     </div>
//   );
// };

// export default EmergencyScreen;



// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { 
//   FaCheckCircle, 
//   FaShieldAlt, 
//   FaSyncAlt, 
//   FaChevronDown, 
//   FaMapMarkerAlt, 
//   FaBroadcastTower 
// } from "react-icons/fa";
// import { io } from "socket.io-client";

// const ENDPOINT = "https://crimetrack-api.onrender.com";

// const EmergencyScreen = ({ onCancel }) => {
//   // --- STATE & LOGIC (UNCHANGED) ---
//   const [loading, setLoading] = useState(false);
//   const [sosSent, setSosSent] = useState(false);
//   const [sosData, setSosData] = useState(null);
//   const [assignedStatus, setAssignedStatus] = useState(null);
//   const [stations, setStations] = useState([]);
//   const [loadingStations, setLoadingStations] = useState(true);

//   // UI State for Custom Dropdown
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const [formData, setFormData] = useState({
//       station: "",
//       description: "",
//       severity: "Critical"
//   });

//   const socketRef = useRef(null);
//   const trackingIntervalRef = useRef(null);

//   // 1. Fetch Stations
//   useEffect(() => {
//       const fetchStations = async () => {
//           try {
//               const { data } = await axios.get(`${ENDPOINT}/api/metadata/all`);
//               if (data.stations && data.stations.length > 0) {
//                   const stationNames = data.stations.map(s => s.name);
//                   setStations(stationNames);
//                   // Don't auto-select, let user choose to see animation
//                   // setFormData(prev => ({ ...prev, station: stationNames[0] }));
//               } else {
//                   toast.error("No stations found.");
//               }
//           } catch (error) { toast.error("Failed to load stations."); } 
//           finally { setLoadingStations(false); }
//       };
//       fetchStations();
//   }, []);

//   // 2. Socket Connection
//   useEffect(() => {
//       if (!socketRef.current) {
//           socketRef.current = io(ENDPOINT, { transports: ['websocket'], reconnection: true });
//       }
//       return () => {
//           if (socketRef.current) { socketRef.current.disconnect(); socketRef.current = null; }
//       };
//   }, []);

//   // 3. Tracking Logic
//   useEffect(() => {
//       let statusInterval;
//       if (sosSent && sosData?._id) {
//           statusInterval = setInterval(async () => {
//               try {
//                   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//                   const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//                   const { data } = await axios.get(`${ENDPOINT}/api/crime/track/${sosData._id}`, config);

//                   if (data.assignedOfficer && data.assignedOfficer !== "Not Assigned") {
//                       setAssignedStatus(data);
//                       toast.success(`Officer ${data.assignedOfficer} Assigned!`);
//                       clearInterval(statusInterval);
//                   }
//               } catch (error) { console.error("Tracking Error"); }
//           }, 5000);

//           trackingIntervalRef.current = setInterval(() => {
//             navigator.geolocation.getCurrentPosition(
//                 async (position) => {
//                     const { latitude, longitude } = position.coords;
//                     try {
//                         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//                         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//                         await axios.put(`${ENDPOINT}/api/crime/track/update/${sosData._id}`, { lat: latitude, lng: longitude }, config);
//                     } catch (err) { console.error("Loc Update Failed"); }
//                 },
//                 (err) => console.error(err),
//                 { enableHighAccuracy: true }
//             );
//           }, 5000);
//       }
//       return () => {
//           if (statusInterval) clearInterval(statusInterval);
//           if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
//       };
//   }, [sosSent, sosData]);

//   const handleSOS = async () => {
//     if(!formData.station) return toast.error("Please select a Police Station!");
//     if(!formData.description) return toast.error("Please describe the emergency!");
//     setLoading(true);

//     if (!navigator.geolocation) {
//         toast.error("GPS not supported.");
//         submitSOS(0, 0);
//         return;
//     }

//     navigator.geolocation.getCurrentPosition(
//         (position) => { submitSOS(position.coords.latitude, position.coords.longitude); },
//         (error) => { toast.error("Location blocked."); submitSOS(0, 0); setLoading(false); }
//     );
//   };

//   const submitSOS = async (lat, lng) => {
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const payload = { ...formData, lat, lng, contact: userInfo.mobile || "9999999999", name: userInfo.name };
//           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          
//           const { data } = await axios.post(`${ENDPOINT}/api/crime/sos`, payload, config);

//           if (socketRef.current) socketRef.current.emit("sos_alert", data); 

//           setSosData(data);
//           setSosSent(true);
//           toast.success("SOS SENT! LIVE TRACKING ON.");
//           setLoading(false);
//       } catch (error) {
//           toast.error("Failed to send SOS.");
//           setLoading(false);
//       }
//   };

//   // --- RENDER ---
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
      
//       <motion.div 
//         initial={{ scale: 0.9, opacity: 0, y: 50 }} 
//         animate={{ scale: 1, opacity: 1, y: 0 }} 
//         className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-3xl shadow-[0_0_60px_rgba(37,99,235,0.4)] overflow-hidden relative"
//       >
        
//         {/* --- Header (Blue Gradient) --- */}
//         <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 pt-8 text-center relative overflow-hidden">
//             {/* Background Decor */}
//             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            
//             <h2 className="text-2xl font-black text-white uppercase tracking-widest flex justify-center items-center gap-2 relative z-10">
//                  <FaBroadcastTower className="animate-pulse" /> EMERGENCY
//             </h2>
//             <p className="text-blue-100 font-bold text-xs mt-1 tracking-wide relative z-10 opacity-80">
//                 LIVE GEO-TRACKING SYSTEM
//             </p>
//         </div>

//         <div className="p-6 space-y-5">
//             {!sosSent ? (
//                 <>
//                     {/* --- Custom Animated Dropdown --- */}
//                     <div className="relative">
//                         <label className="text-blue-400 text-xs font-bold uppercase mb-2 block tracking-wider">
//                             Nearest Station
//                         </label>
                        
//                         <div 
//                             onClick={() => !loadingStations && setIsDropdownOpen(!isDropdownOpen)}
//                             className={`w-full bg-slate-800 border ${isDropdownOpen ? 'border-blue-400' : 'border-slate-600'} rounded-2xl p-4 flex justify-between items-center cursor-pointer transition-all hover:bg-slate-700`}
//                         >
//                             <span className={`text-sm font-bold ${formData.station ? 'text-white' : 'text-gray-400'}`}>
//                                 {formData.station || (loadingStations ? "Loading Stations..." : "Select Station")}
//                             </span>
//                             {loadingStations ? <FaSyncAlt className="animate-spin text-blue-400"/> : <FaChevronDown className={`text-blue-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}/>}
//                         </div>

//                         {/* Animated List */}
//                         <AnimatePresence>
//                             {isDropdownOpen && (
//                                 <motion.ul 
//                                     initial={{ opacity: 0, height: 0, y: -10 }}
//                                     animate={{ opacity: 1, height: "auto", y: 0 }}
//                                     exit={{ opacity: 0, height: 0, y: -10 }}
//                                     transition={{ duration: 0.3, ease: "easeInOut" }} // Slow smooth effect
//                                     className="absolute z-50 w-full bg-slate-800 border border-blue-500/30 rounded-2xl mt-2 max-h-48 overflow-y-auto shadow-xl scrollbar-hide"
//                                 >
//                                     {stations.map((st) => (
//                                         <li 
//                                             key={st}
//                                             onClick={() => { setFormData({...formData, station: st}); setIsDropdownOpen(false); }}
//                                             className="p-3 text-sm text-gray-300 font-medium border-b border-slate-700 last:border-0 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
//                                         >
//                                             {st}
//                                         </li>
//                                     ))}
//                                 </motion.ul>
//                             )}
//                         </AnimatePresence>
//                     </div>

//                     {/* --- Description --- */}
//                     <div>
//                         <label className="text-blue-400 text-xs font-bold uppercase mb-2 block tracking-wider">
//                             Situation Report
//                         </label>
//                         <textarea 
//                             className="w-full bg-slate-800 border border-slate-600 rounded-2xl p-4 text-white font-medium outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-500 text-sm" 
//                             rows="3" 
//                             placeholder="Describe incident (Theft, Accident)..." 
//                             value={formData.description} 
//                             onChange={(e) => setFormData({...formData, description: e.target.value})}
//                         ></textarea>
//                     </div>

//                     {/* --- Severity Buttons --- */}
//                     <div>
//                         <label className="text-blue-400 text-xs font-bold uppercase mb-2 block tracking-wider">
//                             Threat Level
//                         </label>
//                         <div className="flex gap-3">
//                             {['Low', 'Medium', 'Critical'].map(level => (
//                                 <button 
//                                     key={level} 
//                                     onClick={() => setFormData({...formData, severity: level})} 
//                                     className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wide border-2 transition-all transform active:scale-95
//                                     ${formData.severity === level 
//                                         ? (level === 'Critical' ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/50' : 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/50') 
//                                         : 'bg-transparent border-slate-600 text-gray-400 hover:border-gray-400'}`}
//                                 >
//                                     {level}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* --- SOS Button --- */}
//                     <button 
//                         onClick={handleSOS} 
//                         disabled={loading || loadingStations} 
//                         className="w-full py-4 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-lg uppercase rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         {loading ? (
//                             <span className="animate-pulse">Acquiring Satellites...</span>
//                         ) : (
//                             <><FaShieldAlt className="text-xl"/> TRIGGER SOS</>
//                         )}
//                     </button>
//                 </>
//             ) : (
//                 // --- SUCCESS STATE ---
//                 <div className="text-center py-6 space-y-6">
//                     <motion.div 
//                         initial={{ scale: 0 }} animate={{ scale: 1 }} 
//                         className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border-[3px] border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
//                     >
//                         <FaCheckCircle className="text-4xl text-cyan-400" />
//                     </motion.div>
                    
//                     <div>
//                         <h3 className="text-2xl font-black text-white uppercase">Help is Incoming</h3>
//                         <p className="text-gray-400 text-xs mt-2 font-medium">
//                             Station: <span className="text-cyan-400 font-bold">{formData.station}</span>
//                         </p>
//                     </div>

//                     {/* Tracking Status Card */}
//                     <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 relative overflow-hidden">
//                         {assignedStatus ? (
//                             <div className="flex items-center gap-4">
//                                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
//                                     <span className="text-xl">👮‍♂️</span>
//                                 </div>
//                                 <div className="text-left">
//                                     <p className="text-cyan-400 font-bold text-xs uppercase mb-1">Officer Assigned</p>
//                                     <p className="text-white font-bold text-lg leading-none">{assignedStatus.assignedOfficer}</p>
//                                     <p className="text-gray-500 text-[10px] mt-1">En route to your GPS location</p>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="flex flex-col items-center gap-3">
//                                 <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase animate-pulse">
//                                     <FaMapMarkerAlt /> Broadcasting Location...
//                                 </div>
//                                 <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
//                                     <motion.div 
//                                         initial={{ x: "-100%" }} 
//                                         animate={{ x: "100%" }} 
//                                         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
//                                         className="h-full bg-cyan-500 w-1/2 rounded-full"
//                                     ></motion.div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>

//         {/* Footer */}
//         <div className="bg-slate-900/50 p-4 flex justify-center border-t border-slate-800">
//             <button onClick={onCancel} className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
//                 Cancel Operation
//             </button>
//         </div>

//       </motion.div>
//     </div>
//   );
// };

// export default EmergencyScreen;














import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { 
  FaCheckCircle, 
  FaShieldAlt, 
  FaSyncAlt, 
  FaChevronDown, 
  FaMapMarkerAlt, 
  FaBroadcastTower 
} from "react-icons/fa";
import { io } from "socket.io-client";

const ENDPOINT = "https://crimetrack-api.onrender.com";

// --- HELPER: HAVERSINE FORMULA (Distance Calculation) ---
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of earth in km
    const dLat = deg2rad(lat2 - lat1); 
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; 
    return d.toFixed(1); 
};

const deg2rad = (deg) => {
  return deg * (Math.PI/180)
};

const EmergencyScreen = ({ onCancel }) => {
  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [sosData, setSosData] = useState(null);
  const [assignedStatus, setAssignedStatus] = useState(null);
  
  // Stations State
  const [stations, setStations] = useState([]); // Stores strings like "Pune Station (📍 2km)"
  const [loadingStations, setLoadingStations] = useState(true);

  // UI State for Custom Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
      station: "",
      description: "",
      severity: "Critical"
  });

  const socketRef = useRef(null);
  const trackingIntervalRef = useRef(null);

  // ✅ 1. SMART STATION FETCHING & SORTING LOGIC
  useEffect(() => {
      const initStations = async () => {
          try {
              // Fetch from DB
              const { data } = await axios.get(`${ENDPOINT}/api/metadata/all`);
              const rawStations = data.stations || [];

              if (rawStations.length === 0) {
                  toast.error("No stations available.");
                  setLoadingStations(false);
                  return;
              }

              // Try getting GPS
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                      (position) => {
                          const { latitude, longitude } = position.coords;

                          // Calculate Distances
                          const stationsWithDist = rawStations.map(st => {
                              let dist = 9999;
                              if (st.location && st.location.lat && st.location.lng) {
                                  dist = parseFloat(calculateDistance(latitude, longitude, parseFloat(st.location.lat), parseFloat(st.location.lng)));
                              }
                              return { ...st, distance: dist };
                          });

                          // Sort: Nearest First
                          stationsWithDist.sort((a, b) => a.distance - b.distance);

                          // Format Strings
                          const formattedOptions = stationsWithDist.map(st => 
                              st.distance < 9000 
                              ? `${st.name} (📍 ${st.distance} km)` 
                              : st.name
                          );

                          setStations(formattedOptions);

                          // Auto-Select Nearest (Silently)
                          if (formattedOptions.length > 0) {
                              setFormData(prev => ({ ...prev, station: formattedOptions[0] }));
                          }
                      },
                      (error) => {
                          console.warn("GPS Access Denied/Failed, loading raw list.");
                          setStations(rawStations.map(s => s.name));
                      }
                  );
              } else {
                  setStations(rawStations.map(s => s.name));
              }
          } catch (error) {
              console.error("Station Init Error:", error);
              toast.error("Failed to load police stations.");
          } finally {
              setLoadingStations(false);
          }
      };

      initStations();
  }, []);

  // 2. Socket Connection
  useEffect(() => {
      if (!socketRef.current) {
          socketRef.current = io(ENDPOINT, { transports: ['websocket'], reconnection: true });
      }
      return () => {
          if (socketRef.current) { socketRef.current.disconnect(); socketRef.current = null; }
      };
  }, []);

  // 3. Tracking Logic (Post-SOS)
  useEffect(() => {
      let statusInterval;
      if (sosSent && sosData?._id) {
          // Poll for Status Update (Officer Assigned)
          statusInterval = setInterval(async () => {
              try {
                  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                  const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                  const { data } = await axios.get(`${ENDPOINT}/api/crime/track/${sosData._id}`, config);

                  if (data.assignedOfficer && data.assignedOfficer !== "Not Assigned") {
                      setAssignedStatus(data);
                      toast.success(`Officer ${data.assignedOfficer} Assigned!`);
                      clearInterval(statusInterval);
                  }
              } catch (error) { console.error("Tracking Error"); }
          }, 5000);

          // Push Live Location Updates
          trackingIntervalRef.current = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                        await axios.put(`${ENDPOINT}/api/crime/track/update/${sosData._id}`, { lat: latitude, lng: longitude }, config);
                    } catch (err) { console.error("Loc Update Failed"); }
                },
                (err) => console.error(err),
                { enableHighAccuracy: true }
            );
          }, 5000);
      }
      return () => {
          if (statusInterval) clearInterval(statusInterval);
          if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
      };
  }, [sosSent, sosData]);

  const handleSOS = async () => {
    if(!formData.station) return toast.error("Please select a Police Station!");
    if(!formData.description) return toast.error("Please describe the emergency!");
    setLoading(true);

    if (!navigator.geolocation) {
        toast.error("GPS not supported.");
        submitSOS(0, 0);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => { submitSOS(position.coords.latitude, position.coords.longitude); },
        (error) => { toast.error("Location blocked."); submitSOS(0, 0); setLoading(false); }
    );
  };

  const submitSOS = async (lat, lng) => {
      try {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          
          // ✅ CLEAN STATION NAME (Remove distance info before sending)
          const cleanStationName = formData.station.split(' (')[0];

          const payload = { 
              ...formData, 
              station: cleanStationName, // Send only clean name
              lat, 
              lng, 
              contact: userInfo.mobile || "9999999999", 
              name: userInfo.name 
          };
          
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.post(`${ENDPOINT}/api/crime/sos`, payload, config);

          if (socketRef.current) socketRef.current.emit("sos_alert", data); 

          setSosData(data);
          setSosSent(true);
          toast.success("SOS SENT! LIVE TRACKING ON.");
          setLoading(false);
      } catch (error) {
          toast.error("Failed to send SOS.");
          setLoading(false);
      }
  };

  // --- RENDER ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 50 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-3xl shadow-[0_0_60px_rgba(37,99,235,0.4)] overflow-hidden relative"
      >
        
        {/* --- Header --- */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 pt-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest flex justify-center items-center gap-2 relative z-10">
                 <FaBroadcastTower className="animate-pulse" /> EMERGENCY
            </h2>
            <p className="text-blue-100 font-bold text-xs mt-1 tracking-wide relative z-10 opacity-80">
                LIVE GEO-TRACKING SYSTEM
            </p>
        </div>

        <div className="p-6 space-y-5">
            {!sosSent ? (
                <>
                    {/* --- Custom Animated Dropdown --- */}
                    <div className="relative">
                        <label className="text-blue-400 text-xs font-bold uppercase mb-2 block tracking-wider">
                            Nearest Station
                        </label>
                        
                        <div 
                            onClick={() => !loadingStations && setIsDropdownOpen(!isDropdownOpen)}
                            className={`w-full bg-slate-800 border ${isDropdownOpen ? 'border-blue-400' : 'border-slate-600'} rounded-2xl p-4 flex justify-between items-center cursor-pointer transition-all hover:bg-slate-700`}
                        >
                            <span className={`text-sm font-bold ${formData.station ? 'text-white' : 'text-gray-400'}`}>
                                {formData.station || (loadingStations ? "Locating nearest station..." : "Select Station")}
                            </span>
                            {loadingStations ? <FaSyncAlt className="animate-spin text-blue-400"/> : <FaChevronDown className={`text-blue-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}/>}
                        </div>

                        {/* Helper Text for Auto-Selection */}
                        {!loadingStations && formData.station.includes("km") && (
                            <p className="text-[10px] text-green-400 font-bold mt-1 ml-1 animate-pulse">
                                ● Auto-detected based on your GPS
                            </p>
                        )}

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul 
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: "auto", y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="absolute z-50 w-full bg-slate-800 border border-blue-500/30 rounded-2xl mt-2 max-h-48 overflow-y-auto shadow-xl scrollbar-hide"
                                >
                                    {stations.map((st) => (
                                        <li 
                                            key={st}
                                            onClick={() => { setFormData({...formData, station: st}); setIsDropdownOpen(false); }}
                                            className="p-3 text-sm text-gray-300 font-medium border-b border-slate-700 last:border-0 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer flex justify-between"
                                        >
                                            <span>{st}</span>
                                            {/* Green dot for nearest */}
                                            {st.includes(stations[0]) && stations[0].includes("km") && <span className="text-[9px] bg-green-500 text-black px-1.5 rounded font-bold">NEAREST</span>}
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- Description --- */}
                    <div>
                        <label className="text-blue-400 text-xs font-bold uppercase mb-2 block tracking-wider">
                            Situation Report
                        </label>
                        <textarea 
                            className="w-full bg-slate-800 border border-slate-600 rounded-2xl p-4 text-white font-medium outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-500 text-sm" 
                            rows="3" 
                            placeholder="Describe incident (Theft, Accident)..." 
                            value={formData.description} 
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>

                    {/* --- Severity Buttons --- */}
                    <div>
                        <label className="text-blue-400 text-xs font-bold uppercase mb-2 block tracking-wider">
                            Threat Level
                        </label>
                        <div className="flex gap-3">
                            {['Low', 'Medium', 'Critical'].map(level => (
                                <button 
                                    key={level} 
                                    onClick={() => setFormData({...formData, severity: level})} 
                                    className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wide border-2 transition-all transform active:scale-95
                                    ${formData.severity === level 
                                        ? (level === 'Critical' ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/50' : 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/50') 
                                        : 'bg-transparent border-slate-600 text-gray-400 hover:border-gray-400'}`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- SOS Button --- */}
                    <button 
                        onClick={handleSOS} 
                        disabled={loading || loadingStations} 
                        className="w-full py-4 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-lg uppercase rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="animate-pulse">Acquiring Satellites...</span>
                        ) : (
                            <><FaShieldAlt className="text-xl"/> TRIGGER SOS</>
                        )}
                    </button>
                </>
            ) : (
                // --- SUCCESS STATE ---
                <div className="text-center py-6 space-y-6">
                    <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} 
                        className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border-[3px] border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                    >
                        <FaCheckCircle className="text-4xl text-cyan-400" />
                    </motion.div>
                    
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase">Help is Incoming</h3>
                        <p className="text-gray-400 text-xs mt-2 font-medium">
                            Station: <span className="text-cyan-400 font-bold">{formData.station.split(' (')[0]}</span>
                        </p>
                    </div>

                    {/* Tracking Status Card */}
                    <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 relative overflow-hidden">
                        {assignedStatus ? (
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-xl">👮‍♂️</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-cyan-400 font-bold text-xs uppercase mb-1">Officer Assigned</p>
                                    <p className="text-white font-bold text-lg leading-none">{assignedStatus.assignedOfficer}</p>
                                    <p className="text-gray-500 text-[10px] mt-1">En route to your GPS location</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase animate-pulse">
                                    <FaMapMarkerAlt /> Broadcasting Location...
                                </div>
                                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ x: "-100%" }} 
                                        animate={{ x: "100%" }} 
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                        className="h-full bg-cyan-500 w-1/2 rounded-full"
                                    ></motion.div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900/50 p-4 flex justify-center border-t border-slate-800">
            <button onClick={onCancel} className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                Cancel Operation
            </button>
        </div>

      </motion.div>
    </div>
  );
};

export default EmergencyScreen;