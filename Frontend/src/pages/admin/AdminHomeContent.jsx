// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaBullhorn, FaStar, FaQuestionCircle, FaSave, FaTrash, FaPlus, FaToggleOn, FaToggleOff } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const AdminHomeContent = () => {
//   const [activeTab, setActiveTab] = useState("marquee");
//   const [marqueeText, setMarqueeText] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [faqs, setFaqs] = useState([]);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [newAnswer, setNewAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/api/homepage/public`);
//       setMarqueeText(data.marquee || "");
//       setFaqs(data.faqs || []);
      
//       // Fetch ALL reviews to let admin select which ones to show
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const reviewData = await axios.get(`${BASE_URL}/api/support/admin/feedback?type=Review`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
      
//       // Mark reviews as 'selected' based on what's currently in public settings
//       // (For this simple implementation, we will toggle a 'featured' flag locally or rely on a separate list)
//       // *Simplification:* We will fetch all reviews and let admin "Feature" them. 
//       // To save time, we will assume the backend handles "featured" flag on feedback or we store a list of IDs.
//       // *Correction:* Let's use the 'featured' flag logic directly.
//       setReviews(reviewData.data); 

//     } catch (error) {
//       console.error("Error loading data");
//     }
//   };

//   const saveMarquee = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.put(`${BASE_URL}/api/homepage/marquee`, { text: marqueeText }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       toast.success("Marquee Updated!");
//     } catch (error) { toast.error("Failed to update"); }
//   };

//   const toggleReviewFeature = async (reviewId, currentStatus) => {
//     // In a real app, you'd update the specific review's 'isFeatured' status
//     // For this prototype, we will just simulate success or need a backend route update.
//     // Assuming backend supports toggling feature status:
//     try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         await axios.put(`${BASE_URL}/api/homepage/reviews/${reviewId}/toggle`, {}, {
//             headers: { Authorization: `Bearer ${userInfo.token}` }
//         });
//         toast.success("Review visibility updated!");
//         fetchData(); // Reload
//     } catch (error) { toast.error("Update failed"); }
//   };

//   const addFaq = async () => {
//     if(!newQuestion || !newAnswer) return toast.error("Fill all fields");
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.post(`${BASE_URL}/api/homepage/faq`, { question: newQuestion, answer: newAnswer }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       toast.success("FAQ Added!");
//       setNewQuestion(""); setNewAnswer("");
//       fetchData();
//     } catch (error) { toast.error("Failed to add FAQ"); }
//   };

//   const deleteFaq = async (id) => {
//     if(!window.confirm("Delete this FAQ?")) return;
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.delete(`${BASE_URL}/api/homepage/faq/${id}`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       toast.success("FAQ Deleted");
//       fetchData();
//     } catch (error) { toast.error("Delete failed"); }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Tabs */}
//       <div className="flex gap-4 mb-6 border-b border-slate-700 pb-4 overflow-x-auto">
//         {[
//             { id: "marquee", label: "Marquee Notification", icon: <FaBullhorn /> },
//             { id: "reviews", label: "Featured Reviews", icon: <FaStar /> },
//             { id: "faq", label: "Manage FAQs", icon: <FaQuestionCircle /> },
//         ].map(tab => (
//             <button 
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
//             >
//                 {tab.icon} {tab.label}
//             </button>
//         ))}
//       </div>

//       <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        
//         {/* --- MARQUEE TAB --- */}
//         {activeTab === "marquee" && (
//             <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 max-w-2xl">
//                 <h3 className="text-xl font-bold text-white mb-4">Scrolling Notification Text</h3>
//                 <p className="text-slate-400 text-sm mb-4">This text will scroll continuously at the top of the Home Page.</p>
//                 <textarea 
//                     value={marqueeText} 
//                     onChange={(e) => setMarqueeText(e.target.value)} 
//                     className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:border-cyan-500 outline-none h-32 mb-4"
//                     placeholder="Enter notification text here..."
//                 ></textarea>
//                 <button onClick={saveMarquee} className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
//                     <FaSave /> Save Changes
//                 </button>
//             </div>
//         )}

//         {/* --- REVIEWS TAB --- */}
//         {activeTab === "reviews" && (
//             <div>
//                 <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
//                     <p className="text-blue-300 text-sm">Toggle the switch to show/hide specific reviews on the Home Page carousel.</p>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {reviews.map(r => (
//                         <div key={r._id} className={`p-5 rounded-xl border ${r.isFeatured ? 'bg-purple-900/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-slate-800 border-slate-700'} transition-all`}>
//                             <div className="flex justify-between items-start mb-3">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
//                                         <img src={r.user?.idPhoto || "https://placehold.co/50"} className="w-full h-full object-cover" alt="" />
//                                     </div>
//                                     <div>
//                                         <h4 className="font-bold text-white text-sm">{r.user?.firstName}</h4>
//                                         <div className="flex text-yellow-400 text-xs">
//                                             {[...Array(r.rating || 0)].map((_, i) => <FaStar key={i} />)}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <button 
//                                     onClick={() => toggleReviewFeature(r._id, r.isFeatured)} 
//                                     className={`text-2xl transition-colors ${r.isFeatured ? 'text-green-400' : 'text-slate-600 hover:text-slate-400'}`}
//                                 >
//                                     {r.isFeatured ? <FaToggleOn /> : <FaToggleOff />}
//                                 </button>
//                             </div>
//                             <p className="text-slate-400 text-sm italic line-clamp-3">"{r.comment}"</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         )}

//         {/* --- FAQ TAB --- */}
//         {activeTab === "faq" && (
//             <div className="flex flex-col lg:flex-row gap-8">
//                 {/* List */}
//                 <div className="flex-1 space-y-4">
//                     {faqs.map((faq, idx) => (
//                         <div key={faq._id || idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 group">
//                             <div className="flex justify-between items-start">
//                                 <h4 className="font-bold text-white text-lg mb-2">{faq.question}</h4>
//                                 <button onClick={() => deleteFaq(faq._id)} className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-300 transition-opacity"><FaTrash /></button>
//                             </div>
//                             <p className="text-slate-400 text-sm">{faq.answer}</p>
//                         </div>
//                     ))}
//                     {faqs.length === 0 && <p className="text-slate-500">No FAQs added yet.</p>}
//                 </div>

//                 {/* Add Form */}
//                 <div className="lg:w-1/3 bg-slate-800 p-6 rounded-2xl border border-slate-700 h-fit sticky top-0">
//                     <h3 className="text-lg font-bold text-white mb-4">Add New FAQ</h3>
//                     <input 
//                         className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white mb-3 focus:border-cyan-500 outline-none"
//                         placeholder="Question?"
//                         value={newQuestion}
//                         onChange={e => setNewQuestion(e.target.value)}
//                     />
//                     <textarea 
//                         className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white mb-4 focus:border-cyan-500 outline-none h-32 resize-none"
//                         placeholder="Detailed Answer..."
//                         value={newAnswer}
//                         onChange={e => setNewAnswer(e.target.value)}
//                     ></textarea>
//                     <button onClick={addFaq} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2">
//                         <FaPlus /> Add to Home Page
//                     </button>
//                 </div>
//             </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default AdminHomeContent;















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { 
//   FaBullhorn, FaStar, FaQuestionCircle, FaSave, FaTrash, 
//   FaPlus, FaToggleOn, FaToggleOff, FaUserShield, FaUser 
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const AdminHomeContent = () => {
//   const [activeTab, setActiveTab] = useState("marquee");
//   const [marqueeText, setMarqueeText] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [faqs, setFaqs] = useState([]);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [newAnswer, setNewAnswer] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/api/homepage/public`);
//       setMarqueeText(data.marquee || "");
//       setFaqs(data.faqs || []);
      
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const reviewData = await axios.get(`${BASE_URL}/api/support/admin/feedback?type=Review`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       setReviews(reviewData.data); 
//     } catch (error) {
//       console.error("Error loading data");
//     }
//   };

//   const saveMarquee = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.put(`${BASE_URL}/api/homepage/marquee`, { text: marqueeText }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       toast.success("Marquee Updated Successfully!");
//     } catch (error) { toast.error("Failed to update"); }
//   };

//   const toggleReviewFeature = async (reviewId) => {
//     try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         await axios.put(`${BASE_URL}/api/homepage/reviews/${reviewId}/toggle`, {}, {
//             headers: { Authorization: `Bearer ${userInfo.token}` }
//         });
//         toast.success("Visibility Toggled!");
//         fetchData(); 
//     } catch (error) { toast.error("Update failed"); }
//   };

//   const addFaq = async () => {
//     if(!newQuestion || !newAnswer) return toast.error("Fill all fields");
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.post(`${BASE_URL}/api/homepage/faq`, { question: newQuestion, answer: newAnswer }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       toast.success("FAQ Added!");
//       setNewQuestion(""); setNewAnswer("");
//       fetchData();
//     } catch (error) { toast.error("Failed to add FAQ"); }
//   };

//   const deleteFaq = async (id) => {
//     if(!window.confirm("Delete this FAQ?")) return;
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.delete(`${BASE_URL}/api/homepage/faq/${id}`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       toast.success("FAQ Deleted");
//       fetchData();
//     } catch (error) { toast.error("Delete failed"); }
//   };

//   return (
//     <div className="h-full flex flex-col font-sans">
//       {/* --- TABS --- */}
//       <div className="flex gap-3 mb-6 border-b border-slate-700 pb-3 overflow-x-auto">
//         {[
//             { id: "marquee", label: "Announcement Bar", icon: <FaBullhorn /> },
//             { id: "reviews", label: "Featured Reviews", icon: <FaStar /> },
//             { id: "faq", label: "Manage FAQs", icon: <FaQuestionCircle /> },
//         ].map(tab => (
//             <button 
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
//                     activeTab === tab.id 
//                     ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' 
//                     : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
//                 }`}
//             >
//                 {tab.icon} {tab.label}
//             </button>
//         ))}
//       </div>

//       <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        
//         {/* ======================= MARQUEE TAB ======================= */}
//         {activeTab === "marquee" && (
//             <div className="max-w-3xl mx-auto">
//                 <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg relative overflow-hidden">
//                     {/* Background decoration */}
//                     <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

//                     <div className="flex items-center gap-3 mb-5">
//                         <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-lg">
//                             <FaBullhorn />
//                         </div>
//                         <div>
//                             <h3 className="text-lg font-bold text-white">Live Notification Bar</h3>
//                             <p className="text-slate-400 text-xs">This text scrolls across the top of the Home Page.</p>
//                         </div>
//                     </div>

//                     <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Announcement Content</label>
//                     <textarea 
//                         value={marqueeText} 
//                         onChange={(e) => setMarqueeText(e.target.value)} 
//                         className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 outline-none h-24 mb-4 resize-none font-mono shadow-inner transition-all"
//                         placeholder="e.g., Welcome to CrimeTrack. Emergency Dial 112."
//                     ></textarea>

//                     <div className="flex justify-end">
//                         <button 
//                             onClick={saveMarquee} 
//                             className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-5 py-2.5 rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95"
//                         >
//                             <FaSave /> Publish Notification
//                         </button>
//                     </div>
//                 </div>

//                 {/* Live Preview Strip */}
//                 <div className="mt-6 opacity-80">
//                     <p className="text-slate-500 text-[10px] uppercase font-bold mb-2 text-center">Home Page Preview</p>
//                     <div className="bg-slate-950 border-y border-slate-700 py-2 overflow-hidden whitespace-nowrap text-slate-300 font-mono text-xs relative">
//                         <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
//                         <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
//                         <div className="animate-marquee inline-block px-4">
//                             {marqueeText || "No text set..."}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )}

//         {/* ======================= REVIEWS TAB ======================= */}
//         {activeTab === "reviews" && (
//             <div>
//                 <div className="flex justify-between items-center mb-5">
//                     <h3 className="text-lg font-bold text-white">Select Featured Reviews</h3>
//                     <span className="text-slate-400 text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
//                         Active: <span className="text-cyan-400 font-bold">{reviews.filter(r => r.isFeatured).length}</span>
//                     </span>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {reviews.map(r => {
//                         const isPolice = r.user?.role !== 'citizen';
                        
//                         return (
//                             <div 
//                                 key={r._id} 
//                                 className={`
//                                     relative p-4 rounded-xl border transition-all duration-300 group
//                                     ${r.isFeatured 
//                                         ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500 shadow-md shadow-cyan-900/10' 
//                                         : 'bg-slate-900 border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600'
//                                     }
//                                 `}
//                             >
//                                 {/* Header: Avatar + Info */}
//                                 <div className="flex items-start gap-3 mb-3">
//                                     <div className={`
//                                         w-10 h-10 rounded-full p-0.5 shrink-0 overflow-hidden border 
//                                         ${isPolice ? 'border-yellow-500' : 'border-cyan-500'}
//                                     `}>
//                                         <img 
//                                             src={r.user?.idPhoto || "https://placehold.co/100"} 
//                                             className="w-full h-full rounded-full object-cover" 
//                                             alt="User" 
//                                         />
//                                     </div>
                                    
//                                     <div className="min-w-0 flex-1">
//                                         <h4 className="font-bold text-white text-sm truncate">
//                                             {r.user?.firstName} {r.user?.lastName}
//                                         </h4>
                                        
//                                         {/* ✅ ROLE & DESIGNATION BADGE */}
//                                         <div className="flex items-center gap-1.5 mt-0.5">
//                                             {isPolice ? (
//                                                 <span className="flex items-center gap-1 text-[9px] uppercase font-bold bg-yellow-900/30 text-yellow-400 px-1.5 py-0.5 rounded border border-yellow-600/30">
//                                                     <FaUserShield className="text-[10px]" /> {r.user?.designation || "Officer"}
//                                                 </span>
//                                             ) : (
//                                                 <span className="flex items-center gap-1 text-[9px] uppercase font-bold bg-cyan-900/30 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-600/30">
//                                                     <FaUser className="text-[10px]" /> Citizen
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </div>

//                                     {/* Toggle Button */}
//                                     <button 
//                                         onClick={() => toggleReviewFeature(r._id)} 
//                                         className={`text-2xl transition-transform active:scale-90 ${r.isFeatured ? 'text-green-400 drop-shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
//                                         title={r.isFeatured ? "Remove from Home" : "Add to Home"}
//                                     >
//                                         {r.isFeatured ? <FaToggleOn /> : <FaToggleOff />}
//                                     </button>
//                                 </div>

//                                 {/* Rating */}
//                                 <div className="flex text-yellow-400 text-[10px] mb-2 bg-black/20 w-fit px-2 py-0.5 rounded">
//                                     {[...Array(r.rating || 0)].map((_, i) => <FaStar key={i} />)}
//                                 </div>

//                                 {/* Comment */}
//                                 <div className="bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/50">
//                                     <p className="text-slate-300 text-xs italic line-clamp-2 leading-relaxed">
//                                         "{r.comment}"
//                                     </p>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         )}

//         {/* ======================= FAQ TAB ======================= */}
//         {activeTab === "faq" && (
//             <div className="flex flex-col lg:flex-row gap-6">
//                 {/* List */}
//                 <div className="flex-1 space-y-3">
//                     {faqs.map((faq, idx) => (
//                         <div key={faq._id || idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors group">
//                             <div className="flex justify-between items-start">
//                                 <h4 className="font-bold text-white text-sm md:text-base mb-1.5 flex gap-2">
//                                     <span className="text-cyan-500">Q.</span> {faq.question}
//                                 </h4>
//                                 <button 
//                                     onClick={() => deleteFaq(faq._id)} 
//                                     className="text-slate-600 hover:text-red-400 transition-colors p-1"
//                                     title="Delete FAQ"
//                                 >
//                                     <FaTrash size={14} />
//                                 </button>
//                             </div>
//                             <div className="pl-6 border-l-2 border-slate-700 ml-0.5">
//                                 <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{faq.answer}</p>
//                             </div>
//                         </div>
//                     ))}
//                     {faqs.length === 0 && <div className="text-center py-10 text-slate-500 text-sm">No FAQs added yet. Use the form to add one.</div>}
//                 </div>

//                 {/* Add Form */}
//                 <div className="lg:w-1/3">
//                     <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 sticky top-4 shadow-lg">
//                         <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
//                             <FaPlus className="text-cyan-400" size={14} /> Add New FAQ
//                         </h3>
                        
//                         <div className="space-y-3">
//                             <div>
//                                 <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Question</label>
//                                 <input 
//                                     className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-white focus:border-cyan-500 outline-none mt-1"
//                                     placeholder="e.g., Is my identity safe?"
//                                     value={newQuestion}
//                                     onChange={e => setNewQuestion(e.target.value)}
//                                 />
//                             </div>
                            
//                             <div>
//                                 <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Answer</label>
//                                 <textarea 
//                                     className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-white focus:border-cyan-500 outline-none h-24 resize-none mt-1"
//                                     placeholder="Type the answer here..."
//                                     value={newAnswer}
//                                     onChange={e => setNewAnswer(e.target.value)}
//                                 ></textarea>
//                             </div>

//                             <button 
//                                 onClick={addFaq} 
//                                 className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 rounded-lg font-bold text-sm flex justify-center items-center gap-2 shadow-md transition-transform active:scale-95"
//                             >
//                                 Publish FAQ
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default AdminHomeContent;
















import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { 
  FaBullhorn, FaStar, FaQuestionCircle, FaSave, FaTrash, 
  FaPlus, FaToggleOn, FaToggleOff, FaUserShield, FaUser, 
  FaTicketAlt, FaArrowLeft, FaMagic 
} from "react-icons/fa";
import { BASE_URL } from "../../config";

const AdminHomeContent = () => {
  const [activeTab, setActiveTab] = useState("marquee");
  
  // Data States
  const [marqueeText, setMarqueeText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [resolvedTickets, setResolvedTickets] = useState([]); // ✅ To store tickets for import

  // Form States
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      // 1. Fetch Public Home Content
      const { data } = await axios.get(`${BASE_URL}/api/homepage/public`);
      setMarqueeText(data.marquee || "");
      setFaqs(data.faqs || []);
      
      // 2. Fetch Reviews
      const reviewData = await axios.get(`${BASE_URL}/api/support/admin/feedback?type=Review`, config);
      setReviews(reviewData.data); 

      // 3. ✅ Fetch Tickets (For FAQ Import)
      const ticketData = await axios.get(`${BASE_URL}/api/support/admin/help`, config);
      // Filter only Resolved tickets that have an Admin Reply
      const candidates = ticketData.data.filter(t => t.status === 'Resolved' && t.adminReply);
      setResolvedTickets(candidates);

    } catch (error) {
      console.error("Error loading data");
    }
  };

  // --- ACTIONS ---

  const saveMarquee = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.put(`${BASE_URL}/api/homepage/marquee`, { text: marqueeText }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      toast.success("Marquee Updated Successfully!");
    } catch (error) { toast.error("Failed to update"); }
  };

  const toggleReviewFeature = async (reviewId) => {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        await axios.put(`${BASE_URL}/api/homepage/reviews/${reviewId}/toggle`, {}, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        toast.success("Visibility Toggled!");
        fetchData(); 
    } catch (error) { toast.error("Update failed"); }
  };

  const addFaq = async () => {
    if(!newQuestion || !newAnswer) return toast.error("Fill all fields");
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.post(`${BASE_URL}/api/homepage/faq`, { question: newQuestion, answer: newAnswer }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      toast.success("FAQ Published!");
      setNewQuestion(""); setNewAnswer("");
      fetchData();
    } catch (error) { toast.error("Failed to add FAQ"); }
  };

  const deleteFaq = async (id) => {
    if(!window.confirm("Delete this FAQ?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(`${BASE_URL}/api/homepage/faq/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      toast.success("FAQ Deleted");
      fetchData();
    } catch (error) { toast.error("Delete failed"); }
  };

  // ✅ Auto-fill form from Ticket
  const importTicketToFaq = (ticket) => {
      setNewQuestion(ticket.message); // User's Issue -> Question
      setNewAnswer(ticket.adminReply); // Admin's Reply -> Answer
      toast("Drafted! Edit if needed, then click Publish.", { icon: "✏️" });
  };

  return (
    <div className="h-full flex flex-col font-sans text-slate-200">
      
      {/* --- TABS --- */}
      <div className="flex gap-3 mb-6 border-b border-slate-700 pb-3 overflow-x-auto">
        {[
            { id: "marquee", label: "Announcement Bar", icon: <FaBullhorn /> },
            { id: "reviews", label: "Featured Reviews", icon: <FaStar /> },
            { id: "faq", label: "Manage FAQs", icon: <FaQuestionCircle /> },
        ].map(tab => (
            <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
            >
                {tab.icon} {tab.label}
            </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        
        {/* ======================= MARQUEE TAB ======================= */}
        {activeTab === "marquee" && (
            <div className="max-w-3xl mx-auto">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-lg">
                            <FaBullhorn />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Live Notification Bar</h3>
                            <p className="text-slate-400 text-xs">This text scrolls across the top of the Home Page.</p>
                        </div>
                    </div>

                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Announcement Content</label>
                    <textarea 
                        value={marqueeText} 
                        onChange={(e) => setMarqueeText(e.target.value)} 
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 outline-none h-24 mb-4 resize-none font-mono shadow-inner transition-all"
                        placeholder="e.g., Welcome to CrimeTrack. Emergency Dial 112."
                    ></textarea>

                    <div className="flex justify-end">
                        <button 
                            onClick={saveMarquee} 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-5 py-2.5 rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95"
                        >
                            <FaSave /> Publish Notification
                        </button>
                    </div>
                </div>

                <div className="mt-6 opacity-80">
                    <p className="text-slate-500 text-[10px] uppercase font-bold mb-2 text-center">Home Page Preview</p>
                    <div className="bg-slate-950 border-y border-slate-700 py-2 overflow-hidden whitespace-nowrap text-slate-300 font-mono text-xs relative">
                        <div className="animate-marquee inline-block px-4">
                            {marqueeText || "No text set..."}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* ======================= REVIEWS TAB ======================= */}
        {activeTab === "reviews" && (
            <div>
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold text-white">Select Featured Reviews</h3>
                    <span className="text-slate-400 text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                        Active: <span className="text-cyan-400 font-bold">{reviews.filter(r => r.isFeatured).length}</span>
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews.map(r => {
                        const isPolice = r.user?.role !== 'citizen';
                        return (
                            <div 
                                key={r._id} 
                                className={`
                                    relative p-4 rounded-xl border transition-all duration-300 group
                                    ${r.isFeatured 
                                        ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500 shadow-md shadow-cyan-900/10' 
                                        : 'bg-slate-900 border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600'
                                    }
                                `}
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className={`
                                        w-10 h-10 rounded-full p-0.5 shrink-0 overflow-hidden border 
                                        ${isPolice ? 'border-yellow-500' : 'border-cyan-500'}
                                    `}>
                                        <img src={r.user?.idPhoto || "https://placehold.co/100"} className="w-full h-full rounded-full object-cover" alt="User" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-bold text-white text-sm truncate">{r.user?.firstName} {r.user?.lastName}</h4>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            {isPolice ? (
                                                <span className="flex items-center gap-1 text-[9px] uppercase font-bold bg-yellow-900/30 text-yellow-400 px-1.5 py-0.5 rounded border border-yellow-600/30"><FaUserShield className="text-[10px]" /> {r.user?.designation || "Officer"}</span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-[9px] uppercase font-bold bg-cyan-900/30 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-600/30"><FaUser className="text-[10px]" /> Citizen</span>
                                            )}
                                        </div>
                                    </div>
                                    <button onClick={() => toggleReviewFeature(r._id)} className={`text-2xl transition-transform active:scale-90 ${r.isFeatured ? 'text-green-400 drop-shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}>
                                        {r.isFeatured ? <FaToggleOn /> : <FaToggleOff />}
                                    </button>
                                </div>
                                <div className="bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/50">
                                    <p className="text-slate-300 text-xs italic line-clamp-2">"{r.comment}"</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {/* ======================= FAQ TAB (UPDATED) ======================= */}
        {activeTab === "faq" && (
            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)]">
                
                {/* --- LEFT: Create / Manage FAQs --- */}
                <div className="lg:w-1/2 flex flex-col gap-4 overflow-hidden">
                    {/* Form */}
                    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-lg shrink-0">
                        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                            <FaPlus className="text-cyan-400" size={14} /> Add / Edit FAQ
                        </h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Question (Issue)</label>
                                <input 
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-white focus:border-cyan-500 outline-none mt-1"
                                    placeholder="Paste question or type here..."
                                    value={newQuestion}
                                    onChange={e => setNewQuestion(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Answer (Explanation)</label>
                                <textarea 
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-white focus:border-cyan-500 outline-none h-24 resize-none mt-1 custom-scrollbar"
                                    placeholder="Type answer or select a ticket..."
                                    value={newAnswer}
                                    onChange={e => setNewAnswer(e.target.value)}
                                ></textarea>
                            </div>
                            <button onClick={addFaq} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 rounded-lg font-bold text-sm flex justify-center items-center gap-2 shadow-md transition-transform active:scale-95">
                                Publish FAQ
                            </button>
                        </div>
                    </div>

                    {/* Existing List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-900/50 rounded-2xl border border-slate-800 p-3">
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 sticky top-0 bg-slate-900/95 py-2 z-10 backdrop-blur">Live FAQs ({faqs.length})</h4>
                        <div className="space-y-3">
                            {faqs.map((faq, idx) => (
                                <div key={faq._id || idx} className="bg-slate-800 p-3 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors group relative">
                                    <h4 className="font-bold text-white text-xs md:text-sm pr-6 mb-1">{faq.question}</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{faq.answer}</p>
                                    <button onClick={() => deleteFaq(faq._id)} className="absolute top-2 right-2 text-slate-600 hover:text-red-400 transition-colors p-1" title="Delete">
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            ))}
                            {faqs.length === 0 && <p className="text-center text-slate-600 text-xs mt-10">No FAQs published.</p>}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: Import from Tickets --- */}
                <div className="lg:w-1/2 flex flex-col bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden h-full">
                    <div className="p-4 bg-slate-800 border-b border-slate-700">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <FaTicketAlt className="text-purple-400" /> Import from Resolved Tickets
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-1">Select a resolved ticket to auto-fill the FAQ form.</p>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                        {resolvedTickets.length === 0 ? (
                            <div className="text-center py-20 text-slate-500">
                                <FaTicketAlt className="text-3xl mx-auto mb-2 opacity-30" />
                                <p className="text-xs">No resolved tickets with replies found.</p>
                            </div>
                        ) : (
                            resolvedTickets.map(ticket => (
                                <div key={ticket._id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl hover:border-purple-500/50 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded uppercase font-bold">Resolved</span>
                                        <button 
                                            onClick={() => importTicketToFaq(ticket)}
                                            className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-md flex items-center gap-1 shadow-md transition-transform active:scale-95"
                                        >
                                            <FaMagic size={10} /> Use This
                                        </button>
                                    </div>
                                    
                                    <div className="mb-2">
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">User Question</p>
                                        <p className="text-slate-200 text-xs font-medium line-clamp-2">"{ticket.message}"</p>
                                    </div>
                                    
                                    <div className="pl-2 border-l-2 border-purple-500/30">
                                        <p className="text-[10px] text-purple-400 font-bold uppercase">Admin Reply</p>
                                        <p className="text-slate-400 text-xs line-clamp-3 italic">"{ticket.adminReply}"</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        )}

      </div>
    </div>
  );
};

export default AdminHomeContent;