
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from "framer-motion";
// ✅ FIXED: Added FaPhoneAlt to imports
import { FaPaperPlane, FaUserShield, FaCheckDouble, FaSmile, FaArrowLeft, FaLock, FaEllipsisV, FaPaperclip, FaPhoneAlt } from "react-icons/fa";

// Socket Setup
const socket = io("https://crimetrack-api.onrender.com", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const ChatInterface = ({ complaintId, currentUser, recipientId, recipientName, recipientRole, onBack }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`https://crimetrack-api.onrender.com/api/messages/${complaintId}`, config);
        const filtered = data.filter(msg => {
            if (recipientId) {
                return (msg.senderId === recipientId) || (msg.recipientId === recipientId) || (msg.senderId === currentUser._id && !msg.recipientId);
            }
            return true; 
        });
        setMessageList(filtered);
      } catch (error) { console.error(error); }
    };
    fetchMessages();
    socket.emit("join_room", complaintId);
  }, [complaintId, recipientId]);

  useEffect(() => {
    const handleReceive = (data) => {
        if (!recipientId || (data.senderId === recipientId) || (data.recipientId === recipientId) || (data.senderId === currentUser._id)) {
            setMessageList((list) => [...list, data]);
        }
    };
    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, [socket, recipientId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList, showEmoji]);

  const sendMessage = async () => {
    if (currentMessage.trim() === "") return;
    const senderPrefix = currentUser.role === 'citizen' ? "Citizen" : (currentUser.designation || "Officer");
    const formattedSenderName = `${senderPrefix} ${currentUser.name || currentUser.firstName}`;

    const messageData = {
      room: complaintId,
      complaintId: complaintId,
      senderId: currentUser._id,
      recipientId: recipientId || null,
      senderName: formattedSenderName,
      senderRole: currentUser.role,
      message: currentMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    setCurrentMessage("");
    setShowEmoji(false);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post("https://crimetrack-api.onrender.com/api/messages", messageData, config);
    } catch (e) {}
  };

  const onEmojiClick = (emojiObject) => {
    setCurrentMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 relative w-full font-sans">
      
      {/* Header */}
      <div className="bg-slate-800/80 backdrop-blur-md p-4 flex items-center justify-between shadow-lg border-b border-slate-700 z-20 shrink-0 sticky top-0">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition">
                <FaArrowLeft />
            </button>
            
            <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                    {recipientRole === 'Complainant' ? <span className="text-xl">👤</span> : <FaUserShield className="text-white text-xl" />}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-800 rounded-full"></span>
            </div>

            <div>
                <h3 className="text-white font-bold text-base leading-tight tracking-wide">{recipientName}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <FaLock className="text-[10px] text-emerald-400" />
                    <p className="text-slate-400 text-xs font-medium">End-to-end Encrypted</p>
                </div>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition"><FaPhoneAlt /></button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition"><FaEllipsisV /></button>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 bg-slate-900 relative custom-scrollbar scroll-smooth">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="flex justify-center my-6">
            <span className="bg-slate-800/80 text-blue-200 text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-slate-700 shadow-sm">
                Secure Channel Established
            </span>
        </div>

        <AnimatePresence initial={false}>
            {messageList.map((msg, index) => {
                const isMe = msg.senderId === currentUser._id;
                return (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`relative max-w-[85%] md:max-w-[65%] px-4 py-3 rounded-2xl shadow-md text-sm leading-relaxed ${
                            isMe 
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none" 
                            : "bg-slate-800 border border-slate-700 text-gray-200 rounded-bl-none"
                        }`}>
                            {!isMe && (
                                <p className={`text-[10px] font-bold mb-1 uppercase tracking-wider ${
                                    msg.senderName.includes("Citizen") ? "text-amber-400" : "text-blue-400"
                                }`}>
                                    {msg.senderName}
                                </p>
                            )}
                            <p className="mr-8 whitespace-pre-wrap">{msg.message}</p>
                            <span className={`text-[10px] absolute bottom-1.5 right-3 flex items-center gap-1 ${isMe ? 'text-blue-200' : 'text-slate-500'}`}>
                                {msg.time} {isMe && <FaCheckDouble className="text-emerald-300" />}
                            </span>
                        </div>
                    </motion.div>
                );
            })}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="bg-slate-800 p-3 md:p-4 z-20 sticky bottom-0 border-t border-slate-700/50">
        <div className="flex items-end gap-2 max-w-4xl mx-auto relative">
            <button className="p-3 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-full transition-all">
                <FaPaperclip />
            </button>

            <button onClick={() => setShowEmoji(!showEmoji)} className={`p-3 rounded-full transition-all ${showEmoji ? 'text-yellow-400 bg-slate-700' : 'text-slate-400 hover:text-yellow-400 hover:bg-slate-700'}`}>
                <FaSmile />
            </button>

            {showEmoji && (
                <div className="absolute bottom-16 left-0 z-30 shadow-2xl rounded-2xl overflow-hidden border border-slate-700 animate-fade-in-up">
                    <EmojiPicker theme="dark" onEmojiClick={onEmojiClick} height={320} width={300} />
                </div>
            )}

            <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-600 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all flex items-center">
                <textarea
                    rows={1}
                    value={currentMessage}
                    placeholder="Type a secure message..."
                    className="w-full bg-transparent text-white px-4 py-3 border-none outline-none text-sm placeholder-slate-500 resize-none custom-scrollbar"
                    style={{ minHeight: '44px', maxHeight: '100px' }}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
            </div>
            
            <motion.button whileTap={{ scale: 0.9 }} onClick={sendMessage} className="bg-blue-600 hover:bg-blue-500 p-3.5 rounded-full text-white shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled={currentMessage.trim() === ""}>
                <FaPaperPlane />
            </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
