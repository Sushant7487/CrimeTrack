

// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaArrowLeft } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 

// // Sound Assets
// import sirenSoundFile from "/siren.mp3"; 
// import notifSoundFile from "/notification.mp3";

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
//   const audioRef = useRef(new Audio(sirenSoundFile));
//   const notificationAudio = useRef(new Audio(notifSoundFile)); 

//   // ✅ --- AUDIO LOGIC (Robust) ---
//   const playSiren = () => {
//     const audio = audioRef.current;
//     // Prevent stuttering if already playing
//     if (!audio.paused && audio.currentTime > 0) return;

//     audio.loop = true; 
//     audio.volume = 1.0;
//     audio.currentTime = 0; // Reset to start
    
//     const playPromise = audio.play();
//     if (playPromise !== undefined) {
//         playPromise.catch(error => {
//             console.error("Autoplay Blocked:", error);
//             // Persistent visual alert if audio blocked
//             toast((t) => (
//                 <div onClick={() => { audio.play(); toast.dismiss(t.id); }} className="flex items-center gap-4 cursor-pointer p-4 bg-red-600 rounded-lg text-white">
//                     <span className="text-3xl animate-pulse">🚨</span> 
//                     <div>
//                         <b className="uppercase text-sm block">Emergency Alert!</b>
//                         <p className="text-xs underline">Tap to UNMUTE Siren</p>
//                     </div>
//                 </div>
//             ), { id: 'siren-toast', duration: Infinity, position: "top-center" });
//         });
//     }
//   };

//   const stopSiren = () => {
//       const audio = audioRef.current;
//       audio.pause();
//       audio.currentTime = 0;
//       toast.dismiss('siren-toast');
//   };

//   const playNotificationSound = () => {
//       const audio = notificationAudio.current;
//       if (audio.paused) {
//           audio.currentTime = 0;
//           audio.play().catch(() => {}); 
//       }
//   };

//   const stopNotificationSound = () => {
//       const audio = notificationAudio.current;
//       audio.pause();
//       audio.currentTime = 0;
//   };

//   // ✅ --- TAB HANDLING ---
//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   // ✅ --- MAIN LOGIC (Socket + Polling) ---
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     // 1. Silent Unlock for Mobile Audio
//     const unlockAudio = () => {
//         const siren = audioRef.current;
//         const notif = notificationAudio.current;
//         siren.volume = 0; notif.volume = 0;
//         siren.play().then(() => { siren.pause(); siren.currentTime = 0; siren.volume = 1; }).catch(() => {});
//         notif.play().then(() => { notif.pause(); notif.currentTime = 0; notif.volume = 1; }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//         document.removeEventListener('touchstart', unlockAudio); // ✅ Mobile Touch Support
//     };
//     document.addEventListener('click', unlockAudio);
//     document.addEventListener('touchstart', unlockAudio);

//     // 2. CHECK FUNCTION (API Call)
//     const checkPendingSOS = async () => {
//         try {
//             if (!userInfo?.token) return;
//             const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//             const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/all", config);
            
//             const pendingAlert = data.find(c => 
//                 c.isSOS === true && 
//                 c.status !== "Closed" && 
//                 c.assignedOfficer === "Not Assigned" && 
//                 (c.selectedStation === userInfo.station || c.selectedStation === "Central Station")
//             );

//             if (pendingAlert) {
//                 if (!hasNewSOS) { // Only trigger if state changes
//                     setHasNewSOS(true);
//                     playSiren();
//                 }
//             } else {
//                 setHasNewSOS(false);
//                 stopSiren();
//             }
//         } catch (error) { 
//             console.error("SOS Check Failed"); 
//         }
//     };

//     // 3. Initial Check
//     if (userInfo) checkPendingSOS();

//     // 4. ✅ POLLING INTERVAL (Backup for Socket)
//     // Checks every 4 seconds automatically
//     const pollingInterval = setInterval(() => {
//         if (userInfo) checkPendingSOS();
//     }, 4000);

//     // 5. ✅ SOCKET CONNECTION (Real-Time)
//     const socket = io(ENDPOINT);
//     if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//     if(userInfo?.station) socket.emit("join_room", userInfo.station);

//     // Handle SOS via Socket (Instant)
//     socket.on("new_crime_report", (newAlert) => {
//         const isSOS = newAlert.isSOS === true;
//         const isMyStation = newAlert.selectedStation === userInfo.station || newAlert.selectedStation === "Central Station";
//         if (isSOS && isMyStation) {
//             toast.error("🚨 CRITICAL SOS RECEIVED!", { id: 'new-sos-toast', duration: 5000, style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' } });
//             setHasNewSOS(true);
//             playSiren();
//         }
//     });

//     // Handle Chat
//     socket.on("receive_direct_msg", (data) => {
//         if (activeTab !== 'connect') {
//             playNotificationSound();
//             toast.custom((t) => (
//                <div onClick={() => { setActiveTab('connect'); stopNotificationSound(); toast.dismiss(t.id); }} className="bg-gray-800 border-l-4 border-emerald-500 p-4 rounded shadow-2xl cursor-pointer flex items-center gap-4 w-72 animate-bounce">
//                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">💬</div>
//                    <div><p className="font-bold text-white text-sm">Msg from {data.senderName}</p><p className="text-xs text-gray-400 truncate w-40">{data.message}</p></div>
//                </div>
//             ), { id: 'msg-toast', duration: 5000, position: 'top-right' });
//         }
//     });

//     return () => {
//         socket.disconnect();
//         clearInterval(pollingInterval); // Clean up polling
//         stopSiren();
//         stopNotificationSound();
//         document.removeEventListener('click', unlockAudio);
//         document.removeEventListener('touchstart', unlockAudio);
//     };
//   }, []); // Run once on mount

//   const handleTabChange = (tabId) => {
//       setActiveTab(tabId);
//       if (tabId === 'emergency') { setHasNewSOS(false); stopSiren(); }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) {
//           navigate("/police");
//       } else {
//           setActiveTab("menu"); 
//           setSelectedCaseId(null); 
//       }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* ✅ Responsive Padding for Mobile & Desktop */}
//       <div className="flex-1 px-4 sm:px-6 md:px-12 py-20 md:py-24">
        
//         {/* Back Button - Responsive */}
//         {activeTab !== "menu" && (
//             <button 
//                 onClick={handleBackToMenu} 
//                 className="mb-6 w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center md:justify-start gap-2 transition-all active:scale-95"
//             >
//                 <FaArrowLeft /> Back to Station Menu
//             </button>
//         )}

//         <div className="max-w-6xl mx-auto">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <>
//                      {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
//                     {activeTab === "complaints" && <div className="animate-fade-in-up"><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className="animate-fade-in-up"><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <PastCrimes />}
//                     {activeTab === "emergency" && <div className="animate-fade-in-up"><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="animate-fade-in-up"><PoliceConnect currentUser={user} /></div>} 
                   
//                     {activeTab === "cctv" && <SuspiciousActivity />}
//                     {activeTab === "face" && <FaceDetection />}
//                 </>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;










// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaArrowLeft } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import NoticeLayout from "../components/common/NoticeLayout";
// // ✅ NEW: Import Support Layout
// import SupportLayout from "../components/support/SupportLayout";

// // Sound Assets
// import sirenSoundFile from "/siren.mp3"; 
// import notifSoundFile from "/notification.mp3";

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
//   const audioRef = useRef(new Audio(sirenSoundFile));
//   const notificationAudio = useRef(new Audio(notifSoundFile)); 

//   // ✅ --- AUDIO LOGIC (Robust) ---
//   const playSiren = () => {
//     const audio = audioRef.current;
//     if (!audio.paused && audio.currentTime > 0) return;

//     audio.loop = true; 
//     audio.volume = 1.0;
//     audio.currentTime = 0; 
    
//     const playPromise = audio.play();
//     if (playPromise !== undefined) {
//         playPromise.catch(error => {
//             console.error("Autoplay Blocked:", error);
//             toast((t) => (
//                 <div onClick={() => { audio.play(); toast.dismiss(t.id); }} className="flex items-center gap-4 cursor-pointer p-4 bg-red-600 rounded-lg text-white">
//                     <span className="text-3xl animate-pulse">🚨</span> 
//                     <div>
//                         <b className="uppercase text-sm block">Emergency Alert!</b>
//                         <p className="text-xs underline">Tap to UNMUTE Siren</p>
//                     </div>
//                 </div>
//             ), { id: 'siren-toast', duration: Infinity, position: "top-center" });
//         });
//     }
//   };

//   const stopSiren = () => {
//       const audio = audioRef.current;
//       audio.pause();
//       audio.currentTime = 0;
//       toast.dismiss('siren-toast');
//   };

//   const playNotificationSound = () => {
//       const audio = notificationAudio.current;
//       if (audio.paused) {
//           audio.currentTime = 0;
//           audio.play().catch(() => {}); 
//       }
//   };

//   const stopNotificationSound = () => {
//       const audio = notificationAudio.current;
//       audio.pause();
//       audio.currentTime = 0;
//   };

//   // ✅ --- TAB HANDLING ---
//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   // ✅ --- MAIN LOGIC (Socket + Polling) ---
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     // 1. Silent Unlock for Mobile Audio
//     const unlockAudio = () => {
//         const siren = audioRef.current;
//         const notif = notificationAudio.current;
//         siren.volume = 0; notif.volume = 0;
//         siren.play().then(() => { siren.pause(); siren.currentTime = 0; siren.volume = 1; }).catch(() => {});
//         notif.play().then(() => { notif.pause(); notif.currentTime = 0; notif.volume = 1; }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//         document.removeEventListener('touchstart', unlockAudio); 
//     };
//     document.addEventListener('click', unlockAudio);
//     document.addEventListener('touchstart', unlockAudio);

//     // 2. CHECK FUNCTION (API Call)
//     const checkPendingSOS = async () => {
//         try {
//             if (!userInfo?.token) return;
//             const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//             const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/all", config);
            
//             const pendingAlert = data.find(c => 
//                 c.isSOS === true && 
//                 c.status !== "Closed" && 
//                 c.assignedOfficer === "Not Assigned" && 
//                 (c.selectedStation === userInfo.station || c.selectedStation === "Central Station")
//             );

//             if (pendingAlert) {
//                 if (!hasNewSOS) { 
//                     setHasNewSOS(true);
//                     playSiren();
//                 }
//             } else {
//                 setHasNewSOS(false);
//                 stopSiren();
//             }
//         } catch (error) { 
//             console.error("SOS Check Failed"); 
//         }
//     };

//     // 3. Initial Check
//     if (userInfo) checkPendingSOS();

//     // 4. ✅ POLLING INTERVAL (Backup for Socket)
//     const pollingInterval = setInterval(() => {
//         if (userInfo) checkPendingSOS();
//     }, 4000);

//     // 5. ✅ SOCKET CONNECTION (Real-Time)
//     const socket = io(ENDPOINT);
//     if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//     if(userInfo?.station) socket.emit("join_room", userInfo.station);

//     // Handle SOS via Socket (Instant)
//     socket.on("new_crime_report", (newAlert) => {
//         const isSOS = newAlert.isSOS === true;
//         const isMyStation = newAlert.selectedStation === userInfo.station || newAlert.selectedStation === "Central Station";
//         if (isSOS && isMyStation) {
//             toast.error("🚨 CRITICAL SOS RECEIVED!", { id: 'new-sos-toast', duration: 5000, style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' } });
//             setHasNewSOS(true);
//             playSiren();
//         }
//     });

//     // Handle Chat
//     socket.on("receive_direct_msg", (data) => {
//         if (activeTab !== 'connect') {
//             playNotificationSound();
//             toast.custom((t) => (
//                <div onClick={() => { setActiveTab('connect'); stopNotificationSound(); toast.dismiss(t.id); }} className="bg-gray-800 border-l-4 border-emerald-500 p-4 rounded shadow-2xl cursor-pointer flex items-center gap-4 w-72 animate-bounce">
//                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">💬</div>
//                    <div><p className="font-bold text-white text-sm">Msg from {data.senderName}</p><p className="text-xs text-gray-400 truncate w-40">{data.message}</p></div>
//                </div>
//             ), { id: 'msg-toast', duration: 5000, position: 'top-right' });
//         }
//     });

//     return () => {
//         socket.disconnect();
//         clearInterval(pollingInterval); 
//         stopSiren();
//         stopNotificationSound();
//         document.removeEventListener('click', unlockAudio);
//         document.removeEventListener('touchstart', unlockAudio);
//     };
//   }, []); 

//   const handleTabChange = (tabId) => {
//       setActiveTab(tabId);
//       if (tabId === 'emergency') { setHasNewSOS(false); stopSiren(); }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) {
//           navigate("/police");
//       } else {
//           setActiveTab("menu"); 
//           setSelectedCaseId(null); 
//       }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* ✅ Responsive Padding for Mobile & Desktop */}
//       <div className="flex-1 px-4 sm:px-6 md:px-12 py-20 md:py-24">
        
//         {/* Back Button - Responsive */}
//         {activeTab !== "menu" && (
//             <button 
//                 onClick={handleBackToMenu} 
//                 className="mb-6 w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center md:justify-start gap-2 transition-all active:scale-95"
//             >
//                 <FaArrowLeft /> Back to Station Menu
//             </button>
//         )}

//         <div className="max-w-6xl mx-auto">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <>
//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
//                     {activeTab === "complaints" && <div className="animate-fade-in-up"><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className="animate-fade-in-up"><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <PastCrimes />}
//                     {activeTab === "emergency" && <div className="animate-fade-in-up"><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="animate-fade-in-up"><PoliceConnect currentUser={user} /></div>} 
//                     {activeTab === "notices" && <div className="animate-fade-in-up"><NoticeLayout userRole="police" /></div>}
//                     {activeTab === "cctv" && <SuspiciousActivity />}
//                     {activeTab === "face" && <FaceDetection />}

//                     {/* ✅ ADD THIS LINE: Render Support Layout */}
//                     {activeTab === "support" && <div className="animate-fade-in-up"><SupportLayout userRole="police" /></div>}
//                 </>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;

















// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaArrowLeft } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// // ❌ REMOVED NoticeLayout Import
// import SupportLayout from "../components/support/SupportLayout";

// // Sound Assets
// import sirenSoundFile from "/siren.mp3"; 
// import notifSoundFile from "/notification.mp3";

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
//   const audioRef = useRef(new Audio(sirenSoundFile));
//   const notificationAudio = useRef(new Audio(notifSoundFile)); 

//   // ✅ --- AUDIO LOGIC ---
//   const playSiren = () => {
//     const audio = audioRef.current;
//     if (!audio.paused && audio.currentTime > 0) return;

//     audio.loop = true; 
//     audio.volume = 1.0;
//     audio.currentTime = 0; 
    
//     const playPromise = audio.play();
//     if (playPromise !== undefined) {
//         playPromise.catch(error => {
//             console.error("Autoplay Blocked:", error);
//             toast((t) => (
//                 <div onClick={() => { audio.play(); toast.dismiss(t.id); }} className="flex items-center gap-4 cursor-pointer p-4 bg-red-600 rounded-lg text-white">
//                     <span className="text-3xl animate-pulse">🚨</span> 
//                     <div>
//                         <b className="uppercase text-sm block">Emergency Alert!</b>
//                         <p className="text-xs underline">Tap to UNMUTE Siren</p>
//                     </div>
//                 </div>
//             ), { id: 'siren-toast', duration: Infinity, position: "top-center" });
//         });
//     }
//   };

//   const stopSiren = () => {
//       const audio = audioRef.current;
//       audio.pause();
//       audio.currentTime = 0;
//       toast.dismiss('siren-toast');
//   };

//   const playNotificationSound = () => {
//       const audio = notificationAudio.current;
//       if (audio.paused) {
//           audio.currentTime = 0;
//           audio.play().catch(() => {}); 
//       }
//   };

//   const stopNotificationSound = () => {
//       const audio = notificationAudio.current;
//       audio.pause();
//       audio.currentTime = 0;
//   };

//   // ✅ --- TAB HANDLING (With Route Redirect) ---
//   const handleTabChange = (tabId) => {
//       // ✅ IF NOTICES CLICKED, REDIRECT
//       if (tabId === 'notices') {
//           navigate('/official-docs/inbox');
//           return;
//       }

//       setActiveTab(tabId);
//       if (tabId === 'emergency') { setHasNewSOS(false); stopSiren(); }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     const unlockAudio = () => {
//         const siren = audioRef.current;
//         const notif = notificationAudio.current;
//         siren.volume = 0; notif.volume = 0;
//         siren.play().then(() => { siren.pause(); siren.currentTime = 0; siren.volume = 1; }).catch(() => {});
//         notif.play().then(() => { notif.pause(); notif.currentTime = 0; notif.volume = 1; }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//         document.removeEventListener('touchstart', unlockAudio); 
//     };
//     document.addEventListener('click', unlockAudio);
//     document.addEventListener('touchstart', unlockAudio);

//     const checkPendingSOS = async () => {
//         try {
//             if (!userInfo?.token) return;
//             const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//             const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/all", config);
            
//             const pendingAlert = data.find(c => 
//                 c.isSOS === true && 
//                 c.status !== "Closed" && 
//                 c.assignedOfficer === "Not Assigned" && 
//                 (c.selectedStation === userInfo.station || c.selectedStation === "Central Station")
//             );

//             if (pendingAlert) {
//                 if (!hasNewSOS) { 
//                     setHasNewSOS(true);
//                     playSiren();
//                 }
//             } else {
//                 setHasNewSOS(false);
//                 stopSiren();
//             }
//         } catch (error) { 
//             console.error("SOS Check Failed"); 
//         }
//     };

//     if (userInfo) checkPendingSOS();

//     const pollingInterval = setInterval(() => {
//         if (userInfo) checkPendingSOS();
//     }, 4000);

//     const socket = io(ENDPOINT);
//     if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//     if(userInfo?.station) socket.emit("join_room", userInfo.station);

//     socket.on("new_crime_report", (newAlert) => {
//         const isSOS = newAlert.isSOS === true;
//         const isMyStation = newAlert.selectedStation === userInfo.station || newAlert.selectedStation === "Central Station";
//         if (isSOS && isMyStation) {
//             toast.error("🚨 CRITICAL SOS RECEIVED!", { id: 'new-sos-toast', duration: 5000, style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' } });
//             setHasNewSOS(true);
//             playSiren();
//         }
//     });

//     socket.on("receive_direct_msg", (data) => {
//         if (activeTab !== 'connect') {
//             playNotificationSound();
//             toast.custom((t) => (
//                <div onClick={() => { setActiveTab('connect'); stopNotificationSound(); toast.dismiss(t.id); }} className="bg-gray-800 border-l-4 border-emerald-500 p-4 rounded shadow-2xl cursor-pointer flex items-center gap-4 w-72 animate-bounce">
//                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">💬</div>
//                    <div><p className="font-bold text-white text-sm">Msg from {data.senderName}</p><p className="text-xs text-gray-400 truncate w-40">{data.message}</p></div>
//                </div>
//             ), { id: 'msg-toast', duration: 5000, position: 'top-right' });
//         }
//     });

//     return () => {
//         socket.disconnect();
//         clearInterval(pollingInterval); 
//         stopSiren();
//         stopNotificationSound();
//         document.removeEventListener('click', unlockAudio);
//         document.removeEventListener('touchstart', unlockAudio);
//     };
//   }, []); 

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) {
//           navigate("/police");
//       } else {
//           setActiveTab("menu"); 
//           setSelectedCaseId(null); 
//       }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster position="top-center" />
      
//       <div className="flex-1 px-4 sm:px-6 md:px-12 py-20 md:py-24">
        
//         {activeTab !== "menu" && (
//             <button 
//                 onClick={handleBackToMenu} 
//                 className="mb-6 w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center md:justify-start gap-2 transition-all active:scale-95"
//             >
//                 <FaArrowLeft /> Back to Station Menu
//             </button>
//         )}

//         <div className="max-w-6xl mx-auto">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <>
//                     {/* ✅ PASSED handleTabChange (Redirect Logic Included) */}
//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
                    
//                     {activeTab === "complaints" && <div className="animate-fade-in-up"><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className="animate-fade-in-up"><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <PastCrimes />}
//                     {activeTab === "emergency" && <div className="animate-fade-in-up"><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="animate-fade-in-up"><PoliceConnect currentUser={user} /></div>} 
                    
//                     {/* ❌ REMOVED NoticeLayout Render */}
                    
//                     {activeTab === "cctv" && <SuspiciousActivity />}
//                     {activeTab === "face" && <FaceDetection />}

//                     {activeTab === "support" && <div className="animate-fade-in-up"><SupportLayout userRole="police" /></div>}
//                 </>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;



// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaArrowLeft, FaSiren, FaShieldAlt } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import SupportLayout from "../components/support/SupportLayout";

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../assets/dashboard-bg.png';

// // Sound Assets
// import sirenSoundFile from "/siren.mp3"; 
// import notifSoundFile from "/notification.mp3";

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
//   const audioRef = useRef(new Audio(sirenSoundFile));
//   const notificationAudio = useRef(new Audio(notifSoundFile)); 

//   // Audio Logic
//   const playSiren = () => {
//     const audio = audioRef.current;
//     if (!audio.paused && audio.currentTime > 0) return;
//     audio.loop = true; audio.volume = 1.0; audio.currentTime = 0; 
//     audio.play().catch(error => { console.error("Autoplay Blocked:", error); });
//   };

//   const stopSiren = () => { audioRef.current.pause(); audioRef.current.currentTime = 0; };
//   const playNotificationSound = () => { notificationAudio.current.play().catch(() => {}); };
//   const stopNotificationSound = () => { notificationAudio.current.pause(); notificationAudio.current.currentTime = 0; };

//   const handleTabChange = (tabId) => {
//       if (tabId === 'notices') { navigate('/official-docs/inbox'); return; }
//       setActiveTab(tabId);
//       if (tabId === 'emergency') { setHasNewSOS(false); stopSiren(); }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     const unlockAudio = () => {
//         audioRef.current.play().then(() => { audioRef.current.pause(); }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//     };
//     document.addEventListener('click', unlockAudio);

//     const socket = io(ENDPOINT);
//     if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//     if(userInfo?.station) socket.emit("join_room", userInfo.station);

//     socket.on("new_crime_report", (newAlert) => {
//         if (newAlert.isSOS === true && (newAlert.selectedStation === userInfo.station || newAlert.selectedStation === "Central Station")) {
//             toast.error("🚨 CRITICAL SOS RECEIVED!", { duration: 5000, style: { background: '#ef4444', color: '#fff' } });
//             setHasNewSOS(true); playSiren();
//         }
//     });

//     socket.on("receive_direct_msg", (data) => {
//         if (activeTab !== 'connect') {
//             playNotificationSound();
//             toast("New Message: " + data.message, { icon: '💬' });
//         }
//     });

//     return () => { socket.disconnect(); stopSiren(); };
//   }, []); 

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) { navigate("/police"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300";

//   return (
//     <div className={`h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden transition-all duration-500 ${hasNewSOS ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.5)]' : ''}`}>
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={dashboardBg} 
//             alt="Background" 
//             className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" 
//           />
//           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${hasNewSOS ? 'from-red-900/40 via-black/60 to-black/80' : 'from-slate-900/30 via-black/50 to-black/40'}`}></div>
//       </div>

//       {/* ✅ CONTENT CONTAINER */}
//       <div className="flex-1 flex flex-col px-4 md:px-12 pt-20 pb-4 relative z-10 h-full">
        
//         {activeTab !== "menu" && (
//             <motion.button 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBackToMenu} 
//                 className="mb-4 w-fit px-6 py-2 bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md text-purple-100 font-bold font-mono rounded-xl shadow-lg border border-purple-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0"
//             >
//                 <FaArrowLeft /> STATION MENU
//             </motion.button>
//         )}

//         {/* ✅ SCROLLABLE AREA */}
//         <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto no-scrollbar">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
                    
//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
                    
//                     {/* Content Wrappers with Glass Effect */}
//                     {activeTab === "complaints" && <div className={glassCard}><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
//                     {activeTab === "emergency" && <div className={glassCard}><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="h-full"><PoliceConnect currentUser={user} /></div>} 
//                     {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
//                     {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
//                     {activeTab === "support" && <SupportLayout userRole="police" />}
//                 </motion.div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;














// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// // ✅ FIX: Removed 'FaSiren', Added 'FaExclamationTriangle' just in case
// import { FaArrowLeft, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import SupportLayout from "../components/support/SupportLayout";

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../assets/signup-bg.png';

// // Sound Assets
// import sirenSoundFile from "/siren.mp3"; 
// import notifSoundFile from "/notification.mp3";

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
//   const audioRef = useRef(new Audio(sirenSoundFile));
//   const notificationAudio = useRef(new Audio(notifSoundFile)); 

//   // Audio Logic
//   const playSiren = () => {
//     const audio = audioRef.current;
//     if (!audio.paused && audio.currentTime > 0) return;
//     audio.loop = true; audio.volume = 1.0; audio.currentTime = 0; 
//     audio.play().catch(error => { console.error("Autoplay Blocked:", error); });
//   };

//   const stopSiren = () => { audioRef.current.pause(); audioRef.current.currentTime = 0; };
//   const playNotificationSound = () => { notificationAudio.current.play().catch(() => {}); };
//   const stopNotificationSound = () => { notificationAudio.current.pause(); notificationAudio.current.currentTime = 0; };

//   const handleTabChange = (tabId) => {
//       if (tabId === 'notices') { navigate('/official-docs/inbox'); return; }
//       setActiveTab(tabId);
//       if (tabId === 'emergency') { setHasNewSOS(false); stopSiren(); }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     const unlockAudio = () => {
//         audioRef.current.play().then(() => { audioRef.current.pause(); }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//     };
//     document.addEventListener('click', unlockAudio);

//     const socket = io(ENDPOINT);
//     if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//     if(userInfo?.station) socket.emit("join_room", userInfo.station);

//     socket.on("new_crime_report", (newAlert) => {
//         if (newAlert.isSOS === true && (newAlert.selectedStation === userInfo.station || newAlert.selectedStation === "Central Station")) {
//             toast.error("🚨 CRITICAL SOS RECEIVED!", { duration: 5000, style: { background: '#ef4444', color: '#fff' } });
//             setHasNewSOS(true); playSiren();
//         }
//     });

//     socket.on("receive_direct_msg", (data) => {
//         if (activeTab !== 'connect') {
//             playNotificationSound();
//             toast("New Message: " + data.message, { icon: '💬' });
//         }
//     });

//     return () => { socket.disconnect(); stopSiren(); };
//   }, []); 

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) { navigate("/police"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300";

//   return (
//     <div className={`h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden transition-all duration-500 ${hasNewSOS ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.5)]' : ''}`}>
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={dashboardBg} 
//             alt="Background" 
//             className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" 
//           />
//           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${hasNewSOS ? 'from-red-900/40 via-black/60 to-black/80' : 'from-slate-900/30 via-black/50 to-black/40'}`}></div>
//       </div>

//       {/* ✅ CONTENT CONTAINER */}
//       <div className="flex-1 flex flex-col px-4 md:px-12 pt-20 pb-4 relative z-10 h-full">
        
//         {activeTab !== "menu" && (
//             <motion.button 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBackToMenu} 
//                 className="mb-4 w-fit px-6 py-2 bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md text-purple-100 font-bold font-mono rounded-xl shadow-lg border border-purple-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0"
//             >
//                 <FaArrowLeft /> STATION MENU
//             </motion.button>
//         )}

//         {/* ✅ SCROLLABLE AREA */}
//         <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto no-scrollbar">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
                    
//                     {activeTab === "menu" && (
//                         <div className="mb-8 flex items-center gap-4 shrink-0">
//                             <div className="p-3 bg-purple-600/20 rounded-2xl border border-purple-500/30 backdrop-blur-md">
//                                 <FaShieldAlt className="text-3xl text-purple-400" />
//                             </div>
//                             <div>
//                                 <h1 className="text-3xl font-black tracking-tight text-white uppercase">Police Station Portal</h1>
//                                 <p className="text-purple-300 font-mono text-sm">{user.designation} • {user.station}</p>
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
                    
//                     {/* Content Wrappers with Glass Effect */}
//                     {activeTab === "complaints" && <div className={glassCard}><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
//                     {activeTab === "emergency" && <div className={glassCard}><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="h-full"><PoliceConnect currentUser={user} /></div>} 
//                     {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
//                     {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
//                     {activeTab === "support" && <SupportLayout userRole="police" />}
//                 </motion.div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;








// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// // ✅ FIX: Removed 'FaSiren', Added 'FaExclamationTriangle' just in case
// import { FaArrowLeft, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import SupportLayout from "../components/support/SupportLayout";

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../assets/signup-bg.png';

// // Sound Assets
// import sirenSoundFile from "/siren.mp3"; 
// import notifSoundFile from "/notification.mp3";

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
//   const audioRef = useRef(new Audio(sirenSoundFile));
//   const notificationAudio = useRef(new Audio(notifSoundFile)); 

//   // Audio Logic
//   const playSiren = () => {
//     const audio = audioRef.current;
//     if (!audio.paused && audio.currentTime > 0) return;
//     audio.loop = true; audio.volume = 1.0; audio.currentTime = 0; 
//     audio.play().catch(error => { console.error("Autoplay Blocked:", error); });
//   };

//   const stopSiren = () => { audioRef.current.pause(); audioRef.current.currentTime = 0; };
//   const playNotificationSound = () => { notificationAudio.current.play().catch(() => {}); };
//   const stopNotificationSound = () => { notificationAudio.current.pause(); notificationAudio.current.currentTime = 0; };

//   const handleTabChange = (tabId) => {
//       if (tabId === 'notices') { navigate('/official-docs/inbox'); return; }
//       setActiveTab(tabId);
//       if (tabId === 'emergency') { setHasNewSOS(false); stopSiren(); }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     const unlockAudio = () => {
//         audioRef.current.play().then(() => { audioRef.current.pause(); }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//     };
//     document.addEventListener('click', unlockAudio);

//     const socket = io(ENDPOINT);
//     if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//     if(userInfo?.station) socket.emit("join_room", userInfo.station);

//     socket.on("new_crime_report", (newAlert) => {
//         if (newAlert.isSOS === true && (newAlert.selectedStation === userInfo.station || newAlert.selectedStation === "Central Station")) {
//             toast.error("🚨 CRITICAL SOS RECEIVED!", { duration: 5000, style: { background: '#ef4444', color: '#fff' } });
//             setHasNewSOS(true); playSiren();
//         }
//     });

//     socket.on("receive_direct_msg", (data) => {
//         if (activeTab !== 'connect') {
//             playNotificationSound();
//             toast("New Message: " + data.message, { icon: '💬' });
//         }
//     });

//     return () => { socket.disconnect(); stopSiren(); };
//   }, []); 

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) { navigate("/police"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300";

//   return (
//     <div className={`h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden transition-all duration-500 ${hasNewSOS ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.5)]' : ''}`}>
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={dashboardBg} 
//             alt="Background" 
//             className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" 
//           />
//           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${hasNewSOS ? 'from-red-900/40 via-black/60 to-black/80' : 'from-slate-900/30 via-black/50 to-black/40'}`}></div>
//       </div>

//       {/* ✅ FIXED: Added pt-20 (padding-top) so content starts BELOW Navbar */}
//       <div className="flex-1 flex flex-col px-4 md:px-12 pt-20 pb-4 relative z-10 h-full">
        
//         {/* Back Button */}
//         {activeTab !== "menu" && (
//             <motion.button 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBackToMenu} 
//                 className="mb-4 w-fit px-6 py-2 bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md text-purple-100 font-bold font-mono rounded-xl shadow-lg border border-purple-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0"
//             >
//                 <FaArrowLeft /> STATION MENU
//             </motion.button>
//         )}

//         {/* ✅ SCROLLABLE AREA */}
//         <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto no-scrollbar">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
                    
//                     {/* ✅ HEADER REMOVED (Duplicate removed as requested) */}

//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
                    
//                     {/* Content Wrappers with Glass Effect */}
//                     {activeTab === "complaints" && <div className={glassCard}><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
//                     {activeTab === "emergency" && <div className={glassCard}><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="h-full"><PoliceConnect currentUser={user} /></div>} 
//                     {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
//                     {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
//                     {activeTab === "support" && <SupportLayout userRole="police" />}
//                 </motion.div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;













// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaArrowLeft, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import SupportLayout from "../components/support/SupportLayout";

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../assets/signup-bg.png';

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
  
//   // ✅ FIX: Removed imports, using direct paths from public folder
//   const audioRef = useRef(new Audio("/siren.mp3")); 
//   const notificationAudio = useRef(new Audio("/notification.mp3")); 

//   // --- AUDIO LOGIC (Siren & Notification) ---
//   const playSiren = () => {
//     const audio = audioRef.current;
//     if (!audio.paused && audio.currentTime > 0) return;
//     audio.loop = true; audio.volume = 1.0; audio.currentTime = 0; 
//     audio.play().catch(error => { console.error("Autoplay Blocked:", error); });
//   };

//   const stopSiren = () => { audioRef.current.pause(); audioRef.current.currentTime = 0; };
//   const playNotificationSound = () => { notificationAudio.current.play().catch(() => {}); };
//   const stopNotificationSound = () => { notificationAudio.current.pause(); notificationAudio.current.currentTime = 0; };

//   const handleTabChange = (tabId) => {
//       if (tabId === 'notices') { navigate('/official-docs/inbox'); return; }
//       setActiveTab(tabId);
//       if (tabId === 'emergency') { setHasNewSOS(false); stopSiren(); }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     // Audio Unlock for Browser Policy
//     const unlockAudio = () => {
//         audioRef.current.play().then(() => { audioRef.current.pause(); }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//     };
//     document.addEventListener('click', unlockAudio);

//     // ✅ AUTOMATIC SIREN LOGIC
//     const socket = io(ENDPOINT);
//     if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//     if(userInfo?.station) socket.emit("join_room", userInfo.station);

//     socket.on("new_crime_report", (newAlert) => {
//         // Agar SOS hai aur meri station ka hai -> Play Siren
//         if (newAlert.isSOS === true && (newAlert.selectedStation === userInfo.station || newAlert.selectedStation === "Central Station")) {
//             toast.error("🚨 CRITICAL SOS RECEIVED!", { duration: 5000, style: { background: '#ef4444', color: '#fff' } });
//             setHasNewSOS(true); 
//             playSiren(); // 🔊 Siren bajega automatically without refresh
//         }
//     });

//     socket.on("receive_direct_msg", (data) => {
//         if (activeTab !== 'connect') {
//             playNotificationSound();
//             toast("New Message: " + data.message, { icon: '💬' });
//         }
//     });

//     return () => { socket.disconnect(); stopSiren(); };
//   }, []); 

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) { navigate("/police"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300";

//   return (
//     <div className={`h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden transition-all duration-500 ${hasNewSOS ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.5)]' : ''}`}>
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={dashboardBg} 
//             alt="Background" 
//             className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" 
//           />
//           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${hasNewSOS ? 'from-red-900/40 via-black/60 to-black/80' : 'from-slate-900/30 via-black/50 to-black/40'}`}></div>
//       </div>

//       {/* ✅ CONTENT CONTAINER: pt-20 ensures it starts BELOW Navbar */}
//       <div className="flex-1 flex flex-col px-4 md:px-12 pt-20 pb-4 relative z-10 h-full overflow-hidden">
        
//         {/* Back Button */}
//         {activeTab !== "menu" && (
//             <motion.button 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBackToMenu} 
//                 className="mb-4 w-fit px-6 py-2 bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md text-purple-100 font-bold font-mono rounded-xl shadow-lg border border-purple-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0"
//             >
//                 <FaArrowLeft /> STATION MENU
//             </motion.button>
//         )}

//         {/* ✅ SCROLLABLE AREA */}
//         <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto no-scrollbar">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
                    
//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
                    
//                     {/* Content Wrappers with Glass Effect */}
//                     {activeTab === "complaints" && <div className={glassCard}><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
//                     {activeTab === "emergency" && <div className={glassCard}><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="h-full"><PoliceConnect currentUser={user} /></div>} 
//                     {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
//                     {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
//                     {activeTab === "support" && <SupportLayout userRole="police" />}
//                 </motion.div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;






// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaArrowLeft, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import SupportLayout from "../components/support/SupportLayout";

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../assets/signup-bg.png';

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
  
//   // ✅ Audio & Socket Refs
//   const audioRef = useRef(new Audio("/siren.mp3")); 
//   const notificationAudio = useRef(new Audio("/notification.mp3")); 
//   const socketRef = useRef(null);

//   // --- AUDIO LOGIC (Force Play) ---
//   const playSiren = () => {
//     const audio = audioRef.current;
    
//     // Force reset for instant replay
//     audio.pause();
//     audio.currentTime = 0;
//     audio.loop = true;
//     audio.volume = 1.0;
    
//     const playPromise = audio.play();
//     if (playPromise !== undefined) {
//         playPromise.catch(error => {
//             console.error("Autoplay Error:", error);
//             // Backup Toast if browser blocks sound
//             toast.error("🚨 CLICK TO START SIREN", { 
//                 id: 'siren-block-alert',
//                 duration: 10000,
//                 style: { background: 'red', color: 'white', fontWeight: 'bold' }
//             });
//         });
//     }
//   };

//   const stopSiren = () => { 
//       const audio = audioRef.current;
//       audio.pause(); 
//       audio.currentTime = 0; 
//       toast.dismiss('siren-block-alert');
//   };

//   const playNotificationSound = () => { notificationAudio.current.play().catch(() => {}); };
//   const stopNotificationSound = () => { notificationAudio.current.pause(); notificationAudio.current.currentTime = 0; };

//   const handleTabChange = (tabId) => {
//       if (tabId === 'notices') { navigate('/official-docs/inbox'); return; }
//       setActiveTab(tabId);
//       if (tabId === 'emergency') { 
//           setHasNewSOS(false); 
//           stopSiren(); 
//       }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     // ✅ Browser Autoplay Unlocker
//     const unlockAudio = () => {
//         audioRef.current.play().then(() => { audioRef.current.pause(); }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//     };
//     document.addEventListener('click', unlockAudio);

//     // ✅ SOCKET CONNECTION LOGIC (Strict Mode Safe)
//     if (!socketRef.current) {
//         socketRef.current = io(ENDPOINT, { 
//             transports: ['websocket'],
//             reconnection: true
//         });

//         const socket = socketRef.current;

//         if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//         if(userInfo?.station) socket.emit("join_room", userInfo.station);

//         socket.on("connect", () => console.log("🟢 Socket Connected:", socket.id));

//         // ✅ SOS LISTENER
//         socket.on("new_crime_report", (newAlert) => {
//             console.log("🔥 ALERT EVENT RECEIVED:", newAlert);

//             // Allow SOS for ALL stations (Global Alert)
//             if (newAlert.isSOS === true) {
//                 console.log("🚨 SOS DETECTED -> PLAYING SIREN");
                
//                 toast.error(`🚨 SOS ALERT: ${newAlert.selectedStation}`, { 
//                     duration: 8000, 
//                     style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' },
//                     icon: '🆘'
//                 });
                
//                 setHasNewSOS(true); 
//                 playSiren(); 
//             }
//         });

//         socket.on("receive_direct_msg", (data) => {
//             if (activeTab !== 'connect') {
//                 playNotificationSound();
//                 toast("New Message: " + data.message, { icon: '💬' });
//             }
//         });
//     }

//     // Cleanup Logic
//     return () => {
//         // Red Error Fix: Don't disconnect if socket is still connecting
//         if (socketRef.current) {
//             socketRef.current.removeAllListeners();
//             if (socketRef.current.connected) {
//                 socketRef.current.disconnect();
//             }
//             socketRef.current = null;
//         }
//         stopSiren();
//         document.removeEventListener('click', unlockAudio);
//     };
//   }, []); 

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) { navigate("/police"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300";

//   return (
//     <div className={`h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden transition-all duration-500 ${hasNewSOS ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.9)] border-4 border-red-600 animate-pulse' : ''}`}>
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={dashboardBg} 
//             alt="Background" 
//             className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" 
//           />
//           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${hasNewSOS ? 'from-red-900/80 via-black/80 to-black/90' : 'from-slate-900/30 via-black/50 to-black/40'}`}></div>
//       </div>

//       {/* ✅ PADDING FIXED (pt-24 for safe spacing) */}
//       <div className="flex-1 flex flex-col px-4 md:px-12 pt-24 pb-4 relative z-10 h-full">
        
//         {/* Back Button */}
//         {activeTab !== "menu" && (
//             <motion.button 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBackToMenu} 
//                 className="mb-4 w-fit px-6 py-2 bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md text-purple-100 font-bold font-mono rounded-xl shadow-lg border border-purple-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0"
//             >
//                 <FaArrowLeft /> STATION MENU
//             </motion.button>
//         )}

//         {/* ✅ SCROLLABLE AREA */}
//         <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto no-scrollbar">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
                    
//                     {/* Menu receives blinking prop */}
//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
                    
//                     {activeTab === "complaints" && <div className={glassCard}><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
//                     {activeTab === "emergency" && <div className={glassCard}><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="h-full"><PoliceConnect currentUser={user} /></div>} 
//                     {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
//                     {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
//                     {activeTab === "support" && <SupportLayout userRole="police" />}
//                 </motion.div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;











// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaArrowLeft, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import SupportLayout from "../components/support/SupportLayout";

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../assets/signup-bg.png';

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
  
//   // ✅ Audio & Socket Refs
//   const audioRef = useRef(new Audio("/siren.mp3")); 
//   const notificationAudio = useRef(new Audio("/notification.mp3")); 
//   const socketRef = useRef(null);

//   // --- AUDIO LOGIC (Force Play) ---
//   const playSiren = () => {
//     const audio = audioRef.current;
    
//     // Force reset for instant replay
//     audio.pause();
//     audio.currentTime = 0;
//     audio.loop = true;
//     audio.volume = 1.0;
    
//     const playPromise = audio.play();
//     if (playPromise !== undefined) {
//         playPromise.catch(error => {
//             console.error("Autoplay Error:", error);
//             // Backup Toast if browser blocks sound
//             toast.error("🚨 CLICK TO START SIREN", { 
//                 id: 'siren-block-alert',
//                 duration: 10000,
//                 style: { background: 'red', color: 'white', fontWeight: 'bold' }
//             });
//         });
//     }
//   };

//   const stopSiren = () => { 
//       const audio = audioRef.current;
//       audio.pause(); 
//       audio.currentTime = 0; 
//       toast.dismiss('siren-block-alert');
//   };

//   const playNotificationSound = () => { notificationAudio.current.play().catch(() => {}); };
//   const stopNotificationSound = () => { notificationAudio.current.pause(); notificationAudio.current.currentTime = 0; };

//   const handleTabChange = (tabId) => {
//       if (tabId === 'notices') { navigate('/official-docs/inbox'); return; }
//       setActiveTab(tabId);
//       if (tabId === 'emergency') { 
//           setHasNewSOS(false); 
//           stopSiren(); 
//       }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     // ✅ Browser Autoplay Unlocker
//     const unlockAudio = () => {
//         audioRef.current.play().then(() => { audioRef.current.pause(); }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//     };
//     document.addEventListener('click', unlockAudio);

//     // ✅ SOCKET CONNECTION LOGIC (Strict Mode Safe)
//     if (!socketRef.current) {
//         socketRef.current = io(ENDPOINT, { 
//             transports: ['websocket'],
//             reconnection: true
//         });

//         const socket = socketRef.current;

//         if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//         if(userInfo?.station) socket.emit("join_room", userInfo.station);

//         socket.on("connect", () => console.log("🟢 Socket Connected:", socket.id));

//         // ✅ SOS LISTENER
//         socket.on("new_crime_report", (newAlert) => {
//             console.log("🔥 ALERT EVENT RECEIVED:", newAlert);

//             // Allow SOS for ALL stations (Global Alert)
//             if (newAlert.isSOS === true) {
//                 console.log("🚨 SOS DETECTED -> PLAYING SIREN");
                
//                 toast.error(`🚨 SOS ALERT: ${newAlert.selectedStation}`, { 
//                     duration: 8000, 
//                     style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' },
//                     icon: '🆘'
//                 });
                
//                 setHasNewSOS(true); 
//                 playSiren(); 
//             }
//         });

//         socket.on("receive_direct_msg", (data) => {
//             if (activeTab !== 'connect') {
//                 playNotificationSound();
//                 toast("New Message: " + data.message, { icon: '💬' });
//             }
//         });
//     }

//     // Cleanup Logic
//     return () => {
//         // Red Error Fix: Don't disconnect if socket is still connecting
//         if (socketRef.current) {
//             socketRef.current.removeAllListeners();
//             if (socketRef.current.connected) {
//                 socketRef.current.disconnect();
//             }
//             socketRef.current = null;
//         }
//         stopSiren();
//         document.removeEventListener('click', unlockAudio);
//     };
//   }, []); 

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) { navigate("/police"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300";

//   return (
//     <div className={`h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden transition-all duration-500 ${hasNewSOS ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.9)] border-4 border-red-600 animate-pulse' : ''}`}>
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={dashboardBg} 
//             alt="Background" 
//             className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" 
//           />
//           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${hasNewSOS ? 'from-red-900/80 via-black/80 to-black/90' : 'from-slate-900/30 via-black/50 to-black/40'}`}></div>
//       </div>

//       {/* ✅ PADDING FIXED (pt-24 for safe spacing) */}
//       <div className="flex-1 flex flex-col px-4 md:px-12 pt-24 pb-4 relative z-10 h-full">
        
//         {/* Back Button */}
//         {activeTab !== "menu" && (
//             <motion.button 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBackToMenu} 
//                 className="mb-4 w-fit px-6 py-2 bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md text-purple-100 font-bold font-mono rounded-xl shadow-lg border border-purple-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0"
//             >
//                 <FaArrowLeft /> STATION MENU
//             </motion.button>
//         )}

//         {/* Temporary Test Button (You can remove this later) */}
//         {/* <button onClick={playSiren} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded z-50">Test Siren</button> */}

//         {/* ✅ SCROLLABLE AREA */}
//         <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto no-scrollbar">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
                    
//                     {/* Menu receives blinking prop */}
//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
                    
//                     {activeTab === "complaints" && <div className={glassCard}><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
//                     {activeTab === "emergency" && <div className={glassCard}><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="h-full"><PoliceConnect currentUser={user} /></div>} 
//                     {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
//                     {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
//                     {activeTab === "support" && <SupportLayout userRole="police" />}
//                 </motion.div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;






// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaArrowLeft, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import SupportLayout from "../components/support/SupportLayout";

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../assets/signup-bg.png';

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [hasNewSOS, setHasNewSOS] = useState(false);
  
//   const navigate = useNavigate();
  
//   // ✅ Audio Refs
//   const audioRef = useRef(new Audio("/siren.mp3")); 
//   const notificationAudio = useRef(new Audio("/notification.mp3")); 
//   const socketRef = useRef(null);

//   // --- AUDIO LOGIC ---
//   const playSiren = () => {
//     const audio = audioRef.current;
    
//     // Force reset
//     audio.pause();
//     audio.currentTime = 0;
//     audio.loop = true;
//     audio.volume = 1.0;
    
//     const playPromise = audio.play();
//     if (playPromise !== undefined) {
//         playPromise
//             .then(() => console.log("✅ Siren Playing Successfully!"))
//             .catch(error => {
//                 console.error("❌ Autoplay Failed:", error);
//                 alert("Audio Blocked! Please click the screen once.");
//             });
//     }
//   };

//   const stopSiren = () => { 
//       const audio = audioRef.current;
//       audio.pause(); 
//       audio.currentTime = 0; 
//   };

//   const playNotificationSound = () => { notificationAudio.current.play().catch(() => {}); };
//   const stopNotificationSound = () => { notificationAudio.current.pause(); notificationAudio.current.currentTime = 0; };

//   const handleTabChange = (tabId) => {
//       if (tabId === 'notices') { navigate('/official-docs/inbox'); return; }
//       setActiveTab(tabId);
//       if (tabId === 'emergency') { setHasNewSOS(false); stopSiren(); }
//       if (tabId === 'connect') { stopNotificationSound(); }
//   };

//   useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     // ✅ Browser Unlocker
//     const unlockAudio = () => {
//         audioRef.current.play().then(() => { audioRef.current.pause(); }).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//     };
//     document.addEventListener('click', unlockAudio);

//     // ✅ SOCKET CONNECTION
//     if (!socketRef.current) {
//         socketRef.current = io(ENDPOINT, { transports: ['websocket'] });
//         const socket = socketRef.current;

//         if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//         if(userInfo?.station) socket.emit("join_room", userInfo.station);

//         socket.on("connect", () => console.log("🟢 Socket Connected:", socket.id));

//         // ✅ SOS LISTENER (Global Alert)
//         socket.on("new_crime_report", (newAlert) => {
//             console.log("🔥 RAW ALERT DATA:", newAlert); // <--- Check Console for this

//             // Check if isSOS is strictly true OR string "true"
//             const isEmergency = newAlert.isSOS === true || newAlert.isSOS === "true";

//             if (isEmergency) {
//                 console.log("🚨 TRIGGERING ALERT SYSTEM...");
//                 toast.error(`🚨 SOS ALERT FROM: ${newAlert.selectedStation}`, { 
//                     duration: 10000, 
//                     style: { background: '#ef4444', color: '#fff', fontWeight: 'bold', fontSize: '18px' } 
//                 });
//                 setHasNewSOS(true); 
//                 playSiren(); 
//             } else {
//                 console.log("ℹ️ Event received but isSOS was false/undefined");
//             }
//         });

//         socket.on("receive_direct_msg", (data) => {
//             if (activeTab !== 'connect') {
//                 playNotificationSound();
//                 toast("New Message: " + data.message, { icon: '💬' });
//             }
//         });
//     }

//     return () => {
//         if (socketRef.current) {
//             socketRef.current.disconnect();
//             socketRef.current = null;
//         }
//         stopSiren();
//         document.removeEventListener('click', unlockAudio);
//     };
//   }, []); 

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) { navigate("/police"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300";

//   return (
//     <div className={`h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden transition-all duration-500 ${hasNewSOS ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.9)] border-4 border-red-600 animate-pulse' : ''}`}>
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* --- BACKGROUND --- */}
//       <div className="fixed inset-0 z-0">
//           <img src={dashboardBg} alt="Background" className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" />
//           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${hasNewSOS ? 'from-red-900/80 via-black/80 to-black/90' : 'from-slate-900/30 via-black/50 to-black/40'}`}></div>
//       </div>

//       {/* ✅ TESTING BUTTON (Temporary) */}
//       <button 
//         onClick={playSiren} 
//         className="fixed top-24 right-10 z-50 bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-2xl animate-bounce border-2 border-white hover:bg-red-700"
//       >
//         🔊 FORCE TEST SIREN
//       </button>

//       {/* Content */}
//       <div className="flex-1 flex flex-col px-4 md:px-12 pt-24 pb-4 relative z-10 h-full">
//         {activeTab !== "menu" && (
//             <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={handleBackToMenu} className="mb-4 w-fit px-6 py-2 bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md text-purple-100 font-bold font-mono rounded-xl shadow-lg border border-purple-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0">
//                 <FaArrowLeft /> STATION MENU
//             </motion.button>
//         )}

//         <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto no-scrollbar">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
//                     {activeTab === "complaints" && <div className={glassCard}><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
//                     {activeTab === "emergency" && <div className={glassCard}><EmergencyAlerts /></div>}
//                     {activeTab === "connect" && <div className="h-full"><PoliceConnect currentUser={user} /></div>} 
//                     {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
//                     {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
//                     {activeTab === "support" && <SupportLayout userRole="police" />}
//                 </motion.div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;






// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster, toast } from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaArrowLeft } from "react-icons/fa"; 
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";

// // Components
// import PoliceMenu from "../components/policeDashboard/PoliceMenu";
// import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
// import FileFIR from "../components/policeDashboard/FileFIR"; 
// import PastCrimes from "../components/policeDashboard/PastCrimes"; 
// import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
// import FaceDetection from "../components/policeDashboard/FaceDetection"; 
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
// import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
// import SupportLayout from "../components/support/SupportLayout";

// // Assets
// import dashboardBg from '../assets/signup-bg.png';

// const ENDPOINT = "https://crimetrack-api.onrender.com"; 

// const PoliceDashboard = ({ defaultTab = "menu" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
//   const [loading, setLoading] = useState(true);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
  
//   // ✅ STATE FOR PERSISTENT ALERT
//   const [pendingSOSCount, setPendingSOSCount] = useState(0);
  
//   const navigate = useNavigate();
  
//   // ✅ Refs
//   const audioRef = useRef(new Audio("/siren.mp3")); 
//   const socketRef = useRef(null);

//   // --- 1. CHECK ACTIVE SOS FROM DB (Persistence Logic) ---
//   const checkActiveSOS = async () => {
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           if (!userInfo) return;

//           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//           const { data } = await axios.get(`${ENDPOINT}/api/crime/all`, config);

//           // Count SOS that are OPEN and NOT ASSIGNED yet
//           const activeEmergencies = data.filter(r => 
//               r.isSOS === true && 
//               r.status !== "Closed" && 
//               (r.assignedOfficer === "Not Assigned" || !r.assignedOfficer)
//           );

//           setPendingSOSCount(activeEmergencies.length);
//       } catch (error) {
//           console.error("Sync Error:", error);
//       }
//   };

//   // --- 2. AUDIO CONTROL BASED ON STATE ---
//   useEffect(() => {
//       const audio = audioRef.current;
      
//       if (pendingSOSCount > 0) {
//           // Alert Condition: Play Loop
//           console.log("🚨 Active SOS Found! Playing Siren...");
//           audio.loop = true;
//           audio.volume = 1.0;
//           const playPromise = audio.play();
          
//           if (playPromise !== undefined) {
//               playPromise.catch(() => {
//                   // Only show toast if autoplay is actually blocked to avoid spam
//                   toast.error("🚨 CLICK HERE TO ENABLE SIREN", { id: 'permission-toast' });
//               });
//           }
//       } else {
//           // Safe Condition: Stop
//           audio.pause();
//           audio.currentTime = 0;
//           toast.dismiss('permission-toast');
//       }
//   }, [pendingSOSCount]);

//   // --- 3. INITIAL SETUP & SOCKET ---
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) setUser(userInfo);
//     setTimeout(() => setLoading(false), 800);

//     // Initial Check on Load
//     checkActiveSOS();

//     // Unlock Audio Context
//     const unlockAudio = () => {
//         audioRef.current.play().then(() => audioRef.current.pause()).catch(() => {});
//         document.removeEventListener('click', unlockAudio);
//     };
//     document.addEventListener('click', unlockAudio);

//     // ✅ SOCKET CONNECTION
//     if (!socketRef.current) {
//         socketRef.current = io(ENDPOINT, { 
//             transports: ['websocket'], 
//             reconnectionAttempts: 5,
//             reconnectionDelay: 1000
//         });

//         const socket = socketRef.current;

//         socket.on("connect", () => {
//             console.log("🟢 Socket Connected ID:", socket.id);
//             if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
//             if(userInfo?.station) socket.emit("join_room", userInfo.station);
//         });

//         // 🔥 REAL-TIME SOS EVENT
//         socket.on("new_crime_report", (newAlert) => {
//             if (newAlert.isSOS === true) {
//                 console.log("🔥 NEW SOS RECEIVED via Socket");
//                 toast.error(`🚨 NEW SOS: ${newAlert.selectedStation}`, { 
//                     duration: 8000, 
//                     style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' },
//                     icon: '🆘'
//                 });
//                 // Increment count immediately to trigger siren logic
//                 setPendingSOSCount(prev => prev + 1);
//             }
//         });
//     }

//     // ✅ POLLING BACKUP (Har 5 second me DB check karega)
//     const intervalId = setInterval(checkActiveSOS, 5000);

//     return () => {
//         if (socketRef.current) {
//             socketRef.current.disconnect();
//             socketRef.current = null;
//         }
//         clearInterval(intervalId);
//         const audio = audioRef.current;
//         audio.pause();
//         audio.currentTime = 0;
//         document.removeEventListener('click', unlockAudio);
//     };
//   }, []); 

//   // ✅ 4. MISSING HANDLER ADDED HERE
//   const handleTabChange = (tabId) => {
//       if (tabId === 'notices') { navigate('/official-docs/inbox'); return; }
//       setActiveTab(tabId);
      
//       // Stop Siren temporarily when officer enters Emergency Tab to work
//       if (tabId === 'emergency') { 
//           const audio = audioRef.current;
//           audio.pause();
//           audio.currentTime = 0;
//       }
//   };

//   const handleBackToMenu = () => { 
//       if (window.location.pathname.includes("/police/complaints")) { navigate("/police"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
//   };

//   const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
//   const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

//   // --- STYLES ---
//   const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300";

//   return (
//     // ✅ BLINKING LOGIC BASED ON COUNT > 0
//     <div className={`h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden transition-all duration-500 ${pendingSOSCount > 0 ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.9)] border-4 border-red-600 animate-pulse' : ''}`}>
//       <Navbar />
//       <Toaster position="top-center" />
      
//       <div className="fixed inset-0 z-0">
//           <img src={dashboardBg} alt="Background" className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" />
//           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${pendingSOSCount > 0 ? 'from-red-900/80 via-black/80 to-black/90' : 'from-slate-900/30 via-black/50 to-black/40'}`}></div>
//       </div>

//       <div className="flex-1 flex flex-col px-4 md:px-12 pt-24 pb-4 relative z-10 h-full">
//         {activeTab !== "menu" && (
//             <motion.button 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBackToMenu} 
//                 className="mb-4 w-fit px-6 py-2 bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md text-purple-100 font-bold font-mono rounded-xl shadow-lg border border-purple-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0"
//             >
//                 <FaArrowLeft /> STATION MENU
//             </motion.button>
//         )}

//         <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto no-scrollbar">
//             {loading ? <SkeletonLoader count={1} type="card" /> : (
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
                    
//                     {/* Pass State to Menu if needed */}
//                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={pendingSOSCount > 0} />}
                    
//                     {activeTab === "complaints" && <div className={glassCard}><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
//                     {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
//                     {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
                    
//                     {/* Emergency Tab */}
//                     {activeTab === "emergency" && <div className={glassCard}><EmergencyAlerts /></div>}
                    
//                     {activeTab === "connect" && <div className="h-full"><PoliceConnect currentUser={user} /></div>} 
//                     {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
//                     {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
//                     {activeTab === "support" && <SupportLayout userRole="police" />}
//                 </motion.div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoliceDashboard;


import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import { io } from "socket.io-client";
import axios from "axios";
import { FaArrowLeft, FaVolumeUp } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";

// Components
import PoliceMenu from "../components/policeDashboard/PoliceMenu";
import ViewComplaints from "../components/policeDashboard/ViewComplaints"; 
import FileFIR from "../components/policeDashboard/FileFIR"; 
import PastCrimes from "../components/policeDashboard/PastCrimes"; 
import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity"; 
import FaceDetection from "../components/policeDashboard/FaceDetection"; 
import SkeletonLoader from "../components/common/SkeletonLoader";
import EmergencyAlerts from "../components/policeDashboard/EmergencyAlerts"; 
import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 
import SupportLayout from "../components/support/SupportLayout";

// Assets
import dashboardBg from '../assets/dashboard-bg.png';

const ENDPOINT = "https://crimetrack-api.onrender.com"; 

const PoliceDashboard = ({ defaultTab = "menu" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
  const [loading, setLoading] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  
  // ✅ STATE FOR PERSISTENT ALERT
  const [pendingSOSCount, setPendingSOSCount] = useState(0);
  const [isAudioBlocked, setIsAudioBlocked] = useState(false);
  
  const navigate = useNavigate();
  
  // ✅ Refs
  const audioRef = useRef(new Audio("/siren.mp3")); 
  const socketRef = useRef(null);

  // --- 1. CHECK ACTIVE SOS FROM DB (Faster Polling) ---
  const checkActiveSOS = async () => {
      try {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          if (!userInfo) return;

          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.get(`${ENDPOINT}/api/crime/all`, config);

          // Only count SOS that are genuinely PENDING (Not Assigned)
          const activeEmergencies = data.filter(r => 
              r.isSOS === true && 
              r.status !== "Closed" && 
              (r.assignedOfficer === "Not Assigned" || !r.assignedOfficer)
          );

          console.log(`🔍 Active SOS Check: Found ${activeEmergencies.length} pending cases.`);
          setPendingSOSCount(activeEmergencies.length);
      } catch (error) {
          console.error("Sync Error:", error);
      }
  };

  // --- 2. ROBUST AUDIO CONTROL ---
  useEffect(() => {
      const audio = audioRef.current;
      audio.preload = "auto"; 

      const playAudio = async () => {
          if (pendingSOSCount > 0) {
              // Only play if not already playing to avoid stutter
              if (audio.paused) {
                  console.log("🚨 Siren Loop Started...");
                  audio.loop = true;
                  audio.volume = 1.0;
                  try {
                      await audio.play();
                      setIsAudioBlocked(false); 
                  } catch (error) {
                      console.warn("⚠️ Autoplay prevented. Showing Unmute Overlay.");
                      setIsAudioBlocked(true); 
                  }
              }
          } else {
              // Stop Immediately if Count is 0
              if (!audio.paused) {
                  console.log("✅ No Pending SOS. Stopping Siren.");
                  audio.pause();
                  audio.currentTime = 0;
                  setIsAudioBlocked(false);
              }
          }
      };

      playAudio();
  }, [pendingSOSCount]);

  // ✅ FORCE UNMUTE
  const handleForceUnmute = () => {
      const audio = audioRef.current;
      audio.play().then(() => {
          setIsAudioBlocked(false);
      }).catch(e => console.error("Still blocked", e));
  };

  // ✅ Force Refresh when Officer Accepts an SOS
  const handleSOSAccepted = () => {
      console.log("👮‍♂️ Officer Accepted SOS. Refreshing State...");
      checkActiveSOS(); // Immediate Re-check
      // Note: checkActiveSOS will fetch DB -> find 0 pending -> setPendingSOSCount(0) -> useEffect stops Siren.
  };

  // --- 3. INITIAL SETUP & SOCKET ---
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) setUser(userInfo);
    setTimeout(() => setLoading(false), 800);

    checkActiveSOS();

    // SUPER AGGRESSIVE UNLOCKER
    const unlockAudio = () => {
        const audio = audioRef.current;
        if (audio.paused && pendingSOSCount > 0) {
            audio.play().catch(() => {});
        }
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    // SOCKET CONNECTION
    if (!socketRef.current) {
        socketRef.current = io(ENDPOINT, { 
            transports: ['websocket'], 
            reconnectionAttempts: 5,
            autoConnect: true
        });

        const socket = socketRef.current;

        socket.on("connect", () => {
            console.log("🟢 Socket Connected");
            if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
            if(userInfo?.station) socket.emit("join_room", userInfo.station);
        });

        socket.on("new_crime_report", (newAlert) => {
            if (newAlert.isSOS === true) {
                console.log("🔥 NEW SOS RECEIVED via Socket");
                toast.error(`🚨 NEW SOS: ${newAlert.selectedStation}`, { 
                    duration: 5000, 
                    style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' },
                    icon: '🆘'
                });
                checkActiveSOS(); // Re-fetch to confirm pending count
            }
        });
        
        // Listen for updates (if another officer accepts)
        socket.on("report_updated", () => {
            console.log("🔄 Report Updated externally. Refreshing...");
            checkActiveSOS();
        });
    }

    // ✅ FASTER POLLING (Every 3 Seconds)
    const intervalId = setInterval(checkActiveSOS, 3000);

    return () => {
        if (socketRef.current) {
            if (socketRef.current.connected) socketRef.current.disconnect();
            socketRef.current.removeAllListeners();
            socketRef.current = null;
        }
        clearInterval(intervalId);
        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
    };
  }, []); 

  const handleTabChange = (tabId) => {
      if (tabId === 'notices') { navigate('/official-docs/inbox'); return; }
      setActiveTab(tabId);
      
      // OPTIONAL: Stop siren when entering Emergency Tab to talk?
      // Currently DISABLED so it keeps ringing until ACCEPTED
      // if (tabId === 'emergency') { ... } 
  };

  const handleBackToMenu = () => { 
      if (window.location.pathname.includes("/police/complaints")) { navigate("/police"); } else { setActiveTab("menu"); setSelectedCaseId(null); }
  };

  const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
  const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

  // --- STYLES ---
  const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300";

  return (
    <div className="h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden">
      
      {/* OVERLAYS */}
      {pendingSOSCount > 0 && (
        <div className="fixed inset-0 z-[50] pointer-events-none border-[10px] border-red-600 shadow-[inset_0_0_100px_rgba(220,38,38,0.9)] animate-pulse"></div>
      )}

      {pendingSOSCount > 0 && isAudioBlocked && (
        <div onClick={handleForceUnmute} className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center cursor-pointer animate-pulse">
            <FaVolumeUp className="text-6xl text-red-500 mb-4 animate-bounce" />
            <h1 className="text-4xl font-black text-white uppercase tracking-widest">🚨 SOS ACTIVE 🚨</h1>
            <p className="text-xl text-gray-300 mt-2 font-bold bg-red-600 px-6 py-2 rounded-full">CLICK TO UNMUTE SIREN</p>
        </div>
      )}

      <Navbar />
      <Toaster position="top-center" />
      
      <div className="fixed inset-0 z-0">
          <img src={dashboardBg} alt="Background" className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" />
          <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${pendingSOSCount > 0 ? 'from-red-900/80 via-black/80 to-black/90' : 'from-slate-900/30 via-black/50 to-black/40'}`}></div>
      </div>

      <div className="flex-1 flex flex-col px-4 md:px-12 pt-24 pb-4 relative z-10 h-full">
        {activeTab !== "menu" && (
            <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={handleBackToMenu} className="mb-4 w-fit px-6 py-2 bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md text-purple-100 font-bold font-mono rounded-xl shadow-lg border border-purple-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 shrink-0">
                <FaArrowLeft /> STATION MENU
            </motion.button>
        )}

        <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-y-auto custom-scrollbar">
            {loading ? <SkeletonLoader count={1} type="card" /> : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col w-full pb-20">
                    
                    {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={pendingSOSCount > 0} />}
                    {activeTab === "complaints" && <div className={glassCard}><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
                    {activeTab === "fir" && <div className={glassCard}><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
                    {activeTab === "history" && <div className={glassCard}><PastCrimes /></div>}
                    
                    {/* ✅ Pass Refresh Handler to EmergencyAlerts */}
                    {activeTab === "emergency" && <div className={glassCard}><EmergencyAlerts onSOSResolved={handleSOSAccepted} /></div>}
                    
                    {activeTab === "connect" && <div className="h-full"><PoliceConnect currentUser={user} /></div>} 
                    {activeTab === "cctv" && <div className={glassCard}><SuspiciousActivity /></div>}
                    {activeTab === "face" && <div className={glassCard}><FaceDetection /></div>}
                    {activeTab === "support" && <SupportLayout userRole="police" />}
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;