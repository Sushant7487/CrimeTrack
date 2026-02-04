
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client"; // ✅ Import Socket
import { 
  FaUser, FaSearch, FaArrowLeft, FaPlus, FaTimes, FaComments 
} from "react-icons/fa";
import { BASE_URL } from "../../config"; 

const CitizenConnect = () => {
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New Chat Modal State
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [allCitizens, setAllCitizens] = useState([]);
  const [loadingCitizens, setLoadingCitizens] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo")); // ✅ Get User Info

  // --- 1. Helper to Get Image URL ---
  const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

  // --- 2. Load Recent Chats ---
  const fetchRecentChats = async () => {
      try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data } = await axios.get(`${BASE_URL}/api/direct-chat/recents?role=citizen`, config);
          setRecentChats(data);
          setLoading(false);
      } catch (error) { console.error("Error fetching recents"); setLoading(false); }
  };

  // --- 3. Real-Time Listener (No Refresh Needed) ---
  useEffect(() => {
      fetchRecentChats(); // Initial Load

      // ✅ Socket Connection
      const socket = io(BASE_URL);
      if (user?._id) socket.emit("register_officer", user._id); // Join Room

      // ✅ Listen for incoming messages & update list instantly
      socket.on("receive_direct_msg", () => {
          fetchRecentChats();
      });

      return () => { socket.disconnect(); };
  }, []);

  // --- 4. Open Modal & Fetch Citizens ---
  const handleOpenNewChat = async () => {
      setShowNewChatModal(true);
      if (allCitizens.length === 0) {
          setLoadingCitizens(true);
          try {
              const config = { headers: { Authorization: `Bearer ${user.token}` } };
              const { data } = await axios.get(`${BASE_URL}/api/users?role=citizen`, config);
              const citizens = data.filter(u => u.role === 'citizen');
              setAllCitizens(citizens);
          } catch (err) {
              console.error("Failed to fetch citizens");
          }
          setLoadingCitizens(false);
      }
  };

  const openChat = (citizenId) => { 
      navigate(`/chat/${citizenId}`);
  };

  // Filter Logic
  const filteredCitizens = allCitizens.filter(c => 
      c.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // Changed h-screen to h-[100dvh] for better mobile browser experience
    <div className="relative h-[100dvh] w-full font-sans text-white overflow-hidden bg-gray-900">
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
            backgroundImage: "url('/police-bg.png')", 
            backgroundSize: "contain",
            backgroundPosition: "center",
            filter: "brightness(0.5) blur(1px)" 
        }}
      />

      {/* Main Container: Responsive Padding (p-4 mobile, p-10 desktop) */}
      <div className="relative z-10 p-4 md:p-10 max-w-7xl mx-auto flex flex-col h-full">
        
        {/* Header */}
        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4 border-b border-white/10 pb-4 md:pb-6 shrink-0">
            <button 
                onClick={() => navigate(-1)} 
                className="bg-white/10 hover:bg-white/20 text-white p-2 md:p-3 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-lg group"
                title="Go Back"
            >
                <FaArrowLeft className="text-lg md:text-xl group-hover:-translate-x-1 transition-transform" />
            </button>

            <div>
                {/* Header Text Scaled for Mobile */}
                <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    <FaUser className="text-blue-400 drop-shadow-lg" /> Citizen Connect
                </h1>
                <p className="text-blue-200/80 text-xs md:text-sm mt-1 ml-1 tracking-wide">Public Communication Channel</p>
            </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto pb-24 custom-scrollbar pr-1 md:pr-2">
          {loading ? (
              <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-blue-200 animate-pulse">Establishing secure connection...</p>
              </div>
          ) : recentChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-56 md:h-64 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-md mt-6 md:mt-10">
                  <div className="text-5xl md:text-6xl mb-4 opacity-30 text-blue-400"><FaComments /></div>
                  <p className="text-lg md:text-xl font-semibold text-gray-300">No active chats with citizens.</p>
                  <p className="text-xs md:text-sm text-gray-400 mt-2">Start a conversation using the <span className="text-blue-400 font-bold">+</span> button below.</p>
              </div>
          ) : (
              <div className="space-y-3 md:space-y-4">
                  {recentChats.map((chat, idx) => (
                      <div 
                        key={chat.partner._id} 
                        onClick={() => openChat(chat.partner._id)} 
                        style={{ animationDelay: `${idx * 0.05}s` }}
                        // Card Padding reduced for mobile
                        className="group animate-fade-in-up w-full bg-gradient-to-r from-gray-900/80 to-slate-900/80 backdrop-blur-md hover:from-blue-900/40 hover:to-slate-900/60 p-3 md:p-4 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-500/20 flex items-center justify-between transform hover:-translate-y-1"
                      >
                          <div className="flex items-center gap-3 md:gap-5 overflow-hidden">
                              <div className="relative shrink-0">
                                  {chat.partner.idPhoto ? (
                                      // Avatar Size: w-12 mobile, w-16 desktop
                                      <img 
                                          src={getImageUrl(chat.partner.idPhoto)} 
                                          alt="Profile" 
                                          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-slate-500 group-hover:border-blue-400 transition-colors shadow-lg" 
                                      />
                                  ) : (
                                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl border-2 border-slate-500 bg-gradient-to-br from-blue-900 to-slate-800 shadow-inner">
                                          {chat.partner.firstName ? chat.partner.firstName[0] : "C"}
                                      </div>
                                  )}
                                  {chat.partner.isOnline && (
                                    <span className="absolute bottom-1 right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-slate-900 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></span>
                                  )}
                              </div>

                              <div className="min-w-0">
                                  <h4 className="text-base md:text-lg font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                                      {chat.partner.firstName} {chat.partner.lastName}
                                      <span className="text-[10px] px-1.5 py-0.5 md:px-2 rounded-full uppercase tracking-wider border bg-blue-500/10 border-blue-500/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                          Citizen
                                      </span>
                                  </h4>
                                  <p className={`text-xs md:text-sm truncate w-full max-w-[160px] md:max-w-md mt-0.5 md:mt-1 ${chat.unreadCount > 0 ? "text-blue-400 font-semibold" : "text-gray-400 group-hover:text-gray-300"}`}>
                                      {chat.lastMessage?.message || (chat.lastMessage?.fileType ? "📎 Attachment" : "")}
                                  </p>
                              </div>
                          </div>

                          <div className="flex flex-col items-end gap-1 md:gap-2 pl-2 md:pl-4">
                              <span className={`text-[10px] md:text-xs font-medium ${chat.unreadCount > 0 ? "text-blue-400" : "text-gray-500"}`}>
                                {new Date(chat.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                              {chat.unreadCount > 0 && (
                                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                      {chat.unreadCount} New
                                  </span>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          )}
        </div>
      </div>

      {/* Floating Button - Position retained (Bottom-Left) but sized/padded for mobile */}
      <button 
        onClick={handleOpenNewChat}
        className="fixed bottom-10 left-10 z-50 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white p-4 md:p-5 rounded-full shadow-[0_0_25px_rgba(37,99,235,0.6)] border border-blue-400/30 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
        title="Find Citizen"
      >
        <FaPlus className="text-xl md:text-2xl group-hover:rotate-90 transition-transform duration-300" />
        <span className="absolute left-16 bg-black/80 backdrop-blur text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
            Start New Chat
        </span>
      </button>

      {/* Search Modal */}
      {showNewChatModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in transition-all">
              {/* Modal responsive width/height */}
              <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 w-full md:max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-auto max-h-[85vh] md:max-h-[80vh] transform transition-all animate-scale-up">
                  
                  <div className="bg-white/5 p-4 md:p-5 flex justify-between items-center border-b border-white/10 shrink-0">
                      <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                          <FaSearch className="text-blue-400" /> <span className="tracking-wide">Select Citizen</span>
                      </h3>
                      <button onClick={() => setShowNewChatModal(false)} className="text-gray-400 hover:text-white bg-white/5 p-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all">
                          <FaTimes className="text-lg" />
                      </button>
                  </div>

                  <div className="p-4 bg-black/20 border-b border-white/5 shrink-0">
                      <div className="relative">
                        <FaSearch className="absolute left-4 top-4 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Search by Name..." 
                            className="w-full bg-black/40 border border-white/10 text-white text-sm md:text-base p-3 pl-12 rounded-xl outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                      </div>
                  </div>

                  <div className="p-4 md:p-6 flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          {loadingCitizens ? (
                              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-10 opacity-70">
                                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                                  <p className="text-gray-400 text-sm">Accessing citizen database...</p>
                              </div>
                          ) : filteredCitizens.length === 0 ? (
                              <div className="col-span-1 md:col-span-2 text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                                  <p className="text-gray-400 text-sm md:text-lg">No citizens found matching "{searchQuery}"</p>
                              </div>
                          ) : (
                              filteredCitizens.map(citizen => (
                                  <div 
                                    key={citizen._id} 
                                    onClick={() => { openChat(citizen._id); setShowNewChatModal(false); }} 
                                    className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl cursor-pointer border border-white/5 bg-white/5 hover:bg-blue-600/20 hover:border-blue-500/30 transition-all duration-200"
                                  >
                                      <div className="relative">
                                          {citizen.idPhoto ? (
                                              <img src={getImageUrl(citizen.idPhoto)} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-gray-600 group-hover:border-blue-400 transition-colors" />
                                          ) : (
                                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-base md:text-xl bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-blue-600 group-hover:to-blue-800">
                                                  {citizen.firstName?.[0]}
                                              </div>
                                          )}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-sm md:text-lg text-white group-hover:text-blue-300 transition-colors">
                                              {citizen.firstName} {citizen.lastName}
                                          </h4>
                                          <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-wide group-hover:text-gray-300">
                                              Registered Citizen
                                          </p>
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

export default CitizenConnect;