

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { 
//   FaGavel, FaFileAlt, FaUser, FaClock, 
//   FaSave, FaTimes, FaPlus, FaTrash, FaCamera, 
//   FaMapMarkerAlt, FaCalendarAlt, FaShieldAlt, FaLink, 
//   FaUserInjured, FaUserSecret, FaUsers, FaVideo
// } from "react-icons/fa";
// import { ipcSections, policeStations, ncrOffenses } from "../../data/mockData";

// // --- ANIMATION VARIANTS ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { 
//     opacity: 1,
//     transition: { staggerChildren: 0.1 }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// };

// // ✅ REUSABLE INPUT GROUP
// const InputGroup = ({ label, icon, children, required, glowColor = "blue" }) => (
//     <div className="relative group">
//         <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 transition-colors duration-300 group-focus-within:text-${glowColor}-400 text-slate-400`}>
//             {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         <div className={`relative flex items-center bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 
//             group-focus-within:border-${glowColor}-500 group-focus-within:ring-1 group-focus-within:ring-${glowColor}-500/50 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)]`}>
//             {icon && <div className={`pl-3 text-slate-500 group-focus-within:text-${glowColor}-400 transition-colors`}>{icon}</div>}
//             {children}
//         </div>
//     </div>
// );

// // ✅ PERSON FORM SECTION
// const PersonFormSection = ({ title, icon, data, onChange, colorClass, borderColor, isAccused }) => {
//     const baseColor = colorClass.split('-')[1];
//     return (
//         <motion.div 
//             variants={itemVariants}
//             whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.2)" }}
//             className={`p-6 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-md mb-6 shadow-lg relative overflow-hidden group`}
//         >
//             <div className={`absolute top-0 right-0 w-32 h-32 bg-${baseColor}-500/10 blur-[50px] rounded-full -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-80`}></div>
//             <h3 className={`${colorClass} text-sm font-bold uppercase mb-6 flex items-center gap-3 border-b border-slate-700/50 pb-3`}>
//                 <span className={`p-2 rounded-lg bg-${baseColor}-500/20`}>{icon}</span> {title} Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
//                 <InputGroup label="Full Name" required glowColor={baseColor}>
//                     <input name="fullName" value={data.fullName} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="Full Legal Name" />
//                 </InputGroup>
//                 <InputGroup label="Guardian (Father/Husband)" glowColor={baseColor}>
//                     <input name="guardianName" value={data.guardianName} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="S/O, D/O, W/O" />
//                 </InputGroup>
//                 <InputGroup label="Age" glowColor={baseColor}>
//                     <input name="age" type="number" value={data.age} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="Years" />
//                 </InputGroup>
//                 <InputGroup label="Gender *" glowColor={baseColor}>
//                     <select name="gender" value={data.gender} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none [&>option]:bg-slate-900">
//                         <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
//                     </select>
//                 </InputGroup>
//                 <InputGroup label="Mobile Number" glowColor={baseColor}>
//                     <input name="mobile" value={data.mobile} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="10 Digit" />
//                 </InputGroup>
//                 <InputGroup label="Email ID" glowColor={baseColor}>
//                     <input name="email" value={data.email} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="Optional" />
//                 </InputGroup>
//                 <div className="md:col-span-3">
//                     <InputGroup label="Full Address" glowColor={baseColor}>
//                         <input name="address" value={data.address} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="House No, Area, City, District, Pincode" />
//                     </InputGroup>
//                 </div>
//                 <InputGroup label="ID Proof Type" glowColor={baseColor}>
//                     <select name="idProofType" value={data.idProofType} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none [&>option]:bg-slate-900">
//                         <option>Aadhar Card</option><option>PAN Card</option><option>Voter ID</option><option>Driving License</option>
//                     </select>
//                 </InputGroup>
//                 <InputGroup label="ID Number *" glowColor={baseColor}>
//                     <input name="idProofNumber" value={data.idProofNumber} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600 font-mono tracking-wide" placeholder="XXXX-XXXX-XXXX" />
//                 </InputGroup>
//                 {isAccused && (
//                     <InputGroup label="Relation with Complainant" glowColor={baseColor}>
//                         <select name="relation" value={data.relation} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none [&>option]:bg-slate-900">
//                             <option>Unknown</option><option>Neighbor</option><option>Relative</option><option>Stranger</option><option>Colleague</option>
//                         </select>
//                     </InputGroup>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// const FileFIR = ({ onCancel, prefillId }) => {
//   const [loading, setLoading] = useState(false);
//   const [recordType, setRecordType] = useState("FIR");
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   const isSenior = userInfo.role === 'senior' || userInfo.designation === 'DGP';

//   const [actsList, setActsList] = useState([{ actName: "IPC", section: "" }]);
  
//   // ✅ New State for Existing Evidence (URLs)
//   const [existingEvidence, setExistingEvidence] = useState([]); 
//   // ✅ New State for NEW Files to Upload
//   const [newFiles, setNewFiles] = useState([]);

//   // Empty Template
//   const emptyPerson = { fullName: "", guardianName: "", age: "", gender: "", mobile: "", email: "", address: "", idProofType: "Aadhar", idProofNumber: "" };

//   const [formData, setFormData] = useState({
//     district: "Chandrapur (Maharashtra)",
//     policeStation: userInfo.station || "",
//     year: new Date().getFullYear().toString(),
//     onlineComplaintId: prefillId || "", 
//     generalDiaryReference: "",
//     occurrenceDate: "", occurrenceTime: "", incidentPlace: "",
//     distanceFromPS: "", directionFromPS: "", beatNo: "", 
//     complainant: { ...emptyPerson },
//     victim: { ...emptyPerson },
//     accused: { ...emptyPerson, relation: "Unknown", details: "" },
//     briefDescription: "", stolenPropertyParticulars: "", totalValue: "", articleType: "",
//     incidentType: "", 
//     hasWitness: "No", witnessName: "", witnessContact: "",
//     previousComplaintExists: "No", previousComplaintNumber: "",
//     declaration: false,
//     investigatingOfficer: `${userInfo.designation} ${userInfo.name}` 
//   });

//   // ✅ AUTO-FILL LOGIC (Includes Evidence Fetching)
//   useEffect(() => {
//     const fetchComplaint = async () => {
//         if(!formData.onlineComplaintId) return;
//         try {
//             const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//             const { data } = await axios.get(`https://crimetrack-api.onrender.com/api/crime/track/${formData.onlineComplaintId}`, config);
            
//             // ✅ Combine Evidence and IncidentProof from Citizen Report
//             const allEvidence = [...(data.evidence || []), ...(data.incidentProof || [])];
//             setExistingEvidence(allEvidence); // Store URLs

//             setFormData(prev => ({
//                 ...prev,
//                 policeStation: data.selectedStation || prev.policeStation,
//                 occurrenceDate: data.dateOfIncident ? data.dateOfIncident.slice(0, 10) : "",
//                 occurrenceTime: data.dateOfIncident ? new Date(data.dateOfIncident).toTimeString().slice(0, 5) : "",
//                 briefDescription: data.description || "",
//                 incidentPlace: data.victimAddress || "", 
//                 complainant: { ...prev.complainant, fullName: data.reporterName || "", mobile: data.victimContact || "", address: data.victimAddress || "" },
//                 victim: { ...prev.victim, fullName: data.victimName || "", gender: data.victimGender || "", mobile: data.victimContact || "", address: data.victimAddress || "", idProofNumber: data.victimAadhar || "" },
//                 accused: { ...prev.accused, fullName: data.suspectName !== "Unknown" ? data.suspectName : "", mobile: data.suspectContact !== "N/A" ? data.suspectContact : "", address: data.suspectAddress !== "N/A" ? data.suspectAddress : "" }
//             }));
//             toast.success("Citizen details & evidence fetched!");
//         } catch (error) { console.log("Manual Mode"); }
//     };
//     fetchComplaint();
//   }, [formData.onlineComplaintId]);

//   const handlePersonChange = (type, e) => {
//       setFormData({
//           ...formData,
//           [type]: { ...formData[type], [e.target.name]: e.target.value }
//       });
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleActChange = (index, field, value) => {
//       const newActs = [...actsList];
//       newActs[index][field] = value;
//       setActsList(newActs);
//   };
//   const addAct = () => setActsList([...actsList, { actName: "IPC", section: "" }]);
//   const removeAct = (index) => setActsList(actsList.filter((_, i) => i !== index));
  
//   // ✅ Handle New File Selection
//   const handleFileChange = (e) => {
//       setNewFiles(Array.from(e.target.files));
//   };

//   // ✅ Remove Existing Evidence (Only from UI list, real removal happens on Submit)
//   const removeExistingEvidence = (index) => {
//       setExistingEvidence(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(!formData.policeStation) return toast.error("Police Station is required!");
    
//     setLoading(true);
//     try {
//         const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
//         const data = new FormData();
        
//         data.append('recordType', recordType);
//         data.append('complaintId', formData.onlineComplaintId);
//         data.append('acts', recordType === 'FIR' ? JSON.stringify(actsList) : JSON.stringify([]));
        
//         // Append Existing Evidence (Stringified Array)
//         data.append('existingEvidence', JSON.stringify(existingEvidence));

//         const flatFields = ['district', 'policeStation', 'year', 'onlineComplaintId', 'generalDiaryReference', 
//             'occurrenceDate', 'occurrenceTime', 'incidentPlace', 'distanceFromPS', 'directionFromPS', 'beatNo',
//             'briefDescription', 'stolenPropertyParticulars', 'totalValue', 'articleType', 'incidentType', 
//             'hasWitness', 'witnessName', 'witnessContact', 'previousComplaintExists', 'previousComplaintNumber',
//             'declaration', 'investigatingOfficer'];

//         flatFields.forEach(field => data.append(field, formData[field]));

//         Object.keys(formData.complainant).forEach(k => data.append(`complainant[${k}]`, formData.complainant[k]));
//         Object.keys(formData.victim).forEach(k => data.append(`victim[${k}]`, formData.victim[k]));
//         Object.keys(formData.accused).forEach(k => data.append(`accused[${k}]`, formData.accused[k]));

//         data.append('victimAadhar', formData.victim.idProofNumber); 

//         // Append NEW Files
//         for (let i = 0; i < newFiles.length; i++) data.append('policeEvidence', newFiles[i]);

//         const response = await axios.post("https://crimetrack-api.onrender.com/api/crime/file-record", data, config);
//         toast.success(`${recordType} Filed: ${response.data.recordNumber}`);
//         if (onCancel) onCancel(); 
//     } catch (error) { 
//         console.error(error);
//         toast.error(error.response?.data?.message || "Failed."); 
//     } 
//     finally { setLoading(false); }
//   };

//   const inputClass = "w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600";

//   return (
//     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto bg-[#0f172a] border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden my-4 font-sans relative">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 z-50"></div>
//         <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
//         <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
//             <div>
//                 <motion.h2 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 flex items-center gap-3">
//                     <FaGavel className="text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" /> 
//                     {recordType === "NCR" ? "NON-COGNIZABLE REPORT" : "FIRST INFORMATION REPORT"}
//                 </motion.h2>
//                 <div className="flex items-center gap-3 mt-2">
//                     <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 font-mono tracking-widest">OFFICIAL RECORD</span>
//                     <p className="text-slate-400 text-xs flex items-center gap-1"><FaShieldAlt className="text-slate-600"/> Station: <span className="text-white font-bold">{formData.policeStation || "Select Below"}</span></p>
//                 </div>
//             </div>
//             <div className="bg-black/40 p-1.5 rounded-xl border border-slate-700 flex relative mt-4 md:mt-0 shadow-inner">
//                 <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className={`absolute top-1.5 bottom-1.5 rounded-lg bg-gradient-to-r ${recordType === "FIR" ? 'from-red-600 to-red-500 left-1.5 w-[88px]' : 'from-blue-600 to-blue-500 left-[102px] w-[90px]'}`} />
//                 <button onClick={() => setRecordType("FIR")} className={`relative z-10 px-6 py-2 rounded-lg font-bold text-xs tracking-wider transition-colors ${recordType === "FIR" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>F.I.R.</button>
//                 <button onClick={() => setRecordType("NCR")} className={`relative z-10 px-6 py-2 rounded-lg font-bold text-xs tracking-wider transition-colors ${recordType === "NCR" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>N.C.R.</button>
//             </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 relative z-10">
//             <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            
//                 {/* 1. LINKING & STATION */}
//                 <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <InputGroup label="Link Complaint ID" required icon={<FaLink />} glowColor="yellow">
//                         <input name="onlineComplaintId" value={formData.onlineComplaintId} onChange={handleChange} placeholder="Enter ID" className={`${inputClass} text-yellow-400 font-mono tracking-wider`} />
//                     </InputGroup>
//                     <InputGroup label="District" icon={<FaMapMarkerAlt />}>
//                         <input value={formData.district} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
//                     </InputGroup>
//                     <InputGroup label="Police Station" required icon={<FaShieldAlt />} glowColor="purple">
//                         {isSenior ? (
//                             <select name="policeStation" onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900 cursor-pointer`}>
//                                 <option value="">Select Station</option>
//                                 {policeStations.map(st => <option key={st} value={st}>{st}</option>)}
//                             </select>
//                         ) : (
//                             <input name="policeStation" value={formData.policeStation} disabled className={`${inputClass} opacity-50`} />
//                         )}
//                     </InputGroup>
//                 </motion.div>

//                 {/* 2. DATE & LOCATION */}
//                 <motion.div variants={itemVariants} className="p-1 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 shadow-lg">
//                     <div className="bg-[#0f172a] rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
//                         <div className="md:col-span-4 border-b border-slate-800 pb-2 mb-2"><h3 className="text-orange-400 text-sm font-bold uppercase flex items-center gap-2 tracking-wide"><FaClock /> Occurrence & Location</h3></div>
//                         <InputGroup label="Date *" glowColor="orange"><input name="occurrenceDate" type="date" value={formData.occurrenceDate} onChange={handleChange} className={`${inputClass} cursor-pointer`} required /></InputGroup>
//                         <InputGroup label="Time *" glowColor="orange"><input name="occurrenceTime" type="time" value={formData.occurrenceTime} onChange={handleChange} className={`${inputClass} cursor-pointer`} required /></InputGroup>
//                         <InputGroup label="Direction"><select name="directionFromPS" onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900`}><option value="">Select</option><option>North</option><option>South</option><option>East</option><option>West</option></select></InputGroup>
//                         <InputGroup label="Distance"><select name="distanceFromPS" onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900`}><option value="">Select</option><option>1 KM</option><option>5 KM</option><option>10+ KM</option></select></InputGroup>
//                         <div className="md:col-span-4"><InputGroup label="Incident Address *" required glowColor="orange"><input name="incidentPlace" value={formData.incidentPlace} onChange={handleChange} className={inputClass} required /></InputGroup></div>
//                     </div>
//                 </motion.div>

//                 {/* 3. PEOPLE FORMS */}
//                 <PersonFormSection title="Complainant" icon={<FaUser />} colorClass="text-purple-400" borderColor="purple" data={formData.complainant} onChange={(e) => handlePersonChange('complainant', e)} />
//                 <PersonFormSection title="Victim" icon={<FaUserInjured />} colorClass="text-pink-400" borderColor="pink" data={formData.victim} onChange={(e) => handlePersonChange('victim', e)} />
//                 <PersonFormSection title="Accused" icon={<FaUserSecret />} colorClass="text-red-400" borderColor="red" data={formData.accused} onChange={(e) => handlePersonChange('accused', e)} isAccused={true} />

//                 {/* 4. ACTS / OFFENCE */}
//                 <AnimatePresence mode="wait">
//                     {recordType === "FIR" ? (
//                         <motion.div key="FIR_ACTS" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl border border-dashed border-red-500/40 bg-red-900/5 mb-6 relative overflow-hidden">
//                             <div className="flex justify-between items-center mb-4 relative z-10">
//                                 <h3 className="text-red-400 text-sm font-bold uppercase flex items-center gap-2"><FaShieldAlt /> Acts & Sections <span className="text-red-500">*</span></h3>
//                                 <button type="button" onClick={addAct} className="text-[10px] bg-red-900/50 hover:bg-red-800 border border-red-500/50 text-red-200 px-4 py-1.5 rounded-full transition-all flex items-center gap-1"><FaPlus /> Add Act</button>
//                             </div>
//                             {actsList.map((act, i) => (
//                                 <div key={i} className="flex gap-3 mb-3">
//                                     <div className="w-1/3"><InputGroup label="Act Name" glowColor="red"><input value={act.actName} disabled className="w-full bg-transparent text-white text-sm p-3 font-bold text-center"/></InputGroup></div>
//                                     <div className="w-2/3 flex gap-2">
//                                         <div className="flex-1"><InputGroup label="Section" glowColor="red"><select value={act.section} onChange={(e) => handleActChange(i, 'section', e.target.value)} className="w-full bg-transparent text-white text-sm p-3 [&>option]:bg-slate-900"><option value="">Select Section</option>{ipcSections.map(s => <option key={s} value={s}>{s}</option>)}</select></InputGroup></div>
//                                         {i > 0 && <button type="button" onClick={() => removeAct(i)} className="px-3 rounded-lg bg-red-900/20 text-red-400 hover:bg-red-900/50 transition-colors"><FaTrash /></button>}
//                                     </div>
//                                 </div>
//                             ))}
//                         </motion.div>
//                     ) : (
//                         <motion.div key="NCR_ACTS" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl border border-blue-500/40 bg-blue-900/5 mb-6 relative">
//                             <h3 className="text-blue-400 text-sm font-bold uppercase mb-4 relative z-10"><FaFileAlt className="inline mr-2"/> Non-Cognizable Offence Type</h3>
//                             <InputGroup label="Select Offence" glowColor="blue">
//                                 <select name="incidentType" value={formData.incidentType} onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900`}>
//                                     <option value="">-- Choose Category --</option>
//                                     {ncrOffenses.map(off => <option key={off} value={off}>{off}</option>)}
//                                 </select>
//                             </InputGroup>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* 5. DESCRIPTION */}
//                 <motion.div variants={itemVariants} className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
//                     <h3 className="text-yellow-400 text-sm font-bold uppercase mb-4"><FaFileAlt className="inline mr-2"/> Incident Description</h3>
//                     <textarea name="briefDescription" value={formData.briefDescription} onChange={handleChange} rows="5" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-white text-sm outline-none focus:border-yellow-500/50 transition-all resize-none placeholder-slate-600" placeholder="Enter detailed facts of the incident here..."></textarea>
//                 </motion.div>

//                 {/* 6. EVIDENCE & WITNESS */}
//                 <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
//                         <h3 className="text-purple-400 text-sm font-bold uppercase mb-4 flex items-center gap-2"><FaUsers /> Witness (Optional)</h3>
//                         <div className="space-y-4">
//                             <InputGroup label="Witness Name" glowColor="purple"><input name="witnessName" value={formData.witnessName} onChange={handleChange} className={inputClass} placeholder="Name" /></InputGroup>
//                             <InputGroup label="Contact" glowColor="purple"><input name="witnessContact" value={formData.witnessContact} onChange={handleChange} className={inputClass} placeholder="Mobile" /></InputGroup>
//                         </div>
//                     </div>
//                     <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
//                         <h3 className="text-green-400 text-sm font-bold uppercase mb-4 flex items-center gap-2"><FaCamera /> Police Evidence</h3>
                        
//                         {/* Existing Evidence List */}
//                         {existingEvidence.length > 0 && (
//                             <div className="mb-4 grid grid-cols-2 gap-2">
//                                 {existingEvidence.map((url, index) => (
//                                     <div key={index} className="relative group/ev rounded-lg overflow-hidden border border-slate-600">
//                                         <div className="absolute top-1 right-1 z-10">
//                                             <button type="button" onClick={() => removeExistingEvidence(index)} className="bg-red-500 text-white p-1 rounded-full text-xs opacity-0 group-hover/ev:opacity-100 transition-opacity"><FaTrash /></button>
//                                         </div>
//                                         {url.match(/\.(mp4|mov|webm)$/i) ? (
//                                             <div className="w-full h-20 bg-black flex items-center justify-center text-slate-500"><FaVideo /></div>
//                                         ) : (
//                                             <img src={url} alt={`Evidence ${index}`} className="w-full h-20 object-cover" />
//                                         )}
//                                         <div className="bg-slate-900/80 text-[10px] text-center py-1 text-slate-300">Default</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         <label className="group block w-full h-32 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-900/10 transition-all">
//                             <input type="file" multiple onChange={handleFileChange} className="hidden" />
//                             <FaCamera className="text-3xl text-slate-500 mb-2 group-hover:text-green-400 transition-colors" />
//                             <span className="text-xs text-slate-400 group-hover:text-white transition-colors">
//                                 {newFiles.length > 0 ? `✅ ${newFiles.length} New Files Selected` : "Click to Upload New Photos/Docs"}
//                             </span>
//                         </label>
//                     </div>
//                 </motion.div>

//                 {/* FOOTER */}
//                 <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
//                     <div className="text-xs text-slate-500">
//                         <span className="block font-bold text-slate-400 uppercase mb-1">Recording Officer</span>
//                         <div className="flex items-center gap-2">
//                             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 font-bold">👮‍♂️</div>
//                             <span className="text-white font-medium tracking-wide">{formData.investigatingOfficer}</span>
//                         </div>
//                     </div>
//                     <div className="flex gap-4">
//                         <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm border border-slate-700 hover:bg-slate-700 hover:text-white transition-all">Cancel</button>
//                         <button type="submit" disabled={loading} className={`px-8 py-3 rounded-xl font-bold text-white text-sm shadow-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${recordType === 'FIR' ? 'bg-gradient-to-r from-red-700 to-red-500 hover:shadow-red-500/30' : 'bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-blue-500/30'}`}>
//                             {loading ? <span className="animate-spin">⏳</span> : <FaSave />}
//                             {loading ? "Processing..." : `File ${recordType} Now`}
//                         </button>
//                     </div>
//                 </div>

//             </motion.div>
//         </form>
//     </motion.div>
//   );
// };

// export default FileFIR;
































// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { 
//   FaGavel, FaFileAlt, FaUser, FaClock, 
//   FaSave, FaTimes, FaPlus, FaTrash, FaCamera, 
//   FaMapMarkerAlt, FaCalendarAlt, FaShieldAlt, FaLink, 
//   FaUserInjured, FaUserSecret, FaUsers, FaVideo
// } from "react-icons/fa";

// // ✅ FIXED IMPORT PATH (2 levels up, not 3)
// import { BASE_URL } from "../../config"; 

// // --- ANIMATION VARIANTS ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { 
//     opacity: 1,
//     transition: { staggerChildren: 0.1 }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// };

// // ✅ REUSABLE INPUT GROUP
// const InputGroup = ({ label, icon, children, required, glowColor = "blue" }) => (
//     <div className="relative group">
//         <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 transition-colors duration-300 group-focus-within:text-${glowColor}-400 text-slate-400`}>
//             {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         <div className={`relative flex items-center bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 
//             group-focus-within:border-${glowColor}-500 group-focus-within:ring-1 group-focus-within:ring-${glowColor}-500/50 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)]`}>
//             {icon && <div className={`pl-3 text-slate-500 group-focus-within:text-${glowColor}-400 transition-colors`}>{icon}</div>}
//             {children}
//         </div>
//     </div>
// );

// // ✅ PERSON FORM SECTION
// const PersonFormSection = ({ title, icon, data, onChange, colorClass, borderColor, isAccused }) => {
//     const baseColor = colorClass.split('-')[1];
//     return (
//         <motion.div 
//             variants={itemVariants}
//             whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.2)" }}
//             className={`p-6 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-md mb-6 shadow-lg relative overflow-hidden group`}
//         >
//             <div className={`absolute top-0 right-0 w-32 h-32 bg-${baseColor}-500/10 blur-[50px] rounded-full -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-80`}></div>
//             <h3 className={`${colorClass} text-sm font-bold uppercase mb-6 flex items-center gap-3 border-b border-slate-700/50 pb-3`}>
//                 <span className={`p-2 rounded-lg bg-${baseColor}-500/20`}>{icon}</span> {title} Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
//                 <InputGroup label="Full Name" required glowColor={baseColor}>
//                     <input name="fullName" value={data.fullName} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="Full Legal Name" />
//                 </InputGroup>
//                 <InputGroup label="Guardian (Father/Husband)" glowColor={baseColor}>
//                     <input name="guardianName" value={data.guardianName} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="S/O, D/O, W/O" />
//                 </InputGroup>
//                 <InputGroup label="Age" glowColor={baseColor}>
//                     <input name="age" type="number" value={data.age} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="Years" />
//                 </InputGroup>
//                 <InputGroup label="Gender *" glowColor={baseColor}>
//                     <select name="gender" value={data.gender} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none [&>option]:bg-slate-900">
//                         <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
//                     </select>
//                 </InputGroup>
//                 <InputGroup label="Mobile Number" glowColor={baseColor}>
//                     <input name="mobile" value={data.mobile} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="10 Digit" />
//                 </InputGroup>
//                 <InputGroup label="Email ID" glowColor={baseColor}>
//                     <input name="email" value={data.email} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="Optional" />
//                 </InputGroup>
//                 <div className="md:col-span-3">
//                     <InputGroup label="Full Address" glowColor={baseColor}>
//                         <input name="address" value={data.address} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="House No, Area, City, District, Pincode" />
//                     </InputGroup>
//                 </div>
//                 <InputGroup label="ID Proof Type" glowColor={baseColor}>
//                     <select name="idProofType" value={data.idProofType} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none [&>option]:bg-slate-900">
//                         <option>Aadhar Card</option><option>PAN Card</option><option>Voter ID</option><option>Driving License</option>
//                     </select>
//                 </InputGroup>
//                 <InputGroup label="ID Number *" glowColor={baseColor}>
//                     <input name="idProofNumber" value={data.idProofNumber} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600 font-mono tracking-wide" placeholder="XXXX-XXXX-XXXX" />
//                 </InputGroup>
//                 {isAccused && (
//                     <InputGroup label="Relation with Complainant" glowColor={baseColor}>
//                         <select name="relation" value={data.relation} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none [&>option]:bg-slate-900">
//                             <option>Unknown</option><option>Neighbor</option><option>Relative</option><option>Stranger</option><option>Colleague</option>
//                         </select>
//                     </InputGroup>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// const FileFIR = ({ onCancel, prefillId }) => {
//   const [loading, setLoading] = useState(false);
//   const [recordType, setRecordType] = useState("FIR");
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   const isSenior = userInfo.role === 'senior' || userInfo.designation === 'DGP';

//   const [actsList, setActsList] = useState([{ actName: "IPC", section: "" }]);
  
//   // ✅ DYNAMIC DATA STATES
//   const [stationsList, setStationsList] = useState([]);
//   const [ipcList, setIpcList] = useState([]);
//   const [ncrList, setNcrList] = useState([]);

//   // ✅ New State for Existing Evidence (URLs)
//   const [existingEvidence, setExistingEvidence] = useState([]); 
//   // ✅ New State for NEW Files to Upload
//   const [newFiles, setNewFiles] = useState([]);

//   // Empty Template
//   const emptyPerson = { fullName: "", guardianName: "", age: "", gender: "", mobile: "", email: "", address: "", idProofType: "Aadhar", idProofNumber: "" };

//   const [formData, setFormData] = useState({
//     district: "Chandrapur (Maharashtra)",
//     policeStation: userInfo.station || "",
//     year: new Date().getFullYear().toString(),
//     onlineComplaintId: prefillId || "", 
//     generalDiaryReference: "",
//     occurrenceDate: "", occurrenceTime: "", incidentPlace: "",
//     distanceFromPS: "", directionFromPS: "", beatNo: "", 
//     complainant: { ...emptyPerson },
//     victim: { ...emptyPerson },
//     accused: { ...emptyPerson, relation: "Unknown", details: "" },
//     briefDescription: "", stolenPropertyParticulars: "", totalValue: "", articleType: "",
//     incidentType: "", 
//     hasWitness: "No", witnessName: "", witnessContact: "",
//     previousComplaintExists: "No", previousComplaintNumber: "",
//     declaration: false,
//     investigatingOfficer: `${userInfo.designation} ${userInfo.name}` 
//   });

//   // ✅ FETCH METADATA & PREFILL
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
//             setStationsList(data.stations.map(s => s.name));
//             setIpcList(data.legal.ipc);
//             setNcrList(data.legal.ncr);
//         } catch (error) {
//             console.error("Metadata Error");
//         }
//     };
//     fetchData();

//     // Prefill Logic
//     const fetchComplaint = async () => {
//         if(!formData.onlineComplaintId) return;
//         try {
//             const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//             const { data } = await axios.get(`${BASE_URL}/api/crime/track/${formData.onlineComplaintId}`, config);
            
//             const allEvidence = [...(data.evidence || []), ...(data.incidentProof || [])];
//             setExistingEvidence(allEvidence);

//             setFormData(prev => ({
//                 ...prev,
//                 policeStation: data.selectedStation || prev.policeStation,
//                 occurrenceDate: data.dateOfIncident ? data.dateOfIncident.slice(0, 10) : "",
//                 occurrenceTime: data.dateOfIncident ? new Date(data.dateOfIncident).toTimeString().slice(0, 5) : "",
//                 briefDescription: data.description || "",
//                 incidentPlace: data.victimAddress || "", 
//                 complainant: { ...prev.complainant, fullName: data.reporterName || "", mobile: data.victimContact || "", address: data.victimAddress || "" },
//                 victim: { ...prev.victim, fullName: data.victimName || "", gender: data.victimGender || "", mobile: data.victimContact || "", address: data.victimAddress || "", idProofNumber: data.victimAadhar || "" },
//                 accused: { ...prev.accused, fullName: data.suspectName !== "Unknown" ? data.suspectName : "", mobile: data.suspectContact !== "N/A" ? data.suspectContact : "", address: data.suspectAddress !== "N/A" ? data.suspectAddress : "" }
//             }));
//             toast.success("Citizen details & evidence fetched!");
//         } catch (error) { console.log("Manual Mode"); }
//     };
//     fetchComplaint();
//   }, [formData.onlineComplaintId]);

//   const handlePersonChange = (type, e) => {
//       setFormData({
//           ...formData,
//           [type]: { ...formData[type], [e.target.name]: e.target.value }
//       });
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleActChange = (index, field, value) => {
//       const newActs = [...actsList];
//       newActs[index][field] = value;
//       setActsList(newActs);
//   };
//   const addAct = () => setActsList([...actsList, { actName: "IPC", section: "" }]);
//   const removeAct = (index) => setActsList(actsList.filter((_, i) => i !== index));
  
//   const handleFileChange = (e) => {
//       setNewFiles(Array.from(e.target.files));
//   };

//   const removeExistingEvidence = (index) => {
//       setExistingEvidence(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(!formData.policeStation) return toast.error("Police Station is required!");
    
//     setLoading(true);
//     try {
//         const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
//         const data = new FormData();
        
//         data.append('recordType', recordType);
//         data.append('complaintId', formData.onlineComplaintId);
//         data.append('acts', recordType === 'FIR' ? JSON.stringify(actsList) : JSON.stringify([]));
        
//         data.append('existingEvidence', JSON.stringify(existingEvidence));

//         const flatFields = ['district', 'policeStation', 'year', 'onlineComplaintId', 'generalDiaryReference', 
//             'occurrenceDate', 'occurrenceTime', 'incidentPlace', 'distanceFromPS', 'directionFromPS', 'beatNo',
//             'briefDescription', 'stolenPropertyParticulars', 'totalValue', 'articleType', 'incidentType', 
//             'hasWitness', 'witnessName', 'witnessContact', 'previousComplaintExists', 'previousComplaintNumber',
//             'declaration', 'investigatingOfficer'];

//         flatFields.forEach(field => data.append(field, formData[field]));

//         Object.keys(formData.complainant).forEach(k => data.append(`complainant[${k}]`, formData.complainant[k]));
//         Object.keys(formData.victim).forEach(k => data.append(`victim[${k}]`, formData.victim[k]));
//         Object.keys(formData.accused).forEach(k => data.append(`accused[${k}]`, formData.accused[k]));

//         data.append('victimAadhar', formData.victim.idProofNumber); 

//         for (let i = 0; i < newFiles.length; i++) data.append('policeEvidence', newFiles[i]);

//         const response = await axios.post(`${BASE_URL}/api/crime/file-record`, data, config);
//         toast.success(`${recordType} Filed: ${response.data.recordNumber}`);
//         if (onCancel) onCancel(); 
//     } catch (error) { 
//         console.error(error);
//         toast.error(error.response?.data?.message || "Failed."); 
//     } 
//     finally { setLoading(false); }
//   };

//   const inputClass = "w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600";

//   return (
//     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto bg-[#0f172a] border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden my-4 font-sans relative">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 z-50"></div>
        
//         <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
//             <div>
//                 <motion.h2 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 flex items-center gap-3">
//                     <FaGavel className="text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" /> 
//                     {recordType === "NCR" ? "NON-COGNIZABLE REPORT" : "FIRST INFORMATION REPORT"}
//                 </motion.h2>
//                 <div className="flex items-center gap-3 mt-2">
//                     <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 font-mono tracking-widest">OFFICIAL RECORD</span>
//                     <p className="text-slate-400 text-xs flex items-center gap-1"><FaShieldAlt className="text-slate-600"/> Station: <span className="text-white font-bold">{formData.policeStation || "Select Below"}</span></p>
//                 </div>
//             </div>
//             <div className="bg-black/40 p-1.5 rounded-xl border border-slate-700 flex relative mt-4 md:mt-0 shadow-inner">
//                 <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className={`absolute top-1.5 bottom-1.5 rounded-lg bg-gradient-to-r ${recordType === "FIR" ? 'from-red-600 to-red-500 left-1.5 w-[88px]' : 'from-blue-600 to-blue-500 left-[102px] w-[90px]'}`} />
//                 <button onClick={() => setRecordType("FIR")} className={`relative z-10 px-6 py-2 rounded-lg font-bold text-xs tracking-wider transition-colors ${recordType === "FIR" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>F.I.R.</button>
//                 <button onClick={() => setRecordType("NCR")} className={`relative z-10 px-6 py-2 rounded-lg font-bold text-xs tracking-wider transition-colors ${recordType === "NCR" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>N.C.R.</button>
//             </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 relative z-10">
//             <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            
//                 {/* 1. LINKING & STATION */}
//                 <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <InputGroup label="Link Complaint ID" required icon={<FaLink />} glowColor="yellow">
//                         <input name="onlineComplaintId" value={formData.onlineComplaintId} onChange={handleChange} placeholder="Enter ID" className={`${inputClass} text-yellow-400 font-mono tracking-wider`} />
//                     </InputGroup>
//                     <InputGroup label="District" icon={<FaMapMarkerAlt />}>
//                         <input value={formData.district} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
//                     </InputGroup>
//                     <InputGroup label="Police Station" required icon={<FaShieldAlt />} glowColor="purple">
//                         {isSenior ? (
//                             <select name="policeStation" onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900 cursor-pointer`}>
//                                 <option value="">Select Station</option>
//                                 {/* ✅ DYNAMIC STATIONS */}
//                                 {stationsList.map(st => <option key={st} value={st}>{st}</option>)}
//                             </select>
//                         ) : (
//                             <input name="policeStation" value={formData.policeStation} disabled className={`${inputClass} opacity-50`} />
//                         )}
//                     </InputGroup>
//                 </motion.div>

//                 {/* 2. DATE & LOCATION */}
//                 <motion.div variants={itemVariants} className="p-1 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 shadow-lg">
//                     <div className="bg-[#0f172a] rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
//                         <div className="md:col-span-4 border-b border-slate-800 pb-2 mb-2"><h3 className="text-orange-400 text-sm font-bold uppercase flex items-center gap-2 tracking-wide"><FaClock /> Occurrence & Location</h3></div>
//                         <InputGroup label="Date *" glowColor="orange"><input name="occurrenceDate" type="date" value={formData.occurrenceDate} onChange={handleChange} className={`${inputClass} cursor-pointer`} required /></InputGroup>
//                         <InputGroup label="Time *" glowColor="orange"><input name="occurrenceTime" type="time" value={formData.occurrenceTime} onChange={handleChange} className={`${inputClass} cursor-pointer`} required /></InputGroup>
//                         <InputGroup label="Direction"><select name="directionFromPS" onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900`}><option value="">Select</option><option>North</option><option>South</option><option>East</option><option>West</option></select></InputGroup>
//                         <InputGroup label="Distance"><select name="distanceFromPS" onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900`}><option value="">Select</option><option>1 KM</option><option>5 KM</option><option>10+ KM</option></select></InputGroup>
//                         <div className="md:col-span-4"><InputGroup label="Incident Address *" required glowColor="orange"><input name="incidentPlace" value={formData.incidentPlace} onChange={handleChange} className={inputClass} required /></InputGroup></div>
//                     </div>
//                 </motion.div>

//                 {/* 3. PEOPLE FORMS */}
//                 <PersonFormSection title="Complainant" icon={<FaUser />} colorClass="text-purple-400" borderColor="purple" data={formData.complainant} onChange={(e) => handlePersonChange('complainant', e)} />
//                 <PersonFormSection title="Victim" icon={<FaUserInjured />} colorClass="text-pink-400" borderColor="pink" data={formData.victim} onChange={(e) => handlePersonChange('victim', e)} />
//                 <PersonFormSection title="Accused" icon={<FaUserSecret />} colorClass="text-red-400" borderColor="red" data={formData.accused} onChange={(e) => handlePersonChange('accused', e)} isAccused={true} />

//                 {/* 4. ACTS / OFFENCE */}
//                 <AnimatePresence mode="wait">
//                     {recordType === "FIR" ? (
//                         <motion.div key="FIR_ACTS" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl border border-dashed border-red-500/40 bg-red-900/5 mb-6 relative overflow-hidden">
//                             <div className="flex justify-between items-center mb-4 relative z-10">
//                                 <h3 className="text-red-400 text-sm font-bold uppercase flex items-center gap-2"><FaShieldAlt /> Acts & Sections <span className="text-red-500">*</span></h3>
//                                 <button type="button" onClick={addAct} className="text-[10px] bg-red-900/50 hover:bg-red-800 border border-red-500/50 text-red-200 px-4 py-1.5 rounded-full transition-all flex items-center gap-1"><FaPlus /> Add Act</button>
//                             </div>
//                             {actsList.map((act, i) => (
//                                 <div key={i} className="flex gap-3 mb-3">
//                                     <div className="w-1/3"><InputGroup label="Act Name" glowColor="red"><input value={act.actName} disabled className="w-full bg-transparent text-white text-sm p-3 font-bold text-center"/></InputGroup></div>
//                                     <div className="w-2/3 flex gap-2">
//                                         <div className="flex-1"><InputGroup label="Section" glowColor="red"><select value={act.section} onChange={(e) => handleActChange(i, 'section', e.target.value)} className="w-full bg-transparent text-white text-sm p-3 [&>option]:bg-slate-900"><option value="">Select Section</option>{/* ✅ DYNAMIC IPC */}{ipcList.map(s => <option key={s} value={s}>{s}</option>)}</select></InputGroup></div>
//                                         {i > 0 && <button type="button" onClick={() => removeAct(i)} className="px-3 rounded-lg bg-red-900/20 text-red-400 hover:bg-red-900/50 transition-colors"><FaTrash /></button>}
//                                     </div>
//                                 </div>
//                             ))}
//                         </motion.div>
//                     ) : (
//                         <motion.div key="NCR_ACTS" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl border border-blue-500/40 bg-blue-900/5 mb-6 relative">
//                             <h3 className="text-blue-400 text-sm font-bold uppercase mb-4 relative z-10"><FaFileAlt className="inline mr-2"/> Non-Cognizable Offence Type</h3>
//                             <InputGroup label="Select Offence" glowColor="blue">
//                                 <select name="incidentType" value={formData.incidentType} onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900`}>
//                                     <option value="">-- Choose Category --</option>
//                                     {/* ✅ DYNAMIC NCR */}
//                                     {ncrList.map(off => <option key={off} value={off}>{off}</option>)}
//                                 </select>
//                             </InputGroup>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* 5. DESCRIPTION (Same as before) */}
//                 <motion.div variants={itemVariants} className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
//                     <h3 className="text-yellow-400 text-sm font-bold uppercase mb-4"><FaFileAlt className="inline mr-2"/> Incident Description</h3>
//                     <textarea name="briefDescription" value={formData.briefDescription} onChange={handleChange} rows="5" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-white text-sm outline-none focus:border-yellow-500/50 transition-all resize-none placeholder-slate-600" placeholder="Enter detailed facts of the incident here..."></textarea>
//                 </motion.div>

//                 {/* 6. EVIDENCE & WITNESS (Same as before) */}
//                 <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
//                         <h3 className="text-purple-400 text-sm font-bold uppercase mb-4 flex items-center gap-2"><FaUsers /> Witness (Optional)</h3>
//                         <div className="space-y-4">
//                             <InputGroup label="Witness Name" glowColor="purple"><input name="witnessName" value={formData.witnessName} onChange={handleChange} className={inputClass} placeholder="Name" /></InputGroup>
//                             <InputGroup label="Contact" glowColor="purple"><input name="witnessContact" value={formData.witnessContact} onChange={handleChange} className={inputClass} placeholder="Mobile" /></InputGroup>
//                         </div>
//                     </div>
//                     <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
//                         <h3 className="text-green-400 text-sm font-bold uppercase mb-4 flex items-center gap-2"><FaCamera /> Police Evidence</h3>
//                         {/* Evidence Upload UI - Same as before */}
//                         <label className="group block w-full h-32 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-900/10 transition-all">
//                             <input type="file" multiple onChange={handleFileChange} className="hidden" />
//                             <FaCamera className="text-3xl text-slate-500 mb-2 group-hover:text-green-400 transition-colors" />
//                             <span className="text-xs text-slate-400 group-hover:text-white transition-colors">
//                                 {newFiles.length > 0 ? `✅ ${newFiles.length} New Files Selected` : "Click to Upload New Photos/Docs"}
//                             </span>
//                         </label>
//                     </div>
//                 </motion.div>

//                 {/* FOOTER */}
//                 <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
//                     <div className="text-xs text-slate-500">
//                         <span className="block font-bold text-slate-400 uppercase mb-1">Recording Officer</span>
//                         <div className="flex items-center gap-2">
//                             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 font-bold">👮‍♂️</div>
//                             <span className="text-white font-medium tracking-wide">{formData.investigatingOfficer}</span>
//                         </div>
//                     </div>
//                     <div className="flex gap-4">
//                         <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm border border-slate-700 hover:bg-slate-700 hover:text-white transition-all">Cancel</button>
//                         <button type="submit" disabled={loading} className={`px-8 py-3 rounded-xl font-bold text-white text-sm shadow-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${recordType === 'FIR' ? 'bg-gradient-to-r from-red-700 to-red-500 hover:shadow-red-500/30' : 'bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-blue-500/30'}`}>
//                             {loading ? <span className="animate-spin">⏳</span> : <FaSave />}
//                             {loading ? "Processing..." : `File ${recordType} Now`}
//                         </button>
//                     </div>
//                 </div>

//             </motion.div>
//         </form>
//     </motion.div>
//   );
// };

// export default FileFIR;
















import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import { 
  FaGavel, FaFileAlt, FaUser, FaClock, 
  FaSave, FaTimes, FaPlus, FaTrash, FaCamera, 
  FaMapMarkerAlt, FaShieldAlt, FaLink, 
  FaUserInjured, FaUserSecret, FaUsers, FaArrowLeft // ✅ Added FaArrowLeft
} from "react-icons/fa";

// ✅ IMPORT BACKGROUND (Same as dashboard)
import dashboardBg from '../../assets/signup-bg.png';

// ✅ FIXED IMPORT PATH
import { BASE_URL } from "../../config"; 

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

// --- REUSABLE COMPONENTS ---
const InputGroup = ({ label, icon, children, required, glowColor = "blue" }) => (
    <div className="relative group">
        <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 transition-colors duration-300 group-focus-within:text-${glowColor}-400 text-slate-400`}>
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className={`relative flex items-center bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 
            group-focus-within:border-${glowColor}-500 group-focus-within:ring-1 group-focus-within:ring-${glowColor}-500/50 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)]`}>
            {icon && <div className={`pl-3 text-slate-500 group-focus-within:text-${glowColor}-400 transition-colors`}>{icon}</div>}
            {children}
        </div>
    </div>
);

const PersonFormSection = ({ title, icon, data, onChange, colorClass, borderColor, isAccused }) => {
    const baseColor = colorClass.split('-')[1];
    return (
        <motion.div 
            variants={itemVariants}
            whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.2)" }}
            className={`p-6 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-md mb-6 shadow-lg relative overflow-hidden group`}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${baseColor}-500/10 blur-[50px] rounded-full -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-80`}></div>
            <h3 className={`${colorClass} text-sm font-bold uppercase mb-6 flex items-center gap-3 border-b border-slate-700/50 pb-3`}>
                <span className={`p-2 rounded-lg bg-${baseColor}-500/20`}>{icon}</span> {title} Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                <InputGroup label="Full Name" required glowColor={baseColor}>
                    <input name="fullName" value={data.fullName} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="Full Legal Name" />
                </InputGroup>
                <InputGroup label="Guardian (Father/Husband)" glowColor={baseColor}>
                    <input name="guardianName" value={data.guardianName} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="S/O, D/O, W/O" />
                </InputGroup>
                <InputGroup label="Age" glowColor={baseColor}>
                    <input name="age" type="number" value={data.age} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="Years" />
                </InputGroup>
                <InputGroup label="Gender *" glowColor={baseColor}>
                    <select name="gender" value={data.gender} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none [&>option]:bg-slate-900 cursor-pointer">
                        <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                    </select>
                </InputGroup>
                <InputGroup label="Mobile Number" glowColor={baseColor}>
                    <input name="mobile" value={data.mobile} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="10 Digit" />
                </InputGroup>
                <InputGroup label="Email ID" glowColor={baseColor}>
                    <input name="email" value={data.email} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="Optional" />
                </InputGroup>
                <div className="md:col-span-3">
                    <InputGroup label="Full Address" glowColor={baseColor}>
                        <input name="address" value={data.address} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600" placeholder="House No, Area, City, District, Pincode" />
                    </InputGroup>
                </div>
                <InputGroup label="ID Proof Type" glowColor={baseColor}>
                    <select name="idProofType" value={data.idProofType} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none [&>option]:bg-slate-900 cursor-pointer">
                        <option>Aadhar Card</option><option>PAN Card</option><option>Voter ID</option><option>Driving License</option>
                    </select>
                </InputGroup>
                <InputGroup label="ID Number *" glowColor={baseColor}>
                    <input name="idProofNumber" value={data.idProofNumber} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600 font-mono tracking-wide" placeholder="XXXX-XXXX-XXXX" />
                </InputGroup>
                {isAccused && (
                    <InputGroup label="Relation with Complainant" glowColor={baseColor}>
                        <select name="relation" value={data.relation} onChange={onChange} className="w-full bg-transparent p-3 text-white text-sm outline-none [&>option]:bg-slate-900 cursor-pointer">
                            <option>Unknown</option><option>Neighbor</option><option>Relative</option><option>Stranger</option><option>Colleague</option>
                        </select>
                    </InputGroup>
                )}
            </div>
        </motion.div>
    );
};

const FileFIR = ({ onCancel, prefillId }) => {
  const [loading, setLoading] = useState(false);
  const [recordType, setRecordType] = useState("FIR");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isSenior = userInfo.role === 'senior' || userInfo.designation === 'DGP';
  const navigate = useNavigate(); // ✅ Hook for navigation

  const [actsList, setActsList] = useState([{ actName: "IPC", section: "" }]);
  
  // DYNAMIC DATA STATES
  const [stationsList, setStationsList] = useState([]);
  const [ipcList, setIpcList] = useState([]);
  const [ncrList, setNcrList] = useState([]);

  // Evidence State
  const [existingEvidence, setExistingEvidence] = useState([]); 
  const [newFiles, setNewFiles] = useState([]);

  // Empty Template
  const emptyPerson = { fullName: "", guardianName: "", age: "", gender: "", mobile: "", email: "", address: "", idProofType: "Aadhar", idProofNumber: "" };

  const [formData, setFormData] = useState({
    district: "Chandrapur (Maharashtra)",
    policeStation: userInfo.station || "",
    year: new Date().getFullYear().toString(),
    onlineComplaintId: prefillId || "", 
    generalDiaryReference: "",
    occurrenceDate: "", occurrenceTime: "", incidentPlace: "",
    distanceFromPS: "", directionFromPS: "", beatNo: "", 
    complainant: { ...emptyPerson },
    victim: { ...emptyPerson },
    accused: { ...emptyPerson, relation: "Unknown", details: "" },
    briefDescription: "", stolenPropertyParticulars: "", totalValue: "", articleType: "",
    incidentType: "", 
    hasWitness: "No", witnessName: "", witnessContact: "",
    previousComplaintExists: "No", previousComplaintNumber: "",
    declaration: false,
    investigatingOfficer: `${userInfo.designation} ${userInfo.name}` 
  });

  // Handle Back Navigation (Cancel or Back Button)
  const handleBack = () => {
      if (onCancel) {
          onCancel(); // If opened as component inside dashboard
      } else {
          navigate(-1); // If opened as standalone page
      }
  };

  // FETCH METADATA & PREFILL
  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
            setStationsList(data.stations.map(s => s.name));
            setIpcList(data.legal.ipc);
            setNcrList(data.legal.ncr);
        } catch (error) {
            console.error("Metadata Error");
        }
    };
    fetchData();

    // Prefill Logic
    const fetchComplaint = async () => {
        if(!formData.onlineComplaintId) return;
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${BASE_URL}/api/crime/track/${formData.onlineComplaintId}`, config);
            
            const allEvidence = [...(data.evidence || []), ...(data.incidentProof || [])];
            setExistingEvidence(allEvidence);

            setFormData(prev => ({
                ...prev,
                policeStation: data.selectedStation || prev.policeStation,
                occurrenceDate: data.dateOfIncident ? data.dateOfIncident.slice(0, 10) : "",
                occurrenceTime: data.dateOfIncident ? new Date(data.dateOfIncident).toTimeString().slice(0, 5) : "",
                briefDescription: data.description || "",
                incidentPlace: data.victimAddress || "", 
                complainant: { ...prev.complainant, fullName: data.reporterName || "", mobile: data.victimContact || "", address: data.victimAddress || "" },
                victim: { ...prev.victim, fullName: data.victimName || "", gender: data.victimGender || "", mobile: data.victimContact || "", address: data.victimAddress || "", idProofNumber: data.victimAadhar || "" },
                accused: { ...prev.accused, fullName: data.suspectName !== "Unknown" ? data.suspectName : "", mobile: data.suspectContact !== "N/A" ? data.suspectContact : "", address: data.suspectAddress !== "N/A" ? data.suspectAddress : "" }
            }));
            toast.success("Citizen details & evidence fetched!");
        } catch (error) { console.log("Manual Mode"); }
    };
    fetchComplaint();
  }, [formData.onlineComplaintId]);

  const handlePersonChange = (type, e) => {
      setFormData({
          ...formData,
          [type]: { ...formData[type], [e.target.name]: e.target.value }
      });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleActChange = (index, field, value) => {
      const newActs = [...actsList];
      newActs[index][field] = value;
      setActsList(newActs);
  };
  const addAct = () => setActsList([...actsList, { actName: "IPC", section: "" }]);
  const removeAct = (index) => setActsList(actsList.filter((_, i) => i !== index));
  
  const handleFileChange = (e) => {
      setNewFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.policeStation) return toast.error("Police Station is required!");
    
    setLoading(true);
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
        const data = new FormData();
        
        data.append('recordType', recordType);
        data.append('complaintId', formData.onlineComplaintId);
        data.append('acts', recordType === 'FIR' ? JSON.stringify(actsList) : JSON.stringify([]));
        data.append('existingEvidence', JSON.stringify(existingEvidence));

        const flatFields = ['district', 'policeStation', 'year', 'onlineComplaintId', 'generalDiaryReference', 
            'occurrenceDate', 'occurrenceTime', 'incidentPlace', 'distanceFromPS', 'directionFromPS', 'beatNo',
            'briefDescription', 'stolenPropertyParticulars', 'totalValue', 'articleType', 'incidentType', 
            'hasWitness', 'witnessName', 'witnessContact', 'previousComplaintExists', 'previousComplaintNumber',
            'declaration', 'investigatingOfficer'];

        flatFields.forEach(field => data.append(field, formData[field]));

        Object.keys(formData.complainant).forEach(k => data.append(`complainant[${k}]`, formData.complainant[k]));
        Object.keys(formData.victim).forEach(k => data.append(`victim[${k}]`, formData.victim[k]));
        Object.keys(formData.accused).forEach(k => data.append(`accused[${k}]`, formData.accused[k]));

        data.append('victimAadhar', formData.victim.idProofNumber); 

        for (let i = 0; i < newFiles.length; i++) data.append('policeEvidence', newFiles[i]);

        const response = await axios.post(`${BASE_URL}/api/crime/file-record`, data, config);
        toast.success(`${recordType} Filed: ${response.data.recordNumber}`);
        handleBack(); // ✅ Use consistent back handler
    } catch (error) { 
        console.error(error);
        toast.error(error.response?.data?.message || "Failed."); 
    } 
    finally { setLoading(false); }
  };

  const inputClass = "w-full bg-transparent p-3 text-white text-sm outline-none placeholder-slate-600";

  return (
    // ✅ WRAPPER FOR FULL SCREEN BACKGROUND
    <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
        
        {/* ✅ BACKGROUND IMAGE LAYER */}
        <div className="fixed inset-0 z-0">
            <img src={dashboardBg} alt="Background" className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-black/60 to-black/80"></div>
        </div>

        {/* ✅ MAIN CONTENT SCROLLABLE */}
        <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar pt-6 pb-20 px-4 md:px-12">
            
            {/* ✅ STICKY BACK BUTTON */}
            <div className="max-w-7xl mx-auto mb-6 sticky top-0 z-50">
                <button 
                    onClick={handleBack} 
                    className="px-6 py-2 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-md text-white font-bold font-mono rounded-xl shadow-lg border border-slate-600 hover:border-slate-400 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95 w-fit"
                >
                    <FaArrowLeft /> CANCEL & BACK
                </button>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-3xl overflow-hidden relative">
                
                {/* Header Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 z-50"></div>
                
                <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center bg-black/40">
                    <div>
                        <motion.h2 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 flex items-center gap-3">
                            <FaGavel className="text-amber-500" /> 
                            {recordType === "NCR" ? "NON-COGNIZABLE REPORT" : "FIRST INFORMATION REPORT"}
                        </motion.h2>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 font-mono tracking-widest">OFFICIAL RECORD</span>
                            <p className="text-slate-400 text-xs flex items-center gap-1"><FaShieldAlt className="text-slate-600"/> Station: <span className="text-white font-bold">{formData.policeStation || "Select Below"}</span></p>
                        </div>
                    </div>
                    
                    {/* Toggle Switch */}
                    <div className="bg-black/60 p-1.5 rounded-xl border border-slate-700 flex relative mt-4 md:mt-0 shadow-inner">
                        <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className={`absolute top-1.5 bottom-1.5 rounded-lg bg-gradient-to-r ${recordType === "FIR" ? 'from-red-600 to-red-500 left-1.5 w-[88px]' : 'from-blue-600 to-blue-500 left-[102px] w-[90px]'}`} />
                        <button type="button" onClick={() => setRecordType("FIR")} className={`relative z-10 px-6 py-2 rounded-lg font-bold text-xs tracking-wider transition-colors ${recordType === "FIR" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>F.I.R.</button>
                        <button type="button" onClick={() => setRecordType("NCR")} className={`relative z-10 px-6 py-2 rounded-lg font-bold text-xs tracking-wider transition-colors ${recordType === "NCR" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>N.C.R.</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                    
                        {/* 1. LINKING & STATION */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputGroup label="Link Complaint ID" required icon={<FaLink />} glowColor="yellow">
                                <input name="onlineComplaintId" value={formData.onlineComplaintId} onChange={handleChange} placeholder="Enter ID" className={`${inputClass} text-yellow-400 font-mono tracking-wider`} />
                            </InputGroup>
                            <InputGroup label="District" icon={<FaMapMarkerAlt />}>
                                <input value={formData.district} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
                            </InputGroup>
                            <InputGroup label="Police Station" required icon={<FaShieldAlt />} glowColor="purple">
                                {isSenior ? (
                                    <select name="policeStation" onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900 cursor-pointer`}>
                                        <option value="">Select Station</option>
                                        {stationsList.map(st => <option key={st} value={st}>{st}</option>)}
                                    </select>
                                ) : (
                                    <input name="policeStation" value={formData.policeStation} disabled className={`${inputClass} opacity-50`} />
                                )}
                            </InputGroup>
                        </motion.div>

                        {/* 2. DATE & LOCATION */}
                        <motion.div variants={itemVariants} className="p-1 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 shadow-lg">
                            <div className="bg-[#0f172a] rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-span-4 border-b border-slate-800 pb-2 mb-2"><h3 className="text-orange-400 text-sm font-bold uppercase flex items-center gap-2 tracking-wide"><FaClock /> Occurrence & Location</h3></div>
                                <InputGroup label="Date *" glowColor="orange"><input name="occurrenceDate" type="date" value={formData.occurrenceDate} onChange={handleChange} className={`${inputClass} cursor-pointer`} required /></InputGroup>
                                <InputGroup label="Time *" glowColor="orange"><input name="occurrenceTime" type="time" value={formData.occurrenceTime} onChange={handleChange} className={`${inputClass} cursor-pointer`} required /></InputGroup>
                                <InputGroup label="Direction"><select name="directionFromPS" onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900 cursor-pointer`}><option value="">Select</option><option>North</option><option>South</option><option>East</option><option>West</option></select></InputGroup>
                                <InputGroup label="Distance"><select name="distanceFromPS" onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900 cursor-pointer`}><option value="">Select</option><option>1 KM</option><option>5 KM</option><option>10+ KM</option></select></InputGroup>
                                <div className="md:col-span-4"><InputGroup label="Incident Address *" required glowColor="orange"><input name="incidentPlace" value={formData.incidentPlace} onChange={handleChange} className={inputClass} required /></InputGroup></div>
                            </div>
                        </motion.div>

                        {/* 3. PEOPLE FORMS */}
                        <PersonFormSection title="Complainant" icon={<FaUser />} colorClass="text-purple-400" borderColor="purple" data={formData.complainant} onChange={(e) => handlePersonChange('complainant', e)} />
                        <PersonFormSection title="Victim" icon={<FaUserInjured />} colorClass="text-pink-400" borderColor="pink" data={formData.victim} onChange={(e) => handlePersonChange('victim', e)} />
                        <PersonFormSection title="Accused" icon={<FaUserSecret />} colorClass="text-red-400" borderColor="red" data={formData.accused} onChange={(e) => handlePersonChange('accused', e)} isAccused={true} />

                        {/* 4. ACTS / OFFENCE */}
                        <AnimatePresence mode="wait">
                            {recordType === "FIR" ? (
                                <motion.div key="FIR_ACTS" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl border border-dashed border-red-500/40 bg-red-900/5 mb-6 relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-4 relative z-10">
                                        <h3 className="text-red-400 text-sm font-bold uppercase flex items-center gap-2"><FaShieldAlt /> Acts & Sections <span className="text-red-500">*</span></h3>
                                        <button type="button" onClick={addAct} className="text-[10px] bg-red-900/50 hover:bg-red-800 border border-red-500/50 text-red-200 px-4 py-1.5 rounded-full transition-all flex items-center gap-1"><FaPlus /> Add Act</button>
                                    </div>
                                    {actsList.map((act, i) => (
                                        <div key={i} className="flex gap-3 mb-3">
                                            <div className="w-1/3"><InputGroup label="Act Name" glowColor="red"><input value={act.actName} disabled className="w-full bg-transparent text-white text-sm p-3 font-bold text-center"/></InputGroup></div>
                                            <div className="w-2/3 flex gap-2">
                                                <div className="flex-1"><InputGroup label="Section" glowColor="red"><select value={act.section} onChange={(e) => handleActChange(i, 'section', e.target.value)} className="w-full bg-transparent text-white text-sm p-3 [&>option]:bg-slate-900 cursor-pointer"><option value="">Select Section</option>{ipcList.map(s => <option key={s} value={s}>{s}</option>)}</select></InputGroup></div>
                                                {i > 0 && <button type="button" onClick={() => removeAct(i)} className="px-3 rounded-lg bg-red-900/20 text-red-400 hover:bg-red-900/50 transition-colors"><FaTrash /></button>}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div key="NCR_ACTS" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl border border-blue-500/40 bg-blue-900/5 mb-6 relative">
                                    <h3 className="text-blue-400 text-sm font-bold uppercase mb-4 relative z-10"><FaFileAlt className="inline mr-2"/> Non-Cognizable Offence Type</h3>
                                    <InputGroup label="Select Offence" glowColor="blue">
                                        <select name="incidentType" value={formData.incidentType} onChange={handleChange} className={`${inputClass} [&>option]:bg-slate-900 cursor-pointer`}>
                                            <option value="">-- Choose Category --</option>
                                            {ncrList.map(off => <option key={off} value={off}>{off}</option>)}
                                        </select>
                                    </InputGroup>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 5. DESCRIPTION */}
                        <motion.div variants={itemVariants} className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
                            <h3 className="text-yellow-400 text-sm font-bold uppercase mb-4"><FaFileAlt className="inline mr-2"/> Incident Description</h3>
                            <textarea name="briefDescription" value={formData.briefDescription} onChange={handleChange} rows="5" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-white text-sm outline-none focus:border-yellow-500/50 transition-all resize-none placeholder-slate-600" placeholder="Enter detailed facts of the incident here..."></textarea>
                        </motion.div>

                        {/* 6. EVIDENCE & WITNESS */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
                                <h3 className="text-purple-400 text-sm font-bold uppercase mb-4 flex items-center gap-2"><FaUsers /> Witness (Optional)</h3>
                                <div className="space-y-4">
                                    <InputGroup label="Witness Name" glowColor="purple"><input name="witnessName" value={formData.witnessName} onChange={handleChange} className={inputClass} placeholder="Name" /></InputGroup>
                                    <InputGroup label="Contact" glowColor="purple"><input name="witnessContact" value={formData.witnessContact} onChange={handleChange} className={inputClass} placeholder="Mobile" /></InputGroup>
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
                                <h3 className="text-green-400 text-sm font-bold uppercase mb-4 flex items-center gap-2"><FaCamera /> Police Evidence</h3>
                                <label className="group block w-full h-32 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-900/10 transition-all">
                                    <input type="file" multiple onChange={handleFileChange} className="hidden" />
                                    <FaCamera className="text-3xl text-slate-500 mb-2 group-hover:text-green-400 transition-colors" />
                                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors">
                                        {newFiles.length > 0 ? `✅ ${newFiles.length} New Files Selected` : "Click to Upload New Photos/Docs"}
                                    </span>
                                </label>
                            </div>
                        </motion.div>

                        {/* FOOTER */}
                        <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
                            <div className="text-xs text-slate-500">
                                <span className="block font-bold text-slate-400 uppercase mb-1">Recording Officer</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 font-bold">👮‍♂️</div>
                                    <span className="text-white font-medium tracking-wide">{formData.investigatingOfficer}</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {/* ✅ FIXED CANCEL BUTTON */}
                                <button type="button" onClick={handleBack} className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm border border-slate-700 hover:bg-slate-700 hover:text-white transition-all">Cancel</button>
                                <button type="submit" disabled={loading} className={`px-8 py-3 rounded-xl font-bold text-white text-sm shadow-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${recordType === 'FIR' ? 'bg-gradient-to-r from-red-700 to-red-500 hover:shadow-red-500/30' : 'bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-blue-500/30'}`}>
                                    {loading ? <span className="animate-spin">⏳</span> : <FaSave />}
                                    {loading ? "Processing..." : `File ${recordType} Now`}
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </form>
            </motion.div>
        </div>
    </div>
  );
};

export default FileFIR;