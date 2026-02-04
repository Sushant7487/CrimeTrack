
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { 
  FaPaperPlane, FaPaperclip, FaArrowLeft, FaPhoneAlt, FaVideo, 
  FaFilePdf, FaFileAlt, FaTimes, FaCheck, FaCheckDouble 
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../config"; // Or use "https://crimetrack-api.onrender.com" if no config file

const ENDPOINT = "https://crimetrack-api.onrender.com";
let socket;

const DirectChatWindow = () => {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  // --- 1. Helper to Get Image URL ---
  const getImageUrl = (path) => {
      if (!path) return null;
      return path.startsWith("http") ? path : `${BASE_URL}/${path.replace(/\\/g, "/")}`;
  };

  // --- 2. Connect Socket & Fetch Data ---
  useEffect(() => {
    if (!user) { navigate('/login'); return; }

    socket = io(ENDPOINT);
    socket.emit("register_officer", user._id); 

    // Fetch Partner Details
    const fetchPartner = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${BASE_URL}/api/users/officers`, config); 
            // Also check current user's profile if chatting with self or specific ID logic
            const found = data.find(u => u._id === partnerId);
            // If not found in officers list, try getting specific user details (fallback)
            if (found) {
                setPartner(found);
            } else {
                // You might need a specific "get user by id" endpoint if they aren't in the officers list
                setPartner({ firstName: "Chat", lastName: "User", _id: partnerId }); 
            }
        } catch(err) { console.error(err); }
    };

    // Fetch Message History
    const fetchMessages = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${BASE_URL}/api/direct-chat/${partnerId}`, config);
        setMessages(data);
        setLoading(false);
      } catch (error) {
        toast.error("Connection unstable");
        setLoading(false);
      }
    };

    fetchPartner();
    fetchMessages();

    // Socket Listeners
    socket.on("receive_direct_msg", (newMsg) => {
        if (newMsg.senderId === partnerId || newMsg.recipientId === partnerId) {
            setMessages((prev) => [...prev, newMsg]);
            scrollToBottom();
        }
    });

    socket.on("partner_typing", ({ senderId }) => {
        if (senderId === partnerId) setIsTyping(true);
    });
    
    socket.on("partner_stop_typing", ({ senderId }) => {
        if (senderId === partnerId) setIsTyping(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [partnerId]);

  // --- 3. Scroll to Bottom ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, file]); // Also scroll when file selected

  // --- 4. Typing Handler ---
  const handleTyping = (e) => {
      setNewMessage(e.target.value);
      if (socket) {
          if (e.target.value.length > 0) socket.emit("typing", { senderId: user._id, recipientId: partnerId });
          else socket.emit("stop_typing", { senderId: user._id, recipientId: partnerId });
      }
  };

  // --- 5. Send Message ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!newMessage.trim() && !file) || isSending) return;

    setIsSending(true);
    const formData = new FormData();
    formData.append("recipientId", partnerId);
    formData.append("message", newMessage);
    if (file) formData.append("file", file); // Multer handles this key

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      // A. API Call (Uploads file & saves to DB)
      const { data } = await axios.post(`${BASE_URL}/api/direct-chat/send`, formData, config);

      // B. Socket Emit (Update Partner Instantly)
      socket.emit("send_direct_msg", data);

      // C. Local Update
      setMessages([...messages, data]);
      setNewMessage("");
      setFile(null);
      setIsSending(false);
      socket.emit("stop_typing", { senderId: user._id, recipientId: partnerId });
      
    } catch (error) {
      console.error("Send failed", error);
      toast.error("Failed to send. Try again.");
      setIsSending(false);
    }
  };

  // --- Render Attachment Helper ---
  const renderAttachment = (msg) => {
      if (!msg.attachment) return null;
      
      const fileUrl = getImageUrl(msg.attachment);

      if (msg.fileType === 'image') {
          return (
            <img 
                src={fileUrl} 
                alt="attachment" 
                className="max-w-full md:max-w-[250px] rounded-lg mt-1 border border-gray-600 cursor-pointer" 
                onClick={() => window.open(fileUrl, "_blank")} 
            />
          );
      } 
      if (msg.fileType === 'video') {
          return <video src={fileUrl} controls className="max-w-full md:max-w-[280px] rounded-lg mt-1 border border-gray-600" />;
      }
      if (msg.fileType === 'audio') {
          return <audio src={fileUrl} controls className="mt-1 w-full md:w-[250px]" />;
      }
      if (msg.fileType === 'pdf') {
          return (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-lg mt-1 text-sm text-blue-300 hover:text-white border border-slate-600 transition">
                  <FaFilePdf className="text-red-500 text-lg" /> 
                  <span className="truncate max-w-[150px]">View Document.pdf</span>
              </a>
          );
      }
      return (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-lg mt-1 text-sm text-gray-300 border border-slate-600">
              <FaFileAlt className="text-gray-400" /> Download File
          </a>
      );
  };

  return (
    // h-[100dvh] ensures it fits mobile browser viewports exactly
    <div className="flex flex-col h-[100dvh] bg-slate-900 text-white relative overflow-hidden">
      
      {/* 1. BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0"
        style={{
            backgroundImage: "url('/images/police-bg.jpg')", 
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.2) blur(3px)" 
        }}
      />

      {/* 2. HEADER (Fixed Top) */}
      <div className="bg-slate-800/90 backdrop-blur-md p-3 md:p-4 shadow-lg flex items-center justify-between border-b border-slate-700 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-slate-700 transition">
            <FaArrowLeft />
          </button>
          
          {partner ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                    {partner.idPhoto ? (
                        <img src={getImageUrl(partner.idPhoto)} className="w-10 h-10 rounded-full object-cover border border-slate-500" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">{partner.firstName?.[0]}</div>
                    )}
                    {partner.isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></span>}
                </div>
                <div>
                    <h2 className="font-bold text-base md:text-lg flex items-center gap-2 leading-none">
                        {partner.firstName} {partner.lastName}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        {partner.role === 'senior' && <span className="bg-amber-500/20 text-amber-400 px-1 rounded text-[9px] border border-amber-500/30">SENIOR</span>}
                        {partner.isOnline ? <span className="text-green-400">Online</span> : "Offline"}
                    </p>
                </div>
              </div>
          ) : (
              <div className="animate-pulse flex gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                  <div className="h-4 w-32 bg-slate-700 rounded mt-2"></div>
              </div>
          )}
        </div>
        <div className="flex gap-4 text-slate-400 text-lg md:text-xl pr-2">
            <FaPhoneAlt className="cursor-pointer hover:text-green-400 transition" />
            <FaVideo className="cursor-pointer hover:text-blue-400 transition" />
        </div>
      </div>

      {/* 3. MESSAGES AREA (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 custom-scrollbar scroll-smooth">
        {loading ? (
            <div className="flex justify-center pt-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>
        ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                <div className="bg-slate-800 p-4 rounded-full mb-3 text-4xl">👋</div>
                <p>No messages yet.</p>
                <p className="text-xs">Send a message to start the conversation.</p>
            </div>
        ) : (
            messages.map((msg, index) => {
                const isMe = msg.senderId === user._id;
                return (
                    <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div 
                            className={`max-w-[85%] md:max-w-[65%] p-3 rounded-2xl shadow-md relative text-sm md:text-base 
                            ${isMe ? "bg-emerald-600 text-white rounded-tr-sm" : "bg-slate-800 text-gray-200 rounded-tl-sm border border-slate-700"}`}
                        >
                            {/* Render Multimedia */}
                            {renderAttachment(msg)}
                            
                            {/* Render Text */}
                            {msg.message && <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.message}</p>}
                            
                            {/* Time & Tick */}
                            <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${isMe ? "text-emerald-200" : "text-gray-400"}`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                {isMe && (msg.status === 'seen' ? <FaCheckDouble className="text-blue-300"/> : <FaCheck />)}
                            </div>
                        </div>
                    </div>
                );
            })
        )}
        
        {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
                <div className="bg-slate-800 px-4 py-2 rounded-full text-xs text-gray-400 border border-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 4. INPUT AREA (Fixed Bottom) */}
      <div className="p-3 md:p-4 bg-slate-800 border-t border-slate-700 z-20">
        
        {/* File Preview Bubble */}
        {file && (
            <div className="mb-2 bg-slate-900 p-2 rounded-lg border border-slate-600 flex items-center justify-between shadow-xl animate-fade-in-up">
                <div className="flex items-center gap-2 overflow-hidden">
                    <span className="bg-slate-700 p-1.5 rounded text-blue-400"><FaPaperclip /></span>
                    <span className="text-xs text-gray-300 truncate max-w-[200px]">{file.name}</span>
                </div>
                <button onClick={() => { setFile(null); fileInputRef.current.value = ""; }} className="text-red-400 hover:text-red-300 p-1">
                    <FaTimes />
                </button>
            </div>
        )}

        <div className="flex items-end gap-2">
            <button onClick={() => fileInputRef.current.click()} className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-gray-300 transition shrink-0">
                <FaPaperclip />
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*,video/*,audio/*,.pdf" 
            />

            <div className="flex-1 bg-slate-900 border border-slate-600 rounded-2xl px-4 py-2 flex items-center focus-within:border-emerald-500 transition">
                <textarea
                    value={newMessage}
                    onChange={handleTyping}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                        }
                    }}
                    placeholder="Type a message..."
                    className="w-full bg-transparent text-white outline-none resize-none max-h-24 custom-scrollbar text-sm md:text-base pt-1"
                    rows={1}
                    style={{ minHeight: '24px' }}
                />
            </div>

            <button 
                onClick={handleSendMessage} 
                disabled={isSending || (!newMessage.trim() && !file)}
                className={`p-3 rounded-full text-white shadow-lg transition-all shrink-0 flex items-center justify-center
                    ${(newMessage.trim() || file) && !isSending ? 'bg-emerald-600 hover:bg-emerald-500 hover:scale-105' : 'bg-gray-700 cursor-not-allowed text-gray-500'}`}
            >
                {isSending ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <FaPaperPlane />}
            </button>
        </div>
      </div>
    </div>
  );
};

export default DirectChatWindow;