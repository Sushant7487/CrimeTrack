

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";
// import { crimeTypes, policeStations } from "../../data/mockData"; 
// import axios from "axios";
// import { 
//   FaUserSecret, FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaImages, 
//   FaCheckCircle, FaShieldAlt, FaUser, FaPhoneAlt, FaIdCard, FaHome, FaTimes, 
//   FaSearchLocation, FaUserTie, FaBirthdayCake, FaVenusMars, FaCamera, FaTrash, FaVideo,
//   FaExclamationTriangle
// } from "react-icons/fa";

// const ReportCrime = ({ onSuccess, onCancel }) => {
//   const [anonymous, setAnonymous] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [successId, setSuccessId] = useState(null);
//   const [isConfirmed, setIsConfirmed] = useState(false);

//   // --- FILE STATE MANAGEMENT ---
//   const [proofFiles, setProofFiles] = useState([]); 
//   const [proofPreviews, setProofPreviews] = useState([]);
//   const [victimIdFile, setVictimIdFile] = useState(null);
//   const [victimIdPreview, setVictimIdPreview] = useState(null);
//   const [suspectIdFile, setSuspectIdFile] = useState(null);
//   const [suspectIdPreview, setSuspectIdPreview] = useState(null);

//   const loggedUser = (() => {
//       const stored = localStorage.getItem("userInfo");
//       return stored ? JSON.parse(stored) : null;
//   })();

//   const getCurrentDateTime = () => {
//       const now = new Date();
//       now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//       return now.toISOString().slice(0, 16);
//   };

//   const [formData, setFormData] = useState({
//     victimTitle: loggedUser?.title || "Mr.", 
//     victimName: loggedUser?.name || "", 
//     victimAge: loggedUser?.age || "", 
//     victimGender: loggedUser?.gender || "", 
//     victimContact: loggedUser?.mobile || "", 
//     victimAadhar: loggedUser?.aadhar || "", 
//     victimAddress: loggedUser?.address || "",
//     crimeType: "", description: "", dateOfIncident: getCurrentDateTime(), 
//     selectedStation: "", incidentLocationAddress: "",
//     suspectTitle: "Mr.", suspectName: "", suspectAge: "", suspectGender: "", 
//     suspectContact: "", suspectAddress: "", suspectAadhar: ""
//   });

//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
//   const genders = ["Male", "Female", "Transgender", "Other"];

//   useEffect(() => {
//     return () => {
//       if (victimIdPreview) URL.revokeObjectURL(victimIdPreview);
//       if (suspectIdPreview) URL.revokeObjectURL(suspectIdPreview);
//       proofPreviews.forEach(obj => URL.revokeObjectURL(obj.url));
//     };
//   }, [victimIdPreview, suspectIdPreview, proofPreviews]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
//   const handleVictimIdChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVictimIdFile(file);
//       setVictimIdPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSuspectIdChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSuspectIdFile(file);
//       setSuspectIdPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleProofChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setProofFiles(prev => [...prev, ...files]);
//       const newPreviews = files.map(file => ({
//         url: URL.createObjectURL(file),
//         type: file.type.startsWith('video') ? 'video' : 'image',
//         name: file.name
//       }));
//       setProofPreviews(prev => [...prev, ...newPreviews]);
//     }
//   };

//   const removeProof = (index) => {
//     setProofFiles(prev => prev.filter((_, i) => i !== index));
//     setProofPreviews(prev => {
//       const newPreviews = [...prev];
//       URL.revokeObjectURL(newPreviews[index].url);
//       return newPreviews.filter((_, i) => i !== index);
//     });
//   };

//   const handleDetectLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported.");
//       return;
//     }
//     setLocationLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
//         setFormData((prev) => ({ ...prev, incidentLocationAddress: mapLink }));
//         toast.success("Location Generated!");
//         setLocationLoading(false);
//       },
//       () => {
//         toast.error("Location access denied.");
//         setLocationLoading(false);
//       }
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isConfirmed) { toast.error("Agree to the legal declaration."); return; }
//     if(!formData.crimeType || !formData.dateOfIncident || !formData.description || !formData.selectedStation || !formData.incidentLocationAddress) {
//        toast.error("Fill all required fields."); return;
//     }

//     setLoading(true);
//     try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const data = new FormData();
//         if (userInfo?._id) data.append("userId", userInfo._id); 

//         Object.keys(formData).forEach(key => {
//             if (key.startsWith('suspect') && formData[key] === "") data.append(key, "N/A"); 
//             else data.append(key, formData[key]);
//         });
        
//         data.append("isAnonymous", anonymous);
//         data.append("reporterName", anonymous ? "Hidden Identity" : userInfo?.name);
//         if (victimIdFile) data.append("victimIdPhoto", victimIdFile);
//         if (suspectIdFile) data.append("suspectIdPhoto", suspectIdFile);
//         proofFiles.forEach(file => data.append("incidentProof", file));

//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         const response = await axios.post("http://localhost:5000/api/crime/report", data, config);

//         toast.success("Report Submitted!");
//         setSuccessId(response.data._id);
//     } catch (error) {
//         toast.error(error.response?.data?.message || "Submission failed.");
//     } finally {
//         setLoading(false);
//     }
//   };

//   if (successId) {
//     return (
//         <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-green-500/50 p-6 md:p-10 rounded-2xl text-center max-w-2xl mx-auto mt-6 md:mt-10 shadow-2xl backdrop-blur-md">
//             <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-3xl md:text-5xl text-green-400">
//                 <FaCheckCircle />
//             </div>
//             <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">Report Filed!</h2>
//             <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-lg">Incident securely recorded.</p>
//             <div className="bg-black/40 p-4 md:p-6 rounded-xl border border-green-500/30 inline-block w-full md:min-w-[320px]">
//                 <p className="text-[10px] text-green-400 uppercase font-bold tracking-widest mb-1">Complaint Reference ID</p>
//                 <code className="text-2xl md:text-4xl font-mono text-white font-bold tracking-widest">{successId.slice(-6).toUpperCase()}</code>
//             </div>
//             <div className="mt-8 md:mt-10">
//                  <button onClick={onCancel} className="w-full md:w-auto px-10 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all">Return to Dashboard</button>
//             </div>
//         </motion.div>
//     );
//   }

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto pb-10 md:pb-20 font-sans text-slate-200">
      
//       {/* HEADER: Adjusted for Mobile */}
//       <div className="bg-slate-800/80 backdrop-blur-md p-5 md:p-8 rounded-t-2xl md:rounded-t-3xl border-b border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-xl relative overflow-hidden">
//           <div className="relative z-10 text-center md:text-left">
//               <h2 className="text-xl md:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-2 md:gap-3 tracking-tight">
//                 <FaFileAlt className="text-blue-500"/> File New Report
//               </h2>
//               <p className="text-slate-400 text-[10px] md:text-sm mt-1 font-medium">Official Portal • <span className="text-red-400 font-bold">* Required</span></p>
//           </div>
          
//           <div 
//             onClick={() => setAnonymous(!anonymous)}
//             className={`relative z-10 cursor-pointer px-4 py-2 md:px-6 md:py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 md:gap-3 select-none ${anonymous ? "bg-amber-500/10 border-amber-500 text-amber-400" : "bg-slate-700/50 border-slate-600 text-slate-300"}`}
//           >
//               <div className={`w-4 h-4 md:w-5 md:h-5 border-2 rounded-full flex items-center justify-center transition-colors ${anonymous ? "border-amber-400 bg-amber-400" : "border-slate-400"}`}>
//                   {anonymous && <FaCheckCircle className="text-black text-[8px] md:text-[10px]" />}
//               </div>
//               <span className="text-[10px] md:text-sm font-bold uppercase tracking-wide flex items-center gap-1.5"><FaUserSecret /> Anonymous</span>
//           </div>
//       </div>
      
//       <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 border-t-0 rounded-b-2xl md:rounded-b-3xl p-5 md:p-10 shadow-2xl space-y-8 md:space-y-12">
        
//         {/* SECTION 1: VICTIM */}
//         <div className="space-y-4 md:space-y-6 relative group">
//             <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-60"></div>
//             <h3 className="text-blue-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
//                 <span className="bg-blue-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center">1</span> Victim Info
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Victim Name <span className="text-red-500">*</span></label>
//                     <div className="flex gap-2">
//                         <select name="victimTitle" value={formData.victimTitle} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 md:p-3 text-white outline-none w-20 md:w-24 text-xs md:text-sm">
//                             {titles.map(t => <option key={t} value={t}>{t}</option>)}
//                         </select>
//                         <div className="flex-1 flex items-center bg-slate-800 rounded-lg border border-slate-700 focus-within:border-blue-500 overflow-hidden transition-all">
//                             <div className="pl-3 text-slate-500 text-xs md:text-base"><FaUser /></div>
//                             <input name="victimName" value={formData.victimName} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Full Name" required />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:col-span-2">
//                     <div className="space-y-1.5">
//                         <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Age <span className="text-red-500">*</span></label>
//                         <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
//                             <div className="pl-3 text-slate-500 text-xs"><FaBirthdayCake /></div>
//                             <input type="number" name="victimAge" value={formData.victimAge} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Yrs" required />
//                         </div>
//                     </div>
//                     <div className="space-y-1.5">
//                         <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Gender <span className="text-red-500">*</span></label>
//                         <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
//                              <div className="pl-3 text-slate-500 text-xs"><FaVenusMars /></div>
//                              <select name="victimGender" value={formData.victimGender} onChange={handleChange} className="w-full bg-slate-800 p-2 md:p-3 text-white outline-none text-xs md:text-sm border-none appearance-none" required>
//                                  <option value="">Select</option>
//                                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
//                              </select>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Contact <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaPhoneAlt /></div>
//                         <input name="victimContact" type="text" maxLength="10" value={formData.victimContact} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="10-digit Mobile" required />
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Aadhaar <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaIdCard /></div>
//                         <input name="victimAadhar" type="text" maxLength="12" value={formData.victimAadhar} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="12-digit UID" required />
//                     </div>
//                 </div>

//                 <div className="md:col-span-4 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Residential Address</label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaHome /></div>
//                         <input name="victimAddress" value={formData.victimAddress} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Full Address" required />
//                     </div>
//                 </div>

//                 <div className="md:col-span-4 space-y-3">
//                     <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-dashed border-slate-600">
//                         <label className="w-full md:w-auto cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-all">
//                             <FaCamera /> {victimIdFile ? "Change" : "Upload Victim ID"}
//                             <input type="file" accept="image/*" onChange={handleVictimIdChange} className="hidden" />
//                         </label>
//                         {victimIdPreview && <img src={victimIdPreview} className="h-16 w-24 object-cover rounded-lg border border-blue-500" alt="Preview" />}
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* SECTION 2: INCIDENT */}
//         <div className="space-y-4 md:space-y-6 relative group">
//             <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-transparent rounded-full opacity-60"></div>
//             <h3 className="text-amber-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
//                 <span className="bg-amber-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center">2</span> Incident Details
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                 <div className="space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Crime Category <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaShieldAlt /></div>
//                         <select name="crimeType" value={formData.crimeType} onChange={handleChange} className="w-full bg-slate-800 p-2 md:p-3 text-white outline-none text-xs md:text-sm" required>
//                             <option value="">Select Type</option>
//                             {crimeTypes.map(t => <option key={t} value={t}>{t}</option>)}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Date & Time <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaCalendarAlt /></div>
//                         <input name="dateOfIncident" type="datetime-local" value={formData.dateOfIncident} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" required />
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Police Station <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaHome /></div>
//                         <select name="selectedStation" value={formData.selectedStation} onChange={handleChange} className="w-full bg-slate-800 p-2 md:p-3 text-white outline-none text-xs md:text-sm" required>
//                             <option value="">Nearest Station</option>
//                             {policeStations.map(s => <option key={s} value={s}>{s}</option>)}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Incident Location <span className="text-red-500">*</span></label>
//                     <div className="flex flex-col md:flex-row gap-2">
//                          <div className="flex-1 flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                             <div className="pl-3 text-slate-500 text-xs"><FaMapMarkerAlt /></div>
//                             <input name="incidentLocationAddress" value={formData.incidentLocationAddress} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Address or Link" required />
//                         </div>
//                         <button type="button" onClick={handleDetectLocation} disabled={locationLoading} className="w-full md:w-auto bg-amber-600 px-4 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2">
//                            {locationLoading ? "..." : <><FaSearchLocation /> Detect</>}
//                         </button>
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Description <span className="text-red-500">*</span></label>
//                     <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Details..." rows="3" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-xs md:text-sm outline-none" required></textarea>
//                 </div>
//             </div>
//         </div>

//         {/* SECTION 3: SUSPECT */}
//         <div className="space-y-4 md:space-y-6 relative group">
//             <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-transparent rounded-full opacity-60"></div>
//             <h3 className="text-red-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
//                 <span className="bg-red-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center">3</span> Suspect Info
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Suspect Name</label>
//                     <div className="flex gap-2">
//                         <select name="suspectTitle" value={formData.suspectTitle} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-lg px-2 text-white w-20 md:w-24 text-xs">
//                             {titles.map(t => <option key={t} value={t}>{t}</option>)}
//                         </select>
//                         <div className="flex-1 flex items-center bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
//                              <div className="pl-3 text-slate-500 text-xs"><FaUserTie /></div>
//                              <input name="suspectName" value={formData.suspectName} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Name" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 md:col-span-2">
//                     <div className="space-y-1.5">
//                         <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Est. Age</label>
//                         <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                             <div className="pl-3 text-slate-500 text-xs"><FaBirthdayCake /></div>
//                             <input type="number" name="suspectAge" value={formData.suspectAge} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Yrs" />
//                         </div>
//                     </div>
//                     <div className="space-y-1.5">
//                         <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Gender</label>
//                         <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                              <div className="pl-3 text-slate-500 text-xs"><FaVenusMars /></div>
//                              <select name="suspectGender" value={formData.suspectGender} onChange={handleChange} className="w-full bg-slate-800 p-2 md:p-3 text-white outline-none text-xs md:text-sm border-none appearance-none">
//                                  <option value="">Unknown</option>
//                                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
//                              </select>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* SECTION 4: PROOF */}
//         <div className="space-y-4 pt-4 border-t border-slate-800">
//             <h3 className="text-slate-200 text-[10px] md:text-sm font-bold uppercase tracking-widest pb-2 flex items-center gap-2">
//                 <FaVideo className="text-purple-400"/> 4. Proof of Incident
//             </h3>
//             <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 md:p-10 text-center hover:bg-purple-900/10 transition-all bg-slate-800/30 relative cursor-pointer">
//                 <input type="file" multiple accept="image/*,video/*" onChange={handleProofChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
//                 <div className="text-slate-400 flex flex-col items-center">
//                     <FaImages className="text-2xl md:text-4xl mb-2" />
//                     <p className="font-bold text-sm md:text-lg text-white">Upload Media</p>
//                     <p className="text-[9px] text-slate-500 mt-1">JPG, PNG, MP4, MOV</p>
//                 </div>
//             </div>
//             {proofPreviews.length > 0 && (
//               <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-4">
//                 {proofPreviews.map((fileObj, idx) => (
//                   <div key={idx} className="relative rounded-lg overflow-hidden border border-slate-700 bg-black aspect-square">
//                     {fileObj.type === 'video' ? <div className="w-full h-full flex items-center justify-center bg-gray-900"><FaVideo className="text-xl text-slate-600" /></div> : <img src={fileObj.url} alt="Evidence" className="w-full h-full object-cover" />}
//                     <button type="button" onClick={() => removeProof(idx)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"><FaTrash size={8} /></button>
//                   </div>
//                 ))}
//               </div>
//             )}
//         </div>

//         {/* ============================================= */}
//         {/* ✅ LEGAL CONFIRMATION CHECKBOX                */}
//         {/* ============================================= */}
//         <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-xl flex items-start gap-4">
//             <input 
//                 type="checkbox" 
//                 id="legalConfirm"
//                 checked={isConfirmed}
//                 onChange={(e) => setIsConfirmed(e.target.checked)}
//                 className="mt-1 w-5 h-5 rounded border-gray-600 text-red-600 focus:ring-red-500 cursor-pointer accent-red-500"
//             />
//             <label htmlFor="legalConfirm" className="text-sm text-slate-300 cursor-pointer select-none leading-relaxed">
//                 <span className="text-red-400 font-bold flex items-center gap-2 mb-1"><FaExclamationTriangle /> Legal Declaration</span>
//               I hereby solemnly declare, affirm, and undertake that the information, statements, particulars, and documents, including photographs and digital evidence, furnished by me in this online complaint are true, accurate, complete, and correct to the best of my knowledge, belief, and understanding. I am fully aware that furnishing false, fabricated, misleading, or suppressed information is a serious offence and is punishable under the relevant provisions of the Indian Penal Code and other applicable laws.

// I further expressly consent and authorize the concerned police authorities to verify, examine, and use the information and documents submitted by me for the purpose of inquiry, investigation, and initiation of appropriate legal proceedings, as deemed fit and lawful. I undertake to extend full cooperation to the investigating authorities and to appear before the police or any competent authority whenever lawfully required.

// I clearly understand that submission of this online complaint does not automatically amount to registration of a First Information Report (FIR) and that further action shall be taken strictly in accordance with law, rules, and procedures in force.

//             </label>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-800">
//             <button type="button" onClick={onCancel} className="order-2 md:order-1 flex-1 py-3 bg-slate-800 rounded-xl font-bold text-slate-300 text-xs md:text-sm">Cancel</button>
//             <button type="submit" disabled={loading} className="order-1 md:order-2 flex-[2] py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white text-xs md:text-base">
//                 {loading ? "Processing..." : "Submit Official Complaint"}
//             </button>
//         </div>

//       </form>
//     </motion.div>
//   );
// };

// export default ReportCrime;






















// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";
// import { crimeTypes, policeStations } from "../../data/mockData"; 
// import axios from "axios";
// import { 
//   FaUserSecret, FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaImages, 
//   FaCheckCircle, FaShieldAlt, FaUser, FaPhoneAlt, FaIdCard, FaHome, FaTimes, 
//   FaSearchLocation, FaUserTie, FaBirthdayCake, FaVenusMars, FaCamera, FaTrash, FaVideo,
//   FaExclamationTriangle
// } from "react-icons/fa";

// const ReportCrime = ({ onSuccess, onCancel }) => {
//   const [anonymous, setAnonymous] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [successId, setSuccessId] = useState(null);
//   const [isConfirmed, setIsConfirmed] = useState(false);

//   // --- FILE STATE MANAGEMENT ---
//   const [proofFiles, setProofFiles] = useState([]); 
//   const [proofPreviews, setProofPreviews] = useState([]);
//   const [victimIdFile, setVictimIdFile] = useState(null);
//   const [victimIdPreview, setVictimIdPreview] = useState(null);
  
//   // Suspect ID State
//   const [suspectIdFile, setSuspectIdFile] = useState(null);
//   const [suspectIdPreview, setSuspectIdPreview] = useState(null);

//   const loggedUser = (() => {
//       const stored = localStorage.getItem("userInfo");
//       return stored ? JSON.parse(stored) : null;
//   })();

//   const getCurrentDateTime = () => {
//       const now = new Date();
//       now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//       return now.toISOString().slice(0, 16);
//   };

//   const [formData, setFormData] = useState({
//     victimTitle: loggedUser?.title || "Mr.", 
//     victimName: loggedUser?.name || "", 
//     victimAge: loggedUser?.age || "", 
//     victimGender: loggedUser?.gender || "", 
//     victimContact: loggedUser?.mobile || "", 
//     victimAadhar: loggedUser?.aadhar || "", 
//     victimAddress: loggedUser?.address || "",
//     crimeType: "", description: "", dateOfIncident: getCurrentDateTime(), 
//     selectedStation: "", incidentLocationAddress: "",
//     suspectTitle: "Mr.", suspectName: "", suspectAge: "", suspectGender: "", 
//     suspectContact: "", suspectAddress: "", suspectAadhar: ""
//   });

//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
//   const genders = ["Male", "Female", "Transgender", "Other"];

//   useEffect(() => {
//     return () => {
//       if (victimIdPreview) URL.revokeObjectURL(victimIdPreview);
//       if (suspectIdPreview) URL.revokeObjectURL(suspectIdPreview);
//       proofPreviews.forEach(obj => URL.revokeObjectURL(obj.url));
//     };
//   }, [victimIdPreview, suspectIdPreview, proofPreviews]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
//   const handleVictimIdChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVictimIdFile(file);
//       setVictimIdPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSuspectIdChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSuspectIdFile(file);
//       setSuspectIdPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleProofChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setProofFiles(prev => [...prev, ...files]);
//       const newPreviews = files.map(file => ({
//         url: URL.createObjectURL(file),
//         type: file.type.startsWith('video') ? 'video' : 'image',
//         name: file.name
//       }));
//       setProofPreviews(prev => [...prev, ...newPreviews]);
//     }
//   };

//   const removeProof = (index) => {
//     setProofFiles(prev => prev.filter((_, i) => i !== index));
//     setProofPreviews(prev => {
//       const newPreviews = [...prev];
//       URL.revokeObjectURL(newPreviews[index].url);
//       return newPreviews.filter((_, i) => i !== index);
//     });
//   };

//   const handleDetectLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported.");
//       return;
//     }
//     setLocationLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
//         setFormData((prev) => ({ ...prev, incidentLocationAddress: mapLink }));
//         toast.success("Location Generated!");
//         setLocationLoading(false);
//       },
//       () => {
//         toast.error("Location access denied.");
//         setLocationLoading(false);
//       }
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isConfirmed) { toast.error("Agree to the legal declaration."); return; }
//     if(!formData.crimeType || !formData.dateOfIncident || !formData.description || !formData.selectedStation || !formData.incidentLocationAddress) {
//        toast.error("Fill all required fields."); return;
//     }

//     setLoading(true);
//     try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const data = new FormData();
//         if (userInfo?._id) data.append("userId", userInfo._id); 

//         Object.keys(formData).forEach(key => {
//             if (key.startsWith('suspect') && formData[key] === "") data.append(key, "N/A"); 
//             else data.append(key, formData[key]);
//         });
        
//         data.append("isAnonymous", anonymous);
//         data.append("reporterName", anonymous ? "Hidden Identity" : userInfo?.name);
        
//         if (victimIdFile) data.append("victimIdPhoto", victimIdFile);
        
//         // ✅ Suspect Photo is correctly handled here
//         if (suspectIdFile) data.append("suspectIdPhoto", suspectIdFile);
        
//         proofFiles.forEach(file => data.append("incidentProof", file));

//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         const response = await axios.post("http://localhost:5000/api/crime/report", data, config);

//         toast.success("Report Submitted!");
//         setSuccessId(response.data._id);
//     } catch (error) {
//         toast.error(error.response?.data?.message || "Submission failed.");
//     } finally {
//         setLoading(false);
//     }
//   };

//   // ✅ MODIFIED BLOCK: Display Full Success ID
//   if (successId) {
//     return (
//         <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-green-500/50 p-6 md:p-10 rounded-2xl text-center max-w-2xl mx-auto mt-6 md:mt-10 shadow-2xl backdrop-blur-md">
//             <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-3xl md:text-5xl text-green-400">
//                 <FaCheckCircle />
//             </div>
//             <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">Report Filed!</h2>
//             <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-lg">Incident securely recorded.</p>
//             <div className="bg-black/40 p-4 md:p-6 rounded-xl border border-green-500/30 inline-block w-full md:min-w-[320px]">
//                 <p className="text-[10px] text-green-400 uppercase font-bold tracking-widest mb-1">Complaint Reference ID</p>
//                 {/* 👇 Changed here: Showing full ID, added break-all to prevent overflow, adjusted size slightly */}
//                 <code className="text-lg md:text-2xl font-mono text-white font-bold tracking-widest break-all">
//                     {successId}
//                 </code>
//             </div>
//             <div className="mt-8 md:mt-10">
//                  <button onClick={onCancel} className="w-full md:w-auto px-10 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all">Return to Dashboard</button>
//             </div>
//         </motion.div>
//     );
//   }

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto pb-10 md:pb-20 font-sans text-slate-200">
      
//       {/* HEADER: Adjusted for Mobile */}
//       <div className="bg-slate-800/80 backdrop-blur-md p-5 md:p-8 rounded-t-2xl md:rounded-t-3xl border-b border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-xl relative overflow-hidden">
//           <div className="relative z-10 text-center md:text-left">
//               <h2 className="text-xl md:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-2 md:gap-3 tracking-tight">
//                 <FaFileAlt className="text-blue-500"/> File New Report
//               </h2>
//               <p className="text-slate-400 text-[10px] md:text-sm mt-1 font-medium">Official Portal • <span className="text-red-400 font-bold">* Required</span></p>
//           </div>
          
//           <div 
//             onClick={() => setAnonymous(!anonymous)}
//             className={`relative z-10 cursor-pointer px-4 py-2 md:px-6 md:py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 md:gap-3 select-none ${anonymous ? "bg-amber-500/10 border-amber-500 text-amber-400" : "bg-slate-700/50 border-slate-600 text-slate-300"}`}
//           >
//               <div className={`w-4 h-4 md:w-5 md:h-5 border-2 rounded-full flex items-center justify-center transition-colors ${anonymous ? "border-amber-400 bg-amber-400" : "border-slate-400"}`}>
//                   {anonymous && <FaCheckCircle className="text-black text-[8px] md:text-[10px]" />}
//               </div>
//               <span className="text-[10px] md:text-sm font-bold uppercase tracking-wide flex items-center gap-1.5"><FaUserSecret /> Anonymous</span>
//           </div>
//       </div>
      
//       <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 border-t-0 rounded-b-2xl md:rounded-b-3xl p-5 md:p-10 shadow-2xl space-y-8 md:space-y-12">
        
//         {/* SECTION 1: VICTIM */}
//         <div className="space-y-4 md:space-y-6 relative group">
//             <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-60"></div>
//             <h3 className="text-blue-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
//                 <span className="bg-blue-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center">1</span> Victim Info
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Victim Name <span className="text-red-500">*</span></label>
//                     <div className="flex gap-2">
//                         <select name="victimTitle" value={formData.victimTitle} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 md:p-3 text-white outline-none w-20 md:w-24 text-xs md:text-sm">
//                             {titles.map(t => <option key={t} value={t}>{t}</option>)}
//                         </select>
//                         <div className="flex-1 flex items-center bg-slate-800 rounded-lg border border-slate-700 focus-within:border-blue-500 overflow-hidden transition-all">
//                             <div className="pl-3 text-slate-500 text-xs md:text-base"><FaUser /></div>
//                             <input name="victimName" value={formData.victimName} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Full Name" required />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:col-span-2">
//                     <div className="space-y-1.5">
//                         <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Age <span className="text-red-500">*</span></label>
//                         <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
//                             <div className="pl-3 text-slate-500 text-xs"><FaBirthdayCake /></div>
//                             <input type="number" name="victimAge" value={formData.victimAge} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Yrs" required />
//                         </div>
//                     </div>
//                     <div className="space-y-1.5">
//                         <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Gender <span className="text-red-500">*</span></label>
//                         <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
//                              <div className="pl-3 text-slate-500 text-xs"><FaVenusMars /></div>
//                              <select name="victimGender" value={formData.victimGender} onChange={handleChange} className="w-full bg-slate-800 p-2 md:p-3 text-white outline-none text-xs md:text-sm border-none appearance-none" required>
//                                  <option value="">Select</option>
//                                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
//                              </select>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Contact <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaPhoneAlt /></div>
//                         <input name="victimContact" type="text" maxLength="10" value={formData.victimContact} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="10-digit Mobile" required />
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Aadhaar <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaIdCard /></div>
//                         <input name="victimAadhar" type="text" maxLength="12" value={formData.victimAadhar} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="12-digit UID" required />
//                     </div>
//                 </div>

//                 <div className="md:col-span-4 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Residential Address</label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaHome /></div>
//                         <input name="victimAddress" value={formData.victimAddress} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Full Address" required />
//                     </div>
//                 </div>

//                 <div className="md:col-span-4 space-y-3">
//                     <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-dashed border-slate-600">
//                         <label className="w-full md:w-auto cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-all">
//                             <FaCamera /> {victimIdFile ? "Change" : "Upload Victim ID"}
//                             <input type="file" accept="image/*" onChange={handleVictimIdChange} className="hidden" />
//                         </label>
//                         {victimIdPreview && <img src={victimIdPreview} className="h-16 w-24 object-cover rounded-lg border border-blue-500" alt="Preview" />}
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* SECTION 2: INCIDENT */}
//         <div className="space-y-4 md:space-y-6 relative group">
//             <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-transparent rounded-full opacity-60"></div>
//             <h3 className="text-amber-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
//                 <span className="bg-amber-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center">2</span> Incident Details
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                 <div className="space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Crime Category <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaShieldAlt /></div>
//                         <select name="crimeType" value={formData.crimeType} onChange={handleChange} className="w-full bg-slate-800 p-2 md:p-3 text-white outline-none text-xs md:text-sm" required>
//                             <option value="">Select Type</option>
//                             {crimeTypes.map(t => <option key={t} value={t}>{t}</option>)}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Date & Time <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaCalendarAlt /></div>
//                         <input name="dateOfIncident" type="datetime-local" value={formData.dateOfIncident} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" required />
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Police Station <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaHome /></div>
//                         <select name="selectedStation" value={formData.selectedStation} onChange={handleChange} className="w-full bg-slate-800 p-2 md:p-3 text-white outline-none text-xs md:text-sm" required>
//                             <option value="">Nearest Station</option>
//                             {policeStations.map(s => <option key={s} value={s}>{s}</option>)}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Incident Location <span className="text-red-500">*</span></label>
//                     <div className="flex flex-col md:flex-row gap-2">
//                          <div className="flex-1 flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                             <div className="pl-3 text-slate-500 text-xs"><FaMapMarkerAlt /></div>
//                             <input name="incidentLocationAddress" value={formData.incidentLocationAddress} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Address or Link" required />
//                         </div>
//                         <button type="button" onClick={handleDetectLocation} disabled={locationLoading} className="w-full md:w-auto bg-amber-600 px-4 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2">
//                            {locationLoading ? "..." : <><FaSearchLocation /> Detect</>}
//                         </button>
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Description <span className="text-red-500">*</span></label>
//                     <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Details..." rows="3" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-xs md:text-sm outline-none" required></textarea>
//                 </div>
//             </div>
//         </div>

//         {/* SECTION 3: SUSPECT (Updated with Missing Fields) */}
//         <div className="space-y-4 md:space-y-6 relative group">
//             <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-transparent rounded-full opacity-60"></div>
//             <h3 className="text-red-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
//                 <span className="bg-red-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center">3</span> Suspect Info
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Suspect Name</label>
//                     <div className="flex gap-2">
//                         <select name="suspectTitle" value={formData.suspectTitle} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-lg px-2 text-white w-20 md:w-24 text-xs">
//                             {titles.map(t => <option key={t} value={t}>{t}</option>)}
//                         </select>
//                         <div className="flex-1 flex items-center bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
//                              <div className="pl-3 text-slate-500 text-xs"><FaUserTie /></div>
//                              <input name="suspectName" value={formData.suspectName} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Name" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 md:col-span-2">
//                     <div className="space-y-1.5">
//                         <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Est. Age</label>
//                         <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                             <div className="pl-3 text-slate-500 text-xs"><FaBirthdayCake /></div>
//                             <input type="number" name="suspectAge" value={formData.suspectAge} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Yrs" />
//                         </div>
//                     </div>
//                     <div className="space-y-1.5">
//                         <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Gender</label>
//                         <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                              <div className="pl-3 text-slate-500 text-xs"><FaVenusMars /></div>
//                              <select name="suspectGender" value={formData.suspectGender} onChange={handleChange} className="w-full bg-slate-800 p-2 md:p-3 text-white outline-none text-xs md:text-sm border-none appearance-none">
//                                  <option value="">Unknown</option>
//                                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
//                              </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ✅ Added Suspect Contact */}
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Suspect Contact</label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaPhoneAlt /></div>
//                         <input name="suspectContact" type="text" maxLength="10" value={formData.suspectContact} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Mobile (Optional)" />
//                     </div>
//                 </div>

//                 {/* ✅ Added Suspect Aadhaar */}
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Suspect Aadhaar</label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaIdCard /></div>
//                         <input name="suspectAadhar" type="text" maxLength="12" value={formData.suspectAadhar} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="UID (Optional)" />
//                     </div>
//                 </div>

//                 {/* ✅ Added Suspect Address */}
//                 <div className="md:col-span-4 space-y-1.5">
//                     <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Suspect Residential Address</label>
//                     <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
//                         <div className="pl-3 text-slate-500 text-xs"><FaHome /></div>
//                         <input name="suspectAddress" value={formData.suspectAddress} onChange={handleChange} className="w-full bg-transparent p-2 md:p-3 text-white outline-none text-xs md:text-sm" placeholder="Known Address" />
//                     </div>
//                 </div>

//                 {/* ✅ Added Suspect Photo Upload */}
//                 <div className="md:col-span-4 space-y-3">
//                     <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-dashed border-slate-600">
//                         <label className="w-full md:w-auto cursor-pointer bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-all">
//                             <FaCamera /> {suspectIdFile ? "Change" : "Upload Suspect ID/Photo"}
//                             <input type="file" accept="image/*" onChange={handleSuspectIdChange} className="hidden" />
//                         </label>
//                         {suspectIdPreview && <img src={suspectIdPreview} className="h-16 w-24 object-cover rounded-lg border border-red-500" alt="Suspect Preview" />}
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* SECTION 4: PROOF */}
//         <div className="space-y-4 pt-4 border-t border-slate-800">
//             <h3 className="text-slate-200 text-[10px] md:text-sm font-bold uppercase tracking-widest pb-2 flex items-center gap-2">
//                 <FaVideo className="text-purple-400"/> 4. Proof of Incident
//             </h3>
//             <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 md:p-10 text-center hover:bg-purple-900/10 transition-all bg-slate-800/30 relative cursor-pointer">
//                 <input type="file" multiple accept="image/*,video/*" onChange={handleProofChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
//                 <div className="text-slate-400 flex flex-col items-center">
//                     <FaImages className="text-2xl md:text-4xl mb-2" />
//                     <p className="font-bold text-sm md:text-lg text-white">Upload Media</p>
//                     <p className="text-[9px] text-slate-500 mt-1">JPG, PNG, MP4, MOV</p>
//                 </div>
//             </div>
//             {proofPreviews.length > 0 && (
//               <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-4">
//                 {proofPreviews.map((fileObj, idx) => (
//                   <div key={idx} className="relative rounded-lg overflow-hidden border border-slate-700 bg-black aspect-square">
//                     {fileObj.type === 'video' ? <div className="w-full h-full flex items-center justify-center bg-gray-900"><FaVideo className="text-xl text-slate-600" /></div> : <img src={fileObj.url} alt="Evidence" className="w-full h-full object-cover" />}
//                     <button type="button" onClick={() => removeProof(idx)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"><FaTrash size={8} /></button>
//                   </div>
//                 ))}
//               </div>
//             )}
//         </div>

//         {/* LEGAL CONFIRMATION */}
//         <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-xl flex items-start gap-4">
//             <input 
//                 type="checkbox" 
//                 id="legalConfirm"
//                 checked={isConfirmed}
//                 onChange={(e) => setIsConfirmed(e.target.checked)}
//                 className="mt-1 w-5 h-5 rounded border-gray-600 text-red-600 focus:ring-red-500 cursor-pointer accent-red-500"
//             />
//             <label htmlFor="legalConfirm" className="text-sm text-slate-300 cursor-pointer select-none leading-relaxed">
//                 <span className="text-red-400 font-bold flex items-center gap-2 mb-1"><FaExclamationTriangle /> Legal Declaration</span>
//               I solemnly affirm that the information furnished in this online complaint, along with supporting documents and photographs, is true and accurate. I am aware that submission of false information is an offence punishable under applicable laws. I hereby give my consent for verification and further legal action as deemed necessary by the police authorities.

//             </label>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-800">
//             <button type="button" onClick={onCancel} className="order-2 md:order-1 flex-1 py-3 bg-slate-800 rounded-xl font-bold text-slate-300 text-xs md:text-sm">Cancel</button>
//             <button type="submit" disabled={loading} className="order-1 md:order-2 flex-[2] py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white text-xs md:text-base">
//                 {loading ? "Processing..." : "Submit Official Complaint"}
//             </button>
//         </div>

//       </form>
//     </motion.div>
//   );
// };

// export default ReportCrime;











// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";
// import { crimeTypes, policeStations } from "../../data/mockData"; 
// import axios from "axios";
// import { 
//   FaUserSecret, FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaImages, 
//   FaCheckCircle, FaShieldAlt, FaUser, FaPhoneAlt, FaIdCard, FaHome, FaTimes, 
//   FaSearchLocation, FaUserTie, FaBirthdayCake, FaVenusMars, FaCamera, FaTrash, FaVideo,
//   FaExclamationTriangle, FaChevronDown, FaPlus, FaMinus
// } from "react-icons/fa";

// // --- CUSTOM ANIMATED SELECT COMPONENT ---
// const AnimatedSelect = ({ label, options, value, onChange, name, icon }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef(null);

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (option) => {
//     // Mimic standard event object for compatibility with parent handler
//     onChange({ target: { name, value: option } });
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative w-full" ref={containerRef}>
//       <div 
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center bg-slate-800 rounded-xl border border-slate-700 cursor-pointer p-2 md:p-3 hover:border-blue-500 transition-colors"
//       >
//         <div className="pl-2 text-slate-500 text-xs md:text-sm">{icon}</div>
//         <div className={`flex-1 ml-3 text-xs md:text-sm font-bold ${value ? 'text-blue-200' : 'text-slate-400'}`}>
//           {value || label}
//         </div>
//         <FaChevronDown className={`text-slate-500 text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
//       </div>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.ul
//             initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
//             animate={{ opacity: 1, y: 0, scaleY: 1 }}
//             exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
//             transition={{ duration: 0.2, ease: "easeOut" }} // Slow smooth animation
//             className="absolute z-50 mt-2 w-full bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl max-h-60 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-600"
//           >
//             {options.map((opt, idx) => (
//               <li 
//                 key={idx} 
//                 onClick={() => handleSelect(opt)}
//                 className="px-4 py-3 text-xs md:text-sm text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-white cursor-pointer border-b border-slate-700/50 last:border-none transition-all"
//               >
//                 {opt}
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // --- CUSTOM NUMBER INPUT (AGE) ---
// const AgeInput = ({ value, onChange, name }) => {
//   const handleIncrement = () => onChange({ target: { name, value: Number(value) + 1 } });
//   const handleDecrement = () => {
//     if (value > 0) onChange({ target: { name, value: Number(value) - 1 } });
//   };

//   return (
//     <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 overflow-hidden w-full">
//       <div className="pl-3 text-slate-500 text-xs"><FaBirthdayCake /></div>
//       <button type="button" onClick={handleDecrement} className="p-3 text-slate-400 hover:text-white bg-slate-700/30 hover:bg-slate-700 transition-colors">
//         <FaMinus size={10} />
//       </button>
//       <input 
//         type="number" 
//         name={name} 
//         value={value} 
//         readOnly // Prevent manual typing if you strictly want buttons, or remove this to allow typing
//         className="w-full bg-transparent text-center text-blue-200 font-bold font-mono text-sm outline-none appearance-none m-0"
//         placeholder="0" 
//       />
//       <button type="button" onClick={handleIncrement} className="p-3 text-slate-400 hover:text-white bg-slate-700/30 hover:bg-slate-700 transition-colors">
//         <FaPlus size={10} />
//       </button>
//     </div>
//   );
// };

// const ReportCrime = ({ onSuccess, onCancel }) => {
//   const [anonymous, setAnonymous] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [successId, setSuccessId] = useState(null);
//   const [isConfirmed, setIsConfirmed] = useState(false);

//   const [proofFiles, setProofFiles] = useState([]); 
//   const [proofPreviews, setProofPreviews] = useState([]);
//   const [victimIdFile, setVictimIdFile] = useState(null);
//   const [victimIdPreview, setVictimIdPreview] = useState(null);
//   const [suspectIdFile, setSuspectIdFile] = useState(null);
//   const [suspectIdPreview, setSuspectIdPreview] = useState(null);

//   const loggedUser = (() => {
//       const stored = localStorage.getItem("userInfo");
//       return stored ? JSON.parse(stored) : null;
//   })();

//   const getCurrentDateTime = () => {
//       const now = new Date();
//       now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//       return now.toISOString().slice(0, 16);
//   };

//   const [formData, setFormData] = useState({
//     victimTitle: loggedUser?.title || "Mr.", 
//     victimName: loggedUser?.name || "", 
//     victimAge: loggedUser?.age || 0, 
//     victimGender: loggedUser?.gender || "", 
//     victimContact: loggedUser?.mobile || "", 
//     victimAadhar: loggedUser?.aadhar || "", 
//     victimAddress: loggedUser?.address || "",
//     crimeType: "", description: "", dateOfIncident: getCurrentDateTime(), 
//     selectedStation: "", incidentLocationAddress: "",
//     suspectTitle: "Mr.", suspectName: "", suspectAge: 0, suspectGender: "", 
//     suspectContact: "", suspectAddress: "", suspectAadhar: ""
//   });

//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
//   const genders = ["Male", "Female", "Transgender", "Other"];

//   useEffect(() => {
//     return () => {
//       if (victimIdPreview) URL.revokeObjectURL(victimIdPreview);
//       if (suspectIdPreview) URL.revokeObjectURL(suspectIdPreview);
//       proofPreviews.forEach(obj => URL.revokeObjectURL(obj.url));
//     };
//   }, [victimIdPreview, suspectIdPreview, proofPreviews]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
//   const handleVictimIdChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVictimIdFile(file);
//       setVictimIdPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSuspectIdChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSuspectIdFile(file);
//       setSuspectIdPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleProofChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setProofFiles(prev => [...prev, ...files]);
//       const newPreviews = files.map(file => ({
//         url: URL.createObjectURL(file),
//         type: file.type.startsWith('video') ? 'video' : 'image',
//         name: file.name
//       }));
//       setProofPreviews(prev => [...prev, ...newPreviews]);
//     }
//   };

//   const removeProof = (index) => {
//     setProofFiles(prev => prev.filter((_, i) => i !== index));
//     setProofPreviews(prev => {
//       const newPreviews = [...prev];
//       URL.revokeObjectURL(newPreviews[index].url);
//       return newPreviews.filter((_, i) => i !== index);
//     });
//   };

//   const handleDetectLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported.");
//       return;
//     }
//     setLocationLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
//         setFormData((prev) => ({ ...prev, incidentLocationAddress: mapLink }));
//         toast.success("Location Generated!");
//         setLocationLoading(false);
//       },
//       () => {
//         toast.error("Location access denied.");
//         setLocationLoading(false);
//       }
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isConfirmed) { toast.error("Agree to the legal declaration."); return; }
//     if(!formData.crimeType || !formData.dateOfIncident || !formData.description || !formData.selectedStation || !formData.incidentLocationAddress) {
//        toast.error("Fill all required fields."); return;
//     }

//     setLoading(true);
//     try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const data = new FormData();
//         if (userInfo?._id) data.append("userId", userInfo._id); 

//         Object.keys(formData).forEach(key => {
//             if (key.startsWith('suspect') && formData[key] === "") data.append(key, "N/A"); 
//             else data.append(key, formData[key]);
//         });
        
//         data.append("isAnonymous", anonymous);
//         data.append("reporterName", anonymous ? "Hidden Identity" : userInfo?.name);
        
//         if (victimIdFile) data.append("victimIdPhoto", victimIdFile);
//         if (suspectIdFile) data.append("suspectIdPhoto", suspectIdFile);
//         proofFiles.forEach(file => data.append("incidentProof", file));

//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         const response = await axios.post("http://localhost:5000/api/crime/report", data, config);

//         toast.success("Report Submitted!");
//         setSuccessId(response.data._id);
//     } catch (error) {
//         toast.error(error.response?.data?.message || "Submission failed.");
//     } finally {
//         setLoading(false);
//     }
//   };

//   // SUCCESS VIEW
//   if (successId) {
//     return (
//         <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-green-500/50 p-6 md:p-10 rounded-3xl text-center max-w-2xl mx-auto mt-6 md:mt-10 shadow-2xl backdrop-blur-md">
//             <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-3xl md:text-5xl text-green-400">
//                 <FaCheckCircle />
//             </div>
//             <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">Report Filed!</h2>
//             <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-lg">Incident securely recorded.</p>
//             <div className="bg-black/40 p-4 md:p-6 rounded-2xl border border-green-500/30 inline-block w-full md:min-w-[320px]">
//                 <p className="text-[10px] text-green-400 uppercase font-bold tracking-widest mb-1">Complaint Reference ID</p>
//                 <code className="text-lg md:text-2xl font-mono text-white font-bold tracking-widest break-all">
//                     {successId}
//                 </code>
//             </div>
//             <div className="mt-8 md:mt-10">
//                  <button onClick={onCancel} className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-xl font-bold transition-all shadow-lg">Return to Dashboard</button>
//             </div>
//         </motion.div>
//     );
//   }

//   // COMMON INPUT STYLE (Used for Text Inputs)
//   const inputStyle = "w-full bg-transparent p-2 md:p-3 text-blue-100 outline-none text-sm md:text-base font-bold font-mono tracking-wide placeholder-slate-600";
//   const labelStyle = "text-[10px] text-slate-400 font-extrabold uppercase ml-1 tracking-wider";

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto pb-10 md:pb-20 font-sans text-slate-200">
      
//       {/* HEADER */}
//       <div className="bg-slate-800/80 backdrop-blur-md p-5 md:p-8 rounded-t-2xl md:rounded-t-3xl border-b border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-xl relative overflow-hidden">
//           <div className="relative z-10 text-center md:text-left">
//               <h2 className="text-xl md:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-2 md:gap-3 tracking-tight">
//                 <FaFileAlt className="text-blue-500"/> File New Report
//               </h2>
//               <p className="text-slate-400 text-[10px] md:text-sm mt-1 font-medium">Official Portal • <span className="text-red-400 font-bold">* Required</span></p>
//           </div>
          
//           <div 
//             onClick={() => setAnonymous(!anonymous)}
//             className={`relative z-10 cursor-pointer px-4 py-2 md:px-6 md:py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 md:gap-3 select-none shadow-lg ${anonymous ? "bg-amber-500/10 border-amber-500 text-amber-400" : "bg-slate-700/50 border-slate-600 text-slate-300"}`}
//           >
//               <div className={`w-4 h-4 md:w-5 md:h-5 border-2 rounded-full flex items-center justify-center transition-colors ${anonymous ? "border-amber-400 bg-amber-400" : "border-slate-400"}`}>
//                   {anonymous && <FaCheckCircle className="text-black text-[8px] md:text-[10px]" />}
//               </div>
//               <span className="text-[10px] md:text-sm font-bold uppercase tracking-wide flex items-center gap-1.5"><FaUserSecret /> Anonymous</span>
//           </div>
//       </div>
      
//       <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 border-t-0 rounded-b-2xl md:rounded-b-3xl p-4 md:p-10 shadow-2xl space-y-8 md:space-y-12">
        
//         {/* SECTION 1: VICTIM */}
//         <div className="space-y-4 md:space-y-6 relative group">
//             <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-60"></div>
//             <h3 className="text-blue-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
//                 <span className="bg-blue-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center shadow-inner">1</span> Victim Info
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className={labelStyle}>Victim Name <span className="text-red-500">*</span></label>
//                     <div className="flex gap-2">
//                         <div className="w-24">
//                            {/* Using Animated Select for Title */}
//                            <AnimatedSelect 
//                               options={titles} 
//                               value={formData.victimTitle} 
//                               onChange={handleChange} 
//                               name="victimTitle" 
//                               label="Title"
//                               icon={<FaUserTie size={10}/>}
//                            />
//                         </div>
//                         <div className="flex-1 flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 overflow-hidden transition-all">
//                             <div className="pl-3 text-slate-500 text-xs md:text-base"><FaUser /></div>
//                             <input name="victimName" value={formData.victimName} onChange={handleChange} className={inputStyle} placeholder="Full Name" required />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 md:col-span-2">
//                     <div className="space-y-1.5">
//                         <label className={labelStyle}>Age <span className="text-red-500">*</span></label>
//                         {/* Custom Age Input with Buttons */}
//                         <AgeInput name="victimAge" value={formData.victimAge} onChange={handleChange} />
//                     </div>
//                     <div className="space-y-1.5">
//                         <label className={labelStyle}>Gender <span className="text-red-500">*</span></label>
//                         <AnimatedSelect 
//                            options={genders}
//                            value={formData.victimGender}
//                            onChange={handleChange}
//                            name="victimGender"
//                            label="Select"
//                            icon={<FaVenusMars />}
//                         />
//                     </div>
//                 </div>

//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className={labelStyle}>Contact <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-all">
//                         <div className="pl-3 text-slate-500 text-xs"><FaPhoneAlt /></div>
//                         <input name="victimContact" type="tel" maxLength="10" value={formData.victimContact} onChange={handleChange} className={inputStyle} placeholder="Mobile No." required />
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className={labelStyle}>Aadhaar <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-all">
//                         <div className="pl-3 text-slate-500 text-xs"><FaIdCard /></div>
//                         <input name="victimAadhar" type="text" maxLength="12" value={formData.victimAadhar} onChange={handleChange} className={inputStyle} placeholder="UID Number" required />
//                     </div>
//                 </div>

//                 <div className="md:col-span-4 space-y-1.5">
//                     <label className={labelStyle}>Residential Address</label>
//                     <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-all">
//                         <div className="pl-3 text-slate-500 text-xs"><FaHome /></div>
//                         <input name="victimAddress" value={formData.victimAddress} onChange={handleChange} className={inputStyle} placeholder="Enter Full Address" required />
//                     </div>
//                 </div>

//                 <div className="md:col-span-4 space-y-3">
//                     <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-dashed border-slate-600 hover:border-blue-500 transition-all">
//                         <label className="w-full md:w-auto cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-bold shadow-lg transition-all transform hover:scale-105">
//                             <FaCamera /> {victimIdFile ? "Change Photo" : "Upload Identity Photo"}
//                             <input type="file" accept="image/*" onChange={handleVictimIdChange} className="hidden" />
//                         </label>
//                         {victimIdPreview && <img src={victimIdPreview} className="h-20 w-32 object-cover rounded-xl border-2 border-blue-500 shadow-md" alt="Preview" />}
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* SECTION 2: INCIDENT */}
//         <div className="space-y-4 md:space-y-6 relative group">
//             <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-transparent rounded-full opacity-60"></div>
//             <h3 className="text-amber-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
//                 <span className="bg-amber-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center shadow-inner">2</span> Incident Details
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                 <div className="space-y-1.5">
//                     <label className={labelStyle}>Crime Category <span className="text-red-500">*</span></label>
//                     <AnimatedSelect 
//                        options={crimeTypes}
//                        value={formData.crimeType}
//                        onChange={handleChange}
//                        name="crimeType"
//                        label="Select Crime Type"
//                        icon={<FaShieldAlt />}
//                     />
//                 </div>
//                 <div className="space-y-1.5">
//                     <label className={labelStyle}>Date & Time <span className="text-red-500">*</span></label>
//                     <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-amber-500 transition-all">
//                         <div className="pl-3 text-slate-500 text-xs"><FaCalendarAlt /></div>
//                         <input name="dateOfIncident" type="datetime-local" value={formData.dateOfIncident} onChange={handleChange} className={inputStyle} required />
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className={labelStyle}>Police Station <span className="text-red-500">*</span></label>
//                     <AnimatedSelect 
//                        options={policeStations}
//                        value={formData.selectedStation}
//                        onChange={handleChange}
//                        name="selectedStation"
//                        label="Choose Nearest Station"
//                        icon={<FaHome />}
//                     />
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className={labelStyle}>Incident Location <span className="text-red-500">*</span></label>
//                     <div className="flex flex-col md:flex-row gap-2">
//                          <div className="flex-1 flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-amber-500 transition-all">
//                             <div className="pl-3 text-slate-500 text-xs"><FaMapMarkerAlt /></div>
//                             <input name="incidentLocationAddress" value={formData.incidentLocationAddress} onChange={handleChange} className={inputStyle} placeholder="Paste Map Link or Type Address" required />
//                         </div>
//                         <button type="button" onClick={handleDetectLocation} disabled={locationLoading} className="w-full md:w-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all text-white">
//                            {locationLoading ? "Detecting..." : <><FaSearchLocation /> Detect GPS</>}
//                         </button>
//                     </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className={labelStyle}>Description <span className="text-red-500">*</span></label>
//                     <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the incident in detail..." rows="4" className={`${inputStyle} rounded-xl border border-slate-700 focus:border-amber-500 h-auto resize-none`} required></textarea>
//                 </div>
//             </div>
//         </div>

//         {/* SECTION 3: SUSPECT */}
//         <div className="space-y-4 md:space-y-6 relative group">
//             <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-transparent rounded-full opacity-60"></div>
//             <h3 className="text-red-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
//                 <span className="bg-red-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center shadow-inner">3</span> Suspect Info
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className={labelStyle}>Suspect Name</label>
//                     <div className="flex gap-2">
//                         <div className="w-24">
//                            <AnimatedSelect 
//                               options={titles} 
//                               value={formData.suspectTitle} 
//                               onChange={handleChange} 
//                               name="suspectTitle" 
//                               label="Title"
//                               icon={<FaUserTie size={10}/>}
//                            />
//                         </div>
//                         <div className="flex-1 flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-red-500 overflow-hidden transition-all">
//                              <div className="pl-3 text-slate-500 text-xs"><FaUserTie /></div>
//                              <input name="suspectName" value={formData.suspectName} onChange={handleChange} className={inputStyle} placeholder="Name (if known)" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 md:col-span-2">
//                     <div className="space-y-1.5">
//                         <label className={labelStyle}>Est. Age</label>
//                          {/* Suspect Age Input */}
//                          <AgeInput name="suspectAge" value={formData.suspectAge} onChange={handleChange} />
//                     </div>
//                     <div className="space-y-1.5">
//                         <label className={labelStyle}>Gender</label>
//                         <AnimatedSelect 
//                            options={genders}
//                            value={formData.suspectGender}
//                            onChange={handleChange}
//                            name="suspectGender"
//                            label="Unknown"
//                            icon={<FaVenusMars />}
//                         />
//                     </div>
//                 </div>

//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className={labelStyle}>Suspect Contact</label>
//                     <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-red-500 transition-all">
//                         <div className="pl-3 text-slate-500 text-xs"><FaPhoneAlt /></div>
//                         <input name="suspectContact" type="tel" maxLength="10" value={formData.suspectContact} onChange={handleChange} className={inputStyle} placeholder="Mobile (Optional)" />
//                     </div>
//                 </div>

//                 <div className="md:col-span-2 space-y-1.5">
//                     <label className={labelStyle}>Suspect Aadhaar</label>
//                     <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-red-500 transition-all">
//                         <div className="pl-3 text-slate-500 text-xs"><FaIdCard /></div>
//                         <input name="suspectAadhar" type="text" maxLength="12" value={formData.suspectAadhar} onChange={handleChange} className={inputStyle} placeholder="UID (Optional)" />
//                     </div>
//                 </div>

//                 <div className="md:col-span-4 space-y-1.5">
//                     <label className={labelStyle}>Suspect Residential Address</label>
//                     <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-red-500 transition-all">
//                         <div className="pl-3 text-slate-500 text-xs"><FaHome /></div>
//                         <input name="suspectAddress" value={formData.suspectAddress} onChange={handleChange} className={inputStyle} placeholder="Known Address" />
//                     </div>
//                 </div>

//                 <div className="md:col-span-4 space-y-3">
//                     <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-dashed border-slate-600 hover:border-red-500 transition-all">
//                         <label className="w-full md:w-auto cursor-pointer bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-bold shadow-lg transition-all transform hover:scale-105">
//                             <FaCamera /> {suspectIdFile ? "Change Photo" : "Upload Identity Photo"}
//                             <input type="file" accept="image/*" onChange={handleSuspectIdChange} className="hidden" />
//                         </label>
//                         {suspectIdPreview && <img src={suspectIdPreview} className="h-20 w-32 object-cover rounded-xl border-2 border-red-500 shadow-md" alt="Suspect Preview" />}
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* SECTION 4: PROOF */}
//         <div className="space-y-4 pt-4 border-t border-slate-800">
//             <h3 className="text-slate-200 text-[10px] md:text-sm font-bold uppercase tracking-widest pb-2 flex items-center gap-2">
//                 <FaVideo className="text-purple-400"/> 4. Proof of Incident
//             </h3>
//             <div className="border-2 border-dashed border-slate-600 rounded-2xl p-6 md:p-8 text-center hover:bg-purple-900/10 hover:border-purple-500 transition-all bg-slate-800/30 relative cursor-pointer group">
//                 <input type="file" multiple accept="image/*,video/*" onChange={handleProofChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
//                 <div className="text-slate-400 flex flex-col items-center group-hover:scale-105 transition-transform">
//                     <FaImages className="text-2xl md:text-4xl mb-2 text-purple-400" />
//                     <p className="font-bold text-sm md:text-lg text-white">Tap to Upload Media</p>
//                     <p className="text-[9px] text-slate-500 mt-1">JPG, PNG, MP4, MOV</p>
//                 </div>
//             </div>
//             {proofPreviews.length > 0 && (
//               <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-4">
//                 {proofPreviews.map((fileObj, idx) => (
//                   <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-700 bg-black aspect-square shadow-lg">
//                     {fileObj.type === 'video' ? <div className="w-full h-full flex items-center justify-center bg-gray-900"><FaVideo className="text-xl text-slate-600" /></div> : <img src={fileObj.url} alt="Evidence" className="w-full h-full object-cover" />}
//                     <button type="button" onClick={() => removeProof(idx)} className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-full shadow-md"><FaTrash size={10} /></button>
//                   </div>
//                 ))}
//               </div>
//             )}
//         </div>

//         {/* LEGAL CONFIRMATION */}
//         <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-2xl flex items-start gap-4">
//             <input 
//                 type="checkbox" 
//                 id="legalConfirm"
//                 checked={isConfirmed}
//                 onChange={(e) => setIsConfirmed(e.target.checked)}
//                 className="mt-1 w-5 h-5 rounded border-gray-600 text-red-600 focus:ring-red-500 cursor-pointer accent-red-500"
//             />
//             <label htmlFor="legalConfirm" className="text-sm text-slate-300 cursor-pointer select-none leading-relaxed">
//                 <span className="text-red-400 font-bold flex items-center gap-2 mb-1"><FaExclamationTriangle /> Legal Declaration</span>
//               I solemnly affirm that the information furnished in this online complaint, along with supporting documents and photographs, is true and accurate. I am aware that submission of false information is an offence punishable under applicable laws.
//             </label>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-slate-800">
//             <button type="button" onClick={onCancel} className="order-2 md:order-1 flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-slate-300 text-xs md:text-sm transition-all">Cancel</button>
//             <button type="submit" disabled={loading} className="order-1 md:order-2 flex-[2] py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-xl font-bold text-white text-xs md:text-base shadow-xl transition-all transform hover:scale-[1.01]">
//                 {loading ? "Processing..." : "Submit Official Complaint"}
//             </button>
//         </div>

//       </form>
//     </motion.div>
//   );
// };

// export default ReportCrime;




import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { crimeTypes } from "../../data/mockData"; 
import axios from "axios";
import { 
  FaUserSecret, FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaImages, 
  FaCheckCircle, FaShieldAlt, FaUser, FaPhoneAlt, FaIdCard, FaHome, 
  FaSearchLocation, FaUserTie, FaBirthdayCake, FaVenusMars, FaCamera, FaTrash, FaVideo,
  FaExclamationTriangle, FaChevronDown, FaPlus, FaMinus, FaBroadcastTower
} from "react-icons/fa";

const ENDPOINT = "http://localhost:5000";

// --- HELPER: HAVERSINE FORMULA (Distance Calculation) ---
// Note: This calculates "As the crow flies" (Straight line distance), not driving distance.
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); 
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d.toFixed(1); // Return 1 decimal place (e.g. 2.5 km)
};

const deg2rad = (deg) => {
  return deg * (Math.PI/180)
};

// --- CUSTOM ANIMATED SELECT COMPONENT ---
const AnimatedSelect = ({ label, options, value, onChange, name, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center bg-slate-800 rounded-xl border ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-slate-700'} cursor-pointer p-3 transition-all hover:border-blue-400`}
      >
        <div className="pl-2 text-slate-500 text-sm">{icon}</div>
        <div className={`flex-1 ml-3 text-sm font-bold truncate ${value ? 'text-blue-100' : 'text-slate-400'}`}>
          {value || label}
        </div>
        <FaChevronDown className={`text-slate-500 text-xs transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180 text-blue-400" : ""}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} 
            className="absolute z-50 mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-slate-600 rounded-2xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar overflow-hidden"
          >
            {options.map((opt, idx) => (
              <li 
                key={idx} 
                onClick={() => handleSelect(opt)}
                className={`px-4 py-3 text-sm cursor-pointer border-b border-slate-800 last:border-none transition-all flex justify-between items-center
                    ${value === opt ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <span>{opt}</span>
                {value === opt && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_cyan]"></div>}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- CUSTOM NUMBER INPUT (AGE) ---
const AgeInput = ({ value, onChange, name }) => {
  const handleIncrement = () => onChange({ target: { name, value: Number(value) + 1 } });
  const handleDecrement = () => {
    if (value > 0) onChange({ target: { name, value: Number(value) - 1 } });
  };

  return (
    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 overflow-hidden w-full focus-within:border-blue-500 transition-all">
      <div className="pl-3 text-slate-500 text-xs"><FaBirthdayCake /></div>
      <button type="button" onClick={handleDecrement} className="p-3 text-slate-400 hover:text-white bg-slate-700/30 hover:bg-slate-700 transition-colors">
        <FaMinus size={10} />
      </button>
      <input 
        type="number" 
        name={name} 
        value={value} 
        onChange={(e) => onChange(e)} 
        className="w-full bg-transparent text-center text-blue-200 font-bold font-mono text-sm outline-none appearance-none m-0"
        placeholder="0" 
      />
      <button type="button" onClick={handleIncrement} className="p-3 text-slate-400 hover:text-white bg-slate-700/30 hover:bg-slate-700 transition-colors">
        <FaPlus size={10} />
      </button>
    </div>
  );
};

const ReportCrime = ({ onSuccess, onCancel, userName }) => {
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Files
  const [proofFiles, setProofFiles] = useState([]); 
  const [proofPreviews, setProofPreviews] = useState([]);
  const [victimIdFile, setVictimIdFile] = useState(null);
  const [victimIdPreview, setVictimIdPreview] = useState(null);
  const [suspectIdFile, setSuspectIdFile] = useState(null);
  const [suspectIdPreview, setSuspectIdPreview] = useState(null);

  // Stations Logic
  const [stationOptions, setStationOptions] = useState([]); 
  const [loadingStations, setLoadingStations] = useState(true);

  const loggedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const getCurrentDateTime = () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      return now.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    victimTitle: loggedUser?.title || "Mr.", 
    victimName: loggedUser?.name || userName || "", 
    victimAge: loggedUser?.age || 0, 
    victimGender: loggedUser?.gender || "", 
    victimContact: loggedUser?.mobile || "", 
    victimAadhar: loggedUser?.aadhar || "", 
    victimAddress: loggedUser?.address || "",
    crimeType: "", description: "", dateOfIncident: getCurrentDateTime(), 
    selectedStation: "", incidentLocationAddress: "",
    suspectTitle: "Mr.", suspectName: "", suspectAge: 0, suspectGender: "", 
    suspectContact: "", suspectAddress: "", suspectAadhar: ""
  });

  const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
  const genders = ["Male", "Female", "Transgender", "Other"];

  // ✅ SMART STATION FETCHING & SORTING LOGIC (Fixed Distance)
  useEffect(() => {
    const initStations = async () => {
        try {
            // 1. Fetch Stations
            const { data } = await axios.get(`${ENDPOINT}/api/metadata/all`);
            const rawStations = data.stations || [];

            if (rawStations.length === 0) {
                toast.error("No stations available");
                setLoadingStations(false);
                return;
            }

            // 2. Try getting User Location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        
                        // 3. Calculate distance (Converted to Float for safety)
                        const stationsWithDist = rawStations.map(st => {
                            let dist = 9999;
                            // Ensure Lat/Lng exist and are valid numbers
                            if (st.location && st.location.lat && st.location.lng) {
                                dist = parseFloat(
                                    calculateDistance(
                                        latitude, 
                                        longitude, 
                                        parseFloat(st.location.lat), 
                                        parseFloat(st.location.lng)
                                    )
                                );
                            }
                            return { ...st, distance: dist };
                        });

                        // 4. Sort: Nearest First
                        stationsWithDist.sort((a, b) => a.distance - b.distance);

                        // 5. Create formatted strings for Dropdown
                        const formattedOptions = stationsWithDist.map(st => 
                            st.distance < 9000 
                            ? `${st.name} (📍 ${st.distance} km)` 
                            : st.name
                        );

                        setStationOptions(formattedOptions);

                        // 6. Auto-Select Nearest Station (Silently)
                        if (formattedOptions.length > 0) {
                            setFormData(prev => ({ ...prev, selectedStation: formattedOptions[0] }));
                            // ❌ Removed toast message as requested
                        }
                    },
                    (error) => {
                        console.warn("GPS Access Denied, loading default list.");
                        setStationOptions(rawStations.map(s => s.name));
                    }
                );
            } else {
                setStationOptions(rawStations.map(s => s.name));
            }
        } catch (error) {
            console.error("Station Init Error:", error);
            toast.error("Failed to load stations");
        } finally {
            setLoadingStations(false);
        }
    };

    initStations();
  }, []);

  // ... (Rest of the component remains EXACTLY same) ...
  // Keeping the rest of the code as it was because it handles form logic perfectly.
  
  useEffect(() => {
    return () => {
      if (victimIdPreview) URL.revokeObjectURL(victimIdPreview);
      if (suspectIdPreview) URL.revokeObjectURL(suspectIdPreview);
      proofPreviews.forEach(obj => URL.revokeObjectURL(obj.url));
    };
  }, [victimIdPreview, suspectIdPreview, proofPreviews]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleVictimIdChange = (e) => {
    const file = e.target.files[0];
    if (file) { setVictimIdFile(file); setVictimIdPreview(URL.createObjectURL(file)); }
  };

  const handleSuspectIdChange = (e) => {
    const file = e.target.files[0];
    if (file) { setSuspectIdFile(file); setSuspectIdPreview(URL.createObjectURL(file)); }
  };

  const handleProofChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setProofFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(file => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video') ? 'video' : 'image',
        name: file.name
      }));
      setProofPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeProof = (index) => {
    setProofFiles(prev => prev.filter((_, i) => i !== index));
    setProofPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].url);
      return newPreviews.filter((_, i) => i !== index);
    });
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) { toast.error("Geolocation is not supported."); return; }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setFormData((prev) => ({ ...prev, incidentLocationAddress: mapLink }));
        toast.success("GPS Location Captured!");
        setLocationLoading(false);
      },
      () => { toast.error("Location access denied."); setLocationLoading(false); }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfirmed) { toast.error("Agree to the legal declaration."); return; }
    if(!formData.crimeType || !formData.dateOfIncident || !formData.description || !formData.selectedStation || !formData.incidentLocationAddress) {
       toast.error("Fill all required fields."); return;
    }

    setLoading(true);
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const data = new FormData();
        if (userInfo?._id) data.append("userId", userInfo._id); 

        // ✅ CLEAN STATION NAME (Remove " (📍 1.2 km)" before sending to backend)
        const cleanStationName = formData.selectedStation.split(' (')[0];

        Object.keys(formData).forEach(key => {
            if (key === "selectedStation") {
                data.append(key, cleanStationName);
            } else if (key.startsWith('suspect') && formData[key] === "") {
                data.append(key, "N/A");
            } else {
                data.append(key, formData[key]);
            }
        });
        
        data.append("isAnonymous", anonymous);
        data.append("reporterName", anonymous ? "Hidden Identity" : userInfo?.name);
        
        if (victimIdFile) data.append("victimIdPhoto", victimIdFile);
        if (suspectIdFile) data.append("suspectIdPhoto", suspectIdFile);
        proofFiles.forEach(file => data.append("incidentProof", file));

        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const response = await axios.post(`${ENDPOINT}/api/crime/report`, data, config);

        toast.success("Report Submitted Successfully!");
        setSuccessId(response.data._id);
    } catch (error) {
        toast.error(error.response?.data?.message || "Submission failed.");
    } finally {
        setLoading(false);
    }
  };

  if (successId) {
    return (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-green-500/50 p-6 md:p-10 rounded-3xl text-center max-w-2xl mx-auto mt-6 md:mt-10 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-3xl md:text-5xl text-green-400">
                <FaCheckCircle />
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">Report Filed!</h2>
            <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-lg">Your incident has been securely recorded.</p>
            <div className="bg-black/40 p-4 md:p-6 rounded-2xl border border-green-500/30 inline-block w-full md:min-w-[320px]">
                <p className="text-[10px] text-green-400 uppercase font-bold tracking-widest mb-1">Complaint Reference ID</p>
                <code className="text-lg md:text-2xl font-mono text-white font-bold tracking-widest break-all">
                    {successId}
                </code>
            </div>
            <div className="mt-8 md:mt-10">
                 <button onClick={onCancel} className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-xl font-bold transition-all shadow-lg">Return to Dashboard</button>
            </div>
        </motion.div>
    );
  }

  const inputStyle = "w-full bg-transparent p-2 md:p-3 text-blue-100 outline-none text-sm md:text-base font-bold font-mono tracking-wide placeholder-slate-600";
  const labelStyle = "text-[10px] text-slate-400 font-extrabold uppercase ml-1 tracking-wider";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto pb-10 md:pb-20 font-sans text-slate-200">
      
      {/* HEADER */}
      <div className="bg-slate-800/80 backdrop-blur-md p-5 md:p-8 rounded-t-2xl md:rounded-t-3xl border-b border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-2 md:gap-3 tracking-tight">
                <FaFileAlt className="text-blue-500"/> File New Report
              </h2>
              <p className="text-slate-400 text-[10px] md:text-sm mt-1 font-medium">Official Portal • <span className="text-red-400 font-bold">* Required</span></p>
          </div>
          
          <div 
            onClick={() => setAnonymous(!anonymous)}
            className={`relative z-10 cursor-pointer px-4 py-2 md:px-6 md:py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 md:gap-3 select-none shadow-lg ${anonymous ? "bg-amber-500/10 border-amber-500 text-amber-400" : "bg-slate-700/50 border-slate-600 text-slate-300"}`}
          >
              <div className={`w-4 h-4 md:w-5 md:h-5 border-2 rounded-full flex items-center justify-center transition-colors ${anonymous ? "border-amber-400 bg-amber-400" : "border-slate-400"}`}>
                  {anonymous && <FaCheckCircle className="text-black text-[8px] md:text-[10px]" />}
              </div>
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-wide flex items-center gap-1.5"><FaUserSecret /> Anonymous</span>
          </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 border-t-0 rounded-b-2xl md:rounded-b-3xl p-4 md:p-10 shadow-2xl space-y-8 md:space-y-12">
        
        {/* SECTION 1: VICTIM */}
        <div className="space-y-4 md:space-y-6 relative group">
            <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-60"></div>
            <h3 className="text-blue-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                <span className="bg-blue-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center shadow-inner">1</span> Victim Info
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelStyle}>Victim Name <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                        <div className="w-24">
                           <AnimatedSelect options={titles} value={formData.victimTitle} onChange={handleChange} name="victimTitle" label="Title" icon={<FaUserTie size={10}/>} />
                        </div>
                        <div className="flex-1 flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 overflow-hidden transition-all">
                            <div className="pl-3 text-slate-500 text-xs md:text-base"><FaUser /></div>
                            <input name="victimName" value={formData.victimName} onChange={handleChange} className={inputStyle} placeholder="Full Name" required />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Age <span className="text-red-500">*</span></label>
                        <AgeInput name="victimAge" value={formData.victimAge} onChange={handleChange} />
                    </div>
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Gender <span className="text-red-500">*</span></label>
                        <AnimatedSelect options={genders} value={formData.victimGender} onChange={handleChange} name="victimGender" label="Select" icon={<FaVenusMars />} />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelStyle}>Contact <span className="text-red-500">*</span></label>
                    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-all">
                        <div className="pl-3 text-slate-500 text-xs"><FaPhoneAlt /></div>
                        <input name="victimContact" type="tel" maxLength="10" value={formData.victimContact} onChange={handleChange} className={inputStyle} placeholder="Mobile No." required />
                    </div>
                </div>
                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelStyle}>Aadhaar <span className="text-red-500">*</span></label>
                    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-all">
                        <div className="pl-3 text-slate-500 text-xs"><FaIdCard /></div>
                        <input name="victimAadhar" type="text" maxLength="12" value={formData.victimAadhar} onChange={handleChange} className={inputStyle} placeholder="UID Number" required />
                    </div>
                </div>

                <div className="md:col-span-4 space-y-1.5">
                    <label className={labelStyle}>Residential Address</label>
                    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-all">
                        <div className="pl-3 text-slate-500 text-xs"><FaHome /></div>
                        <input name="victimAddress" value={formData.victimAddress} onChange={handleChange} className={inputStyle} placeholder="Enter Full Address" required />
                    </div>
                </div>

                <div className="md:col-span-4 space-y-3">
                    <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-dashed border-slate-600 hover:border-blue-500 transition-all">
                        <label className="w-full md:w-auto cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-bold shadow-lg transition-all transform hover:scale-105">
                            <FaCamera /> {victimIdFile ? "Change Photo" : "Upload Identity Photo"}
                            <input type="file" accept="image/*" onChange={handleVictimIdChange} className="hidden" />
                        </label>
                        {victimIdPreview && <img src={victimIdPreview} className="h-20 w-32 object-cover rounded-xl border-2 border-blue-500 shadow-md" alt="Preview" />}
                    </div>
                </div>
            </div>
        </div>

        {/* SECTION 2: INCIDENT */}
        <div className="space-y-4 md:space-y-6 relative group">
            <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-transparent rounded-full opacity-60"></div>
            <h3 className="text-amber-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                <span className="bg-amber-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center shadow-inner">2</span> Incident Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                    <label className={labelStyle}>Crime Category <span className="text-red-500">*</span></label>
                    <AnimatedSelect options={crimeTypes} value={formData.crimeType} onChange={handleChange} name="crimeType" label="Select Crime Type" icon={<FaShieldAlt />} />
                </div>
                <div className="space-y-1.5">
                    <label className={labelStyle}>Date & Time <span className="text-red-500">*</span></label>
                    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-amber-500 transition-all">
                        <div className="pl-3 text-slate-500 text-xs"><FaCalendarAlt /></div>
                        <input name="dateOfIncident" type="datetime-local" value={formData.dateOfIncident} onChange={handleChange} className={inputStyle} required />
                    </div>
                </div>
                
                {/* ✅ SMART POLICE STATION SELECTOR */}
                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelStyle}>Police Station <span className="text-red-500">*</span></label>
                    <AnimatedSelect 
                        options={stationOptions}
                        value={formData.selectedStation}
                        onChange={handleChange}
                        name="selectedStation"
                        label={loadingStations ? "Detecting nearest station..." : "Choose Police Station"}
                        icon={<FaBroadcastTower />} // New Icon
                    />
                    {/* Helper text showing what happened */}
                    {!loadingStations && formData.selectedStation.includes("km") && (
                        <p className="text-[10px] text-green-400 font-bold ml-2 animate-pulse">
                            ● Auto-detected nearest station based on your GPS
                        </p>
                    )}
                </div>

                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelStyle}>Incident Location <span className="text-red-500">*</span></label>
                    <div className="flex flex-col md:flex-row gap-2">
                         <div className="flex-1 flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-amber-500 transition-all">
                            <div className="pl-3 text-slate-500 text-xs"><FaMapMarkerAlt /></div>
                            <input name="incidentLocationAddress" value={formData.incidentLocationAddress} onChange={handleChange} className={inputStyle} placeholder="Paste Map Link or Type Address" required />
                        </div>
                        <button type="button" onClick={handleDetectLocation} disabled={locationLoading} className="w-full md:w-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all text-white">
                           {locationLoading ? "Detecting..." : <><FaSearchLocation /> Detect GPS</>}
                        </button>
                    </div>
                </div>
                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelStyle}>Description <span className="text-red-500">*</span></label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the incident in detail..." rows="4" className={`${inputStyle} rounded-xl border border-slate-700 focus:border-amber-500 h-auto resize-none`} required></textarea>
                </div>
            </div>
        </div>

        {/* SECTION 3: SUSPECT */}
        <div className="space-y-4 md:space-y-6 relative group">
            <div className="absolute left-[-10px] top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-transparent rounded-full opacity-60"></div>
            <h3 className="text-red-400 text-[10px] md:text-sm font-bold uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                <span className="bg-red-500/20 w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center shadow-inner">3</span> Suspect Info
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelStyle}>Suspect Name</label>
                    <div className="flex gap-2">
                        <div className="w-24">
                           <AnimatedSelect options={titles} value={formData.suspectTitle} onChange={handleChange} name="suspectTitle" label="Title" icon={<FaUserTie size={10}/>} />
                        </div>
                        <div className="flex-1 flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-red-500 overflow-hidden transition-all">
                             <div className="pl-3 text-slate-500 text-xs"><FaUserTie /></div>
                             <input name="suspectName" value={formData.suspectName} onChange={handleChange} className={inputStyle} placeholder="Name (if known)" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Est. Age</label>
                         <AgeInput name="suspectAge" value={formData.suspectAge} onChange={handleChange} />
                    </div>
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Gender</label>
                        <AnimatedSelect options={genders} value={formData.suspectGender} onChange={handleChange} name="suspectGender" label="Unknown" icon={<FaVenusMars />} />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelStyle}>Suspect Contact</label>
                    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-red-500 transition-all">
                        <div className="pl-3 text-slate-500 text-xs"><FaPhoneAlt /></div>
                        <input name="suspectContact" type="tel" maxLength="10" value={formData.suspectContact} onChange={handleChange} className={inputStyle} placeholder="Mobile (Optional)" />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                    <label className={labelStyle}>Suspect Aadhaar</label>
                    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-red-500 transition-all">
                        <div className="pl-3 text-slate-500 text-xs"><FaIdCard /></div>
                        <input name="suspectAadhar" type="text" maxLength="12" value={formData.suspectAadhar} onChange={handleChange} className={inputStyle} placeholder="UID (Optional)" />
                    </div>
                </div>

                <div className="md:col-span-4 space-y-1.5">
                    <label className={labelStyle}>Suspect Residential Address</label>
                    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-red-500 transition-all">
                        <div className="pl-3 text-slate-500 text-xs"><FaHome /></div>
                        <input name="suspectAddress" value={formData.suspectAddress} onChange={handleChange} className={inputStyle} placeholder="Known Address" />
                    </div>
                </div>

                <div className="md:col-span-4 space-y-3">
                    <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-dashed border-slate-600 hover:border-red-500 transition-all">
                        <label className="w-full md:w-auto cursor-pointer bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-bold shadow-lg transition-all transform hover:scale-105">
                            <FaCamera /> {suspectIdFile ? "Change Photo" : "Upload Identity Photo"}
                            <input type="file" accept="image/*" onChange={handleSuspectIdChange} className="hidden" />
                        </label>
                        {suspectIdPreview && <img src={suspectIdPreview} className="h-20 w-32 object-cover rounded-xl border-2 border-red-500 shadow-md" alt="Suspect Preview" />}
                    </div>
                </div>
            </div>
        </div>

        {/* SECTION 4: PROOF */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-slate-200 text-[10px] md:text-sm font-bold uppercase tracking-widest pb-2 flex items-center gap-2">
                <FaVideo className="text-purple-400"/> 4. Proof of Incident
            </h3>
            <div className="border-2 border-dashed border-slate-600 rounded-2xl p-6 md:p-8 text-center hover:bg-purple-900/10 hover:border-purple-500 transition-all bg-slate-800/30 relative cursor-pointer group">
                <input type="file" multiple accept="image/*,video/*" onChange={handleProofChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="text-slate-400 flex flex-col items-center group-hover:scale-105 transition-transform">
                    <FaImages className="text-2xl md:text-4xl mb-2 text-purple-400" />
                    <p className="font-bold text-sm md:text-lg text-white">Tap to Upload Media</p>
                    <p className="text-[9px] text-slate-500 mt-1">JPG, PNG, MP4, MOV</p>
                </div>
            </div>
            {proofPreviews.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-4">
                {proofPreviews.map((fileObj, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-700 bg-black aspect-square shadow-lg">
                    {fileObj.type === 'video' ? <div className="w-full h-full flex items-center justify-center bg-gray-900"><FaVideo className="text-xl text-slate-600" /></div> : <img src={fileObj.url} alt="Evidence" className="w-full h-full object-cover" />}
                    <button type="button" onClick={() => removeProof(idx)} className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-full shadow-md"><FaTrash size={10} /></button>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* LEGAL CONFIRMATION */}
        <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-2xl flex items-start gap-4">
            <input 
                type="checkbox" 
                id="legalConfirm"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-600 text-red-600 focus:ring-red-500 cursor-pointer accent-red-500"
            />
            <label htmlFor="legalConfirm" className="text-sm text-slate-300 cursor-pointer select-none leading-relaxed">
                <span className="text-red-400 font-bold flex items-center gap-2 mb-1"><FaExclamationTriangle /> Legal Declaration</span>
              I solemnly affirm that the information furnished in this online complaint, along with supporting documents and photographs, is true and accurate. I am aware that submission of false information is an offence punishable under applicable laws.
            </label>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-slate-800">
            <button type="button" onClick={onCancel} className="order-2 md:order-1 flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-slate-300 text-xs md:text-sm transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="order-1 md:order-2 flex-[2] py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-xl font-bold text-white text-xs md:text-base shadow-xl transition-all transform hover:scale-[1.01]">
                {loading ? "Processing..." : "Submit Official Complaint"}
            </button>
        </div>

      </form>
    </motion.div>
  );
};

export default ReportCrime;