
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// // ✅ FIXED IMPORT PATH
// import Navbar from "../components/Navbar"; 
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
// import { motion } from "framer-motion";

// // Components
// import DashboardMenu from "../components/userDashboard/DashboardMenu";
// import ReportCrime from "../components/userDashboard/ReportCrime";
// import Documentation from "../components/userDashboard/Documentation";
// import EmergencyScreen from "../components/userDashboard/EmergencyScreen";
// import SkeletonLoader from "../components/common/SkeletonLoader";

// import { 
//   FaFolderOpen, FaArrowLeft, FaSync
// } from "react-icons/fa";

// // Accept defaultTab prop for Routing
// const UserDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Citizen" });
//   const [myComplaints, setMyComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [trackId, setTrackId] = useState(""); 
  
//   const navigate = useNavigate(); 

//   // Sync activeTab with URL prop
//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   // --- FETCH USER REPORTS ---
//   const fetchMyReports = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) return;
//       setUser(userInfo);
//       setLoading(true);
      
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/myreports", config);
//       setMyComplaints(data);
//       // Small delay to show spinner interaction
//       setTimeout(() => setLoading(false), 500);
//     } catch (error) { 
//         toast.error("Failed to load data"); 
//         setLoading(false); 
//     }
//   };

//   // --- TRACK STATUS ---
//   const handleTrackStatus = async (e) => {
//       e.preventDefault();
//       if(!trackId) return toast.error("Enter Complaint ID");
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
//         await axios.get(`http://localhost:5000/api/crime/track/${trackId}`, config);
        
//         // Navigate to Case File
//         navigate(`/user/case-file/${trackId}`);
//       } catch (error) { toast.error("Invalid ID or Permission Denied"); }
//   };

//   useEffect(() => { 
//       // Fetch reports if we are on the History route
//       if(activeTab === "my_complaints") fetchMyReports(); 
//       // Also load user info on menu
//       if(activeTab === "menu") {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           if(userInfo) setUser(userInfo);
//       }
//   }, [activeTab]);

//   // Updated Back Logic
//   const handleBack = () => { 
//       if (window.location.pathname !== "/user") {
//           navigate("/user"); // Go back to main dashboard route
//       } else {
//           setActiveTab("menu"); 
//           setTrackId(""); 
//       }
//   };

//   // --- HELPERS ---
//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <div className="flex-1 px-4 md:px-12 py-24">
        
//         {/* Back Button */}
//         {activeTab !== "menu" && (
//             <button 
//                 onClick={handleBack} 
//                 className="mb-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
//             >
//                 <FaArrowLeft /> Back to Dashboard
//             </button>
//         )}

//         <div className="max-w-6xl mx-auto">
//             {/* --- MAIN MENU --- */}
//             {activeTab === "menu" && (
//                 <div>
//                     <DashboardMenu userName={user.name} setActiveTab={setActiveTab} />
//                 </div>
//             )}

//             {/* --- REPORT CRIME FORM --- */}
//             {activeTab === "report" && <ReportCrime userName={user.name} onSuccess={() => navigate("/user/history")} onCancel={handleBack} />}
            
//             {/* --- TRACK STATUS --- */}
//             {activeTab === "status" && ( 
//                 <div className="max-w-2xl mx-auto text-center py-20">
//                     <h2 className="text-3xl font-bold mb-2">Track Complaint Status</h2>
//                     <p className="text-gray-400 mb-8">Enter the unique Complaint ID provided during registration.</p>
//                     <form onSubmit={handleTrackStatus} className="flex gap-4">
//                         <input value={trackId} onChange={(e) => setTrackId(e.target.value)} placeholder="Paste Complaint ID..." className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-5 py-4 text-white focus:border-blue-500 outline-none text-lg font-mono" />
//                         <button type="submit" className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg">Track</button>
//                     </form>
//                 </div>
//             )}
            
//             {/* --- MY COMPLAINTS LIST (HISTORY) --- */}
//             {activeTab === "my_complaints" && ( 
//                 <div className="max-w-5xl mx-auto">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
//                             <FaFolderOpen className="text-blue-500"/> Case History
//                         </h2>
                        
//                         <button 
//                             onClick={fetchMyReports} 
//                             className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 shadow-md text-sm font-bold transition-all hover:scale-105 active:scale-95"
//                         >
//                             <FaSync className={loading ? "animate-spin" : ""} /> Refresh List
//                         </button>
//                     </div>
                    
//                     {loading ? <SkeletonLoader count={3} /> : myComplaints.length === 0 ? (
//                         <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700 border-dashed"><p className="text-gray-400 text-lg">No reports found.</p></div>
//                     ) : (
//                         <div className="grid gap-4">
//                             {myComplaints.map((c) => {
//                                 const isClosed = c.status === "Closed";
//                                 return (
//                                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c._id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-all shadow-lg group">
//                                     <div className="flex flex-col md:flex-row gap-6">
//                                             <div className="flex-1">
//                                                 {/* Header Badges */}
//                                                 <div className="flex gap-3 mb-2 items-center">
//                                                     <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
//                                                     <span className="bg-blue-900/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/20">📍 {c.selectedStation}</span>
//                                                     <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${isClosed ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'}`}>
//                                                         {c.status}
//                                                     </span>
//                                                 </div>
                                                
//                                                 <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{c.crimeType}</h3>
//                                                 <p className="text-xs text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                                                
//                                                 {/* Action Buttons */}
//                                                 <button 
//                                                     onClick={() => navigate(`/user/case-file/${c._id}`)} 
//                                                     className="w-full md:w-auto px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white font-medium border border-slate-600 transition flex items-center justify-center gap-2"
//                                                 >
//                                                     View Detailed Report →
//                                                 </button>
//                                             </div>
//                                     </div>
//                                 </motion.div>
//                             )})}
//                         </div>
//                     )}
//                 </div>
//             )}
            
//             {/* --- OTHER TABS --- */}
//             {activeTab === "docs" && <Documentation />}
//             {activeTab === "emergency" && <EmergencyScreen onCancel={handleBack} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;











// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// // ✅ FIXED IMPORT PATH
// import Navbar from "../components/Navbar"; 
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
// import { motion } from "framer-motion";

// // Components
// import DashboardMenu from "../components/userDashboard/DashboardMenu";
// import ReportCrime from "../components/userDashboard/ReportCrime";
// import Documentation from "../components/userDashboard/Documentation";
// import EmergencyScreen from "../components/userDashboard/EmergencyScreen";
// import SkeletonLoader from "../components/common/SkeletonLoader";

// // ✅ NEW: Import Meeting List
// import MeetingList from "../components/onlineMeeting/MeetingList";

// import { 
//   FaFolderOpen, FaArrowLeft, FaSync
// } from "react-icons/fa";

// // Accept defaultTab prop for Routing
// const UserDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Citizen" });
//   const [myComplaints, setMyComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [trackId, setTrackId] = useState(""); 
  
//   const navigate = useNavigate(); 

//   // Sync activeTab with URL prop
//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   // --- FETCH USER REPORTS ---
//   const fetchMyReports = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) return;
//       setUser(userInfo);
//       setLoading(true);
      
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/myreports", config);
//       setMyComplaints(data);
//       // Small delay to show spinner interaction
//       setTimeout(() => setLoading(false), 500);
//     } catch (error) { 
//         toast.error("Failed to load data"); 
//         setLoading(false); 
//     }
//   };

//   // --- TRACK STATUS ---
//   const handleTrackStatus = async (e) => {
//       e.preventDefault();
//       if(!trackId) return toast.error("Enter Complaint ID");
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
//         await axios.get(`http://localhost:5000/api/crime/track/${trackId}`, config);
        
//         // Navigate to Case File
//         navigate(`/user/case-file/${trackId}`);
//       } catch (error) { toast.error("Invalid ID or Permission Denied"); }
//   };

//   useEffect(() => { 
//       // Fetch reports if we are on the History route
//       if(activeTab === "my_complaints") fetchMyReports(); 
//       // Also load user info on menu
//       if(activeTab === "menu") {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           if(userInfo) setUser(userInfo);
//       }
//   }, [activeTab]);

//   // Updated Back Logic
//   const handleBack = () => { 
//       if (window.location.pathname !== "/user") {
//           navigate("/user"); // Go back to main dashboard route
//       } else {
//           setActiveTab("menu"); 
//           setTrackId(""); 
//       }
//   };

//   // --- HELPERS ---
//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <div className="flex-1 px-4 md:px-12 py-24">
        
//         {/* Back Button */}
//         {activeTab !== "menu" && (
//             <button 
//                 onClick={handleBack} 
//                 className="mb-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
//             >
//                 <FaArrowLeft /> Back to Dashboard
//             </button>
//         )}

//         <div className="max-w-6xl mx-auto">
//             {/* --- MAIN MENU --- */}
//             {activeTab === "menu" && (
//                 <div>
//                     <DashboardMenu userName={user.name} setActiveTab={setActiveTab} />
//                 </div>
//             )}

//             {/* --- REPORT CRIME FORM --- */}
//             {activeTab === "report" && <ReportCrime userName={user.name} onSuccess={() => navigate("/user/history")} onCancel={handleBack} />}
            
//             {/* --- TRACK STATUS --- */}
//             {activeTab === "status" && ( 
//                 <div className="max-w-2xl mx-auto text-center py-20">
//                     <h2 className="text-3xl font-bold mb-2">Track Complaint Status</h2>
//                     <p className="text-gray-400 mb-8">Enter the unique Complaint ID provided during registration.</p>
//                     <form onSubmit={handleTrackStatus} className="flex gap-4">
//                         <input value={trackId} onChange={(e) => setTrackId(e.target.value)} placeholder="Paste Complaint ID..." className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-5 py-4 text-white focus:border-blue-500 outline-none text-lg font-mono" />
//                         <button type="submit" className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg">Track</button>
//                     </form>
//                 </div>
//             )}
            
//             {/* --- MY COMPLAINTS LIST (HISTORY) --- */}
//             {activeTab === "my_complaints" && ( 
//                 <div className="max-w-5xl mx-auto">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
//                             <FaFolderOpen className="text-blue-500"/> Case History
//                         </h2>
                        
//                         <button 
//                             onClick={fetchMyReports} 
//                             className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 shadow-md text-sm font-bold transition-all hover:scale-105 active:scale-95"
//                         >
//                             <FaSync className={loading ? "animate-spin" : ""} /> Refresh List
//                         </button>
//                     </div>
                    
//                     {loading ? <SkeletonLoader count={3} /> : myComplaints.length === 0 ? (
//                         <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700 border-dashed"><p className="text-gray-400 text-lg">No reports found.</p></div>
//                     ) : (
//                         <div className="grid gap-4">
//                             {myComplaints.map((c) => {
//                                 const isClosed = c.status === "Closed";
//                                 return (
//                                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c._id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-all shadow-lg group">
//                                     <div className="flex flex-col md:flex-row gap-6">
//                                             <div className="flex-1">
//                                                 {/* Header Badges */}
//                                                 <div className="flex gap-3 mb-2 items-center">
//                                                     <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
//                                                     <span className="bg-blue-900/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/20">📍 {c.selectedStation}</span>
//                                                     <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${isClosed ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'}`}>
//                                                         {c.status}
//                                                     </span>
//                                                 </div>
                                                
//                                                 <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{c.crimeType}</h3>
//                                                 <p className="text-xs text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                                                
//                                                 {/* Action Buttons */}
//                                                 <button 
//                                                     onClick={() => navigate(`/user/case-file/${c._id}`)} 
//                                                     className="w-full md:w-auto px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white font-medium border border-slate-600 transition flex items-center justify-center gap-2"
//                                                 >
//                                                     View Detailed Report →
//                                                 </button>
//                                             </div>
//                                     </div>
//                                 </motion.div>
//                             )})}
//                         </div>
//                     )}
//                 </div>
//             )}
            
//             {/* ✅ NEW: ONLINE MEETINGS TAB */}
//             {activeTab === "meetings" && (
//                 <div className="h-full overflow-y-auto">
//                     <MeetingList />
//                 </div>
//             )}

//             {/* --- OTHER TABS --- */}
//             {activeTab === "docs" && <Documentation />}
//             {activeTab === "emergency" && <EmergencyScreen onCancel={handleBack} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;












// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// // ✅ FIXED IMPORT PATH
// import Navbar from "../components/Navbar"; 
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
// import { motion } from "framer-motion";

// // Components
// import DashboardMenu from "../components/userDashboard/DashboardMenu";
// import ReportCrime from "../components/userDashboard/ReportCrime";
// import Documentation from "../components/userDashboard/Documentation";
// import EmergencyScreen from "../components/userDashboard/EmergencyScreen";
// import SkeletonLoader from "../components/common/SkeletonLoader";

// // ✅ NEW: Import Meeting List
// import MeetingList from "../components/onlineMeeting/MeetingList";

// import { 
//   FaFolderOpen, FaArrowLeft, FaSync
// } from "react-icons/fa";

// // Accept defaultTab prop for Routing
// const UserDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Citizen" });
//   const [myComplaints, setMyComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [trackId, setTrackId] = useState(""); 
  
//   const navigate = useNavigate(); 

//   // Sync activeTab with URL prop
//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   // --- FETCH USER REPORTS ---
//   const fetchMyReports = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) return;
//       setUser(userInfo);
//       setLoading(true);
      
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/myreports", config);
//       setMyComplaints(data);
//       // Small delay to show spinner interaction
//       setTimeout(() => setLoading(false), 500);
//     } catch (error) { 
//         toast.error("Failed to load data"); 
//         setLoading(false); 
//     }
//   };

//   // --- TRACK STATUS ---
//   const handleTrackStatus = async (e) => {
//       e.preventDefault();
//       if(!trackId) return toast.error("Enter Complaint ID");
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
//         await axios.get(`http://localhost:5000/api/crime/track/${trackId}`, config);
        
//         // Navigate to Case File
//         navigate(`/user/case-file/${trackId}`);
//       } catch (error) { toast.error("Invalid ID or Permission Denied"); }
//   };

//   useEffect(() => { 
//       // Fetch reports if we are on the History route
//       if(activeTab === "my_complaints") fetchMyReports(); 
//       // Also load user info on menu
//       if(activeTab === "menu") {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           if(userInfo) setUser(userInfo);
//       }
//   }, [activeTab]);

//   // Updated Back Logic
//   const handleBack = () => { 
//       if (window.location.pathname !== "/user") {
//           navigate("/user"); // Go back to main dashboard route
//       } else {
//           setActiveTab("menu"); 
//           setTrackId(""); 
//       }
//   };

//   // --- HELPERS ---
//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <div className="flex-1 px-4 md:px-12 py-24">
        
//         {/* Back Button */}
//         {activeTab !== "menu" && (
//             <button 
//                 onClick={handleBack} 
//                 className="mb-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
//             >
//                 <FaArrowLeft /> Back to Dashboard
//             </button>
//         )}

//         <div className="max-w-6xl mx-auto">
//             {/* --- MAIN MENU --- */}
//             {activeTab === "menu" && (
//                 <div>
//                     <DashboardMenu userName={user.name} setActiveTab={setActiveTab} />
//                 </div>
//             )}

//             {/* --- REPORT CRIME FORM --- */}
//             {activeTab === "report" && <ReportCrime userName={user.name} onSuccess={() => navigate("/user/history")} onCancel={handleBack} />}
            
//             {/* --- TRACK STATUS --- */}
//             {activeTab === "status" && ( 
//                 <div className="max-w-2xl mx-auto text-center py-20">
//                     <h2 className="text-3xl font-bold mb-2">Track Complaint Status</h2>
//                     <p className="text-gray-400 mb-8">Enter the unique Complaint ID provided during registration.</p>
//                     <form onSubmit={handleTrackStatus} className="flex gap-4">
//                         <input value={trackId} onChange={(e) => setTrackId(e.target.value)} placeholder="Paste Complaint ID..." className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-5 py-4 text-white focus:border-blue-500 outline-none text-lg font-mono" />
//                         <button type="submit" className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg">Track</button>
//                     </form>
//                 </div>
//             )}
            
//             {/* --- MY COMPLAINTS LIST (HISTORY) --- */}
//             {activeTab === "my_complaints" && ( 
//                 <div className="max-w-5xl mx-auto">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
//                             <FaFolderOpen className="text-blue-500"/> Case History
//                         </h2>
                        
//                         <button 
//                             onClick={fetchMyReports} 
//                             className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 shadow-md text-sm font-bold transition-all hover:scale-105 active:scale-95"
//                         >
//                             <FaSync className={loading ? "animate-spin" : ""} /> Refresh List
//                         </button>
//                     </div>
                    
//                     {loading ? <SkeletonLoader count={3} /> : myComplaints.length === 0 ? (
//                         <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700 border-dashed"><p className="text-gray-400 text-lg">No reports found.</p></div>
//                     ) : (
//                         <div className="grid gap-4">
//                             {myComplaints.map((c) => {
//                                 const isClosed = c.status === "Closed";
//                                 return (
//                                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c._id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-all shadow-lg group">
//                                     <div className="flex flex-col md:flex-row gap-6">
//                                             <div className="flex-1">
//                                                 {/* Header Badges */}
//                                                 <div className="flex gap-3 mb-2 items-center">
//                                                     <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
//                                                     <span className="bg-blue-900/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/20">📍 {c.selectedStation}</span>
//                                                     <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${isClosed ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'}`}>
//                                                         {c.status}
//                                                     </span>
//                                                 </div>
                                                
//                                                 <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{c.crimeType}</h3>
//                                                 <p className="text-xs text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                                                
//                                                 {/* Action Buttons */}
//                                                 <button 
//                                                     onClick={() => navigate(`/user/case-file/${c._id}`)} 
//                                                     className="w-full md:w-auto px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white font-medium border border-slate-600 transition flex items-center justify-center gap-2"
//                                                 >
//                                                     View Detailed Report →
//                                                 </button>
//                                             </div>
//                                     </div>
//                                 </motion.div>
//                             )})}
//                         </div>
//                     )}
//                 </div>
//             )}
            
//             {/* ✅ NEW: ONLINE MEETINGS TAB */}
//             {activeTab === "meetings" && (
//                 <div className="h-full overflow-y-auto">
//                     <MeetingList />
//                 </div>
//             )}

//             {/* --- OTHER TABS --- */}
//             {activeTab === "docs" && <Documentation />}
//             {activeTab === "emergency" && <EmergencyScreen onCancel={handleBack} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// // ✅ FIXED IMPORT PATH
// import Navbar from "../components/Navbar"; 
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
// import { motion } from "framer-motion";

// // Components
// import DashboardMenu from "../components/userDashboard/DashboardMenu";
// import ReportCrime from "../components/userDashboard/ReportCrime";
// import Documentation from "../components/userDashboard/Documentation";
// import EmergencyScreen from "../components/userDashboard/EmergencyScreen";
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import NoticeLayout from "../components/common/NoticeLayout";
// // ✅ NEW: Import Meeting List
// import MeetingList from "../components/onlineMeeting/MeetingList";
// // ✅ NEW: Import Support Layout
// import SupportLayout from "../components/support/SupportLayout";

// import { 
//   FaFolderOpen, FaArrowLeft, FaSync
// } from "react-icons/fa";

// // Accept defaultTab prop for Routing
// const UserDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Citizen" });
//   const [myComplaints, setMyComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [trackId, setTrackId] = useState(""); 
  
//   const navigate = useNavigate(); 

//   // Sync activeTab with URL prop
//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   // --- FETCH USER REPORTS ---
//   const fetchMyReports = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) return;
//       setUser(userInfo);
//       setLoading(true);
      
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/myreports", config);
//       setMyComplaints(data);
//       // Small delay to show spinner interaction
//       setTimeout(() => setLoading(false), 500);
//     } catch (error) { 
//         toast.error("Failed to load data"); 
//         setLoading(false); 
//     }
//   };

//   // --- TRACK STATUS ---
//   const handleTrackStatus = async (e) => {
//       e.preventDefault();
//       if(!trackId) return toast.error("Enter Complaint ID");
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
//         await axios.get(`http://localhost:5000/api/crime/track/${trackId}`, config);
        
//         // Navigate to Case File
//         navigate(`/user/case-file/${trackId}`);
//       } catch (error) { toast.error("Invalid ID or Permission Denied"); }
//   };

//   useEffect(() => { 
//       // Fetch reports if we are on the History route
//       if(activeTab === "my_complaints") fetchMyReports(); 
//       // Also load user info on menu
//       if(activeTab === "menu") {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           if(userInfo) setUser(userInfo);
//       }
//   }, [activeTab]);

//   // Updated Back Logic
//   const handleBack = () => { 
//       if (window.location.pathname !== "/user") {
//           navigate("/user"); // Go back to main dashboard route
//       } else {
//           setActiveTab("menu"); 
//           setTrackId(""); 
//       }
//   };

//   // --- HELPERS ---
//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <div className="flex-1 px-4 md:px-12 py-24">
        
//         {/* Back Button */}
//         {activeTab !== "menu" && (
//             <button 
//                 onClick={handleBack} 
//                 className="mb-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
//             >
//                 <FaArrowLeft /> Back to Dashboard
//             </button>
//         )}

//         <div className="max-w-6xl mx-auto">
//             {/* --- MAIN MENU --- */}
//             {activeTab === "menu" && (
//                 <div>
//                     <DashboardMenu userName={user.name} setActiveTab={setActiveTab} />
//                 </div>
//             )}

//             {/* --- REPORT CRIME FORM --- */}
//             {activeTab === "report" && <ReportCrime userName={user.name} onSuccess={() => navigate("/user/history")} onCancel={handleBack} />}
            
//             {/* --- TRACK STATUS --- */}
//             {activeTab === "status" && ( 
//                 <div className="max-w-2xl mx-auto text-center py-20">
//                     <h2 className="text-3xl font-bold mb-2">Track Complaint Status</h2>
//                     <p className="text-gray-400 mb-8">Enter the unique Complaint ID provided during registration.</p>
//                     <form onSubmit={handleTrackStatus} className="flex gap-4">
//                         <input value={trackId} onChange={(e) => setTrackId(e.target.value)} placeholder="Paste Complaint ID..." className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-5 py-4 text-white focus:border-blue-500 outline-none text-lg font-mono" />
//                         <button type="submit" className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg">Track</button>
//                     </form>
//                 </div>
//             )}
            
//             {/* --- MY COMPLAINTS LIST (HISTORY) --- */}
//             {activeTab === "my_complaints" && ( 
//                 <div className="max-w-5xl mx-auto">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
//                             <FaFolderOpen className="text-blue-500"/> Case History
//                         </h2>
                        
//                         <button 
//                             onClick={fetchMyReports} 
//                             className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 shadow-md text-sm font-bold transition-all hover:scale-105 active:scale-95"
//                         >
//                             <FaSync className={loading ? "animate-spin" : ""} /> Refresh List
//                         </button>
//                     </div>
                    
//                     {loading ? <SkeletonLoader count={3} /> : myComplaints.length === 0 ? (
//                         <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700 border-dashed"><p className="text-gray-400 text-lg">No reports found.</p></div>
//                     ) : (
//                         <div className="grid gap-4">
//                             {myComplaints.map((c) => {
//                                 const isClosed = c.status === "Closed";
//                                 return (
//                                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c._id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-all shadow-lg group">
//                                     <div className="flex flex-col md:flex-row gap-6">
//                                             <div className="flex-1">
//                                                 {/* Header Badges */}
//                                                 <div className="flex gap-3 mb-2 items-center">
//                                                     <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
//                                                     <span className="bg-blue-900/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/20">📍 {c.selectedStation}</span>
//                                                     <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${isClosed ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'}`}>
//                                                         {c.status}
//                                                     </span>
//                                                 </div>
                                                
//                                                 <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{c.crimeType}</h3>
//                                                 <p className="text-xs text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                                                
//                                                 {/* Action Buttons */}
//                                                 <button 
//                                                     onClick={() => navigate(`/user/case-file/${c._id}`)} 
//                                                     className="w-full md:w-auto px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white font-medium border border-slate-600 transition flex items-center justify-center gap-2"
//                                                 >
//                                                     View Detailed Report →
//                                                 </button>
//                                             </div>
//                                     </div>
//                                 </motion.div>
//                             )})}
//                         </div>
//                     )}
//                 </div>
//             )}
            
//             {/* ✅ NEW: ONLINE MEETINGS TAB */}
//             {activeTab === "meetings" && (
//                 <div className="h-full overflow-y-auto">
//                     <MeetingList />
//                 </div>
//             )}

//             {/* ✅ NEW: SUPPORT RENDER */}
//             {activeTab === "support" && <SupportLayout userRole="citizen" />}
// {activeTab === "notices" && <NoticeLayout userRole="citizen" />}
//             {/* --- OTHER TABS --- */}
//             {activeTab === "docs" && <Documentation />}
//             {activeTab === "emergency" && <EmergencyScreen onCancel={handleBack} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;












// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Navbar from "../components/Navbar"; 
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
// import { motion } from "framer-motion";

// // Components
// import DashboardMenu from "../components/userDashboard/DashboardMenu";
// import ReportCrime from "../components/userDashboard/ReportCrime";
// import Documentation from "../components/userDashboard/Documentation";
// import EmergencyScreen from "../components/userDashboard/EmergencyScreen";
// import SkeletonLoader from "../components/common/SkeletonLoader";
// // ❌ REMOVED NoticeLayout Import (Handled via Route now)
// import MeetingList from "../components/onlineMeeting/MeetingList";
// import SupportLayout from "../components/support/SupportLayout";

// import { 
//   FaFolderOpen, FaArrowLeft, FaSync
// } from "react-icons/fa";

// const UserDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Citizen" });
//   const [myComplaints, setMyComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [trackId, setTrackId] = useState(""); 
  
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   // --- CUSTOM NAVIGATION HANDLER ---
//   // This intercepts the menu click. If 'notices' is clicked, go to new route.
//   const handleTabChange = (tab) => {
//       if (tab === 'notices') {
//           navigate('/official-docs/inbox');
//       } else {
//           setActiveTab(tab);
//       }
//   };

//   // --- FETCH USER REPORTS ---
//   const fetchMyReports = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) return;
//       setUser(userInfo);
//       setLoading(true);
      
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/myreports", config);
//       setMyComplaints(data);
//       setTimeout(() => setLoading(false), 500);
//     } catch (error) { 
//         toast.error("Failed to load data"); 
//         setLoading(false); 
//     }
//   };

//   // --- TRACK STATUS ---
//   const handleTrackStatus = async (e) => {
//       e.preventDefault();
//       if(!trackId) return toast.error("Enter Complaint ID");
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
//         await axios.get(`http://localhost:5000/api/crime/track/${trackId}`, config);
        
//         navigate(`/user/case-file/${trackId}`);
//       } catch (error) { toast.error("Invalid ID or Permission Denied"); }
//   };

//   useEffect(() => { 
//       if(activeTab === "my_complaints") fetchMyReports(); 
//       if(activeTab === "menu") {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           if(userInfo) setUser(userInfo);
//       }
//   }, [activeTab]);

//   const handleBack = () => { 
//       if (window.location.pathname !== "/user") {
//           navigate("/user"); 
//       } else {
//           setActiveTab("menu"); 
//           setTrackId(""); 
//       }
//   };

//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <div className="flex-1 px-4 md:px-12 py-24">
        
//         {activeTab !== "menu" && (
//             <button 
//                 onClick={handleBack} 
//                 className="mb-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
//             >
//                 <FaArrowLeft /> Back to Dashboard
//             </button>
//         )}

//         <div className="max-w-6xl mx-auto">
//             {/* --- MAIN MENU --- */}
//             {activeTab === "menu" && (
//                 <div>
//                     {/* ✅ PASSED handleTabChange instead of setActiveTab */}
//                     <DashboardMenu userName={user.name} setActiveTab={handleTabChange} />
//                 </div>
//             )}

//             {/* --- REPORT CRIME FORM --- */}
//             {activeTab === "report" && <ReportCrime userName={user.name} onSuccess={() => navigate("/user/history")} onCancel={handleBack} />}
            
//             {/* --- TRACK STATUS --- */}
//             {activeTab === "status" && ( 
//                 <div className="max-w-2xl mx-auto text-center py-20">
//                     <h2 className="text-3xl font-bold mb-2">Track Complaint Status</h2>
//                     <p className="text-gray-400 mb-8">Enter the unique Complaint ID provided during registration.</p>
//                     <form onSubmit={handleTrackStatus} className="flex gap-4">
//                         <input value={trackId} onChange={(e) => setTrackId(e.target.value)} placeholder="Paste Complaint ID..." className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-5 py-4 text-white focus:border-blue-500 outline-none text-lg font-mono" />
//                         <button type="submit" className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg">Track</button>
//                     </form>
//                 </div>
//             )}
            
//             {/* --- MY COMPLAINTS LIST (HISTORY) --- */}
//             {activeTab === "my_complaints" && ( 
//                 <div className="max-w-5xl mx-auto">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
//                             <FaFolderOpen className="text-blue-500"/> Case History
//                         </h2>
                        
//                         <button 
//                             onClick={fetchMyReports} 
//                             className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 shadow-md text-sm font-bold transition-all hover:scale-105 active:scale-95"
//                         >
//                             <FaSync className={loading ? "animate-spin" : ""} /> Refresh List
//                         </button>
//                     </div>
                    
//                     {loading ? <SkeletonLoader count={3} /> : myComplaints.length === 0 ? (
//                         <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700 border-dashed"><p className="text-gray-400 text-lg">No reports found.</p></div>
//                     ) : (
//                         <div className="grid gap-4">
//                             {myComplaints.map((c) => {
//                                 const isClosed = c.status === "Closed";
//                                 return (
//                                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c._id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-all shadow-lg group">
//                                     <div className="flex flex-col md:flex-row gap-6">
//                                             <div className="flex-1">
//                                                 <div className="flex gap-3 mb-2 items-center">
//                                                     <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
//                                                     <span className="bg-blue-900/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/20">📍 {c.selectedStation}</span>
//                                                     <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${isClosed ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'}`}>
//                                                         {c.status}
//                                                     </span>
//                                                 </div>
                                                
//                                                 <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{c.crimeType}</h3>
//                                                 <p className="text-xs text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                                                
//                                                 <button 
//                                                     onClick={() => navigate(`/user/case-file/${c._id}`)} 
//                                                     className="w-full md:w-auto px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white font-medium border border-slate-600 transition flex items-center justify-center gap-2"
//                                                 >
//                                                     View Detailed Report →
//                                                 </button>
//                                             </div>
//                                     </div>
//                                 </motion.div>
//                             )})}
//                         </div>
//                     )}
//                 </div>
//             )}
            
//             {activeTab === "meetings" && (
//                 <div className="h-full overflow-y-auto">
//                     <MeetingList />
//                 </div>
//             )}

//             {activeTab === "support" && <SupportLayout userRole="citizen" />}
            
//             {/* ❌ REMOVED NoticeLayout Render Block */}
            
//             {activeTab === "docs" && <Documentation />}
//             {activeTab === "emergency" && <EmergencyScreen onCancel={handleBack} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;











// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Navbar from "../components/Navbar"; 
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
// import { motion } from "framer-motion";

// // Components
// import DashboardMenu from "../components/userDashboard/DashboardMenu";
// import ReportCrime from "../components/userDashboard/ReportCrime";
// import Documentation from "../components/userDashboard/Documentation";
// import EmergencyScreen from "../components/userDashboard/EmergencyScreen";
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import MeetingList from "../components/onlineMeeting/MeetingList";
// import SupportLayout from "../components/support/SupportLayout";

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../assets/signup-bg.png';

// import { 
//   FaFolderOpen, FaArrowLeft, FaSync, FaShieldAlt
// } from "react-icons/fa";

// const UserDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Citizen" });
//   const [myComplaints, setMyComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [trackId, setTrackId] = useState(""); 
  
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   const handleTabChange = (tab) => {
//       if (tab === 'notices') {
//           navigate('/official-docs/inbox');
//       } else {
//           setActiveTab(tab);
//       }
//   };

//   const fetchMyReports = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) return;
//       setUser(userInfo);
//       setLoading(true);
      
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/myreports", config);
//       setMyComplaints(data);
//       setTimeout(() => setLoading(false), 500);
//     } catch (error) { 
//         toast.error("Failed to load data"); 
//         setLoading(false); 
//     }
//   };

//   const handleTrackStatus = async (e) => {
//       e.preventDefault();
//       if(!trackId) return toast.error("Enter Complaint ID");
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
//         await axios.get(`http://localhost:5000/api/crime/track/${trackId}`, config);
        
//         navigate(`/user/case-file/${trackId}`);
//       } catch (error) { toast.error("Invalid ID or Permission Denied"); }
//   };

//   useEffect(() => { 
//       if(activeTab === "my_complaints") fetchMyReports(); 
//       if(activeTab === "menu") {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           if(userInfo) setUser(userInfo);
//       }
//   }, [activeTab]);

//   const handleBack = () => { 
//       if (window.location.pathname !== "/user") {
//           navigate("/user"); 
//       } else {
//           setActiveTab("menu"); 
//           setTrackId(""); 
//       }
//   };

//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300";

//   return (
//     <div className="min-h-screen text-white flex flex-col font-sans relative">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={dashboardBg} 
//             alt="Background" 
//             className="fixed inset-0 w-full h-full object-fill opacity-40 z-0" 
//           />
//           <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-black/90"></div>
//       </div>

//       <div className="flex-1 px-4 md:px-12 py-24 relative z-10">
        
//         {activeTab !== "menu" && (
//             <motion.button 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBack} 
//                 className="mb-6 px-6 py-2.5 bg-slate-800/80 hover:bg-blue-600/80 backdrop-blur-md text-white font-bold font-mono rounded-xl shadow-lg border border-slate-600 hover:border-blue-400 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
//             >
//                 <FaArrowLeft /> BACK TO DASHBOARD
//             </motion.button>
//         )}

//         <div className="max-w-7xl mx-auto">
            
//             {activeTab === "menu" && (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                     <div className="flex items-center gap-4 mb-8">
//                         <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30 backdrop-blur-md">
//                             <FaShieldAlt className="text-3xl text-blue-400" />
//                         </div>
//                         <div>
//                             <h1 className="text-3xl font-black tracking-tight text-white">CITIZEN PORTAL</h1>
//                             <p className="text-slate-400 font-mono text-sm">Welcome back, {user.name}</p>
//                         </div>
//                     </div>
//                     <DashboardMenu userName={user.name} setActiveTab={handleTabChange} />
//                 </motion.div>
//             )}

//             {/* --- REPORT CRIME FORM --- */}
//             {activeTab === "report" && (
//                 <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={glassCard}>
//                     <ReportCrime userName={user.name} onSuccess={() => navigate("/user/history")} onCancel={handleBack} />
//                 </motion.div>
//             )}
            
//             {/* --- TRACK STATUS --- */}
//             {activeTab === "status" && ( 
//                 <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-2xl mx-auto text-center py-20">
//                     <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-600 p-10 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.15)]">
//                         <h2 className="text-3xl font-black mb-2 text-white">TRACK COMPLAINT</h2>
//                         <p className="text-gray-400 mb-8 font-mono text-sm">Enter the unique ID provided during filing.</p>
//                         <form onSubmit={handleTrackStatus} className="flex gap-4">
//                             <input 
//                                 value={trackId} 
//                                 onChange={(e) => setTrackId(e.target.value)} 
//                                 placeholder="PASTE COMPLAINT ID..." 
//                                 className="flex-1 bg-black/40 border border-slate-600 rounded-xl px-5 py-4 text-white focus:border-blue-500 outline-none text-lg font-mono tracking-widest placeholder-gray-600 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
//                             />
//                             <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all active:scale-95">TRACK</button>
//                         </form>
//                     </div>
//                 </motion.div>
//             )}
            
//             {/* --- MY COMPLAINTS LIST (HISTORY) --- */}
//             {activeTab === "my_complaints" && ( 
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
//                             <FaFolderOpen className="text-blue-500"/> CASE HISTORY
//                         </h2>
//                         <button 
//                             onClick={fetchMyReports} 
//                             className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white px-4 py-2 rounded-xl border border-slate-600 shadow-md text-sm font-bold font-mono transition-all hover:scale-105 active:scale-95"
//                         >
//                             <FaSync className={loading ? "animate-spin" : ""} /> REFRESH
//                         </button>
//                     </div>
                    
//                     {loading ? <SkeletonLoader count={3} /> : myComplaints.length === 0 ? (
//                         <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700 border-dashed backdrop-blur-sm">
//                             <p className="text-gray-400 text-lg font-mono">NO REPORTS FOUND</p>
//                         </div>
//                     ) : (
//                         <div className="grid gap-4">
//                             {myComplaints.map((c, i) => {
//                                 const isClosed = c.status === "Closed";
//                                 return (
//                                 <motion.div 
//                                     initial={{ opacity: 0, y: 20 }} 
//                                     animate={{ opacity: 1, y: 0 }} 
//                                     transition={{ delay: i * 0.1 }}
//                                     key={c._id} 
//                                     className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 hover:shadow-xl transition-all group relative overflow-hidden"
//                                 >
//                                     <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
//                                     <div className="flex flex-col md:flex-row gap-6 pl-2">
//                                             <div className="flex-1">
//                                                 <div className="flex gap-3 mb-2 items-center flex-wrap">
//                                                     <span className="bg-black/40 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/20 font-mono tracking-wide">#{safeIdSlice(c._id)}</span>
//                                                     <span className="bg-slate-800/50 text-slate-300 text-xs px-2 py-1 rounded border border-slate-600/30 flex items-center gap-1">📍 {c.selectedStation}</span>
//                                                     <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider border ${isClosed ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-amber-900/20 text-amber-400 border-amber-500/30'}`}>
//                                                         {c.status}
//                                                     </span>
//                                                 </div>
                                                
//                                                 <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{c.crimeType}</h3>
//                                                 <p className="text-xs text-slate-400 mb-4 line-clamp-2 font-medium">{c.description}</p>
                                                
//                                                 <button 
//                                                     onClick={() => navigate(`/user/case-file/${c._id}`)} 
//                                                     className="px-5 py-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg text-xs text-slate-300 font-bold border border-slate-600 transition-all flex items-center gap-2 group-hover:translate-x-1"
//                                                 >
//                                                     VIEW REPORT →
//                                                 </button>
//                                             </div>
//                                     </div>
//                                 </motion.div>
//                             )})}
//                         </div>
//                     )}
//                 </motion.div>
//             )}
            
//             {activeTab === "meetings" && (
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto">
//                     <MeetingList />
//                 </motion.div>
//             )}

//             {activeTab === "support" && <SupportLayout userRole="citizen" />}
            
//             {activeTab === "docs" && <Documentation />}
//             {activeTab === "emergency" && <EmergencyScreen onCancel={handleBack} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;








// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Navbar from "../components/Navbar"; 
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
// import { motion } from "framer-motion";

// // Components
// import DashboardMenu from "../components/userDashboard/DashboardMenu";
// import ReportCrime from "../components/userDashboard/ReportCrime";
// import Documentation from "../components/userDashboard/Documentation";
// import EmergencyScreen from "../components/userDashboard/EmergencyScreen";
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import MeetingList from "../components/onlineMeeting/MeetingList";
// import SupportLayout from "../components/support/SupportLayout";

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../assets/dashboard-bg.png';
// console.log("Image Path:", dashboardBg); 
// // Agar console mein 'undefined' ya error aaye, toh path galat hai.
// // Agar base64 string ya /static/media/... aaye, toh path sahi hai.
// import { 
//   FaFolderOpen, FaArrowLeft, FaSync, FaShieldAlt
// } from "react-icons/fa";

// const UserDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Citizen" });
//   const [myComplaints, setMyComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [trackId, setTrackId] = useState(""); 
  
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   const handleTabChange = (tab) => {
//       if (tab === 'notices') {
//           navigate('/official-docs/inbox');
//       } else {
//           setActiveTab(tab);
//       }
//   };

//   const fetchMyReports = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) return;
//       setUser(userInfo);
//       setLoading(true);
      
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/myreports", config);
//       setMyComplaints(data);
//       setTimeout(() => setLoading(false), 500);
//     } catch (error) { 
//         toast.error("Failed to load data"); 
//         setLoading(false); 
//     }
//   };

//   const handleTrackStatus = async (e) => {
//       e.preventDefault();
//       if(!trackId) return toast.error("Enter Complaint ID");
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
//         await axios.get(`http://localhost:5000/api/crime/track/${trackId}`, config);
        
//         navigate(`/user/case-file/${trackId}`);
//       } catch (error) { toast.error("Invalid ID or Permission Denied"); }
//   };

//   useEffect(() => { 
//       if(activeTab === "my_complaints") fetchMyReports(); 
//       if(activeTab === "menu") {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           if(userInfo) setUser(userInfo);
//       }
//   }, [activeTab]);

//   const handleBack = () => { 
//       if (window.location.pathname !== "/user") {
//           navigate("/user"); 
//       } else {
//           setActiveTab("menu"); 
//           setTrackId(""); 
//       }
//   };

//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300";

//   return (
//     <div className="min-h-screen text-white flex flex-col font-sans relative">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={dashboardBg} 
//             alt="Background" 
//             className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" />
//           <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black/50 to-black/40"></div>
//       </div>

//       <div className="flex-1 px-4 md:px-12 py-24 relative z-10">
        
//         {activeTab !== "menu" && (
//             <motion.button 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBack} 
//                 className="mb-6 px-6 py-2.5 bg-slate-800/80 hover:bg-blue-600/80 backdrop-blur-md text-white font-bold font-mono rounded-xl shadow-lg border border-slate-600 hover:border-blue-400 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
//             >
//                 <FaArrowLeft /> BACK TO DASHBOARD
//             </motion.button>
//         )}

//         <div className="max-w-7xl mx-auto">
            
//             {activeTab === "menu" && (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                     {/* Header removed from here as requested */}
//                     <DashboardMenu userName={user.name} setActiveTab={handleTabChange} />
//                 </motion.div>
//             )}

//             {/* --- REPORT CRIME FORM --- */}
//             {activeTab === "report" && (
//                 <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={glassCard}>
//                     <ReportCrime userName={user.name} onSuccess={() => navigate("/user/history")} onCancel={handleBack} />
//                 </motion.div>
//             )}
            
//             {/* --- TRACK STATUS --- */}
//             {activeTab === "status" && ( 
//                 <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-2xl mx-auto text-center py-20">
//                     <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-600 p-10 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.15)]">
//                         <h2 className="text-3xl font-black mb-2 text-white">TRACK COMPLAINT</h2>
//                         <p className="text-gray-400 mb-8 font-mono text-sm">Enter the unique ID provided during filing.</p>
//                         <form onSubmit={handleTrackStatus} className="flex gap-4">
//                             <input 
//                                 value={trackId} 
//                                 onChange={(e) => setTrackId(e.target.value)} 
//                                 placeholder="PASTE COMPLAINT ID..." 
//                                 className="flex-1 bg-black/40 border border-slate-600 rounded-xl px-5 py-4 text-white focus:border-blue-500 outline-none text-lg font-mono tracking-widest placeholder-gray-600 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
//                             />
//                             <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all active:scale-95">TRACK</button>
//                         </form>
//                     </div>
//                 </motion.div>
//             )}
            
//             {/* --- MY COMPLAINTS LIST (HISTORY) --- */}
//             {activeTab === "my_complaints" && ( 
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
//                             <FaFolderOpen className="text-blue-500"/> CASE HISTORY
//                         </h2>
//                         <button 
//                             onClick={fetchMyReports} 
//                             className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white px-4 py-2 rounded-xl border border-slate-600 shadow-md text-sm font-bold font-mono transition-all hover:scale-105 active:scale-95"
//                         >
//                             <FaSync className={loading ? "animate-spin" : ""} /> REFRESH
//                         </button>
//                     </div>
                    
//                     {loading ? <SkeletonLoader count={3} /> : myComplaints.length === 0 ? (
//                         <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700 border-dashed backdrop-blur-sm">
//                             <p className="text-gray-400 text-lg font-mono">NO REPORTS FOUND</p>
//                         </div>
//                     ) : (
//                         <div className="grid gap-4">
//                             {myComplaints.map((c, i) => {
//                                 const isClosed = c.status === "Closed";
//                                 return (
//                                 <motion.div 
//                                     initial={{ opacity: 0, y: 20 }} 
//                                     animate={{ opacity: 1, y: 0 }} 
//                                     transition={{ delay: i * 0.1 }}
//                                     key={c._id} 
//                                     className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 hover:shadow-xl transition-all group relative overflow-hidden"
//                                 >
//                                     <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
//                                     <div className="flex flex-col md:flex-row gap-6 pl-2">
//                                             <div className="flex-1">
//                                                 <div className="flex gap-3 mb-2 items-center flex-wrap">
//                                                     <span className="bg-black/40 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/20 font-mono tracking-wide">#{safeIdSlice(c._id)}</span>
//                                                     <span className="bg-slate-800/50 text-slate-300 text-xs px-2 py-1 rounded border border-slate-600/30 flex items-center gap-1">📍 {c.selectedStation}</span>
//                                                     <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider border ${isClosed ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-amber-900/20 text-amber-400 border-amber-500/30'}`}>
//                                                         {c.status}
//                                                     </span>
//                                                 </div>
                                                
//                                                 <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{c.crimeType}</h3>
//                                                 <p className="text-xs text-slate-400 mb-4 line-clamp-2 font-medium">{c.description}</p>
                                                
//                                                 <button 
//                                                     onClick={() => navigate(`/user/case-file/${c._id}`)} 
//                                                     className="px-5 py-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg text-xs text-slate-300 font-bold border border-slate-600 transition-all flex items-center gap-2 group-hover:translate-x-1"
//                                                 >
//                                                     VIEW REPORT →
//                                                 </button>
//                                             </div>
//                                     </div>
//                                 </motion.div>
//                             )})}
//                         </div>
//                     )}
//                 </motion.div>
//             )}
            
//             {activeTab === "meetings" && (
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto">
//                     <MeetingList />
//                 </motion.div>
//             )}

//             {activeTab === "support" && <SupportLayout userRole="citizen" />}
            
//             {activeTab === "docs" && <Documentation />}
//             {activeTab === "emergency" && <EmergencyScreen onCancel={handleBack} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
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
import MeetingList from "../components/onlineMeeting/MeetingList";
import SupportLayout from "../components/support/SupportLayout";

// ✅ IMPORT BACKGROUND
import dashboardBg from '../assets/dashboard-bg.png';
console.log("Image Path:", dashboardBg); 
import { 
  FaFolderOpen, FaArrowLeft, FaSync, FaShieldAlt
} from "react-icons/fa";

const UserDashboard = ({ defaultTab = "menu" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [user, setUser] = useState({ name: "Citizen" });
  const [myComplaints, setMyComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackId, setTrackId] = useState(""); 
  
  const navigate = useNavigate(); 

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleTabChange = (tab) => {
      if (tab === 'notices') {
          navigate('/official-docs/inbox');
      } else {
          setActiveTab(tab);
      }
  };

  const fetchMyReports = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return;
      setUser(userInfo);
      setLoading(true);
      
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get("http://localhost:5000/api/crime/myreports", config);
      setMyComplaints(data);
      setTimeout(() => setLoading(false), 500);
    } catch (error) { 
        toast.error("Failed to load data"); 
        setLoading(false); 
    }
  };

  const handleTrackStatus = async (e) => {
      e.preventDefault();
      if(!trackId) return toast.error("Enter Complaint ID");
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
        await axios.get(`http://localhost:5000/api/crime/track/${trackId}`, config);
        
        navigate(`/user/case-file/${trackId}`);
      } catch (error) { toast.error("Invalid ID or Permission Denied"); }
  };

  useEffect(() => { 
      if(activeTab === "my_complaints") fetchMyReports(); 
      if(activeTab === "menu") {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          if(userInfo) setUser(userInfo);
      }
  }, [activeTab]);

  const handleBack = () => { 
      if (window.location.pathname !== "/user") {
          navigate("/user"); 
      } else {
          setActiveTab("menu"); 
          setTrackId(""); 
      }
  };

  const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

  // --- STYLES ---
  const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300";

  return (
    // ✅ MAIN CONTAINER: h-screen aur overflow-hidden lagaya taaki page scroll na ho
    <div className="h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden">
      <Navbar />
      <Toaster position="top-right" />
      
      {/* --- BACKGROUND IMAGE --- */}
      <div className="fixed inset-0 z-0">
          <img 
            src={dashboardBg} 
            alt="Background" 
            className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black/50 to-black/40"></div>
      </div>

      {/* ✅ CONTENT CONTAINER: Flex-1 aur h-full taaki bachi hui height le le */}
      {/* px-4 md:px-12 padding rakhi hai, lekin overflow-hidden parent ki wajah se scroll nahi aayega */}
      <div className="flex-1 flex flex-col px-4 md:px-12 pt-20 pb-4 relative z-10 h-full">
        
        {activeTab !== "menu" && (
            <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleBack} 
                className="mb-4 px-6 py-2 bg-slate-800/80 hover:bg-blue-600/80 backdrop-blur-md text-white font-bold font-mono rounded-xl shadow-lg border border-slate-600 hover:border-blue-400 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0"
            >
                <FaArrowLeft /> BACK TO DASHBOARD
            </motion.button>
        )}

        {/* ✅ SCROLLABLE AREA: Sirf ye div scroll karega agar content zyada hua, poora page nahi */}
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto no-scrollbar">
            
            {activeTab === "menu" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
                    <DashboardMenu userName={user.name} setActiveTab={handleTabChange} />
                </motion.div>
            )}

            {/* --- REPORT CRIME FORM --- */}
            {activeTab === "report" && (
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={glassCard}>
                    <ReportCrime userName={user.name} onSuccess={() => navigate("/user/history")} onCancel={handleBack} />
                </motion.div>
            )}
            
            {/* --- TRACK STATUS --- */}
            {activeTab === "status" && ( 
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-2xl mx-auto text-center py-10 h-full flex flex-col justify-center">
                    <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-600 p-10 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                        <h2 className="text-3xl font-black mb-2 text-white">TRACK COMPLAINT</h2>
                        <p className="text-gray-400 mb-8 font-mono text-sm">Enter the unique ID provided during filing.</p>
                        <form onSubmit={handleTrackStatus} className="flex gap-4">
                            <input 
                                value={trackId} 
                                onChange={(e) => setTrackId(e.target.value)} 
                                placeholder="PASTE COMPLAINT ID..." 
                                className="flex-1 bg-black/40 border border-slate-600 rounded-xl px-5 py-4 text-white focus:border-blue-500 outline-none text-lg font-mono tracking-widest placeholder-gray-600 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                            />
                            <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all active:scale-95">TRACK</button>
                        </form>
                    </div>
                </motion.div>
            )}
            
            {/* --- MY COMPLAINTS LIST (HISTORY) --- */}
            {activeTab === "my_complaints" && ( 
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto w-full h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                            <FaFolderOpen className="text-blue-500"/> CASE HISTORY
                        </h2>
                        <button 
                            onClick={fetchMyReports} 
                            className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white px-4 py-2 rounded-xl border border-slate-600 shadow-md text-sm font-bold font-mono transition-all hover:scale-105 active:scale-95"
                        >
                            <FaSync className={loading ? "animate-spin" : ""} /> REFRESH
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2">
                        {loading ? <SkeletonLoader count={3} /> : myComplaints.length === 0 ? (
                            <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700 border-dashed backdrop-blur-sm">
                                <p className="text-gray-400 text-lg font-mono">NO REPORTS FOUND</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {myComplaints.map((c, i) => {
                                    const isClosed = c.status === "Closed";
                                    return (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        transition={{ delay: i * 0.1 }}
                                        key={c._id} 
                                        className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 hover:shadow-xl transition-all group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
                                        <div className="flex flex-col md:flex-row gap-6 pl-2">
                                                <div className="flex-1">
                                                    <div className="flex gap-3 mb-2 items-center flex-wrap">
                                                        <span className="bg-black/40 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/20 font-mono tracking-wide">#{safeIdSlice(c._id)}</span>
                                                        <span className="bg-slate-800/50 text-slate-300 text-xs px-2 py-1 rounded border border-slate-600/30 flex items-center gap-1">📍 {c.selectedStation}</span>
                                                        <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider border ${isClosed ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-amber-900/20 text-amber-400 border-amber-500/30'}`}>
                                                            {c.status}
                                                        </span>
                                                    </div>
                                                    
                                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{c.crimeType}</h3>
                                                    <p className="text-xs text-slate-400 mb-4 line-clamp-2 font-medium">{c.description}</p>
                                                    
                                                    <button 
                                                        onClick={() => navigate(`/user/case-file/${c._id}`)} 
                                                        className="px-5 py-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg text-xs text-slate-300 font-bold border border-slate-600 transition-all flex items-center gap-2 group-hover:translate-x-1"
                                                    >
                                                        VIEW REPORT →
                                                    </button>
                                                </div>
                                        </div>
                                    </motion.div>
                                )})}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
            
            {activeTab === "meetings" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto">
                    <MeetingList />
                </motion.div>
            )}

            {activeTab === "support" && <SupportLayout userRole="citizen" />}
            
            {activeTab === "docs" && <Documentation />}
            {activeTab === "emergency" && <EmergencyScreen onCancel={handleBack} />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;



