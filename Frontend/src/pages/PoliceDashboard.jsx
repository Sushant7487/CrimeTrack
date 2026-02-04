

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import { io } from "socket.io-client";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 

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

// Sound Assets
import sirenSoundFile from "/siren.mp3"; 
import notifSoundFile from "/notification.mp3";

const ENDPOINT = "https://crimetrack-api.onrender.com"; 

const PoliceDashboard = ({ defaultTab = "menu" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [user, setUser] = useState({ name: "Officer", designation: "Police", station: "Central Station" });
  const [loading, setLoading] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [hasNewSOS, setHasNewSOS] = useState(false);
  
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(sirenSoundFile));
  const notificationAudio = useRef(new Audio(notifSoundFile)); 

  // ✅ --- AUDIO LOGIC (Robust) ---
  const playSiren = () => {
    const audio = audioRef.current;
    // Prevent stuttering if already playing
    if (!audio.paused && audio.currentTime > 0) return;

    audio.loop = true; 
    audio.volume = 1.0;
    audio.currentTime = 0; // Reset to start
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("Autoplay Blocked:", error);
            // Persistent visual alert if audio blocked
            toast((t) => (
                <div onClick={() => { audio.play(); toast.dismiss(t.id); }} className="flex items-center gap-4 cursor-pointer p-4 bg-red-600 rounded-lg text-white">
                    <span className="text-3xl animate-pulse">🚨</span> 
                    <div>
                        <b className="uppercase text-sm block">Emergency Alert!</b>
                        <p className="text-xs underline">Tap to UNMUTE Siren</p>
                    </div>
                </div>
            ), { id: 'siren-toast', duration: Infinity, position: "top-center" });
        });
    }
  };

  const stopSiren = () => {
      const audio = audioRef.current;
      audio.pause();
      audio.currentTime = 0;
      toast.dismiss('siren-toast');
  };

  const playNotificationSound = () => {
      const audio = notificationAudio.current;
      if (audio.paused) {
          audio.currentTime = 0;
          audio.play().catch(() => {}); 
      }
  };

  const stopNotificationSound = () => {
      const audio = notificationAudio.current;
      audio.pause();
      audio.currentTime = 0;
  };

  // ✅ --- TAB HANDLING ---
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // ✅ --- MAIN LOGIC (Socket + Polling) ---
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) setUser(userInfo);
    setTimeout(() => setLoading(false), 800);

    // 1. Silent Unlock for Mobile Audio
    const unlockAudio = () => {
        const siren = audioRef.current;
        const notif = notificationAudio.current;
        siren.volume = 0; notif.volume = 0;
        siren.play().then(() => { siren.pause(); siren.currentTime = 0; siren.volume = 1; }).catch(() => {});
        notif.play().then(() => { notif.pause(); notif.currentTime = 0; notif.volume = 1; }).catch(() => {});
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio); // ✅ Mobile Touch Support
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    // 2. CHECK FUNCTION (API Call)
    const checkPendingSOS = async () => {
        try {
            if (!userInfo?.token) return;
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/all", config);
            
            const pendingAlert = data.find(c => 
                c.isSOS === true && 
                c.status !== "Closed" && 
                c.assignedOfficer === "Not Assigned" && 
                (c.selectedStation === userInfo.station || c.selectedStation === "Central Station")
            );

            if (pendingAlert) {
                if (!hasNewSOS) { // Only trigger if state changes
                    setHasNewSOS(true);
                    playSiren();
                }
            } else {
                setHasNewSOS(false);
                stopSiren();
            }
        } catch (error) { 
            console.error("SOS Check Failed"); 
        }
    };

    // 3. Initial Check
    if (userInfo) checkPendingSOS();

    // 4. ✅ POLLING INTERVAL (Backup for Socket)
    // Checks every 4 seconds automatically
    const pollingInterval = setInterval(() => {
        if (userInfo) checkPendingSOS();
    }, 4000);

    // 5. ✅ SOCKET CONNECTION (Real-Time)
    const socket = io(ENDPOINT);
    if(userInfo?._id) socket.emit("register_officer", userInfo._id); 
    if(userInfo?.station) socket.emit("join_room", userInfo.station);

    // Handle SOS via Socket (Instant)
    socket.on("new_crime_report", (newAlert) => {
        const isSOS = newAlert.isSOS === true;
        const isMyStation = newAlert.selectedStation === userInfo.station || newAlert.selectedStation === "Central Station";
        if (isSOS && isMyStation) {
            toast.error("🚨 CRITICAL SOS RECEIVED!", { id: 'new-sos-toast', duration: 5000, style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' } });
            setHasNewSOS(true);
            playSiren();
        }
    });

    // Handle Chat
    socket.on("receive_direct_msg", (data) => {
        if (activeTab !== 'connect') {
            playNotificationSound();
            toast.custom((t) => (
               <div onClick={() => { setActiveTab('connect'); stopNotificationSound(); toast.dismiss(t.id); }} className="bg-gray-800 border-l-4 border-emerald-500 p-4 rounded shadow-2xl cursor-pointer flex items-center gap-4 w-72 animate-bounce">
                   <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">💬</div>
                   <div><p className="font-bold text-white text-sm">Msg from {data.senderName}</p><p className="text-xs text-gray-400 truncate w-40">{data.message}</p></div>
               </div>
            ), { id: 'msg-toast', duration: 5000, position: 'top-right' });
        }
    });

    return () => {
        socket.disconnect();
        clearInterval(pollingInterval); // Clean up polling
        stopSiren();
        stopNotificationSound();
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
    };
  }, []); // Run once on mount

  const handleTabChange = (tabId) => {
      setActiveTab(tabId);
      if (tabId === 'emergency') { setHasNewSOS(false); stopSiren(); }
      if (tabId === 'connect') { stopNotificationSound(); }
  };

  const handleBackToMenu = () => { 
      if (window.location.pathname.includes("/police/complaints")) {
          navigate("/police");
      } else {
          setActiveTab("menu"); 
          setSelectedCaseId(null); 
      }
  };

  const handleFileRecordRequest = (id) => { setSelectedCaseId(id); setActiveTab("fir"); };
  const handleFIRClose = () => { if (selectedCaseId) { setActiveTab("complaints"); } else { setActiveTab("menu"); } setSelectedCaseId(null); };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Navbar />
      <Toaster position="top-center" />
      
      {/* ✅ Responsive Padding for Mobile & Desktop */}
      <div className="flex-1 px-4 sm:px-6 md:px-12 py-20 md:py-24">
        
        {/* Back Button - Responsive */}
        {activeTab !== "menu" && (
            <button 
                onClick={handleBackToMenu} 
                className="mb-6 w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center md:justify-start gap-2 transition-all active:scale-95"
            >
                <FaArrowLeft /> Back to Station Menu
            </button>
        )}

        <div className="max-w-6xl mx-auto">
            {loading ? <SkeletonLoader count={1} type="card" /> : (
                <>
                     {activeTab === "menu" && <PoliceMenu user={user} setActiveTab={handleTabChange} hasNewSOS={hasNewSOS} />}
                    {activeTab === "complaints" && <div className="animate-fade-in-up"><ViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
                    {activeTab === "fir" && <div className="animate-fade-in-up"><FileFIR onCancel={handleFIRClose} prefillId={selectedCaseId} /></div>}
                    {activeTab === "history" && <PastCrimes />}
                    {activeTab === "emergency" && <div className="animate-fade-in-up"><EmergencyAlerts /></div>}
                    {activeTab === "connect" && <div className="animate-fade-in-up"><PoliceConnect currentUser={user} /></div>} 
                   
                    {activeTab === "cctv" && <SuspiciousActivity />}
                    {activeTab === "face" && <FaceDetection />}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;












