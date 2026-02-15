// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { FaUserEdit, FaCamera, FaLock, FaShieldAlt, FaArrowLeft, FaEnvelope, FaTimes, FaPlus, FaChevronDown } from "react-icons/fa";
// import { BASE_URL } from "../config";

// // ✅ IMPORT DATA FOR DROPDOWNS
// import { regularDesignations, seniorDesignations, policeStations } from "../data/mockData";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
  
//   // Security Modal State
//   const [showSecurityModal, setShowSecurityModal] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [securityData, setSecurityData] = useState({ otp: "", secretCode: "" });

//   // New Email Verification Modal State
//   const [showEmailModal, setShowEmailModal] = useState(false);
//   const [newEmailOtp, setNewEmailOtp] = useState("");

//   // Form State
//   const [formData, setFormData] = useState({});
//   const [newPhoto, setNewPhoto] = useState(null);
//   const [previewPhoto, setPreviewPhoto] = useState(null);

//   // ✅ Senior Officer's Multiple Stations State
//   const [selectedStations, setSelectedStations] = useState([]);

//   useEffect(() => {
//     if (!user) navigate("/login");
    
//     // Initial State Setup
//     setFormData({
//       firstName: user?.name?.split(" ")[1] || "",
//       lastName: user?.name?.split(" ")[2] || "",
//       email: user?.email || "",
//       mobile: user?.mobile || "", 
//       gender: user?.gender || "",
//       aadhar: user?.aadhar || "", 
//       station: user?.station || "",
//       designation: user?.designation || ""
//     });

//     // ✅ Senior Station List Parsing
//     if (user?.role === 'senior' && user?.station) {
//         const stationsArray = user.station.split(',').map(s => s.trim()).filter(s => s !== "");
//         setSelectedStations(stationsArray);
//     }

//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//         const config = { headers: { Authorization: `Bearer ${user.token}` } };
//         const { data } = await axios.get(`${BASE_URL}/api/users/${user._id}`, config);
        
//         setFormData({ ...data, title: data.title || "Mr." });
//         setUser({ ...user, ...data }); 

//         // ✅ Re-sync Senior Stations from DB
//         if (data.role === 'senior' && data.station) {
//             setSelectedStations(data.station.split(',').map(s => s.trim()));
//         }

//     } catch (error) { console.error(error); }
//   };

//   // --- SENIOR STATION HANDLERS ---
//   const handleAddStation = (e) => {
//       const value = e.target.value;
//       if (value && !selectedStations.includes(value)) {
//           setSelectedStations([...selectedStations, value]);
//       }
//       e.target.value = ""; // Reset dropdown
//   };

//   const handleRemoveStation = (stationToRemove) => {
//       setSelectedStations(selectedStations.filter(s => s !== stationToRemove));
//   };

//   // --- SECURITY & UPDATE LOGIC ---
//   const handleEditClick = () => {
//     if (isEditing) return;
//     setShowSecurityModal(true);
//   };

//   const sendSecurityOtp = async () => {
//     try {
//       setLoading(true);
//       await axios.post(`${BASE_URL}/api/users/send-otp`, { email: user.email, type: 'profile_edit' });
//       toast.success("OTP sent to your REGISTERED email!");
//       setOtpSent(true);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to send OTP");
//       setLoading(false);
//     }
//   };

//   const verifySecurity = async () => {
//     if (!securityData.otp) return toast.error("Enter OTP");
//     if ((user.role === 'police' || user.role === 'senior') && !securityData.secretCode) {
//         return toast.error("Enter Secret Code");
//     }
//     toast.success("Identity Verified! Editing Enabled.");
//     setShowSecurityModal(false);
//     setIsEditing(true);
//   };

//   const handleSaveClick = async (e) => {
//     e.preventDefault();
//     if (formData.email !== user.email) {
//         triggerNewEmailOtp();
//     } else {
//         finalizeUpdate(null);
//     }
//   };

//   const triggerNewEmailOtp = async () => {
//       try {
//           setLoading(true);
//           await axios.post(`${BASE_URL}/api/users/send-otp`, { email: formData.email, type: 'signup' });
//           toast.success(`OTP sent to NEW email: ${formData.email}`);
//           setShowEmailModal(true);
//           setLoading(false);
//       } catch (error) {
//           toast.error(error.response?.data?.message || "Could not send OTP to new email");
//           setLoading(false);
//       }
//   };

//   const finalizeUpdate = async (emailOtpToSubmit) => {
//     setLoading(true);

//     const updateData = new FormData();
//     updateData.append("firstName", formData.firstName);
//     updateData.append("lastName", formData.lastName);
//     updateData.append("mobile", formData.mobile);
//     updateData.append("gender", formData.gender);
//     updateData.append("email", formData.email);
//     updateData.append("aadhar", formData.aadhar);
    
//     if (user.role !== 'citizen') {
//         updateData.append("designation", formData.designation);
//         updateData.append("secretCode", securityData.secretCode);
        
//         if (user.role === 'senior') {
//             if (selectedStations.length === 0) {
//                 setLoading(false);
//                 return toast.error("Please select at least one jurisdiction station.");
//             }
//             updateData.append("station", selectedStations.join(", ")); 
//         } else {
//             updateData.append("station", formData.station);
//         }
//     }

//     if (emailOtpToSubmit) {
//         updateData.append("otp", emailOtpToSubmit); 
//     }

//     if (newPhoto) updateData.append("idPhoto", newPhoto);

//     try {
//         const config = { headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "multipart/form-data" } };
//         const { data } = await axios.put(`${BASE_URL}/api/users/profile`, updateData, config);
        
//         localStorage.setItem("userInfo", JSON.stringify(data));
//         setUser(data);
//         setIsEditing(false);
//         setShowEmailModal(false);
//         toast.success("Profile Updated Successfully!");
//     } catch (error) {
//         toast.error(error.response?.data?.message || "Update Failed");
//     } finally {
//         setLoading(false);
//     }
//   };

//   const availableDesignations = user?.role === 'senior' ? seniorDesignations : regularDesignations;
//   const availableStationsToAdd = policeStations.filter(s => !selectedStations.includes(s));

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <Navbar />
//       <Toaster />

//       {/* ✅ Container Padding Adjusted for Mobile (pt-20 for mobile nav, pt-28 for desktop) */}
//       <div className="max-w-4xl mx-auto pt-20 md:pt-28 px-4 pb-10">
        
//         {/* ✅ IMPROVED BACK BUTTON (Easier to press on mobile) */}
//         <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-700 border border-gray-600 px-4 py-2 rounded-full mb-6 transition-all shadow-md active:scale-95"
//         >
//             <FaArrowLeft className="text-sm" /> 
//             <span className="font-bold text-sm">Back</span>
//         </button>

//         {/* ✅ Main Card: Adjusted padding for Mobile (p-5 vs p-8) */}
//         <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl md:rounded-3xl p-5 md:p-8 relative overflow-hidden shadow-2xl">
          
//           <div className="flex justify-between items-start mb-6 md:mb-10">
//              <div>
//                 {/* ✅ Smaller Text on Mobile */}
//                 <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
//                 <p className="text-gray-400 text-xs md:text-sm mt-1">Manage personal details securely</p>
//              </div>
//              {!isEditing && (
//                  <button onClick={handleEditClick} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold transition-all shadow-lg text-xs md:text-sm">
//                     <FaUserEdit /> <span className="hidden md:inline">Edit Profile</span><span className="md:hidden">Edit</span>
//                  </button>
//              )}
//           </div>

//           <form onSubmit={handleSaveClick} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             
//              {/* --- PHOTO SECTION (Smaller on Mobile) --- */}
//              <div className="col-span-1 flex flex-col items-center">
//                 <div className="relative group cursor-pointer" onClick={handleEditClick}>
//                     <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-gray-700 overflow-hidden shadow-2xl relative transition-all">
//                         <img src={previewPhoto || user?.idPhoto} alt="Profile" className="w-full h-full object-cover" />
//                         {isEditing && (
//                             <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-bold opacity-100 transition-opacity">
//                                 <FaCamera className="text-xl md:text-2xl" />
//                             </div>
//                         )}
//                     </div>
//                     {isEditing && (
//                         <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
//                             setNewPhoto(e.target.files[0]);
//                             setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
//                         }} />
//                     )}
//                 </div>
//                 <h2 className="mt-3 md:mt-4 text-lg md:text-xl font-bold text-center">{user?.name}</h2>
//                 <span className="px-3 py-1 bg-gray-700 rounded-full text-[10px] md:text-xs text-cyan-400 font-bold uppercase tracking-wider mt-2 border border-gray-600">
//                     {user?.role}
//                 </span>
//              </div>

//              {/* --- DETAILS SECTION --- */}
//              <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4 md:gap-5">
//                 <div className="col-span-2 md:col-span-1">
//                     <label className="text-[10px] md:text-xs text-gray-500 font-bold uppercase ml-1">First Name</label>
//                     <input disabled={!isEditing} value={formData.firstName || ''} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className={`w-full bg-gray-900 border ${isEditing ? 'border-gray-500' : 'border-transparent'} rounded-xl p-2.5 md:p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all`} />
//                 </div>
//                 <div className="col-span-2 md:col-span-1">
//                     <label className="text-[10px] md:text-xs text-gray-500 font-bold uppercase ml-1">Last Name</label>
//                     <input disabled={!isEditing} value={formData.lastName || ''} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className={`w-full bg-gray-900 border ${isEditing ? 'border-gray-500' : 'border-transparent'} rounded-xl p-2.5 md:p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all`} />
//                 </div>
                
//                 <div className="col-span-2 md:col-span-1">
//                     <label className="text-[10px] md:text-xs text-gray-500 font-bold uppercase ml-1">Email (Requires Verification)</label>
//                     <input disabled={!isEditing} value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full bg-gray-900 border ${isEditing ? 'border-blue-500' : 'border-transparent'} rounded-xl p-2.5 md:p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all`} />
//                 </div>
//                 <div className="col-span-2 md:col-span-1">
//                     <label className="text-[10px] md:text-xs text-gray-500 font-bold uppercase ml-1">Mobile</label>
//                     <input disabled={!isEditing} value={formData.mobile || ''} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className={`w-full bg-gray-900 border ${isEditing ? 'border-gray-500' : 'border-transparent'} rounded-xl p-2.5 md:p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all`} />
//                 </div>

//                 {/* --- ROLE SPECIFIC FIELDS --- */}
//                 {user.role !== 'citizen' && (
//                     <>
//                         <div className="col-span-2 md:col-span-1">
//                             <label className="text-[10px] md:text-xs text-gray-500 font-bold uppercase ml-1">Designation</label>
//                             {isEditing ? (
//                                 <select 
//                                     value={formData.designation || ''} 
//                                     onChange={(e) => setFormData({...formData, designation: e.target.value})} 
//                                     className="w-full bg-gray-900 border border-gray-500 rounded-xl p-2.5 md:p-3 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
//                                 >
//                                     <option value="" className="bg-gray-900">Select Rank</option>
//                                     {availableDesignations.map((rank) => (
//                                         <option key={rank} value={rank} className="bg-gray-900">{rank}</option>
//                                     ))}
//                                 </select>
//                             ) : (
//                                 <input disabled value={formData.designation || ''} className="w-full bg-gray-900 border border-transparent rounded-xl p-2.5 md:p-3 text-sm text-white" />
//                             )}
//                         </div>

//                         <div className="col-span-2 md:col-span-1">
//                             <label className="text-[10px] md:text-xs text-gray-500 font-bold uppercase ml-1">
//                                 {user.role === 'senior' ? "Jurisdiction (Multi-Select)" : "Police Station"}
//                             </label>
                            
//                             {user.role === 'senior' ? (
//                                 // --- SENIOR OFFICER UI ---
//                                 <div className={`w-full ${isEditing ? 'bg-gray-900 border border-gray-500' : 'bg-gray-900 border border-transparent'} rounded-xl p-2 relative`}>
                                    
//                                     {/* Fixed Height Container with Scrollbar */}
//                                     <div className="flex flex-wrap gap-2 mb-2 max-h-[80px] md:max-h-[100px] overflow-y-auto custom-scrollbar pr-1">
//                                         {selectedStations.length > 0 ? (
//                                             selectedStations.map(station => (
//                                                 <span key={station} className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-1 rounded text-[10px] md:text-[11px] font-bold flex items-center gap-1 shrink-0">
//                                                     {station}
//                                                     {isEditing && (
//                                                         <button type="button" onClick={() => handleRemoveStation(station)} className="hover:text-white bg-amber-500/20 rounded-full p-0.5 ml-1 transition-colors">
//                                                             <FaTimes size={8} />
//                                                         </button>
//                                                     )}
//                                                 </span>
//                                             ))
//                                         ) : (
//                                             <span className="text-gray-500 text-xs italic p-1">No stations selected</span>
//                                         )}
//                                     </div>

//                                     {/* Dropdown UI */}
//                                     {isEditing && (
//                                         <div className="relative mt-1">
//                                             <select 
//                                                 onChange={handleAddStation} 
//                                                 className="w-full bg-black/40 border border-gray-700 rounded-lg p-2 pr-8 text-xs text-gray-300 focus:border-amber-500 outline-none appearance-none cursor-pointer hover:bg-black/60 transition-colors"
//                                             >
//                                                 <option value="" className="bg-gray-900 text-gray-500">+ Add Station Jurisdiction</option>
//                                                 {availableStationsToAdd.map(station => (
//                                                     <option key={station} value={station} className="bg-gray-900 text-white py-2">
//                                                         {station}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <div className="absolute right-3 top-2.5 text-gray-500 pointer-events-none">
//                                                 <FaChevronDown size={10} />
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ) : (
//                                 // --- REGULAR POLICE UI ---
//                                 isEditing ? (
//                                     <select 
//                                         value={formData.station || ''} 
//                                         onChange={(e) => setFormData({...formData, station: e.target.value})} 
//                                         className="w-full bg-gray-900 border border-gray-500 rounded-xl p-2.5 md:p-3 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
//                                     >
//                                         <option value="" className="bg-gray-900">Select Station</option>
//                                         {policeStations.map((station) => (
//                                             <option key={station} value={station} className="bg-gray-900">{station}</option>
//                                         ))}
//                                     </select>
//                                 ) : (
//                                     <input disabled value={formData.station || ''} className="w-full bg-gray-900 border border-transparent rounded-xl p-2.5 md:p-3 text-sm text-white" />
//                                 )
//                             )}
//                         </div>
//                     </>
//                 )}

//                 {/* Aadhaar Editable */}
//                 <div className="col-span-2">
//                     <label className="text-[10px] md:text-xs text-gray-500 font-bold uppercase ml-1 flex items-center gap-1">
//                         Aadhaar Number
//                     </label>
//                     <input 
//                         disabled={!isEditing} 
//                         value={formData.aadhar || ''} 
//                         onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
//                         className={`w-full bg-gray-900 border ${isEditing ? 'border-gray-500' : 'border-transparent'} rounded-xl p-2.5 md:p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all`}
//                         placeholder="12 Digit Aadhaar"
//                     />
//                 </div>

//                 {isEditing && (
//                     <div className="col-span-2 flex gap-4 mt-4">
//                         <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-3 rounded-xl font-bold bg-gray-700 hover:bg-gray-600 text-white transition-all text-sm">Cancel</button>
//                         <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl font-bold bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20 transition-all text-sm">
//                             {loading ? "Processing..." : "Save Changes"}
//                         </button>
//                     </div>
//                 )}
//              </div>
//           </form>

//           {/* --- MODALS (Unchanged logic, just ensure mobile fit) --- */}
//           <AnimatePresence>
//             {showSecurityModal && (
//                 <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
//                     <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="bg-gray-900 border border-gray-700 p-6 md:p-8 rounded-3xl max-w-md w-full shadow-2xl">
//                         <div className="text-center mb-6">
//                             <FaShieldAlt className="text-3xl md:text-4xl text-red-500 mx-auto mb-4" />
//                             <h2 className="text-xl md:text-2xl font-bold">Security Verification</h2>
//                             <p className="text-gray-400 text-xs md:text-sm mt-2">Verify identity to unlock edit mode.</p>
//                         </div>
//                         <div className="space-y-4">
//                             {!otpSent ? (
//                                 <button onClick={sendSecurityOtp} disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white transition-all text-sm md:text-base">
//                                     {loading ? "Sending..." : "Send OTP"}
//                                 </button>
//                             ) : (
//                                 <>
//                                     <input type="text" onChange={(e) => setSecurityData({...securityData, otp: e.target.value})} className="w-full bg-black border border-gray-700 rounded-xl p-3 text-center tracking-widest text-lg md:text-xl font-bold focus:border-blue-500 outline-none" placeholder="OTP" />
//                                     {(user.role === 'police' || user.role === 'senior') && (
//                                         <input type="password" onChange={(e) => setSecurityData({...securityData, secretCode: e.target.value})} className="w-full bg-black border border-gray-700 rounded-xl p-3 mt-2 focus:border-red-500 outline-none" placeholder="Secret Code" />
//                                     )}
//                                     <button onClick={verifySecurity} className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white mt-2 text-sm md:text-base">Verify & Unlock</button>
//                                 </>
//                             )}
//                             <button onClick={() => setShowSecurityModal(false)} className="w-full py-2 text-gray-500 hover:text-white text-sm">Cancel</button>
//                         </div>
//                     </motion.div>
//                 </div>
//             )}
//           </AnimatePresence>

//           <AnimatePresence>
//             {showEmailModal && (
//                 <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
//                     <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="bg-gray-900 border border-blue-500/50 p-6 md:p-8 rounded-3xl max-w-md w-full shadow-2xl">
//                         <div className="text-center mb-6">
//                             <FaEnvelope className="text-3xl md:text-4xl text-blue-500 mx-auto mb-4" />
//                             <h2 className="text-xl md:text-2xl font-bold">Verify New Email</h2>
//                             <p className="text-gray-400 text-xs md:text-sm mt-2">Code sent to <span className="text-white font-bold">{formData.email}</span></p>
//                         </div>
//                         <div className="space-y-4">
//                             <input type="text" onChange={(e) => setNewEmailOtp(e.target.value)} className="w-full bg-black border border-gray-700 rounded-xl p-3 text-center tracking-widest text-lg md:text-xl font-bold focus:border-blue-500 outline-none" placeholder="OTP" />
//                             <button onClick={() => finalizeUpdate(newEmailOtp)} disabled={loading} className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white mt-2 text-sm md:text-base">
//                                 {loading ? "Saving..." : "Verify & Save"}
//                             </button>
//                             <button onClick={() => setShowEmailModal(false)} className="w-full py-2 text-gray-500 hover:text-white text-sm">Cancel</button>
//                         </div>
//                     </motion.div>
//                 </div>
//             )}
//           </AnimatePresence>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


























































import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaUserEdit, FaCamera, FaShieldAlt, FaArrowLeft, FaEnvelope, FaTimes, FaChevronDown, FaIdCard, FaUserShield, FaPhoneAlt, FaBuilding } from "react-icons/fa";
import { BASE_URL } from "../config";

// ✅ IMPORT BACKGROUND
import dashboardBg from '../assets/dashboard-bg.png';

// ✅ IMPORT DATA
import { regularDesignations, seniorDesignations, policeStations } from "../data/mockData";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Security Modal State
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [securityData, setSecurityData] = useState({ otp: "", secretCode: "" });

  // New Email Verification Modal State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmailOtp, setNewEmailOtp] = useState("");

  // Form State
  const [formData, setFormData] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // ✅ Senior Officer's Multiple Stations State
  const [selectedStations, setSelectedStations] = useState([]);

  useEffect(() => {
    if (!user) navigate("/login");
    
    // Initial State Setup
    setFormData({
      firstName: user?.name?.split(" ")[1] || "",
      lastName: user?.name?.split(" ")[2] || "",
      email: user?.email || "",
      mobile: user?.mobile || "", 
      gender: user?.gender || "",
      aadhar: user?.aadhar || "", 
      station: user?.station || "",
      designation: user?.designation || ""
    });

    // ✅ Senior Station List Parsing
    if (user?.role === 'senior' && user?.station) {
        const stationsArray = user.station.split(',').map(s => s.trim()).filter(s => s !== "");
        setSelectedStations(stationsArray);
    }

    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${BASE_URL}/api/users/${user._id}`, config);
        
        setFormData({ ...data, title: data.title || "Mr." });
        setUser({ ...user, ...data }); 

        if (data.role === 'senior' && data.station) {
            setSelectedStations(data.station.split(',').map(s => s.trim()));
        }

    } catch (error) { console.error(error); }
  };

  // --- HANDLERS (UNCHANGED) ---
  const handleAddStation = (e) => {
      const value = e.target.value;
      if (value && !selectedStations.includes(value)) {
          setSelectedStations([...selectedStations, value]);
      }
      e.target.value = ""; 
  };

  const handleRemoveStation = (stationToRemove) => {
      setSelectedStations(selectedStations.filter(s => s !== stationToRemove));
  };

  const handleEditClick = () => {
    if (isEditing) return;
    setShowSecurityModal(true);
  };

  const sendSecurityOtp = async () => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/users/send-otp`, { email: user.email, type: 'profile_edit' });
      toast.success("OTP sent to your REGISTERED email!");
      setOtpSent(true);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to send OTP");
      setLoading(false);
    }
  };

  const verifySecurity = async () => {
    if (!securityData.otp) return toast.error("Enter OTP");
    if ((user.role === 'police' || user.role === 'senior') && !securityData.secretCode) {
        return toast.error("Enter Secret Code");
    }
    toast.success("Identity Verified! Editing Enabled.");
    setShowSecurityModal(false);
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (formData.email !== user.email) {
        triggerNewEmailOtp();
    } else {
        finalizeUpdate(null);
    }
  };

  const triggerNewEmailOtp = async () => {
      try {
          setLoading(true);
          await axios.post(`${BASE_URL}/api/users/send-otp`, { email: formData.email, type: 'signup' });
          toast.success(`OTP sent to NEW email: ${formData.email}`);
          setShowEmailModal(true);
          setLoading(false);
      } catch (error) {
          toast.error(error.response?.data?.message || "Could not send OTP to new email");
          setLoading(false);
      }
  };

  const finalizeUpdate = async (emailOtpToSubmit) => {
    setLoading(true);

    const updateData = new FormData();
    updateData.append("firstName", formData.firstName);
    updateData.append("lastName", formData.lastName);
    updateData.append("mobile", formData.mobile);
    updateData.append("gender", formData.gender);
    updateData.append("email", formData.email);
    updateData.append("aadhar", formData.aadhar);
    
    if (user.role !== 'citizen') {
        updateData.append("designation", formData.designation);
        updateData.append("secretCode", securityData.secretCode);
        
        if (user.role === 'senior') {
            if (selectedStations.length === 0) {
                setLoading(false);
                return toast.error("Please select at least one jurisdiction station.");
            }
            updateData.append("station", selectedStations.join(", ")); 
        } else {
            updateData.append("station", formData.station);
        }
    }

    if (emailOtpToSubmit) {
        updateData.append("otp", emailOtpToSubmit); 
    }

    if (newPhoto) updateData.append("idPhoto", newPhoto);

    try {
        const config = { headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(`${BASE_URL}/api/users/profile`, updateData, config);
        
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data);
        setIsEditing(false);
        setShowEmailModal(false);
        toast.success("Profile Updated Successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Update Failed");
    } finally {
        setLoading(false);
    }
  };

  const availableDesignations = user?.role === 'senior' ? seniorDesignations : regularDesignations;
  const availableStationsToAdd = policeStations.filter(s => !selectedStations.includes(s));

  // --- STYLES ---
  const glassContainer = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-3xl overflow-hidden relative";
  const inputStyle = `w-full bg-slate-950/50 border rounded-xl p-3 text-sm text-white focus:outline-none transition-all ${isEditing ? 'border-slate-600 focus:border-blue-500' : 'border-transparent cursor-not-allowed text-gray-300'}`;

  return (
    <div className="min-h-screen w-screen text-white flex flex-col font-sans relative overflow-hidden">
      <Navbar />
      <Toaster position="top-right" />

      {/* --- BACKGROUND IMAGE --- */}
      <div className="fixed inset-0 z-0">
          <img 
            src={dashboardBg} 
            alt="Background" 
            className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" 
          />
          {/* Gradient Overlay for Consistency */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-black/60 to-black/80"></div>
      </div>

      {/* ✅ CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col px-4 md:px-8 pt-24 pb-10 relative z-10 w-full items-center">
        
        <div className="max-w-5xl w-full">
            
            {/* Back Button */}
            <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate(-1)} 
                className="mb-6 w-fit px-5 py-2 bg-slate-800/60 hover:bg-slate-700 backdrop-blur-md text-slate-200 font-bold font-mono rounded-xl shadow-lg border border-slate-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
            >
                <FaArrowLeft /> BACK
            </motion.button>

            {/* MAIN PROFILE CARD */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={`${glassContainer} p-6 md:p-10`}
            >
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-slate-700/50 pb-8 mb-8 relative z-10">
                    
                    {/* Photo */}
                    <div className="relative group cursor-pointer" onClick={handleEditClick}>
                        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 p-1 overflow-hidden shadow-2xl relative transition-all ${isEditing ? 'border-blue-500 shadow-blue-500/30' : 'border-slate-700'}`}>
                            <img src={previewPhoto || user?.idPhoto} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            
                            {/* Edit Overlay */}
                            {isEditing && (
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                                    <FaCamera className="text-2xl animate-pulse" />
                                </div>
                            )}
                        </div>
                        {isEditing && (
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                                setNewPhoto(e.target.files[0]);
                                setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
                            }} />
                        )}
                    </div>

                    {/* Name & Role */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-2">
                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                {user?.name}
                            </h1>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border mb-1.5 ${user.role === 'senior' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                                {user?.role}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm font-medium flex items-center justify-center md:justify-start gap-2">
                            <FaShieldAlt className="text-slate-500" /> Secure ID: {user?._id?.slice(-6).toUpperCase()}
                        </p>
                    </div>

                    {/* Edit Button */}
                    {!isEditing && (
                        <button 
                            onClick={handleEditClick} 
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95"
                        >
                            <FaUserEdit /> EDIT PROFILE
                        </button>
                    )}
                </div>

                {/* --- FORM SECTION --- */}
                <form onSubmit={handleSaveClick} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    
                    {/* First Name */}
                    <div>
                        <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block ml-1">First Name</label>
                        <input disabled={!isEditing} value={formData.firstName || ''} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className={inputStyle} />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block ml-1">Last Name</label>
                        <input disabled={!isEditing} value={formData.lastName || ''} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className={inputStyle} />
                    </div>

                    {/* Email */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block ml-1 flex items-center gap-2">
                            Email Address {isEditing && <span className="text-[10px] text-yellow-500">(Verfication Required if Changed)</span>}
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3.5 text-slate-500" />
                            <input disabled={!isEditing} value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`${inputStyle} pl-10`} />
                        </div>
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block ml-1">Mobile Number</label>
                        <div className="relative">
                            <FaPhoneAlt className="absolute left-3 top-3.5 text-slate-500 text-xs" />
                            <input disabled={!isEditing} value={formData.mobile || ''} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className={`${inputStyle} pl-10`} />
                        </div>
                    </div>

                    {/* Aadhaar */}
                    <div>
                        <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block ml-1">Aadhaar Number</label>
                        <div className="relative">
                            <FaIdCard className="absolute left-3 top-3.5 text-slate-500" />
                            <input disabled={!isEditing} value={formData.aadhar || ''} onChange={(e) => setFormData({...formData, aadhar: e.target.value})} className={`${inputStyle} pl-10 font-mono`} />
                        </div>
                    </div>

                    {/* ROLE SPECIFIC: Designation & Station */}
                    {user.role !== 'citizen' && (
                        <>
                            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/30 p-4 rounded-xl border border-slate-700/50">
                                <div>
                                    <label className="text-xs text-blue-400 font-bold uppercase mb-1.5 block ml-1 flex items-center gap-2"><FaUserShield/> Designation</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <select 
                                                value={formData.designation || ''} 
                                                onChange={(e) => setFormData({...formData, designation: e.target.value})} 
                                                className={`${inputStyle} appearance-none cursor-pointer`}
                                            >
                                                <option value="" className="bg-slate-900">Select Rank</option>
                                                {availableDesignations.map((rank) => (
                                                    <option key={rank} value={rank} className="bg-slate-900">{rank}</option>
                                                ))}
                                            </select>
                                            <FaChevronDown className="absolute right-3 top-4 text-slate-500 pointer-events-none text-xs" />
                                        </div>
                                    ) : (
                                        <input disabled value={formData.designation || ''} className={inputStyle} />
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs text-blue-400 font-bold uppercase mb-1.5 block ml-1 flex items-center gap-2">
                                        <FaBuilding/> {user.role === 'senior' ? "Jurisdiction (Multi-Select)" : "Police Station"}
                                    </label>
                                    
                                    {user.role === 'senior' ? (
                                        <div className={`w-full min-h-[50px] ${isEditing ? 'bg-slate-950/50 border border-slate-600' : 'bg-slate-950/30 border border-transparent'} rounded-xl p-2 relative transition-all`}>
                                            <div className="flex flex-wrap gap-2 mb-1">
                                                {selectedStations.length > 0 ? (
                                                    selectedStations.map(station => (
                                                        <span key={station} className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
                                                            {station}
                                                            {isEditing && (
                                                                <button type="button" onClick={() => handleRemoveStation(station)} className="hover:text-white hover:bg-red-500/50 rounded-full p-0.5 transition-colors"><FaTimes size={8} /></button>
                                                            )}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500 text-xs italic p-1">No stations selected</span>
                                                )}
                                            </div>

                                            {isEditing && (
                                                <div className="relative mt-2">
                                                    <select onChange={handleAddStation} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-xs text-white focus:border-blue-500 outline-none appearance-none cursor-pointer">
                                                        <option value="" className="bg-slate-900 text-gray-500">+ Add Station</option>
                                                        {availableStationsToAdd.map(station => (
                                                            <option key={station} value={station} className="bg-slate-900">{station}</option>
                                                        ))}
                                                    </select>
                                                    <FaChevronDown className="absolute right-3 top-2.5 text-slate-500 pointer-events-none text-xs" />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        isEditing ? (
                                            <div className="relative">
                                                <select 
                                                    value={formData.station || ''} 
                                                    onChange={(e) => setFormData({...formData, station: e.target.value})} 
                                                    className={`${inputStyle} appearance-none cursor-pointer`}
                                                >
                                                    <option value="" className="bg-slate-900">Select Station</option>
                                                    {policeStations.map((station) => (
                                                        <option key={station} value={station} className="bg-slate-900">{station}</option>
                                                    ))}
                                                </select>
                                                <FaChevronDown className="absolute right-3 top-4 text-slate-500 pointer-events-none text-xs" />
                                            </div>
                                        ) : (
                                            <input disabled value={formData.station || ''} className={inputStyle} />
                                        )
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="col-span-1 md:col-span-2 flex gap-4 mt-4 pt-4 border-t border-slate-700/50">
                            <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-3 rounded-xl font-bold bg-slate-700 hover:bg-slate-600 text-white transition-all">
                                CANCEL
                            </button>
                            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 transition-all">
                                {loading ? "SAVING..." : "SAVE CHANGES"}
                            </button>
                        </div>
                    )}
                </form>
            </motion.div>
        </div>

        {/* --- MODALS (Glassmorphism Applied) --- */}
        <AnimatePresence>
            {(showSecurityModal || showEmailModal) && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} 
                        className="bg-slate-900 border border-slate-600 p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden"
                    >
                        {/* Modal Content */}
                        {showSecurityModal && (
                            <>
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaShieldAlt className="text-3xl text-red-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Security Check</h2>
                                    <p className="text-slate-400 text-sm mt-2">Verify your identity to unlock profile editing.</p>
                                </div>
                                <div className="space-y-4">
                                    {!otpSent ? (
                                        <button onClick={sendSecurityOtp} disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white transition-all">
                                            {loading ? "SENDING..." : "SEND OTP TO EMAIL"}
                                        </button>
                                    ) : (
                                        <>
                                            <input type="text" onChange={(e) => setSecurityData({...securityData, otp: e.target.value})} className="w-full bg-black/50 border border-slate-600 rounded-xl p-3 text-center tracking-widest text-xl font-bold text-white focus:border-blue-500 outline-none" placeholder="ENTER OTP" />
                                            {(user.role === 'police' || user.role === 'senior') && (
                                                <input type="password" onChange={(e) => setSecurityData({...securityData, secretCode: e.target.value})} className="w-full bg-black/50 border border-slate-600 rounded-xl p-3 mt-2 text-center text-white focus:border-red-500 outline-none" placeholder="SECRET CODE" />
                                            )}
                                            <button onClick={verifySecurity} className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white mt-2 shadow-lg shadow-green-900/30">VERIFY & UNLOCK</button>
                                        </>
                                    )}
                                    <button onClick={() => setShowSecurityModal(false)} className="w-full py-2 text-slate-500 hover:text-white text-sm font-bold">CANCEL</button>
                                </div>
                            </>
                        )}

                        {showEmailModal && (
                            <>
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaEnvelope className="text-3xl text-blue-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Verify New Email</h2>
                                    <p className="text-slate-400 text-sm mt-2">Enter code sent to <span className="text-white font-bold">{formData.email}</span></p>
                                </div>
                                <div className="space-y-4">
                                    <input type="text" onChange={(e) => setNewEmailOtp(e.target.value)} className="w-full bg-black/50 border border-slate-600 rounded-xl p-3 text-center tracking-widest text-xl font-bold text-white focus:border-blue-500 outline-none" placeholder="OTP CODE" />
                                    <button onClick={() => finalizeUpdate(newEmailOtp)} disabled={loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white mt-2 shadow-lg shadow-emerald-900/30">
                                        {loading ? "SAVING..." : "VERIFY & SAVE"}
                                    </button>
                                    <button onClick={() => setShowEmailModal(false)} className="w-full py-2 text-slate-500 hover:text-white text-sm font-bold">CANCEL</button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Profile;