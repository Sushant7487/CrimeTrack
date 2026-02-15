
// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

// // Components
// import SeniorMenu from "../components/seniorDashboard/SeniorMenu"; 
// import SeniorViewComplaints from "./SeniorViewComplaints"; 
// import SeniorManageOfficers from "./SeniorManageOfficers"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 

// import FileFIR from "../components/policeDashboard/FileFIR";
// import PastCrimes from "../components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "../components/policeDashboard/FaceDetection";
// import SkeletonLoader from "../components/common/SkeletonLoader";

// // ✅ Accept defaultTab prop
// const SeniorDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Senior Official", designation: "IPS" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
  
//   const navigate = useNavigate(); // ✅ Initialize Navigation

//   useEffect(() => {
//     // ✅ Update tab when prop changes
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);
//   }, []);

//   // ✅ Updated Back Logic
//   const handleBack = () => {
//       // If on separate Complaints page, go back to Main Senior Dashboard
//       if (window.location.pathname.includes("/senior/complaints")) {
//           navigate("/senior");
//       } else {
//           setActiveTab("menu");
//           setSelectedCaseId(null);
//       }
//   };

//   const handleFileRecordRequest = (id) => {
//     setSelectedCaseId(id);
//     setActiveTab("fir");
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <div className="flex-1 px-4 md:px-12 py-24">
        
//         {activeTab !== "menu" && (
//             <button onClick={handleBack} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
//               <span>←</span> Back to HQ Menu
//             </button>
//         )}

//         <div className="max-w-7xl mx-auto">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <>
//                     {activeTab === "menu" && <SeniorMenu user={user} setActiveTab={setActiveTab} />}
//                     {activeTab === "complaints" && <div className="animate-fade-in-up"><SeniorViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "manage_officers" && <div className="animate-fade-in-up"><SeniorManageOfficers /></div>}
                    
//                     {/* Senior Chat */}
//                     {activeTab === "connect" && <div className="animate-fade-in-up"><PoliceConnect currentUser={user} /></div>}

//                     {activeTab === "fir" && <div className="animate-fade-in-up"><FileFIR onCancel={handleBack} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <PastCrimes />}
//                     {activeTab === "cctv" && <SuspiciousActivity />}
//                     {activeTab === "face" && <FaceDetection />}
                    
//                     {activeTab === "track" && (
//                           <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
//                              <h2 className="text-2xl font-bold mb-2">📡 Live GPS Tracking</h2>
//                              <p className="text-gray-400">Map integration module (Google Maps API) loading...</p>
//                           </div>
//                     )}
//                 </>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeniorDashboard;










// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

// // Components
// import SeniorMenu from "../components/seniorDashboard/SeniorMenu"; 
// import SeniorViewComplaints from "./SeniorViewComplaints"; 
// import SeniorManageOfficers from "./SeniorManageOfficers"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 

// // ✅ NEW: Import Meeting List Component
// import MeetingList from "../components/onlineMeeting/MeetingList";

// import FileFIR from "../components/policeDashboard/FileFIR";
// import PastCrimes from "../components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "../components/policeDashboard/FaceDetection";
// import SkeletonLoader from "../components/common/SkeletonLoader";

// // ✅ Accept defaultTab prop
// const SeniorDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Senior Official", designation: "IPS" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
  
//   const navigate = useNavigate(); // ✅ Initialize Navigation

//   useEffect(() => {
//     // ✅ Update tab when prop changes
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);
//   }, []);

//   // ✅ Updated Back Logic
//   const handleBack = () => {
//       // If on separate Complaints page, go back to Main Senior Dashboard
//       if (window.location.pathname.includes("/senior/complaints")) {
//           navigate("/senior");
//       } else {
//           setActiveTab("menu");
//           setSelectedCaseId(null);
//       }
//   };

//   const handleFileRecordRequest = (id) => {
//     setSelectedCaseId(id);
//     setActiveTab("fir");
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <div className="flex-1 px-4 md:px-12 py-24">
        
//         {activeTab !== "menu" && (
//             <button onClick={handleBack} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
//               <span>←</span> Back to HQ Menu
//             </button>
//         )}

//         <div className="max-w-7xl mx-auto">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <>
//                     {activeTab === "menu" && <SeniorMenu user={user} setActiveTab={setActiveTab} />}
//                     {activeTab === "complaints" && <div className="animate-fade-in-up"><SeniorViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "manage_officers" && <div className="animate-fade-in-up"><SeniorManageOfficers /></div>}
                    
//                     {/* Senior Chat */}
//                     {activeTab === "connect" && <div className="animate-fade-in-up"><PoliceConnect currentUser={user} /></div>}

//                     {/* ✅ NEW: Online Meeting List */}
//                     {activeTab === "meeting" && <div className="animate-fade-in-up"><MeetingList /></div>}

//                     {activeTab === "fir" && <div className="animate-fade-in-up"><FileFIR onCancel={handleBack} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <PastCrimes />}
//                     {activeTab === "cctv" && <SuspiciousActivity />}
//                     {activeTab === "face" && <FaceDetection />}
                    
//                     {activeTab === "track" && (
//                           <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
//                              <h2 className="text-2xl font-bold mb-2">📡 Live GPS Tracking</h2>
//                              <p className="text-gray-400">Map integration module (Google Maps API) loading...</p>
//                           </div>
//                     )}
//                 </>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeniorDashboard;
















// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// // Components
// import SeniorMenu from "../components/seniorDashboard/SeniorMenu"; 
// import SeniorViewComplaints from "./SeniorViewComplaints"; 
// import SeniorManageOfficers from "./SeniorManageOfficers"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import MeetingList from "../components/onlineMeeting/MeetingList";

// import FileFIR from "../components/policeDashboard/FileFIR";
// import PastCrimes from "../components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "../components/policeDashboard/FaceDetection";
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import NoticeLayout from "../components/common/NoticeLayout";
// // ✅ NEW: Import Support Layout
// import SupportLayout from "../components/support/SupportLayout";

// const SeniorDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Senior Official", designation: "IPS" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);
//   }, []);

//   const handleBack = () => {
//       if (window.location.pathname.includes("/senior/complaints")) {
//           navigate("/senior");
//       } else {
//           setActiveTab("menu");
//           setSelectedCaseId(null);
//       }
//   };

//   const handleFileRecordRequest = (id) => {
//     setSelectedCaseId(id);
//     setActiveTab("fir");
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <div className="flex-1 px-4 md:px-12 py-24">
        
//         {activeTab !== "menu" && (
//             <button onClick={handleBack} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
//               <span>←</span> Back to HQ Menu
//             </button>
//         )}

//         <div className="max-w-7xl mx-auto">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <>
//                     {activeTab === "menu" && <SeniorMenu user={user} setActiveTab={setActiveTab} />}
//                     {activeTab === "complaints" && <div className="animate-fade-in-up"><SeniorViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "manage_officers" && <div className="animate-fade-in-up"><SeniorManageOfficers /></div>}
//                     {activeTab === "connect" && <div className="animate-fade-in-up"><PoliceConnect currentUser={user} /></div>}
//                     {activeTab === "meeting" && <div className="animate-fade-in-up"><MeetingList /></div>}
//                     {activeTab === "fir" && <div className="animate-fade-in-up"><FileFIR onCancel={handleBack} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <PastCrimes />}
//                     {activeTab === "notices" && <div className="animate-fade-in-up"><NoticeLayout userRole="police" /></div>}
//                     {activeTab === "cctv" && <SuspiciousActivity />}
//                     {activeTab === "face" && <FaceDetection />}
                    
//                     {/* ✅ ADD THIS LINE: Render Support Layout */}
//                     {activeTab === "support" && <div className="animate-fade-in-up"><SupportLayout userRole="senior" /></div>}

//                     {activeTab === "track" && (
//                           <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
//                              <h2 className="text-2xl font-bold mb-2">📡 Live GPS Tracking</h2>
//                              <p className="text-gray-400">Map integration module (Google Maps API) loading...</p>
//                           </div>
//                     )}
//                 </>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeniorDashboard;
















// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// // Components
// import SeniorMenu from "../components/seniorDashboard/SeniorMenu"; 
// import SeniorViewComplaints from "./SeniorViewComplaints"; 
// import SeniorManageOfficers from "./SeniorManageOfficers"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import MeetingList from "../components/onlineMeeting/MeetingList";

// import FileFIR from "../components/policeDashboard/FileFIR";
// import PastCrimes from "../components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "../components/policeDashboard/FaceDetection";
// import SkeletonLoader from "../components/common/SkeletonLoader";
// // ❌ REMOVED NoticeLayout Import
// import SupportLayout from "../components/support/SupportLayout";

// const SeniorDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Senior Official", designation: "IPS" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);
//   }, []);

//   // ✅ CUSTOM HANDLER for Navigation
//   const handleMenuNavigation = (tab) => {
//       if (tab === 'notices') {
//           navigate('/official-docs/inbox');
//       } else {
//           setActiveTab(tab);
//       }
//   };

//   const handleBack = () => {
//       if (window.location.pathname.includes("/senior/complaints")) {
//           navigate("/senior");
//       } else {
//           setActiveTab("menu");
//           setSelectedCaseId(null);
//       }
//   };

//   const handleFileRecordRequest = (id) => {
//     setSelectedCaseId(id);
//     setActiveTab("fir");
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-right" />
      
//       <div className="flex-1 px-4 md:px-12 py-24">
        
//         {activeTab !== "menu" && (
//             <button onClick={handleBack} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
//               <span>←</span> Back to HQ Menu
//             </button>
//         )}

//         <div className="max-w-7xl mx-auto">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <>
//                     {/* ✅ PASSED handleMenuNavigation */}
//                     {activeTab === "menu" && <SeniorMenu user={user} setActiveTab={handleMenuNavigation} />}
                    
//                     {activeTab === "complaints" && <div className="animate-fade-in-up"><SeniorViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "manage_officers" && <div className="animate-fade-in-up"><SeniorManageOfficers /></div>}
//                     {activeTab === "connect" && <div className="animate-fade-in-up"><PoliceConnect currentUser={user} /></div>}
//                     {activeTab === "meeting" && <div className="animate-fade-in-up"><MeetingList /></div>}
//                     {activeTab === "fir" && <div className="animate-fade-in-up"><FileFIR onCancel={handleBack} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <PastCrimes />}
                    
//                     {/* ❌ REMOVED NoticeLayout Render */}
                    
//                     {activeTab === "cctv" && <SuspiciousActivity />}
//                     {activeTab === "face" && <FaceDetection />}
                    
//                     {activeTab === "support" && <div className="animate-fade-in-up"><SupportLayout userRole="senior" /></div>}

//                     {activeTab === "track" && (
//                           <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
//                              <h2 className="text-2xl font-bold mb-2">📡 Live GPS Tracking</h2>
//                              <p className="text-gray-400">Map integration module (Google Maps API) loading...</p>
//                           </div>
//                     )}
//                 </>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeniorDashboard;












import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

// Components
import SeniorMenu from "../components/seniorDashboard/SeniorMenu"; 
import SeniorViewComplaints from "./SeniorViewComplaints"; 
import SeniorManageOfficers from "./SeniorManageOfficers"; 
import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
import MeetingList from "../components/onlineMeeting/MeetingList";
import FileFIR from "../components/policeDashboard/FileFIR";
import PastCrimes from "../components/policeDashboard/PastCrimes";
import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity";
import FaceDetection from "../components/policeDashboard/FaceDetection";
import SkeletonLoader from "../components/common/SkeletonLoader";
import SupportLayout from "../components/support/SupportLayout";

// ✅ IMPORT BACKGROUND
import dashboardBg from '../assets/dashboard-bg.png';

const SeniorDashboard = ({ defaultTab = "menu" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [user, setUser] = useState({ name: "Senior Official", designation: "IPS" });
  const [loading, setLoading] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) setUser(userInfo);
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleMenuNavigation = (tab) => {
      if (tab === 'notices') { navigate('/official-docs/inbox'); } else { setActiveTab(tab); }
  };

  const handleBack = () => {
      if (window.location.pathname.includes("/senior/complaints")) { navigate("/senior"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
  };

  const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };

  // --- STYLES (Glassmorphism Gold Theme) ---
  const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300";

  return (
    // Changed h-screen to min-h-screen to allow content to grow beyond viewport height
    <div className="min-h-screen w-screen text-white flex flex-col font-sans relative">
      
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

      {/* ✅ CONTENT CONTAINER */}
      {/* Removed h-full and added pb-10 to ensure bottom padding for scrolling */}
      <div className="flex-1 flex flex-col px-4 md:px-12 pt-24 pb-10 relative z-10 w-full">
        
        {/* Back Button (Animated) */}
        {activeTab !== "menu" && (
            <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleBack} 
                className="mb-4 w-fit px-6 py-2 bg-amber-900/60 hover:bg-amber-800/80 backdrop-blur-md text-amber-100 font-bold font-mono rounded-xl shadow-lg border border-amber-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0"
            >
                <FaArrowLeft /> HQ COMMAND CENTER
            </motion.button>
        )}

        {/* ✅ MAIN CONTENT AREA */}
        {/* Removed overflow-y-auto and fixed height constraints to let page scroll naturally */}
        <div className="max-w-7xl mx-auto w-full flex flex-col">
            {loading ? <SkeletonLoader count={1} type="card" /> : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col w-full gap-6">
                    
                    {/* Render Menu */}
                    {activeTab === "menu" && <SeniorMenu user={user} setActiveTab={handleMenuNavigation} />}
                    
                    {/* Content Wrappers with Glass Effect */}
                    {activeTab === "complaints" && <div className={glassCard}><SeniorViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
                    {activeTab === "manage_officers" && <div className={glassCard}><SeniorManageOfficers /></div>}
                    {activeTab === "connect" && <div className="min-h-[600px]"><PoliceConnect currentUser={user} /></div>}
                    {activeTab === "meeting" && <div className="min-h-[600px]"><MeetingList /></div>}
                    {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleBack} prefillId={selectedCaseId} /></div>}
                    {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
                    {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
                    {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
                    {activeTab === "support" && <SupportLayout userRole="senior" />}

                    {activeTab === "track" && (
                          <div className="max-w-2xl mx-auto mt-20 text-center py-20 bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-600/50 shadow-2xl">
                             <h2 className="text-3xl font-black mb-2 text-white">📡 LIVE GPS TRACKING</h2>
                             <p className="text-amber-400 font-mono">Module Active. Waiting for satellite handshake...</p>
                          </div>
                    )}
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SeniorDashboard;