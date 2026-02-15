
// import React, { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import { 
//   FaUserShield, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, 
//   FaTrashAlt, FaExchangeAlt, FaUserPlus, FaTimes, FaSave, 
//   FaIdCard, FaCamera, FaCheckCircle, FaPaperPlane, FaLock, FaBuilding, FaUserCircle
// } from "react-icons/fa";

// // ✅ Import Base URL Config
// import { BASE_URL } from "../config"; 

// const SeniorManageOfficers = () => {
//   const [officers, setOfficers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [myJurisdiction, setMyJurisdiction] = useState([]);
  
//   // Transfer Modal State
//   const [transferModal, setTransferModal] = useState({ show: false, officerId: null, officerName: "", currentStation: "" });
//   const [newStation, setNewStation] = useState("");

//   // OTP & Verification State
//   const [otpSent, setOtpSent] = useState(false);
//   const [enteredOtp, setEnteredOtp] = useState("");
//   const [otpLoading, setOtpLoading] = useState(false);
  
//   // Image Upload State
//   const [idFile, setIdFile] = useState(null);
//   const [idPhotoPreview, setIdPhotoPreview] = useState(null);

//   const [formData, setFormData] = useState({
//     title: "Mr.", firstName: "", lastName: "", email: "", password: "", 
//     mobile: "", gender: "Male", aadhar: "", station: "", designation: "Inspector", 
//     secretCode: "POLICE123"
//   });

//   const fetchOfficers = async () => {
//     try {
//       const userInfoString = localStorage.getItem("userInfo");
//       if (!userInfoString) { setLoading(false); return; }

//       const userInfo = JSON.parse(userInfoString);
//       const seniorStations = userInfo.station ? userInfo.station.split(", ") : [];
//       setMyJurisdiction(seniorStations);

//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get(`${BASE_URL}/api/users/officers`, config);
      
//       const filteredOfficers = data.filter(off => seniorStations.includes(off.station));
//       setOfficers(filteredOfficers);
//       setLoading(false);
//     } catch (error) { 
//         toast.error("Failed to fetch officers"); 
//         setLoading(false); 
//     }
//   };

//   useEffect(() => { fetchOfficers(); }, []);

//   // --- HANDLERS ---

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setIdFile(file);
//       setIdPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   // ✅ REAL OTP LOGIC
//   const handleSendOtp = async () => {
//     if (!formData.email || !formData.email.includes("@")) return toast.error("Enter a valid email first.");
    
//     setOtpLoading(true);
//     try {
//         await axios.post(`${BASE_URL}/api/users/send-otp`, { email: formData.email, type: 'signup' });
//         toast.success(`OTP Sent to ${formData.email}`);
//         setOtpSent(true);
//     } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to send OTP");
//     } finally {
//         setOtpLoading(false);
//     }
//   };

//   // ✅ FORM SUBMISSION
//   const handleAddOfficer = async (e) => {
//     e.preventDefault();
    
//     if (!otpSent) return toast.error("Please verify email via OTP first!");
//     if (!enteredOtp) return toast.error("Enter the OTP code sent to email");
//     if (!idFile) return toast.error("Officer ID Photo is required.");

//     if (formData.mobile.length !== 10) return toast.error("Mobile number must be 10 digits");
//     if (formData.aadhar.length !== 12) return toast.error("Aadhaar number must be 12 digits");

//     const loadingToast = toast.loading("Creating Officer Profile...");

//     try {
//       const payload = new FormData();
//       Object.keys(formData).forEach(key => payload.append(key, formData[key]));
//       payload.append("role", "police");
//       payload.append("otp", enteredOtp); 
//       payload.append("idPhoto", idFile); 

//       const config = { headers: { "Content-Type": "multipart/form-data" } };
      
//       await axios.post(`${BASE_URL}/api/users/signup`, payload, config);

//       toast.dismiss(loadingToast);
//       toast.success("Officer Recruited Successfully");
//       setShowForm(false);
      
//       setFormData({
//           title: "Mr.", firstName: "", lastName: "", email: "", password: "", mobile: "", 
//           gender: "Male", aadhar: "", station: "", designation: "Inspector", secretCode: "POLICE123"
//       });
//       setOtpSent(false);
//       setEnteredOtp("");
//       setIdFile(null);
//       setIdPhotoPreview(null);
//       fetchOfficers();

//     } catch (error) { 
//         toast.dismiss(loadingToast);
//         const msg = error.response?.data?.message || "Failed to add officer";
//         toast.error(msg); 
//     }
//   };

//   const handleTransferSubmit = async () => {
//       if(!newStation) return toast.error("Select a new station");
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         await axios.put(`${BASE_URL}/api/users/transfer/${transferModal.officerId}`, { newStation }, config);
//         toast.success(`Officer Transferred to ${newStation}`);
//         setTransferModal({ show: false, officerId: null, officerName: "", currentStation: "" });
//         fetchOfficers();
//       } catch (error) { toast.error("Transfer Failed"); }
//   };

//   const handleDelete = async (id, name) => {
//     if(!window.confirm(`Confirm revocation of badge for ${name}?`)) return;
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.delete(`${BASE_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
//       toast.success("Officer Removed from Force");
//       fetchOfficers();
//     } catch (error) { toast.error("Action Failed"); }
//   };

//   // ✅ Helper to construct image URL safely (Same Logic as Navbar/Signup)
//   const getImageUrl = (path) => {
//       if (!path) return null;
//       // If path already contains http, return as is (e.g. Cloudinary)
//       if (path.startsWith("http")) return path;
//       // Replace backslashes for consistency
//       const cleanPath = path.replace(/\\/g, "/");
//       return `${BASE_URL}/${cleanPath}`;
//   };

//   return (
//     // Responsive Padding: p-3 on mobile, p-6 on desktop
//     <div className="min-h-screen bg-[#0f172a] font-sans text-slate-200 p-3 md:p-6">
        
//         {/* --- PAGE HEADER --- */}
//         {/* Responsive Padding (p-4 mobile, p-8 desktop), Margin (mb-6 mobile, mb-10 desktop) */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-slate-900 to-slate-800 p-4 md:p-8 rounded-2xl border border-slate-700 shadow-2xl mb-6 md:mb-10 relative overflow-hidden gap-4 md:gap-6">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
//             <div className="relative z-10 flex-1">
//                 {/* Scaled Text: text-xl mobile, text-3xl desktop */}
//                 <h2 className="text-xl md:text-3xl font-extrabold text-white mb-2 flex items-center gap-2 md:gap-3 tracking-wide flex-wrap">
//                     <FaUserShield className="text-amber-500 text-3xl md:text-4xl shrink-0"/> 
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Force Command Center</span>
//                 </h2>
//                 <p className="text-slate-400 text-xs md:text-sm font-medium flex flex-wrap items-center gap-2 mt-2">
//                     <FaBuilding className="text-slate-500"/> Jurisdiction: 
//                     <span className="font-mono text-amber-400 bg-amber-900/20 px-2 py-0.5 rounded border border-amber-500/20">{myJurisdiction.join(" | ")}</span>
//                 </p>
//             </div>

//             <button 
//                 onClick={() => setShowForm(!showForm)} 
//                 // Scaled Padding: px-4 py-2 mobile, px-6 py-3 desktop
//                 className={`relative z-10 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold text-xs md:text-sm shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 border whitespace-nowrap ${
//                     showForm ? "bg-red-500/10 text-red-400 border-red-500/50 hover:bg-red-500/20" : "bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-transparent hover:shadow-amber-500/20"
//                 }`}
//             >
//                 {showForm ? <><FaTimes /> Cancel Recruitment</> : <><FaUserPlus /> Recruit New Officer</>}
//             </button>
//         </div>

//         {/* --- RECRUITMENT FORM --- */}
//         <AnimatePresence>
//             {showForm && (
//                 <motion.div 
//                     initial={{ height: 0, opacity: 0, y: -20 }} 
//                     animate={{ height: "auto", opacity: 1, y: 0 }} 
//                     exit={{ height: 0, opacity: 0, y: -20 }} 
//                     className="overflow-hidden mb-6 md:mb-10"
//                 >
//                     {/* Responsive Padding: p-4 mobile, p-8 desktop */}
//                     <div className="bg-slate-800/40 backdrop-blur-md p-4 md:p-8 rounded-2xl border border-slate-600 shadow-2xl relative">
//                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent"></div>
//                         <h3 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3">
//                             <span className="w-8 h-8 rounded bg-amber-500/20 text-amber-500 flex items-center justify-center text-sm border border-amber-500/50">01</span>
//                             New Officer Profile Creation
//                         </h3>

//                         {/* Responsive Gap: gap-6 mobile, gap-8 desktop */}
//                         <form onSubmit={handleAddOfficer} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                            
//                             {/* LEFT COLUMN: PHOTO & IDENTITY */}
//                             <div className="lg:col-span-3 flex flex-col items-center gap-6">
//                                 <div className="relative group cursor-pointer w-48 h-48">
//                                     <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-dashed border-slate-500 bg-slate-900/50 flex items-center justify-center relative group-hover:border-amber-500 transition-colors">
//                                         {idPhotoPreview ? (
//                                             <img src={idPhotoPreview} alt="Preview" className="w-full h-full object-cover" />
//                                         ) : (
//                                             <div className="text-center text-slate-500">
//                                                 <FaCamera className="text-3xl mx-auto mb-2 opacity-50" />
//                                                 <span className="text-xs font-bold uppercase">Upload ID Photo</span>
//                                             </div>
//                                         )}
//                                         <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" required />
//                                     </div>
//                                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-300 shadow-md whitespace-nowrap">
//                                         Max size: 2MB
//                                     </div>
//                                 </div>

//                                 <div className="w-full space-y-4 pt-4">
//                                     <div className="relative">
//                                         <FaIdCard className="absolute left-3 top-3.5 text-slate-500" />
//                                         <input name="aadhar" value={formData.aadhar} onChange={handleChange} className="w-full pl-10 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none transition-colors font-mono" placeholder="Aadhaar Number (12 digits)" maxLength={12} required />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* RIGHT COLUMN: DETAILS */}
//                             <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                                
//                                 {/* Personal Info */}
//                                 <div className="md:col-span-2 grid grid-cols-12 gap-4">
//                                     <div className="col-span-3 md:col-span-2">
//                                         <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Title</label>
//                                         <select name="title" value={formData.title} onChange={handleChange} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none">
//                                             <option>Mr.</option><option>Ms.</option><option>Mrs.</option><option>Dr.</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-span-9 md:col-span-5">
//                                         <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">First Name</label>
//                                         <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none" required placeholder="Given Name" />
//                                     </div>
//                                     <div className="col-span-12 md:col-span-5">
//                                         <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Last Name</label>
//                                         <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none" required placeholder="Surname" />
//                                     </div>
//                                 </div>

//                                 {/* Contact */}
//                                 <div className="space-y-1">
//                                     <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Mobile (10 Digits)</label>
//                                     <div className="relative">
//                                         <FaPhoneAlt className="absolute left-3 top-3.5 text-slate-500 text-xs" />
//                                         <input name="mobile" value={formData.mobile} onChange={handleChange} className="w-full pl-9 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none" required placeholder="9876543210" maxLength={10} />
//                                     </div>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Gender</label>
//                                     <select name="gender" onChange={handleChange} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none">
//                                         <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
//                                     </select>
//                                 </div>

//                                 {/* Email & OTP */}
//                                 <div className="md:col-span-2 bg-slate-900/50 border border-slate-700 p-4 rounded-xl">
//                                     <div className="flex flex-col md:flex-row gap-4 items-end">
//                                         <div className="flex-1 w-full">
//                                             <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-2">Official Email {otpSent && <span className="text-green-400 flex items-center gap-1 text-[10px]"><FaCheckCircle/> OTP Sent</span>}</label>
//                                             <div className="relative">
//                                                 <FaEnvelope className="absolute left-3 top-3.5 text-slate-500 text-xs" />
//                                                 <input name="email" value={formData.email} type="email" onChange={handleChange} disabled={otpSent} className={`w-full pl-9 p-3 bg-slate-900 border rounded-lg text-white text-sm outline-none ${otpSent ? 'border-green-500/50 text-green-300' : 'border-slate-700 focus:border-amber-500'}`} required placeholder="officer@police.gov.in" />
//                                             </div>
//                                         </div>
                                        
//                                         {!otpSent && (
//                                             <button type="button" onClick={handleSendOtp} disabled={otpLoading} className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
//                                                 {otpLoading ? "Sending..." : <><FaPaperPlane /> Send OTP</>}
//                                             </button>
//                                         )}

//                                         {otpSent && (
//                                             <div className="w-full md:w-auto">
//                                                 <label className="text-[10px] text-green-400 uppercase font-bold tracking-wider mb-1 block">Verify Code</label>
//                                                 <input value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} className="w-full p-3 bg-slate-800 border border-green-600/50 rounded-lg text-white text-center tracking-widest outline-none focus:border-green-500" placeholder="XXXX" required />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Official Assignment */}
//                                 <div className="space-y-1">
//                                     <label className="text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1 block">Rank / Designation</label>
//                                     <select name="designation" onChange={handleChange} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none">
//                                         <option value="Inspector">Inspector</option>
//                                         <option value="Sub-Inspector">Sub-Inspector</option>
//                                         <option value="Constable">Constable</option>
//                                         <option value="Head Constable">Head Constable</option>
//                                     </select>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <label className="text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1 block">Assign Station</label>
//                                     <select name="station" onChange={handleChange} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none" required>
//                                         <option value="">-- Select --</option>
//                                         {myJurisdiction.map(st => <option key={st} value={st}>{st}</option>)}
//                                     </select>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Set Secure Password</label>
//                                     <div className="relative">
//                                         <FaLock className="absolute left-3 top-3.5 text-slate-500 text-xs" />
//                                         <input name="password" value={formData.password} type="password" onChange={handleChange} className="w-full pl-9 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none" required placeholder="••••••••" />
//                                     </div>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Secret Access Code</label>
//                                     <input name="secretCode" value={formData.secretCode} onChange={handleChange} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none font-mono tracking-wide" required />
//                                 </div>

//                                 <button type="submit" className={`md:col-span-2 py-4 mt-2 rounded-lg font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider ${otpSent ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/20 transform hover:-translate-y-1' : 'bg-slate-700 cursor-not-allowed opacity-50'}`} disabled={!otpSent}>
//                                     <FaUserPlus className="text-lg" /> Confirm & Recruit Officer
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>

//         {/* --- OFFICER LIST --- */}
//         {loading ? <SkeletonLoader type="card" count={6} /> : officers.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700 border-dashed">
//                 <FaUserShield className="text-5xl text-slate-600 mb-4" />
//                 <p className="text-slate-400 text-lg font-medium">No active officers found in your jurisdiction.</p>
//                 <p className="text-slate-500 text-sm">Use the recruit button to add personnel.</p>
//             </div>
//         ) : (
//             // Grid gap: gap-4 mobile, gap-6 desktop
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//                 {officers.map(off => {
//                     const imageUrl = getImageUrl(off.idPhoto);
                    
//                     return (
//                         <motion.div 
//                             key={off._id} 
//                             initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
//                             whileHover={{ y: -5 }}
//                             className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg group relative"
//                         >
//                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            
//                             {/* Header: Responsive Padding p-4 mobile, p-6 desktop */}
//                             <div className="p-4 md:p-6 flex flex-col items-center text-center border-b border-slate-700/50 bg-gradient-to-b from-slate-800 to-slate-900/50">
//                                 <div className="w-20 h-20 rounded-full border-2 border-amber-500/50 p-1 mb-3 shadow-lg shadow-amber-500/10 overflow-hidden">
//                                     {imageUrl ? (
//                                         <img 
//                                             src={imageUrl} 
//                                             alt="Officer" 
//                                             className="w-full h-full rounded-full object-cover"
//                                             onError={(e) => {
//                                                 e.target.onerror = null; 
//                                                 e.target.style.display = 'none'; // Hide broken image
//                                                 e.target.nextSibling.style.display = 'flex'; // Show fallback
//                                             }}
//                                         />
//                                     ) : null}
                                    
//                                     {/* Fallback Icon */}
//                                     <div 
//                                         className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-slate-400 text-2xl"
//                                         style={{ display: imageUrl ? 'none' : 'flex' }}
//                                     >
//                                         <FaUserShield />
//                                     </div>
//                                 </div>
//                                 <h3 className="font-bold text-white text-lg">{off.title || ""} {off.firstName} {off.lastName}</h3>
//                                 <span className="px-3 py-1 rounded-full bg-amber-900/20 text-amber-500 text-[10px] font-bold uppercase tracking-wider mt-2 border border-amber-500/20">{off.designation}</span>
//                             </div>

//                             {/* Body: Responsive Padding p-3 mobile, p-5 desktop */}
//                             <div className="p-3 md:p-5 space-y-3">
//                                 <div className="flex items-center gap-3 text-sm">
//                                     <div className="w-8 h-8 rounded bg-blue-900/20 flex items-center justify-center text-blue-400"><FaBuilding /></div>
//                                     <div>
//                                         <p className="text-[10px] text-slate-500 uppercase font-bold">Station</p>
//                                         <p className="text-slate-200 font-medium">{off.station}</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-3 text-sm">
//                                     <div className="w-8 h-8 rounded bg-slate-700/50 flex items-center justify-center text-slate-400"><FaPhoneAlt /></div>
//                                     <div className="truncate">
//                                         <p className="text-[10px] text-slate-500 uppercase font-bold">Contact</p>
//                                         <p className="text-slate-300 font-mono text-xs">{off.mobile}</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-3 text-sm">
//                                     <div className="w-8 h-8 rounded bg-slate-700/50 flex items-center justify-center text-slate-400"><FaEnvelope /></div>
//                                     <div className="overflow-hidden">
//                                         <p className="text-[10px] text-slate-500 uppercase font-bold">Email</p>
//                                         <p className="text-slate-300 text-xs truncate">{off.email}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Footer: Responsive Padding p-3 mobile, p-4 desktop */}
//                             <div className="p-3 md:p-4 bg-slate-950/30 flex gap-3">
//                                 <button 
//                                     onClick={() => { 
//                                         setTransferModal({ show: true, officerId: off._id, officerName: `${off.firstName} ${off.lastName}`, currentStation: off.station });
//                                         setNewStation(""); 
//                                     }}
//                                     className="flex-1 py-2 text-xs font-bold text-blue-400 bg-blue-900/10 hover:bg-blue-600 hover:text-white rounded border border-blue-500/20 transition-all flex items-center justify-center gap-2"
//                                 >
//                                     <FaExchangeAlt /> Transfer
//                                 </button>
//                                 <button 
//                                     onClick={() => handleDelete(off._id, off.firstName)} 
//                                     className="flex-1 py-2 text-xs font-bold text-red-400 bg-red-900/10 hover:bg-red-600 hover:text-white rounded border border-red-500/20 transition-all flex items-center justify-center gap-2"
//                                 >
//                                     <FaTrashAlt /> Revoke
//                                 </button>
//                             </div>
//                         </motion.div>
//                     );
//                 })}
//             </div>
//         )}

//         {/* ✅ TRANSFER MODAL */}
//         {transferModal.show && createPortal(
//             <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
//                 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-700 p-0 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
//                     {/* Modal Header: p-4 mobile, p-6 desktop */}
//                     <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-4 md:p-6 border-b border-slate-700 flex justify-between items-center">
//                         <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaExchangeAlt className="text-blue-400" /> Transfer Officer</h3>
//                         <button onClick={() => setTransferModal({ show: false })} className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full transition-colors"><FaTimes /></button>
//                     </div>
                    
//                     {/* Modal Body: p-4 mobile, p-6 desktop */}
//                     <div className="p-4 md:p-6 space-y-5">
//                         <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
//                             <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 text-xl"><FaUserShield /></div>
//                             <div>
//                                 <p className="text-[10px] text-slate-500 uppercase font-bold">Officer Name</p>
//                                 <p className="text-white font-bold text-lg">{transferModal.officerName}</p>
//                                 <p className="text-xs text-amber-500 mt-0.5">Currently at: {transferModal.currentStation}</p>
//                             </div>
//                         </div>

//                         <div>
//                             <label className="text-xs text-blue-400 uppercase font-bold mb-2 block tracking-wider">Select New Assignment</label>
//                             <div className="relative">
//                                 <FaMapMarkerAlt className="absolute left-3 top-3.5 text-slate-500"/>
//                                 <select 
//                                     value={newStation} 
//                                     onChange={(e) => setNewStation(e.target.value)} 
//                                     className="w-full pl-9 p-3 bg-black border border-slate-600 rounded-lg text-white outline-none focus:border-blue-500 appearance-none cursor-pointer"
//                                 >
//                                     <option value="">-- Choose New Station --</option>
//                                     {myJurisdiction.filter(s => s !== transferModal.currentStation).map(st => (
//                                         <option key={st} value={st}>{st}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Modal Footer: p-4 mobile, p-6 desktop */}
//                     <div className="p-4 md:p-6 bg-slate-950/30 flex gap-3 border-t border-slate-800">
//                         <button onClick={() => setTransferModal({ show: false })} className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold text-sm transition-colors">Cancel</button>
//                         <button onClick={handleTransferSubmit} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"><FaSave /> Confirm Transfer</button>
//                     </div>
//                 </motion.div>
//             </div>,
//             document.body
//         )}
//     </div>
//   );
// };

// export default SeniorManageOfficers;













import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonLoader from "../components/common/SkeletonLoader";
import { 
  FaUserShield, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, 
  FaTrashAlt, FaExchangeAlt, FaUserPlus, FaTimes, FaSave, 
  FaIdCard, FaCamera, FaCheckCircle, FaPaperPlane, FaLock, FaBuilding
} from "react-icons/fa";

// ✅ Import Base URL Config
import { BASE_URL } from "../config"; 

const SeniorManageOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [myJurisdiction, setMyJurisdiction] = useState([]);
  
  // Transfer Modal State
  const [transferModal, setTransferModal] = useState({ show: false, officerId: null, officerName: "", currentStation: "" });
  const [newStation, setNewStation] = useState("");

  // OTP & Verification State
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  
  // Image Upload State
  const [idFile, setIdFile] = useState(null);
  const [idPhotoPreview, setIdPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "Mr.", firstName: "", lastName: "", email: "", password: "", 
    mobile: "", gender: "Male", aadhar: "", station: "", designation: "Inspector", 
    secretCode: "POLICE123"
  });

  const fetchOfficers = async () => {
    try {
      const userInfoString = localStorage.getItem("userInfo");
      if (!userInfoString) { setLoading(false); return; }

      const userInfo = JSON.parse(userInfoString);
      const seniorStations = userInfo.station ? userInfo.station.split(", ") : [];
      setMyJurisdiction(seniorStations);

      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(`${BASE_URL}/api/users/officers`, config);
      
      const filteredOfficers = data.filter(off => seniorStations.includes(off.station));
      setOfficers(filteredOfficers);
      setLoading(false);
    } catch (error) { 
        toast.error("Failed to fetch officers"); 
        setLoading(false); 
    }
  };

  useEffect(() => { fetchOfficers(); }, []);

  // --- HANDLERS (UNCHANGED) ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdFile(file);
      setIdPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email || !formData.email.includes("@")) return toast.error("Enter a valid email first.");
    setOtpLoading(true);
    try {
        await axios.post(`${BASE_URL}/api/users/send-otp`, { email: formData.email, type: 'signup' });
        toast.success(`OTP Sent to ${formData.email}`);
        setOtpSent(true);
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
        setOtpLoading(false);
    }
  };

  const handleAddOfficer = async (e) => {
    e.preventDefault();
    if (!otpSent) return toast.error("Please verify email via OTP first!");
    if (!enteredOtp) return toast.error("Enter the OTP code sent to email");
    if (!idFile) return toast.error("Officer ID Photo is required.");
    if (formData.mobile.length !== 10) return toast.error("Mobile number must be 10 digits");
    if (formData.aadhar.length !== 12) return toast.error("Aadhaar number must be 12 digits");

    const loadingToast = toast.loading("Creating Officer Profile...");
    try {
      const payload = new FormData();
      Object.keys(formData).forEach(key => payload.append(key, formData[key]));
      payload.append("role", "police");
      payload.append("otp", enteredOtp); 
      payload.append("idPhoto", idFile); 

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      await axios.post(`${BASE_URL}/api/users/signup`, payload, config);

      toast.dismiss(loadingToast);
      toast.success("Officer Recruited Successfully");
      setShowForm(false);
      setFormData({
          title: "Mr.", firstName: "", lastName: "", email: "", password: "", mobile: "", 
          gender: "Male", aadhar: "", station: "", designation: "Inspector", secretCode: "POLICE123"
      });
      setOtpSent(false); setEnteredOtp(""); setIdFile(null); setIdPhotoPreview(null);
      fetchOfficers();
    } catch (error) { 
        toast.dismiss(loadingToast);
        toast.error(error.response?.data?.message || "Failed to add officer"); 
    }
  };

  const handleTransferSubmit = async () => {
      if(!newStation) return toast.error("Select a new station");
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.put(`${BASE_URL}/api/users/transfer/${transferModal.officerId}`, { newStation }, config);
        toast.success(`Officer Transferred to ${newStation}`);
        setTransferModal({ show: false, officerId: null, officerName: "", currentStation: "" });
        fetchOfficers();
      } catch (error) { toast.error("Transfer Failed"); }
  };

  const handleDelete = async (id, name) => {
    if(!window.confirm(`Confirm revocation of badge for ${name}?`)) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(`${BASE_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
      toast.success("Officer Removed from Force");
      fetchOfficers();
    } catch (error) { toast.error("Action Failed"); }
  };

  const getImageUrl = (path) => {
      if (!path) return null;
      if (path.startsWith("http")) return path;
      const cleanPath = path.replace(/\\/g, "/");
      return `${BASE_URL}/${cleanPath}`;
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans p-2 md:p-4">
        
        {/* --- PAGE HEADER (Enhanced UI) --- */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="relative bg-gradient-to-r from-slate-900 to-slate-800 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl mb-8 overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center gap-3 uppercase tracking-wide">
                        <FaUserShield className="text-amber-500" /> Force Command Center
                    </h2>
                    
                    {/* Clean Jurisdiction Chips */}
                    <div className="mt-4">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <FaBuilding /> Active Jurisdictions
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {myJurisdiction.map((station, idx) => (
                                <span key={idx} className="bg-slate-800 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-600 shadow-sm hover:border-amber-500 transition-colors cursor-default">
                                    {station}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(!showForm)} 
                    className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 border whitespace-nowrap ${
                        showForm ? "bg-red-500/10 text-red-400 border-red-500/50 hover:bg-red-500/20" : "bg-gradient-to-r from-amber-600 to-orange-600 text-white border-transparent hover:shadow-amber-500/30"
                    }`}
                >
                    {showForm ? <><FaTimes /> Cancel Recruitment</> : <><FaUserPlus /> Recruit New Officer</>}
                </motion.button>
            </div>
        </motion.div>

        {/* --- RECRUITMENT FORM (Animated) --- */}
        <AnimatePresence>
            {showForm && (
                <motion.div 
                    initial={{ height: 0, opacity: 0, y: -20 }} 
                    animate={{ height: "auto", opacity: 1, y: 0 }} 
                    exit={{ height: 0, opacity: 0, y: -20 }} 
                    className="overflow-hidden mb-10"
                >
                    <div className="bg-slate-900/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent"></div>
                        
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 border-b border-slate-700 pb-4">
                            <span className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-black text-sm shadow-lg">01</span>
                            New Officer Enrollment
                        </h3>

                        <form onSubmit={handleAddOfficer} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* LEFT: PHOTO UPLOAD */}
                            <div className="lg:col-span-3 flex flex-col items-center gap-6">
                                <div className="relative group cursor-pointer w-48 h-48">
                                    <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-dashed border-slate-600 bg-slate-800/50 flex items-center justify-center relative group-hover:border-amber-500 transition-colors">
                                        {idPhotoPreview ? (
                                            <img src={idPhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center text-slate-500">
                                                <FaCamera className="text-3xl mx-auto mb-2 opacity-50" />
                                                <span className="text-xs font-bold uppercase">Upload ID</span>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" required />
                                    </div>
                                    <p className="text-center text-[10px] text-slate-500 mt-2">Max Size: 2MB (JPG/PNG)</p>
                                </div>

                                <div className="w-full">
                                    <label className="text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1 block">Aadhaar Number</label>
                                    <div className="relative">
                                        <FaIdCard className="absolute left-3 top-3.5 text-slate-500" />
                                        <input name="aadhar" value={formData.aadhar} onChange={handleChange} className="w-full pl-10 p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none font-mono" placeholder="12 Digit UID" maxLength={12} required />
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: FORM FIELDS */}
                            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Personal Info */}
                                <div className="md:col-span-2 grid grid-cols-12 gap-4">
                                    <div className="col-span-3">
                                        <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Title</label>
                                        <select name="title" value={formData.title} onChange={handleChange} className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm outline-none">
                                            <option>Mr.</option><option>Ms.</option><option>Mrs.</option>
                                        </select>
                                    </div>
                                    <div className="col-span-9 md:col-span-5">
                                        <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">First Name</label>
                                        <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none" required placeholder="Given Name" />
                                    </div>
                                    <div className="col-span-12 md:col-span-4">
                                        <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Last Name</label>
                                        <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none" required placeholder="Surname" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Mobile Number</label>
                                    <div className="relative">
                                        <FaPhoneAlt className="absolute left-3 top-3.5 text-slate-500 text-xs" />
                                        <input name="mobile" value={formData.mobile} onChange={handleChange} className="w-full pl-9 p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none font-mono" required placeholder="9876543210" maxLength={10} />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Gender</label>
                                    <select name="gender" onChange={handleChange} className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm outline-none">
                                        <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Email & Verification */}
                                <div className="md:col-span-2 bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                                    <div className="flex flex-col md:flex-row gap-4 items-end">
                                        <div className="flex-1 w-full">
                                            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-2">Official Email {otpSent && <span className="text-green-400 flex items-center gap-1 text-[10px]"><FaCheckCircle/> Verified</span>}</label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-3 top-3.5 text-slate-500 text-xs" />
                                                <input name="email" value={formData.email} type="email" onChange={handleChange} disabled={otpSent} className={`w-full pl-9 p-3 bg-slate-950 border rounded-lg text-white text-sm outline-none ${otpSent ? 'border-green-500/50 text-green-300' : 'border-slate-700 focus:border-amber-500'}`} required placeholder="officer@police.gov.in" />
                                            </div>
                                        </div>
                                        
                                        {!otpSent ? (
                                            <button type="button" onClick={handleSendOtp} disabled={otpLoading} className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 h-[46px]">
                                                {otpLoading ? "Sending..." : <><FaPaperPlane /> Send OTP</>}
                                            </button>
                                        ) : (
                                            <div className="w-full md:w-32">
                                                <label className="text-[10px] text-green-400 uppercase font-bold tracking-wider mb-1 block">OTP Code</label>
                                                <input value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} className="w-full p-3 bg-slate-950 border border-green-600/50 rounded-lg text-white text-center tracking-widest outline-none focus:border-green-500 font-mono" placeholder="XXXX" required />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Assignment Details */}
                                <div>
                                    <label className="text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1 block">Designation</label>
                                    <select name="designation" onChange={handleChange} className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none">
                                        <option value="Inspector">Inspector</option>
                                        <option value="Sub-Inspector">Sub-Inspector</option>
                                        <option value="Constable">Constable</option>
                                        <option value="Head Constable">Head Constable</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1 block">Assign Station</label>
                                    <select name="station" onChange={handleChange} className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none" required>
                                        <option value="">-- Select --</option>
                                        {myJurisdiction.map(st => <option key={st} value={st}>{st}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Secure Password</label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-3.5 text-slate-500 text-xs" />
                                        <input name="password" value={formData.password} type="password" onChange={handleChange} className="w-full pl-9 p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none" required placeholder="••••••••" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">Secret Code</label>
                                    <input name="secretCode" value={formData.secretCode} onChange={handleChange} className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:border-amber-500 outline-none font-mono" required />
                                </div>

                                <button type="submit" className={`md:col-span-2 py-4 mt-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider ${otpSent ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/20 transform hover:-translate-y-1' : 'bg-slate-700 cursor-not-allowed opacity-50'}`} disabled={!otpSent}>
                                    <FaUserPlus className="text-lg" /> Confirm Recruitment
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* --- OFFICER GRID (Modern Cards) --- */}
        {loading ? <SkeletonLoader type="card" count={6} /> : officers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-800/30 rounded-3xl border border-slate-700 border-dashed">
                <FaUserShield className="text-5xl text-slate-600 mb-4" />
                <p className="text-slate-400 text-lg font-medium">No personnel found.</p>
                <button onClick={() => setShowForm(true)} className="text-amber-500 text-sm hover:underline mt-2">Recruit your first officer</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {officers.map(off => {
                    const imageUrl = getImageUrl(off.idPhoto);
                    return (
                        <motion.div 
                            key={off._id} 
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl hover:shadow-2xl hover:border-amber-500/30 transition-all group"
                        >
                            {/* Card Header */}
                            <div className="p-6 flex flex-col items-center text-center bg-gradient-to-b from-slate-800/50 to-transparent relative">
                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-slate-950/50 rounded text-[10px] text-slate-400 border border-slate-700">{off.designation}</div>
                                
                                <div className="w-24 h-24 rounded-full border-4 border-slate-800 p-1 mb-3 shadow-lg overflow-hidden relative">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Officer" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-700 flex items-center justify-center text-3xl text-slate-500"><FaUserShield /></div>
                                    )}
                                </div>
                                <h3 className="font-bold text-white text-lg tracking-wide">{off.firstName} {off.lastName}</h3>
                                <p className="text-xs text-amber-500 font-mono mt-1">{off.station}</p>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-4 bg-slate-950/20">
                                <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                                    <span className="text-slate-500 text-xs uppercase font-bold">Mobile</span>
                                    <span className="text-slate-300 font-mono">{off.mobile}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                                    <span className="text-slate-500 text-xs uppercase font-bold">Email</span>
                                    <span className="text-slate-300 text-xs truncate w-32 text-right" title={off.email}>{off.email}</span>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="p-4 grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => { 
                                        setTransferModal({ show: true, officerId: off._id, officerName: `${off.firstName} ${off.lastName}`, currentStation: off.station });
                                        setNewStation(""); 
                                    }}
                                    className="py-2 text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-600 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2 border border-blue-500/20"
                                >
                                    <FaExchangeAlt /> Transfer
                                </button>
                                <button 
                                    onClick={() => handleDelete(off._id, off.firstName)} 
                                    className="py-2 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-600 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2 border border-red-500/20"
                                >
                                    <FaTrashAlt /> Remove
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        )}

        {/* --- TRANSFER MODAL (Styled) --- */}
        {transferModal.show && createPortal(
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-6 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaExchangeAlt className="text-blue-400" /> Transfer Request</h3>
                        <button onClick={() => setTransferModal({ show: false })} className="text-slate-400 hover:text-white"><FaTimes /></button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 text-xl"><FaUserShield /></div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Officer</p>
                                <p className="text-white font-bold">{transferModal.officerName}</p>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-blue-400 uppercase font-bold mb-2 block tracking-wider">New Posting Location</label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-3.5 text-slate-500"/>
                                <select 
                                    value={newStation} 
                                    onChange={(e) => setNewStation(e.target.value)} 
                                    className="w-full pl-9 p-3 bg-black border border-slate-600 rounded-xl text-white outline-none focus:border-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value="">-- Select Station --</option>
                                    {myJurisdiction.filter(s => s !== transferModal.currentStation).map(st => (
                                        <option key={st} value={st}>{st}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-slate-950/50 flex gap-3">
                        <button onClick={() => setTransferModal({ show: false })} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm">Cancel</button>
                        <button onClick={handleTransferSubmit} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20">Confirm</button>
                    </div>
                </motion.div>
            </div>,
            document.body
        )}
    </div>
  );
};

export default SeniorManageOfficers;