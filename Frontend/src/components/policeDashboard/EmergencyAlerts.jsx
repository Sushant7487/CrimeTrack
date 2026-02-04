
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaMapMarkerAlt, FaPhoneAlt, FaExclamationCircle, FaUserShield, FaCheckCircle, FaUser } from "react-icons/fa";
import SkeletonLoader from "../common/SkeletonLoader";


const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatData, setChatData] = useState(null); // Chat open karne ke liye

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const fetchAlerts = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/all", config);
      
      const sosAlerts = data.filter(c => 
          c.isSOS === true && 
          c.status !== "Closed" && 
          c.selectedStation === userInfo.station
      );
      
      setAlerts(sosAlerts);
      setLoading(false);
    } catch (error) {
      console.error(error);
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
        await axios.put(`https://crimetrack-api.onrender.com/api/crime/update/${id}`, { action: "assign_self" }, config);
        toast.success("Emergency Case Assigned to You!");
        fetchAlerts();
      } catch (error) { toast.error("Assignment Failed"); }
  };

  const openMap = (lat, lng) => {
      if(!lat || !lng) return toast.error("GPS Coordinates Missing");
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  // ✅ Open Contact Page (Chat/Call)
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
    // Responsive spacing: space-y-4 for mobile, space-y-6 for desktop
    <div className="space-y-4 md:space-y-6">
        
        {/* Header: Responsive padding p-4 mobile, p-6 desktop */}
        <div className="bg-red-900/40 p-4 md:p-6 rounded-xl border border-red-500 flex justify-between items-center animate-pulse">
            <div>
                {/* Responsive text size: text-lg mobile, text-2xl desktop */}
                <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                    <FaExclamationCircle className="text-red-500" /> LIVE SOS FEED
                </h2>
                <p className="text-red-300 text-xs md:text-sm">Monitoring Station: {userInfo.station}</p>
            </div>
            <button onClick={fetchAlerts} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded font-bold text-xs md:text-sm transition-transform active:scale-95 whitespace-nowrap">
                Sync Now
            </button>
        </div>

        {loading ? <SkeletonLoader count={2} /> : alerts.length === 0 ? (
            <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
                <p className="text-green-400 font-bold text-lg">No Active Emergencies.</p>
            </div>
        ) : (
            <div className="grid gap-3 md:gap-4">
                {alerts.map(alert => {
                    const isAssignedToMe = alert.assignedOfficer === `${userInfo.designation} ${userInfo.firstName} ${userInfo.lastName}` || 
                                           alert.assignedOfficer.includes(userInfo.firstName);
                    
                    return (
                        <div key={alert._id} className="bg-gray-900 border-2 border-red-600 p-4 md:p-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.2)] flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-red-900/40 transition-all">
                            
                            <div className="flex-1">
                                <div className="flex gap-2 mb-3">
                                    <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-bold uppercase animate-pulse">CRITICAL SOS</span>
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-[10px] md:text-xs font-mono">
                                        {new Date(alert.createdAt).toLocaleTimeString()}
                                    </span>
                                </div>
                                {/* Responsive Text Size */}
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{alert.crimeType}</h3>
                                <p className="text-gray-300 bg-red-900/20 p-3 rounded border border-red-500/30 text-sm mb-4 italic">
                                    "{alert.description}"
                                </p>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-gray-400 bg-black/20 p-3 rounded-lg">
                                    {/* ✅ SIRF NAME DIKHEGA, NUMBER CHUPA DIYA */}
                                    <p className="flex items-center gap-2">
                                        <FaUser className="text-gray-500" /> 
                                        <strong className="text-gray-500">Citizen:</strong> 
                                        <span className="text-white">{alert.reporterName}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Responsive Layout for Actions: 
                                - Mobile: Top border, padding top
                                - Desktop: Left border, padding left, no top border/padding
                            */}
                            <div className="md:w-72 flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pt-0 pl-0 md:pl-6">
                                <button 
                                    onClick={() => openMap(alert.location?.lat, alert.location?.lng)}
                                    // Compact padding on mobile
                                    className="w-full py-2.5 md:py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
                                >
                                    <FaMapMarkerAlt /> View Live Location
                                </button>

                                {alert.assignedOfficer === "Not Assigned" ? (
                                    <button 
                                        onClick={() => assignToMe(alert._id)}
                                        className="w-full py-2.5 md:py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 animate-bounce hover:animate-none transition-all shadow-lg shadow-red-900/50 text-sm md:text-base"
                                    >
                                        <FaUserShield /> ACCEPT & ASSIGN
                                    </button>
                                ) : isAssignedToMe ? (
                                    // ✅ YEH BUTTON CONTACT PAGE KHOLEGA
                                    <button 
                                        onClick={() => setChatData(alert)}
                                        className="w-full py-2.5 md:py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-green-900/30 transition-transform active:scale-95 text-sm md:text-base"
                                    >
                                        <FaPhoneAlt /> Open Secure Line
                                    </button>
                                ) : (
                                    <div className="bg-gray-800 p-3 rounded-lg text-center border border-gray-700">
                                        <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold mb-1">Handled By</p>
                                        <div className="flex items-center justify-center gap-2 text-yellow-500 font-bold text-sm">
                                            <FaCheckCircle /> {alert.assignedOfficer}
                                        </div>
                                    </div>
                                )}
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