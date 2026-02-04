

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client"; 
import { FaArrowLeft, FaSearch, FaUserCircle, FaPlus, FaTimes, FaBuilding, FaWhatsapp, FaUserTie } from "react-icons/fa";
import { BASE_URL } from "../config";

const PoliceConnectDashboard = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search / Modal States
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [allOfficers, setAllOfficers] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [stationsList, setStationsList] = useState([]);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  // --- 1. Helper to Get Image URL ---
  const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

  const formatTime = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // --- 2. Fetch Recent Chats Function ---
  const fetchChats = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${BASE_URL}/api/direct-chat/recents?role=police`, config);
      setChats(data);
      setLoading(false);
    } catch (err) { 
      console.error("Error fetching chats:", err); 
      setLoading(false); 
    }
  };

  // --- 3. Real-Time Listener & Initial Load ---
  useEffect(() => {
    fetchChats(); 

    const socket = io(BASE_URL);
    if (user?._id) socket.emit("register_officer", user._id); 

    socket.on("receive_direct_msg", () => {
        fetchChats();
    });

    return () => { socket.disconnect(); };
  }, []);

  // --- 4. Open "Start New Chat" Modal & Fetch Officers ---
  const handleOpenNewChat = async () => {
      setShowNewChatModal(true);
      if (allOfficers.length === 0) {
          try {
              const config = { headers: { Authorization: `Bearer ${user.token}` } };
              const { data } = await axios.get(`${BASE_URL}/api/users/officers`, config);
              
              const others = data.filter(u => u._id !== user._id);
              setAllOfficers(others);

              const uniqueStations = [...new Set(others.map(o => o.station).filter(Boolean))];
              setStationsList(uniqueStations);
          } catch (err) {
              console.error("Failed to fetch officers list");
          }
      }
  };

  // Filter Officers inside Modal
  const filteredOfficers = selectedStation 
      ? allOfficers.filter(off => off.role === 'senior' ? (off.station && off.station.includes(selectedStation)) : off.station === selectedStation)
      : allOfficers;

  return (
    <div className="relative h-[100dvh] w-full font-sans text-white overflow-hidden bg-gray-900">
      
      {/* 1. BACKGROUND IMAGE */}
      <div 
        className="fixed inset-0 z-0"
        style={{
            backgroundImage: "url('/images/police-bg.jpg')", 
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3) blur(2px)" 
        }}
      />

      {/* Main Container: Compact Padding on Mobile (p-2), Standard on Desktop (p-10) */}
      <div className="relative z-10 p-2 md:p-10 max-w-7xl mx-auto flex flex-col h-full">
        
        {/* HEADER */}
        {/* Compact margins/padding for mobile */}
        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-8 border-b border-gray-600/50 pb-2 md:pb-4 shrink-0 px-2 md:px-0">
            <button 
                onClick={() => navigate(-1)} 
                className="bg-slate-800/80 hover:bg-slate-700 text-white p-2 md:p-3 rounded-full backdrop-blur-md border border-slate-600 transition-all hover:scale-110 active:scale-95 shadow-lg group"
                title="Go Back"
            >
                <FaArrowLeft className="text-base md:text-xl group-hover:-translate-x-1 transition-transform" />
            </button>

            <div>
                {/* Text size reduced for mobile */}
                <h1 className="text-lg md:text-3xl font-bold flex items-center gap-2 md:gap-3 text-white drop-shadow-lg">
                    <FaWhatsapp className="text-green-500" /> Police Connect
                </h1>
                <p className="text-gray-300 text-[10px] md:text-sm mt-0.5 md:mt-1 ml-1">Internal Department Communication</p>
            </div>
        </div>

        {/* 2. CHAT LIST (Compact) */}
        <div className="flex-1 space-y-2 md:space-y-4 overflow-y-auto pb-20 md:pb-24 custom-scrollbar pr-1 md:pr-2"> 
          {loading ? (
              <div className="text-center py-20 text-gray-400 animate-pulse text-xs md:text-base">Loading conversations...</div>
          ) : chats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 md:h-64 bg-slate-900/60 rounded-xl border border-slate-700 backdrop-blur-md">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4 opacity-50">📭</div>
                  <p className="text-base md:text-xl font-semibold text-gray-300">No active conversations</p>
                  <p className="text-[10px] md:text-sm text-gray-400 mt-1">Tap the + button to start a new chat.</p>
              </div>
          ) : (
              chats.map((chat, idx) => (
                  <div 
                    key={chat.partner._id} 
                    onClick={() => navigate(`/chat/${chat.partner._id}`)}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                    // Card Padding: Very compact on mobile (p-2.5), standard on desktop (p-4)
                    className="group animate-fade-in-up w-full bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/90 p-2.5 md:p-4 rounded-xl border border-slate-600/50 hover:border-green-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-green-900/20 flex items-center justify-between transform hover:-translate-y-1"
                  >
                      {/* Left: Avatar & Info */}
                      {/* Reduced gap for mobile */}
                      <div className="flex items-center gap-2.5 md:gap-5 overflow-hidden">
                          {/* Avatar */}
                          <div className="relative shrink-0">
                              {chat.partner.idPhoto ? (
                                  // Avatar Size: w-10 mobile, w-16 desktop
                                  <img 
                                      src={getImageUrl(chat.partner.idPhoto)} 
                                      alt="Profile" 
                                      className={`w-10 h-10 md:w-16 md:h-16 rounded-full object-cover border-2 shadow-md ${chat.partner.role === 'senior' ? 'border-amber-500' : 'border-slate-400 group-hover:border-green-400'}`} 
                                  />
                              ) : (
                                  <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-2xl border-2 shadow-md ${chat.partner.designation?.includes('DGP') ? 'bg-amber-700 border-amber-500' : 'bg-slate-600 border-slate-400'}`}>
                                      {chat.partner.firstName ? chat.partner.firstName[0] : "O"}
                                  </div>
                              )}
                              {chat.partner.isOnline && (
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-4 md:h-4 bg-green-500 border-2 border-slate-800 rounded-full shadow-sm animate-pulse"></span>
                              )}
                          </div>

                          {/* Text Info */}
                          <div className="min-w-0">
                              {/* Name Text: text-sm mobile, text-lg desktop */}
                              <h4 className="text-sm md:text-lg font-bold text-white group-hover:text-green-300 transition-colors flex items-center gap-1.5 md:gap-2">
                                  {chat.partner.firstName} {chat.partner.lastName}
                                  {/* Badge: Compact padding for mobile */}
                                  <span className={`text-[9px] md:text-[10px] px-1 py-0 md:px-2 md:py-0.5 rounded-full uppercase tracking-wider border ${chat.partner.role === 'senior' ? 'bg-amber-900/50 border-amber-500 text-amber-300' : 'bg-slate-700 border-slate-500 text-slate-300'}`}>
                                      {chat.partner.designation}
                                  </span>
                              </h4>
                              {/* Message Preview: text-[10px] mobile, text-sm desktop */}
                              <p className={`text-[10px] md:text-sm truncate w-full max-w-[140px] md:max-w-md mt-0.5 md:mt-1 ${chat.unreadCount > 0 ? "text-green-400 font-semibold" : "text-gray-400"}`}>
                                  {chat.lastMessage?.message || (chat.lastMessage?.fileType ? "📎 Attachment" : "")}
                              </p>
                          </div>
                      </div>

                      {/* Right: Time & Badge */}
                      <div className="flex flex-col items-end gap-1 md:gap-2 pl-1 md:pl-4">
                          <span className={`text-[9px] md:text-xs font-medium ${chat.unreadCount > 0 ? "text-green-400" : "text-gray-500"}`}>
                            {formatTime(chat.time)}
                          </span>
                          {chat.unreadCount > 0 && (
                              <span className="bg-green-500 text-black text-[9px] md:text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-3 md:py-1 rounded-full shadow-lg shadow-green-500/30">
                                  {chat.unreadCount}
                              </span>
                          )}
                      </div>
                  </div>
              ))
          )}
        </div>
      </div>

      {/* 3. FLOATING ACTION BUTTON */}
      <button 
        onClick={handleOpenNewChat}
        // Button Size: Compact on mobile (p-3.5), Standard on Desktop (p-5)
        className="fixed bottom-6 right-6 md:bottom-10 md:left-10 z-50 bg-green-600 hover:bg-green-500 text-white p-3.5 md:p-5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
        title="Start New Chat"
      >
        <FaPlus className="text-lg md:text-2xl group-hover:rotate-90 transition-transform" />
        <span className="absolute right-14 md:right-auto md:left-16 bg-black/80 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 hidden md:block">
            New Chat
        </span>
      </button>

      {/* 4. SEARCH MODAL */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in">
            {/* Modal Container: Max height adjusted for mobile */}
            <div className="bg-slate-900 border border-slate-700 w-full md:max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-auto max-h-[80vh] md:max-h-[80vh]">
                
                {/* Modal Header */}
                <div className="p-3 md:p-5 bg-slate-800 border-b border-slate-700 flex justify-between items-center shrink-0">
                    <h3 className="font-bold text-white text-base md:text-xl flex items-center gap-2">
                        <FaSearch className="text-blue-400" /> Start New Chat
                    </h3>
                    <button onClick={() => setShowNewChatModal(false)} className="text-slate-400 hover:text-white bg-slate-700 p-1.5 md:p-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors">
                        <FaTimes className="text-base md:text-lg" />
                    </button>
                </div>

                {/* Station Filter */}
                <div className="p-3 md:p-6 border-b border-slate-700 bg-slate-900 shrink-0">
                    <label className="text-[10px] md:text-xs text-blue-400 font-bold uppercase mb-1.5 md:mb-2 block tracking-wider">Select Police Station</label>
                    <div className="relative">
                        <FaBuilding className="absolute left-3 md:left-4 top-3 md:top-4 text-slate-500 text-sm md:text-lg"/>
                        <select 
                            className="w-full bg-black/50 border border-slate-600 text-white text-xs md:text-lg p-2.5 md:p-3 pl-9 md:pl-12 rounded-xl outline-none focus:border-blue-500 appearance-none transition-all"
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
                <div className="flex-1 overflow-y-auto p-3 md:p-4 custom-scrollbar bg-slate-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                        {filteredOfficers.length === 0 ? (
                            <div className="col-span-1 md:col-span-2 text-center py-10 text-slate-500 border border-dashed border-gray-700 rounded-xl text-sm">
                                No officers found.
                            </div>
                        ) : (
                            filteredOfficers.map(officer => (
                                <div 
                                    key={officer._id}
                                    onClick={() => {
                                        navigate(`/chat/${officer._id}`);
                                        setShowNewChatModal(false);
                                    }}
                                    className={`flex items-center gap-3 md:gap-4 p-2 md:p-4 rounded-xl cursor-pointer border transition-all hover:scale-[1.02] ${officer.role === 'senior' ? 'bg-amber-900/20 border-amber-500/30 hover:bg-amber-900/40' : 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-blue-500/50'}`}
                                >
                                    <div className="relative">
                                        {officer.idPhoto ? (
                                            <img src={getImageUrl(officer.idPhoto)} className={`w-9 h-9 md:w-14 md:h-14 rounded-full object-cover border-2 ${officer.role === 'senior' ? 'border-amber-500' : 'border-blue-500'}`} alt="" />
                                        ) : (
                                            <div className={`w-9 h-9 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-xl ${officer.role === 'senior' ? 'bg-amber-700' : 'bg-blue-700'}`}>
                                                {officer.role === 'senior' ? <FaUserTie /> : <FaUserCircle />}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-xs md:text-lg ${officer.role === 'senior' ? 'text-amber-400' : 'text-white'}`}>{officer.firstName} {officer.lastName}</h4>
                                        <p className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-wide">{officer.designation}</p>
                                        <p className="text-[9px] md:text-[10px] text-slate-500 truncate max-w-[120px] md:max-w-[150px]">{officer.station}</p>
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

export default PoliceConnectDashboard;