
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client"; // ✅ Import Socket
import { 
  FaArrowLeft, FaUserShield, FaSearch, FaChevronRight, FaComments, 
  FaPlus, FaTimes, FaBuilding, FaUserTie, FaUserCircle 
} from "react-icons/fa";

import { BASE_URL } from "../config"; 

const UserChatDashboard = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for "Start New Chat" with Officers
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [allOfficers, setAllOfficers] = useState([]);
  const [loadingOfficers, setLoadingOfficers] = useState(false);
  const [selectedStation, setSelectedStation] = useState("");
  const [stationsList, setStationsList] = useState([]);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  // --- 1. Helper to Get Image URL ---
  const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

  const formatTime = (dateString) => {
      if(!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // --- 2. Fetch Recent Chats ---
  const fetchChats = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${BASE_URL}/api/direct-chat/recents`, config);
      setChats(data);
      setLoading(false);
    } catch (err) { 
      console.error("Error fetching chats:", err); 
      setLoading(false); 
    }
  };

  // --- 3. Real-time Updates (Socket.io) ---
  useEffect(() => {
    fetchChats(); // Initial Load

    // ✅ Connect to Socket
    const socket = io(BASE_URL);
    
    // ✅ Register User to listen for messages
    if (user?._id) socket.emit("register_officer", user._id); 

    // ✅ Listen for new messages and update list instantly
    socket.on("receive_direct_msg", () => {
        fetchChats(); 
    });

    return () => { socket.disconnect(); };
  }, []);

  // --- 4. Fetch Officers for New Chat Modal ---
  const handleOpenNewChat = async () => {
      setShowNewChatModal(true);
      if (allOfficers.length === 0) {
          setLoadingOfficers(true);
          try {
              const config = { headers: { Authorization: `Bearer ${user.token}` } };
              const { data } = await axios.get(`${BASE_URL}/api/users/officers`, config);
              
              setAllOfficers(data);

              // Extract unique stations
              const uniqueStations = [...new Set(data.map(o => o.station).filter(Boolean))];
              setStationsList(uniqueStations);
          } catch (err) {
              console.error("Failed to fetch officers list");
          }
          setLoadingOfficers(false);
      }
  };

  const openChat = (officerId) => {
      navigate(`/citizen/chat/${officerId}`); 
  };

  // Filter Officers inside Modal
  const filteredOfficers = selectedStation 
      ? allOfficers.filter(off => off.station === selectedStation)
      : allOfficers;

  // Filter Chats in Main List
  const filteredChats = chats.filter(chat => 
      chat.partner?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      chat.partner?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // ✅ CHANGED: h-screen to prevent full page scrolling (Fixed Layout)
    <div className="relative h-screen w-full font-sans text-white overflow-hidden bg-gray-900">
      
      {/* ✅ 1. BACKGROUND IMAGE */}
      <div 
        className="fixed inset-0 z-0"
        style={{
            backgroundImage: "url('/police-bg.png')", 
            backgroundSize: "contain",
            backgroundPosition: "center",
            filter: "brightness(0.5) blur(1px)" 
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto flex flex-col h-full">
        
        {/* ✅ Header (Fixed at Top via shrink-0) */}
        <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4 shrink-0">
            <button 
                onClick={() => navigate(-1)} 
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-lg group"
                title="Go Back"
            >
                <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            </button>

            <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    <FaUserShield className="text-emerald-400 drop-shadow-lg" /> Secure Messages
                </h1>
                <p className="text-emerald-100/80 text-xs md:text-sm mt-1 ml-1 tracking-wide">Direct Line with Police Officers</p>
            </div>
        </div>

        {/* ✅ Search Bar (Fixed at Top via shrink-0) */}
        <div className="mb-4 relative group max-w-2xl mx-auto md:mx-0 shrink-0 w-full">
            <FaSearch className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
            <input 
                className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all shadow-lg backdrop-blur-sm placeholder-slate-500" 
                placeholder="Search your conversations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* ✅ Chat List (This part scrolls independently) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-20">
            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-emerald-200 animate-pulse">Loading secure channels...</p>
                </div>
            ) : filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-md mt-10">
                    <div className="text-6xl mb-4 opacity-30 text-emerald-500"><FaComments /></div>
                    <p className="text-xl font-semibold text-gray-300">No active conversations</p>
                    <p className="text-sm text-gray-400 mt-2 max-w-xs text-center px-4">
                        Click the <span className="text-emerald-400 font-bold">+</span> button to contact an officer.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredChats.map((chat, idx) => (
                        <div 
                            key={chat.partner._id} 
                            onClick={() => navigate(`/citizen/chat/${chat.partner._id}`)}
                            style={{ animationDelay: `${idx * 0.05}s` }}
                            className="group animate-fade-in-up w-full bg-gradient-to-r from-gray-900/80 to-slate-900/80 backdrop-blur-md hover:from-emerald-900/40 hover:to-slate-900/60 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-500/20 flex items-center justify-between transform hover:-translate-y-1 relative"
                        >
                            {/* Left: Avatar & Info */}
                            <div className="flex items-center gap-5 overflow-hidden">
                                <div className="relative shrink-0">
                                    {chat.partner.idPhoto ? (
                                        <img 
                                            src={getImageUrl(chat.partner.idPhoto)} 
                                            alt="Profile" 
                                            className="w-14 h-14 rounded-full object-cover border-2 border-slate-500 group-hover:border-emerald-400 transition-colors shadow-lg" 
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl border-2 border-slate-500 bg-gradient-to-br from-slate-700 to-slate-900 shadow-inner">
                                            <FaUserShield className="text-slate-400 group-hover:text-emerald-300" />
                                        </div>
                                    )}
                                    {chat.partner.isOnline && (
                                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></span>
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                                        {chat.partner.firstName} {chat.partner.lastName}
                                        <span className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider border bg-slate-700/50 border-slate-500/30 text-slate-300 shadow-sm">
                                            {chat.partner.designation || "Officer"}
                                        </span>
                                    </h4>
                                    <p className={`text-sm truncate w-full max-w-md mt-1 ${chat.unreadCount > 0 ? "text-emerald-400 font-semibold" : "text-gray-400 group-hover:text-gray-300"}`}>
                                        {chat.lastMessage?.message || "📎 Attachment"}
                                    </p>
                                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold flex items-center gap-1 group-hover:text-gray-400">
                                        {chat.partner.station || "Police Station"}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Time, Badge & Chevron */}
                            <div className="flex flex-col items-end gap-2 pl-4">
                                <span className={`text-xs font-medium ${chat.unreadCount > 0 ? "text-emerald-400" : "text-gray-500"}`}>
                                    {formatTime(chat.time)}
                                </span>
                                {chat.unreadCount > 0 && (
                                    <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                        {chat.unreadCount} New
                                    </span>
                                )}
                                <FaChevronRight className="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* ✅ 3. FLOATING ACTION BUTTON */}
      <button 
        onClick={handleOpenNewChat}
        className="fixed bottom-8 left-8 z-50 bg-gradient-to-br from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white p-4 rounded-full shadow-[0_0_25px_rgba(5,150,105,0.6)] border border-emerald-400/30 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
        title="Find Officer"
      >
        <FaPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
        <span className="absolute left-14 bg-black/80 backdrop-blur text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
            Contact Police
        </span>
      </button>

      {/* ✅ 4. GLASSMORPHISM SEARCH MODAL */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in transition-all">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transform transition-all animate-scale-up">
                
                {/* Modal Header */}
                <div className="bg-white/5 p-5 flex justify-between items-center border-b border-white/10 shrink-0">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaSearch className="text-emerald-400" /> <span className="tracking-wide">Select Officer</span>
                    </h3>
                    <button 
                        onClick={() => setShowNewChatModal(false)} 
                        className="text-gray-400 hover:text-white bg-white/5 p-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </div>

                {/* Station Filter */}
                <div className="p-4 bg-black/20 border-b border-white/5 shrink-0">
                    <label className="text-xs text-emerald-400 font-bold uppercase mb-2 block tracking-wider">Filter by Police Station</label>
                    <div className="relative">
                        <FaBuilding className="absolute left-4 top-4 text-gray-500" />
                        <select 
                            className="w-full bg-black/40 border border-white/10 text-white p-3 pl-12 rounded-xl outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all appearance-none cursor-pointer"
                            onChange={(e) => setSelectedStation(e.target.value)}
                            value={selectedStation}
                        >
                            <option value="">-- All Stations --</option>
                            {stationsList.map((st, idx) => (
                                <option key={idx} value={st}>{st}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Officers List */}
                <div className="p-6 flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {loadingOfficers ? (
                            <div className="col-span-2 flex flex-col items-center justify-center py-10 opacity-70">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mb-2"></div>
                                <p className="text-gray-400 text-sm">Accessing officer database...</p>
                            </div>
                        ) : filteredOfficers.length === 0 ? (
                            <div className="col-span-2 text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                                <p className="text-gray-400 text-lg">No officers found.</p>
                            </div>
                        ) : (
                            filteredOfficers.map(officer => (
                                <div 
                                    key={officer._id}
                                    onClick={() => {
                                        openChat(officer._id);
                                        setShowNewChatModal(false);
                                    }}
                                    className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all duration-200 hover:scale-[1.02] ${officer.role === 'senior' ? 'bg-amber-900/20 border-amber-500/20 hover:bg-amber-900/40 hover:border-amber-500/50' : 'bg-white/5 border-white/5 hover:bg-emerald-600/20 hover:border-emerald-500/30'}`}
                                >
                                    <div className="relative">
                                        {officer.idPhoto ? (
                                            <img src={getImageUrl(officer.idPhoto)} className={`w-12 h-12 rounded-full object-cover border-2 transition-colors ${officer.role === 'senior' ? 'border-amber-500' : 'border-gray-600 group-hover:border-emerald-400'}`} alt="" />
                                        ) : (
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br ${officer.role === 'senior' ? 'from-amber-700 to-amber-900' : 'from-slate-700 to-slate-900 group-hover:from-emerald-700 group-hover:to-emerald-900'}`}>
                                                {officer.role === 'senior' ? <FaUserTie /> : <FaUserCircle />}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-lg transition-colors ${officer.role === 'senior' ? 'text-amber-400' : 'text-white group-hover:text-emerald-300'}`}>{officer.firstName} {officer.lastName}</h4>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide group-hover:text-gray-300">{officer.designation}</p>
                                        <p className="text-[10px] text-gray-500 truncate max-w-[150px]">{officer.station}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserChatDashboard;