
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
// ✅ FIXED IMPORT PATH
import Navbar from "../components/Navbar"; 
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

// Components
import DashboardMenu from "../components/userDashboard/DashboardMenu";
import ReportCrime from "../components/userDashboard/ReportCrime";
import Documentation from "../components/userDashboard/Documentation";
import EmergencyScreen from "../components/userDashboard/EmergencyScreen";
import SkeletonLoader from "../components/common/SkeletonLoader";

import { 
  FaFolderOpen, FaArrowLeft, FaSync
} from "react-icons/fa";

// Accept defaultTab prop for Routing
const UserDashboard = ({ defaultTab = "menu" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [user, setUser] = useState({ name: "Citizen" });
  const [myComplaints, setMyComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackId, setTrackId] = useState(""); 
  
  const navigate = useNavigate(); 

  // Sync activeTab with URL prop
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // --- FETCH USER REPORTS ---
  const fetchMyReports = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return;
      setUser(userInfo);
      setLoading(true);
      
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/myreports", config);
      setMyComplaints(data);
      // Small delay to show spinner interaction
      setTimeout(() => setLoading(false), 500);
    } catch (error) { 
        toast.error("Failed to load data"); 
        setLoading(false); 
    }
  };

  // --- TRACK STATUS ---
  const handleTrackStatus = async (e) => {
      e.preventDefault();
      if(!trackId) return toast.error("Enter Complaint ID");
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
        await axios.get(`https://crimetrack-api.onrender.com/api/crime/track/${trackId}`, config);
        
        // Navigate to Case File
        navigate(`/user/case-file/${trackId}`);
      } catch (error) { toast.error("Invalid ID or Permission Denied"); }
  };

  useEffect(() => { 
      // Fetch reports if we are on the History route
      if(activeTab === "my_complaints") fetchMyReports(); 
      // Also load user info on menu
      if(activeTab === "menu") {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          if(userInfo) setUser(userInfo);
      }
  }, [activeTab]);

  // Updated Back Logic
  const handleBack = () => { 
      if (window.location.pathname !== "/user") {
          navigate("/user"); // Go back to main dashboard route
      } else {
          setActiveTab("menu"); 
          setTrackId(""); 
      }
  };

  // --- HELPERS ---
  const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Navbar />
      <Toaster position="top-right" />
      
      <div className="flex-1 px-4 md:px-12 py-24">
        
        {/* Back Button */}
        {activeTab !== "menu" && (
            <button 
                onClick={handleBack} 
                className="mb-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
            >
                <FaArrowLeft /> Back to Dashboard
            </button>
        )}

        <div className="max-w-6xl mx-auto">
            {/* --- MAIN MENU --- */}
            {activeTab === "menu" && (
                <div>
                    <DashboardMenu userName={user.name} setActiveTab={setActiveTab} />
                </div>
            )}

            {/* --- REPORT CRIME FORM --- */}
            {activeTab === "report" && <ReportCrime userName={user.name} onSuccess={() => navigate("/user/history")} onCancel={handleBack} />}
            
            {/* --- TRACK STATUS --- */}
            {activeTab === "status" && ( 
                <div className="max-w-2xl mx-auto text-center py-20">
                    <h2 className="text-3xl font-bold mb-2">Track Complaint Status</h2>
                    <p className="text-gray-400 mb-8">Enter the unique Complaint ID provided during registration.</p>
                    <form onSubmit={handleTrackStatus} className="flex gap-4">
                        <input value={trackId} onChange={(e) => setTrackId(e.target.value)} placeholder="Paste Complaint ID..." className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-5 py-4 text-white focus:border-blue-500 outline-none text-lg font-mono" />
                        <button type="submit" className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg">Track</button>
                    </form>
                </div>
            )}
            
            {/* --- MY COMPLAINTS LIST (HISTORY) --- */}
            {activeTab === "my_complaints" && ( 
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                            <FaFolderOpen className="text-blue-500"/> Case History
                        </h2>
                        
                        <button 
                            onClick={fetchMyReports} 
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 shadow-md text-sm font-bold transition-all hover:scale-105 active:scale-95"
                        >
                            <FaSync className={loading ? "animate-spin" : ""} /> Refresh List
                        </button>
                    </div>
                    
                    {loading ? <SkeletonLoader count={3} /> : myComplaints.length === 0 ? (
                        <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700 border-dashed"><p className="text-gray-400 text-lg">No reports found.</p></div>
                    ) : (
                        <div className="grid gap-4">
                            {myComplaints.map((c) => {
                                const isClosed = c.status === "Closed";
                                return (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c._id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-all shadow-lg group">
                                    <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-1">
                                                {/* Header Badges */}
                                                <div className="flex gap-3 mb-2 items-center">
                                                    <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
                                                    <span className="bg-blue-900/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/20">📍 {c.selectedStation}</span>
                                                    <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${isClosed ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'}`}>
                                                        {c.status}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{c.crimeType}</h3>
                                                <p className="text-xs text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                                                
                                                {/* Action Buttons */}
                                                <button 
                                                    onClick={() => navigate(`/user/case-file/${c._id}`)} 
                                                    className="w-full md:w-auto px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white font-medium border border-slate-600 transition flex items-center justify-center gap-2"
                                                >
                                                    View Detailed Report →
                                                </button>
                                            </div>
                                    </div>
                                </motion.div>
                            )})}
                        </div>
                    )}
                </div>
            )}
            
            {/* --- OTHER TABS --- */}
            {activeTab === "docs" && <Documentation />}
            {activeTab === "emergency" && <EmergencyScreen onCancel={handleBack} />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;