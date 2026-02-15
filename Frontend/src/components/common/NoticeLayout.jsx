// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";
// import { 
//   FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
//   FaTimes, FaUserCheck, FaCheckDouble, FaUserShield, FaUser
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // --- IMAGE LOADER HELPER ---
// const getBase64ImageFromURL = (url) => {
//     return new Promise((resolve) => {
//         const img = new Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = () => resolve(null);
//         img.src = url;
//     });
// };

// // --- 📄 ADVANCED PDF GENERATOR ---
// const generatePDF = async (notice) => {
//     const doc = new jsPDF();
//     const type = notice.docType; // Notice, Application, Circular
//     const sender = notice.sender;
//     const receiver = notice.receiver;
//     const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

//     // --- 1. HEADER (Government Style) ---
//     // Grey Header Box
//     doc.setFillColor(245, 245, 245);
//     doc.rect(5, 5, 200, 35, 'F');
//     doc.setDrawColor(0);
//     doc.rect(5, 5, 200, 35); // Border

//     // Load Logos
//     const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
//     const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");

//     if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 10, 8, 28, 28);
//     if (policeLogo) doc.addImage(policeLogo, "PNG", 170, 8, 28, 28);

//     // Title Centered
//     doc.setFont("times", "bold");
//     doc.setFontSize(20);
//     doc.setTextColor(0);
//     doc.text("MAHARASHTRA STATE POLICE", 105, 18, null, null, "center");

//     doc.setFontSize(10);
//     doc.setFont("times", "normal");
//     doc.text("Official Digital Communication | CrimeTrack System", 105, 26, null, null, "center");
//     doc.setFont("times", "bold");
//     doc.text("GOVERNMENT OF MAHARASHTRA", 105, 32, null, null, "center");

//     // --- 2. DOCUMENT TITLE & DATE ---
//     doc.setFontSize(16);
//     doc.setFont("times", "bold");
//     doc.text(type.toUpperCase(), 105, 55, null, null, "center");
//     doc.setLineWidth(0.5);
//     doc.line(80, 57, 130, 57); // Underline

//     // Date (Top Right)
//     doc.setFontSize(11);
//     doc.text(`Date: ${date}`, 190, 65, { align: "right" });
//     doc.text(`Ref No: CT/${notice._id.slice(-6).toUpperCase()}/${new Date().getFullYear()}`, 20, 65);

//     // --- 3. TO SECTION (Dynamic) ---
//     doc.setFont("times", "bold");
//     doc.text("To,", 20, 80);
//     doc.setFont("times", "normal");

//     let receiverY = 86;
//     if (receiver.type === 'citizen') {
//         // Citizen Format
//         doc.text(`${receiver.targetName}`, 20, receiverY);
//         // Assuming targetId is MongoID, ideally backend should populate 'aadhaar' if needed
//         // For now, we show generic placeholder if not available
//         doc.text(`Citizen of India`, 20, receiverY + 5); 
//     } else if (receiver.type === 'officer') {
//         // Police Officer Format
//         // Extract Designation from Name string if stored like "Inspector John" or separate field
//         doc.text(`${receiver.targetName}`, 20, receiverY);
//         doc.text("Police Department", 20, receiverY + 5);
//         doc.text("Chandrapur District", 20, receiverY + 10);
//     } else {
//         // Police Station Format
//         doc.text("The Station House Officer,", 20, receiverY);
//         doc.text(`${receiver.targetName}`, 20, receiverY + 5); // Police Station Name
//         doc.text("Chandrapur District", 20, receiverY + 10);
//     }

//     // --- 4. SUBJECT ---
//     const startY = 110;
//     doc.setFont("times", "bold");
//     doc.text("Subject:", 20, startY);
//     doc.setFont("times", "normal");
//     doc.text(notice.subject, 40, startY);

//     // --- 5. BODY (With Standard Paragraphs) ---
//     let bodyText = "";
    
//     // Predefined Paragraphs
//     if (type === 'Application') {
//         bodyText = `Respected Sir/Madam,\n\nI am writing to formally submit this application regarding the subject mentioned above. This correspondence is generated via the official CrimeTrack portal for your perusal and necessary action.\n\n${notice.body}\n\nWe request your cooperation and a timely response on this matter.`;
//     } else if (type === 'Notice') {
//         bodyText = `WARNING / OFFICIAL NOTICE:\n\nThis is to officially inform you regarding the subject cited above. You are hereby directed to take note of the following details and act accordingly.\n\n${notice.body}\n\nFailure to comply with this notice may result in further legal steps as per procedure. Treat this as urgent.`;
//     } else if (type === 'Circular') {
//         bodyText = `DEPARTMENT CIRCULAR\n\nTo all concerned personnel,\n\nPlease find the details of the new circular issued by the department below:\n\n${notice.body}\n\nAll officers are instructed to implement these directives with immediate effect.`;
//     } else {
//         bodyText = notice.body;
//     }

//     doc.setFont("times", "normal");
//     doc.setFontSize(12);
//     const splitBody = doc.splitTextToSize(bodyText, 170);
//     doc.text(splitBody, 20, startY + 15);

//     // --- 6. FOOTER & SIGNATURE ---
//     const finalY = startY + 25 + (splitBody.length * 6);
    
//     // Closing
//     doc.setFont("times", "bold");
//     if (type === 'Application') doc.text("Yours Faithfully,", 150, finalY);
//     else if (type === 'Notice') doc.text("Issued By,", 150, finalY);
//     else doc.text("Regards,", 150, finalY);

//     // Signature Image
//     if (notice.signatureUrl) {
//         try {
//             const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
//             if (sigImg) {
//                 doc.addImage(sigImg, "PNG", 150, finalY + 5, 30, 15);
//             } else {
//                 doc.setFontSize(9);
//                 doc.text("[Signed Digitally]", 165, finalY + 15, { align: "center" });
//             }
//         } catch (e) {
//             doc.text("[Signed]", 165, finalY + 15, { align: "center" });
//         }
//     } else {
//         doc.rect(150, finalY + 5, 30, 15); // Empty Box
//         doc.setFontSize(8);
//         doc.text("Sign Here", 165, finalY + 14, { align: "center" });
//     }

//     // Sender Info
//     const infoY = finalY + 25;
//     doc.setFontSize(11);
//     doc.setFont("times", "bold");
//     doc.text(sender.name, 165, infoY, { align: "center" });
    
//     doc.setFont("times", "normal");
//     doc.setFontSize(10);
//     doc.text(sender.designation || "Officer", 165, infoY + 5, { align: "center" });
    
//     // Station Logic
//     if (sender.station) {
//         doc.text(`${sender.station}, Chandrapur`, 165, infoY + 10, { align: "center" });
//     } else {
//         doc.text("Chandrapur Police", 165, infoY + 10, { align: "center" });
//     }

//     // --- 7. BOTTOM LINE ---
//     const pageHeight = doc.internal.pageSize.height;
//     doc.setDrawColor(150);
//     doc.line(10, pageHeight - 15, 200, pageHeight - 15);
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("This document is electronically generated by CrimeTrack. Valid without physical stamp.", 105, pageHeight - 10, null, null, "center");

//     doc.save(`${type}_${notice._id}.pdf`);
// };

// const NoticeLayout = ({ userRole }) => {
//   const [view, setView] = useState("inbox");
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Compose State
//   const [formData, setFormData] = useState({
//       docType: "Notice",
//       receiverType: "citizen",
//       subject: "",
//       body: ""
//   });
  
//   const [selectedReceivers, setSelectedReceivers] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [signature, setSignature] = useState(null);

//   // --- FETCH NOTICES ---
//   const fetchNotices = async (type) => {
//       setLoading(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const endpoint = type === 'sent' ? 'sent' : 'inbox';
//           const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setNotices(data);
//       } catch (error) { toast.error("Failed to load notices"); }
//       finally { setLoading(false); }
//   };

//   useEffect(() => {
//       if(view === 'inbox' || view === 'sent') fetchNotices(view);
//   }, [view]);

//   // --- SEARCH LOGIC ---
//   const handleSearch = async (overrideQuery = null) => {
//       const query = overrideQuery !== null ? overrideQuery : searchQuery;
//       setIsSearching(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const role = formData.receiverType === 'citizen' ? 'citizen' : 'police';
          
//           if(formData.receiverType === 'station') {
//              setIsSearching(false);
//              return;
//           }

//           const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${role}&query=${query}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setSearchResults(data);
//       } catch (error) { toast.error("Search failed"); }
//       finally { setIsSearching(false); }
//   };

//   // --- SELECTION HELPERS ---
//   const isSelected = (id) => selectedReceivers.some(r => r.id === id);

//   const toggleReceiver = (user) => {
//       if (isSelected(user._id)) {
//           setSelectedReceivers(selectedReceivers.filter(r => r.id !== user._id));
//       } else {
//           // Store Full Details for PDF
//           const fullName = `${user.title || ''} ${user.firstName} ${user.lastName}`.trim();
//           setSelectedReceivers([...selectedReceivers, { 
//               id: user._id, 
//               name: fullName, 
//               email: user.email,
//               designation: user.designation,
//               station: user.station,
//               role: user.role
//           }]);
//       }
//   };

//   const handleSelectAll = () => {
//       if (selectedReceivers.length === searchResults.length) {
//           setSelectedReceivers([]); 
//       } else {
//           const all = searchResults.map(user => ({
//               id: user._id,
//               name: `${user.title || ''} ${user.firstName} ${user.lastName}`.trim(),
//               email: user.email,
//               designation: user.designation,
//               station: user.station,
//               role: user.role
//           }));
//           setSelectedReceivers(all);
//       }
//   };

//   // --- SEND NOTICE ---
//   const handleSend = async (e) => {
//       e.preventDefault();
      
//       if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select at least one receiver");
//       if(formData.receiverType === 'station' && !searchQuery) return toast.error("Enter Station Name");

//       const loadToast = toast.loading("Generating Official Document...");
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          
//           const targets = formData.receiverType === 'station' 
//               ? [{ id: searchQuery, name: searchQuery }] 
//               : selectedReceivers;

//           for (const target of targets) {
//               const payload = new FormData();
//               payload.append("docType", formData.docType);
//               payload.append("receiverType", formData.receiverType);
//               payload.append("targetId", formData.receiverType === 'station' ? target.name : target.id);
//               payload.append("subject", formData.subject);
//               payload.append("body", formData.body);
//               if(signature) payload.append("signature", signature);

//               await axios.post(`${BASE_URL}/api/notices/send`, payload, {
//                   headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
//               });
//           }
          
//           toast.success(`Sent to ${targets.length} recipients!`, { id: loadToast });
//           setView("sent");
//           setSelectedReceivers([]);
//           setSearchQuery("");
//           setSearchResults([]);
//       } catch (error) { toast.error("Failed to send", { id: loadToast }); }
//   };

//   return (
//     <div className="h-full flex flex-col font-sans">
        
//         {/* --- HEADER TABS --- */}
//         <div className="flex gap-4 mb-6 border-b border-slate-700 pb-3 overflow-x-auto">
//             <button onClick={() => setView("inbox")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'inbox' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                 <FaInbox /> Inbox
//             </button>
//             {userRole !== 'citizen' && (
//                 <>
//                     <button onClick={() => setView("compose")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'compose' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                         <FaFeatherAlt /> Compose
//                     </button>
//                     <button onClick={() => setView("sent")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'sent' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                         <FaPaperPlane /> Sent
//                     </button>
//                 </>
//             )}
//         </div>

//         {/* --- VIEW: INBOX / SENT --- */}
//         {(view === 'inbox' || view === 'sent') && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
//                 {loading ? <div className="text-center text-slate-500 py-10"><FaSpinner className="animate-spin text-2xl mx-auto"/> Loading...</div> : 
//                  notices.length === 0 ? <div className="text-center text-slate-500 py-10">No documents found.</div> :
//                  notices.map(notice => (
//                     <div key={notice._id} className="bg-slate-800 border border-slate-700 p-5 rounded-xl hover:border-blue-500/50 transition-all shadow-md group">
//                         <div className="flex justify-between items-start mb-2">
//                             <div>
//                                 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${notice.docType === 'Notice' ? 'bg-red-900/20 text-red-400 border-red-500/30' : 'bg-blue-900/20 text-blue-400 border-blue-500/30'}`}>
//                                     {notice.docType}
//                                 </span>
//                                 <h3 className="text-lg font-bold text-white mt-1">{notice.subject}</h3>
//                             </div>
//                             <button onClick={() => generatePDF(notice)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition-colors">
//                                 <FaFilePdf className="text-red-400" /> Download PDF
//                             </button>
//                         </div>
//                         <div className="text-xs text-slate-400 mb-3 flex gap-4">
//                             <span>From: <b className="text-slate-300">{notice.sender.name}</b> ({notice.sender.designation})</span>
//                             <span>To: <b className="text-slate-300">{notice.receiver.targetName}</b></span>
//                             <span>Date: {new Date(notice.createdAt).toLocaleDateString()}</span>
//                         </div>
//                         <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg line-clamp-2">{notice.body}</p>
//                     </div>
//                  ))
//                 }
//             </div>
//         )}

//         {/* --- VIEW: COMPOSE --- */}
//         {view === 'compose' && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
//                 <form onSubmit={handleSend} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl max-w-4xl mx-auto">
//                     <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
//                         <FaFeatherAlt className="text-green-400"/> New Official Document
//                     </h3>
                    
//                     {/* Document & Receiver Type */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Document Type</label>
//                             <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none" value={formData.docType} onChange={e=>setFormData({...formData, docType: e.target.value})}>
//                                 <option>Notice</option>
//                                 <option>Application</option>
//                                 <option>Circular</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Recipient Group</label>
//                             <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none" value={formData.receiverType} onChange={e=>{setFormData({...formData, receiverType: e.target.value}); setSelectedReceivers([]); setSearchQuery(""); setSearchResults([]);}}>
//                                 <option value="citizen">Citizens</option>
//                                 <option value="officer">Police Officers</option>
//                                 <option value="station">Police Station</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* SELECTED RECEIVERS */}
//                     {selectedReceivers.length > 0 && (
//                         <div className="mb-4">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">To ({selectedReceivers.length}):</label>
//                             <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto custom-scrollbar p-2 bg-slate-900/50 rounded-lg border border-slate-700">
//                                 {selectedReceivers.map(r => (
//                                     <div key={r.id} className="flex items-center gap-2 bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs px-3 py-1 rounded-full">
//                                         <FaUserCheck className="text-blue-400"/>
//                                         <span className="font-bold">{r.name}</span>
//                                         <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="hover:text-red-400 ml-1"><FaTimes /></button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* SEARCH BAR */}
//                     {formData.receiverType !== 'station' && (
//                         <div className="mb-6 bg-slate-700/30 p-4 rounded-xl border border-slate-600">
//                             <div className="flex gap-2">
//                                 <input 
//                                     type="text" 
//                                     className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none" 
//                                     placeholder="Search by name, ID or leave empty to see all..." 
//                                     value={searchQuery} 
//                                     onChange={e=>setSearchQuery(e.target.value)} 
//                                 />
//                                 <button type="button" onClick={() => handleSearch()} className="bg-blue-600 hover:bg-blue-500 px-6 rounded-lg text-white font-bold flex items-center gap-2 transition-all">
//                                     {isSearching ? <FaSpinner className="animate-spin"/> : <FaSearch />} Search
//                                 </button>
//                             </div>

//                             {/* RESULTS GRID */}
//                             {searchResults.length > 0 && (
//                                 <div className="mt-4">
//                                     <div className="flex justify-between items-center mb-2">
//                                         <span className="text-xs text-slate-400 font-bold uppercase">{searchResults.length} Results Found</span>
//                                         <button type="button" onClick={handleSelectAll} className="text-xs text-green-400 hover:text-green-300 font-bold flex items-center gap-1">
//                                             <FaCheckDouble /> {selectedReceivers.length === searchResults.length ? "Deselect All" : "Select All"}
//                                         </button>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar">
//                                         {searchResults.map(u => {
//                                             const active = isSelected(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleReceiver(u)} 
//                                                     className={`
//                                                         flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
//                                                         ${active ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
//                                                     `}
//                                                 >
//                                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
//                                                         {active ? <FaUserCheck /> : (u.role === 'police' ? <FaUserShield /> : <FaUser />)}
//                                                     </div>
//                                                     <div className="min-w-0">
//                                                         <h4 className={`text-sm font-bold truncate ${active ? 'text-blue-300' : 'text-white'}`}>
//                                                             {u.title || ''} {u.firstName} {u.lastName}
//                                                         </h4>
//                                                         <p className="text-[10px] text-slate-400 truncate">
//                                                             {u.role === 'police' ? `${u.designation} | ${u.station}` : u.email}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {formData.receiverType === 'station' && (
//                         <div className="mb-6">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Station Name</label>
//                             <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white" placeholder="Enter Police Station Name" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
//                         </div>
//                     )}

//                     {/* Content */}
//                     <div className="space-y-4 mb-6">
//                         <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white font-bold" placeholder="Subject" required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
//                         <textarea className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white h-40 resize-none" placeholder="Type the main content (reason) here. Standard formatting will be auto-applied." required value={formData.body} onChange={e=>setFormData({...formData, body: e.target.value})}></textarea>
//                     </div>

//                     {/* Signature */}
//                     <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700 border-dashed">
//                         <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Upload Digital Signature (Required)</label>
//                         <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer"/>
//                     </div>

//                     <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 transform active:scale-95">
//                         <FaPaperPlane /> Send Official Document ({selectedReceivers.length > 0 ? selectedReceivers.length : 1})
//                     </button>
//                 </form>
//             </div>
//         )}
//     </div>
//   );
// };

// export default NoticeLayout;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";
// import { 
//   FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
//   FaTimes, FaUserCheck, FaCheckDouble, FaUserShield, FaUser
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // --- 🖼️ IMAGE LOADER HELPER ---
// const getBase64ImageFromURL = (url) => {
//     return new Promise((resolve) => {
//         const img = new Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = () => resolve(null);
//         img.src = url;
//     });
// };

// // --- 📄 OFFICIAL PDF GENERATOR ---
// const generatePDF = async (notice, userInfoToken) => {
//     const doc = new jsPDF();
//     const type = notice.docType; 
//     const sender = notice.sender;
//     const receiver = notice.receiver;
//     const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

//     // 🕵️ FETCH FULL RECEIVER DETAILS (If User)
//     let fullReceiver = {};
//     if (receiver.type !== 'station') {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${receiver.type}&query=${receiver.targetId}`, {
//                 headers: { Authorization: `Bearer ${userInfoToken}` }
//             });
//             // Find exact match by ID as search returns array
//             fullReceiver = data.find(u => u._id === receiver.targetId) || {};
//         } catch (e) { console.error("Details fetch error", e); }
//     } else {
//         fullReceiver = { station: receiver.targetId }; // For station, targetId is the name
//     }

//     // --- 1. HEADER (Old Style - Restored) ---
//     doc.setFont("times", "bold");
//     doc.setFontSize(22);
//     doc.setTextColor(0);
//     doc.text("MAHARASHTRA STATE POLICE", 105, 20, null, null, "center");

//     doc.setFontSize(11);
//     doc.setFont("times", "normal");
//     doc.text("Official Digital Communication | CrimeTrack System", 105, 27, null, null, "center");
    
//     doc.setFontSize(12);
//     doc.setFont("times", "bold");
//     doc.text("GOVERNMENT OF MAHARASHTRA", 105, 34, null, null, "center");

//     // Divider Line
//     doc.setLineWidth(0.5);
//     doc.line(10, 38, 200, 38);

//     // Logos
//     const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
//     const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");
//     if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 10, 25, 25);
//     if (policeLogo) doc.addImage(policeLogo, "PNG", 175, 10, 25, 25);

//     // --- 2. DOCUMENT HEADING ---
//     doc.setFontSize(16);
//     doc.setFont("times", "bold");
//     doc.setTextColor(0);
    
//     // Logic: Only "OFFICIAL NOTICE" for Notice
//     let displayTitle = "DOCUMENT";
//     if (type === 'Notice') displayTitle = "OFFICIAL NOTICE";
//     if (type === 'Application') displayTitle = "OFFICIAL APPLICATION";
//     if (type === 'Circular') displayTitle = "DEPARTMENT CIRCULAR";

//     doc.text(displayTitle, 105, 55, null, null, "center");
//     doc.setLineWidth(0.3);
//     doc.line(80, 57, 130, 57); // Underline

//     // Date (Top Right)
//     doc.setFontSize(11);
//     doc.setFont("times", "bold");
//     doc.text(`Date: ${date}`, 190, 68, { align: "right" });
    
//     // --- 3. TO SECTION (Dynamic & Corrected) ---
//     doc.text("To,", 20, 80);
//     doc.setFont("times", "normal");

//     let receiverY = 86;
//     if (receiver.type === 'citizen') {
//         // CITIZEN FORMAT
//         const prefix = fullReceiver.title || "Mr./Mrs.";
//         doc.text(`${prefix} ${receiver.targetName}`, 20, receiverY);
//         // Aadhaar check
//         const aadhaarText = fullReceiver.aadhar ? `Aadhaar No: ${fullReceiver.aadhar}` : "Citizen of Chandrapur";
//         doc.text(aadhaarText, 20, receiverY + 6);
//         doc.text("Chandrapur District", 20, receiverY + 12);
//     } 
//     else if (receiver.type === 'officer') {
//         // POLICE OFFICER FORMAT
//         const prefix = fullReceiver.title || "";
//         const designation = fullReceiver.designation || "Officer";
//         const station = fullReceiver.station || "Headquarters";
        
//         doc.text(`${designation} ${prefix} ${receiver.targetName}`, 20, receiverY);
//         doc.text(`${station}, Chandrapur`, 20, receiverY + 6);
//     } 
//     else {
//         // POLICE STATION FORMAT
//         doc.text("The Station House Officer,", 20, receiverY);
//         doc.text(`${receiver.targetName}, Chandrapur`, 20, receiverY + 6); // Removed "District" as requested
//     }

//     // --- 4. SUBJECT ---
//     const startY = 110;
//     doc.setFont("times", "bold");
//     doc.text("Subject:", 20, startY);
//     doc.setFont("times", "normal");
//     // Indent subject text
//     const splitSubject = doc.splitTextToSize(notice.subject, 150);
//     doc.text(splitSubject, 40, startY);

//     // --- 5. SALUTATION & BODY (Dynamic Paragraphs) ---
//     let salutation = "Respected Sir/Madam,";
//     // Check Gender if officer/citizen
//     if (fullReceiver.gender === 'Male' || fullReceiver.title === 'Mr.') salutation = "Respected Sir,";
//     if (fullReceiver.gender === 'Female' || fullReceiver.title === 'Mrs.' || fullReceiver.title === 'Ms.') salutation = "Respected Madam,";
//     if (receiver.type === 'station') salutation = "Respected Officer In-Charge,";

//     let bodyPrefix = "";
    
//     // 6 Different Formats (Logic)
//     if (type === 'Application') {
//         if (receiver.type === 'officer' || receiver.type === 'station') {
//             bodyPrefix = "I am writing to formally submit this application regarding the subject mentioned above. We request your immediate attention and necessary action on this matter regarding departmental coordination.";
//         } else {
//             bodyPrefix = "This application is regarding a formal request concerning your recent interaction with the department. Please review the details below.";
//         }
//     } else if (type === 'Notice') {
//         if (receiver.type === 'citizen') {
//             bodyPrefix = "You are hereby officially informed regarding the subject cited above. You are directed to take note of the following details and comply immediately.";
//         } else {
//             bodyPrefix = "This is an official directive concerning the subject mentioned above. All protocols must be followed strictly as per department guidelines.";
//         }
//     } else if (type === 'Circular') {
//         bodyPrefix = "This circular is issued to bring the following information to the notice of all concerned personnel. Immediate implementation of these directives is expected.";
//     }

//     doc.text(salutation, 20, startY + 15);

//     // Combine Prefix + User Content
//     const fullBody = `${bodyPrefix}\n\n${notice.body}`;
//     const splitBody = doc.splitTextToSize(fullBody, 170);
//     doc.text(splitBody, 20, startY + 22);

//     // --- 6. FOOTER & SIGNATURE ---
//     const finalY = startY + 30 + (splitBody.length * 6);
    
//     // Closing
//     doc.setFont("times", "bold");
//     if (type === 'Application') doc.text("Yours faithfully,", 150, finalY);
//     else if (type === 'Notice') doc.text("Issued By,", 150, finalY);
//     else doc.text("Regards,", 150, finalY);

//     // Signature (No Border, Image Only)
//     if (notice.signatureUrl) {
//         try {
//             const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
//             if (sigImg) {
//                 // Adjust size to look real
//                 doc.addImage(sigImg, "PNG", 145, finalY + 5, 40, 20); 
//             } else {
//                 doc.setFontSize(9);
//                 doc.text("[Signed Digitally]", 165, finalY + 15, { align: "center" });
//             }
//         } catch (e) {
//             doc.text("[Signed]", 165, finalY + 15, { align: "center" });
//         }
//     } else {
//         doc.setFontSize(8);
//         doc.text("[Signature]", 165, finalY + 15, { align: "center" });
//     }

//     // Sender Info (Dynamic Logic)
//     const infoY = finalY + 30; // Push down below signature
//     const senderPrefix = sender.name.includes("Mr.") || sender.name.includes("Mrs.") ? "" : "Mr./Mrs. "; // Basic prefix logic if missing
    
//     doc.setFontSize(11);
//     doc.setFont("times", "bold");
//     doc.text(`${senderPrefix}${sender.name}`, 165, infoY, { align: "center" });
    
//     doc.setFont("times", "normal");
//     doc.setFontSize(10);
//     doc.text(sender.designation || "Official", 165, infoY + 5, { align: "center" });
    
//     // Station Logic for Sender
//     // Check if designation implies Senior (e.g., SP, DSP, Commissioner)
//     // For simplicity, we check if station is 'HQ' or role logic from frontend
//     // Assuming backend sender object has role, or we infer from designation.
//     // Heuristic: If designation contains "Director", "Superintendent", "Commissioner", "IG" -> Senior
//     const seniorKeywords = ["Director", "Superintendent", "Commissioner", "General", "DGP", "IG", "DIG", "SP", "ACP", "DCP"];
//     const isSenior = seniorKeywords.some(keyword => sender.designation?.includes(keyword));

//     if (isSenior) {
//         doc.text("Chandrapur District", 165, infoY + 10, { align: "center" });
//     } else {
//         // Normal Police
//         doc.text(`${sender.station || "Police Station"}, Chandrapur`, 165, infoY + 10, { align: "center" });
//     }

//     // --- 7. BOTTOM LINE ---
//     const pageHeight = doc.internal.pageSize.height;
//     doc.setDrawColor(150);
//     doc.line(10, pageHeight - 15, 200, pageHeight - 15);
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("This document is electronically generated by CrimeTrack. Valid without physical stamp.", 105, pageHeight - 10, null, null, "center");

//     doc.save(`${type}_${notice._id}.pdf`);
// };

// const NoticeLayout = ({ userRole }) => {
//   const [view, setView] = useState("inbox");
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Compose State
//   const [formData, setFormData] = useState({
//       docType: "Notice",
//       receiverType: "citizen",
//       subject: "",
//       body: ""
//   });
  
//   const [selectedReceivers, setSelectedReceivers] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [signature, setSignature] = useState(null);

//   // --- FETCH NOTICES ---
//   const fetchNotices = async (type) => {
//       setLoading(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const endpoint = type === 'sent' ? 'sent' : 'inbox';
//           const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setNotices(data);
//       } catch (error) { toast.error("Failed to load documents"); }
//       finally { setLoading(false); }
//   };

//   useEffect(() => {
//       if(view === 'inbox' || view === 'sent') fetchNotices(view);
//   }, [view]);

//   // --- DOWNLOAD HANDLER (Pass Token) ---
//   const handleDownload = (notice) => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       generatePDF(notice, userInfo.token);
//   };

//   // --- SEARCH LOGIC ---
//   const handleSearch = async (overrideQuery = null) => {
//       const query = overrideQuery !== null ? overrideQuery : searchQuery;
//       setIsSearching(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const role = formData.receiverType === 'citizen' ? 'citizen' : 'police';
          
//           if(formData.receiverType === 'station') {
//              setIsSearching(false);
//              return;
//           }

//           const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${role}&query=${query}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setSearchResults(data);
//       } catch (error) { toast.error("Search failed"); }
//       finally { setIsSearching(false); }
//   };

//   // --- SELECTION HELPERS ---
//   const isSelected = (id) => selectedReceivers.some(r => r.id === id);

//   const toggleReceiver = (user) => {
//       if (isSelected(user._id)) {
//           setSelectedReceivers(selectedReceivers.filter(r => r.id !== user._id));
//       } else {
//           const fullName = `${user.title || ''} ${user.firstName} ${user.lastName}`.trim();
//           setSelectedReceivers([...selectedReceivers, { 
//               id: user._id, 
//               name: fullName, 
//               email: user.email,
//               designation: user.designation,
//               station: user.station,
//               role: user.role
//           }]);
//       }
//   };

//   const handleSelectAll = () => {
//       if (selectedReceivers.length === searchResults.length) {
//           setSelectedReceivers([]); 
//       } else {
//           const all = searchResults.map(user => ({
//               id: user._id,
//               name: `${user.title || ''} ${user.firstName} ${user.lastName}`.trim(),
//               email: user.email,
//               designation: user.designation,
//               station: user.station,
//               role: user.role
//           }));
//           setSelectedReceivers(all);
//       }
//   };

//   // --- SEND NOTICE ---
//   const handleSend = async (e) => {
//       e.preventDefault();
      
//       if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select at least one receiver");
//       if(formData.receiverType === 'station' && !searchQuery) return toast.error("Enter Station Name");

//       const loadToast = toast.loading("Generating Official Document...");
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          
//           const targets = formData.receiverType === 'station' 
//               ? [{ id: searchQuery, name: searchQuery }] 
//               : selectedReceivers;

//           for (const target of targets) {
//               const payload = new FormData();
//               payload.append("docType", formData.docType);
//               payload.append("receiverType", formData.receiverType);
//               payload.append("targetId", formData.receiverType === 'station' ? target.name : target.id);
//               payload.append("subject", formData.subject);
//               payload.append("body", formData.body);
//               if(signature) payload.append("signature", signature);

//               await axios.post(`${BASE_URL}/api/notices/send`, payload, {
//                   headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
//               });
//           }
          
//           toast.success(`Sent to ${targets.length} recipients!`, { id: loadToast });
//           setView("sent");
//           setSelectedReceivers([]);
//           setSearchQuery("");
//           setSearchResults([]);
//       } catch (error) { toast.error("Failed to send", { id: loadToast }); }
//   };

//   return (
//     <div className="h-full flex flex-col font-sans">
        
//         {/* --- HEADER TABS --- */}
//         <div className="flex gap-4 mb-6 border-b border-slate-700 pb-3 overflow-x-auto">
//             <button onClick={() => setView("inbox")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'inbox' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                 <FaInbox /> Inbox
//             </button>
//             {userRole !== 'citizen' && (
//                 <>
//                     <button onClick={() => setView("compose")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'compose' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                         <FaFeatherAlt /> Compose
//                     </button>
//                     <button onClick={() => setView("sent")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'sent' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                         <FaPaperPlane /> Sent
//                     </button>
//                 </>
//             )}
//         </div>

//         {/* --- VIEW: INBOX / SENT --- */}
//         {(view === 'inbox' || view === 'sent') && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
//                 {loading ? <div className="text-center text-slate-500 py-10"><FaSpinner className="animate-spin text-2xl mx-auto"/> Loading...</div> : 
//                  notices.length === 0 ? <div className="text-center text-slate-500 py-10">No documents found.</div> :
//                  notices.map(notice => (
//                     <div key={notice._id} className="bg-slate-800 border border-slate-700 p-5 rounded-xl hover:border-blue-500/50 transition-all shadow-md group">
//                         <div className="flex justify-between items-start mb-2">
//                             <div>
//                                 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${notice.docType === 'Notice' ? 'bg-red-900/20 text-red-400 border-red-500/30' : 'bg-blue-900/20 text-blue-400 border-blue-500/30'}`}>
//                                     {notice.docType}
//                                 </span>
//                                 <h3 className="text-lg font-bold text-white mt-1">{notice.subject}</h3>
//                             </div>
//                             <button onClick={() => handleDownload(notice)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition-colors">
//                                 <FaFilePdf className="text-red-400" /> Download PDF
//                             </button>
//                         </div>
//                         <div className="text-xs text-slate-400 mb-3 flex gap-4">
//                             <span>From: <b className="text-slate-300">{notice.sender.name}</b> ({notice.sender.designation})</span>
//                             <span>To: <b className="text-slate-300">{notice.receiver.targetName}</b></span>
//                             <span>Date: {new Date(notice.createdAt).toLocaleDateString()}</span>
//                         </div>
//                         <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg line-clamp-2">{notice.body}</p>
//                     </div>
//                  ))
//                 }
//             </div>
//         )}

//         {/* --- VIEW: COMPOSE --- */}
//         {view === 'compose' && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
//                 <form onSubmit={handleSend} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl max-w-4xl mx-auto">
//                     <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
//                         <FaFeatherAlt className="text-green-400"/> New Official Document
//                     </h3>
                    
//                     {/* Document & Receiver Type */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Document Type</label>
//                             <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none" value={formData.docType} onChange={e=>setFormData({...formData, docType: e.target.value})}>
//                                 <option>Notice</option>
//                                 <option>Application</option>
//                                 <option>Circular</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Recipient Group</label>
//                             <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none" value={formData.receiverType} onChange={e=>{setFormData({...formData, receiverType: e.target.value}); setSelectedReceivers([]); setSearchQuery(""); setSearchResults([]);}}>
//                                 <option value="citizen">Citizens</option>
//                                 <option value="officer">Police Officers</option>
//                                 <option value="station">Police Station</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* SELECTED RECEIVERS */}
//                     {selectedReceivers.length > 0 && (
//                         <div className="mb-4">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">To ({selectedReceivers.length}):</label>
//                             <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto custom-scrollbar p-2 bg-slate-900/50 rounded-lg border border-slate-700">
//                                 {selectedReceivers.map(r => (
//                                     <div key={r.id} className="flex items-center gap-2 bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs px-3 py-1 rounded-full">
//                                         <FaUserCheck className="text-blue-400"/>
//                                         <span className="font-bold">{r.name}</span>
//                                         <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="hover:text-red-400 ml-1"><FaTimes /></button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* SEARCH BAR */}
//                     {formData.receiverType !== 'station' && (
//                         <div className="mb-6 bg-slate-700/30 p-4 rounded-xl border border-slate-600">
//                             <div className="flex gap-2">
//                                 <input 
//                                     type="text" 
//                                     className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none" 
//                                     placeholder="Search by name, ID or leave empty to see all..." 
//                                     value={searchQuery} 
//                                     onChange={e=>setSearchQuery(e.target.value)} 
//                                 />
//                                 <button type="button" onClick={() => handleSearch()} className="bg-blue-600 hover:bg-blue-500 px-6 rounded-lg text-white font-bold flex items-center gap-2 transition-all">
//                                     {isSearching ? <FaSpinner className="animate-spin"/> : <FaSearch />} Search
//                                 </button>
//                             </div>

//                             {/* RESULTS GRID */}
//                             {searchResults.length > 0 && (
//                                 <div className="mt-4">
//                                     <div className="flex justify-between items-center mb-2">
//                                         <span className="text-xs text-slate-400 font-bold uppercase">{searchResults.length} Results Found</span>
//                                         <button type="button" onClick={handleSelectAll} className="text-xs text-green-400 hover:text-green-300 font-bold flex items-center gap-1">
//                                             <FaCheckDouble /> {selectedReceivers.length === searchResults.length ? "Deselect All" : "Select All"}
//                                         </button>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar">
//                                         {searchResults.map(u => {
//                                             const active = isSelected(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleReceiver(u)} 
//                                                     className={`
//                                                         flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
//                                                         ${active ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
//                                                     `}
//                                                 >
//                                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
//                                                         {active ? <FaUserCheck /> : (u.role === 'police' ? <FaUserShield /> : <FaUser />)}
//                                                     </div>
//                                                     <div className="min-w-0">
//                                                         <h4 className={`text-sm font-bold truncate ${active ? 'text-blue-300' : 'text-white'}`}>
//                                                             {u.title || ''} {u.firstName} {u.lastName}
//                                                         </h4>
//                                                         <p className="text-[10px] text-slate-400 truncate">
//                                                             {u.role === 'police' ? `${u.designation} | ${u.station}` : u.email}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {formData.receiverType === 'station' && (
//                         <div className="mb-6">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Station Name</label>
//                             <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white" placeholder="Enter Police Station Name" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
//                         </div>
//                     )}

//                     {/* Content */}
//                     <div className="space-y-4 mb-6">
//                         <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white font-bold" placeholder="Subject" required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
//                         <textarea className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white h-40 resize-none" placeholder="Type the main content (reason) here. Standard formatting will be auto-applied." required value={formData.body} onChange={e=>setFormData({...formData, body: e.target.value})}></textarea>
//                     </div>

//                     {/* Signature */}
//                     <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700 border-dashed">
//                         <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Upload Digital Signature (Required)</label>
//                         <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer"/>
//                     </div>

//                     <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 transform active:scale-95">
//                         <FaPaperPlane /> Send Official Document ({selectedReceivers.length > 0 ? selectedReceivers.length : 1})
//                     </button>
//                 </form>
//             </div>
//         )}
//     </div>
//   );
// };

// export default NoticeLayout;












// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";
// import { 
//   FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
//   FaTimes, FaUserCheck, FaCheckDouble, FaUserShield, FaUser, FaBuilding
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // ==========================================
// // 1. CONFIGURATION & CONSTANTS
// // ==========================================

// // Official Paragraphs Config
// const DOC_TEXT_CONFIG = {
//     'Notice': {
//         intro: "You are hereby officially informed regarding the subject cited above. This notice serves as a formal communication from the department requiring your immediate attention. Please take note of the specific details mentioned herein.",
//         outro: "Failure to comply with the instructions mentioned in this notice may result in further legal or departmental action as per the procedure established by law. Treat this correspondence as urgent."
//     },
//     'Application': {
//         intro: "I am writing to formally submit this application regarding the subject mentioned above. This correspondence is generated via the official CrimeTrack portal for your perusal, consideration, and necessary action.",
//         outro: "I request your cooperation and a timely response regarding this matter. We are committed to maintaining departmental coordination and expect a favorable resolution to this request."
//     },
//     'Circular': {
//         intro: "This circular is issued to bring specific information and directives to the notice of all concerned personnel within the jurisdiction. The details provided below are of administrative importance.",
//         outro: "All concerned officers and personnel are instructed to implement these directives with immediate effect. Any deviation from these instructions will be viewed seriously."
//     }
// };

// // Senior Designations (For Footer Logic)
// const SENIOR_RANKS = [
//     "Commissioner", "Director General", "Inspector General", "Superintendent", 
//     "DCP", "ACP", "SP", "DSP", "Commandant"
// ];

// // ==========================================
// // 2. UTILITY FUNCTIONS
// // ==========================================

// const getBase64ImageFromURL = (url) => {
//     return new Promise((resolve) => {
//         if (!url) return resolve(null);
//         const img = new Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = () => resolve(null);
//         img.src = url;
//     });
// };

// const checkSeniority = (designation) => {
//     if (!designation) return false;
//     return SENIOR_RANKS.some(rank => designation.includes(rank));
// };

// // ==========================================
// // 3. PDF GENERATION ENGINE
// // ==========================================

// const generatePDF = async (notice, userInfoToken) => {
//     const doc = new jsPDF();
//     const type = notice.docType; 
//     const sender = notice.sender;
//     const receiver = notice.receiver;
//     const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

//     // ----------------------------------------
//     // A. FETCH DETAILED RECEIVER DATA
//     // ----------------------------------------
//     // We need strict details (Gender, Title, Station) that might not be in the notice object
//     let fullReceiver = {};
    
//     if (receiver.type !== 'station') {
//         try {
//             // Fetch user details by ID
//             const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${receiver.type}&query=${receiver.targetId}`, {
//                 headers: { Authorization: `Bearer ${userInfoToken}` }
//             });
//             // Filter to get exact ID match
//             fullReceiver = data.find(u => u._id === receiver.targetId) || {};
//         } catch (e) { console.error("Receiver Data Fetch Error", e); }
//     } else {
//         fullReceiver = { stationName: receiver.targetId }; // For station, targetId is the name string
//     }

//     // ----------------------------------------
//     // B. HEADER SECTION (Greenish Background)
//     // ----------------------------------------
    
//     // Light Green Background (#E8F5E9)
//     doc.setFillColor(232, 245, 233); 
//     doc.rect(5, 5, 200, 38, 'F'); // Fill Rect
//     doc.setDrawColor(20, 80, 20); // Dark Green Border
//     doc.setLineWidth(0.5);
//     doc.rect(5, 5, 200, 38); // Border Rect

//     // Logos
//     const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
//     const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");

//     if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 9, 30, 30);
//     if (policeLogo) doc.addImage(policeLogo, "PNG", 168, 9, 30, 30);

//     // Header Text
//     doc.setFont("times", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor(20, 60, 20); // Dark Green Text
//     doc.text("MAHARASHTRA STATE POLICE", 105, 18, null, null, "center");

//     doc.setFontSize(10);
//     doc.setFont("times", "normal");
//     doc.setTextColor(0);
//     doc.text("Official Digital Communication | CrimeTrack System", 105, 26, null, null, "center");
    
//     doc.setFontSize(12);
//     doc.setFont("times", "bold");
//     doc.text("GOVERNMENT OF MAHARASHTRA", 105, 33, null, null, "center");

//     // ----------------------------------------
//     // C. DOCUMENT TITLE & META DATA
//     // ----------------------------------------
    
//     // Document Title
//     let docTitle = "OFFICIAL DOCUMENT";
//     if (type === 'Notice') docTitle = "OFFICIAL NOTICE";
//     if (type === 'Application') docTitle = "FORMAL APPLICATION";
//     if (type === 'Circular') docTitle = "DEPARTMENT CIRCULAR";

//     doc.setFontSize(16);
//     doc.setFont("times", "bold");
//     doc.setTextColor(0);
//     doc.text(docTitle, 105, 55, null, null, "center");
//     doc.setLineWidth(0.5);
//     doc.line(75, 57, 135, 57); // Underline

//     // Date (Top Right)
//     doc.setFontSize(11);
//     doc.text(`Date: ${date}`, 190, 68, { align: "right" });
    
//     // Reference Number (Top Left)
//     const refNo = `Ref: CT/${new Date().getFullYear()}/${notice._id.slice(-6).toUpperCase()}`;
//     doc.text(refNo, 20, 68);

//     // ----------------------------------------
//     // D. DYNAMIC "TO" ADDRESS BLOCK
//     // ----------------------------------------
//     doc.setFont("times", "bold");
//     doc.text("To,", 20, 82);
//     doc.setFont("times", "normal");

//     let yPos = 88;
//     const lineHeight = 6;

//     if (receiver.type === 'citizen') {
//         // --- CITIZEN FORMAT ---
//         const title = fullReceiver.title || "Mr./Mrs.";
//         const name = `${fullReceiver.firstName || ''} ${fullReceiver.lastName || ''}`.trim();
        
//         doc.text(`${title} ${name}`, 20, yPos);
//         yPos += lineHeight;
        
//         // Aadhaar Logic
//         if (fullReceiver.aadhar) {
//             doc.text(`Aadhaar No: ${fullReceiver.aadhar}`, 20, yPos);
//             yPos += lineHeight;
//         }
        
//         doc.text("Chandrapur District", 20, yPos);
//     } 
//     else if (receiver.type === 'officer') {
//         // --- POLICE OFFICER FORMAT ---
//         const designation = fullReceiver.designation || "Officer";
//         const title = fullReceiver.title || "";
//         const name = `${fullReceiver.firstName || ''} ${fullReceiver.lastName || ''}`.trim();
//         const station = fullReceiver.station || "Police Department";

//         // Line 1: Designation Prefix Name
//         doc.text(`${designation} ${title} ${name}`, 20, yPos);
//         yPos += lineHeight;

//         // Line 2: Assigned Station, Chandrapur
//         doc.text(`${station}, Chandrapur`, 20, yPos);
//     } 
//     else {
//         // --- POLICE STATION FORMAT ---
//         doc.text("The Station House Officer,", 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${receiver.targetName}, Chandrapur`, 20, yPos);
//     }

//     // ----------------------------------------
//     // E. SUBJECT LINE
//     // ----------------------------------------
//     yPos += 12; // Gap
//     doc.setFont("times", "bold");
//     doc.text("Subject:", 20, yPos);
//     doc.setFont("times", "normal");
    
//     // Handle Subject Wrapping
//     const subjectText = notice.subject || "Regarding official matter";
//     const splitSubject = doc.splitTextToSize(subjectText, 150);
//     doc.text(splitSubject, 45, yPos);
    
//     yPos += (splitSubject.length * 6) + 10;

//     // ----------------------------------------
//     // F. DYNAMIC SALUTATION
//     // ----------------------------------------
//     let salutation = "Respected Sir/Madam,";
    
//     if (receiver.type === 'citizen' || receiver.type === 'officer') {
//         const gender = fullReceiver.gender || "";
//         const title = fullReceiver.title || "";
        
//         if (gender === 'Male' || title === 'Mr.') salutation = "Respected Sir,";
//         if (gender === 'Female' || title === 'Mrs.' || title === 'Ms.') salutation = "Respected Madam,";
//     }
//     else if (receiver.type === 'station') {
//         salutation = "Respected Officer In-Charge,";
//     }

//     doc.text(salutation, 20, yPos);
//     yPos += 10;

//     // ----------------------------------------
//     // G. 3-PARAGRAPH BODY STRUCTURE
//     // ----------------------------------------
//     doc.setFontSize(12);
    
//     // 1. Predefined Intro Paragraph
//     const introText = DOC_TEXT_CONFIG[type]?.intro || "Please refer to the subject cited above regarding the following matter.";
//     const splitIntro = doc.splitTextToSize(introText, 170);
//     doc.text(splitIntro, 20, yPos);
//     yPos += (splitIntro.length * 6) + 6;

//     // 2. User Content (Main Body)
//     // Add extra spacing/formatting for user content
//     const mainContent = notice.body || "No additional details provided.";
//     const splitMain = doc.splitTextToSize(mainContent, 170);
//     doc.text(splitMain, 20, yPos);
//     yPos += (splitMain.length * 6) + 6;

//     // 3. Predefined Outro Paragraph
//     const outroText = DOC_TEXT_CONFIG[type]?.outro || "Your cooperation in this regard is highly appreciated.";
//     const splitOutro = doc.splitTextToSize(outroText, 170);
//     doc.text(splitOutro, 20, yPos);
//     yPos += (splitOutro.length * 6) + 15; // Extra gap for footer

//     // ----------------------------------------
//     // H. FOOTER & SIGNATURE BLOCK
//     // ----------------------------------------
    
//     // Check for Page Break before footer
//     if (yPos > 240) {
//         doc.addPage();
//         yPos = 20;
//     }

//     const footerX = 145;
    
//     // Closing Line
//     doc.setFont("times", "bold");
//     if (type === 'Application') doc.text("Yours faithfully,", footerX, yPos);
//     else if (type === 'Notice') doc.text("Issued By,", footerX, yPos);
//     else doc.text("Regards,", footerX, yPos);

//     yPos += 5;

//     // Signature Block (No Border, Image Centered)
//     // Placeholder Box logic removed, only image or text
//     if (notice.signatureUrl) {
//         try {
//             const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
//             if (sigImg) {
//                 // Image dimensions: Width 40, Height 20
//                 doc.addImage(sigImg, "PNG", footerX, yPos, 40, 20);
//                 yPos += 22; // Move Y past image
//             } else {
//                 yPos += 10;
//                 doc.setFont("times", "italic");
//                 doc.setFontSize(10);
//                 doc.text("[Digital Signature]", footerX + 5, yPos);
//                 yPos += 10;
//             }
//         } catch (e) {
//             yPos += 15;
//             doc.text("[Signed]", footerX + 5, yPos);
//             yPos += 5;
//         }
//     } else {
//         yPos += 20; // Empty space for physical sign
//     }

//     // Sender Details (Dynamic Format)
//     // Format: Prefix Name
//     const sPrefix = sender.name.includes(".") ? "" : "Mr./Mrs. "; // Fallback if no title in name
//     const sName = sender.name;
    
//     doc.setFont("times", "bold");
//     doc.setFontSize(11);
//     doc.text(`${sPrefix}${sName}`, footerX + 20, yPos, { align: "center" }); // Centered relative to block
//     yPos += 5;

//     // Designation
//     doc.setFont("times", "normal");
//     doc.setFontSize(10);
//     doc.text(sender.designation || "Officer", footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     // Station / District Logic
//     const isSeniorSender = checkSeniority(sender.designation);
    
//     if (isSeniorSender) {
//         doc.text("Chandrapur District", footerX + 20, yPos, { align: "center" });
//     } else {
//         const stationName = sender.station || "Police Station";
//         doc.text(`${stationName}, Chandrapur`, footerX + 20, yPos, { align: "center" });
//     }

//     // ----------------------------------------
//     // I. PAGE FOOTER (Legal Disclaimer)
//     // ----------------------------------------
//     const pageHeight = doc.internal.pageSize.height;
//     doc.setDrawColor(150);
//     doc.setLineWidth(0.2);
//     doc.line(10, pageHeight - 15, 200, pageHeight - 15);
    
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("This document is generated via the CrimeTrack Official Portal.", 105, pageHeight - 10, null, null, "center");
//     doc.text("Valid for official purposes without a physical stamp under IT Act 2000.", 105, pageHeight - 6, null, null, "center");

//     // Save File
//     doc.save(`${type}_${notice._id}.pdf`);
// };

// // ==========================================
// // 4. MAIN COMPONENT UI
// // ==========================================

// const NoticeLayout = ({ userRole }) => {
//   const [view, setView] = useState("inbox");
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Compose State
//   const [formData, setFormData] = useState({
//       docType: "Notice",
//       receiverType: "citizen",
//       subject: "",
//       body: ""
//   });
  
//   const [selectedReceivers, setSelectedReceivers] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [signature, setSignature] = useState(null);

//   // FETCH DATA
//   const fetchNotices = async (type) => {
//       setLoading(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const endpoint = type === 'sent' ? 'sent' : 'inbox';
//           const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setNotices(data);
//       } catch (error) { toast.error("Failed to load documents"); }
//       finally { setLoading(false); }
//   };

//   useEffect(() => {
//       if(view === 'inbox' || view === 'sent') fetchNotices(view);
//   }, [view]);

//   // DOWNLOAD HANDLER
//   const handleDownload = (notice) => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const loadToast = toast.loading("Generating PDF...");
//       generatePDF(notice, userInfo.token)
//         .then(() => toast.success("Downloaded!", { id: loadToast }))
//         .catch(() => toast.error("Error generating PDF", { id: loadToast }));
//   };

//   // SEARCH USERS
//   const handleSearch = async (overrideQuery = null) => {
//       const query = overrideQuery !== null ? overrideQuery : searchQuery;
//       setIsSearching(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const role = formData.receiverType === 'citizen' ? 'citizen' : 'police';
          
//           if(formData.receiverType === 'station') {
//              setIsSearching(false);
//              return;
//           }

//           const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${role}&query=${query}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setSearchResults(data);
//       } catch (error) { toast.error("Search failed"); }
//       finally { setIsSearching(false); }
//   };

//   // SELECTION HELPERS
//   const isSelected = (id) => selectedReceivers.some(r => r.id === id);

//   const toggleReceiver = (user) => {
//       if (isSelected(user._id)) {
//           setSelectedReceivers(selectedReceivers.filter(r => r.id !== user._id));
//       } else {
//           // Store minimal info, fetch full details during PDF generation
//           setSelectedReceivers([...selectedReceivers, { 
//               id: user._id, 
//               name: `${user.firstName} ${user.lastName}`, 
//               role: user.role
//           }]);
//       }
//   };

//   const handleSelectAll = () => {
//       if (selectedReceivers.length === searchResults.length) {
//           setSelectedReceivers([]); 
//       } else {
//           const all = searchResults.map(user => ({
//               id: user._id,
//               name: `${user.firstName} ${user.lastName}`,
//               role: user.role
//           }));
//           setSelectedReceivers(all);
//       }
//   };

//   // SEND HANDLER
//   const handleSend = async (e) => {
//       e.preventDefault();
      
//       if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select at least one receiver");
//       if(formData.receiverType === 'station' && !searchQuery) return toast.error("Enter Station Name");

//       const loadToast = toast.loading("Processing...");
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          
//           const targets = formData.receiverType === 'station' 
//               ? [{ id: searchQuery, name: searchQuery }] 
//               : selectedReceivers;

//           for (const target of targets) {
//               const payload = new FormData();
//               payload.append("docType", formData.docType);
//               payload.append("receiverType", formData.receiverType);
//               payload.append("targetId", formData.receiverType === 'station' ? target.name : target.id);
//               payload.append("subject", formData.subject);
//               payload.append("body", formData.body);
//               if(signature) payload.append("signature", signature);

//               await axios.post(`${BASE_URL}/api/notices/send`, payload, {
//                   headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
//               });
//           }
          
//           toast.success(`Sent to ${targets.length} recipients!`, { id: loadToast });
//           setView("sent");
//           setSelectedReceivers([]);
//           setSearchQuery("");
//           setSearchResults([]);
//           setSignature(null);
//           setFormData({ ...formData, subject: "", body: "" });
//       } catch (error) { toast.error("Failed to send", { id: loadToast }); }
//   };

//   return (
//     <div className="h-full flex flex-col font-sans">
        
//         {/* --- HEADER TABS --- */}
//         <div className="flex gap-4 mb-6 border-b border-slate-700 pb-3 overflow-x-auto">
//             <button onClick={() => setView("inbox")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'inbox' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                 <FaInbox /> Inbox
//             </button>
//             {userRole !== 'citizen' && (
//                 <>
//                     <button onClick={() => setView("compose")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'compose' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                         <FaFeatherAlt /> Compose
//                     </button>
//                     <button onClick={() => setView("sent")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'sent' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                         <FaPaperPlane /> Sent
//                     </button>
//                 </>
//             )}
//         </div>

//         {/* --- VIEW: INBOX / SENT --- */}
//         {(view === 'inbox' || view === 'sent') && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
//                 {loading ? <div className="text-center text-slate-500 py-10"><FaSpinner className="animate-spin text-2xl mx-auto"/> Loading...</div> : 
//                  notices.length === 0 ? <div className="text-center text-slate-500 py-10">No documents found.</div> :
//                  notices.map(notice => (
//                     <div key={notice._id} className="bg-slate-800 border border-slate-700 p-5 rounded-xl hover:border-blue-500/50 transition-all shadow-md group">
//                         <div className="flex justify-between items-start mb-2">
//                             <div>
//                                 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${notice.docType === 'Notice' ? 'bg-red-900/20 text-red-400 border-red-500/30' : 'bg-blue-900/20 text-blue-400 border-blue-500/30'}`}>
//                                     {notice.docType}
//                                 </span>
//                                 <h3 className="text-lg font-bold text-white mt-1">{notice.subject}</h3>
//                             </div>
//                             <button onClick={() => handleDownload(notice)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition-colors">
//                                 <FaFilePdf className="text-red-400" /> Download PDF
//                             </button>
//                         </div>
//                         <div className="text-xs text-slate-400 mb-3 flex gap-4">
//                             <span>From: <b className="text-slate-300">{notice.sender.name}</b> ({notice.sender.designation})</span>
//                             <span>To: <b className="text-slate-300">{notice.receiver.targetName}</b></span>
//                             <span>Date: {new Date(notice.createdAt).toLocaleDateString()}</span>
//                         </div>
//                         <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg line-clamp-2">{notice.body}</p>
//                     </div>
//                  ))
//                 }
//             </div>
//         )}

//         {/* --- VIEW: COMPOSE --- */}
//         {view === 'compose' && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
//                 <form onSubmit={handleSend} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl max-w-4xl mx-auto">
//                     <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
//                         <FaFeatherAlt className="text-green-400"/> New Official Document
//                     </h3>
                    
//                     {/* Document & Receiver Type */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Document Type</label>
//                             <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none" value={formData.docType} onChange={e=>setFormData({...formData, docType: e.target.value})}>
//                                 <option>Notice</option>
//                                 <option>Application</option>
//                                 <option>Circular</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Recipient Group</label>
//                             <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none" value={formData.receiverType} onChange={e=>{setFormData({...formData, receiverType: e.target.value}); setSelectedReceivers([]); setSearchQuery(""); setSearchResults([]);}}>
//                                 <option value="citizen">Citizens</option>
//                                 <option value="officer">Police Officers</option>
//                                 <option value="station">Police Station</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* SELECTED RECEIVERS */}
//                     {selectedReceivers.length > 0 && (
//                         <div className="mb-4">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">To ({selectedReceivers.length}):</label>
//                             <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto custom-scrollbar p-2 bg-slate-900/50 rounded-lg border border-slate-700">
//                                 {selectedReceivers.map(r => (
//                                     <div key={r.id} className="flex items-center gap-2 bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs px-3 py-1 rounded-full">
//                                         <FaUserCheck className="text-blue-400"/>
//                                         <span className="font-bold">{r.name}</span>
//                                         <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="hover:text-red-400 ml-1"><FaTimes /></button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* SEARCH BAR */}
//                     {formData.receiverType !== 'station' && (
//                         <div className="mb-6 bg-slate-700/30 p-4 rounded-xl border border-slate-600">
//                             <div className="flex gap-2">
//                                 <input 
//                                     type="text" 
//                                     className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none" 
//                                     placeholder="Search by name, ID or leave empty to see all..." 
//                                     value={searchQuery} 
//                                     onChange={e=>setSearchQuery(e.target.value)} 
//                                 />
//                                 <button type="button" onClick={() => handleSearch()} className="bg-blue-600 hover:bg-blue-500 px-6 rounded-lg text-white font-bold flex items-center gap-2 transition-all">
//                                     {isSearching ? <FaSpinner className="animate-spin"/> : <FaSearch />} Search
//                                 </button>
//                             </div>

//                             {/* RESULTS GRID */}
//                             {searchResults.length > 0 && (
//                                 <div className="mt-4">
//                                     <div className="flex justify-between items-center mb-2">
//                                         <span className="text-xs text-slate-400 font-bold uppercase">{searchResults.length} Results Found</span>
//                                         <button type="button" onClick={handleSelectAll} className="text-xs text-green-400 hover:text-green-300 font-bold flex items-center gap-1">
//                                             <FaCheckDouble /> {selectedReceivers.length === searchResults.length ? "Deselect All" : "Select All"}
//                                         </button>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar">
//                                         {searchResults.map(u => {
//                                             const active = isSelected(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleReceiver(u)} 
//                                                     className={`
//                                                         flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
//                                                         ${active ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
//                                                     `}
//                                                 >
//                                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
//                                                         {active ? <FaUserCheck /> : (u.role === 'police' ? <FaUserShield /> : <FaUser />)}
//                                                     </div>
//                                                     <div className="min-w-0">
//                                                         <h4 className={`text-sm font-bold truncate ${active ? 'text-blue-300' : 'text-white'}`}>
//                                                             {u.title || ''} {u.firstName} {u.lastName}
//                                                         </h4>
//                                                         <p className="text-[10px] text-slate-400 truncate">
//                                                             {u.role === 'police' ? `${u.designation} | ${u.station}` : u.email}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {formData.receiverType === 'station' && (
//                         <div className="mb-6">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Station Name</label>
//                             <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white" placeholder="Enter Police Station Name" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
//                         </div>
//                     )}

//                     {/* Content */}
//                     <div className="space-y-4 mb-6">
//                         <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white font-bold" placeholder="Subject" required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
//                         <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600 text-sm text-gray-400">
//                              <p className="mb-2 text-green-400 font-bold uppercase text-xs">Document Structure Preview:</p>
//                              <p className="italic opacity-70 mb-2">"{DOC_TEXT_CONFIG[formData.docType]?.intro || "Standard Introduction..."}"</p>
//                              <textarea 
//                                 className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white h-32 resize-none focus:border-green-500 outline-none" 
//                                 placeholder="Type your main content here..." 
//                                 required 
//                                 value={formData.body} 
//                                 onChange={e=>setFormData({...formData, body: e.target.value})}
//                              ></textarea>
//                              <p className="italic opacity-70 mt-2">"{DOC_TEXT_CONFIG[formData.docType]?.outro || "Standard Conclusion..."}"</p>
//                         </div>
//                     </div>

//                     {/* Signature */}
//                     <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700 border-dashed">
//                         <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Upload Digital Signature (Required)</label>
//                         <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer"/>
//                     </div>

//                     <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 transform active:scale-95">
//                         <FaPaperPlane /> Send Official Document ({selectedReceivers.length > 0 ? selectedReceivers.length : 1})
//                     </button>
//                 </form>
//             </div>
//         )}
//     </div>
//   );
// };

// export default NoticeLayout;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";
// import { 
//   FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
//   FaTimes, FaUserCheck, FaCheckDouble, FaUserShield, FaUser, FaBuilding 
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // ==========================================
// // 1. OFFICIAL TEXT CONFIGURATION
// // ==========================================
// const DOC_CONFIG = {
//     'Notice': {
//         title: "OFFICIAL NOTICE",
//         intro: "You are hereby officially informed regarding the subject cited above. This notice serves as a formal communication from the department requiring your immediate attention. Please take note of the specific details mentioned herein.",
//         outro: "Failure to comply with the instructions mentioned in this notice may result in further legal or departmental action as per the procedure established by law. Treat this correspondence as urgent.",
//         closing: "Issued By,"
//     },
//     'Application': {
//         title: "FORMAL APPLICATION",
//         intro: "I am writing to formally submit this application regarding the subject mentioned above. This correspondence is generated via the official CrimeTrack portal for your perusal, consideration, and necessary action.",
//         outro: "I request your cooperation and a timely response regarding this matter. We are committed to maintaining departmental coordination and expect a favorable resolution to this request.",
//         closing: "Yours faithfully,"
//     },
//     'Circular': {
//         title: "DEPARTMENT CIRCULAR",
//         intro: "This circular is issued to bring specific information and directives to the notice of all concerned personnel within the jurisdiction. The details provided below are of administrative importance.",
//         outro: "All concerned officers and personnel are instructed to implement these directives with immediate effect. Any deviation from these instructions will be viewed seriously.",
//         closing: "Regards,"
//     }
// };

// const SENIOR_RANKS = [
//     "Commissioner", "Director", "Superintendent", "DCP", "ACP", "SP", "DSP", "IG", "DIG"
// ];

// // ==========================================
// // 2. HELPER FUNCTIONS
// // ==========================================

// const getBase64ImageFromURL = (url) => {
//     return new Promise((resolve) => {
//         if (!url) return resolve(null);
//         const img = new Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = () => resolve(null);
//         img.src = url;
//     });
// };

// const isSeniorOfficer = (designation) => {
//     if (!designation) return false;
//     return SENIOR_RANKS.some(rank => designation.includes(rank));
// };

// // ==========================================
// // 3. PDF GENERATION ENGINE
// // ==========================================

// const generatePDF = async (notice, userInfoToken) => {
//     const doc = new jsPDF();
//     const type = notice.docType; 
//     const sender = notice.sender;
//     const receiver = notice.receiver;
//     const config = DOC_CONFIG[type];
//     const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

//     // --- FETCH DEEP DATA ---
//     let fullReceiver = {};
//     if (receiver.type !== 'station') {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${receiver.type}&query=${receiver.targetId}`, {
//                 headers: { Authorization: `Bearer ${userInfoToken}` }
//             });
//             fullReceiver = data.find(u => u._id === receiver.targetId) || {};
//         } catch (e) { console.error("Fetch Error", e); }
//     } else {
//         fullReceiver = { station: receiver.targetId }; 
//     }

//     // --- HEADER (Greenish Official Look) ---
//     doc.setFillColor(235, 247, 235); // Light Green
//     doc.rect(5, 5, 200, 38, 'F'); 
//     doc.setDrawColor(20, 100, 20); // Dark Green Border
//     doc.setLineWidth(0.5);
//     doc.rect(5, 5, 200, 38);

//     const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
//     const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");
//     if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 9, 30, 30);
//     if (policeLogo) doc.addImage(policeLogo, "PNG", 168, 9, 30, 30);

//     doc.setFont("times", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor(15, 70, 15);
//     doc.text("MAHARASHTRA STATE POLICE", 105, 18, null, null, "center");

//     doc.setFontSize(10);
//     doc.setFont("times", "normal");
//     doc.setTextColor(0);
//     doc.text("Official Digital Communication | CrimeTrack System", 105, 26, null, null, "center");
    
//     doc.setFontSize(12);
//     doc.setFont("times", "bold");
//     doc.text("GOVERNMENT OF MAHARASHTRA", 105, 33, null, null, "center");

//     // --- TITLE & DATE ---
//     doc.setFontSize(16);
//     doc.setFont("times", "bold");
//     doc.setTextColor(0);
//     doc.text(config.title, 105, 55, null, null, "center");
//     doc.setLineWidth(0.5);
//     doc.line(75, 57, 135, 57); 

//     doc.setFontSize(11);
//     doc.text(`Date: ${date}`, 190, 68, { align: "right" });
//     doc.text(`Ref: CT/${new Date().getFullYear()}/${notice._id.slice(-6).toUpperCase()}`, 20, 68);

//     // --- RECEIVER BLOCK ---
//     doc.setFont("times", "bold");
//     doc.text("To,", 20, 82);
//     doc.setFont("times", "normal");

//     let yPos = 88;
//     const lineHeight = 6;

//     if (receiver.type === 'citizen') {
//         const title = fullReceiver.title || "Mr./Mrs."; // Default prefix if missing
//         const name = `${fullReceiver.firstName || ''} ${fullReceiver.lastName || ''}`.trim();
        
//         // ✅ FIXED: Single Prefix Format "To, Mr. John Doe"
//         // If title exists in name, use that, else use derived title
//         const displayName = name.includes(".") ? name : `${title} ${name}`; 
        
//         doc.text(displayName, 20, yPos);
//         yPos += lineHeight;
        
//         if (fullReceiver.aadhar) {
//             doc.text(`Aadhaar No: ${fullReceiver.aadhar}`, 20, yPos);
//             yPos += lineHeight;
//         }
//         doc.text("Chandrapur District", 20, yPos);
//     } 
//     else if (receiver.type === 'officer') {
//         const title = fullReceiver.title || ""; 
//         const name = `${fullReceiver.firstName || ''} ${fullReceiver.lastName || ''}`.trim();
//         const designation = fullReceiver.designation || "Officer";
//         const station = fullReceiver.station || "Police Department";

//         doc.text(designation, 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${title} ${name}`, 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${station}, Chandrapur`, 20, yPos);
//     } 
//     else {
//         doc.text("The Station House Officer,", 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${receiver.targetName}, Chandrapur`, 20, yPos);
//     }

//     // --- SUBJECT ---
//     yPos += 12;
//     doc.setFont("times", "bold");
//     doc.text("Subject:", 20, yPos);
//     doc.setFont("times", "normal");
//     const splitSubject = doc.splitTextToSize(notice.subject, 150);
//     doc.text(splitSubject, 45, yPos);
//     yPos += (splitSubject.length * 6) + 10;

//     // --- SALUTATION ---
//     let salutation = "Respected Sir/Madam,";
//     if (receiver.type !== 'station') {
//         if (fullReceiver.gender === 'Male' || fullReceiver.title === 'Mr.') salutation = "Respected Sir,";
//         if (fullReceiver.gender === 'Female' || fullReceiver.title === 'Mrs.' || fullReceiver.title === 'Ms.') salutation = "Respected Madam,";
//     } else {
//         salutation = "Respected Officer In-Charge,";
//     }
    
//     doc.text(salutation, 20, yPos);
//     yPos += 10;

//     // --- BODY ---
//     doc.setFontSize(12);
    
//     const splitIntro = doc.splitTextToSize(config.intro, 170);
//     doc.text(splitIntro, 20, yPos);
//     yPos += (splitIntro.length * 6) + 6;

//     const splitMain = doc.splitTextToSize(notice.body, 170);
//     doc.text(splitMain, 20, yPos);
//     yPos += (splitMain.length * 6) + 6;

//     const splitOutro = doc.splitTextToSize(config.outro, 170);
//     doc.text(splitOutro, 20, yPos);
//     yPos += (splitOutro.length * 6) + 20;

//     // --- FOOTER & SIGNATURE ---
//     if (yPos > 230) { doc.addPage(); yPos = 30; }

//     const footerX = 140;
    
//     doc.setFont("times", "bold");
//     doc.text(config.closing, footerX, yPos);
//     yPos += 5;

//     if (notice.signatureUrl) {
//         try {
//             const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
//             if (sigImg) {
//                 doc.addImage(sigImg, "PNG", footerX, yPos, 35, 18);
//                 yPos += 20;
//             } else {
//                 yPos += 15;
//                 doc.setFont("times", "italic");
//                 doc.setFontSize(9);
//                 doc.text("[Digital Signature Verified]", footerX, yPos);
//             }
//         } catch (e) {
//             yPos += 15;
//             doc.text("[Signed]", footerX, yPos);
//         }
//     } else {
//         yPos += 20;
//     }

//     // ✅ FIXED: Only one prefix logic for sender
//     let sName = sender.name;
//     // Check if name already has a prefix
//     const hasPrefix = sName.includes("Mr.") || sName.includes("Mrs.") || sName.includes("Dr.");
    
//     // If no prefix, check gender or default to Mr. (simplified)
//     // Assuming backend saves full name. If not, prepending generic Mr.
//     const finalSenderName = hasPrefix ? sName : `Mr. ${sName}`; 
    
//     doc.setFont("times", "bold");
//     doc.setFontSize(11);
//     doc.text(finalSenderName, footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     doc.setFont("times", "normal");
//     doc.setFontSize(10);
//     doc.text(sender.designation || "Officer", footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     if (isSeniorOfficer(sender.designation)) {
//         doc.text("Chandrapur District", footerX + 20, yPos, { align: "center" });
//     } else {
//         doc.text(`${sender.station}, Chandrapur`, footerX + 20, yPos, { align: "center" });
//     }

//     // --- LEGAL FOOTER ---
//     const pageHeight = doc.internal.pageSize.height;
//     doc.setDrawColor(150);
//     doc.setLineWidth(0.2);
//     doc.line(10, pageHeight - 15, 200, pageHeight - 15);
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("Generated by CrimeTrack | Valid Official Document under IT Act.", 105, pageHeight - 10, null, null, "center");

//     doc.save(`${type}_${notice._id}.pdf`);
// };

// // ==========================================
// // 4. MAIN COMPONENT
// // ==========================================

// const NoticeLayout = ({ userRole }) => {
//   const [view, setView] = useState("inbox");
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//       docType: "Notice",
//       receiverType: "citizen",
//       subject: "",
//       body: ""
//   });
  
//   const [selectedReceivers, setSelectedReceivers] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [signature, setSignature] = useState(null);

//   const fetchNotices = async (type) => {
//       setLoading(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const endpoint = type === 'sent' ? 'sent' : 'inbox';
//           const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setNotices(data);
//       } catch (error) { toast.error("Load failed"); }
//       finally { setLoading(false); }
//   };

//   useEffect(() => {
//       if(view === 'inbox' || view === 'sent') fetchNotices(view);
//   }, [view]);

//   const handleDownload = (notice) => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const loadToast = toast.loading("Downloading Document...");
//       generatePDF(notice, userInfo.token)
//         .then(() => toast.success("Downloaded", { id: loadToast }))
//         .catch(() => toast.error("Error", { id: loadToast }));
//   };

//   const handleSearch = async (overrideQuery = null) => {
//       const query = overrideQuery !== null ? overrideQuery : searchQuery;
//       setIsSearching(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const role = formData.receiverType === 'citizen' ? 'citizen' : 'police';
          
//           if(formData.receiverType === 'station') {
//              setIsSearching(false);
//              return;
//           }

//           const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${role}&query=${query}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setSearchResults(data);
//       } catch (error) { toast.error("Search failed"); }
//       finally { setIsSearching(false); }
//   };

//   const isSelected = (id) => selectedReceivers.some(r => r.id === id);

//   const toggleReceiver = (user) => {
//       if (isSelected(user._id)) {
//           setSelectedReceivers(selectedReceivers.filter(r => r.id !== user._id));
//       } else {
//           setSelectedReceivers([...selectedReceivers, { 
//               id: user._id, 
//               name: `${user.firstName} ${user.lastName}`, 
//               role: user.role
//           }]);
//       }
//   };

//   const handleSelectAll = () => {
//       if (selectedReceivers.length === searchResults.length) {
//           setSelectedReceivers([]); 
//       } else {
//           const all = searchResults.map(user => ({
//               id: user._id,
//               name: `${user.firstName} ${user.lastName}`,
//               role: user.role
//           }));
//           setSelectedReceivers(all);
//       }
//   };

//   const handleSend = async (e) => {
//       e.preventDefault();
      
//       if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select receiver");
//       if(formData.receiverType === 'station' && !searchQuery) return toast.error("Enter Station Name");

//       const loadToast = toast.loading("Dispatching Official Documents...");
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          
//           const targets = formData.receiverType === 'station' 
//               ? [{ id: searchQuery, name: searchQuery }] 
//               : selectedReceivers;

//           for (const target of targets) {
//               const payload = new FormData();
//               payload.append("docType", formData.docType);
//               payload.append("receiverType", formData.receiverType);
//               payload.append("targetId", formData.receiverType === 'station' ? target.name : target.id);
//               payload.append("subject", formData.subject);
//               payload.append("body", formData.body);
//               if(signature) payload.append("signature", signature);

//               await axios.post(`${BASE_URL}/api/notices/send`, payload, {
//                   headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
//               });
//           }
          
//           toast.success(`Dispatched ${targets.length} documents.`, { id: loadToast });
//           setView("sent");
//           setSelectedReceivers([]);
//           setSearchQuery("");
//           setSearchResults([]);
//           setSignature(null);
//           setFormData({ ...formData, subject: "", body: "" });
//       } catch (error) { toast.error("Dispatch Failed", { id: loadToast }); }
//   };

//   return (
//     <div className="h-full flex flex-col font-sans">
        
//         {/* HEADER TABS */}
//         <div className="flex gap-4 mb-6 border-b border-slate-700 pb-3 overflow-x-auto">
//             <button onClick={() => setView("inbox")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'inbox' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                 <FaInbox /> Inbox
//             </button>
//             {userRole !== 'citizen' && (
//                 <>
//                     <button onClick={() => setView("compose")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'compose' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                         <FaFeatherAlt /> Compose
//                     </button>
//                     <button onClick={() => setView("sent")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${view === 'sent' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
//                         <FaPaperPlane /> Sent
//                     </button>
//                 </>
//             )}
//         </div>

//         {/* LIST VIEW */}
//         {(view === 'inbox' || view === 'sent') && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
//                 {loading ? <div className="text-center text-slate-500 py-10"><FaSpinner className="animate-spin text-2xl mx-auto"/> Loading...</div> : 
//                  notices.length === 0 ? <div className="text-center text-slate-500 py-10">No official documents found.</div> :
//                  notices.map(notice => (
//                     <div key={notice._id} className="bg-slate-800 border border-slate-700 p-5 rounded-xl hover:border-blue-500/50 transition-all shadow-md group">
//                         <div className="flex justify-between items-start mb-2">
//                             <div>
//                                 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${notice.docType === 'Notice' ? 'bg-red-900/20 text-red-400 border-red-500/30' : 'bg-blue-900/20 text-blue-400 border-blue-500/30'}`}>
//                                     {notice.docType}
//                                 </span>
//                                 <h3 className="text-lg font-bold text-white mt-1">{notice.subject}</h3>
//                             </div>
//                             <button onClick={() => handleDownload(notice)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition-colors">
//                                 <FaFilePdf className="text-red-400" /> Download PDF
//                             </button>
//                         </div>
//                         <div className="text-xs text-slate-400 mb-3 flex gap-4">
//                             <span>From: <b className="text-slate-300">{notice.sender.name}</b> ({notice.sender.designation})</span>
//                             <span>To: <b className="text-slate-300">{notice.receiver.targetName}</b></span>
//                             <span>Date: {new Date(notice.createdAt).toLocaleDateString()}</span>
//                         </div>
//                         <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg line-clamp-2">{notice.body}</p>
//                     </div>
//                  ))
//                 }
//             </div>
//         )}

//         {/* COMPOSE VIEW */}
//         {view === 'compose' && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
//                 <form onSubmit={handleSend} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl max-w-4xl mx-auto">
//                     <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
//                         <FaFeatherAlt className="text-green-400"/> New Official Document
//                     </h3>
                    
//                     {/* CONTROLS */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Document Type</label>
//                             <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none" value={formData.docType} onChange={e=>setFormData({...formData, docType: e.target.value})}>
//                                 <option>Notice</option>
//                                 <option>Application</option>
//                                 <option>Circular</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Recipient Group</label>
//                             <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none" value={formData.receiverType} onChange={e=>{setFormData({...formData, receiverType: e.target.value}); setSelectedReceivers([]); setSearchQuery(""); setSearchResults([]);}}>
//                                 <option value="citizen">Citizens</option>
//                                 <option value="officer">Police Officers</option>
//                                 <option value="station">Police Station</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* SELECTED USERS */}
//                     {selectedReceivers.length > 0 && (
//                         <div className="mb-4">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">To ({selectedReceivers.length}):</label>
//                             <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto custom-scrollbar p-2 bg-slate-900/50 rounded-lg border border-slate-700">
//                                 {selectedReceivers.map(r => (
//                                     <div key={r.id} className="flex items-center gap-2 bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs px-3 py-1 rounded-full">
//                                         <FaUserCheck className="text-blue-400"/>
//                                         <span className="font-bold">{r.name}</span>
//                                         <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="hover:text-red-400 ml-1"><FaTimes /></button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* SEARCH INPUT */}
//                     {formData.receiverType !== 'station' ? (
//                         <div className="mb-6 bg-slate-700/30 p-4 rounded-xl border border-slate-600">
//                             <div className="flex gap-2">
//                                 <input 
//                                     type="text" 
//                                     className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none" 
//                                     placeholder="Search by Name, ID or leave empty to see all..." 
//                                     value={searchQuery} 
//                                     onChange={e=>setSearchQuery(e.target.value)} 
//                                 />
//                                 <button type="button" onClick={() => handleSearch()} className="bg-blue-600 hover:bg-blue-500 px-6 rounded-lg text-white font-bold flex items-center gap-2 transition-all">
//                                     {isSearching ? <FaSpinner className="animate-spin"/> : <FaSearch />} Search
//                                 </button>
//                             </div>

//                             {/* RESULTS LIST */}
//                             {searchResults.length > 0 && (
//                                 <div className="mt-4">
//                                     <div className="flex justify-between items-center mb-2">
//                                         <span className="text-xs text-slate-400 font-bold uppercase">{searchResults.length} Results Found</span>
//                                         <button type="button" onClick={handleSelectAll} className="text-xs text-green-400 hover:text-green-300 font-bold flex items-center gap-1">
//                                             <FaCheckDouble /> {selectedReceivers.length === searchResults.length ? "Deselect All" : "Select All"}
//                                         </button>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar">
//                                         {searchResults.map(u => {
//                                             const active = isSelected(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleReceiver(u)} 
//                                                     className={`
//                                                         flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
//                                                         ${active ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
//                                                     `}
//                                                 >
//                                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
//                                                         {active ? <FaUserCheck /> : (u.role === 'police' ? <FaUserShield /> : <FaUser />)}
//                                                     </div>
//                                                     <div className="min-w-0">
//                                                         <h4 className={`text-sm font-bold truncate ${active ? 'text-blue-300' : 'text-white'}`}>
//                                                             {u.title || ''} {u.firstName} {u.lastName}
//                                                         </h4>
//                                                         <p className="text-[10px] text-slate-400 truncate">
//                                                             {u.role === 'police' ? `${u.designation} | ${u.station}` : u.email}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="mb-6">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Station Name</label>
//                             <div className="relative">
//                                 <FaBuilding className="absolute left-4 top-4 text-slate-500"/>
//                                 <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 pl-10 text-white" placeholder="Enter Police Station Name" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
//                             </div>
//                         </div>
//                     )}

//                     {/* EDITOR */}
//                     <div className="space-y-4 mb-6">
//                         <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white font-bold" placeholder="Subject" required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
                        
//                         <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600 text-sm text-gray-400">
//                              <p className="mb-2 text-green-400 font-bold uppercase text-xs tracking-wider">Document Structure Preview</p>
//                              <p className="italic opacity-70 mb-3 pl-2 border-l-2 border-slate-600">"{DOC_CONFIG[formData.docType].intro}"</p>
//                              <textarea 
//                                 className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white h-32 resize-none focus:border-green-500 outline-none" 
//                                 placeholder="Type the main reason / content here..." 
//                                 required 
//                                 value={formData.body} 
//                                 onChange={e=>setFormData({...formData, body: e.target.value})}
//                              ></textarea>
//                              <p className="italic opacity-70 mt-3 pl-2 border-l-2 border-slate-600">"{DOC_CONFIG[formData.docType].outro}"</p>
//                         </div>
//                     </div>

//                     {/* SIGNATURE */}
//                     <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700 border-dashed">
//                         <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Upload Digital Signature (Required)</label>
//                         <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer"/>
//                     </div>

//                     <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 transform active:scale-95">
//                         <FaPaperPlane /> Send Official Document ({selectedReceivers.length > 0 ? selectedReceivers.length : (formData.receiverType === 'station' ? 1 : 0)})
//                     </button>
//                 </form>
//             </div>
//         )}
//     </div>
//   );
// };

// export default NoticeLayout;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";
// import { 
//   FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
//   FaTimes, FaUserCheck, FaCheckDouble, FaUserShield, FaUser, FaBuilding 
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // ==========================================
// // 1. OFFICIAL TEXT CONFIGURATION
// // ==========================================
// const DOC_CONFIG = {
//     'Notice': {
//         title: "OFFICIAL NOTICE",
//         intro: "You are hereby officially informed regarding the subject cited above. This notice serves as a formal communication from the department requiring your immediate attention. Please take note of the specific details mentioned herein.",
//         outro: "Failure to comply with the instructions mentioned in this notice may result in further legal or departmental action as per the procedure established by law. Treat this correspondence as urgent.",
//         closing: "Issued By,"
//     },
//     'Application': {
//         title: "FORMAL APPLICATION",
//         intro: "I am writing to formally submit this application regarding the subject mentioned above. This correspondence is generated via the official CrimeTrack portal for your perusal, consideration, and necessary action.",
//         outro: "I request your cooperation and a timely response regarding this matter. We are committed to maintaining departmental coordination and expect a favorable resolution to this request.",
//         closing: "Yours faithfully,"
//     },
//     'Circular': {
//         title: "DEPARTMENT CIRCULAR",
//         intro: "This circular is issued to bring specific information and directives to the notice of all concerned personnel within the jurisdiction. The details provided below are of administrative importance.",
//         outro: "All concerned officers and personnel are instructed to implement these directives with immediate effect. Any deviation from these instructions will be viewed seriously.",
//         closing: "Regards,"
//     }
// };

// const SENIOR_RANKS = [
//     "Commissioner", "Director", "Superintendent", "DCP", "ACP", "SP", "DSP", "IG", "DIG"
// ];

// // ==========================================
// // 2. HELPER FUNCTIONS
// // ==========================================

// const getBase64ImageFromURL = (url) => {
//     return new Promise((resolve) => {
//         if (!url) return resolve(null);
//         const img = new Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = () => resolve(null);
//         img.src = url;
//     });
// };

// const isSeniorOfficer = (designation) => {
//     if (!designation) return false;
//     return SENIOR_RANKS.some(rank => designation.includes(rank));
// };

// // ==========================================
// // 3. PDF GENERATION ENGINE
// // ==========================================

// const generatePDF = async (notice, userInfoToken) => {
//     const doc = new jsPDF();
//     const type = notice.docType; 
//     const sender = notice.sender;
//     const receiver = notice.receiver;
//     const config = DOC_CONFIG[type];
//     const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

//     let fullReceiver = {};
//     if (receiver.type !== 'station') {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${receiver.type}&query=${receiver.targetId}`, {
//                 headers: { Authorization: `Bearer ${userInfoToken}` }
//             });
//             fullReceiver = data.find(u => u._id === receiver.targetId) || {};
//         } catch (e) { console.error("Fetch Error", e); }
//     } else {
//         fullReceiver = { station: receiver.targetId }; 
//     }

//     doc.setFillColor(235, 247, 235); 
//     doc.rect(5, 5, 200, 38, 'F'); 
//     doc.setDrawColor(20, 100, 20); 
//     doc.setLineWidth(0.5);
//     doc.rect(5, 5, 200, 38);

//     const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
//     const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");
//     if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 9, 30, 30);
//     if (policeLogo) doc.addImage(policeLogo, "PNG", 168, 9, 30, 30);

//     doc.setFont("times", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor(15, 70, 15);
//     doc.text("MAHARASHTRA STATE POLICE", 105, 18, null, null, "center");

//     doc.setFontSize(10);
//     doc.setFont("times", "normal");
//     doc.setTextColor(0);
//     doc.text("Official Digital Communication | CrimeTrack System", 105, 26, null, null, "center");
    
//     doc.setFontSize(12);
//     doc.setFont("times", "bold");
//     doc.text("GOVERNMENT OF MAHARASHTRA", 105, 33, null, null, "center");

//     doc.setFontSize(16);
//     doc.setFont("times", "bold");
//     doc.setTextColor(0);
//     doc.text(config.title, 105, 55, null, null, "center");
//     doc.setLineWidth(0.5);
//     doc.line(75, 57, 135, 57); 

//     doc.setFontSize(11);
//     doc.text(`Date: ${date}`, 190, 68, { align: "right" });
//     doc.text(`Ref: CT/${new Date().getFullYear()}/${notice._id.slice(-6).toUpperCase()}`, 20, 68);

//     doc.setFont("times", "bold");
//     doc.text("To,", 20, 82);
//     doc.setFont("times", "normal");

//     let yPos = 88;
//     const lineHeight = 6;

//     if (receiver.type === 'citizen') {
//         const name = fullReceiver.firstName 
//             ? `${fullReceiver.firstName} ${fullReceiver.lastName}` 
//             : receiver.targetName;
            
//         const title = fullReceiver.title || ""; 
//         const displayName = title ? `${title} ${name}` : name;

//         doc.text(displayName, 20, yPos);
//         yPos += lineHeight;
        
//         if (fullReceiver.aadhar) {
//             doc.text(`Aadhaar No: ${fullReceiver.aadhar}`, 20, yPos);
//             yPos += lineHeight;
//         }
//         doc.text("Chandrapur District", 20, yPos);
//     } 
//     else if (receiver.type === 'officer') {
//         const name = fullReceiver.firstName 
//             ? `${fullReceiver.firstName} ${fullReceiver.lastName}` 
//             : receiver.targetName;
            
//         const title = fullReceiver.title || "";
//         const designation = fullReceiver.designation || "Officer";
//         const station = fullReceiver.station || "Police Department";

//         doc.text(designation, 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${title} ${name}`.trim(), 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${station}, Chandrapur`, 20, yPos);
//     } 
//     else {
//         doc.text("The Station House Officer,", 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${receiver.targetName}, Chandrapur`, 20, yPos);
//     }

//     yPos += 12;
//     doc.setFont("times", "bold");
//     doc.text("Subject:", 20, yPos);
//     doc.setFont("times", "normal");
//     const splitSubject = doc.splitTextToSize(notice.subject, 150);
//     doc.text(splitSubject, 45, yPos);
//     yPos += (splitSubject.length * 6) + 10;

//     let salutation = "Respected Sir/Madam,";
//     if (receiver.type !== 'station') {
//         if (fullReceiver.gender === 'Male' || fullReceiver.title === 'Mr.') salutation = "Respected Sir,";
//         if (fullReceiver.gender === 'Female' || fullReceiver.title === 'Mrs.' || fullReceiver.title === 'Ms.') salutation = "Respected Madam,";
//     } else {
//         salutation = "Respected Officer In-Charge,";
//     }
    
//     doc.text(salutation, 20, yPos);
//     yPos += 10;

//     doc.setFontSize(12);
    
//     const splitIntro = doc.splitTextToSize(config.intro, 170);
//     doc.text(splitIntro, 20, yPos);
//     yPos += (splitIntro.length * 6) + 6;

//     const splitMain = doc.splitTextToSize(notice.body, 170);
//     doc.text(splitMain, 20, yPos);
//     yPos += (splitMain.length * 6) + 6;

//     const splitOutro = doc.splitTextToSize(config.outro, 170);
//     doc.text(splitOutro, 20, yPos);
//     yPos += (splitOutro.length * 6) + 20;

//     if (yPos > 230) { doc.addPage(); yPos = 30; }

//     const footerX = 140;
    
//     doc.setFont("times", "bold");
//     doc.text(config.closing, footerX, yPos);
//     yPos += 5;

//     if (notice.signatureUrl) {
//         try {
//             const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
//             if (sigImg) {
//                 doc.addImage(sigImg, "PNG", footerX, yPos, 35, 18);
//                 yPos += 20;
//             } else {
//                 yPos += 15;
//                 doc.setFont("times", "italic");
//                 doc.setFontSize(9);
//                 doc.text("[Digital Signature Verified]", footerX, yPos);
//             }
//         } catch (e) {
//             yPos += 15;
//             doc.text("[Signed]", footerX, yPos);
//         }
//     } else {
//         yPos += 20;
//     }

//     const senderName = sender.name;
    
//     doc.setFont("times", "bold");
//     doc.setFontSize(11);
//     doc.text(senderName, footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     doc.setFont("times", "normal");
//     doc.setFontSize(10);
//     doc.text(sender.designation || "Officer", footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     if (isSeniorOfficer(sender.designation)) {
//         doc.text("Chandrapur District", footerX + 20, yPos, { align: "center" });
//     } else {
//         doc.text(`${sender.station}, Chandrapur`, footerX + 20, yPos, { align: "center" });
//     }

//     const pageHeight = doc.internal.pageSize.height;
//     doc.setDrawColor(150);
//     doc.setLineWidth(0.2);
//     doc.line(10, pageHeight - 15, 200, pageHeight - 15);
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("Generated by CrimeTrack | Valid Official Document under IT Act.", 105, pageHeight - 10, null, null, "center");

//     doc.save(`${type}_${notice._id}.pdf`);
// };

// // ==========================================
// // 4. MAIN COMPONENT
// // ==========================================

// const NoticeLayout = ({ userRole }) => {
//   const [view, setView] = useState("inbox");
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//       docType: "Notice",
//       receiverType: "citizen",
//       subject: "",
//       body: ""
//   });
  
//   const [selectedReceivers, setSelectedReceivers] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [signature, setSignature] = useState(null);

//   const fetchNotices = async (type) => {
//       setLoading(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const endpoint = type === 'sent' ? 'sent' : 'inbox';
//           const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setNotices(data);
//       } catch (error) { toast.error("Load failed"); }
//       finally { setLoading(false); }
//   };

//   useEffect(() => {
//       if(view === 'inbox' || view === 'sent') fetchNotices(view);
//   }, [view]);

//   const handleDownload = (notice) => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const loadToast = toast.loading("Downloading Document...");
//       generatePDF(notice, userInfo.token)
//         .then(() => toast.success("Downloaded", { id: loadToast }))
//         .catch(() => toast.error("Error", { id: loadToast }));
//   };

//   // ✅ UPDATED: Search Logic allows Station search now
//   const handleSearch = async (overrideQuery = null) => {
//       const query = overrideQuery !== null ? overrideQuery : searchQuery;
//       setIsSearching(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const role = formData.receiverType === 'citizen' ? 'citizen' : 'police';
          
//           // Note: If receiverType is 'station', we pass role='station' to API now
//           const apiRole = formData.receiverType === 'station' ? 'station' : role;

//           const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${apiRole}&query=${query}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setSearchResults(data);
//       } catch (error) { toast.error("Search failed"); }
//       finally { setIsSearching(false); }
//   };

//   const isSelected = (id) => selectedReceivers.some(r => r.id === id);

//   const toggleReceiver = (item) => {
//       if (isSelected(item._id)) {
//           setSelectedReceivers(selectedReceivers.filter(r => r.id !== item._id));
//       } else {
//           // ✅ FIX: Determine name based on object type (Station vs User)
//           const itemName = item.name ? item.name : `${item.firstName} ${item.lastName}`;
          
//           setSelectedReceivers([...selectedReceivers, { 
//               id: item._id, 
//               name: itemName, 
//               role: formData.receiverType, // Use the current form type
//               photo: item.idPhoto 
//           }]);
//       }
//   };

//   const handleSelectAll = () => {
//       if (selectedReceivers.length === searchResults.length) {
//           setSelectedReceivers([]); 
//       } else {
//           const all = searchResults.map(item => ({
//               id: item._id,
//               name: item.name ? item.name : `${item.firstName} ${item.lastName}`,
//               role: formData.receiverType,
//               photo: item.idPhoto
//           }));
//           setSelectedReceivers(all);
//       }
//   };

//   const handleSend = async (e) => {
//       e.preventDefault();
      
//       if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select receiver");
//       if(formData.receiverType === 'station' && selectedReceivers.length === 0) return toast.error("Search & Select Station");

//       const loadToast = toast.loading("Dispatching Official Documents...");
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          
//           // Use selectedReceivers for all types now (including stations)
//           const targets = selectedReceivers;

//           for (const target of targets) {
//               const payload = new FormData();
//               payload.append("docType", formData.docType);
//               payload.append("receiverType", formData.receiverType);
//               // For station, target.name is the name. For user, target.id is the ID.
//               // Logic check: if station, we send Name as ID or ID? Backend expects Name for stations currently?
//               // Re-reading backend logic: "if station, targetName = targetId".
//               // So for stations, we should send the STATION NAME in targetId field.
              
//               const idToSend = formData.receiverType === 'station' ? target.name : target.id;
              
//               payload.append("targetId", idToSend);
//               payload.append("subject", formData.subject);
//               payload.append("body", formData.body);
//               if(signature) payload.append("signature", signature);

//               await axios.post(`${BASE_URL}/api/notices/send`, payload, {
//                   headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
//               });
//           }
          
//           toast.success(`Dispatched ${targets.length} documents.`, { id: loadToast });
//           setView("sent");
//           setSelectedReceivers([]);
//           setSearchQuery("");
//           setSearchResults([]);
//           setSignature(null);
//           setFormData({ ...formData, subject: "", body: "" });
//       } catch (error) { toast.error("Dispatch Failed", { id: loadToast }); }
//   };

//   return (
//     <div className="h-full flex flex-col font-sans">
        
//         {/* --- HEADER TABS --- */}
//         <div className="flex gap-4 mb-6 border-b border-slate-700/50 pb-4 overflow-x-auto px-1">
//             <button onClick={() => setView("inbox")} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all shadow-md active:scale-95 ${view === 'inbox' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
//                 <FaInbox /> Inbox
//             </button>
//             {userRole !== 'citizen' && (
//                 <>
//                     <button onClick={() => setView("compose")} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all shadow-md active:scale-95 ${view === 'compose' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-green-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
//                         <FaFeatherAlt /> Compose
//                     </button>
//                     <button onClick={() => setView("sent")} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all shadow-md active:scale-95 ${view === 'sent' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-purple-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
//                         <FaPaperPlane /> Sent
//                     </button>
//                 </>
//             )}
//         </div>

//         {/* --- LIST VIEW --- */}
//         {(view === 'inbox' || view === 'sent') && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 px-1">
//                 {loading ? <div className="text-center text-slate-500 py-10 flex flex-col items-center"><FaSpinner className="animate-spin text-3xl mb-2 text-blue-500"/> Loading records...</div> : 
//                  notices.length === 0 ? <div className="text-center text-slate-500 py-10 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">No official documents found.</div> :
//                  notices.map(notice => (
//                     <div key={notice._id} className="bg-slate-800/80 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-900/10 group">
//                         <div className="flex justify-between items-start mb-3">
//                             <div>
//                                 <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full border shadow-sm ${notice.docType === 'Notice' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
//                                     {notice.docType}
//                                 </span>
//                                 <h3 className="text-xl font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">{notice.subject}</h3>
//                             </div>
//                             <button onClick={() => handleDownload(notice)} className="bg-slate-700/50 hover:bg-blue-600 text-slate-300 hover:text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all shadow-sm border border-slate-600 hover:border-blue-500">
//                                 <FaFilePdf className="text-lg" /> Download PDF
//                             </button>
//                         </div>
//                         <div className="text-xs text-slate-400 mb-4 flex flex-wrap gap-4 items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
//                             <span className="flex items-center gap-1.5"><FaUserShield className="text-indigo-400"/> From: <b className="text-white">{notice.sender.name}</b> ({notice.sender.designation})</span>
//                             <span className="w-px h-3 bg-slate-600 hidden sm:block"></span>
//                             <span className="flex items-center gap-1.5"><FaUser className="text-emerald-400"/> To: <b className="text-white">{notice.receiver.targetName}</b></span>
//                             <span className="w-px h-3 bg-slate-600 hidden sm:block"></span>
//                             <span className="text-slate-500">{new Date(notice.createdAt).toLocaleDateString()}</span>
//                         </div>
//                         <p className="text-sm text-slate-300 italic line-clamp-2 pl-4 border-l-2 border-slate-600">"{notice.body}"</p>
//                     </div>
//                  ))
//                 }
//             </div>
//         )}

//         {/* --- COMPOSE VIEW --- */}
//         {view === 'compose' && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar pb-10 px-1">
//                 <form onSubmit={handleSend} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-4xl mx-auto">
//                     <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-8 border-b border-slate-700 pb-4 flex items-center gap-3">
//                         <FaFeatherAlt className="text-emerald-400 text-xl"/> New Official Document
//                     </h3>
                    
//                     {/* Controls Row */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Document Type</label>
//                             <div className="relative">
//                                 <select className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3.5 pl-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none appearance-none font-medium transition-all" value={formData.docType} onChange={e=>setFormData({...formData, docType: e.target.value})}>
//                                     <option>Notice</option>
//                                     <option>Application</option>
//                                     <option>Circular</option>
//                                 </select>
//                                 <div className="absolute right-4 top-4 text-slate-500 pointer-events-none text-xs">▼</div>
//                             </div>
//                         </div>
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Recipient Group</label>
//                             <div className="relative">
//                                 <select className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3.5 pl-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none appearance-none font-medium transition-all" value={formData.receiverType} onChange={e=>{setFormData({...formData, receiverType: e.target.value}); setSelectedReceivers([]); setSearchQuery(""); setSearchResults([]);}}>
//                                     <option value="citizen">Citizens</option>
//                                     <option value="officer">Police Officers</option>
//                                     <option value="station">Police Station</option>
//                                 </select>
//                                 <div className="absolute right-4 top-4 text-slate-500 pointer-events-none text-xs">▼</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Selected Users Chips */}
//                     {selectedReceivers.length > 0 && (
//                         <div className="mb-6 animate-fade-in-up">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Selected Recipients ({selectedReceivers.length})</label>
//                             <div className="flex flex-wrap gap-3 max-h-32 overflow-y-auto custom-scrollbar p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 inner-shadow">
//                                 {selectedReceivers.map(r => (
//                                     <div key={r.id} className="flex items-center gap-2 bg-slate-800 border border-indigo-500/30 text-white text-xs pl-1 pr-3 py-1 rounded-full shadow-sm">
//                                         {r.role !== 'station' ? (
//                                             <img src={r.photo || "https://placehold.co/100"} className="w-6 h-6 rounded-full object-cover border border-slate-600" alt=""/>
//                                         ) : (
//                                             <FaBuilding className="text-slate-400 w-6 h-6 p-1"/>
//                                         )}
//                                         <span className="font-semibold">{r.name}</span>
//                                         <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="hover:text-red-400 ml-1 transition-colors"><FaTimes /></button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Search / Station Input */}
//                     <div className="mb-8">
//                         <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">
//                             {formData.receiverType === 'station' ? "Search Police Station" : "Search Receiver"}
//                         </label>
//                         <div className="flex gap-3 relative">
//                             <div className="relative flex-1 group">
//                                 <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
//                                     {formData.receiverType === 'station' ? <FaBuilding/> : <FaSearch/>}
//                                 </div>
//                                 <input 
//                                     type="text" 
//                                     className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3.5 pl-11 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600" 
//                                     placeholder={formData.receiverType === 'station' ? "Type exact station name..." : "Search by name or email..."} 
//                                     value={searchQuery} 
//                                     onChange={e=>setSearchQuery(e.target.value)} 
//                                 />
//                             </div>
                            
//                             <button type="button" onClick={() => handleSearch()} className="bg-indigo-600 hover:bg-indigo-500 px-6 rounded-xl text-white font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95">
//                                 {isSearching ? <FaSpinner className="animate-spin"/> : "Find"}
//                             </button>
//                         </div>

//                         {/* Search Results Dropdown */}
//                         {searchResults.length > 0 && (
//                             <div className="mt-4 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-2xl animate-fade-in-up">
//                                 <div className="flex justify-between items-center p-3 bg-slate-800/50 border-b border-slate-700">
//                                     <span className="text-xs text-indigo-400 font-bold uppercase">{searchResults.length} matches found</span>
//                                     <button type="button" onClick={handleSelectAll} className="text-xs text-slate-300 hover:text-white font-bold flex items-center gap-1 transition-colors">
//                                         <FaCheckDouble /> {selectedReceivers.length === searchResults.length ? "Deselect All" : "Select All"}
//                                     </button>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-h-64 overflow-y-auto custom-scrollbar">
//                                     {searchResults.map(u => {
//                                         const active = isSelected(u._id);
//                                         // Station or User?
//                                         const isStation = !u.firstName;
//                                         const displayName = isStation ? u.name : `${u.firstName} ${u.lastName}`;
//                                         const subInfo = isStation ? u.district : (u.role === 'police' || u.role === 'senior' ? u.designation : u.email);
//                                         const photo = isStation ? null : u.idPhoto;

//                                         return (
//                                             <div 
//                                                 key={u._id} 
//                                                 onClick={() => toggleReceiver(u)} 
//                                                 className={`
//                                                     flex items-center gap-4 p-4 cursor-pointer transition-all border-b border-slate-800 last:border-b-0
//                                                     ${active ? 'bg-indigo-900/20 border-l-4 border-l-indigo-500' : 'hover:bg-slate-800 border-l-4 border-l-transparent'}
//                                                 `}
//                                             >
//                                                 <div className={`w-12 h-12 rounded-full p-0.5 ${active ? 'bg-indigo-500' : 'bg-slate-700'}`}>
//                                                     {photo ? (
//                                                         <img src={photo} className="w-full h-full rounded-full object-cover" alt=""/>
//                                                     ) : (
//                                                         <div className="w-full h-full rounded-full bg-slate-600 flex items-center justify-center text-slate-400">
//                                                             {isStation ? <FaBuilding/> : <FaUser/>}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className="min-w-0">
//                                                     <h4 className={`text-sm font-bold truncate ${active ? 'text-indigo-300' : 'text-white'}`}>
//                                                         {displayName}
//                                                     </h4>
//                                                     <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
//                                                         {subInfo}
//                                                     </p>
//                                                 </div>
//                                                 {active && <FaUserCheck className="ml-auto text-indigo-400"/>}
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Subject & Body */}
//                     <div className="space-y-5 mb-8">
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Subject</label>
//                             <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3.5 text-white font-bold focus:border-emerald-500 outline-none" placeholder="Enter clear subject line..." required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
//                         </div>
                        
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Content Body</label>
//                             <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-600 text-sm text-gray-400">
//                                 <p className="mb-4 text-emerald-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><FaFeatherAlt/> Auto-Formatted Preview</p>
//                                 <p className="italic opacity-70 mb-3 pl-3 border-l-2 border-slate-600">"{DOC_CONFIG[formData.docType].intro}"</p>
//                                 <textarea 
//                                     className="w-full bg-slate-800 border border-slate-600 rounded-lg p-4 text-white h-40 resize-none focus:border-emerald-500 outline-none font-sans text-base leading-relaxed" 
//                                     placeholder="Type your main message here..." 
//                                     required 
//                                     value={formData.body} 
//                                     onChange={e=>setFormData({...formData, body: e.target.value})}
//                                 ></textarea>
//                                 <p className="italic opacity-70 mt-3 pl-3 border-l-2 border-slate-600">"{DOC_CONFIG[formData.docType].outro}"</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Signature */}
//                     <div className="mb-8 p-6 bg-slate-900/30 rounded-2xl border-2 border-slate-700 border-dashed hover:border-emerald-500/50 transition-colors">
//                         <label className="text-sm font-bold text-slate-300 uppercase mb-3 block flex items-center gap-2">
//                             <FaFilePdf className="text-emerald-400"/> Digital Authentication
//                         </label>
//                         <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer transition-all"/>
//                         <p className="text-[10px] text-slate-500 mt-2">* Upload transparent PNG signature for best results.</p>
//                     </div>

//                     <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-900/20 transition-all flex justify-center items-center gap-3 text-lg transform active:scale-[0.98]">
//                         <FaPaperPlane /> 
//                         Dispatch {formData.docType} ({selectedReceivers.length > 0 ? selectedReceivers.length : 0})
//                     </button>
//                 </form>
//             </div>
//         )}
//     </div>
//   );
// };

// export default NoticeLayout;
















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";
// import { 
//   FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
//   FaTimes, FaUserCheck, FaCheckDouble, FaUserShield, FaUser, FaBuilding,
//   FaPenNib, FaBriefcase, FaIdCard, FaUniversity
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // ==========================================
// // 1. OFFICIAL TEXT CONFIGURATION (UNCHANGED)
// // ==========================================
// const DOC_CONFIG = {
//     'Notice': {
//         title: "OFFICIAL NOTICE",
//         intro: "You are hereby officially informed regarding the subject cited above. This notice serves as a formal communication from the department requiring your immediate attention. Please take note of the specific details mentioned herein.",
//         outro: "Failure to comply with the instructions mentioned in this notice may result in further legal or departmental action as per the procedure established by law. Treat this correspondence as urgent.",
//         closing: "Issued By,"
//     },
//     'Application': {
//         title: "FORMAL APPLICATION",
//         intro: "I am writing to formally submit this application regarding the subject mentioned above. This correspondence is generated via the official CrimeTrack portal for your perusal, consideration, and necessary action.",
//         outro: "I request your cooperation and a timely response regarding this matter. We are committed to maintaining departmental coordination and expect a favorable resolution to this request.",
//         closing: "Yours faithfully,"
//     },
//     'Circular': {
//         title: "DEPARTMENT CIRCULAR",
//         intro: "This circular is issued to bring specific information and directives to the notice of all concerned personnel within the jurisdiction. The details provided below are of administrative importance.",
//         outro: "All concerned officers and personnel are instructed to implement these directives with immediate effect. Any deviation from these instructions will be viewed seriously.",
//         closing: "Regards,"
//     }
// };

// const SENIOR_RANKS = [
//     "Commissioner", "Director", "Superintendent", "DCP", "ACP", "SP", "DSP", "IG", "DIG"
// ];

// // ==========================================
// // 2. HELPER FUNCTIONS (UNCHANGED)
// // ==========================================

// const getBase64ImageFromURL = (url) => {
//     return new Promise((resolve) => {
//         if (!url) return resolve(null);
//         const img = new Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = () => resolve(null);
//         img.src = url;
//     });
// };

// const isSeniorOfficer = (designation) => {
//     if (!designation) return false;
//     return SENIOR_RANKS.some(rank => designation.includes(rank));
// };

// // ==========================================
// // 3. PDF GENERATION ENGINE (UNCHANGED)
// // ==========================================

// const generatePDF = async (notice, userInfoToken) => {
//     const doc = new jsPDF();
//     const type = notice.docType; 
//     const sender = notice.sender;
//     const receiver = notice.receiver;
//     const config = DOC_CONFIG[type];
//     const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

//     let fullReceiver = {};
//     if (receiver.type !== 'station') {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${receiver.type}&query=${receiver.targetId}`, {
//                 headers: { Authorization: `Bearer ${userInfoToken}` }
//             });
//             fullReceiver = data.find(u => u._id === receiver.targetId) || {};
//         } catch (e) { console.error("Fetch Error", e); }
//     } else {
//         fullReceiver = { station: receiver.targetId }; 
//     }

//     doc.setFillColor(235, 247, 235); 
//     doc.rect(5, 5, 200, 38, 'F'); 
//     doc.setDrawColor(20, 100, 20); 
//     doc.setLineWidth(0.5);
//     doc.rect(5, 5, 200, 38);

//     const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
//     const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");
//     if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 9, 30, 30);
//     if (policeLogo) doc.addImage(policeLogo, "PNG", 168, 9, 30, 30);

//     doc.setFont("times", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor(15, 70, 15);
//     doc.text("MAHARASHTRA STATE POLICE", 105, 18, null, null, "center");

//     doc.setFontSize(10);
//     doc.setFont("times", "normal");
//     doc.setTextColor(0);
//     doc.text("Official Digital Communication | CrimeTrack System", 105, 26, null, null, "center");
    
//     doc.setFontSize(12);
//     doc.setFont("times", "bold");
//     doc.text("GOVERNMENT OF MAHARASHTRA", 105, 33, null, null, "center");

//     doc.setFontSize(16);
//     doc.setFont("times", "bold");
//     doc.setTextColor(0);
//     doc.text(config.title, 105, 55, null, null, "center");
//     doc.setLineWidth(0.5);
//     doc.line(75, 57, 135, 57); 

//     doc.setFontSize(11);
//     doc.text(`Date: ${date}`, 190, 68, { align: "right" });
//     doc.text(`Ref: CT/${new Date().getFullYear()}/${notice._id.slice(-6).toUpperCase()}`, 20, 68);

//     doc.setFont("times", "bold");
//     doc.text("To,", 20, 82);
//     doc.setFont("times", "normal");

//     let yPos = 88;
//     const lineHeight = 6;

//     if (receiver.type === 'citizen') {
//         const name = fullReceiver.firstName 
//             ? `${fullReceiver.firstName} ${fullReceiver.lastName}` 
//             : receiver.targetName;
            
//         const title = fullReceiver.title || ""; 
//         const displayName = title ? `${title} ${name}` : name;

//         doc.text(displayName, 20, yPos);
//         yPos += lineHeight;
        
//         if (fullReceiver.aadhar) {
//             doc.text(`Aadhaar No: ${fullReceiver.aadhar}`, 20, yPos);
//             yPos += lineHeight;
//         }
//         doc.text("Chandrapur District", 20, yPos);
//     } 
//     else if (receiver.type === 'officer') {
//         const name = fullReceiver.firstName 
//             ? `${fullReceiver.firstName} ${fullReceiver.lastName}` 
//             : receiver.targetName;
            
//         const title = fullReceiver.title || "";
//         const designation = fullReceiver.designation || "Officer";
//         const station = fullReceiver.station || "Police Department";

//         doc.text(designation, 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${title} ${name}`.trim(), 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${station}, Chandrapur`, 20, yPos);
//     } 
//     else {
//         doc.text("The Station House Officer,", 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${receiver.targetName}, Chandrapur`, 20, yPos);
//     }

//     yPos += 12;
//     doc.setFont("times", "bold");
//     doc.text("Subject:", 20, yPos);
//     doc.setFont("times", "normal");
//     const splitSubject = doc.splitTextToSize(notice.subject, 150);
//     doc.text(splitSubject, 45, yPos);
//     yPos += (splitSubject.length * 6) + 10;

//     let salutation = "Respected Sir/Madam,";
//     if (receiver.type !== 'station') {
//         if (fullReceiver.gender === 'Male' || fullReceiver.title === 'Mr.') salutation = "Respected Sir,";
//         if (fullReceiver.gender === 'Female' || fullReceiver.title === 'Mrs.' || fullReceiver.title === 'Ms.') salutation = "Respected Madam,";
//     } else {
//         salutation = "Respected Officer In-Charge,";
//     }
    
//     doc.text(salutation, 20, yPos);
//     yPos += 10;

//     doc.setFontSize(12);
//     const splitIntro = doc.splitTextToSize(config.intro, 170);
//     doc.text(splitIntro, 20, yPos);
//     yPos += (splitIntro.length * 6) + 6;

//     const splitMain = doc.splitTextToSize(notice.body, 170);
//     doc.text(splitMain, 20, yPos);
//     yPos += (splitMain.length * 6) + 6;

//     const splitOutro = doc.splitTextToSize(config.outro, 170);
//     doc.text(splitOutro, 20, yPos);
//     yPos += (splitOutro.length * 6) + 20;

//     if (yPos > 230) { doc.addPage(); yPos = 30; }

//     const footerX = 140;
//     doc.setFont("times", "bold");
//     doc.text(config.closing, footerX, yPos);
//     yPos += 5;

//     if (notice.signatureUrl) {
//         try {
//             const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
//             if (sigImg) {
//                 doc.addImage(sigImg, "PNG", footerX, yPos, 35, 18);
//                 yPos += 20;
//             } else {
//                 yPos += 15;
//                 doc.setFont("times", "italic");
//                 doc.setFontSize(9);
//                 doc.text("[Digital Signature Verified]", footerX, yPos);
//             }
//         } catch (e) {
//             yPos += 15;
//             doc.text("[Signed]", footerX, yPos);
//         }
//     } else {
//         yPos += 20;
//     }

//     const senderName = sender.name;
//     doc.setFont("times", "bold");
//     doc.setFontSize(11);
//     doc.text(senderName, footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     doc.setFont("times", "normal");
//     doc.setFontSize(10);
//     doc.text(sender.designation || "Officer", footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     if (isSeniorOfficer(sender.designation)) {
//         doc.text("Chandrapur District", footerX + 20, yPos, { align: "center" });
//     } else {
//         doc.text(`${sender.station}, Chandrapur`, footerX + 20, yPos, { align: "center" });
//     }

//     const pageHeight = doc.internal.pageSize.height;
//     doc.setDrawColor(150);
//     doc.setLineWidth(0.2);
//     doc.line(10, pageHeight - 15, 200, pageHeight - 15);
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("Generated by CrimeTrack | Valid Official Document under IT Act.", 105, pageHeight - 10, null, null, "center");

//     doc.save(`${type}_${notice._id}.pdf`);
// };

// // ==========================================
// // 4. MAIN COMPONENT (ENHANCED UI)
// // ==========================================

// const NoticeLayout = ({ userRole }) => {
//   const [view, setView] = useState("inbox");
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//       docType: "Notice",
//       receiverType: "citizen",
//       subject: "",
//       body: ""
//   });
  
//   const [selectedReceivers, setSelectedReceivers] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [signature, setSignature] = useState(null);

//   const fetchNotices = async (type) => {
//       setLoading(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const endpoint = type === 'sent' ? 'sent' : 'inbox';
//           const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setNotices(data);
//       } catch (error) { toast.error("Load failed"); }
//       finally { setLoading(false); }
//   };

//   useEffect(() => {
//       if(view === 'inbox' || view === 'sent') fetchNotices(view);
//   }, [view]);

//   const handleDownload = (notice) => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const loadToast = toast.loading("Downloading Document...");
//       generatePDF(notice, userInfo.token)
//         .then(() => toast.success("Downloaded", { id: loadToast }))
//         .catch(() => toast.error("Error", { id: loadToast }));
//   };

//   const handleSearch = async (overrideQuery = null) => {
//       const query = overrideQuery !== null ? overrideQuery : searchQuery;
//       setIsSearching(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const role = formData.receiverType === 'citizen' ? 'citizen' : 'police';
          
//           const apiRole = formData.receiverType === 'station' ? 'station' : role;

//           const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${apiRole}&query=${query}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setSearchResults(data);
//       } catch (error) { toast.error("Search failed"); }
//       finally { setIsSearching(false); }
//   };

//   const isSelected = (id) => selectedReceivers.some(r => r.id === id);

//   const toggleReceiver = (item) => {
//       if (isSelected(item._id)) {
//           setSelectedReceivers(selectedReceivers.filter(r => r.id !== item._id));
//       } else {
//           const itemName = item.name ? item.name : `${item.firstName} ${item.lastName}`;
//           setSelectedReceivers([...selectedReceivers, { 
//               id: item._id, 
//               name: itemName, 
//               role: formData.receiverType,
//               photo: item.idPhoto 
//           }]);
//       }
//   };

//   const handleSelectAll = () => {
//       if (selectedReceivers.length === searchResults.length) {
//           setSelectedReceivers([]); 
//       } else {
//           const all = searchResults.map(item => ({
//               id: item._id,
//               name: item.name ? item.name : `${item.firstName} ${item.lastName}`,
//               role: formData.receiverType,
//               photo: item.idPhoto
//           }));
//           setSelectedReceivers(all);
//       }
//   };

//   const handleSend = async (e) => {
//       e.preventDefault();
      
//       if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select receiver");
//       if(formData.receiverType === 'station' && selectedReceivers.length === 0) return toast.error("Search & Select Station");

//       const loadToast = toast.loading("Dispatching Official Documents...");
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const targets = selectedReceivers;

//           for (const target of targets) {
//               const payload = new FormData();
//               payload.append("docType", formData.docType);
//               payload.append("receiverType", formData.receiverType);
              
//               const idToSend = formData.receiverType === 'station' ? target.name : target.id;
              
//               payload.append("targetId", idToSend);
//               payload.append("subject", formData.subject);
//               payload.append("body", formData.body);
//               if(signature) payload.append("signature", signature);

//               await axios.post(`${BASE_URL}/api/notices/send`, payload, {
//                   headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
//               });
//           }
          
//           toast.success(`Dispatched ${targets.length} documents.`, { id: loadToast });
//           setView("sent");
//           setSelectedReceivers([]);
//           setSearchQuery("");
//           setSearchResults([]);
//           setSignature(null);
//           setFormData({ ...formData, subject: "", body: "" });
//       } catch (error) { toast.error("Dispatch Failed", { id: loadToast }); }
//   };

//   return (
//     <div className="h-full flex flex-col font-sans bg-slate-950 text-slate-100 p-2 md:p-6 overflow-hidden">
        
//         {/* --- 1. HEADER (Glassmorphism & Gradient Tabs) --- */}
//         <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-slate-700/50 shadow-2xl">
//             <div className="flex items-center gap-4 mb-4 md:mb-0">
//                 <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/20">
//                     <FaUniversity className="text-white text-2xl" />
//                 </div>
//                 <div>
//                     <h2 className="text-2xl font-bold text-white tracking-wide">Official Dispatch</h2>
//                     <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Secure Communication Channel</p>
//                 </div>
//             </div>

//             <div className="flex gap-3 bg-slate-950/50 p-1.5 rounded-xl border border-slate-800">
//                 <button onClick={() => setView("inbox")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${view === 'inbox' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
//                     <FaInbox className="text-lg" /> Inbox
//                 </button>
//                 {userRole !== 'citizen' && (
//                     <>
//                         <button onClick={() => setView("compose")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${view === 'compose' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
//                             <FaFeatherAlt className="text-lg" /> Compose
//                         </button>
//                         <button onClick={() => setView("sent")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${view === 'sent' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
//                             <FaPaperPlane className="text-lg" /> Sent
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>

//         {/* --- 2. LIST VIEW (Enhanced Cards) --- */}
//         {(view === 'inbox' || view === 'sent') && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 pb-20">
//                 {loading ? (
//                     <div className="text-center py-20 flex flex-col items-center">
//                         <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//                         <p className="text-slate-400 animate-pulse font-medium">Retrieving secured documents...</p>
//                     </div>
//                 ) : notices.length === 0 ? (
//                     <div className="text-center py-20 bg-slate-900/40 rounded-3xl border-2 border-dashed border-slate-800">
//                         <FaInbox className="text-6xl text-slate-700 mx-auto mb-4"/>
//                         <p className="text-slate-500 font-medium">No official records found in this category.</p>
//                     </div>
//                 ) : (
//                     notices.map(notice => (
//                         <div key={notice._id} className="relative group bg-slate-900/80 backdrop-blur-md border border-slate-700/60 p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1">
//                             {/* Type Badge */}
//                             <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-2xl transition-all ${notice.docType === 'Notice' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                            
//                             <div className="flex justify-between items-start mb-4 pl-4">
//                                 <div>
//                                     <div className="flex items-center gap-3 mb-2">
//                                         <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full border shadow-sm tracking-wide ${notice.docType === 'Notice' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
//                                             {notice.docType}
//                                         </span>
//                                         <span className="text-xs text-slate-500 font-mono">{new Date(notice.createdAt).toLocaleDateString()}</span>
//                                     </div>
//                                     <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{notice.subject}</h3>
//                                 </div>
//                                 <button onClick={() => handleDownload(notice)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all border border-slate-600 hover:border-blue-500 shadow-sm active:scale-95">
//                                     <FaFilePdf className="text-lg text-red-400" /> <span className="hidden sm:inline">Download PDF</span>
//                                 </button>
//                             </div>

//                             <div className="pl-4 flex flex-wrap gap-4 text-xs text-slate-400 mb-4 items-center">
//                                 <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
//                                     <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><FaUserShield/></div>
//                                     <span>From: <b className="text-slate-200">{notice.sender.name}</b> ({notice.sender.designation})</span>
//                                 </div>
//                                 <div className="hidden sm:block text-slate-700">→</div>
//                                 <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
//                                     <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><FaUser/></div>
//                                     <span>To: <b className="text-slate-200">{notice.receiver.targetName}</b></span>
//                                 </div>
//                             </div>

//                             <div className="pl-4">
//                                 <p className="text-sm text-slate-400 bg-slate-950/30 p-4 rounded-xl border border-slate-800/50 italic line-clamp-2">"{notice.body}"</p>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         )}

//         {/* --- 3. COMPOSE VIEW (Modern Form) --- */}
//         {view === 'compose' && (
//             <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 pr-2">
//                 <form onSubmit={handleSend} className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
//                     {/* Decorative Background Blur */}
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
                    
//                     <h3 className="text-2xl font-black text-white mb-8 border-b border-slate-700 pb-5 flex items-center gap-3 relative z-10">
//                         <span className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-lg shadow-emerald-500/20">
//                             <FaFeatherAlt className="text-white text-lg"/>
//                         </span>
//                         Draft New Document
//                     </h3>
                    
//                     {/* Controls Row */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
//                         <div className="group">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider group-focus-within:text-emerald-400 transition-colors">Document Type</label>
//                             <div className="relative">
//                                 <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 pl-5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none appearance-none font-medium transition-all shadow-inner" value={formData.docType} onChange={e=>setFormData({...formData, docType: e.target.value})}>
//                                     <option>Notice</option>
//                                     <option>Application</option>
//                                     <option>Circular</option>
//                                 </select>
//                                 <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs">▼</div>
//                             </div>
//                         </div>
//                         <div className="group">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider group-focus-within:text-emerald-400 transition-colors">Recipient Group</label>
//                             <div className="relative">
//                                 <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 pl-5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none appearance-none font-medium transition-all shadow-inner" value={formData.receiverType} onChange={e=>{setFormData({...formData, receiverType: e.target.value}); setSelectedReceivers([]); setSearchQuery(""); setSearchResults([]);}}>
//                                     <option value="citizen">Citizens</option>
//                                     <option value="officer">Police Officers</option>
//                                     <option value="station">Police Station</option>
//                                 </select>
//                                 <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs">▼</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Selected Users Chips */}
//                     {selectedReceivers.length > 0 && (
//                         <div className="mb-6 animate-fade-in-up relative z-10">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Selected Recipients ({selectedReceivers.length})</label>
//                             <div className="flex flex-wrap gap-3 max-h-32 overflow-y-auto custom-scrollbar p-3 bg-slate-950/50 rounded-xl border border-slate-800 inner-shadow">
//                                 {selectedReceivers.map(r => (
//                                     <div key={r.id} className="flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white text-xs pl-1 pr-3 py-1.5 rounded-full shadow-md group hover:border-red-500/50 transition-all">
//                                         {r.role !== 'station' ? (
//                                             <img src={r.photo || "https://placehold.co/100"} className="w-7 h-7 rounded-full object-cover border border-slate-600" alt=""/>
//                                         ) : (
//                                             <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center"><FaBuilding className="text-slate-400 text-xs"/></div>
//                                         )}
//                                         <span className="font-semibold tracking-wide">{r.name}</span>
//                                         <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="text-slate-500 hover:text-red-400 ml-1 transition-colors"><FaTimes /></button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Search / Station Input */}
//                     <div className="mb-8 relative z-10">
//                         <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">
//                             {formData.receiverType === 'station' ? "Target Police Station" : "Search Receiver"}
//                         </label>
//                         <div className="flex gap-3 relative">
//                             <div className="relative flex-1 group">
//                                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors text-lg">
//                                     {formData.receiverType === 'station' ? <FaBuilding/> : <FaSearch/>}
//                                 </div>
//                                 <input 
//                                     type="text" 
//                                     className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 pl-12 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600 shadow-inner" 
//                                     placeholder={formData.receiverType === 'station' ? "Type exact station name..." : "Search by name or email..."} 
//                                     value={searchQuery} 
//                                     onChange={e=>setSearchQuery(e.target.value)} 
//                                 />
//                             </div>
                            
//                             <button type="button" onClick={() => handleSearch()} className="bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-8 rounded-xl text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/30 active:scale-95">
//                                 {isSearching ? <FaSpinner className="animate-spin"/> : "Find"}
//                             </button>
//                         </div>

//                         {/* Search Results Dropdown */}
//                         {searchResults.length > 0 && (
//                             <div className="mt-4 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-700 overflow-hidden shadow-2xl animate-fade-in-up ring-1 ring-black/50">
//                                 <div className="flex justify-between items-center p-3 bg-slate-950/50 border-b border-slate-800">
//                                     <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{searchResults.length} matches found</span>
//                                     <button type="button" onClick={handleSelectAll} className="text-xs text-slate-300 hover:text-white font-bold flex items-center gap-1 transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg">
//                                         <FaCheckDouble /> {selectedReceivers.length === searchResults.length ? "Deselect All" : "Select All"}
//                                     </button>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 max-h-64 overflow-y-auto custom-scrollbar">
//                                     {searchResults.map(u => {
//                                         const active = isSelected(u._id);
//                                         const isPoliceOrSenior = u.role === 'police' || u.role === 'senior';
                                        
//                                         return (
//                                             <div 
//                                                 key={u._id} 
//                                                 onClick={() => toggleReceiver(u)} 
//                                                 className={`
//                                                     flex items-center gap-4 p-4 cursor-pointer transition-all bg-slate-900 hover:bg-slate-800
//                                                     ${active ? 'bg-indigo-900/30 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'}
//                                                 `}
//                                             >
//                                                 <div className={`w-12 h-12 rounded-full p-0.5 shadow-lg ${active ? 'bg-indigo-500' : 'bg-slate-700'}`}>
//                                                     <img src={u.idPhoto || "https://placehold.co/100"} className="w-full h-full rounded-full object-cover bg-slate-800" alt=""/>
//                                                 </div>
//                                                 <div className="min-w-0">
//                                                     <h4 className={`text-sm font-bold truncate ${active ? 'text-indigo-300' : 'text-white'}`}>
//                                                         {u.firstName} {u.lastName}
//                                                     </h4>
//                                                     <p className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
//                                                         {isPoliceOrSenior ? <><FaUserShield className="text-[10px] text-indigo-400"/> {u.designation}</> : <><FaUser className="text-[10px] text-emerald-400"/> {u.email}</>}
//                                                     </p>
//                                                 </div>
//                                                 {active && <div className="ml-auto w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg"><FaCheckDouble/></div>}
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Subject & Body */}
//                     <div className="space-y-6 mb-8 relative z-10">
//                         <div className="group">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider group-focus-within:text-emerald-400 transition-colors">Subject Line</label>
//                             <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all shadow-inner" placeholder="Enter a clear & concise subject..." required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
//                         </div>
                        
//                         <div>
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Content Body</label>
//                             <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 text-sm text-gray-400 shadow-inner relative">
//                                 <div className="absolute top-0 right-0 bg-slate-800 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-slate-500 border-l border-b border-slate-700">PREVIEW MODE</div>
//                                 <p className="mb-4 text-emerald-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><FaPenNib/> Auto-Formatted Structure</p>
//                                 <p className="italic opacity-60 mb-4 pl-4 border-l-2 border-slate-700">"{DOC_CONFIG[formData.docType].intro}"</p>
//                                 <textarea 
//                                     className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white h-40 resize-none focus:border-emerald-500 outline-none font-sans text-base leading-relaxed focus:shadow-lg transition-all" 
//                                     placeholder="Type your main message content here..." 
//                                     required 
//                                     value={formData.body} 
//                                     onChange={e=>setFormData({...formData, body: e.target.value})}
//                                 ></textarea>
//                                 <p className="italic opacity-60 mt-4 pl-4 border-l-2 border-slate-700">"{DOC_CONFIG[formData.docType].outro}"</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Signature */}
//                     <div className="mb-8 p-6 bg-slate-950/30 rounded-2xl border-2 border-slate-700 border-dashed hover:border-emerald-500/50 transition-colors relative z-10 group">
//                         <label className="text-sm font-bold text-slate-300 uppercase mb-3 block flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
//                             <FaFilePdf className="text-lg"/> Digital Signature
//                         </label>
//                         <div className="flex items-center gap-4">
//                             <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer transition-all"/>
//                         </div>
//                         <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span> Upload transparent PNG signature for authentication.</p>
//                     </div>

//                     <button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-900/30 transition-all flex justify-center items-center gap-3 text-lg transform active:scale-[0.98] relative overflow-hidden group">
//                         <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
//                         <FaPaperPlane className="relative z-10" /> 
//                         <span className="relative z-10">DISPATCH OFFICIAL DOCUMENT</span>
//                         <span className="relative z-10 bg-black/20 px-3 py-0.5 rounded-full text-sm font-medium">
//                             {selectedReceivers.length > 0 ? selectedReceivers.length : (formData.receiverType === 'station' ? 'All Station' : 0)}
//                         </span>
//                     </button>
//                 </form>
//             </div>
//         )}
//     </div>
//   );
// };

// export default NoticeLayout;















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";
// import { useNavigate, useParams, useLocation } from "react-router-dom"; // ✅ ROUTING IMPORTS
// import { 
//   FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
//   FaTimes, FaUserCheck, FaCheckDouble, FaUserShield, FaUser, FaBuilding,
//   FaPenNib, FaBriefcase, FaIdCard, FaUniversity, FaArrowLeft // ✅ ADDED BACK ICON
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // ==========================================
// // 1. OFFICIAL TEXT CONFIGURATION (UNCHANGED)
// // ==========================================
// const DOC_CONFIG = {
//     'Notice': {
//         title: "OFFICIAL NOTICE",
//         intro: "You are hereby officially informed regarding the subject cited above. This notice serves as a formal communication from the department requiring your immediate attention. Please take note of the specific details mentioned herein.",
//         outro: "Failure to comply with the instructions mentioned in this notice may result in further legal or departmental action as per the procedure established by law. Treat this correspondence as urgent.",
//         closing: "Issued By,"
//     },
//     'Application': {
//         title: "FORMAL APPLICATION",
//         intro: "I am writing to formally submit this application regarding the subject mentioned above. This correspondence is generated via the official CrimeTrack portal for your perusal, consideration, and necessary action.",
//         outro: "I request your cooperation and a timely response regarding this matter. We are committed to maintaining departmental coordination and expect a favorable resolution to this request.",
//         closing: "Yours faithfully,"
//     },
//     'Circular': {
//         title: "DEPARTMENT CIRCULAR",
//         intro: "This circular is issued to bring specific information and directives to the notice of all concerned personnel within the jurisdiction. The details provided below are of administrative importance.",
//         outro: "All concerned officers and personnel are instructed to implement these directives with immediate effect. Any deviation from these instructions will be viewed seriously.",
//         closing: "Regards,"
//     }
// };

// const SENIOR_RANKS = [
//     "Commissioner", "Director", "Superintendent", "DCP", "ACP", "SP", "DSP", "IG", "DIG"
// ];

// // ==========================================
// // 2. HELPER FUNCTIONS (UNCHANGED)
// // ==========================================

// const getBase64ImageFromURL = (url) => {
//     return new Promise((resolve) => {
//         if (!url) return resolve(null);
//         const img = new Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = () => resolve(null);
//         img.src = url;
//     });
// };

// const isSeniorOfficer = (designation) => {
//     if (!designation) return false;
//     return SENIOR_RANKS.some(rank => designation.includes(rank));
// };

// // ==========================================
// // 3. PDF GENERATION ENGINE (UNCHANGED)
// // ==========================================

// const generatePDF = async (notice, userInfoToken) => {
//     const doc = new jsPDF();
//     const type = notice.docType; 
//     const sender = notice.sender;
//     const receiver = notice.receiver;
//     const config = DOC_CONFIG[type];
//     const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

//     let fullReceiver = {};
//     if (receiver.type !== 'station') {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${receiver.type}&query=${receiver.targetId}`, {
//                 headers: { Authorization: `Bearer ${userInfoToken}` }
//             });
//             fullReceiver = data.find(u => u._id === receiver.targetId) || {};
//         } catch (e) { console.error("Fetch Error", e); }
//     } else {
//         fullReceiver = { station: receiver.targetId }; 
//     }

//     doc.setFillColor(235, 247, 235); 
//     doc.rect(5, 5, 200, 38, 'F'); 
//     doc.setDrawColor(20, 100, 20); 
//     doc.setLineWidth(0.5);
//     doc.rect(5, 5, 200, 38);

//     const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
//     const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");
//     if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 9, 30, 30);
//     if (policeLogo) doc.addImage(policeLogo, "PNG", 168, 9, 30, 30);

//     doc.setFont("times", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor(15, 70, 15);
//     doc.text("MAHARASHTRA STATE POLICE", 105, 18, null, null, "center");

//     doc.setFontSize(10);
//     doc.setFont("times", "normal");
//     doc.setTextColor(0);
//     doc.text("Official Digital Communication | CrimeTrack System", 105, 26, null, null, "center");
    
//     doc.setFontSize(12);
//     doc.setFont("times", "bold");
//     doc.text("GOVERNMENT OF MAHARASHTRA", 105, 33, null, null, "center");

//     doc.setFontSize(16);
//     doc.setFont("times", "bold");
//     doc.setTextColor(0);
//     doc.text(config.title, 105, 55, null, null, "center");
//     doc.setLineWidth(0.5);
//     doc.line(75, 57, 135, 57); 

//     doc.setFontSize(11);
//     doc.text(`Date: ${date}`, 190, 68, { align: "right" });
//     doc.text(`Ref: CT/${new Date().getFullYear()}/${notice._id.slice(-6).toUpperCase()}`, 20, 68);

//     doc.setFont("times", "bold");
//     doc.text("To,", 20, 82);
//     doc.setFont("times", "normal");

//     let yPos = 88;
//     const lineHeight = 6;

//     if (receiver.type === 'citizen') {
//         const name = fullReceiver.firstName 
//             ? `${fullReceiver.firstName} ${fullReceiver.lastName}` 
//             : receiver.targetName;
            
//         const title = fullReceiver.title || ""; 
//         const displayName = title ? `${title} ${name}` : name;

//         doc.text(displayName, 20, yPos);
//         yPos += lineHeight;
        
//         if (fullReceiver.aadhar) {
//             doc.text(`Aadhaar No: ${fullReceiver.aadhar}`, 20, yPos);
//             yPos += lineHeight;
//         }
//         doc.text("Chandrapur District", 20, yPos);
//     } 
//     else if (receiver.type === 'officer') {
//         const name = fullReceiver.firstName 
//             ? `${fullReceiver.firstName} ${fullReceiver.lastName}` 
//             : receiver.targetName;
            
//         const title = fullReceiver.title || "";
//         const designation = fullReceiver.designation || "Officer";
//         const station = fullReceiver.station || "Police Department";

//         doc.text(designation, 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${title} ${name}`.trim(), 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${station}, Chandrapur`, 20, yPos);
//     } 
//     else {
//         doc.text("The Station House Officer,", 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${receiver.targetName}, Chandrapur`, 20, yPos);
//     }

//     yPos += 12;
//     doc.setFont("times", "bold");
//     doc.text("Subject:", 20, yPos);
//     doc.setFont("times", "normal");
//     const splitSubject = doc.splitTextToSize(notice.subject, 150);
//     doc.text(splitSubject, 45, yPos);
//     yPos += (splitSubject.length * 6) + 10;

//     let salutation = "Respected Sir/Madam,";
//     if (receiver.type !== 'station') {
//         if (fullReceiver.gender === 'Male' || fullReceiver.title === 'Mr.') salutation = "Respected Sir,";
//         if (fullReceiver.gender === 'Female' || fullReceiver.title === 'Mrs.' || fullReceiver.title === 'Ms.') salutation = "Respected Madam,";
//     } else {
//         salutation = "Respected Officer In-Charge,";
//     }
    
//     doc.text(salutation, 20, yPos);
//     yPos += 10;

//     doc.setFontSize(12);
//     const splitIntro = doc.splitTextToSize(config.intro, 170);
//     doc.text(splitIntro, 20, yPos);
//     yPos += (splitIntro.length * 6) + 6;

//     const splitMain = doc.splitTextToSize(notice.body, 170);
//     doc.text(splitMain, 20, yPos);
//     yPos += (splitMain.length * 6) + 6;

//     const splitOutro = doc.splitTextToSize(config.outro, 170);
//     doc.text(splitOutro, 20, yPos);
//     yPos += (splitOutro.length * 6) + 20;

//     if (yPos > 230) { doc.addPage(); yPos = 30; }

//     const footerX = 140;
//     doc.setFont("times", "bold");
//     doc.text(config.closing, footerX, yPos);
//     yPos += 5;

//     if (notice.signatureUrl) {
//         try {
//             const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
//             if (sigImg) {
//                 doc.addImage(sigImg, "PNG", footerX, yPos, 35, 18);
//                 yPos += 20;
//             } else {
//                 yPos += 15;
//                 doc.setFont("times", "italic");
//                 doc.setFontSize(9);
//                 doc.text("[Digital Signature Verified]", footerX, yPos);
//             }
//         } catch (e) {
//             yPos += 15;
//             doc.text("[Signed]", footerX, yPos);
//         }
//     } else {
//         yPos += 20;
//     }

//     const senderName = sender.name;
//     doc.setFont("times", "bold");
//     doc.setFontSize(11);
//     doc.text(senderName, footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     doc.setFont("times", "normal");
//     doc.setFontSize(10);
//     doc.text(sender.designation || "Officer", footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     if (isSeniorOfficer(sender.designation)) {
//         doc.text("Chandrapur District", footerX + 20, yPos, { align: "center" });
//     } else {
//         doc.text(`${sender.station}, Chandrapur`, footerX + 20, yPos, { align: "center" });
//     }

//     const pageHeight = doc.internal.pageSize.height;
//     doc.setDrawColor(150);
//     doc.setLineWidth(0.2);
//     doc.line(10, pageHeight - 15, 200, pageHeight - 15);
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("Generated by CrimeTrack | Valid Official Document under IT Act.", 105, pageHeight - 10, null, null, "center");

//     doc.save(`${type}_${notice._id}.pdf`);
// };

// // ==========================================
// // 4. MAIN COMPONENT (ENHANCED UI + ROUTING)
// // ==========================================

// const NoticeLayout = ({ userRole }) => {
//   // ✅ ROUTER INTEGRATION
//   const navigate = useNavigate();
//   const { section } = useParams(); // Should correspond to :section in Route
  
//   // If no section param, default to 'inbox'. 
//   // 'view' state now derived from URL, so refreshing page keeps you on same tab.
//   const view = section || "inbox"; 

//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//       docType: "Notice",
//       receiverType: "citizen",
//       subject: "",
//       body: ""
//   });
  
//   const [selectedReceivers, setSelectedReceivers] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [signature, setSignature] = useState(null);

//   // ✅ HANDLER: Navigate instead of setting state
//   const handleTabChange = (newView) => {
//       navigate(`/official-docs/${newView}`);
//   };

//   // ✅ FETCH DATA: Triggers when 'view' (URL) changes
//   const fetchNotices = async (currentView) => {
//       if (currentView !== 'inbox' && currentView !== 'sent') return;
      
//       setLoading(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const endpoint = currentView === 'sent' ? 'sent' : 'inbox';
//           const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setNotices(data);
//       } catch (error) { toast.error("Load failed"); }
//       finally { setLoading(false); }
//   };

//   useEffect(() => {
//       fetchNotices(view);
//   }, [view]);

//   const handleDownload = (notice) => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const loadToast = toast.loading("Downloading Document...");
//       generatePDF(notice, userInfo.token)
//         .then(() => toast.success("Downloaded", { id: loadToast }))
//         .catch(() => toast.error("Error", { id: loadToast }));
//   };

//   const handleSearch = async (overrideQuery = null) => {
//       const query = overrideQuery !== null ? overrideQuery : searchQuery;
//       setIsSearching(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const role = formData.receiverType === 'citizen' ? 'citizen' : 'police';
//           const apiRole = formData.receiverType === 'station' ? 'station' : role;

//           const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${apiRole}&query=${query}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setSearchResults(data);
//       } catch (error) { toast.error("Search failed"); }
//       finally { setIsSearching(false); }
//   };

//   const isSelected = (id) => selectedReceivers.some(r => r.id === id);

//   const toggleReceiver = (item) => {
//       if (isSelected(item._id)) {
//           setSelectedReceivers(selectedReceivers.filter(r => r.id !== item._id));
//       } else {
//           const itemName = item.name ? item.name : `${item.firstName} ${item.lastName}`;
//           setSelectedReceivers([...selectedReceivers, { 
//               id: item._id, 
//               name: itemName, 
//               role: formData.receiverType,
//               photo: item.idPhoto 
//           }]);
//       }
//   };

//   const handleSelectAll = () => {
//       if (selectedReceivers.length === searchResults.length) {
//           setSelectedReceivers([]); 
//       } else {
//           const all = searchResults.map(item => ({
//               id: item._id,
//               name: item.name ? item.name : `${item.firstName} ${item.lastName}`,
//               role: formData.receiverType,
//               photo: item.idPhoto
//           }));
//           setSelectedReceivers(all);
//       }
//   };

//   const handleSend = async (e) => {
//       e.preventDefault();
      
//       if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select receiver");
//       if(formData.receiverType === 'station' && selectedReceivers.length === 0) return toast.error("Search & Select Station");

//       const loadToast = toast.loading("Dispatching Official Documents...");
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const targets = selectedReceivers;

//           for (const target of targets) {
//               const payload = new FormData();
//               payload.append("docType", formData.docType);
//               payload.append("receiverType", formData.receiverType);
              
//               const idToSend = formData.receiverType === 'station' ? target.name : target.id;
              
//               payload.append("targetId", idToSend);
//               payload.append("subject", formData.subject);
//               payload.append("body", formData.body);
//               if(signature) payload.append("signature", signature);

//               await axios.post(`${BASE_URL}/api/notices/send`, payload, {
//                   headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
//               });
//           }
          
//           toast.success(`Dispatched ${targets.length} documents.`, { id: loadToast });
//           handleTabChange("sent"); // ✅ Redirect using route
//           setSelectedReceivers([]);
//           setSearchQuery("");
//           setSearchResults([]);
//           setSignature(null);
//           setFormData({ ...formData, subject: "", body: "" });
//       } catch (error) { toast.error("Dispatch Failed", { id: loadToast }); }
//   };

//   return (
//     // ✅ BACKGROUND IMAGE & FULL SCREEN LAYOUT
//     <div 
//         className="h-full min-h-screen flex flex-col font-sans text-slate-100 p-2 md:p-6 overflow-hidden bg-contain bg-center bg-fixed relative"
//         style={{ backgroundImage: "url('/assets/police-bg.png')" }} // 👈 Put your image in public/assets/police-bg.jpg
//     >
//         {/* Dark Overlay for Readability */}
//         <div className="absolute inset-0 bg-slate-950/90 pointer-events-none"></div>

//         {/* ✅ STICKY BACK BUTTON */}
//         <button 
//             onClick={() => navigate(-1)} 
//             className="fixed top-24 left-4 z-50 bg-slate-800/80 backdrop-blur text-white p-3 rounded-full shadow-lg border border-slate-600 hover:bg-indigo-600 transition-all group"
//             title="Go Back"
//         >
//             <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform"/>
//         </button>

//         {/* Content Wrapper (Relative to sit above overlay) */}
//         <div className="relative z-10 h-full flex flex-col">
            
//             {/* --- 1. HEADER (Glassmorphism & Gradient Tabs) --- */}
//             <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-slate-700/50 shadow-2xl pl-16"> {/* pl-16 for back button space */}
//                 <div className="flex items-center gap-4 mb-4 md:mb-0">
//                     <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/20">
//                         <FaUniversity className="text-white text-2xl" />
//                     </div>
//                     <div>
//                         <h2 className="text-2xl font-bold text-white tracking-wide">Official Dispatch</h2>
//                         <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Secure Communication Channel</p>
//                     </div>
//                 </div>

//                 {/* ✅ ROUTE-BASED TABS */}
//                 <div className="flex gap-3 bg-slate-950/50 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
//                     <button onClick={() => handleTabChange("inbox")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${view === 'inbox' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
//                         <FaInbox className="text-lg" /> Inbox
//                     </button>
//                     {userRole !== 'citizen' && (
//                         <>
//                             <button onClick={() => handleTabChange("compose")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${view === 'compose' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
//                                 <FaFeatherAlt className="text-lg" /> Compose
//                             </button>
//                             <button onClick={() => handleTabChange("sent")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${view === 'sent' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
//                                 <FaPaperPlane className="text-lg" /> Sent
//                             </button>
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* --- 2. LIST VIEW --- */}
//             {(view === 'inbox' || view === 'sent') && (
//                 <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 pb-20">
//                     {loading ? (
//                         <div className="text-center py-20 flex flex-col items-center">
//                             <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//                             <p className="text-slate-400 animate-pulse font-medium">Retrieving secured documents...</p>
//                         </div>
//                     ) : notices.length === 0 ? (
//                         <div className="text-center py-20 bg-slate-900/40 rounded-3xl border-2 border-dashed border-slate-800">
//                             <FaInbox className="text-6xl text-slate-700 mx-auto mb-4"/>
//                             <p className="text-slate-500 font-medium">No official records found in this category.</p>
//                         </div>
//                     ) : (
//                         notices.map(notice => (
//                             <div key={notice._id} className="relative group bg-slate-900/80 backdrop-blur-md border border-slate-700/60 p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1">
//                                 <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-2xl transition-all ${notice.docType === 'Notice' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                
//                                 <div className="flex justify-between items-start mb-4 pl-4">
//                                     <div>
//                                         <div className="flex items-center gap-3 mb-2">
//                                             <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full border shadow-sm tracking-wide ${notice.docType === 'Notice' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
//                                                 {notice.docType}
//                                             </span>
//                                             <span className="text-xs text-slate-500 font-mono">{new Date(notice.createdAt).toLocaleDateString()}</span>
//                                         </div>
//                                         <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{notice.subject}</h3>
//                                     </div>
//                                     <button onClick={() => handleDownload(notice)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all border border-slate-600 hover:border-blue-500 shadow-sm active:scale-95">
//                                         <FaFilePdf className="text-lg text-red-400" /> <span className="hidden sm:inline">Download PDF</span>
//                                     </button>
//                                 </div>

//                                 <div className="pl-4 flex flex-wrap gap-4 text-xs text-slate-400 mb-4 items-center">
//                                     <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
//                                         <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><FaUserShield/></div>
//                                         <span>From: <b className="text-slate-200">{notice.sender.name}</b> ({notice.sender.designation})</span>
//                                     </div>
//                                     <div className="hidden sm:block text-slate-700">→</div>
//                                     <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
//                                         <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><FaUser/></div>
//                                         <span>To: <b className="text-slate-200">{notice.receiver.targetName}</b></span>
//                                     </div>
//                                 </div>

//                                 <div className="pl-4">
//                                     <p className="text-sm text-slate-400 bg-slate-950/30 p-4 rounded-xl border border-slate-800/50 italic line-clamp-2">"{notice.body}"</p>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             )}

//             {/* --- 3. COMPOSE VIEW --- */}
//             {view === 'compose' && (
//                 <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 pr-2">
//                     <form onSubmit={handleSend} className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
//                         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
                        
//                         <h3 className="text-2xl font-black text-white mb-8 border-b border-slate-700 pb-5 flex items-center gap-3 relative z-10">
//                             <span className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-lg shadow-emerald-500/20">
//                                 <FaFeatherAlt className="text-white text-lg"/>
//                             </span>
//                             Draft New Document
//                         </h3>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
//                             <div className="group">
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider group-focus-within:text-emerald-400 transition-colors">Document Type</label>
//                                 <div className="relative">
//                                     <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 pl-5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none appearance-none font-medium transition-all shadow-inner" value={formData.docType} onChange={e=>setFormData({...formData, docType: e.target.value})}>
//                                         <option>Notice</option>
//                                         <option>Application</option>
//                                         <option>Circular</option>
//                                     </select>
//                                     <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs">▼</div>
//                                 </div>
//                             </div>
//                             <div className="group">
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider group-focus-within:text-emerald-400 transition-colors">Recipient Group</label>
//                                 <div className="relative">
//                                     <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 pl-5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none appearance-none font-medium transition-all shadow-inner" value={formData.receiverType} onChange={e=>{setFormData({...formData, receiverType: e.target.value}); setSelectedReceivers([]); setSearchQuery(""); setSearchResults([]);}}>
//                                         <option value="citizen">Citizens</option>
//                                         <option value="officer">Police Officers</option>
//                                         <option value="station">Police Station</option>
//                                     </select>
//                                     <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs">▼</div>
//                                 </div>
//                             </div>
//                         </div>

//                         {selectedReceivers.length > 0 && (
//                             <div className="mb-6 animate-fade-in-up relative z-10">
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Selected Recipients ({selectedReceivers.length})</label>
//                                 <div className="flex flex-wrap gap-3 max-h-32 overflow-y-auto custom-scrollbar p-3 bg-slate-950/50 rounded-xl border border-slate-800 inner-shadow">
//                                     {selectedReceivers.map(r => (
//                                         <div key={r.id} className="flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white text-xs pl-1 pr-3 py-1.5 rounded-full shadow-md group hover:border-red-500/50 transition-all">
//                                             {r.role !== 'station' ? (
//                                                 <img src={r.photo || "https://placehold.co/100"} className="w-7 h-7 rounded-full object-cover border border-slate-600" alt=""/>
//                                             ) : (
//                                                 <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center"><FaBuilding className="text-slate-400 text-xs"/></div>
//                                             )}
//                                             <span className="font-semibold tracking-wide">{r.name}</span>
//                                             <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="text-slate-500 hover:text-red-400 ml-1 transition-colors"><FaTimes /></button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         <div className="mb-8 relative z-10">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">
//                                 {formData.receiverType === 'station' ? "Search Police Station" : "Search Receiver"}
//                             </label>
//                             <div className="flex gap-3 relative">
//                                 <div className="relative flex-1 group">
//                                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors text-lg">
//                                         {formData.receiverType === 'station' ? <FaBuilding/> : <FaSearch/>}
//                                     </div>
//                                     <input 
//                                         type="text" 
//                                         className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 pl-12 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600 shadow-inner" 
//                                         placeholder={formData.receiverType === 'station' ? "Type exact station name..." : "Search by name or email..."} 
//                                         value={searchQuery} 
//                                         onChange={e=>setSearchQuery(e.target.value)} 
//                                     />
//                                 </div>
                                
//                                 <button type="button" onClick={() => handleSearch()} className="bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-8 rounded-xl text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/30 active:scale-95">
//                                     {isSearching ? <FaSpinner className="animate-spin"/> : "Find"}
//                                 </button>
//                             </div>

//                             {searchResults.length > 0 && (
//                                 <div className="mt-4 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-700 overflow-hidden shadow-2xl animate-fade-in-up ring-1 ring-black/50">
//                                     <div className="flex justify-between items-center p-3 bg-slate-950/50 border-b border-slate-800">
//                                         <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{searchResults.length} matches found</span>
//                                         <button type="button" onClick={handleSelectAll} className="text-xs text-slate-300 hover:text-white font-bold flex items-center gap-1 transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg">
//                                             <FaCheckDouble /> {selectedReceivers.length === searchResults.length ? "Deselect All" : "Select All"}
//                                         </button>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 max-h-64 overflow-y-auto custom-scrollbar">
//                                         {searchResults.map(u => {
//                                             const active = isSelected(u._id);
//                                             const isPoliceOrSenior = u.role === 'police' || u.role === 'senior';
//                                             const isStation = !u.firstName;
//                                             const displayName = isStation ? u.name : `${u.firstName} ${u.lastName}`;
//                                             const subInfo = isStation ? u.district : (u.role === 'police' || u.role === 'senior' ? u.designation : u.email);
//                                             const photo = isStation ? null : u.idPhoto;

//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleReceiver(u)} 
//                                                     className={`
//                                                         flex items-center gap-4 p-4 cursor-pointer transition-all bg-slate-900 hover:bg-slate-800
//                                                         ${active ? 'bg-indigo-900/30 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'}
//                                                     `}
//                                                 >
//                                                     <div className={`w-12 h-12 rounded-full p-0.5 shadow-lg ${active ? 'bg-indigo-500' : 'bg-slate-700'}`}>
//                                                         {photo ? (
//                                                             <img src={photo} className="w-full h-full rounded-full object-cover bg-slate-800" alt=""/>
//                                                         ) : (
//                                                             <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
//                                                                 {isStation ? <FaBuilding/> : <FaUser/>}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <div className="min-w-0">
//                                                         <h4 className={`text-sm font-bold truncate ${active ? 'text-indigo-300' : 'text-white'}`}>
//                                                             {displayName}
//                                                         </h4>
//                                                         <p className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
//                                                             {isStation ? <FaBuilding className="text-[10px]"/> : (isPoliceOrSenior ? <FaUserShield className="text-[10px] text-indigo-400"/> : <FaUser className="text-[10px] text-emerald-400"/>)}
//                                                             {subInfo}
//                                                         </p>
//                                                     </div>
//                                                     {active && <div className="ml-auto w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg"><FaCheckDouble/></div>}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="space-y-6 mb-8 relative z-10">
//                             <div className="group">
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider group-focus-within:text-emerald-400 transition-colors">Subject Line</label>
//                                 <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all shadow-inner" placeholder="Enter a clear & concise subject..." required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
//                             </div>
                            
//                             <div>
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Content Body</label>
//                                 <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 text-sm text-gray-400 shadow-inner relative">
//                                     <div className="absolute top-0 right-0 bg-slate-800 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-slate-500 border-l border-b border-slate-700">PREVIEW MODE</div>
//                                     <p className="mb-4 text-emerald-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><FaPenNib/> Auto-Formatted Structure</p>
//                                     <p className="italic opacity-60 mb-4 pl-4 border-l-2 border-slate-700">"{DOC_CONFIG[formData.docType].intro}"</p>
//                                     <textarea 
//                                         className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white h-40 resize-none focus:border-emerald-500 outline-none font-sans text-base leading-relaxed focus:shadow-lg transition-all" 
//                                         placeholder="Type your main message content here..." 
//                                         required 
//                                         value={formData.body} 
//                                         onChange={e=>setFormData({...formData, body: e.target.value})}
//                                     ></textarea>
//                                     <p className="italic opacity-60 mt-4 pl-4 border-l-2 border-slate-700">"{DOC_CONFIG[formData.docType].outro}"</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mb-8 p-6 bg-slate-950/30 rounded-2xl border-2 border-slate-700 border-dashed hover:border-emerald-500/50 transition-colors relative z-10 group">
//                             <label className="text-sm font-bold text-slate-300 uppercase mb-3 block flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
//                                 <FaFilePdf className="text-lg"/> Digital Signature
//                             </label>
//                             <div className="flex items-center gap-4">
//                                 <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer transition-all"/>
//                             </div>
//                             <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span> Upload transparent PNG signature for authentication.</p>
//                         </div>

//                         <button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-900/30 transition-all flex justify-center items-center gap-3 text-lg transform active:scale-[0.98] relative overflow-hidden group">
//                             <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
//                             <FaPaperPlane className="relative z-10" /> 
//                             <span className="relative z-10">DISPATCH OFFICIAL DOCUMENT</span>
//                             <span className="relative z-10 bg-black/20 px-3 py-0.5 rounded-full text-sm font-medium">
//                                 {selectedReceivers.length > 0 ? selectedReceivers.length : (formData.receiverType === 'station' ? 'All Station' : 0)}
//                             </span>
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     </div>
//   );
// };

// export default NoticeLayout;
















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";
// import { useNavigate, useParams } from "react-router-dom";
// import { 
//   FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
//   FaTimes, FaCheckDouble, FaUserShield, FaUser, FaBuilding,
//   FaPenNib, FaUniversity, FaArrowLeft
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // ... [KEEP DOC_CONFIG, SENIOR_RANKS, HELPER FUNCTIONS, and generatePDF AS IS] ...
// // (Omitting the PDF logic here to keep the answer focused on UI, paste the previous PDF logic here)

// const DOC_CONFIG = {
//     'Notice': {
//         title: "OFFICIAL NOTICE",
//         intro: "You are hereby officially informed regarding the subject cited above. This notice serves as a formal communication from the department requiring your immediate attention. Please take note of the specific details mentioned herein.",
//         outro: "Failure to comply with the instructions mentioned in this notice may result in further legal or departmental action as per the procedure established by law. Treat this correspondence as urgent.",
//         closing: "Issued By,"
//     },
//     'Application': {
//         title: "FORMAL APPLICATION",
//         intro: "I am writing to formally submit this application regarding the subject mentioned above. This correspondence is generated via the official CrimeTrack portal for your perusal, consideration, and necessary action.",
//         outro: "I request your cooperation and a timely response regarding this matter. We are committed to maintaining departmental coordination and expect a favorable resolution to this request.",
//         closing: "Yours faithfully,"
//     },
//     'Circular': {
//         title: "DEPARTMENT CIRCULAR",
//         intro: "This circular is issued to bring specific information and directives to the notice of all concerned personnel within the jurisdiction. The details provided below are of administrative importance.",
//         outro: "All concerned officers and personnel are instructed to implement these directives with immediate effect. Any deviation from these instructions will be viewed seriously.",
//         closing: "Regards,"
//     }
// };

// const SENIOR_RANKS = [
//     "Commissioner", "Director", "Superintendent", "DCP", "ACP", "SP", "DSP", "IG", "DIG"
// ];

// const getBase64ImageFromURL = (url) => {
//     return new Promise((resolve) => {
//         if (!url) return resolve(null);
//         const img = new Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = () => resolve(null);
//         img.src = url;
//     });
// };

// const isSeniorOfficer = (designation) => {
//     if (!designation) return false;
//     return SENIOR_RANKS.some(rank => designation.includes(rank));
// };

// const generatePDF = async (notice, userInfoToken) => {
//     const doc = new jsPDF();
//     const type = notice.docType; 
//     const sender = notice.sender;
//     const receiver = notice.receiver;
//     const config = DOC_CONFIG[type];
//     const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

//     let fullReceiver = {};
//     if (receiver.type !== 'station') {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${receiver.type}&query=${receiver.targetId}`, {
//                 headers: { Authorization: `Bearer ${userInfoToken}` }
//             });
//             fullReceiver = data.find(u => u._id === receiver.targetId) || {};
//         } catch (e) { console.error("Fetch Error", e); }
//     } else {
//         fullReceiver = { station: receiver.targetId }; 
//     }

//     doc.setFillColor(235, 247, 235); 
//     doc.rect(5, 5, 200, 38, 'F'); 
//     doc.setDrawColor(20, 100, 20); 
//     doc.setLineWidth(0.5);
//     doc.rect(5, 5, 200, 38);

//     const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
//     const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");
//     if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 9, 30, 30);
//     if (policeLogo) doc.addImage(policeLogo, "PNG", 168, 9, 30, 30);

//     doc.setFont("times", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor(15, 70, 15);
//     doc.text("MAHARASHTRA STATE POLICE", 105, 18, null, null, "center");

//     doc.setFontSize(10);
//     doc.setFont("times", "normal");
//     doc.setTextColor(0);
//     doc.text("Official Digital Communication | CrimeTrack System", 105, 26, null, null, "center");
    
//     doc.setFontSize(12);
//     doc.setFont("times", "bold");
//     doc.text("GOVERNMENT OF MAHARASHTRA", 105, 33, null, null, "center");

//     doc.setFontSize(16);
//     doc.setFont("times", "bold");
//     doc.setTextColor(0);
//     doc.text(config.title, 105, 55, null, null, "center");
//     doc.setLineWidth(0.5);
//     doc.line(75, 57, 135, 57); 

//     doc.setFontSize(11);
//     doc.text(`Date: ${date}`, 190, 68, { align: "right" });
//     doc.text(`Ref: CT/${new Date().getFullYear()}/${notice._id.slice(-6).toUpperCase()}`, 20, 68);

//     doc.setFont("times", "bold");
//     doc.text("To,", 20, 82);
//     doc.setFont("times", "normal");

//     let yPos = 88;
//     const lineHeight = 6;

//     if (receiver.type === 'citizen') {
//         const name = fullReceiver.firstName 
//             ? `${fullReceiver.firstName} ${fullReceiver.lastName}` 
//             : receiver.targetName;
            
//         const title = fullReceiver.title || ""; 
//         const displayName = title ? `${title} ${name}` : name;

//         doc.text(displayName, 20, yPos);
//         yPos += lineHeight;
        
//         if (fullReceiver.aadhar) {
//             doc.text(`Aadhaar No: ${fullReceiver.aadhar}`, 20, yPos);
//             yPos += lineHeight;
//         }
//         doc.text("Chandrapur District", 20, yPos);
//     } 
//     else if (receiver.type === 'officer') {
//         const name = fullReceiver.firstName 
//             ? `${fullReceiver.firstName} ${fullReceiver.lastName}` 
//             : receiver.targetName;
            
//         const title = fullReceiver.title || "";
//         const designation = fullReceiver.designation || "Officer";
//         const station = fullReceiver.station || "Police Department";

//         doc.text(designation, 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${title} ${name}`.trim(), 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${station}, Chandrapur`, 20, yPos);
//     } 
//     else {
//         doc.text("The Station House Officer,", 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${receiver.targetName}, Chandrapur`, 20, yPos);
//     }

//     yPos += 12;
//     doc.setFont("times", "bold");
//     doc.text("Subject:", 20, yPos);
//     doc.setFont("times", "normal");
//     const splitSubject = doc.splitTextToSize(notice.subject, 150);
//     doc.text(splitSubject, 45, yPos);
//     yPos += (splitSubject.length * 6) + 10;

//     let salutation = "Respected Sir/Madam,";
//     if (receiver.type !== 'station') {
//         if (fullReceiver.gender === 'Male' || fullReceiver.title === 'Mr.') salutation = "Respected Sir,";
//         if (fullReceiver.gender === 'Female' || fullReceiver.title === 'Mrs.' || fullReceiver.title === 'Ms.') salutation = "Respected Madam,";
//     } else {
//         salutation = "Respected Officer In-Charge,";
//     }
    
//     doc.text(salutation, 20, yPos);
//     yPos += 10;

//     doc.setFontSize(12);
//     const splitIntro = doc.splitTextToSize(config.intro, 170);
//     doc.text(splitIntro, 20, yPos);
//     yPos += (splitIntro.length * 6) + 6;

//     const splitMain = doc.splitTextToSize(notice.body, 170);
//     doc.text(splitMain, 20, yPos);
//     yPos += (splitMain.length * 6) + 6;

//     const splitOutro = doc.splitTextToSize(config.outro, 170);
//     doc.text(splitOutro, 20, yPos);
//     yPos += (splitOutro.length * 6) + 20;

//     if (yPos > 230) { doc.addPage(); yPos = 30; }

//     const footerX = 140;
//     doc.setFont("times", "bold");
//     doc.text(config.closing, footerX, yPos);
//     yPos += 5;

//     if (notice.signatureUrl) {
//         try {
//             const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
//             if (sigImg) {
//                 doc.addImage(sigImg, "PNG", footerX, yPos, 35, 18);
//                 yPos += 20;
//             } else {
//                 yPos += 15;
//                 doc.setFont("times", "italic");
//                 doc.setFontSize(9);
//                 doc.text("[Digital Signature Verified]", footerX, yPos);
//             }
//         } catch (e) {
//             yPos += 15;
//             doc.text("[Signed]", footerX, yPos);
//         }
//     } else {
//         yPos += 20;
//     }

//     const senderName = sender.name;
//     doc.setFont("times", "bold");
//     doc.setFontSize(11);
//     doc.text(senderName, footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     doc.setFont("times", "normal");
//     doc.setFontSize(10);
//     doc.text(sender.designation || "Officer", footerX + 20, yPos, { align: "center" });
//     yPos += 5;

//     if (isSeniorOfficer(sender.designation)) {
//         doc.text("Chandrapur District", footerX + 20, yPos, { align: "center" });
//     } else {
//         doc.text(`${sender.station}, Chandrapur`, footerX + 20, yPos, { align: "center" });
//     }

//     const pageHeight = doc.internal.pageSize.height;
//     doc.setDrawColor(150);
//     doc.setLineWidth(0.2);
//     doc.line(10, pageHeight - 15, 200, pageHeight - 15);
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("Generated by CrimeTrack | Valid Official Document under IT Act.", 105, pageHeight - 10, null, null, "center");

//     doc.save(`${type}_${notice._id}.pdf`);
// };

// // ==========================================
// // 4. MAIN COMPONENT (TRANSPARENT UI)
// // ==========================================

// const NoticeLayout = ({ userRole }) => {
//   const navigate = useNavigate();
//   const { section } = useParams(); 
//   const view = section || "inbox"; 

//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//       docType: "Notice",
//       receiverType: "citizen",
//       subject: "",
//       body: ""
//   });
  
//   const [selectedReceivers, setSelectedReceivers] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [signature, setSignature] = useState(null);

//   const handleTabChange = (newView) => {
//       navigate(`/official-docs/${newView}`);
//   };

//   const fetchNotices = async (currentView) => {
//       if (currentView !== 'inbox' && currentView !== 'sent') return;
      
//       setLoading(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const endpoint = currentView === 'sent' ? 'sent' : 'inbox';
//           const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setNotices(data);
//       } catch (error) { toast.error("Load failed"); }
//       finally { setLoading(false); }
//   };

//   useEffect(() => {
//       fetchNotices(view);
//   }, [view]);

//   const handleDownload = (notice) => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const loadToast = toast.loading("Downloading Document...");
//       generatePDF(notice, userInfo.token)
//         .then(() => toast.success("Downloaded", { id: loadToast }))
//         .catch(() => toast.error("Error", { id: loadToast }));
//   };

//   const handleSearch = async (overrideQuery = null) => {
//       const query = overrideQuery !== null ? overrideQuery : searchQuery;
//       setIsSearching(true);
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const role = formData.receiverType === 'citizen' ? 'citizen' : 'police';
//           const apiRole = formData.receiverType === 'station' ? 'station' : role;

//           const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${apiRole}&query=${query}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setSearchResults(data);
//       } catch (error) { toast.error("Search failed"); }
//       finally { setIsSearching(false); }
//   };

//   const isSelected = (id) => selectedReceivers.some(r => r.id === id);

//   const toggleReceiver = (item) => {
//       if (isSelected(item._id)) {
//           setSelectedReceivers(selectedReceivers.filter(r => r.id !== item._id));
//       } else {
//           const itemName = item.name ? item.name : `${item.firstName} ${item.lastName}`;
//           setSelectedReceivers([...selectedReceivers, { 
//               id: item._id, 
//               name: itemName, 
//               role: formData.receiverType,
//               photo: item.idPhoto 
//           }]);
//       }
//   };

//   const handleSelectAll = () => {
//       if (selectedReceivers.length === searchResults.length) {
//           setSelectedReceivers([]); 
//       } else {
//           const all = searchResults.map(item => ({
//               id: item._id,
//               name: item.name ? item.name : `${item.firstName} ${item.lastName}`,
//               role: formData.receiverType,
//               photo: item.idPhoto
//           }));
//           setSelectedReceivers(all);
//       }
//   };

//   const handleSend = async (e) => {
//       e.preventDefault();
//       if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select receiver");
//       if(formData.receiverType === 'station' && selectedReceivers.length === 0) return toast.error("Search & Select Station");

//       const loadToast = toast.loading("Dispatching Official Documents...");
//       try {
//           const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           const targets = selectedReceivers;

//           for (const target of targets) {
//               const payload = new FormData();
//               payload.append("docType", formData.docType);
//               payload.append("receiverType", formData.receiverType);
//               const idToSend = formData.receiverType === 'station' ? target.name : target.id;
//               payload.append("targetId", idToSend);
//               payload.append("subject", formData.subject);
//               payload.append("body", formData.body);
//               if(signature) payload.append("signature", signature);

//               await axios.post(`${BASE_URL}/api/notices/send`, payload, {
//                   headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
//               });
//           }
          
//           toast.success(`Dispatched ${targets.length} documents.`, { id: loadToast });
//           handleTabChange("sent"); 
//           setSelectedReceivers([]);
//           setSearchQuery("");
//           setSearchResults([]);
//           setSignature(null);
//           setFormData({ ...formData, subject: "", body: "" });
//       } catch (error) { toast.error("Dispatch Failed", { id: loadToast }); }
//   };

//   return (
//     // ✅ BACKGROUND CONFIGURATION (Change Image URL Here)
//     <div 
//         className="h-full min-h-screen flex flex-col font-sans text-slate-100 p-2 md:p-6 overflow-hidden bg-cover bg-center bg-fixed relative"
//         style={{ backgroundImage: "url('/assets/police-bg.png')" }} 
//     >
//         {/* ✅ DARK OVERLAY (Opacity Control: bg-black/50 for lighter, bg-black/90 for darker) */}
//         <div className="absolute inset-0 bg-slate-950/80 pointer-events-none"></div>

//         {/* Sticky Back Button */}
//         <button 
//             onClick={() => navigate(-1)} 
//             className="fixed top-24 left-4 z-50 bg-slate-800/60 backdrop-blur text-white p-3 rounded-full shadow-lg border border-slate-600/50 hover:bg-indigo-600 transition-all group"
//             title="Go Back"
//         >
//             <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform"/>
//         </button>

//         {/* Content Wrapper */}
//         <div className="relative z-10 h-full flex flex-col">
            
//             {/* --- HEADER (Glassmorphism) --- */}
//             <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-slate-700/50 shadow-2xl pl-16">
//                 <div className="flex items-center gap-4 mb-4 md:mb-0">
//                     <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/20">
//                         <FaUniversity className="text-white text-2xl" />
//                     </div>
//                     <div>
//                         <h2 className="text-2xl font-bold text-white tracking-wide">Official Dispatch</h2>
//                         <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Secure Communication Channel</p>
//                     </div>
//                 </div>

//                 {/* TABS */}
//                 <div className="flex gap-3 bg-slate-950/40 p-1.5 rounded-xl border border-slate-800/50 overflow-x-auto backdrop-blur-sm">
//                     <button onClick={() => handleTabChange("inbox")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${view === 'inbox' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
//                         <FaInbox className="text-lg" /> Inbox
//                     </button>
//                     {userRole !== 'citizen' && (
//                         <>
//                             <button onClick={() => handleTabChange("compose")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${view === 'compose' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
//                                 <FaFeatherAlt className="text-lg" /> Compose
//                             </button>
//                             <button onClick={() => handleTabChange("sent")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${view === 'sent' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
//                                 <FaPaperPlane className="text-lg" /> Sent
//                             </button>
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* --- LIST VIEW (Transparent Cards) --- */}
//             {(view === 'inbox' || view === 'sent') && (
//                 <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 pb-20">
//                     {loading ? (
//                         <div className="text-center py-20 flex flex-col items-center">
//                             <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//                             <p className="text-slate-400 animate-pulse font-medium">Retrieving records...</p>
//                         </div>
//                     ) : notices.length === 0 ? (
//                         <div className="text-center py-20 bg-slate-900/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-slate-700/50">
//                             <FaInbox className="text-6xl text-slate-600 mx-auto mb-4"/>
//                             <p className="text-slate-400 font-medium">No records found.</p>
//                         </div>
//                     ) : (
//                         notices.map(notice => (
//                             // ✅ ITEM CARD: Transparent Background
//                             <div key={notice._id} className="relative group bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1">
//                                 <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-2xl transition-all ${notice.docType === 'Notice' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                
//                                 <div className="flex justify-between items-start mb-4 pl-4">
//                                     <div>
//                                         <div className="flex items-center gap-3 mb-2">
//                                             <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full border shadow-sm tracking-wide ${notice.docType === 'Notice' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
//                                                 {notice.docType}
//                                             </span>
//                                             <span className="text-xs text-slate-400 font-mono">{new Date(notice.createdAt).toLocaleDateString()}</span>
//                                         </div>
//                                         <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{notice.subject}</h3>
//                                     </div>
//                                     <button onClick={() => handleDownload(notice)} className="bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 hover:text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all border border-slate-600/50 hover:border-blue-500 shadow-sm active:scale-95">
//                                         <FaFilePdf className="text-lg text-red-400" /> <span className="hidden sm:inline">Download PDF</span>
//                                     </button>
//                                 </div>

//                                 <div className="pl-4 flex flex-wrap gap-4 text-xs text-slate-400 mb-4 items-center">
//                                     <div className="flex items-center gap-2 bg-slate-950/30 px-3 py-1.5 rounded-lg border border-slate-800/50">
//                                         <FaUserShield className="text-indigo-400"/> <span>From: <b className="text-slate-200">{notice.sender.name}</b> ({notice.sender.designation})</span>
//                                     </div>
//                                     <div className="hidden sm:block text-slate-600">→</div>
//                                     <div className="flex items-center gap-2 bg-slate-950/30 px-3 py-1.5 rounded-lg border border-slate-800/50">
//                                         <FaUser className="text-emerald-400"/> <span>To: <b className="text-slate-200">{notice.receiver.targetName}</b></span>
//                                     </div>
//                                 </div>

//                                 <div className="pl-4">
//                                     <p className="text-sm text-slate-300 bg-slate-950/20 p-4 rounded-xl border border-slate-800/30 italic line-clamp-2">"{notice.body}"</p>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             )}

//             {/* --- 3. COMPOSE VIEW (Transparent Form) --- */}
//             {view === 'compose' && (
//                 <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 pr-2">
//                     {/* ✅ FORM CONTAINER: Transparent Background */}
//                     <form onSubmit={handleSend} className="bg-slate-900/70 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
                        
//                         <h3 className="text-2xl font-black text-white mb-8 border-b border-slate-700/50 pb-5 flex items-center gap-3 relative z-10">
//                             <span className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-lg shadow-emerald-500/20">
//                                 <FaFeatherAlt className="text-white text-lg"/>
//                             </span>
//                             Draft New Document
//                         </h3>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
//                             <div className="group">
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Document Type</label>
//                                 <div className="relative">
//                                     <select className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 pl-5 text-white focus:border-emerald-500 outline-none appearance-none font-medium transition-all shadow-inner backdrop-blur-sm" value={formData.docType} onChange={e=>setFormData({...formData, docType: e.target.value})}>
//                                         <option className="bg-slate-900">Notice</option>
//                                         <option className="bg-slate-900">Application</option>
//                                         <option className="bg-slate-900">Circular</option>
//                                     </select>
//                                     <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs">▼</div>
//                                 </div>
//                             </div>
//                             <div className="group">
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Recipient Group</label>
//                                 <div className="relative">
//                                     <select className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 pl-5 text-white focus:border-emerald-500 outline-none appearance-none font-medium transition-all shadow-inner backdrop-blur-sm" value={formData.receiverType} onChange={e=>{setFormData({...formData, receiverType: e.target.value}); setSelectedReceivers([]); setSearchQuery(""); setSearchResults([]);}}>
//                                         <option className="bg-slate-900" value="citizen">Citizens</option>
//                                         <option className="bg-slate-900" value="officer">Police Officers</option>
//                                         <option className="bg-slate-900" value="station">Police Station</option>
//                                     </select>
//                                     <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs">▼</div>
//                                 </div>
//                             </div>
//                         </div>

//                         {selectedReceivers.length > 0 && (
//                             <div className="mb-6 animate-fade-in-up relative z-10">
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Selected Recipients</label>
//                                 <div className="flex flex-wrap gap-3 max-h-32 overflow-y-auto custom-scrollbar p-3 bg-slate-950/30 rounded-xl border border-slate-700/50 inner-shadow backdrop-blur-sm">
//                                     {selectedReceivers.map(r => (
//                                         <div key={r.id} className="flex items-center gap-3 bg-slate-800/80 border border-slate-600/50 text-white text-xs pl-1 pr-3 py-1.5 rounded-full shadow-md">
//                                             {r.role !== 'station' ? (
//                                                 <img src={r.photo || "https://placehold.co/100"} className="w-7 h-7 rounded-full object-cover border border-slate-600" alt=""/>
//                                             ) : (
//                                                 <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center"><FaBuilding className="text-slate-400 text-xs"/></div>
//                                             )}
//                                             <span className="font-semibold tracking-wide">{r.name}</span>
//                                             <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="text-slate-500 hover:text-red-400 ml-1 transition-colors"><FaTimes /></button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         <div className="mb-8 relative z-10">
//                             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">
//                                 {formData.receiverType === 'station' ? "Search Police Station" : "Search Receiver"}
//                             </label>
//                             <div className="flex gap-3 relative">
//                                 <input 
//                                     type="text" 
//                                     className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 pl-5 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 shadow-inner backdrop-blur-sm" 
//                                     placeholder={formData.receiverType === 'station' ? "Type exact station name..." : "Search by name or email..."} 
//                                     value={searchQuery} 
//                                     onChange={e=>setSearchQuery(e.target.value)} 
//                                 />
//                                 <button type="button" onClick={() => handleSearch()} className="bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-8 rounded-xl text-white font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95">
//                                     {isSearching ? <FaSpinner className="animate-spin"/> : "Find"}
//                                 </button>
//                             </div>

//                             {searchResults.length > 0 && (
//                                 <div className="mt-4 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl animate-fade-in-up ring-1 ring-black/50">
//                                     <div className="flex justify-between items-center p-3 bg-slate-950/50 border-b border-slate-800">
//                                         <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{searchResults.length} matches found</span>
//                                         <button type="button" onClick={handleSelectAll} className="text-xs text-slate-300 hover:text-white font-bold flex items-center gap-1 transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg">
//                                             <FaCheckDouble /> Select All
//                                         </button>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 max-h-64 overflow-y-auto custom-scrollbar">
//                                         {searchResults.map(u => {
//                                             const active = isSelected(u._id);
//                                             const isStation = !u.firstName;
//                                             const displayName = isStation ? u.name : `${u.firstName} ${u.lastName}`;
//                                             const subInfo = isStation ? u.district : (u.role === 'police' || u.role === 'senior' ? u.designation : u.email);
//                                             const photo = isStation ? null : u.idPhoto;

//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleReceiver(u)} 
//                                                     className={`
//                                                         flex items-center gap-4 p-4 cursor-pointer transition-all bg-slate-900/80 hover:bg-slate-800
//                                                         ${active ? 'bg-indigo-900/30 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'}
//                                                     `}
//                                                 >
//                                                     <div className={`w-12 h-12 rounded-full p-0.5 shadow-lg ${active ? 'bg-indigo-500' : 'bg-slate-700'}`}>
//                                                         {photo ? (
//                                                             <img src={photo} className="w-full h-full rounded-full object-cover bg-slate-800" alt=""/>
//                                                         ) : (
//                                                             <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
//                                                                 {isStation ? <FaBuilding/> : <FaUser/>}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <div className="min-w-0">
//                                                         <h4 className={`text-sm font-bold truncate ${active ? 'text-indigo-300' : 'text-white'}`}>
//                                                             {displayName}
//                                                         </h4>
//                                                         <p className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
//                                                             {subInfo}
//                                                         </p>
//                                                     </div>
//                                                     {active && <div className="ml-auto w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg"><FaCheckDouble/></div>}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="space-y-6 mb-8 relative z-10">
//                             <div className="group">
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Subject Line</label>
//                                 <input type="text" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-white font-bold focus:border-emerald-500 outline-none transition-all shadow-inner backdrop-blur-sm" placeholder="Enter a clear & concise subject..." required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
//                             </div>
                            
//                             <div>
//                                 <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Content Body</label>
//                                 <div className="bg-slate-950/30 p-6 rounded-2xl border border-slate-800/50 text-sm text-gray-400 shadow-inner relative backdrop-blur-sm">
//                                     <div className="absolute top-0 right-0 bg-slate-800/80 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-slate-500 border-l border-b border-slate-700">PREVIEW MODE</div>
//                                     <p className="mb-4 text-emerald-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><FaPenNib/> Auto-Formatted Structure</p>
//                                     <p className="italic opacity-60 mb-4 pl-4 border-l-2 border-slate-700">"{DOC_CONFIG[formData.docType].intro}"</p>
//                                     <textarea 
//                                         className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white h-40 resize-none focus:border-emerald-500 outline-none font-sans text-base leading-relaxed focus:shadow-lg transition-all backdrop-blur-sm" 
//                                         placeholder="Type your main message content here..." 
//                                         required 
//                                         value={formData.body} 
//                                         onChange={e=>setFormData({...formData, body: e.target.value})}
//                                     ></textarea>
//                                     <p className="italic opacity-60 mt-4 pl-4 border-l-2 border-slate-700">"{DOC_CONFIG[formData.docType].outro}"</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mb-8 p-6 bg-slate-950/30 rounded-2xl border-2 border-slate-700 border-dashed hover:border-emerald-500/50 transition-colors relative z-10 group backdrop-blur-sm">
//                             <label className="text-sm font-bold text-slate-300 uppercase mb-3 block flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
//                                 <FaFilePdf className="text-lg"/> Digital Signature
//                             </label>
//                             <div className="flex items-center gap-4">
//                                 <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-slate-800/80 file:text-white hover:file:bg-slate-700 cursor-pointer transition-all"/>
//                             </div>
//                         </div>

//                         <button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-900/30 transition-all flex justify-center items-center gap-3 text-lg transform active:scale-[0.98] relative overflow-hidden group">
//                             <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
//                             <FaPaperPlane className="relative z-10" /> 
//                             <span className="relative z-10">DISPATCH OFFICIAL DOCUMENT</span>
//                             <span className="relative z-10 bg-black/20 px-3 py-0.5 rounded-full text-sm font-medium">
//                                 {selectedReceivers.length > 0 ? selectedReceivers.length : (formData.receiverType === 'station' ? 'All Station' : 0)}
//                             </span>
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     </div>
//   );
// };

// export default NoticeLayout;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";
// import { useNavigate, useParams } from "react-router-dom";
// import { 
//   FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
//   FaTimes, FaCheckDouble, FaUserShield, FaUser, FaBuilding,
//   FaPenNib, FaUniversity, FaArrowLeft
// } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // ... [DOC_CONFIG, SENIOR_RANKS, HELPER FUNCTIONS remain exactly the same] ...
// // (I am keeping the logic intact, only changing the return JSX for UI)

// const DOC_CONFIG = {
//     'Notice': {
//         title: "OFFICIAL NOTICE",
//         intro: "You are hereby officially informed regarding the subject cited above. This notice serves as a formal communication from the department requiring your immediate attention.",
//         outro: "Failure to comply with the instructions mentioned in this notice may result in further legal or departmental action as per the procedure established by law.",
//         closing: "Issued By,"
//     },
//     'Application': {
//         title: "FORMAL APPLICATION",
//         intro: "I am writing to formally submit this application regarding the subject mentioned above. This correspondence is generated via the official CrimeTrack portal.",
//         outro: "I request your cooperation and a timely response regarding this matter. We are committed to maintaining departmental coordination.",
//         closing: "Yours faithfully,"
//     },
//     'Circular': {
//         title: "DEPARTMENT CIRCULAR",
//         intro: "This circular is issued to bring specific information and directives to the notice of all concerned personnel within the jurisdiction.",
//         outro: "All concerned officers and personnel are instructed to implement these directives with immediate effect. Any deviation will be viewed seriously.",
//         closing: "Regards,"
//     }
// };

// const SENIOR_RANKS = ["Commissioner", "Director", "Superintendent", "DCP", "ACP", "SP", "DSP", "IG", "DIG"];

// const getBase64ImageFromURL = (url) => {
//     return new Promise((resolve) => {
//         if (!url) return resolve(null);
//         const img = new Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = () => resolve(null);
//         img.src = url;
//     });
// };

// const isSeniorOfficer = (designation) => {
//     if (!designation) return false;
//     return SENIOR_RANKS.some(rank => designation.includes(rank));
// };

// const generatePDF = async (notice, userInfoToken) => {
//     const doc = new jsPDF();
//     const type = notice.docType; 
//     const sender = notice.sender;
//     const receiver = notice.receiver;
//     const config = DOC_CONFIG[type];
//     const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

//     let fullReceiver = {};
//     if (receiver.type !== 'station') {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${receiver.type}&query=${receiver.targetId}`, {
//                 headers: { Authorization: `Bearer ${userInfoToken}` }
//             });
//             fullReceiver = data.find(u => u._id === receiver.targetId) || {};
//         } catch (e) { console.error("Fetch Error", e); }
//     } else {
//         fullReceiver = { station: receiver.targetId }; 
//     }

//     doc.setFillColor(235, 247, 235); 
//     doc.rect(5, 5, 200, 38, 'F'); 
//     doc.setDrawColor(20, 100, 20); 
//     doc.setLineWidth(0.5);
//     doc.rect(5, 5, 200, 38);

//     const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
//     const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");
//     if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 9, 30, 30);
//     if (policeLogo) doc.addImage(policeLogo, "PNG", 168, 9, 30, 30);

//     doc.setFont("times", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor(15, 70, 15);
//     doc.text("MAHARASHTRA STATE POLICE", 105, 18, null, null, "center");

//     doc.setFontSize(10);
//     doc.setFont("times", "normal");
//     doc.setTextColor(0);
//     doc.text("Official Digital Communication | CrimeTrack System", 105, 26, null, null, "center");
    
//     doc.setFontSize(12);
//     doc.setFont("times", "bold");
//     doc.text("GOVERNMENT OF MAHARASHTRA", 105, 33, null, null, "center");

//     doc.setFontSize(16);
//     doc.setFont("times", "bold");
//     doc.setTextColor(0);
//     doc.text(config.title, 105, 55, null, null, "center");
//     doc.setLineWidth(0.5);
//     doc.line(75, 57, 135, 57); 

//     doc.setFontSize(11);
//     doc.text(`Date: ${date}`, 190, 68, { align: "right" });
//     doc.text(`Ref: CT/${new Date().getFullYear()}/${notice._id.slice(-6).toUpperCase()}`, 20, 68);

//     doc.setFont("times", "bold");
//     doc.text("To,", 20, 82);
//     doc.setFont("times", "normal");

//     let yPos = 88;
//     const lineHeight = 6;

//     if (receiver.type === 'citizen') {
//         const name = fullReceiver.firstName ? `${fullReceiver.firstName} ${fullReceiver.lastName}` : receiver.targetName;
//         const title = fullReceiver.title || ""; 
//         const displayName = title ? `${title} ${name}` : name;
//         doc.text(displayName, 20, yPos);
//         yPos += lineHeight;
//         if (fullReceiver.aadhar) {
//             doc.text(`Aadhaar No: ${fullReceiver.aadhar}`, 20, yPos);
//             yPos += lineHeight;
//         }
//         doc.text("Chandrapur District", 20, yPos);
//     } 
//     else if (receiver.type === 'officer') {
//         const name = fullReceiver.firstName ? `${fullReceiver.firstName} ${fullReceiver.lastName}` : receiver.targetName;
//         const title = fullReceiver.title || "";
//         const designation = fullReceiver.designation || "Officer";
//         const station = fullReceiver.station || "Police Department";
//         doc.text(designation, 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${title} ${name}`.trim(), 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${station}, Chandrapur`, 20, yPos);
//     } 
//     else {
//         doc.text("The Station House Officer,", 20, yPos);
//         yPos += lineHeight;
//         doc.text(`${receiver.targetName}, Chandrapur`, 20, yPos);
//     }

//     yPos += 12;
//     doc.setFont("times", "bold");
//     doc.text("Subject:", 20, yPos);
//     doc.setFont("times", "normal");
//     const splitSubject = doc.splitTextToSize(notice.subject, 150);
//     doc.text(splitSubject, 45, yPos);
//     yPos += (splitSubject.length * 6) + 10;

//     let salutation = "Respected Sir/Madam,";
//     if (receiver.type !== 'station') {
//         if (fullReceiver.gender === 'Male' || fullReceiver.title === 'Mr.') salutation = "Respected Sir,";
//         if (fullReceiver.gender === 'Female' || fullReceiver.title === 'Mrs.' || fullReceiver.title === 'Ms.') salutation = "Respected Madam,";
//     } else {
//         salutation = "Respected Officer In-Charge,";
//     }
    
//     doc.text(salutation, 20, yPos);
//     yPos += 10;

//     doc.setFontSize(12);
//     const splitIntro = doc.splitTextToSize(config.intro, 170);
//     doc.text(splitIntro, 20, yPos);
//     yPos += (splitIntro.length * 6) + 6;
//     const splitMain = doc.splitTextToSize(notice.body, 170);
//     doc.text(splitMain, 20, yPos);
//     yPos += (splitMain.length * 6) + 6;
//     const splitOutro = doc.splitTextToSize(config.outro, 170);
//     doc.text(splitOutro, 20, yPos);
//     yPos += (splitOutro.length * 6) + 20;

//     if (yPos > 230) { doc.addPage(); yPos = 30; }

//     const footerX = 140;
//     doc.setFont("times", "bold");
//     doc.text(config.closing, footerX, yPos);
//     yPos += 5;

//     if (notice.signatureUrl) {
//         try {
//             const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
//             if (sigImg) {
//                 doc.addImage(sigImg, "PNG", footerX, yPos, 35, 18);
//                 yPos += 20;
//             } else {
//                 yPos += 15;
//                 doc.setFont("times", "italic");
//                 doc.setFontSize(9);
//                 doc.text("[Digital Signature Verified]", footerX, yPos);
//             }
//         } catch (e) {
//             yPos += 15;
//             doc.text("[Signed]", footerX, yPos);
//         }
//     } else {
//         yPos += 20;
//     }

//     const senderName = sender.name;
//     doc.setFont("times", "bold");
//     doc.setFontSize(11);
//     doc.text(senderName, footerX + 20, yPos, { align: "center" });
//     yPos += 5;
//     doc.setFont("times", "normal");
//     doc.setFontSize(10);
//     doc.text(sender.designation || "Officer", footerX + 20, yPos, { align: "center" });
//     yPos += 5;
//     if (isSeniorOfficer(sender.designation)) {
//         doc.text("Chandrapur District", footerX + 20, yPos, { align: "center" });
//     } else {
//         doc.text(`${sender.station}, Chandrapur`, footerX + 20, yPos, { align: "center" });
//     }

//     const pageHeight = doc.internal.pageSize.height;
//     doc.setDrawColor(150);
//     doc.setLineWidth(0.2);
//     doc.line(10, pageHeight - 15, 200, pageHeight - 15);
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("Generated by CrimeTrack | Valid Official Document under IT Act.", 105, pageHeight - 10, null, null, "center");

//     doc.save(`${type}_${notice._id}.pdf`);
// };

// // ==========================================
// // 4. MAIN COMPONENT (MOBILE OPTIMIZED)
// // ==========================================

// const NoticeLayout = () => {
//   const navigate = useNavigate();
//   const { section } = useParams(); 
//   const view = section || "inbox"; 

//   const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
//   const role = userInfo.role || "";
//   const isCitizen = role.toLowerCase() === 'citizen';

//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//       docType: "Notice",
//       receiverType: "citizen",
//       subject: "",
//       body: ""
//   });
  
//   const [selectedReceivers, setSelectedReceivers] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [signature, setSignature] = useState(null);

//   useEffect(() => {
//       if (isCitizen && (view === 'compose' || view === 'sent')) {
//           navigate('/official-docs/inbox', { replace: true });
//       }
//   }, [view, isCitizen, navigate]);

//   const handleTabChange = (newView) => {
//       navigate(`/official-docs/${newView}`);
//   };

//   const fetchNotices = async (currentView) => {
//       if (isCitizen && currentView === 'sent') return;
//       if (currentView !== 'inbox' && currentView !== 'sent') return;
      
//       setLoading(true);
//       try {
//           const token = userInfo.token;
//           const endpoint = currentView === 'sent' ? 'sent' : 'inbox';
//           const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
//               headers: { Authorization: `Bearer ${token}` }
//           });
//           setNotices(data);
//       } catch (error) { toast.error("Load failed"); }
//       finally { setLoading(false); }
//   };

//   useEffect(() => {
//       fetchNotices(view);
//   }, [view]);

//   const handleDownload = (notice) => {
//       const loadToast = toast.loading("Downloading Document...");
//       generatePDF(notice, userInfo.token)
//         .then(() => toast.success("Downloaded", { id: loadToast }))
//         .catch(() => toast.error("Error", { id: loadToast }));
//   };

//   const handleSearch = async (overrideQuery = null) => {
//       const query = overrideQuery !== null ? overrideQuery : searchQuery;
//       setIsSearching(true);
//       try {
//           const roleSearch = formData.receiverType === 'citizen' ? 'citizen' : 'police';
//           const apiRole = formData.receiverType === 'station' ? 'station' : roleSearch;

//           const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${apiRole}&query=${query}`, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//           });
//           setSearchResults(data);
//       } catch (error) { toast.error("Search failed"); }
//       finally { setIsSearching(false); }
//   };

//   const isSelected = (id) => selectedReceivers.some(r => r.id === id);

//   const toggleReceiver = (item) => {
//       if (isSelected(item._id)) {
//           setSelectedReceivers(selectedReceivers.filter(r => r.id !== item._id));
//       } else {
//           const itemName = item.name ? item.name : `${item.firstName} ${item.lastName}`;
//           setSelectedReceivers([...selectedReceivers, { 
//               id: item._id, 
//               name: itemName, 
//               role: formData.receiverType,
//               photo: item.idPhoto 
//           }]);
//       }
//   };

//   const handleSelectAll = () => {
//       if (selectedReceivers.length === searchResults.length) {
//           setSelectedReceivers([]); 
//       } else {
//           const all = searchResults.map(item => ({
//               id: item._id,
//               name: item.name ? item.name : `${item.firstName} ${item.lastName}`,
//               role: formData.receiverType,
//               photo: item.idPhoto
//           }));
//           setSelectedReceivers(all);
//       }
//   };

//   const handleSend = async (e) => {
//       e.preventDefault();
//       if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select receiver");
//       if(formData.receiverType === 'station' && selectedReceivers.length === 0) return toast.error("Search & Select Station");

//       const loadToast = toast.loading("Dispatching...");
//       try {
//           const targets = selectedReceivers;
//           for (const target of targets) {
//               const payload = new FormData();
//               payload.append("docType", formData.docType);
//               payload.append("receiverType", formData.receiverType);
//               const idToSend = formData.receiverType === 'station' ? target.name : target.id;
//               payload.append("targetId", idToSend);
//               payload.append("subject", formData.subject);
//               payload.append("body", formData.body);
//               if(signature) payload.append("signature", signature);

//               await axios.post(`${BASE_URL}/api/notices/send`, payload, {
//                   headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
//               });
//           }
//           toast.success(`Sent to ${targets.length} recipients`, { id: loadToast });
//           handleTabChange("sent"); 
//           setSelectedReceivers([]);
//           setSearchQuery("");
//           setSearchResults([]);
//           setSignature(null);
//           setFormData({ ...formData, subject: "", body: "" });
//       } catch (error) { toast.error("Dispatch Failed", { id: loadToast }); }
//   };

//   return (
//     <div 
//         className="h-screen w-full flex flex-col font-sans text-slate-100 overflow-hidden bg-cover bg-center relative"
//         style={{ backgroundImage: "url('/assets/police-bg.png')" }} 
//     >
//         <div className="absolute inset-0 bg-slate-950/80 pointer-events-none"></div>

//         {/* --- STICKY HEADER (Compact for Mobile) --- */}
//         <div className="relative z-20 w-full flex-none pt-4 px-3 md:pt-6 md:px-6">
            
//             <button 
//                 onClick={() => navigate(-1)} 
//                 className="absolute top-6 left-3 md:top-8 md:left-6 z-50 bg-slate-800/60 backdrop-blur text-white p-2.5 md:p-3 rounded-full shadow-lg border border-slate-600/50 hover:bg-indigo-600 transition-all group"
//                 title="Go Back"
//             >
//                 <FaArrowLeft className="text-base md:text-lg group-hover:-translate-x-1 transition-transform"/>
//             </button>

//             <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900/60 backdrop-blur-xl p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-700/50 shadow-2xl pl-12 md:pl-20">
//                 <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-0 w-full md:w-auto">
//                     <div className="p-2 md:p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg md:rounded-xl shadow-lg shadow-blue-500/20">
//                         <FaUniversity className="text-white text-lg md:text-2xl" />
//                     </div>
//                     <div>
//                         <h2 className="text-lg md:text-2xl font-bold text-white tracking-wide">Official Dispatch</h2>
//                         <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-semibold">Secure Channel</p>
//                     </div>
//                 </div>

//                 {/* TABS (Scrollable & Compact) */}
//                 <div className="flex gap-2 md:gap-3 bg-slate-950/40 p-1 md:p-1.5 rounded-lg md:rounded-xl border border-slate-800/50 overflow-x-auto backdrop-blur-sm w-full md:w-auto no-scrollbar">
//                     <button onClick={() => handleTabChange("inbox")} className={`flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-md md:rounded-lg font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${view === 'inbox' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
//                         <FaInbox className="text-base md:text-lg" /> Inbox
//                     </button>

//                     {!isCitizen && (
//                         <>
//                             <button onClick={() => handleTabChange("compose")} className={`flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-md md:rounded-lg font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${view === 'compose' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
//                                 <FaFeatherAlt className="text-base md:text-lg" /> Compose
//                             </button>
//                             <button onClick={() => handleTabChange("sent")} className={`flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-md md:rounded-lg font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${view === 'sent' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
//                                 <FaPaperPlane className="text-base md:text-lg" /> Sent
//                             </button>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>

//         {/* --- SCROLLABLE CONTENT --- */}
//         <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-3 md:p-6">
//             {(view === 'inbox' || (!isCitizen && view === 'sent')) && (
//                 <div className="space-y-3 md:space-y-4 pb-20">
//                     {loading ? (
//                         <div className="text-center py-20 flex flex-col items-center">
//                             <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//                             <p className="text-slate-400 text-sm md:text-base animate-pulse font-medium">Loading...</p>
//                         </div>
//                     ) : notices.length === 0 ? (
//                         <div className="text-center py-12 md:py-20 bg-slate-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 border-dashed border-slate-700/50">
//                             <FaInbox className="text-4xl md:text-6xl text-slate-600 mx-auto mb-4"/>
//                             <p className="text-slate-400 font-medium text-sm md:text-base">No official records found.</p>
//                         </div>
//                     ) : (
//                         notices.map(notice => (
//                             <div key={notice._id} className="relative group bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-4 md:p-6 rounded-xl md:rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1">
//                                 <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-2xl transition-all ${notice.docType === 'Notice' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                
//                                 <div className="flex justify-between items-start mb-2 md:mb-4 pl-3 md:pl-4">
//                                     <div>
//                                         <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
//                                             <span className={`text-[9px] md:text-[10px] uppercase font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full border shadow-sm tracking-wide ${notice.docType === 'Notice' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
//                                                 {notice.docType}
//                                             </span>
//                                             <span className="text-[10px] md:text-xs text-slate-400 font-mono">{new Date(notice.createdAt).toLocaleDateString()}</span>
//                                         </div>
//                                         <h3 className="text-base md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">{notice.subject}</h3>
//                                     </div>
//                                     <button onClick={() => handleDownload(notice)} className="bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 hover:text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl flex items-center gap-2 text-[10px] md:text-xs font-bold transition-all border border-slate-600/50 hover:border-blue-500 shadow-sm active:scale-95">
//                                         <FaFilePdf className="text-sm md:text-lg text-red-400" /> <span className="hidden sm:inline">PDF</span>
//                                     </button>
//                                 </div>

//                                 <div className="pl-3 md:pl-4 flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs text-slate-400 mb-2 md:mb-4 items-center">
//                                     <div className="flex items-center gap-1.5 md:gap-2 bg-slate-950/30 px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-slate-800/50">
//                                         <FaUserShield className="text-indigo-400"/> <span>From: <b className="text-slate-200">{notice.sender.name}</b></span>
//                                     </div>
//                                     <div className="hidden sm:block text-slate-600">→</div>
//                                     <div className="flex items-center gap-1.5 md:gap-2 bg-slate-950/30 px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-slate-800/50">
//                                         <FaUser className="text-emerald-400"/> <span>To: <b className="text-slate-200">{notice.receiver.targetName}</b></span>
//                                     </div>
//                                 </div>

//                                 <div className="pl-3 md:pl-4">
//                                     <p className="text-xs md:text-sm text-slate-300 bg-slate-950/20 p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-800/30 italic line-clamp-2">"{notice.body}"</p>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             )}

//             {!isCitizen && view === 'compose' && (
//                 <div className="pb-20 max-w-5xl mx-auto">
//                     <form onSubmit={handleSend} className="bg-slate-900/70 backdrop-blur-xl p-4 md:p-8 rounded-2xl md:rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
//                         <h3 className="text-lg md:text-2xl font-black text-white mb-6 md:mb-8 border-b border-slate-700/50 pb-4 md:pb-5 flex items-center gap-3 relative z-10">
//                             <span className="p-1.5 md:p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-lg shadow-emerald-500/20">
//                                 <FaFeatherAlt className="text-white text-base md:text-lg"/>
//                             </span>
//                             Draft New Document
//                         </h3>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8 relative z-10">
//                             <div className="group">
//                                 <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1.5 md:mb-2 block tracking-wider">Document Type</label>
//                                 <div className="relative">
//                                     <select className="w-full bg-slate-950/50 border border-slate-700 rounded-lg md:rounded-xl p-3 md:p-4 pl-4 md:pl-5 text-sm md:text-base text-white focus:border-emerald-500 outline-none appearance-none font-medium transition-all shadow-inner backdrop-blur-sm" value={formData.docType} onChange={e=>setFormData({...formData, docType: e.target.value})}>
//                                         <option className="bg-slate-900">Notice</option>
//                                         <option className="bg-slate-900">Application</option>
//                                         <option className="bg-slate-900">Circular</option>
//                                     </select>
//                                     <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[10px]">▼</div>
//                                 </div>
//                             </div>
//                             <div className="group">
//                                 <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1.5 md:mb-2 block tracking-wider">Recipient Group</label>
//                                 <div className="relative">
//                                     <select className="w-full bg-slate-950/50 border border-slate-700 rounded-lg md:rounded-xl p-3 md:p-4 pl-4 md:pl-5 text-sm md:text-base text-white focus:border-emerald-500 outline-none appearance-none font-medium transition-all shadow-inner backdrop-blur-sm" value={formData.receiverType} onChange={e=>{setFormData({...formData, receiverType: e.target.value}); setSelectedReceivers([]); setSearchQuery(""); setSearchResults([]);}}>
//                                         <option className="bg-slate-900" value="citizen">Citizens</option>
//                                         <option className="bg-slate-900" value="officer">Police Officers</option>
//                                         <option className="bg-slate-900" value="station">Police Station</option>
//                                     </select>
//                                     <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[10px]">▼</div>
//                                 </div>
//                             </div>
//                         </div>

//                         {selectedReceivers.length > 0 && (
//                             <div className="mb-6 animate-fade-in-up relative z-10">
//                                 <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-2 md:mb-3 block">Selected Recipients</label>
//                                 <div className="flex flex-wrap gap-2 md:gap-3 max-h-32 overflow-y-auto custom-scrollbar p-2 md:p-3 bg-slate-950/30 rounded-lg md:rounded-xl border border-slate-700/50 inner-shadow backdrop-blur-sm">
//                                     {selectedReceivers.map(r => (
//                                         <div key={r.id} className="flex items-center gap-2 md:gap-3 bg-slate-800/80 border border-slate-600/50 text-white text-[10px] md:text-xs pl-1 pr-2 md:pr-3 py-1 md:py-1.5 rounded-full shadow-md">
//                                             {r.role !== 'station' ? (
//                                                 <img src={r.photo || "https://placehold.co/100"} className="w-5 h-5 md:w-7 md:h-7 rounded-full object-cover border border-slate-600" alt=""/>
//                                             ) : (
//                                                 <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-slate-700 flex items-center justify-center"><FaBuilding className="text-slate-400 text-[10px]"/></div>
//                                             )}
//                                             <span className="font-semibold tracking-wide max-w-[80px] md:max-w-none truncate">{r.name}</span>
//                                             <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="text-slate-500 hover:text-red-400 ml-1 transition-colors"><FaTimes /></button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         <div className="mb-6 md:mb-8 relative z-10">
//                             <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1.5 md:mb-2 block tracking-wider">
//                                 {formData.receiverType === 'station' ? "Search Police Station" : "Search Receiver"}
//                             </label>
//                             <div className="flex gap-2 md:gap-3 relative">
//                                 <input 
//                                     type="text" 
//                                     className="w-full bg-slate-950/50 border border-slate-700 rounded-lg md:rounded-xl p-3 md:p-4 pl-4 md:pl-5 text-sm md:text-base text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 shadow-inner backdrop-blur-sm" 
//                                     placeholder="Type name..." 
//                                     value={searchQuery} 
//                                     onChange={e=>setSearchQuery(e.target.value)} 
//                                 />
//                                 <button type="button" onClick={() => handleSearch()} className="bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-4 md:px-8 rounded-lg md:rounded-xl text-white font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95">
//                                     {isSearching ? <FaSpinner className="animate-spin text-sm md:text-base"/> : <span className="text-xs md:text-base">Find</span>}
//                                 </button>
//                             </div>

//                             {searchResults.length > 0 && (
//                                 <div className="mt-2 md:mt-4 bg-slate-900/90 backdrop-blur-xl rounded-lg md:rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl animate-fade-in-up ring-1 ring-black/50">
//                                     <div className="flex justify-between items-center p-2 md:p-3 bg-slate-950/50 border-b border-slate-800">
//                                         <span className="text-[10px] md:text-xs text-indigo-400 font-bold uppercase tracking-wider">{searchResults.length} found</span>
//                                         <button type="button" onClick={handleSelectAll} className="text-[10px] md:text-xs text-slate-300 hover:text-white font-bold flex items-center gap-1 transition-colors bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded">
//                                             Select All
//                                         </button>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 max-h-48 md:max-h-64 overflow-y-auto custom-scrollbar">
//                                         {searchResults.map(u => {
//                                             const active = isSelected(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleReceiver(u)} 
//                                                     className={`
//                                                         flex items-center gap-3 md:gap-4 p-3 md:p-4 cursor-pointer transition-all bg-slate-900/80 hover:bg-slate-800
//                                                         ${active ? 'bg-indigo-900/30 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'}
//                                                     `}
//                                                 >
//                                                     <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full p-0.5 shadow-lg ${active ? 'bg-indigo-500' : 'bg-slate-700'}`}>
//                                                         {u.idPhoto ? (
//                                                             <img src={u.idPhoto} className="w-full h-full rounded-full object-cover bg-slate-800" alt=""/>
//                                                         ) : (
//                                                             <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs">
//                                                                 <FaUser/>
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <div className="min-w-0">
//                                                         <h4 className={`text-xs md:text-sm font-bold truncate ${active ? 'text-indigo-300' : 'text-white'}`}>
//                                                             {u.firstName || u.name} {u.lastName}
//                                                         </h4>
//                                                         <p className="text-[10px] md:text-[11px] text-slate-400 truncate">
//                                                             {u.email || u.district}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="space-y-4 md:space-y-6 mb-6 md:mb-8 relative z-10">
//                             <div className="group">
//                                 <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1.5 md:mb-2 block tracking-wider">Subject Line</label>
//                                 <input type="text" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg md:rounded-xl p-3 md:p-4 text-white font-bold text-sm md:text-base focus:border-emerald-500 outline-none transition-all shadow-inner backdrop-blur-sm" placeholder="Subject..." required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
//                             </div>
                            
//                             <div>
//                                 <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1.5 md:mb-2 block tracking-wider">Content Body</label>
//                                 <div className="bg-slate-950/30 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-800/50 text-xs md:text-sm text-gray-400 shadow-inner relative backdrop-blur-sm">
//                                     <p className="italic opacity-60 mb-2 md:mb-4 pl-2 md:pl-4 border-l-2 border-slate-700">"{DOC_CONFIG[formData.docType].intro}"</p>
//                                     <textarea 
//                                         className="w-full bg-slate-900/50 border border-slate-700 rounded-lg md:rounded-xl p-3 md:p-4 text-white h-32 md:h-40 resize-none focus:border-emerald-500 outline-none font-sans text-sm md:text-base leading-relaxed focus:shadow-lg transition-all backdrop-blur-sm" 
//                                         placeholder="Type message..." 
//                                         required 
//                                         value={formData.body} 
//                                         onChange={e=>setFormData({...formData, body: e.target.value})}
//                                     ></textarea>
//                                     <p className="italic opacity-60 mt-2 md:mt-4 pl-2 md:pl-4 border-l-2 border-slate-700">"{DOC_CONFIG[formData.docType].outro}"</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mb-6 md:mb-8 p-4 md:p-6 bg-slate-950/30 rounded-xl md:rounded-2xl border-2 border-slate-700 border-dashed hover:border-emerald-500/50 transition-colors relative z-10 group backdrop-blur-sm">
//                             <label className="text-xs md:text-sm font-bold text-slate-300 uppercase mb-2 md:mb-3 block flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
//                                 <FaFilePdf className="text-base md:text-lg"/> Digital Signature
//                             </label>
//                             <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="block w-full text-xs md:text-sm text-slate-400 file:mr-2 md:file:mr-4 file:py-1.5 md:file:py-2.5 file:px-3 md:file:px-6 file:rounded-full file:border-0 file:text-[10px] md:file:text-sm file:font-bold file:bg-slate-800/80 file:text-white hover:file:bg-slate-700 cursor-pointer"/>
//                         </div>

//                         <button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-3 md:py-5 rounded-xl md:rounded-2xl shadow-xl shadow-indigo-900/30 transition-all flex justify-center items-center gap-2 md:gap-3 text-sm md:text-lg transform active:scale-[0.98] relative overflow-hidden group">
//                             <FaPaperPlane className="relative z-10" /> 
//                             <span className="relative z-10">DISPATCH</span>
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     </div>
//   );
// };

// export default NoticeLayout;



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { jsPDF } from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FaFeatherAlt, FaFilePdf, FaPaperPlane, FaInbox, FaSearch, FaSpinner, 
  FaTimes, FaCheckDouble, FaUserShield, FaUser, FaBuilding,
  FaPenNib, FaUniversity, FaArrowLeft, FaChevronDown, FaUpload
} from "react-icons/fa";
import { BASE_URL } from "../../config";

// ==========================================
// 1. CONSTANTS & CONFIG (UNCHANGED)
// ==========================================

const DOC_CONFIG = {
    'Notice': {
        title: "OFFICIAL NOTICE",
        intro: "You are hereby officially informed regarding the subject cited above. This notice serves as a formal communication from the department requiring your immediate attention.",
        outro: "Failure to comply with the instructions mentioned in this notice may result in further legal or departmental action as per the procedure established by law.",
        closing: "Issued By,"
    },
    'Application': {
        title: "FORMAL APPLICATION",
        intro: "I am writing to formally submit this application regarding the subject mentioned above. This correspondence is generated via the official CrimeTrack portal.",
        outro: "I request your cooperation and a timely response regarding this matter. We are committed to maintaining departmental coordination.",
        closing: "Yours faithfully,"
    },
    'Circular': {
        title: "DEPARTMENT CIRCULAR",
        intro: "This circular is issued to bring specific information and directives to the notice of all concerned personnel within the jurisdiction.",
        outro: "All concerned officers and personnel are instructed to implement these directives with immediate effect. Any deviation will be viewed seriously.",
        closing: "Regards,"
    }
};

const SENIOR_RANKS = ["Commissioner", "Director", "Superintendent", "DCP", "ACP", "SP", "DSP", "IG", "DIG"];

const getBase64ImageFromURL = (url) => {
    return new Promise((resolve) => {
        if (!url) return resolve(null);
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = () => resolve(null);
        img.src = url;
    });
};

const isSeniorOfficer = (designation) => {
    if (!designation) return false;
    return SENIOR_RANKS.some(rank => designation.includes(rank));
};

const generatePDF = async (notice, userInfoToken) => {
    const doc = new jsPDF();
    const type = notice.docType; 
    const sender = notice.sender;
    const receiver = notice.receiver;
    const config = DOC_CONFIG[type];
    const date = new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    let fullReceiver = {};
    if (receiver.type !== 'station') {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${receiver.type}&query=${receiver.targetId}`, {
                headers: { Authorization: `Bearer ${userInfoToken}` }
            });
            fullReceiver = data.find(u => u._id === receiver.targetId) || {};
        } catch (e) { console.error("Fetch Error", e); }
    } else {
        fullReceiver = { station: receiver.targetId }; 
    }

    doc.setFillColor(235, 247, 235); 
    doc.rect(5, 5, 200, 38, 'F'); 
    doc.setDrawColor(20, 100, 20); 
    doc.setLineWidth(0.5);
    doc.rect(5, 5, 200, 38);

    const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
    const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");
    if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 9, 30, 30);
    if (policeLogo) doc.addImage(policeLogo, "PNG", 168, 9, 30, 30);

    doc.setFont("times", "bold");
    doc.setFontSize(24);
    doc.setTextColor(15, 70, 15);
    doc.text("MAHARASHTRA STATE POLICE", 105, 18, null, null, "center");

    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.setTextColor(0);
    doc.text("Official Digital Communication | CrimeTrack System", 105, 26, null, null, "center");
    
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("GOVERNMENT OF MAHARASHTRA", 105, 33, null, null, "center");

    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.setTextColor(0);
    doc.text(config.title, 105, 55, null, null, "center");
    doc.setLineWidth(0.5);
    doc.line(75, 57, 135, 57); 

    doc.setFontSize(11);
    doc.text(`Date: ${date}`, 190, 68, { align: "right" });
    doc.text(`Ref: CT/${new Date().getFullYear()}/${notice._id.slice(-6).toUpperCase()}`, 20, 68);

    doc.setFont("times", "bold");
    doc.text("To,", 20, 82);
    doc.setFont("times", "normal");

    let yPos = 88;
    const lineHeight = 6;

    if (receiver.type === 'citizen') {
        const name = fullReceiver.firstName ? `${fullReceiver.firstName} ${fullReceiver.lastName}` : receiver.targetName;
        const title = fullReceiver.title || ""; 
        const displayName = title ? `${title} ${name}` : name;
        doc.text(displayName, 20, yPos);
        yPos += lineHeight;
        if (fullReceiver.aadhar) {
            doc.text(`Aadhaar No: ${fullReceiver.aadhar}`, 20, yPos);
            yPos += lineHeight;
        }
        doc.text("Chandrapur District", 20, yPos);
    } 
    else if (receiver.type === 'officer') {
        const name = fullReceiver.firstName ? `${fullReceiver.firstName} ${fullReceiver.lastName}` : receiver.targetName;
        const title = fullReceiver.title || "";
        const designation = fullReceiver.designation || "Officer";
        const station = fullReceiver.station || "Police Department";
        doc.text(designation, 20, yPos);
        yPos += lineHeight;
        doc.text(`${title} ${name}`.trim(), 20, yPos);
        yPos += lineHeight;
        doc.text(`${station}, Chandrapur`, 20, yPos);
    } 
    else {
        doc.text("The Station House Officer,", 20, yPos);
        yPos += lineHeight;
        doc.text(`${receiver.targetName}, Chandrapur`, 20, yPos);
    }

    yPos += 12;
    doc.setFont("times", "bold");
    doc.text("Subject:", 20, yPos);
    doc.setFont("times", "normal");
    const splitSubject = doc.splitTextToSize(notice.subject, 150);
    doc.text(splitSubject, 45, yPos);
    yPos += (splitSubject.length * 6) + 10;

    let salutation = "Respected Sir/Madam,";
    if (receiver.type !== 'station') {
        if (fullReceiver.gender === 'Male' || fullReceiver.title === 'Mr.') salutation = "Respected Sir,";
        if (fullReceiver.gender === 'Female' || fullReceiver.title === 'Mrs.' || fullReceiver.title === 'Ms.') salutation = "Respected Madam,";
    } else {
        salutation = "Respected Officer In-Charge,";
    }
    
    doc.text(salutation, 20, yPos);
    yPos += 10;

    doc.setFontSize(12);
    const splitIntro = doc.splitTextToSize(config.intro, 170);
    doc.text(splitIntro, 20, yPos);
    yPos += (splitIntro.length * 6) + 6;
    const splitMain = doc.splitTextToSize(notice.body, 170);
    doc.text(splitMain, 20, yPos);
    yPos += (splitMain.length * 6) + 6;
    const splitOutro = doc.splitTextToSize(config.outro, 170);
    doc.text(splitOutro, 20, yPos);
    yPos += (splitOutro.length * 6) + 20;

    if (yPos > 230) { doc.addPage(); yPos = 30; }

    const footerX = 140;
    doc.setFont("times", "bold");
    doc.text(config.closing, footerX, yPos);
    yPos += 5;

    if (notice.signatureUrl) {
        try {
            const sigImg = await getBase64ImageFromURL(notice.signatureUrl);
            if (sigImg) {
                doc.addImage(sigImg, "PNG", footerX, yPos, 35, 18);
                yPos += 20;
            } else {
                yPos += 15;
                doc.setFont("times", "italic");
                doc.setFontSize(9);
                doc.text("[Digital Signature Verified]", footerX, yPos);
            }
        } catch (e) {
            yPos += 15;
            doc.text("[Signed]", footerX, yPos);
        }
    } else {
        yPos += 20;
    }

    const senderName = sender.name;
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.text(senderName, footerX + 20, yPos, { align: "center" });
    yPos += 5;
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text(sender.designation || "Officer", footerX + 20, yPos, { align: "center" });
    yPos += 5;
    if (isSeniorOfficer(sender.designation)) {
        doc.text("Chandrapur District", footerX + 20, yPos, { align: "center" });
    } else {
        doc.text(`${sender.station}, Chandrapur`, footerX + 20, yPos, { align: "center" });
    }

    const pageHeight = doc.internal.pageSize.height;
    doc.setDrawColor(150);
    doc.setLineWidth(0.2);
    doc.line(10, pageHeight - 15, 200, pageHeight - 15);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text("Generated by CrimeTrack | Valid Official Document under IT Act.", 105, pageHeight - 10, null, null, "center");

    doc.save(`${type}_${notice._id}.pdf`);
};

// ==========================================
// 2. CUSTOM DROPDOWN COMPONENT (NEW)
// ==========================================
// This replaces standard <select> for better styling and animation
const CustomSelect = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find(o => o.value === value)?.label || value;

    return (
        <div className="group relative" ref={dropdownRef}>
            <label className="text-xs font-bold text-cyan-200/70 uppercase mb-2 block tracking-wider pl-2">{label}</label>
            
            <div 
                className={`w-full bg-slate-800/50 border ${isOpen ? 'border-cyan-400' : 'border-white/10'} rounded-2xl p-4 pl-5 text-white flex justify-between items-center cursor-pointer hover:border-white/30 transition-all shadow-inner backdrop-blur-sm`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-sm md:text-base">{selectedLabel}</span>
                <FaChevronDown className={`text-slate-400 text-xs transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}/>
            </div>

            {/* Animated Dropdown List */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 animate-dropdown-open origin-top ring-1 ring-black/50">
                    <div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
                        {options.map((opt) => (
                            <div 
                                key={opt.value}
                                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                                className={`p-3 pl-5 rounded-xl cursor-pointer transition-all duration-300 mb-1 flex items-center justify-between
                                    ${value === opt.value 
                                        ? 'bg-gradient-to-r from-cyan-900/50 to-blue-900/50 text-cyan-300 border border-cyan-500/30' 
                                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                    }
                                `}
                            >
                                <span className="text-sm font-medium">{opt.label}</span>
                                {value === opt.value && <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ==========================================
// 4. MAIN COMPONENT (ENHANCED UI)
// ==========================================

const NoticeLayout = () => {
  const navigate = useNavigate();
  const { section } = useParams(); 
  const view = section || "inbox"; 

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const role = userInfo.role || "";
  const isCitizen = role.toLowerCase() === 'citizen';

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
      docType: "Notice",
      receiverType: "citizen",
      subject: "",
      body: ""
  });
  
  const [selectedReceivers, setSelectedReceivers] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [signature, setSignature] = useState(null);

  useEffect(() => {
      if (isCitizen && (view === 'compose' || view === 'sent')) {
          navigate('/official-docs/inbox', { replace: true });
      }
  }, [view, isCitizen, navigate]);

  const handleTabChange = (newView) => {
      navigate(`/official-docs/${newView}`);
  };

  const fetchNotices = async (currentView) => {
      if (isCitizen && currentView === 'sent') return;
      if (currentView !== 'inbox' && currentView !== 'sent') return;
      
      setLoading(true);
      try {
          const token = userInfo.token;
          const endpoint = currentView === 'sent' ? 'sent' : 'inbox';
          const { data } = await axios.get(`${BASE_URL}/api/notices/${endpoint}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          setNotices(data);
      } catch (error) { toast.error("Load failed"); }
      finally { setLoading(false); }
  };

  useEffect(() => {
      fetchNotices(view);
  }, [view]);

  const handleDownload = (notice) => {
      const loadToast = toast.loading("Downloading Document...");
      generatePDF(notice, userInfo.token)
        .then(() => toast.success("Downloaded", { id: loadToast }))
        .catch(() => toast.error("Error", { id: loadToast }));
  };

  const handleSearch = async (overrideQuery = null) => {
      const query = overrideQuery !== null ? overrideQuery : searchQuery;
      setIsSearching(true);
      try {
          const roleSearch = formData.receiverType === 'citizen' ? 'citizen' : 'police';
          const apiRole = formData.receiverType === 'station' ? 'station' : roleSearch;

          const { data } = await axios.get(`${BASE_URL}/api/notices/search-users?role=${apiRole}&query=${query}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` }
          });
          setSearchResults(data);
      } catch (error) { toast.error("Search failed"); }
      finally { setIsSearching(false); }
  };

  const isSelected = (id) => selectedReceivers.some(r => r.id === id);

  const toggleReceiver = (item) => {
      if (isSelected(item._id)) {
          setSelectedReceivers(selectedReceivers.filter(r => r.id !== item._id));
      } else {
          const itemName = item.name ? item.name : `${item.firstName} ${item.lastName}`;
          setSelectedReceivers([...selectedReceivers, { 
              id: item._id, 
              name: itemName, 
              role: formData.receiverType,
              photo: item.idPhoto 
          }]);
      }
  };

  const handleSelectAll = () => {
      if (selectedReceivers.length === searchResults.length) {
          setSelectedReceivers([]); 
      } else {
          const all = searchResults.map(item => ({
              id: item._id,
              name: item.name ? item.name : `${item.firstName} ${item.lastName}`,
              role: formData.receiverType,
              photo: item.idPhoto
          }));
          setSelectedReceivers(all);
      }
  };

  const handleSend = async (e) => {
      e.preventDefault();
      if(formData.receiverType !== 'station' && selectedReceivers.length === 0) return toast.error("Select receiver");
      if(formData.receiverType === 'station' && selectedReceivers.length === 0) return toast.error("Search & Select Station");

      const loadToast = toast.loading("Dispatching...");
      try {
          const targets = selectedReceivers;
          for (const target of targets) {
              const payload = new FormData();
              payload.append("docType", formData.docType);
              payload.append("receiverType", formData.receiverType);
              const idToSend = formData.receiverType === 'station' ? target.name : target.id;
              payload.append("targetId", idToSend);
              payload.append("subject", formData.subject);
              payload.append("body", formData.body);
              if(signature) payload.append("signature", signature);

              await axios.post(`${BASE_URL}/api/notices/send`, payload, {
                  headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" }
              });
          }
          toast.success(`Sent to ${targets.length} recipients`, { id: loadToast });
          handleTabChange("sent"); 
          setSelectedReceivers([]);
          setSearchQuery("");
          setSearchResults([]);
          setSignature(null);
          setFormData({ ...formData, subject: "", body: "" });
      } catch (error) { toast.error("Dispatch Failed", { id: loadToast }); }
  };

  // --- UI HELPER: Custom Styles for Animation ---
  const styles = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-enter { animation: fadeIn 0.5s ease-out forwards; }
    .animate-dropdown-open { animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
  `;

  return (
    <div 
        className="h-screen w-full flex flex-col font-sans text-slate-100 overflow-hidden bg-cover bg-center relative"
        style={{ backgroundImage: "url('/assets/police-bg.png')" }} 
    >
        <style>{styles}</style>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-black/95 pointer-events-none"></div>

        {/* --- STICKY HEADER (Enhanced UI) --- */}
        <div className="relative z-20 w-full flex-none pt-4 px-3 md:pt-6 md:px-6">
            
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-6 left-3 md:top-8 md:left-6 z-50 bg-slate-800/40 backdrop-blur-md text-white p-3 rounded-full shadow-xl border border-white/10 hover:bg-cyan-600/20 hover:border-cyan-500/50 transition-all group active:scale-95"
                title="Go Back"
            >
                <FaArrowLeft className="text-base md:text-lg group-hover:-translate-x-1 transition-transform text-cyan-300"/>
            </button>

            <div className="flex flex-col md:flex-row items-center justify-between bg-white/5 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/10 shadow-2xl pl-14 md:pl-20">
                <div className="flex items-center gap-4 mb-3 md:mb-0 w-full md:w-auto">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20 transform rotate-3">
                        <FaUniversity className="text-white text-xl md:text-2xl" />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">Official Dispatch</h2>
                        <p className="text-[10px] md:text-xs text-cyan-200 uppercase tracking-[0.2em] font-bold opacity-80">Secure Communication Channel</p>
                    </div>
                </div>

                {/* TABS (Pill Style) */}
                <div className="flex gap-2 bg-black/20 p-1.5 rounded-full border border-white/5 overflow-x-auto backdrop-blur-md w-full md:w-auto">
                    <button onClick={() => handleTabChange("inbox")} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-500 ${view === 'inbox' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                        <FaInbox className={view === 'inbox' ? "animate-pulse" : ""} /> Inbox
                    </button>

                    {!isCitizen && (
                        <>
                            <button onClick={() => handleTabChange("compose")} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-500 ${view === 'compose' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                <FaFeatherAlt className={view === 'compose' ? "animate-bounce" : ""} /> Compose
                            </button>
                            <button onClick={() => handleTabChange("sent")} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-500 ${view === 'sent' ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                <FaPaperPlane className={view === 'sent' ? "translate-x-1" : ""} /> Sent
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-3 md:p-6 pb-24">
            {(view === 'inbox' || (!isCitizen && view === 'sent')) && (
                <div className="space-y-4 max-w-7xl mx-auto animate-enter">
                    {loading ? (
                        <div className="text-center py-20 flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4 shadow-lg shadow-cyan-500/20"></div>
                            <p className="text-cyan-200 text-sm md:text-base animate-pulse font-medium tracking-wide">Syncing Records...</p>
                        </div>
                    ) : notices.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
                            <div className="bg-slate-800/50 p-6 rounded-full mb-4">
                                <FaInbox className="text-5xl text-slate-500"/>
                            </div>
                            <p className="text-slate-400 font-medium text-lg">No official records found.</p>
                        </div>
                    ) : (
                        notices.map((notice, index) => (
                            <div 
                                key={notice._id} 
                                style={{ animationDelay: `${index * 100}ms` }}
                                className="animate-enter relative group bg-slate-900/40 backdrop-blur-md border border-white/5 p-5 md:p-7 rounded-[1.5rem] hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/10 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Glowing Side Bar */}
                                <div className={`absolute top-0 left-0 w-1.5 h-full transition-all duration-500 group-hover:w-2 ${notice.docType === 'Notice' ? 'bg-gradient-to-b from-red-500 to-orange-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-gradient-to-b from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'}`}></div>
                                
                                <div className="flex justify-between items-start mb-4 pl-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full border shadow-sm tracking-wide ${notice.docType === 'Notice' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
                                                {notice.docType}
                                            </span>
                                            <span className="text-xs text-slate-400 font-mono tracking-tight opacity-70">{new Date(notice.createdAt).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">{notice.subject}</h3>
                                    </div>
                                    <button onClick={() => handleDownload(notice)} className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all border border-white/10 hover:border-cyan-500 shadow-lg active:scale-95 group/btn">
                                        <FaFilePdf className="text-lg text-red-400 group-hover/btn:scale-110 transition-transform" /> <span className="hidden sm:inline">PDF</span>
                                    </button>
                                </div>

                                <div className="pl-4 flex flex-wrap gap-3 text-xs text-slate-400 mb-4 items-center">
                                    <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                                        <FaUserShield className="text-indigo-400"/> <span>From: <b className="text-slate-200">{notice.sender.name}</b></span>
                                    </div>
                                    <div className="hidden sm:block text-slate-600">→</div>
                                    <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                                        <FaUser className="text-emerald-400"/> <span>To: <b className="text-slate-200">{notice.receiver.targetName}</b></span>
                                    </div>
                                </div>

                                <div className="pl-4">
                                    <p className="text-sm text-slate-300 bg-black/20 p-4 rounded-2xl border border-white/5 italic line-clamp-2 leading-relaxed font-light">"{notice.body}"</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {!isCitizen && view === 'compose' && (
                <div className="pb-10 max-w-4xl mx-auto animate-enter">
                    <form onSubmit={handleSend} className="bg-slate-900/60 backdrop-blur-2xl p-6 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                        
                        {/* Form Header */}
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                            <div className="p-3 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl shadow-lg shadow-emerald-500/20">
                                <FaPenNib className="text-white text-xl"/>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Draft Document</h3>
                                <p className="text-xs text-emerald-200/60 uppercase font-bold tracking-widest">Official Use Only</p>
                            </div>
                        </div>
                        
                        {/* Selectors - Using Custom Component */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <CustomSelect 
                                label="Document Type"
                                value={formData.docType}
                                onChange={(val) => setFormData({...formData, docType: val})}
                                options={[
                                    { value: 'Notice', label: 'Notice' },
                                    { value: 'Application', label: 'Application' },
                                    { value: 'Circular', label: 'Circular' },
                                ]}
                            />
                            
                            <CustomSelect 
                                label="Recipient Group"
                                value={formData.receiverType}
                                onChange={(val) => {
                                    setFormData({...formData, receiverType: val}); 
                                    setSelectedReceivers([]); 
                                    setSearchQuery(""); 
                                    setSearchResults([]);
                                }}
                                options={[
                                    { value: 'citizen', label: 'Citizens' },
                                    { value: 'officer', label: 'Police Officers' },
                                    { value: 'station', label: 'Police Station' },
                                ]}
                            />
                        </div>

                        {/* Search & Select */}
                        <div className="mb-8 p-6 bg-black/20 rounded-3xl border border-white/5">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-3 block tracking-wider flex justify-between">
                                <span>{formData.receiverType === 'station' ? "Find Station" : "Find Receiver"}</span>
                                {selectedReceivers.length > 0 && <span className="text-emerald-400">{selectedReceivers.length} Selected</span>}
                            </label>
                            
                            <div className="flex gap-3 relative mb-4">
                                <div className="relative w-full">
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"/>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-800/80 border border-transparent rounded-2xl p-3 pl-10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 focus:bg-slate-800" 
                                        placeholder="Type to search..." 
                                        value={searchQuery} 
                                        onChange={e=>setSearchQuery(e.target.value)} 
                                    />
                                </div>
                                <button type="button" onClick={() => handleSearch()} className="bg-indigo-600 hover:bg-indigo-500 px-6 rounded-2xl text-white font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95">
                                    {isSearching ? <FaSpinner className="animate-spin"/> : "Find"}
                                </button>
                            </div>

                            {/* Search Results Area */}
                            {searchResults.length > 0 && (
                                <div className="animate-enter bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                                    <div className="flex justify-between items-center p-3 bg-white/5 border-b border-white/5">
                                        <span className="text-xs text-indigo-300 font-bold uppercase">{searchResults.length} Matches</span>
                                        <button type="button" onClick={handleSelectAll} className="text-xs text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors">Select All</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1 max-h-48 overflow-y-auto custom-scrollbar">
                                        {searchResults.map(u => {
                                            const active = isSelected(u._id);
                                            return (
                                                <div 
                                                    key={u._id} 
                                                    onClick={() => toggleReceiver(u)} 
                                                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                                                >
                                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-black/40 flex-shrink-0">
                                                        {u.idPhoto ? <img src={u.idPhoto} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center"><FaUser className="text-xs"/></div>}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-sm font-bold truncate">{u.firstName || u.name} {u.lastName}</h4>
                                                        <p className="text-[10px] opacity-70 truncate">{u.email || u.district}</p>
                                                    </div>
                                                    {active && <FaCheckDouble className="ml-auto text-xs"/>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Selected Pills */}
                            {selectedReceivers.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4 animate-enter">
                                    {selectedReceivers.map(r => (
                                        <div key={r.id} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs pl-2 pr-1 py-1 rounded-full shadow-lg border border-white/10">
                                            <span>{r.name}</span>
                                            <button type="button" onClick={() => toggleReceiver({ _id: r.id })} className="p-1 hover:bg-white/20 rounded-full transition-colors"><FaTimes /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Subject & Body */}
                        <div className="space-y-6 mb-8">
                            <div className="group">
                                <label className="text-xs font-bold text-cyan-200/70 uppercase mb-2 block tracking-wider pl-2">Subject Line</label>
                                <input type="text" className="w-full bg-slate-800/50 border border-white/10 rounded-2xl p-4 text-white font-semibold focus:border-cyan-400 focus:bg-slate-800 outline-none transition-all shadow-inner backdrop-blur-sm" placeholder="Enter formal subject..." required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
                            </div>
                            
                            <div>
                                <label className="text-xs font-bold text-cyan-200/70 uppercase mb-2 block tracking-wider pl-2">Content Body</label>
                                <div className="bg-slate-800/30 p-6 rounded-[1.5rem] border border-white/10 text-sm text-gray-400 shadow-inner backdrop-blur-md">
                                    <p className="italic opacity-50 mb-4 pl-4 border-l-2 border-indigo-500">"{DOC_CONFIG[formData.docType].intro}"</p>
                                    <textarea 
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-white h-40 resize-none focus:border-cyan-400 outline-none font-sans leading-relaxed focus:shadow-lg transition-all focus:bg-slate-900" 
                                        placeholder="Type the main content of the notice here..." 
                                        required 
                                        value={formData.body} 
                                        onChange={e=>setFormData({...formData, body: e.target.value})}
                                    ></textarea>
                                    <p className="italic opacity-50 mt-4 pl-4 border-l-2 border-indigo-500">"{DOC_CONFIG[formData.docType].outro}"</p>
                                </div>
                            </div>
                        </div>

                        {/* Digital Signature */}
                        <div className="mb-8 p-1 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-cyan-500/50 transition-colors group cursor-pointer relative overflow-hidden">
                            <input type="file" accept="image/*" onChange={e => setSignature(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-cyan-600 transition-colors">
                                        <FaUpload className="text-slate-400 group-hover:text-white"/>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Digital Signature</p>
                                        <p className="text-[10px] text-slate-400">{signature ? signature.name : "Upload PNG/JPG (Required for Auth)"}</p>
                                    </div>
                                </div>
                                {signature && <FaCheckDouble className="text-emerald-400 text-lg"/>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] transition-all flex justify-center items-center gap-3 text-lg transform active:scale-[0.98] group">
                            <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /> 
                            <span>DISPATCH OFFICIAL DOCUMENT</span>
                        </button>
                    </form>
                </div>
            )}
        </div>
    </div>
  );
};

export default NoticeLayout;