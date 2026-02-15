
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { regularDesignations, seniorDesignations, policeStations } from "../data/mockData";
// import { toast, Toaster } from "react-hot-toast";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { FaPaperPlane, FaCheckCircle, FaIdCard, FaTimes, FaExclamationCircle } from "react-icons/fa";
// import { BASE_URL } from "../config"; 

// // --- 🔔 REPEATED NOTIFICATION LOGIC ---
// const playNotificationSound = () => {
//     const audio = new Audio('/notification.mp3');
//     audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//     playNotificationSound();
    
//     toast.custom((t) => (
//         <motion.div 
//             initial={{ opacity: 0, y: -50, scale: 0.9 }}
//             animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//             className={`
//                 flex items-center w-full max-w-[90vw] md:max-w-sm 
//                 ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'}
//                 rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto
//             `}
//         >
//             <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//                 {type === 'success' ? <FaCheckCircle size={16} /> : <FaExclamationCircle size={16} />}
//             </div>
//             <div className="flex-1 min-w-0">
//                 <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
//                     {title}
//                 </h4>
//                 <p className="text-xs text-slate-300 mt-0.5 leading-tight truncate">
//                     {message}
//                 </p>
//             </div>
//             <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//                 <FaTimes size={12} />
//             </button>
//         </motion.div>
//     ), { duration: 3500, position: 'top-center' });
// };

// const Signup = () => {
//   const [role, setRole] = useState(null);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedStations, setSelectedStations] = useState([]);
//   const [idFile, setIdFile] = useState(null); 

//   const [formData, setFormData] = useState({
//     title: "Mr.", firstName: "", lastName: "", gender: "", aadhar: "", 
//     email: "", mobile: "", password: "", station: "", designation: "", secretCode: "", otp: ""
//   });

//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleFileChange = (e) => setIdFile(e.target.files[0]);

//   const handleStationSelect = (e) => {
//     const value = e.target.value;
//     if (value && !selectedStations.includes(value)) setSelectedStations([...selectedStations, value]);
//   };

//   const removeStation = (stationToRemove) => {
//     setSelectedStations(selectedStations.filter(s => s !== stationToRemove));
//   };

//   const handleSendOtp = async () => {
//       if(!formData.email) return triggerNotification('error', 'Missing Email', "Enter email first.");
//       try {
//           setLoading(true);
//           await axios.post(`${BASE_URL}/api/users/send-otp`, { email: formData.email, type: 'signup' });
//           triggerNotification('success', 'OTP Sent', `Code sent to ${formData.email}`);
//           setOtpSent(true);
//           setLoading(false);
//       } catch (error) {
//           triggerNotification('error', 'OTP Failed', error.response?.data?.message || "Could not send OTP.");
//           setLoading(false);
//       }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if(!otpSent) return triggerNotification('error', 'Verification', "Verify email via OTP first!");
//     if(!formData.otp) return triggerNotification('error', 'Verification', "Enter OTP code.");
//     if(!idFile) return triggerNotification('error', 'ID Proof', "Upload ID Proof photo.");

//     if (formData.mobile.length !== 10) return triggerNotification('error', 'Invalid Input', "Mobile must be 10 digits.");
//     if (formData.aadhar && formData.aadhar.length !== 12) return triggerNotification('error', 'Invalid Input', "Aadhaar must be 12 digits.");

//     setLoading(true);

//     try {
//       let finalStation = formData.station;
//       if (role === 'senior') {
//         if(selectedStations.length === 0) throw new Error("Select jurisdiction.");
//         finalStation = selectedStations.join(", ");
//       }

//       const data = new FormData();
//       data.append("role", role);
//       data.append("title", formData.title);
//       data.append("firstName", formData.firstName);
//       data.append("lastName", formData.lastName);
//       data.append("email", formData.email);
//       data.append("password", formData.password);
//       data.append("mobile", formData.mobile);
//       data.append("gender", formData.gender);
//       data.append("otp", formData.otp);
      
//       if (formData.aadhar) data.append("aadhar", formData.aadhar);
//       if (finalStation) data.append("station", finalStation);
//       if (formData.designation) data.append("designation", formData.designation);
//       if (formData.secretCode) data.append("secretCode", formData.secretCode);

//       data.append("idPhoto", idFile);

//       const response = await axios.post(`${BASE_URL}/api/users/signup`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       triggerNotification('success', 'Registered!', `Created: ${formData.firstName} ${formData.lastName}`);
      
//       localStorage.setItem("userInfo", JSON.stringify(response.data));
//       setTimeout(() => navigate("/login"), 1500);

//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message || "Registration Failed!";
//       triggerNotification('error', 'Failed', errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster containerStyle={{ top: 20 }} />

//       <div className="flex-1 flex flex-col justify-center items-center px-4 py-24 relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black -z-10"></div>

//         {!role && (
//           <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in-up">
//             <motion.div whileHover={{ scale: 1.05 }} onClick={() => setRole("citizen")} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-2xl cursor-pointer hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/30 transition-all text-center group">
//               <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">👤</div>
//               <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-blue-400">Citizen</h2>
//               <p className="text-gray-400 text-xs md:text-sm">Report crimes, track status, legal aid.</p>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} onClick={() => setRole("police")} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-2xl cursor-pointer hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-900/30 transition-all text-center group">
//               <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">👮‍♂️</div>
//               <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-purple-400">Police Official</h2>
//               <p className="text-gray-400 text-xs md:text-sm">Constables, Inspectors, Field Officers.</p>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} onClick={() => setRole("senior")} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-2xl cursor-pointer hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-900/30 transition-all text-center group">
//               <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">🎖️</div>
//               <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-amber-400">Senior Official</h2>
//               <p className="text-gray-400 text-xs md:text-sm">SP, IGP, DGP (High Command).</p>
//             </motion.div>
//           </div>
//         )}

//         {role && (
//           // ✅ Mobile Padding Fix: p-5 on mobile, p-10 on desktop
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/60 backdrop-blur-xl p-5 md:p-10 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-3xl">
//             <div className="flex justify-between items-center mb-6 md:mb-8">
//                 <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 capitalize">
//                     {role === 'senior' ? "High Command Registration" : `${role} Registration`}
//                 </h2>
//                 <button onClick={() => setRole(null)} className="text-xs md:text-sm text-gray-400 hover:text-white underline">Change Role</button>
//             </div>

//             <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1">First Name</label>
//                 <div className="flex gap-2">
//                     <select name="title" value={formData.title} onChange={handleChange} className="bg-gray-900/50 border border-gray-600 rounded-lg px-2 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white w-16 md:w-20 text-xs md:text-sm">
//                         {titles.map(t => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                     <input required name="firstName" onChange={handleChange} type="text" className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="First Name" />
//                 </div>
//               </div>

//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1">Last Name</label>
//                 <input required name="lastName" onChange={handleChange} type="text" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" />
//               </div>
              
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1">Gender</label>
//                 <select required name="gender" onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm">
//                     <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
//                 </select>
//               </div>

//               <div className="col-span-2 md:col-span-1">
//                   <label className="block text-gray-400 text-xs md:text-sm mb-1">Mobile Number</label>
//                   <input required name="mobile" onChange={handleChange} type="tel" maxLength="10" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="10-digit number" />
//               </div>

//               <div className="col-span-2 grid grid-cols-3 gap-2 items-end">
//                   <div className="col-span-2">
//                     <label className="block text-gray-400 text-xs md:text-sm mb-1">Email Address</label>
//                     <input required name="email" onChange={handleChange} type="email" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="name@example.com" />
//                   </div>
//                   <button type="button" onClick={handleSendOtp} disabled={otpSent || loading} className={`h-[42px] md:h-[50px] rounded-lg font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${otpSent ? "bg-green-600 text-white cursor-default" : "bg-blue-600 hover:bg-blue-500 text-white"}`}>
//                     {otpSent ? <><FaCheckCircle /> Sent</> : <><FaPaperPlane /> Send OTP</>}
//                   </button>
//               </div>

//               {otpSent && (
//                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="col-span-2">
//                       <label className="block text-green-400 text-xs md:text-sm mb-1 font-bold">Enter Verification Code</label>
//                       <input required name="otp" onChange={handleChange} type="text" className="w-full bg-gray-900/50 border border-green-500/50 rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-green-500 text-white tracking-widest text-center text-lg" placeholder="XXXXXX" />
//                   </motion.div>
//               )}

//               {/* ID Proof Upload */}
//               <div className="col-span-2">
//                   <label className="block text-gray-400 text-xs md:text-sm mb-1">Passport ID/Profile Photo</label>
//                   <div className="relative border border-dashed border-gray-600 bg-gray-800/50 rounded-lg p-3 md:p-4 text-center cursor-pointer hover:border-blue-500 transition-all group">
//                       <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
//                       <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-white">
//                           <FaIdCard className="text-2xl md:text-3xl mb-1 md:mb-2" />
//                           <p className="text-xs md:text-sm">{idFile ? idFile.name : "Click to Upload Photo"}</p>
//                       </div>
//                   </div>
//               </div>

//               {role === "citizen" && (
//                 <div className="col-span-2">
//                     <label className="block text-gray-400 text-xs md:text-sm mb-1">Aadhaar Number</label>
//                     <input required name="aadhar" onChange={handleChange} type="text" maxLength="12" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="12-digit number" />
//                 </div>
//               )}

//               {(role === "police" || role === "senior") && (
//                 <>
//                     <div className="col-span-2 md:col-span-1">
//                         <label className="block text-gray-400 text-xs md:text-sm mb-1">Designation</label>
//                         <select required name="designation" onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-purple-500 text-white text-sm">
//                             <option value="">Select Rank</option>
//                             {(role === 'senior' ? seniorDesignations : regularDesignations).map(rank => <option key={rank} value={rank}>{rank}</option>)}
//                         </select>
//                     </div>

//                     {role === 'senior' ? (
//                         <div className="col-span-2 md:col-span-1">
//                             <label className="block text-gray-400 text-xs md:text-sm mb-1">Jurisdiction</label>
//                             <select onChange={handleStationSelect} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-amber-500 text-white text-sm">
//                                 <option value="">+ Add Station</option>
//                                 {policeStations.map(station => <option key={station} value={station}>{station}</option>)}
//                             </select>
//                             <div className="flex flex-wrap gap-2 mt-2">
//                                 {selectedStations.map(s => (
//                                     <span key={s} className="bg-amber-900/50 text-amber-200 text-[10px] md:text-xs px-2 py-1 rounded border border-amber-500/30 flex items-center gap-1">{s} <button type="button" onClick={() => removeStation(s)} className="text-amber-500 hover:text-white font-bold">×</button></span>
//                                 ))}
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="col-span-2 md:col-span-1">
//                             <label className="block text-gray-400 text-xs md:text-sm mb-1">Police Station</label>
//                             <select required name="station" onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-purple-500 text-white text-sm">
//                                 <option value="">Select Station</option>
//                                 {policeStations.map(station => <option key={station} value={station}>{station}</option>)}
//                             </select>
//                         </div>
//                     )}

//                     <div className="col-span-2">
//                         <label className={`block text-xs md:text-sm mb-1 font-bold ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>{role === 'senior' ? "High Command Code" : "Secret Access Code"}</label>
//                         <input required name="secretCode" onChange={handleChange} type="password" className={`w-full bg-gray-900/50 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 outline-none text-white text-sm ${role === 'senior' ? 'border-amber-500/50 focus:border-amber-400' : 'border-purple-500/50 focus:border-purple-400'}`} />
//                     </div>
//                 </>
//               )}

//               <div className="col-span-2">
//                   <label className="block text-gray-400 text-xs md:text-sm mb-1">Password</label>
//                   <input required name="password" onChange={handleChange} type="password" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" />
//               </div>

//               <div className="col-span-2 mt-4">
//                 <button type="submit" disabled={loading} className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 ${role === 'citizen' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : role === 'senior' ? 'bg-gradient-to-r from-amber-600 to-orange-600' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}>
//                     {loading ? "Verifying..." : "Verify OTP & Register"}
//                 </button>
//               </div>

//             </form>
            
//             <p className="mt-4 md:mt-6 text-gray-400 text-center text-xs md:text-base">Already have an account? <Link to="/login" className="text-white hover:underline">Login here</Link></p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signup;



















// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { FaPaperPlane, FaCheckCircle, FaIdCard, FaTimes, FaExclamationCircle } from "react-icons/fa";
// import { BASE_URL } from "../config"; 

// // --- NOTIFICATION HELPERS ---
// const playNotificationSound = () => {
//     const audio = new Audio('/notification.mp3');
//     audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//     playNotificationSound();
//     toast.custom((t) => (
//         <motion.div 
//             initial={{ opacity: 0, y: -50, scale: 0.9 }}
//             animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//             className={`flex items-center w-full max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//         >
//             <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//                 {type === 'success' ? <FaCheckCircle size={16} /> : <FaExclamationCircle size={16} />}
//             </div>
//             <div className="flex-1 min-w-0">
//                 <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//                 <p className="text-xs text-slate-300 mt-0.5 leading-tight truncate">{message}</p>
//             </div>
//             <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800"><FaTimes size={12} /></button>
//         </motion.div>
//     ), { duration: 3500, position: 'top-center' });
// };

// const Signup = () => {
//   const [role, setRole] = useState(null);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedStations, setSelectedStations] = useState([]);
//   const [idFile, setIdFile] = useState(null); 

//   // ✅ DYNAMIC DATA STATES
//   const [policeStationsList, setPoliceStationsList] = useState([]);
//   const [regularDesignations, setRegularDesignations] = useState([]);
//   const [seniorDesignations, setSeniorDesignations] = useState([]);

//   const [formData, setFormData] = useState({
//     title: "Mr.", firstName: "", lastName: "", gender: "", aadhar: "", 
//     email: "", mobile: "", password: "", station: "", designation: "", secretCode: "", otp: ""
//   });

//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];

//   // ✅ FETCH DATA FROM BACKEND ON LOAD
//   useEffect(() => {
//     const fetchMetadata = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
//             setPoliceStationsList(data.stations.map(s => s.name));
//             setRegularDesignations(data.designations.regular);
//             setSeniorDesignations(data.designations.senior);
//         } catch (error) {
//             console.error("Failed to load form data:", error);
//             triggerNotification('error', 'Network Error', 'Failed to load options from server.');
//         }
//     };
//     fetchMetadata();
//   }, []);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleFileChange = (e) => setIdFile(e.target.files[0]);

//   const handleStationSelect = (e) => {
//     const value = e.target.value;
//     if (value && !selectedStations.includes(value)) setSelectedStations([...selectedStations, value]);
//   };

//   const removeStation = (stationToRemove) => {
//     setSelectedStations(selectedStations.filter(s => s !== stationToRemove));
//   };

//   const handleSendOtp = async () => {
//       if(!formData.email) return triggerNotification('error', 'Missing Email', "Enter email first.");
//       try {
//           setLoading(true);
//           await axios.post(`${BASE_URL}/api/users/send-otp`, { email: formData.email, type: 'signup' });
//           triggerNotification('success', 'OTP Sent', `Code sent to ${formData.email}`);
//           setOtpSent(true);
//           setLoading(false);
//       } catch (error) {
//           triggerNotification('error', 'OTP Failed', error.response?.data?.message || "Could not send OTP.");
//           setLoading(false);
//       }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if(!otpSent) return triggerNotification('error', 'Verification', "Verify email via OTP first!");
//     if(!formData.otp) return triggerNotification('error', 'Verification', "Enter OTP code.");
//     if(!idFile) return triggerNotification('error', 'ID Proof', "Upload ID Proof photo.");

//     if (formData.mobile.length !== 10) return triggerNotification('error', 'Invalid Input', "Mobile must be 10 digits.");
//     if (formData.aadhar && formData.aadhar.length !== 12) return triggerNotification('error', 'Invalid Input', "Aadhaar must be 12 digits.");

//     setLoading(true);

//     try {
//       let finalStation = formData.station;
//       if (role === 'senior') {
//         if(selectedStations.length === 0) throw new Error("Select jurisdiction.");
//         finalStation = selectedStations.join(", ");
//       }

//       const data = new FormData();
//       data.append("role", role);
//       data.append("title", formData.title);
//       data.append("firstName", formData.firstName);
//       data.append("lastName", formData.lastName);
//       data.append("email", formData.email);
//       data.append("password", formData.password);
//       data.append("mobile", formData.mobile);
//       data.append("gender", formData.gender);
//       data.append("otp", formData.otp);
      
//       if (formData.aadhar) data.append("aadhar", formData.aadhar);
//       if (finalStation) data.append("station", finalStation);
//       if (formData.designation) data.append("designation", formData.designation);
//       if (formData.secretCode) data.append("secretCode", formData.secretCode);

//       data.append("idPhoto", idFile);

//       const response = await axios.post(`${BASE_URL}/api/users/signup`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       triggerNotification('success', 'Registered!', `Created: ${formData.firstName} ${formData.lastName}`);
      
//       localStorage.setItem("userInfo", JSON.stringify(response.data));
//       setTimeout(() => navigate("/login"), 1500);

//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message || "Registration Failed!";
//       triggerNotification('error', 'Failed', errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster containerStyle={{ top: 20 }} />

//       <div className="flex-1 flex flex-col justify-center items-center px-4 py-24 relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black -z-10"></div>

//         {!role && (
//           <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in-up">
//             <motion.div whileHover={{ scale: 1.05 }} onClick={() => setRole("citizen")} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-2xl cursor-pointer hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/30 transition-all text-center group">
//               <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">👤</div>
//               <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-blue-400">Citizen</h2>
//               <p className="text-gray-400 text-xs md:text-sm">Report crimes, track status, legal aid.</p>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} onClick={() => setRole("police")} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-2xl cursor-pointer hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-900/30 transition-all text-center group">
//               <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">👮‍♂️</div>
//               <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-purple-400">Police Official</h2>
//               <p className="text-gray-400 text-xs md:text-sm">Constables, Inspectors, Field Officers.</p>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} onClick={() => setRole("senior")} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-2xl cursor-pointer hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-900/30 transition-all text-center group">
//               <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">🎖️</div>
//               <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-amber-400">Senior Official</h2>
//               <p className="text-gray-400 text-xs md:text-sm">SP, IGP, DGP (High Command).</p>
//             </motion.div>
//           </div>
//         )}

//         {role && (
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/60 backdrop-blur-xl p-5 md:p-10 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-3xl">
//             <div className="flex justify-between items-center mb-6 md:mb-8">
//                 <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 capitalize">
//                     {role === 'senior' ? "High Command Registration" : `${role} Registration`}
//                 </h2>
//                 <button onClick={() => setRole(null)} className="text-xs md:text-sm text-gray-400 hover:text-white underline">Change Role</button>
//             </div>

//             <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1">First Name</label>
//                 <div className="flex gap-2">
//                     <select name="title" value={formData.title} onChange={handleChange} className="bg-gray-900/50 border border-gray-600 rounded-lg px-2 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white w-16 md:w-20 text-xs md:text-sm">
//                         {titles.map(t => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                     <input required name="firstName" onChange={handleChange} type="text" className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="First Name" />
//                 </div>
//               </div>

//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1">Last Name</label>
//                 <input required name="lastName" onChange={handleChange} type="text" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" />
//               </div>
              
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1">Gender</label>
//                 <select required name="gender" onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm">
//                     <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
//                 </select>
//               </div>

//               <div className="col-span-2 md:col-span-1">
//                   <label className="block text-gray-400 text-xs md:text-sm mb-1">Mobile Number</label>
//                   <input required name="mobile" onChange={handleChange} type="tel" maxLength="10" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="10-digit number" />
//               </div>

//               <div className="col-span-2 grid grid-cols-3 gap-2 items-end">
//                   <div className="col-span-2">
//                     <label className="block text-gray-400 text-xs md:text-sm mb-1">Email Address</label>
//                     <input required name="email" onChange={handleChange} type="email" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="name@example.com" />
//                   </div>
//                   <button type="button" onClick={handleSendOtp} disabled={otpSent || loading} className={`h-[42px] md:h-[50px] rounded-lg font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${otpSent ? "bg-green-600 text-white cursor-default" : "bg-blue-600 hover:bg-blue-500 text-white"}`}>
//                     {otpSent ? <><FaCheckCircle /> Sent</> : <><FaPaperPlane /> Send OTP</>}
//                   </button>
//               </div>

//               {otpSent && (
//                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="col-span-2">
//                       <label className="block text-green-400 text-xs md:text-sm mb-1 font-bold">Enter Verification Code</label>
//                       <input required name="otp" onChange={handleChange} type="text" className="w-full bg-gray-900/50 border border-green-500/50 rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-green-500 text-white tracking-widest text-center text-lg" placeholder="XXXXXX" />
//                   </motion.div>
//               )}

//               {/* ID Proof Upload */}
//               <div className="col-span-2">
//                   <label className="block text-gray-400 text-xs md:text-sm mb-1">Passport ID/Profile Photo</label>
//                   <div className="relative border border-dashed border-gray-600 bg-gray-800/50 rounded-lg p-3 md:p-4 text-center cursor-pointer hover:border-blue-500 transition-all group">
//                       <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
//                       <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-white">
//                           <FaIdCard className="text-2xl md:text-3xl mb-1 md:mb-2" />
//                           <p className="text-xs md:text-sm">{idFile ? idFile.name : "Click to Upload Photo"}</p>
//                       </div>
//                   </div>
//               </div>

//               {role === "citizen" && (
//                 <div className="col-span-2">
//                     <label className="block text-gray-400 text-xs md:text-sm mb-1">Aadhaar Number</label>
//                     <input required name="aadhar" onChange={handleChange} type="text" maxLength="12" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="12-digit number" />
//                 </div>
//               )}

//               {(role === "police" || role === "senior") && (
//                 <>
//                     <div className="col-span-2 md:col-span-1">
//                         <label className="block text-gray-400 text-xs md:text-sm mb-1">Designation</label>
//                         <select required name="designation" onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-purple-500 text-white text-sm">
//                             <option value="">Select Rank</option>
//                             {/* ✅ POPULATED DYNAMICALLY */}
//                             {(role === 'senior' ? seniorDesignations : regularDesignations).map(rank => <option key={rank} value={rank}>{rank}</option>)}
//                         </select>
//                     </div>

//                     {role === 'senior' ? (
//                         <div className="col-span-2 md:col-span-1">
//                             <label className="block text-gray-400 text-xs md:text-sm mb-1">Jurisdiction</label>
//                             <select onChange={handleStationSelect} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-amber-500 text-white text-sm">
//                                 <option value="">+ Add Station</option>
//                                 {/* ✅ POPULATED DYNAMICALLY */}
//                                 {policeStationsList.map(station => <option key={station} value={station}>{station}</option>)}
//                             </select>
//                             <div className="flex flex-wrap gap-2 mt-2">
//                                 {selectedStations.map(s => (
//                                     <span key={s} className="bg-amber-900/50 text-amber-200 text-[10px] md:text-xs px-2 py-1 rounded border border-amber-500/30 flex items-center gap-1">{s} <button type="button" onClick={() => removeStation(s)} className="text-amber-500 hover:text-white font-bold">×</button></span>
//                                 ))}
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="col-span-2 md:col-span-1">
//                             <label className="block text-gray-400 text-xs md:text-sm mb-1">Police Station</label>
//                             <select required name="station" onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-purple-500 text-white text-sm">
//                                 <option value="">Select Station</option>
//                                 {/* ✅ POPULATED DYNAMICALLY */}
//                                 {policeStationsList.map(station => <option key={station} value={station}>{station}</option>)}
//                             </select>
//                         </div>
//                     )}

//                     <div className="col-span-2">
//                         <label className={`block text-xs md:text-sm mb-1 font-bold ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>{role === 'senior' ? "High Command Code" : "Secret Access Code"}</label>
//                         <input required name="secretCode" onChange={handleChange} type="password" className={`w-full bg-gray-900/50 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 outline-none text-white text-sm ${role === 'senior' ? 'border-amber-500/50 focus:border-amber-400' : 'border-purple-500/50 focus:border-purple-400'}`} />
//                     </div>
//                 </>
//               )}

//               <div className="col-span-2">
//                   <label className="block text-gray-400 text-xs md:text-sm mb-1">Password</label>
//                   <input required name="password" onChange={handleChange} type="password" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" />
//               </div>

//               <div className="col-span-2 mt-4">
//                 <button type="submit" disabled={loading} className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 ${role === 'citizen' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : role === 'senior' ? 'bg-gradient-to-r from-amber-600 to-orange-600' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}>
//                     {loading ? "Verifying..." : "Verify OTP & Register"}
//                 </button>
//               </div>

//             </form>
            
//             <p className="mt-4 md:mt-6 text-gray-400 text-center text-xs md:text-base">Already have an account? <Link to="/login" className="text-white hover:underline">Login here</Link></p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signup;











// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { FaPaperPlane, FaCheckCircle, FaIdCard, FaTimes, FaExclamationCircle, FaChevronDown } from "react-icons/fa";
// import { BASE_URL } from "../config"; 
// import signupBg from '../assets/signup-bg.png';
// // --- NOTIFICATION HELPERS (Unchanged) ---
// const playNotificationSound = () => {
//     const audio = new Audio('/notification.mp3');
//     audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//     playNotificationSound();
//     toast.custom((t) => (
//         <motion.div 
//             initial={{ opacity: 0, y: -50, scale: 0.9 }}
//             animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//             className={`flex items-center w-full max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//         >
//             <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//                 {type === 'success' ? <FaCheckCircle size={16} /> : <FaExclamationCircle size={16} />}
//             </div>
//             <div className="flex-1 min-w-0">
//                 <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//                 <p className="text-xs text-slate-300 mt-0.5 leading-tight truncate">{message}</p>
//             </div>
//             <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800"><FaTimes size={12} /></button>
//         </motion.div>
//     ), { duration: 3500, position: 'top-center' });
// };

// // --- ✨ CUSTOM ANIMATED SELECT COMPONENT ---
// const CustomSelect = ({ label, name, value, options, onChange, placeholder = "Select" }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const ref = useRef(null);

//     // Close on click outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleSelect = (optionValue) => {
//         // Mocking the event object to work with existing handleChange
//         onChange({ target: { name: name, value: optionValue } });
//         setIsOpen(false);
//     };

//     return (
//         <div className="relative w-full" ref={ref}>
//             <label className="block text-gray-400 text-xs md:text-sm mb-1">{label}</label>
//             <div 
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer hover:border-blue-500 transition-all shadow-inner"
//             >
//                 <span className={`text-sm font-bold font-mono tracking-wide ${value ? 'text-white' : 'text-gray-500'}`}>
//                     {value || placeholder}
//                 </span>
//                 <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
//             </div>

//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div 
//                         initial={{ opacity: 0, y: -10, height: 0 }}
//                         animate={{ opacity: 1, y: 0, height: 'auto' }}
//                         exit={{ opacity: 0, y: -10, height: 0 }}
//                         transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} // Slow ease effect
//                         className="absolute z-50 mt-2 w-full bg-slate-800/95 backdrop-blur-xl border border-slate-600 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
//                     >
//                         {options.map((opt, idx) => (
//                             <motion.div 
//                                 key={idx}
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: idx * 0.05 }} // Stagger effect
//                                 onClick={() => handleSelect(typeof opt === 'object' ? opt.value : opt)}
//                                 className="px-4 py-3 text-sm font-mono font-bold text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white cursor-pointer border-b border-white/5 last:border-none transition-all"
//                             >
//                                 {typeof opt === 'object' ? opt.label : opt}
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// const Signup = () => {
//   const [role, setRole] = useState(null);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedStations, setSelectedStations] = useState([]);
//   const [idFile, setIdFile] = useState(null); 

//   // ✅ DYNAMIC DATA STATES
//   const [policeStationsList, setPoliceStationsList] = useState([]);
//   const [regularDesignations, setRegularDesignations] = useState([]);
//   const [seniorDesignations, setSeniorDesignations] = useState([]);

//   const [formData, setFormData] = useState({
//     title: "Mr.", firstName: "", lastName: "", gender: "", aadhar: "", 
//     email: "", mobile: "", password: "", station: "", designation: "", secretCode: "", otp: ""
//   });

//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];

//   // ✅ FETCH DATA FROM BACKEND ON LOAD
//   useEffect(() => {
//     const fetchMetadata = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
//             setPoliceStationsList(data.stations.map(s => s.name));
//             setRegularDesignations(data.designations.regular);
//             setSeniorDesignations(data.designations.senior);
//         } catch (error) {
//             console.error("Failed to load form data:", error);
//             triggerNotification('error', 'Network Error', 'Failed to load options from server.');
//         }
//     };
//     fetchMetadata();
//   }, []);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleFileChange = (e) => setIdFile(e.target.files[0]);

//   // Handle Custom Select for Jurisdiction (Multi-select logic adapter)
//   const handleStationSelectCustom = (val) => {
//     if (val && !selectedStations.includes(val)) setSelectedStations([...selectedStations, val]);
//   };

//   const removeStation = (stationToRemove) => {
//     setSelectedStations(selectedStations.filter(s => s !== stationToRemove));
//   };

//   const handleSendOtp = async () => {
//       if(!formData.email) return triggerNotification('error', 'Missing Email', "Enter email first.");
//       try {
//           setLoading(true);
//           await axios.post(`${BASE_URL}/api/users/send-otp`, { email: formData.email, type: 'signup' });
//           triggerNotification('success', 'OTP Sent', `Code sent to ${formData.email}`);
//           setOtpSent(true);
//           setLoading(false);
//       } catch (error) {
//           triggerNotification('error', 'OTP Failed', error.response?.data?.message || "Could not send OTP.");
//           setLoading(false);
//       }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if(!otpSent) return triggerNotification('error', 'Verification', "Verify email via OTP first!");
//     if(!formData.otp) return triggerNotification('error', 'Verification', "Enter OTP code.");
//     if(!idFile) return triggerNotification('error', 'ID Proof', "Upload ID Proof photo.");

//     if (formData.mobile.length !== 10) return triggerNotification('error', 'Invalid Input', "Mobile must be 10 digits.");
//     if (formData.aadhar && formData.aadhar.length !== 12) return triggerNotification('error', 'Invalid Input', "Aadhaar must be 12 digits.");

//     setLoading(true);

//     try {
//       let finalStation = formData.station;
//       if (role === 'senior') {
//         if(selectedStations.length === 0) throw new Error("Select jurisdiction.");
//         finalStation = selectedStations.join(", ");
//       }

//       const data = new FormData();
//       data.append("role", role);
//       data.append("title", formData.title);
//       data.append("firstName", formData.firstName);
//       data.append("lastName", formData.lastName);
//       data.append("email", formData.email);
//       data.append("password", formData.password);
//       data.append("mobile", formData.mobile);
//       data.append("gender", formData.gender);
//       data.append("otp", formData.otp);
      
//       if (formData.aadhar) data.append("aadhar", formData.aadhar);
//       if (finalStation) data.append("station", finalStation);
//       if (formData.designation) data.append("designation", formData.designation);
//       if (formData.secretCode) data.append("secretCode", formData.secretCode);

//       data.append("idPhoto", idFile);

//       const response = await axios.post(`${BASE_URL}/api/users/signup`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       triggerNotification('success', 'Registered!', `Created: ${formData.firstName} ${formData.lastName}`);
      
//       localStorage.setItem("userInfo", JSON.stringify(response.data));
//       setTimeout(() => navigate("/login"), 1500);

//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message || "Registration Failed!";
//       triggerNotification('error', 'Failed', errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- STYLES ---
//   const inputStyle = "w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-white text-sm font-mono font-bold tracking-wide transition-all shadow-inner";

//   return (
//     <div className="min-h-screen text-white flex flex-col font-sans relative">
//       <Navbar />
//       <Toaster containerStyle={{ top: 20 }} />

//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={signupBg}  // ✅ Variable use kiya // 👈 User needs to add this image
//             alt="Background" 
//             className="w-full h-full object-contain opacity-90  blur-10px"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-black/95"></div>
//       </div>

//       <div className="flex-1 flex flex-col justify-center items-center px-4 py-24 relative z-10">
        
//         {/* --- ROLE SELECTION --- */}
//         {!role && (
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
//           >
//             {[
//                 { id: "citizen", label: "Citizen", img: "../assets/citizen-symbol.png", desc: "Report crimes, track status, legal aid.", color: "blue" },
//                 { id: "police", label: "Police Official", img: "../assets/police-symbol.png", desc: "Constables, Inspectors, Field Officers.", color: "purple" },
//                 { id: "senior", label: "Senior Official", img: "../assets/senior-symbol.png", desc: "SP, IGP, DGP (High Command).", color: "amber" }
//             ].map((r) => (
//                 <motion.div 
//                     key={r.id}
//                     whileHover={{ scale: 1.05, y: -5 }}
//                     onClick={() => setRole(r.id)}
//                     className={`bg-slate-800/40 backdrop-blur-md border border-slate-600 p-8 rounded-3xl cursor-pointer hover:border-${r.color}-500 hover:shadow-[0_0_30px_rgba(var(--${r.color}-500),0.3)] transition-all text-center group relative overflow-hidden`}
//                 >
//                     <div className={`absolute top-0 left-0 w-full h-1 bg-${r.color}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
//                     <img src={r.img} alt={r.label} className="w-24 h-24 mx-auto mb-6 object-contain group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all" />
//                     <h2 className={`text-2xl font-extrabold mb-2 text-white group-hover:text-${r.color}-400`}>{r.label}</h2>
//                     <p className="text-gray-400 text-sm font-medium">{r.desc}</p>
//                 </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* --- SIGNUP FORM --- */}
//         {role && (
//           <motion.div 
//             initial={{ opacity: 0, y: 50 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 0.6, ease: "circOut" }}
//             className="relative w-full max-w-3xl p-[2px] rounded-[2rem] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl" // Mixed color border wrapper
//           >
//             <div className="bg-gray-900/90 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] h-full w-full">
                
//                 <div className="flex justify-between items-center mb-8">
//                     <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 capitalize tracking-tight">
//                         {role === 'senior' ? "High Command Registration" : `${role} Registration`}
//                     </h2>
//                     <button onClick={() => setRole(null)} className="text-sm font-bold text-gray-500 hover:text-white underline transition-colors">Change Role</button>
//                 </div>

//                 <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
//                 <div className="col-span-2 md:col-span-1">
//                     <label className="block text-gray-400 text-xs md:text-sm mb-1">First Name</label>
//                     <div className="flex gap-2">
//                         <div className="w-24">
//                             <CustomSelect name="title" value={formData.title} options={titles} onChange={handleChange} placeholder="Title" />
//                         </div>
//                         <input required name="firstName" onChange={handleChange} type="text" className={inputStyle} placeholder="First Name" />
//                     </div>
//                 </div>

//                 <div className="col-span-2 md:col-span-1">
//                     <label className="block text-gray-400 text-xs md:text-sm mb-1">Last Name</label>
//                     <input required name="lastName" onChange={handleChange} type="text" className={inputStyle} placeholder="Last Name" />
//                 </div>
                
//                 <div className="col-span-2 md:col-span-1">
//                     <CustomSelect label="Gender" name="gender" value={formData.gender} options={["Male", "Female", "Other"]} onChange={handleChange} />
//                 </div>

//                 <div className="col-span-2 md:col-span-1">
//                     <label className="block text-gray-400 text-xs md:text-sm mb-1">Mobile Number</label>
//                     <input required name="mobile" onChange={handleChange} type="tel" maxLength="10" className={inputStyle} placeholder="10-digit number" />
//                 </div>

//                 <div className="col-span-2 grid grid-cols-3 gap-2 items-end">
//                     <div className="col-span-2">
//                         <label className="block text-gray-400 text-xs md:text-sm mb-1">Email Address</label>
//                         <input required name="email" onChange={handleChange} type="email" className={inputStyle} placeholder="name@example.com" />
//                     </div>
//                     <button type="button" onClick={handleSendOtp} disabled={otpSent || loading} className={`h-[46px] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20 ${otpSent ? "bg-green-600 text-white cursor-default" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transform hover:-translate-y-0.5 active:translate-y-0"}`}>
//                         {otpSent ? <><FaCheckCircle /> Sent</> : <><FaPaperPlane /> Send OTP</>}
//                     </button>
//                 </div>

//                 {otpSent && (
//                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="col-span-2">
//                         <label className="block text-green-400 text-xs md:text-sm mb-1 font-bold">Enter Verification Code</label>
//                         <input required name="otp" onChange={handleChange} type="text" className="w-full bg-slate-900/50 border border-green-500/50 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-white tracking-[0.5em] text-center text-xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.1)]" placeholder="XXXXXX" />
//                     </motion.div>
//                 )}

//                 {/* ID Proof Upload */}
//                 <div className="col-span-2">
//                     <label className="block text-gray-400 text-xs md:text-sm mb-1">Passport ID/Profile Photo</label>
//                     <div className="relative border-2 border-dashed border-slate-600 bg-slate-800/30 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all group">
//                         <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
//                         <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-white transition-colors">
//                             <FaIdCard className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300" />
//                             <p className="text-sm font-bold font-mono">{idFile ? idFile.name : "Click to Upload Photo"}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {role === "citizen" && (
//                     <div className="col-span-2">
//                         <label className="block text-gray-400 text-xs md:text-sm mb-1">Aadhaar Number</label>
//                         <input required name="aadhar" onChange={handleChange} type="text" maxLength="12" className={inputStyle} placeholder="12-digit number" />
//                     </div>
//                 )}

//                 {(role === "police" || role === "senior") && (
//                     <>
//                         <div className="col-span-2 md:col-span-1">
//                             <CustomSelect 
//                                 label="Designation" 
//                                 name="designation" 
//                                 value={formData.designation} 
//                                 options={role === 'senior' ? seniorDesignations : regularDesignations} 
//                                 onChange={handleChange} 
//                                 placeholder="Select Rank"
//                             />
//                         </div>

//                         {role === 'senior' ? (
//                             <div className="col-span-2 md:col-span-1">
//                                 <label className="block text-gray-400 text-xs md:text-sm mb-1">Jurisdiction</label>
//                                 {/* Using custom select for adding, but manual remove logic remains */}
//                                 <CustomSelect 
//                                     label=""
//                                     name="jurisdiction_adder" // dummy name
//                                     value=""
//                                     options={policeStationsList} 
//                                     onChange={(e) => handleStationSelectCustom(e.target.value)}
//                                     placeholder="+ Add Station"
//                                 />
//                                 <div className="flex flex-wrap gap-2 mt-2">
//                                     {selectedStations.map(s => (
//                                         <span key={s} className="bg-amber-900/40 text-amber-200 text-xs font-bold px-2 py-1 rounded-md border border-amber-500/30 flex items-center gap-1 animate-pulse-slow">{s} <button type="button" onClick={() => removeStation(s)} className="text-amber-500 hover:text-white">×</button></span>
//                                     ))}
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="col-span-2 md:col-span-1">
//                                 <CustomSelect 
//                                     label="Police Station" 
//                                     name="station" 
//                                     value={formData.station} 
//                                     options={policeStationsList} 
//                                     onChange={handleChange} 
//                                 />
//                             </div>
//                         )}

//                         <div className="col-span-2">
//                             <label className={`block text-xs md:text-sm mb-1 font-bold ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>{role === 'senior' ? "High Command Code" : "Secret Access Code"}</label>
//                             <input required name="secretCode" onChange={handleChange} type="password" className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 outline-none text-white text-sm font-mono font-bold tracking-widest ${role === 'senior' ? 'border-amber-500/50 focus:border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'border-purple-500/50 focus:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]'}`} />
//                         </div>
//                     </>
//                 )}

//                 <div className="col-span-2">
//                     <label className="block text-gray-400 text-xs md:text-sm mb-1">Password</label>
//                     <input required name="password" onChange={handleChange} type="password" className={inputStyle} />
//                 </div>

//                 <div className="col-span-2 mt-6">
//                     <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-black text-lg shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
//                         ${role === 'citizen' ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-teal-400' 
//                         : role === 'senior' ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500' 
//                         : 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'}`}>
//                         {loading ? "Verifying..." : "VERIFY OTP & REGISTER"}
//                     </button>
//                 </div>

//                 </form>
                
//                 <p className="mt-6 text-gray-400 text-center text-sm font-medium">Already have an account? <Link to="/login" className="text-white hover:text-blue-400 underline decoration-blue-500/50 transition-colors">Login here</Link></p>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signup;














// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { FaPaperPlane, FaCheckCircle, FaIdCard, FaTimes, FaExclamationCircle, FaChevronDown } from "react-icons/fa";
// import { BASE_URL } from "../config"; 

// // ✅ IMAGES IMPORTED DIRECTLY (Fixes broken images issue)
// import signupBg from '../assets/signup-bg.png';
// import citizenImg from '../assets/citizen-symbol.png';
// import policeImg from '../assets/police-symbol.png';
// import seniorImg from '../assets/senior-symbol.png';

// // --- NOTIFICATION HELPERS (Unchanged) ---
// const playNotificationSound = () => {
//     const audio = new Audio('/notification.mp3');
//     audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//     playNotificationSound();
//     toast.custom((t) => (
//         <motion.div 
//             initial={{ opacity: 0, y: -50, scale: 0.9 }}
//             animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//             className={`flex items-center w-full max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//         >
//             <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//                 {type === 'success' ? <FaCheckCircle size={16} /> : <FaExclamationCircle size={16} />}
//             </div>
//             <div className="flex-1 min-w-0">
//                 <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//                 <p className="text-xs text-slate-300 mt-0.5 leading-tight truncate">{message}</p>
//             </div>
//             <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800"><FaTimes size={12} /></button>
//         </motion.div>
//     ), { duration: 3500, position: 'top-center' });
// };

// // --- ✨ CUSTOM ANIMATED SELECT COMPONENT (Optimized for Mobile) ---
// const CustomSelect = ({ label, name, value, options, onChange, placeholder = "Select" }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const ref = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleSelect = (optionValue) => {
//         onChange({ target: { name: name, value: optionValue } });
//         setIsOpen(false);
//     };

//     return (
//         <div className="relative w-full" ref={ref}>
//             <label className="block text-gray-400 text-[10px] md:text-sm mb-1">{label}</label>
//             <div 
//                 onClick={() => setIsOpen(!isOpen)}
//                 // ✅ Mobile: px-3 py-2.5 | Desktop: px-4 py-3
//                 className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 md:px-4 md:py-3 flex justify-between items-center cursor-pointer hover:border-blue-500 transition-all shadow-inner"
//             >
//                 <span className={`text-xs md:text-sm font-bold font-mono tracking-wide ${value ? 'text-white' : 'text-gray-500'}`}>
//                     {value || placeholder}
//                 </span>
//                 <FaChevronDown className={`text-[10px] md:text-xs text-gray-400 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
//             </div>

//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div 
//                         initial={{ opacity: 0, y: -10, height: 0 }}
//                         animate={{ opacity: 1, y: 0, height: 'auto' }}
//                         exit={{ opacity: 0, y: -10, height: 0 }}
//                         transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
//                         className="absolute z-50 mt-2 w-full bg-slate-800/95 backdrop-blur-xl border border-slate-600 rounded-xl shadow-2xl overflow-hidden max-h-52 md:max-h-60 overflow-y-auto custom-scrollbar"
//                     >
//                         {options.map((opt, idx) => (
//                             <motion.div 
//                                 key={idx}
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: idx * 0.05 }}
//                                 onClick={() => handleSelect(typeof opt === 'object' ? opt.value : opt)}
//                                 className="px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm font-mono font-bold text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white cursor-pointer border-b border-white/5 last:border-none transition-all"
//                             >
//                                 {typeof opt === 'object' ? opt.label : opt}
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// const Signup = () => {
//   const [role, setRole] = useState(null);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedStations, setSelectedStations] = useState([]);
//   const [idFile, setIdFile] = useState(null); 

//   // ✅ DYNAMIC DATA STATES
//   const [policeStationsList, setPoliceStationsList] = useState([]);
//   const [regularDesignations, setRegularDesignations] = useState([]);
//   const [seniorDesignations, setSeniorDesignations] = useState([]);

//   const [formData, setFormData] = useState({
//     title: "Mr.", firstName: "", lastName: "", gender: "", aadhar: "", 
//     email: "", mobile: "", password: "", station: "", designation: "", secretCode: "", otp: ""
//   });

//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];

//   // ✅ FETCH DATA FROM BACKEND ON LOAD
//   useEffect(() => {
//     const fetchMetadata = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
//             setPoliceStationsList(data.stations.map(s => s.name));
//             setRegularDesignations(data.designations.regular);
//             setSeniorDesignations(data.designations.senior);
//         } catch (error) {
//             console.error("Failed to load form data:", error);
//             triggerNotification('error', 'Network Error', 'Failed to load options from server.');
//         }
//     };
//     fetchMetadata();
//   }, []);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleFileChange = (e) => setIdFile(e.target.files[0]);

//   // Handle Custom Select for Jurisdiction (Multi-select logic adapter)
//   const handleStationSelectCustom = (val) => {
//     if (val && !selectedStations.includes(val)) setSelectedStations([...selectedStations, val]);
//   };

//   const removeStation = (stationToRemove) => {
//     setSelectedStations(selectedStations.filter(s => s !== stationToRemove));
//   };

//   const handleSendOtp = async () => {
//       if(!formData.email) return triggerNotification('error', 'Missing Email', "Enter email first.");
//       try {
//           setLoading(true);
//           await axios.post(`${BASE_URL}/api/users/send-otp`, { email: formData.email, type: 'signup' });
//           triggerNotification('success', 'OTP Sent', `Code sent to ${formData.email}`);
//           setOtpSent(true);
//           setLoading(false);
//       } catch (error) {
//           triggerNotification('error', 'OTP Failed', error.response?.data?.message || "Could not send OTP.");
//           setLoading(false);
//       }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if(!otpSent) return triggerNotification('error', 'Verification', "Verify email via OTP first!");
//     if(!formData.otp) return triggerNotification('error', 'Verification', "Enter OTP code.");
//     if(!idFile) return triggerNotification('error', 'ID Proof', "Upload ID Proof photo.");

//     if (formData.mobile.length !== 10) return triggerNotification('error', 'Invalid Input', "Mobile must be 10 digits.");
//     if (formData.aadhar && formData.aadhar.length !== 12) return triggerNotification('error', 'Invalid Input', "Aadhaar must be 12 digits.");

//     setLoading(true);

//     try {
//       let finalStation = formData.station;
//       if (role === 'senior') {
//         if(selectedStations.length === 0) throw new Error("Select jurisdiction.");
//         finalStation = selectedStations.join(", ");
//       }

//       const data = new FormData();
//       data.append("role", role);
//       data.append("title", formData.title);
//       data.append("firstName", formData.firstName);
//       data.append("lastName", formData.lastName);
//       data.append("email", formData.email);
//       data.append("password", formData.password);
//       data.append("mobile", formData.mobile);
//       data.append("gender", formData.gender);
//       data.append("otp", formData.otp);
      
//       if (formData.aadhar) data.append("aadhar", formData.aadhar);
//       if (finalStation) data.append("station", finalStation);
//       if (formData.designation) data.append("designation", formData.designation);
//       if (formData.secretCode) data.append("secretCode", formData.secretCode);

//       data.append("idPhoto", idFile);

//       const response = await axios.post(`${BASE_URL}/api/users/signup`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       triggerNotification('success', 'Registered!', `Created: ${formData.firstName} ${formData.lastName}`);
      
//       localStorage.setItem("userInfo", JSON.stringify(response.data));
//       setTimeout(() => navigate("/login"), 1500);

//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message || "Registration Failed!";
//       triggerNotification('error', 'Failed', errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- STYLES ---
//   const inputStyle = "w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-blue-500 text-white text-xs md:text-sm font-mono font-bold tracking-wide transition-all shadow-inner";

//   return (
//     <div className="min-h-screen text-white flex flex-col font-sans relative">
//       <Navbar />
//       <Toaster containerStyle={{ top: 20 }} />

//       {/* --- BACKGROUND IMAGE --- */}
//       <div className="fixed inset-0 z-0">
//           <img 
//             src={signupBg}  // ✅ Variable use kiya
//             alt="Background" 
//             className="fixed inset-0 w-full h-full object-fill opacity-90 z-0"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-black/95"></div>
//       </div>

//       <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 md:py-24 relative z-10">
        
//         {/* --- ROLE SELECTION --- */}
//         {!role && (
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
//           >
//             {[
//                 // ✅ USING IMPORTED VARIABLES HERE
//                 { id: "citizen", label: "Citizen", img: citizenImg, desc: "Report crimes, track status, legal aid.", color: "blue" },
//                 { id: "police", label: "Police Official", img: policeImg, desc: "Constables, Inspectors, Field Officers.", color: "purple" },
//                 { id: "senior", label: "Senior Official", img: seniorImg, desc: "SP, IGP, DGP (High Command).", color: "amber" }
//             ].map((r) => (
//                 <motion.div 
//                     key={r.id}
//                     whileHover={{ scale: 1.05, y: -5 }}
//                     onClick={() => setRole(r.id)}
//                     className={`bg-slate-800/40 backdrop-blur-md border border-slate-600 p-5 md:p-8 rounded-3xl cursor-pointer hover:border-${r.color}-500 hover:shadow-[0_0_30px_rgba(var(--${r.color}-500),0.3)] transition-all text-center group relative overflow-hidden`}
//                 >
//                     <div className={`absolute top-0 left-0 w-full h-1 bg-${r.color}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
//                     <img src={r.img} alt={r.label} className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 object-contain group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all" />
//                     <h2 className={`text-xl md:text-2xl font-extrabold mb-1 md:mb-2 text-white group-hover:text-${r.color}-400`}>{r.label}</h2>
//                     <p className="text-gray-400 text-xs md:text-sm font-medium">{r.desc}</p>
//                 </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* --- SIGNUP FORM --- */}
//         {role && (
//           <motion.div 
//             initial={{ opacity: 0, y: 50 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 0.6, ease: "circOut" }}
//             className="relative w-full max-w-3xl p-[2px] rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl"
//           >
//             <div className="bg-gray-900/90 backdrop-blur-2xl p-5 md:p-10 rounded-[1.5rem] md:rounded-[2rem] h-full w-full">
                
//                 <div className="flex justify-between items-center mb-6 md:mb-8">
//                     <h2 className="text-xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 capitalize tracking-tight">
//                         {role === 'senior' ? "High Command" : `${role} Registration`}
//                     </h2>
//                     <button onClick={() => setRole(null)} className="text-xs md:text-sm font-bold text-gray-500 hover:text-white underline transition-colors">Change Role</button>
//                 </div>

//                 <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                
//                 <div className="col-span-2 md:col-span-1">
//                     <label className="block text-gray-400 text-[10px] md:text-sm mb-1">First Name</label>
//                     <div className="flex gap-2">
//                         <div className="w-20 md:w-24">
//                             <CustomSelect name="title" value={formData.title} options={titles} onChange={handleChange} placeholder="Title" />
//                         </div>
//                         <input required name="firstName" onChange={handleChange} type="text" className={inputStyle} placeholder="First Name" />
//                     </div>
//                 </div>

//                 <div className="col-span-2 md:col-span-1">
//                     <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Last Name</label>
//                     <input required name="lastName" onChange={handleChange} type="text" className={inputStyle} placeholder="Last Name" />
//                 </div>
                
//                 <div className="col-span-2 md:col-span-1">
//                     <CustomSelect label="Gender" name="gender" value={formData.gender} options={["Male", "Female", "Other"]} onChange={handleChange} />
//                 </div>

//                 <div className="col-span-2 md:col-span-1">
//                     <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Mobile Number</label>
//                     <input required name="mobile" onChange={handleChange} type="tel" maxLength="10" className={inputStyle} placeholder="10-digit number" />
//                 </div>

//                 <div className="col-span-2 grid grid-cols-3 gap-2 items-end">
//                     <div className="col-span-2">
//                         <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Email Address</label>
//                         <input required name="email" onChange={handleChange} type="email" className={inputStyle} placeholder="name@example.com" />
//                     </div>
//                     <button type="button" onClick={handleSendOtp} disabled={otpSent || loading} className={`h-[40px] md:h-[46px] rounded-xl font-bold text-[10px] md:text-sm flex items-center justify-center gap-1 md:gap-2 transition-all shadow-lg hover:shadow-blue-500/20 ${otpSent ? "bg-green-600 text-white cursor-default" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transform hover:-translate-y-0.5 active:translate-y-0"}`}>
//                         {otpSent ? <><FaCheckCircle /> Sent</> : <><FaPaperPlane /> Send OTP</>}
//                     </button>
//                 </div>

//                 {otpSent && (
//                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="col-span-2">
//                         <label className="block text-green-400 text-[10px] md:text-sm mb-1 font-bold">Enter Verification Code</label>
//                         <input required name="otp" onChange={handleChange} type="text" className="w-full bg-slate-900/50 border border-green-500/50 rounded-xl px-4 py-2 md:py-3 focus:outline-none focus:border-green-500 text-white tracking-[0.5em] text-center text-lg md:text-xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.1)]" placeholder="XXXXXX" />
//                     </motion.div>
//                 )}

//                 {/* ID Proof Upload */}
//                 <div className="col-span-2">
//                     <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Passport ID/Profile Photo</label>
//                     <div className="relative border-2 border-dashed border-slate-600 bg-slate-800/30 rounded-xl p-4 md:p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all group">
//                         <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
//                         <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-white transition-colors">
//                             <FaIdCard className="text-2xl md:text-3xl mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300" />
//                             <p className="text-xs md:text-sm font-bold font-mono">{idFile ? idFile.name : "Click to Upload Photo"}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {role === "citizen" && (
//                     <div className="col-span-2">
//                         <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Aadhaar Number</label>
//                         <input required name="aadhar" onChange={handleChange} type="text" maxLength="12" className={inputStyle} placeholder="12-digit number" />
//                     </div>
//                 )}

//                 {(role === "police" || role === "senior") && (
//                     <>
//                         <div className="col-span-2 md:col-span-1">
//                             <CustomSelect 
//                                 label="Designation" 
//                                 name="designation" 
//                                 value={formData.designation} 
//                                 options={role === 'senior' ? seniorDesignations : regularDesignations} 
//                                 onChange={handleChange} 
//                                 placeholder="Select Rank"
//                             />
//                         </div>

//                         {role === 'senior' ? (
//                             <div className="col-span-2 md:col-span-1">
//                                 <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Jurisdiction</label>
//                                 <CustomSelect 
//                                     label=""
//                                     name="jurisdiction_adder" 
//                                     value=""
//                                     options={policeStationsList} 
//                                     onChange={(e) => handleStationSelectCustom(e.target.value)}
//                                     placeholder="+ Add Station"
//                                 />
//                                 <div className="flex flex-wrap gap-2 mt-2">
//                                     {selectedStations.map(s => (
//                                         <span key={s} className="bg-amber-900/40 text-amber-200 text-[10px] md:text-xs font-bold px-2 py-1 rounded-md border border-amber-500/30 flex items-center gap-1 animate-pulse-slow">{s} <button type="button" onClick={() => removeStation(s)} className="text-amber-500 hover:text-white">×</button></span>
//                                     ))}
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="col-span-2 md:col-span-1">
//                                 <CustomSelect 
//                                     label="Police Station" 
//                                     name="station" 
//                                     value={formData.station} 
//                                     options={policeStationsList} 
//                                     onChange={handleChange} 
//                                 />
//                             </div>
//                         )}

//                         <div className="col-span-2">
//                             <label className={`block text-[10px] md:text-sm mb-1 font-bold ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>{role === 'senior' ? "High Command Code" : "Secret Access Code"}</label>
//                             <input required name="secretCode" onChange={handleChange} type="password" className={`w-full bg-slate-900/50 border rounded-xl px-3 py-2.5 md:px-4 md:py-3 outline-none text-white text-xs md:text-sm font-mono font-bold tracking-widest ${role === 'senior' ? 'border-amber-500/50 focus:border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'border-purple-500/50 focus:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]'}`} />
//                         </div>
//                     </>
//                 )}

//                 <div className="col-span-2">
//                     <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Password</label>
//                     <input required name="password" onChange={handleChange} type="password" className={inputStyle} />
//                 </div>

//                 <div className="col-span-2 mt-4 md:mt-6">
//                     <button type="submit" disabled={loading} className={`w-full py-3 md:py-4 rounded-xl font-black text-sm md:text-lg shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
//                         ${role === 'citizen' ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-teal-400' 
//                         : role === 'senior' ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500' 
//                         : 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'}`}>
//                         {loading ? "Verifying..." : "VERIFY OTP & REGISTER"}
//                     </button>
//                 </div>

//                 </form>
                
//                 <p className="mt-6 text-gray-400 text-center text-xs md:text-sm font-medium">Already have an account? <Link to="/login" className="text-white hover:text-blue-400 underline decoration-blue-500/50 transition-colors">Login here</Link></p>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signup;








import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaPaperPlane, FaCheckCircle, FaIdCard, FaTimes, FaExclamationCircle, FaChevronDown } from "react-icons/fa";
import { BASE_URL } from "../config"; 

// ✅ Path waisa hi rakha hai jaisa tumhare code main tha
import signupBg from '../assets/signup-bg.png';
import citizenImg from '../assets/citizen-symbol.png';
import policeImg from '../assets/police-symbol.png';
import seniorImg from '../assets/senior-symbol.png';

// --- NOTIFICATION HELPERS (Unchanged) ---
const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(err => console.log("Sound play blocked:", err));
};

const triggerNotification = (type, title, message) => {
    playNotificationSound();
    toast.custom((t) => (
        <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center w-full max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
        >
            <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {type === 'success' ? <FaCheckCircle size={16} /> : <FaExclamationCircle size={16} />}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-tight truncate">{message}</p>
            </div>
            <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800"><FaTimes size={12} /></button>
        </motion.div>
    ), { duration: 3500, position: 'top-center' });
};

// --- ✨ CUSTOM ANIMATED SELECT COMPONENT ---
const CustomSelect = ({ label, name, value, options, onChange, placeholder = "Select" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange({ target: { name: name, value: optionValue } });
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={ref}>
            <label className="block text-gray-400 text-[10px] md:text-sm mb-1">{label}</label>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 md:px-4 md:py-3 flex justify-between items-center cursor-pointer hover:border-blue-500 transition-all shadow-inner"
            >
                <span className={`text-xs md:text-sm font-bold font-mono tracking-wide ${value ? 'text-white' : 'text-gray-500'}`}>
                    {value || placeholder}
                </span>
                <FaChevronDown className={`text-[10px] md:text-xs text-gray-400 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="absolute z-50 mt-2 w-full bg-slate-800/95 backdrop-blur-xl border border-slate-600 rounded-xl shadow-2xl overflow-hidden max-h-52 md:max-h-60 overflow-y-auto custom-scrollbar"
                    >
                        {options.map((opt, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => handleSelect(typeof opt === 'object' ? opt.value : opt)}
                                className="px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm font-mono font-bold text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white cursor-pointer border-b border-white/5 last:border-none transition-all"
                            >
                                {typeof opt === 'object' ? opt.label : opt}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Signup = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [selectedStations, setSelectedStations] = useState([]);
  const [idFile, setIdFile] = useState(null); 

  const [policeStationsList, setPoliceStationsList] = useState([]);
  const [regularDesignations, setRegularDesignations] = useState([]);
  const [seniorDesignations, setSeniorDesignations] = useState([]);

  const [formData, setFormData] = useState({
    title: "Mr.", firstName: "", lastName: "", gender: "", aadhar: "", 
    email: "", mobile: "", password: "", station: "", designation: "", secretCode: "", otp: ""
  });

  const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];

  useEffect(() => {
    const fetchMetadata = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
            setPoliceStationsList(data.stations.map(s => s.name));
            setRegularDesignations(data.designations.regular);
            setSeniorDesignations(data.designations.senior);
        } catch (error) {
            console.error("Failed to load form data:", error);
            triggerNotification('error', 'Network Error', 'Failed to load options from server.');
        }
    };
    fetchMetadata();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setIdFile(e.target.files[0]);

  const handleStationSelectCustom = (val) => {
    if (val && !selectedStations.includes(val)) setSelectedStations([...selectedStations, val]);
  };

  const removeStation = (stationToRemove) => {
    setSelectedStations(selectedStations.filter(s => s !== stationToRemove));
  };

  const handleSendOtp = async () => {
      if(!formData.email) return triggerNotification('error', 'Missing Email', "Enter email first.");
      try {
          setLoading(true);
          await axios.post(`${BASE_URL}/api/users/send-otp`, { email: formData.email, type: 'signup' });
          triggerNotification('success', 'OTP Sent', `Code sent to ${formData.email}`);
          setOtpSent(true);
          setLoading(false);
      } catch (error) {
          triggerNotification('error', 'OTP Failed', error.response?.data?.message || "Could not send OTP.");
          setLoading(false);
      }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if(!otpSent) return triggerNotification('error', 'Verification', "Verify email via OTP first!");
    if(!formData.otp) return triggerNotification('error', 'Verification', "Enter OTP code.");
    if(!idFile) return triggerNotification('error', 'ID Proof', "Upload ID Proof photo.");

    if (formData.mobile.length !== 10) return triggerNotification('error', 'Invalid Input', "Mobile must be 10 digits.");
    if (formData.aadhar && formData.aadhar.length !== 12) return triggerNotification('error', 'Invalid Input', "Aadhaar must be 12 digits.");

    setLoading(true);

    try {
      let finalStation = formData.station;
      if (role === 'senior') {
        if(selectedStations.length === 0) throw new Error("Select jurisdiction.");
        finalStation = selectedStations.join(", ");
      }

      const data = new FormData();
      data.append("role", role);
      data.append("title", formData.title);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("mobile", formData.mobile);
      data.append("gender", formData.gender);
      data.append("otp", formData.otp);
      
      if (formData.aadhar) data.append("aadhar", formData.aadhar);
      if (finalStation) data.append("station", finalStation);
      if (formData.designation) data.append("designation", formData.designation);
      if (formData.secretCode) data.append("secretCode", formData.secretCode);

      data.append("idPhoto", idFile);

      const response = await axios.post(`${BASE_URL}/api/users/signup`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      triggerNotification('success', 'Registered!', `Created: ${formData.firstName} ${formData.lastName}`);
      
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Registration Failed!";
      triggerNotification('error', 'Failed', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 md:px-4 md:py-3 focus:outline-none focus:border-blue-500 text-white text-xs md:text-sm font-mono font-bold tracking-wide transition-all shadow-inner";

  return (
    <div className="min-h-screen text-white flex flex-col font-sans relative">
      <Navbar />
      <Toaster containerStyle={{ top: 20 }} />

      {/* --- BACKGROUND IMAGE (Restored to object-fill for stretch) --- */}
      <div className="fixed inset-0 z-0">
          <img 
            src={signupBg} 
            alt="Background" 
            className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-black/95"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 md:py-24 relative z-10">
        
        {/* --- ROLE SELECTION --- */}
        {!role && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
          >
            {[
                { id: "citizen", label: "Citizen", img: citizenImg, desc: "Report crimes, track status, legal aid.", color: "blue" },
                { id: "police", label: "Police Official", img: policeImg, desc: "Constables, Inspectors, Field Officers.", color: "purple" },
                { id: "senior", label: "Senior Official", img: seniorImg, desc: "SP, IGP, DGP (High Command).", color: "amber" }
            ].map((r) => (
                <motion.div 
                    key={r.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => setRole(r.id)}
                    className={`bg-slate-800/40 backdrop-blur-md border border-slate-600 p-5 md:p-8 rounded-3xl cursor-pointer hover:border-${r.color}-500 hover:shadow-[0_0_30px_rgba(var(--${r.color}-500),0.3)] transition-all text-center group relative overflow-hidden`}
                >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-${r.color}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                    
                    {/* ✅ CHANGED SIZE HERE: Bigger & Wider */}
                    <img 
                        src={r.img} 
                        alt={r.label} 
                        className="w-32 h-24 md:w-44 md:h-32 mx-auto mb-4 md:mb-6 object-contain group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all" 
                    />
                    
                    <h2 className={`text-xl md:text-2xl font-extrabold mb-1 md:mb-2 text-white group-hover:text-${r.color}-400`}>{r.label}</h2>
                    <p className="text-gray-400 text-xs md:text-sm font-medium">{r.desc}</p>
                </motion.div>
            ))}
          </motion.div>
        )}

        {/* --- SIGNUP FORM --- */}
        {role && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "circOut" }}
            className="relative w-full max-w-3xl p-[2px] rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl"
          >
            <div className="bg-gray-900/90 backdrop-blur-2xl p-5 md:p-10 rounded-[1.5rem] md:rounded-[2rem] h-full w-full">
                
                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <h2 className="text-xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 capitalize tracking-tight">
                        {role === 'senior' ? "High Command" : `${role} Registration`}
                    </h2>
                    <button onClick={() => setRole(null)} className="text-xs md:text-sm font-bold text-gray-500 hover:text-white underline transition-colors">Change Role</button>
                </div>

                <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-gray-400 text-[10px] md:text-sm mb-1">First Name</label>
                    <div className="flex gap-2">
                        <div className="w-20 md:w-24">
                            <CustomSelect name="title" value={formData.title} options={titles} onChange={handleChange} placeholder="Title" />
                        </div>
                        <input required name="firstName" onChange={handleChange} type="text" className={inputStyle} placeholder="First Name" />
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Last Name</label>
                    <input required name="lastName" onChange={handleChange} type="text" className={inputStyle} placeholder="Last Name" />
                </div>
                
                <div className="col-span-2 md:col-span-1">
                    <CustomSelect label="Gender" name="gender" value={formData.gender} options={["Male", "Female", "Other"]} onChange={handleChange} />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Mobile Number</label>
                    <input required name="mobile" onChange={handleChange} type="tel" maxLength="10" className={inputStyle} placeholder="10-digit number" />
                </div>

                <div className="col-span-2 grid grid-cols-3 gap-2 items-end">
                    <div className="col-span-2">
                        <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Email Address</label>
                        <input required name="email" onChange={handleChange} type="email" className={inputStyle} placeholder="name@example.com" />
                    </div>
                    <button type="button" onClick={handleSendOtp} disabled={otpSent || loading} className={`h-[40px] md:h-[46px] rounded-xl font-bold text-[10px] md:text-sm flex items-center justify-center gap-1 md:gap-2 transition-all shadow-lg hover:shadow-blue-500/20 ${otpSent ? "bg-green-600 text-white cursor-default" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transform hover:-translate-y-0.5 active:translate-y-0"}`}>
                        {otpSent ? <><FaCheckCircle /> Sent</> : <><FaPaperPlane /> Send OTP</>}
                    </button>
                </div>

                {otpSent && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="col-span-2">
                        <label className="block text-green-400 text-[10px] md:text-sm mb-1 font-bold">Enter Verification Code</label>
                        <input required name="otp" onChange={handleChange} type="text" className="w-full bg-slate-900/50 border border-green-500/50 rounded-xl px-4 py-2 md:py-3 focus:outline-none focus:border-green-500 text-white tracking-[0.5em] text-center text-lg md:text-xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.1)]" placeholder="XXXXXX" />
                    </motion.div>
                )}

                {/* ID Proof Upload */}
                <div className="col-span-2">
                    <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Passport ID/Profile Photo</label>
                    <div className="relative border-2 border-dashed border-slate-600 bg-slate-800/30 rounded-xl p-4 md:p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all group">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                        <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                            <FaIdCard className="text-2xl md:text-3xl mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300" />
                            <p className="text-xs md:text-sm font-bold font-mono">{idFile ? idFile.name : "Click to Upload Photo"}</p>
                        </div>
                    </div>
                </div>

                {role === "citizen" && (
                    <div className="col-span-2">
                        <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Aadhaar Number</label>
                        <input required name="aadhar" onChange={handleChange} type="text" maxLength="12" className={inputStyle} placeholder="12-digit number" />
                    </div>
                )}

                {(role === "police" || role === "senior") && (
                    <>
                        <div className="col-span-2 md:col-span-1">
                            <CustomSelect 
                                label="Designation" 
                                name="designation" 
                                value={formData.designation} 
                                options={role === 'senior' ? seniorDesignations : regularDesignations} 
                                onChange={handleChange} 
                                placeholder="Select Rank"
                            />
                        </div>

                        {role === 'senior' ? (
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Jurisdiction</label>
                                <CustomSelect 
                                    label=""
                                    name="jurisdiction_adder" 
                                    value=""
                                    options={policeStationsList} 
                                    onChange={(e) => handleStationSelectCustom(e.target.value)}
                                    placeholder="+ Add Station"
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedStations.map(s => (
                                        <span key={s} className="bg-amber-900/40 text-amber-200 text-[10px] md:text-xs font-bold px-2 py-1 rounded-md border border-amber-500/30 flex items-center gap-1 animate-pulse-slow">{s} <button type="button" onClick={() => removeStation(s)} className="text-amber-500 hover:text-white">×</button></span>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="col-span-2 md:col-span-1">
                                <CustomSelect 
                                    label="Police Station" 
                                    name="station" 
                                    value={formData.station} 
                                    options={policeStationsList} 
                                    onChange={handleChange} 
                                />
                            </div>
                        )}

                        <div className="col-span-2">
                            <label className={`block text-[10px] md:text-sm mb-1 font-bold ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>{role === 'senior' ? "High Command Code" : "Secret Access Code"}</label>
                            <input required name="secretCode" onChange={handleChange} type="password" className={`w-full bg-slate-900/50 border rounded-xl px-3 py-2.5 md:px-4 md:py-3 outline-none text-white text-xs md:text-sm font-mono font-bold tracking-widest ${role === 'senior' ? 'border-amber-500/50 focus:border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'border-purple-500/50 focus:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]'}`} />
                        </div>
                    </>
                )}

                <div className="col-span-2">
                    <label className="block text-gray-400 text-[10px] md:text-sm mb-1">Password</label>
                    <input required name="password" onChange={handleChange} type="password" className={inputStyle} />
                </div>

                <div className="col-span-2 mt-4 md:mt-6">
                    <button type="submit" disabled={loading} className={`w-full py-3 md:py-4 rounded-xl font-black text-sm md:text-lg shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                        ${role === 'citizen' ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-teal-400' 
                        : role === 'senior' ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500' 
                        : 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'}`}>
                        {loading ? "Verifying..." : "VERIFY OTP & REGISTER"}
                    </button>
                </div>

                </form>
                
                <p className="mt-6 text-gray-400 text-center text-xs md:text-sm font-medium">Already have an account? <Link to="/login" className="text-white hover:text-blue-400 underline decoration-blue-500/50 transition-colors">Login here</Link></p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Signup;