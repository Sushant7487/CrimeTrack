
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { createPortal } from "react-dom";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import {
//   FaFolderOpen, FaTimes, FaCheckCircle, FaExclamationTriangle, FaEdit, FaSave,
//   FaUser, FaPhoneAlt, FaIdCard, FaMapMarkerAlt, FaExpand, FaCompress, FaUserSecret,
//   FaShieldAlt, FaCalendarAlt, FaMapMarkedAlt, FaGlobeAmericas, FaVolumeUp,
//   FaFingerprint, FaGavel, FaFileAlt, FaHistory, FaFileDownload, FaChevronDown, FaArrowLeft,
//   FaLocationArrow, FaExternalLinkAlt, FaBalanceScale, FaLandmark
// } from "react-icons/fa";

// // Ensure these utils exist in your project
// import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../../utils/PDFGenerator";
// import SkeletonLoader from "../common/SkeletonLoader";
// import TimelineView from "../common/TimelineView";

// const CaseReview = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [complaint, setComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // UI States
//   const [previewImage, setPreviewImage] = useState(null);
//   const [expandedMap, setExpandedMap] = useState(false);
//   const [isEditingNote, setIsEditingNote] = useState(false);
//   const [noteContent, setNoteContent] = useState("");
//   const [activeDropdown, setActiveDropdown] = useState(false);

//   // Map States
//   const [mapQuery, setMapQuery] = useState(""); 

//   // Status Modal States
//   const [statusModal, setStatusModal] = useState({ show: false, newStatus: "" });
//   const [remarkText, setRemarkText] = useState("");

//   const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
//   const MANUAL_STATUS_FLOW = ["Investigation Started", "Action Taken", "Closed"];
//   const STATUS_STEPS = ['Received', 'Assigned', 'FIR/NCR Filed', 'Investigation', 'Action', 'Closed'];

//   // --- FETCH DATA ---
//   const fetchComplaintDetails = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/all", config);
//       const found = Array.isArray(data) ? data.find(c => c._id === id) : null;
      
//       if (found) {
//         setComplaint(found);
//         setNoteContent(found.importantNote?.text || "");
//         // Initialize map with incident location
//         extractAndSetMapLocation(found.incidentLocationAddress, found.selectedStation);
//       } else {
//         toast.error("Case not found");
//         navigate(-1);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load case details");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id && userInfo.token) fetchComplaintDetails();
//   }, [id]);

//   // --- MAP LOGIC HELPERS ---
//   const extractAndSetMapLocation = (locationAddr, station) => {
//     let query = station || "India"; 

//     if (locationAddr) {
//         if (locationAddr.includes("http") && locationAddr.includes("q=")) {
//             const match = locationAddr.match(/q=([^&]+)/);
//             if (match && match[1]) query = match[1];
//         } 
//         else if (locationAddr.includes("Lat:")) {
//              const clean = locationAddr.replace("Lat:", "").replace("Long:", "").replace("(Auto-Detected)", "").trim();
//              query = clean;
//         }
//         else if (!locationAddr.includes("http")) {
//             query = locationAddr;
//         }
//     }
//     setMapQuery(query);
//   };

//   const handleMyLocation = () => {
//     if (!navigator.geolocation) {
//         toast.error("Geolocation not supported");
//         return;
//     }
//     toast.loading("Locating officer...");
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             toast.dismiss();
//             const { latitude, longitude } = position.coords;
//             setMapQuery(`${latitude},${longitude}`);
//             toast.success("Map centered on your location");
//         },
//         () => {
//             toast.dismiss();
//             toast.error("Unable to retrieve location");
//         }
//     );
//   };

//   // --- HELPERS ---
//   const formatDateTime = (dateString) => {
//     try {
//       if (!dateString) return "N/A";
//       return new Date(dateString).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
//     } catch (e) { return "Invalid Date"; }
//   };

//   const safeIdSlice = (txt) => txt && typeof txt === 'string' ? txt.slice(-6).toUpperCase() : "UNKNOWN";

//   const checkAssignment = (c) => {
//     if (!c || !c.assignedOfficer) return false;
//     if (userInfo.role === 'senior' || userInfo.designation === 'DGP') return true;
//     const assigned = (c.assignedOfficer || "").toLowerCase();
//     const myName = (userInfo.name || "").toLowerCase();
//     return assigned !== "not assigned" && assigned.includes(myName);
//   };

//   const getStatusStep = (status) => {
//     const s = status ? status.toLowerCase() : "";
//     if (s.includes('closed')) return 5;
//     if (s.includes('action')) return 4;
//     if (s.includes('investigation')) return 3;
//     if (s.includes('fir') || s.includes('ncr')) return 2;
//     if (s.includes('assigned')) return 1;
//     return 0;
//   };

//   const getDownloadText = (c) => c.status === "Closed" ? "Download Final Report" : (c.officialRecord?.recordNumber ? "Download FIR Copy" : "Download Receipt");

//   const getAvailableStatuses = (current) => {
//     if (!current || current === "Closed") return [];
//     const idx = MANUAL_STATUS_FLOW.indexOf(current);
//     return MANUAL_STATUS_FLOW.filter((s, index) => index > idx);
//   };

//   // --- ACTIONS ---
//   const saveImportantNote = async () => {
//     if (!checkAssignment(complaint)) return toast.error("Permission Denied.");
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.put(`https://crimetrack-api.onrender.com/api/crime/update/${complaint._id}`, { importantNoteText: noteContent }, config);
//       setComplaint(data);
//       setIsEditingNote(false);
//       toast.success("Internal Note Saved");
//     } catch (error) { toast.error("Failed to save note."); }
//   };

//   const initiateStatusUpdate = (newStatus) => {
//     setStatusModal({ show: true, newStatus });
//     setRemarkText("");
//     setActiveDropdown(false);
//   };

//   const submitStatusUpdate = async () => {
//     if (!remarkText.trim()) return toast.error("Remark is required!");
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       await axios.put(`https://crimetrack-api.onrender.com/api/crime/update/${complaint._id}`, { status: statusModal.newStatus, remark: remarkText }, config);
//       toast.success(`Case Status Updated`);
//       setStatusModal({ show: false, newStatus: "" });
//       fetchComplaintDetails();
//     } catch (error) { toast.error("Update Failed"); }
//   };

//   const handleDownload = (c) => {
//     try {
//       if (c.status === "Closed") generateFinalReport(c);
//       else if (c.officialRecord?.recordNumber) generateOfficialRecord(c);
//       else generateReceipt(c);
//       toast.success("Document Generated");
//     } catch (err) { console.error(err); toast.error("Failed to generate PDF."); }
//   };

//   // --- SUB COMPONENTS ---
//   // Adjusted font sizes for mobile
//   const InfoBlock = ({ label, value, icon }) => (
//     <div className="flex flex-col border-b border-slate-700/50 pb-2 md:pb-3 last:border-0">
//       <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1.5 mb-0.5 md:mb-1">
//         {icon} {label}
//       </span>
//       <span className="text-sm md:text-base text-slate-100 font-medium font-sans break-words tracking-wide">{value || "—"}</span>
//     </div>
//   );

//   const ProfileCard = ({ title, data, color, photo, isAnonymous }) => {
//     const colors = { slate: "border-slate-500", blue: "border-blue-500", red: "border-red-500" };
//     return (
//       <div className={`bg-slate-900/60 backdrop-blur-md border-t-4 ${colors[color]} rounded-lg p-4 md:p-6 flex flex-col h-full shadow-lg border border-slate-700/50 relative overflow-hidden group hover:shadow-2xl transition-all`}>
//         <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-${color}-500/10 to-transparent -z-10`}></div>
//         <h3 className={`text-${color}-400 text-xs md:text-sm font-black uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2 drop-shadow-sm`}>{title}</h3>
//         {isAnonymous ? (
//           <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-60 min-h-[150px] md:min-h-[200px]">
//             <FaUserSecret className="text-4xl md:text-6xl mb-3" />
//             <p className="text-sm md:text-base font-bold uppercase">Anonymous</p>
//           </div>
//         ) : (
//           <>
//             <div className="flex justify-center mb-4 md:mb-6 relative">
//               {photo ? (
//                 <div className="relative cursor-pointer group/img" onClick={() => setPreviewImage(photo)}>
//                   {/* Smaller image on mobile */}
//                   <img src={photo} alt={title} className={`w-20 h-20 md:w-32 md:h-32 object-cover rounded-full border-4 border-slate-800 shadow-2xl transition-transform group-hover/img:scale-105`} />
//                   <div className="absolute inset-0 rounded-full bg-black/40 hidden group-hover/img:flex items-center justify-center text-white"><FaExpand /></div>
//                 </div>
//               ) : (
//                 <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-slate-500 text-xs md:text-sm font-bold uppercase shadow-inner">No Photo</div>
//               )}
//             </div>
//             <div className="space-y-3 md:space-y-4 flex-1">
//               <InfoBlock label="Full Name" value={data.name} icon={<FaUser className={`text-${color}-400`} />} />
              
//               <div className="grid grid-cols-2 gap-2 md:gap-4">
//                 <InfoBlock label="Gender" value={data.gender} />
//                 {data.age !== undefined && <InfoBlock label="Age" value={data.age ? `${data.age} Yrs` : null} />}
//               </div>

//               <InfoBlock label="Contact" value={data.contact} icon={<FaPhoneAlt />} />
//               <InfoBlock label="Aadhaar" value={data.aadhar} icon={<FaIdCard />} />
              
//               {data.address !== undefined && <InfoBlock label="Address" value={data.address} icon={<FaMapMarkerAlt />} />}
//             </div>
//           </>
//         )}
//       </div>
//     );
//   };

//   if (loading) return <div className="p-10"><SkeletonLoader count={1} /></div>;
//   if (!complaint) return null;

//   const isAssignedToMe = checkAssignment(complaint);
//   const isFirFiled = !!complaint.officialRecord?.recordNumber;
//   const isClosed = complaint.status === "Closed";

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-10 relative overflow-hidden">
      
//       {/* BACKGROUND IMAGE LAYER */}
//       <div className="fixed inset-0 z-0">
//         <img 
//             src="/dashboard-bg.png" 
//             alt="Background" 
//             className="w-full h-full object-cover opacity-60" 
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90"></div>
//       </div>

//       {/* 1. Header */}
//       {/* Reduced padding for mobile */}
//       <div className="bg-slate-900/80 backdrop-blur-md px-3 py-3 md:px-6 md:py-4 border-b border-slate-700/60 flex justify-between items-center sticky top-0 z-30 shadow-lg relative">
//         <div className="flex items-center gap-2 md:gap-5">
//           <button onClick={() => navigate("/police/complaints")} className="text-slate-400 hover:text-white flex items-center gap-1 md:gap-2 text-xs md:text-sm font-bold uppercase tracking-wide transition-colors">
//             <FaArrowLeft /> <span className="hidden md:inline">Back</span>
//           </button>
//           <div className="h-6 md:h-8 w-px bg-slate-700 hidden md:block"></div>
//           <div className="flex items-center gap-2 md:gap-4">
//             <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-amber-600 to-yellow-700 text-white rounded-lg flex items-center justify-center text-base md:text-2xl shadow-lg border border-yellow-500/50"><FaFolderOpen /></div>
//             <div>
//               <h2 className="text-sm md:text-2xl font-black text-white tracking-wide md:tracking-widest uppercase flex flex-col md:flex-row md:items-center gap-0 md:gap-3">
//                 <span>Official Case File</span> <span className="w-fit bg-red-900/50 text-red-300 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded border border-red-500/30 font-mono tracking-normal">CONFIDENTIAL</span>
//               </h2>
//               <div className="flex gap-2 md:gap-4 mt-0.5 md:mt-1 text-[10px] md:text-sm items-center font-mono">
//                 <span className="text-amber-500 px-1.5 md:px-2 py-0.5 rounded bg-amber-900/10 border border-amber-600/20">ID: {safeIdSlice(complaint._id)}</span>
//                 <span className="text-slate-500">|</span>
//                 <span className="text-slate-300 uppercase font-bold truncate max-w-[100px] md:max-w-none">{complaint.selectedStation}</span>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex gap-2 md:gap-3">
//              {isFirFiled && isAssignedToMe && !isClosed && (
//                 <div className="relative">
//                     <button onClick={() => setActiveDropdown(!activeDropdown)} className="flex items-center gap-1 md:gap-2 py-1.5 px-3 md:py-2.5 md:px-5 bg-slate-800 text-blue-400 border border-slate-600 rounded text-xs md:text-sm font-bold uppercase hover:bg-slate-700 transition shadow-sm">
//                         <span>Status</span><FaChevronDown />
//                     </button>
//                     {activeDropdown && (
//                         <div className="absolute top-full right-0 mt-1 w-48 md:w-56 bg-slate-800 border border-slate-600 rounded shadow-xl z-50 overflow-hidden">
//                             {getAvailableStatuses(complaint.status).map((status) => (
//                                 <button key={status} onClick={() => initiateStatusUpdate(status)} className="w-full text-left px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm font-medium text-white hover:bg-blue-600 border-b border-slate-700 last:border-0 transition-colors">
//                                     {status}
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//              )}
//              <button onClick={() => handleDownload(complaint)} className="hidden md:flex px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-sm shadow-lg items-center gap-2 uppercase"><FaFileDownload /> {getDownloadText(complaint)}</button>
//         </div>
//       </div>

//       {/* 2. Status Bar */}
//       <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 relative z-20 shadow-md">
//         <div className="px-2 md:px-8 py-4 md:py-8 relative overflow-hidden">
//           <div className="relative max-w-7xl mx-auto overflow-x-auto">
//             {/* Added overflow-x-auto for mobile scrolling */}
//             <div className="min-w-[500px] md:min-w-[600px] relative pb-4 md:pb-6 px-4">
//                 <div className="absolute top-4 md:top-5 left-0 w-full h-2 md:h-3 bg-slate-800/80 rounded-full shadow-inner"></div>
//                 <div className="absolute top-4 md:top-5 left-0 h-2 md:h-3 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-[length:200%_100%] animate-pulse transition-all duration-1000 ease-out shadow-[0_0_20px_#3b82f6] rounded-full" style={{ width: `${Math.min((getStatusStep(complaint.status) / 5) * 100, 100)}%` }}></div>
                
//                 <div className="flex justify-between relative w-full pt-0.5 md:pt-1">
//                 {STATUS_STEPS.map((step, i) => {
//                     const isActive = i <= getStatusStep(complaint.status);
//                     return (
//                     <div key={i} className="flex flex-col items-center gap-1 md:gap-3 z-10 w-20 md:w-28 group">
//                         <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-base font-bold border-2 transition-all duration-500 ${isActive ? 'bg-slate-900 border-cyan-400 text-cyan-400 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'bg-slate-800 border-slate-700 text-slate-600'}`}>
//                         {isActive ? <FaCheckCircle /> : i + 1}
//                         </div>
//                         <p className={`text-[9px] md:text-xs font-bold uppercase tracking-widest text-center transition-colors duration-300 ${isActive ? 'text-cyan-400 drop-shadow-md' : 'text-slate-600'}`}>{step}</p>
//                     </div>
//                     );
//                 })}
//                 </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-[#0b1120]/80 border-t border-slate-800 px-3 md:px-8 py-3 md:py-5 flex flex-col md:flex-row items-start gap-2 md:gap-4">
//           <div className="bg-amber-500/10 p-2 md:p-3 rounded-full text-amber-500 border border-amber-500/20 text-sm md:text-base"><FaExclamationTriangle /></div>
//           <div className="flex-1 w-full">
//             <div className="flex justify-between items-center mb-1 md:mb-2">
//               <h3 className="text-amber-500 font-bold uppercase text-xs md:text-sm tracking-widest">Internal Investigation Notes</h3>
//               {checkAssignment(complaint) && (
//                 <button onClick={() => setIsEditingNote(!isEditingNote)} className="text-slate-400 hover:text-white text-xs md:text-sm flex items-center gap-1 hover:underline bg-slate-800 px-2 md:px-3 py-1 md:py-1.5 rounded border border-slate-700"><FaEdit /> {isEditingNote ? "Cancel" : "Edit Note"}</button>
//               )}
//             </div>
//             {isEditingNote ? (
//               <div className="animate-fade-in-up mt-2">
//                 <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 md:p-4 text-white text-sm md:text-base mb-2 md:mb-3 font-mono resize-none focus:border-amber-500 outline-none shadow-inner" rows="4" placeholder="Enter strictly confidential notes..."></textarea>
//                 <button onClick={saveImportantNote} className="bg-amber-600 hover:bg-amber-500 text-black py-1.5 md:py-2 px-4 md:px-6 rounded font-bold text-xs md:text-sm uppercase tracking-wide shadow-md"><FaSave className="inline mr-1" /> Save Record</button>
//               </div>
//             ) : (
//               <p className="text-slate-300 italic text-xs md:text-base leading-relaxed font-mono pl-3 md:pl-4 border-l-4 border-slate-700 min-h-[20px] md:min-h-[24px]">
//                 {complaint.importantNote?.text ? `"${complaint.importantNote.text}"` : <span className="text-slate-600">No notes recorded.</span>}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 3. Content Body */}
//       <div className="max-w-[100rem] mx-auto p-3 md:p-10 relative z-10">
        
//         {/* ROW 1: PROFILES */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-10">
//           {!complaint.isAnonymous && complaint.user && (
//             <ProfileCard
//               title="Registered By (Citizen)"
//               color="slate"
//               isAnonymous={false}
//               photo={complaint.user?.idPhoto || null} 
//               data={{
//                 name: `${complaint.user.title || ''} ${complaint.user.firstName || ''} ${complaint.user.lastName || ''}`.trim(),
//                 gender: complaint.user.gender || "N/A",
//                 contact: complaint.user.mobile || complaint.user.phone || "N/A",
//                 aadhar: complaint.user.aadhar || complaint.user.aadharNumber || "N/A",
//               }}
//             />
//           )}

//           <ProfileCard
//             title="Victim Information"
//             color="blue"
//             photo={complaint.victimIdPhoto}
//             data={{
//               name: `${complaint.victimTitle} ${complaint.victimName}`,
//               gender: complaint.victimGender,
//               age: complaint.victimAge,
//               contact: complaint.victimContact,
//               aadhar: complaint.victimAadhar,
//               address: complaint.victimAddress
//             }}
//           />
//           <ProfileCard
//             title="Suspect Information"
//             color="red"
//             photo={complaint.suspectIdPhoto}
//             isAnonymous={!complaint.suspectName || complaint.suspectName === "Unknown"}
//             data={{
//               name: `${complaint.suspectTitle || ""} ${complaint.suspectName}`,
//               gender: complaint.suspectGender,
//               age: complaint.suspectAge,
//               contact: complaint.suspectContact,
//               aadhar: complaint.suspectAadhar,
//               address: complaint.suspectAddress
//             }}
//           />
//         </div>

//         {/* ROW 2: INCIDENT & MAP */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-10">
//           <div className="xl:col-span-1 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg p-4 md:p-8 shadow-lg h-full">
//             <h3 className="text-amber-500 font-bold uppercase text-xs md:text-sm tracking-widest mb-4 md:mb-6 flex items-center gap-2 border-b border-slate-700 pb-2 md:pb-3"><FaExclamationTriangle /> Incident Details</h3>
//             <div className="space-y-4 md:space-y-6">
//               <InfoBlock label="Category" value={complaint.crimeType} icon={<FaShieldAlt className="text-amber-500" />} />
//               <InfoBlock label="Date & Time" value={formatDateTime(complaint.dateOfIncident)} icon={<FaCalendarAlt className="text-amber-500" />} />
//               <InfoBlock label="Concerned Station" value={complaint.selectedStation} icon={<FaMapMarkerAlt className="text-amber-500" />} />
//               <div className="pt-2">
//                 <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1 md:mb-2">Description</span>
//                 <div className="bg-slate-900/50 p-3 md:p-4 rounded border border-slate-700/50 text-xs md:text-base text-slate-300 leading-relaxed max-h-40 md:max-h-60 overflow-y-auto custom-scrollbar">
//                   {complaint.description}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="xl:col-span-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg p-2 shadow-lg h-full flex flex-col relative group">
//             <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 bg-slate-900/80 backdrop-blur px-2 py-1 md:px-4 md:py-2 rounded border border-slate-600 text-[10px] md:text-sm font-bold text-white flex items-center gap-1 md:gap-2">
//               <FaMapMarkedAlt className="text-red-500" /> Incident Location
//             </div>
            
//             <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 flex gap-1 md:gap-2">
//               <button onClick={handleMyLocation} className="bg-blue-600/90 hover:bg-blue-500 text-white p-1.5 md:p-2.5 rounded text-[10px] md:text-xs font-bold uppercase flex items-center gap-2 backdrop-blur-sm shadow-lg transition-all" title="Show My Location">
//                 <FaLocationArrow /> 
//               </button>
//               {complaint.incidentLocationAddress?.includes("http") && (
//                   <a href={complaint.incidentLocationAddress} target="_blank" rel="noreferrer" className="bg-slate-700/90 hover:bg-slate-600 text-white p-1.5 md:p-2.5 rounded text-[10px] md:text-xs font-bold uppercase flex items-center gap-2 backdrop-blur-sm shadow-lg transition-all" title="Open in Google Maps">
//                     <FaExternalLinkAlt />
//                   </a>
//               )}
//               <button onClick={() => setExpandedMap(!expandedMap)} className="bg-slate-900/80 hover:bg-black text-white p-1.5 md:p-2.5 rounded text-[10px] md:text-xs font-bold uppercase flex items-center gap-2 backdrop-blur-sm border border-slate-600 transition-all">
//                 {expandedMap ? <><FaCompress /> Min</> : <><FaExpand /> Full</>}
//               </button>
//             </div>
            
//             <div className={`w-full h-full min-h-[250px] md:min-h-[400px] bg-slate-900 rounded overflow-hidden relative ${expandedMap ? 'fixed inset-0 md:inset-4 z-[10000] border-4 border-amber-500 shadow-2xl' : ''}`}>
//               <iframe
//                 title="Incident Location"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }}
//                 loading="lazy"
//                 allowFullScreen
//                 src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}>
//               </iframe>
//               <div className="absolute bottom-2 left-2 right-2 md:bottom-5 md:left-5 md:right-5 bg-black/70 backdrop-blur-md p-2 md:p-4 rounded border border-slate-600 flex items-center gap-2 md:gap-3">
//                 <FaGlobeAmericas className="text-blue-400 text-lg md:text-2xl" />
//                 <div className="overflow-hidden">
//                     <p className="text-[9px] md:text-xs text-slate-400 uppercase font-bold">Source Link Data</p>
//                     <p className="text-xs md:text-sm text-white font-mono font-medium truncate">{complaint.incidentLocationAddress || "N/A"}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ROW 3: EVIDENCE VAULT */}
//         {(complaint.incidentProof?.length > 0 || complaint.evidence?.length > 0) && (
//           <div className="mb-6 md:mb-10">
//             <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden shadow-lg">
//               <div className="bg-slate-900/50 px-4 py-3 md:px-8 md:py-4 border-b border-slate-700 flex justify-between items-center">
//                 <h3 className="text-purple-400 text-xs md:text-sm font-extrabold uppercase tracking-widest flex items-center gap-2"><FaFolderOpen /> Evidence Vault</h3>
//                 <span className="text-[10px] md:text-xs bg-purple-900/30 text-purple-300 px-2 py-0.5 md:px-3 md:py-1 rounded border border-purple-500/30 font-bold">
//                   {complaint.incidentProof?.length + complaint.evidence?.length} FILES
//                 </span>
//               </div>
//               <div className="p-4 md:p-8 bg-[#0b1120]/80">
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
//                   {[...(complaint.incidentProof || []), ...(complaint.evidence || [])].map((url, idx) => {
//                     const isVideo = url.match(/\.(mp4|mov|webm)$/i);
//                     const isAudio = url.match(/\.(mp3|wav|aac)$/i);
//                     return (
//                       <div key={idx} className="group relative bg-black rounded-lg border border-slate-700 overflow-hidden shadow-md hover:border-purple-500 transition-all aspect-video">
//                         {isVideo ? (
//                           <video controls className="w-full h-full object-cover" src={url}></video>
//                         ) : isAudio ? (
//                           <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 p-2 text-center relative overflow-hidden">
//                             <div className="absolute inset-0 bg-purple-500/5"></div>
//                             <FaVolumeUp className="text-2xl md:text-4xl text-purple-500 mb-1 md:mb-2 relative z-10" />
//                             <audio controls src={url} className="w-full h-6 md:h-8 scale-75 relative z-10"></audio>
//                           </div>
//                         ) : (
//                           <div className="w-full h-full cursor-pointer relative" onClick={() => setPreviewImage(url)}>
//                             <img src={url} alt={`Evidence ${idx}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
//                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
//                               <FaExpand className="text-white text-xl md:text-3xl" />
//                             </div>
//                           </div>
//                         )}
//                         <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-purple-900/90 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded text-[8px] md:text-[10px] text-white uppercase font-bold tracking-wider backdrop-blur-sm border border-purple-500/30">
//                           {isVideo ? "Video" : isAudio ? "Audio" : "Img"} #{idx + 1}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ROW 4: OFFICIAL RECORD & LOG */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 pb-10">
//           <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden h-full flex flex-col">
//             <div className="bg-slate-900/50 px-4 py-3 md:px-8 md:py-4 border-b border-slate-700">
//               <h3 className="text-cyan-400 text-xs md:text-sm font-extrabold uppercase flex items-center gap-2"><FaFingerprint /> Official Investigation Record</h3>
//             </div>
            
//             <div className="p-4 md:p-8 flex-1">
//               {complaint.officialRecord?.recordNumber ? (
//                 <div className="bg-slate-900/80 rounded-xl border border-emerald-500/30 overflow-hidden shadow-2xl relative">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    
//                     {/* Header */}
//                     <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900 p-3 md:p-5 border-b border-emerald-500/20 flex justify-between items-center">
//                         <div className="flex items-center gap-2 md:gap-3">
//                             <div className="bg-emerald-500/20 p-1.5 md:p-2 rounded-lg text-emerald-400 border border-emerald-500/30"><FaGavel className="text-sm md:text-base"/></div>
//                             <div>
//                                 <h4 className="text-white font-bold text-sm md:text-lg tracking-wide">{complaint.officialRecord.recordType} RECORDED</h4>
//                                 <p className="text-emerald-400 font-mono text-[10px] md:text-xs tracking-widest font-bold">{complaint.officialRecord.recordNumber}</p>
//                             </div>
//                         </div>
//                         <button onClick={() => handleDownload(complaint)} className="hidden md:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
//                             <FaFileDownload /> Download Copy
//                         </button>
//                     </div>

//                     {/* Details Grid */}
//                     <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-8 text-xs md:text-sm">
//                         <div className="space-y-0.5 md:space-y-1">
//                             <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block">Filing Date</span>
//                             <span className="text-white font-medium">{formatDateTime(complaint.officialRecord.recordDate)}</span>
//                         </div>
//                         <div className="space-y-0.5 md:space-y-1">
//                             <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block">Police Station</span>
//                             <span className="text-white font-medium uppercase">{complaint.selectedStation}</span>
//                         </div>
//                         <div className="space-y-0.5 md:space-y-1">
//                             <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block">Investigating Officer</span>
//                             <span className="text-white font-medium flex items-center gap-1 md:gap-2">
//                                 <FaUser className="text-slate-400 text-[10px] md:text-xs"/> {complaint.officialRecord.investigatingOfficer}
//                             </span>
//                         </div>
//                         <div className="space-y-0.5 md:space-y-1">
//                             <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block">Rank / Designation</span>
//                             <span className="text-white font-medium bg-slate-800 px-1.5 py-0.5 md:px-2 rounded text-[10px] md:text-xs inline-block border border-slate-700">{complaint.officialRecord.rank}</span>
//                         </div>
//                         <div className="col-span-1 md:col-span-2 pt-2 border-t border-slate-800 mt-1 md:mt-2">
//                             <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block mb-0.5 md:mb-1">Occurrence Details</span>
//                             <p className="text-slate-300 text-[10px] md:text-xs leading-relaxed">
//                                 <span className="text-slate-400">Date:</span> {complaint.officialRecord.occurrenceDate}  | 
//                                 <span className="text-slate-400"> Time:</span> {complaint.officialRecord.occurrenceTime}
//                             </p>
//                             <p className="text-slate-300 text-[10px] md:text-xs mt-0.5 md:mt-1"><span className="text-slate-400">Location:</span> {complaint.officialRecord.incidentPlace}</p>
//                         </div>
//                     </div>

//                     {/* Acts Section */}
//                     {complaint.officialRecord.acts && complaint.officialRecord.acts.length > 0 && (
//                         <div className="bg-black/30 p-3 md:p-4 border-t border-slate-800">
//                             <span className="text-[10px] md:text-xs text-red-400 uppercase font-bold block mb-1 md:mb-2 flex items-center gap-1 md:gap-2"><FaBalanceScale /> Applicable Acts & Sections</span>
//                             <div className="flex flex-wrap gap-1 md:gap-2">
//                                 {complaint.officialRecord.acts.map((act, i) => (
//                                     <span key={i} className="text-[10px] md:text-xs bg-red-900/20 text-red-300 border border-red-500/30 px-2 py-0.5 md:px-3 md:py-1 rounded-full font-mono">
//                                         {act.actName} - Sec {act.section}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
                    
//                     {/* Mobile Download Button */}
//                     <button onClick={() => handleDownload(complaint)} className="md:hidden w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 text-center border-t border-emerald-500/30">
//                         Download Official Copy
//                     </button>
//                 </div>
//               ) : (
//                 <div className="border-2 border-dashed border-slate-600 p-6 md:p-10 rounded-xl text-center opacity-60 bg-slate-900/30 flex flex-col items-center justify-center h-full min-h-[200px] md:min-h-[300px]">
//                   <FaLandmark className="text-3xl md:text-5xl text-slate-500 mb-2 md:mb-4" />
//                   <p className="text-slate-400 font-bold text-xs md:text-base uppercase tracking-widest">Pending Official Filing</p>
//                   <p className="text-slate-600 text-[10px] md:text-sm mt-1 md:mt-2 max-w-xs mx-auto">No FIR/NCR has been generated yet. Investigation officer needs to file the record.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden h-full">
//             <div className="bg-slate-900/50 px-4 py-3 md:px-8 md:py-4 border-b border-slate-700">
//               <h3 className="text-slate-400 text-xs md:text-sm font-extrabold uppercase flex items-center gap-2"><FaHistory /> Activity Timeline</h3>
//             </div>
//             <div className="p-4 md:p-8 h-full">
//                <div className="text-slate-200">
//                   <TimelineView history={complaint.statusHistory || []} />
//                </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {statusModal.show && createPortal(
//         <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
//           <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-lg w-full max-w-lg shadow-2xl relative z-50">
//             <div className="flex justify-between items-center mb-4 md:mb-6">
//               <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">Update Case Status</h3>
//               <button onClick={() => setStatusModal({ show: false, newStatus: "" })} className="text-slate-400 hover:text-white text-lg md:text-xl"><FaTimes /></button>
//             </div>
//             <label className="text-slate-400 text-[10px] md:text-xs uppercase font-bold mb-1 md:mb-2 block">Official Investigation Remark</label>
//             <textarea value={remarkText} onChange={(e) => setRemarkText(e.target.value)} className="w-full bg-black/30 border border-slate-600 rounded p-3 md:p-4 text-white text-sm md:text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" rows="5" placeholder="Enter detailed findings..."></textarea>
//             <button onClick={submitStatusUpdate} className="w-full mt-4 md:mt-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-sm md:text-base shadow-lg uppercase tracking-wide">CONFIRM UPDATE</button>
//           </div>
//         </div>,
//         document.body
//       )}

//       {previewImage && createPortal(
//         <div className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center p-4 backdrop-blur-xl" onClick={() => setPreviewImage(null)}>
//           <img src={previewImage} alt="Full View" className="max-w-full max-h-[90vh] rounded border border-slate-600 shadow-2xl" />
//           <button className="absolute top-5 right-5 text-white text-4xl hover:text-red-500 transition-colors"><FaTimes /></button>
//         </div>,
//         document.body
//       )}
//     </motion.div>
//   );
// };

// export default CaseReview;























import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  FaFolderOpen, FaTimes, FaCheckCircle, FaExclamationTriangle, FaEdit, FaSave,
  FaUser, FaPhoneAlt, FaIdCard, FaMapMarkerAlt, FaExpand, FaCompress, FaUserSecret,
  FaShieldAlt, FaCalendarAlt, FaMapMarkedAlt, FaGlobeAmericas, FaVolumeUp,
  FaFingerprint, FaGavel, FaFileAlt, FaHistory, FaFileDownload, FaChevronDown, FaArrowLeft,
  FaLocationArrow, FaExternalLinkAlt, FaBalanceScale, FaLandmark
} from "react-icons/fa";

// Ensure these utils exist in your project
import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../../utils/PDFGenerator";
import SkeletonLoader from "../common/SkeletonLoader";
import TimelineView from "../common/TimelineView";

const CaseReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [previewImage, setPreviewImage] = useState(null);
  const [expandedMap, setExpandedMap] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(false);

  // Map States
  const [mapQuery, setMapQuery] = useState(""); 

  // Status Modal States
  const [statusModal, setStatusModal] = useState({ show: false, newStatus: "" });
  const [remarkText, setRemarkText] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const MANUAL_STATUS_FLOW = ["Investigation Started", "Action Taken", "Closed"];
  const STATUS_STEPS = ['Received', 'Assigned', 'FIR/NCR Filed', 'Investigation', 'Action', 'Closed'];

  // --- FETCH DATA ---
  const fetchComplaintDetails = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/all", config);
      const found = Array.isArray(data) ? data.find(c => c._id === id) : null;
      
      if (found) {
        setComplaint(found);
        setNoteContent(found.importantNote?.text || "");
        // Initialize map with incident location
        extractAndSetMapLocation(found.incidentLocationAddress, found.selectedStation);
      } else {
        toast.error("Case not found");
        navigate(-1);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load case details");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && userInfo.token) fetchComplaintDetails();
  }, [id]);

  // --- MAP LOGIC HELPERS ---
  const extractAndSetMapLocation = (locationAddr, station) => {
    let query = station || "India"; 

    if (locationAddr) {
        if (locationAddr.includes("http") && locationAddr.includes("q=")) {
            const match = locationAddr.match(/q=([^&]+)/);
            if (match && match[1]) query = match[1];
        } 
        else if (locationAddr.includes("Lat:")) {
             const clean = locationAddr.replace("Lat:", "").replace("Long:", "").replace("(Auto-Detected)", "").trim();
             query = clean;
        }
        else if (!locationAddr.includes("http")) {
            query = locationAddr;
        }
    }
    setMapQuery(query);
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
        toast.error("Geolocation not supported");
        return;
    }
    toast.loading("Locating officer...");
    navigator.geolocation.getCurrentPosition(
        (position) => {
            toast.dismiss();
            const { latitude, longitude } = position.coords;
            setMapQuery(`${latitude},${longitude}`);
            toast.success("Map centered on your location");
        },
        () => {
            toast.dismiss();
            toast.error("Unable to retrieve location");
        }
    );
  };

  // --- HELPERS ---
  const formatDateTime = (dateString) => {
    try {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return "Invalid Date"; }
  };

  const safeIdSlice = (txt) => txt && typeof txt === 'string' ? txt.slice(-6).toUpperCase() : "UNKNOWN";

  // ✅ FIXED: Robust Assignment Check Logic
  const checkAssignment = (c) => {
    if (!c || !c.assignedOfficer) return false;
    
    // 1. Senior Override
    if (userInfo.role === 'senior' || userInfo.designation === 'DGP') return true;

    const assigned = (c.assignedOfficer || "").toLowerCase();
    
    // Not assigned case
    if (assigned === "not assigned") return false;

    const myName = (userInfo.name || "").toLowerCase();

    // 2. Direct Match
    if (assigned.includes(myName)) return true;

    // 3. Name Match ignoring Title (Fix for "Inspector Rohit" vs "Mr. Rohit")
    const nameParts = myName.split(" ");
    if (nameParts.length > 1) {
        const nameWithoutTitle = nameParts.slice(1).join(" "); // Remove Title
        if (assigned.includes(nameWithoutTitle)) return true;
    }

    return false;
  };

  const getStatusStep = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes('closed')) return 5;
    if (s.includes('action')) return 4;
    if (s.includes('investigation')) return 3;
    if (s.includes('fir') || s.includes('ncr')) return 2;
    if (s.includes('assigned')) return 1;
    return 0;
  };

  const getDownloadText = (c) => c.status === "Closed" ? "Download Final Report" : (c.officialRecord?.recordNumber ? "Download FIR Copy" : "Download Receipt");

  const getAvailableStatuses = (current) => {
    if (!current || current === "Closed") return [];
    const idx = MANUAL_STATUS_FLOW.indexOf(current);
    return MANUAL_STATUS_FLOW.filter((s, index) => index > idx);
  };

  // --- ACTIONS ---
  const saveImportantNote = async () => {
    if (!checkAssignment(complaint)) return toast.error("Permission Denied.");
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.put(`https://crimetrack-api.onrender.com/api/crime/update/${complaint._id}`, { importantNoteText: noteContent }, config);
      setComplaint(data);
      setIsEditingNote(false);
      toast.success("Internal Note Saved");
    } catch (error) { toast.error("Failed to save note."); }
  };

  const initiateStatusUpdate = (newStatus) => {
    setStatusModal({ show: true, newStatus });
    setRemarkText("");
    setActiveDropdown(false);
  };

  const submitStatusUpdate = async () => {
    if (!remarkText.trim()) return toast.error("Remark is required!");
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`https://crimetrack-api.onrender.com/api/crime/update/${complaint._id}`, { status: statusModal.newStatus, remark: remarkText }, config);
      toast.success(`Case Status Updated`);
      setStatusModal({ show: false, newStatus: "" });
      fetchComplaintDetails();
    } catch (error) { toast.error("Update Failed"); }
  };

  const handleDownload = (c) => {
    try {
      if (c.status === "Closed") generateFinalReport(c);
      else if (c.officialRecord?.recordNumber) generateOfficialRecord(c);
      else generateReceipt(c);
      toast.success("Document Generated");
    } catch (err) { console.error(err); toast.error("Failed to generate PDF."); }
  };

  // --- SUB COMPONENTS ---
  const InfoBlock = ({ label, value, icon }) => (
    <div className="flex flex-col border-b border-slate-700/50 pb-2 md:pb-3 last:border-0">
      <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1.5 mb-0.5 md:mb-1">
        {icon} {label}
      </span>
      <span className="text-sm md:text-base text-slate-100 font-medium font-sans break-words tracking-wide">{value || "—"}</span>
    </div>
  );

  const ProfileCard = ({ title, data, color, photo, isAnonymous }) => {
    const colors = { slate: "border-slate-500", blue: "border-blue-500", red: "border-red-500" };
    return (
      <div className={`bg-slate-900/60 backdrop-blur-md border-t-4 ${colors[color]} rounded-lg p-4 md:p-6 flex flex-col h-full shadow-lg border border-slate-700/50 relative overflow-hidden group hover:shadow-2xl transition-all`}>
        <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-${color}-500/10 to-transparent -z-10`}></div>
        <h3 className={`text-${color}-400 text-xs md:text-sm font-black uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2 drop-shadow-sm`}>{title}</h3>
        {isAnonymous ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-60 min-h-[150px] md:min-h-[200px]">
            <FaUserSecret className="text-4xl md:text-6xl mb-3" />
            <p className="text-sm md:text-base font-bold uppercase">Anonymous</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4 md:mb-6 relative">
              {photo ? (
                <div className="relative cursor-pointer group/img" onClick={() => setPreviewImage(photo)}>
                  {/* Smaller image on mobile */}
                  <img src={photo} alt={title} className={`w-20 h-20 md:w-32 md:h-32 object-cover rounded-full border-4 border-slate-800 shadow-2xl transition-transform group-hover/img:scale-105`} />
                  <div className="absolute inset-0 rounded-full bg-black/40 hidden group-hover/img:flex items-center justify-center text-white"><FaExpand /></div>
                </div>
              ) : (
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-slate-500 text-xs md:text-sm font-bold uppercase shadow-inner">No Photo</div>
              )}
            </div>
            <div className="space-y-3 md:space-y-4 flex-1">
              <InfoBlock label="Full Name" value={data.name} icon={<FaUser className={`text-${color}-400`} />} />
              
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <InfoBlock label="Gender" value={data.gender} />
                {data.age !== undefined && <InfoBlock label="Age" value={data.age ? `${data.age} Yrs` : null} />}
              </div>

              <InfoBlock label="Contact" value={data.contact} icon={<FaPhoneAlt />} />
              <InfoBlock label="Aadhaar" value={data.aadhar} icon={<FaIdCard />} />
              
              {data.address !== undefined && <InfoBlock label="Address" value={data.address} icon={<FaMapMarkerAlt />} />}
            </div>
          </>
        )}
      </div>
    );
  };

  if (loading) return <div className="p-10"><SkeletonLoader count={1} /></div>;
  if (!complaint) return null;

  // Use the updated robust check
  const isAssignedToMe = checkAssignment(complaint);
  const isFirFiled = !!complaint.officialRecord?.recordNumber;
  const isClosed = complaint.status === "Closed";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-10 relative overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div className="fixed inset-0 z-0">
        <img 
            src="/dashboard-bg.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90"></div>
      </div>

      {/* 1. Header */}
      {/* Reduced padding for mobile */}
      <div className="bg-slate-900/80 backdrop-blur-md px-3 py-3 md:px-6 md:py-4 border-b border-slate-700/60 flex justify-between items-center sticky top-0 z-30 shadow-lg relative">
        <div className="flex items-center gap-2 md:gap-5">
          <button onClick={() => navigate("/police/complaints")} className="text-slate-400 hover:text-white flex items-center gap-1 md:gap-2 text-xs md:text-sm font-bold uppercase tracking-wide transition-colors">
            <FaArrowLeft /> <span className="hidden md:inline">Back</span>
          </button>
          <div className="h-6 md:h-8 w-px bg-slate-700 hidden md:block"></div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-amber-600 to-yellow-700 text-white rounded-lg flex items-center justify-center text-base md:text-2xl shadow-lg border border-yellow-500/50"><FaFolderOpen /></div>
            <div>
              <h2 className="text-sm md:text-2xl font-black text-white tracking-wide md:tracking-widest uppercase flex flex-col md:flex-row md:items-center gap-0 md:gap-3">
                <span>Official Case File</span> <span className="w-fit bg-red-900/50 text-red-300 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded border border-red-500/30 font-mono tracking-normal">CONFIDENTIAL</span>
              </h2>
              <div className="flex gap-2 md:gap-4 mt-0.5 md:mt-1 text-[10px] md:text-sm items-center font-mono">
                <span className="text-amber-500 px-1.5 md:px-2 py-0.5 rounded bg-amber-900/10 border border-amber-600/20">ID: {safeIdSlice(complaint._id)}</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300 uppercase font-bold truncate max-w-[100px] md:max-w-none">{complaint.selectedStation}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 md:gap-3">
             {isFirFiled && isAssignedToMe && !isClosed && (
                <div className="relative">
                    <button onClick={() => setActiveDropdown(!activeDropdown)} className="flex items-center gap-1 md:gap-2 py-1.5 px-3 md:py-2.5 md:px-5 bg-slate-800 text-blue-400 border border-slate-600 rounded text-xs md:text-sm font-bold uppercase hover:bg-slate-700 transition shadow-sm">
                        <span>Status</span><FaChevronDown />
                    </button>
                    {activeDropdown && (
                        <div className="absolute top-full right-0 mt-1 w-48 md:w-56 bg-slate-800 border border-slate-600 rounded shadow-xl z-50 overflow-hidden">
                            {getAvailableStatuses(complaint.status).map((status) => (
                                <button key={status} onClick={() => initiateStatusUpdate(status)} className="w-full text-left px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm font-medium text-white hover:bg-blue-600 border-b border-slate-700 last:border-0 transition-colors">
                                    {status}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
             )}
             <button onClick={() => handleDownload(complaint)} className="hidden md:flex px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-sm shadow-lg items-center gap-2 uppercase"><FaFileDownload /> {getDownloadText(complaint)}</button>
        </div>
      </div>

      {/* 2. Status Bar */}
      <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 relative z-20 shadow-md">
        <div className="px-2 md:px-8 py-4 md:py-8 relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto overflow-x-auto">
            {/* Added overflow-x-auto for mobile scrolling */}
            <div className="min-w-[500px] md:min-w-[600px] relative pb-4 md:pb-6 px-4">
                <div className="absolute top-4 md:top-5 left-0 w-full h-2 md:h-3 bg-slate-800/80 rounded-full shadow-inner"></div>
                <div className="absolute top-4 md:top-5 left-0 h-2 md:h-3 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-[length:200%_100%] animate-pulse transition-all duration-1000 ease-out shadow-[0_0_20px_#3b82f6] rounded-full" style={{ width: `${Math.min((getStatusStep(complaint.status) / 5) * 100, 100)}%` }}></div>
                
                <div className="flex justify-between relative w-full pt-0.5 md:pt-1">
                {STATUS_STEPS.map((step, i) => {
                    const isActive = i <= getStatusStep(complaint.status);
                    return (
                    <div key={i} className="flex flex-col items-center gap-1 md:gap-3 z-10 w-20 md:w-28 group">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-base font-bold border-2 transition-all duration-500 ${isActive ? 'bg-slate-900 border-cyan-400 text-cyan-400 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'bg-slate-800 border-slate-700 text-slate-600'}`}>
                        {isActive ? <FaCheckCircle /> : i + 1}
                        </div>
                        <p className={`text-[9px] md:text-xs font-bold uppercase tracking-widest text-center transition-colors duration-300 ${isActive ? 'text-cyan-400 drop-shadow-md' : 'text-slate-600'}`}>{step}</p>
                    </div>
                    );
                })}
                </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0b1120]/80 border-t border-slate-800 px-3 md:px-8 py-3 md:py-5 flex flex-col md:flex-row items-start gap-2 md:gap-4">
          <div className="bg-amber-500/10 p-2 md:p-3 rounded-full text-amber-500 border border-amber-500/20 text-sm md:text-base"><FaExclamationTriangle /></div>
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-1 md:mb-2">
              <h3 className="text-amber-500 font-bold uppercase text-xs md:text-sm tracking-widest">Internal Investigation Notes</h3>
              {/* ✅ Button Visibility Check */}
              {checkAssignment(complaint) && (
                <button onClick={() => setIsEditingNote(!isEditingNote)} className="text-slate-400 hover:text-white text-xs md:text-sm flex items-center gap-1 hover:underline bg-slate-800 px-2 md:px-3 py-1 md:py-1.5 rounded border border-slate-700"><FaEdit /> {isEditingNote ? "Cancel" : "Edit Note"}</button>
              )}
            </div>
            {isEditingNote ? (
              <div className="animate-fade-in-up mt-2">
                <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 md:p-4 text-white text-sm md:text-base mb-2 md:mb-3 font-mono resize-none focus:border-amber-500 outline-none shadow-inner" rows="4" placeholder="Enter strictly confidential notes..."></textarea>
                <button onClick={saveImportantNote} className="bg-amber-600 hover:bg-amber-500 text-black py-1.5 md:py-2 px-4 md:px-6 rounded font-bold text-xs md:text-sm uppercase tracking-wide shadow-md"><FaSave className="inline mr-1" /> Save Record</button>
              </div>
            ) : (
              <p className="text-slate-300 italic text-xs md:text-base leading-relaxed font-mono pl-3 md:pl-4 border-l-4 border-slate-700 min-h-[20px] md:min-h-[24px]">
                {complaint.importantNote?.text ? `"${complaint.importantNote.text}"` : <span className="text-slate-600">No notes recorded.</span>}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Content Body */}
      <div className="max-w-[100rem] mx-auto p-3 md:p-10 relative z-10">
        
        {/* ROW 1: PROFILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-10">
          {!complaint.isAnonymous && complaint.user && (
            <ProfileCard
              title="Registered By (Citizen)"
              color="slate"
              isAnonymous={false}
              photo={complaint.user?.idPhoto || null} 
              data={{
                name: `${complaint.user.title || ''} ${complaint.user.firstName || ''} ${complaint.user.lastName || ''}`.trim(),
                gender: complaint.user.gender || "N/A",
                contact: complaint.user.mobile || complaint.user.phone || "N/A",
                aadhar: complaint.user.aadhar || complaint.user.aadharNumber || "N/A",
              }}
            />
          )}

          <ProfileCard
            title="Victim Information"
            color="blue"
            photo={complaint.victimIdPhoto}
            data={{
              name: `${complaint.victimTitle} ${complaint.victimName}`,
              gender: complaint.victimGender,
              age: complaint.victimAge,
              contact: complaint.victimContact,
              aadhar: complaint.victimAadhar,
              address: complaint.victimAddress
            }}
          />
          <ProfileCard
            title="Suspect Information"
            color="red"
            photo={complaint.suspectIdPhoto}
            isAnonymous={!complaint.suspectName || complaint.suspectName === "Unknown"}
            data={{
              name: `${complaint.suspectTitle || ""} ${complaint.suspectName}`,
              gender: complaint.suspectGender,
              age: complaint.suspectAge,
              contact: complaint.suspectContact,
              aadhar: complaint.suspectAadhar,
              address: complaint.suspectAddress
            }}
          />
        </div>

        {/* ROW 2: INCIDENT & MAP */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-10">
          <div className="xl:col-span-1 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg p-4 md:p-8 shadow-lg h-full">
            <h3 className="text-amber-500 font-bold uppercase text-xs md:text-sm tracking-widest mb-4 md:mb-6 flex items-center gap-2 border-b border-slate-700 pb-2 md:pb-3"><FaExclamationTriangle /> Incident Details</h3>
            <div className="space-y-4 md:space-y-6">
              <InfoBlock label="Category" value={complaint.crimeType} icon={<FaShieldAlt className="text-amber-500" />} />
              <InfoBlock label="Date & Time" value={formatDateTime(complaint.dateOfIncident)} icon={<FaCalendarAlt className="text-amber-500" />} />
              <InfoBlock label="Concerned Station" value={complaint.selectedStation} icon={<FaMapMarkerAlt className="text-amber-500" />} />
              <div className="pt-2">
                <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1 md:mb-2">Description</span>
                <div className="bg-slate-900/50 p-3 md:p-4 rounded border border-slate-700/50 text-xs md:text-base text-slate-300 leading-relaxed max-h-40 md:max-h-60 overflow-y-auto custom-scrollbar">
                  {complaint.description}
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg p-2 shadow-lg h-full flex flex-col relative group">
            <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 bg-slate-900/80 backdrop-blur px-2 py-1 md:px-4 md:py-2 rounded border border-slate-600 text-[10px] md:text-sm font-bold text-white flex items-center gap-1 md:gap-2">
              <FaMapMarkedAlt className="text-red-500" /> Incident Location
            </div>
            
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 flex gap-1 md:gap-2">
              <button onClick={handleMyLocation} className="bg-blue-600/90 hover:bg-blue-500 text-white p-1.5 md:p-2.5 rounded text-[10px] md:text-xs font-bold uppercase flex items-center gap-2 backdrop-blur-sm shadow-lg transition-all" title="Show My Location">
                <FaLocationArrow /> 
              </button>
              {complaint.incidentLocationAddress?.includes("http") && (
                  <a href={complaint.incidentLocationAddress} target="_blank" rel="noreferrer" className="bg-slate-700/90 hover:bg-slate-600 text-white p-1.5 md:p-2.5 rounded text-[10px] md:text-xs font-bold uppercase flex items-center gap-2 backdrop-blur-sm shadow-lg transition-all" title="Open in Google Maps">
                    <FaExternalLinkAlt />
                  </a>
              )}
              <button onClick={() => setExpandedMap(!expandedMap)} className="bg-slate-900/80 hover:bg-black text-white p-1.5 md:p-2.5 rounded text-[10px] md:text-xs font-bold uppercase flex items-center gap-2 backdrop-blur-sm border border-slate-600 transition-all">
                {expandedMap ? <><FaCompress /> Min</> : <><FaExpand /> Full</>}
              </button>
            </div>
            
            <div className={`w-full h-full min-h-[250px] md:min-h-[400px] bg-slate-900 rounded overflow-hidden relative ${expandedMap ? 'fixed inset-0 md:inset-4 z-[10000] border-4 border-amber-500 shadow-2xl' : ''}`}>
              <iframe
                title="Incident Location"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}>
              </iframe>
              <div className="absolute bottom-2 left-2 right-2 md:bottom-5 md:left-5 md:right-5 bg-black/70 backdrop-blur-md p-2 md:p-4 rounded border border-slate-600 flex items-center gap-2 md:gap-3">
                <FaGlobeAmericas className="text-blue-400 text-lg md:text-2xl" />
                <div className="overflow-hidden">
                    <p className="text-[9px] md:text-xs text-slate-400 uppercase font-bold">Source Link Data</p>
                    <p className="text-xs md:text-sm text-white font-mono font-medium truncate">{complaint.incidentLocationAddress || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: EVIDENCE VAULT */}
        {(complaint.incidentProof?.length > 0 || complaint.evidence?.length > 0) && (
          <div className="mb-6 md:mb-10">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-slate-900/50 px-4 py-3 md:px-8 md:py-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-purple-400 text-xs md:text-sm font-extrabold uppercase tracking-widest flex items-center gap-2"><FaFolderOpen /> Evidence Vault</h3>
                <span className="text-[10px] md:text-xs bg-purple-900/30 text-purple-300 px-2 py-0.5 md:px-3 md:py-1 rounded border border-purple-500/30 font-bold">
                  {complaint.incidentProof?.length + complaint.evidence?.length} FILES
                </span>
              </div>
              <div className="p-4 md:p-8 bg-[#0b1120]/80">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                  {[...(complaint.incidentProof || []), ...(complaint.evidence || [])].map((url, idx) => {
                    const isVideo = url.match(/\.(mp4|mov|webm)$/i);
                    const isAudio = url.match(/\.(mp3|wav|aac)$/i);
                    return (
                      <div key={idx} className="group relative bg-black rounded-lg border border-slate-700 overflow-hidden shadow-md hover:border-purple-500 transition-all aspect-video">
                        {isVideo ? (
                          <video controls className="w-full h-full object-cover" src={url}></video>
                        ) : isAudio ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 p-2 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-purple-500/5"></div>
                            <FaVolumeUp className="text-2xl md:text-4xl text-purple-500 mb-1 md:mb-2 relative z-10" />
                            <audio controls src={url} className="w-full h-6 md:h-8 scale-75 relative z-10"></audio>
                          </div>
                        ) : (
                          <div className="w-full h-full cursor-pointer relative" onClick={() => setPreviewImage(url)}>
                            <img src={url} alt={`Evidence ${idx}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                              <FaExpand className="text-white text-xl md:text-3xl" />
                            </div>
                          </div>
                        )}
                        <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-purple-900/90 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded text-[8px] md:text-[10px] text-white uppercase font-bold tracking-wider backdrop-blur-sm border border-purple-500/30">
                          {isVideo ? "Video" : isAudio ? "Audio" : "Img"} #{idx + 1}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROW 4: OFFICIAL RECORD & LOG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 pb-10">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden h-full flex flex-col">
            <div className="bg-slate-900/50 px-4 py-3 md:px-8 md:py-4 border-b border-slate-700">
              <h3 className="text-cyan-400 text-xs md:text-sm font-extrabold uppercase flex items-center gap-2"><FaFingerprint /> Official Investigation Record</h3>
            </div>
            
            <div className="p-4 md:p-8 flex-1">
              {complaint.officialRecord?.recordNumber ? (
                <div className="bg-slate-900/80 rounded-xl border border-emerald-500/30 overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900 p-3 md:p-5 border-b border-emerald-500/20 flex justify-between items-center">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="bg-emerald-500/20 p-1.5 md:p-2 rounded-lg text-emerald-400 border border-emerald-500/30"><FaGavel className="text-sm md:text-base"/></div>
                            <div>
                                <h4 className="text-white font-bold text-sm md:text-lg tracking-wide">{complaint.officialRecord.recordType} RECORDED</h4>
                                <p className="text-emerald-400 font-mono text-[10px] md:text-xs tracking-widest font-bold">{complaint.officialRecord.recordNumber}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDownload(complaint)} className="hidden md:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <FaFileDownload /> Download Copy
                        </button>
                    </div>

                    {/* Details Grid */}
                    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-8 text-xs md:text-sm">
                        <div className="space-y-0.5 md:space-y-1">
                            <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block">Filing Date</span>
                            <span className="text-white font-medium">{formatDateTime(complaint.officialRecord.recordDate)}</span>
                        </div>
                        <div className="space-y-0.5 md:space-y-1">
                            <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block">Police Station</span>
                            <span className="text-white font-medium uppercase">{complaint.selectedStation}</span>
                        </div>
                        <div className="space-y-0.5 md:space-y-1">
                            <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block">Investigating Officer</span>
                            <span className="text-white font-medium flex items-center gap-1 md:gap-2">
                                <FaUser className="text-slate-400 text-[10px] md:text-xs"/> {complaint.officialRecord.investigatingOfficer}
                            </span>
                        </div>
                        <div className="space-y-0.5 md:space-y-1">
                            <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block">Rank / Designation</span>
                            <span className="text-white font-medium bg-slate-800 px-1.5 py-0.5 md:px-2 rounded text-[10px] md:text-xs inline-block border border-slate-700">{complaint.officialRecord.rank}</span>
                        </div>
                        <div className="col-span-1 md:col-span-2 pt-2 border-t border-slate-800 mt-1 md:mt-2">
                            <span className="text-[10px] md:text-xs text-slate-500 uppercase font-bold block mb-0.5 md:mb-1">Occurrence Details</span>
                            <p className="text-slate-300 text-[10px] md:text-xs leading-relaxed">
                                <span className="text-slate-400">Date:</span> {complaint.officialRecord.occurrenceDate}  | 
                                <span className="text-slate-400"> Time:</span> {complaint.officialRecord.occurrenceTime}
                            </p>
                            <p className="text-slate-300 text-[10px] md:text-xs mt-0.5 md:mt-1"><span className="text-slate-400">Location:</span> {complaint.officialRecord.incidentPlace}</p>
                        </div>
                    </div>

                    {/* Acts Section */}
                    {complaint.officialRecord.acts && complaint.officialRecord.acts.length > 0 && (
                        <div className="bg-black/30 p-3 md:p-4 border-t border-slate-800">
                            <span className="text-[10px] md:text-xs text-red-400 uppercase font-bold block mb-1 md:mb-2 flex items-center gap-1 md:gap-2"><FaBalanceScale /> Applicable Acts & Sections</span>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                                {complaint.officialRecord.acts.map((act, i) => (
                                    <span key={i} className="text-[10px] md:text-xs bg-red-900/20 text-red-300 border border-red-500/30 px-2 py-0.5 md:px-3 md:py-1 rounded-full font-mono">
                                        {act.actName} - Sec {act.section}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Mobile Download Button */}
                    <button onClick={() => handleDownload(complaint)} className="md:hidden w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 text-center border-t border-emerald-500/30">
                        Download Official Copy
                    </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-600 p-6 md:p-10 rounded-xl text-center opacity-60 bg-slate-900/30 flex flex-col items-center justify-center h-full min-h-[200px] md:min-h-[300px]">
                  <FaLandmark className="text-3xl md:text-5xl text-slate-500 mb-2 md:mb-4" />
                  <p className="text-slate-400 font-bold text-xs md:text-base uppercase tracking-widest">Pending Official Filing</p>
                  <p className="text-slate-600 text-[10px] md:text-sm mt-1 md:mt-2 max-w-xs mx-auto">No FIR/NCR has been generated yet. Investigation officer needs to file the record.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden h-full">
            <div className="bg-slate-900/50 px-4 py-3 md:px-8 md:py-4 border-b border-slate-700">
              <h3 className="text-slate-400 text-xs md:text-sm font-extrabold uppercase flex items-center gap-2"><FaHistory /> Activity Timeline</h3>
            </div>
            <div className="p-4 md:p-8 h-full">
               <div className="text-slate-200">
                  <TimelineView history={complaint.statusHistory || []} />
               </div>
            </div>
          </div>
        </div>
      </div>

      {statusModal.show && createPortal(
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-lg w-full max-w-lg shadow-2xl relative z-50">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">Update Case Status</h3>
              <button onClick={() => setStatusModal({ show: false, newStatus: "" })} className="text-slate-400 hover:text-white text-lg md:text-xl"><FaTimes /></button>
            </div>
            <label className="text-slate-400 text-[10px] md:text-xs uppercase font-bold mb-1 md:mb-2 block">Official Investigation Remark</label>
            <textarea value={remarkText} onChange={(e) => setRemarkText(e.target.value)} className="w-full bg-black/30 border border-slate-600 rounded p-3 md:p-4 text-white text-sm md:text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" rows="5" placeholder="Enter detailed findings..."></textarea>
            <button onClick={submitStatusUpdate} className="w-full mt-4 md:mt-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-sm md:text-base shadow-lg uppercase tracking-wide">CONFIRM UPDATE</button>
          </div>
        </div>,
        document.body
      )}

      {previewImage && createPortal(
        <div className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center p-4 backdrop-blur-xl" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Full View" className="max-w-full max-h-[90vh] rounded border border-slate-600 shadow-2xl" />
          <button className="absolute top-5 right-5 text-white text-4xl hover:text-red-500 transition-colors"><FaTimes /></button>
        </div>,
        document.body
      )}
    </motion.div>
  );
};

export default CaseReview;