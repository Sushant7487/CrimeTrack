
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
//   const [contactMode, setContactMode] = useState(false); 

//   const [formData, setFormData] = useState({
//       station: "Central Station",
//       description: "",
//       severity: "Critical"
//   });

//   const stations = ["Central Station", "Shivaji Nagar", "Kothrud", "Deccan Gymkhana", "Yerwada"];

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
//     if(!formData.description) return toast.error("Please describe the emergency!");
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
//             toast.error("Location blocked.");
//             submitSOS(0, 0);
//             setLoading(false);
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
//           setLoading(false);
//       } catch (error) {
//           toast.error("Failed to send SOS.");
//           setLoading(false);
//       }
//   };

//   if (contactMode && assignedStatus) {
//       return <ContactPage complaint={assignedStatus} currentUser={JSON.parse(localStorage.getItem("userInfo"))} onBack={() => setContactMode(false)} />;
//   }

//   return (
//     <div className="fixed inset-0 bg-red-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
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
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Nearest Station</label>
//                         <select className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500"
//                             value={formData.station} onChange={(e) => setFormData({...formData, station: e.target.value})}>
//                             {stations.map(s => <option key={s} value={s}>{s}</option>)}
//                         </select>
//                     </div>
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Emergency Description</label>
//                         <textarea className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500"
//                             rows="3" placeholder="Accident, Robbery, etc..."
//                             value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
//                     </div>
//                     <div>
//                         <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Severity Level</label>
//                         <div className="flex gap-2">
//                             {['Low', 'Medium', 'Critical'].map(level => (
//                                 <button key={level} onClick={() => setFormData({...formData, severity: level})}
//                                     className={`flex-1 py-2 rounded font-bold text-sm border ${formData.severity === level ? (level === 'Critical' ? 'bg-red-600 border-red-600 text-white' : 'bg-yellow-600 border-yellow-600 text-black') : 'bg-transparent border-gray-600 text-gray-500'}`}>
//                                     {level}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <button onClick={handleSOS} disabled={loading}
//                         className="w-full py-4 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-black text-xl uppercase rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-3">
//                         {loading ? "Locating..." : <><FaShieldAlt /> Urgently Call Police</>}
//                     </button>
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
//                                     <div><p className="text-white font-bold text-sm">{assignedStatus.assignedOfficer}</p><p className="text-gray-500 text-xs">Is heading to your location</p></div>
//                                 </div>
//                                 <button onClick={() => setContactMode(true)} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2"><FaPhoneAlt /> Call / Chat Officer</button>
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
//         <div className="bg-gray-800 p-4 flex justify-center"><button onClick={onCancel} className="text-gray-500 hover:text-white text-sm underline">Cancel & Close</button></div>
//       </motion.div>
//     </div>
//   );
// };

// export default EmergencyScreen;








import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaPhoneAlt, FaCheckDouble, FaExclamationCircle, FaShieldAlt } from "react-icons/fa";

// REMOVED: import ContactPage (not needed)

const EmergencyScreen = ({ onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [sosData, setSosData] = useState(null);
  const [assignedStatus, setAssignedStatus] = useState(null);
  // REMOVED: const [contactMode, setContactMode] = useState(false);

  const [formData, setFormData] = useState({
      station: "Central Station",
      description: "",
      severity: "Critical"
  });

  const stations = ["Central Station", "Shivaji Nagar", "Kothrud", "Deccan Gymkhana", "Yerwada"];

  useEffect(() => {
      let interval;
      if (sosSent && sosData?._id) {
          interval = setInterval(async () => {
              try {
                  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                  const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                  const { data } = await axios.get(`https://crimetrack-api.onrender.com/api/crime/track/${sosData._id}`, config);

                  if (data.assignedOfficer && data.assignedOfficer !== "Not Assigned") {
                      setAssignedStatus(data);
                      toast.success(`Officer ${data.assignedOfficer} Assigned!`);
                      clearInterval(interval);
                  }
              } catch (error) { console.error("Tracking Error"); }
          }, 5000);
      }
      return () => clearInterval(interval);
  }, [sosSent, sosData]);

  const handleSOS = async () => {
    if(!formData.description) return toast.error("Please describe the emergency!");
    setLoading(true);

    if (!navigator.geolocation) {
        toast.error("Geolocation not supported.");
        submitSOS(0, 0);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            submitSOS(latitude, longitude);
        },
        (error) => {
            toast.error("Location blocked.");
            submitSOS(0, 0);
            setLoading(false);
        }
    );
  };

  const submitSOS = async (lat, lng) => {
      try {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          const payload = {
              ...formData,
              lat, lng,
              contact: userInfo.mobile || "9999999999",
              name: userInfo.name
          };

          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.post("https://crimetrack-api.onrender.com/api/crime/sos", payload, config);

          setSosData(data);
          setSosSent(true);
          toast.success("SOS SENT! POLICE ALERTED!");
          setLoading(false);
      } catch (error) {
          toast.error("Failed to send SOS.");
          setLoading(false);
      }
  };

  // REMOVED: if (contactMode && assignedStatus) { ... } block

  return (
    <div className="fixed inset-0 bg-red-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 border-2 border-red-600 w-full max-w-lg rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.5)] overflow-hidden"
      >
        <div className="bg-red-600 p-6 text-center animate-pulse">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest flex justify-center items-center gap-3">
                <FaExclamationCircle /> Emergency SOS
            </h2>
            <p className="text-white font-bold text-sm mt-1">LIVE LOCATION TRACKING ENABLED</p>
        </div>

        <div className="p-8 space-y-6">
            {!sosSent ? (
                <>
                    <div>
                        <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Nearest Station</label>
                        <select className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500"
                            value={formData.station} onChange={(e) => setFormData({...formData, station: e.target.value})}>
                            {stations.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Emergency Description</label>
                        <textarea className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white outline-none focus:border-red-500"
                            rows="3" placeholder="Accident, Robbery, etc..."
                            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                    </div>
                    <div>
                        <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Severity Level</label>
                        <div className="flex gap-2">
                            {['Low', 'Medium', 'Critical'].map(level => (
                                <button key={level} onClick={() => setFormData({...formData, severity: level})}
                                    className={`flex-1 py-2 rounded font-bold text-sm border ${formData.severity === level ? (level === 'Critical' ? 'bg-red-600 border-red-600 text-white' : 'bg-yellow-600 border-yellow-600 text-black') : 'bg-transparent border-gray-600 text-gray-500'}`}>
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleSOS} disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-black text-xl uppercase rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-3">
                        {loading ? "Locating..." : <><FaShieldAlt /> Urgently Call Police</>}
                    </button>
                </>
            ) : (
                <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-green-500 animate-bounce">
                        <FaCheckDouble className="text-4xl text-green-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">Alert Sent Successfully!</h3>
                        <p className="text-gray-400 text-sm mt-2">Station: <span className="text-red-400">{formData.station}</span><br/>Tracking enabled.</p>
                    </div>
                    <div className="bg-black/40 p-4 rounded-xl border border-gray-700">
                        {assignedStatus ? (
                            <div className="space-y-4">
                                <p className="text-green-400 font-bold uppercase text-sm">✅ Officer Assigned</p>
                                <div className="bg-gray-800 p-3 rounded flex items-center gap-3 text-left">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">👮‍♂️</div>
                                    <div><p className="text-white font-bold text-sm">{assignedStatus.assignedOfficer}</p><p className="text-gray-500 text-xs">Is heading to your location</p></div>
                                </div>
                                {/* Removed Call/Chat button here */}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                <p className="text-yellow-500 text-xs font-bold uppercase animate-pulse">Waiting for Officer Response...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
        <div className="bg-gray-800 p-4 flex justify-center"><button onClick={onCancel} className="text-gray-500 hover:text-white text-sm underline">Cancel & Close</button></div>
      </motion.div>
    </div>
  );
};

export default EmergencyScreen;
