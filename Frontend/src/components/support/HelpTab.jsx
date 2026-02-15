// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaPaperclip, FaPaperPlane, FaSpinner, FaHistory } from "react-icons/fa";

// const HelpTab = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [subject, setSubject] = useState("");
//   const [image, setImage] = useState(null);

//   const fetchTickets = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const { data } = await axios.get("http://localhost:5000/api/support/help/my-tickets", {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       });
//       setTickets(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message) return toast.error("Message is required");

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("message", message);
//     formData.append("subject", subject || "General Inquiry");
//     if (image) formData.append("screenshot", image);

//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.post("http://localhost:5000/api/support/help", formData, {
//         headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Ticket Created Successfully!");
//       setMessage("");
//       setSubject("");
//       setImage(null);
//       fetchTickets();
//     } catch (error) {
//       toast.error("Failed to submit ticket");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-8">
//       {/* Form Section */}
//       <div className="md:w-1/2">
//         <h3 className="text-xl font-bold text-white mb-4">Create New Request</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Subject (Optional)"
//             className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />
//           <textarea
//             placeholder="Describe your issue..."
//             className="w-full h-40 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none resize-none"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           ></textarea>
          
//           <div className="flex items-center gap-4">
//             <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
//               <FaPaperclip /> {image ? "Image Attached" : "Attach Screenshot"}
//               <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
//             </label>
//             <button
//               disabled={loading}
//               className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all"
//             >
//               {loading ? <FaSpinner className="animate-spin" /> : <><FaPaperPlane /> Submit Ticket</>}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* History Section */}
//       <div className="md:w-1/2 h-[500px] overflow-y-auto custom-scrollbar">
//         <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//           <FaHistory /> Your Ticket History
//         </h3>
//         {tickets.length === 0 ? (
//           <p className="text-slate-500 text-center mt-10">No tickets found.</p>
//         ) : (
//           <div className="space-y-4">
//             {tickets.map((t) => (
//               <div key={t._id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
//                 <div className="flex justify-between items-start mb-2">
//                   <h4 className="font-bold text-white">{t.subject}</h4>
//                   <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
//                     t.status === 'Resolved' ? 'bg-green-900 text-green-400' : 'bg-yellow-900 text-yellow-400'
//                   }`}>{t.status}</span>
//                 </div>
//                 <p className="text-slate-400 text-sm mb-3">"{t.message}"</p>
//                 {t.screenshot && (
//                   <a href={t.screenshot} target="_blank" rel="noreferrer" className="text-blue-400 text-xs underline mb-3 block">View Screenshot</a>
//                 )}
                
//                 {/* Admin Reply Block */}
//                 {t.adminReply && (
//                   <div className="bg-slate-800 border-l-4 border-blue-500 p-3 rounded mt-2">
//                     <p className="text-xs text-blue-300 font-bold mb-1">Admin Reply:</p>
//                     <p className="text-sm text-white">{t.adminReply}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HelpTab;









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaPaperclip, FaPaperPlane, FaSpinner, FaHistory, FaImage } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const HelpTab = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [subject, setSubject] = useState("");
//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null); // ✅ For immediate preview

//   const fetchTickets = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const { data } = await axios.get(`${BASE_URL}/api/support/help/my-tickets`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       });
//       setTickets(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   // Handle Image Selection & Preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message) return toast.error("Message is required");

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("message", message);
//     formData.append("subject", subject || "General Inquiry");
//     if (image) formData.append("screenshot", image);

//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.post(`${BASE_URL}/api/support/help`, formData, {
//         headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Ticket Created Successfully!");
//       setMessage("");
//       setSubject("");
//       setImage(null);
//       setPreviewUrl(null);
//       fetchTickets();
//     } catch (error) {
//       toast.error("Failed to submit ticket");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-8">
//       {/* --- FORM SECTION --- */}
//       <div className="md:w-1/2">
//         <h3 className="text-xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
//           Create New Request
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Subject Input */}
//           <input
//             type="text"
//             placeholder="Subject (Optional)"
//             className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-gray-500"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />

//           {/* Description Box with Nice Border */}
//           <div className="relative">
//             <textarea
//               placeholder="Describe your issue in detail..."
//               className="w-full h-40 bg-slate-900/50 border-2 border-slate-600 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none resize-none transition-all placeholder-gray-500"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//             <div className="absolute bottom-3 right-3 text-xs text-gray-500">{message.length} chars</div>
//           </div>
          
//           {/* Attachment & Preview */}
//           <div className="space-y-3">
//             <div className="flex items-center gap-4">
//               <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-600 text-gray-300 px-5 py-3 rounded-xl text-sm flex items-center gap-2 transition-all hover:border-blue-400 group">
//                 <FaPaperclip className="group-hover:text-blue-400" /> 
//                 {image ? "Change Image" : "Attach Screenshot"}
//                 <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
//               </label>

//               <button
//                 disabled={loading}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-900/30 active:scale-95"
//               >
//                 {loading ? <FaSpinner className="animate-spin" /> : <><FaPaperPlane /> Submit Ticket</>}
//               </button>
//             </div>

//             {/* ✅ IMAGE PREVIEW BOX */}
//             {previewUrl && (
//               <div className="mt-2 p-2 bg-slate-800 rounded-xl border border-dashed border-slate-500 inline-block">
//                 <p className="text-xs text-gray-400 mb-1 ml-1">Attachment Preview:</p>
//                 <img src={previewUrl} alt="Preview" className="h-24 w-auto rounded-lg object-cover" />
//               </div>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* --- HISTORY SECTION --- */}
//       <div className="md:w-1/2 h-[600px] overflow-y-auto custom-scrollbar pr-2">
//         <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 sticky top-0 bg-gray-900/95 backdrop-blur py-2 z-10">
//           <FaHistory className="text-blue-500" /> Ticket History
//         </h3>

//         {tickets.length === 0 ? (
//           <div className="text-slate-500 text-center mt-20 flex flex-col items-center">
//             <FaHistory className="text-4xl mb-3 opacity-20" />
//             <p>No tickets found.</p>
//           </div>
//         ) : (
//           <div className="space-y-5">
//             {tickets.map((t) => (
//               <div key={t._id} className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl hover:border-blue-500/30 transition-all shadow-md">
                
//                 <div className="flex justify-between items-start mb-3">
//                   <h4 className="font-bold text-white text-lg">{t.subject}</h4>
//                   <span className={`text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wide border ${
//                     t.status === 'Resolved' 
//                       ? 'bg-green-500/10 text-green-400 border-green-500/20' 
//                       : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
//                   }`}>
//                     {t.status}
//                   </span>
//                 </div>

//                 <p className="text-slate-300 text-sm mb-4 leading-relaxed bg-slate-900/30 p-3 rounded-lg border border-slate-700/50">
//                   {t.message}
//                 </p>
                
//                 {/* ✅ VISUAL IMAGE DISPLAY (Not just a link) */}
//                 {t.screenshot && (
//                   <div className="mb-4">
//                     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><FaImage /> Attachment:</p>
//                     <a href={t.screenshot} target="_blank" rel="noreferrer" className="block w-fit">
//                       <img 
//                         src={t.screenshot} 
//                         alt="Attachment" 
//                         className="h-32 w-auto rounded-lg border border-slate-600 hover:scale-105 transition-transform cursor-zoom-in" 
//                       />
//                     </a>
//                   </div>
//                 )}
                
//                 {/* Admin Reply Block */}
//                 {t.adminReply && (
//                   <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-green-500 p-4 rounded-r-xl shadow-inner">
//                     <p className="text-xs text-green-400 font-bold mb-1 uppercase tracking-wider">Response from Admin</p>
//                     <p className="text-sm text-gray-200">{t.adminReply}</p>
//                     <p className="text-[10px] text-gray-500 mt-2 text-right">{new Date(t.adminRepliedAt).toLocaleString()}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HelpTab;













// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaPaperclip, FaPaperPlane, FaSpinner, FaHistory, FaImage } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const HelpTab = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [subject, setSubject] = useState("");
//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const fetchTickets = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const { data } = await axios.get(`${BASE_URL}/api/support/help/my-tickets`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       });
//       setTickets(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message) return toast.error("Message is required");

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("message", message);
//     formData.append("subject", subject || "General Inquiry");
//     if (image) formData.append("screenshot", image);

//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.post(`${BASE_URL}/api/support/help`, formData, {
//         headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Ticket Created Successfully!");
//       setMessage("");
//       setSubject("");
//       setImage(null);
//       setPreviewUrl(null);
//       fetchTickets();
//     } catch (error) {
//       toast.error("Failed to submit ticket");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-6 md:gap-8">
//       {/* --- FORM SECTION --- */}
//       <div className="md:w-1/2">
//         <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
//           Create New Request
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
//           {/* Subject Input - Compact on Mobile */}
//           <input
//             type="text"
//             placeholder="Subject (Optional)"
//             className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-3 text-sm md:p-4 md:text-base text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-gray-500"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />

//           {/* Description Box - Reduced Height on Mobile */}
//           <div className="relative">
//             <textarea
//               placeholder="Describe your issue in detail..."
//               className="w-full h-32 md:h-40 bg-slate-900/50 border-2 border-slate-600 rounded-xl p-3 text-sm md:p-4 md:text-base text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none resize-none transition-all placeholder-gray-500"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//             <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 text-[10px] md:text-xs text-gray-500">{message.length} chars</div>
//           </div>
          
//           {/* Attachment & Submit - Stacked on tiny screens, flex on others */}
//           <div className="space-y-3">
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
//               <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-600 text-gray-300 px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all hover:border-blue-400 group">
//                 <FaPaperclip className="group-hover:text-blue-400" /> 
//                 {image ? "Change Image" : "Attach Screenshot"}
//                 <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
//               </label>

//               <button
//                 disabled={loading}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-900/30 active:scale-95"
//               >
//                 {loading ? <FaSpinner className="animate-spin" /> : <><FaPaperPlane /> Submit Ticket</>}
//               </button>
//             </div>

//             {/* Preview Box - Smaller on Mobile */}
//             {previewUrl && (
//               <div className="mt-2 p-1.5 md:p-2 bg-slate-800 rounded-xl border border-dashed border-slate-500 inline-block">
//                 <p className="text-[10px] md:text-xs text-gray-400 mb-1 ml-1">Attachment Preview:</p>
//                 <img src={previewUrl} alt="Preview" className="h-16 md:h-24 w-auto rounded-lg object-cover" />
//               </div>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* --- HISTORY SECTION --- */}
//       <div className="md:w-1/2 h-[400px] md:h-[600px] overflow-y-auto custom-scrollbar pr-1 md:pr-2">
//         <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 sticky top-0 bg-gray-900/95 backdrop-blur py-2 z-10">
//           <FaHistory className="text-blue-500" /> Ticket History
//         </h3>

//         {tickets.length === 0 ? (
//           <div className="text-slate-500 text-center mt-10 md:mt-20 flex flex-col items-center">
//             <FaHistory className="text-3xl md:text-4xl mb-3 opacity-20" />
//             <p className="text-sm md:text-base">No tickets found.</p>
//           </div>
//         ) : (
//           <div className="space-y-4 md:space-y-5">
//             {tickets.map((t) => (
//               <div key={t._id} className="bg-slate-800/40 border border-slate-700 p-4 md:p-5 rounded-2xl hover:border-blue-500/30 transition-all shadow-md">
                
//                 <div className="flex justify-between items-start mb-2 md:mb-3">
//                   <h4 className="font-bold text-white text-base md:text-lg line-clamp-1">{t.subject}</h4>
//                   <span className={`text-[10px] px-2 py-0.5 md:py-1 rounded-full uppercase font-bold tracking-wide border ${
//                     t.status === 'Resolved' 
//                       ? 'bg-green-500/10 text-green-400 border-green-500/20' 
//                       : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
//                   }`}>
//                     {t.status}
//                   </span>
//                 </div>

//                 <p className="text-slate-300 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed bg-slate-900/30 p-2.5 md:p-3 rounded-lg border border-slate-700/50">
//                   {t.message}
//                 </p>
                
//                 {/* Visual Image - Smaller on Mobile */}
//                 {t.screenshot && (
//                   <div className="mb-3 md:mb-4">
//                     <p className="text-[10px] md:text-xs text-gray-500 mb-1 flex items-center gap-1"><FaImage /> Attachment:</p>
//                     <a href={t.screenshot} target="_blank" rel="noreferrer" className="block w-fit">
//                       <img 
//                         src={t.screenshot} 
//                         alt="Attachment" 
//                         className="h-20 md:h-32 w-auto rounded-lg border border-slate-600 hover:scale-105 transition-transform cursor-zoom-in" 
//                       />
//                     </a>
//                   </div>
//                 )}
                
//                 {/* Admin Reply - Compact */}
//                 {t.adminReply && (
//                   <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-green-500 p-3 md:p-4 rounded-r-xl shadow-inner">
//                     <p className="text-[10px] md:text-xs text-green-400 font-bold mb-1 uppercase tracking-wider">Response from Admin</p>
//                     <p className="text-xs md:text-sm text-gray-200">{t.adminReply}</p>
//                     <p className="text-[9px] md:text-[10px] text-gray-500 mt-1.5 text-right">{new Date(t.adminRepliedAt).toLocaleString()}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HelpTab;
















import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaPaperclip, FaPaperPlane, FaSpinner, FaHistory, FaImage, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { BASE_URL } from "../../config";

const HelpTab = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchTickets = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(`${BASE_URL}/api/support/help/my-tickets`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setTickets(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return toast.error("Message is required");

    setLoading(true);
    const formData = new FormData();
    formData.append("message", message);
    formData.append("subject", subject || "General Inquiry");
    if (image) formData.append("screenshot", image);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.post(`${BASE_URL}/api/support/help`, formData, {
        headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" },
      });
      toast.success("Ticket Created Successfully!");
      setMessage("");
      setSubject("");
      setImage(null);
      setPreviewUrl(null);
      fetchTickets();
    } catch (error) {
      toast.error("Failed to submit ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20">
      
      {/* --- FORM SECTION (Left) --- */}
      <div className="lg:w-5/12 animate-enter">
        <div className="bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/20">
                    <FaPaperPlane className="text-white text-sm" />
                </span>
                Create New Request
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="text-xs font-bold text-blue-200/70 uppercase mb-2 block tracking-wider pl-2">Subject</label>
                <input
                    type="text"
                    placeholder="Brief summary of issue..."
                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl p-4 text-white font-medium focus:border-cyan-400 focus:bg-slate-800 outline-none transition-all shadow-inner backdrop-blur-sm"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="text-xs font-bold text-blue-200/70 uppercase mb-2 block tracking-wider pl-2">Description</label>
                <textarea
                    placeholder="Describe your issue in detail..."
                    className="w-full h-40 bg-slate-800/50 border border-white/10 rounded-2xl p-4 text-white font-sans text-sm leading-relaxed focus:border-cyan-400 focus:bg-slate-800 outline-none resize-none transition-all shadow-inner backdrop-blur-sm"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <div className="text-right text-[10px] text-slate-500 pr-2 mt-1">{message.length} chars</div>
              </div>
              
              {/* Styled File Upload */}
              <div className="relative group cursor-pointer">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" onChange={handleImageChange} />
                  <div className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed transition-all ${previewUrl ? 'border-cyan-500/50 bg-cyan-900/10' : 'border-white/10 bg-slate-800/30 group-hover:border-cyan-400/30'}`}>
                      {previewUrl ? (
                          <div className="flex items-center gap-4 w-full">
                              <img src={previewUrl} alt="Preview" className="h-12 w-12 rounded-lg object-cover border border-white/20 shadow-md" />
                              <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-cyan-300 truncate">{image?.name}</p>
                                  <p className="text-[10px] text-slate-400">Click to change image</p>
                              </div>
                          </div>
                      ) : (
                          <>
                              <FaPaperclip className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                              <span className="text-sm text-slate-400 font-medium group-hover:text-white transition-colors">Attach Screenshot (Optional)</span>
                          </>
                      )}
                  </div>
              </div>

              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black py-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(6,182,212,0.5)] transition-all flex justify-center items-center gap-3 text-lg transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <FaSpinner className="animate-spin" /> : "SUBMIT TICKET"}
              </button>
            </form>
        </div>
      </div>

      {/* --- HISTORY SECTION (Right) --- */}
      <div className="lg:w-7/12 h-[600px] overflow-y-auto custom-scrollbar pr-2 animate-enter" style={{ animationDelay: '0.1s' }}>
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl z-10 py-4 mb-4 border-b border-white/10">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <FaHistory className="text-cyan-400" /> Ticket History
            </h3>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
            <div className="bg-slate-800/50 p-6 rounded-full mb-4">
                <FaHistory className="text-4xl text-slate-500"/>
            </div>
            <p className="text-slate-400 font-medium text-lg">No tickets found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((t, idx) => (
              <div 
                key={t._id} 
                style={{ animationDelay: `${idx * 100}ms` }}
                className="animate-enter relative bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-[1.5rem] hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/10 overflow-hidden group"
              >
                {/* Status Indicator Bar */}
                <div className={`absolute top-0 left-0 w-1.5 h-full transition-all duration-500 group-hover:w-2 ${
                    t.status === 'Resolved' 
                    ? 'bg-gradient-to-b from-green-500 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                    : 'bg-gradient-to-b from-yellow-500 to-orange-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                }`}></div>

                <div className="flex justify-between items-start mb-3 pl-4">
                  <h4 className="font-bold text-white text-lg line-clamp-1 group-hover:text-cyan-300 transition-colors">{t.subject}</h4>
                  <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-black tracking-wide border shadow-sm flex items-center gap-1 ${
                    t.status === 'Resolved' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}>
                    {t.status === 'Resolved' ? <FaCheckCircle/> : <FaExclamationCircle/>} {t.status}
                  </span>
                </div>

                <p className="pl-4 text-slate-300 text-sm mb-4 leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/5">
                  {t.message}
                </p>
                
                {t.screenshot && (
                  <div className="pl-4 mb-4">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-2 flex items-center gap-1"><FaImage /> Attachment</p>
                    <a href={t.screenshot} target="_blank" rel="noreferrer" className="inline-block relative group/img overflow-hidden rounded-xl border border-white/10">
                      <img 
                        src={t.screenshot} 
                        alt="Attachment" 
                        className="h-20 w-auto object-cover transition-transform duration-500 group-hover/img:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">VIEW</span>
                      </div>
                    </a>
                  </div>
                )}
                
                {t.adminReply && (
                  <div className="pl-4 mt-4">
                      <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-l-4 border-green-500 p-4 rounded-r-2xl shadow-inner backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-[10px] text-green-400 font-black uppercase tracking-wider">Admin Response</p>
                            <span className="text-[9px] text-slate-500">{new Date(t.adminRepliedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-200 font-medium">{t.adminReply}</p>
                      </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpTab;