
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { motion } from "framer-motion";
// import { 
//     FaArrowLeft, FaPaperclip, FaPaperPlane, FaSmile, FaCheck, FaCheckDouble, 
//     FaFilePdf, FaMusic, FaFileAlt, FaSpinner, FaPlayCircle, FaVideo, FaPhoneAlt
// } from "react-icons/fa";
// import { BASE_URL } from "../config";
// import MediaPreviewModal from "../components/common/MediaPreviewModal";

// let socket;

// // --- INTERNAL COMPONENT: SMART MEDIA ATTACHMENT ---
// const MediaAttachment = ({ msg, mediaUrl, onPreview }) => {
//     const [isLoaded, setIsLoaded] = useState(false);
//     const showSpinner = msg.status === 'sending' || !isLoaded;

//     const LoadingOverlay = () => (
//         <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
//             <FaSpinner className="text-white text-3xl animate-spin" />
//         </div>
//     );

//     if (msg.fileType === 'image') {
//         return (
//             <div 
//                 className="relative w-64 h-64 rounded-xl overflow-hidden cursor-pointer group shadow-sm bg-black/20" 
//                 onClick={() => onPreview({ url: mediaUrl, type: 'image' })}
//             >
//                 {showSpinner && <LoadingOverlay />}
//                 <img 
//                     src={mediaUrl} 
//                     alt="attachment" 
//                     onLoad={() => setIsLoaded(true)}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
//                 />
//             </div>
//         );
//     }

//     if (msg.fileType === 'video') {
//         return (
//             <div 
//                 className="relative w-64 h-48 bg-black rounded-xl overflow-hidden cursor-pointer group shadow-sm flex items-center justify-center" 
//                 onClick={() => onPreview({ url: mediaUrl, type: 'video' })}
//             >
//                 {showSpinner && <LoadingOverlay />}
//                 <video 
//                     src={mediaUrl} 
//                     className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
//                     onLoadedData={() => setIsLoaded(true)}
//                     muted 
//                     preload="metadata"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
//                     <FaPlayCircle className="text-white text-5xl opacity-90 drop-shadow-lg group-hover:scale-110 transition-transform" />
//                 </div>
//                 <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded font-bold backdrop-blur-sm">
//                     VIDEO
//                 </span>
//             </div>
//         );
//     }

//     if (msg.fileType === 'audio') {
//         return (
//             <div className="relative w-72 p-3 bg-[#1f2c34] rounded-lg border border-slate-700/50 flex items-center gap-3 shadow-sm">
//                 {msg.status === 'sending' && <LoadingOverlay />}
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shrink-0 shadow-inner">
//                     <FaMusic className="text-white text-sm" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                     <audio controls className="w-full h-8 block" onCanPlayThrough={() => setIsLoaded(true)}>
//                         <source src={mediaUrl} />
//                         Your browser does not support audio.
//                     </audio>
//                 </div>
//             </div>
//         );
//     }

//     if (msg.fileType === 'pdf') {
//         return (
//             <div 
//                 className="relative w-72 bg-[#1f2c34] rounded-lg border-l-[6px] border-red-500 p-3 flex items-center gap-4 cursor-pointer hover:bg-[#2a3942] transition shadow-sm"
//                 onClick={() => onPreview({ url: mediaUrl, type: 'pdf' })}
//             >
//                 {msg.status === 'sending' && <LoadingOverlay />}
//                 <div className="bg-red-500/10 p-2 rounded-lg">
//                     <FaFilePdf className="text-red-500 text-2xl" />
//                 </div>
//                 <div className="overflow-hidden flex-1">
//                     <p className="font-bold text-sm text-gray-200 truncate">Document.pdf</p>
//                     <div className="flex items-center justify-between mt-1">
//                         <span className="text-[10px] text-gray-400 font-medium uppercase">PDF FILE</span>
//                         <span className="text-[10px] text-emerald-400 font-bold hover:underline">OPEN</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//     return null;
// };

// const DirectChatWindow = () => {
//   const { partnerId } = useParams();
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem("userInfo"));
//   const scrollRef = useRef();
  
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [partner, setPartner] = useState(null);
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [partnerStatus, setPartnerStatus] = useState({ isOnline: false, lastSeen: null });
//   const [previewMedia, setPreviewMedia] = useState(null); 

//   const isSingleEmoji = (text) => {
//       if (!text) return false;
//       const regex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]){1,2}$/;
//       return regex.test(text.trim());
//   };

//   const getFileUrl = (path) => path?.startsWith("blob:") || path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

//   useEffect(() => {
//     socket = io(BASE_URL);
//     socket.emit("register_officer", currentUser._id);

//     const initData = async () => {
//         try {
//             const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            
//             const userRes = await axios.get(`${BASE_URL}/api/users/${partnerId}`, config);
//             setPartner(userRes.data);
//             setPartnerStatus({ isOnline: userRes.data.isOnline, lastSeen: userRes.data.lastSeen });

//             const msgRes = await axios.get(`${BASE_URL}/api/direct-chat/${partnerId}`, config);
//             setMessages(msgRes.data);

//             const unreadIds = msgRes.data
//                 .filter(m => m.senderId === partnerId && m.status !== 'seen')
//                 .map(m => m._id);
            
//             if(unreadIds.length > 0) {
//                 socket.emit("mark_seen", { senderId: currentUser._id, recipientId: partnerId, messageIds: unreadIds });
//             }
//         } catch (err) { console.error(err); }
//     };
//     initData();

//     socket.on("receive_direct_msg", (data) => {
//         if (data.senderId === partnerId) {
//             setMessages(prev => [...prev, data]);
//             socket.emit("mark_seen", { senderId: currentUser._id, recipientId: partnerId, messageIds: [data._id] });
//         }
//     });

//     socket.on("partner_typing", ({ senderId }) => senderId === partnerId && setIsTyping(true));
//     socket.on("partner_stop_typing", ({ senderId }) => senderId === partnerId && setIsTyping(false));

//     socket.on("msg_status_update", ({ messageId, status }) => {
//         setMessages(prev => prev.map(m => m._id === messageId ? { ...m, status } : m));
//     });

//     socket.on("msg_status_update_bulk", ({ readerId }) => {
//         if (readerId === partnerId) {
//             setMessages(prev => prev.map(m => m.senderId === currentUser._id ? { ...m, status: 'seen' } : m));
//         }
//     });

//     socket.on("user_status_change", ({ userId, status, lastSeen }) => {
//         if (userId === partnerId) {
//             setPartnerStatus({ isOnline: status === 'online', lastSeen });
//         }
//     });

//     return () => { socket.disconnect(); };
//   }, [partnerId]);

//   useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

//   const handleSend = async (e) => {
//       e.preventDefault();
//       if (!newMessage.trim() && !file) return;

//       const tempId = Date.now().toString();
//       let fileType = null;
//       if (file) {
//           if (file.type.startsWith('image')) fileType = 'image';
//           else if (file.type.startsWith('video')) fileType = 'video';
//           else if (file.type.startsWith('audio')) fileType = 'audio';
//           else if (file.type === 'application/pdf') fileType = 'pdf';
//           else fileType = 'file';
//       }

//       const tempMsg = {
//           _id: tempId,
//           senderId: currentUser._id,
//           recipientId: partnerId,
//           message: newMessage,
//           attachment: file ? URL.createObjectURL(file) : null,
//           fileType: fileType,
//           status: 'sending',
//           timestamp: new Date()
//       };

//       setMessages(prev => [...prev, tempMsg]);
//       setNewMessage("");
//       setFile(null);
//       setShowEmoji(false);

//       const formData = new FormData();
//       formData.append("recipientId", partnerId);
//       formData.append("message", newMessage);
//       if (file) {
//           formData.append("file", file);
//           formData.append("fileType", fileType);
//       }

//       try {
//           const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${currentUser.token}` } };
//           const { data } = await axios.post(`${BASE_URL}/api/direct-chat/send`, formData, config);
//           setMessages(prev => prev.map(m => m._id === tempId ? data : m));
//           socket.emit("send_direct_msg", data);
//       } catch (err) { console.error("Send failed"); }
//   };

//   const handleTyping = (e) => {
//       setNewMessage(e.target.value);
//       socket.emit("typing", { senderId: currentUser._id, recipientId: partnerId });
//       setTimeout(() => socket.emit("stop_typing", { senderId: currentUser._id, recipientId: partnerId }), 2000);
//   };

//   if (!partner) return <div className="bg-slate-900 h-screen flex items-center justify-center text-white">Loading secure chat...</div>;

//   return (
//     <div className="h-screen flex flex-col bg-[#0b141a]">
        
//         {previewMedia && (
//             <MediaPreviewModal 
//                 fileUrl={previewMedia.url} 
//                 fileType={previewMedia.type} 
//                 onClose={() => setPreviewMedia(null)} 
//             />
//         )}

//         {/* --- 1. NAVBAR --- */}
//         <div className="bg-[#202c33] px-4 py-2.5 flex items-center gap-4 shadow-md z-20 border-b border-slate-700/50">
//             <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
//                 <FaArrowLeft />
//             </button>
            
//             <div className="relative">
//                 <img src={partner.idPhoto ? getFileUrl(partner.idPhoto) : "/default.png"} className="w-11 h-11 rounded-full object-cover border-2 border-slate-600" alt="" />
//                 {partnerStatus.isOnline && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#202c33] shadow-sm"></span>}
//             </div>

//             <div className="flex flex-col justify-center flex-1">
//                 <div className="flex items-center gap-2">
//                     <h3 className="text-white font-bold text-base leading-none">{partner.firstName} {partner.lastName}</h3>
//                     {partner.designation && (
//                         <span className="bg-blue-600/20 text-blue-300 text-[10px] px-1.5 py-0.5 rounded border border-blue-500/30 uppercase font-bold tracking-wider">
//                             {partner.designation}
//                         </span>
//                     )}
//                 </div>
//                 <p className="text-[#8696a0] text-xs mt-1 font-medium">
//                     {isTyping ? (
//                         <span className="text-emerald-400 font-bold animate-pulse">typing...</span>
//                     ) : partnerStatus.isOnline ? (
//                         <span className="text-blue-400">Online</span>
//                     ) : (
//                         <span>Last seen {new Date(partnerStatus.lastSeen).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
//                     )}
//                 </p>
//             </div>
//         </div>

//         {/* --- 2. CHAT AREA WRAPPER (Fixes Background Scroll) --- */}
//         <div className="flex-1 relative bg-[#0b141a] overflow-hidden">
            
//             {/* A. Fixed Background Image */}
//             <div 
//                 className="absolute inset-0 pointer-events-none opacity-50" 
//                 style={{ 
//                     // ✅ ENSURE THIS PATH IS CORRECT IN YOUR PROJECT
//                     backgroundImage: `url('/chat-bg.png')`, 
//                     backgroundSize: 'cover', 
//                     backgroundPosition: 'center', 
//                     backgroundRepeat: 'no-repeat'
//                 }}
//             />

//             {/* B. Scrollable Content Layer */}
//             <div className="absolute inset-0 overflow-y-auto p-4 custom-scrollbar z-10">
//                 <div className="flex flex-col space-y-2 min-h-0">
//                     {messages.map((msg, idx) => {
//                         const isMe = msg.senderId === currentUser._id;
//                         const mediaUrl = getFileUrl(msg.attachment);
//                         const isBigEmoji = !msg.attachment && isSingleEmoji(msg.message);

//                         return (
//                             <motion.div 
//                                 initial={{ opacity: 0, scale: 0.95 }} 
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 key={idx} 
//                                 className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
//                             >
//                                 <div className={`
//                                     relative max-w-[85%] sm:max-w-[70%]
//                                     ${isBigEmoji ? "bg-transparent shadow-none" : "p-2 rounded-lg shadow-md"}
//                                     ${!isBigEmoji && (isMe ? "bg-[#005c4b] text-white rounded-tr-none" : "bg-[#202c33] text-white rounded-tl-none")}
//                                 `}>
//                                     {/* Media */}
//                                     {msg.attachment && (
//                                         <div className="mb-1">
//                                             <MediaAttachment msg={msg} mediaUrl={mediaUrl} onPreview={setPreviewMedia} />
//                                         </div>
//                                     )}

//                                     {/* Text */}
//                                     {msg.message && (
//                                         <p className={`leading-relaxed px-1 pb-1 pt-1 break-words whitespace-pre-wrap ${isBigEmoji ? "text-6xl animate-bounce-slow drop-shadow-lg" : "text-sm"}`}>
//                                             {msg.message}
//                                         </p>
//                                     )}

//                                     {/* Meta */}
//                                     <div className={`flex justify-end items-center gap-1.5 ${isBigEmoji ? "mt-3 bg-black/40 px-2 py-1 rounded-full w-fit ml-auto backdrop-blur-sm" : "mt-0"}`}>
//                                         <span className="text-[10px] text-white/60 font-medium">
//                                             {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                                         </span>
//                                         {isMe && (
//                                             msg.status === 'seen' ? <FaCheckDouble className="text-[#53bdeb] text-xs" /> : 
//                                             msg.status === 'delivered' ? <FaCheckDouble className="text-gray-400 text-xs" /> : 
//                                             msg.status === 'sending' ? <FaSpinner className="text-gray-400 text-[10px] animate-spin" /> :
//                                             <FaCheck className="text-gray-400 text-xs" />
//                                         )}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         );
//                     })}
//                     <div ref={scrollRef} />
//                 </div>
//             </div>
//         </div>

//         {/* --- 3. INPUT AREA --- */}
//         <div className="bg-[#202c33] px-4 py-2 flex items-center gap-3 sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
//             <div className="relative">
//                 <button onClick={() => setShowEmoji(!showEmoji)} className="text-[#8696a0] hover:text-white text-xl transition-transform hover:scale-110"><FaSmile /></button>
//                 {showEmoji && <div className="absolute bottom-14 left-0 shadow-2xl"><EmojiPicker theme="dark" onEmojiClick={(e) => setNewMessage(prev => prev + e.emoji)} /></div>}
//             </div>

//             <label className="text-[#8696a0] hover:text-white cursor-pointer text-xl transition-transform hover:rotate-12">
//                 <FaPaperclip />
//                 <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="image/*,video/*,audio/*,.pdf" />
//             </label>

//             {file && (
//                 <div className="flex items-center gap-2 bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-500/30 animate-pulse">
//                     <FaFileAlt className="text-emerald-400 text-xs" />
//                     <span className="text-xs text-emerald-300 font-mono max-w-[100px] truncate">{file.name}</span>
//                     <button onClick={() => setFile(null)} className="text-emerald-400 hover:text-white ml-1 font-bold">×</button>
//                 </div>
//             )}

//             <input 
//                 value={newMessage}
//                 onChange={handleTyping}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
//                 className="flex-1 bg-[#2a3942] text-white rounded-lg px-4 py-2 outline-none placeholder-gray-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
//                 placeholder="Type a message"
//             />

//             <button 
//                 onClick={handleSend} 
//                 disabled={!newMessage.trim() && !file}
//                 className="bg-[#00a884] p-3 rounded-full text-white shadow-lg hover:bg-[#008f6f] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
//             >
//                 <FaPaperPlane className="text-sm" />
//             </button>
//         </div>
//     </div>
//   );
// };

// export default DirectChatWindow;

















// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { motion } from "framer-motion";
// import { 
//     FaArrowLeft, FaPaperclip, FaPaperPlane, FaSmile, FaCheck, FaCheckDouble, 
//     FaFilePdf, FaMusic, FaFileAlt, FaSpinner, FaPlayCircle
// } from "react-icons/fa";
// import { BASE_URL } from "../config";
// import MediaPreviewModal from "../components/common/MediaPreviewModal";

// // --- INTERNAL COMPONENT: SMART MEDIA ATTACHMENT ---
// const MediaAttachment = ({ msg, mediaUrl, onPreview }) => {
//     const [isLoaded, setIsLoaded] = useState(false);
//     const showSpinner = msg.status === 'sending' || !isLoaded;

//     const LoadingOverlay = () => (
//         <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
//             <FaSpinner className="text-white text-3xl animate-spin" />
//         </div>
//     );

//     if (msg.fileType === 'image') {
//         return (
//             <div 
//                 className="relative w-64 h-64 rounded-xl overflow-hidden cursor-pointer group shadow-sm bg-black/20" 
//                 onClick={() => onPreview({ url: mediaUrl, type: 'image' })}
//             >
//                 {showSpinner && <LoadingOverlay />}
//                 <img 
//                     src={mediaUrl} 
//                     alt="attachment" 
//                     onLoad={() => setIsLoaded(true)}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
//                 />
//             </div>
//         );
//     }

//     if (msg.fileType === 'video') {
//         return (
//             <div 
//                 className="relative w-64 h-48 bg-black rounded-xl overflow-hidden cursor-pointer group shadow-sm flex items-center justify-center" 
//                 onClick={() => onPreview({ url: mediaUrl, type: 'video' })}
//             >
//                 {showSpinner && <LoadingOverlay />}
//                 <video 
//                     src={mediaUrl} 
//                     className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
//                     onLoadedData={() => setIsLoaded(true)}
//                     muted 
//                     preload="metadata"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
//                     <FaPlayCircle className="text-white text-5xl opacity-90 drop-shadow-lg group-hover:scale-110 transition-transform" />
//                 </div>
//                 <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded font-bold backdrop-blur-sm">
//                     VIDEO
//                 </span>
//             </div>
//         );
//     }

//     if (msg.fileType === 'audio') {
//         return (
//             <div className="relative w-72 p-3 bg-[#1f2c34] rounded-lg border border-slate-700/50 flex items-center gap-3 shadow-sm">
//                 {msg.status === 'sending' && <LoadingOverlay />}
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shrink-0 shadow-inner">
//                     <FaMusic className="text-white text-sm" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                     <audio controls className="w-full h-8 block" onCanPlayThrough={() => setIsLoaded(true)}>
//                         <source src={mediaUrl} />
//                         Your browser does not support audio.
//                     </audio>
//                 </div>
//             </div>
//         );
//     }

//     if (msg.fileType === 'pdf') {
//         return (
//             <div 
//                 className="relative w-72 bg-[#1f2c34] rounded-lg border-l-[6px] border-red-500 p-3 flex items-center gap-4 cursor-pointer hover:bg-[#2a3942] transition shadow-sm"
//                 onClick={() => onPreview({ url: mediaUrl, type: 'pdf' })}
//             >
//                 {msg.status === 'sending' && <LoadingOverlay />}
//                 <div className="bg-red-500/10 p-2 rounded-lg">
//                     <FaFilePdf className="text-red-500 text-2xl" />
//                 </div>
//                 <div className="overflow-hidden flex-1">
//                     <p className="font-bold text-sm text-gray-200 truncate">Document.pdf</p>
//                     <div className="flex items-center justify-between mt-1">
//                         <span className="text-[10px] text-gray-400 font-medium uppercase">PDF FILE</span>
//                         <span className="text-[10px] text-emerald-400 font-bold hover:underline">OPEN</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//     return null;
// };

// const DirectChatWindow = () => {
//   const { partnerId } = useParams();
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem("userInfo"));
//   const scrollRef = useRef();
  
//   // ✅ FIX 1: Use useRef for socket to persist connection across renders
//   const socket = useRef(null);
//   const typingTimeoutRef = useRef(null); // To clear typing timeout

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [partner, setPartner] = useState(null);
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [partnerStatus, setPartnerStatus] = useState({ isOnline: false, lastSeen: null });
//   const [previewMedia, setPreviewMedia] = useState(null); 

//   const isSingleEmoji = (text) => {
//       if (!text) return false;
//       const regex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]){1,2}$/;
//       return regex.test(text.trim());
//   };

//   const getFileUrl = (path) => path?.startsWith("blob:") || path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

//   // ✅ FIX 2: Socket Logic in one robust useEffect
//   useEffect(() => {
//     // 1. Initialize Connection
//     socket.current = io(BASE_URL);
    
//     // 2. Join Room (Register)
//     socket.current.emit("register_officer", currentUser._id);
//     console.log("🔵 Socket Connected & Registered:", currentUser._id);

//     // 3. API Call for Initial Data
//     const initData = async () => {
//         try {
//             const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            
//             const userRes = await axios.get(`${BASE_URL}/api/users/${partnerId}`, config);
//             setPartner(userRes.data);
//             setPartnerStatus({ isOnline: userRes.data.isOnline, lastSeen: userRes.data.lastSeen });

//             const msgRes = await axios.get(`${BASE_URL}/api/direct-chat/${partnerId}`, config);
//             setMessages(msgRes.data);

//             // Mark unseen messages as seen
//             const unreadIds = msgRes.data
//                 .filter(m => m.senderId === partnerId && m.status !== 'seen')
//                 .map(m => m._id);
            
//             if(unreadIds.length > 0) {
//                 socket.current.emit("mark_seen", { senderId: currentUser._id, recipientId: partnerId, messageIds: unreadIds });
//             }
//         } catch (err) { console.error(err); }
//     };
//     initData();

//     // 4. Socket Listeners
//     socket.current.on("receive_direct_msg", (data) => {
//         console.log("📩 Message Received via Socket:", data);
//         if (data.senderId === partnerId) {
//             setMessages(prev => [...prev, data]);
//             // Acknowledge Seen immediately
//             socket.current.emit("mark_seen", { senderId: currentUser._id, recipientId: partnerId, messageIds: [data._id] });
//         }
//     });

//     socket.current.on("partner_typing", ({ senderId }) => {
//         if(senderId === partnerId) setIsTyping(true);
//     });

//     socket.current.on("partner_stop_typing", ({ senderId }) => {
//         if(senderId === partnerId) setIsTyping(false);
//     });

//     socket.current.on("msg_status_update", ({ messageId, status }) => {
//         setMessages(prev => prev.map(m => m._id === messageId ? { ...m, status } : m));
//     });

//     socket.current.on("msg_status_update_bulk", ({ readerId }) => {
//         if (readerId === partnerId) {
//             setMessages(prev => prev.map(m => m.senderId === currentUser._id ? { ...m, status: 'seen' } : m));
//         }
//     });

//     socket.current.on("user_status_change", ({ userId, status, lastSeen }) => {
//         if (userId === partnerId) {
//             setPartnerStatus({ isOnline: status === 'online', lastSeen });
//         }
//     });

//     // Cleanup on Unmount
//     return () => { 
//         socket.current.disconnect(); 
//         console.log("🔴 Socket Disconnected");
//     };
//   }, [partnerId]); // Re-run only if partner changes

//   // Auto Scroll
//   useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

//   const handleSend = async (e) => {
//       e.preventDefault();
//       if (!newMessage.trim() && !file) return;

//       const tempId = Date.now().toString();
//       let fileType = null;
//       if (file) {
//           if (file.type.startsWith('image')) fileType = 'image';
//           else if (file.type.startsWith('video')) fileType = 'video';
//           else if (file.type.startsWith('audio')) fileType = 'audio';
//           else if (file.type === 'application/pdf') fileType = 'pdf';
//           else fileType = 'file';
//       }

//       const tempMsg = {
//           _id: tempId,
//           senderId: currentUser._id,
//           recipientId: partnerId,
//           message: newMessage,
//           attachment: file ? URL.createObjectURL(file) : null,
//           fileType: fileType,
//           status: 'sending',
//           timestamp: new Date()
//       };

//       setMessages(prev => [...prev, tempMsg]);
//       setNewMessage("");
//       setFile(null);
//       setShowEmoji(false);

//       const formData = new FormData();
//       formData.append("recipientId", partnerId);
//       formData.append("message", newMessage);
//       if (file) {
//           formData.append("file", file);
//           formData.append("fileType", fileType);
//       }

//       try {
//           const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${currentUser.token}` } };
//           const { data } = await axios.post(`${BASE_URL}/api/direct-chat/send`, formData, config);
          
//           // Replace Temp Message with Real Data
//           setMessages(prev => prev.map(m => m._id === tempId ? data : m));
          
//           // ✅ FIX 3: Emit Socket Event explicitly using ref
//           socket.current.emit("send_direct_msg", data);
          
//       } catch (err) { console.error("Send failed", err); }
//   };

//   // ✅ FIX 4: Better Typing Logic (Debounced)
//   const handleTyping = (e) => {
//       setNewMessage(e.target.value);
      
//       if (!socket.current) return;

//       socket.current.emit("typing", { senderId: currentUser._id, recipientId: partnerId });

//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//       typingTimeoutRef.current = setTimeout(() => {
//           socket.current.emit("stop_typing", { senderId: currentUser._id, recipientId: partnerId });
//       }, 2000);
//   };

//   if (!partner) return <div className="bg-slate-900 h-screen flex items-center justify-center text-white">Loading secure chat...</div>;

//   return (
//     <div className="h-screen flex flex-col bg-[#0b141a]">
        
//         {previewMedia && (
//             <MediaPreviewModal 
//                 fileUrl={previewMedia.url} 
//                 fileType={previewMedia.type} 
//                 onClose={() => setPreviewMedia(null)} 
//             />
//         )}

//         {/* --- 1. NAVBAR --- */}
//         <div className="bg-[#202c33] px-4 py-2.5 flex items-center gap-4 shadow-md z-20 border-b border-slate-700/50">
//             <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
//                 <FaArrowLeft />
//             </button>
            
//             <div className="relative">
//                 <img src={partner.idPhoto ? getFileUrl(partner.idPhoto) : "/default.png"} className="w-11 h-11 rounded-full object-cover border-2 border-slate-600" alt="" />
//                 {partnerStatus.isOnline && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#202c33] shadow-sm"></span>}
//             </div>

//             <div className="flex flex-col justify-center flex-1">
//                 <div className="flex items-center gap-2">
//                     <h3 className="text-white font-bold text-base leading-none">{partner.firstName} {partner.lastName}</h3>
//                     {partner.designation && (
//                         <span className="bg-blue-600/20 text-blue-300 text-[10px] px-1.5 py-0.5 rounded border border-blue-500/30 uppercase font-bold tracking-wider">
//                             {partner.designation}
//                         </span>
//                     )}
//                 </div>
//                 <p className="text-[#8696a0] text-xs mt-1 font-medium">
//                     {isTyping ? (
//                         <span className="text-emerald-400 font-bold animate-pulse">typing...</span>
//                     ) : partnerStatus.isOnline ? (
//                         <span className="text-blue-400">Online</span>
//                     ) : (
//                         <span>Last seen {partnerStatus.lastSeen ? new Date(partnerStatus.lastSeen).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "recently"}</span>
//                     )}
//                 </p>
//             </div>
//         </div>

//         {/* --- 2. CHAT AREA WRAPPER --- */}
//         <div className="flex-1 relative bg-[#0b141a] overflow-hidden">
//             <div 
//                 className="absolute inset-0 pointer-events-none opacity-50" 
//                 style={{ 
//                     backgroundImage: `url('/chat-bg.png')`, 
//                     backgroundSize: 'cover', 
//                     backgroundPosition: 'center', 
//                     backgroundRepeat: 'no-repeat'
//                 }}
//             />

//             <div className="absolute inset-0 overflow-y-auto p-4 custom-scrollbar z-10">
//                 <div className="flex flex-col space-y-2 min-h-0">
//                     {messages.map((msg, idx) => {
//                         const isMe = msg.senderId === currentUser._id;
//                         const mediaUrl = getFileUrl(msg.attachment);
//                         const isBigEmoji = !msg.attachment && isSingleEmoji(msg.message);

//                         return (
//                             <motion.div 
//                                 initial={{ opacity: 0, scale: 0.95 }} 
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 key={idx} 
//                                 className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
//                             >
//                                 <div className={`
//                                     relative max-w-[85%] sm:max-w-[70%]
//                                     ${isBigEmoji ? "bg-transparent shadow-none" : "p-2 rounded-lg shadow-md"}
//                                     ${!isBigEmoji && (isMe ? "bg-[#005c4b] text-white rounded-tr-none" : "bg-[#202c33] text-white rounded-tl-none")}
//                                 `}>
//                                     {/* Media */}
//                                     {msg.attachment && (
//                                         <div className="mb-1">
//                                             <MediaAttachment msg={msg} mediaUrl={mediaUrl} onPreview={setPreviewMedia} />
//                                         </div>
//                                     )}

//                                     {/* Text */}
//                                     {msg.message && (
//                                         <p className={`leading-relaxed px-1 pb-1 pt-1 break-words whitespace-pre-wrap ${isBigEmoji ? "text-6xl animate-bounce-slow drop-shadow-lg" : "text-sm"}`}>
//                                             {msg.message}
//                                         </p>
//                                     )}

//                                     {/* Meta */}
//                                     <div className={`flex justify-end items-center gap-1.5 ${isBigEmoji ? "mt-3 bg-black/40 px-2 py-1 rounded-full w-fit ml-auto backdrop-blur-sm" : "mt-0"}`}>
//                                         <span className="text-[10px] text-white/60 font-medium">
//                                             {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                                         </span>
//                                         {isMe && (
//                                             msg.status === 'seen' ? <FaCheckDouble className="text-[#53bdeb] text-xs" /> : 
//                                             msg.status === 'delivered' ? <FaCheckDouble className="text-gray-400 text-xs" /> : 
//                                             msg.status === 'sending' ? <FaSpinner className="text-gray-400 text-[10px] animate-spin" /> :
//                                             <FaCheck className="text-gray-400 text-xs" />
//                                         )}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         );
//                     })}
//                     <div ref={scrollRef} />
//                 </div>
//             </div>
//         </div>

//         {/* --- 3. INPUT AREA --- */}
//         <div className="bg-[#202c33] px-4 py-2 flex items-center gap-3 sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
//             <div className="relative">
//                 <button onClick={() => setShowEmoji(!showEmoji)} className="text-[#8696a0] hover:text-white text-xl transition-transform hover:scale-110"><FaSmile /></button>
//                 {showEmoji && <div className="absolute bottom-14 left-0 shadow-2xl"><EmojiPicker theme="dark" onEmojiClick={(e) => setNewMessage(prev => prev + e.emoji)} /></div>}
//             </div>

//             <label className="text-[#8696a0] hover:text-white cursor-pointer text-xl transition-transform hover:rotate-12">
//                 <FaPaperclip />
//                 <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="image/*,video/*,audio/*,.pdf" />
//             </label>

//             {file && (
//                 <div className="flex items-center gap-2 bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-500/30 animate-pulse">
//                     <FaFileAlt className="text-emerald-400 text-xs" />
//                     <span className="text-xs text-emerald-300 font-mono max-w-[100px] truncate">{file.name}</span>
//                     <button onClick={() => setFile(null)} className="text-emerald-400 hover:text-white ml-1 font-bold">×</button>
//                 </div>
//             )}

//             <input 
//                 value={newMessage}
//                 onChange={handleTyping}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
//                 className="flex-1 bg-[#2a3942] text-white rounded-lg px-4 py-2 outline-none placeholder-gray-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
//                 placeholder="Type a message"
//             />

//             <button 
//                 onClick={handleSend} 
//                 disabled={!newMessage.trim() && !file}
//                 className="bg-[#00a884] p-3 rounded-full text-white shadow-lg hover:bg-[#008f6f] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
//             >
//                 <FaPaperPlane className="text-sm" />
//             </button>
//         </div>
//     </div>
//   );
// };

// export default DirectChatWindow;











import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { motion } from "framer-motion";
import { 
    FaArrowLeft, FaPaperclip, FaPaperPlane, FaSmile, FaCheck, FaCheckDouble, 
    FaFilePdf, FaMusic, FaFileAlt, FaSpinner, FaPlayCircle
} from "react-icons/fa";
import { BASE_URL } from "../config";
import MediaPreviewModal from "../components/common/MediaPreviewModal";

// --- ✅ NEW HELPER FUNCTION: SMART LAST SEEN FORMATTER ---
const formatLastSeen = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    
    // Invalid Date Check
    if (isNaN(date.getTime())) return "";

    // Check if it is Today
    const isToday = date.getDate() === now.getDate() &&
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear();

    // Check if it is Yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() &&
                        date.getMonth() === yesterday.getMonth() &&
                        date.getFullYear() === yesterday.getFullYear();

    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const timeString = date.toLocaleTimeString([], timeOptions);

    if (isToday) {
        return `last seen today at ${timeString}`;
    } else if (isYesterday) {
        return `last seen yesterday at ${timeString}`;
    } else {
        // Older than yesterday: Show Date (e.g., 12 Feb)
        const dateOptions = { day: 'numeric', month: 'short' };
        return `last seen on ${date.toLocaleDateString([], dateOptions)} at ${timeString}`;
    }
};

// --- INTERNAL COMPONENT: SMART MEDIA ATTACHMENT ---
const MediaAttachment = ({ msg, mediaUrl, onPreview }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const showSpinner = msg.status === 'sending' || !isLoaded;

    const LoadingOverlay = () => (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <FaSpinner className="text-white text-3xl animate-spin" />
        </div>
    );

    if (msg.fileType === 'image') {
        return (
            <div 
                className="relative w-64 h-64 rounded-xl overflow-hidden cursor-pointer group shadow-sm bg-black/20" 
                onClick={() => onPreview({ url: mediaUrl, type: 'image' })}
            >
                {showSpinner && <LoadingOverlay />}
                <img 
                    src={mediaUrl} 
                    alt="attachment" 
                    onLoad={() => setIsLoaded(true)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                />
            </div>
        );
    }

    if (msg.fileType === 'video') {
        return (
            <div 
                className="relative w-64 h-48 bg-black rounded-xl overflow-hidden cursor-pointer group shadow-sm flex items-center justify-center" 
                onClick={() => onPreview({ url: mediaUrl, type: 'video' })}
            >
                {showSpinner && <LoadingOverlay />}
                <video 
                    src={mediaUrl} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                    onLoadedData={() => setIsLoaded(true)}
                    muted 
                    preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <FaPlayCircle className="text-white text-5xl opacity-90 drop-shadow-lg group-hover:scale-110 transition-transform" />
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded font-bold backdrop-blur-sm">
                    VIDEO
                </span>
            </div>
        );
    }

    if (msg.fileType === 'audio') {
        return (
            <div className="relative w-72 p-3 bg-[#1f2c34] rounded-lg border border-slate-700/50 flex items-center gap-3 shadow-sm">
                {msg.status === 'sending' && <LoadingOverlay />}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shrink-0 shadow-inner">
                    <FaMusic className="text-white text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                    <audio controls className="w-full h-8 block" onCanPlayThrough={() => setIsLoaded(true)}>
                        <source src={mediaUrl} />
                        Your browser does not support audio.
                    </audio>
                </div>
            </div>
        );
    }

    if (msg.fileType === 'pdf') {
        return (
            <div 
                className="relative w-72 bg-[#1f2c34] rounded-lg border-l-[6px] border-red-500 p-3 flex items-center gap-4 cursor-pointer hover:bg-[#2a3942] transition shadow-sm"
                onClick={() => onPreview({ url: mediaUrl, type: 'pdf' })}
            >
                {msg.status === 'sending' && <LoadingOverlay />}
                <div className="bg-red-500/10 p-2 rounded-lg">
                    <FaFilePdf className="text-red-500 text-2xl" />
                </div>
                <div className="overflow-hidden flex-1">
                    <p className="font-bold text-sm text-gray-200 truncate">Document.pdf</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-gray-400 font-medium uppercase">PDF FILE</span>
                        <span className="text-[10px] text-emerald-400 font-bold hover:underline">OPEN</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const DirectChatWindow = () => {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const scrollRef = useRef();
  
  const socket = useRef(null);
  const typingTimeoutRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [partner, setPartner] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [partnerStatus, setPartnerStatus] = useState({ isOnline: false, lastSeen: null });
  const [previewMedia, setPreviewMedia] = useState(null); 

  const isSingleEmoji = (text) => {
      if (!text) return false;
      const regex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]){1,2}$/;
      return regex.test(text.trim());
  };

  const getFileUrl = (path) => path?.startsWith("blob:") || path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

  useEffect(() => {
    socket.current = io(BASE_URL);
    socket.current.emit("register_officer", currentUser._id);
    console.log("🔵 Socket Connected & Registered:", currentUser._id);

    const initData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            
            const userRes = await axios.get(`${BASE_URL}/api/users/${partnerId}`, config);
            setPartner(userRes.data);
            setPartnerStatus({ isOnline: userRes.data.isOnline, lastSeen: userRes.data.lastSeen });

            const msgRes = await axios.get(`${BASE_URL}/api/direct-chat/${partnerId}`, config);
            setMessages(msgRes.data);

            const unreadIds = msgRes.data
                .filter(m => m.senderId === partnerId && m.status !== 'seen')
                .map(m => m._id);
            
            if(unreadIds.length > 0) {
                socket.current.emit("mark_seen", { senderId: currentUser._id, recipientId: partnerId, messageIds: unreadIds });
            }
        } catch (err) { console.error(err); }
    };
    initData();

    socket.current.on("receive_direct_msg", (data) => {
        console.log("📩 Message Received via Socket:", data);
        if (data.senderId === partnerId) {
            setMessages(prev => [...prev, data]);
            socket.current.emit("mark_seen", { senderId: currentUser._id, recipientId: partnerId, messageIds: [data._id] });
        }
    });

    socket.current.on("partner_typing", ({ senderId }) => {
        if(senderId === partnerId) setIsTyping(true);
    });

    socket.current.on("partner_stop_typing", ({ senderId }) => {
        if(senderId === partnerId) setIsTyping(false);
    });

    socket.current.on("msg_status_update", ({ messageId, status }) => {
        setMessages(prev => prev.map(m => m._id === messageId ? { ...m, status } : m));
    });

    socket.current.on("msg_status_update_bulk", ({ readerId }) => {
        if (readerId === partnerId) {
            setMessages(prev => prev.map(m => m.senderId === currentUser._id ? { ...m, status: 'seen' } : m));
        }
    });

    socket.current.on("user_status_change", ({ userId, status, lastSeen }) => {
        if (userId === partnerId) {
            setPartnerStatus({ isOnline: status === 'online', lastSeen });
        }
    });

    return () => { 
        socket.current.disconnect(); 
        console.log("🔴 Socket Disconnected");
    };
  }, [partnerId]);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = async (e) => {
      e.preventDefault();
      if (!newMessage.trim() && !file) return;

      const tempId = Date.now().toString();
      let fileType = null;
      if (file) {
          if (file.type.startsWith('image')) fileType = 'image';
          else if (file.type.startsWith('video')) fileType = 'video';
          else if (file.type.startsWith('audio')) fileType = 'audio';
          else if (file.type === 'application/pdf') fileType = 'pdf';
          else fileType = 'file';
      }

      const tempMsg = {
          _id: tempId,
          senderId: currentUser._id,
          recipientId: partnerId,
          message: newMessage,
          attachment: file ? URL.createObjectURL(file) : null,
          fileType: fileType,
          status: 'sending',
          timestamp: new Date()
      };

      setMessages(prev => [...prev, tempMsg]);
      setNewMessage("");
      setFile(null);
      setShowEmoji(false);

      const formData = new FormData();
      formData.append("recipientId", partnerId);
      formData.append("message", newMessage);
      if (file) {
          formData.append("file", file);
          formData.append("fileType", fileType);
      }

      try {
          const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${currentUser.token}` } };
          const { data } = await axios.post(`${BASE_URL}/api/direct-chat/send`, formData, config);
          
          setMessages(prev => prev.map(m => m._id === tempId ? data : m));
          socket.current.emit("send_direct_msg", data);
          
      } catch (err) { console.error("Send failed", err); }
  };

  const handleTyping = (e) => {
      setNewMessage(e.target.value);
      if (!socket.current) return;

      socket.current.emit("typing", { senderId: currentUser._id, recipientId: partnerId });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
          socket.current.emit("stop_typing", { senderId: currentUser._id, recipientId: partnerId });
      }, 2000);
  };

  if (!partner) return <div className="bg-slate-900 h-screen flex items-center justify-center text-white">Loading secure chat...</div>;

  return (
    <div className="h-screen flex flex-col bg-[#0b141a]">
        
        {previewMedia && (
            <MediaPreviewModal 
                fileUrl={previewMedia.url} 
                fileType={previewMedia.type} 
                onClose={() => setPreviewMedia(null)} 
            />
        )}

        {/* --- 1. NAVBAR --- */}
        <div className="bg-[#202c33] px-4 py-2.5 flex items-center gap-4 shadow-md z-20 border-b border-slate-700/50">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <FaArrowLeft />
            </button>
            
            <div className="relative">
                <img src={partner.idPhoto ? getFileUrl(partner.idPhoto) : "/default.png"} className="w-11 h-11 rounded-full object-cover border-2 border-slate-600" alt="" />
                {partnerStatus.isOnline && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#202c33] shadow-sm"></span>}
            </div>

            <div className="flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-base leading-none">{partner.firstName} {partner.lastName}</h3>
                    {partner.designation && (
                        <span className="bg-blue-600/20 text-blue-300 text-[10px] px-1.5 py-0.5 rounded border border-blue-500/30 uppercase font-bold tracking-wider">
                            {partner.designation}
                        </span>
                    )}
                </div>
                
                {/* ✅ UPDATED STATUS DISPLAY WITH SMART DATE FORMATTER */}
                <p className="text-[#8696a0] text-xs mt-1 font-medium">
                    {isTyping ? (
                        <span className="text-emerald-400 font-bold animate-pulse">typing...</span>
                    ) : partnerStatus.isOnline ? (
                        <span className="text-blue-400">Online</span>
                    ) : (
                        // Calling the new format function here
                        <span>{formatLastSeen(partnerStatus.lastSeen)}</span>
                    )}
                </p>
            </div>
        </div>

        {/* --- 2. CHAT AREA WRAPPER --- */}
        <div className="flex-1 relative bg-[#0b141a] overflow-hidden">
            <div 
                className="absolute inset-0 pointer-events-none opacity-50" 
                style={{ 
                    backgroundImage: `url('/chat-bg.png')`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="absolute inset-0 overflow-y-auto p-4 custom-scrollbar z-10">
                <div className="flex flex-col space-y-2 min-h-0">
                    {messages.map((msg, idx) => {
                        const isMe = msg.senderId === currentUser._id;
                        const mediaUrl = getFileUrl(msg.attachment);
                        const isBigEmoji = !msg.attachment && isSingleEmoji(msg.message);

                        return (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                key={idx} 
                                className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`
                                    relative max-w-[85%] sm:max-w-[70%]
                                    ${isBigEmoji ? "bg-transparent shadow-none" : "p-2 rounded-lg shadow-md"}
                                    ${!isBigEmoji && (isMe ? "bg-[#005c4b] text-white rounded-tr-none" : "bg-[#202c33] text-white rounded-tl-none")}
                                `}>
                                    {/* Media */}
                                    {msg.attachment && (
                                        <div className="mb-1">
                                            <MediaAttachment msg={msg} mediaUrl={mediaUrl} onPreview={setPreviewMedia} />
                                        </div>
                                    )}

                                    {/* Text */}
                                    {msg.message && (
                                        <p className={`leading-relaxed px-1 pb-1 pt-1 break-words whitespace-pre-wrap ${isBigEmoji ? "text-6xl animate-bounce-slow drop-shadow-lg" : "text-sm"}`}>
                                            {msg.message}
                                        </p>
                                    )}

                                    {/* Meta */}
                                    <div className={`flex justify-end items-center gap-1.5 ${isBigEmoji ? "mt-3 bg-black/40 px-2 py-1 rounded-full w-fit ml-auto backdrop-blur-sm" : "mt-0"}`}>
                                        <span className="text-[10px] text-white/60 font-medium">
                                            {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                        {isMe && (
                                            msg.status === 'seen' ? <FaCheckDouble className="text-[#53bdeb] text-xs" /> : 
                                            msg.status === 'delivered' ? <FaCheckDouble className="text-gray-400 text-xs" /> : 
                                            msg.status === 'sending' ? <FaSpinner className="text-gray-400 text-[10px] animate-spin" /> :
                                            <FaCheck className="text-gray-400 text-xs" />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                    <div ref={scrollRef} />
                </div>
            </div>
        </div>

        {/* --- 3. INPUT AREA --- */}
        <div className="bg-[#202c33] px-4 py-2 flex items-center gap-3 sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="relative">
                <button onClick={() => setShowEmoji(!showEmoji)} className="text-[#8696a0] hover:text-white text-xl transition-transform hover:scale-110"><FaSmile /></button>
                {showEmoji && <div className="absolute bottom-14 left-0 shadow-2xl"><EmojiPicker theme="dark" onEmojiClick={(e) => setNewMessage(prev => prev + e.emoji)} /></div>}
            </div>

            <label className="text-[#8696a0] hover:text-white cursor-pointer text-xl transition-transform hover:rotate-12">
                <FaPaperclip />
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="image/*,video/*,audio/*,.pdf" />
            </label>

            {file && (
                <div className="flex items-center gap-2 bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-500/30 animate-pulse">
                    <FaFileAlt className="text-emerald-400 text-xs" />
                    <span className="text-xs text-emerald-300 font-mono max-w-[100px] truncate">{file.name}</span>
                    <button onClick={() => setFile(null)} className="text-emerald-400 hover:text-white ml-1 font-bold">×</button>
                </div>
            )}

            <input 
                value={newMessage}
                onChange={handleTyping}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
                className="flex-1 bg-[#2a3942] text-white rounded-lg px-4 py-2 outline-none placeholder-gray-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                placeholder="Type a message"
            />

            <button 
                onClick={handleSend} 
                disabled={!newMessage.trim() && !file}
                className="bg-[#00a884] p-3 rounded-full text-white shadow-lg hover:bg-[#008f6f] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
                <FaPaperPlane className="text-sm" />
            </button>
        </div>
    </div>
  );
};

export default DirectChatWindow;