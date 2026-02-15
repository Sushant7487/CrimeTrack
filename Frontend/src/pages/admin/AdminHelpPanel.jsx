// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, Toaster } from "react-hot-toast";
// import { FaReply, FaUser, FaCheckCircle, FaStar } from "react-icons/fa";

// const AdminHelpPanel = () => {
//   const [view, setView] = useState("tickets"); // tickets | feedback
//   const [tickets, setTickets] = useState([]);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [replyText, setReplyText] = useState("");
//   const [activeTicket, setActiveTicket] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, [view]);

//   const fetchData = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//     try {
//       if (view === "tickets") {
//         const { data } = await axios.get("https://crimetrack-api.onrender.com/api/support/admin/help", config);
//         setTickets(data);
//       } else {
//         const { data } = await axios.get("https://crimetrack-api.onrender.com/api/support/admin/feedback", config);
//         setFeedbacks(data);
//       }
//     } catch (err) { toast.error("Fetch failed"); }
//   };

//   const handleReply = async (ticketId) => {
//     if (!replyText) return toast.error("Enter reply!");
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.put(`https://crimetrack-api.onrender.com/api/support/admin/help/${ticketId}/reply`, 
//         { replyMessage: replyText }, 
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       toast.success("Reply Sent!");
//       setReplyText("");
//       setActiveTicket(null);
//       fetchData();
//     } catch (error) { toast.error("Failed to send reply"); }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       <div className="flex gap-4 mb-6 border-b border-slate-700 pb-4">
//         <button onClick={() => setView("tickets")} className={`px-4 py-2 rounded-lg font-bold ${view === 'tickets' ? 'bg-blue-600' : 'bg-slate-800'}`}>Help Tickets</button>
//         <button onClick={() => setView("feedback")} className={`px-4 py-2 rounded-lg font-bold ${view === 'feedback' ? 'bg-purple-600' : 'bg-slate-800'}`}>Reviews & Suggestions</button>
//       </div>

//       <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
//         {view === "tickets" ? (
//           tickets.map(t => (
//             <div key={t._id} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
//               <div className="flex justify-between items-start mb-2">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
//                     <img src={t.user?.idPhoto || "https://placehold.co/50"} className="w-full h-full object-cover" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-white">{t.user?.firstName} {t.user?.lastName} <span className="text-xs text-slate-400">({t.user?.role})</span></h4>
//                     <p className="text-xs text-slate-400">{new Date(t.createdAt).toLocaleString()}</p>
//                   </div>
//                 </div>
//                 <span className={`px-2 py-1 rounded text-xs font-bold ${t.status === 'Open' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{t.status}</span>
//               </div>
              
//               <h5 className="font-bold text-blue-400 mt-2">{t.subject}</h5>
//               <p className="text-slate-300 text-sm mt-1">{t.message}</p>
//               {t.screenshot && <a href={t.screenshot} target="_blank" className="text-xs text-blue-400 underline block mt-2">View Attachment</a>}

//               {/* Admin Reply Section */}
//               {t.adminReply ? (
//                 <div className="mt-4 bg-slate-900/50 p-3 rounded border-l-4 border-green-500">
//                   <p className="text-xs text-green-400 font-bold">Responded:</p>
//                   <p className="text-sm text-slate-400">{t.adminReply}</p>
//                 </div>
//               ) : (
//                 <div className="mt-4">
//                   {activeTicket === t._id ? (
//                     <div className="flex flex-col gap-2">
//                       <textarea className="w-full bg-slate-900 p-2 rounded text-sm text-white border border-slate-600" placeholder="Write reply..." value={replyText} onChange={e => setReplyText(e.target.value)}></textarea>
//                       <div className="flex gap-2">
//                         <button onClick={() => handleReply(t._id)} className="bg-blue-600 px-4 py-1 rounded text-sm hover:bg-blue-500">Send</button>
//                         <button onClick={() => setActiveTicket(null)} className="bg-slate-700 px-4 py-1 rounded text-sm">Cancel</button>
//                       </div>
//                     </div>
//                   ) : (
//                     <button onClick={() => setActiveTicket(t._id)} className="text-sm text-blue-400 hover:underline flex items-center gap-1"><FaReply /> Reply</button>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           feedbacks.map(f => (
//             <div key={f._id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex gap-4">
//                <div className="text-3xl text-purple-500">{f.type === 'Review' ? <FaStar /> : <FaCheckCircle />}</div>
//                <div>
//                  <div className="flex items-center gap-2 mb-1">
//                     <span className="font-bold text-white">{f.user?.firstName}</span>
//                     <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">{f.type}</span>
//                     {f.rating && <span className="text-xs text-yellow-400 flex items-center gap-1">⭐ {f.rating}/5</span>}
//                  </div>
//                  <p className="text-slate-300 text-sm">"{f.comment}"</p>
//                  <p className="text-xs text-slate-500 mt-2">{new Date(f.createdAt).toLocaleDateString()}</p>
//                </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminHelpPanel;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaReply, FaStar, FaCheckCircle, FaExternalLinkAlt, FaImage } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const AdminHelpPanel = () => {
//   const [view, setView] = useState("tickets"); // tickets | feedback
//   const [tickets, setTickets] = useState([]);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [replyText, setReplyText] = useState("");
//   const [activeTicket, setActiveTicket] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, [view]);

//   const fetchData = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//     try {
//       if (view === "tickets") {
//         const { data } = await axios.get(`${BASE_URL}/api/support/admin/help`, config);
//         setTickets(data);
//       } else {
//         const { data } = await axios.get(`${BASE_URL}/api/support/admin/feedback`, config);
//         setFeedbacks(data);
//       }
//     } catch (err) { toast.error("Fetch failed"); }
//   };

//   const handleReply = async (ticketId) => {
//     if (!replyText) return toast.error("Enter reply!");
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.put(`${BASE_URL}/api/support/admin/help/${ticketId}/reply`, 
//         { replyMessage: replyText }, 
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       toast.success("Reply Sent!");
//       setReplyText("");
//       setActiveTicket(null);
//       fetchData();
//     } catch (error) { toast.error("Failed to send reply"); }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Toggle Header */}
//       <div className="flex gap-4 mb-6 border-b border-slate-700 pb-4">
//         <button onClick={() => setView("tickets")} className={`px-5 py-2.5 rounded-lg font-bold transition-all ${view === 'tickets' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
//           Help Tickets ({tickets.length})
//         </button>
//         <button onClick={() => setView("feedback")} className={`px-5 py-2.5 rounded-lg font-bold transition-all ${view === 'feedback' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
//           Reviews & Suggestions ({feedbacks.length})
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 pb-10">
        
//         {/* --- HELP TICKETS VIEW --- */}
//         {view === "tickets" ? (
//           tickets.map(t => (
//             <div key={t._id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-md hover:border-blue-500/30 transition-all">
              
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 p-0.5">
//                     <img src={t.user?.idPhoto || "https://placehold.co/50"} className="w-full h-full rounded-full object-cover border-2 border-slate-800" alt="" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-white text-lg">{t.user?.firstName} {t.user?.lastName}</h4> 
//                     <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded uppercase font-semibold tracking-wider">{t.user?.role}</span>
//                   </div>
//                 </div>
                
//                 <div className="text-right">
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${t.status === 'Open' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
//                         {t.status}
//                     </span>
//                     <p className="text-[10px] text-slate-500 mt-1">{new Date(t.createdAt).toLocaleString()}</p>
//                 </div>
//               </div>
              
//               <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 mb-4">
//                   <h5 className="font-bold text-blue-400 mb-1">{t.subject}</h5>
//                   <p className="text-slate-300 text-sm leading-relaxed">{t.message}</p>
//               </div>

//               {/* ✅ VISUAL IMAGE PREVIEW FOR ADMIN */}
//               {t.screenshot && (
//                   <div className="mb-4">
//                       <p className="text-xs text-gray-500 mb-2 flex items-center gap-1 font-semibold uppercase"><FaImage /> User Attachment</p>
//                       <a href={t.screenshot} target="_blank" rel="noreferrer" className="inline-block group relative">
//                           <img src={t.screenshot} alt="Evidence" className="h-40 w-auto rounded-lg border-2 border-slate-600 transition-transform group-hover:scale-105" />
//                           <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
//                               <FaExternalLinkAlt className="text-white" />
//                           </div>
//                       </a>
//                   </div>
//               )}

//               {/* Reply Section */}
//               {t.adminReply ? (
//                 <div className="mt-4 bg-green-900/10 p-4 rounded-xl border border-green-500/20">
//                   <div className="flex items-center gap-2 mb-1">
//                     <FaCheckCircle className="text-green-500" />
//                     <p className="text-xs text-green-400 font-bold uppercase">Replied by Admin</p>
//                   </div>
//                   <p className="text-sm text-gray-300 ml-6">{t.adminReply}</p>
//                 </div>
//               ) : (
//                 <div className="mt-4 border-t border-slate-700 pt-4">
//                   {activeTicket === t._id ? (
//                     <div className="flex flex-col gap-3">
//                       <textarea 
//                         className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl p-3 text-sm text-white focus:border-blue-500 outline-none transition-all" 
//                         placeholder="Type your solution here..." 
//                         rows="3"
//                         value={replyText} 
//                         onChange={e => setReplyText(e.target.value)}
//                       ></textarea>
//                       <div className="flex gap-3">
//                         <button onClick={() => handleReply(t._id)} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-500 shadow-lg">Send Reply</button>
//                         <button onClick={() => setActiveTicket(null)} className="bg-slate-700 text-gray-300 px-6 py-2 rounded-lg text-sm hover:bg-slate-600">Cancel</button>
//                       </div>
//                     </div>
//                   ) : (
//                     <button onClick={() => setActiveTicket(t._id)} className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-all">
//                         <FaReply /> Write a Reply
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           /* --- FEEDBACK VIEW --- */
//           feedbacks.map(f => (
//             <div key={f._id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex gap-5 shadow-sm hover:border-purple-500/30 transition-all">
//                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${f.type === 'Review' ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' : 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'}`}>
//                    {f.type === 'Review' ? <FaStar /> : <FaCheckCircle />}
//                </div>
               
//                <div className="flex-1">
//                  <div className="flex justify-between items-start mb-2">
//                     <div>
//                         <h4 className="font-bold text-white text-lg">{f.user?.firstName} {f.user?.lastName}</h4>
//                         <span className="text-xs text-slate-400">{f.user?.email}</span>
//                     </div>
//                     <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded">{new Date(f.createdAt).toLocaleDateString()}</span>
//                  </div>

//                  <div className="flex items-center gap-3 mb-3">
//                     <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${f.type === 'Review' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400'}`}>
//                         {f.type}
//                     </span>
//                     {f.rating && (
//                         <div className="flex gap-1 text-yellow-400 text-sm">
//                             {[...Array(f.rating)].map((_, i) => <FaStar key={i} />)}
//                         </div>
//                     )}
//                  </div>
                 
//                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
//                     <p className="text-slate-300 text-sm italic">"{f.comment}"</p>
//                  </div>
//                </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminHelpPanel;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaReply, FaStar, FaCheckCircle, FaExternalLinkAlt, FaImage } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const AdminHelpPanel = () => {
//   const [view, setView] = useState("tickets");
//   const [tickets, setTickets] = useState([]);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [replyText, setReplyText] = useState("");
//   const [activeTicket, setActiveTicket] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, [view]);

//   const fetchData = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//     try {
//       if (view === "tickets") {
//         const { data } = await axios.get(`${BASE_URL}/api/support/admin/help`, config);
//         setTickets(data);
//       } else {
//         const { data } = await axios.get(`${BASE_URL}/api/support/admin/feedback`, config);
//         setFeedbacks(data);
//       }
//     } catch (err) { toast.error("Fetch failed"); }
//   };

//   const handleReply = async (ticketId) => {
//     if (!replyText) return toast.error("Enter reply!");
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.put(`${BASE_URL}/api/support/admin/help/${ticketId}/reply`, 
//         { replyMessage: replyText }, 
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       toast.success("Reply Sent!");
//       setReplyText("");
//       setActiveTicket(null);
//       fetchData();
//     } catch (error) { toast.error("Failed to send reply"); }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Toggle Header - Compact Mobile */}
//       <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 border-b border-slate-700 pb-3 md:pb-4">
//         <button onClick={() => setView("tickets")} className={`px-3 py-1.5 text-xs md:px-5 md:py-2.5 md:text-sm rounded-lg font-bold transition-all ${view === 'tickets' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
//           Help Tickets ({tickets.length})
//         </button>
//         <button onClick={() => setView("feedback")} className={`px-3 py-1.5 text-xs md:px-5 md:py-2.5 md:text-sm rounded-lg font-bold transition-all ${view === 'feedback' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
//           Reviews & Suggestions ({feedbacks.length})
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 md:space-y-4 pr-1 md:pr-2 pb-10">
        
//         {/* --- HELP TICKETS VIEW --- */}
//         {view === "tickets" ? (
//           tickets.map(t => (
//             <div key={t._id} className="bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-700 shadow-md hover:border-blue-500/30 transition-all">
              
//               <div className="flex justify-between items-start mb-3 md:mb-4">
//                 <div className="flex items-center gap-3 md:gap-4">
//                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 p-0.5">
//                     <img src={t.user?.idPhoto || "https://placehold.co/50"} className="w-full h-full rounded-full object-cover border-2 border-slate-800" alt="" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-white text-sm md:text-lg">{t.user?.firstName} {t.user?.lastName}</h4> 
//                     <span className="text-[10px] md:text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 md:px-2 rounded uppercase font-semibold tracking-wider">{t.user?.role}</span>
//                   </div>
//                 </div>
                
//                 <div className="text-right">
//                     <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide border ${t.status === 'Open' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
//                         {t.status}
//                     </span>
//                     <p className="text-[9px] md:text-[10px] text-slate-500 mt-1">{new Date(t.createdAt).toLocaleString()}</p>
//                 </div>
//               </div>
              
//               <div className="bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-700/50 mb-3 md:mb-4">
//                   <h5 className="font-bold text-blue-400 mb-1 text-sm md:text-base">{t.subject}</h5>
//                   <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{t.message}</p>
//               </div>

//               {/* Visual Image Preview */}
//               {t.screenshot && (
//                   <div className="mb-4">
//                       <p className="text-[10px] md:text-xs text-gray-500 mb-2 flex items-center gap-1 font-semibold uppercase"><FaImage /> User Attachment</p>
//                       <a href={t.screenshot} target="_blank" rel="noreferrer" className="inline-block group relative">
//                           <img src={t.screenshot} alt="Evidence" className="h-24 md:h-40 w-auto rounded-lg border-2 border-slate-600 transition-transform group-hover:scale-105" />
//                           <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
//                               <FaExternalLinkAlt className="text-white" />
//                           </div>
//                       </a>
//                   </div>
//               )}

//               {/* Reply Section */}
//               {t.adminReply ? (
//                 <div className="mt-4 bg-green-900/10 p-3 md:p-4 rounded-xl border border-green-500/20">
//                   <div className="flex items-center gap-2 mb-1">
//                     <FaCheckCircle className="text-green-500 text-sm" />
//                     <p className="text-xs md:text-sm text-green-400 font-bold uppercase">Replied by Admin</p>
//                   </div>
//                   <p className="text-xs md:text-sm text-gray-300 ml-5 md:ml-6">{t.adminReply}</p>
//                 </div>
//               ) : (
//                 <div className="mt-4 border-t border-slate-700 pt-4">
//                   {activeTicket === t._id ? (
//                     <div className="flex flex-col gap-2 md:gap-3">
//                       <textarea 
//                         className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl p-2.5 md:p-3 text-xs md:text-sm text-white focus:border-blue-500 outline-none transition-all" 
//                         placeholder="Type your solution here..." 
//                         rows="3"
//                         value={replyText} 
//                         onChange={e => setReplyText(e.target.value)}
//                       ></textarea>
//                       <div className="flex gap-2 md:gap-3">
//                         <button onClick={() => handleReply(t._id)} className="bg-blue-600 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-blue-500 shadow-lg">Send Reply</button>
//                         <button onClick={() => setActiveTicket(null)} className="bg-slate-700 text-gray-300 px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-xs md:text-sm hover:bg-slate-600">Cancel</button>
//                       </div>
//                     </div>
//                   ) : (
//                     <button onClick={() => setActiveTicket(t._id)} className="text-xs md:text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-500/20 transition-all">
//                         <FaReply /> Write a Reply
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           /* --- FEEDBACK VIEW --- */
//           feedbacks.map(f => (
//             <div key={f._id} className="bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-700 flex gap-3 md:gap-5 shadow-sm hover:border-purple-500/30 transition-all">
//                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-lg md:text-2xl shadow-lg shrink-0 ${f.type === 'Review' ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' : 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'}`}>
//                    {f.type === 'Review' ? <FaStar /> : <FaCheckCircle />}
//                </div>
               
//                <div className="flex-1 min-w-0">
//                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1 md:gap-0">
//                     <div>
//                         <h4 className="font-bold text-white text-sm md:text-lg">{f.user?.firstName} {f.user?.lastName}</h4>
//                         <span className="text-[10px] md:text-xs text-slate-400 block">{f.user?.email}</span>
//                     </div>
//                     <span className="text-[9px] md:text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded w-fit">{new Date(f.createdAt).toLocaleDateString()}</span>
//                  </div>

//                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
//                     <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded font-bold uppercase ${f.type === 'Review' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400'}`}>
//                         {f.type}
//                     </span>
//                     {f.rating && (
//                         <div className="flex gap-0.5 md:gap-1 text-yellow-400 text-xs md:text-sm">
//                             {[...Array(f.rating)].map((_, i) => <FaStar key={i} />)}
//                         </div>
//                     )}
//                  </div>
                 
//                  <div className="bg-slate-900/50 p-2.5 md:p-3 rounded-xl border border-slate-700/50">
//                     <p className="text-slate-300 text-xs md:text-sm italic">"{f.comment}"</p>
//                  </div>
//                </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminHelpPanel;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { 
  FaReply, FaStar, FaCheckCircle, FaExternalLinkAlt, FaImage, FaBullhorn 
} from "react-icons/fa"; // ✅ Imported FaBullhorn
import { BASE_URL } from "../../config";

const AdminHelpPanel = () => {
  const [view, setView] = useState("tickets");
  const [tickets, setTickets] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [activeTicket, setActiveTicket] = useState(null);

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    try {
      if (view === "tickets") {
        const { data } = await axios.get(`${BASE_URL}/api/support/admin/help`, config);
        setTickets(data);
      } else {
        const { data } = await axios.get(`${BASE_URL}/api/support/admin/feedback`, config);
        setFeedbacks(data);
      }
    } catch (err) { toast.error("Fetch failed"); }
  };

  const handleReply = async (ticketId) => {
    if (!replyText) return toast.error("Enter reply!");
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.put(`${BASE_URL}/api/support/admin/help/${ticketId}/reply`, 
        { replyMessage: replyText }, 
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      toast.success("Reply Sent!");
      setReplyText("");
      setActiveTicket(null);
      fetchData();
    } catch (error) { toast.error("Failed to send reply"); }
  };

  // ✅ NEW: Handle Promotion to FAQ
  const handlePromoteToFAQ = async (ticketId) => {
    if(!window.confirm("Publish this Q&A to the Home Page FAQ section?")) return;
    
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        await axios.post(`${BASE_URL}/api/support/admin/help/${ticketId}/promote`, {}, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        toast.success("Added to Home Page FAQs!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to promote");
    }
  };

  return (
    <div className="h-full flex flex-col font-sans">
      {/* Toggle Header - Compact Mobile */}
      <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 border-b border-slate-700 pb-3 md:pb-4">
        <button onClick={() => setView("tickets")} className={`px-3 py-1.5 text-xs md:px-5 md:py-2.5 md:text-sm rounded-lg font-bold transition-all ${view === 'tickets' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
          Help Tickets ({tickets.length})
        </button>
        <button onClick={() => setView("feedback")} className={`px-3 py-1.5 text-xs md:px-5 md:py-2.5 md:text-sm rounded-lg font-bold transition-all ${view === 'feedback' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
          Reviews & Suggestions ({feedbacks.length})
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 md:space-y-4 pr-1 md:pr-2 pb-10">
        
        {/* --- HELP TICKETS VIEW --- */}
        {view === "tickets" ? (
          tickets.map(t => (
            <div key={t._id} className="bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-700 shadow-md hover:border-blue-500/30 transition-all">
              
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 p-0.5">
                    <img src={t.user?.idPhoto || "https://placehold.co/50"} className="w-full h-full rounded-full object-cover border-2 border-slate-800" alt="" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm md:text-lg">{t.user?.firstName} {t.user?.lastName}</h4> 
                    <span className="text-[10px] md:text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 md:px-2 rounded uppercase font-semibold tracking-wider">{t.user?.role}</span>
                  </div>
                </div>
                
                <div className="text-right">
                    <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide border ${t.status === 'Open' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                        {t.status}
                    </span>
                    <p className="text-[9px] md:text-[10px] text-slate-500 mt-1">{new Date(t.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-700/50 mb-3 md:mb-4">
                  <h5 className="font-bold text-blue-400 mb-1 text-sm md:text-base">{t.subject}</h5>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{t.message}</p>
              </div>

              {/* Visual Image Preview */}
              {t.screenshot && (
                  <div className="mb-4">
                      <p className="text-[10px] md:text-xs text-gray-500 mb-2 flex items-center gap-1 font-semibold uppercase"><FaImage /> User Attachment</p>
                      <a href={t.screenshot} target="_blank" rel="noreferrer" className="inline-block group relative">
                          <img src={t.screenshot} alt="Evidence" className="h-24 md:h-40 w-auto rounded-lg border-2 border-slate-600 transition-transform group-hover:scale-105" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                              <FaExternalLinkAlt className="text-white" />
                          </div>
                      </a>
                  </div>
              )}

              {/* Reply Section */}
              {t.adminReply ? (
                <div className="mt-4">
                    <div className="bg-green-900/10 p-3 md:p-4 rounded-xl border border-green-500/20 mb-3">
                        <div className="flex items-center gap-2 mb-1">
                            <FaCheckCircle className="text-green-500 text-sm" />
                            <p className="text-xs md:text-sm text-green-400 font-bold uppercase">Replied by Admin</p>
                        </div>
                        <p className="text-xs md:text-sm text-gray-300 ml-5 md:ml-6">{t.adminReply}</p>
                    </div>
                    
                    {/* ✅ PUBLISH TO FAQ BUTTON */}
                    <div className="flex justify-end">
                        <button 
                            onClick={() => handlePromoteToFAQ(t._id)}
                            className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-900/20 px-3 py-1.5 rounded-lg border border-cyan-500/30 hover:bg-cyan-900/40 transition-all"
                        >
                            <FaBullhorn /> Publish to Home FAQ
                        </button>
                    </div>
                </div>
              ) : (
                <div className="mt-4 border-t border-slate-700 pt-4">
                  {activeTicket === t._id ? (
                    <div className="flex flex-col gap-2 md:gap-3">
                      <textarea 
                        className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl p-2.5 md:p-3 text-xs md:text-sm text-white focus:border-blue-500 outline-none transition-all" 
                        placeholder="Type your solution here..." 
                        rows="3"
                        value={replyText} 
                        onChange={e => setReplyText(e.target.value)}
                      ></textarea>
                      <div className="flex gap-2 md:gap-3">
                        <button onClick={() => handleReply(t._id)} className="bg-blue-600 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-blue-500 shadow-lg">Send Reply</button>
                        <button onClick={() => setActiveTicket(null)} className="bg-slate-700 text-gray-300 px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-xs md:text-sm hover:bg-slate-600">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setActiveTicket(t._id)} className="text-xs md:text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-500/20 transition-all">
                        <FaReply /> Write a Reply
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          /* --- FEEDBACK VIEW --- */
          feedbacks.map(f => (
            <div key={f._id} className="bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-700 flex gap-3 md:gap-5 shadow-sm hover:border-purple-500/30 transition-all">
               <div className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-lg md:text-2xl shadow-lg shrink-0 ${f.type === 'Review' ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' : 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'}`}>
                   {f.type === 'Review' ? <FaStar /> : <FaCheckCircle />}
               </div>
               
               <div className="flex-1 min-w-0">
                 <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1 md:gap-0">
                    <div>
                        <h4 className="font-bold text-white text-sm md:text-lg">{f.user?.firstName} {f.user?.lastName}</h4>
                        <span className="text-[10px] md:text-xs text-slate-400 block">{f.user?.email}</span>
                    </div>
                    <span className="text-[9px] md:text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded w-fit">{new Date(f.createdAt).toLocaleDateString()}</span>
                 </div>

                 <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded font-bold uppercase ${f.type === 'Review' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400'}`}>
                        {f.type}
                    </span>
                    {f.rating && (
                        <div className="flex gap-0.5 md:gap-1 text-yellow-400 text-xs md:text-sm">
                            {[...Array(f.rating)].map((_, i) => <FaStar key={i} />)}
                        </div>
                    )}
                 </div>
                 
                 <div className="bg-slate-900/50 p-2.5 md:p-3 rounded-xl border border-slate-700/50">
                    <p className="text-slate-300 text-xs md:text-sm italic">"{f.comment}"</p>
                 </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminHelpPanel;